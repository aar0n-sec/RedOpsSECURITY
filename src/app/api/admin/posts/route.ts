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
      .from('posts')
      .select('id, title, slug, status, featured, published_at, created_at, author_id')
      .order('created_at', { ascending: false })
      .limit(200);

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

    // Create post
    const publishedAt =
      body.status === 'published' && !body.published_at
        ? new Date().toISOString()
        : body.published_at || null;

    const { data: post, error } = await db
      .from('posts')
      .insert({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        body: body.body,
        status: body.status || 'draft',
        featured: body.featured || false,
        reading_time: body.reading_time || null,
        image_url: body.image_url || null,
        image_alt: body.image_alt || null,
        author_id: body.author_id || null,
        published_at: publishedAt,
      })
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Parallelize related data insertion
    await Promise.all([
      // Link categories
      (async () => {
        if (body.category_ids?.length && post) {
          await db.from('post_categories').insert(
            body.category_ids.map((catId: string) => ({ post_id: post.id, category_id: catId })),
          );
        }
      })(),

      // Link tags
      (async () => {
        if (body.tag_ids?.length && post) {
          await db.from('post_tags').insert(
            body.tag_ids.map((tagId: string) => ({ post_id: post.id, tag_id: tagId })),
          );
        }
      })(),

      // SEO
      (async () => {
        if (post && (body.seo_meta_title || body.seo_meta_description || body.seo_canonical_path)) {
          await db.from('post_seo').insert({
            post_id: post.id,
            meta_title: body.seo_meta_title || null,
            meta_description: body.seo_meta_description || null,
            canonical_path: body.seo_canonical_path || null,
          });
        }
      })(),

      // Audit log
      writeAuditLog({
        actor,
        action: 'post.create',
        resourceType: 'post',
        resourceId: post?.id,
        ip,
      }),
    ]);

    return NextResponse.json({ data: post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
