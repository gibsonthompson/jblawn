'use client'

const REVIEWS = [
  { id: 1, client: 'Maria Rodriguez', platform: 'google', rating: 5, requested: '2026-04-20', left: true, text: 'Amazing work! Transformed our backyard completely.' },
  { id: 2, client: 'David Lee', platform: 'google', rating: 5, requested: '2026-04-18', left: true, text: 'Fast junk removal, fair price. Will use again.' },
  { id: 3, client: 'Tanya Nguyen', platform: 'yelp', rating: 5, requested: '2026-04-15', left: true, text: 'Best lawn service in Berkeley. Always on time.' },
  { id: 4, client: 'Kevin Park', platform: 'google', rating: null, requested: '2026-04-19', left: false, text: null },
  { id: 5, client: 'Robert Kim', platform: 'google', rating: null, requested: null, left: false, text: null },
  { id: 6, client: 'Angela Torres', platform: null, rating: null, requested: null, left: false, text: null },
]

const PENDING_REQUEST = REVIEWS.filter(r => !r.requested && r.left === false)
const REQUESTED = REVIEWS.filter(r => r.requested && !r.left)
const RECEIVED = REVIEWS.filter(r => r.left)

export default function ReviewsPage() {
  return (
    <>
      <div className="page-header"><div><h1>Reviews</h1><p>Manage your online reputation</p></div></div>

      <div className="stats-row">
        {[
          { label: 'Total Reviews', value: String(RECEIVED.length), meta: 'across all platforms', color: 'green' },
          { label: 'Avg Rating', value: '5.0★', meta: 'Google + Yelp', color: 'amber' },
          { label: 'Requested', value: String(REQUESTED.length), meta: 'awaiting review', color: 'blue' },
          { label: 'Not Yet Asked', value: String(PENDING_REQUEST.length), meta: 'eligible clients', color: 'red' },
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
            <div className="card-header"><h3>Recent Reviews</h3></div>
            <div className="card-body">
              <ul className="feed">
                {RECEIVED.map(r => (
                  <li key={r.id} className="feed-item">
                    <div className="feed-dot green" />
                    <div>
                      <div className="feed-text"><strong>{r.client}</strong> left a {r.rating}★ review on {r.platform}</div>
                      {r.text && <div style={{ fontSize: 12, color: '#7A8072', fontStyle: 'italic', marginTop: 4 }}>&ldquo;{r.text}&rdquo;</div>}
                      <div className="feed-time">{r.requested}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="content-col">
          <div className="card">
            <div className="card-header"><h3>Ready to Ask</h3></div>
            <div className="card-body">
              <table className="tbl">
                <tbody>
                  {REVIEWS.filter(r => !r.requested).map(r => (
                    <tr key={r.id}>
                      <td className="cell-primary">{r.client}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }}>Request Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card">
            <div className="card-header"><h3>Awaiting Response</h3></div>
            <div className="card-body">
              <table className="tbl">
                <tbody>
                  {REQUESTED.map(r => (
                    <tr key={r.id}>
                      <td><div className="cell-primary">{r.client}</div><div className="cell-secondary">Requested {r.requested}</div></td>
                      <td style={{ textAlign: 'right' }}><span className="badge sent">pending</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
