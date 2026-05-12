import Link from 'next/link';

type BlogPaginationProps = {
  page: number;
  totalPages: number;
  query?: string;
  category?: string;
  tag?: string;
};

function buildHref(page: number, query?: string, category?: string, tag?: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set('page', String(page));
  if (query) params.set('q', query);
  if (category) params.set('category', category);
  if (tag) params.set('tag', tag);

  const search = params.toString();
  return search ? `/blog?${search}` : '/blog';
}

export default function BlogPagination({
  page,
  totalPages,
  query,
  category,
  tag,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      <Link
        className={page <= 1 ? 'blog-page-link disabled' : 'blog-page-link'}
        href={page <= 1 ? buildHref(1, query, category, tag) : buildHref(page - 1, query, category, tag)}
        aria-disabled={page <= 1}
        prefetch={false}
      >
        Previous
      </Link>
      <span>
        Page {page} of {totalPages}
      </span>
      <Link
        className={page >= totalPages ? 'blog-page-link disabled' : 'blog-page-link'}
        href={
          page >= totalPages
            ? buildHref(totalPages, query, category, tag)
            : buildHref(page + 1, query, category, tag)
        }
        aria-disabled={page >= totalPages}
        prefetch={false}
      >
        Next
      </Link>
    </nav>
  );
}
