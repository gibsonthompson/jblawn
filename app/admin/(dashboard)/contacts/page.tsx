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
    const { data: contactData } = await db!.from('jb_contacts').select('*').order('created_at', { ascending: false })
    if (!contactData) return setLoading(false)
    const { data: jobCounts } = await db!.from('jb_jobs').select('contact_id')
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
    await db!.from('jb_contacts').insert({ first_name: form.first_name, last_name: form.last_name || null, phone: form.phone, email: form.email || null, address: form.address || null, city: form.city || null, tags })
    setShowAdd(false); setForm({ first_name: '', last_name: '', phone: '', email: '', address: '', city: '', tags: '' }); fetchContacts(); setSaving(false)
  }

  const toggleActive = async (id: string, active: boolean) => {
    if (!db) return
    await db!.from('jb_contacts').update({ is_active: !active }).eq('id', id)
    fetchContacts()
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, is_active: !active } : null)
  }

  const deleteContact = async (id: string) => {
    if (!db || !confirm('Delete this client? This will fail if they have jobs or invoices linked.')) return
    await db!.from('jb_contacts').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    fetchContacts()
  }

  const filtered = contacts
    .filter(c => filter === 'all' ? true : filter === 'active' ? c.is_active : filter === 'inactive' ? !c.is_active : filter === 'recurring' ? c.tags?.includes('recurring') : c.tags?.includes('commercial'))
    .filter(c => !search || `${c.first_name} ${c.last_name || ''} ${c.phone}`.toLowerCase().includes(search.toLowerCase()))

  const counts = { all: contacts.length, active: contacts.filter(c => c.is_active).length, inactive: contacts.filter(c => !c.is_active).length, recurring: contacts.filter(c => c.tags?.includes('recurring')).length, commercial: contacts.filter(c => c.tags?.includes('commercial')).length }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading clients...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Clients</h1><p>{contacts.length} total · {counts.active} active</p></div>
        <button className="topbar-btn" onClick={() => setShowAdd(true)}>+ Add Client</button>
      </div>
      <div style={{ marginBottom: 16 }}><input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '9px 14px', border: '1px solid #E5E8E0', borderRadius: 8, fontSize: 13, width: 280, fontFamily: 'inherit', outline: 'none' }} /></div>
      <div className="filter-pills">{FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f] || 0})</button>)}</div>

      {contacts.length === 0 ? <div className="card"><div className="card-empty">No clients yet.</div></div> : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
          <div className="card"><div className="card-body">
            <table className="tbl">
              <thead><tr><th>Client</th><th>Jobs</th><th>Revenue</th><th>Last Service</th><th>Tags</th></tr></thead>
              <tbody>{filtered.map(c => (
                <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: 'pointer', background: selected?.id === c.id ? '#FAFBF8' : undefined }}>
                  <td><div className="cell-primary">{c.first_name} {c.last_name || ''}</div><div className="cell-secondary">{c.phone}</div></td>
                  <td>{c.job_count || 0}</td>
                  <td style={{ fontWeight: 650 }}>${Number(c.lifetime_revenue || 0).toLocaleString()}</td>
                  <td>{c.last_service_date ? new Date(c.last_service_date).toLocaleDateString() : '—'}</td>
                  <td>{(c.tags || []).map(t => <span key={t} className={`badge ${t === 'recurring' ? 'completed' : t === 'commercial' ? 'contacted' : 'draft'}`} style={{ marginRight: 4 }}>{t}</span>)}</td>
                </tr>
              ))}</tbody>
            </table>
          </div></div>

          {selected && (
            <div className="detail-panel">
              <div className="card-header"><h3>{selected.first_name} {selected.last_name || ''}</h3><button className="card-link" onClick={() => setSelected(null)}>✕</button></div>
              <div className="card-body padded">
                {[['Phone', selected.phone], ['Email', selected.email || '—'], ['Address', `${selected.address || '—'}${selected.city ? `, ${selected.city}` : ''}`], ['Total Jobs', String(selected.job_count || 0)], ['Lifetime Revenue', `$${Number(selected.lifetime_revenue || 0).toLocaleString()}`], ['Last Service', selected.last_service_date ? new Date(selected.last_service_date).toLocaleDateString() : '—'], ['Tags', (selected.tags || []).join(', ') || '—']].map(([l, v]) => (
                  <div key={l} className="detail-field"><div className="detail-label">{l}</div><div className="detail-value">{v}</div></div>
                ))}
                <div className="detail-actions">
                  <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-primary">Call</a>
                  <a href={`sms:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-secondary">Send SMS</a>
                  <Link href="/admin/jobs" className="detail-btn-secondary" style={{ textDecoration: 'none' }}>Create Job</Link>
                  <Link href="/admin/invoices" className="detail-btn-secondary" style={{ textDecoration: 'none' }}>Send Invoice</Link>
                  <button className="detail-btn-secondary" onClick={() => toggleActive(selected.id, selected.is_active)}>{selected.is_active ? 'Mark Inactive' : 'Mark Active'}</button>
                  <button className="detail-btn-secondary" onClick={() => deleteContact(selected.id)} style={{ color: '#DC2626', borderColor: '#FECACA' }}>Delete Client</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Add Client</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {([['first_name', 'First Name *'], ['last_name', 'Last Name'], ['phone', 'Phone *'], ['email', 'Email'], ['address', 'Address'], ['city', 'City']] as const).map(([key, label]) => (
                <div key={key}><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>{label}</label><input value={form[key]} onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
              ))}
            </div>
            <div style={{ marginTop: 12 }}><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Tags (comma separated)</label><input value={form.tags} onChange={e => setForm(prev => ({ ...prev, tags: e.target.value }))} placeholder="recurring, residential" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
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