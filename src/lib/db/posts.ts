import type {
  BlogAuthor,
  BlogIndexData,
  BlogIndexInput,
  BlogPost,
  BlogPostCard,
  BlogTaxonomy,
  BlogSeo,
  BlogFaq,
} from '@/types/blog';
import { supabase } from '../supabase';
import { estimateReadingTime, extractTableOfContents } from '@/lib/blog/text';
import { getAllCategories, getAllTags } from './taxonomy';

const DEFAULT_PAGE_SIZE = 9;

// ---------------------------------------------------------------------------
// Row → Domain mappers
// ---------------------------------------------------------------------------

type PostRow = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body?: string;
  status: string;
  featured: boolean;
  reading_time: string | null;
  image_url: string | null;
  image_alt: string | null;
  published_at: string | null;
  updated_at: string | null;
  author_id: string | null;
};

function mapPostCard(
  row: PostRow,
  author?: BlogAuthor | null,
  categories?: BlogTaxonomy[],
  tags?: BlogTaxonomy[],
): BlogPostCard {
  const card: BlogPostCard = {
    _id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    publishedAt: row.published_at ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    featured: row.featured,
    readingTime: row.reading_time ?? undefined,
    mainImage: row.image_url ? { url: row.image_url, alt: row.image_alt ?? undefined } : undefined,
    author: author ?? undefined,
    categories,
    tags,
  };

  if (!card.readingTime) {
    card.readingTime = estimateReadingTime({
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
    });
  }

  return card;
}

// ---------------------------------------------------------------------------
// Helpers: fetch related author, categories, tags for a post
// ---------------------------------------------------------------------------

async function fetchAuthorById(authorId: string | null): Promise<BlogAuthor | null> {
  if (!authorId) return null;

  const { data } = await supabase
    .from('authors')
    .select('id, name, slug, role, bio, credentials, image_url, linkedin, github, twitter')
    .eq('id', authorId)
    .single();

  if (!data) return null;

  return {
    _id: data.id,
    name: data.name,
    slug: data.slug,
    role: data.role ?? undefined,
    bio: data.bio ?? undefined,
    credentials: data.credentials ?? undefined,
    image: data.image_url ? { url: data.image_url } : undefined,
    linkedin: data.linkedin ?? undefined,
    github: data.github ?? undefined,
    twitter: data.twitter ?? undefined,
  };
}

async function fetchPostCategories(postId: string): Promise<BlogTaxonomy[]> {
  const { data } = await supabase
    .from('post_categories')
    .select('categories(id, title, slug, description)')
    .eq('post_id', postId);

  if (!data) return [];

  return data
    .map((row) => {
      const c = (row as unknown as { categories: { id: string; title: string; slug: string; description: string | null } }).categories;
      if (!c) return null;
      return { _id: c.id, title: c.title, slug: c.slug, description: c.description ?? undefined };
    })
    .filter(Boolean) as BlogTaxonomy[];
}

async function fetchPostTags(postId: string): Promise<BlogTaxonomy[]> {
  const { data } = await supabase
    .from('post_tags')
    .select('tags(id, title, slug, description)')
    .eq('post_id', postId);

  if (!data) return [];

  return data
    .map((row) => {
      const t = (row as unknown as { tags: { id: string; title: string; slug: string; description: string | null } }).tags;
      if (!t) return null;
      return { _id: t.id, title: t.title, slug: t.slug, description: t.description ?? undefined };
    })
    .filter(Boolean) as BlogTaxonomy[];
}

async function fetchPostSeo(postId: string): Promise<BlogSeo | undefined> {
  const { data } = await supabase
    .from('post_seo')
    .select('*')
    .eq('post_id', postId)
    .single();

  if (!data) return undefined;

  return {
    metaTitle: data.meta_title ?? undefined,
    metaDescription: data.meta_description ?? undefined,
    canonicalPath: data.canonical_path ?? undefined,
    noIndex: data.no_index ?? false,
    ogImage: data.og_image_url ? { url: data.og_image_url } : undefined,
  };
}

async function fetchPostFaqs(postId: string): Promise<BlogFaq[]> {
  const { data } = await supabase
    .from('post_faqs')
    .select('question, answer')
    .eq('post_id', postId)
    .order('sort_order');

  return data ?? [];
}

async function enrichPostCard(row: PostRow): Promise<BlogPostCard> {
  const [author, categories, tags] = await Promise.all([
    fetchAuthorById(row.author_id),
    fetchPostCategories(row.id),
    fetchPostTags(row.id),
  ]);

  return mapPostCard(row, author, categories, tags);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getBlogIndex(input: BlogIndexInput = {}, _preview = false) {
  const page = input.page && input.page > 0 ? input.page : 1;
  const pageSize = input.pageSize || DEFAULT_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('featured', { ascending: false })
    .order('published_at', { ascending: false })
    .range(from, to);

  // Category filter
  if (input.category) {
    const { data: catJoin } = await supabase
      .from('post_categories')
      .select('post_id, categories!inner(slug)')
      .eq('categories.slug', input.category);

    const postIds = catJoin?.map((r) => (r as unknown as { post_id: string }).post_id) ?? [];
    if (postIds.length === 0) {
      const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
      return { posts: [], total: 0, categories, tags, page, pageSize, totalPages: 1 };
    }
    query = query.in('id', postIds);
  }

  // Tag filter
  if (input.tag) {
    const { data: tagJoin } = await supabase
      .from('post_tags')
      .select('post_id, tags!inner(slug)')
      .eq('tags.slug', input.tag);

    const postIds = tagJoin?.map((r) => (r as unknown as { post_id: string }).post_id) ?? [];
    if (postIds.length === 0) {
      const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
      return { posts: [], total: 0, categories, tags, page, pageSize, totalPages: 1 };
    }
    query = query.in('id', postIds);
  }

  // Full-text search
  if (input.query) {
    query = query.textSearch('search_vector', input.query, { type: 'websearch' });
  }

  const { data: rows, count, error } = await query;

  if (error || !rows) {
    const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
    return { posts: [], total: 0, categories, tags, page, pageSize, totalPages: 1 };
  }

  const posts = await Promise.all(rows.map((row) => enrichPostCard(row as PostRow)));
  const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
  const total = count ?? 0;

  return {
    posts,
    total,
    categories,
    tags,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getBlogPostBySlug(slug: string, _preview = false) {
  let query = supabase.from('posts').select('*').eq('slug', slug);

  if (!_preview) {
    query = query
      .eq('status', 'published')
      .or(`published_at.lte.${new Date().toISOString()},published_at.is.null`);
  }

  const { data: row, error } = await query.single();

  if (error || !row) return null;

  const postRow = row as PostRow;
  const [author, categories, tags, seo, faqs] = await Promise.all([
    fetchAuthorById(postRow.author_id),
    fetchPostCategories(postRow.id),
    fetchPostTags(postRow.id),
    fetchPostSeo(postRow.id),
    fetchPostFaqs(postRow.id),
  ]);

  const card = mapPostCard(postRow, author, categories, tags);
  const body = postRow.body || '';
  const tableOfContents = extractTableOfContents(body);

  // Related posts
  const categorySlugs = categories.map((c) => c.slug).filter(Boolean);
  const tagSlugs = tags.map((t) => t.slug).filter(Boolean);
  const relatedPosts = await getRelatedPosts(postRow.id, categorySlugs, tagSlugs);

  const post: BlogPost = {
    ...card,
    body,
    seo: seo
      ? {
          ...seo,
          faqs: faqs.length ? faqs : undefined,
        }
      : faqs.length
        ? { faqs }
        : undefined,
    relatedPosts,
    tableOfContents,
  };

  return post;
}

export async function getBlogPostSlugs(): Promise<Array<{ slug: string }>> {
  const { data, error } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  if (error || !data) return [];
  return data;
}

export async function getPostsByAuthor(slug: string): Promise<BlogPostCard[]> {
  const { data: authorRow } = await supabase
    .from('authors')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!authorRow) return [];

  const { data: rows } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', authorRow.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(12);

  if (!rows) return [];

  return Promise.all(rows.map((row) => enrichPostCard(row as PostRow)));
}

async function getRelatedPosts(
  excludePostId: string,
  categorySlugs: string[],
  tagSlugs: string[],
): Promise<BlogPostCard[]> {
  // Get post IDs that share categories or tags
  const relatedPostIds = new Set<string>();

  if (categorySlugs.length) {
    const { data: catRows } = await supabase
      .from('post_categories')
      .select('post_id, categories!inner(slug)')
      .in('categories.slug', categorySlugs)
      .neq('post_id', excludePostId);

    catRows?.forEach((r) => relatedPostIds.add((r as unknown as { post_id: string }).post_id));
  }

  if (tagSlugs.length) {
    const { data: tagRows } = await supabase
      .from('post_tags')
      .select('post_id, tags!inner(slug)')
      .in('tags.slug', tagSlugs)
      .neq('post_id', excludePostId);

    tagRows?.forEach((r) => relatedPostIds.add((r as unknown as { post_id: string }).post_id));
  }

  if (relatedPostIds.size === 0) return [];

  const { data: rows } = await supabase
    .from('posts')
    .select('*')
    .in('id', Array.from(relatedPostIds))
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(3);

  if (!rows) return [];

  return Promise.all(rows.map((row) => enrichPostCard(row as PostRow)));
}

export async function getRssPosts(): Promise<BlogPost[]> {
  const { data: rows } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(25);

  if (!rows) return [];

  const posts = await Promise.all(
    rows.map(async (row) => {
      const postRow = row as PostRow;
      const card = await enrichPostCard(postRow);
      return {
        ...card,
        body: postRow.body || '',
      } as BlogPost;
    }),
  );

  return posts;
}
