import Link from 'next/link';
import Reveal from '../components/Reveal';
import { caseStudiesData } from '@/data/case-studies';

const CaseStudies = () => {
  const caseStudies = Object.values(caseStudiesData);

  return (
    <div className="page active" id="page-case-studies">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Case Studies</div>
          <h1 className="page-hero-title">Real Findings.<br/>Real Impact.</h1>
          <p className="page-hero-sub">Anonymized case studies from real engagements. These are the vulnerabilities that would have made headlines - had we not found them first.</p>
        </div>
      </div>

      <div className="case-studies-list">
        {caseStudies.map((cs) => (
          <Reveal className="case-study-item" key={cs.slug}>
            <div className="csi-header">
              <div>
                <div className="csi-title">{cs.title}</div>
                <div className="csi-sub">{cs.subtitle} - {cs.year}</div>
              </div>
              <div className="csi-badge">{cs.badge}</div>
            </div>
            <div className="csi-body">
              <div>
                <div className="csi-section-label">The Scenario</div>
                <p className="csi-text">{cs.scenario}</p>
                <p className="csi-text">{cs.impact}</p>
                <div className="csi-outcome">
                  <div className="csi-section-label" style={{ marginBottom: '10px' }}>Outcome</div>
                  <p>{cs.outcome}</p>
                  {cs.exposureAvoided && (
                    <p style={{ marginTop: '5px', fontSize: '12px', opacity: 0.8 }}>
                      <strong>Exposure Avoided:</strong> {cs.exposureAvoided}
                    </p>
                  )}
                </div>
                <Link href={`/case-studies/${cs.slug}`} className="btn-primary" style={{ marginTop: '30px', padding: '12px 24px', fontSize: '11px' }}>
                  <span>View Full Attack Breakdown</span>
                </Link>
              </div>
              <div>
                <div className="csi-section-label">{cs.attackPath ? 'Attack Path' : 'Key Findings'}</div>
                <div className="csi-findings">
                  {(cs.findings || cs.attackPath || []).slice(0, 5).map((f, i) => (
                    <div className="csi-finding" key={i}>
                      <span className={`csi-finding-sev sev-${f.severity.toLowerCase()}`}>{f.severity}</span>
                      <div className="csi-finding-text">{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Your Findings<br/>Are Waiting</h2>
          <p>Every unassessed system has vulnerabilities. The question is whether you find them - or someone else does.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}><span>Scope Your Assessment</span></Link>
        </Reveal>
      </section>
    </div>
  );
};

export default CaseStudies;
