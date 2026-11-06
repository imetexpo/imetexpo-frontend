import PageContent from './plan-your-travel-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata, firstQueryValue, type SeoSearchParams } from '@/lib/seo';

type Props = { searchParams: SeoSearchParams };

async function getPageKey(searchParams: SeoSearchParams) {
  const query = await searchParams;
  const tab = firstQueryValue(query.tab) === 'visitor' ? 'visitor' : 'exhibitor';
  return '/plan-your-travel?tab=' + tab;
}

export async function generateMetadata({ searchParams }: Props) {
  return buildPageMetadata(await getPageKey(searchParams));
}

export default async function Page({ searchParams }: Props) {
  const pageKey = await getPageKey(searchParams);
  return (
    <>
      <PageContent />
      <PageSeo pageKey={pageKey} />
    </>
  );
}
