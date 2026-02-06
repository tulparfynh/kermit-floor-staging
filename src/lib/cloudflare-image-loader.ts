'use client';

/**
 * Custom Next.js image loader for OpenNext/Cloudflare.
 * Returns direct image URLs so the Worker serves images from assets (no /_next/image).
 * Remote URLs (e.g. Unsplash) are returned unchanged.
 */

function getOrigin(): string {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:9002';
}

export default function cloudflareImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith('http')) {
    return src;
  }
  const path = src.startsWith('/') ? src : `/${src}`;
  const origin = getOrigin();
  return `${origin}${path}`;
}
