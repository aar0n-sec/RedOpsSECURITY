import { defineCliConfig } from 'sanity/cli';
import { sanityEnv } from './src/sanity/lib/env';

export default defineCliConfig({
  api: {
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
  },
});
