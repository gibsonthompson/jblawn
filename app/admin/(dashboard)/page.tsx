'use client'

import Link from 'next/link'

const WORKFLOW = [
  { label: 'Requests', count: 3, amount: null, href: '/admin/leads' },
  { label: 'Quotes', count: 2, amount: '$1,450', href: '/admin/quotes' },
  { label: 'Approved', count: 5, amount: '$3,200', href: '/admin/jobs', active: true },
  { label: 'To Invoice', count: 2, amount: '$475', href: '/admin/invoices' },
  { label: 'Awaiting Payment', count: 4, amount: '$1,850', href: '/admin/payments' },
]

const STATS = [
  { label: 'Revenue (April)', value: '$4,850', meta: '↑ 12% vs March', metaType: 'up', color: 'green', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
  { label: 'Jobs This Week', value: '14', meta: '3 remaining today', metaType: '', color: 'blue', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Win Rate', value: '78%', meta: 'quotes → booked', metaType: '', color: 'amber', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  { label: 'Outstanding', value: '$1,850', meta: '2 overdue', metaType: 'down', color: 'red', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
]

const TODAYS_JOBS = [
  { id: 1, customer: 'Maria Rodriguez', service: 'Lawn Mowing', time: '8:00 AM', address: '1245 Oak St, Oakland', status: 'completed' },
  { id: 2, customer: 'David Lee', service: 'Junk Hauling', time: '10:30 AM', address: '892 Cedar Ave, Berkeley', status: 'in_progress' },
  { id: 3, customer: 'Tanya Nguyen', service: 'Bush Trimming', time: '1:00 PM', address: '3301 Elm Dr, Richmond', status: 'scheduled' },
  { id: 4, customer: 'Angela Torres', service: 'Landscaping', time: '3:30 PM', address: '330 Birch Ln, Hayward', status: 'scheduled' },
]

const ACTIVITY = [
  { color: 'green', text: <><strong>Maria Rodriguez</strong> paid invoice JB-01012 — $75.00</>, time: '8 min ago' },
  { color: 'blue', text: <><strong>James Carter</strong> submitted a request for Yard Cleanup</>, time: '22 min ago' },
  { color: 'amber', text: <>Invoice JB-01009 for <strong>Kevin Park</strong> is 3 days overdue</>, time: '1 hr ago' },
  { color: 'green', text: <>Lawn Mowing completed at 1245 Oak St</>, time: '2 hrs ago' },
  { color: 'purple', text: <>Quote QT-00042 sent to <strong>Sarah Mitchell</strong> — $350</>, time: '3 hrs ago' },
  { color: 'blue', text: <><strong>Robert Kim</strong> approved quote QT-00039 — $400</>, time: '5 hrs ago' },
]

const ACTIONS = [
  { label: 'New Request', href: '/admin/leads', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg> },
  { label: 'Create Quote', href: '/admin/quotes', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
  { label: 'Schedule Job', href: '/admin/jobs', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Send Invoice', href: '/admin/invoices', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { label: 'Add Client', href: '/admin/contacts', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg> },
  { label: 'Request Review', href: '/admin/reviews', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
]

const completedToday = 1
const totalToday = 4
const pct = Math.round((completedToday / totalToday) * 100)

export default function AdminHome() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Home</h1>
          <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
      </div>

      {/* Workflow Pipeline */}
      <div className="workflow-bar">
        {WORKFLOW.map((step) => (
          <Link key={step.label} href={step.href} className={`workflow-step${step.active ? ' active' : ''}`}>
            <div className="workflow-count">{step.count}</div>
            <div className="workflow-label">{step.label}</div>
            {step.amount && <div className="workflow-amount">{step.amount}</div>}
          </Link>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        {STATS.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-header">
              <span className="stat-label">{s.label}</span>
              <div className={`stat-icon ${s.color}`}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
            <div className={`stat-meta ${s.metaType}`}>{s.meta}</div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        <div className="content-col">

          {/* Today's Schedule */}
          <div className="card">
            <div className="card-header">
              <h3>Today&apos;s Schedule</h3>
              <Link href="/admin/schedule" className="card-link">View calendar →</Link>
            </div>

            {/* Progress Ring */}
            <div className="schedule-progress">
              <div className="schedule-ring">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#F0F2EC" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#6BBF1A" strokeWidth="4"
                    strokeDasharray={`${pct * 1.257} 125.7`} strokeLinecap="round" />
                </svg>
                <div className="schedule-ring-text">{completedToday}/{totalToday}</div>
              </div>
              <div className="schedule-info">
                <div className="schedule-title">{completedToday} of {totalToday} visits complete</div>
                <div className="schedule-subtitle">Next: David Lee — Junk Hauling at 10:30 AM</div>
              </div>
            </div>

            <div className="card-body">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TODAYS_JOBS.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <div className="cell-primary">{job.customer}</div>
                        <div className="cell-secondary">{job.address}</div>
                      </td>
                      <td>{job.service}</td>
                      <td style={{ whiteSpace: 'nowrap' }}>{job.time}</td>
                      <td><span className={`badge ${job.status}`}>{job.status.replace('_', ' ')}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="card">
            <div className="card-header">
              <h3>Recommended Actions</h3>
            </div>
            <div className="card-body">
              <table className="tbl">
                <tbody>
                  <tr>
                    <td>
                      <div className="cell-primary">Follow up on quote QT-00041</div>
                      <div className="cell-secondary">Sarah Mitchell hasn&apos;t responded in 3 days</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px' }}>Follow up</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cell-primary">Invoice overdue — Kevin Park</div>
                      <div className="cell-secondary">JB-01009 · $250.00 · 3 days past due</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px' }}>Send reminder</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cell-primary">New request — James Carter</div>
                      <div className="cell-secondary">Yard Cleanup · Submitted 22 min ago</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px' }}>Review</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="cell-primary">Request review — Maria Rodriguez</div>
                      <div className="cell-secondary">Last service completed today · No review requested yet</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px' }}>Request</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-col">

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header"><h3>Quick Actions</h3></div>
            <div className="actions-grid">
              {ACTIONS.map((a) => (
                <Link key={a.label} href={a.href} className="action-btn">{a.icon}{a.label}</Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <div className="card-header"><h3>Recent Activity</h3></div>
            <div className="card-body">
              <ul className="feed">
                {ACTIVITY.map((item, i) => (
                  <li key={i} className="feed-item">
                    <div className={`feed-dot ${item.color}`} />
                    <div>
                      <div className="feed-text">{item.text}</div>
                      <div className="feed-time">{item.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Revenue by Service */}
          <div className="card">
            <div className="card-header">
              <h3>Revenue by Service</h3>
              <span style={{ fontSize: 12, color: '#A8AEA0' }}>April 2026</span>
            </div>
            <div className="card-body padded">
              {[
                { name: 'Lawn Mowing', amount: '$1,875', pct: 39, color: '#6BBF1A' },
                { name: 'Junk Hauling', amount: '$1,500', pct: 31, color: '#3D8C0E' },
                { name: 'Yard Cleanup', amount: '$725', pct: 15, color: '#F59E0B' },
                { name: 'Landscaping', amount: '$450', pct: 9, color: '#3B82F6' },
                { name: 'Trailer Rental', amount: '$300', pct: 6, color: '#8B5CF6' },
              ].map((s) => (
                <div key={s.name} className="rev-row">
                  <div className="rev-header">
                    <span className="rev-name">{s.name}</span>
                    <span className="rev-amount">{s.amount}</span>
                  </div>
                  <div className="rev-track">
                    <div className="rev-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}