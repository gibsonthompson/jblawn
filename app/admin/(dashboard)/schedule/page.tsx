'use client'

import { useState } from 'react'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const WEEK_JOBS = [
  { day: 'Mon', jobs: [{ time: '8:00', client: 'Maria Rodriguez', service: 'Lawn Mowing', status: 'completed' }, { time: '10:30', client: 'Kevin Park', service: 'Lawn Mowing', status: 'completed' }] },
  { day: 'Tue', jobs: [{ time: '9:00', client: 'Tanya Nguyen', service: 'Lawn Mowing', status: 'completed' }, { time: '1:00', client: 'Marcus Johnson', service: 'Junk Hauling', status: 'completed' }] },
  { day: 'Wed', jobs: [{ time: '8:00', client: 'Maria Rodriguez', service: 'Lawn Mowing', status: 'completed' }, { time: '10:30', client: 'David Lee', service: 'Junk Hauling', status: 'in_progress' }, { time: '1:00', client: 'Tanya Nguyen', service: 'Bush Trimming', status: 'scheduled' }, { time: '3:30', client: 'Angela Torres', service: 'Landscaping', status: 'scheduled' }] },
  { day: 'Thu', jobs: [{ time: '9:00', client: 'Robert Kim', service: 'Trailer Rental', status: 'scheduled' }, { time: '11:00', client: 'Kevin Park', service: 'Lawn Mowing', status: 'scheduled' }] },
  { day: 'Fri', jobs: [{ time: '8:00', client: 'Maria Rodriguez', service: 'Lawn Mowing', status: 'scheduled' }, { time: '10:00', client: 'Tanya Nguyen', service: 'Lawn Mowing', status: 'scheduled' }, { time: '1:00', client: 'Sarah Mitchell', service: 'Landscaping', status: 'scheduled' }] },
  { day: 'Sat', jobs: [] },
  { day: 'Sun', jobs: [] },
]

const STATUS_COLOR: Record<string, string> = { completed: '#16A34A', in_progress: '#D97706', scheduled: '#3B82F6' }

export default function SchedulePage() {
  const [view, setView] = useState<'week' | 'day'>('week')

  return (
    <>
      <div className="page-header">
        <div><h1>Schedule</h1><p>Week of April 21 – 27, 2026</p></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`pill${view === 'week' ? ' active' : ''}`} onClick={() => setView('week')}>Week</button>
          <button className={`pill${view === 'day' ? ' active' : ''}`} onClick={() => setView('day')}>Day</button>
          <button className="topbar-btn" style={{ marginLeft: 8 }}>
            <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Job
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: '#E5E8E0', borderRadius: 12, overflow: 'hidden' }}>
        {WEEK_JOBS.map(day => (
          <div key={day.day} style={{ background: '#fff', minHeight: 400 }}>
            <div style={{ padding: '12px 14px', borderBottom: '1px solid #F0F2EC', textAlign: 'center' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: day.day === 'Wed' ? '#6BBF1A' : '#7A8072' }}>{day.day}</div>
            </div>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {day.jobs.map((job, i) => (
                <div key={i} style={{
                  padding: '8px 10px', borderRadius: 6, fontSize: 11,
                  borderLeft: `3px solid ${STATUS_COLOR[job.status] || '#9CA3AF'}`,
                  background: '#FAFBF8',
                }}>
                  <div style={{ fontWeight: 700, color: '#1A1D16', marginBottom: 2 }}>{job.time}</div>
                  <div style={{ color: '#3A3F35' }}>{job.client}</div>
                  <div style={{ color: '#A8AEA0', fontSize: 10 }}>{job.service}</div>
                </div>
              ))}
              {day.jobs.length === 0 && <div style={{ padding: 16, textAlign: 'center', color: '#A8AEA0', fontSize: 11 }}>No jobs</div>}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
