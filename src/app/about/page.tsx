import About from '@/views/About';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/about');

export default function Page() {
  return <About />;
}
