import path from 'node:path';
import {access, readdir, readFile} from 'node:fs/promises';
import matter from 'gray-matter';

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog', 'topics');
const REQUIRED_STRING_FIELDS = [
  'topicId',
  'locale',
  'slug',
  'title',
  'description',
  'excerpt',
  'primaryKeyword',
  'publishedAt',
  'updatedAt',
  'status',
  'coverImage',
  'coverImageAlt',
  'authorName',
];
const SEARCH_INTENTS = ['informational', 'commercial-investigation', 'comparison'];
const TARGET_AUDIENCES = ['mixed-b2b', 'installer', 'dealer', 'architect'];
const FUNNEL_STAGES = ['awareness', 'consideration', 'decision'];

function normalizeTag(value, locale = 'en') {
  const lowerCaseLocale = locale === 'tr' ? 'tr-TR' : 'en-US';
  return String(value)
    .trim()
    .toLocaleLowerCase(lowerCaseLocale)
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.valueOf())) {
    return false;
  }
  return date.toISOString().startsWith(value);
}

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function isValidSourceReference(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return false;
  }

  if (trimmed.includes('://')) {
    return isValidHttpUrl(trimmed);
  }

  return true;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getKnownCtaPaths() {
  const navigationPath = path.join(process.cwd(), 'src', 'navigation.ts');
  const source = await readFile(navigationPath, 'utf8');
  const matches = source.matchAll(/^\s*'([^']+)':\s*{\s*$/gm);
  const knownPaths = new Set();
  for (const match of matches) {
    knownPaths.add(match[1]);
  }
  return knownPaths;
}

function validateFrontmatterShape(frontmatter, filePath, errors) {
  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof frontmatter[field] !== 'string' || frontmatter[field].trim() === '') {
      errors.push(`${filePath}: Missing or invalid string field "${field}".`);
    }
  }

  if (!Array.isArray(frontmatter.secondaryKeywords) || frontmatter.secondaryKeywords.length === 0) {
    errors.push(`${filePath}: "secondaryKeywords" must be a non-empty array.`);
  } else if (frontmatter.secondaryKeywords.some((item) => typeof item !== 'string' || item.trim() === '')) {
    errors.push(`${filePath}: "secondaryKeywords" must contain non-empty strings.`);
  }

  if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
    errors.push(`${filePath}: "tags" must be a non-empty array.`);
  } else if (
    frontmatter.tags.some(
      (item) => typeof item !== 'string' || normalizeTag(item, frontmatter.locale === 'tr' ? 'tr' : 'en') === '',
    )
  ) {
    errors.push(`${filePath}: "tags" must contain values that normalize to non-empty slugs.`);
  }

  if (!['en', 'tr'].includes(frontmatter.locale)) {
    errors.push(`${filePath}: "locale" must be "en" or "tr".`);
  }

  if (!['draft', 'published'].includes(frontmatter.status)) {
    errors.push(`${filePath}: "status" must be "draft" or "published".`);
  }

  if (!SEARCH_INTENTS.includes(frontmatter.searchIntent)) {
    errors.push(
      `${filePath}: "searchIntent" must be one of ${SEARCH_INTENTS.map((value) => `"${value}"`).join(', ')}.`,
    );
  }

  if (!TARGET_AUDIENCES.includes(frontmatter.targetAudience)) {
    errors.push(
      `${filePath}: "targetAudience" must be one of ${TARGET_AUDIENCES.map((value) => `"${value}"`).join(', ')}.`,
    );
  }

  if (!FUNNEL_STAGES.includes(frontmatter.funnelStage)) {
    errors.push(
      `${filePath}: "funnelStage" must be one of ${FUNNEL_STAGES.map((value) => `"${value}"`).join(', ')}.`,
    );
  }

  if (!Array.isArray(frontmatter.sourceUrls) || frontmatter.sourceUrls.length === 0) {
    errors.push(`${filePath}: "sourceUrls" must be a non-empty array.`);
  } else if (frontmatter.sourceUrls.some((item) => !isValidSourceReference(item))) {
    errors.push(
      `${filePath}: "sourceUrls" must contain non-empty repo paths or valid http(s) URLs.`,
    );
  }

  if (typeof frontmatter.slug === 'string' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(frontmatter.slug)) {
    errors.push(`${filePath}: "slug" must be lowercase kebab-case.`);
  }

  if (!isIsoDate(frontmatter.publishedAt)) {
    errors.push(`${filePath}: "publishedAt" must be an ISO date (YYYY-MM-DD).`);
  }

  if (!isIsoDate(frontmatter.updatedAt)) {
    errors.push(`${filePath}: "updatedAt" must be an ISO date (YYYY-MM-DD).`);
  }

  if (isIsoDate(frontmatter.publishedAt) && isIsoDate(frontmatter.updatedAt)) {
    const published = new Date(`${frontmatter.publishedAt}T00:00:00.000Z`);
    const updated = new Date(`${frontmatter.updatedAt}T00:00:00.000Z`);
    if (updated < published) {
      errors.push(`${filePath}: "updatedAt" must be the same day or after "publishedAt".`);
    }
  }
}

async function main() {
  const errors = [];
  const knownCtaPaths = await getKnownCtaPaths();
  const slugMap = {
    en: new Map(),
    tr: new Map(),
  };

  let topicDirs = [];
  try {
    const entries = await readdir(BLOG_ROOT, {withFileTypes: true});
    topicDirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  } catch (error) {
    const nodeError = error;
    if (nodeError?.code === 'ENOENT') {
      console.log('No blog topics found at content/blog/topics. Validation passed.');
      return;
    }
    throw error;
  }

  for (const topicId of topicDirs) {
    const topicDir = path.join(BLOG_ROOT, topicId);
    const localeFiles = {
      en: path.join(topicDir, 'en.mdx'),
      tr: path.join(topicDir, 'tr.mdx'),
    };

    for (const locale of ['en', 'tr']) {
      if (!(await exists(localeFiles[locale]))) {
        errors.push(`${topicDir}: Missing ${locale}.mdx.`);
      }
    }

    if (errors.some((item) => item.startsWith(topicDir))) {
      continue;
    }

    const enRaw = await readFile(localeFiles.en, 'utf8');
    const trRaw = await readFile(localeFiles.tr, 'utf8');
    const enData = matter(enRaw).data;
    const trData = matter(trRaw).data;

    validateFrontmatterShape(enData, localeFiles.en, errors);
    validateFrontmatterShape(trData, localeFiles.tr, errors);

    if (enData.topicId !== topicId) {
      errors.push(`${localeFiles.en}: topicId must match directory name "${topicId}".`);
    }
    if (trData.topicId !== topicId) {
      errors.push(`${localeFiles.tr}: topicId must match directory name "${topicId}".`);
    }

    if (enData.topicId !== trData.topicId) {
      errors.push(`${topicDir}: topicId mismatch between en.mdx and tr.mdx.`);
    }

    if (enData.locale !== 'en') {
      errors.push(`${localeFiles.en}: locale must be "en".`);
    }
    if (trData.locale !== 'tr') {
      errors.push(`${localeFiles.tr}: locale must be "tr".`);
    }

    if (enData.status === 'published' || trData.status === 'published') {
      if (!(enData.status === 'published' && trData.status === 'published')) {
        errors.push(`${topicDir}: published status must be true in both locales together.`);
      }
    }

    for (const [locale, data, filePath] of [
      ['en', enData, localeFiles.en],
      ['tr', trData, localeFiles.tr],
    ]) {
      if (typeof data.slug === 'string') {
        const existing = slugMap[locale].get(data.slug);
        if (existing) {
          errors.push(`${filePath}: duplicate slug "${data.slug}" already used in ${existing}.`);
        } else {
          slugMap[locale].set(data.slug, filePath);
        }
      }

      if (typeof data.ctaPath === 'string' && data.ctaPath.trim() !== '' && !knownCtaPaths.has(data.ctaPath)) {
        errors.push(`${filePath}: unknown ctaPath "${data.ctaPath}".`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('Blog validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Blog validation passed for ${topicDirs.length} topic(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
