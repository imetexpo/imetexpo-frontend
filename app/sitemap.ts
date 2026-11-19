// import type { MetadataRoute } from 'next';
// import { sitemapUrls } from '@/lib/seo';

// export default function sitemap(): MetadataRoute.Sitemap {
//   return sitemapUrls.map((url) => ({ url }));
// }

import type { MetadataRoute } from 'next';
import { sitemapUrls, SITE_URL } from '@/lib/seo';
import { getAllSectorSlugs } from '@/data/sectors';

export default function sitemap(): MetadataRoute.Sitemap {
  // Existing SEO-configured pages
  const staticUrls = sitemapUrls;

  // Dynamically generate all sector detail page URLs
  const sectorUrls = getAllSectorSlugs().map(
    (slug) => `${SITE_URL}/sectors/${slug}`
  );

  // Combine URLs and remove duplicates
  const allUrls = [...new Set([...staticUrls, ...sectorUrls])];

  return allUrls.map((url) => ({
    url,
  }));
}