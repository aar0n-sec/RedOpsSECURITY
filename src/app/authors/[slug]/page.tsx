import AuthorDetail from '@/views/AuthorDetail';
import { authorsData } from '@/data/authors';
import { createPageMetadata } from '@/seo';
import { notFound } from 'next/navigation';

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(authorsData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  return createPageMetadata(`/authors/${slug}`);
}

export default async function Page({ params }: AuthorPageProps) {
  const { slug } = await params;

  if (!authorsData[slug]) {
    notFound();
  }

  return <AuthorDetail slug={slug} />;
}
