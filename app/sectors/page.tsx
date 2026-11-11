import PageContent from './sectors-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/sectors');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/sectors" />
    </>
  );
}
