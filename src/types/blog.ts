export interface BlogPost {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  publishedAt: string;
  excerpt: string;
}

export interface CreateBlogPost {
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  excerpt: string;
}