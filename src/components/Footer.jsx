import { Link } from 'react-router-dom';
import logoFull from '../assets/logo-full.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoFull} alt="RedOps Security" style={{ height: '64px', marginBottom: '16px' }} />
            <p>Elite offensive security services. We think like adversaries so you can build like defenders.</p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              <li><Link to="/services">Web App Pentesting</Link></li>
              <li><Link to="/services">Mobile Security</Link></li>
              <li><Link to="/services">Network Testing</Link></li>
              <li><Link to="/services">Red Team Ops</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 RedOps Security. All rights reserved.</div>
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
