import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { writeAuditLog } from '@/lib/security/audit';
import { requireAdminActor, AdminForbiddenError } from '@/lib/security/admin';
import { clientIp } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const ip = clientIp(request);

  try {
    const actor = await requireAdminActor();
    (await draftMode()).disable();

    await writeAuditLog({
      actor,
      action: 'draft-mode.disable',
      ip,
    });

    return NextResponse.redirect(new URL('/blog', request.url));
  } catch (error) {
    if (error instanceof AdminForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.error('Draft mode disable failed', error);
    return NextResponse.json({ error: 'Draft mode failed' }, { status: 500 });
  }
}
