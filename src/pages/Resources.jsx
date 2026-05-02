import Reveal from '../components/Reveal';

const Resources = () => {
  return (
    <div className="page active" id="page-resources">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Resources</div>
          <h1 className="page-hero-title">Security Intelligence<br/>From the Field</h1>
          <p className="page-hero-sub">Practitioner-written guides, threat analysis, and attack breakdowns from our offensive security team.</p>
        </div>
      </div>

      <div className="resources-section">
        <div className="resources-grid">

          <Reveal className="resource-card">
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">Attack Technique</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">June 2025 · 12 min read</div>
              <div className="rc-title">JWT Algorithm Confusion: From Theory to Full Account Takeover</div>
              <div className="rc-excerpt">How a single algorithm parameter in JWT validation logic enables complete authentication bypass in production applications.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">12 min</span>
            </div>
          </Reveal>

          <Reveal className="resource-card" delay={1}>
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">Red Team</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">May 2025 · 18 min read</div>
              <div className="rc-title">Active Directory Attack Paths: BloodHound Analysis in Practice</div>
              <div className="rc-excerpt">A practitioner's walkthrough of identifying and exploiting BloodHound-derived attack paths to Domain Administrator in enterprise environments.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">18 min</span>
            </div>
          </Reveal>

          <Reveal className="resource-card" delay={2}>
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">Mobile Security</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">April 2025 · 9 min read</div>
              <div className="rc-title">Bypassing Biometric Auth in iOS Banking Apps with Frida</div>
              <div className="rc-excerpt">Dynamic instrumentation techniques for identifying and exploiting biometric authentication fallback weaknesses in financial mobile applications.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">9 min</span>
            </div>
          </Reveal>

          <Reveal className="resource-card">
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">Cloud Security</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">March 2025 · 15 min read</div>
              <div className="rc-title">AWS IAM Privilege Escalation: 20 Paths to Admin Access</div>
              <div className="rc-excerpt">Enumerating and exploiting the most common IAM misconfigurations that allow privilege escalation to administrator in AWS environments.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">15 min</span>
            </div>
          </Reveal>

          <Reveal className="resource-card" delay={1}>
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">Phishing</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">February 2025 · 11 min read</div>
              <div className="rc-title">Anatomy of a Spear Phishing Campaign That Achieved 94% Click Rate</div>
              <div className="rc-excerpt">A real-world phishing engagement dissection: target research, pretext development, and the psychological triggers that made it devastatingly effective.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">11 min</span>
            </div>
          </Reveal>

          <Reveal className="resource-card" delay={2}>
            <div className="rc-image">
              <div className="rc-image-pattern"></div>
              <span className="rc-category">API Security</span>
              <div className="rc-image-icon">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
            </div>
            <div className="rc-body">
              <div className="rc-meta">January 2025 · 14 min read</div>
              <div className="rc-title">GraphQL Security Testing: From Introspection to Data Exfiltration</div>
              <div className="rc-excerpt">Complete methodology for GraphQL API security testing, covering introspection abuse, IDOR, batching attacks, and nested query DoS.</div>
            </div>
            <div className="rc-footer">
              <span className="rc-read">Read Article →</span>
              <span className="rc-time">14 min</span>
            </div>
          </Reveal>
        </div>

        <Reveal className="resources-newsletter">
          <div>
            <div className="rn-title">Security Intelligence Newsletter</div>
            <div className="rn-sub">Monthly threat analysis and vulnerability research. No spam, unsubscribe anytime.</div>
          </div>
          <div className="rn-form">
            <input type="email" className="rn-input" placeholder="your@email.com" />
            <button className="rn-btn">Subscribe</button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Resources;
