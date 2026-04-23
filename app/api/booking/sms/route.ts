import { NextRequest, NextResponse } from 'next/server'

const telnyxApiKey = process.env.TELNYX_API_KEY || ''
const telnyxFromNumber = process.env.TELNYX_FROM_NUMBER || ''

export async function POST(request: NextRequest) {
  try {
    const { phone, first_name, service_requested } = await request.json()
    if (!phone || !first_name || !telnyxApiKey || !telnyxFromNumber) {
      return NextResponse.json({ sent: false })
    }

    const cleanTo = phone.replace(/\D/g, '')
    const toFmt = cleanTo.startsWith('1') ? `+${cleanTo}` : `+1${cleanTo}`
    const fromFmt = telnyxFromNumber.startsWith('+') ? telnyxFromNumber : `+${telnyxFromNumber}`

    const res = await fetch('https://api.telnyx.com/v2/messages', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${telnyxApiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: fromFmt,
        to: toFmt,
        text: `Thanks ${first_name}! We got your request for ${service_requested}. We'll call you within the hour to confirm your appointment. - JB Lawn Care & Hauling`,
      }),
    })

    return NextResponse.json({ sent: res.ok })
  } catch {
    return NextResponse.json({ sent: false })
  }
}