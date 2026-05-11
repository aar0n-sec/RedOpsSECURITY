import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { sanityEnv } from './lib/env';

export default defineConfig({
  name: 'redops-security',
  title: 'RedOps Security CMS',
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  basePath: '/admin/studio',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('RedOps CMS')
          .items([
            S.documentTypeListItem('post').title('Posts'),
            S.divider(),
            S.documentTypeListItem('author').title('Authors'),
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('tag').title('Tags'),
            S.divider(),
            S.documentTypeListItem('adminAuditLog').title('Audit log'),
          ]),
    }),
    codeInput(),
    visionTool({
      defaultApiVersion: sanityEnv.apiVersion,
    }),
  ],
});
