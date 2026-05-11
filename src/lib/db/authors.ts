import { supabase } from '../supabase';
import type { BlogAuthor } from '@/types/blog';

export async function getBlogAuthor(slug: string): Promise<BlogAuthor | null> {
  const { data, error } = await supabase
    .from('authors')
    .select('id, name, slug, role, bio, credentials, image_url, linkedin, github, twitter')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    _id: data.id,
    name: data.name,
    slug: data.slug,
    role: data.role ?? undefined,
    bio: data.bio ?? undefined,
    credentials: data.credentials ?? undefined,
    image: data.image_url ? { url: data.image_url } : undefined,
    linkedin: data.linkedin ?? undefined,
    github: data.github ?? undefined,
    twitter: data.twitter ?? undefined,
  };
}

export async function getBlogAuthorSlugs(): Promise<Array<{ slug: string }>> {
  const { data, error } = await supabase
    .from('authors')
    .select('slug');

  if (error || !data) return [];
  return data;
}
