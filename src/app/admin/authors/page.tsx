'use client';

import { useState, useEffect } from 'react';

type Author = {
  id: string;
  name: string;
  slug: string;
  role?: string;
};

export default function AdminAuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => { loadAuthors(); }, []);

  async function loadAuthors() {
    const res = await fetch('/api/admin/authors');
    const data = await res.json();
    setAuthors(data.data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch('/api/admin/authors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role }),
    });

    setName('');
    setRole('');
    loadAuthors();
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this author?')) return;
    await fetch(`/api/admin/authors/${id}`, { method: 'DELETE' });
    loadAuthors();
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Authors</h1>
      </div>

      <form className="admin-inline-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Author name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role (optional)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          <span>Add Author</span>
        </button>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr key={author.id}>
                  <td>{author.name}</td>
                  <td><code>{author.slug}</code></td>
                  <td>{author.role || '—'}</td>
                  <td>
                    <button type="button" className="admin-action-link admin-action-danger" onClick={() => handleDelete(author.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="admin-table-empty">
                  No authors yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
