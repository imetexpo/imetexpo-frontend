import PageContent from './sectors-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';
import { sectorsData, Sector } from '@/data/sectors';

export const metadata = buildPageMetadata('/sectors');

async function getSectors(): Promise<Sector[]> {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (backendUrl) {
    try {
      const res = await fetch(`${backendUrl}/sectors`, {
        next: { revalidate: 3600 },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback to static sector data if backend API is not configured or unavailable
    }
  }
  return sectorsData;
}

export default async function Page() {
  const sectors = await getSectors();

  return (
    <>
      <PageContent sectors={sectors} />
      <PageSeo pageKey="/sectors" />
    </>
  );
}
