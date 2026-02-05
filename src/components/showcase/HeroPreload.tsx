import React from 'react';
import { getHeroImageUrl, HOME_HERO_IMAGE_PATH } from '@/lib/hero-images';

const HERO_PRELOAD_WIDTH = 1200;
const HERO_PRELOAD_QUALITY = 75;

function getHeroPreloadUrl(heroPath: string): string {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kermitfloor.com';
  const path = heroPath.startsWith('/') ? heroPath : `/${heroPath}`;
  return `${origin}/cdn-cgi/image/width=${HERO_PRELOAD_WIDTH},quality=${HERO_PRELOAD_QUALITY},format=auto${path}`;
}

/**
 * Renders a preload link for the hero image so the browser starts loading it early.
 * Use on the homepage (no pageType) and on every product page (with pageType).
 */
export function HeroPreload({
  pageType,
}: {
  pageType?: string;
}): React.ReactElement | null {
  const heroPath = pageType ? getHeroImageUrl(pageType) : HOME_HERO_IMAGE_PATH;
  if (!heroPath) return null;
  const url = getHeroPreloadUrl(heroPath);
  return (
    <link
      rel="preload"
      as="image"
      href={url}
      fetchPriority="high"
    />
  );
}
