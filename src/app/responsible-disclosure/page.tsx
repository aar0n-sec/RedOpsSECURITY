import { ResponsibleDisclosure } from '@/views/Legal';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/responsible-disclosure');

export default function Page() {
  return <ResponsibleDisclosure />;
}
