import { draftMode } from 'next/headers';
import BlogIndexView from '@/components/blog/BlogIndexView';
import { normalizePage } from '@/lib/blog/text';
import { createBlogListingMetadata } from '@/lib/blog/seo';
import { getBlogIndex } from '@/lib/db/posts';

export const revalidate = 60;

type TagPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata = createBlogListingMetadata();

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const p = await searchParams;
  const page = normalizePage(p.page);
  const { isEnabled } = await draftMode();

  const data = await getBlogIndex(
    {
      page,
      tag: slug,
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
      tag={slug}
      categories={data.categories}
      tags={data.tags}
    />
  );
}
