import PageContent from './why-exhibit-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/why-exhibit');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/why-exhibit" />
    </>
  );
}
