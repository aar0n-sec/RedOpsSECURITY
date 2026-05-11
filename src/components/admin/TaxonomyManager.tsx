'use client';

import { useState, useEffect } from 'react';

type Item = { id: string; title: string; slug: string; description?: string };

export default function TaxonomyManager({ type }: { type: 'categories' | 'tags' }) {
  const [items, setItems] = useState<Item[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const label = type === 'categories' ? 'Category' : 'Tag';

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const res = await fetch(`/api/admin/${type}`);
    const data = await res.json();
    setItems(data.data ?? []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    if (editId) {
      await fetch(`/api/admin/${type}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
    } else {
      await fetch(`/api/admin/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
    }

    setTitle('');
    setDescription('');
    setEditId(null);
    loadItems();
  }

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${label.toLowerCase()}?`)) return;
    await fetch(`/api/admin/${type}/${id}`, { method: 'DELETE' });
    loadItems();
  }

  function startEdit(item: Item) {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description || '');
  }

  return (
    <div>
      <form className="admin-inline-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={`${label} name`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          <span>{editId ? 'Update' : 'Add'}</span>
        </button>
        {editId && (
          <button type="button" className="admin-btn-secondary" onClick={() => { setEditId(null); setTitle(''); setDescription(''); }}>
            Cancel
          </button>
        )}
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td><code>{item.slug}</code></td>
                  <td>{item.description || '—'}</td>
                  <td>
                    <button type="button" className="admin-action-link" onClick={() => startEdit(item)}>
                      Edit
                    </button>
                    <button type="button" className="admin-action-link admin-action-danger" onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="admin-table-empty">
                  No {type} yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
