import { notFound } from 'next/navigation';
import BlogArticle from '@/components/blog/BlogArticle';
import {
  createBlogBreadcrumbJsonLd,
  createBlogPostJsonLd,
  createBlogPostMetadata,
  createFaqJsonLd,
} from '@/lib/blog/seo';
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/db/posts';

export const revalidate = 60;
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPostSlugs();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Research Not Found | RedOps Security',
    };
  }

  return createBlogPostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const schemas = [
    createBlogPostJsonLd(post),
    createBlogBreadcrumbJsonLd(post),
    createFaqJsonLd(post),
  ].filter(Boolean);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogArticle post={post} />
    </>
  );
}
