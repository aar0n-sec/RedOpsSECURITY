import Link from 'next/link';
import Reveal from '../components/Reveal';
import { MagnifyingGlassIcon as Search, ViewfinderCircleIcon as Target, ShieldCheckIcon as ShieldCheck, DocumentTextIcon as FileText, BoltIcon as Zap, BugAntIcon as Bug } from '@heroicons/react/24/outline';

const Methodology = () => {
  const steps = [
    {
      title: "Reconnaissance & OSINT",
      icon: <Search width={32} height={32} />,
      description: "We map your entire digital footprint. Using advanced OSINT techniques, DNS enumeration, and infrastructure mapping, we identify all exposed assets that an adversary would target."
    },
    {
      title: "Threat Modeling",
      icon: <Target width={32} height={32} />,
      description: "We analyze your application logic and business flows to identify high-value targets. This ensures our testing is focused on the areas of greatest risk to your organization."
    },
    {
      title: "Vulnerability Discovery",
      icon: <Bug width={32} height={32} />,
      description: "Our senior operators perform intense manual probing combined with custom automation. we chain seemingly minor flaws to demonstrate critical business impact."
    },
    {
      title: "Safe Exploitation",
      icon: <Zap width={32} height={32} />,
      description: "We safely execute exploits to confirm vulnerabilities and demonstrate real-world risk. All testing is coordinated to ensure zero disruption to your production environment."
    },
    {
      title: "Actionable Reporting",
      icon: <FileText width={32} height={32} />,
      description: "You receive a comprehensive report with executive summaries, technical deep-dives, reproduction steps, PoC videos, and prioritized remediation guidance."
    },
    {
      title: "Remediation Support",
      icon: <ShieldCheck width={32} height={32} />,
      description: "We don't just find bugs; we help you fix them. Our team remains available for technical debriefs and provides a free retest of all critical findings."
    }
  ];

  return (
    <div className="page active" id="page-methodology">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Our Methodology</div>
          <h1 className="page-hero-title">Precision Driven.<br/>Adversarial Led.</h1>
          <p className="page-hero-sub">Our battle-tested offensive security framework goes beyond standard compliance. we simulate real-world attack cycles to ensure your defenses are truly unbreachable.</p>
        </div>
      </div>

      <section className="methodology-grid" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="sd-content-inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {steps.map((step, i) => (
              <Reveal key={i}>
                <div className="method-step-card" style={{ padding: '40px', background: 'var(--bg-lighter)', border: '1px solid var(--border)', height: '100%' }}>
                  <div style={{ color: 'var(--primary)', marginBottom: '20px' }}>{step.icon}</div>
                  <h3 style={{ fontSize: '18px', marginBottom: '15px', color: 'var(--text)' }}>{step.title}</h3>
                  <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: '1.6' }}>{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section style={{ padding: '80px 0', background: 'var(--bg)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="sd-content-inner">
          <Reveal>
            <h2 className="section-title" style={{ fontSize: '28px', marginBottom: '30px' }}>Aligned With Global Standards</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 50px', opacity: 0.8 }}>Our testing methodologies are rigorously mapped to industry-standard frameworks to ensure comprehensive coverage and compliance readiness.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.6, fontFamily: 'var(--font-jetbrains-mono)', fontSize: '14px' }}>
              <span>OWASP TOP 10</span>
              <span>MITRE ATT&CK</span>
              <span>PTES</span>
              <span>OSSTMM</span>
              <span>NIST 800-115</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Ready for a<br/>Deep Dive?</h2>
          <p>Schedule a scoping call with our senior operators. Free initial attack surface review, tailored scope within 48 hours.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Methodology;
