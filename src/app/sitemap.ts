import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/seo';
import { getBlogPostSlugs } from '@/lib/db/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a fallback date if file reading fails
  const fallbackDate = new Date('2026-05-04');
  const blogPosts = await getBlogPostSlugs();
  const routes = Array.from(
    new Set([...ALL_ROUTES, '/blog', ...blogPosts.map((post) => `/blog/${post.slug}`)]),
  );

  return routes.map((route) => {
    return {
      url: `${SITE_URL}${route === '/' ? '' : route}`,
      lastModified: fallbackDate,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : route.startsWith('/services') ? 0.9 : route.startsWith('/blog') ? 0.8 : 0.7,
    };
  });
}
