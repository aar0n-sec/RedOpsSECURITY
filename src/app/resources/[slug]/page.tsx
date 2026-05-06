import ResourceDetail from '@/views/ResourceDetail';
import { resourceData } from '@/data/resources';
import { createPageMetadata, generateArticleSchema } from '@/seo';
import { notFound } from 'next/navigation';

type ResourcePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(resourceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { slug } = await params;
  return createPageMetadata(`/resources/${slug}`);
}

export default async function Page({ params }: ResourcePageProps) {
  const { slug } = await params;

  if (!resourceData[slug]) {
    notFound();
  }

  const schema = generateArticleSchema(`/resources/${slug}`);

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <ResourceDetail slug={slug} />
    </>
  );
}
