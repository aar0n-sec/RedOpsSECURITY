import type { BlogPostCard } from '@/types/blog';

const EU_COMMISSION_SLUG = 'european-commission-cyber-attack-2026-event-impact-and-key-lessons';
const WORDPRESS_XMLRPC_SLUG = 'wordpress-xmlrpcphp-common-vulnerabilites-how-to-exploit-them';

export function applyBlogContentFixes(post: BlogPostCard): BlogPostCard {
  if (post.slug === EU_COMMISSION_SLUG) {
    return {
      ...post,
      tags: post.tags?.map((tag) =>
        tag.title.toLowerCase() === 'wordpress'
          ? { ...tag, title: 'Supply Chain Security', slug: 'supply-chain-security' }
          : tag,
      ),
    };
  }

  if (post.slug === WORDPRESS_XMLRPC_SLUG) {
    return {
      ...post,
      title: post.title
        .replaceAll('Wordpress', 'WordPress')
        .replaceAll('vulnerabilites', 'vulnerabilities'),
      tags: post.tags?.map((tag) =>
        tag.title.toLowerCase() === 'wordpress' ? { ...tag, title: 'WordPress' } : tag,
      ),
    };
  }

  return post;
}

export function applyBlogBodyFixes(slug: string, body: string) {
  if (slug !== EU_COMMISSION_SLUG) return body;

  const trimmed = body.trimEnd();
  return trimmed.endsWith('"""') ? trimmed.slice(0, -3).trimEnd() : body;
}
