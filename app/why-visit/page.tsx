import PageContent from './why-visit-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/why-visit');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/why-visit" />
    </>
  );
}
