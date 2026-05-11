import { defineField, defineType } from 'sanity';

export const optimizedImage = defineType({
  name: 'optimizedImage',
  title: 'Optimized image',
  type: 'image',
  options: {
    hotspot: true,
    metadata: ['blurhash', 'lqip', 'palette'],
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Required for accessibility and image SEO.',
      validation: (rule) => rule.required().min(8).max(140),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'cloudinary',
      title: 'Cloudinary source',
      type: 'cloudinaryImage',
      description: 'Optional Cloudinary asset metadata for externally uploaded images.',
    }),
  ],
});
