import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeoForRoute } from '../seo';

/**
 * Client-side SEO head manager.
 * Updates document title and meta tags on route change.
 * During SSR/prerender, the meta tags are injected directly into HTML.
 */
const SeoHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForRoute(pathname);
    const url = `https://redops.in${pathname === '/' ? '' : pathname}`;

    // Update title
    document.title = seo.title;

    // Helper to set/create meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', seo.description);
    setMeta('name', 'keywords', seo.keywords);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'RedOps Security');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }, [pathname]);

  return null;
};

export default SeoHead;
