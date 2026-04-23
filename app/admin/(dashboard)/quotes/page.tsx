'use client'

import { useState } from 'react'

const QUOTES = [
  { id: 'QT-00044', client: 'Sarah Mitchell', service: 'Landscaping & Sod', amount: 3200, status: 'sent', date: '2026-04-21', validUntil: '2026-05-05' },
  { id: 'QT-00043', client: 'James Carter', service: 'Yard Cleanup', amount: 450, status: 'draft', date: '2026-04-22', validUntil: null },
  { id: 'QT-00042', client: 'Robert Kim', service: 'Full-Service Trailer', amount: 400, status: 'approved', date: '2026-04-18', validUntil: '2026-05-02' },
  { id: 'QT-00041', client: 'Diane Patel', service: 'Bush Trimming', amount: 200, status: 'declined', date: '2026-04-15', validUntil: '2026-04-29' },
  { id: 'QT-00040', client: 'Angela Torres', service: 'Landscaping & Sod', amount: 2400, status: 'approved', date: '2026-04-12', validUntil: '2026-04-26' },
]

const FILTERS = ['all', 'draft', 'sent', 'approved', 'declined'] as const

export default function QuotesPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? QUOTES : QUOTES.filter(q => q.status === filter)

  return (
    <>
      <div className="page-header">
        <div><h1>Quotes</h1><p>{QUOTES.length} total · {QUOTES.filter(q => q.status === 'sent').length} awaiting response</p></div>
        <button className="topbar-btn">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Quote
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? QUOTES.length : QUOTES.filter(q => q.status === f).length})</button>)}
      </div>

      <div className="card"><div className="card-body">
        <table className="tbl">
          <thead><tr><th>Quote</th><th>Client</th><th>Service</th><th>Amount</th><th>Sent</th><th>Valid Until</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.map(q => (
              <tr key={q.id}>
                <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{q.id}</span></td>
                <td className="cell-primary">{q.client}</td>
                <td>{q.service}</td>
                <td style={{ fontWeight: 700 }}>${q.amount.toLocaleString()}</td>
                <td>{q.date}</td>
                <td>{q.validUntil || '—'}</td>
                <td><span className={`badge ${q.status}`}>{q.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>
    </>
  )
}
