import PageContent from './company-directory';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/exhibition-directory');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/exhibition-directory" />
    </>
  );
}
