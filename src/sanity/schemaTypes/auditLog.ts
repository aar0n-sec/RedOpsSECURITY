import { defineField, defineType } from 'sanity';

export const auditLog = defineType({
  name: 'adminAuditLog',
  title: 'Admin audit log',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'actorId',
      title: 'Actor ID',
      type: 'string',
    }),
    defineField({
      name: 'actorEmail',
      title: 'Actor email',
      type: 'string',
    }),
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource type',
      type: 'string',
    }),
    defineField({
      name: 'resourceId',
      title: 'Resource ID',
      type: 'string',
    }),
    defineField({
      name: 'ipHash',
      title: 'IP hash',
      type: 'string',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'text',
      rows: 8,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'action',
      subtitle: 'createdAt',
    },
  },
});
