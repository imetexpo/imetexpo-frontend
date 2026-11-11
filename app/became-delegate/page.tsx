import PageContent from './became-delegate-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/became-delegate');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/became-delegate" />
    </>
  );
}
