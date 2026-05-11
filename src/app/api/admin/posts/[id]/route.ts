import { NextResponse, type NextRequest } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { requireAdminActor } from '@/lib/security/admin';
import { writeAuditLog } from '@/lib/db/audit';
import { clientIp } from '@/lib/security/rate-limit';

export const dynamic = 'force-dynamic';

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    await requireAdminActor();
    const { id } = await context.params;
    const db = getServiceClient();

    const { data: post, error } = await db
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Fetch related data
    const [catJoin, tagJoin, seo] = await Promise.all([
      db.from('post_categories').select('category_id').eq('post_id', id),
      db.from('post_tags').select('tag_id').eq('post_id', id),
      db.from('post_seo').select('*').eq('post_id', id).single(),
    ]);

    return NextResponse.json({
      data: {
        ...post,
        category_ids: catJoin.data?.map((r) => r.category_id) ?? [],
        tag_ids: tagJoin.data?.map((r) => r.tag_id) ?? [],
        seo: seo.data ?? null,
      },
    });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const actor = await requireAdminActor();
    const { id } = await context.params;
    const ip = clientIp(request);
    const body = await request.json();
    const db = getServiceClient();

    // Update post
    const { error } = await db
      .from('posts')
      .update({
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        body: body.body,
        status: body.status,
        featured: body.featured,
        reading_time: body.reading_time || null,
        image_url: body.image_url || null,
        image_alt: body.image_alt || null,
        author_id: body.author_id || null,
        published_at: body.published_at || null,
      })
      .eq('id', id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    // Update categories
    await db.from('post_categories').delete().eq('post_id', id);
    if (body.category_ids?.length) {
      await db.from('post_categories').insert(
        body.category_ids.map((catId: string) => ({ post_id: id, category_id: catId })),
      );
    }

    // Update tags
    await db.from('post_tags').delete().eq('post_id', id);
    if (body.tag_ids?.length) {
      await db.from('post_tags').insert(
        body.tag_ids.map((tagId: string) => ({ post_id: id, tag_id: tagId })),
      );
    }

    // Update SEO
    await db.from('post_seo').delete().eq('post_id', id);
    if (body.seo_meta_title || body.seo_meta_description || body.seo_canonical_path) {
      await db.from('post_seo').insert({
        post_id: id,
        meta_title: body.seo_meta_title || null,
        meta_description: body.seo_meta_description || null,
        canonical_path: body.seo_canonical_path || null,
      });
    }

    await writeAuditLog({
      actor,
      action: 'post.update',
      resourceType: 'post',
      resourceId: id,
      ip,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const actor = await requireAdminActor();
    const { id } = await context.params;
    const ip = clientIp(request);
    const db = getServiceClient();

    await db.from('posts').delete().eq('id', id);

    await writeAuditLog({
      actor,
      action: 'post.delete',
      resourceType: 'post',
      resourceId: id,
      ip,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
}
