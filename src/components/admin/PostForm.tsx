'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CloudinaryUploadField from './CloudinaryUploadField';

type Category = { id: string; title: string; slug: string };
type Tag = { id: string; title: string; slug: string };
type Author = { id: string; name: string; slug: string };

type PostFormData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status: string;
  featured: boolean;
  reading_time: string;
  image_url: string;
  image_alt: string;
  author_id: string;
  category_ids: string[];
  tag_ids: string[];
  published_at: string;
  seo_meta_title: string;
  seo_meta_description: string;
  seo_canonical_path: string;
};

const EMPTY_FORM: PostFormData = {
  title: '',
  slug: '',
  excerpt: '',
  body: '',
  status: 'draft',
  featured: false,
  reading_time: '',
  image_url: '',
  image_alt: '',
  author_id: '',
  category_ids: [],
  tag_ids: [],
  published_at: '',
  seo_meta_title: '',
  seo_meta_description: '',
  seo_canonical_path: '',
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 96);
}

export default function PostForm({ postId }: { postId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<PostFormData>(EMPTY_FORM);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load taxonomy + authors
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch('/api/admin/tags').then((r) => r.json()),
      fetch('/api/admin/authors').then((r) => r.json()),
    ]).then(([cats, tgs, auths]) => {
      setCategories(cats.data ?? []);
      setTags(tgs.data ?? []);
      setAuthors(auths.data ?? []);
    });

    // Load existing post if editing
    if (postId) {
      fetch(`/api/admin/posts/${postId}`)
        .then((r) => r.json())
        .then((res) => {
          if (res.data) {
            setForm({
              title: res.data.title ?? '',
              slug: res.data.slug ?? '',
              excerpt: res.data.excerpt ?? '',
              body: res.data.body ?? '',
              status: res.data.status ?? 'draft',
              featured: res.data.featured ?? false,
              reading_time: res.data.reading_time ?? '',
              image_url: res.data.image_url ?? '',
              image_alt: res.data.image_alt ?? '',
              author_id: res.data.author_id ?? '',
              category_ids: res.data.category_ids ?? [],
              tag_ids: res.data.tag_ids ?? [],
              published_at: res.data.published_at?.slice(0, 16) ?? '',
              seo_meta_title: res.data.seo?.meta_title ?? '',
              seo_meta_description: res.data.seo?.meta_description ?? '',
              seo_canonical_path: res.data.seo?.canonical_path ?? '',
            });
          }
        });
    }
  }, [postId]);

  function updateField<K extends keyof PostFormData>(key: K, value: PostFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !postId) {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  function toggleArray(key: 'category_ids' | 'tag_ids', id: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((x) => x !== id) : [...prev[key], id],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const url = postId ? `/api/admin/posts/${postId}` : '/api/admin/posts';
      const method = postId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to save post');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!postId || !confirm('Delete this post permanently?')) return;
    setSaving(true);
    await fetch(`/api/admin/posts/${postId}`, { method: 'DELETE' });
    router.push('/admin/posts');
    router.refresh();
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      {error && <div className="admin-form-error">{error}</div>}

      <div className="admin-form-group">
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          type="text"
          value={form.title}
          onChange={(e) => updateField('title', e.target.value)}
          required
          placeholder="Post title"
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="post-slug">Slug</label>
        <input
          id="post-slug"
          type="text"
          value={form.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          required
          placeholder="post-url-slug"
        />
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label htmlFor="post-status">Status</label>
          <select id="post-status" value={form.status} onChange={(e) => updateField('status', e.target.value)}>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="admin-form-group">
          <label htmlFor="post-published">Published At</label>
          <input
            id="post-published"
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => updateField('published_at', e.target.value)}
          />
        </div>
        <div className="admin-form-group admin-form-checkbox">
          <label>
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
            />
            Featured
          </label>
        </div>
      </div>

      <div className="admin-form-group">
        <label htmlFor="post-excerpt">Excerpt</label>
        <textarea
          id="post-excerpt"
          rows={3}
          value={form.excerpt}
          onChange={(e) => updateField('excerpt', e.target.value)}
          required
          placeholder="Brief summary of the post"
        />
      </div>

      <div className="admin-form-group">
        <label htmlFor="post-body">Body (Markdown)</label>
        <textarea
          id="post-body"
          rows={20}
          value={form.body}
          onChange={(e) => updateField('body', e.target.value)}
          required
          placeholder="Write your post in Markdown..."
          className="admin-code-textarea"
        />
      </div>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label htmlFor="post-image-url">Featured Image URL</label>
          <div className="admin-image-upload-group">
            <input
              id="post-image-url"
              type="url"
              value={form.image_url}
              onChange={(e) => updateField('image_url', e.target.value)}
              placeholder="https://..."
            />
            <div className="admin-upload-widget">
              <CloudinaryUploadField onUpload={(url) => updateField('image_url', url)} />
            </div>
          </div>
        </div>
        <div className="admin-form-group">
          <label htmlFor="post-image-alt">Image Alt Text</label>
          <input
            id="post-image-alt"
            type="text"
            value={form.image_alt}
            onChange={(e) => updateField('image_alt', e.target.value)}
            placeholder="Descriptive alt text"
          />
        </div>
      </div>

      <div className="admin-form-group">
        <label htmlFor="post-author">Author</label>
        <select id="post-author" value={form.author_id} onChange={(e) => updateField('author_id', e.target.value)}>
          <option value="">Select author...</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="admin-form-group">
        <label>Categories</label>
        <div className="admin-checkbox-grid">
          {categories.map((c) => (
            <label key={c.id}>
              <input
                type="checkbox"
                checked={form.category_ids.includes(c.id)}
                onChange={() => toggleArray('category_ids', c.id)}
              />
              {c.title}
            </label>
          ))}
        </div>
      </div>

      <div className="admin-form-group">
        <label>Tags</label>
        <div className="admin-checkbox-grid">
          {tags.map((t) => (
            <label key={t.id}>
              <input
                type="checkbox"
                checked={form.tag_ids.includes(t.id)}
                onChange={() => toggleArray('tag_ids', t.id)}
              />
              {t.title}
            </label>
          ))}
        </div>
      </div>

      <details className="admin-form-details">
        <summary>SEO Settings</summary>
        <div className="admin-form-group">
          <label htmlFor="seo-title">Meta Title</label>
          <input
            id="seo-title"
            type="text"
            value={form.seo_meta_title}
            onChange={(e) => updateField('seo_meta_title', e.target.value)}
            placeholder="Override page title for search engines"
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="seo-desc">Meta Description</label>
          <textarea
            id="seo-desc"
            rows={2}
            value={form.seo_meta_description}
            onChange={(e) => updateField('seo_meta_description', e.target.value)}
            placeholder="SEO description"
          />
        </div>
        <div className="admin-form-group">
          <label htmlFor="seo-canonical">Canonical Path</label>
          <input
            id="seo-canonical"
            type="text"
            value={form.seo_canonical_path}
            onChange={(e) => updateField('seo_canonical_path', e.target.value)}
            placeholder="/blog/custom-path"
          />
        </div>
      </details>

      <div className="admin-form-actions">
        <button type="submit" className="btn-primary" disabled={saving}>
          <span>{saving ? 'Saving...' : postId ? 'Update Post' : 'Create Post'}</span>
        </button>
        {postId && (
          <button type="button" className="admin-btn-danger" onClick={handleDelete} disabled={saving}>
            Delete Post
          </button>
        )}
      </div>
    </form>
  );
}
