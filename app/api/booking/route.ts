import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const telnyxApiKey = process.env.TELNYX_API_KEY || ''
const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER || ''
const jbNotificationPhone = process.env.JB_NOTIFICATION_PHONE || '3412600331'

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

async function sendSMS(to: string, text: string) {
  if (!telnyxApiKey || !telnyxFromNumber) {
    console.log('SMS skipped (no Telnyx config):', { to, text })
    return false
  }

  try {
    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${telnyxApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: telnyxFromNumber,
        to: `+1${to.replace(/\D/g, '')}`,
        text,
      }),
    })

    if (!res.ok) {
      console.error('Telnyx SMS failed:', await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('SMS send error:', err)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { first_name, last_name, phone, email, service_requested, address, preferred_date, preferred_time, details } = body

    // Validate required fields
    if (!first_name || !phone || !service_requested || !address || !preferred_date || !preferred_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Clean phone number
    const cleanPhone = phone.replace(/\D/g, '')

    // Insert into Supabase
    let leadId = null
    if (supabase) {
      const { data, error } = await supabase.from('jb_leads').insert({
        first_name,
        last_name: last_name || null,
        phone: cleanPhone,
        email: email || null,
        service_requested,
        address,
        preferred_date,
        preferred_time,
        details: details || null,
        source: 'website',
        status: 'new',
      }).select('id').single()

      if (error) {
        console.error('Supabase insert error:', error)
        // Don't fail the request — still send SMS
      } else {
        leadId = data?.id
      }
    }

    // SMS to customer — confirmation
    await sendSMS(cleanPhone,
      `Thanks ${first_name}! We got your request for ${service_requested}. We'll call you within the hour to confirm your appointment. — JB Lawn Care & Hauling`
    )

    // SMS to JB — new lead notification
    await sendSMS(jbNotificationPhone,
      `🌿 NEW BOOKING REQUEST\n\nName: ${first_name} ${last_name || ''}\nPhone: ${phone}\nService: ${service_requested}\nAddress: ${address}\nDate: ${preferred_date}\nTime: ${preferred_time}${details ? `\nDetails: ${details}` : ''}\n\nCall them ASAP!`
    )

    return NextResponse.json({
      success: true,
      leadId,
      message: 'Booking request received',
    })
  } catch (err) {
    console.error('Booking API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
