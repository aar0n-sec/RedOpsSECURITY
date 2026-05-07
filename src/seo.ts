import type { Metadata } from 'next';
import { resourceData } from './data/resources';
import { caseStudiesData } from './data/case-studies';
import { authorsData } from './data/authors';

// Per-page SEO metadata for Next.js metadata generation
// Each route gets its own title, description, and OpenGraph tags

type SeoEntry = {
  title: string;
  description: string;
  image?: string;
};

export const SITE_URL = 'https://redops.in';
export const SITE_NAME = 'RedOps Security';
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

const SEO_DATA: Record<string, SeoEntry> = {
  '/': {
    title: 'Elite Penetration Testing & Offensive Security Firm | RedOps',
    description: 'Stop automated breaches. Our OSCP-certified operators deliver elite penetration testing, vulnerability assessments, and offensive security for SaaS and enterprise.',
  },
  '/services': {
    title: 'Offensive Security Services | Web, Mobile & Cloud Pentesting | RedOps',
    description: 'Comprehensive offensive security services including manual web application pentesting, mobile security, network VAPT, red teaming, cloud security, and ISO 27001 implementation.',
  },
  '/services/vapt': {
    title: 'Network VAPT Services | Manual Infrastructure Penetration Testing | RedOps',
    description: 'Military-grade black-box, gray-box, and white-box penetration tests across your network. Active Directory exploitation, lateral movement simulation, and cloud audits by senior operators.',
  },
  '/services/mobile-pentest': {
    title: 'Mobile Application Penetration Testing Services | iOS & Android | RedOps',
    description: 'Comprehensive iOS and Android security assessments. Binary reversing, API traffic interception, runtime manipulation with Frida, and biometric authentication bypass testing.',
  },
  '/services/web-pentest': {
    title: 'Web Application Penetration Testing Services | Manual & Elite | RedOps',
    description: 'Stop automated breaches. Our senior OSCP-certified operators conduct deep manual web application penetration testing for SaaS and enterprise. Schedule an audit.',
  },
  '/services/cloud-security': {
    title: 'Cloud Security Assessments | AWS, Azure & GCP Audits | RedOps',
    description: 'In-depth cloud security reviews and penetration testing across AWS, Azure, and GCP. IAM privilege escalation, Kubernetes security, and serverless function auditing.',
  },
  '/services/red-teaming': {
    title: 'Red Team Operations & Adversarial Simulation Services | RedOps',
    description: 'Full-spectrum adversarial simulations testing your Blue Team detection and response. Social engineering, physical intrusion, custom malware, and C2 operations.',
  },
  '/services/grc': {
    title: 'GRC & Security Compliance Services | SOC 2, GDPR, CCPA | RedOps',
    description: 'Governance, Risk, and Compliance alignment for tech companies. Risk assessments, security architecture reviews, vendor risk management, and compliance readiness.',
  },
  '/services/iso': {
    title: 'ISO 27001 Implementation & Certification Consulting | RedOps',
    description: 'End-to-end ISO 27001 certification guidance. Gap analysis, ISMS policy creation, internal audits, and Stage 2 audit preparation led by security experts.',
  },
  '/services/webdev': {
    title: 'Secure Development Lifecycle (SDLC) & DevSecOps | RedOps',
    description: 'Security-first web application development. DevSecOps pipeline integration, secure architecture design, automated SAST/DAST, and threat modeling.',
  },
  '/about': {
    title: 'About RedOps Security | Elite Offensive Security Team',
    description: 'Founded by offensive security practitioners. Senior-only operators with OSCP/OSCE certifications and 7+ years of experience. Manual testing, no automation, actionable reports.',
  },
  '/case-studies': {
    title: 'Penetration Testing Case Studies | Real Exploits & Findings | RedOps',
    description: 'Anonymized case studies from real penetration testing engagements. Authentication bypasses, domain compromise, and supply chain vulnerabilities discovered before adversaries.',
  },
  '/resources': {
    title: 'Security Intelligence, Threat Research & Guides | RedOps',
    description: 'Practitioner-written guides, threat analysis, and attack breakdowns. JWT exploitation, Active Directory attacks, mobile security, cloud IAM, and API security research.',
  },
  '/contact': {
    title: 'Scope Your Security Assessment | Contact RedOps Security',
    description: 'Schedule a scoping call with our senior operators. Free initial attack surface review, tailored scope within 48 hours, NDA before information sharing.',
  },
  '/methodology': {
    title: 'Our Offensive Security Methodology | RedOps Security',
    description: 'Battle-tested adversarial framework designed to uncover deep vulnerabilities. Our methodology combines OSINT, threat modeling, and manual analysis.',
  },
  '/industries/saas': {
    title: 'Penetration Testing for SaaS Companies | RedOps Security',
    description: 'Secure your multi-tenant architecture and protect customer data with elite offensive security. Deep manual testing for SaaS platforms, APIs, and cloud infrastructure.',
  },
  '/industries/fintech': {
    title: 'Cybersecurity for Fintech & Digital Banking | RedOps Security',
    description: 'Expose critical financial vulnerabilities before they become regulatory nightmares. Specialized pentesting for payment flows, wallets, and banking APIs.',
  },
};

// Default fallback
const DEFAULT_SEO: SeoEntry = {
  title: 'Elite Penetration Testing & Offensive Security Firm | RedOps',
  description: 'RedOps Security delivers elite penetration testing, vulnerability assessments, and offensive security services that expose real-world attack surfaces before adversaries do.',
  image: OG_IMAGE_URL,
};

export function getSeoForRoute(path: string): SeoEntry {
  // Check for dynamic resource routes
  if (path.startsWith('/resources/')) {
    const slug = path.split('/').pop();
    const resource = slug ? resourceData[slug] : null;
    if (resource) {
      return {
        title: `${resource.title} | RedOps Security Research`,
        description: resource.excerpt,
      };
    }
  }

  // Check for dynamic case study routes
  if (path.startsWith('/case-studies/')) {
    const slug = path.split('/').pop();
    const cs = slug ? caseStudiesData[slug] : null;
    if (cs) {
      return {
        title: `${cs.title} | Case Study | RedOps`,
        description: cs.scenario,
      };
    }
  }

  // Check for dynamic author routes
  if (path.startsWith('/authors/')) {
    const slug = path.split('/').pop();
    const author = slug ? authorsData[slug] : null;
    if (author) {
      return {
        title: `${author.name} | ${author.role} | RedOps`,
        description: author.bio,
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
      '@type': 'Person',
      'name': 'RedOps Senior Operator',
      'jobTitle': 'Senior Penetration Tester (OSCP)',
      'url': `${SITE_URL}/about`
    },
    'reviewedBy': {
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

export function generateCaseStudySchema(path: string) {
  if (!path.startsWith('/case-studies/')) return null;
  
  const slug = path.split('/').pop();
  const cs = slug ? caseStudiesData[slug] : null;
  if (!cs) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': cs.title,
    'description': cs.scenario,
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

export function generateServiceSchema(path: string, serviceType: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceType,
    'provider': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'url': SITE_URL
    },
    'description': description,
    'areaServed': 'Global',
    'url': `${SITE_URL}${path}`
  };
}

export function generateFAQSchema(questions: { question: string, answer: string }[]) {
  if (!questions || questions.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string, item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': `${SITE_URL}${crumb.item}`
    }))
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
  '/industries/saas',
  '/industries/fintech',
];

// All routes to pre-render (including dynamic ones)
export const ALL_ROUTES = [
  ...STATIC_ROUTES,
  ...Object.keys(resourceData).map(slug => `/resources/${slug}`),
  ...Object.keys(caseStudiesData).map(slug => `/case-studies/${slug}`),
  ...Object.keys(authorsData).map(slug => `/authors/${slug}`)
];

export default SEO_DATA;
