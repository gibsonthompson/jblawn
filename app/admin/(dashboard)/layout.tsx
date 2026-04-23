'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { db } from '../../../lib/admin-db'
import './admin.css'

const I = {
  home: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  calendar: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  users: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4-4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  inbox: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
  fileText: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  briefcase: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
  creditCard: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  dollarSign: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  messageSquare: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  star: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  barChart: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  settings: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  externalLink: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [newLeadCount, setNewLeadCount] = useState(0)

  const isActive = (href: string) => href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

  const fetchCount = async () => {
    if (!db) return
    const { data } = await db!.from('jb_leads').select('id', { count: 'exact' }).eq('status', 'new')
    setNewLeadCount(data?.length || 0)
  }

  // Fetch on mount + subscribe to realtime
  useEffect(() => {
    if (!db) return
    fetchCount()
    const channel = db!
      .channel('admin_lead_badge')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jb_leads' }, () => { fetchCount() })
      .subscribe()
    return () => { db!.removeChannel(channel) }
  }, [])

  // Refetch badge when navigating between pages (catches status updates)
  useEffect(() => { fetchCount() }, [pathname])

  // Close create menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.create-menu-wrap')) setCreateOpen(false)
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const NAV = [
    { section: null, items: [
      { label: 'Home', href: '/admin', icon: I.home },
    ]},
    { section: 'Work', items: [
      { label: 'Schedule', href: '/admin/schedule', icon: I.calendar },
      { label: 'Requests', href: '/admin/leads', icon: I.inbox, badge: newLeadCount },
      { label: 'Quotes', href: '/admin/quotes', icon: I.fileText },
      { label: 'Jobs', href: '/admin/jobs', icon: I.briefcase },
    ]},
    { section: 'Billing', items: [
      { label: 'Invoices', href: '/admin/invoices', icon: I.creditCard },
      { label: 'Payments', href: '/admin/payments', icon: I.dollarSign },
    ]},
    { section: 'Clients', items: [
      { label: 'Clients', href: '/admin/contacts', icon: I.users },
      { label: 'Messages', href: '/admin/messages', icon: I.messageSquare },
      { label: 'Reviews', href: '/admin/reviews', icon: I.star },
    ]},
    { section: 'Insights', items: [
      { label: 'Reports', href: '/admin/reports', icon: I.barChart },
      { label: 'Settings', href: '/admin/settings', icon: I.settings },
    ]},
  ]

  return (
    <div className="admin-layout">
      {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}
      <aside className={`admin-sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-brand"><img src="/images/jb-logo.jpg" alt="JB Lawn Care" /></div>
        <nav className="sidebar-nav">
          {NAV.map((group, gi) => (
            <div key={gi}>
              {group.section && <div className="sidebar-section-label">{group.section}</div>}
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} className={`sidebar-item${isActive(item.href) ? ' active' : ''}`} onClick={() => setOpen(false)}>
                  {item.icon}
                  {item.label}
                  {'badge' in item && item.badge && item.badge > 0 ? <span className="sidebar-badge">{item.badge}</span> : null}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer"><a href="/" target="_blank">{I.externalLink} View website</a></div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <button className="sidebar-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
          <div className="topbar-right">
            <div className="create-menu-wrap" style={{ position: 'relative' }}>
              <button className="topbar-btn" onClick={() => setCreateOpen(!createOpen)}>
                <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Create
              </button>
              {createOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, background: '#fff', borderRadius: 10, border: '1px solid #E5E8E0', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', minWidth: 200, padding: '6px 0', zIndex: 100 }}>
                  {[{ label: 'Add Client', href: '/admin/contacts' }, { label: 'Create Job', href: '/admin/jobs' }, { label: 'Create Quote', href: '/admin/quotes' }, { label: 'Create Invoice', href: '/admin/invoices' }].map(item => (
                    <Link key={item.label} href={item.href} onClick={() => setCreateOpen(false)} style={{ display: 'block', padding: '10px 18px', fontSize: 13, fontWeight: 600, color: '#3A3F35', textDecoration: 'none' }}
                      onMouseEnter={e => (e.target as HTMLElement).style.background = '#F5F6F2'}
                      onMouseLeave={e => (e.target as HTMLElement).style.background = 'transparent'}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="topbar-icon-btn" title="Notifications">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              {newLeadCount > 0 && <span className="topbar-dot" />}
            </div>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  )
}