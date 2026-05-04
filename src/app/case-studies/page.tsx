import CaseStudies from '@/views/CaseStudies';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/case-studies');

export default function Page() {
  return <CaseStudies />;
}
