import IndustryView from '@/views/Industry';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/industries/saas');

export default function Page() {
  return (
    <IndustryView
      name="SaaS"
      title="Penetration Testing for SaaS Companies"
      subtitle="Secure your multi-tenant architecture and protect customer data with elite offensive security."
      overview="SaaS platforms face unique security challenges, from complex multi-tenant isolation to continuous deployment cycles. Our offensive security assessments are designed to scale with your growth while identifying critical logic flaws and data leakage vulnerabilities that automated scanners miss."
      challenges={[
        {
          title: "Multi-Tenant Isolation",
          description: "Ensuring that one customer cannot access another customer's data through IDOR, injection, or misconfigured access controls."
        },
        {
          title: "Rapid Deployment Cycles",
          description: "Integrating security into CI/CD pipelines without slowing down engineering velocity while maintaining deep manual oversight."
        },
        {
          title: "API Ecosystem Security",
          description: "Securing complex REST and GraphQL APIs that power modern SaaS integrations and mobile frontends."
        }
      ]}
      solutions={[
        {
          title: "Continuous Offensive Security",
          description: "Recurring pentesting aligned with your sprint cycles to catch vulnerabilities before they hit production."
        },
        {
          title: "Deep Logic Testing",
          description: "Manual analysis of business logic, role-based access control (RBAC), and subscription management."
        },
        {
          title: "Cloud Infrastructure Audit",
          description: "Comprehensive review of AWS, Azure, or GCP configurations securing your platform's foundation."
        }
      ]}
      ctaText="Secure Your Platform"
    />
  );
}
