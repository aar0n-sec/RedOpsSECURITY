import AuthorDetail from '@/views/AuthorDetail';
import { authorsData } from '@/data/authors';
import { createPageMetadata } from '@/seo';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogAuthor, getBlogAuthorSlugs } from '@/lib/db/authors';
import { getPostsByAuthor } from '@/lib/db/posts';
import { notFound } from 'next/navigation';

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const dbAuthors = await getBlogAuthorSlugs();
  const staticAuthors = Object.keys(authorsData).map((slug) => ({ slug }));
  const seen = new Set<string>();

  return [...staticAuthors, ...dbAuthors].filter((author) => {
    if (seen.has(author.slug)) return false;
    seen.add(author.slug);
    return true;
  });
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getBlogAuthor(slug);

  if (author) {
    return {
      title: `${author.name} | ${author.role || 'RedOps Author'} | RedOps`,
      description:
        author.bio ||
        `${author.name} writes RedOps Security research and offensive security field notes.`,
      alternates: {
        canonical: `/authors/${slug}`,
      },
    };
  }

  return createPageMetadata(`/authors/${slug}`);
}

export default async function Page({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getBlogAuthor(slug);

  if (author) {
    const posts = await getPostsByAuthor(slug);

    return (
      <div className="page active" id="page-author-detail">
        <div style={{ height: 'var(--nav-h)' }} />
        <header className="page-hero">
          <div className="page-hero-grid" />
          <div className="page-hero-inner">
            <div className="section-tag">Author Profile</div>
            <h1 className="page-hero-title">{author.name}</h1>
            <p className="page-hero-sub">
              {author.bio ||
                `${author.role || 'RedOps operator'} publishing technical offensive security research.`}
            </p>
          </div>
        </header>

        <section className="blog-related author-posts">
          <div className="blog-related-header">
            <div className="section-tag">{author.role || 'RedOps Research'}</div>
            <h2>Published Research</h2>
          </div>
          {posts.length ? (
            <div className="blog-grid">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <div className="blog-empty-title">No published posts yet</div>
              <p>This author profile is ready for upcoming research.</p>
            </div>
          )}
        </section>
      </div>
    );
  }

  if (!authorsData[slug]) {
    notFound();
  }

  return <AuthorDetail slug={slug} />;
}
