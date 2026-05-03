import { StaticRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import About from './pages/About';
import CaseStudies from './pages/CaseStudies';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

/**
 * SSR-safe App component.
 * Uses StaticRouter instead of BrowserRouter for server-side rendering.
 * Route tree mirrors the client-side App.jsx exactly.
 */
function AppSSR({ url }) {
  return (
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="about" element={<About />} />
          <Route path="case-studies" element={<CaseStudies />} />
          <Route path="resources" element={<Resources />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StaticRouter>
  );
}

export default AppSSR;
