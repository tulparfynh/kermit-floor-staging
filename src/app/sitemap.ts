import type {MetadataRoute} from 'next';
import {pathnames} from '@/navigation';
import {
  getPublishedBlogPostPairs,
  getPublishedBlogTagSlugs,
} from '@/lib/blog/content';
import {
  getBlogPostPath,
  getBlogTagPath,
  toAbsoluteUrl,
} from '@/lib/blog/seo';

function buildStaticRouteEntries(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const routeKeys = Object.keys(pathnames) as Array<keyof typeof pathnames>;

  for (const routeKey of routeKeys) {
    const route = pathnames[routeKey];
    const routeKeyString = String(routeKey);
    if (routeKeyString.includes('[')) {
      continue;
    }

    const localized = route as {en: string; tr: string};
    const enUrl = toAbsoluteUrl('en', localized.en);
    const trUrl = toAbsoluteUrl('tr', localized.tr);

    entries.push({
      url: enUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: enUrl,
          tr: trUrl,
        },
      },
    });
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pairs, enTags, trTags] = await Promise.all([
    getPublishedBlogPostPairs(),
    getPublishedBlogTagSlugs('en'),
    getPublishedBlogTagSlugs('tr'),
  ]);

  const staticEntries = buildStaticRouteEntries();
  const postEntries: MetadataRoute.Sitemap = pairs.map((pair) => ({
    url: toAbsoluteUrl('en', getBlogPostPath(pair.en.slug)),
    lastModified: pair.en.updatedAtDate > pair.tr.updatedAtDate ? pair.en.updatedAtDate : pair.tr.updatedAtDate,
    alternates: {
      languages: {
        en: toAbsoluteUrl('en', getBlogPostPath(pair.en.slug)),
        tr: toAbsoluteUrl('tr', getBlogPostPath(pair.tr.slug)),
      },
    },
  }));

  const tagEntries: MetadataRoute.Sitemap = [
    ...enTags.map((tag) => ({
      url: toAbsoluteUrl('en', getBlogTagPath(tag)),
      lastModified: new Date(),
    })),
    ...trTags.map((tag) => ({
      url: toAbsoluteUrl('tr', getBlogTagPath(tag)),
      lastModified: new Date(),
    })),
  ];

  return [...staticEntries, ...postEntries, ...tagEntries];
}
