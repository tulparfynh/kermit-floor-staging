import {NextRequest, NextResponse} from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {locales, pathnames, localePrefix, defaultLocale} from './navigation';

const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix,
});

export function middleware(request: NextRequest) {
  const {host} = request.nextUrl;

  if (host.startsWith('www.')) {
    const newHost = host.slice(4);
    const newUrl = new URL(request.url);
    newUrl.host = newHost;
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  // If stale cached pages still request /_next/image, bypass Cloudflare transforms
  // and serve the local asset directly.
  if (request.nextUrl.pathname === '/_next/image') {
    const imagePath = request.nextUrl.searchParams.get('url');
    if (imagePath && imagePath.startsWith('/') && !imagePath.startsWith('//')) {
      const directAssetUrl = new URL(imagePath, request.url);
      return NextResponse.redirect(directAssetUrl, 307);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(tr|en)/:path*',
    '/_next/image',
  ],
};
