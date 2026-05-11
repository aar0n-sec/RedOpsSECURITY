import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { sanityEnv } from '@/sanity/lib/env';
import { writeAuditLog } from '@/lib/security/audit';
import { requireAdminActor, AdminForbiddenError } from '@/lib/security/admin';
import { clientIp } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const ip = clientIp(request);

  try {
    const actor = await requireAdminActor();
    const secret = request.nextUrl.searchParams.get('secret');
    const slug = request.nextUrl.searchParams.get('slug') || '';

    if (sanityEnv.previewSecret && secret !== sanityEnv.previewSecret) {
      return NextResponse.json({ error: 'Invalid preview secret' }, { status: 401 });
    }

    (await draftMode()).enable();

    await writeAuditLog({
      actor,
      action: 'draft-mode.enable',
      resourceType: slug ? 'post' : 'blog',
      resourceId: slug || undefined,
      ip,
    });

    return NextResponse.redirect(new URL(slug ? `/blog/${slug}` : '/blog', request.url));
  } catch (error) {
    if (error instanceof AdminForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.error('Draft mode enable failed', error);
    return NextResponse.json({ error: 'Draft mode failed' }, { status: 500 });
  }
}
