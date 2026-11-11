import PageContent from './home-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/" />
    </>
  );
}
