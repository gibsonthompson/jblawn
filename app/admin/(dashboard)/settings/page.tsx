'use client'

import { useState, useEffect } from 'react'
import { db } from '../../../../lib/admin-db'

type ServiceRow = { id: string; name: string; default_price: number; price_type: string; is_active: boolean }
type SmsTemplate = { id: string; name: string; trigger_event: string; message: string; is_active: boolean }
type SettingRow = { key: string; value: string }

const TRIGGER_LABELS: Record<string, string> = {
  form_submit: 'Form submit',
  day_before: 'Day before job',
  status_en_route: 'Status → En Route',
  status_completed: 'Status → Completed',
  invoice_sent: 'Invoice sent',
  payment_received: 'Payment received',
  overdue_3day: '3 days past due',
  overdue_7day: '7 days past due',
  post_payment: '24h after payment',
  manual_campaign: 'Manual / Campaign',
  manual_referral: 'Manual / Referral',
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business')

  // Business settings
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loadingSettings, setLoadingSettings] = useState(true)
  const [savingSettings, setSavingSettings] = useState(false)
  const [settingsSaved, setSettingsSaved] = useState(false)

  // Services
  const [services, setServices] = useState<ServiceRow[]>([])
  const [loadingServices, setLoadingServices] = useState(true)
  const [editingService, setEditingService] = useState<ServiceRow | null>(null)
  const [savingService, setSavingService] = useState(false)

  // SMS Templates
  const [templates, setTemplates] = useState<SmsTemplate[]>([])
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [editingTemplate, setEditingTemplate] = useState<SmsTemplate | null>(null)
  const [savingTemplate, setSavingTemplate] = useState(false)

  useEffect(() => {
    fetchSettings()
    fetchServices()
    fetchTemplates()
  }, [])

  // ──── BUSINESS SETTINGS ────
  const fetchSettings = async () => {
    if (!db) return setLoadingSettings(false)
    const { data } = await db!.from('jb_settings').select('key, value')
    const map: Record<string, string> = {}
    ;(data || []).forEach((r: Record<string, unknown>) => { map[r.key as string] = r.value as string })
    setSettings(map)
    setLoadingSettings(false)
  }

  const saveSetting = async (key: string, value: string) => {
    if (!db) return
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveAllSettings = async () => {
    if (!db) return
    setSavingSettings(true)
    const entries = Object.entries(settings)
    for (const [key, value] of entries) {
      await db!.from('jb_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
    }
    setSavingSettings(false)
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  // ──── SERVICES ────
  const fetchServices = async () => {
    if (!db) return setLoadingServices(false)
    const { data } = await db!.from('jb_services').select('id, name, default_price, price_type, is_active').order('sort_order')
    if (data) setServices(data as unknown as ServiceRow[])
    setLoadingServices(false)
  }

  const toggleService = async (id: string, active: boolean) => {
    if (!db) return
    await db!.from('jb_services').update({ is_active: !active }).eq('id', id)
    setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !active } : s))
  }

  const saveService = async () => {
    if (!db || !editingService) return
    setSavingService(true)
    await db!.from('jb_services').update({
      name: editingService.name,
      default_price: editingService.default_price,
      price_type: editingService.price_type,
    }).eq('id', editingService.id)
    setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s))
    setEditingService(null)
    setSavingService(false)
  }

  // ──── SMS TEMPLATES ────
  const fetchTemplates = async () => {
    if (!db) return setLoadingTemplates(false)
    const { data } = await db!.from('jb_sms_templates').select('id, name, trigger_event, message, is_active').order('created_at')
    if (data) setTemplates(data as unknown as SmsTemplate[])
    setLoadingTemplates(false)
  }

  const toggleTemplate = async (id: string, active: boolean) => {
    if (!db) return
    await db!.from('jb_sms_templates').update({ is_active: !active }).eq('id', id)
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, is_active: !active } : t))
  }

  const saveTemplate = async () => {
    if (!db || !editingTemplate) return
    setSavingTemplate(true)
    await db!.from('jb_sms_templates').update({
      name: editingTemplate.name,
      message: editingTemplate.message,
      trigger_event: editingTemplate.trigger_event,
    }).eq('id', editingTemplate.id)
    setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? editingTemplate : t))
    setEditingTemplate(null)
    setSavingTemplate(false)
  }

  // ──── LABEL STYLE ────
  const labelStyle = { display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: '#A8AEA0', marginBottom: 6 }
  const inputStyle = { width: '100%', padding: '10px 12px', border: '1px solid #E5E8E0', borderRadius: 7, fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box' as const }

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

      {/* ──── BUSINESS TAB ──── */}
      {activeTab === 'business' && (
        <div className="card"><div className="card-body padded">
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Business Information</h3>
          {loadingSettings ? (
            <div className="card-empty">Loading...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600 }}>
                {[
                  ['business_name', 'Business Name'],
                  ['business_phone', 'Phone'],
                  ['business_email', 'Email'],
                  ['service_area', 'Service Area'],
                  ['google_review_url', 'Google Review URL'],
                  ['yelp_url', 'Yelp URL'],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      value={settings[key] || ''}
                      onChange={e => saveSetting(key, e.target.value)}
                      placeholder={label}
                      style={inputStyle}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
                <button className="topbar-btn" onClick={saveAllSettings} disabled={savingSettings}>
                  {savingSettings ? 'Saving...' : 'Save Changes'}
                </button>
                {settingsSaved && <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 600 }}>✓ Saved</span>}
              </div>
            </>
          )}
        </div></div>
      )}

      {/* ──── SERVICES TAB ──── */}
      {activeTab === 'services' && (
        <div className="card"><div className="card-body">
          {loadingServices ? (
            <div className="card-empty">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="card-empty">No services found.</div>
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
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button style={{ background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit', marginRight: 8 }} onClick={() => setEditingService({ ...s })}>Edit</button>
                      <button style={{ background: 'none', border: 'none', color: s.is_active ? '#DC2626' : '#6BBF1A', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit' }} onClick={() => toggleService(s.id, s.is_active)}>{s.is_active ? 'Deactivate' : 'Activate'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div></div>
      )}

      {/* ──── SMS TEMPLATES TAB ──── */}
      {activeTab === 'sms-templates' && (
        <div className="card"><div className="card-body">
          {loadingTemplates ? (
            <div className="card-empty">Loading templates...</div>
          ) : templates.length === 0 ? (
            <div className="card-empty">No templates found. Run the settings migration SQL to seed defaults.</div>
          ) : (
            <table className="tbl">
              <thead><tr><th>Template</th><th>Trigger</th><th>Preview</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {templates.map(t => (
                  <tr key={t.id} style={{ opacity: t.is_active ? 1 : 0.5 }}>
                    <td className="cell-primary">{t.name}</td>
                    <td><span className="badge contacted">{TRIGGER_LABELS[t.trigger_event] || t.trigger_event}</span></td>
                    <td style={{ fontSize: 12, color: '#7A8072', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.message}</td>
                    <td><span className={`badge ${t.is_active ? 'completed' : 'draft'}`}>{t.is_active ? 'active' : 'off'}</span></td>
                    <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button style={{ background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit', marginRight: 8 }} onClick={() => setEditingTemplate({ ...t })}>Edit</button>
                      <button style={{ background: 'none', border: 'none', color: t.is_active ? '#DC2626' : '#6BBF1A', cursor: 'pointer', fontSize: 11, fontWeight: 650, fontFamily: 'inherit' }} onClick={() => toggleTemplate(t.id, t.is_active)}>{t.is_active ? 'Disable' : 'Enable'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div></div>
      )}

      {/* ──── INTEGRATIONS TAB ──── */}
      {activeTab === 'integrations' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {[
            { name: 'Supabase', desc: 'Database — all CRM data lives here', connected: !!db, detail: db ? 'Connected via anon key' : 'No env vars set' },
            { name: 'Telnyx', desc: 'SMS — booking confirmations, reminders, review requests', connected: false, detail: 'Connected via env vars on Vercel. SMS templates above control message content.' },
            { name: 'Stripe', desc: 'Payments — card processing, payment links on invoices', connected: false, detail: 'Not integrated yet. Currently using Mark Paid manually.' },
            { name: 'Google Business', desc: 'Reviews — auto-request links sent via SMS after payment', connected: false, detail: settings.google_review_url ? `Review URL set: ${settings.google_review_url.slice(0, 40)}...` : 'Set your Google Review URL in the Business tab above.' },
          ].map(i => (
            <div key={i.name} className="card"><div className="card-body padded">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{i.name}</div>
                  <div style={{ fontSize: 12, color: '#7A8072', marginBottom: 8 }}>{i.desc}</div>
                  <div style={{ fontSize: 11, color: '#A8AEA0' }}>{i.detail}</div>
                </div>
                <span className={`badge ${i.connected ? 'completed' : 'draft'}`} style={{ flexShrink: 0 }}>
                  {i.connected ? 'Connected' : 'Not connected'}
                </span>
              </div>
            </div></div>
          ))}
        </div>
      )}

      {/* ──── EDIT SERVICE MODAL ──── */}
      {editingService && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setEditingService(null) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Edit Service</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Service Name</label>
                <input value={editingService.name} onChange={e => setEditingService(p => p ? { ...p, name: e.target.value } : null)} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Default Price</label>
                  <input type="number" value={editingService.default_price} onChange={e => setEditingService(p => p ? { ...p, default_price: Number(e.target.value) } : null)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Price Type</label>
                  <select value={editingService.price_type} onChange={e => setEditingService(p => p ? { ...p, price_type: e.target.value } : null)} style={inputStyle}>
                    <option value="flat">Flat</option>
                    <option value="custom">Custom / Quote</option>
                    <option value="per_day">Per Day</option>
                  </select>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setEditingService(null)}>Cancel</button>
              <button className="detail-btn-primary" onClick={saveService} disabled={savingService}>{savingService ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      {/* ──── EDIT TEMPLATE MODAL ──── */}
      {editingTemplate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={e => { if (e.target === e.currentTarget) setEditingTemplate(null) }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, width: '100%', maxWidth: 500, boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 750, marginBottom: 20 }}>Edit SMS Template</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={labelStyle}>Template Name</label>
                <input value={editingTemplate.name} onChange={e => setEditingTemplate(p => p ? { ...p, name: e.target.value } : null)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Trigger</label>
                <select value={editingTemplate.trigger_event} onChange={e => setEditingTemplate(p => p ? { ...p, trigger_event: e.target.value } : null)} style={inputStyle}>
                  {Object.entries(TRIGGER_LABELS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea value={editingTemplate.message} onChange={e => setEditingTemplate(p => p ? { ...p, message: e.target.value } : null)} rows={4} style={{ ...inputStyle, minHeight: 100, resize: 'vertical' as const }} />
                <div style={{ fontSize: 11, color: '#A8AEA0', marginTop: 4 }}>Variables: [name], [service], [amount], [link], [time], [referral_name]</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
              <button className="detail-btn-secondary" onClick={() => setEditingTemplate(null)}>Cancel</button>
              <button className="detail-btn-primary" onClick={saveTemplate} disabled={savingTemplate}>{savingTemplate ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}