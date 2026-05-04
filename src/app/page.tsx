import Home from '@/views/Home';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/');

export default function Page() {
  return <Home />;
}
