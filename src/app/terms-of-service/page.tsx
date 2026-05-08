import { TermsOfService } from '@/views/Legal';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/terms-of-service');

export default function Page() {
  return <TermsOfService />;
}
