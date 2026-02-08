import Image from 'next/image';
import {Link} from '@/navigation';
import type {BlogLocale, BlogPost} from '@/lib/blog/types';
import BlogTagPills from './BlogTagPills';

type BlogCardProps = {
  post: BlogPost;
  locale: BlogLocale;
  showTags?: boolean;
};

export default function BlogCard({post, locale, showTags = true}: BlogCardProps) {
  const formattedDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(post.publishedAtDate);

  return (
    <article className="overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={{pathname: '/blog/[slug]', params: {slug: post.slug}}} className="block">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="space-y-4 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{formattedDate}</p>
        <h3 className="text-xl font-semibold text-foreground">
          <Link href={{pathname: '/blog/[slug]', params: {slug: post.slug}}} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        {showTags ? <BlogTagPills tags={post.tags} /> : null}
      </div>
    </article>
  );
}
