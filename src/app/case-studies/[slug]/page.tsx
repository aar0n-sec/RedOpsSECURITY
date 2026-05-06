import CaseStudyDetail from '@/views/CaseStudyDetail';
import { caseStudiesData } from '@/data/case-studies';
import { createPageMetadata, generateCaseStudySchema } from '@/seo';
import { notFound } from 'next/navigation';
import Script from 'next/script';

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  return createPageMetadata(`/case-studies/${slug}`);
}

export default async function Page({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (!caseStudiesData[slug]) {
    notFound();
  }

  const schema = generateCaseStudySchema(`/case-studies/${slug}`);

  return (
    <>
      {schema && (
        <Script
          id={`schema-case-study-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <CaseStudyDetail slug={slug} />
    </>
  );
}
