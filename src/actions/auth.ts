'use server';

import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit';

export interface LoginResult {
  ok: boolean;
  role?: 'admin' | 'customer' | 'driver';
  organizationId?: string;
  destination?: string;
  error?: string;
}

// Authoritative System Accounts Directory (Role and Destination Mapping)
const PRECONFIGURED_ACCOUNTS: Record<
  string,
  {
    role: 'admin' | 'customer' | 'driver';
    orgId: string;
    destination: string;
    name: string;
  }
> = {
  // COMMERCIAL ADMIN / OPERATIONS ACCOUNTS
  'staff@rootwills.co.uk': {
    role: 'admin',
    orgId: 'org-rootwills-hq',
    destination: '/admin/crm',
    name: 'Rootwills Commercial Staff Desk',
  },
  'admin@rootwills.co.uk': {
    role: 'admin',
    orgId: 'org-rootwills-hq',
    destination: '/admin/crm',
    name: 'Rootwills Operations Manager',
  },
  'manager@rootwills.co.uk': {
    role: 'admin',
    orgId: 'org-rootwills-hq',
    destination: '/admin/crm',
    name: 'Operations Manager',
  },
  'marcus.vance@rootwills.co.uk': {
    role: 'admin',
    orgId: 'org-rootwills-hq',
    destination: '/admin/crm',
    name: 'Marcus Vance (Commercial Sales Lead)',
  },

  // B2B HOSPITALITY CUSTOMER ACCOUNTS
  'customer@rootwills.co.uk': {
    role: 'customer',
    orgId: 'org-rootwills-partner',
    destination: '/dashboard',
    name: 'Trade Account Lead (San Carlo Group)',
  },
  'purchasing@rootwills.co.uk': {
    role: 'customer',
    orgId: 'org-rootwills-partner',
    destination: '/dashboard',
    name: 'Group Purchasing Director',
  },
  'orders@rootwills.co.uk': {
    role: 'customer',
    orgId: 'org-rootwills-partner',
    destination: '/dashboard',
    name: 'Executive Chef (Kitchen Order Pad)',
  },
  'chef@rootwills.co.uk': {
    role: 'customer',
    orgId: 'org-rootwills-partner',
    destination: '/dashboard',
    name: 'Head Chef (Morning Orders)',
  },

  // DRIVER LOGISTICS ACCOUNT
  'driver@rootwills.co.uk': {
    role: 'driver',
    orgId: 'org-rootwills-fleet',
    destination: '/driver',
    name: 'Dave King (Van #04 - Digbeth Fleet)',
  },
};

export async function loginServerAction(formData: {
  email: string;
  password: string;
  scope: 'customer' | 'staff';
}): Promise<LoginResult> {
  const cleanEmail = (formData.email || '').trim().toLowerCase();
  const cleanPassword = (formData.password || '').trim();
  const scope = formData.scope || 'customer';

  if (!cleanEmail || !cleanPassword) {
    return { ok: false, error: 'Please enter both your email address and account password.' };
  }

  // Rate Limiting (5 attempts per minute per email / client)
  const rateLimit = checkRateLimit(`login_${cleanEmail}`, RATE_LIMIT_PRESETS.AUTH);
  if (!rateLimit.success) {
    return { ok: false, error: 'Too many login attempts. Please wait 60 seconds before trying again.' };
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const demoPassword = (process.env.DEMO_AUTH_PASSWORD || '').trim();

  // 1. Check Supabase Database Auth for real credentials
  const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim().replace(/^["']|["']$/g, '');
  const rawKey = (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    ''
  ).trim().replace(/^["']|["']$/g, '');

  const isRealSupabase =
    rawUrl.length > 0 &&
    !rawUrl.includes('placeholder') &&
    (rawUrl.includes('supabase.co') || rawUrl.startsWith('http'));

  if (isRealSupabase) {
    try {
      const supabase = createSupabaseClient(rawUrl, rawKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (!error && data?.user) {
        // Query profiles table for role & organization
        let profile: { id?: string; role?: string; organization_id?: string } | null = null;
        try {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('id, role, organization_id')
            .eq('id', data.user.id)
            .maybeSingle();

          profile = userProfile;
        } catch {
          // Continue if profile lookup fails
        }

        const userRole = (profile?.role || 'customer').toLowerCase() as 'admin' | 'customer' | 'driver';
        const isStaffDomain = cleanEmail.includes('rootwills.co.uk') || cleanEmail.includes('admin');
        const hasStaffPermission = userRole === 'admin' || isStaffDomain;

        if (scope === 'staff' && !hasStaffPermission) {
          return {
            ok: false,
            error: `Access Denied: Account (${cleanEmail}) does not have Staff Administrator permissions.`,
          };
        }

        const targetRole: 'admin' | 'customer' | 'driver' = scope === 'staff' ? 'admin' : userRole;
        const targetOrgId = profile?.organization_id || 'org-rootwills-partner';

        const cookieStore = cookies();
        cookieStore.set('rootwills_role', targetRole, {
          path: '/',
          maxAge: 86400 * 7,
          sameSite: 'lax',
          secure: isProduction,
        });

        if (data.session?.access_token) {
          cookieStore.set('sb-access-token', data.session.access_token, {
            path: '/',
            maxAge: 86400 * 7,
            sameSite: 'lax',
            httpOnly: true,
            secure: isProduction,
          });
        }

        const destination =
          scope === 'staff'
            ? '/admin/crm'
            : targetRole === 'driver'
              ? '/driver'
              : '/dashboard';

        return {
          ok: true,
          role: targetRole,
          organizationId: targetOrgId,
          destination,
        };
      }
    } catch (err: any) {
      console.warn('Supabase auth check note:', err?.message || err);
    }
  }

  // 2. Demo / Development Sandbox Auth Bypass (Strictly disabled in production mode)
  if (!isProduction && demoPassword.length > 0 && cleanPassword === demoPassword) {
    const preconfigured = PRECONFIGURED_ACCOUNTS[cleanEmail];
    if (preconfigured) {
      // Verify scope restrictions
      if (scope === 'staff' && preconfigured.role !== 'admin') {
        return {
          ok: false,
          error: `Access Denied: Account (${cleanEmail}) is registered as a Customer and cannot log into the Staff CRM Portal.`,
        };
      }

      // Set authorization cookies
      const cookieStore = cookies();
      cookieStore.set('rootwills_role', preconfigured.role, {
        path: '/',
        maxAge: 86400 * 7,
        sameSite: 'lax',
        secure: isProduction,
      });

      return {
        ok: true,
        role: preconfigured.role,
        organizationId: preconfigured.orgId,
        destination: preconfigured.destination,
      };
    }

    const isCorporateStaffEmail = cleanEmail.endsWith('@rootwills.co.uk');
    const targetRole: 'admin' | 'customer' = (scope === 'staff' || isCorporateStaffEmail) ? 'admin' : 'customer';
    const targetOrgId = targetRole === 'admin' ? 'org-rootwills-hq' : 'org-rootwills-partner';
    const destination = targetRole === 'admin' ? '/admin/crm' : '/dashboard';

    const cookieStore = cookies();
    cookieStore.set('rootwills_role', targetRole, {
      path: '/',
      maxAge: 86400 * 7,
      sameSite: 'lax',
      secure: isProduction,
    });

    return {
      ok: true,
      role: targetRole,
      organizationId: targetOrgId,
      destination,
    };
  }

  return {
    ok: false,
    error: 'Invalid credentials. Please verify your email and password.',
  };
}

export interface PasswordResetResult {
  ok: boolean;
  message: string;
}

/**
 * Password Reset Server Action
 * Rate-limited to max 3 attempts per hour to mitigate brute force/enumeration.
 */
export async function requestPasswordResetServerAction(formData: {
  email: string;
}): Promise<PasswordResetResult> {
  const cleanEmail = (formData.email || '').trim().toLowerCase();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { ok: false, message: 'Please enter a valid work email address.' };
  }

  // Rate Limiting (3 attempts per hour per email)
  const rateLimit = checkRateLimit(`pwd_reset_${cleanEmail}`, RATE_LIMIT_PRESETS.PASSWORD_RESET);
  if (!rateLimit.success) {
    return {
      ok: false,
      message: 'Too many password reset requests. Please wait before requesting another link.',
    };
  }

  try {
    const rawUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
    const rawKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

    if (rawUrl && !rawUrl.includes('placeholder') && rawUrl.includes('supabase.co')) {
      const supabase = createSupabaseClient(rawUrl, rawKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk'}/login?reset=true`,
      });
    }

    // Always return safe generic confirmation to prevent user enumeration
    return {
      ok: true,
      message: 'If an account exists with this email address, a secure reset link has been dispatched.',
    };
  } catch (err: any) {
    console.error('Password reset notice:', err?.message || 'Reset error');
    return {
      ok: true,
      message: 'If an account exists with this email address, a secure reset link has been dispatched.',
    };
  }
}

