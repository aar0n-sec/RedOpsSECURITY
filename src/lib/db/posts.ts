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

type JoinedPostRow = {
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
  authors: any;
  post_categories: any[];
  post_tags: any[];
  post_seo?: any;
  post_faqs?: any[];
};

function mapJoinedPost(row: JoinedPostRow): BlogPostCard {
  const author = row.authors
    ? {
        _id: row.authors.id,
        name: row.authors.name,
        slug: row.authors.slug,
        role: row.authors.role ?? undefined,
        bio: row.authors.bio ?? undefined,
        credentials: row.authors.credentials ?? undefined,
        image: row.authors.image_url ? { url: row.authors.image_url } : undefined,
        linkedin: row.authors.linkedin ?? undefined,
        github: row.authors.github ?? undefined,
        twitter: row.authors.twitter ?? undefined,
      }
    : undefined;

  const categories =
    row.post_categories
      ?.map((pc) => {
        const c = pc.categories;
        if (!c) return null;
        return { _id: c.id, title: c.title, slug: c.slug, description: c.description ?? undefined };
      })
      .filter(Boolean) as BlogTaxonomy[] ?? [];

  const tags =
    row.post_tags
      ?.map((pt) => {
        const t = pt.tags;
        if (!t) return null;
        return { _id: t.id, title: t.title, slug: t.slug, description: t.description ?? undefined };
      })
      .filter(Boolean) as BlogTaxonomy[] ?? [];

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
    author,
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
// Helpers: Taxonomy Cache
// ---------------------------------------------------------------------------

let taxonomyCache: {
  categories: BlogTaxonomy[];
  tags: BlogTaxonomy[];
  expiry: number;
} | null = null;

async function getCachedTaxonomy() {
  const now = Date.now();
  if (taxonomyCache && taxonomyCache.expiry > now) {
    return { categories: taxonomyCache.categories, tags: taxonomyCache.tags };
  }

  const [categories, tags] = await Promise.all([getAllCategories(), getAllTags()]);
  taxonomyCache = {
    categories,
    tags,
    expiry: now + 1000 * 60 * 5, // 5 minute cache
  };
  return { categories, tags };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

const POST_CARD_QUERY = `
  id, title, slug, excerpt, status, featured, reading_time, image_url, image_alt, published_at, updated_at, author_id,
  authors ( id, name, slug, role, bio, credentials, image_url, linkedin, github, twitter ),
  post_categories ( categories ( id, title, slug, description ) ),
  post_tags ( tags ( id, title, slug, description ) )
`;

export async function getBlogIndex(input: BlogIndexInput = {}, _preview = false) {
  const page = input.page && input.page > 0 ? input.page : 1;
  const pageSize = input.pageSize || DEFAULT_PAGE_SIZE;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('posts')
    .select(POST_CARD_QUERY, { count: 'exact' })
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

    const postIds = catJoin?.map((r: any) => r.post_id) ?? [];
    if (postIds.length === 0) {
      const { categories, tags } = await getCachedTaxonomy();
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

    const postIds = tagJoin?.map((r: any) => r.post_id) ?? [];
    if (postIds.length === 0) {
      const { categories, tags } = await getCachedTaxonomy();
      return { posts: [], total: 0, categories, tags, page, pageSize, totalPages: 1 };
    }
    query = query.in('id', postIds);
  }

  // Full-text search
  if (input.query) {
    query = query.textSearch('search_vector', input.query, { type: 'websearch' });
  }

  const [res, taxonomy] = await Promise.all([query, getCachedTaxonomy()]);
  const { data: rows, count, error } = res;

  if (error || !rows) {
    return { posts: [], total: 0, categories: taxonomy.categories, tags: taxonomy.tags, page, pageSize, totalPages: 1 };
  }

  const posts = rows.map((row) => mapJoinedPost(row as unknown as JoinedPostRow));
  const total = count ?? 0;

  return {
    posts,
    total,
    categories: taxonomy.categories,
    tags: taxonomy.tags,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getBlogPostBySlug(slug: string, _preview = false) {
  let query = supabase
    .from('posts')
    .select(`
      ${POST_CARD_QUERY},
      body,
      post_seo ( meta_title, meta_description, canonical_path, no_index, og_image_url ),
      post_faqs ( question, answer, sort_order )
    `)
    .eq('slug', slug);

  if (!_preview) {
    query = query
      .eq('status', 'published')
      .or(`published_at.lte.${new Date().toISOString()},published_at.is.null`);
  }

  const { data: row, error } = await query.single();

  if (error || !row) return null;

  const postRow = row as unknown as JoinedPostRow;
  const card = mapJoinedPost(postRow);
  const body = postRow.body || '';
  const tableOfContents = extractTableOfContents(body);

  // SEO
  const seoData = postRow.post_seo;
  const faqData = postRow.post_faqs?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) ?? [];

  const seo: BlogSeo | undefined = seoData || faqData.length ? {
    metaTitle: seoData?.meta_title ?? undefined,
    metaDescription: seoData?.meta_description ?? undefined,
    canonicalPath: seoData?.canonical_path ?? undefined,
    noIndex: seoData?.no_index ?? false,
    ogImage: seoData?.og_image_url ? { url: seoData?.og_image_url } : undefined,
    faqs: faqData.length ? faqData.map(f => ({ question: f.question, answer: f.answer })) : undefined,
  } : undefined;

  // Related posts
  const categorySlugs = card.categories?.map((c) => c.slug).filter(Boolean) ?? [];
  const tagSlugs = card.tags?.map((t) => t.slug).filter(Boolean) ?? [];
  const relatedPosts = await getRelatedPosts(postRow.id, categorySlugs, tagSlugs);

  const post: BlogPost = {
    ...card,
    body,
    seo,
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
    .select(POST_CARD_QUERY)
    .eq('author_id', authorRow.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(12);

  if (!rows) return [];

  return rows.map((row) => mapJoinedPost(row as unknown as JoinedPostRow));
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

    catRows?.forEach((r: any) => relatedPostIds.add(r.post_id));
  }

  if (tagSlugs.length) {
    const { data: tagRows } = await supabase
      .from('post_tags')
      .select('post_id, tags!inner(slug)')
      .in('tags.slug', tagSlugs)
      .neq('post_id', excludePostId);

    tagRows?.forEach((r: any) => relatedPostIds.add(r.post_id));
  }

  if (relatedPostIds.size === 0) return [];

  const { data: rows } = await supabase
    .from('posts')
    .select(POST_CARD_QUERY)
    .in('id', Array.from(relatedPostIds))
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(3);

  if (!rows) return [];

  return rows.map((row) => mapJoinedPost(row as unknown as JoinedPostRow));
}

export async function getRssPosts(): Promise<BlogPost[]> {
  const { data: rows } = await supabase
    .from('posts')
    .select(`
      ${POST_CARD_QUERY},
      body
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(25);

  if (!rows) return [];

  return rows.map((row) => {
    const postRow = row as unknown as JoinedPostRow;
    const card = mapJoinedPost(postRow);
    return {
      ...card,
      body: postRow.body || '',
    } as BlogPost;
  });
}
