import PageContent from './about-organizer-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/about-organizer');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/about-organizer" />
    </>
  );
}
