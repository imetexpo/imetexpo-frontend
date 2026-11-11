import PageContent from './contact-us-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/contact-us');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/contact-us" />
    </>
  );
}
