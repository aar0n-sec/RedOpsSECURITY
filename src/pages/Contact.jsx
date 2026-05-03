import { useState } from 'react';

// ✅ Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_ACCESS_KEY = '9ac2f23f-bd62-46d0-8b1c-7178668cbc89';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        e.target.reset();
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page active" id="page-contact">
      <div style={{ height: 'var(--nav-h)' }}></div>

      <div className="contact-page">
        <div className="contact-left">
          <div className="contact-left-grid"></div>
          <div className="contact-left-inner">
            <div className="section-tag" style={{ color: 'rgba(196,69,54,0.75)' }}>
              <span style={{ display: 'block', width: '20px', height: '1.5px', background: 'rgba(196,69,54,0.75)' }}></span>
              Free Security Audit
            </div>
            <h1 className="contact-headline">
              Don't Wait
              <em>for a Breach.</em>
            </h1>
            <p className="contact-sub">
              Schedule a no-obligation security consultation. We'll review your current posture, identify surface-level exposures, and recommend the right engagement scope - at no cost.
            </p>
            <div className="contact-perks">
              <div className="contact-perk">
                <div className="cp-check">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                Free initial consultation with a senior operator
              </div>
              <div className="contact-perk">
                <div className="cp-check">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                Tailored scope and pricing within 48 hours
              </div>
              <div className="contact-perk">
                <div className="cp-check">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                NDA signed before any information sharing
              </div>
              <div className="contact-perk">
                <div className="cp-check">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                No commitment, no hard sell
              </div>
              <div className="contact-perk">
                <div className="cp-check">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                Retest included on all engagements
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div id="contact-form-wrap" style={{ opacity: submitted ? 0 : 1, transform: submitted ? 'translateY(-20px)' : 'translateY(0)', transition: 'all 0.4s ease', display: submitted ? 'none' : 'block' }}>
            <div className="contact-form-title">Request Your Free Audit</div>
            <div className="contact-form-sub">Fill in your details and we'll be in touch within one business day.</div>

            <form id="contact-form" autoComplete="off" onSubmit={handleSubmit}>
              {/* Hidden fields required by Web3Forms */}
              <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
              <input type="hidden" name="subject" value="New Security Audit Request - RedOps" />
              <input type="hidden" name="from_name" value="RedOps Contact Form" />
              <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input type="text" name="first_name" className="form-input" placeholder="John" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input type="text" name="last_name" className="form-input" placeholder="Smith" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Work Email</label>
                <input type="email" name="email" className="form-input" placeholder="john@company.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input type="text" name="company" className="form-input" placeholder="Acme Corporation" required />
              </div>
              <div className="form-group">
                <label className="form-label">Company Website</label>
                <input type="text" name="website" className="form-input" placeholder="https://acme.com" />
              </div>
              <div className="form-group">
                <label className="form-label">What would you like tested?</label>
                <select name="service" className="form-input" style={{ cursor: 'none', WebkitAppearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px' }}>
                  <option value="">Select service</option>
                  <option>Web Application Penetration Test</option>
                  <option>Mobile Application Security</option>
                  <option>Network / Infrastructure Test</option>
                  <option>Red Team Operation</option>
                  <option>API Security Assessment</option>
                  <option>Not sure - need guidance</option>
                </select>
              </div>
              {/* hCaptcha - rendered automatically by Web3Forms script */}
              <div
                className="h-captcha"
                data-captcha="true"
                data-theme="dark"
                style={{ marginBottom: '16px' }}
              ></div>
              {error && (
                <div style={{ color: '#e05a4a', fontSize: '0.85rem', marginBottom: '12px', padding: '10px 14px', background: 'rgba(196,69,54,0.08)', borderRadius: '6px', border: '1px solid rgba(196,69,54,0.25)' }}>
                  {error}
                </div>
              )}
              <button type="submit" className="btn-primary btn-pulse form-submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <span>Sending&hellip;</span>
                ) : (
                  <>
                    <span>Request Free Security Audit</span>
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>
              <div className="form-trust">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                Your information is encrypted and never shared with third parties
              </div>
            </form>
          </div>

          <div className={`form-success ${submitted ? 'show' : ''}`} id="form-success" style={{ opacity: submitted ? 1 : 0, transform: submitted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.4s ease', display: submitted ? 'flex' : 'none' }}>
            <div className="form-success-icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3>Request Received</h3>
            <p>A senior operator will review your submission and respond within one business day. Check your email for a confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
