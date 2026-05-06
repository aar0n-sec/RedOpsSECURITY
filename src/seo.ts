import type { Metadata } from 'next';
import { resourceData } from './data/resources';

// Per-page SEO metadata for Next.js metadata generation
// Each route gets its own title, description, and OpenGraph tags

type SeoEntry = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
};

export const SITE_URL = 'https://redops.in';
export const SITE_NAME = 'RedOps Security';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const SEO_DATA: Record<string, SeoEntry> = {
  '/': {
    title: 'RedOps Security - Elite Offensive Security & Penetration Testing',
    description: 'RedOps Security delivers elite penetration testing, vulnerability assessments, and offensive security services that expose real-world attack surfaces before adversaries do.',
    keywords: 'penetration testing, offensive security, red team, vulnerability assessment, cybersecurity, VAPT, pentest',
  },
  '/services': {
    title: 'Offensive Security Services - RedOps Security',
    description: 'Comprehensive offensive security services including web application pentesting, mobile security, network VAPT, red teaming, cloud security, GRC compliance, and ISO 27001 implementation.',
    keywords: 'penetration testing services, web application security, mobile pentest, network VAPT, red team operations, cloud security, GRC compliance',
  },
  '/services/vapt': {
    title: 'Network VAPT - Vulnerability Assessment & Penetration Testing | RedOps Security',
    description: 'Military-grade black-box, gray-box, and white-box penetration tests across your entire network. Active Directory exploitation, lateral movement simulation, and cloud infrastructure audits.',
    keywords: 'network VAPT, vulnerability assessment, penetration testing, Active Directory, lateral movement, cloud audit',
  },
  '/services/mobile-pentest': {
    title: 'Mobile Application Security Testing | RedOps Security',
    description: 'Comprehensive iOS and Android security assessments. Binary reversing, API traffic interception, runtime manipulation with Frida, and biometric authentication bypass testing.',
    keywords: 'mobile security testing, iOS pentest, Android security, Frida, SSL pinning bypass, mobile VAPT',
  },
  '/services/web-pentest': {
    title: 'Web Application Penetration Testing | RedOps Security',
    description: 'Deep manual testing of complex web applications. OWASP methodology, business logic abuse, authentication bypasses, injection attacks, and API security audits.',
    keywords: 'web application pentest, OWASP, SQL injection, XSS, API security, business logic testing',
  },
  '/services/cloud-security': {
    title: 'Cloud Security Assessments - AWS, Azure, GCP | RedOps Security',
    description: 'In-depth cloud security reviews and penetration testing across AWS, Azure, and GCP. IAM privilege escalation, Kubernetes security, and serverless function auditing.',
    keywords: 'cloud security, AWS pentest, Azure security, GCP assessment, IAM privilege escalation, Kubernetes security',
  },
  '/services/red-teaming': {
    title: 'Red Team Operations - Adversarial Simulation | RedOps Security',
    description: 'Full-spectrum adversarial simulations testing your Blue Team detection and response. Social engineering, physical intrusion, custom malware, and C2 operations.',
    keywords: 'red team, adversarial simulation, social engineering, phishing, C2 framework, APT simulation',
  },
  '/services/grc': {
    title: 'GRC & Compliance Services | RedOps Security',
    description: 'Governance, Risk, and Compliance alignment for tech companies. Risk assessments, security architecture reviews, vendor risk management, and GDPR/CCPA compliance.',
    keywords: 'GRC, governance risk compliance, SOC2, GDPR, CCPA, risk assessment, vendor risk management',
  },
  '/services/iso': {
    title: 'ISO 27001 Implementation & Certification | RedOps Security',
    description: 'End-to-end ISO 27001 certification guidance. Gap analysis, ISMS policy creation, internal audits, and Stage 2 audit preparation.',
    keywords: 'ISO 27001, ISMS, certification, gap analysis, internal audit, information security management',
  },
  '/services/webdev': {
    title: 'Secure Development Lifecycle (SDLC) | RedOps Security',
    description: 'Security-first web application development. DevSecOps pipeline integration, secure architecture design, automated SAST/DAST, and threat modeling.',
    keywords: 'secure SDLC, DevSecOps, secure coding, SAST, DAST, threat modeling, secure web development',
  },
  '/about': {
    title: 'About RedOps Security - Our Mission & Team',
    description: 'Founded by offensive security practitioners. Senior-only operators with OSCP/OSCE certifications and 7+ years of experience. Manual testing, no automation, actionable reports.',
    keywords: 'about RedOps, offensive security team, OSCP, OSCE, penetration testing experts',
  },
  '/case-studies': {
    title: 'Case Studies - Real Findings, Real Impact | RedOps Security',
    description: 'Anonymized case studies from real penetration testing engagements. Authentication bypasses, domain compromise, and supply chain vulnerabilities discovered before adversaries.',
    keywords: 'penetration testing case studies, security findings, vulnerability discovery, real-world exploits',
  },
  '/resources': {
    title: 'Security Intelligence & Resources | RedOps Security',
    description: 'Practitioner-written guides, threat analysis, and attack breakdowns. JWT exploitation, Active Directory attacks, mobile security, cloud IAM, and API security research.',
    keywords: 'security resources, threat intelligence, attack techniques, security research, penetration testing guides',
  },
  '/contact': {
    title: 'Get a Free Security Audit - Contact RedOps Security',
    description: 'Schedule a no-obligation security consultation. Free initial assessment, tailored scope within 48 hours, NDA before information sharing. Start protecting your business today.',
    keywords: 'contact RedOps, free security audit, penetration testing consultation, security assessment',
  },
};

// Default fallback
const DEFAULT_SEO: SeoEntry = {
  title: 'RedOps Security - Offensive Security & Penetration Testing',
  description: 'RedOps Security delivers elite penetration testing, vulnerability assessments, and offensive security services that expose real-world attack surfaces before adversaries do.',
  keywords: 'penetration testing, offensive security, cybersecurity',
  image: OG_IMAGE_URL,
};

export function getSeoForRoute(path: string): SeoEntry {
  // Check for dynamic resource routes
  if (path.startsWith('/resources/')) {
    const slug = path.split('/').pop();
    const resource = slug ? resourceData[slug] : null;
    if (resource) {
      return {
        title: `${resource.title} | RedOps Security`,
        description: resource.excerpt,
        keywords: `${resource.category.toLowerCase()}, ${resource.title.toLowerCase().replace(/:/g, '')}, security research, red team, pentest`,
      };
    }
  }

  return SEO_DATA[path] || DEFAULT_SEO;
}

export function createPageMetadata(path: string): Metadata {
  const seo = getSeoForRoute(path);
  const url = path === '/' ? '/' : path;
  const image = seo.image || DEFAULT_SEO.image || OG_IMAGE_URL;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: 'Cybersecurity',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: 'article',
      siteName: 'RedOps Security',
      locale: 'en_US',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Offensive Security & Penetration Testing`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [image],
    },
  };
}

export function generateMetaTags(path: string) {
  const seo = getSeoForRoute(path);
  const url = `https://redops.in${path === '/' ? '' : path}`;
  const image = seo.image || DEFAULT_SEO.image;
  
  return `
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}">
    <meta name="keywords" content="${seo.keywords}">
    <meta property="og:title" content="${seo.title}">
    <meta property="og:description" content="${seo.description}">
    <meta property="og:url" content="${url}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="RedOps Security">
    <meta property="og:image" content="${image}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${seo.title}">
    <meta name="twitter:description" content="${seo.description}">
    <meta name="twitter:image" content="${image}">
    <link rel="canonical" href="${url}">
  `;
}

export function generateArticleSchema(path: string) {
  if (!path.startsWith('/resources/')) return null;
  
  const slug = path.split('/').pop();
  const resource = slug ? resourceData[slug] : null;
  if (!resource) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': resource.title,
    'description': resource.excerpt,
    'datePublished': resource.date, // Note: ISO format would be better but keeping consistency
    'author': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/favicon.png`
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${path}`
    },
    'image': OG_IMAGE_URL
  };
}

// All static routes
const STATIC_ROUTES = [
  '/',
  '/services',
  '/services/vapt',
  '/services/mobile-pentest',
  '/services/web-pentest',
  '/services/cloud-security',
  '/services/red-teaming',
  '/services/grc',
  '/services/iso',
  '/services/webdev',
  '/about',
  '/case-studies',
  '/resources',
  '/contact',
];

// All routes to pre-render (including dynamic ones)
export const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...Object.keys(resourceData).map(slug => `/resources/${slug}`)
];

export default SEO_DATA;
