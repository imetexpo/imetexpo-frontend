import PageContent from './awards-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/awards');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/awards" />
    </>
  );
}
