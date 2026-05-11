import Link from 'next/link';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const db = getServiceClient();
  const { data: posts } = await db
    .from('posts')
    .select('id, title, slug, status, featured, published_at, created_at')
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Posts</h1>
        <Link href="/admin/posts/new" className="btn-primary">
          <span>New Post</span>
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <Link href={`/admin/posts/${post.id}/edit`} className="admin-table-link">
                      {post.title}
                    </Link>
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>{post.featured ? '⭐' : '—'}</td>
                  <td>
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('en-US')
                      : '—'}
                  </td>
                  <td>
                    <Link href={`/admin/posts/${post.id}/edit`} className="admin-action-link">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="admin-table-empty">
                  No posts yet. Create your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
