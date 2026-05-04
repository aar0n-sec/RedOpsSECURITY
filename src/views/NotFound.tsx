import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="page active" id="page-notfound" style={{ background: 'var(--bg)' }}>
      <div style={{ height: 'var(--nav-h)' }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--nav-h))', padding: '48px', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', letterSpacing: '0.2em', color: 'var(--red)', marginBottom: '24px' }}>
          ERROR 404
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(48px, 8vw, 96px)', color: 'var(--dark)', lineHeight: 1, marginBottom: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>
          SECTOR NOT FOUND.
        </h1>
        <p style={{ fontFamily: 'var(--body)', fontSize: '16px', color: 'var(--dark-soft)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '500px' }}>
          The requested resource could not be found on this server. It may have been removed, renamed, or you lack the necessary clearance.
        </p>
        <Link href="/" className="btn-primary" style={{ display: 'inline-flex' }}>
          <span>Return to Base</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
