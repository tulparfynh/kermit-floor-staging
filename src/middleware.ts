import createMiddleware from 'next-intl/middleware';
import {locales, pathnames, localePrefix, defaultLocale} from './navigation';
 
export default createMiddleware({
  defaultLocale,
  locales,
  pathnames,
  localePrefix
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(tr|en)/:path*']
};
