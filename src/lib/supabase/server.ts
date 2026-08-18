import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

function cleanUrl(raw: string | undefined): string {
  let url = (raw || '').trim().replace(/^["']|["']$/g, '');
  if (!url || url.includes('placeholder')) {
    return 'https://placeholder.supabase.co';
  }
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
}

function cleanKey(raw: string | undefined, fallback: string): string {
  let key = (raw || '').trim().replace(/^["']|["']$/g, '');
  return key || fallback;
}

// Used in Server Components, Server Actions, and Route Handlers.
// Reads the session from cookies and respects RLS.
export function createClient() {
  const cookieStore = cookies();

  const supabaseUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = cleanKey(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    'placeholder'
  );

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component with no request context — safe to ignore
        }
      },
    },
  });
}

// Service-role client — bypasses RLS. Only ever import this in server-only
// code (Server Actions / Route Handlers).
export function createServiceRoleClient() {
  const supabaseUrl = cleanUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const serviceKey = cleanKey(process.env.SUPABASE_SERVICE_ROLE_KEY, 'placeholder-service-key');

  return createSupabaseClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
