import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const CaseStudies = () => {
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

        <Reveal className="case-study-item">
          <div className="csi-header">
            <div>
              <div className="csi-title">Authentication Bypass in Global Fintech Platform</div>
              <div className="csi-sub">Web Application Penetration Test - 2024</div>
            </div>
            <div className="csi-badge">CRITICAL</div>
          </div>
          <div className="csi-body">
            <div>
              <div className="csi-section-label">The Scenario</div>
              <p className="csi-text">A Series C fintech platform processing $2B+ in annual transactions engaged RedOps for a black-box web application penetration test ahead of a major product launch. The client believed their OAuth2 implementation was secure following an internal review.</p>
              <p className="csi-text">Within 48 hours of testing, our team identified a chain of vulnerabilities that allowed complete authentication bypass, full account takeover, and unauthorized access to all transaction records.</p>
              <div className="csi-outcome">
                <div className="csi-section-label" style={{ marginBottom: '10px' }}>Outcome</div>
                <p>The client delayed their launch, remediated all critical findings in 12 days, and retested successfully before going live. Estimated regulatory exposure avoided: $4M+ in GDPR fines.</p>
              </div>
            </div>
            <div>
              <div className="csi-section-label">Key Findings</div>
              <div className="csi-findings">
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-critical">Critical</span>
                  <div className="csi-finding-text">JWT algorithm confusion (RS256→HS256) allowing forged tokens for any user account including administrator</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-critical">Critical</span>
                  <div className="csi-finding-text">IDOR in transaction API - sequential IDs exposed all user transactions without authentication after JWT bypass</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">OAuth2 state parameter not validated, enabling CSRF against OAuth flow for account linkage hijacking</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">Webhook endpoint vulnerable to SSRF allowing internal network enumeration and metadata service access</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-medium">Medium</span>
                  <div className="csi-finding-text">Rate limiting absent on OTP endpoint enabling brute-force of 6-digit verification codes in under 3 minutes</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="case-study-item">
          <div className="csi-header">
            <div>
              <div className="csi-title">Domain Compromise in 4 Hours - Healthcare Network</div>
              <div className="csi-sub">Internal Network Penetration Test - 2024</div>
            </div>
            <div className="csi-badge">CRITICAL</div>
          </div>
          <div className="csi-body">
            <div>
              <div className="csi-section-label">The Scenario</div>
              <p className="csi-text">A regional healthcare network with 8 hospitals and 12,000 employees commissioned an internal network penetration test. The client had recently passed a HIPAA audit and considered their Active Directory environment hardened.</p>
              <p className="csi-text">Starting from a guest network drop point, our team achieved full Domain Administrator access within 4 hours and 12 minutes. Patient records, medical devices, and financial systems were within reach.</p>
              <div className="csi-outcome">
                <div className="csi-section-label" style={{ marginBottom: '10px' }}>Outcome</div>
                <p>The engagement revealed that HIPAA compliance did not equal security. The client implemented a 90-day remediation plan, segmented their network, and engaged RedOps for quarterly testing. HIPAA fine exposure addressed: $10M+.</p>
              </div>
            </div>
            <div>
              <div className="csi-section-label">Attack Path</div>
              <div className="csi-findings">
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-critical">Critical</span>
                  <div className="csi-finding-text">Kerberoastable service account with weak password (cracked offline in 8 minutes) had Domain Admin membership</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-critical">Critical</span>
                  <div className="csi-finding-text">Unconstrained Kerberos delegation on legacy print server allowed privilege escalation via printer bug (PrintNightmare)</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">SMB signing disabled across 847 workstations enabling NTLM relay attacks from guest VLAN</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">Medical device VLAN reachable from corporate network - 43 internet-connected devices running Windows XP</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="case-study-item">
          <div className="csi-header">
            <div>
              <div className="csi-title">Supply Chain Risk in Mobile Banking Application</div>
              <div className="csi-sub">Mobile Application Security Assessment - 2023</div>
            </div>
            <div className="csi-badge">HIGH</div>
          </div>
          <div className="csi-body">
            <div>
              <div className="csi-section-label">The Scenario</div>
              <p className="csi-text">A digital bank with 500,000 active users requested a mobile application security assessment of their iOS and Android apps. The focus was on authentication flows and data protection at rest and in transit.</p>
              <p className="csi-text">Our assessment uncovered a vulnerable third-party analytics SDK embedded in the app that was exfiltrating sensitive data to an unauthorized endpoint - a supply chain compromise the client was unaware of.</p>
              <div className="csi-outcome">
                <div className="csi-section-label" style={{ marginBottom: '10px' }}>Outcome</div>
                <p>The compromised SDK was removed and replaced within 48 hours. The client implemented a mobile SDK vetting process and engaged for annual mobile assessments. Regulatory notification was made to avoid mandatory reporting penalties.</p>
              </div>
            </div>
            <div>
              <div className="csi-section-label">Key Findings</div>
              <div className="csi-findings">
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-critical">Critical</span>
                  <div className="csi-finding-text">Third-party analytics SDK exfiltrating user PII (name, email, device fingerprint) to non-disclosed endpoint in Eastern Europe</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">Biometric authentication bypassable via Frida hook - app fell back to PIN without re-authentication requirement</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-high">High</span>
                  <div className="csi-finding-text">Account balance and transaction history cached in cleartext in SQLite database accessible without root on Android</div>
                </div>
                <div className="csi-finding">
                  <span className="csi-finding-sev sev-medium">Medium</span>
                  <div className="csi-finding-text">SSL certificate pinning bypassable using standard Frida script - no custom pinning implementation</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

      </div>

      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Your Findings<br/>Are Waiting</h2>
          <p>Every unassessed system has vulnerabilities. The question is whether you find them - or someone else does.</p>
          <Link to="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}><span>Schedule Your Assessment</span></Link>
        </Reveal>
      </section>
    </div>
  );
};

export default CaseStudies;
