import { draftMode } from 'next/headers';
import BlogIndexView from '@/components/blog/BlogIndexView';
import { normalizePage, normalizeSearchParam } from '@/lib/blog/text';
import { createBlogListingMetadata } from '@/lib/blog/seo';
import { getBlogIndex } from '@/lib/db/posts';

export const revalidate = 300;

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createBlogListingMetadata();

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = normalizePage(params.page);
  const query = normalizeSearchParam(params.q);
  const category = normalizeSearchParam(params.category);
  const tag = normalizeSearchParam(params.tag);
  const { isEnabled } = await draftMode();

  const data = await getBlogIndex(
    {
      page,
      query,
      category,
      tag,
    },
    isEnabled,
  );

  return (
    <BlogIndexView
      posts={data.posts}
      total={data.total}
      page={data.page}
      pageSize={data.pageSize}
      totalPages={data.totalPages}
      query={query}
      category={category}
      tag={tag}
      categories={data.categories}
      tags={data.tags}
    />
  );
}
