import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder')) {
    return { response, user: null };
  }

  const hasAuthCookie = request.cookies.getAll().some(
    (c) => c.name.startsWith('sb-') || c.name.includes('auth-token')
  );
  if (!hasAuthCookie) {
    return { response, user: null };
  }

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({ request });
            response.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            request.cookies.set({ name, value: '', ...options, maxAge: 0 });
            response = NextResponse.next({ request });
            response.cookies.set({ name, value: '', ...options, maxAge: 0 });
          },
        },
      }
    );

    const userPromise = supabase.auth.getUser();
    const timeoutPromise = new Promise<{ data: { user: null } }>((resolve) =>
      setTimeout(() => resolve({ data: { user: null } }), 800)
    );

    const result = await Promise.race([userPromise, timeoutPromise]);
    const user = result?.data?.user ?? null;
    return { response, user };
  } catch {
    return { response, user: null };
  }
}
