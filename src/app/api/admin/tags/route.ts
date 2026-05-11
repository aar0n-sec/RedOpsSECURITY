import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminActor();
    const db = getServiceClient();
    const { data } = await db.from('tags').select('id, title, slug, description').order('title');
    return NextResponse.json({ data: data ?? [] });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdminActor();
    const body = await request.json();
    const db = getServiceClient();

    const slug = body.slug || body.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    const { data, error } = await db
      .from('tags')
      .insert({ title: body.title, slug, description: body.description || null })
      .select('id, title, slug')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
