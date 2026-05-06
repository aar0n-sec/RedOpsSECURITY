import Link from 'next/link';
import Reveal from '../components/Reveal';
import { resourceData } from '@/data/resources';

const ResourceDetail = ({ slug }: { slug: string }) => {
  const resource = resourceData[slug];

  if (!resource) {
    return (
      <div className="page active">
        <div style={{ height: 'var(--nav-h)' }}></div>
        <div className="sd-not-found">
          <h1>Resource Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
          <Link href="/resources" className="btn-primary"><span>Back to Resources</span></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page active" id="page-resource-detail">
      <div style={{ height: 'var(--nav-h)' }}></div>

      {/* Hero */}
      <div className="sd-hero resource-detail-hero">
        <div className="page-hero-grid"></div>
        <div className="sd-hero-inner">
          <Reveal>
            <Link href="/resources" className="sd-back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Resources
            </Link>
          </Reveal>
          <Reveal>
            <div className="rd-category-tag">{resource.category}</div>
          </Reveal>
          <Reveal>
            <h1 className="sd-hero-title rd-title">{resource.title}</h1>
          </Reveal>
          <Reveal>
            <div className="rd-meta">
              <span>{resource.date}</span>
              <span className="rd-meta-sep">•</span>
              <span>{resource.readTime} read</span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Article Content */}
      <section className="rd-content-section">
        <div className="rd-content-inner">
          <Reveal>
            <div 
              className="rd-rich-text"
              dangerouslySetInnerHTML={{ __html: resource.content }}
            />
          </Reveal>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="rd-footer-cta">
        <Reveal className="resources-newsletter rd-newsletter">
          <div>
            <div className="rn-title">Stay Updated</div>
            <div className="rn-sub">Get our latest security research and attack breakdowns delivered to your inbox.</div>
          </div>
          <div className="rn-form">
            <input type="email" className="rn-input" placeholder="your@email.com" />
            <button className="rn-btn">Subscribe</button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default ResourceDetail;
