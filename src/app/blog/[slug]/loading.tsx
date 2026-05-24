export default function BlogPostLoading() {
  return (
    <div className="page active" id="page-blog-detail">
      <div style={{ height: 'var(--nav-h)' }} />
      <div className="blog-detail-hero pointer-events-none opacity-80">
        <div className="blog-detail-inner">
          <div className="blog-post-skeleton title rounded-xl" />
          <div className="blog-post-skeleton text rounded-lg" />
          <div className="blog-post-skeleton text short rounded-lg" />
        </div>
      </div>
    </div>
  );
}
