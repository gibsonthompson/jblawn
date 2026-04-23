'use client'

export default function ReportsPage() {
  return (
    <>
      <div className="page-header"><div><h1>Reports</h1><p>Business performance at a glance</p></div></div>

      <div className="stats-row">
        {[
          { label: 'Revenue (April)', value: '$4,850', meta: '↑ 12% vs March', color: 'green' },
          { label: 'Jobs Completed', value: '38', meta: '↑ 8 from last month', color: 'blue' },
          { label: 'New Clients', value: '7', meta: '4 from website, 2 Thumbtack, 1 referral', color: 'amber' },
          { label: 'Avg Job Value', value: '$128', meta: '↑ from $112', color: 'green' },
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
            <div className="card-header"><h3>Revenue by Service</h3><span style={{ fontSize: 12, color: '#A8AEA0' }}>April 2026</span></div>
            <div className="card-body padded">
              {[
                { name: 'Lawn Mowing', amount: 1875, pct: 39, color: '#6BBF1A' },
                { name: 'Junk Hauling', amount: 1500, pct: 31, color: '#3D8C0E' },
                { name: 'Yard Cleanup', amount: 725, pct: 15, color: '#F59E0B' },
                { name: 'Landscaping', amount: 450, pct: 9, color: '#3B82F6' },
                { name: 'Trailer Rental', amount: 300, pct: 6, color: '#8B5CF6' },
              ].map(s => (
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
              {[
                { month: 'Jan', amount: 2100 }, { month: 'Feb', amount: 2800 },
                { month: 'Mar', amount: 4300 }, { month: 'Apr', amount: 4850 },
              ].map(m => (
                <div key={m.month} className="rev-row">
                  <div className="rev-header"><span className="rev-name">{m.month} 2026</span><span className="rev-amount">${m.amount.toLocaleString()}</span></div>
                  <div className="rev-track"><div className="rev-fill" style={{ width: `${(m.amount / 5000) * 100}%`, background: '#6BBF1A' }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-col">
          <div className="card">
            <div className="card-header"><h3>Lead Sources</h3></div>
            <div className="card-body padded">
              {[
                { source: 'Website', count: 12, pct: 40 },
                { source: 'Thumbtack', count: 8, pct: 27 },
                { source: 'Google', count: 5, pct: 17 },
                { source: 'Referral', count: 3, pct: 10 },
                { source: 'Yelp', count: 2, pct: 6 },
              ].map(s => (
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
                ['Quote Win Rate', '78%'],
                ['Avg Days to Payment', '1.8 days'],
                ['Recurring Clients', '12 (43%)'],
                ['Review Conversion', '60%'],
                ['Customer Retention', '85%'],
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
