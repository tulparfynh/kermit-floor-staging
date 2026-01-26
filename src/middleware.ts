import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import {locales, pathnames, localePrefix, defaultLocale} from './navigation';

// Create the i18n middleware to be used after the redirect logic
const intlMiddleware = createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix
});

export function middleware(request: NextRequest) {
  const { host } = request.nextUrl;

  // Check if the host starts with 'www.'
  if (host.startsWith('www.')) {
    // Create new host by removing 'www.'
    const newHost = host.slice(4);
    // Clone the URL to modify it
    const newUrl = new URL(request.url);
    newUrl.host = newHost;
    
    // Return a permanent redirect (301) response
    return NextResponse.redirect(newUrl.toString(), 301);
  }

  // If not a 'www' request, pass it to the i18n middleware
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Match all pathnames starting with a locale (e.g. `/tr/about`)
    '/(tr|en)/:path*'
  ]
};
