export type PortableTextSpan = {
  _type?: string;
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type: string;
  style?: string;
  children?: PortableTextSpan[];
  markDefs?: Record<string, unknown>[];
  [key: string]: unknown;
};

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
  alt?: string;
  caption?: string;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
    };
  };
  cloudinary?: {
    publicId?: string;
    secureUrl?: string;
    url?: string;
    width?: number;
    height?: number;
    format?: string;
    bytes?: number;
  };
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
  body?: PortableTextBlock[];
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
