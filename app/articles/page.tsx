import PageContent from './articles-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata('/articles');

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/articles" />
    </>
  );
}
