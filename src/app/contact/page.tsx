import Contact from '@/views/Contact';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/contact');

export default function Page() {
  return <Contact />;
}
