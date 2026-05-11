export default function BlogPostLoading() {
  return (
    <div className="page active" id="page-blog-detail">
      <div style={{ height: 'var(--nav-h)' }} />
      <div className="blog-detail-hero">
        <div className="blog-detail-inner">
          <div className="blog-post-skeleton title" />
          <div className="blog-post-skeleton text" />
          <div className="blog-post-skeleton text short" />
        </div>
      </div>
    </div>
  );
}
