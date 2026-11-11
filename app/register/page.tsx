import PageContent from './register-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata, firstQueryValue, type SeoSearchParams } from '@/lib/seo';
import { normalizeRegistrationTab } from './registrationRoutes';

type Props = { searchParams: SeoSearchParams };

async function getPageKey(searchParams: SeoSearchParams) {
  const query = await searchParams;
  const tab = normalizeRegistrationTab(firstQueryValue(query.t) ?? null) ?? 'enquiry';
  return '/register?t=' + tab;
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
