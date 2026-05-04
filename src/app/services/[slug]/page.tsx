import ServiceDetail, { serviceData } from '@/views/ServiceDetail';
import { createPageMetadata } from '@/seo';
import { notFound } from 'next/navigation';

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

  return <ServiceDetail slug={slug} />;
}
