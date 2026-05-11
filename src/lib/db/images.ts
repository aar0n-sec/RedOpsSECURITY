import type { BlogImage } from '@/types/blog';

/**
 * Returns a display-ready image URL. Works with both Supabase Storage
 * URLs and Cloudinary URLs stored in the database.
 */
export function getBlogImageUrl(
  image?: BlogImage | null,
  width = 1200,
  height = 630,
): string | undefined {
  if (!image?.url) return undefined;

  const url = image.url;

  // Cloudinary transform
  if (url.includes('res.cloudinary.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}f_auto,q_auto,w_${width},h_${height},c_fill`;
  }

  // Supabase Storage — append transform query params if supported
  if (url.includes('supabase')) {
    return `${url}?width=${width}&height=${height}&resize=cover&quality=85`;
  }

  return url;
}

export function getImageDimensions(image?: BlogImage | null) {
  return {
    width: image?.width || 1200,
    height: image?.height || 630,
  };
}
