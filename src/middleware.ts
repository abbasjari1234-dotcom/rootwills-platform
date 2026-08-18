import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const roleCookie = request.cookies.get('rootwills_role')?.value;
  const { response, user } = await updateSession(request);

  const isRealSupabaseActive =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');

  // 1. Admin Route Protection (/admin/*)
  if (pathname.startsWith('/admin')) {
    if (isRealSupabaseActive) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('role', 'admin');
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } else {
      // Demo / Local development gate
      if (roleCookie !== 'admin' && roleCookie !== 'sales') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('role', 'admin');
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 2. Driver Route Protection (/driver)
  if (pathname.startsWith('/driver')) {
    if (isRealSupabaseActive) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('role', 'driver');
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } else {
      if (roleCookie !== 'driver' && roleCookie !== 'admin') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('role', 'driver');
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // 3. Customer Portal Route Protection
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    if (isRealSupabaseActive) {
      if (!user) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    } else {
      if (roleCookie === 'guest') {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
