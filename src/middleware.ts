import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { response, user } = await updateSession(request);

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isRealSupabase =
    rawUrl.length > 0 &&
    !rawUrl.includes('placeholder') &&
    (rawUrl.includes('supabase.co') || rawUrl.startsWith('http'));

  let role: string | null = null;

  if (isRealSupabase) {
    if (user) {
      role = (user.app_metadata?.role || user.user_metadata?.role || 'customer').toLowerCase();
      // If user metadata doesn't specify role, check cookie fallback only if authenticated
      if (!role || role === 'customer') {
        const cookieRole = request.cookies.get('rootwills_role')?.value;
        if (cookieRole && ['admin', 'sales', 'driver', 'customer'].includes(cookieRole)) {
          // If the authenticated user is staff/admin domain, accept staff role
          if (user.email?.includes('rootwills.co.uk') || user.email?.includes('admin')) {
            role = cookieRole;
          }
        }
      }
    }
  } else {
    // Offline / Demo Sandbox Mode (When Supabase is not configured)
    role = request.cookies.get('rootwills_role')?.value || 'customer';
  }

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
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    if (isRealSupabase && !user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

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

