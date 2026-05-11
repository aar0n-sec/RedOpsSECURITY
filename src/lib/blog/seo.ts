import type { Metadata } from 'next';
import type { BlogPost } from '@/types/blog';
import { getBlogImageUrl } from '@/sanity/lib/image';
import { plainTextFromPortableText } from './text';
import { SITE_NAME, SITE_URL } from '@/seo';

export function createBlogListingMetadata(input?: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const title = input?.title || 'Cybersecurity Research, CVE Analysis & Red Team Guides | RedOps';
  const description =
    input?.description ||
    'Technical cybersecurity writeups, vulnerability research, cloud security analysis, pentesting guides, and red team field notes from RedOps Security.';
  const path = input?.path || '/blog';

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: {
        'application/rss+xml': `${SITE_URL}/rss.xml`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: path,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function createBlogPostMetadata(post: BlogPost): Metadata {
  const title = post.seo?.metaTitle || `${post.title} | RedOps Security Research`;
  const description = post.seo?.metaDescription || post.excerpt;
  const canonical = post.seo?.canonicalPath || `/blog/${post.slug}`;
  const image = getBlogImageUrl(post.seo?.ogImage || post.mainImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: post.seo?.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : [SITE_NAME],
      section: post.categories?.[0]?.title,
      tags: post.tags?.map((tag) => tag.title),
      siteName: SITE_NAME,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: post.mainImage?.alt || post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export function createBlogPostJsonLd(post: BlogPost) {
  const image = getBlogImageUrl(post.seo?.ogImage || post.mainImage);

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    articleSection: post.categories?.map((category) => category.title),
    keywords: post.tags?.map((tag) => tag.title).join(', '),
    wordCount: plainTextFromPortableText(post.body || []).split(/\s+/).filter(Boolean).length,
    timeRequired: post.readingTime,
    image,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'RedOps Security Research Team',
      jobTitle: post.author?.role,
      url: post.author?.slug ? `${SITE_URL}/authors/${post.author.slug}` : `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function createBlogBreadcrumbJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}

export function createFaqJsonLd(post: BlogPost) {
  const faqs = post.seo?.faqs;
  if (!faqs?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
