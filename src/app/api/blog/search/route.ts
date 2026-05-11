import { NextResponse, type NextRequest } from 'next/server';
import { getBlogIndex } from '@/sanity/lib/blog';
import { clientIp, rateLimit } from '@/lib/security/rate-limit';
import { blogSearchSchema } from '@/lib/security/validators';

export const revalidate = 60;

export async function GET(request: NextRequest) {
  const ip = clientIp(request);
  const rate = await rateLimit({
    key: `blog:search:${ip}`,
    limit: 120,
    windowSeconds: 60,
  });

  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many search attempts' }, { status: 429 });
  }

  const parsed = blogSearchSchema.safeParse({
    q: request.nextUrl.searchParams.get('q') || undefined,
    page: request.nextUrl.searchParams.get('page') || undefined,
    category: request.nextUrl.searchParams.get('category') || undefined,
    tag: request.nextUrl.searchParams.get('tag') || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
  }

  const result = await getBlogIndex({
    page: parsed.data.page,
    query: parsed.data.q,
    category: parsed.data.category,
    tag: parsed.data.tag,
  });

  return NextResponse.json(result);
}
