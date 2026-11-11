import PageContent from './sponsorship-opportunities-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/sponsorship-opportunities');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/sponsorship-opportunities" />
    </>
  );
}
