'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '../../../lib/admin-db'

type TodayJob = { client: string; service: string; time: string; address: string; status: string }
type Activity = { color: string; text: string; time: string; ts: number }
type Action = { title: string; subtitle: string; btn: string; href: string }

export default function AdminHome() {
  const [loading, setLoading] = useState(true)

  // Workflow pipeline
  const [newLeads, setNewLeads] = useState(0)
  const [quotesCount, setQuotesCount] = useState(0)
  const [quotesAmount, setQuotesAmount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)
  const [approvedAmount, setApprovedAmount] = useState(0)
  const [toInvoiceCount, setToInvoiceCount] = useState(0)
  const [toInvoiceAmount, setToInvoiceAmount] = useState(0)
  const [awaitingCount, setAwaitingCount] = useState(0)
  const [awaitingAmount, setAwaitingAmount] = useState(0)

  // Stat cards
  const [revenueMonth, setRevenueMonth] = useState(0)
  const [prevRevenueMonth, setPrevRevenueMonth] = useState(0)
  const [jobsThisWeek, setJobsThisWeek] = useState(0)
  const [remainingToday, setRemainingToday] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [outstanding, setOutstanding] = useState(0)
  const [overdueCount, setOverdueCount] = useState(0)

  // Today's schedule
  const [todayJobs, setTodayJobs] = useState<TodayJob[]>([])
  const [nextJob, setNextJob] = useState<string | null>(null)

  // Recommended actions
  const [actions, setActions] = useState<Action[]>([])

  // Activity feed
  const [activity, setActivity] = useState<Activity[]>([])

  // Revenue by service
  const [revByService, setRevByService] = useState<{ name: string; amount: number; pct: number; color: string }[]>([])

  useEffect(() => {
    if (!db) return setLoading(false)
    fetchAll()
  }, [])

  const fetchAll = async () => {
    if (!db) return
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    const prevMonthStart = now.getMonth() === 0
      ? `${now.getFullYear() - 1}-12-01`
      : `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}-01`

    // Get day of week (0=Sun, 1=Mon...)
    const dayOfWeek = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)
    const weekStart = monday.toISOString().split('T')[0]
    const weekEnd = sunday.toISOString().split('T')[0]

    try {
      const [
        leadsRes, quotesRes, jobsRes, todayJobsRes, weekJobsRes,
        invoicesRes, paymentsMonthRes, paymentsPrevRes,
        recentLeadsRes, recentJobsRes, recentPaymentsRes, recentQuotesRes,
        staleQuotesRes, overdueInvRes, newLeadsRes, reviewEligibleRes,
        serviceJobsRes,
      ] = await Promise.all([
        db.from('jb_leads').select('status'),
        db.from('jb_quotes').select('status, total'),
        db.from('jb_jobs').select('status'),
        db.from('jb_jobs').select('*, contact:jb_contacts(first_name, last_name, address), service:jb_services(name)').eq('scheduled_date', today).order('time_window'),
        db.from('jb_jobs').select('id').gte('scheduled_date', weekStart).lte('scheduled_date', weekEnd),
        db.from('jb_invoices').select('status, total'),
        db.from('jb_payments').select('amount').eq('status', 'succeeded').gte('created_at', monthStart),
        db.from('jb_payments').select('amount').eq('status', 'succeeded').gte('created_at', prevMonthStart).lt('created_at', monthStart),
        db.from('jb_leads').select('first_name, service_requested, created_at').order('created_at', { ascending: false }).limit(4),
        db.from('jb_jobs').select('status, completed_at, contact:jb_contacts(first_name)').not('completed_at', 'is', null).order('completed_at', { ascending: false }).limit(4),
        db.from('jb_payments').select('amount, created_at, contact:jb_contacts(first_name), invoice:jb_invoices(invoice_number)').eq('status', 'succeeded').order('created_at', { ascending: false }).limit(4),
        db.from('jb_quotes').select('quote_number, total, created_at, contact:jb_contacts(first_name)').order('created_at', { ascending: false }).limit(4),
        db.from('jb_quotes').select('quote_number, contact:jb_contacts(first_name)').eq('status', 'sent').lt('sent_at', new Date(Date.now() - 3 * 86400000).toISOString()),
        db.from('jb_invoices').select('invoice_number, total, contact:jb_contacts(first_name)').eq('status', 'overdue'),
        db.from('jb_leads').select('first_name, service_requested, created_at').eq('status', 'new').order('created_at', { ascending: false }).limit(3),
        db.from('jb_contacts').select('first_name').eq('review_status', 'not_requested').not('last_service_date', 'is', null).limit(3),
        db.from('jb_jobs').select('service:jb_services(name, base_price)').in('status', ['completed', 'invoiced', 'paid']),
      ])

      // --- WORKFLOW PIPELINE ---
      const leads = leadsRes.data || []
      setNewLeads(leads.filter(l => l.status === 'new').length)

      const quotes = quotesRes.data || []
      const pendingQuotes = quotes.filter(q => q.status === 'draft' || q.status === 'sent')
      setQuotesCount(pendingQuotes.length)
      setQuotesAmount(pendingQuotes.reduce((s, q) => s + Number(q.total), 0))

      const jobs = jobsRes.data || []
      const scheduledJobs = jobs.filter(j => j.status === 'scheduled')
      setApprovedCount(scheduledJobs.length)
      // For approved amount, we'd need to join to services — use count × avg for now
      setApprovedAmount(0) // Will show count only

      const completedNoInvoice = jobs.filter(j => j.status === 'completed')
      setToInvoiceCount(completedNoInvoice.length)
      setToInvoiceAmount(0)

      const invoices = invoicesRes.data || []
      const awaitingInv = invoices.filter(i => i.status === 'sent' || i.status === 'overdue')
      setAwaitingCount(awaitingInv.length)
      setAwaitingAmount(awaitingInv.reduce((s, i) => s + Number(i.total), 0))

      // --- STAT CARDS ---
      const monthPayments = paymentsMonthRes.data || []
      const monthRev = monthPayments.reduce((s, p) => s + Number(p.amount), 0)
      setRevenueMonth(monthRev)

      const prevPayments = paymentsPrevRes.data || []
      setPrevRevenueMonth(prevPayments.reduce((s, p) => s + Number(p.amount), 0))

      setJobsThisWeek((weekJobsRes.data || []).length)

      // Win rate: approved / (approved + declined + expired)
      const decidedQuotes = quotes.filter(q => ['approved', 'declined', 'expired'].includes(q.status))
      const approvedQuotes = quotes.filter(q => q.status === 'approved')
      setWinRate(decidedQuotes.length > 0 ? Math.round((approvedQuotes.length / decidedQuotes.length) * 100) : 0)

      setOutstanding(awaitingInv.reduce((s, i) => s + Number(i.total), 0))
      setOverdueCount(invoices.filter(i => i.status === 'overdue').length)

      // --- TODAY'S SCHEDULE ---
      const tJobs = (todayJobsRes.data || []).map((j: Record<string, unknown>) => {
        const c = j.contact as { first_name: string; last_name: string | null; address: string | null } | null
        const s = j.service as { name: string } | null
        return {
          client: c ? `${c.first_name} ${c.last_name || ''}` : '—',
          service: s?.name || (j.description as string) || '—',
          time: (j.time_window as string) || '—',
          address: c?.address || '—',
          status: j.status as string,
        }
      })
      setTodayJobs(tJobs)

      const nextUp = tJobs.find(j => j.status === 'scheduled' || j.status === 'en_route')
      setNextJob(nextUp ? `${nextUp.client} — ${nextUp.service} at ${nextUp.time}` : null)
      setRemainingToday(tJobs.filter(j => j.status !== 'completed').length)

      // --- RECOMMENDED ACTIONS ---
      const actionList: Action[] = []
      const staleQ = staleQuotesRes.data || []
      staleQ.forEach((q: Record<string, unknown>) => {
        const c = q.contact as { first_name: string } | null
        actionList.push({ title: `Follow up on quote ${q.quote_number}`, subtitle: `${c?.first_name || 'Client'} hasn't responded in 3+ days`, btn: 'Follow up', href: '/admin/quotes' })
      })
      const overdueInv = overdueInvRes.data || []
      overdueInv.forEach((i: Record<string, unknown>) => {
        const c = i.contact as { first_name: string } | null
        actionList.push({ title: `Invoice overdue — ${c?.first_name || 'Client'}`, subtitle: `${i.invoice_number} · $${Number(i.total).toLocaleString()} past due`, btn: 'Send reminder', href: '/admin/invoices' })
      })
      const newL = newLeadsRes.data || []
      newL.forEach((l: Record<string, unknown>) => {
        actionList.push({ title: `New request — ${l.first_name}`, subtitle: `${l.service_requested}`, btn: 'Review', href: '/admin/leads' })
      })
      const reviewEl = reviewEligibleRes.data || []
      reviewEl.forEach((c: Record<string, unknown>) => {
        actionList.push({ title: `Request review — ${c.first_name}`, subtitle: 'Completed service, no review requested yet', btn: 'Request', href: '/admin/reviews' })
      })
      setActions(actionList.slice(0, 4))

      // --- ACTIVITY FEED ---
      const feed: Activity[] = []
      function timeAgo(d: string) {
        const diff = Date.now() - new Date(d).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 60) return `${mins}m ago`
        const hrs = Math.floor(mins / 60)
        if (hrs < 24) return `${hrs}h ago`
        return `${Math.floor(hrs / 24)}d ago`
      }

      ;(recentPaymentsRes.data || []).forEach((p: Record<string, unknown>) => {
        const c = p.contact as { first_name: string } | null
        const inv = p.invoice as { invoice_number: string } | null
        feed.push({ color: 'green', text: `${c?.first_name || 'Client'} paid ${inv?.invoice_number || 'invoice'} — $${Number(p.amount).toLocaleString()}`, time: timeAgo(p.created_at as string), ts: new Date(p.created_at as string).getTime() })
      })
      ;(recentLeadsRes.data || []).forEach((l: Record<string, unknown>) => {
        feed.push({ color: 'blue', text: `${l.first_name} submitted a request for ${l.service_requested}`, time: timeAgo(l.created_at as string), ts: new Date(l.created_at as string).getTime() })
      })
      ;(recentJobsRes.data || []).forEach((j: Record<string, unknown>) => {
        const c = j.contact as { first_name: string } | null
        if (j.completed_at) feed.push({ color: 'green', text: `Job completed for ${c?.first_name || 'client'}`, time: timeAgo(j.completed_at as string), ts: new Date(j.completed_at as string).getTime() })
      })
      ;(recentQuotesRes.data || []).forEach((q: Record<string, unknown>) => {
        const c = q.contact as { first_name: string } | null
        feed.push({ color: 'purple', text: `Quote ${q.quote_number} sent to ${c?.first_name || 'client'} — $${Number(q.total).toLocaleString()}`, time: timeAgo(q.created_at as string), ts: new Date(q.created_at as string).getTime() })
      })
      feed.sort((a, b) => b.ts - a.ts)
      setActivity(feed.slice(0, 6))

      // --- REVENUE BY SERVICE ---
      const svcJobs = serviceJobsRes.data || []
      const svcMap: Record<string, number> = {}
      svcJobs.forEach((j: Record<string, unknown>) => {
        const s = j.service as { name: string; base_price: number } | null
        if (s) svcMap[s.name] = (svcMap[s.name] || 0) + Number(s.base_price)
      })
      const svcColors = ['#6BBF1A', '#3D8C0E', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#14B8A6']
      const svcTotal = Object.values(svcMap).reduce((s, v) => s + v, 0) || 1
      const svcArr = Object.entries(svcMap)
        .sort((a, b) => b[1] - a[1])
        .map(([name, amount], i) => ({ name, amount, pct: Math.round((amount / svcTotal) * 100), color: svcColors[i % svcColors.length] }))
      setRevByService(svcArr)

    } catch (err) {
      console.error('Dashboard fetch error:', err)
    }

    setLoading(false)
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading dashboard...</div>

  const todayComplete = todayJobs.filter(j => j.status === 'completed').length
  const todayTotal = todayJobs.length
  const pct = todayTotal > 0 ? Math.round((todayComplete / todayTotal) * 100) : 0
  const revChange = prevRevenueMonth > 0 ? Math.round(((revenueMonth - prevRevenueMonth) / prevRevenueMonth) * 100) : 0

  const monthName = new Date().toLocaleDateString('en-US', { month: 'long' })

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
        {[
          { label: 'Requests', count: newLeads, amount: null, href: '/admin/leads' },
          { label: 'Quotes', count: quotesCount, amount: quotesAmount > 0 ? `$${quotesAmount.toLocaleString()}` : null, href: '/admin/quotes' },
          { label: 'Approved', count: approvedCount, amount: null, href: '/admin/jobs', active: true },
          { label: 'To Invoice', count: toInvoiceCount, amount: null, href: '/admin/invoices' },
          { label: 'Awaiting Payment', count: awaitingCount, amount: awaitingAmount > 0 ? `$${awaitingAmount.toLocaleString()}` : null, href: '/admin/payments' },
        ].map(step => (
          <Link key={step.label} href={step.href} className={`workflow-step${step.active ? ' active' : ''}`}>
            <div className="workflow-count">{step.count}</div>
            <div className="workflow-label">{step.label}</div>
            {step.amount && <div className="workflow-amount">{step.amount}</div>}
          </Link>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Revenue ({monthName})</span>
            <div className="stat-icon green"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
          </div>
          <div className="stat-value">${revenueMonth.toLocaleString()}</div>
          <div className={`stat-meta ${revChange >= 0 ? 'up' : 'down'}`}>{revChange !== 0 ? `${revChange > 0 ? '↑' : '↓'} ${Math.abs(revChange)}% vs last month` : 'first month'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Jobs This Week</span>
            <div className="stat-icon blue"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
          </div>
          <div className="stat-value">{jobsThisWeek}</div>
          <div className="stat-meta">{remainingToday} remaining today</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Win Rate</span>
            <div className="stat-icon amber"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          </div>
          <div className="stat-value">{winRate > 0 ? `${winRate}%` : '—'}</div>
          <div className="stat-meta">quotes → booked</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Outstanding</span>
            <div className={`stat-icon ${overdueCount > 0 ? 'red' : 'green'}`}><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          </div>
          <div className="stat-value">${outstanding.toLocaleString()}</div>
          <div className={`stat-meta ${overdueCount > 0 ? 'down' : ''}`}>{overdueCount > 0 ? `${overdueCount} overdue` : 'all clear'}</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        <div className="content-col">
          {/* Today's Schedule */}
          <div className="card">
            <div className="card-header"><h3>Today&apos;s Schedule</h3><Link href="/admin/schedule" className="card-link">View calendar →</Link></div>
            {todayTotal > 0 && (
              <div className="schedule-progress">
                <div className="schedule-ring">
                  <svg width="48" height="48" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#F0F2EC" strokeWidth="4" />
                    <circle cx="24" cy="24" r="20" fill="none" stroke="#6BBF1A" strokeWidth="4" strokeDasharray={`${pct * 1.257} 125.7`} strokeLinecap="round" />
                  </svg>
                  <div className="schedule-ring-text">{todayComplete}/{todayTotal}</div>
                </div>
                <div className="schedule-info">
                  <div className="schedule-title">{todayComplete} of {todayTotal} visits complete</div>
                  {nextJob && <div className="schedule-subtitle">Next: {nextJob}</div>}
                </div>
              </div>
            )}
            <div className="card-body">
              {todayTotal === 0 ? (
                <div className="card-empty">No jobs scheduled for today.</div>
              ) : (
                <table className="tbl">
                  <thead><tr><th>Client</th><th>Service</th><th>Time</th><th>Status</th></tr></thead>
                  <tbody>
                    {todayJobs.map((job, i) => (
                      <tr key={i}>
                        <td><div className="cell-primary">{job.client}</div><div className="cell-secondary">{job.address}</div></td>
                        <td>{job.service}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>{job.time}</td>
                        <td><span className={`badge ${job.status}`}>{job.status.replace('_', ' ')}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recommended Actions */}
          {actions.length > 0 && (
            <div className="card">
              <div className="card-header"><h3>Recommended Actions</h3></div>
              <div className="card-body">
                <table className="tbl"><tbody>
                  {actions.map((a, i) => (
                    <tr key={i}>
                      <td><div className="cell-primary">{a.title}</div><div className="cell-secondary">{a.subtitle}</div></td>
                      <td style={{ textAlign: 'right' }}><Link href={a.href} className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px', textDecoration: 'none' }}>{a.btn}</Link></td>
                    </tr>
                  ))}
                </tbody></table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="content-col">
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header"><h3>Quick Actions</h3></div>
            <div className="actions-grid">
              {[
                { label: 'New Request', href: '/admin/leads', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg> },
                { label: 'Create Quote', href: '/admin/quotes', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> },
                { label: 'Schedule Job', href: '/admin/jobs', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
                { label: 'Send Invoice', href: '/admin/invoices', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
                { label: 'Add Client', href: '/admin/contacts', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg> },
                { label: 'Request Review', href: '/admin/reviews', icon: <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
              ].map(a => (
                <Link key={a.label} href={a.href} className="action-btn">{a.icon}{a.label}</Link>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card">
            <div className="card-header"><h3>Recent Activity</h3></div>
            <div className="card-body">
              {activity.length === 0 ? (
                <div className="card-empty">No activity yet.</div>
              ) : (
                <ul className="feed">
                  {activity.map((item, i) => (
                    <li key={i} className="feed-item">
                      <div className={`feed-dot ${item.color}`} />
                      <div>
                        <div className="feed-text">{item.text}</div>
                        <div className="feed-time">{item.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Revenue by Service */}
          <div className="card">
            <div className="card-header"><h3>Revenue by Service</h3><span style={{ fontSize: 12, color: '#A8AEA0' }}>{monthName} {new Date().getFullYear()}</span></div>
            <div className="card-body padded">
              {revByService.length === 0 ? (
                <div className="card-empty" style={{ padding: 20 }}>No completed jobs yet.</div>
              ) : revByService.map(s => (
                <div key={s.name} className="rev-row">
                  <div className="rev-header"><span className="rev-name">{s.name}</span><span className="rev-amount">${s.amount.toLocaleString()}</span></div>
                  <div className="rev-track"><div className="rev-fill" style={{ width: `${s.pct}%`, background: s.color }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}