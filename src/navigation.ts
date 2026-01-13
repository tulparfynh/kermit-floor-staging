import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en';

export const pathnames = {
  '/spc-wall-panels': {
    en: '/spc-wall-panels',
    tr: '/spc-duvar-panelleri',
  },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


export type AppPathnames = keyof typeof pathnames;
