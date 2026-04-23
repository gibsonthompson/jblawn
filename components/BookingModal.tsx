'use client'

import { useState, useCallback } from 'react'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS_LABELS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const TIME_SLOTS = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM']

export default function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const now = new Date()
  const [calMonth, setCalMonth] = useState(now.getMonth())
  const [calYear, setCalYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('')
  const [customService, setCustomService] = useState('')
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')

  const isOther = service === 'Other / Multiple Services'
  const effectiveService = isOther ? (customService || 'Other / Multiple Services') : service

  // Prevent navigating to past months
  const canGoPrev = calYear > now.getFullYear() || (calYear === now.getFullYear() && calMonth > now.getMonth())

  const changeMonth = (dir: number) => {
    if (dir === -1 && !canGoPrev) return
    let m = calMonth + dir
    let y = calYear
    if (m > 11) { m = 0; y++ }
    if (m < 0) { m = 11; y-- }
    setCalMonth(m)
    setCalYear(y)
  }

  const renderCalendar = useCallback(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay()
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
    // Use UTC-safe comparison: compare year/month/day numbers, not Date objects
    const todayYear = now.getFullYear()
    const todayMonth = now.getMonth()
    const todayDate = now.getDate()
    const cells: React.ReactNode[] = []

    DAYS_LABELS.forEach((d) => {
      cells.push(<div key={`label-${d}`} className="calendar-day-label">{d}</div>)
    })
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="calendar-day disabled" />)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(calYear, calMonth, d)
      // Compare using numbers to avoid timezone issues
      const isPast = calYear < todayYear ||
        (calYear === todayYear && calMonth < todayMonth) ||
        (calYear === todayYear && calMonth === todayMonth && d < todayDate)
      const isSunday = date.getDay() === 0
      const isToday = calYear === todayYear && calMonth === todayMonth && d === todayDate
      const isSelected = selectedDate
        ? selectedDate.getFullYear() === calYear && selectedDate.getMonth() === calMonth && selectedDate.getDate() === d
        : false
      let cls = 'calendar-day'
      if (isPast || isSunday) cls += ' disabled'
      if (isToday) cls += ' today'
      if (isSelected) cls += ' selected'
      cells.push(
        <button key={`day-${d}`} className={cls} onClick={() => !isPast && !isSunday && setSelectedDate(new Date(calYear, calMonth, d))} type="button">{d}</button>
      )
    }
    return cells
  }, [calYear, calMonth, selectedDate, now])

  const resetForm = () => {
    setFname(''); setLname(''); setPhone(''); setEmail('')
    setService(''); setCustomService(''); setAddress(''); setDetails('')
    setSelectedDate(null); setSelectedTime(null)
    setSubmitted(false)
  }

  const handleClose = () => {
    onClose()
    if (submitted) resetForm()
  }

  const handleSubmit = async () => {
    if (!fname || !phone || !effectiveService || !address || !selectedDate || !selectedTime) {
      alert('Please fill out all required fields, select a date and time.')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname || null,
          phone,
          email: email || null,
          service_requested: effectiveService,
          address,
          preferred_date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
          preferred_time: selectedTime,
          details: details || null,
        }),
      })

      if (!res.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      console.error('Booking submission error:', err)
      setSubmitted(true) // Still show success to customer
    } finally {
      setSubmitting(false)
    }
  }

  if (!open) return null

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>{submitted ? 'Request Submitted!' : 'Book Your Free Estimate'}</h2>
            {!submitted && <p>Pick a date and time — we&apos;ll confirm within the hour.</p>}
          </div>
          <button className="modal-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ width: 64, height: 64, background: 'var(--green-bright)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>Thanks, {fname}!</h3>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.6, marginBottom: 24 }}>
                Your request for <strong>{effectiveService}</strong> has been received.<br />
                We&apos;ll call you at <strong>{phone}</strong> to confirm — usually within the hour.
              </p>
              <button className="form-submit" onClick={handleClose} style={{ maxWidth: 240, margin: '0 auto' }}>Done</button>
            </div>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input type="text" placeholder="John" value={fname} onChange={(e) => setFname(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Smith" value={lname} onChange={(e) => setLname(e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone *</label>
                  <input type="tel" placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Service Needed *</label>
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="">Select a service...</option>
                  <option>Lawn Mowing &amp; Maintenance</option>
                  <option>Landscaping &amp; Sod Installation</option>
                  <option>Junk Removal &amp; Hauling</option>
                  <option>Yard Cleanup &amp; Debris</option>
                  <option>Bush &amp; Hedge Trimming</option>
                  <option>Mulching &amp; Bed Care</option>
                  <option>Dump Trailer Rental</option>
                  <option>Other / Multiple Services</option>
                </select>
              </div>
              {isOther && (
                <div className="form-group">
                  <label>Please describe what you need *</label>
                  <input type="text" placeholder="e.g. Lawn mowing + junk removal, fence removal, etc." value={customService} onChange={(e) => setCustomService(e.target.value)} />
                </div>
              )}
              <div className="form-group">
                <label>Property Address *</label>
                <input type="text" placeholder="123 Main St, Oakland, CA" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="calendar-picker">
                <label style={{ display: 'block', fontWeight: 700, fontSize: '0.88rem', marginBottom: 12, color: 'var(--gray-dark)' }}>Preferred Date *</label>
                <div className="calendar-header">
                  <button className="calendar-nav" onClick={() => changeMonth(-1)} type="button" style={{ opacity: canGoPrev ? 1 : 0.3, cursor: canGoPrev ? 'pointer' : 'default' }}>‹</button>
                  <h4>{MONTHS[calMonth]} {calYear}</h4>
                  <button className="calendar-nav" onClick={() => changeMonth(1)} type="button">›</button>
                </div>
                <div className="calendar-grid-days">{renderCalendar()}</div>
              </div>
              <div className="form-group">
                <label>Preferred Time *</label>
                <div className="time-slots">
                  {TIME_SLOTS.map((t) => (
                    <button key={t} type="button" className={`time-slot${selectedTime === t ? ' selected' : ''}`} onClick={() => setSelectedTime(t)}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Additional Details</label>
                <textarea placeholder="Tell us about the job — lot size, what needs to be hauled, any access issues, etc." value={details} onChange={(e) => setDetails(e.target.value)} />
              </div>
              <button className="form-submit" onClick={handleSubmit} type="button" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Request →'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gray-mid)', marginTop: 12 }}>We typically respond within 1 hour during business hours.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}