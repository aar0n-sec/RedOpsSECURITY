import { createClient } from 'next-sanity';
import { BLOG_REVALIDATE_SECONDS, sanityEnv } from './env';

export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: false,
});

export const sanityPreviewClient = sanityClient.withConfig({
  useCdn: false,
  token: sanityEnv.readToken,
  perspective: 'drafts',
});

export const sanityWriteClient = sanityClient.withConfig({
  useCdn: false,
  token: sanityEnv.writeToken,
});

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  preview?: boolean;
  revalidate?: number;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  preview = false,
  revalidate = BLOG_REVALIDATE_SECONDS,
}: SanityFetchOptions): Promise<T | null> {
  if (!sanityEnv.isConfigured) return null;

  const client = preview ? sanityPreviewClient : sanityClient;

  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
    perspective: preview ? 'drafts' : 'published',
    token: preview ? sanityEnv.readToken : undefined,
  });
}
