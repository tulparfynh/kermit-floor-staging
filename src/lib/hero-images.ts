/**
 * Single source of truth for hero image paths and hints.
 * Used by Header, HeroPreload, and homepage so preload and Image stay in sync.
 */

export type HeroPageType =
  | 'spc-wall-panels'
  | 'spc-3d-wall-panels-model-a'
  | 'spc-3d-wall-panels-model-b'
  | 'spc-parquet-natural-collection'
  | 'spc-parquet-stone-collection'
  | 'full-natural-collection'
  | 'skirting-alpha-140-mm'
  | 'skirting-berlin-100-mm'
  | 'skirting-elite-100-mm'
  | 'skirting-moderna-100-mm'
  | 'skirting-optima-60-mm'
  | 'skirting-optima-90-mm'
  | 'skirting-solid-80-mm'
  | 'skirting-x-line-100-mm';

/** Homepage hero image path (used in [locale]/page.tsx). */
export const HOME_HERO_IMAGE_PATH =
  '/images/spc-wall-panels/23048-6/application.jpg';

const HERO_MAP: Record<
  HeroPageType,
  { path: string; hint: string }
> = {
  'spc-3d-wall-panels-model-a': {
    path: '/images/spc-3d-panels-model-a/3D-29115-18/application.jpg',
    hint: 'living room with geometric panels',
  },
  'spc-3d-wall-panels-model-b': {
    path: '/images/spc-3d-panels-model-b/3D-23138-2/application.jpg',
    hint: 'modern interior with wavy panels',
  },
  'spc-wall-panels': {
    path: '/images/spc-wall-panels/23048-6/application.jpg',
    hint: 'modern kitchen with marble panels',
  },
  'spc-parquet-natural-collection': {
    path: '/images/spc-parquet-natural-collection/29098-2/application.jpg',
    hint: 'modern living room with natural oak flooring',
  },
  'spc-parquet-stone-collection': {
    path: '/images/spc-parquet-stone-collection/23054-2/application.jpg',
    hint: 'stylish interior with stone look flooring',
  },
  'full-natural-collection': {
    path: '/images/full-natural-collection/29074-1/application.jpg',
    hint: 'elegant room with wide plank natural flooring',
  },
  'skirting-alpha-140-mm': {
    path: '/images/skirting-boards/alpha-140-mm-skirting-board/1404031/application.jpg',
    hint: 'living room with tall skirting',
  },
  'skirting-berlin-100-mm': {
    path: '/images/skirting-boards/berlin-100-mm-skirting-board/1110031/application.jpg',
    hint: 'interior with modern skirting',
  },
  'skirting-elite-100-mm': {
    path: '/images/skirting-boards/elite-100-mm-skirting-board/E1004031/application.jpg',
    hint: 'room with decorative skirting',
  },
  'skirting-moderna-100-mm': {
    path: '/images/skirting-boards/moderna-100-mm-skirting-board/1004031/application.jpg',
    hint: 'hallway with stylish skirting',
  },
  'skirting-optima-60-mm': {
    path: '/images/skirting-boards/optima-60-mm-skirting-board/0603031/application.jpg',
    hint: 'room with minimal skirting',
  },
  'skirting-optima-90-mm': {
    path: '/images/skirting-boards/optima-90-mm-skirting-board/0704031/application.jpg',
    hint: 'bedroom with medium height skirting',
  },
  'skirting-solid-80-mm': {
    path: '/images/skirting-boards/solid-80-mm-skirting-board/0904031/application.jpg',
    hint: 'office with solid skirting',
  },
  'skirting-x-line-100-mm': {
    path: '/images/skirting-boards/x-line-100-mm-skirting-board/X1004031/application.jpg',
    hint: 'modern room with x-line skirting',
  },
};

export function getHeroImageUrl(pageType: string | undefined): string | null {
  if (!pageType || !(pageType in HERO_MAP)) return null;
  return HERO_MAP[pageType as HeroPageType].path;
}

export function getHeroImageHint(pageType: string | undefined): string | null {
  if (!pageType || !(pageType in HERO_MAP)) return null;
  return HERO_MAP[pageType as HeroPageType].hint;
}
