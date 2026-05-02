import { Link } from 'react-router-dom';
import HeroCanvas from '../components/HeroCanvas';
import Reveal from '../components/Reveal';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
  return (
    <div className="page active" id="page-home">
      {/* HERO */}
      <section id="hero">
        <HeroCanvas />
        <div className="hero-grid"></div>
        <div className="hero-scan-line"></div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="dot"></span>
            Offensive Security Operations
          </div>

          <h1 className="hero-headline">
            <span className="hero-word hw-1">Security&nbsp;</span>
            <span className="hero-word hw-2">isn’t tested&nbsp;</span>
            <span className="hero-word hw-3">in theory.</span>
            <span className="hero-line-break"></span>
            <span className="hero-word hw-4">It’s broken&nbsp;</span>
            <span className="hero-word hw-5">in&nbsp;</span>
            <span className="hero-word hw-target">practice</span>
          </h1>

          <p className="hero-sub">
            We simulate real-world attacks against your infrastructure before adversaries do. Elite penetration testing. No false positives. Actionable intelligence.
          </p>

          <div className="hero-actions">
            <Link to="/contact" className="btn-primary btn-pulse">
              <span>Get Free Security Audit</span>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link to="/services" className="btn-outline">
              <span>View Services</span>
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="hero-stats-bar">
        <div className="hero-stat">
          <div className="hero-stat-num">100<span style={{ fontSize: '22px', opacity: 0.7 }}>%</span></div>
          <div className="hero-stat-label">Manual Testing</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">0</div>
          <div className="hero-stat-label">False Positives</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num" style={{ fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '38px' }}>ATT&CK</div>
          <div className="hero-stat-label">Framework Aligned</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">72<span style={{ fontSize: '22px', opacity: 0.7 }}>h</span></div>
          <div className="hero-stat-label">Report Delivery</div>
        </div>
      </div>

      {/* FRAMEWORKS */}
      <section className="trust-section">
        <div className="trust-inner" style={{ flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
          <span className="trust-label">Aligned with real-world attack frameworks</span>
          <div className="trust-logos">
            <span className="trust-logo">MITRE ATT&amp;CK</span>
            <span style={{ color: 'var(--red)', margin: '0 20px' }}>•</span>
            <span className="trust-logo">OWASP Top 10</span>
            <span style={{ color: 'var(--red)', margin: '0 20px' }}>•</span>
            <span className="trust-logo">NIST</span>
            <span style={{ color: 'var(--red)', margin: '0 20px' }}>•</span>
            <span className="trust-logo">PTES</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="problem-grid">
          <Reveal className="problem-left">
            <div className="section-tag">The Problem</div>
            <h2 className="section-title">Most breaches are preventable.</h2>
            <p>The average attacker dwell time before detection is 197 days. By then, the damage is done - data exfiltrated, systems compromised, reputation destroyed.</p>
            <p>Traditional security tools generate noise. Compliance checkboxes don't reflect real attack surfaces. And your adversary doesn't follow a playbook.</p>
            <div style={{ marginTop: '36px' }}>
              <Link to="/services" className="btn-primary"><span>Explore Our Services</span></Link>
            </div>
          </Reveal>
          <div className="problem-right">
            <Reveal className="problem-card" delay={1}>
              <div className="problem-card-num">01 / EXPOSURE</div>
              <div className="problem-card-title">Unknown Attack Surface</div>
              <p>Shadow IT, forgotten subdomains, and third-party integrations expand your exposure invisibly. You can't defend what you can't see.</p>
            </Reveal>
            <Reveal className="problem-card" delay={2}>
              <div className="problem-card-num">02 / DETECTION</div>
              <div className="problem-card-title">Signature Tools Miss 0-Days</div>
              <p>Modern adversaries use living-off-the-land techniques and custom tooling designed to evade signature-based detection.</p>
            </Reveal>
            <Reveal className="problem-card" delay={3}>
              <div className="problem-card-num">03 / RESPONSE</div>
              <div className="problem-card-title">No Incident Playbook</div>
              <p>When a breach occurs without prior simulation, response is chaotic. Untested IR plans fail exactly when you need them most.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="services-bg-text">PENTEST</div>
        <div className="services-inner">
          <div className="services-header">
            <div>
              <div className="section-tag">What We Do</div>
              <Reveal>
                <h2 className="section-title">Elite Offensive<br />Security Services</h2>
              </Reveal>
            </div>
            <Reveal>
              <p>Every engagement is manual, targeted, and tailored to your threat model. No automated scan reports.</p>
            </Reveal>
          </div>

          <div className="service-cards">
            {/* Card 1 */}
            <Reveal className="service-card">
              <div className="service-card-number">01</div>
              <div className="service-card-icon">
                <svg fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                  <rect x="6" y="8" width="36" height="26" rx="2" />
                  <path d="M16 34v6M32 34v6M12 40h24" />
                  <path d="M14 20l5 5 10-10" />
                </svg>
              </div>
              <div className="service-card-title">Web Application Pentesting</div>
              <p>Deep-dive manual testing following OWASP methodology and beyond. We identify injection flaws, auth bypasses, business logic vulnerabilities, and race conditions.</p>
              <div className="service-card-tags">
                <span className="service-tag">OWASP Top 10</span>
                <span className="service-tag">Auth Bypass</span>
                <span className="service-tag">API Security</span>
                <span className="service-tag">Race Conditions</span>
              </div>
              <div className="service-card-arrow">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Reveal>

            {/* Card 2 */}
            <Reveal className="service-card" delay={1}>
              <div className="service-card-number">02</div>
              <div className="service-card-icon">
                <svg fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                  <rect x="14" y="4" width="20" height="34" rx="3" />
                  <path d="M18 8h12M21 34h6" />
                  <path d="M20 16l3 3 6-6" />
                </svg>
              </div>
              <div className="service-card-title">Mobile Security Testing</div>
              <p>iOS and Android application security assessments covering static analysis, dynamic instrumentation, traffic interception, and insecure data storage patterns.</p>
              <div className="service-card-tags">
                <span className="service-tag">iOS / Android</span>
                <span className="service-tag">OWASP MASVS</span>
                <span className="service-tag">Frida</span>
                <span className="service-tag">SSL Pinning</span>
              </div>
              <div className="service-card-arrow">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Reveal>

            {/* Card 3 */}
            <Reveal className="service-card" delay={2}>
              <div className="service-card-number">03</div>
              <div className="service-card-icon">
                <svg fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="24" cy="24" r="18" />
                  <circle cx="24" cy="24" r="6" />
                  <path d="M24 6v4M24 38v4M6 24h4M38 24h4M10.93 10.93l2.83 2.83M34.24 34.24l2.83 2.83M10.93 37.07l2.83-2.83M34.24 13.76l2.83-2.83" />
                </svg>
              </div>
              <div className="service-card-title">Infrastructure & Network Testing</div>
              <p>External and internal network penetration testing. We identify lateral movement paths, privilege escalation routes, and critical asset exposures.</p>
              <div className="service-card-tags">
                <span className="service-tag">Active Directory</span>
                <span className="service-tag">Cloud (AWS/Azure)</span>
                <span className="service-tag">Lateral Movement</span>
                <span className="service-tag">Zero Trust</span>
              </div>
              <div className="service-card-arrow">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Reveal>

            {/* Card 4 */}
            <Reveal className="service-card" delay={3}>
              <div className="service-card-number">04</div>
              <div className="service-card-icon">
                <svg fill="none" viewBox="0 0 48 48" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 16h32M8 24h20M8 32h24" />
                  <path d="M36 28l6 6-6 6" />
                  <rect x="6" y="8" width="36" height="32" rx="2" />
                </svg>
              </div>
              <div className="service-card-title">Red Team Operations</div>
              <p>Full-scope adversary simulation. We emulate real threat actors using custom TTPs, physical access attempts, and social engineering campaigns.</p>
              <div className="service-card-tags">
                <span className="service-tag">APT Simulation</span>
                <span className="service-tag">MITRE ATT&CK</span>
                <span className="service-tag">C2 Frameworks</span>
                <span className="service-tag">Phishing</span>
              </div>
              <div className="service-card-arrow">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            </Reveal>
          </div>

          <Reveal style={{ textAlign: 'center', marginTop: '60px' }}>
            <Link to="/services" className="btn-outline">
              <span>View All Services</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section">
        <div className="process-inner">
          <div className="process-header">
            <div className="section-tag">Methodology</div>
            <h2 className="section-title">A Process Built for Zero Assumptions</h2>
            <p>A disciplined, repeatable process that delivers actionable results every engagement.</p>
          </div>
          <div className="process-steps" id="process-steps">
            <div className="process-line animated"></div>

            <Reveal className="process-step ps-1">
              <div className="process-node">
                <svg fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><circle cx="14" cy="14" r="8" /><path d="M20 20l6 6" /></svg>
              </div>
              <div className="process-step-num">01</div>
              <div className="process-step-label">Independent Reconnaissance</div>
              <div className="process-step-desc">No internal bias. External attacker perspective.</div>
            </Reveal>

            <Reveal className="process-step ps-2" delay={1}>
              <div className="process-node">
                <svg fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><path d="M16 4l10 6v8l-10 6L6 18V10l10-6z" /><path d="M16 4v20M6 10l10 6 10-6" /></svg>
              </div>
              <div className="process-step-num">02</div>
              <div className="process-step-label">Deep Technical Validation</div>
              <div className="process-step-desc">Every finding is verified, not scanned.</div>
            </Reveal>

            <Reveal className="process-step ps-3" delay={2}>
              <div className="process-node">
                <svg fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><path d="M6 26l8-8M20 6l6 6-14 14-6-6 14-14zM24 8l2 2" /></svg>
              </div>
              <div className="process-step-num">03</div>
              <div className="process-step-label">Real-World Exploitation</div>
              <div className="process-step-desc">We don't speculate - we prove.</div>
            </Reveal>

            <Reveal className="process-step ps-4" delay={3}>
              <div className="process-node">
                <svg fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><path d="M6 26V10l10-6 10 6v16" /><path d="M12 26v-8h8v8M16 10v4" /></svg>
              </div>
              <div className="process-step-num">04</div>
              <div className="process-step-label">Executive + Technical Reporting</div>
              <div className="process-step-desc">Clarity for both leadership and engineers.</div>
            </Reveal>

            <Reveal className="process-step ps-5" delay={4}>
              <div className="process-node">
                <svg fill="none" viewBox="0 0 32 32" stroke="currentColor" strokeWidth="1.5"><path d="M16 4l10 6v8c0 5.5-4.5 9.5-10 11-5.5-1.5-10-5.5-10-11V10l10-6z" /><path d="M11 15l3.5 3.5 7-7" /></svg>
              </div>
              <div className="process-step-num">05</div>
              <div className="process-step-label">Verified Remediation</div>
              <div className="process-step-desc">We ensure fixes actually eliminate risk.</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-inner">
          <Reveal className="stat-item">
            <div className="stat-number"><AnimatedCounter target={100} /><span className="stat-unit">%</span></div>
            <div className="stat-label">Manual Testing</div>
            <div className="stat-desc">True depth of testing where big firms cut corners with automation</div>
          </Reveal>
          <Reveal className="stat-item" delay={1}>
            <div className="stat-number">0</div>
            <div className="stat-label">False Positives</div>
            <div className="stat-desc">Every finding verified to remove buyer frustration and noise</div>
          </Reveal>
          <Reveal className="stat-item" delay={2}>
            <div className="stat-number" style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}>ATT&CK</div>
            <div className="stat-label">Aligned Methodology</div>
            <div className="stat-desc">Standardized methodology built on the industry-leading MITRE framework</div>
          </Reveal>
          <Reveal className="stat-item" delay={3}>
            <div className="stat-number"><AnimatedCounter target={72} /><span className="stat-unit">h</span></div>
            <div className="stat-label">Report Delivery</div>
            <div className="stat-desc">Maintains urgency and execution speed for critical remediation</div>
          </Reveal>
        </div>
      </section>

      {/* HOME CTA */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Don't Wait<br />for a Breach</h2>
          <p>Every day without a professional security assessment is a day your adversaries have the advantage. Let us find the gaps before they do.</p>
          <Link to="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Schedule Your Free Security Audit</span>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
