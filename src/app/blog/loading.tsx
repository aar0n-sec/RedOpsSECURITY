export default function BlogLoading() {
  return (
    <div className="page active" id="page-blog">
      <div style={{ height: 'var(--nav-h)' }} />
      
      {/* Interactive Loading Screen Overlay */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <div className="relative flex items-center justify-center mb-12">
          {/* Radar effect */}
          <div className="absolute h-32 w-32 rounded-full border border-red-500/30 animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute h-24 w-24 rounded-full border border-red-500/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
          <div className="absolute h-16 w-16 rounded-full border-2 border-red-600/60 shadow-[0_0_15px_rgba(220,38,38,0.4)] animate-pulse" />
          {/* Core spinning indicator */}
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-l-2 border-red-500" />
          <div className="absolute h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
        </div>

        <div className="flex flex-col items-center space-y-3 z-10">
          <div className="flex items-center text-red-500 font-mono text-lg tracking-[0.2em] uppercase">
            <span>Fetching Data</span>
            <span className="animate-[bounce_1.4s_infinite] ml-1" style={{ animationDelay: '0ms' }}>.</span>
            <span className="animate-[bounce_1.4s_infinite]" style={{ animationDelay: '200ms' }}>.</span>
            <span className="animate-[bounce_1.4s_infinite]" style={{ animationDelay: '400ms' }}>.</span>
          </div>
          <p className="text-sm text-neutral-400 font-mono max-w-sm text-center">
            Establishing secure connection to intel servers...
          </p>
        </div>
      </div>

      {/* Dimmed static skeleton for context */}
      <section className="blog-shell opacity-20 pointer-events-none mt-[-20vh]">
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
