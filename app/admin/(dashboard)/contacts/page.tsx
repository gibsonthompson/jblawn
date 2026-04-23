'use client'

import { useState } from 'react'

const CLIENTS = [
  { id: 1, name: 'Maria Rodriguez', phone: '(510) 555-1234', email: 'maria.r@email.com', address: '1245 Oak St, Oakland', tags: ['recurring', 'residential'], jobs: 12, revenue: 1450, lastService: '2026-04-22', status: 'active' },
  { id: 2, name: 'David Lee', phone: '(510) 555-5678', email: 'david.l@email.com', address: '892 Cedar Ave, Berkeley', tags: ['one-time', 'residential'], jobs: 3, revenue: 650, lastService: '2026-04-20', status: 'active' },
  { id: 3, name: 'Robert Kim', phone: '(925) 555-9012', email: 'rkim@email.com', address: '1122 Walnut Blvd, Concord', tags: ['recurring', 'residential'], jobs: 8, revenue: 960, lastService: '2026-04-18', status: 'active' },
  { id: 4, name: 'Angela Torres', phone: '(510) 555-3456', email: 'angela.t@email.com', address: '330 Birch Ln, Hayward', tags: ['one-time', 'residential'], jobs: 1, revenue: 350, lastService: '2026-04-15', status: 'active' },
  { id: 5, name: 'Marcus Johnson', phone: '(510) 555-7890', email: '', address: '2100 Grand Ave, Oakland', tags: ['one-time', 'residential'], jobs: 2, revenue: 475, lastService: '2026-04-10', status: 'inactive' },
  { id: 6, name: 'Tanya Nguyen', phone: '(510) 555-2345', email: 'tanya.n@email.com', address: '3301 Elm Dr, Richmond', tags: ['recurring', 'residential'], jobs: 16, revenue: 2100, lastService: '2026-04-21', status: 'active' },
  { id: 7, name: 'Kevin Park', phone: '(510) 555-6789', email: 'kpark@email.com', address: '987 Pine St, San Leandro', tags: ['commercial'], jobs: 6, revenue: 1800, lastService: '2026-04-19', status: 'active' },
]

const FILTERS = ['all', 'active', 'inactive', 'recurring', 'commercial'] as const

export default function ContactsPage() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof CLIENTS[0] | null>(null)

  const filtered = CLIENTS.filter(c => {
    if (filter === 'active') return c.status === 'active'
    if (filter === 'inactive') return c.status === 'inactive'
    if (filter === 'recurring') return c.tags.includes('recurring')
    if (filter === 'commercial') return c.tags.includes('commercial')
    return true
  }).filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search))

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Clients</h1>
          <p>{CLIENTS.length} total · {CLIENTS.filter(c => c.status === 'active').length} active</p>
        </div>
        <button className="topbar-btn">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Client
        </button>
      </div>

      <div style={{ marginBottom: 16 }}>
        <input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: '9px 14px', border: '1px solid #E5E8E0', borderRadius: 8, fontSize: 13, width: 280, fontFamily: 'inherit', outline: 'none' }} />
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => (
          <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div className="card">
          <div className="card-body">
            <table className="tbl">
              <thead><tr><th>Client</th><th>Jobs</th><th>Revenue</th><th>Last Service</th><th>Tags</th></tr></thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} onClick={() => setSelected(c)} style={{ cursor: 'pointer', background: selected?.id === c.id ? '#FAFBF8' : undefined }}>
                    <td><div className="cell-primary">{c.name}</div><div className="cell-secondary">{c.phone}</div></td>
                    <td>{c.jobs}</td>
                    <td style={{ fontWeight: 650 }}>${c.revenue.toLocaleString()}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{c.lastService}</td>
                    <td>{c.tags.map(t => <span key={t} className={`badge ${t === 'recurring' ? 'completed' : t === 'commercial' ? 'contacted' : 'draft'}`} style={{ marginRight: 4 }}>{t}</span>)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="detail-panel">
            <div className="card-header"><h3>{selected.name}</h3><button className="card-link" onClick={() => setSelected(null)}>✕</button></div>
            <div className="card-body padded">
              {[['Phone', selected.phone], ['Email', selected.email || '—'], ['Address', selected.address], ['Total Jobs', String(selected.jobs)], ['Lifetime Revenue', `$${selected.revenue.toLocaleString()}`], ['Last Service', selected.lastService]].map(([l, v]) => (
                <div key={l} className="detail-field"><div className="detail-label">{l}</div><div className="detail-value">{v}</div></div>
              ))}
              <div className="detail-actions">
                <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-primary">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3"/></svg>
                  Call
                </a>
                <button className="detail-btn-secondary">Create Job</button>
                <button className="detail-btn-secondary">Send Invoice</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
