import type { Metadata } from 'next';
import pageData from '@/data/seo-pages.json';

export const SITE_URL = 'https://www.indiametexpo.com';
export const SITE_NAME = 'IndiaMet Expo';
export const ORGANIZER_NAME = 'Maxx Business Media Pvt. Ltd.';

// Confirm this file exists inside your project's public folder.
export const OG_IMAGE = `${SITE_URL}/ITS_logo_white.png`;

export type SeoFaq = {
  question: string;
  answer: string;
};

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
  noIndex?: boolean;
};

export type SeoSearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

const pages = pageData as Record<string, SeoPage>;

export function getSeoPage(key: string): SeoPage {
  const page = pages[key];

  if (!page) {
    throw new Error(`Missing SEO page configuration: ${key}`);
  }

  return page;
}

// Only canonical, indexable pages are included in the sitemap.
// Duplicate canonical URLs are removed automatically.
export const sitemapUrls = [
  ...new Set(
    Object.values(pages)
      .filter((page) => page.inSitemap && !page.noIndex)
      .map((page) => page.url)
  ),
];

export function firstQueryValue(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function buildPageMetadata(key: string): Metadata {
  const page = getSeoPage(key);

  const robots = page.noIndex
    ? {
        index: false,
        follow: true,
        googleBot: {
          index: false,
          follow: true,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      };

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      absolute: page.title,
    },

    description: page.description,
    keywords: page.keywords,

    alternates: {
      canonical: page.url,
    },

    robots,

    openGraph: {
      type: 'website',
      title: page.title,
      description: page.description,
      url: page.url,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [
        {
          url: OG_IMAGE,
          alt: 'IndiaMet Expo 2027 - International Metrology Exhibition',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
  };
}

export function buildPageSchema(key: string) {
  const page = getSeoPage(key);

  const home = `${SITE_URL}/`;
  const eventId = `${home}#indiamet-2027`;
  const organizationId = `${home}#organization`;
  const websiteId = `${home}#website`;
  const pageId = `${page.url}#webpage`;
  const breadcrumbId = `${page.url}#breadcrumb`;

  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: home,
    },
  ];

  if (page.url !== home) {
    breadcrumbs.push({
      '@type': 'ListItem',
      position: 2,
      name: page.schemaName,
      item: page.url,
    });
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: ORGANIZER_NAME,
      url: home,
      logo: OG_IMAGE,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Exhibitor enquiries',
          telephone: '+91-9148319993',
          email: 'pad@maxxmedia.in',
          areaServed: 'IN',
          availableLanguage: ['English'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Visitor support',
          telephone: '+91-6364936468',
          areaServed: 'IN',
          availableLanguage: ['English'],
        },
      ],
    },

    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: home,
      name: SITE_NAME,
      inLanguage: 'en-IN',
      publisher: {
        '@id': organizationId,
      },
    },

    {
      '@type': 'Event',
      '@id': eventId,
      name: 'IndiaMet Expo 2027',
      description:
        'International exhibition for metrology, precision measurement, inspection, 3D scanning, quality control and calibration technology.',
      startDate: '2027-05-13T10:00:00+05:30',
      endDate: '2027-05-15T16:00:00+05:30',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode:
        'https://schema.org/OfflineEventAttendanceMode',
      location: {
        '@type': 'Place',
        name: 'Auto Cluster Exhibition Centre',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Plot No. C-181, Chinchwad East, Mumbai Pune Road',
          addressLocality: 'Pune',
          postalCode: '411019',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },
      organizer: {
        '@id': organizationId,
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
      isPartOf: {
        '@id': websiteId,
      },
      publisher: {
        '@id': organizationId,
      },
      breadcrumb: {
        '@id': breadcrumbId,
      },
      about: {
        '@id': eventId,
      },
      ...(page.schemaType === 'ContactPage'
        ? {
            mainEntity: {
              '@type': 'ContactPoint',
              contactType: 'Exhibitor enquiries',
              email: 'pad@maxxmedia.in',
              telephone: '+91-9148319993',
              areaServed: 'IN',
            },
          }
        : {}),
    },
  ];

  // Include FAQ structured data only when FAQs are configured.
  // Make sure these questions and answers are also visible on the page.
  if (page.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${page.url}#faq`,
      url: `${page.url}#faq`,
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': pageId,
      },
      mainEntity: page.faqs.map((faq, index) => ({
        '@type': 'Question',
        '@id': `${page.url}#faq-${index + 1}`,
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}