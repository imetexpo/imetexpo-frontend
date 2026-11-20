import imageAltsData from '@/data/image-alts.json';

export const IMAGE_ALTS: Record<string, string> = imageAltsData;

// Lookup helper by normalized path or filename
const filenameMap: Record<string, string> = {};
for (const [key, value] of Object.entries(IMAGE_ALTS)) {
  const filename = key.split('/').pop() || '';
  if (filename && !filenameMap[filename]) {
    filenameMap[filename] = value;
  }
}

/**
 * Returns the recommended accessible alt text for a given image source path.
 * Matches by full web path (e.g. '/images/about_indiamet.webp') or by filename ('about_indiamet.webp').
 * If the image is decorative, returns empty string `""` as per accessibility standards.
 */
export function getImageAlt(src: string | undefined | null, fallback?: string): string {
  if (!src) return fallback || '';

  // Clean and normalize src string
  const clean = src.split('?')[0].trim().replace(/^\/public\//, '/');
  const normalized = clean.startsWith('/') ? clean : `/${clean}`;

  if (Object.prototype.hasOwnProperty.call(IMAGE_ALTS, normalized)) {
    return IMAGE_ALTS[normalized];
  }

  const filename = normalized.split('/').pop() || '';
  if (Object.prototype.hasOwnProperty.call(filenameMap, filename)) {
    return filenameMap[filename];
  }

  return fallback !== undefined ? fallback : '';
}
