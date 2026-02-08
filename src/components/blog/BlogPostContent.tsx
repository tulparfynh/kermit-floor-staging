import Image from 'next/image';
import {Link} from '@/navigation';
import type {BlogLocale, BlogPost} from '@/lib/blog/types';
import BlogTagPills from './BlogTagPills';

type BlogPostContentProps = {
  post: BlogPost;
  locale: BlogLocale;
  backLabel: string;
};

export default function BlogPostContent({post, locale, backLabel}: BlogPostContentProps) {
  const publishedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(post.publishedAtDate);

  return (
    <article className="mx-auto max-w-4xl">
      <Link href="/blog" className="inline-flex text-sm font-semibold text-primary hover:underline">
        {backLabel}
      </Link>

      <header className="mt-5 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{publishedDate}</p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{post.title}</h1>
        <p className="text-base text-muted-foreground">{post.description}</p>
        <BlogTagPills tags={post.tags} />
      </header>

      <div className="relative mt-8 h-[320px] w-full overflow-hidden rounded-xl border md:h-[420px]">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>

      <div
        className="mt-10 space-y-5 text-[16px] leading-8 text-foreground [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_video]:my-8 [&_video]:w-full [&_video]:rounded-xl [&_video]:border"
        dangerouslySetInnerHTML={{__html: post.contentHtml}}
      />
    </article>
  );
}
