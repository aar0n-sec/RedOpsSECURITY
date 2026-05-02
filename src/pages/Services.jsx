import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

const Services = () => {
  return (
    <div className="page active" id="page-services">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Our Services</div>
          <h1 className="page-hero-title">Offensive Security<br/>at Every Layer</h1>
          <p className="page-hero-sub">From web applications to full red team operations, every engagement is bespoke, manual, and aligned to real threat actor TTPs.</p>
        </div>
      </div>

      <div className="services-detail-section">
        {/* Web App */}
        <div className="service-detail-block">
          <div>
            <div className="sdb-label">01 - Web Application Security</div>
            <Reveal><h2 className="sdb-title">Web App<br/>Penetration Testing</h2></Reveal>
            <p className="sdb-desc">Manual, depth-first testing that goes well beyond OWASP Top 10. We trace data flows, analyze business logic, and chain vulnerabilities to demonstrate real-world impact.</p>
            <Reveal>
              <ul className="sdb-list">
                <li>Authentication and session management flaws</li>
                <li>Server-side injection (SQL, SSTI, XXE, SSRF)</li>
                <li>Broken access control and IDOR</li>
                <li>Business logic bypass and race conditions</li>
                <li>GraphQL and REST API endpoint abuse</li>
                <li>Client-side attacks (XSS, CSRF, DOM manipulation)</li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="sdb-outcomes">
                <div className="sdb-outcomes-title">Deliverables</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Executive-level risk summary</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Technical vulnerability report with PoC</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Remediation guidance per finding</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Free retest upon remediation</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="sdb-visual">
            <div className="sdb-visual-card">
              <div className="sdb-vc-header">
                <div className="sdb-vc-dot" style={{ background: '#ff5f57' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#28c840' }}></div>
                <div className="sdb-vc-title-text">redops-scan.py - LIVE</div>
              </div>
              <div className="code-comment"># Target: api.target-corp.com</div><br/>
              <span className="code-blue">[*]</span> Initiating recon phase...<br/>
              <span className="code-green">[+]</span> Endpoints discovered: 147<br/>
              <span className="code-green">[+]</span> Auth endpoints identified: 12<br/>
              <span className="code-yellow">[!]</span> JWT alg:none bypass - CONFIRMED<br/>
              <span className="code-red">[CRITICAL]</span> IDOR at /api/v2/users/{`{id}`}<br/>
              <span className="code-red">[CRITICAL]</span> SQLi at /api/search?q=<br/>
              <span className="code-green">[+]</span> SSRF in webhook handler<br/>
              <span className="code-blue">[*]</span> Building exploit chain...<br/>
              <span className="code-yellow">[!]</span> Full data exfil possible<br/><br/>
              <span className="code-comment"># Impact: CRITICAL - RCE achieved</span>
            </div>
            <div style={{ marginTop: '20px', padding: '20px 24px', background: 'var(--bg-warm)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--dark-soft)', marginBottom: '12px' }}>Risk Breakdown</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '12px', width: '60px', fontFamily: 'var(--mono)', color: '#dc2626' }}>Critical</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px' }}><div style={{ width: '35%', height: '100%', background: '#dc2626', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--dark-soft)' }}>4</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '12px', width: '60px', fontFamily: 'var(--mono)', color: '#ea580c' }}>High</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px' }}><div style={{ width: '55%', height: '100%', background: '#ea580c', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--dark-soft)' }}>7</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '12px', width: '60px', fontFamily: 'var(--mono)', color: '#b45309' }}>Medium</div>
                  <div style={{ flex: 1, height: '4px', background: 'var(--border)', borderRadius: '2px' }}><div style={{ width: '75%', height: '100%', background: '#b45309', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '12px', fontFamily: 'var(--mono)', color: 'var(--dark-soft)' }}>11</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Mobile */}
        <div className="service-detail-block reverse">
          <div>
            <div className="sdb-label">02 - Mobile Security</div>
            <Reveal><h2 className="sdb-title">Mobile App<br/>Security Testing</h2></Reveal>
            <p className="sdb-desc">Comprehensive iOS and Android security assessments using both static (SAST) and dynamic (DAST) techniques with real device testing and instrumentation frameworks.</p>
            <Reveal>
              <ul className="sdb-list">
                <li>Insecure data storage (Keychain, SharedPrefs)</li>
                <li>SSL pinning bypass and certificate validation</li>
                <li>Dynamic instrumentation with Frida</li>
                <li>Reverse engineering and binary analysis</li>
                <li>API communication interception</li>
                <li>Deep link and intent abuse</li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="sdb-outcomes">
                <div className="sdb-outcomes-title">Testing Scope</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Static binary analysis (MobSF + manual)</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Dynamic runtime testing on real devices</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>API backend testing included</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>OWASP MASVS compliance mapping</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="sdb-visual">
            <div className="sdb-visual-card">
              <div className="sdb-vc-header">
                <div className="sdb-vc-dot" style={{ background: '#ff5f57' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#28c840' }}></div>
                <div className="sdb-vc-title-text">frida-hook.js - ANDROID</div>
              </div>
              <span className="code-comment">// Hooking SSL validation</span><br/>
              Java.perform(<span className="code-blue">function</span>() {`{`}<br/>
              &nbsp;&nbsp;<span className="code-yellow">var</span> TrustMgr = Java.use(<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-green">'com.target.ssl.TrustMgr'</span><br/>
              &nbsp;&nbsp;);<br/>
              &nbsp;&nbsp;TrustMgr.checkServerTrusted<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;.implementation = <span className="code-blue">function</span>() {`{`}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;console.log(<span className="code-green">"[*] SSL bypassed"</span>);<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{`}`}<br/>
              {`}`});<br/><br/>
              <span className="code-red">[*]</span> Pinning bypassed<br/>
              <span className="code-green">[+]</span> Traffic intercepted: ✓<br/>
              <span className="code-yellow">[!]</span> API keys in memory: FOUND
            </div>
          </Reveal>
        </div>

        {/* Network */}
        <div className="service-detail-block">
          <div>
            <div className="sdb-label">03 - Infrastructure</div>
            <Reveal><h2 className="sdb-title">Network &<br/>Infrastructure Testing</h2></Reveal>
            <p className="sdb-desc">External and internal penetration testing of your network perimeter, cloud environments, and Active Directory infrastructure. We map the full attack path to domain compromise.</p>
            <Reveal>
              <ul className="sdb-list">
                <li>External perimeter assessment</li>
                <li>Active Directory attack paths (Kerberoasting, AS-REP)</li>
                <li>Cloud configuration review (AWS, Azure, GCP)</li>
                <li>Firewall and segmentation validation</li>
                <li>VPN and remote access testing</li>
                <li>Privilege escalation to Domain Admin</li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="sdb-outcomes">
                <div className="sdb-outcomes-title">Attack Vectors Tested</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Kerberoasting and Pass-the-Hash</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>BloodHound AD graph analysis</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Cloud IAM misconfiguration</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Lateral movement simulation</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="sdb-visual">
            <div className="sdb-visual-card">
              <div className="sdb-vc-header">
                <div className="sdb-vc-dot" style={{ background: '#ff5f57' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#28c840' }}></div>
                <div className="sdb-vc-title-text">bloodhound-query.py</div>
              </div>
              <span className="code-blue">[*]</span> BloodHound analysis...<br/>
              <span className="code-green">[+]</span> Domain Users: 1,847<br/>
              <span className="code-green">[+]</span> Admin accounts: 23<br/>
              <span className="code-yellow">[!]</span> Kerberoastable SPNs: 14<br/><br/>
              <span className="code-comment"># Shortest path to DA:</span><br/>
              ServiceAcct <span className="code-red">→</span> IT_Admins<br/>
              IT_Admins <span className="code-red">→</span> DOMAIN ADMIN<br/><br/>
              <span className="code-red">[CRITICAL]</span> Unconstrained delegation<br/>
              <span className="code-red">[CRITICAL]</span> Pass-the-Hash viable<br/>
              <span className="code-green">[+]</span> Domain compromise: <span className="code-red">ACHIEVED</span>
            </div>
          </Reveal>
        </div>

        {/* Red Team */}
        <div className="service-detail-block reverse">
          <div>
            <div className="sdb-label">04 - Red Team Operations</div>
            <Reveal><h2 className="sdb-title">Full-Scope<br/>Red Team Ops</h2></Reveal>
            <p className="sdb-desc">Realistic adversary simulation using custom tooling, OPSEC-aware TTPs, and multi-vector attack scenarios. We test your people, process, and technology simultaneously.</p>
            <Reveal>
              <ul className="sdb-list">
                <li>Spear phishing and vishing campaigns</li>
                <li>Custom C2 infrastructure and implants</li>
                <li>Physical access and badge cloning</li>
                <li>Living-off-the-land techniques (LOLBAS)</li>
                <li>MITRE ATT&CK framework mapping</li>
                <li>Purple team collaboration and debrief</li>
              </ul>
            </Reveal>
            <Reveal>
              <div className="sdb-outcomes">
                <div className="sdb-outcomes-title">Engagement Phases</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Initial access (phishing, exploitation)</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Persistence and C2 establishment</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Lateral movement to crown jewels</div>
                <div className="sdb-outcome-item"><div className="sdb-outcome-dot"></div>Action on objectives / Exfiltration</div>
              </div>
            </Reveal>
          </div>
          <Reveal className="sdb-visual">
            <div className="sdb-visual-card">
              <div className="sdb-vc-header">
                <div className="sdb-vc-dot" style={{ background: '#ff5f57' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="sdb-vc-dot" style={{ background: '#28c840' }}></div>
                <div className="sdb-vc-title-text">c2-beacon.log</div>
              </div>
              <span className="code-blue">[*]</span> Listener started on port 443<br/>
              <span className="code-green">[+]</span> Initial check-in: WIN-DK93M2<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;User: CORP\j.smith<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;Privs: Medium<br/>
              <span className="code-blue">[*]</span> Executing seatbelt.exe...<br/>
              <span className="code-yellow">[!]</span> Found vulnerable driver (CVE-2022-XXXX)<br/>
              <span className="code-blue">[*]</span> Exploiting LPE...<br/>
              <span className="code-green">[+]</span> SYSTEM privileges acquired<br/>
              <span className="code-blue">[*]</span> Dumping LSASS memory...<br/>
              <span className="code-red">[CRITICAL]</span> Extracted Domain Admin NTLM<br/>
              <span className="code-green">[+]</span> OpSec: AMSI bypassed successfully
            </div>
          </Reveal>
        </div>
      </div>
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Ready to Test<br/>Your Defenses?</h2>
          <p>Start with a scoped conversation. No commitment, no hard sell - just an honest assessment of your security posture.</p>
          <Link to="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Request a Consultation</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
