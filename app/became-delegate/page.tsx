import type { Metadata } from 'next';
import PageContent from './became-delegate-page';
import PageSeo from '@/components/seo/PageSeo';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = {
  ...buildPageMetadata('/became-delegate'),
  alternates: {
    canonical: 'https://www.indiametexpo.com/became-delegate',
  },
};

export default function Page() {
  return (
    <>
      <PageContent />
      <PageSeo pageKey="/became-delegate" />
    </>
  );
}
