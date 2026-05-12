import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { requireAdminActor, AdminForbiddenError } from '@/lib/security/admin';
import { writeAuditLog } from '@/lib/db/audit';
import { assertSameOrigin } from '@/lib/security/csrf';
import { clientIp, rateLimit } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  try {
    if (!assertSameOrigin(request)) {
      return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
    }

    const rate = await rateLimit({
      key: `admin:revalidate:${ip}`,
      limit: 10,
      windowSeconds: 60,
    });

    if (!rate.allowed) {
      return NextResponse.json({ error: 'Too many revalidation attempts' }, { status: 429 });
    }

    const actor = await requireAdminActor();
    const body = (await request.json().catch(() => ({}))) as { slug?: string };
    const slug = body.slug?.trim();

    revalidateTag('blog');
    revalidateTag('post');
    revalidatePath('/blog', 'layout');
    revalidatePath('/sitemap.xml');
    revalidatePath('/rss.xml');

    if (slug) {
      revalidateTag(`post:${slug}`);
    }

    await writeAuditLog({
      actor,
      action: 'next.cache.revalidate',
      resourceType: slug ? 'post' : 'blog',
      resourceId: slug,
      ip,
    });

    return NextResponse.json({ revalidated: true, slug: slug || null });
  } catch (error) {
    if (error instanceof AdminForbiddenError) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.error('Manual revalidation failed', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
