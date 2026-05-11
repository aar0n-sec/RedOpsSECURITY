import { z } from 'zod';

const supabasePublicSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
});

const supabaseServerSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

const publicEnv = supabasePublicSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

const serverEnv = supabaseServerSchema.parse({
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
});

export const supabaseEnv = {
  url: publicEnv.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  serviceRoleKey: serverEnv.SUPABASE_SERVICE_ROLE_KEY,
  isConfigured: Boolean(
    publicEnv.NEXT_PUBLIC_SUPABASE_URL && publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
};

export const BLOG_REVALIDATE_SECONDS = Number.parseInt(
  process.env.BLOG_REVALIDATE_SECONDS || '300',
  10,
);
