import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { sanityEnv } from './lib/env';
import { redopsTheme } from './theme';
import {
  DocumentTextIcon,
  UsersIcon,
  TagIcon,
  HashIcon,
  ClipboardIcon,
} from '@sanity/icons';

export default defineConfig({
  name: 'redops-security',
  title: 'RedOps Security CMS',
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  basePath: '/admin/studio',
  theme: redopsTheme,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('RedOps CMS')
          .items([
            S.documentTypeListItem('post').title('Posts').icon(DocumentTextIcon),
            S.divider(),
            S.documentTypeListItem('author').title('Authors').icon(UsersIcon),
            S.documentTypeListItem('category').title('Categories').icon(HashIcon),
            S.documentTypeListItem('tag').title('Tags').icon(TagIcon),
            S.divider(),
            S.documentTypeListItem('adminAuditLog').title('Audit log').icon(ClipboardIcon),
          ]),
    }),
    codeInput(),
    visionTool({
      defaultApiVersion: sanityEnv.apiVersion,
    }),
  ],
});
