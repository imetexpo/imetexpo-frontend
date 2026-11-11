import PageContent from './summit-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/summit');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/summit" />
    </>
  );
}
