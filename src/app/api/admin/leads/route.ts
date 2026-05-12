import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';
import { writeAuditLog } from '@/lib/db/audit';
import { clientIp } from '@/lib/security/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAdminActor();
    const db = getServiceClient();

    const { data, error } = await db
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const actor = await requireAdminActor();
    const ip = clientIp(request);
    const body = await request.json();
    const db = getServiceClient();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected an array of leads' }, { status: 400 });
    }

    const { data: leads, error } = await db
      .from('leads')
      .insert(body)
      .select();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor,
      action: 'leads.bulk_upload',
      resourceType: 'leads',
      metadata: { count: leads.length },
      ip,
    });

    return NextResponse.json({ data: leads }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
