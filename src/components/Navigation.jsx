import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav id="nav" className={`${scrolled || mobileMenuOpen ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-active' : ''}`}>
      <Link to="/" className="nav-logo" onClick={closeMenu}>
        <img className="nav-logo-img" src="/src/assets/logo-full.png" alt="RedOps Security" />
      </Link>

      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
        <li><Link to="/services" className={isActive('/services')} onClick={closeMenu}>Services</Link></li>
        <li><Link to="/about" className={isActive('/about')} onClick={closeMenu}>About</Link></li>
        <li><Link to="/case-studies" className={isActive('/case-studies')} onClick={closeMenu}>Case Studies</Link></li>
        <li><Link to="/resources" className={isActive('/resources')} onClick={closeMenu}>Resources</Link></li>
        <li className="mobile-nav-cta"><Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>Get Free Audit</Link></li>
      </ul>

      <Link to="/contact" className="nav-cta btn-primary" onClick={closeMenu}>
        <span>Get Free Audit</span>
      </Link>

      <button
        className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileMenuOpen}
        type="button"
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
};

export default Navigation;
