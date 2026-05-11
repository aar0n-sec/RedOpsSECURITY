import type {
  BlogAuthor,
  BlogIndexData,
  BlogIndexInput,
  BlogPost,
  BlogPostCard,
  BlogTaxonomy,
} from '@/types/blog';
import {
  AUTHOR_BY_SLUG_QUERY,
  AUTHOR_SLUGS_QUERY,
  BLOG_INDEX_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_SLUGS_QUERY,
  CATEGORY_BY_SLUG_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  RELATED_POSTS_QUERY,
  RSS_POSTS_QUERY,
  TAG_BY_SLUG_QUERY,
} from './queries';
import { sanityFetch } from './client';
import { estimateReadingTime, extractTableOfContents } from '@/lib/blog/text';

const DEFAULT_PAGE_SIZE = 9;

function withComputedPostFields<T extends BlogPostCard>(post: T): T {
  return {
    ...post,
    readingTime:
      post.readingTime ||
      estimateReadingTime({
        title: post.title,
        excerpt: post.excerpt,
        body: 'body' in post ? (post.body as BlogPost['body']) : undefined,
      }),
  };
}

export async function getBlogIndex(input: BlogIndexInput = {}, preview = false) {
  const page = input.page && input.page > 0 ? input.page : 1;
  const pageSize = input.pageSize || DEFAULT_PAGE_SIZE;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const query = input.query ? `${input.query}*` : '';

  const data = await sanityFetch<BlogIndexData>({
    query: BLOG_INDEX_QUERY,
    params: {
      start,
      end,
      query,
      category: input.category || '',
      tag: input.tag || '',
      preview,
    },
    tags: ['blog', 'post', 'category', 'tag'],
    preview,
  });

  return {
    posts: data?.posts.map(withComputedPostFields) || [],
    total: data?.total || 0,
    categories: data?.categories || [],
    tags: data?.tags || [],
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil((data?.total || 0) / pageSize)),
  };
}

export async function getBlogPostBySlug(slug: string, preview = false) {
  const post = await sanityFetch<BlogPost>({
    query: BLOG_POST_BY_SLUG_QUERY,
    params: { slug, preview },
    tags: [`post:${slug}`, 'post', 'blog'],
    preview,
  });

  if (!post) return null;

  const categorySlugs = post.categories?.map((category) => category.slug).filter(Boolean) || [];
  const tagSlugs = post.tags?.map((tag) => tag.slug).filter(Boolean) || [];
  const relatedPosts = await sanityFetch<BlogPostCard[]>({
    query: RELATED_POSTS_QUERY,
    params: {
      slug,
      categorySlugs,
      tagSlugs,
    },
    tags: ['post', 'blog'],
  });

  return {
    ...withComputedPostFields(post),
    relatedPosts: relatedPosts?.map(withComputedPostFields) || [],
    tableOfContents: extractTableOfContents(post.body || []),
  };
}

export async function getBlogPostSlugs() {
  const posts = await sanityFetch<Array<{ slug: string }>>({
    query: BLOG_POST_SLUGS_QUERY,
    tags: ['post', 'blog'],
    revalidate: 3600,
  });

  return posts || [];
}

export async function getBlogAuthor(slug: string) {
  return sanityFetch<BlogAuthor>({
    query: AUTHOR_BY_SLUG_QUERY,
    params: { slug },
    tags: [`author:${slug}`, 'author'],
  });
}

export async function getBlogAuthorSlugs() {
  const authors = await sanityFetch<Array<{ slug: string }>>({
    query: AUTHOR_SLUGS_QUERY,
    tags: ['author'],
    revalidate: 3600,
  });

  return authors || [];
}

export async function getPostsByAuthor(slug: string) {
  const posts = await sanityFetch<BlogPostCard[]>({
    query: POSTS_BY_AUTHOR_QUERY,
    params: { slug },
    tags: [`author:${slug}`, 'post', 'blog'],
  });

  return posts?.map(withComputedPostFields) || [];
}

export async function getCategory(slug: string) {
  return sanityFetch<BlogTaxonomy>({
    query: CATEGORY_BY_SLUG_QUERY,
    params: { slug },
    tags: [`category:${slug}`, 'category'],
  });
}

export async function getTag(slug: string) {
  return sanityFetch<BlogTaxonomy>({
    query: TAG_BY_SLUG_QUERY,
    params: { slug },
    tags: [`tag:${slug}`, 'tag'],
  });
}

export async function getRssPosts() {
  const posts = await sanityFetch<BlogPost[]>({
    query: RSS_POSTS_QUERY,
    tags: ['post', 'blog', 'rss'],
    revalidate: 900,
  });

  return posts?.map(withComputedPostFields) || [];
}
