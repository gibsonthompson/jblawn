'use client'

import { useState } from 'react'
import Link from 'next/link'

type Lead = {
  id: number; first_name: string; last_name: string; phone: string; email: string
  service_requested: string; address: string; preferred_date: string
  source: string; status: string; created_at: string; details: string
}

const LEADS: Lead[] = [
  { id: 1, first_name: 'James', last_name: 'Carter', phone: '(510) 555-1234', email: 'james.c@email.com', service_requested: 'Yard Cleanup & Debris', address: '456 Pine St, Oakland, CA', preferred_date: '2026-04-25', source: 'website', status: 'new', created_at: '22 min ago', details: 'Backyard is overgrown, about 2000 sq ft. Need everything cleared before a party next weekend.' },
  { id: 2, first_name: 'Sarah', last_name: 'Mitchell', phone: '(510) 555-5678', email: 'sarah.m@email.com', service_requested: 'Lawn Mowing & Maintenance', address: '789 Maple Ave, Berkeley, CA', preferred_date: '2026-04-24', source: 'thumbtack', status: 'contacted', created_at: '1 hr ago', details: 'Weekly mowing service. Front and back yard.' },
  { id: 3, first_name: 'Robert', last_name: 'Kim', phone: '(925) 555-9012', email: 'rkim@email.com', service_requested: 'Dump Trailer Rental', address: '1122 Walnut Blvd, Concord, CA', preferred_date: '2026-04-28', source: 'phone', status: 'quoted', created_at: '3 hrs ago', details: 'Wants full-service trailer for a garage cleanout.' },
  { id: 4, first_name: 'Angela', last_name: 'Torres', phone: '(510) 555-3456', email: 'angela.t@email.com', service_requested: 'Landscaping & Design', address: '330 Birch Ln, Hayward, CA', preferred_date: '2026-05-01', source: 'google', status: 'new', created_at: '5 hrs ago', details: 'Wants sod installed in front yard. Approx 800 sq ft.' },
  { id: 5, first_name: 'Marcus', last_name: 'Johnson', phone: '(510) 555-7890', email: '', service_requested: 'Junk Hauling & Removal', address: '2100 Grand Ave, Oakland, CA', preferred_date: '2026-04-23', source: 'yelp', status: 'booked', created_at: '1 day ago', details: 'Old furniture and appliances. Second floor apartment.' },
  { id: 6, first_name: 'Diane', last_name: 'Patel', phone: '(510) 555-2345', email: 'dpatel@email.com', service_requested: 'Bush & Hedge Trimming', address: '98 Rose St, San Leandro, CA', preferred_date: '2026-04-26', source: 'referral', status: 'lost', created_at: '2 days ago', details: 'Went with another company.' },
]

const FILTERS = ['all', 'new', 'contacted', 'quoted', 'booked', 'lost'] as const
const SRC: Record<string, string> = { website: 'Website', phone: 'Phone', thumbtack: 'Thumbtack', yelp: 'Yelp', google: 'Google', referral: 'Referral' }

export default function LeadsPage() {
  const [filter, setFilter] = useState<string>('all')
  const [selected, setSelected] = useState<Lead | null>(null)

  const filtered = filter === 'all' ? LEADS : LEADS.filter((l) => l.status === filter)
  const counts = LEADS.reduce((a, l) => { a[l.status] = (a[l.status] || 0) + 1; return a }, {} as Record<string, number>)

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Requests</h1>
          <p>{LEADS.length} total · {counts['new'] || 0} new</p>
        </div>
        <button className="topbar-btn">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Request
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map((f) => (
          <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? `All (${LEADS.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${counts[f] || 0})`}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div className="card">
          <div className="card-body">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Source</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} onClick={() => setSelected(lead)} style={{ cursor: 'pointer', background: selected?.id === lead.id ? '#FAFBF8' : undefined }}>
                    <td>
                      <div className="cell-primary">{lead.first_name} {lead.last_name}</div>
                      <div className="cell-secondary">{lead.phone}</div>
                    </td>
                    <td>{lead.service_requested}</td>
                    <td><span style={{ fontSize: 12.5, color: '#7A8072' }}>{SRC[lead.source] || lead.source}</span></td>
                    <td style={{ whiteSpace: 'nowrap' }}>{lead.preferred_date}</td>
                    <td><span className={`badge ${lead.status}`}>{lead.status}</span></td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={5} className="card-empty">No requests match this filter.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="detail-panel">
            <div className="card-header">
              <h3>{selected.first_name} {selected.last_name}</h3>
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
                ['Preferred Date', selected.preferred_date],
                ['Source', SRC[selected.source] || selected.source],
                ['Submitted', selected.created_at],
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

              <div className="detail-actions">
                <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="detail-btn-primary">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3"/></svg>
                  Call {selected.first_name}
                </a>
                <button className="detail-btn-secondary">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                  Send SMS
                </button>
                <button className="detail-btn-secondary">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  Create Quote
                </button>
                <button className="detail-btn-secondary">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  Convert to Job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}