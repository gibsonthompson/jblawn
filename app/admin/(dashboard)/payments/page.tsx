'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Payment = {
  id: string; amount: number; payment_method: string | null; status: string; created_at: string
  invoice: { invoice_number: string | null } | null
  contact: { first_name: string; last_name: string | null } | null
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [monthTotal, setMonthTotal] = useState(0)
  const [outstandingAmount, setOutstandingAmount] = useState(0)
  const [unpaidCount, setUnpaidCount] = useState(0)
  const [overdueAmount, setOverdueAmount] = useState(0)
  const [overdueCount, setOverdueCount] = useState(0)
  const [avgDaysToPay, setAvgDaysToPay] = useState(0)

  useEffect(() => {
    if (!db) return setLoading(false)
    fetchAll()
  }, [])

  const fetchAll = async () => {
    if (!db) return

    const monthStart = (() => {
      const now = new Date()
      return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
    })()

    const [paymentsRes, invoicesRes, paidInvoicesRes] = await Promise.all([
      db.from('jb_payments')
        .select('*, invoice:jb_invoices(invoice_number), contact:jb_contacts(first_name, last_name)')
        .order('created_at', { ascending: false }),
      db.from('jb_invoices').select('status, total'),
      db.from('jb_invoices').select('sent_at, paid_at').eq('status', 'paid').not('sent_at', 'is', null).not('paid_at', 'is', null),
    ])

    const allPayments = (paymentsRes.data || []) as unknown as Payment[]
    setPayments(allPayments)

    // This month total
    const thisMonth = allPayments
      .filter(p => p.status === 'succeeded' && p.created_at >= monthStart)
      .reduce((s, p) => s + Number(p.amount), 0)
    setMonthTotal(thisMonth)

    // Outstanding and overdue from invoices
    const invoices = invoicesRes.data || []
    const unpaid = invoices.filter(i => i.status === 'sent' || i.status === 'overdue')
    setUnpaidCount(unpaid.length)
    setOutstandingAmount(unpaid.reduce((s, i) => s + Number(i.total), 0))

    const overdue = invoices.filter(i => i.status === 'overdue')
    setOverdueCount(overdue.length)
    setOverdueAmount(overdue.reduce((s, i) => s + Number(i.total), 0))

    // Avg days to pay
    const paidInvs = paidInvoicesRes.data || []
    if (paidInvs.length > 0) {
      const totalDays = paidInvs.reduce((sum, inv) => {
        const sent = new Date(inv.sent_at).getTime()
        const paid = new Date(inv.paid_at).getTime()
        return sum + (paid - sent) / 86400000
      }, 0)
      setAvgDaysToPay(Math.round((totalDays / paidInvs.length) * 10) / 10)
    }

    setLoading(false)
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading payments...</div>

  return (
    <>
      <div className="page-header"><div><h1>Payments</h1><p>{monthTotal > 0 ? `$${monthTotal.toLocaleString()} collected this month` : 'No payments this month'}</p></div></div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">This Month</span><div className="stat-icon green"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div></div>
          <div className="stat-value">${monthTotal.toLocaleString()}</div>
          <div className="stat-meta">{payments.filter(p => p.status === 'succeeded').length} payments</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Outstanding</span><div className="stat-icon amber"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div></div>
          <div className="stat-value">${outstandingAmount.toLocaleString()}</div>
          <div className="stat-meta">{unpaidCount} unpaid invoice{unpaidCount !== 1 ? 's' : ''}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Overdue</span><div className={`stat-icon ${overdueCount > 0 ? 'red' : 'green'}`}><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div></div>
          <div className="stat-value">${overdueAmount.toLocaleString()}</div>
          <div className={`stat-meta ${overdueCount > 0 ? 'down' : ''}`}>{overdueCount} invoice{overdueCount !== 1 ? 's' : ''}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Avg Days to Pay</span><div className="stat-icon blue"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div></div>
          <div className="stat-value">{avgDaysToPay > 0 ? avgDaysToPay : '—'}</div>
          <div className="stat-meta">days</div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="card"><div className="card-empty">No payments recorded yet.</div></div>
      ) : (
        <div className="card"><div className="card-body">
          <table className="tbl">
            <thead><tr><th>Client</th><th>Invoice</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id}>
                  <td className="cell-primary">{p.contact ? `${p.contact.first_name} ${p.contact.last_name || ''}` : '—'}</td>
                  <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{p.invoice?.invoice_number || '—'}</span></td>
                  <td style={{ fontWeight: 700 }}>${Number(p.amount).toLocaleString()}</td>
                  <td style={{ textTransform: 'capitalize' }}>{p.payment_method || '—'}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td><span className={`badge ${p.status}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      )}
    </>
  )
}