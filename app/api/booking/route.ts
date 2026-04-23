import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const telnyxApiKey = process.env.TELNYX_API_KEY || ''
const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER || ''
const jbPhone = process.env.JB_NOTIFICATION_PHONE || '3412600331'

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

async function sendSMS(to: string, text: string) {
  if (!telnyxApiKey || !telnyxFromNumber) {
    console.log('[SMS SKIPPED - no Telnyx config]', { to, text })
    return false
  }
  try {
    const cleanTo = to.replace(/\D/g, '')
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${telnyxApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: telnyxFromNumber, to: `+1${cleanTo}`, text }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[SMS FAILED]', err)
      return false
    }
    console.log('[SMS SENT]', { to: cleanTo })
    return true
  } catch (err) {
    console.error('[SMS ERROR]', err)
    return false
  }
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
      // 1. Insert lead
      const { error: leadError } = await supabase.from('jb_leads').insert({
        first_name, last_name: last_name || null, phone: cleanPhone,
        email: email || null, service_requested, address,
        preferred_date, preferred_time, details: details || null,
        source: 'website', status: 'new',
      })
      if (leadError) console.error('[LEAD INSERT ERROR]', leadError)

      // 2. Auto-create contact if new phone
      const { data: existing } = await supabase.from('jb_contacts').select('id').eq('phone', cleanPhone).maybeSingle()
      if (!existing) {
        const parts = address.split(',').map((s: string) => s.trim())
        const city = parts.length >= 2 ? parts[parts.length - 1].replace(/\s*(CA|California)\s*\d*/i, '').trim() : null
        const { error: contactError } = await supabase.from('jb_contacts').insert({
          first_name, last_name: last_name || null, phone: cleanPhone,
          email: email || null, address, city: city || null,
          referral_source: 'website', tags: ['residential'],
        })
        if (contactError) console.error('[CONTACT INSERT ERROR]', contactError)
      }

      // 3. Queue customer SMS for delayed send (1 min)
      await supabase.from('jb_sms_log').insert({
        to_number: cleanPhone,
        message: `Thanks ${first_name}! We got your request for ${service_requested}. We'll call you within the hour to confirm your appointment. — JB Lawn Care & Hauling`,
        direction: 'outbound',
        status: 'queued',
        // send_at can be used by a cron/edge function to delay delivery
      }).then(({ error }) => { if (error) console.error('[SMS LOG ERROR]', error) })
    }

    // 4. Send business notification IMMEDIATELY
    const sent = await sendSMS(jbPhone,
      `🌿 NEW BOOKING\n${first_name} ${last_name || ''}\n📞 ${phone}\n🔧 ${service_requested}\n📍 ${address}\n📅 ${preferred_date} ${preferred_time}${details ? `\n📝 ${details}` : ''}\n\nCall ASAP!`
    )

    return NextResponse.json({ success: true, smsNotification: sent })
  } catch (err) {
    console.error('[BOOKING API ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}