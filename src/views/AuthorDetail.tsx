import Link from 'next/link';
import Reveal from '../components/Reveal';
import { authorsData } from '@/data/authors';
import { Award } from 'lucide-react';

const AuthorDetail = ({ slug }: { slug: string }) => {
  const author = authorsData[slug];

  if (!author) {
    return (
      <div className="page active">
        <div style={{ height: 'var(--nav-h)' }}></div>
        <div className="sd-not-found" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1>Author Not Found</h1>
          <p>The author profile you're looking for doesn't exist.</p>
          <Link href="/about" className="btn-primary"><span>Back to About</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page active" id={`page-author-${slug}`}>
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="sd-hero" style={{ minHeight: '40vh' }}>
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <div className="author-profile-wrap" style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div className="author-avatar-large" style={{ width: '150px', height: '150px', background: 'var(--bg-lighter)', border: '1px solid var(--border)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="80" height="80" style={{ opacity: 0.3 }}>
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="author-info-large">
                <h1 className="sd-hero-title" style={{ marginBottom: '10px' }}>{author.name}</h1>
                <p className="sd-hero-subtitle" style={{ color: 'var(--primary)', marginBottom: '20px' }}>{author.role}</p>
                <div className="author-socials" style={{ display: 'flex', gap: '20px' }}>
                  {author.linkedin && (
                    <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                  )}
                  {author.github && (
                    <a href={author.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-4.51-2-7-2" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <section className="sd-content-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner">
          <div className="sd-content-grid">
            <div className="sd-content-left">
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">Professional Bio</h2>
                  <p className="sd-section-text">{author.bio}</p>
                </div>
              </Reveal>
            </div>

            <div className="sd-content-right">
              <Reveal>
                <div className="sd-deliverables">
                  <h3 className="sd-deliverables-title">Verified Credentials</h3>
                  <div className="author-credentials-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {author.credentials.map((cred, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 15px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', fontSize: '12px', fontFamily: 'var(--font-jetbrains-mono)' }}>
                        <Award size={14} color="var(--primary)" />
                        {cred}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Work With<br/>{author.name.split(' ')[0]}</h2>
          <p>Schedule a scoping call with our senior operators. Free initial attack surface review, tailored scope within 48 hours.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default AuthorDetail;
