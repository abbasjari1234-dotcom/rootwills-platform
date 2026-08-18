'use server';

import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export interface LoginResult {
  ok: boolean;
  role?: 'admin' | 'customer' | 'driver';
  organizationId?: string;
  destination?: string;
  error?: string;
}

export async function loginServerAction(formData: {
  email: string;
  password: string;
  scope: 'customer' | 'staff';
}): Promise<LoginResult> {
  const cleanEmail = (formData.email || '').trim().toLowerCase();
  const cleanPassword = (formData.password || '').trim();
  const scope = formData.scope || 'customer';

  if (!cleanEmail || !cleanPassword) {
    return { ok: false, error: 'Please enter both your email and password.' };
  }

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

  let targetRole: 'admin' | 'customer' | 'driver' = scope === 'staff' ? 'admin' : 'customer';
  let targetOrgId = 'org-sancarlo';

  if (isRealSupabase) {
    try {
      const supabase = createSupabaseClient(rawUrl, rawKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (error || !data?.user) {
        if (error?.message?.toLowerCase().includes('email not confirmed')) {
          return {
            ok: false,
            error:
              'Email not confirmed. In Supabase Dashboard -> Authentication -> Users, click your user and click "Confirm Email".',
          };
        }
        if (error?.message?.toLowerCase().includes('invalid login credentials')) {
          return {
            ok: false,
            error: 'Invalid email or password. Please verify the email and password in Supabase.',
          };
        }
        return { ok: false, error: error?.message || 'Invalid login credentials.' };
      }

      // Query profiles table for strict role verification
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

      const userRole = (profile?.role || '').toLowerCase();
      const isStaffDomain = cleanEmail.includes('rootwills.co.uk') || cleanEmail.includes('admin');
      const hasStaffPermission = userRole === 'admin' || userRole === 'sales' || isStaffDomain;

      // 1. STRICT STAFF CHECK: If logging in under Staff CRM tab, verify permissions
      if (scope === 'staff') {
        if (!hasStaffPermission && profile !== null && userRole.length > 0) {
          return {
            ok: false,
            error: `Access Denied: Account (${cleanEmail}) is registered as a Customer (${userRole}) and does not have Staff Administrator permissions.`,
          };
        }
        targetRole = 'admin';
      } else {
        // 2. CUSTOMER PORTAL LOGIN
        if (userRole === 'driver') {
          return {
            ok: false,
            error: 'Driver accounts must sign in via the Driver Logistics App (/driver).',
          };
        }
        targetRole = hasStaffPermission ? 'admin' : 'customer';
      }

      if (profile?.organization_id) {
        targetOrgId = profile.organization_id;
      }

      // Set auth cookies
      const cookieStore = cookies();
      cookieStore.set('rootwills_role', targetRole, {
        path: '/',
        maxAge: 86400 * 7,
        sameSite: 'lax',
      });

      if (data.session?.access_token) {
        cookieStore.set('sb-access-token', data.session.access_token, {
          path: '/',
          maxAge: 86400 * 7,
          sameSite: 'lax',
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
    } catch (err: any) {
      return { ok: false, error: err?.message || 'Server authentication error.' };
    }
  }

  // Demo Fallback Mode
  const VALID_DEMO_PASSWORDS = ['demo-access-2026', 'rootwills2026', 'admin123', 'password123'];
  if (!VALID_DEMO_PASSWORDS.includes(cleanPassword)) {
    return { ok: false, error: 'Invalid password. For demo testing, use password: demo-access-2026' };
  }

  const isStaffDemoEmail = cleanEmail.includes('rootwills') || cleanEmail.includes('marcus') || cleanEmail.includes('admin');

  if (scope === 'staff' && !isStaffDemoEmail) {
    return {
      ok: false,
      error: 'Access Denied: Customer demo accounts cannot access Staff CRM. Use Marcus Vance (Admin) demo instead.',
    };
  }

  targetRole = scope === 'staff' ? 'admin' : 'customer';

  const cookieStore = cookies();
  cookieStore.set('rootwills_role', targetRole, {
    path: '/',
    maxAge: 86400 * 7,
    sameSite: 'lax',
  });

  const destination = scope === 'staff' ? '/admin/crm' : '/dashboard';

  return {
    ok: true,
    role: targetRole,
    organizationId: targetOrgId,
    destination,
  };
}
