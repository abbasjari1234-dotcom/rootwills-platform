import { createBrowserClient } from '@supabase/ssr';

// Used in Client Components. Respects RLS — safe to expose to the browser.
export function createClient() {
  let rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  let rawKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    '';

  // Clean quotes, whitespaces, and newlines
  let url = rawUrl.trim().replace(/^["']|["']$/g, '');
  let anonKey = rawKey.trim().replace(/^["']|["']$/g, '');

  if (!url || url.includes('placeholder')) {
    url = 'https://placeholder.supabase.co';
  } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  if (!anonKey) {
    anonKey = 'placeholder';
  }

  return createBrowserClient(url, anonKey);
}
