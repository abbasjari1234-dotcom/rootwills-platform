import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() || '';
  const { pathname, search } = request.nextUrl;

  // Detect if accessing via Rootwills Direct domain or subdomain (e.g. rootwillsdirect.co.uk)
  const isDirectDomain =
    host.includes('rootwillsdirect') ||
    host.startsWith('direct.');

  if (isDirectDomain) {
    // When landing on root of rootwillsdirect.co.uk, seamlessly rewrite to /direct (Dedicated B2B Trade Login Portal)
    if (pathname === '/' || pathname === '') {
      const url = request.nextUrl.clone();
      url.pathname = '/direct';
      const rewriteResponse = NextResponse.rewrite(url);
      rewriteResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return rewriteResponse;
    }

    // On rootwillsdirect.co.uk, gate order pad & catalogue behind verified trade credentials
    if (pathname.startsWith('/products') || pathname.startsWith('/checkout')) {
      const isAuthedCookie = request.cookies.get('rootwills_auth')?.value === 'true';
      if (!isAuthedCookie) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/direct';
        loginUrl.searchParams.set('redirect', pathname + (search || ''));
        loginUrl.searchParams.set('auth_required', '1');
        const redirectResponse = NextResponse.redirect(loginUrl);
        redirectResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
        return redirectResponse;
      }
    }
  }

  // On main web (rootwills.co.uk), allow public browsing of products & marketing pages
  const response = NextResponse.next();

  // Strict Enterprise Security Headers across all platform endpoints
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (
    isDirectDomain ||
    pathname.startsWith('/ops') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/direct') ||
    pathname.startsWith('/login')
  ) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, favicon, textures, and static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|textures|manifest.webmanifest|robots.txt|sitemap.xml).*)',
  ],
};
