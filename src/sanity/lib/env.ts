import { z } from 'zod';

const publicSanitySchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1).optional(),
  NEXT_PUBLIC_SANITY_STUDIO_URL: z.string().optional(),
});

const serverSanitySchema = z.object({
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  SANITY_API_WRITE_TOKEN: z.string().min(1).optional(),
  SANITY_REVALIDATE_SECRET: z.string().min(32).optional(),
  SANITY_PREVIEW_SECRET: z.string().min(32).optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
});

const publicEnv = publicSanitySchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  NEXT_PUBLIC_SANITY_STUDIO_URL: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
});

const serverEnv = serverSanitySchema.parse({
  SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
  SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
  SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export const sanityEnv = {
  projectId: publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID || 'redopsdev',
  dataset: publicEnv.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: publicEnv.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-10',
  studioUrl: publicEnv.NEXT_PUBLIC_SANITY_STUDIO_URL || '/admin/studio',
  readToken: serverEnv.SANITY_API_READ_TOKEN,
  writeToken: serverEnv.SANITY_API_WRITE_TOKEN,
  revalidateSecret: serverEnv.SANITY_REVALIDATE_SECRET,
  previewSecret: serverEnv.SANITY_PREVIEW_SECRET,
  siteUrl: serverEnv.NEXT_PUBLIC_SITE_URL || 'https://redops.in',
  isConfigured: Boolean(
    publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID && publicEnv.NEXT_PUBLIC_SANITY_DATASET,
  ),
};

export const BLOG_REVALIDATE_SECONDS = Number.parseInt(
  process.env.BLOG_REVALIDATE_SECONDS || '300',
  10,
);
