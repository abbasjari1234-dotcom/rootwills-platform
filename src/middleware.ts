import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase() || '';
  const { pathname } = request.nextUrl;

  // Detect if accessing via Rootwills Direct domain or subdomain
  const isDirectDomain =
    host.includes('rootwillsdirect') ||
    host.startsWith('direct.');

  if (isDirectDomain) {
    // When landing on root of rootwillsdirect.co.uk, seamlessly rewrite to /products (Wholesale Ordering Catalog)
    if (pathname === '/' || pathname === '') {
      const url = request.nextUrl.clone();
      url.pathname = '/products';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, favicon, and static files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|textures|manifest.webmanifest|robots.txt|sitemap.xml).*)',
  ],
};
