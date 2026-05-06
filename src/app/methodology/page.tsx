import Methodology from '@/views/Methodology';
import { createPageMetadata } from '@/seo';

export const metadata = createPageMetadata('/methodology');

export default function Page() {
  return <Methodology />;
}
