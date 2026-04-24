'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '../../../../lib/admin-db'

type CalJob = { id: string; time: string; client: string; service: string; status: string; address: string; crew: string; description: string; date: string }

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const STATUS_COLOR: Record<string, string> = { completed: '#16A34A', in_progress: '#D97706', scheduled: '#3B82F6', en_route: '#D97706', cancelled: '#9CA3AF' }

export default function SchedulePage() {
  const [weekJobs, setWeekJobs] = useState<Record<string, CalJob[]>>({})
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<CalJob | null>(null)
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const now = new Date()
    const day = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
    monday.setHours(0, 0, 0, 0)
    return monday
  })

  const getWeekDates = () => DAY_LABELS.map((_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })

  const weekDates = getWeekDates()

  const fetchWeek = async () => {
    if (!db) return setLoading(false)
    setLoading(true)

    const startStr = weekDates[0].toISOString().split('T')[0]
    const endStr = weekDates[6].toISOString().split('T')[0]

    // Step 1: Fetch jobs for this week (no joins)
    const { data: jobsRaw, error: jobsError } = await db!.from('jb_jobs')
      .select('id, contact_id, service_id, scheduled_date, time_window, status, crew_assignment, description')
      .gte('scheduled_date', startStr)
      .lte('scheduled_date', endStr)
      .order('time_window')

    if (jobsError) {
      console.error('[SCHEDULE] Jobs fetch error:', jobsError)
      setLoading(false)
      return
    }

    const jobs = jobsRaw || []
    console.log('[SCHEDULE]', { startStr, endStr, jobCount: jobs.length })

    if (jobs.length === 0) {
      setWeekJobs({})
      setLoading(false)
      return
    }

    // Step 2: Get unique contact and service IDs
    const contactIds = [...new Set(jobs.map(j => j.contact_id).filter(Boolean))]
    const serviceIds = [...new Set(jobs.map(j => j.service_id).filter(Boolean))]

    // Step 3: Batch fetch contacts and services separately
    const contactMap: Record<string, { first_name: string; last_name: string | null; address: string | null }> = {}
    const serviceMap: Record<string, { name: string }> = {}

    if (contactIds.length > 0) {
      const { data: contacts } = await db!.from('jb_contacts').select('id, first_name, last_name, address').in('id', contactIds)
      ;(contacts || []).forEach((c: Record<string, unknown>) => {
        contactMap[c.id as string] = { first_name: c.first_name as string, last_name: c.last_name as string | null, address: c.address as string | null }
      })
    }

    if (serviceIds.length > 0) {
      const { data: services } = await db!.from('jb_services').select('id, name').in('id', serviceIds)
      ;(services || []).forEach((s: Record<string, unknown>) => {
        serviceMap[s.id as string] = { name: s.name as string }
      })
    }

    // Step 4: Build calendar data
    const grouped: Record<string, CalJob[]> = {}
    jobs.forEach((j) => {
      const date = j.scheduled_date as string
      const contact = contactMap[j.contact_id] || null
      const service = serviceMap[j.service_id] || null

      if (!grouped[date]) grouped[date] = []
      grouped[date].push({
        id: j.id,
        time: j.time_window || '—',
        client: contact ? `${contact.first_name} ${contact.last_name || ''}`.trim() : '—',
        service: service?.name || j.description || '—',
        status: j.status,
        address: contact?.address || '—',
        crew: j.crew_assignment || '—',
        description: j.description || '',
        date,
      })
    })

    setWeekJobs(grouped)
    setLoading(false)
  }

  useEffect(() => { fetchWeek() }, [weekStart])

  const changeWeek = (dir: number) => setWeekStart(prev => {
    const n = new Date(prev)
    n.setDate(prev.getDate() + dir * 7)
    return n
  })

  const goToday = () => {
    const now = new Date()
    const day = now.getDay()
    const m = new Date(now)
    m.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
    m.setHours(0, 0, 0, 0)
    setWeekStart(m)
  }

  const updateStatus = async (id: string, status: string) => {
    if (!db) return
    const updates: Record<string, unknown> = { status }
    if (status === 'completed') updates.completed_at = new Date().toISOString()
    await db!.from('jb_jobs').update(updates).eq('id', id)
    fetchWeek()
    if (selectedJob?.id === id) setSelectedJob(prev => prev ? { ...prev, status } : null)
  }

  const deleteJob = async (id: string) => {
    if (!db || !confirm('Delete this job?')) return
    await db!.from('jb_jobs').delete().eq('id', id)
    setSelectedJob(null)
    fetchWeek()
  }

  const today = new Date().toISOString().split('T')[0]
  const formatWeekRange = () => `${weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${weekDates[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading schedule...</div>

  return (
    <>
      <div className="page-header">
        <div><h1>Schedule</h1><p>Week of {formatWeekRange()}</p></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="pill" onClick={() => changeWeek(-1)}>← Prev</button>
          <button className="pill active" onClick={goToday}>Today</button>
          <button className="pill" onClick={() => changeWeek(1)}>Next →</button>
          <Link href="/admin/jobs" className="topbar-btn" style={{ marginLeft: 8, textDecoration: 'none' }}>+ Add Job</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#E5E8E0', borderRadius: 12, overflow: 'hidden' }}>
        {weekDates.map((date, i) => {
          const dateStr = date.toISOString().split('T')[0]
          const isToday = dateStr === today
          const jobs = weekJobs[dateStr] || []
          return (
            <div key={i} style={{ background: '#fff', minHeight: 400 }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid #F0F2EC', textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: isToday ? '#6BBF1A' : '#7A8072' }}>{DAY_LABELS[i]}</div>
                <div style={{ fontSize: 12, color: isToday ? '#6BBF1A' : '#A8AEA0', fontWeight: isToday ? 700 : 500 }}>{date.getDate()}</div>
              </div>
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {jobs.map(job => (
                  <div key={job.id} onClick={() => setSelectedJob(job)} style={{
                    padding: '8px 10px', borderRadius: 6, fontSize: 11, cursor: 'pointer',
                    borderLeft: `3px solid ${STATUS_COLOR[job.status] || '#9CA3AF'}`,
                    background: selectedJob?.id === job.id ? '#F0F7E8' : '#FAFBF8',
                  }}>
                    <div style={{ fontWeight: 700, color: '#1A1D16', marginBottom: 2 }}>{job.time}</div>
                    <div style={{ color: '#3A3F35' }}>{job.client}</div>
                    <div style={{ color: '#A8AEA0', fontSize: 10 }}>{job.service}</div>
                  </div>
                ))}
                {jobs.length === 0 && <div style={{ padding: 16, textAlign: 'center', color: '#A8AEA0', fontSize: 11 }}>No jobs</div>}
              </div>
            </div>
          )
        })}
      </div>

      {selectedJob && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setSelectedJob(null) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 420, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 750 }}>{selectedJob.client}</h3>
              <button onClick={() => setSelectedJob(null)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#A8AEA0' }}>✕</button>
            </div>
            <div style={{ marginBottom: 16 }}><span className={`badge ${selectedJob.status}`}>{selectedJob.status.replace('_', ' ')}</span></div>
            {[['Service', selectedJob.service], ['Date', selectedJob.date], ['Time', selectedJob.time], ['Address', selectedJob.address], ['Crew', selectedJob.crew]].map(([l, v]) => (
              <div key={l} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A8AEA0', marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: 13.5, color: '#1A1D16', fontWeight: 500 }}>{v}</div>
              </div>
            ))}
            {selectedJob.description && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A8AEA0', marginBottom: 3 }}>Notes</div>
                <div style={{ fontSize: 13, color: '#3A3F35', background: '#FAFBF8', padding: '10px 12px', borderRadius: 7, border: '1px solid #F0F2EC' }}>{selectedJob.description}</div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 20, paddingTop: 16, borderTop: '1px solid #F0F2EC' }}>
              {selectedJob.status === 'scheduled' && <button className="detail-btn-primary" onClick={() => updateStatus(selectedJob.id, 'in_progress')}>Start Job</button>}
              {selectedJob.status === 'in_progress' && <button className="detail-btn-primary" onClick={() => updateStatus(selectedJob.id, 'completed')}>Mark Complete</button>}
              {selectedJob.status === 'completed' && <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 7, padding: '10px', fontSize: 13, color: '#16A34A', fontWeight: 600, textAlign: 'center' }}>✓ Completed</div>}
              <button className="detail-btn-secondary" onClick={() => deleteJob(selectedJob.id)} style={{ color: '#DC2626', borderColor: '#FECACA' }}>Delete Job</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}