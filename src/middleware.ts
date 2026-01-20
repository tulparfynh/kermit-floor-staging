import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import {locales, pathnames, localePrefix, defaultLocale} from './navigation';

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix
});

export default function middleware(request: NextRequest) {
  const hostname = request.nextUrl.hostname;
  const pathname = request.nextUrl.pathname;
  const productionHosts = ['kermitfloor.com', 'www.kermitfloor.com'];
  const isProduction = productionHosts.includes(hostname);

  if (!isProduction) {
    // For non-production, serve a restrictive robots.txt
    if (pathname === '/robots.txt') {
      return new Response('User-agent: *\nDisallow: /', {
        headers: { 'Content-Type': 'text/plain' },
      });
    }
    
    // For all other pages on non-production, run i18n and add noindex header
    const response = intlMiddleware(request);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }

  // For production, just run the i18n middleware
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for static files and API routes.
  // We explicitly include /robots.txt so the middleware can handle it.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)',
    '/robots.txt',
  ]
};
