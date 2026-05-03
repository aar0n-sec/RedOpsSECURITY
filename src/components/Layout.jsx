import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import SeoHead from './SeoHead';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  return (
    <>
      <SeoHead />
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;

