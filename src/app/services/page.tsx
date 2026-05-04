import Services from '@/views/Services';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/services');

export default function Page() {
  return <Services />;
}
