import type { Metadata } from 'next';
import pageData from '@/data/seo-pages.json';

export const SITE_URL = 'https://www.indiametexpo.com';

export type SeoFaq = { question: string; answer: string };
export type SeoPage = {
  url: string;
  title: string;
  description: string;
  keywords: string[];
  schemaType: string;
  schemaName: string;
  schemaDescription: string;
  faqs: SeoFaq[];
  inSitemap: boolean;
};
export type SeoSearchParams = Promise<Record<string, string | string[] | undefined>>;

const pages: Record<string, SeoPage> = pageData;

export function getSeoPage(key: string): SeoPage {
  const page = pages[key];
  if (!page) throw new Error('Missing SEO page: ' + key);
  return page;
}

export const sitemapUrls = Object.values(pages)
  .filter((page) => page.inSitemap)
  .map((page) => page.url);

export function firstQueryValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function buildPageMetadata(key: string): Metadata {
  const page = getSeoPage(key);
  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url: page.url,
      siteName: 'IndiaMet Expo',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary',
      title: page.title,
      description: page.description,
    },
  };
}

export function buildPageSchema(key: string) {
  const page = getSeoPage(key);
  const home = SITE_URL + '/';
  const eventId = home + '#indiamet-2027';
  const breadcrumbId = page.url + '#breadcrumb';
  const pageId = page.url + '#webpage';
  const breadcrumbs = [{ '@type': 'ListItem', position: 1, name: 'Home', item: home }];
  if (page.url !== home) {
    breadcrumbs.push({ '@type': 'ListItem', position: 2, name: page.schemaName, item: page.url });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': home + '#brand',
        name: 'IndiaMet Expo',
        url: home,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Exhibitor enquiries',
            telephone: '+91-9148319993',
            email: 'pad@maxxmedia.in',
          },
          {
            '@type': 'ContactPoint',
            contactType: 'Visitor support',
            telephone: '+91-6364936468',
          },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': home + '#website',
        url: home,
        name: 'IndiaMet Expo',
        inLanguage: 'en-IN',
        publisher: { '@id': home + '#brand' },
      },
      {
        '@type': 'ExhibitionEvent',
        '@id': eventId,
        name: 'IndiaMet Expo 2027',
        description: 'International exhibition for metrology, precision measurement, inspection, 3D scanning, quality control and calibration technology.',
        startDate: '2027-05-13T10:00:00+05:30',
        endDate: '2027-05-15T16:00:00+05:30',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: 'Auto Cluster Exhibition Centre',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Plot No. C-181, Chinchwad East, Mumbai Pune Road',
            addressLocality: 'Pune',
            postalCode: '411019',
            addressRegion: 'Maharashtra',
            addressCountry: 'IN',
          },
        },
        url: home,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: breadcrumbs,
      },
      {
        '@type': page.schemaType,
        '@id': pageId,
        url: page.url,
        name: page.schemaName,
        description: page.schemaDescription,
        inLanguage: 'en-IN',
        isPartOf: { '@id': home + '#website' },
        publisher: { '@id': home + '#brand' },
        breadcrumb: { '@id': breadcrumbId },
        about: { '@id': eventId },
        ...(page.schemaType === 'ContactPage' ? {
          mainEntity: {
            '@type': 'ContactPoint',
            contactType: 'Exhibitor enquiries',
            email: 'pad@maxxmedia.in',
            telephone: '+91-9148319993',
            areaServed: 'IN',
          },
        } : {}),
      },
      ...(page.faqs.length ? [{
        '@type': 'FAQPage',
        '@id': page.url + '#faq',
        url: page.url + '#faq',
        inLanguage: 'en-IN',
        isPartOf: { '@id': pageId },
        mainEntity: page.faqs.map((faq, index) => ({
          '@type': 'Question',
          '@id': page.url + '#faq-' + (index + 1),
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      }] : []),
    ],
  };
}
