import Link from 'next/link';
import Reveal from '../components/Reveal';
import { ShareIcon as Network, DevicePhoneMobileIcon as Smartphone, GlobeAltIcon as Globe, CloudIcon as Cloud, ShieldExclamationIcon as ShieldAlert, ClipboardDocumentCheckIcon as ClipboardCheck, ShieldCheckIcon as ShieldCheck, CommandLineIcon as Code2 } from '@heroicons/react/24/outline';

type ServiceCard = {
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

const Services = () => {
  const offensiveServices: ServiceCard[] = [
    {
      slug: 'vapt',
      icon: <Network width={32} height={32} strokeWidth={1.5} />,
      title: 'Network VAPT',
      description: 'We execute military-grade black-box, gray-box, and white-box penetration tests across your entire external perimeter and internal networks. Discover hidden misconfigurations, unpatched zero-days, and internal pivot points before the adversaries do.',
      features: [
        'Active Directory Exploitation',
        'Lateral Movement Simulation',
        'Cloud Infrastructure Audits',
        'Zero-Trust Architecture Review',
        'Advanced Persistent Threat (APT) Emulation',
        'Wireless & Rogue Device Assessments',
      ],
    },
    {
      slug: 'mobile-pentest',
      icon: <Smartphone width={32} height={32} strokeWidth={1.5} />,
      title: 'Mobile Application Security',
      description: 'Comprehensive dynamic and static analysis (DAST/SAST) of iOS and Android applications. We reverse-engineer APKs and IPAs to find hardcoded secrets, insecure APIs, and bypass jailbreak detections.',
      features: [
        'Binary Reversing & Decompilation',
        'API Traffic Interception & Tampering',
        'Insecure Data Storage Analysis',
        'IPC Mechanism Vulnerabilities',
        'Runtime Manipulation & Hooking',
        'Biometric Authentication Bypasses',
      ],
    },
    {
      slug: 'web-pentest',
      icon: <Globe width={32} height={32} strokeWidth={1.5} />,
      title: 'Web Application Penetration',
      description: 'Deep manual testing of complex web applications. We go beyond automated scanners to chain vulnerabilities like SSRF, XSS, and IDOR, demonstrating critical business impact and data exfiltration scenarios.',
      features: [
        'Complex Business Logic Abuse',
        'Authentication & Authorization Bypasses',
        'Zero-Day Scenario Testing',
        'Advanced Injection Attacks (SQLi, NoSQLi)',
        'Client-Side Exploitation (DOM XSS)',
        'Deep API & GraphQL Security Audits',
      ],
    },
    {
      slug: 'cloud-security',
      icon: <Cloud width={32} height={32} strokeWidth={1.5} />,
      title: 'Cloud Security Assessments',
      description: 'In-depth architectural reviews and penetration testing across AWS, Azure, and GCP environments. We identify IAM misconfigurations, exposed storage, and container escape vectors to secure your cloud-native infrastructure.',
      features: [
        'IAM Privilege Escalation Checks',
        'Kubernetes & Docker Security',
        'Serverless Function Auditing',
        'Cloud Posture Management (CSPM)',
        'VPC Network Segmentation Reviews',
        'CI/CD Pipeline Security',
      ],
    },
    {
      slug: 'red-teaming',
      icon: <ShieldAlert width={32} height={32} strokeWidth={1.5} />,
      title: 'Red Teaming Operations',
      description: "Full-spectrum, objective-based adversarial simulations. We test your Blue Team's detection and response capabilities by deploying advanced social engineering, physical intrusion tactics, and stealthy malware.",
      features: [
        'Phishing & Spear-Phishing Campaigns',
        'Physical Security Bypasses',
        'Custom Malware & C2 Development',
        'Insider Threat Emulation',
        'Blue Team Evasion Tactics',
        'Open-Source Intelligence (OSINT)',
      ],
    },
    {
      slug: 'grc',
      icon: <ClipboardCheck width={32} height={32} strokeWidth={1.5} />,
      title: 'GRC & Compliance',
      description: 'Governance, Risk, and Compliance alignment tailored for fast-moving tech companies. We translate complex technical risks into boardroom-ready metrics, bridging the gap between security engineering and executive strategy.',
      features: [
        'Comprehensive Risk Assessments',
        'Security Architecture Review',
        '3rd-Party Vendor Risk Management',
        'GDPR & CCPA Data Privacy Mapping',
        'Threat Intelligence Integration',
        'Executive Cybersecurity Strategy',
      ],
    },
    {
      slug: 'iso',
      icon: <ShieldCheck width={32} height={32} strokeWidth={1.5} />,
      title: 'ISO 27001 Implementation',
      description: 'From zero to full certification. We guide you through building a robust ISMS, defining exact scopes, conducting rigorous internal audits, and preparing your organization to flawlessly defend against the final Stage 2 certification.',
      features: [
        'Comprehensive Gap Analysis',
        'Bespoke ISMS Policy Creation',
        'External Audit Defense Strategy',
        'Asset Management & Risk Treatment',
        'Continuous Compliance Monitoring',
        'Employee Security Awareness Training',
      ],
    },
  ];

  const devService: ServiceCard = {
    slug: 'webdev',
    icon: <Code2 width={40} height={40} strokeWidth={1.5} />,
    title: 'Secure Development Lifecycle (SDLC)',
    description: 'We build Next.js, React, and Node.js applications tailored to your exact business needs. Every line of code is reviewed by our offensive security team, ensuring your application is immune to common web vectors before it even hits production.',
    features: [
      'DevSecOps Pipeline Integration',
      'Secure Architecture Design',
      'High-Performance Web Platforms',
      'Automated SAST/DAST Tooling',
      'Threat Modeling at Design Phase',
      'Secure Coding Guidelines & Training',
    ],
  };

  const processSteps = [
    {
      title: 'Reconnaissance',
      desc: 'OSINT, DNS enumeration, and digital footprint mapping to identify all exposed assets.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
      ),
    },
    {
      title: 'Threat Modeling',
      desc: 'Analyzing application logic to map out high-value targets and potential attack vectors.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      title: 'Vulnerability Discovery',
      desc: 'Automated scanning combined with intense manual probing to identify exploitable flaws.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: 'Exploitation',
      desc: 'Safely executing exploits to chain vulnerabilities and demonstrate real-world impact.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
    },
    {
      title: 'Reporting & Debrief',
      desc: 'Delivering actionable intelligence with developer-friendly remediation steps and PoC videos.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
  ];

  return (
    <div className="page active" id="page-services">
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero Section */}
      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Our Services</div>
          <h1 className="page-hero-title">Offensive Security<br/>at Every Layer</h1>
          <p className="page-hero-sub">Our elite methodologies dissect and secure your digital infrastructure. We combine advanced adversarial tactics, continuous research, and battle-tested frameworks to identify critical vulnerabilities before they can be exploited. From bespoke penetration testing to comprehensive GRC alignment, our tailored security solutions ensure your digital assets remain unbreachable in an ever-evolving threat landscape.</p>
        </div>
      </div>

      {/* Offensive Services Grid */}
      <section className="svcs-grid-section">
        <div className="svcs-grid-inner">
          <Reveal>
            <div className="svcs-grid-header">
              <div className="section-tag">Core Services</div>
              <h2 className="section-title" style={{ marginBottom: '16px' }}>Enterprise Security Solutions</h2>
              <h3>Manual Penetration Testing & Offensive Audits</h3>
              <p className="svcs-grid-subtitle">Our core offensive and defensive cybersecurity services. We simulate the world's most sophisticated threat actors to uncover systemic vulnerabilities across your entire digital infrastructure. From deep-dive web application penetration testing to full-scale ISO 27001 compliance implementations, we provide end-to-end security solutions for modern enterprises.</p>
            </div>
          </Reveal>

          <div className="svcs-cards-grid">
            {offensiveServices.map((svc) => (
              <Reveal key={svc.slug}>
                <Link href={`/services/${svc.slug}`} className="svcs-card">
                  <div className="svcs-card-icon-wrap">
                    <div className="svcs-card-icon-header">
                      <div className="svcs-term-dot" style={{ background: '#ff5f57' }}></div>
                      <div className="svcs-term-dot" style={{ background: '#ffbd2e' }}></div>
                      <div className="svcs-term-dot" style={{ background: '#28c840' }}></div>
                    </div>
                    {svc.icon}
                  </div>
                  <div className="svcs-card-content">
                    <h3 className="svcs-card-title">{svc.title}</h3>
                    <p className="svcs-card-desc">{svc.description}</p>
                    <ul className="svcs-card-features">
                      {svc.features.map((f, i) => (
                        <li key={i}><span className="svcs-check">&#10003;</span> {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="svcs-card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Secure Development Section */}
      <section className="svcs-dev-section">
        <div className="svcs-dev-inner">
          <Reveal>
            <div className="svcs-dev-header">
              <div className="section-tag">Secure Engineering</div>
              <p className="svcs-dev-subtitle">Stop bolting security on at the end of the SDLC. Our elite engineering team builds high-performance, scalable web applications and bespoke software solutions with security integrated natively from day one. We bridge the gap between rapid development and uncompromised security.</p>
            </div>
          </Reveal>

          <Reveal>
            <Link href={`/services/${devService.slug}`} className="svcs-dev-card">
              <div className="svcs-dev-card-icon">
                <div className="svcs-card-icon-header">
                  <div className="svcs-term-dot" style={{ background: '#ff5f57' }}></div>
                  <div className="svcs-term-dot" style={{ background: '#ffbd2e' }}></div>
                  <div className="svcs-term-dot" style={{ background: '#28c840' }}></div>
                </div>
                {devService.icon}
              </div>
              <div className="svcs-dev-card-content">
                <h3 className="svcs-card-title">{devService.title}</h3>
                <p className="svcs-card-desc">{devService.description}</p>
                <ul className="svcs-card-features svcs-dev-features">
                  {devService.features.map((f, i) => (
                    <li key={i}><span className="svcs-check">&#10003;</span> {f}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Pentesting Process */}
      <section className="svcs-process-section">
        <div className="svcs-process-inner">
          <Reveal>
            <div className="svcs-process-header">
              <div className="section-tag">Methodology</div>
              <h2 className="section-title">The Redops<br/>Pentesting Process</h2>
              <p>A rigorous, battle-tested methodology designed to uncover the deepest vulnerabilities before malicious actors do.</p>
            </div>
          </Reveal>

          <div className="svcs-process-steps">
            {processSteps.map((step, idx) => (
              <Reveal key={idx}>
                <div className="svcs-process-step">
                  <div className="svcs-process-node">
                    <div className="svcs-process-num">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="svcs-process-icon">{step.icon}</div>
                  </div>
                  <h4 className="svcs-process-title">{step.title}</h4>
                  <p className="svcs-process-desc">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Ready to Test<br/>Your Defenses?</h2>
          <p>Start with a scoped conversation. No commitment, no hard sell - just an honest assessment of your security posture.</p>
          <Link href="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Scope Your Assessment</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default Services;
