import PageContent from './passes-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/passes');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/passes" />
    </>
  );
}
