import Link from 'next/link';
import Reveal from '../components/Reveal';
import { authorsData } from '@/data/authors';
import { CheckBadgeIcon as Award } from '@heroicons/react/24/outline';
import { Linkedin, Github } from '../components/Icons';

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
                      <Linkedin width={20} height={20} />
                    </a>
                  )}
                  {author.github && (
                    <a href={author.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      <Github width={20} height={20} />
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
                        <Award width={14} height={14} color="var(--primary)" />
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
