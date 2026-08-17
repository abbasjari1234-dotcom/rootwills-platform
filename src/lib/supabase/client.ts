import { createBrowserClient } from '@supabase/ssr';

// Used in Client Components. Respects RLS — safe to expose to the browser.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
