'use client'

import { useState } from 'react'

const JOBS = [
  { id: 1, client: 'Maria Rodriguez', service: 'Lawn Mowing', date: '2026-04-23', time: '8:00 AM', address: '1245 Oak St, Oakland', status: 'completed', crew: 'JB + Mike', amount: 75 },
  { id: 2, client: 'David Lee', service: 'Junk Hauling', date: '2026-04-23', time: '10:30 AM', address: '892 Cedar Ave, Berkeley', status: 'in_progress', crew: 'JB + Mike', amount: 350 },
  { id: 3, client: 'Tanya Nguyen', service: 'Bush Trimming', date: '2026-04-23', time: '1:00 PM', address: '3301 Elm Dr, Richmond', status: 'scheduled', crew: 'JB', amount: 150 },
  { id: 4, client: 'Angela Torres', service: 'Landscaping', date: '2026-04-23', time: '3:30 PM', address: '330 Birch Ln, Hayward', status: 'scheduled', crew: 'Full crew', amount: 2400 },
  { id: 5, client: 'Robert Kim', service: 'Trailer Rental', date: '2026-04-24', time: '9:00 AM', address: '1122 Walnut Blvd, Concord', status: 'scheduled', crew: 'JB', amount: 400 },
  { id: 6, client: 'Kevin Park', service: 'Lawn Mowing', date: '2026-04-24', time: '11:00 AM', address: '987 Pine St, San Leandro', status: 'scheduled', crew: 'Mike', amount: 85 },
  { id: 7, client: 'Marcus Johnson', service: 'Junk Hauling', date: '2026-04-22', time: '2:00 PM', address: '2100 Grand Ave, Oakland', status: 'completed', crew: 'JB + Mike', amount: 275 },
  { id: 8, client: 'Maria Rodriguez', service: 'Lawn Mowing', date: '2026-04-16', time: '8:00 AM', address: '1245 Oak St, Oakland', status: 'paid', crew: 'JB', amount: 75 },
]

const FILTERS = ['all', 'scheduled', 'in_progress', 'completed', 'paid'] as const

export default function JobsPage() {
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? JOBS : JOBS.filter(j => j.status === filter)

  return (
    <>
      <div className="page-header">
        <div><h1>Jobs</h1><p>{JOBS.length} total · {JOBS.filter(j => j.status === 'scheduled').length} upcoming</p></div>
        <button className="topbar-btn">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Create Job
        </button>
      </div>

      <div className="filter-pills">
        {FILTERS.map(f => <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)} ({f === 'all' ? JOBS.length : JOBS.filter(j => j.status === f).length})</button>)}
      </div>

      <div className="card">
        <div className="card-body">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Service</th><th>Date</th><th>Crew</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map(j => (
                <tr key={j.id}>
                  <td><div className="cell-primary">{j.client}</div><div className="cell-secondary">{j.address}</div></td>
                  <td>{j.service}</td>
                  <td style={{ whiteSpace: 'nowrap' }}><div>{j.date}</div><div className="cell-secondary">{j.time}</div></td>
                  <td>{j.crew}</td>
                  <td style={{ fontWeight: 650 }}>${j.amount}</td>
                  <td><span className={`badge ${j.status}`}>{j.status.replace('_', ' ')}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
