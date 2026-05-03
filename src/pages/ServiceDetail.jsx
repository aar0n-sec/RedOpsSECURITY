import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Reveal from '../components/Reveal';

const serviceData = {
  vapt: {
    title: 'Network VAPT',
    subtitle: 'Vulnerability Assessment and Penetration Testing',
    filename: 'nmap-scan.sh',
    code: [
      { type: 'comment', text: '// Running internal network scan' },
      { type: 'cmd', text: 'nmap -sS -p- -T4 10.0.0.1/24' },
      { type: 'info', text: '[*] Discovered open port 445/tcp on 10.0.0.15' },
      { type: 'warning', text: '[!] SMBv1 enabled. Potential vulnerability.' },
      { type: 'success', text: '[+] Exploiting MS17-010...' },
      { type: 'info', text: '[*] Meterpreter session 1 opened. System compromised.' },
    ],
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
    filename: 'frida-hook.js',
    code: [
      { type: 'comment', text: '// Hooking SSL validation' },
      { type: 'keyword', text: 'Java.perform(function() {' },
      { type: 'keyword', text: '  var TrustMgr = Java.use(' },
      { type: 'string', text: "    'com.target.ssl.TrustMgr'" },
      { type: 'normal', text: '  );' },
      { type: 'normal', text: '  TrustMgr.checkServerTrusted' },
      { type: 'keyword', text: '    .implementation = function() {' },
      { type: 'string', text: '      console.log("[*] SSL bypassed");' },
      { type: 'normal', text: '    }' },
      { type: 'normal', text: '});' },
      { type: 'info', text: '[*] Pinning bypassed' },
      { type: 'success', text: '[+] Traffic intercepted: \u2713' },
      { type: 'warning', text: '[!] API keys in memory: FOUND' },
    ],
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
    filename: 'burp-intercept.txt',
    code: [
      { type: 'cmd', text: 'POST /api/v1/update_profile HTTP/1.1' },
      { type: 'normal', text: 'Host: target-application.com' },
      { type: 'normal', text: 'Cookie: session_id=abc123xyz' },
      { type: 'normal', text: 'Content-Type: application/json' },
      { type: 'normal', text: '' },
      { type: 'warning', text: '{"user_id": 1, "role": "admin"}' },
      { type: 'info', text: '[*] Insecure Direct Object Reference successful.' },
      { type: 'success', text: '[+] Response: 200 OK' },
      { type: 'success', text: '[+] Privilege escalated to ADMIN.' },
    ],
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
    filename: 'aws-enum.sh',
    code: [
      { type: 'cmd', text: 'aws s3 ls --profile pentest' },
      { type: 'warning', text: '[!] Public Bucket Found: company-backups-prd' },
      { type: 'info', text: '[*] Dumping sensitive IAM keys...' },
      { type: 'success', text: '[+] Successfully assumed role: arn:aws:iam::123:role/Admin' },
    ],
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
    filename: 'c2-beacon.py',
    code: [
      { type: 'keyword', text: 'import cobaltstrike' },
      { type: 'keyword', text: 'import memory_injection' },
      { type: 'info', text: '[*] Injecting shellcode into explorer.exe...' },
      { type: 'success', text: '[+] Beacon active (PID: 1337)' },
      { type: 'info', text: '[*] Establishing persistent HTTPS C2 tunnel' },
      { type: 'warning', text: '[!] Bypassing local EDR/AV solutions... Success.' },
    ],
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
    filename: 'audit-check.ts',
    code: [
      { type: 'comment', text: '// Automated Compliance Check' },
      { type: 'keyword', text: "import { checkControls } from 'compliance-core';" },
      { type: 'keyword', text: 'await checkControls({' },
      { type: 'string', text: "  framework: 'SOC2_Type2'," },
      { type: 'string', text: "  resources: ['AWS_S3', 'IAM', 'RDS']" },
      { type: 'normal', text: '});' },
      { type: 'info', text: '[*] Validating 145 security controls...' },
      { type: 'success', text: '[+] 144/145 Controls passed.' },
      { type: 'warning', text: '[!] S3 bucket public access misconfigured.' },
      { type: 'info', text: '[*] Generating executive risk report.' },
    ],
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
    filename: 'isms-validator.js',
    code: [
      { type: 'comment', text: '// ISMS Continuous Validation Script' },
      { type: 'keyword', text: 'const auditStatus = runInternalAudit("ISO_27001");' },
      { type: 'keyword', text: 'if (auditStatus.nonConformities > 0) {' },
      { type: 'normal', text: '  triggerRemediationPipeline();' },
      { type: 'normal', text: '}' },
      { type: 'success', text: '[+] Risk Assessment Matrix: COMPLETED' },
      { type: 'success', text: '[+] Access Control Policies: VALIDATED' },
      { type: 'info', text: '[*] Incident Response Plan: TESTED' },
      { type: 'info', text: '[*] Organization is ready for Stage 2 Audit.' },
    ],
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
    filename: 'next-secure.config.js',
    code: [
      { type: 'comment', text: '// Secure Next.js Configuration' },
      { type: 'keyword', text: 'const securityHeaders = [' },
      { type: 'normal', text: '  {' },
      { type: 'string', text: "    key: 'Content-Security-Policy'," },
      { type: 'string', text: "    value: \"default-src 'self'; script-src 'self'\"" },
      { type: 'normal', text: '  },' },
      { type: 'normal', text: '  {' },
      { type: 'string', text: "    key: 'X-XSS-Protection'," },
      { type: 'string', text: "    value: '1; mode=block'" },
      { type: 'normal', text: '  }' },
      { type: 'normal', text: '];' },
      { type: 'success', text: '[+] SecureHeaders injected into build pipeline.' },
      { type: 'success', text: '[+] Automated SAST complete: 0 High Vulnerabilities.' },
      { type: 'success', text: '[+] Application compiled securely.' },
    ],
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

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = serviceData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="page active">
        <div style={{ height: 'var(--nav-h)' }}></div>
        <div className="sd-not-found">
          <h1>Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/services" className="btn-primary"><span>Back to Services</span></Link>
        </div>
      </div>
    );
  }

  const renderCodeLine = (line, i) => {
    switch (line.type) {
      case 'comment':
        return <div key={i} className="sd-code-line"><span className="code-comment">{line.text}</span></div>;
      case 'keyword':
        return <div key={i} className="sd-code-line"><span className="code-blue">{line.text}</span></div>;
      case 'cmd':
        return <div key={i} className="sd-code-line"><span className="code-green">{line.text}</span></div>;
      case 'string':
        return <div key={i} className="sd-code-line"><span className="code-green">{line.text}</span></div>;
      case 'info':
        return <div key={i} className="sd-code-line"><span className="code-blue">{line.text}</span></div>;
      case 'success':
        return <div key={i} className="sd-code-line"><span className="code-green">{line.text}</span></div>;
      case 'warning':
        return <div key={i} className="sd-code-line"><span className="code-yellow">{line.text}</span></div>;
      case 'error':
        return <div key={i} className="sd-code-line"><span className="code-red">{line.text}</span></div>;
      default:
        return <div key={i} className="sd-code-line">{line.text}</div>;
    }
  };

  return (
    <div className="page active" id="page-service-detail">
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero */}
      <div className="sd-hero">
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <Link to="/services" className="sd-back-link">
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

      {/* Terminal Code Block */}
      <section className="sd-terminal-section">
        <div className="sd-terminal-inner">
          <Reveal>
            <div className="sd-terminal-card">
              <div className="sd-terminal-header">
                <div className="svcs-term-dot" style={{ background: '#ff5f57' }}></div>
                <div className="svcs-term-dot" style={{ background: '#ffbd2e' }}></div>
                <div className="svcs-term-dot" style={{ background: '#28c840' }}></div>
                <span className="svcs-term-filename">{service.filename}</span>
              </div>
              <div className="sd-terminal-body">
                {service.code.map((line, i) => renderCodeLine(line, i))}
              </div>
            </div>
          </Reveal>
        </div>
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
                <Link to="/contact" className="btn-primary sd-quote-btn">
                  <span>Get a Quote for {service.title}</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta">
        <Reveal className="home-cta-inner">
          <h2 className="section-title">Ready to<br/>Get Started?</h2>
          <p>Discuss your security requirements with our team. We'll scope a custom engagement tailored to your needs.</p>
          <Link to="/contact" className="btn-primary btn-pulse" style={{ margin: '0 auto', fontSize: '13px', padding: '18px 48px' }}>
            <span>Request a Consultation</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default ServiceDetail;
