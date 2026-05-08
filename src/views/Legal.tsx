import Reveal from '../components/Reveal';

const LegalPage = ({ title, lastUpdated, children }: { title: string; lastUpdated: string; children: React.ReactNode }) => {
  return (
    <div className="page active">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <section className="sd-hero" style={{ minHeight: '30vh', padding: '60px 0' }}>
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <h1 className="sd-hero-title">{title}</h1>
            <p className="sd-hero-subtitle" style={{ color: 'var(--primary)' }}>Last Updated: {lastUpdated}</p>
          </Reveal>
        </div>
      </section>

      <section className="sd-content-section" style={{ borderTop: '1px solid var(--border)', padding: '80px 0' }}>
        <div className="sd-content-inner">
          <div className="sd-section-block legal-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Reveal>
              {children}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy" lastUpdated="May 8, 2026">
    <div className="legal-text">
      <h2>1. Introduction</h2>
      <p>At RedOps Security, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.</p>
      
      <h2>2. Information We Collect</h2>
      <p>We may collect information that you provide directly to us, such as when you request a quote, sign up for our newsletter, or contact us for support. This may include your name, email address, company name, and any other information you choose to provide.</p>
      
      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you about your account or our services, and to send you marketing materials if you have opted in to receive them.</p>
      
      <h2>4. Information Sharing and Disclosure</h2>
      <p>We do not sell or rent your personal information to third parties. We may share your information with service providers who perform services on our behalf, or when required by law or to protect our rights.</p>
      
      <h2>5. Security</h2>
      <p>We implement reasonable security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet is 100% secure.</p>
      
      <h2>6. Your Choices</h2>
      <p>You may opt out of receiving marketing emails from us by following the instructions in those emails. You may also request to access, correct, or delete your personal information by contacting us.</p>
    </div>
  </LegalPage>
);

export const TermsOfService = () => (
  <LegalPage title="Terms of Service" lastUpdated="May 8, 2026">
    <div className="legal-text">
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using the RedOps Security website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
      
      <h2>2. Use of Services</h2>
      <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
      
      <h2>3. Intellectual Property</h2>
      <p>The content, features, and functionality of our website and services are owned by RedOps Security and are protected by intellectual property laws. You may not use our trademarks or copyrighted materials without our prior written consent.</p>
      
      <h2>4. Limitation of Liability</h2>
      <p>In no event shall RedOps Security be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or services.</p>
      
      <h2>5. Indemnification</h2>
      <p>You agree to indemnify and hold RedOps Security harmless from any claims, losses, or damages arising out of your breach of these Terms or your use of our services.</p>
      
      <h2>6. Governing Law</h2>
      <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RedOps Security is located, without regard to its conflict of law provisions.</p>
    </div>
  </LegalPage>
);

export const ResponsibleDisclosure = () => (
  <LegalPage title="Responsible Disclosure Policy" lastUpdated="May 8, 2026">
    <div className="legal-text">
      <h2>Our Commitment</h2>
      <p>At RedOps Security, we believe that the security of our systems is a top priority. We appreciate the work of security researchers and are committed to working with the community to identify and resolve vulnerabilities.</p>
      
      <h2>Guidelines</h2>
      <p>If you believe you have found a security vulnerability in our systems, please follow these guidelines:</p>
      <ul>
        <li>Notify us as soon as possible by emailing <a href="mailto:security@redops.security">security@redops.security</a>.</li>
        <li>Provide a detailed description of the vulnerability and steps to reproduce it.</li>
        <li>Do not exploit the vulnerability further or access unauthorized data.</li>
        <li>Give us a reasonable amount of time to resolve the issue before disclosing it publicly.</li>
      </ul>
      
      <h2>Exclusions</h2>
      <p>The following are excluded from our responsible disclosure program:</p>
      <ul>
        <li>Social engineering or phishing attacks.</li>
        <li>Physical security attacks.</li>
        <li>Denial of service (DoS) attacks.</li>
        <li>Vulnerabilities in third-party services.</li>
      </ul>
      
      <h2>Safe Harbor</h2>
      <p>We will not take legal action against researchers who discover and report vulnerabilities in accordance with these guidelines.</p>
    </div>
  </LegalPage>
);
