'use client';

import Link from 'next/link';

export default function BlogError() {
  return (
    <div className="page active">
      <div style={{ height: 'var(--nav-h)' }} />
      <div className="blog-empty blog-error-state">
        <div className="blog-empty-title">Research feed unavailable</div>
        <p>The blog could not be loaded. Try again or return to the main site.</p>
        <Link href="/" className="btn-primary">
          <span>Back to RedOps</span>
        </Link>
      </div>
    </div>
  );
}
