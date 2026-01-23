'use client';

import { Instagram, MessageCircle, Send, Heart, Bookmark } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { InstagramPost } from '@/lib/instagram-data';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function InstagramPostCard({ post }: { post: InstagramPost }) {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg border">
      <CardHeader className="flex flex-row items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary/50 flex items-center justify-center bg-white">
             <Image
                src="/images/kermit-floor-logo.png"
                alt="Kermit Floor Logo"
                width={28}
                height={28}
                className="object-contain"
                unoptimized
              />
          </div>
          <span className="font-semibold text-sm">kermitfloor</span>
        </div>
        <a href={post.postUrl} target="_blank" rel="noopener noreferrer" aria-label="View on Instagram">
          <Instagram className="h-6 w-6 text-muted-foreground" />
        </a>
      </CardHeader>
      
      <div className="relative w-full aspect-[9/16] bg-muted">
        <video
          src={post.videoSrc}
          poster={post.posterSrc}
          playsInline
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-3 space-y-2">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-muted-foreground">
                <Heart className="h-6 w-6 cursor-pointer hover:text-foreground transition-colors" />
                <MessageCircle className="h-6 w-6 cursor-pointer hover:text-foreground transition-colors" />
                <Send className="h-6 w-6 cursor-pointer hover:text-foreground transition-colors" />
            </div>
            <Bookmark className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
        </div>
        <p className="text-sm">
            <a href={post.postUrl} target="_blank" rel="noopener noreferrer" className="font-semibold mr-1">kermitfloor</a>
            {post.caption}
        </p>
      </CardContent>

      <CardFooter className="p-3 border-t bg-muted/50">
        <Button variant="link" asChild className="p-0 h-auto text-sm text-secondary hover:text-primary">
            <a href={post.postUrl} target="_blank" rel="noopener noreferrer">
                View on Instagram &rarr;
            </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
