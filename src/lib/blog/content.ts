import {cache} from 'react';
import path from 'node:path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import {z} from 'zod';
import {
  BLOG_FUNNEL_STAGES,
  BLOG_LOCALES,
  BLOG_SEARCH_INTENTS,
  BLOG_STATUSES,
  BLOG_TARGET_AUDIENCES,
  type BlogLocale,
  type BlogPost,
  type BlogPostPair,
  type BlogTagIndex,
} from './types';

type FsPromisesModule = typeof import('node:fs/promises');

let fsPromisesModulePromise: Promise<FsPromisesModule | null> | null = null;

function getBlogTopicsRoot(): string {
  const cwd =
    typeof process !== 'undefined' && typeof process.cwd === 'function'
      ? process.cwd()
      : '.';
  return path.join(cwd, 'content', 'blog', 'topics');
}

async function getFsPromisesModule(): Promise<FsPromisesModule | null> {
  if (!fsPromisesModulePromise) {
    fsPromisesModulePromise = import('node:fs/promises').catch((error: unknown) => {
      console.error('Unable to load node:fs/promises for blog content.', error);
      return null;
    });
  }
  return fsPromisesModulePromise;
}

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

const VIDEO_EXTENSION_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(?:$|\?)/i;

function getVideoMimeType(src: string): string {
  const normalized = src.toLowerCase();
  if (normalized.includes('.webm')) {
    return 'video/webm';
  }
  if (normalized.includes('.ogg')) {
    return 'video/ogg';
  }
  if (normalized.includes('.mov')) {
    return 'video/quicktime';
  }
  return 'video/mp4';
}

const defaultImageRenderer =
  markdown.renderer.rules.image ??
  ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const src = token.attrGet('src') ?? '';
  if (!VIDEO_EXTENSION_PATTERN.test(src)) {
    return defaultImageRenderer(tokens, idx, options, env, self);
  }

  const title = token.attrGet('title') ?? token.content ?? 'Blog video';
  const escapedSrc = markdown.utils.escapeHtml(src);
  const escapedTitle = markdown.utils.escapeHtml(title);
  const escapedMimeType = markdown.utils.escapeHtml(getVideoMimeType(src));

  return `<video controls preload="metadata" playsinline aria-label="${escapedTitle}"><source src="${escapedSrc}" type="${escapedMimeType}" />Your browser does not support the video tag.</video>`;
};

const frontmatterSchema = z
  .object({
    topicId: z.string().min(1),
    locale: z.enum(BLOG_LOCALES),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    description: z.string().min(1),
    excerpt: z.string().min(1),
    primaryKeyword: z.string().min(1),
    secondaryKeywords: z.array(z.string().min(1)).min(1),
    tags: z.array(z.string().min(1)).min(1),
    publishedAt: z.string().min(1),
    updatedAt: z.string().min(1),
    status: z.enum(BLOG_STATUSES),
    coverImage: z.string().startsWith('/'),
    coverImageAlt: z.string().min(1),
    authorName: z.string().min(1),
    ctaPath: z.string().optional(),
    searchIntent: z.enum(BLOG_SEARCH_INTENTS),
    targetAudience: z.enum(BLOG_TARGET_AUDIENCES),
    funnelStage: z.enum(BLOG_FUNNEL_STAGES),
    sourceUrls: z.array(z.string().min(1)).min(1),
  })
  .strict();

function parseIsoDate(value: string, field: string, filePath: string): Date {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ${field} in ${filePath}. Expected YYYY-MM-DD, received "${value}".`);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid ${field} in ${filePath}. Received "${value}".`);
  }
  return date;
}

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

function sortPostsDescending(posts: BlogPost[]): BlogPost[] {
  return posts.sort((a, b) => b.publishedAtDate.getTime() - a.publishedAtDate.getTime());
}

async function readTopicDirectories(): Promise<string[]> {
  const fsPromises = await getFsPromisesModule();
  if (!fsPromises) {
    return [];
  }

  try {
    const entries = await fsPromises.readdir(getBlogTopicsRoot(), {withFileTypes: true});
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function parseTopicLocaleFile(topicId: string, locale: BlogLocale): Promise<BlogPost> {
  const fsPromises = await getFsPromisesModule();
  if (!fsPromises) {
    throw new Error('Blog filesystem access is unavailable in this runtime.');
  }

  const filePath = path.join(getBlogTopicsRoot(), topicId, `${locale}.mdx`);
  const raw = await fsPromises.readFile(filePath, 'utf8');
  const parsed = matter(raw);
  const frontmatter = frontmatterSchema.parse(parsed.data);

  if (frontmatter.locale !== locale) {
    throw new Error(`Locale mismatch in ${filePath}. Expected "${locale}", received "${frontmatter.locale}".`);
  }
  if (frontmatter.topicId !== topicId) {
    throw new Error(`topicId mismatch in ${filePath}. Expected "${topicId}", received "${frontmatter.topicId}".`);
  }

  const publishedAtDate = parseIsoDate(frontmatter.publishedAt, 'publishedAt', filePath);
  const updatedAtDate = parseIsoDate(frontmatter.updatedAt, 'updatedAt', filePath);
  if (updatedAtDate.getTime() < publishedAtDate.getTime()) {
    throw new Error(`Invalid dates in ${filePath}. updatedAt must be the same day or after publishedAt.`);
  }

  const normalizedTags = Array.from(new Set(frontmatter.tags.map((tag) => normalizeTag(tag, locale)).filter(Boolean)));
  if (normalizedTags.length === 0) {
    throw new Error(`Invalid tags in ${filePath}. Provide at least one valid tag.`);
  }

  const content = parsed.content.trim();
  const contentHtml = markdown.render(content);

  return {
    ...frontmatter,
    tags: normalizedTags,
    path: `/blog/${frontmatter.slug}`,
    content,
    contentHtml,
    publishedAtDate,
    updatedAtDate,
  };
}

const loadAllBlogPostPairs = cache(async (): Promise<BlogPostPair[]> => {
  try {
    const topicIds = await readTopicDirectories();
    const pairs: BlogPostPair[] = [];

    for (const topicId of topicIds) {
      const [en, tr] = await Promise.all([
        parseTopicLocaleFile(topicId, 'en'),
        parseTopicLocaleFile(topicId, 'tr'),
      ]);
      pairs.push({topicId, en, tr});
    }

    return pairs.sort((a, b) => {
      const aNewest = Math.max(a.en.publishedAtDate.getTime(), a.tr.publishedAtDate.getTime());
      const bNewest = Math.max(b.en.publishedAtDate.getTime(), b.tr.publishedAtDate.getTime());
      return bNewest - aNewest;
    });
  } catch (error) {
    // Cloudflare Workers runtime can reject filesystem reads used by repo-managed blog content.
    // Fail safely to avoid site-wide 500 responses on pages that list blog content.
    console.error('Blog content loading failed; returning an empty dataset.', error);
    return [];
  }
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
  return Array.from(tags).sort();
}
