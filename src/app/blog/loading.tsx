export default function BlogLoading() {
  return (
    <div className="page active" id="page-blog">
      <div style={{ height: 'var(--nav-h)' }} />
      <section className="blog-shell">
        <div className="blog-skeleton-sidebar" />
        <div className="blog-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="blog-card blog-card-skeleton" key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
