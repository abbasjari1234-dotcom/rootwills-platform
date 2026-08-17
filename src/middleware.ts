import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for Admin & Operations Route Protection
  if (pathname.startsWith('/admin')) {
    const roleCookie = request.cookies.get('rootwills_role')?.value;
    const authSessionCookie = request.cookies.get('sb-access-token')?.value || request.cookies.get('supabase-auth-token')?.value;

    // If not authenticated as admin/staff, redirect to the staff login gate
    if (roleCookie !== 'admin' && roleCookie !== 'sales' && !authSessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Refresh Supabase session if configured
  return updateSession(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
