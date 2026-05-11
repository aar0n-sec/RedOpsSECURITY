import { defineArrayMember, defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Aim for 45-60 characters. Defaults to the post title.',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Aim for 140-160 characters. Defaults to the excerpt.',
      validation: (rule) => rule.max(170),
    }),
    defineField({
      name: 'canonicalPath',
      title: 'Canonical path',
      type: 'string',
      description: 'Use only for overrides, for example /blog/custom-canonical.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return value.startsWith('/') ? true : 'Canonical path must start with /.';
        }),
    }),
    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'ogImage',
      title: 'Social sharing image',
      type: 'optimizedImage',
      description: 'Recommended 1200x630.',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQ schema items',
      type: 'array',
      of: [defineArrayMember({ type: 'faq' })],
      validation: (rule) => rule.max(8),
    }),
  ],
});
