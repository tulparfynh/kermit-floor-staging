'use client';

/**
 * Custom Next.js image loader that sends local images through Cloudflare Image Resizing.
 * Remote URLs (e.g. Unsplash, storage) are returned unchanged.
 * @see https://developers.cloudflare.com/images/transform-images/transform-via-url/
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
  const params = [
    `width=${width}`,
    `quality=${quality ?? 75}`,
    'format=auto',
  ].join(',');
  const origin = getOrigin();
  return `${origin}/cdn-cgi/image/${params}${path}`;
}
