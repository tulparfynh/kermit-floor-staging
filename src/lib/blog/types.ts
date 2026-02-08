export const BLOG_LOCALES = ['en', 'tr'] as const;
export type BlogLocale = (typeof BLOG_LOCALES)[number];

export const BLOG_STATUSES = ['draft', 'published'] as const;
export type BlogStatus = (typeof BLOG_STATUSES)[number];

export const BLOG_SEARCH_INTENTS = ['informational', 'commercial-investigation', 'comparison'] as const;
export type BlogSearchIntent = (typeof BLOG_SEARCH_INTENTS)[number];

export const BLOG_TARGET_AUDIENCES = ['mixed-b2b', 'installer', 'dealer', 'architect'] as const;
export type BlogTargetAudience = (typeof BLOG_TARGET_AUDIENCES)[number];

export const BLOG_FUNNEL_STAGES = ['awareness', 'consideration', 'decision'] as const;
export type BlogFunnelStage = (typeof BLOG_FUNNEL_STAGES)[number];

export type BlogFrontmatter = {
  topicId: string;
  locale: BlogLocale;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  status: BlogStatus;
  coverImage: string;
  coverImageAlt: string;
  authorName: string;
  ctaPath?: string;
  searchIntent: BlogSearchIntent;
  targetAudience: BlogTargetAudience;
  funnelStage: BlogFunnelStage;
  sourceUrls: string[];
};

export type BlogPost = BlogFrontmatter & {
  path: string;
  content: string;
  contentHtml: string;
  publishedAtDate: Date;
  updatedAtDate: Date;
};

export type BlogManifestPost = BlogFrontmatter & {
  path: string;
  content: string;
  contentHtml: string;
  publishedAtTimestamp: number;
  updatedAtTimestamp: number;
};

export type BlogPostPair = {
  topicId: string;
  en: BlogPost;
  tr: BlogPost;
};

export type BlogManifestPostPair = {
  topicId: string;
  en: BlogManifestPost;
  tr: BlogManifestPost;
};

export type BlogManifest = {
  schemaVersion: 1;
  topics: BlogManifestPostPair[];
};

export type BlogTagIndex = Array<{
  tag: string;
  count: number;
}>;
