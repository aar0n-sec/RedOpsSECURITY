import { defineArrayMember, defineField, defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 80,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(900),
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'optimizedImage',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
    }),
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'X/Twitter',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});
