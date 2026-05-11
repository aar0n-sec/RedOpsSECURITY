import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { getBlogImageUrl } from '@/lib/db/images';
import { formatPostDate } from '@/lib/blog/format';
import BlogCard from './BlogCard';
import MarkdownContent from './MarkdownContent';

export default function BlogArticle({ post }: { post: BlogPost }) {
  const heroImage = getBlogImageUrl(post.mainImage, 1400, 760);

  return (
    <div className="page active" id="page-blog-detail">
      <div style={{ height: 'var(--nav-h)' }} />

      <article>
        <header className="blog-detail-hero">
          <div className="page-hero-grid" />
          <div className="blog-detail-inner">
            <Link href="/blog" className="sd-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Research
            </Link>

            <div className="blog-detail-kicker">
              {post.categories?.map((category) => (
                <Link key={category.slug} href={`/blog/category/${category.slug}`}>
                  {category.title}
                </Link>
              ))}
            </div>

            <h1>{post.title}</h1>
            <p>{post.excerpt}</p>

            <div className="blog-detail-meta">
              <span>{formatPostDate(post.publishedAt)}</span>
              <span>{post.readingTime} read</span>
              {post.author?.slug && (
                <Link href={`/authors/${post.author.slug}`}>{post.author.name}</Link>
              )}
            </div>
          </div>

          {heroImage && (
            <div className="blog-hero-image">
              <Image
                src={heroImage}
                alt={post.mainImage?.alt || post.title}
                fill
                sizes="100vw"
                priority
              />
            </div>
          )}
        </header>

        <div className="blog-article-layout">
          <aside className="blog-toc" aria-label="Table of contents">
            <div className="blog-toc-title">Contents</div>
            {post.tableOfContents?.length ? (
              <ol>
                {post.tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'nested' : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            ) : (
              <p>Field report</p>
            )}
          </aside>

          <div className="blog-article-main">
            <MarkdownContent value={post.body} />

            {post.seo?.faqs?.length ? (
              <section className="blog-faq">
                <h2>Frequently Asked Questions</h2>
                {post.seo.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </section>
            ) : null}

            <section className="blog-author-box">
              <div>
                <div className="blog-author-eyebrow">Author</div>
                <h2>{post.author?.name || 'RedOps Security Research Team'}</h2>
                <p>{post.author?.bio || 'Practitioner-written offensive security research from RedOps Security.'}</p>
              </div>
              <Link href="/contact" className="btn-primary">
                <span>Discuss an assessment</span>
              </Link>
            </section>
          </div>
        </div>
      </article>

      {post.relatedPosts?.length ? (
        <section className="blog-related">
          <div className="blog-related-header">
            <div className="section-tag">Related Research</div>
            <h2>Continue Reading</h2>
          </div>
          <div className="blog-grid">
            {post.relatedPosts.map((related) => (
              <BlogCard key={related._id} post={related} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
