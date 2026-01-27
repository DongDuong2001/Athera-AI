import { verifyToken, getSessionToken } from '@/utils/auth/auth-edge';
import { type NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/', '/about', '/contact', '/services'];
const authPaths = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { origin, pathname, search, searchParams } = request.nextUrl;

  // Get session token from cookie
  const cookieHeader = request.headers.get('cookie');
  const sessionToken = getSessionToken(cookieHeader);

  // Verify token if exists
  let user = null;
  if (sessionToken) {
    user = await verifyToken(sessionToken);
  }

  // Allow public paths without authentication
  if (publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return NextResponse.next();
  }

  // If user is logged in and tries to access auth pages
  if (user && authPaths.some((path) => pathname.startsWith(path))) {
    const returnUrl = decodeURIComponent(searchParams.get('returnUrl') || '/');
    return NextResponse.redirect(new URL(returnUrl, origin));
  }

  // If user is not logged in and tries to access protected routes
  if (
    !user &&
    !authPaths.some((path) => pathname.startsWith(path))
  ) {
    const returnUrl = encodeURIComponent(pathname + search);
    return NextResponse.redirect(
      new URL(`/sign-in?returnUrl=${returnUrl}`, origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (SEO)
     * - sitemap.xml (SEO)
     * - site.webmanifest (SEO)
     * - monitoring (analytics)
     * Excludes files with the following extensions for static assets:
     * - svg
     * - png
     * - jpg
     * - jpeg
     * - pdf
     * - gif
     * - webp
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|site.webmanifest|monitoring|api|.*\\.(?:svg|png|jpg|jpeg|pdf|gif|webp)$).*)',
  ],
};
