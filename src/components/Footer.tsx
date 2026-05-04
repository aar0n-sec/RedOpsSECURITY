'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import logoFull from '../assets/logo-full.png';
import logoDark from '../assets/logo-dark-theme.png';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Image className="footer-logo-img" src={theme === 'light' ? logoFull : logoDark} alt="RedOps Security" />
            <p>Securing your digital frontiers with elite intelligence.</p>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services Overview</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/resources">Blogs</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Our Services</div>
            <ul className="footer-links">
              <li><Link href="/services/vapt">Network VAPT</Link></li>
              <li><Link href="/services/mobile-pentest">Mobile App Security</Link></li>
              <li><Link href="/services/web-pentest">Web App Security</Link></li>
              <li><Link href="/services/cloud-security">Cloud Security</Link></li>
              <li><Link href="/services/red-teaming">Red Teaming</Link></li>
              <li><Link href="/services/grc">GRC & Compliance</Link></li>
              <li><Link href="/services/iso">ISO 27001</Link></li>
              <li><Link href="/services/webdev">Secure Development</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li>Email: contact@redops.in</li>
            </ul>
            <Link href="/contact" className="btn-primary" style={{ marginTop: '20px', fontSize: '10px', padding: '12px 20px' }}>
              <span>Get a Quote</span>
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">&copy; 2026 Redops. All rights reserved.</div>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Responsible Disclosure</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
