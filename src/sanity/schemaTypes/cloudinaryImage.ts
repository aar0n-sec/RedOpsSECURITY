import { defineField, defineType } from 'sanity';

export const cloudinaryImage = defineType({
  name: 'cloudinaryImage',
  title: 'Cloudinary Image',
  type: 'object',
  fields: [
    defineField({
      name: 'publicId',
      title: 'Public ID',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secureUrl',
      title: 'Secure URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Fallback URL',
      type: 'url',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
    }),
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
    }),
    defineField({
      name: 'bytes',
      title: 'Size in bytes',
      type: 'number',
    }),
  ],
});
