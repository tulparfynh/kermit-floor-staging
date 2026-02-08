import type {BlogLocale, BlogPost, BlogPostPair} from './types';

const DEFAULT_SITE_URL = 'https://kermitfloor.com';

function trimTrailingSlash(value: string): string {
  return value.endsWith('/') ? value.slice(0, -1) : value;
}

function ensureLeadingSlash(value: string): string {
  return value.startsWith('/') ? value : `/${value}`;
}

export function getSiteUrl(): string {
  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!envSiteUrl) {
    return DEFAULT_SITE_URL;
  }
  return trimTrailingSlash(envSiteUrl);
}

export function toLocalePath(locale: BlogLocale, pathname: string): string {
  const normalizedPath = ensureLeadingSlash(pathname);
  if (locale === 'en') {
    return normalizedPath;
  }
  if (normalizedPath === '/') {
    return '/tr';
  }
  return `/tr${normalizedPath}`;
}

export function toAbsoluteUrl(locale: BlogLocale, pathname: string): string {
  return `${getSiteUrl()}${toLocalePath(locale, pathname)}`;
}

export function getBlogListPath(): string {
  return '/blog';
}

export function getBlogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function getBlogTagPath(tag: string): string {
  return `/blog/tag/${encodeURIComponent(tag)}`;
}

export function getPairLocalePath(pair: BlogPostPair, locale: BlogLocale): string {
  return getBlogPostPath(pair[locale].slug);
}

export function getArticleJsonLd(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [toAbsoluteUrl(post.locale, post.coverImage)],
    datePublished: `${post.publishedAt}T00:00:00Z`,
    dateModified: `${post.updatedAt}T00:00:00Z`,
    author: {
      '@type': 'Person',
      name: post.authorName,
    },
    inLanguage: post.locale,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}
