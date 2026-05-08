import { PrivacyPolicy } from '@/views/Legal';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/privacy-policy');

export default function Page() {
  return <PrivacyPolicy />;
}
