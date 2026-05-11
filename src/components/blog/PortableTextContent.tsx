import Image from 'next/image';
import Link from 'next/link';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import http from 'highlight.js/lib/languages/http';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import python from 'highlight.js/lib/languages/python';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';
import type { BlogImage, PortableTextBlock } from '@/types/blog';
import { getBlogImageUrl } from '@/sanity/lib/image';
import { createHeadingId, escapeHtml } from '@/lib/blog/text';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('http', http);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);

function blockText(value: unknown) {
  if (!value || typeof value !== 'object' || !('children' in value)) return '';
  const children = (value as { children?: unknown }).children;
  if (!Array.isArray(children)) return '';

  return children
    .map((child) =>
      child && typeof child === 'object' && 'text' in child
        ? String((child as { text?: unknown }).text || '')
        : '',
    )
    .join('');
}

function CodeBlock({ value }: { value?: { code?: string; language?: string; filename?: string } }) {
  const code = value?.code || '';
  const language = value?.language || 'plaintext';
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(code, { language }).value
    : escapeHtml(code);

  return (
    <div className="blog-code-block">
      <div className="blog-code-header">
        <span>{value?.filename || language}</span>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

function PortableImage({ value }: { value?: BlogImage }) {
  const src = getBlogImageUrl(value, 980, 560);
  if (!src) return null;

  return (
    <figure className="blog-figure">
      <Image
        src={src}
        alt={value?.alt || ''}
        width={980}
        height={560}
        sizes="(max-width: 900px) 100vw, 980px"
      />
      {value?.caption && <figcaption>{value.caption}</figcaption>}
    </figure>
  );
}

const components: PortableTextComponents = {
  types: {
    code: CodeBlock,
    optimizedImage: PortableImage,
    image: PortableImage,
  },
  block: {
    h2: ({ children, value }) => <h2 id={createHeadingId(blockText(value))}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={createHeadingId(blockText(value))}>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === 'string' ? value.href : '#';
      const external = href.startsWith('http');
      const rel = [external ? 'noopener noreferrer' : '', value?.nofollow ? 'nofollow' : '']
        .filter(Boolean)
        .join(' ');

      return (
        <a href={href} target={external ? '_blank' : undefined} rel={rel || undefined}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      const type = typeof value?.type === 'string' ? value.type : 'post';
      const slug = typeof value?.slug === 'string' ? value.slug : '';
      const href =
        type === 'category'
          ? `/blog/category/${slug}`
          : type === 'tag'
            ? `/blog/tag/${slug}`
            : `/blog/${slug}`;

      return <Link href={href}>{children}</Link>;
    },
  },
};

export default function PortableTextContent({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) return null;

  return (
    <div className="blog-rich-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
