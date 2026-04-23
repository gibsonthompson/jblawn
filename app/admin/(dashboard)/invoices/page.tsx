'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Invoice = {
  id: string; invoice_number: string | null; total: number; status: string; notes: string | null
  due_date: string | null; sent_at: string | null; paid_at: string | null; created_at: string
  contact: { first_name: string; last_name: string | null } | null
  job: { service: { name: string } | null } | null
}
type Contact = { id: string; first_name: string; last_name: string | null }

const FILTERS = ['all', 'draft', 'sent', 'paid', 'overdue'] as const

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ contact_id: '', total: '', due_date: '', notes: '' })
  const [saving, setSaving] = useState(false)

  const fetchInvoices = async () => {
    if (!db) return setLoading(false)
    const { data } = await db.from('jb_invoices')
      .select('*, contact:jb_contacts(first_name, last_name), job:jb_jobs(service:jb_services(name))')
      .order('created_at', { ascending: false })
    if (data) setInvoices(data as unknown as Invoice[])
    setLoading(false)
  }

  const fetchContacts = async () => {
    if (!db) return
    const { data } = await db.from('jb_contacts').select('id, first_name, last_name').eq('is_active', true).order('first_name')
    if (data) setContacts(data)
  }

  useEffect(() => { fetchInvoices(); fetchContacts() }, [])

  const updateStatus = async (id: string, status: string) => {
    if (!db) return
    const updates: Record<string, unknown> = { status }
    if (status === 'sent') updates.sent_at = new Date().toISOString()
    if (status === 'paid') updates.paid_at = new Date().toISOString()
    await db.from('jb_invoices').update(updates).eq('id', id)
    fetchInvoices()
  }

  const createInvoice = async () => {
    if (!db || !form.contact_id || !form.total) return
    setSaving(true)
    await db.from('jb_invoices').insert({
      contact_id: form.contact_id,
      total: Number(form.total), subtotal: Number(form.total),
      due_date: form.due_date || null, notes: form.notes || null,
      status: 'draft',
    })
    setShowAdd(false)
    setForm({ contact_id: '', total: '', due_date: '', notes: '' })
    fetchInvoices()
    setSaving(false)
  }

  const filtered = filter === 'all' ? invoices : invoices.filter(i => i.status === filter)
  const counts = invoices.reduce((a, i) => { a[i.status] = (a[i.status] || 0) + 1; return a }, {} as Record<string, number>)
  const outstanding = invoices.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + Number(i.total), 0)

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading invoices...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Invoices</h1><p>{outstanding > 0 ? `$${outstanding.toLocaleString()} outstanding` : 'All clear'}</p></div>
        <button className="topbar-btn" onClick={() => setShowAdd(true)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Invoice
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? invoices.length : counts[f] || 0})</button>)}
      </div>

      {invoices.length === 0 ? (
        <div className="card"><div className="card-empty">No invoices yet. Create your first invoice.</div></div>
      ) : (
        <div className="card"><div className="card-body">
          <table className="tbl">
            <thead><tr><th>Invoice</th><th>Client</th><th>Service</th><th>Amount</th><th>Date</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(inv => (
                <tr key={inv.id}>
                  <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{inv.invoice_number || inv.id.slice(0, 8)}</span></td>
                  <td className="cell-primary">{inv.contact ? `${inv.contact.first_name} ${inv.contact.last_name || ''}` : '—'}</td>
                  <td>{inv.job?.service?.name || '—'}</td>
                  <td style={{ fontWeight: 700 }}>${Number(inv.total).toLocaleString()}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{new Date(inv.created_at).toLocaleDateString()}</td>
                  <td><span className={`badge ${inv.status}`}>{inv.status}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    {inv.status === 'draft' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(inv.id, 'sent')}>Send</button>}
                    {inv.status === 'sent' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(inv.id, 'paid')}>Mark Paid</button>}
                    {inv.status === 'overdue' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => updateStatus(inv.id, 'paid')}>Mark Paid</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      )}

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setShowAdd(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Create Invoice</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Client *</label>
                <select value={form.contact_id} onChange={e => setForm(p => ({ ...p, contact_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                  <option value="">Select client...</option>
                  {contacts.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name || ''}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Amount *</label>
                <input type="number" value={form.total} onChange={e => setForm(p => ({ ...p, total: e.target.value }))} placeholder="350" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Due Date</label>
                <input type="date" value={form.due_date} onChange={e => setForm(p => ({ ...p, due_date: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Notes</label>
                <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Invoice notes..." style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', minHeight: 50 }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="detail-btn-primary" onClick={createInvoice} disabled={saving}>{saving ? 'Creating...' : 'Create Invoice'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}