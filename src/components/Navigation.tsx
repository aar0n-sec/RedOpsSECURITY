'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import logoFull from '../assets/logo-full.png';
import logoDark from '../assets/logo-dark-theme.png';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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

  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <nav id="nav" className={`${scrolled || mobileMenuOpen ? 'scrolled' : ''} ${mobileMenuOpen ? 'menu-active' : ''}`}>
      <Link href="/" className="nav-logo" onClick={closeMenu}>
        <Image className="nav-logo-img" src={theme === 'light' ? logoFull : logoDark} alt="RedOps Security" priority />
      </Link>

      <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
        <li><Link href="/" className={isActive('/')} onClick={closeMenu}>Home</Link></li>
        <li><Link href="/services" className={isActive('/services')} onClick={closeMenu}>Services</Link></li>
        <li><Link href="/about" className={isActive('/about')} onClick={closeMenu}>About</Link></li>
        <li><Link href="/case-studies" className={isActive('/case-studies')} onClick={closeMenu}>Case Studies</Link></li>
        <li><Link href="/resources" className={isActive('/resources')} onClick={closeMenu}>Resources</Link></li>
        <li className="mobile-nav-cta"><Link href="/contact" className={isActive('/contact')} onClick={closeMenu}>Get Free Audit</Link></li>
      </ul>

      <div className="nav-actions">
        <button 
          onClick={toggleTheme} 
          className="theme-toggle" 
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <Link href="/contact" className="nav-cta btn-primary" onClick={closeMenu}>
          <span>Get Free Audit</span>
        </Link>
      </div>

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
