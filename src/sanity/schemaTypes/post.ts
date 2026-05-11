import { defineArrayMember, defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  initialValue: {
    status: 'draft',
    featured: false,
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().min(12).max(110),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(80).max(220),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.status === 'published' && !value) {
            return 'Published posts need a published date.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'scheduledFor',
      title: 'Scheduled for',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'scheduled',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.status === 'scheduled' && !value) {
            return 'Scheduled posts need a scheduled date.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured image',
      type: 'optimizedImage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'tag' }] })],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time override',
      type: 'string',
      description: 'Optional. The website estimates reading time automatically when this is empty.',
      validation: (rule) => rule.max(24),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare(selection) {
      const status = selection.status ? String(selection.status).toUpperCase() : 'DRAFT';
      const date = selection.publishedAt
        ? new Date(String(selection.publishedAt)).toLocaleDateString('en-US')
        : 'No publish date';

      return {
        title: selection.title,
        subtitle: `${status} - ${date}`,
        media: selection.media,
      };
    },
  },
});
