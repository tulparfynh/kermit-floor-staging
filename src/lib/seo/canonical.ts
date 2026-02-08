import type {Metadata} from 'next';
import {pathnames} from '@/navigation';
import {toAbsoluteUrl} from '@/lib/blog/seo';

type AppLocale = 'en' | 'tr';
type AppRouteKey = keyof typeof pathnames;

export function normalizeAppLocale(locale: string): AppLocale {
  return locale === 'tr' ? 'tr' : 'en';
}

function getLocalizedPath(routeKey: AppRouteKey, locale: AppLocale): string {
  const route = pathnames[routeKey] as {en: string; tr: string};
  return route[locale];
}

export function getCanonicalForRoute(routeKey: AppRouteKey, locale: string): string {
  const normalizedLocale = normalizeAppLocale(locale);
  return toAbsoluteUrl(normalizedLocale, getLocalizedPath(routeKey, normalizedLocale));
}

export function getAlternatesForRoute(routeKey: AppRouteKey, locale: string): Metadata['alternates'] {
  const normalizedLocale = normalizeAppLocale(locale);
  const enPath = getLocalizedPath(routeKey, 'en');
  const trPath = getLocalizedPath(routeKey, 'tr');

  return {
    canonical: toAbsoluteUrl(normalizedLocale, getLocalizedPath(routeKey, normalizedLocale)),
    languages: {
      en: toAbsoluteUrl('en', enPath),
      tr: toAbsoluteUrl('tr', trPath),
    },
  };
}
