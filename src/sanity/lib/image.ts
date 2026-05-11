import { createImageUrlBuilder } from '@sanity/image-url';
import type { BlogImage } from '@/types/blog';
import { sanityEnv } from './env';

const builder = createImageUrlBuilder({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
});

export function getBlogImageUrl(image?: BlogImage, width = 1200, height = 630) {
  const cloudinaryUrl = image?.cloudinary?.secureUrl || image?.cloudinary?.url;
  if (cloudinaryUrl) {
    const separator = cloudinaryUrl.includes('?') ? '&' : '?';
    return `${cloudinaryUrl}${separator}f_auto,q_auto,w_${width},h_${height},c_fill`;
  }

  if (!image?.asset) return undefined;

  return builder
    .image(image)
    .width(width)
    .height(height)
    .fit('crop')
    .auto('format')
    .quality(85)
    .url();
}

export function getImageDimensions(image?: BlogImage) {
  const cloudinary = image?.cloudinary;
  if (cloudinary?.width && cloudinary?.height) {
    return {
      width: cloudinary.width,
      height: cloudinary.height,
    };
  }

  const dimensions = image?.asset?.metadata?.dimensions;

  return {
    width: dimensions?.width || 1200,
    height: dimensions?.height || 630,
  };
}
