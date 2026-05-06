import Link from 'next/link';
import Reveal from '../components/Reveal';

type Service = {
  title: string;
  subtitle: string;
  overview: string;
  approach: string;
  deliverables: string[];
};

export const serviceData: Record<string, Service> = {
  vapt: {
    title: 'Network VAPT',
    subtitle: 'Vulnerability Assessment and Penetration Testing',
    overview: 'We execute military-grade black-box, gray-box, and white-box penetration tests across your entire external perimeter and internal networks. Our elite team uses advanced adversarial techniques to uncover deeply hidden misconfigurations, unpatched zero-days, and pivot points before the adversaries do.',
    approach: 'Our VAPT process involves aggressive reconnaissance, custom payload generation tailored to your specific environment, and safe exploitation. We go beyond simple vulnerability scanning to demonstrate real-world impact and logical flaws without disrupting your daily operations.',
    deliverables: [
      'Active Directory Exploitation',
      'Lateral Movement Simulation',
      'Cloud Infrastructure Audits',
      'Zero-Trust Architecture Review',
      'Advanced Persistent Threat (APT) Emulation',
      'Wireless & Rogue Device Assessments',
    ],
  },
  'mobile-pentest': {
    title: 'Mobile Application Security',
    subtitle: 'Deep-dive security assessments for iOS and Android',
    overview: 'Comprehensive dynamic and static analysis (DAST/SAST) of your mobile ecosystem. We reverse-engineer APKs and IPAs to find hardcoded secrets, analyze insecure API communications, and test the resilience of your local storage mechanisms against dedicated attackers.',
    approach: 'We meticulously decompile your applications to review source code structure, proxy backend traffic through Burp Suite to identify hidden API flaws, and perform advanced runtime manipulation using specialized frameworks like Frida and Objection.',
    deliverables: [
      'Binary Reversing & Decompilation',
      'API Traffic Interception & Tampering',
      'Insecure Data Storage Analysis',
      'IPC Mechanism Vulnerabilities',
      'Runtime Manipulation & Hooking',
      'Biometric Authentication Bypasses',
    ],
  },
  'web-pentest': {
    title: 'Web Application Penetration',
    subtitle: 'Thorough evaluation of web apps and APIs',
    overview: 'Deep manual testing of complex web applications. We go far beyond automated scanners to chain vulnerabilities like Server-Side Request Forgery (SSRF), Cross-Site Scripting (XSS), and Insecure Direct Object References (IDOR), demonstrating critical business impact and data exfiltration scenarios.',
    approach: 'Our methodology maps out the entire application attack surface, exhaustively tests state-handling and authentication mechanisms, fuzzes input parameters with bespoke dictionaries, and chains seemingly low-severity bugs to achieve high-impact compromise.',
    deliverables: [
      'Complex Business Logic Abuse',
      'Authentication & Authorization Bypasses',
      'Zero-Day Scenario Testing',
      'Advanced Injection Attacks (SQLi, NoSQLi)',
      'Client-Side Exploitation (DOM XSS)',
      'Deep API & GraphQL Security Audits',
    ],
  },
  'cloud-security': {
    title: 'Cloud Security Assessments',
    subtitle: 'Securing AWS, Azure, and GCP Environments',
    overview: 'In-depth architectural reviews and penetration testing across major cloud environments. We identify subtle IAM misconfigurations, exposed storage blobs, and complex container escape vectors to secure your cloud-native infrastructure against modern threat actors.',
    approach: 'We utilize a combination of programmatic cloud APIs and manual configuration reviews. We assess your cloud foundation from the perspective of an external attacker and an insider threat, ensuring defense-in-depth across your entire cloud estate.',
    deliverables: [
      'IAM Privilege Escalation Checks',
      'Kubernetes & Docker Security',
      'Serverless Function Auditing',
      'Cloud Posture Management (CSPM)',
      'VPC Network Segmentation Reviews',
      'CI/CD Pipeline Security',
    ],
  },
  'red-teaming': {
    title: 'Red Teaming Operations',
    subtitle: 'Full-spectrum Adversarial Simulations',
    overview: "Objective-based, full-spectrum adversarial simulations designed to test your entire organization. We challenge your Blue Team's detection and response capabilities by deploying advanced social engineering, physical intrusion tactics, and stealthy, custom-built malware.",
    approach: 'Our red team engagements are typically long-term operations simulating a real threat actor. We start with extensive OSINT, move to initial access via social engineering or zero-day exploits, establish persistence, and attempt to achieve predefined objectives without triggering alarms.',
    deliverables: [
      'Phishing & Spear-Phishing Campaigns',
      'Physical Security Bypasses',
      'Custom Malware & C2 Development',
      'Insider Threat Emulation',
      'Blue Team Evasion Tactics',
      'Open-Source Intelligence (OSINT)',
    ],
  },
  grc: {
    title: 'GRC & Compliance',
    subtitle: 'Governance, Risk, and Compliance alignment',
    overview: 'Strategic alignment of your cybersecurity posture with business objectives. We build robust, scalable governance frameworks, translating complex technical risks into boardroom-ready metrics. We bridge the gap between security engineering and executive strategy.',
    approach: 'We meticulously audit your existing policies against rigorous industry benchmarks, identify critical compliance gaps, and work hand-in-hand with leadership to build a sustainable, business-aligned risk management framework.',
    deliverables: [
      'Comprehensive Risk Assessments',
      'Security Architecture Review',
      '3rd-Party Vendor Risk Management',
      'GDPR & CCPA Data Privacy Mapping',
      'Threat Intelligence Integration',
      'Executive Cybersecurity Strategy',
    ],
  },
  iso: {
    title: 'ISO 27001 Implementation',
    subtitle: 'End-to-end guidance for ISMS certification',
    overview: 'From zero to full certification. We guide your organization through building an Information Security Management System (ISMS), defining exact scopes, conducting rigorous internal audits, and preparing your team to flawlessly defend against the final Stage 2 certification.',
    approach: 'Our experts lead you through Phase 1 scoping, establish all mandatory documentation, assist in implementing critical technical controls, and act as your virtual CISO to ensure you pass your external audits with flying colors.',
    deliverables: [
      'Comprehensive Gap Analysis',
      'Bespoke ISMS Policy Creation',
      'External Audit Defense Strategy',
      'Asset Management & Risk Treatment',
      'Continuous Compliance Monitoring',
      'Employee Security Awareness Training',
    ],
  },
  webdev: {
    title: 'Secure Development Lifecycle (SDLC)',
    subtitle: 'Building highly performant, secure web applications',
    overview: 'Stop bolting security on at the end of the SDLC. Our elite engineering team builds high-performance Next.js, React, and Node.js applications tailored to your exact business needs with security integrated natively from day one.',
    approach: 'We utilize a strict, secure Software Development Life Cycle. This includes thorough threat modeling during the design phase, integrated SAST checks during coding, dynamic DAST assessments during testing, and continuous monitoring post-deployment.',
    deliverables: [
      'DevSecOps Pipeline Integration',
      'Secure Architecture Design',
      'High-Performance Web Platforms',
      'Automated SAST/DAST Tooling',
      'Threat Modeling at Design Phase',
      'Secure Coding Guidelines & Training',
    ],
  },
};

const ServiceDetail = ({ slug }: { slug: string }) => {
  const service = serviceData[slug];

  if (!service) {
    return (
      <div className="page active">
        <div style={{ height: 'var(--nav-h)' }}></div>
        <div className="sd-not-found">
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link href="/services" className="btn-primary"><span>Back to Services</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page active" id="page-service-detail">
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero */}
      <div className="sd-hero">
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <Link href="/services" className="sd-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
          </Reveal>
          <Reveal>
            <h1 className="sd-hero-title">{service.title}</h1>
          </Reveal>
          <Reveal>
            <p className="sd-hero-subtitle">{service.subtitle}</p>
          </Reveal>
        </div>
      </div>

      {/* Trust Banner */}
      <section className="sd-trust-banner" style={{ padding: '20px 0', borderBottom: '1px solid var(--border)', background: 'var(--bg-lighter)', textAlign: 'center' }}>
        <Reveal>
          <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.6, marginBottom: '10px' }}>Securing infrastructure across modern stacks</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)', fontFamily: 'var(--font-jetbrains-mono)' }}>
            <span>AWS</span>
            <span>Azure</span>
            <span>GCP</span>
            <span>Kubernetes</span>
            <span>React</span>
            <span>Node.js</span>
            <span>SOC 2</span>
            <span>ISO 27001</span>
          </div>
        </Reveal>
      </section>

      {/* Overview & Approach */}
      <section className="sd-content-section">
        <div className="sd-content-inner">
          <div className="sd-content-grid">
            <div className="sd-content-left">
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">Overview</h2>
                  <p className="sd-section-text">{service.overview}</p>
                </div>
              </Reveal>
              <Reveal>
                <div className="sd-section-block">
                  <h2 className="sd-section-title">The Approach</h2>
                  <p className="sd-section-text">{service.approach}</p>
                </div>
              </Reveal>
            </div>

            <div className="sd-content-right">
              <Reveal>
                <div className="sd-deliverables">
                  <h3 className="sd-deliverables-title">Key Deliverables</h3>
                  <ul className="sd-deliverables-list">
                    {service.deliverables.map((d, i) => (
                      <li key={i}>
                        <span className="sd-deliverable-check">&#10003;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal>
                <Link href="/contact" className="btn-primary sd-quote-btn" style={{ textAlign: 'center', display: 'block' }}>
                  <span>Scope Your Assessment</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Ready to Test<br/>Your Defenses?</h2>
          <p>Schedule a scoping call with our senior operators. Free initial attack surface review, tailored scope within 48 hours.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default ServiceDetail;
