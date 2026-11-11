import PageContent from './about-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/about');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/about" />
    </>
  );
}
