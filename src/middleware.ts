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
      return NextResponse.rewrite(url);
    }

    // On rootwillsdirect.co.uk, gate order pad & catalogue behind verified trade credentials
    if (pathname.startsWith('/products') || pathname.startsWith('/checkout')) {
      const isAuthedCookie = request.cookies.get('rootwills_auth')?.value === 'true';
      if (!isAuthedCookie) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = '/direct';
        loginUrl.searchParams.set('redirect', pathname + (search || ''));
        loginUrl.searchParams.set('auth_required', '1');
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // On main web (rootwills.co.uk), allow public browsing of products & marketing pages
  return NextResponse.next();
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
