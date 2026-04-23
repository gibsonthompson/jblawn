'use client'

import { useState } from 'react'

const INVOICES = [
  { id: 'JB-01015', client: 'Maria Rodriguez', service: 'Lawn Mowing', amount: 75, status: 'paid', date: '2026-04-22', paidAt: '2026-04-22' },
  { id: 'JB-01014', client: 'David Lee', service: 'Junk Hauling', amount: 350, status: 'sent', date: '2026-04-21', paidAt: null },
  { id: 'JB-01013', client: 'Tanya Nguyen', service: 'Bush Trimming', amount: 150, status: 'draft', date: '2026-04-21', paidAt: null },
  { id: 'JB-01012', client: 'Marcus Johnson', service: 'Junk Hauling', amount: 275, status: 'paid', date: '2026-04-20', paidAt: '2026-04-20' },
  { id: 'JB-01011', client: 'Robert Kim', service: 'Trailer Rental', amount: 400, status: 'sent', date: '2026-04-18', paidAt: null },
  { id: 'JB-01010', client: 'Kevin Park', service: 'Lawn Mowing', amount: 85, status: 'paid', date: '2026-04-17', paidAt: '2026-04-18' },
  { id: 'JB-01009', client: 'Kevin Park', service: 'Yard Cleanup', amount: 250, status: 'overdue', date: '2026-04-12', paidAt: null },
  { id: 'JB-01008', client: 'Angela Torres', service: 'Landscaping', amount: 2400, status: 'sent', date: '2026-04-10', paidAt: null },
]

const FILTERS = ['all', 'draft', 'sent', 'paid', 'overdue'] as const

export default function InvoicesPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? INVOICES : INVOICES.filter(i => i.status === filter)
  const outstanding = INVOICES.filter(i => i.status === 'sent' || i.status === 'overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <>
      <div className="page-header">
        <div><h1>Invoices</h1><p>${outstanding.toLocaleString()} outstanding</p></div>
        <button className="topbar-btn">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Invoice
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? INVOICES.length : INVOICES.filter(i => i.status === f).length})</button>)}
      </div>

      <div className="card"><div className="card-body">
        <table className="tbl">
          <thead><tr><th>Invoice</th><th>Client</th><th>Service</th><th>Amount</th><th>Date</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id}>
                <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{inv.id}</span></td>
                <td className="cell-primary">{inv.client}</td>
                <td>{inv.service}</td>
                <td style={{ fontWeight: 700 }}>${inv.amount.toLocaleString()}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{inv.date}</td>
                <td><span className={`badge ${inv.status}`}>{inv.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  {inv.status === 'draft' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }}>Send</button>}
                  {inv.status === 'overdue' && <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }}>Remind</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>
    </>
  )
}
