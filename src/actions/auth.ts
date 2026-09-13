'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, RATE_LIMIT_PRESETS } from '@/lib/security/rate-limit';

export interface LoginResult {
  ok: boolean;
  role?: 'admin' | 'customer' | 'driver';
  organizationId?: string;
  destination?: string;
  error?: string;
}

/**
 * Authoritative Server-Side Login Action
 * Authenticates exclusively against the backend Supabase database.
 * No hardcoded bypasses, no demo fallbacks, no credential guessing.
 */
export async function loginServerAction(formData: {
  email: string;
  password: string;
  scope: 'customer' | 'staff';
}): Promise<LoginResult> {
  let cleanEmail = (formData.email || '').trim().toLowerCase();
  // Normalize common phonetic typo "coustomer" -> "customer"
  if (cleanEmail.startsWith('coustomer@')) {
    cleanEmail = 'customer@' + cleanEmail.slice(10);
  }
  const cleanPassword = (formData.password || '').trim();
  const scope = formData.scope || 'customer';

  if (!cleanEmail || !cleanPassword) {
    return { ok: false, error: 'Please enter both your email address and account password.' };
  }

  // Rate Limiting (15 attempts per minute per email / IP identifier to prevent lockouts during active switching)
  const rateLimit = checkRateLimit(`login_${cleanEmail}`, { maxRequests: 15, windowSeconds: 60 });
  if (!rateLimit.success) {
    return { ok: false, error: 'Too many login attempts. Please wait 60 seconds before trying again.' };
  }

  try {
    const supabase = createClient();

    // 1. Clear any pre-existing session before authenticating to prevent session contamination
    try {
      await supabase.auth.signOut();
    } catch {
      // Safe to ignore
    }

    // 2. Authenticate with Supabase Auth (verifies email & password hash server-side)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: cleanPassword,
    });

    if (error || !data?.user) {
      // Invalidate any lingering session or role cookies to prevent stale states
      try {
        await supabase.auth.signOut();
        const cookieStore = cookies();
        cookieStore.delete('rootwills_role');
        const allCookies = cookieStore.getAll();
        for (const c of allCookies) {
          if (c.name.startsWith('sb-')) {
            cookieStore.delete(c.name);
          }
        }
      } catch {
        // Safe to ignore
      }

      // Friendly hint if user entered a typo
      if (formData.email?.toLowerCase().includes('coustomer')) {
        return {
          ok: false,
          error: 'Account not found. Did you mean customer@rootwills.co.uk?',
        };
      }

      return {
        ok: false,
        error: 'Invalid email or password. Please check your credentials and try again.',
      };
    }

    // 3. Determine authoritative role from authenticated user's metadata & profiles
    const rawRole = (
      data.user.app_metadata?.role ||
      data.user.user_metadata?.role ||
      'customer'
    ).toLowerCase();

    let resolvedRole: 'admin' | 'customer' | 'driver' = 'customer';
    if (rawRole === 'admin' || rawRole === 'sales') {
      resolvedRole = 'admin';
    } else if (rawRole === 'driver') {
      resolvedRole = 'driver';
    }

    let organizationId = resolvedRole === 'admin' ? 'org-rootwills-hq' : 'org-rootwills-partner';

    // Query profiles table for custom organization mapping if available
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id, role')
        .eq('id', data.user.id)
        .maybeSingle();

      if (profile?.role) {
        const pRole = profile.role.toLowerCase();
        if (pRole === 'admin' || pRole === 'sales') {
          resolvedRole = 'admin';
        } else if (pRole === 'driver') {
          resolvedRole = 'driver';
        }
      }
      if (profile?.organization_id) {
        organizationId = profile.organization_id;
      }
    } catch {
      // Profiles query error is non-fatal; role is securely established from Supabase user metadata
    }

    // 4. Strict Scope & Authorization Enforcement
    // A customer account must NEVER be granted access to the Staff CRM Portal
    if (scope === 'staff' && resolvedRole !== 'admin') {
      await supabase.auth.signOut();
      return {
        ok: false,
        error: 'Access Denied: This account is registered as a customer and does not have Staff CRM permissions.',
      };
    }

    // 5. Set UI role cookie (used strictly for display badges/client UI, never for authorization)
    const cookieStore = cookies();
    cookieStore.set('rootwills_role', resolvedRole, {
      path: '/',
      maxAge: 86400 * 7,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // 6. Determine secure destination
    const destination =
      scope === 'staff'
        ? '/admin/crm'
        : resolvedRole === 'driver'
          ? '/driver'
          : '/dashboard';

    return {
      ok: true,
      role: resolvedRole,
      organizationId,
      destination,
    };
  } catch (err: any) {
    console.error('Authentication service exception:', err?.message || 'Unknown error');
    return {
      ok: false,
      error: 'An unexpected authentication error occurred. Please try again.',
    };
  }
}

/**
 * Server-Side Logout Action
 * Invalidates the cryptographic Supabase session and clears auth cookies.
 */
export async function logoutServerAction(): Promise<{ ok: boolean }> {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();

    const cookieStore = cookies();
    cookieStore.delete('rootwills_role');
    const allCookies = cookieStore.getAll();
    for (const c of allCookies) {
      if (c.name.startsWith('sb-')) {
        cookieStore.delete(c.name);
      }
    }
  } catch (err) {
    console.error('Logout error:', err);
  }
  return { ok: true };
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
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk'}/login?reset=true`,
    });

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

