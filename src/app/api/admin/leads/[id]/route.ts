import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';
import { writeAuditLog } from '@/lib/db/audit';
import { clientIp } from '@/lib/security/rate-limit';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const actor = await requireAdminActor();
    const ip = clientIp(request);
    const { id } = await params;
    const body = await request.json();
    const db = getServiceClient();

    const { data: lead, error } = await db
      .from('leads')
      .update({
        status: body.status,
        remarks: body.remarks,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor,
      action: 'lead.update',
      resourceType: 'lead',
      resourceId: id,
      metadata: body,
      ip,
    });

    return NextResponse.json({ data: lead });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const actor = await requireAdminActor();
    const ip = clientIp(request);
    const { id } = await params;
    const db = getServiceClient();

    const { error } = await db
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor,
      action: 'lead.delete',
      resourceType: 'lead',
      resourceId: id,
      ip,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
