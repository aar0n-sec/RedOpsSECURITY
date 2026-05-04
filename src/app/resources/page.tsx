import Resources from '@/views/Resources';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/resources');

export default function Page() {
  return <Resources />;
}
