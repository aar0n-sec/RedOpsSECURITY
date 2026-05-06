import type { MetadataRoute } from 'next';
import { ALL_ROUTES, SITE_URL } from '@/seo';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use a fallback date if file reading fails
  const fallbackDate = new Date('2026-05-04');

  return ALL_ROUTES.map((route) => {
    let lastModified = fallbackDate;
    try {
      // Basic heuristic to find the source file for the route to get its modification time
      let filePath = '';
      if (route === '/') filePath = 'src/app/page.tsx';
      else if (route.startsWith('/resources/')) filePath = 'src/data/resources.ts'; // Centralized data for resources
      else filePath = `src/app${route}/page.tsx`;
      
      const fullPath = path.join(process.cwd(), filePath);
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        lastModified = stats.mtime;
      }
    } catch (e) {
      // Ignore and use fallback
    }

    return {
      url: `${SITE_URL}${route === '/' ? '' : route}`,
      lastModified,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : route.startsWith('/services') ? 0.9 : 0.7,
    };
  });
}
