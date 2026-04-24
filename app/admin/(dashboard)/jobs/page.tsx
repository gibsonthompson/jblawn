'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Job = {
  id: string; description: string | null; scheduled_date: string | null; time_window: string | null
  status: string; crew_assignment: string | null; created_at: string; completed_at: string | null
  client_name: string; client_address: string; service_name: string; service_price: number | null
}
type Contact = { id: string; first_name: string; last_name: string | null; phone: string }
type Service = { id: string; name: string; default_price: number }

const FILTERS = ['all', 'scheduled', 'in_progress', 'completed', 'cancelled'] as const

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ contact_id: '', service_id: '', scheduled_date: '', time_window: '8:00 AM', crew_assignment: '', description: '' })
  const [saving, setSaving] = useState(false)

  const fetchJobs = async () => {
    if (!db) return setLoading(false)

    // Step 1: Fetch jobs flat (no joins)
    const { data: jobsRaw, error } = await db!.from('jb_jobs')
      .select('id, contact_id, service_id, description, scheduled_date, time_window, status, crew_assignment, created_at, completed_at')
      .order('scheduled_date', { ascending: false })
    if (error) console.error('Jobs fetch error:', error)
    const rawJobs = jobsRaw || []

    if (rawJobs.length === 0) { setJobs([]); setLoading(false); return }

    // Step 2: Collect unique foreign key IDs
    const contactIds = Array.from(new Set(rawJobs.map((j: Record<string, unknown>) => j.contact_id).filter(Boolean)))
    const serviceIds = Array.from(new Set(rawJobs.map((j: Record<string, unknown>) => j.service_id).filter(Boolean)))

    // Step 3: Batch fetch contacts and services separately
    const contactMap: Record<string, { first_name: string; last_name: string | null; address: string | null }> = {}
    const serviceMap: Record<string, { name: string; default_price: number }> = {}

    if (contactIds.length > 0) {
      const { data: cData } = await db!.from('jb_contacts').select('id, first_name, last_name, address').in('id', contactIds)
      ;(cData || []).forEach((c: Record<string, unknown>) => {
        contactMap[c.id as string] = { first_name: c.first_name as string, last_name: c.last_name as string | null, address: c.address as string | null }
      })
    }
    if (serviceIds.length > 0) {
      const { data: sData } = await db!.from('jb_services').select('id, name, default_price').in('id', serviceIds)
      ;(sData || []).forEach((s: Record<string, unknown>) => {
        serviceMap[s.id as string] = { name: s.name as string, default_price: Number(s.default_price) }
      })
    }

    // Step 4: Merge in JavaScript
    const enriched: Job[] = rawJobs.map((j: Record<string, unknown>) => {
      const contact = contactMap[j.contact_id as string] || null
      const service = serviceMap[j.service_id as string] || null
      return {
        id: j.id as string,
        description: j.description as string | null,
        scheduled_date: j.scheduled_date as string | null,
        time_window: j.time_window as string | null,
        status: j.status as string,
        crew_assignment: j.crew_assignment as string | null,
        created_at: j.created_at as string,
        completed_at: j.completed_at as string | null,
        client_name: contact ? `${contact.first_name} ${contact.last_name || ''}`.trim() : '—',
        client_address: contact?.address || '',
        service_name: service?.name || (j.description as string) || '—',
        service_price: service?.default_price ?? null,
      }
    })

    setJobs(enriched)
    setLoading(false)
  }

  const fetchLookups = async () => {
    if (!db) return
    const [{ data: c }, { data: s }] = await Promise.all([
      db!.from('jb_contacts').select('id, first_name, last_name, phone').eq('is_active', true).order('first_name'),
      db!.from('jb_services').select('id, name, default_price').eq('is_active', true).order('name'),
    ])
    if (c) setContacts(c as unknown as Contact[])
    if (s) setServices(s as unknown as Service[])
  }

  useEffect(() => { fetchJobs(); fetchLookups() }, [])

  const createJob = async () => {
    if (!db || !form.contact_id || !form.service_id || !form.scheduled_date) return
    setSaving(true)
    await db!.from('jb_jobs').insert({
      contact_id: form.contact_id, service_id: form.service_id,
      scheduled_date: form.scheduled_date, time_window: form.time_window,
      crew_assignment: form.crew_assignment || null, description: form.description || null,
    })
    setShowAdd(false)
    setForm({ contact_id: '', service_id: '', scheduled_date: '', time_window: '8:00 AM', crew_assignment: '', description: '' })
    fetchJobs()
    setSaving(false)
  }

  const updateStatus = async (id: string, status: string) => {
    if (!db) return
    const updates: Record<string, unknown> = { status }
    if (status === 'completed') updates.completed_at = new Date().toISOString()
    await db!.from('jb_jobs').update(updates).eq('id', id)
    fetchJobs()
  }

  const deleteJob = async (id: string) => {
    if (!db || !confirm('Delete this job?')) return
    await db!.from('jb_jobs').delete().eq('id', id)
    fetchJobs()
  }

  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)
  const counts = jobs.reduce((a, j) => { a[j.status] = (a[j.status] || 0) + 1; return a }, {} as Record<string, number>)

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading jobs...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Jobs</h1><p>{jobs.length} total · {counts['scheduled'] || 0} upcoming</p></div>
        <button className="topbar-btn" onClick={() => setShowAdd(true)}>
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Job
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? jobs.length : counts[f] || 0})</button>)}
      </div>

      {jobs.length === 0 ? (
        <div className="card"><div className="card-empty">No jobs yet. Convert a request or create one manually.</div></div>
      ) : (
        <div className="card"><div className="card-body">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Service</th><th>Date</th><th>Crew</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id}>
                  <td><div className="cell-primary">{j.client_name}</div><div className="cell-secondary">{j.client_address}</div></td>
                  <td>{j.service_name}</td>
                  <td style={{ whiteSpace: 'nowrap' }}><div>{j.scheduled_date || '—'}</div><div className="cell-secondary">{j.time_window || ''}</div></td>
                  <td>{j.crew_assignment || '—'}</td>
                  <td style={{ fontWeight: 700 }}>{j.service_price != null ? `$${j.service_price.toLocaleString()}` : '—'}</td>
                  <td><span className={`badge ${j.status}`}>{j.status.replace('_', ' ')}</span></td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {j.status === 'scheduled' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={() => updateStatus(j.id, 'in_progress')}>Start</button>}
                    {j.status === 'in_progress' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px', marginRight: 4 }} onClick={() => updateStatus(j.id, 'completed')}>Complete</button>}
                    <button style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit' }} onClick={() => deleteJob(j.id)}>Delete</button>
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
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Create Job</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Client *</label><select value={form.contact_id} onChange={e => setForm(p => ({ ...p, contact_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}><option value="">Select client...</option>{contacts.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name || ''} — {c.phone}</option>)}</select></div>
              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Service *</label><select value={form.service_id} onChange={e => setForm(p => ({ ...p, service_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}><option value="">Select service...</option>{services.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.default_price}</option>)}</select></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Date *</label><input type="date" value={form.scheduled_date} onChange={e => setForm(p => ({ ...p, scheduled_date: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
                <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Time</label><select value={form.time_window} onChange={e => setForm(p => ({ ...p, time_window: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>{['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'].map(t => <option key={t}>{t}</option>)}</select></div>
              </div>
              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Crew</label><input value={form.crew_assignment} onChange={e => setForm(p => ({ ...p, crew_assignment: e.target.value }))} placeholder="JB, Mike, Full crew" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} /></div>
              <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Notes</label><textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', minHeight: 60 }} /></div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setShowAdd(false)}>Cancel</button>
              <button className="detail-btn-primary" onClick={createJob} disabled={saving}>{saving ? 'Creating...' : 'Create Job'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}