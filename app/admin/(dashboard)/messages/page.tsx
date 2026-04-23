'use client'

import { useState } from 'react'

const THREADS = [
  { id: 1, name: 'Maria Rodriguez', phone: '(510) 555-1234', lastMsg: 'Your lawn mowing is complete! We\'ll send your invoice shortly.', time: '2 hrs ago', unread: false },
  { id: 2, name: 'James Carter', phone: '(510) 555-8901', lastMsg: 'Thanks! What time works tomorrow?', time: '3 hrs ago', unread: true },
  { id: 3, name: 'David Lee', phone: '(510) 555-5678', lastMsg: 'JB Lawn Care is on the way! We\'ll be there shortly.', time: '4 hrs ago', unread: false },
  { id: 4, name: 'Sarah Mitchell', phone: '(510) 555-4321', lastMsg: 'Hi Sarah, just following up on quote QT-00044. Let me know if you have questions!', time: '1 day ago', unread: false },
  { id: 5, name: 'Kevin Park', phone: '(510) 555-6789', lastMsg: 'Friendly reminder: your invoice for $250 is past due. Pay here: ...', time: '2 days ago', unread: true },
]

const MESSAGES = [
  { from: 'jb', text: 'Thanks James! We got your request for Yard Cleanup. We\'ll call you within the hour to confirm. — JB Lawn Care', time: '3:15 PM' },
  { from: 'customer', text: 'Thanks! What time works tomorrow?', time: '3:22 PM' },
  { from: 'jb', text: 'We can do 10 AM or 2 PM — which works better for you?', time: '3:25 PM' },
]

export default function MessagesPage() {
  const [selected, setSelected] = useState<typeof THREADS[0] | null>(THREADS[1])
  const [newMsg, setNewMsg] = useState('')

  return (
    <>
      <div className="page-header"><div><h1>Messages</h1><p>{THREADS.filter(t => t.unread).length} unread</p></div></div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 20, height: 'calc(100vh - 200px)' }}>
        {/* Thread List */}
        <div className="card" style={{ overflow: 'auto' }}>
          {THREADS.map(t => (
            <div key={t.id} onClick={() => setSelected(t)} style={{
              padding: '14px 18px', cursor: 'pointer', borderBottom: '1px solid #F0F2EC',
              background: selected?.id === t.id ? '#F0F7E8' : t.unread ? '#FAFBF8' : '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: t.unread ? 750 : 600, fontSize: 13, color: '#1A1D16' }}>{t.name}</span>
                <span style={{ fontSize: 11, color: '#A8AEA0' }}>{t.time}</span>
              </div>
              <div style={{ fontSize: 12, color: '#7A8072', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.lastMsg}</div>
            </div>
          ))}
        </div>

        {/* Conversation */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          {selected ? (
            <>
              <div className="card-header">
                <div>
                  <h3>{selected.name}</h3>
                  <span style={{ fontSize: 12, color: '#A8AEA0' }}>{selected.phone}</span>
                </div>
                <a href={`tel:${selected.phone.replace(/\D/g, '')}`} className="topbar-btn" style={{ fontSize: 12, padding: '5px 12px' }}>Call</a>
              </div>
              <div style={{ flex: 1, padding: 20, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {MESSAGES.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.from === 'jb' ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                    <div style={{
                      padding: '10px 14px', borderRadius: 12, fontSize: 13, lineHeight: 1.5,
                      background: m.from === 'jb' ? '#6BBF1A' : '#F0F2EC',
                      color: m.from === 'jb' ? '#fff' : '#1A1D16',
                      borderBottomRightRadius: m.from === 'jb' ? 4 : 12,
                      borderBottomLeftRadius: m.from === 'jb' ? 12 : 4,
                    }}>{m.text}</div>
                    <div style={{ fontSize: 10, color: '#A8AEA0', marginTop: 4, textAlign: m.from === 'jb' ? 'right' : 'left' }}>{m.time}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: 16, borderTop: '1px solid #F0F2EC', display: 'flex', gap: 10 }}>
                <input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type a message..." style={{ flex: 1, padding: '10px 14px', border: '1px solid #E5E8E0', borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none' }} />
                <button className="topbar-btn">Send</button>
              </div>
            </>
          ) : (
            <div className="card-empty">Select a conversation</div>
          )}
        </div>
      </div>
    </>
  )
}
