import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-05-04');

  return ALL_ROUTES.map((route) => ({
    url: `${SITE_URL}${route === '/' ? '' : route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route.startsWith('/services') ? 0.9 : 0.7,
  }));
}
