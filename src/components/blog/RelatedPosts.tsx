import type {BlogLocale, BlogPost} from '@/lib/blog/types';
import BlogCard from './BlogCard';

type RelatedPostsProps = {
  posts: BlogPost[];
  locale: BlogLocale;
  title: string;
};

export default function RelatedPosts({posts, locale, title}: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-semibold text-foreground">{title}</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={`${post.locale}-${post.slug}`} post={post} locale={locale} showTags={false} />
        ))}
      </div>
    </section>
  );
}
