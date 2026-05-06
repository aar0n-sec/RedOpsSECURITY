import IndustryView from '@/views/Industry';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/industries/fintech');

export default function Page() {
  return (
    <IndustryView
      name="Fintech"
      title="Cybersecurity for Fintech & Digital Banking"
      subtitle="Expose critical financial vulnerabilities before they become regulatory nightmares."
      overview="Fintech companies operate at the intersection of high-speed innovation and rigorous regulatory requirements. Our elite offensive security team identifies vulnerabilities in payment processing flows, digital wallets, and banking APIs, helping you maintain trust and compliance."
      challenges={[
        {
          title: "Payment Integrity",
          description: "Protecting against transaction tampering, double-spending, and unauthorized funds transfers."
        },
        {
          title: "Regulatory Compliance",
          description: "Meeting the strict penetration testing requirements of SOC 2, PCI DSS, and regional financial regulations."
        },
        {
          title: "High-Value Target Profile",
          description: "Defending against sophisticated state-sponsored and criminal actors targeting financial infrastructure."
        }
      ]}
      solutions={[
        {
          title: "Critical Infrastructure Pentesting",
          description: "Deep-dive assessments of core banking systems, ledger integrity, and transaction settlement flows."
        },
        {
          title: "Compliance-First Reporting",
          description: "Reports designed to satisfy both technical engineering teams and non-technical regulatory auditors."
        },
        {
          title: "Mobile Wallet Security",
          description: "Specialized testing for iOS and Android financial applications, including biometric bypass and local data protection."
        }
      ]}
      ctaText="Protect Your Assets"
    />
  );
}
