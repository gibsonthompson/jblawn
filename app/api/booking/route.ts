import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const telnyxApiKey = process.env.TELNYX_API_KEY || ''
const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER || ''
const jbPhone = process.env.JB_NOTIFICATION_PHONE || '3412600331'

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

// Log env var status on cold start (no values, just whether they exist)
console.log('[BOOKING API INIT]', {
  supabase: !!supabase,
  supabaseUrl: supabaseUrl ? 'SET' : 'MISSING',
  supabaseKey: supabaseKey ? 'SET' : 'MISSING',
  telnyxApiKey: telnyxApiKey ? `SET (${telnyxApiKey.length} chars)` : 'MISSING',
  telnyxFromNumber: telnyxFromNumber || 'MISSING',
  jbPhone,
})

async function sendSMS(to: string, text: string): Promise<boolean> {
  console.log('[SMS ATTEMPT]', { to, telnyxConfigured: !!(telnyxApiKey && telnyxFromNumber) })

  if (!telnyxApiKey) {
    console.log('[SMS SKIPPED] TELNYX_API_KEY is not set')
    return false
  }
  if (!telnyxFromNumber) {
    console.log('[SMS SKIPPED] TELNYX_FROM_NUMBER is not set')
    return false
  }

  const cleanTo = to.replace(/\D/g, '')
  const toFormatted = cleanTo.startsWith('1') ? `+${cleanTo}` : `+1${cleanTo}`
  const fromFormatted = telnyxFromNumber.startsWith('+') ? telnyxFromNumber : `+${telnyxFromNumber}`

  console.log('[SMS SENDING]', { from: fromFormatted, to: toFormatted, textLength: text.length })

  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${telnyxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromFormatted,
        to: toFormatted,
        text,
      }),
    })

    const responseText = await res.text()

    if (!res.ok) {
      console.error('[SMS FAILED]', { status: res.status, response: responseText })
      return false
    }

    console.log('[SMS SENT OK]', { to: toFormatted, status: res.status })
    return true
  } catch (err) {
    console.error('[SMS EXCEPTION]', err)
    return false
  }
}

export async function POST(request: NextRequest) {
  console.log('[BOOKING REQUEST RECEIVED]')

  try {
    const body = await request.json()
    const { first_name, last_name, phone, email, service_requested, address, preferred_date, preferred_time, details } = body

    console.log('[BOOKING DATA]', { first_name, phone, service_requested, preferred_date })

    if (!first_name || !phone || !service_requested || !address || !preferred_date || !preferred_time) {
      console.log('[BOOKING VALIDATION FAILED]', { first_name: !!first_name, phone: !!phone, service: !!service_requested, address: !!address, date: !!preferred_date, time: !!preferred_time })
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const cleanPhone = phone.replace(/\D/g, '')

    // --- SUPABASE ---
    if (supabase) {
      const { error: leadError } = await supabase.from('jb_leads').insert({
        first_name, last_name: last_name || null, phone: cleanPhone,
        email: email || null, service_requested, address,
        preferred_date, preferred_time, details: details || null,
        source: 'website', status: 'new',
      })
      if (leadError) console.error('[LEAD INSERT ERROR]', leadError)
      else console.log('[LEAD INSERTED OK]')

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
        else console.log('[CONTACT CREATED OK]')
      } else {
        console.log('[CONTACT EXISTS]', existing.id)
      }
    } else {
      console.log('[SUPABASE NOT CONFIGURED]')
    }

    // --- SMS: BUSINESS NOTIFICATION (send first) ---
    console.log('[SENDING BUSINESS SMS to', jbPhone, ']')
    const bizSent = await sendSMS(jbPhone,
      `NEW BOOKING\n${first_name} ${last_name || ''}\nPhone: ${phone}\nService: ${service_requested}\nAddress: ${address}\nDate: ${preferred_date} ${preferred_time}${details ? `\nDetails: ${details}` : ''}\n\nCall ASAP!`
    )

    // --- SMS: CUSTOMER CONFIRMATION (send second) ---
    console.log('[SENDING CUSTOMER SMS to', cleanPhone, ']')
    const custSent = await sendSMS(cleanPhone,
      `Thanks ${first_name}! We got your request for ${service_requested}. We'll call you within the hour to confirm your appointment. - JB Lawn Care & Hauling`
    )

    console.log('[BOOKING COMPLETE]', { bizSent, custSent })
    return NextResponse.json({ success: true, bizSent, custSent })
  } catch (err) {
    console.error('[BOOKING API ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}