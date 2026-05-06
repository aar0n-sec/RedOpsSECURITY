import Link from 'next/link';
import Reveal from '../components/Reveal';
import { caseStudiesData, CaseStudy } from '@/data/case-studies';

const CaseStudyDetail = ({ slug }: { slug: string }) => {
  const cs = caseStudiesData[slug];

  if (!cs) {
    return (
      <div className="page active">
        <div style={{ height: 'var(--nav-h)' }}></div>
        <div className="sd-not-found">
          <h1>Case Study Not Found</h1>
          <p>The case study you're looking for doesn't exist.</p>
          <Link href="/case-studies" className="btn-primary"><span>Back to Case Studies</span></Link>
        </div>
      </div>
    );
  }

  const findings = cs.findings || cs.attackPath || [];

  return (
    <div className="page active" id="page-case-study-detail">
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero */}
      <div className="sd-hero">
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <Link href="/case-studies" className="sd-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Case Studies
            </Link>
          </Reveal>
          <Reveal>
            <div className="cs-detail-badge-wrap">
              <span className="csi-badge">{cs.badge}</span>
              <span className="cs-detail-year">{cs.year}</span>
            </div>
          </Reveal>
          <Reveal>
            <h1 className="sd-hero-title">{cs.title}</h1>
          </Reveal>
          <Reveal>
            <p className="sd-hero-subtitle">{cs.subtitle}</p>
          </Reveal>
        </div>
      </div>

      {/* Content */}
      <section className="sd-content-section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner">
          <div className="sd-content-grid">
            <div className="sd-content-left">
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">The Scenario</h2>
                  <p className="sd-section-text">{cs.scenario}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">The Impact</h2>
                  <p className="sd-section-text">{cs.impact}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">The Outcome</h2>
                  <p className="sd-section-text">{cs.outcome}</p>
                  {cs.exposureAvoided && (
                    <div className="csi-outcome" style={{ marginTop: '20px' }}>
                      <div className="csi-section-label" style={{ marginBottom: '10px' }}>Exposure Avoided</div>
                      <p>{cs.exposureAvoided}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            <div className="sd-content-right">
              <Reveal>
                <div className="sd-deliverables">
                  <h3 className="sd-deliverables-title">{cs.attackPath ? 'Attack Path' : 'Key Findings'}</h3>
                  <div className="csi-findings">
                    {findings.map((f, i) => (
                      <div className="csi-finding" key={i}>
                        <span className={`csi-finding-sev sev-${f.severity.toLowerCase()}`}>{f.severity}</span>
                        <div className="csi-finding-text">{f.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <Link href="/contact" className="btn-primary sd-quote-btn" style={{ textAlign: 'center', display: 'block' }}>
                  <span>Request a Similar Audit</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Secure Your<br/>Infrastructure</h2>
          <p>Don't wait for a breach to happen. Let our elite operators identify your critical vulnerabilities first.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default CaseStudyDetail;
