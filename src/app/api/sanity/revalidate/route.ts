import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { writeAuditLog } from '@/lib/security/audit';
import { clientIp, rateLimit } from '@/lib/security/rate-limit';
import { revalidateSchema } from '@/lib/security/validators';
import { sanityEnv } from '@/sanity/lib/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getSlug(payload: Record<string, unknown>) {
  const slug = payload.slug;
  if (typeof slug === 'string') return slug;
  if (slug && typeof slug === 'object' && 'current' in slug) {
    const current = (slug as { current?: unknown }).current;
    if (typeof current === 'string') return current;
  }

  return undefined;
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);
  const rate = await rateLimit({
    key: `sanity:revalidate:${ip}`,
    limit: 60,
    windowSeconds: 60,
  });

  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many webhook attempts' }, { status: 429 });
  }

  if (!sanityEnv.revalidateSecret) {
    return NextResponse.json({ error: 'Revalidation secret is not configured' }, { status: 503 });
  }

  const payload = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const headerSecret = request.headers.get('x-sanity-secret') || undefined;
  const parsed = revalidateSchema.safeParse({
    secret: headerSecret || payload.secret,
    slug: getSlug(payload),
    type: payload.type,
    _type: payload._type,
  });

  if (!parsed.success || parsed.data.secret !== sanityEnv.revalidateSecret) {
    return NextResponse.json({ error: 'Invalid revalidation secret' }, { status: 401 });
  }

  const docType = parsed.data._type || parsed.data.type;
  const slug = parsed.data.slug;

  revalidateTag('blog', 'max');
  revalidateTag(docType || 'post', 'max');
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  revalidatePath('/rss.xml');

  if (slug) {
    revalidateTag(`post:${slug}`, 'max');
    revalidatePath(`/blog/${slug}`);
  }

  await writeAuditLog({
    action: 'sanity.webhook.revalidate',
    resourceType: docType,
    resourceId: slug,
    ip,
    metadata: {
      webhook: true,
    },
  });

  return NextResponse.json({
    revalidated: true,
    type: docType || null,
    slug: slug || null,
  });
}
