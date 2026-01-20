
import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const locales = ['en', 'tr'] as const;
export const defaultLocale = 'en';

export const pathnames = {
  '/resources': {
    en: '/resources',
    tr: '/kaynaklar'
  },
  '/about': {
    en: '/about',
    tr: '/hakkimizda'
  },
   '/contact': {
    en: '/contact',
    tr: '/iletisim'
  },
  '/spc-wall-panels': {
    en: '/spc-wall-panels',
    tr: '/spc-duvar-panelleri',
  },
  '/spc-3d-wall-panels-model-a': {
    en: '/spc-3d-wall-panels-model-a',
    tr: '/spc-3d-duvar-panelleri-model-a',
  },
  '/spc-3d-wall-panels-model-b': {
    en: '/spc-3d-wall-panels-model-b',
    tr: '/spc-3d-duvar-panelleri-model-b',
  },
  '/spc-parquet-natural-collection': {
    en: '/spc-parquet-natural-collection',
    tr: '/spc-parke-natural-koleksiyonu',
  },
  '/spc-parquet-stone-collection': {
    en: '/spc-parquet-stone-collection',
    tr: '/spc-parke-tas-koleksiyonu',
  },
  '/full-natural-collection': {
    en: '/full-natural-collection',
    tr: '/tam-dogal-koleksiyon',
  },
  '/skirting-boards/alpha-140-mm-skirting-board': {
    en: '/skirting-boards/alpha-140-mm-skirting-board',
    tr: '/supurgelikler/alpha-140-mm-supurgelik',
  },
  '/skirting-boards/berlin-100-mm-skirting-board': {
    en: '/skirting-boards/berlin-100-mm-skirting-board',
    tr: '/supurgelikler/berlin-100-mm-supurgelik',
  },
  '/skirting-boards/elite-100-mm-skirting-board': {
    en: '/skirting-boards/elite-100-mm-skirting-board',
    tr: '/supurgelikler/elite-100-mm-supurgelik',
  },
  '/skirting-boards/moderna-100-mm-skirting-board': {
    en: '/skirting-boards/moderna-100-mm-skirting-board',
    tr: '/supurgelikler/moderna-100-mm-supurgelik',
  },
  '/skirting-boards/optima-60-mm-skirting-board': {
    en: '/skirting-boards/optima-60-mm-skirting-board',
    tr: '/supurgelikler/optima-60-mm-supurgelik',
  },
  '/skirting-boards/optima-90-mm-skirting-board': {
    en: '/skirting-boards/optima-90-mm-skirting-board',
    tr: '/supurgelikler/optima-90-mm-supurgelik',
  },
  '/skirting-boards/solid-80-mm-skirting-board': {
    en: '/skirting-boards/solid-80-mm-skirting-board',
    tr: '/supurgelikler/solid-80-mm-supurgelik',
  },
  '/skirting-boards/x-line-100-mm-skirting-board': {
    en: '/skirting-boards/x-line-100-mm-skirting-board',
    tr: '/supurgelikler/x-line-100-mm-supurgelik',
  }
} satisfies Pathnames<typeof locales>;

// Use `'as-needed'` to only add a prefix for the non-default locale (`tr`).
export const localePrefix = 'as-needed' as const;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});


export type AppPathnames = keyof typeof pathnames;
