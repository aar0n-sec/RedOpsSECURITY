/**
 * Prerender (SSG) Build Script
 * 
 * This script runs after `vite build` to generate static HTML for every route.
 * It:
 *   1. Builds the SSR bundle from src/entry-server.jsx
 *   2. Renders each route to a string using React's renderToString
 *   3. Injects the rendered HTML into the template (dist/index.html)
 *   4. Writes per-route HTML files with correct SEO meta tags
 *   5. Preserves the original dist/index.html as a SPA fallback
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, 'dist');

// All routes to pre-render
const ROUTES = [
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

// Per-route SEO data (duplicated here to avoid ESM/CJS import issues with the SSR bundle)
const SEO_DATA = {
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

function generateMetaTags(routePath) {
  const seo = SEO_DATA[routePath] || SEO_DATA['/'];
  const url = `https://redops.in${routePath === '/' ? '' : routePath}`;
  
  return [
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}">`,
    `<meta name="keywords" content="${seo.keywords}">`,
    `<meta property="og:title" content="${seo.title}">`,
    `<meta property="og:description" content="${seo.description}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="RedOps Security">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${seo.title}">`,
    `<meta name="twitter:description" content="${seo.description}">`,
    `<link rel="canonical" href="${url}">`,
  ].join('\n    ');
}

async function prerender() {
  console.log('\n🔨 Building SSR bundle...\n');
  
  // Step 1: Build the SSR bundle
  await build({
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: 'dist/server',
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },
    ssr: {
      // Don't externalize three.js — we need it bundled but it won't actually
      // execute on server since HeroCanvas guards with typeof window check
      noExternal: ['three'],
    },
  });

  // Step 2: Load the SSR module (use file:// URL for Windows compatibility)
  const ssrModulePath = pathToFileURL(path.resolve(distDir, 'server/entry-server.js')).href;
  const { render } = await import(ssrModulePath);

  // Step 3: Read the client-built index.html as a template
  const template = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf-8');

  // Step 4: Save original index.html as SPA fallback
  fs.copyFileSync(
    path.resolve(distDir, 'index.html'),
    path.resolve(distDir, '__spa-fallback.html')
  );

  console.log('\n📄 Pre-rendering routes...\n');

  // Step 5: Render each route
  for (const route of ROUTES) {
    try {
      const appHtml = render(route);
      const metaTags = generateMetaTags(route);

      // Replace the empty <div id="root"></div> with pre-rendered content
      let html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Replace the generic <title> with per-page title + meta tags
      html = html.replace(
        /<title>.*?<\/title>/,
        metaTags.split('\n')[0] // Just the <title> tag
      );

      // Replace the generic <meta name="description"...> with per-page one
      html = html.replace(
        /<meta name="description"[^>]*>/,
        '' // Remove old one — we'll add the new set
      );

      // Inject the full meta tags before </head>
      const ogTags = generateMetaTags(route)
        .split('\n')
        .filter(t => !t.includes('<title>'))  // title already replaced
        .map(t => `    ${t.trim()}`)
        .join('\n');
      
      html = html.replace('</head>', `${ogTags}\n  </head>`);

      // Determine output path
      let outputPath;
      if (route === '/') {
        outputPath = path.resolve(distDir, 'index.html');
      } else {
        // /services -> dist/services/index.html
        // /services/vapt -> dist/services/vapt/index.html
        const routeDir = path.resolve(distDir, route.substring(1));
        fs.mkdirSync(routeDir, { recursive: true });
        outputPath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outputPath, html);
      console.log(`  ✅ ${route} → ${path.relative(distDir, outputPath)}`);
    } catch (err) {
      console.error(`  ❌ ${route} → Error: ${err.message}`);
      // On error, write a SPA fallback for this route so it still works client-side
      const routeDir = route === '/' ? distDir : path.resolve(distDir, route.substring(1));
      if (route !== '/') {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.copyFileSync(
        path.resolve(distDir, '__spa-fallback.html'),
        path.resolve(route === '/' ? distDir : routeDir, 'index.html')
      );
      console.log(`    ↳ Using SPA fallback for ${route}`);
    }
  }

  // Cleanup server build directory
  fs.rmSync(path.resolve(distDir, 'server'), { recursive: true, force: true });

  console.log('\n✨ Pre-rendering complete!\n');
  console.log(`📊 ${ROUTES.length} routes pre-rendered to dist/`);
  console.log(`📋 SPA fallback saved to dist/__spa-fallback.html\n`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
