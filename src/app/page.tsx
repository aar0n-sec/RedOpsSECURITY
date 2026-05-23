import Script from 'next/script';
import Home from '@/views/Home';
import { createPageMetadata, SITE_URL } from '@/seo';

export const metadata = createPageMetadata('/');

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RedOps Security',
  url: SITE_URL,
  logo: `${SITE_URL}/_next/static/media/logo-full.12i1rqlsamcr9.png`,
  sameAs: [
    'https://www.linkedin.com/company/redops-security',
    'https://twitter.com/redopssec',
    'https://github.com/redops-security',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@redops.in',
    contactType: 'sales',
  },
};

export default function Page() {
  return (
    <>
      <Script
        id="homepage-organization-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Home />
    </>
  );
}
