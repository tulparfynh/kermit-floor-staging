import path from 'node:path';
import {access, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import {z} from 'zod';

const BLOG_LOCALES = ['en', 'tr'];
const BLOG_STATUSES = ['draft', 'published'];
const BLOG_SEARCH_INTENTS = ['informational', 'commercial-investigation', 'comparison'];
const BLOG_TARGET_AUDIENCES = ['mixed-b2b', 'installer', 'dealer', 'architect'];
const BLOG_FUNNEL_STAGES = ['awareness', 'consideration', 'decision'];

const ROOT = process.cwd();
const BLOG_TOPICS_ROOT = path.join(ROOT, 'content', 'blog', 'topics');
const OUTPUT_PATH = path.join(ROOT, 'src', 'generated', 'blog-manifest.json');

const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
});

const VIDEO_EXTENSION_PATTERN = /\.(mp4|webm|ogg|mov|m4v)(?:$|\?)/i;

function getVideoMimeType(src) {
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

function parseIsoDate(value, field, filePath) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid ${field} in ${filePath}. Expected YYYY-MM-DD, received "${value}".`);
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf())) {
    throw new Error(`Invalid ${field} in ${filePath}. Received "${value}".`);
  }
  return date;
}

function normalizeTag(value, locale = 'en') {
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

async function ensureFileExists(filePath) {
  try {
    await access(filePath);
  } catch (error) {
    const nodeError = error;
    if (nodeError?.code === 'ENOENT') {
      throw new Error(`Missing required blog locale file: ${filePath}`);
    }
    throw error;
  }
}

async function parseTopicLocaleFile(topicId, locale) {
  const filePath = path.join(BLOG_TOPICS_ROOT, topicId, `${locale}.mdx`);
  await ensureFileExists(filePath);
  const raw = await readFile(filePath, 'utf8');
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
    publishedAtTimestamp: publishedAtDate.getTime(),
    updatedAtTimestamp: updatedAtDate.getTime(),
  };
}

async function readTopicDirectories() {
  try {
    const entries = await readdir(BLOG_TOPICS_ROOT, {withFileTypes: true});
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    const nodeError = error;
    if (nodeError?.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function main() {
  const topicIds = await readTopicDirectories();
  const topics = [];

  for (const topicId of topicIds) {
    const [en, tr] = await Promise.all([
      parseTopicLocaleFile(topicId, 'en'),
      parseTopicLocaleFile(topicId, 'tr'),
    ]);
    topics.push({topicId, en, tr});
  }

  const manifest = {
    schemaVersion: 1,
    topics,
  };

  await mkdir(path.dirname(OUTPUT_PATH), {recursive: true});
  await writeFile(OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote blog manifest with ${topics.length} topic(s) to src/generated/blog-manifest.json`);
}

main().catch((error) => {
  console.error('generate-blog-manifest failed:', error);
  process.exit(1);
});
