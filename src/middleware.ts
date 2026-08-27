import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  let user = null;
  try {
    const sessionRes = await updateSession(request);
    response = sessionRes.response;
    user = sessionRes.user;
  } catch (e) {
    // If Supabase session check throws, proceed to cookie verification
  }

  const cookieRole = request.cookies.get('rootwills_role')?.value;
  const role = cookieRole || (user ? (user.app_metadata?.role || user.user_metadata?.role || 'customer').toLowerCase() : null);

  // 1. Admin Route Protection (/admin/*) — Requires Staff/Admin Role
  if (pathname.startsWith('/admin')) {
    const isAuthorizedAdmin = role === 'admin' || role === 'sales';
    if (!isAuthorizedAdmin) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Driver Route Protection (/driver) — Requires Driver or Admin Role
  if (pathname.startsWith('/driver')) {
    const isAuthorizedDriver = role === 'driver' || role === 'admin';
    if (!isAuthorizedDriver) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'driver');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Customer Portal Route Protection (/dashboard, /quick-order, etc.)
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account', '/catalog', '/price-list'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    const isAuthorizedCustomer = role === 'customer' || role === 'admin' || role === 'sales';
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
