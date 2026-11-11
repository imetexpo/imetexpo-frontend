import PageContent from './nominate-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/nominate');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/nominate" />
    </>
  );
}
