'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '../../../../lib/admin-db'

type CalJob = {
  id: string; time: string; client: string; service: string; status: string
}

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const STATUS_COLOR: Record<string, string> = { completed: '#16A34A', in_progress: '#D97706', scheduled: '#3B82F6', en_route: '#D97706', cancelled: '#9CA3AF' }

export default function SchedulePage() {
  const [weekJobs, setWeekJobs] = useState<Record<string, CalJob[]>>({})
  const [loading, setLoading] = useState(true)
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const now = new Date()
    const day = now.getDay()
    const monday = new Date(now)
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
    monday.setHours(0, 0, 0, 0)
    return monday
  })

  const getWeekDates = () => {
    return DAY_LABELS.map((_, i) => {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      return d
    })
  }

  const weekDates = getWeekDates()
  const weekEndDate = weekDates[6]

  const fetchWeek = async () => {
    if (!db) return setLoading(false)
    setLoading(true)

    const startStr = weekStart.toISOString().split('T')[0]
    const endStr = weekEndDate.toISOString().split('T')[0]

    const { data } = await db.from('jb_jobs')
      .select('id, scheduled_date, time_window, status, contact:jb_contacts(first_name, last_name), service:jb_services(name)')
      .gte('scheduled_date', startStr)
      .lte('scheduled_date', endStr)
      .order('time_window')

    const grouped: Record<string, CalJob[]> = {}
    ;(data || []).forEach((j: Record<string, unknown>) => {
      const date = j.scheduled_date as string
      const c = j.contact as { first_name: string; last_name: string | null } | null
      const s = j.service as { name: string } | null
      if (!grouped[date]) grouped[date] = []
      grouped[date].push({
        id: j.id as string,
        time: ((j.time_window as string) || '').replace(/:00\s*/g, ':00 ').replace(/\s(AM|PM)/i, ' $1'),
        client: c ? `${c.first_name} ${c.last_name || ''}` : '—',
        service: s?.name || '—',
        status: j.status as string,
      })
    })
    setWeekJobs(grouped)
    setLoading(false)
  }

  useEffect(() => { fetchWeek() }, [weekStart])

  const changeWeek = (dir: number) => {
    setWeekStart(prev => {
      const next = new Date(prev)
      next.setDate(prev.getDate() + dir * 7)
      return next
    })
  }

  const today = new Date().toISOString().split('T')[0]

  const formatWeekRange = () => {
    const s = weekDates[0]
    const e = weekDates[6]
    return `${s.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – ${e.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#A8AEA0' }}>Loading schedule...</div>

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Schedule</h1>
          <p>Week of {formatWeekRange()}</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="pill" onClick={() => changeWeek(-1)}>← Prev</button>
          <button className="pill active" onClick={() => {
            const now = new Date()
            const day = now.getDay()
            const monday = new Date(now)
            monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1))
            monday.setHours(0, 0, 0, 0)
            setWeekStart(monday)
          }}>Today</button>
          <button className="pill" onClick={() => changeWeek(1)}>Next →</button>
          <Link href="/admin/jobs" className="topbar-btn" style={{ marginLeft: 8, textDecoration: 'none' }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Job
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#E5E8E0', borderRadius: 12, overflow: 'hidden' }}>
        {weekDates.map((date, i) => {
          const dateStr = date.toISOString().split('T')[0]
          const isToday = dateStr === today
          const jobs = weekJobs[dateStr] || []

          return (
            <div key={i} style={{ background: '#fff', minHeight: 400 }}>
              <div style={{
                padding: '12px 14px', borderBottom: '1px solid #F0F2EC', textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                  color: isToday ? '#6BBF1A' : '#7A8072',
                }}>{DAY_LABELS[i]}</div>
                <div style={{ fontSize: 12, color: isToday ? '#6BBF1A' : '#A8AEA0', fontWeight: isToday ? 700 : 500 }}>
                  {date.getDate()}
                </div>
              </div>
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {jobs.map(job => (
                  <div key={job.id} style={{
                    padding: '8px 10px', borderRadius: 6, fontSize: 11,
                    borderLeft: `3px solid ${STATUS_COLOR[job.status] || '#9CA3AF'}`,
                    background: '#FAFBF8',
                  }}>
                    <div style={{ fontWeight: 700, color: '#1A1D16', marginBottom: 2 }}>{job.time}</div>
                    <div style={{ color: '#3A3F35' }}>{job.client}</div>
                    <div style={{ color: '#A8AEA0', fontSize: 10 }}>{job.service}</div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <div style={{ padding: 16, textAlign: 'center', color: '#A8AEA0', fontSize: 11 }}>No jobs</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}