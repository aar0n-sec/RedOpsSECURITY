import { defineArrayMember, defineType } from 'sanity';

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            title: 'External link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto'],
                    allowRelative: false,
                  }),
              },
              {
                name: 'nofollow',
                title: 'No follow',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
          {
            name: 'internalLink',
            title: 'Internal link',
            type: 'object',
            fields: [
              {
                name: 'reference',
                title: 'Reference',
                type: 'reference',
                to: [{ type: 'post' }, { type: 'category' }, { type: 'tag' }],
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'optimizedImage',
    }),
    defineArrayMember({
      type: 'code',
      options: {
        withFilename: true,
        languageAlternatives: [
          { title: 'Bash', value: 'bash' },
          { title: 'HTTP', value: 'http' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'JSON', value: 'json' },
          { title: 'Python', value: 'python' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'YAML', value: 'yaml' },
        ],
      },
    }),
  ],
});
