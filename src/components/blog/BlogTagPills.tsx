import {Link} from '@/navigation';

type BlogTagPillsProps = {
  tags: string[];
};

export default function BlogTagPills({tags}: BlogTagPillsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={{pathname: '/blog/tag/[tag]', params: {tag}}}
          className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
