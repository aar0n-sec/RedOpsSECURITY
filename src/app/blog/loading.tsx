export default function BlogLoading() {
  return (
    <div className="page active" id="page-blog">
      <div style={{ height: 'var(--nav-h)' }} />
      
      {/* Professional subtle loading indicator */}
      <div className="flex justify-center items-center py-12 mb-[-60px] relative z-10 pointer-events-none">
        <div className="flex items-center space-x-3 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <svg className="animate-spin h-4 w-4 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xs font-mono font-medium text-neutral-600 dark:text-neutral-400 uppercase tracking-widest">Loading Articles</span>
        </div>
      </div>

      {/* Professional Skeleton Grid */}
      <section className="blog-shell pt-8 opacity-80 pointer-events-none">
        <div className="blog-skeleton-sidebar rounded-xl" />
        <div className="blog-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="blog-card blog-card-skeleton rounded-xl" key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
