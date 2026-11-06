import type { MetadataRoute } from 'next';
import { sitemapUrls } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapUrls.map((url) => ({ url }));
}
