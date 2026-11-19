import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import PageContent from './register-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata, firstQueryValue, type SeoSearchParams } from '@/lib/seo';
import { normalizeRegistrationTab } from './registrationRoutes';

type Props = { searchParams: SeoSearchParams };

async function getPageKey(searchParams: SeoSearchParams) {
  const query = await searchParams;
  const rawTab = firstQueryValue(query.t) ?? null;
  if (rawTab === 'enquiry') {
    redirect('/passes/register');
  }
  const tab = normalizeRegistrationTab(rawTab) ?? 'exhibitor';
  return '/register?t=' + tab;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const pageKey = await getPageKey(searchParams);
  const baseMetadata = buildPageMetadata(pageKey);
  return {
    ...baseMetadata,
    alternates: {
      canonical: 'https://www.indiametexpo.com/register',
    },
  };
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
