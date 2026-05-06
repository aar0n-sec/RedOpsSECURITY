import ServiceDetail, { serviceData } from '@/views/ServiceDetail';
import { createPageMetadata, generateServiceSchema } from '@/seo';
import { notFound } from 'next/navigation';
import Script from 'next/script';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  return createPageMetadata(`/services/${slug}`);
}

export default async function Page({ params }: ServicePageProps) {
  const { slug } = await params;

  if (!serviceData[slug]) {
    notFound();
  }

  const service = serviceData[slug];
  const schema = generateServiceSchema(`/services/${slug}`, service.title, service.overview);

  return (
    <>
      <Script
        id={`schema-service-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServiceDetail slug={slug} />
    </>
  );
}
