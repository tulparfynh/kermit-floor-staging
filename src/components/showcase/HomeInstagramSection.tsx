import type { InstagramPost } from '@/lib/instagram-data';
import InstagramPostCard from '@/components/showcase/InstagramPostCard';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export default function HomeInstagramSection({
  posts,
  title,
  subtitle,
  followLabel,
}: {
  posts: InstagramPost[];
  title: string;
  subtitle: string;
  followLabel: string;
}) {
  return (
    <section className="container mx-auto px-4 text-center">
      <h2 className="font-headline text-3xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground mb-10">{subtitle}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {posts.map((post) => (
          <InstagramPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="mt-10">
        <Button asChild>
          <a href="https://www.instagram.com/kermitfloor" target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2 h-5 w-5" /> {followLabel}
          </a>
        </Button>
      </div>
    </section>
  );
}
