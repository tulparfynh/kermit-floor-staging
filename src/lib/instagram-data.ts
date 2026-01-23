import posts from './instagram-posts.json';

export interface InstagramPost {
  id: string;
  videoSrc: string;
  posterSrc: string;
  caption: string;
  postUrl: string;
}

export function getInstagramPosts(): InstagramPost[] {
  return posts;
}
