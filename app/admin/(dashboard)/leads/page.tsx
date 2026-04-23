'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Lead = {
  id: string
  first_name: string
  last_name: string | null
  phone: string
  email: string | null
  service_requested: string
  address: string
  preferred_date: string | null
  preferred_time: string | null
  source: string
  status: string
  details: string | null
  created_at: string
}

const FILTERS = ['all', 'new', 'contacted', 'quoted', 'booked', 'lost'] as const
const SRC: Record<string, string> = { website: 'Website', phone: 'Phone', thumbtack: 'Thumbtack', yelp: 'Yelp', google: 'Google', referral: 'Referral' }

const timeAgo = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)
  const [converting, setConverting] = useState(false)

  const fetchLeads = async () => {
    if (!db) return setLoading(false)
    const { data } = await db
      .from('jb_leads')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setLeads(data)
    setLoading(false)
  }

  useEffect(() => { fetchLeads() }, [])

  // Real-time subscription
  useEffect(() => {
    if (!db) return
    const channel = db!
      .channel('jb_leads_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jb_leads' }, () => {
        fetchLeads()
      })
      .subscribe()
    return () => { db!.removeChannel(channel) }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    if (!db) return
    await db.from('jb_leads').update({ status }).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  const convertToJob = async (lead: Lead) => {
    if (!db) return
    setConverting(true)

    try {
      // 1. Find the contact by phone
      const cleanPhone = lead.phone.replace(/\D/g, '')
      const { data: contact } = await db.from('jb_contacts').select('id').eq('phone', cleanPhone).maybeSingle()

      let contactId = contact?.id

      // 2. If no contact exists, create one
      if (!contactId) {
        const parts = lead.address.split(',').map(s => s.trim())
        const city = parts.length >= 2 ? parts[parts.length - 1].replace(/\s*(CA|California)\s*\d*/i, '').trim() : null
        const { data: newContact } = await db.from('jb_contacts').insert({
          first_name: lead.first_name,
          last_name: lead.last_name || null,
          phone: cleanPhone,
          email: lead.email || null,
          address: lead.address,
          city: city || null,
          referral_source: lead.source,
          tags: ['residential'],
        }).select('id').single()
        contactId = newContact?.id
      }

      if (!contactId) throw new Error('Could not find or create contact')

      // 3. Match service from jb_services by fuzzy name match
      const { data: services } = await db.from('jb_services').select('id, name').eq('is_active', true)
      let serviceId = null
      if (services) {
        // Try to match service_requested to a service name
        const requested = lead.service_requested.toLowerCase()
        const match = services.find(s =>
          requested.includes(s.name.toLowerCase().split(' ')[0]) ||
          s.name.toLowerCase().includes(requested.split(' ')[0])
        )
        serviceId = match?.id || null
      }

      // 4. Create the job
      await db.from('jb_jobs').insert({
        contact_id: contactId,
        service_id: serviceId,
        description: lead.service_requested + (lead.details ? ` — ${lead.details}` : ''),
        scheduled_date: lead.preferred_date || null,
        time_window: lead.preferred_time || null,
        status: 'scheduled',
      })

      // 5. Update lead status to booked
      await db.from('jb_leads').update({ status: 'booked' }).eq('id', lead.id)
      setSelected(prev => prev ? { ...prev, status: 'booked' } : null)

      // 6. Update contact's last_service_date
      if (lead.preferred_date) {
        await db.from('jb_contacts').update({ last_service_date: lead.preferred_date }).eq('id', contactId)
      }

      fetchLeads()
      alert(`Job created for ${lead.first_name} on ${lead.preferred_date || 'TBD'}. Check the Schedule and Jobs pages.`)
    } catch (err) {
      console.error('Convert to job error:', err)
      alert('Failed to convert. Check console for details.')
    }

    setConverting(false)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)
  const counts = leads.reduce((a, l) => { a[l.status] = (a[l.status] || 0) + 1; return a }, {} as Record<string, number>)

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading requests...</div>

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Requests</h1>
          <p>{leads.length} total · {counts['new'] || 0} new</p>
        </div>
        <button className="topbar-btn" onClick={fetchLeads}>
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 15, height: 15 }}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
          Refresh
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => (
          <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? `All (${leads.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f] || 0})`}
          </button>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="card"><div className="card-empty">No requests yet. Submit a test booking on the website to see it appear here in real time.</div></div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
          <div className="card"><div className="card-body">
            <table className="tbl">
              <thead><tr><th>Name</th><th>Service</th><th>Source</th><th>Submitted</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id} onClick={() => setSelected(lead)} style={{ cursor: 'pointer', background: selected?.id === lead.id ? '#FAFBF8' : undefined }}>
                    <td>
                      <div className="cell-primary">{lead.first_name} {lead.last_name || ''}</div>
                      <div className="cell-secondary">{lead.phone}</div>
                    </td>
                    <td>{lead.service_requested}</td>
                    <td><span style={{ fontSize: 12.5, color: '#7A8072' }}>{SRC[lead.source] || lead.source}</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{timeAgo(lead.created_at)}</td>
                    <td><span className={`badge ${lead.status}`}>{lead.status}</span></td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={5} className="card-empty">No requests match this filter.</td></tr>}
              </tbody>
            </table>
          </div></div>

          {selected && (
            <div className="detail-panel">
              <div className="card-header">
                <h3>{selected.first_name} {selected.last_name || ''}</h3>
                <button className="card-link" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="card-body padded">
                <div style={{ marginBottom: 16 }}>
                  <span className={`badge ${selected.status}`}>{selected.status}</span>
                </div>

                {[
                  ['Phone', selected.phone],
                  ['Email', selected.email || '—'],
                  ['Service', selected.service_requested],
                  ['Address', selected.address],
                  ['Preferred Date', selected.preferred_date || '—'],
                  ['Preferred Time', selected.preferred_time || '—'],
                  ['Source', SRC[selected.source] || selected.source],
                  ['Submitted', new Date(selected.created_at).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label as string} className="detail-field">
                    <div className="detail-label">{label}</div>
                    <div className="detail-value">{value}</div>
                  </div>
                ))}

                {selected.details && (
                  <div className="detail-field">
                    <div className="detail-label">Details</div>
                    <div className="detail-notes">{selected.details}</div>
                  </div>
                )}

                {/* Status Update */}
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0F2EC' }}>
                  <div className="detail-label" style={{ marginBottom: 8 }}>Update Status</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {['new', 'contacted', 'quoted', 'booked', 'lost'].map(s => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        className={`pill${selected.status === s ? ' active' : ''}`}
                        style={{ fontSize: 11, padding: '4px 10px' }}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="detail-actions">
                  {/* Convert to Job — only show if not already booked */}
                  {selected.status !== 'booked' && selected.status !== 'lost' && (
                    <button className="detail-btn-primary" onClick={() => convertToJob(selected)} disabled={converting} style={{ background: '#6BBF1A' }}>
                      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      {converting ? 'Converting...' : 'Convert to Job'}
                    </button>
                  )}

                  {selected.status === 'booked' && (
                    <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 7, padding: '10px 14px', fontSize: 13, color: '#16A34A', fontWeight: 600, textAlign: 'center' }}>
                      ✓ Converted to Job
                    </div>
                  )}

                  <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-secondary">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3"/></svg>
                    Call {selected.first_name}
                  </a>
                  <a href={`sms:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-secondary">
                    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    Text {selected.first_name}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}