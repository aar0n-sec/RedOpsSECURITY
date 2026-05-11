import Link from 'next/link';
import type { BlogTaxonomy } from '@/types/blog';

type BlogFiltersProps = {
  query?: string;
  category?: string;
  tag?: string;
  categories: BlogTaxonomy[];
  tags: BlogTaxonomy[];
};

function hrefFor(input: { q?: string; category?: string; tag?: string }) {
  const params = new URLSearchParams();
  if (input.q) params.set('q', input.q);
  if (input.category) params.set('category', input.category);
  if (input.tag) params.set('tag', input.tag);
  const search = params.toString();

  return search ? `/blog?${search}` : '/blog';
}

export default function BlogFilters({
  query,
  category,
  tag,
  categories,
  tags,
}: BlogFiltersProps) {
  return (
    <aside className="blog-filters" aria-label="Blog filters">
      <form className="blog-search" action="/blog">
        <label htmlFor="blog-search-input">Search research</label>
        <div className="blog-search-row">
          <input
            id="blog-search-input"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="CVE, cloud, AD, API..."
          />
          <button type="submit">Search</button>
        </div>
        {category && <input type="hidden" name="category" value={category} />}
        {tag && <input type="hidden" name="tag" value={tag} />}
      </form>

      <div className="blog-filter-group">
        <div className="blog-filter-title">Categories</div>
        <div className="blog-chip-list">
          <Link className={!category ? 'active' : ''} href={hrefFor({ q: query, tag })}>
            All
          </Link>
          {categories.map((item) => (
            <Link
              key={item.slug}
              className={category === item.slug ? 'active' : ''}
              href={hrefFor({ q: query, category: item.slug, tag })}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="blog-filter-group">
        <div className="blog-filter-title">Tags</div>
        <div className="blog-chip-list compact">
          <Link className={!tag ? 'active' : ''} href={hrefFor({ q: query, category })}>
            All
          </Link>
          {tags.slice(0, 16).map((item) => (
            <Link
              key={item.slug}
              className={tag === item.slug ? 'active' : ''}
              href={hrefFor({ q: query, category, tag: item.slug })}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
