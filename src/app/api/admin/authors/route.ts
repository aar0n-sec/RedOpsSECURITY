import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminActor();
    const db = getServiceClient();
    const { data } = await db.from('authors').select('id, name, slug, role').order('name');
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

    const slug = body.slug || body.name?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

    const { data, error } = await db
      .from('authors')
      .insert({
        name: body.name,
        slug,
        role: body.role || null,
        bio: body.bio || null,
        credentials: body.credentials || [],
        image_url: body.image_url || null,
        linkedin: body.linkedin || null,
        github: body.github || null,
        twitter: body.twitter || null,
      })
      .select('id, name, slug')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
