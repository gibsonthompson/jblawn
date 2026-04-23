'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_PIN = '0331' // Last 4 of phone number

export default function AdminLogin() {
  const router = useRouter()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('jb_admin', 'true')
      router.push('/admin')
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#F5F6F2',
      padding: 24,
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <img src="/images/jb-logo.jpg" alt="JB Lawn Care" style={{ height: 48, marginBottom: 24 }} />
        <h1 style={{ fontSize: 20, fontWeight: 750, color: '#1A1D16', marginBottom: 6 }}>Admin Access</h1>
        <p style={{ fontSize: 13, color: '#7A8072', marginBottom: 28 }}>Enter your PIN to continue</p>

        <form onSubmit={handleSubmit} style={{
          background: '#fff', borderRadius: 12,
          border: '1px solid #E5E8E0', padding: 28,
        }}>
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626',
              padding: '10px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, marginBottom: 20,
            }}>
              Wrong PIN. Try again.
            </div>
          )}

          <input
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => { setPin(e.target.value.replace(/\D/g, '')); setError(false) }}
            placeholder="• • • •"
            autoFocus
            style={{
              width: '100%', padding: '14px', border: '1px solid #E5E8E0',
              borderRadius: 8, fontSize: 24, fontFamily: 'inherit', outline: 'none',
              textAlign: 'center', letterSpacing: 12, boxSizing: 'border-box',
              marginBottom: 16,
            }}
          />

          <button type="submit" style={{
            width: '100%', padding: '12px 20px', background: '#6BBF1A', color: '#fff',
            border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>
            Enter
          </button>
        </form>

        <a href="/" style={{ display: 'inline-block', marginTop: 20, fontSize: 13, color: '#7A8072', textDecoration: 'none' }}>
          ← Back to website
        </a>
      </div>
    </div>
  )
}