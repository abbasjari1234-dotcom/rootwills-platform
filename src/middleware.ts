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

  // 2. Attach Standard Security & Compression Headers to Every Response
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Vary', 'Accept-Encoding');

  // Attach CORS header to valid API responses
  if (pathname.startsWith('/api') && origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Vary', 'Origin, Accept-Encoding');
  }

  const verifiedRole = user
    ? (user.app_metadata?.role || user.user_metadata?.role || 'customer').toLowerCase()
    : null;

  // 3. Admin Route Protection (/admin/*) — Requires Authenticated Staff/Admin Role
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'admin');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isAuthorizedAdmin = verifiedRole === 'admin' || verifiedRole === 'sales';
    if (!isAuthorizedAdmin) {
      // Authenticated but unauthorized (e.g. customer trying to access staff CRM)
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 4. Driver Route Protection (/driver) — Requires Authenticated Driver or Admin Role
  if (pathname.startsWith('/driver')) {
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('role', 'driver');
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const isAuthorizedDriver = verifiedRole === 'driver' || verifiedRole === 'admin';
    if (!isAuthorizedDriver) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 5. Customer Portal Route Protection (/dashboard, /quick-order, etc.)
  const portalRoutes = ['/dashboard', '/quick-order', '/orders', '/invoices', '/standing-orders', '/account', '/catalog', '/price-list'];
  const isPortalRoute = portalRoutes.some((route) => pathname.startsWith(route));

  if (isPortalRoute) {
    if (!user) {
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

