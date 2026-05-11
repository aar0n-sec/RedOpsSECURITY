import BlogCard from './BlogCard';
import BlogFilters from './BlogFilters';
import BlogPagination from './BlogPagination';
import type { BlogPostCard, BlogTaxonomy } from '@/types/blog';
import { pluralize } from '@/lib/blog/format';

type BlogIndexViewProps = {
  posts: BlogPostCard[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  query?: string;
  category?: string;
  tag?: string;
  categories: BlogTaxonomy[];
  tags: BlogTaxonomy[];
};

export default function BlogIndexView({
  posts,
  total,
  page,
  pageSize,
  totalPages,
  query,
  category,
  tag,
  categories,
  tags,
}: BlogIndexViewProps) {
  const first = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const last = Math.min(total, page * pageSize);

  return (
    <div className="page active" id="page-blog">
      <div style={{ height: 'var(--nav-h)' }} />

      <header className="page-hero blog-hero">
        <div className="page-hero-grid" />
        <div className="page-hero-inner">
          <div className="section-tag">Blogs</div>
          <h1 className="page-hero-title">
            Offensive Security
            <br />
            Field Notes
          </h1>
          <p className="page-hero-sub">
            Technical writeups, vulnerability research, CVE analysis, and attack tradecraft
            from senior RedOps operators.
          </p>
        </div>
      </header>

      <section className="blog-shell">
        <BlogFilters
          query={query}
          category={category}
          tag={tag}
          categories={categories}
          tags={tags}
        />

        <div className="blog-results">
          <div className="blog-results-header">
            <span>
              {first}-{last} of {total} {pluralize(total, 'article')}
            </span>
          </div>

          {posts.length ? (
            <div className="blog-grid">
              {posts.map((post, index) => (
                <BlogCard key={post._id} post={post} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <div className="blog-empty-title">No matching research found</div>
              <p>Try a broader query or clear the selected category and tag filters.</p>
            </div>
          )}

          <BlogPagination
            page={page}
            totalPages={totalPages}
            query={query}
            category={category}
            tag={tag}
          />
        </div>
      </section>
    </div>
  );
}
