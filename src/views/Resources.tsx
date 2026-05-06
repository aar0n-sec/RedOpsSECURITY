import Link from 'next/link';
import Reveal from '../components/Reveal';
import { resourceData } from '@/data/resources';

const Resources = () => {
  const resources = Object.values(resourceData);

  return (
    <div className="page active" id="page-resources">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="page-hero">
        <div className="page-hero-grid"></div>
        <div className="page-hero-inner">
          <div className="section-tag">Resources</div>
          <h1 className="page-hero-title">Security Intelligence<br />From the Field</h1>
          <p className="page-hero-sub">Practitioner-written guides, threat analysis, and attack breakdowns from our offensive security team.</p>
        </div>
      </div>

      <div className="resources-section">
        <div className="resources-grid">
          {resources.map((resource, index) => (
            <Reveal key={resource.slug} className="resource-card" delay={index % 3}>
              <Link href={`/resources/${resource.slug}`} className="rc-link-wrapper">
                <div className="rc-image">
                  <div className="rc-image-pattern"></div>
                  <span className="rc-category">{resource.category}</span>
                  <div className="rc-image-icon">
                    {resource.icon === 'lock' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    )}
                    {resource.icon === 'network' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" /></svg>
                    )}
                    {resource.icon === 'mobile' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                    )}
                    {resource.icon === 'cloud' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
                    )}
                    {resource.icon === 'mail' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )}
                    {resource.icon === 'api' && (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1"><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    )}
                  </div>
                </div>
                <div className="rc-body">
                  <div className="rc-meta">{resource.date} · {resource.readTime} read</div>
                  <div className="rc-title">{resource.title}</div>
                  <div className="rc-excerpt">{resource.excerpt}</div>
                </div>
                <div className="rc-footer">
                  <span className="rc-read">Read Article →</span>
                  <span className="rc-time">{resource.readTime}</span>
                </div>
              </Link>
            </Reveal>
          ))}
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
