'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type RevService = { name: string; amount: number; pct: number; color: string }
type RevMonth = { month: string; amount: number }
type LeadSource = { source: string; count: number; pct: number }

export default function ReportsPage() {
  const [loading, setLoading] = useState(true)
  const [revenueMonth, setRevenueMonth] = useState(0)
  const [prevRevenue, setPrevRevenue] = useState(0)
  const [jobsCompleted, setJobsCompleted] = useState(0)
  const [prevJobsCompleted, setPrevJobsCompleted] = useState(0)
  const [newClients, setNewClients] = useState(0)
  const [avgJobValue, setAvgJobValue] = useState(0)
  const [revByService, setRevByService] = useState<RevService[]>([])
  const [revByMonth, setRevByMonth] = useState<RevMonth[]>([])
  const [leadSources, setLeadSources] = useState<LeadSource[]>([])
  const [winRate, setWinRate] = useState(0)
  const [avgDaysToPay, setAvgDaysToPay] = useState(0)
  const [recurringClients, setRecurringClients] = useState(0)
  const [totalClients, setTotalClients] = useState(0)

  useEffect(() => {
    if (!db) return setLoading(false)
    fetchReports()
  }, [])

  const fetchReports = async () => {
    if (!db) return
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const monthStart = `${year}-${String(month).padStart(2, '0')}-01`
    const prevMonthStart = month === 1 ? `${year - 1}-12-01` : `${year}-${String(month - 1).padStart(2, '0')}-01`

    try {
      const [
        paymentsAllRes, jobsAllRes, contactsRes, leadsRes, quotesRes, paidInvsRes,
      ] = await Promise.all([
        db!.from('jb_payments').select('amount, created_at, status'),
        db!.from('jb_jobs').select('service_id, status, completed_at, contact_id'),
        db!.from('jb_contacts').select('id, created_at'),
        db!.from('jb_leads').select('source, created_at'),
        db!.from('jb_quotes').select('status'),
        db!.from('jb_invoices').select('sent_at, paid_at, status').eq('status', 'paid').not('sent_at', 'is', null).not('paid_at', 'is', null),
      ])

      const payments = (paymentsAllRes.data || []).filter(p => p.status === 'succeeded')
      const jobs = jobsAllRes.data || []
      const contacts = contactsRes.data || []
      const leads = leadsRes.data || []
      const quotes = quotesRes.data || []
      const paidInvs = paidInvsRes.data || []

      // Revenue this month vs last
      const thisMonthRev = payments.filter(p => p.created_at >= monthStart).reduce((s, p) => s + Number(p.amount), 0)
      setRevenueMonth(thisMonthRev)
      const prevMonthRev = payments.filter(p => p.created_at >= prevMonthStart && p.created_at < monthStart).reduce((s, p) => s + Number(p.amount), 0)
      setPrevRevenue(prevMonthRev)

      // Jobs completed this month vs last
      const completedThis = jobs.filter(j => j.status === 'completed' && j.completed_at && j.completed_at >= monthStart).length
      setJobsCompleted(completedThis)
      const completedPrev = jobs.filter(j => j.status === 'completed' && j.completed_at && j.completed_at >= prevMonthStart && j.completed_at < monthStart).length
      setPrevJobsCompleted(completedPrev)

      // New clients this month
      setNewClients(contacts.filter(c => c.created_at >= monthStart).length)

      // Avg job value — need service prices via batch lookup
      const completedJobs = jobs.filter(j => ['completed', 'invoiced', 'paid'].includes(j.status))
      const serviceIds = Array.from(new Set(completedJobs.map(j => j.service_id).filter(Boolean)))
      const serviceMap: Record<string, { name: string; default_price: number }> = {}
      if (serviceIds.length > 0) {
        const { data: sData } = await db!.from('jb_services').select('id, name, default_price').in('id', serviceIds)
        ;(sData || []).forEach((s: Record<string, unknown>) => {
          serviceMap[s.id as string] = { name: s.name as string, default_price: Number(s.default_price) }
        })
      }

      if (completedJobs.length > 0) {
        const totalVal = completedJobs.reduce((s, j) => s + (serviceMap[j.service_id]?.default_price || 0), 0)
        setAvgJobValue(Math.round(totalVal / completedJobs.length))
      }

      // Revenue by service
      const svcRev: Record<string, number> = {}
      completedJobs.forEach(j => {
        const s = serviceMap[j.service_id]
        if (s) svcRev[s.name] = (svcRev[s.name] || 0) + s.default_price
      })
      const svcColors = ['#6BBF1A', '#3D8C0E', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444', '#14B8A6']
      const svcTotal = Object.values(svcRev).reduce((s, v) => s + v, 0) || 1
      setRevByService(Object.entries(svcRev).sort((a, b) => b[1] - a[1]).map(([name, amount], i) => ({
        name, amount, pct: Math.round((amount / svcTotal) * 100), color: svcColors[i % svcColors.length],
      })))

      // Revenue by month (last 6 months)
      const months: RevMonth[] = []
      for (let i = 5; i >= 0; i--) {
        const m = new Date(year, month - 1 - i, 1)
        const mStart = `${m.getFullYear()}-${String(m.getMonth() + 1).padStart(2, '0')}-01`
        const mEnd = new Date(m.getFullYear(), m.getMonth() + 1, 1).toISOString().split('T')[0]
        const rev = payments.filter(p => p.created_at >= mStart && p.created_at < mEnd).reduce((s, p) => s + Number(p.amount), 0)
        months.push({ month: m.toLocaleDateString('en-US', { month: 'short' }), amount: rev })
      }
      setRevByMonth(months)

      // Lead sources
      const srcCounts: Record<string, number> = {}
      leads.forEach(l => { srcCounts[l.source || 'unknown'] = (srcCounts[l.source || 'unknown'] || 0) + 1 })
      const totalLeads = leads.length || 1
      setLeadSources(Object.entries(srcCounts).sort((a, b) => b[1] - a[1]).map(([source, count]) => ({
        source: source.charAt(0).toUpperCase() + source.slice(1), count, pct: Math.round((count / totalLeads) * 100),
      })))

      // Win rate
      const decided = quotes.filter(q => ['approved', 'declined', 'expired'].includes(q.status))
      const approved = quotes.filter(q => q.status === 'approved')
      setWinRate(decided.length > 0 ? Math.round((approved.length / decided.length) * 100) : 0)

      // Avg days to pay
      if (paidInvs.length > 0) {
        const totalDays = paidInvs.reduce((sum, inv) => sum + (new Date(inv.paid_at).getTime() - new Date(inv.sent_at).getTime()) / 86400000, 0)
        setAvgDaysToPay(Math.round((totalDays / paidInvs.length) * 10) / 10)
      }

      // Recurring clients (2+ jobs)
      const jobsByContact: Record<string, number> = {}
      jobs.forEach(j => { if (j.contact_id) jobsByContact[j.contact_id] = (jobsByContact[j.contact_id] || 0) + 1 })
      setRecurringClients(Object.values(jobsByContact).filter(c => c >= 2).length)
      setTotalClients(contacts.length)

    } catch (err) {
      console.error('Reports fetch error:', err)
    }
    setLoading(false)
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading reports...</div>

  const now = new Date()
  const monthName = now.toLocaleDateString('en-US', { month: 'long' })
  const revChange = prevRevenue > 0 ? Math.round(((revenueMonth - prevRevenue) / prevRevenue) * 100) : 0
  const jobChange = prevJobsCompleted > 0 ? jobsCompleted - prevJobsCompleted : 0
  const maxMonthRev = Math.max(...revByMonth.map(m => m.amount), 1)

  return (
    <>
      <div className="page-header"><div><h1>Reports</h1><p>Business performance at a glance</p></div></div>

      <div className="stats-row">
        {[
          { label: `Revenue (${monthName})`, value: `$${revenueMonth.toLocaleString()}`, meta: revChange !== 0 ? `${revChange > 0 ? '↑' : '↓'} ${Math.abs(revChange)}% vs last month` : 'first month' },
          { label: 'Jobs Completed', value: String(jobsCompleted), meta: jobChange !== 0 ? `${jobChange > 0 ? '↑' : '↓'} ${Math.abs(jobChange)} from last month` : 'this month' },
          { label: 'New Clients', value: String(newClients), meta: `${monthName} ${now.getFullYear()}` },
          { label: 'Avg Job Value', value: avgJobValue > 0 ? `$${avgJobValue}` : '—', meta: 'across completed jobs' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-meta">{s.meta}</div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="content-col">
          <div className="card">
            <div className="card-header"><h3>Revenue by Service</h3><span style={{ fontSize: 12, color: '#A8AEA0' }}>All time</span></div>
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

          <div className="card">
            <div className="card-header"><h3>Revenue by Month</h3></div>
            <div className="card-body padded">
              {revByMonth.map(m => (
                <div key={m.month} className="rev-row">
                  <div className="rev-header"><span className="rev-name">{m.month} {now.getFullYear()}</span><span className="rev-amount">${m.amount.toLocaleString()}</span></div>
                  <div className="rev-track"><div className="rev-fill" style={{ width: `${(m.amount / maxMonthRev) * 100}%`, background: '#6BBF1A' }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-col">
          <div className="card">
            <div className="card-header"><h3>Lead Sources</h3></div>
            <div className="card-body padded">
              {leadSources.length === 0 ? (
                <div className="card-empty" style={{ padding: 20 }}>No leads yet.</div>
              ) : leadSources.map(s => (
                <div key={s.source} className="rev-row">
                  <div className="rev-header"><span className="rev-name">{s.source}</span><span className="rev-amount">{s.count} leads</span></div>
                  <div className="rev-track"><div className="rev-fill" style={{ width: `${s.pct}%`, background: '#3B82F6' }} /></div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Key Metrics</h3></div>
            <div className="card-body padded">
              {[
                ['Quote Win Rate', winRate > 0 ? `${winRate}%` : '—'],
                ['Avg Days to Payment', avgDaysToPay > 0 ? `${avgDaysToPay} days` : '—'],
                ['Recurring Clients', totalClients > 0 ? `${recurringClients} (${Math.round((recurringClients / totalClients) * 100)}%)` : '—'],
                ['Total Clients', String(totalClients)],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0F2EC' }}>
                  <span style={{ fontSize: 13, color: '#3A3F35' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1D16' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}