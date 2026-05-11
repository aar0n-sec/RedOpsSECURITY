import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required().min(8).max(160),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(20).max(900),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
});
