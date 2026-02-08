import {cache} from 'react';
import blogManifest from '@/generated/blog-manifest.json';
import type {
  BlogLocale,
  BlogManifest,
  BlogManifestPost,
  BlogPost,
  BlogPostPair,
  BlogTagIndex,
} from './types';

const BLOG_MANIFEST_SCHEMA_VERSION = 1;

const parsedManifest = blogManifest as BlogManifest;

function normalizeTag(value: string, locale: BlogLocale = 'en'): string {
  const lowerCaseLocale = locale === 'tr' ? 'tr-TR' : 'en-US';
  return value
    .trim()
    .toLocaleLowerCase(lowerCaseLocale)
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseTimestamp(value: number, field: string, topicId: string, locale: BlogLocale): Date {
  if (!Number.isFinite(value)) {
    throw new Error(`Invalid ${field} timestamp for topic "${topicId}" locale "${locale}".`);
  }
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid ${field} timestamp for topic "${topicId}" locale "${locale}".`);
  }
  return date;
}

function toBlogPost(post: BlogManifestPost): BlogPost {
  const {publishedAtTimestamp, updatedAtTimestamp, ...rest} = post;
  const publishedAtDate = parseTimestamp(publishedAtTimestamp, 'publishedAt', post.topicId, post.locale);
  const updatedAtDate = parseTimestamp(updatedAtTimestamp, 'updatedAt', post.topicId, post.locale);
  if (updatedAtDate.getTime() < publishedAtDate.getTime()) {
    throw new Error(
      `Invalid manifest dates for topic "${post.topicId}" locale "${post.locale}". updatedAt must be the same day or after publishedAt.`,
    );
  }

  return {
    ...rest,
    publishedAtDate,
    updatedAtDate,
  };
}

function sortPostsDescending(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => b.publishedAtDate.getTime() - a.publishedAtDate.getTime());
}

const loadAllBlogPostPairs = cache(async (): Promise<BlogPostPair[]> => {
  if (parsedManifest.schemaVersion !== BLOG_MANIFEST_SCHEMA_VERSION) {
    throw new Error(
      `Unsupported blog manifest schema version "${parsedManifest.schemaVersion}". Expected "${BLOG_MANIFEST_SCHEMA_VERSION}".`,
    );
  }

  const pairs = parsedManifest.topics.map((pair) => {
    const en = toBlogPost(pair.en);
    const tr = toBlogPost(pair.tr);

    if (pair.topicId !== en.topicId || pair.topicId !== tr.topicId) {
      throw new Error(`Manifest topicId mismatch for "${pair.topicId}".`);
    }

    return {
      topicId: pair.topicId,
      en,
      tr,
    };
  });

  return pairs.sort((a, b) => {
    const aNewest = Math.max(a.en.publishedAtDate.getTime(), a.tr.publishedAtDate.getTime());
    const bNewest = Math.max(b.en.publishedAtDate.getTime(), b.tr.publishedAtDate.getTime());
    return bNewest - aNewest;
  });
});

export async function getAllBlogPostPairs(): Promise<BlogPostPair[]> {
  return loadAllBlogPostPairs();
}

export async function getPublishedBlogPostPairs(): Promise<BlogPostPair[]> {
  const pairs = await getAllBlogPostPairs();
  return pairs.filter((pair) => pair.en.status === 'published' && pair.tr.status === 'published');
}

export async function getPublishedBlogPostsByLocale(locale: BlogLocale): Promise<BlogPost[]> {
  const pairs = await getPublishedBlogPostPairs();
  return sortPostsDescending(pairs.map((pair) => pair[locale]));
}

export async function getPublishedBlogPostBySlug(locale: BlogLocale, slug: string) {
  const pairs = await getPublishedBlogPostPairs();
  const pair = pairs.find((entry) => entry[locale].slug === slug);
  if (!pair) {
    return null;
  }
  const alternateLocale: BlogLocale = locale === 'en' ? 'tr' : 'en';
  return {
    post: pair[locale],
    pair,
    alternate: pair[alternateLocale],
  };
}

export async function getRelatedPublishedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPost[]> {
  const posts = await getPublishedBlogPostsByLocale(post.locale);
  const tagSet = new Set(post.tags);

  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const sharedTagCount = candidate.tags.filter((tag) => tagSet.has(tag)).length;
      return {candidate, sharedTagCount};
    })
    .filter((entry) => entry.sharedTagCount > 0)
    .sort((a, b) => {
      if (b.sharedTagCount !== a.sharedTagCount) {
        return b.sharedTagCount - a.sharedTagCount;
      }
      return b.candidate.publishedAtDate.getTime() - a.candidate.publishedAtDate.getTime();
    })
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export async function getPublishedBlogTagIndex(locale: BlogLocale): Promise<BlogTagIndex> {
  const posts = await getPublishedBlogPostsByLocale(locale);
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({tag, count}))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.tag.localeCompare(b.tag, locale === 'tr' ? 'tr-TR' : 'en-US');
    });
}

export async function getPublishedBlogPostsByTag(locale: BlogLocale, tag: string): Promise<BlogPost[]> {
  let decodedTag = tag;
  try {
    decodedTag = decodeURIComponent(tag);
  } catch {
    decodedTag = tag;
  }
  const normalizedTag = normalizeTag(decodedTag, locale);
  if (!normalizedTag) {
    return [];
  }
  const posts = await getPublishedBlogPostsByLocale(locale);
  return posts.filter((post) => post.tags.includes(normalizedTag));
}

export async function getPublishedBlogTagSlugs(locale: BlogLocale): Promise<string[]> {
  const posts = await getPublishedBlogPostsByLocale(locale);
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b, locale === 'tr' ? 'tr-TR' : 'en-US'));
}
