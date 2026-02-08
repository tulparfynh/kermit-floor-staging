import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Header} from '@/components/showcase/Header';
import {Footer} from '@/components/showcase/Footer';
import {Chatbox} from '@/components/showcase/Chatbox';
import BlogPostContent from '@/components/blog/BlogPostContent';
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPostPairs,
} from '@/lib/blog/content';
import {
  getArticleJsonLd,
  getBlogPostPath,
  toAbsoluteUrl,
} from '@/lib/blog/seo';
import type {BlogLocale} from '@/lib/blog/types';

function toBlogLocale(locale: string): BlogLocale | null {
  return locale === 'en' || locale === 'tr' ? locale : null;
}

export async function generateStaticParams() {
  const pairs = await getPublishedBlogPostPairs();
  return pairs.flatMap((pair) => [
    {locale: 'en', slug: pair.en.slug},
    {locale: 'tr', slug: pair.tr.slug},
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {locale: localeParam, slug} = await params;
  const locale = toBlogLocale(localeParam) ?? 'en';
  const postEntry = await getPublishedBlogPostBySlug(locale, slug);

  if (!postEntry) {
    return {
      title: locale === 'tr' ? 'Yazi bulunamadi' : 'Post not found',
      description: locale === 'tr' ? 'Istenen blog yazisi bulunamadi.' : 'The requested blog post could not be found.',
    };
  }

  const {post, pair} = postEntry;
  const localePath = getBlogPostPath(post.slug);
  const enPath = getBlogPostPath(pair.en.slug);
  const trPath = getBlogPostPath(pair.tr.slug);
  const canonical = toAbsoluteUrl(locale, localePath);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
      languages: {
        en: toAbsoluteUrl('en', enPath),
        tr: toAbsoluteUrl('tr', trPath),
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: canonical,
      publishedTime: `${post.publishedAt}T00:00:00Z`,
      modifiedTime: `${post.updatedAt}T00:00:00Z`,
      images: [
        {
          url: toAbsoluteUrl(locale, post.coverImage),
          alt: post.coverImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [toAbsoluteUrl(locale, post.coverImage)],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale: localeParam, slug} = await params;
  const locale = toBlogLocale(localeParam);
  if (!locale) {
    notFound();
  }

  const postEntry = await getPublishedBlogPostBySlug(locale, slug);
  if (!postEntry) {
    notFound();
  }

  const {post, pair} = postEntry;
  const pageUrl = toAbsoluteUrl(locale, getBlogPostPath(post.slug));
  const articleJsonLd = getArticleJsonLd(post, pageUrl);

  const copy =
    locale === 'tr'
      ? {
          backLabel: 'Tum yazilar',
        }
      : {
          backLabel: 'All posts',
        };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        languageSwitcherHrefs={{
          en: getBlogPostPath(pair.en.slug),
          tr: getBlogPostPath(pair.tr.slug),
        }}
      />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 md:py-16">
          <BlogPostContent post={post} locale={locale} backLabel={copy.backLabel} />
        </section>
      </main>
      <Footer />
      <Chatbox />

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(articleJsonLd)}} />
    </div>
  );
}
