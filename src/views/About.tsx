import Link from 'next/link';
import Reveal from '../components/Reveal';

const About = () => {
  return (
    <div className="page active" id="page-about">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <section className="about-mission">
        <div className="about-mission-inner">
          <div>
            <div className="section-tag" style={{ color: 'var(--red)' }}>
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'var(--red)' }}></span>
              Our Mission
            </div>
            <h1 className="section-title" style={{ color: 'var(--dark)', fontSize: 'clamp(44px,5.5vw,76px)', marginBottom: '28px' }}>We Attack<br/>Systems.<br/>To Protect<br/>Them.</h1>
            <p>RedOps Security was founded by practitioners who grew frustrated watching organizations invest in compliance theater while real adversaries walked through the front door.</p>
            <p>Our mandate is simple: simulate every viable attack path before a real threat actor discovers it. We don't run automated scanners and call it a pentest. We think, adapt, and persist - exactly like the adversaries targeting your business.</p>
            <p>Every engagement is led by senior operators with real-world offensive experience. No junior consultants. No templated reports. No ambiguity.</p>
          </div>
          <div className="about-visual">
            <div className="about-shield-wrap">
              <div className="about-ring about-ring-1"></div>
              <div className="about-ring about-ring-2"></div>
              <div className="about-ring about-ring-3"></div>
              <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 10L20 45V105C20 155 55 195 100 210C145 195 180 155 180 105V45L100 10Z" stroke="#C44536" strokeWidth="2" fill="rgba(196,69,54,0.05)"/>
                <path d="M100 30L38 60V108C38 148 65 182 100 194C135 182 162 148 162 108V60L100 30Z" stroke="#C44536" strokeWidth="1" strokeDasharray="4 4" fill="rgba(196,69,54,0.03)"/>
                <path d="M70 105L88 123L132 82" stroke="#C44536" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="100" cy="102" r="3" fill="#C44536"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="about-philosophy">
        <div className="section-tag">Our Philosophy</div>
        <Reveal><h2 className="section-title">How We Think<br/>About Security</h2></Reveal>
        <div className="philosophy-grid" style={{ marginTop: '60px' }}>
          <Reveal className="philosophy-card">
            <div className="philosophy-num">01</div>
            <div className="philosophy-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <div className="philosophy-title">Attacker Mindset</div>
            <div className="philosophy-desc">We approach every target the way a motivated threat actor would - without assumptions, without shortcuts, and without stopping until the objective is reached or proven unreachable.</div>
          </Reveal>
          <Reveal className="philosophy-card" delay={1}>
            <div className="philosophy-num">02</div>
            <div className="philosophy-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <div className="philosophy-title">Manual Testing Only</div>
            <div className="philosophy-desc">Automated scanners are a starting point, not an endpoint. Every finding is manually verified, contextually understood, and chained to demonstrate real-world impact.</div>
          </Reveal>
          <Reveal className="philosophy-card" delay={2}>
            <div className="philosophy-num">03</div>
            <div className="philosophy-icon">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div className="philosophy-title">Risk-Oriented Reporting</div>
            <div className="philosophy-desc">We translate technical findings into business risk. Your board and your engineers both need to understand the impact - we write for both audiences simultaneously.</div>
          </Reveal>
        </div>
      </section>

      <section className="about-why">
        <div className="about-why-inner">
          <div className="section-tag">Why RedOps</div>
          <Reveal><h2 className="section-title">What Makes Us Different</h2></Reveal>
          <div className="why-grid">
            <Reveal className="why-item">
              <div className="why-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <div className="why-title">Senior-Only Operators</div>
                <div className="why-desc">Every engagement is led and executed by OSCP/OSCE-certified senior consultants with 7+ years of offensive experience. No handoffs to juniors.</div>
              </div>
            </Reveal>
            <Reveal className="why-item" delay={1}>
              <div className="why-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              </div>
              <div>
                <div className="why-title">Custom Tooling</div>
                <div className="why-desc">We develop and maintain proprietary offensive tooling that evades modern EDRs. Our custom implants and payloads reflect what real APTs actually use.</div>
              </div>
            </Reveal>
            <Reveal className="why-item" delay={2}>
              <div className="why-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <div>
                <div className="why-title">Actionable Reports</div>
                <div className="why-desc">Reports are written for impact, not volume. Clear severity ratings, business context, reproduction steps, and specific remediation code where applicable.</div>
              </div>
            </Reveal>
            <Reveal className="why-item" delay={3}>
              <div className="why-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              </div>
              <div>
                <div className="why-title">Free Retest Included</div>
                <div className="why-desc">Every engagement includes one free retest of all critical and high findings. We don't consider a job done until we've confirmed your remediation works.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Work with the<br/>Best in the Field</h2>
          <p>Our team has identified vulnerabilities in Fortune 500 infrastructure, fintech platforms, and critical government systems.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Start a Conversation</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default About;
