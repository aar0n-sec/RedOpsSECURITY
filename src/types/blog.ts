export type BlogTaxonomy = {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
};

export type BlogAuthor = {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  credentials?: string[];
  image?: BlogImage;
  linkedin?: string;
  github?: string;
  twitter?: string;
};

export type BlogImage = {
  url?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogSeo = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  ogImage?: BlogImage;
  faqs?: BlogFaq[];
};

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  readingTime?: string;
  mainImage?: BlogImage;
  author?: BlogAuthor;
  categories?: BlogTaxonomy[];
  tags?: BlogTaxonomy[];
};

export type BlogPost = BlogPostCard & {
  /** Markdown body content */
  body?: string;
  seo?: BlogSeo;
  relatedPosts?: BlogPostCard[];
  tableOfContents?: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogIndexData = {
  posts: BlogPostCard[];
  total: number;
  categories: BlogTaxonomy[];
  tags: BlogTaxonomy[];
};

export type BlogIndexInput = {
  page?: number;
  pageSize?: number;
  query?: string;
  category?: string;
  tag?: string;
};

export type Lead = {
  id: string;
  name: string;
  website: string;
  email?: string;
  status: 'not_tested' | 'tested';
  remarks?: string;
  created_at: string;
  updated_at: string;
};
