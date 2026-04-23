'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type Review = {
  id: string; reviewer_name: string | null; reviewer_location: string | null
  platform: string; rating: number | null; review_text: string | null
  status: string; request_sent_at: string | null; review_left: boolean
  review_left_at: string | null; created_at: string
  contact: { first_name: string; last_name: string | null } | null
}

type Contact = { id: string; first_name: string; last_name: string | null; phone: string }

const PLATFORMS = ['google', 'yelp', 'thumbtack'] as const
const STARS = [5, 4, 3, 2, 1]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [editing, setEditing] = useState<Review | null>(null)
  const [saving, setSaving] = useState(false)

  const emptyForm = { reviewer_name: '', reviewer_location: '', platform: 'google', rating: '5', review_text: '', contact_id: '' }
  const [form, setForm] = useState(emptyForm)

  const [requestForm, setRequestForm] = useState({ contact_id: '', platform: 'google' })

  const fetchReviews = async () => {
    if (!db) return setLoading(false)
    const { data } = await db.from('jb_reviews')
      .select('*, contact:jb_contacts(first_name, last_name)')
      .order('created_at', { ascending: false })
    if (data) setReviews(data as unknown as Review[])
    setLoading(false)
  }

  const fetchContacts = async () => {
    if (!db) return
    const { data } = await db.from('jb_contacts').select('id, first_name, last_name, phone').eq('is_active', true).order('first_name')
    if (data) setContacts(data)
  }

  useEffect(() => { fetchReviews(); fetchContacts() }, [])

  const received = reviews.filter(r => r.status === 'received' || r.status === 'published' || r.review_left)
  const requested = reviews.filter(r => r.status === 'requested' && !r.review_left)
  const avgRating = received.length > 0
    ? (received.reduce((s, r) => s + (r.rating || 0), 0) / received.length).toFixed(1)
    : '—'

  // Get contacts who don't have a review yet
  const reviewedContactIds = new Set(reviews.map(r => r.contact?.first_name).filter(Boolean))
  const eligibleContacts = contacts.filter(c => !reviewedContactIds.has(c.first_name))

  const addReview = async () => {
    if (!db || !form.reviewer_name || !form.review_text || !form.rating) return
    setSaving(true)
    await db.from('jb_reviews').insert({
      reviewer_name: form.reviewer_name,
      reviewer_location: form.reviewer_location || null,
      platform: form.platform,
      rating: Number(form.rating),
      review_text: form.review_text,
      contact_id: form.contact_id || null,
      review_left: true,
      review_left_at: new Date().toISOString(),
      status: 'received',
    })
    setShowAdd(false)
    setForm(emptyForm)
    fetchReviews()
    setSaving(false)
  }

  const startEdit = (r: Review) => {
    setEditing(r)
    setForm({
      reviewer_name: r.reviewer_name || (r.contact ? `${r.contact.first_name} ${r.contact.last_name || ''}` : ''),
      reviewer_location: r.reviewer_location || '',
      platform: r.platform,
      rating: String(r.rating || 5),
      review_text: r.review_text || '',
      contact_id: '',
    })
  }

  const saveEdit = async () => {
    if (!db || !editing) return
    setSaving(true)
    await db.from('jb_reviews').update({
      reviewer_name: form.reviewer_name,
      reviewer_location: form.reviewer_location || null,
      platform: form.platform,
      rating: Number(form.rating),
      review_text: form.review_text,
      review_left: true,
      review_left_at: editing.review_left_at || new Date().toISOString(),
      status: 'received',
    }).eq('id', editing.id)
    setEditing(null)
    setForm(emptyForm)
    fetchReviews()
    setSaving(false)
  }

  const deleteReview = async (id: string) => {
    if (!db || !confirm('Delete this review?')) return
    await db.from('jb_reviews').delete().eq('id', id)
    fetchReviews()
  }

  const requestReview = async () => {
    if (!db || !requestForm.contact_id) return
    setSaving(true)
    const contact = contacts.find(c => c.id === requestForm.contact_id)
    await db.from('jb_reviews').insert({
      contact_id: requestForm.contact_id,
      reviewer_name: contact ? `${contact.first_name} ${contact.last_name || ''}` : null,
      platform: requestForm.platform,
      status: 'requested',
      request_sent_at: new Date().toISOString(),
      review_left: false,
    })
    setShowRequest(false)
    setRequestForm({ contact_id: '', platform: 'google' })
    fetchReviews()
    setSaving(false)
  }

  const markReceived = async (id: string) => {
    if (!db) return
    startEdit(reviews.find(r => r.id === id)!)
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading reviews...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Reviews</h1><p>Manage your online reputation</p></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="detail-btn-secondary" onClick={() => setShowRequest(true)} style={{ fontSize: 13 }}>
            Request Review
          </button>
          <button className="topbar-btn" onClick={() => { setForm(emptyForm); setEditing(null); setShowAdd(true) }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Review
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Total Reviews</span><div className="stat-icon green"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div></div>
          <div className="stat-value">{received.length}</div>
          <div className="stat-meta">across all platforms</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Avg Rating</span><div className="stat-icon amber"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div></div>
          <div className="stat-value">{avgRating}{avgRating !== '—' ? '★' : ''}</div>
          <div className="stat-meta">Google + Yelp + Thumbtack</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Requested</span><div className="stat-icon blue"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 22-7z"/></svg></div></div>
          <div className="stat-value">{requested.length}</div>
          <div className="stat-meta">awaiting review</div>
        </div>
        <div className="stat-card">
          <div className="stat-header"><span className="stat-label">Not Yet Asked</span><div className="stat-icon red"><svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg></div></div>
          <div className="stat-value">{eligibleContacts.length}</div>
          <div className="stat-meta">eligible clients</div>
        </div>
      </div>

      <div className="content-grid">
        {/* Recent Reviews */}
        <div className="content-col">
          <div className="card">
            <div className="card-header"><h3>Reviews ({received.length})</h3></div>
            <div className="card-body">
              {received.length === 0 ? (
                <div className="card-empty">No reviews yet. Add your first review or request one from a client.</div>
              ) : (
                <ul className="feed">
                  {received.map(r => (
                    <li key={r.id} className="feed-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div className="feed-text">
                            <strong>{r.reviewer_name || (r.contact ? `${r.contact.first_name} ${r.contact.last_name || ''}` : 'Anonymous')}</strong>
                            {' '}left a {r.rating}★ review on <span style={{ textTransform: 'capitalize' }}>{r.platform}</span>
                          </div>
                          {r.reviewer_location && (
                            <div style={{ fontSize: 11, color: '#A8AEA0', marginTop: 2 }}>{r.reviewer_location}</div>
                          )}
                        </div>
                        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                          <button onClick={() => startEdit(r)} style={{ background: 'none', border: 'none', color: '#6BBF1A', cursor: 'pointer', fontSize: 12, fontWeight: 650, fontFamily: 'inherit' }}>Edit</button>
                          <button onClick={() => deleteReview(r.id)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: 12, fontWeight: 650, fontFamily: 'inherit' }}>Delete</button>
                        </div>
                      </div>
                      {r.review_text && (
                        <div style={{ fontSize: 12.5, color: '#5A6050', fontStyle: 'italic', lineHeight: 1.5, background: '#FAFBF8', padding: '10px 12px', borderRadius: 7 }}>
                          &ldquo;{r.review_text}&rdquo;
                        </div>
                      )}
                      <div className="feed-time">{r.review_left_at ? new Date(r.review_left_at).toLocaleDateString() : new Date(r.created_at).toLocaleDateString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-col">
          {/* Ready to Ask */}
          <div className="card">
            <div className="card-header"><h3>Ready to Ask</h3></div>
            <div className="card-body">
              {eligibleContacts.length === 0 ? (
                <div className="card-empty">All clients have been asked.</div>
              ) : (
                <table className="tbl"><tbody>
                  {eligibleContacts.slice(0, 8).map(c => (
                    <tr key={c.id}>
                      <td className="cell-primary">{c.first_name} {c.last_name || ''}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => {
                          setRequestForm({ contact_id: c.id, platform: 'google' })
                          setShowRequest(true)
                        }}>Request Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody></table>
              )}
            </div>
          </div>

          {/* Awaiting Response */}
          <div className="card">
            <div className="card-header"><h3>Awaiting Response</h3></div>
            <div className="card-body">
              {requested.length === 0 ? (
                <div className="card-empty">No pending requests.</div>
              ) : (
                <table className="tbl"><tbody>
                  {requested.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div className="cell-primary">{r.reviewer_name || (r.contact ? `${r.contact.first_name} ${r.contact.last_name || ''}` : '—')}</div>
                        <div className="cell-secondary">Requested {r.request_sent_at ? new Date(r.request_sent_at).toLocaleDateString() : '—'}</div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="topbar-btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => markReceived(r.id)}>Mark Received</button>
                      </td>
                    </tr>
                  ))}
                </tbody></table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Review Modal */}
      {(showAdd || editing) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) { setShowAdd(false); setEditing(null) } }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>{editing ? 'Edit Review' : 'Add Review'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Reviewer Name *</label>
                  <input value={form.reviewer_name} onChange={e => setForm(p => ({ ...p, reviewer_name: e.target.value }))} placeholder="Maria Rodriguez" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Location</label>
                  <input value={form.reviewer_location} onChange={e => setForm(p => ({ ...p, reviewer_location: e.target.value }))} placeholder="Oakland, CA" style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Platform *</label>
                  <select value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', textTransform: 'capitalize' }}>
                    {PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Rating *</label>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    {STARS.map(s => (
                      <button key={s} type="button" onClick={() => setForm(p => ({ ...p, rating: String(s) }))} style={{
                        width: 36, height: 36, borderRadius: 6, border: '1px solid',
                        borderColor: Number(form.rating) >= s ? '#F59E0B' : '#E5E8E0',
                        background: Number(form.rating) >= s ? '#FEF3C7' : '#fff',
                        fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>★</button>
                    )).reverse()}
                  </div>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Review Text *</label>
                <textarea value={form.review_text} onChange={e => setForm(p => ({ ...p, review_text: e.target.value }))} placeholder="Amazing work! Transformed our backyard completely..." style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box', minHeight: 80 }} />
              </div>
              {!editing && (
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Link to Client (optional)</label>
                  <select value={form.contact_id} onChange={e => setForm(p => ({ ...p, contact_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                    <option value="">None — external review</option>
                    {contacts.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name || ''}</option>)}
                  </select>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => { setShowAdd(false); setEditing(null); setForm(emptyForm) }}>Cancel</button>
              <button className="detail-btn-primary" onClick={editing ? saveEdit : addReview} disabled={saving}>{saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Review'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Request Review Modal */}
      {showRequest && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setShowRequest(false) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Request Review</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Client *</label>
                <select value={requestForm.contact_id} onChange={e => setRequestForm(p => ({ ...p, contact_id: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                  <option value="">Select client...</option>
                  {contacts.map(c => <option key={c.id} value={c.id}>{c.first_name} {c.last_name || ''}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#A8AEA0', marginBottom: 4, textTransform: 'uppercase' }}>Platform</label>
                <select value={requestForm.platform} onChange={e => setRequestForm(p => ({ ...p, platform: e.target.value }))} style={{ width: '100%', padding: '9px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }}>
                  {PLATFORMS.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setShowRequest(false)}>Cancel</button>
              <button className="detail-btn-primary" onClick={requestReview} disabled={saving}>{saving ? 'Sending...' : 'Send Request'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}