import { NextResponse } from 'next/server';
import { escapeHtml } from '@/lib/blog/text';
import { getRssPosts } from '@/lib/db/posts';
import { SITE_NAME, SITE_URL } from '@/seo';

export const revalidate = 900;

export async function GET() {
  const posts = await getRssPosts();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const description = escapeHtml(post.excerpt);
      const body = escapeHtml((post.body || '').slice(0, 2000));

      return `
        <item>
          <title>${escapeHtml(post.title)}</title>
          <link>${url}</link>
          <guid>${url}</guid>
          <description>${description}</description>
          <pubDate>${post.publishedAt ? new Date(post.publishedAt).toUTCString() : ''}</pubDate>
          <content:encoded><![CDATA[${body}]]></content:encoded>
        </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>${SITE_NAME} Research</title>
        <link>${SITE_URL}/blog</link>
        <description>Cybersecurity research, CVE analysis, pentesting guides, and RedOps field notes.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=86400',
    },
  });
}
