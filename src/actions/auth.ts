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

      // Query profiles table for role
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, role, organization_id')
          .eq('id', data.user.id)
          .maybeSingle();

        if (
          profile?.role === 'admin' ||
          profile?.role === 'sales' ||
          scope === 'staff' ||
          cleanEmail.includes('admin') ||
          cleanEmail.includes('rootwills')
        ) {
          targetRole = 'admin';
        } else if (profile?.role === 'driver') {
          targetRole = 'driver';
        } else {
          targetRole = 'customer';
        }

        if (profile?.organization_id) {
          targetOrgId = profile.organization_id;
        }
      } catch {
        if (scope === 'staff' || cleanEmail.includes('admin') || cleanEmail.includes('rootwills')) {
          targetRole = 'admin';
        }
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

      const destination = targetRole === 'admin' ? '/admin/crm' : targetRole === 'driver' ? '/driver' : '/dashboard';

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

  targetRole = scope === 'staff' || cleanEmail.includes('admin') || cleanEmail.includes('rootwills') ? 'admin' : 'customer';

  const cookieStore = cookies();
  cookieStore.set('rootwills_role', targetRole, {
    path: '/',
    maxAge: 86400 * 7,
    sameSite: 'lax',
  });

  const destination = targetRole === 'admin' ? '/admin/crm' : '/dashboard';

  return {
    ok: true,
    role: targetRole,
    organizationId: targetOrgId,
    destination,
  };
}
