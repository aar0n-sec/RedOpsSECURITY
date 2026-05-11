import Image from 'next/image';
import Link from 'next/link';
import type { BlogPostCard } from '@/types/blog';
import { getBlogImageUrl } from '@/lib/db/images';
import { formatPostDate } from '@/lib/blog/format';

type BlogCardProps = {
  post: BlogPostCard;
  priority?: boolean;
};

export default function BlogCard({ post, priority = false }: BlogCardProps) {
  const image = getBlogImageUrl(post.mainImage, 760, 430);

  return (
    <article className="blog-card">
      <Link href={`/blog/${post.slug}`} className="blog-card-media" aria-label={post.title}>
        {image ? (
          <Image
            src={image}
            alt={post.mainImage?.alt || post.title}
            fill
            sizes="(max-width: 900px) 100vw, 33vw"
            priority={priority}
          />
        ) : (
          <div className="blog-card-fallback" aria-hidden="true">
            <span>REDOPS</span>
          </div>
        )}
        {post.categories?.[0] && (
          <span className="blog-card-category">{post.categories[0].title}</span>
        )}
      </Link>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span>{formatPostDate(post.publishedAt)}</span>
          <span>{post.readingTime} read</span>
        </div>
        <h2 className="blog-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p>{post.excerpt}</p>
      </div>

      <div className="blog-card-footer">
        {post.author?.slug ? (
          <Link href={`/authors/${post.author.slug}`}>{post.author.name}</Link>
        ) : (
          <span>{post.author?.name || 'RedOps Research'}</span>
        )}
        <Link href={`/blog/${post.slug}`} className="blog-card-read">
          Read analysis
        </Link>
      </div>
    </article>
  );
}
