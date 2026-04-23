'use client'

const PAYMENTS = [
  { id: 1, client: 'Maria Rodriguez', invoice: 'JB-01015', amount: 75, method: 'card', date: '2026-04-22', status: 'succeeded' },
  { id: 2, client: 'Marcus Johnson', invoice: 'JB-01012', amount: 275, method: 'venmo', date: '2026-04-20', status: 'succeeded' },
  { id: 3, client: 'Kevin Park', invoice: 'JB-01010', amount: 85, method: 'card', date: '2026-04-18', status: 'succeeded' },
  { id: 4, client: 'Tanya Nguyen', invoice: 'JB-01007', amount: 75, method: 'cash', date: '2026-04-15', status: 'succeeded' },
  { id: 5, client: 'Robert Kim', invoice: 'JB-01005', amount: 400, method: 'card', date: '2026-04-12', status: 'succeeded' },
  { id: 6, client: 'Maria Rodriguez', invoice: 'JB-01003', amount: 75, method: 'card', date: '2026-04-08', status: 'succeeded' },
]

const total = PAYMENTS.reduce((s, p) => s + p.amount, 0)

export default function PaymentsPage() {
  return (
    <>
      <div className="page-header">
        <div><h1>Payments</h1><p>${total.toLocaleString()} collected this month</p></div>
      </div>

      <div className="stats-row">
        {[
          { label: 'This Month', value: `$${total.toLocaleString()}`, meta: '6 payments', color: 'green' },
          { label: 'Outstanding', value: '$3,085', meta: '4 unpaid invoices', color: 'amber' },
          { label: 'Overdue', value: '$250', meta: '1 invoice', color: 'red' },
          { label: 'Avg Days to Pay', value: '1.8', meta: 'days', color: 'blue' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-meta">{s.meta}</div>
          </div>
        ))}
      </div>

      <div className="card"><div className="card-body">
        <table className="tbl">
          <thead><tr><th>Client</th><th>Invoice</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th></tr></thead>
          <tbody>
            {PAYMENTS.map(p => (
              <tr key={p.id}>
                <td className="cell-primary">{p.client}</td>
                <td><span style={{ fontFamily: 'monospace', fontSize: 12, color: '#7A8072' }}>{p.invoice}</span></td>
                <td style={{ fontWeight: 700 }}>${p.amount}</td>
                <td style={{ textTransform: 'capitalize' }}>{p.method}</td>
                <td>{p.date}</td>
                <td><span className={`badge ${p.status}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>
    </>
  )
}
