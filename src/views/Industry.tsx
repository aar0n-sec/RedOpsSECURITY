import Link from 'next/link';
import Reveal from '../components/Reveal';
import { Shield, Target, Zap, Lock } from 'lucide-react';

type IndustryProps = {
  name: string;
  title: string;
  subtitle: string;
  overview: string;
  challenges: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  ctaText: string;
};

const IndustryView = ({ name, title, subtitle, overview, challenges, solutions, ctaText }: IndustryProps) => {
  return (
    <div className="page active" id={`page-industry-${name.toLowerCase()}`}>
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero */}
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Industry Solution: {name}</div>
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-sub">{subtitle}</p>
        </div>
      </div>

      {/* Overview */}
      <section className="sd-content-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner">
          <div className="sd-section-block">
            <h2 className="sd-section-title">Overview</h2>
            <p className="sd-section-text" style={{ maxWidth: '800px' }}>{overview}</p>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="industry-grid-section" style={{ padding: '80px 0', borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner">
          <div className="sd-content-grid">
            <div className="sd-content-left">
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">Critical Challenges</h2>
                  <div className="challenges-list">
                    {challenges.map((c, i) => (
                      <div key={i} style={{ marginBottom: '30px' }}>
                        <h4 style={{ color: 'var(--primary)', marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>{c.title}</h4>
                        <p style={{ opacity: 0.8, fontSize: '15px' }}>{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="sd-content-right">
              <Reveal>
                <div className="sd-deliverables">
                  <h3 className="sd-deliverables-title">The RedOps Solution</h3>
                  <div className="solutions-list">
                    {solutions.map((s, i) => (
                      <div key={i} className="csi-finding" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '15px', marginBottom: '15px' }}>
                        <div style={{ marginBottom: '5px', fontWeight: '600', color: 'var(--text)' }}>{s.title}</div>
                        <div style={{ fontSize: '13px', opacity: 0.7 }}>{s.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <Link href="/contact" className="btn-primary sd-quote-btn" style={{ textAlign: 'center', display: 'block' }}>
                  <span>{ctaText}</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signal Banner */}
      <section style={{ padding: '60px 0', background: 'var(--bg-lighter)', borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="section-title" style={{ fontSize: '24px', marginBottom: '40px' }}>Why {name} Leaders Choose RedOps</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' }}>
              <div>
                <Target color="var(--primary)" size={32} style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Operator-Led</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>No automated scans. Real offensive security practitioners with 7+ years experience.</p>
              </div>
              <div>
                <Shield color="var(--primary)" size={32} style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Compliance Ready</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>We map all findings to SOC 2, ISO 27001, and GDPR requirements.</p>
              </div>
              <div>
                <Zap color="var(--primary)" size={32} style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Speed to Remediation</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>Developer-friendly reports with PoC videos and clear remediation guidance.</p>
              </div>
              <div>
                <Lock color="var(--primary)" size={32} style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '14px', marginBottom: '10px' }}>Deep Manual Analysis</h4>
                <p style={{ fontSize: '12px', opacity: 0.7 }}>We find logic flaws and chain vulnerabilities that automated tools miss.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Secure Your {name}<br/>Infrastructure</h2>
          <p>Schedule a scoping call with our senior operators. Free initial attack surface review, tailored scope within 48 hours.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default IndustryView;
