import PageContent from './partners-and-sponsors-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/partners-and-sponsors');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/partners-and-sponsors" />
    </>
  );
}
