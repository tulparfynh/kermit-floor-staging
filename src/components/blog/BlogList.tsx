import type {BlogLocale, BlogPost} from '@/lib/blog/types';
import BlogCard from './BlogCard';

type BlogListProps = {
  posts: BlogPost[];
  locale: BlogLocale;
  emptyTitle: string;
  emptyDescription: string;
};

export default function BlogList({posts, locale, emptyTitle, emptyDescription}: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border bg-muted/40 p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">{emptyTitle}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={`${post.locale}-${post.slug}`} post={post} locale={locale} />
      ))}
    </div>
  );
}
