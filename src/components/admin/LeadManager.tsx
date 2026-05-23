'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Lead } from '@/types/blog';
import * as XLSX from 'xlsx';

export default function LeadManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const loadLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      setLeads(data.data ?? []);
    } catch (err) {
      console.error('Failed to load leads', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = event.target?.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!rows || rows.length === 0) {
          alert('File is empty');
          setUploading(false);
          return;
        }

        // 1. Detect headers
        const firstRow = rows[0]?.map(v => String(v || '').trim().toLowerCase()) || [];
        let nameIdx = -1;
        let emailIdx = -1;
        let websiteIdx = -1;

        firstRow.forEach((col, idx) => {
          if (col.includes('name') || col.includes('company') || col.includes('first') || col.includes('lead')) {
            if (nameIdx === -1) nameIdx = idx;
          }
          if (col.includes('email') || col.includes('e-mail')) {
            if (emailIdx === -1) emailIdx = idx;
          }
          if (col.includes('website') || col.includes('url') || col.includes('domain') || col.includes('link')) {
            if (websiteIdx === -1) websiteIdx = idx;
          }
        });

        const hasHeaders = (nameIdx !== -1) || (emailIdx !== -1) || (websiteIdx !== -1);
        const dataRows = hasHeaders ? rows.slice(1) : rows;

        // Intelligent parser
        const parsedLeads = dataRows.map((row) => {
          const values = row.map(v => v ? String(v).trim() : '');
          
          let website = '';
          let email = '';
          let name = '';

          // Assign from headers if available
          if (hasHeaders) {
            name = nameIdx !== -1 ? values[nameIdx] || '' : '';
            email = emailIdx !== -1 ? values[emailIdx] || '' : '';
            website = websiteIdx !== -1 ? values[websiteIdx] || '' : '';
          }

          // Fallback to pattern identification for missing fields
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;

          // 1. Identify URL and Email by content scanning
          values.forEach(val => {
            if (!val) return;
            if (!email && emailRegex.test(val)) {
              email = val;
            } else if (!website && urlRegex.test(val) && !val.includes('@')) {
              website = val;
            }
          });

          // If we found an email but no website, extract website from email domain
          if (email && !website) {
            website = email.split('@')[1];
          }

          // 2. Identify Name (Take first non-empty value that isn't the website or email)
          if (!name) {
            for (const val of values) {
              if (val && val !== website && val !== email && val.length > 2 && !emailRegex.test(val) && !urlRegex.test(val)) {
                name = val;
                break;
              }
            }
          }

          return { name, website, email };
        });

        // Filter out rows missing critical data
        const finalLeads = parsedLeads
          .filter((l) => l.website && l.name)
          .map(({ name, website, email }) => {
            // Remove email key if it's completely empty so it doesn't crash Supabase if email column is missing
            const leadObj: any = { name, website, status: 'not_tested' };
            if (email) leadObj.email = email;
            return leadObj;
          });

        if (finalLeads.length === 0) {
          alert('Could not identify any leads (names and websites) in the file. Please ensure data is present.');
          setUploading(false);
          return;
        }

        const res = await fetch('/api/admin/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(finalLeads),
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
    reader.readAsArrayBuffer(file);
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
      
      const newSet = new Set(selectedLeads);
      newSet.delete(id);
      setSelectedLeads(newSet);
    } catch (err) {
      console.error('Failed to delete lead', err);
    }
  }

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLeads(new Set(leads.map(l => l.id)));
    } else {
      setSelectedLeads(new Set());
    }
  };

  const handleSelectLead = (id: string, checked: boolean) => {
    const newSet = new Set(selectedLeads);
    if (checked) newSet.add(id);
    else newSet.delete(id);
    setSelectedLeads(newSet);
  };

  const handleBulkDelete = async () => {
    if (selectedLeads.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedLeads.size} leads?`)) return;

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedLeads) }),
      });
      if (res.ok) {
        setLeads(leads.filter(l => !selectedLeads.has(l.id)));
        setSelectedLeads(new Set());
      } else {
        const err = await res.json();
        alert(`Delete failed: ${err.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Failed to bulk delete', err);
    }
  };

  return (
    <div className="lead-manager">
      <div className="admin-inline-form" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="file-upload-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label htmlFor="csv-upload" className="btn-primary" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}>
            <span>{uploading ? 'Uploading...' : 'Upload Leads (CSV/XLSX)'}</span>
            <input
              id="csv-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
          </label>
          
          {selectedLeads.size > 0 && (
            <button 
              type="button" 
              className="btn-danger" 
              onClick={handleBulkDelete}
              style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', background: 'var(--red)', color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: '0.9rem' }}
            >
              Delete Selected ({selectedLeads.size})
            </button>
          )}
        </div>
        <p className="admin-help-text" style={{ fontSize: '0.85rem', color: 'var(--dark-soft)', margin: 0 }}>
          Supported files: CSV, XLSX. Unorganized columns are automatically parsed.
        </p>
      </div>

      <div className="admin-table-wrap" style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary, #f8fafc)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ width: '40px', textAlign: 'center', padding: '12px 8px' }}>
                <input 
                  type="checkbox" 
                  checked={leads.length > 0 && selectedLeads.size === leads.length}
                  onChange={handleSelectAll}
                  style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                />
              </th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Website</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Email</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Remarks</th>
              <th style={{ padding: '12px 8px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="admin-table-empty" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dark-soft)' }}>Loading leads...</td></tr>
            ) : leads.length > 0 ? (
              leads.map((lead) => (
                <tr key={lead.id} style={{ borderBottom: '1px solid var(--border)', background: selectedLeads.has(lead.id) ? 'var(--bg-secondary, #f8fafc)' : 'transparent', transition: 'background 0.2s ease' }}>
                  <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectedLeads.has(lead.id)}
                      onChange={(e) => handleSelectLead(lead.id, e.target.checked)}
                      style={{ cursor: 'pointer', transform: 'scale(1.2)' }}
                    />
                  </td>
                  <td style={{ padding: '12px 8px' }}>{lead.name}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <a href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="admin-table-link"
                       style={{ textDecoration: 'underline', color: 'var(--primary)' }}>
                      {lead.website}
                    </a>
                  </td>
                  <td style={{ padding: '12px 8px' }}>{lead.email || '—'}</td>
                  <td style={{ padding: '12px 8px' }}>
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
                  <td style={{ padding: '12px 8px' }}>
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
                  <td style={{ padding: '12px 8px' }}>
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
                <td colSpan={7} className="admin-table-empty" style={{ padding: '2rem', textAlign: 'center', color: 'var(--dark-soft)' }}>
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

