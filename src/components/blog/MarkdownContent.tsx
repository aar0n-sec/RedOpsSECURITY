'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Image from 'next/image';
import Link from 'next/link';
import { createHeadingId } from '@/lib/blog/text';
import type { Components } from 'react-markdown';

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as { props: { children?: React.ReactNode } }).props.children);
  }
  return '';
}

const components: Components = {
  h2: ({ children }) => {
    const text = extractText(children);
    return <h2 id={createHeadingId(text)}>{children}</h2>;
  },
  h3: ({ children }) => {
    const text = extractText(children);
    return <h3 id={createHeadingId(text)}>{children}</h3>;
  },
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return <Link href={href || '#'}>{children}</Link>;
  },
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return (
      <figure className="blog-figure">
        <Image
          src={src}
          alt={alt || ''}
          width={980}
          height={560}
          sizes="(max-width: 900px) 100vw, 980px"
        />
        {alt && <figcaption>{alt}</figcaption>}
      </figure>
    );
  },
  pre: ({ children }) => {
    return <div className="blog-code-block"><pre>{children}</pre></div>;
  },
};

export default function MarkdownContent({ value }: { value?: string }) {
  if (!value) return null;

  return (
    <div className="blog-rich-text">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {value}
      </Markdown>
    </div>
  );
}
