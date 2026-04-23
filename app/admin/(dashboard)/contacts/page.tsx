'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '../../../../lib/admin-db'

type Contact = {
  id: string; first_name: string; last_name: string | null; phone: string; email: string | null
  address: string | null; city: string | null; tags: string[]; is_active: boolean
  lifetime_revenue: number; last_service_date: string | null; created_at: string
  job_count?: number
}

const FILTERS = ['all', 'active', 'inactive', 'recurring', 'commercial'] as const

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Contact | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ first_name: '', last_name: '', phone: '', email: '', address: '', city: '', tags: '' })
  const [saving, setSaving] = useState(false)

  const fetchContacts = async () => {
    if (!db) return setLoading(false)
    // Get contacts
    const { data: contactData } = await db.from('jb_contacts').select('*').order('created_at', { ascending: false })
    if (!contactData) return setLoading(false)

    // Get job counts per contact
    const { data: jobCounts } = await db.from('jb_jobs').select('contact_id')
    const countMap: Record<string, number> = {}
    ;(jobCounts || []).forEach((j: { contact_id: string }) => { countMap[j.contact_id] = (countMap[j.contact_id] || 0) + 1 })

    setContacts(contactData.map(c => ({ ...c, job_count: countMap[c.id] || 0 })))
    setLoading(false)
  }

  useEffect(() => { fetchContacts() }, [])

  const addContact = async () => {
    if (!db || !form.first_name || !form.phone) return
    setSaving(true)
    const tags = form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
    await db.from('jb_contacts').insert({
      first_name: form.first_name, last_name: form.last_name || null,
      phone: form.phone, email: form.email || null,
      address: form.address || null, city: form.city || null, tags,
    })
    setShowAdd(false)
    setForm({ first_name: '', last_name: '', phone: '', email: '', address: '', city: '', tags: '' })
    fetchContacts()
    setSaving(false)
  }

  const toggleActive = async (id: string, active: boolean) => {
    if (!db) return
    await db.from('jb_contacts').update({ is_active: !active }).eq('id', id)
    fetchContacts()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, is_active: !active } : null)
  }

  const filtered = contacts
    .filter(c => {
      if (filter === 'active') return c.is_active
      if (filter === 'inactive') return !c.is_active
      if (filter === 'recurring') return c.tags?.includes('recurring')
      if (filter === 'commercial') return c.tags?.includes('commercial')
      return true
    })
    .filter(c => !search || `${c.first_name} ${c.last_name || ''} ${c.phone}`.toLowerCase().includes(search.toLowerCase()))

  const counts = {
    all: contacts.length,
    active: contacts.filter(c => c.is_active).length,
    inactive: contacts.filter(c => !c.is_active).length,
    recurring: contacts.filter(c => c.tags?.includes('recurring')).length,
    commercial: contacts.filter(c => c.tags?.includes('commercial')).length,
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading clients...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Clients</h1><p>{contacts.length} total · {counts.active} active</p></div>
        <button className="topbar-btn" onClick={() => setShowAdd(true)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Client
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '9px 14px', border: '1px solid #E5E8E0', borderRadius: 8, fontSize: 13, width: 280, fontFamily: 'inherit', outline: 'none' }} />
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f] || 0})</button>)}
      </div>

      {contacts.length === 0 ? (
        <div className="card"><div className="card-empty">No clients yet. Add your first client or submit a booking to auto-create one.</div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
          <div className="card"><div className="card-body">
            <table className="tbl">
              <thead><tr><th>Client</th><th>Jobs</th><th>Revenue</th><th>Last Service</th><th>Tags</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: 'pointer', background: selected?.id === c.id ? '#FAFBF8' : undefined }}>
                    <td><div className="cell-primary">{c.first_name} {c.last_name || ''}</div><div className="cell-secondary">{c.phone}</div></td>
                    <td>{c.job_count || 0}</td>
                    <td style={{ fontWeight: 650 }}>${Number(c.lifetime_revenue || 0).toLocaleString()}</td>
                    <td>{c.last_service_date ? new Date(c.last_service_date).toLocaleDateString() : '—'}</td>
                    <td>{(c.tags || []).map(t => <span key={t} className={`badge ${t === 'recurring' ? 'completed' : t === 'commercial' ? 'contacted' : t === 'residential' ? 'draft' : 'new'}`} style={{ marginRight: 4 }}>{t}</span>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></div>

          {selected && (
            <div className="detail-panel">
              <div className="card-header"><h3>{selected.first_name} {selected.last_name || ''}</h3><button className="card-link" onClick={() => setSelected(null)}>✕</button></div>
              <div className="card-body padded">
                {[
                  ['Phone', selected.phone],
                  ['Email', selected.email || '—'],
                  ['Address', `${selected.address || '—'}${selected.city ? `, ${selected.city}` : ''}`],
                  ['Total Jobs', String(selected.job_count || 0)],
                  ['Lifetime Revenue', `$${Number(selected.lifetime_revenue || 0).toLocaleString()}`],
                  ['Last Service', selected.last_service_date ? new Date(selected.last_service_date).toLocaleDateString() : '—'],
                  ['Tags', (selected.tags || []).join(', ') || '—'],
                  ['Added', new Date(selected.created_at).toLocaleDateString()],
                ].map(([l, v]) => (
                  <div key={l} className="detail-field"><div className="detail-label">{l}</div><div className="detail-value">{v}</div></div>
                ))}
                <div className="detail-actions">
                  <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-primary">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3"/></svg>
                    Call
                  </a>
                  <a href={`sms:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-secondary">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    Send SMS
                  </a>
                  <Link href="/admin/jobs" className="detail-btn-secondary" style={{ textDecoration: 'none' }}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Create Job
                  </Link>
                  <Link href="/admin/invoices" className="detail-btn-secondary" style={{ textDecoration: 'none' }}>
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    Send Invoice
                  </Link>
                  <button className="detail-btn-secondary" onClick={() => toggleActive(selected.id, selected.is_active)}>
                    {selected.is_active ? 'Mark Inactive' : 'Mark Active'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Client Modal */}
      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Add Client</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {([['first_name', 'First Name *'], ['last_name', 'Last Name'], ['phone', 'Phone *'], ['email', 'Email'], ['address', 'Address'], ['city', 'City']] as const).map(([key, label]) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</label>
                  <input value={form[key]} onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="recurring, residential, commercial" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="detail-btn-primary" onClick={addContact} disabled={saving}>{saving ? 'Saving...' : 'Add Client'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}