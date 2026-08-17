import { createBrowserClient } from '@supabase/ssr';

// Used in Client Components. Respects RLS — safe to expose to the browser.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
  return createBrowserClient(url, anonKey);
}
