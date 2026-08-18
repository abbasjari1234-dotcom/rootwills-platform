import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('rootwills_role')?.value;

  const { response } = await updateSession(request);

  // 1. Admin Route Protection (/admin/*) — Requires Staff/Admin Role
  if (pathname.startsWith('/admin')) {
    const isAuthorizedAdmin = roleCookie === 'admin' || roleCookie === 'sales';
    if (!isAuthorizedAdmin) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Driver Route Protection (/driver) — Requires Driver or Admin Role
  if (pathname.startsWith('/driver')) {
    const isAuthorizedDriver = roleCookie === 'driver' || roleCookie === 'admin';
    if (!isAuthorizedDriver) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'driver');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Customer Portal Route Protection (/dashboard, /quick-order, etc.)
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    const isAuthorizedCustomer = roleCookie === 'customer' || roleCookie === 'admin' || roleCookie === 'sales';
    if (!isAuthorizedCustomer) {
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
