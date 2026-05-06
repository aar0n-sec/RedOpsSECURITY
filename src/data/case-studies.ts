export type Finding = {
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  text: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  scenario: string;
  impact: string;
  outcome: string;
  exposureAvoided?: string;
  findings?: Finding[];
  attackPath?: Finding[]; // For network tests
  year: string;
  category: string;
};

export const caseStudiesData: Record<string, CaseStudy> = {
  'authentication-bypass-fintech': {
    slug: 'authentication-bypass-fintech',
    title: 'Authentication Bypass in Global Fintech Platform',
    subtitle: 'Web Application Penetration Test',
    badge: 'CRITICAL',
    scenario: 'A Series C fintech platform processing $2B+ in annual transactions engaged RedOps for a black-box web application penetration test ahead of a major product launch. The client believed their OAuth2 implementation was secure following an internal review.',
    impact: 'Within 48 hours of testing, our team identified a chain of vulnerabilities that allowed complete authentication bypass, full account takeover, and unauthorized access to all transaction records.',
    outcome: 'The client delayed their launch, remediated all critical findings in 12 days, and retested successfully before going live.',
    exposureAvoided: '$4M+ in GDPR fines.',
    year: '2024',
    category: 'Web App Pentest',
    findings: [
      { severity: 'Critical', text: 'JWT algorithm confusion (RS256→HS256) allowing forged tokens for any user account including administrator' },
      { severity: 'Critical', text: 'IDOR in transaction API - sequential IDs exposed all user transactions without authentication after JWT bypass' },
      { severity: 'High', text: 'OAuth2 state parameter not validated, enabling CSRF against OAuth flow for account linkage hijacking' },
      { severity: 'High', text: 'Webhook endpoint vulnerable to SSRF allowing internal network enumeration and metadata service access' },
      { severity: 'Medium', text: 'Rate limiting absent on OTP endpoint enabling brute-force of 6-digit verification codes in under 3 minutes' },
    ]
  },
  'domain-compromise-healthcare': {
    slug: 'domain-compromise-healthcare',
    title: 'Domain Compromise in 4 Hours - Healthcare Network',
    subtitle: 'Internal Network Penetration Test',
    badge: 'CRITICAL',
    scenario: 'A regional healthcare network with 8 hospitals and 12,000 employees commissioned an internal network penetration test. The client had recently passed a HIPAA audit and considered their Active Directory environment hardened.',
    impact: 'Starting from a guest network drop point, our team achieved full Domain Administrator access within 4 hours and 12 minutes. Patient records, medical devices, and financial systems were within reach.',
    outcome: 'The engagement revealed that HIPAA compliance did not equal security. The client implemented a 90-day remediation plan, segmented their network, and engaged RedOps for quarterly testing.',
    exposureAvoided: '$10M+.',
    year: '2024',
    category: 'Network Pentest',
    attackPath: [
      { severity: 'Critical', text: 'Kerberoastable service account with weak password (cracked offline in 8 minutes) had Domain Admin membership' },
      { severity: 'Critical', text: 'Unconstrained Kerberos delegation on legacy print server allowed privilege escalation via printer bug (PrintNightmare)' },
      { severity: 'High', text: 'SMB signing disabled across 847 workstations enabling NTLM relay attacks from guest VLAN' },
      { severity: 'High', text: 'Medical device VLAN reachable from corporate network - 43 internet-connected devices running Windows XP' },
    ]
  },
  'supply-chain-mobile-banking': {
    slug: 'supply-chain-mobile-banking',
    title: 'Supply Chain Risk in Mobile Banking Application',
    subtitle: 'Mobile Application Security Assessment',
    badge: 'HIGH',
    scenario: 'A digital bank with 500,000 active users requested a mobile application security assessment of their iOS and Android apps. The focus was on authentication flows and data protection at rest and in transit.',
    impact: 'Our assessment uncovered a vulnerable third-party analytics SDK embedded in the app that was exfiltrating sensitive data to an unauthorized endpoint - a supply chain compromise the client was unaware of.',
    outcome: 'The compromised SDK was removed and replaced within 48 hours. The client implemented a mobile SDK vetting process and engaged for annual mobile assessments.',
    exposureAvoided: 'Mandatory reporting penalties through proactive discovery.',
    year: '2023',
    category: 'Mobile Security',
    findings: [
      { severity: 'Critical', text: 'Third-party analytics SDK exfiltrating user PII (name, email, device fingerprint) to non-disclosed endpoint in Eastern Europe' },
      { severity: 'High', text: 'Biometric authentication bypassable via Frida hook - app fell back to PIN without re-authentication requirement' },
      { severity: 'High', text: 'Account balance and transaction history cached in cleartext in SQLite database accessible without root on Android' },
      { severity: 'Medium', text: 'SSL certificate pinning bypassable using standard Frida script - no custom pinning implementation' },
    ]
  }
};
