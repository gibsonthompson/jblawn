'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Quote = {
  id: string; quote_number: string | null; total: number; status: string
  description: string | null; valid_until: string | null; created_at: string
  jb_contacts: { first_name: string; last_name: string | null } | null
  jb_services: { name: string } | null
}
type Contact = { id: string; first_name: string; last_name: string | null }
type Service = { id: string; name: string; base_price: number }

const FILTERS = ['all', 'draft', 'sent', 'approved', 'declined'] as const

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ contact_id: '', service_id: '', total: '', description: '', valid_days: '14' })
  const [saving, setSaving] = useState(false)

  const fetchQuotes = async () => {
    if (!db) return setLoading(false)
    const { data } = await db!.from('jb_quotes')
      .select('*, jb_contacts(first_name, last_name), jb_services(name)')
      .order('created_at', { ascending: false })
    if (data) setQuotes(data as unknown as Quote[])
    setLoading(false)
  }

  const fetchLookups = async () => {
    if (!db) return
    const [{ data: c }, { data: s }] = await Promise.all([
      db!.from('jb_contacts').select('id, first_name, last_name').eq('is_active', true).order('first_name'),
      db!.from('jb_services').select('id, name, base_price').eq('is_active', true).order('name'),
    ])
    if (c) setContacts(c)
    if (s) setServices(s)
  }

  useEffect(() => { fetchQuotes(); fetchLookups() }, [])

  const handleServiceChange = (serviceId: string) => {
    setForm(p => {
      const svc = services.find(s => s.id === serviceId)
      return { ...p, service_id: serviceId, total: svc ? String(svc.base_price) : p.total }
    })
  }

  const createQuote = async () => {
    if (!db || !form.contact_id || !form.total) return
    setSaving(true)
    const validUntil = new Date()
    validUntil.setDate(validUntil.getDate() + Number(form.valid_days || 14))
    await db!.from('jb_quotes').insert({
      contact_id: form.contact_id,
      service_id: form.service_id || null,
      total: Number(form.total), subtotal: Number(form.total),
      description: form.description || null,
      valid_until: validUntil.toISOString().split('T')[0],
      status: 'draft',
    })
    setShowAdd(false)
    setForm({ contact_id: '', service_id: '', total: '', description: '', valid_days: '14' })
    fetchQuotes()
    setSaving(false)
  }

  const updateStatus = async (id: string, status: string) => {
    if (!db) return
    const updates: Record<string, unknown> = { status }
    if (status === 'sent') updates.sent_at = new Date().toISOString()
    if (status === 'approved') updates.approved_at = new Date().toISOString()
    if (status === 'declined') updates.declined_at = new Date().toISOString()
    await db!.from('jb_quotes').update(updates).eq('id', id)
    fetchQuotes()
  }

  const filtered = filter === 'all' ? quotes : quotes.filter(q => q.status === filter)
  const counts = quotes.reduce((a, q) => { a[q.status] = (a[q.status] || 0) + 1; return a }, {} as Record<string, number>)

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading quotes...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Quotes</h1><p>{quotes.length} total · {counts['sent'] || 0} awaiting response</p></div>
        <button className="topbar-btn" onClick={() => setShowAdd(true)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Quote
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? quotes.length : counts[f] || 0})</button>)}
      </div>

      {quotes.length === 0 ? (
        <div className="card"><div className="card-empty">No quotes yet. Create your first quote.</div></div>
      ) : (
        <div className="card"><div className="card-body">
          <table className="tbl">
            <thead><tr><th>Quote</th><th>Client</th><th>Service</th><th>Amount</th><th>Sent</th><th>Valid Until</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(q => (
                <tr key={q.id}>
                  <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{q.quote_number || q.id.slice(0, 8)}</span></td>
                  <td className="cell-primary">{q.jb_contacts ? `${q.jb_contacts.first_name} ${q.jb_contacts.last_name || ''}` : '—'}</td>
                  <td>{q.jb_services?.name || q.description || '—'}</td>
                  <td style={{ fontWeight: 700 }}>${Number(q.total).toLocaleString()}</td>
                  <td>{new Date(q.created_at).toLocaleDateString()}</td>
                  <td>{q.valid_until || '—'}</td>
                  <td><span className={`badge ${q.status}`}>{q.status}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    {q.status === 'draft' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(q.id, 'sent')}>Send</button>}
                    {q.status === 'sent' && (
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                        <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(q.id, 'approved')}>Approve</button>
                        <button className="detail-btn-secondary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(q.id, 'declined')}>Decline</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      )}

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Create Quote</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Client *</label>
                <select value={form.contact_id} onChange={e => setForm(p => ({ ...p, contact_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                  <option value="">Select client...</option>
                  {contacts.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name || ''}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Service</label>
                <select value={form.service_id} onChange={e => handleServiceChange(e.target.value)} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                  <option value="">Select service...</option>
                  {services.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.base_price}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Amount *</label>
                  <input type="number" value={form.total} onChange={e => setForm(p => ({ ...p, total: e.target.value }))} placeholder="350" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Valid For (days)</label>
                  <input type="number" value={form.valid_days} onChange={e => setForm(p => ({ ...p, valid_days: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Quote details..." style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', minHeight: 60 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="detail-btn-primary" onClick={createQuote} disabled={saving}>{saving ? 'Creating...' : 'Create Quote'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}