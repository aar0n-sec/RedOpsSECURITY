import Link from 'next/link';
import { getServiceClient } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

async function getStats() {
  const db = getServiceClient();

  const [postsResult, publishedResult, categoriesResult, tagsResult, authorsResult] =
    await Promise.all([
      db.from('posts').select('*', { count: 'exact', head: true }),
      db.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      db.from('categories').select('*', { count: 'exact', head: true }),
      db.from('tags').select('*', { count: 'exact', head: true }),
      db.from('authors').select('*', { count: 'exact', head: true }),
    ]);

  return {
    totalPosts: postsResult.count ?? 0,
    publishedPosts: publishedResult.count ?? 0,
    categories: categoriesResult.count ?? 0,
    tags: tagsResult.count ?? 0,
    authors: authorsResult.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <Link href="/admin/posts/new" className="btn-primary">
          <span>New Post</span>
        </Link>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.totalPosts}</div>
          <div className="admin-stat-label">Total Posts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.publishedPosts}</div>
          <div className="admin-stat-label">Published</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.categories}</div>
          <div className="admin-stat-label">Categories</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.tags}</div>
          <div className="admin-stat-label">Tags</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-value">{stats.authors}</div>
          <div className="admin-stat-label">Authors</div>
        </div>
      </div>

      <div className="admin-quick-links">
        <h2>Quick Actions</h2>
        <div className="admin-quick-grid">
          <Link href="/admin/posts/new" className="admin-quick-card">
            <h3>Create Post</h3>
            <p>Write a new security research article</p>
          </Link>
          <Link href="/admin/categories" className="admin-quick-card">
            <h3>Manage Categories</h3>
            <p>Organize your content taxonomy</p>
          </Link>
          <Link href="/admin/tags" className="admin-quick-card">
            <h3>Manage Tags</h3>
            <p>Add and edit content tags</p>
          </Link>
          <Link href="/admin/authors" className="admin-quick-card">
            <h3>Manage Authors</h3>
            <p>Add team members and contributors</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
