import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { supabaseEnv } from './env';

/**
 * Public Supabase client (uses anon key).
 * Safe for use in server components, API routes, and client components.
 * Respects Row Level Security policies.
 */
export const supabase: SupabaseClient = createClient(
  supabaseEnv.url,
  supabaseEnv.anonKey,
);

/**
 * Admin Supabase client (uses service role key).
 * Bypasses RLS — use ONLY in server-side API routes behind Clerk auth.
 */
let serviceClient: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  if (serviceClient) return serviceClient;

  if (!supabaseEnv.serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
  }

  serviceClient = createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: { persistSession: false },
  });

  return serviceClient;
}
