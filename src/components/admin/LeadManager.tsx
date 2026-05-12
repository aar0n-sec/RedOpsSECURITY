'use client';

import { useState, useEffect } from 'react';
import type { Lead } from '@/types/blog';

export default function LeadManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data.data ?? []);
    } catch (err) {
      console.error('Failed to load leads', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        alert('CSV is empty or missing data');
        setUploading(false);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const nameIdx = headers.indexOf('name');
      const websiteIdx = headers.indexOf('website');

      if (nameIdx === -1 || websiteIdx === -1) {
        alert('CSV must have "name" and "website" columns');
        setUploading(false);
        return;
      }

      const parsedLeads = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        return {
          name: values[nameIdx],
          website: values[websiteIdx],
          status: 'not_tested' as const,
        };
      }).filter(l => l.name && l.website);

      try {
        const res = await fetch('/api/admin/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsedLeads),
        });
        if (res.ok) {
          loadLeads();
        } else {
          const errData = await res.json();
          alert(`Upload failed: ${errData.error}`);
        }
      } catch (err) {
        console.error('Upload failed', err);
        alert('Upload failed. Check console for details.');
      } finally {
        setUploading(false);
        // Reset file input
        e.target.value = '';
      }
    };
    reader.readAsText(file);
  }

  async function updateStatus(id: string, status: 'tested' | 'not_tested') {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  }

  async function updateRemarks(id: string, remarks: string) {
    try {
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remarks }),
      });
      setLeads(leads.map(l => l.id === id ? { ...l, remarks } : l));
    } catch (err) {
      console.error('Failed to update remarks', err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      setLeads(leads.filter(l => l.id !== id));
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  }

  return (
    <div className="lead-manager">
      <div className="admin-inline-form" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div className="file-upload-group">
          <label htmlFor="csv-upload" className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
            <span>{uploading ? 'Uploading...' : 'Upload CSV Leads'}</span>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
        </div>
        <p className="admin-help-text" style={{ fontSize: '0.85rem', color: 'var(--dark-soft)' }}>
          CSV columns: <code>name</code>, <code>website</code>
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>Status</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="admin-table-empty">Loading leads...</td></tr>
            ) : leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>
                    <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="admin-table-link"
                       style={{ textDecoration: 'underline' }}>
                      {lead.website}
                    </a>
                  </td>
                  <td>
                    <select 
                      value={lead.status} 
                      onChange={(e) => updateStatus(lead.id, e.target.value as any)}
                      className={`status-select ${lead.status}`}
                      style={{
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        color: lead.status === 'tested' ? '#10B981' : 'var(--red)',
                        borderColor: lead.status === 'tested' ? '#10B981' : 'var(--red)',
                        fontFamily: 'var(--mono)',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="not_tested">Not Tested</option>
                      <option value="tested">Tested</option>
                    </select>
                  </td>
                  <td>
                    <textarea 
                      defaultValue={lead.remarks} 
                      onBlur={(e) => updateRemarks(lead.id, e.target.value)}
                      placeholder="Add remarks..."
                      className="admin-textarea-small"
                      style={{
                        width: '100%',
                        minHeight: '40px',
                        padding: '8px',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '4px',
                        color: 'var(--dark)',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="admin-action-link admin-action-danger" 
                      onClick={() => handleDelete(lead.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="admin-table-empty">
                  No leads found. Upload a CSV to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
