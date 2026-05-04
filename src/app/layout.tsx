import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import '../index.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { OG_IMAGE_URL, SITE_NAME, SITE_URL } from '@/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'RedOps Security - Offensive Security & Penetration Testing',
  description:
    'RedOps Security delivers elite penetration testing, vulnerability assessments, and offensive security services that expose real-world attack surfaces before adversaries do.',
  manifest: undefined,
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  image: OG_IMAGE_URL,
  description:
    'RedOps Security delivers penetration testing, vulnerability assessments, red team operations, cloud security assessments, and cybersecurity compliance services.',
  areaServed: 'Global',
  serviceType: [
    'Penetration Testing',
    'Vulnerability Assessment',
    'Red Team Operations',
    'Cloud Security Assessment',
    'Mobile Application Security Testing',
    'Web Application Penetration Testing',
    'ISO 27001 Implementation',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700&family=Barlow:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4ZJ1PYVMN4" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4ZJ1PYVMN4');
          `}
        </Script>
        <Script
          id="organization-json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProvider>
          <Navigation />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
