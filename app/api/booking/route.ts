import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const telnyxApiKey = process.env.TELNYX_API_KEY || ''
const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER || ''
const jbPhone = process.env.JB_NOTIFICATION_PHONE || '3412600331'

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

async function sendSMS(to: string, text: string) {
  if (!telnyxApiKey || !telnyxFromNumber) return false
  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${telnyxApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: telnyxFromNumber, to: `+1${to.replace(/\D/g, '')}`, text }),
    })
    return res.ok
  } catch { return false }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first_name, last_name, phone, email, service_requested, address, preferred_date, preferred_time, details } = body

    if (!first_name || !phone || !service_requested || !address || !preferred_date || !preferred_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')

    if (supabase) {
      await supabase.from('jb_leads').insert({
        first_name, last_name: last_name || null, phone: cleanPhone,
        email: email || null, service_requested, address,
        preferred_date, preferred_time, details: details || null,
        source: 'website', status: 'new',
      })

      const { data: existing } = await supabase.from('jb_contacts').select('id').eq('phone', cleanPhone).single()
      if (!existing) {
        const parts = address.split(',').map((s: string) => s.trim())
        const city = parts.length >= 2 ? parts[parts.length - 1].replace(/\s*(CA|California)\s*\d*/i, '').trim() : null
        await supabase.from('jb_contacts').insert({
          first_name, last_name: last_name || null, phone: cleanPhone,
          email: email || null, address, city: city || null,
          referral_source: 'website', tags: ['residential'],
        })
      }
    }

    await sendSMS(cleanPhone, `Thanks ${first_name}! We got your request for ${service_requested}. We'll call you within the hour to confirm. — JB Lawn Care & Hauling`)
    await sendSMS(jbPhone, `🌿 NEW BOOKING\n${first_name} ${last_name || ''}\n📞 ${phone}\n🔧 ${service_requested}\n📍 ${address}\n📅 ${preferred_date} ${preferred_time}${details ? `\n📝 ${details}` : ''}\n\nCall ASAP!`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Booking error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}