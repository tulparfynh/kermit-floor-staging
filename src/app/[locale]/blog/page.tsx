import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Header} from '@/components/showcase/Header';
import {Footer} from '@/components/showcase/Footer';
import {Chatbox} from '@/components/showcase/Chatbox';
import {Link} from '@/navigation';
import BlogList from '@/components/blog/BlogList';
import Image from 'next/image';
import {getPublishedBlogPostsByLocale, getPublishedBlogTagIndex} from '@/lib/blog/content';
import {toAbsoluteUrl} from '@/lib/blog/seo';
import type {BlogLocale} from '@/lib/blog/types';

export const dynamic = 'force-static';
export const revalidate = false;

function toBlogLocale(locale: string): BlogLocale | null {
  return locale === 'en' || locale === 'tr' ? locale : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const locale = toBlogLocale((await params).locale) ?? 'en';
  const title =
    locale === 'tr'
      ? 'Kermit Floor Blog | SPC Parke, Duvar Paneli ve Supurgelik Rehberleri'
      : 'Kermit Floor Blog | SPC Flooring, Wall Panel and Skirting Guides';
  const description =
    locale === 'tr'
      ? 'SPC parke, duvar paneli ve supurgelik secimi, uygulamasi ve proje planlamasi icin teknik icerikler.'
      : 'Technical blog content for SPC flooring, wall panel and skirting selection, installation, and project planning.';

  return {
    title,
    description,
    alternates: {
      canonical: toAbsoluteUrl(locale, '/blog'),
      languages: {
        en: toAbsoluteUrl('en', '/blog'),
        tr: toAbsoluteUrl('tr', '/blog'),
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: toAbsoluteUrl(locale, '/blog'),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const localeParam = (await params).locale;
  const locale = toBlogLocale(localeParam);
  if (!locale) {
    notFound();
  }

  const [posts, tags] = await Promise.all([
    getPublishedBlogPostsByLocale(locale),
    getPublishedBlogTagIndex(locale),
  ]);

  const copy =
    locale === 'tr'
      ? {
          title: 'Blog',
          subtitle: 'SPC sistemleri, uygulama detaylari ve proje kararlarina odaklanan icerikler.',
          heroImageAlt: 'Ic mekan uygulama blog kapak gorseli',
          emptyTitle: 'Yayinda blog yazisi bulunmuyor.',
          emptyDescription: 'Ilk yayinlar hazirlandiginda bu alanda listelenecek.',
          tagsTitle: 'Konular',
        }
      : {
          title: 'Blog',
          subtitle: 'Technical and practical content for SPC systems, installation details, and project decisions.',
          heroImageAlt: 'Interior finishes editorial hero',
          emptyTitle: 'No blog posts are published yet.',
          emptyDescription: 'Published articles will appear here as they go live.',
          tagsTitle: 'Topics',
        };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative h-56 w-full overflow-hidden md:h-72">
          <Image
            src="/images/hero-images/resources-download-hero-image.jpg"
            alt={copy.heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50">
            <div className="container mx-auto flex h-full items-center px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{copy.title}</h1>
                <p className="mt-3 text-base text-white/90 md:text-lg">{copy.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-16">

          {tags.length > 0 ? (
            <div className="mb-8">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {copy.tagsTitle}
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.tag}
                    href={{pathname: '/blog/tag/[tag]', params: {tag: tag.tag}}}
                    className="rounded-full border border-border px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    #{tag.tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          <BlogList posts={posts} locale={locale} emptyTitle={copy.emptyTitle} emptyDescription={copy.emptyDescription} />
        </section>
      </main>
      <Footer />
      <Chatbox />
    </div>
  );
}
