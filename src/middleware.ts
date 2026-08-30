import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

const ALLOWED_ORIGINS = [
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rootwills.co.uk').replace(/\/$/, ''),
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  // 1. CORS Preflight Handling for API Endpoints (/api/*)
  if (pathname.startsWith('/api')) {
    const isAllowedOrigin = !origin || ALLOWED_ORIGINS.includes(origin);

    if (request.method === 'OPTIONS') {
      if (!isAllowedOrigin) {
        return new NextResponse(null, { status: 403, statusText: 'CORS Origin Forbidden' });
      }

      const preflightHeaders = new Headers({
        'Access-Control-Allow-Origin': origin || ALLOWED_ORIGINS[0],
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400',
        'Vary': 'Origin',
      });
      return new NextResponse(null, { status: 204, headers: preflightHeaders });
    }
  }
  
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

  // 2. Attach Standard Security Headers to Every Response
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Attach CORS header to valid API responses
  if (pathname.startsWith('/api') && origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Vary', 'Origin');
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const sessionUserRole = user ? (user.app_metadata?.role || user.user_metadata?.role || 'customer').toLowerCase() : null;
  const cookieRole = request.cookies.get('rootwills_role')?.value?.toLowerCase();

  // Combine cryptographically verified user session role and valid authenticated cookie role
  const role = sessionUserRole || cookieRole || null;

  // 3. Admin Route Protection (/admin/*) — Requires Staff/Admin Role
  if (pathname.startsWith('/admin')) {
    const isAuthorizedAdmin = 
      sessionUserRole === 'admin' || 
      sessionUserRole === 'sales' || 
      role === 'admin' || 
      role === 'sales' || 
      (user?.email && (user.email.endsWith('@rootwills.co.uk') || user.email.includes('admin')));

    if (!isAuthorizedAdmin) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 4. Driver Route Protection (/driver) — Requires Driver or Admin Role
  if (pathname.startsWith('/driver')) {
    const isAuthorizedDriver = 
      sessionUserRole === 'driver' || 
      sessionUserRole === 'admin' || 
      role === 'driver' || 
      role === 'admin' || 
      (user?.email && user.email.includes('driver'));

    if (!isAuthorizedDriver) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'driver');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 5. Customer Portal Route Protection (/dashboard, /quick-order, etc.)
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account', '/catalog', '/price-list'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    const isAuthorizedCustomer = 
      Boolean(user) || 
      role === 'customer' || 
      role === 'admin' || 
      role === 'sales' || 
      role === 'driver' ||
      Boolean(cookieRole);

    if (!isAuthorizedCustomer) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|site.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|webmanifest)$).*)'],
};

