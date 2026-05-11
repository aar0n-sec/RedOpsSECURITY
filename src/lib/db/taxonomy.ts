import { supabase } from '../supabase';
import type { BlogTaxonomy } from '@/types/blog';

export async function getCategory(slug: string): Promise<BlogTaxonomy | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, title, slug, description')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    _id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description ?? undefined,
  };
}

export async function getTag(slug: string): Promise<BlogTaxonomy | null> {
  const { data, error } = await supabase
    .from('tags')
    .select('id, title, slug, description')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;

  return {
    _id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description ?? undefined,
  };
}

export async function getAllCategories(): Promise<BlogTaxonomy[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, title, slug, description')
    .order('title');

  if (error || !data) return [];
  return data.map((c) => ({
    _id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description ?? undefined,
  }));
}

export async function getAllTags(): Promise<BlogTaxonomy[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('id, title, slug, description')
    .order('title');

  if (error || !data) return [];
  return data.map((t) => ({
    _id: t.id,
    title: t.title,
    slug: t.slug,
    description: t.description ?? undefined,
  }));
}
