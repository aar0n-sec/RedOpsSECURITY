import { getServiceClient } from '../supabase';
import type { Lead } from '@/types/blog';

export async function getAllLeads() {
  const db = getServiceClient();
  const { data, error } = await db
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Lead[];
}

export async function uploadLeads(leads: Omit<Lead, 'id' | 'created_at' | 'updated_at'>[]) {
  const db = getServiceClient();
  const { data, error } = await db
    .from('leads')
    .insert(leads)
    .select();

  if (error) throw error;
  return data as Lead[];
}

export async function updateLead(id: string, updates: Partial<Pick<Lead, 'status' | 'remarks'>>) {
  const db = getServiceClient();
  const { data, error } = await db
    .from('leads')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Lead;
}

export async function deleteLead(id: string) {
  const db = getServiceClient();
  const { error } = await db
    .from('leads')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
