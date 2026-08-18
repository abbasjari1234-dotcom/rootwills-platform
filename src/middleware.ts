import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('rootwills_role')?.value;
  const authSessionCookie =
    request.cookies.get('sb-access-token')?.value ||
    request.cookies.get('supabase-auth-token')?.value;

  const { response, user } = await updateSession(request);

  // 1. Admin Route Protection (/admin/*)
  if (pathname.startsWith('/admin')) {
    const isAuthorized = roleCookie === 'admin' || roleCookie === 'sales' || Boolean(user);
    if (!isAuthorized) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Driver Route Protection (/driver)
  if (pathname.startsWith('/driver')) {
    const isAuthorized = roleCookie === 'driver' || roleCookie === 'admin' || Boolean(user);
    if (!isAuthorized) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'driver');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Customer Portal Route Protection
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    const isAuthorized = roleCookie === 'customer' || roleCookie === 'admin' || Boolean(user) || Boolean(authSessionCookie);
    if (!isAuthorized) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
