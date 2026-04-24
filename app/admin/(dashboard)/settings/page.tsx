'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type ServiceRow = { id: string; name: string; default_price: number; price_type: string; is_active: boolean }

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business')
  const [services, setServices] = useState<ServiceRow[]>([])
  const [loadingServices, setLoadingServices] = useState(true)

  useEffect(() => {
    if (!db) return setLoadingServices(false)
    fetchServices()
  }, [])

  const fetchServices = async () => {
    if (!db) return
    const { data } = await db!.from('jb_services').select('id, name, default_price, price_type, is_active').order('sort_order')
    if (data) setServices(data as unknown as ServiceRow[])
    setLoadingServices(false)
  }

  const toggleService = async (id: string, currentlyActive: boolean) => {
    if (!db) return
    await db!.from('jb_services').update({ is_active: !currentlyActive }).eq('id', id)
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !currentlyActive } : s))
  }

  return (
    <>
      <div className="page-header"><div><h1>Settings</h1><p>Manage your business configuration</p></div></div>

      <div className="filter-pills" style={{ marginBottom: 24 }}>
        {['business', 'services', 'sms-templates', 'integrations'].map(tab => (
          <button key={tab} className={`pill${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'sms-templates' ? 'SMS Templates' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'business' && (
        <div className="card"><div className="card-body padded">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Business Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600 }}>
            {[
              ['Business Name', 'JB Lawn Care & Hauling'],
              ['Phone', '341-260-0331'],
              ['Email', 'jblawncareandhauling@gmail.com'],
              ['Service Area', 'Bay Area — Oakland to Fremont'],
            ].map(([label, value]) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#A8AEA0', marginBottom: 6 }}>{label}</label>
                <input defaultValue={value} style={{ width: '100%', padding: '10px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <button className="topbar-btn" style={{ marginTop: 20 }}>Save Changes</button>
        </div></div>
      )}

      {activeTab === 'services' && (
        <div className="card"><div className="card-body">
          {loadingServices ? (
            <div className="card-empty">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="card-empty">No services found in database.</div>
          ) : (
            <table className="tbl">
              <thead><tr><th>Service</th><th>Default Price</th><th>Type</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {services.map(s => (
                  <tr key={s.id}>
                    <td className="cell-primary">{s.name}</td>
                    <td>{s.price_type === 'custom' ? 'Custom' : `$${Number(s.default_price).toLocaleString()}`}</td>
                    <td style={{ textTransform: 'capitalize', color: '#7A8072' }}>{s.price_type}</td>
                    <td><span className={`badge ${s.is_active ? 'completed' : 'draft'}`}>{s.is_active ? 'active' : 'inactive'}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        style={{ background: 'none', border: 'none', color: s.is_active ? '#DC2626' : '#6BBF1A', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit' }}
                        onClick={() => toggleService(s.id, s.is_active)}
                      >{s.is_active ? 'Deactivate' : 'Activate'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div></div>
      )}

      {activeTab === 'sms-templates' && (
        <div className="card"><div className="card-body">
          <table className="tbl">
            <thead><tr><th>Template</th><th>Trigger</th><th>Preview</th></tr></thead>
            <tbody>
              {[
                { name: 'Booking Confirmation', trigger: 'Form submit', preview: 'Thanks [name]! We got your request for [service]...' },
                { name: 'Appointment Reminder', trigger: 'Day before', preview: 'Reminder: JB Lawn Care is scheduled for [service] tomorrow...' },
                { name: 'En Route', trigger: 'Status change', preview: 'JB Lawn Care is on the way! We\'ll be there shortly.' },
                { name: 'Job Complete', trigger: 'Job completed', preview: 'Your [service] is complete! We\'ll send your invoice shortly.' },
                { name: 'Invoice Sent', trigger: 'Invoice created', preview: 'Hi [name], your invoice for $[amount] is ready. Pay here: [link]' },
                { name: 'Payment Received', trigger: 'Stripe webhook', preview: 'Payment of $[amount] received. Thank you! — JB Lawn Care' },
                { name: 'Overdue Reminder', trigger: '3 days past due', preview: 'Friendly reminder: your invoice for $[amount] is past due...' },
                { name: 'Review Request', trigger: '24h after payment', preview: 'Thanks for choosing JB! A quick review would mean the world: [link]' },
              ].map(t => (
                <tr key={t.name}>
                  <td className="cell-primary">{t.name}</td>
                  <td><span className="badge contacted">{t.trigger}</span></td>
                  <td style={{ fontSize: 12, color: '#7A8072', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.preview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div></div>
      )}

      {activeTab === 'integrations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { name: 'Stripe', desc: 'Accept card payments and send invoices', connected: false },
            { name: 'Telnyx', desc: 'Automated SMS notifications', connected: false },
            { name: 'Google Business', desc: 'Review management and local SEO', connected: false },
            { name: 'Supabase', desc: 'Database and authentication', connected: true },
          ].map(i => (
            <div key={i.name} className="card"><div className="card-body padded" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{i.name}</div>
                <div style={{ fontSize: 12, color: '#7A8072' }}>{i.desc}</div>
              </div>
              <button className={i.connected ? 'detail-btn-secondary' : 'topbar-btn'} style={{ fontSize: 12, padding: '6px 14px', whiteSpace: 'nowrap' }}>
                {i.connected ? 'Connected ✓' : 'Connect'}
              </button>
            </div></div>
          ))}
        </div>
      )}
    </>
  )
}