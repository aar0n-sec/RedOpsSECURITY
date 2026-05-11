import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    await requireAdminActor();
    const { id } = await context.params;
    const body = await request.json();
    const db = getServiceClient();

    const { error } = await db
      .from('categories')
      .update({ title: body.title, slug: body.slug, description: body.description || null })
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminActor();
    const { id } = await context.params;
    const db = getServiceClient();

    await db.from('categories').delete().eq('id', id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
