import { NextRequest, NextResponse } from 'next/server'

const TWENTY_API_URL = 'https://api.twenty.com/rest'
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || ''

// Email configuration - In production, use Resend or similar
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'notdienst@mueller-elektro.de'

interface EmergencyLeadRequest {
  problem: string
  problemLabel: string
  name: string
  phone: string
  address: string
  description?: string
  preferCallback: boolean
  source: string
}

export async function POST(request: NextRequest) {
  try {
    const body: EmergencyLeadRequest = await request.json()

    // Validate required fields
    if (!body.name || !body.phone || !body.address || !body.problem) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Split name into first and last name
    const nameParts = body.name.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Priority based on problem type
    const getPriority = (problem: string) => {
      switch (problem) {
        case 'brandgeruch':
          return 'CRITICAL'
        case 'funken':
          return 'URGENT'
        case 'kein-strom':
          return 'HIGH'
        default:
          return 'NORMAL'
      }
    }

    const priority = getPriority(body.problem)

    // Create person in Twenty CRM
    let personId: string | null = null

    try {
      const personResponse = await fetch(`${TWENTY_API_URL}/people`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TWENTY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: {
            firstName,
            lastName,
          },
          phones: {
            primaryPhoneNumber: body.phone,
          },
          city: 'München',
        }),
      })

      if (personResponse.ok) {
        const person = await personResponse.json()
        personId = person.data?.id
      } else {
        console.error('Failed to create person:', await personResponse.text())
      }
    } catch (error) {
      console.error('CRM person creation error:', error)
    }

    // Create a note with emergency details
    if (personId) {
      const noteContent = `
🚨 NOTFALL-ANFRAGE [${priority}]

📋 Problem: ${body.problemLabel}
📍 Adresse: ${body.address}
📝 Beschreibung: ${body.description || 'Keine Beschreibung'}

📞 Kontaktpräferenz: ${body.preferCallback ? 'RÜCKRUF GEWÜNSCHT' : 'Kunde ruft selbst an'}

---
Quelle: ${body.source}
Eingegangen: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
      `.trim()

      try {
        await fetch(`${TWENTY_API_URL}/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${TWENTY_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            body: noteContent,
            personId: personId,
          }),
        })
      } catch (error) {
        console.error('Failed to create note:', error)
      }
    }

    // Send email notification to employee
    // In production, use Resend API
    const emailSubject = `🚨 [${priority}] Notfall-Anfrage: ${body.problemLabel}`
    const emailBody = `
NOTFALL-ANFRAGE EINGEGANGEN

Priorität: ${priority}
${body.preferCallback ? '⚠️ RÜCKRUF GEWÜNSCHT - Bitte sofort anrufen!' : 'Kunde ruft selbst an'}

KUNDENINFORMATIONEN:
-------------------
Name: ${body.name}
Telefon: ${body.phone}
Adresse: ${body.address}

PROBLEMBESCHREIBUNG:
-------------------
Art: ${body.problemLabel}
Details: ${body.description || 'Keine weitere Beschreibung'}

---
Eingegangen: ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}
CRM Person ID: ${personId || 'Nicht erstellt'}
    `.trim()

    // Log the email that would be sent (in production, send via Resend)
    console.log('=== EMERGENCY EMAIL NOTIFICATION ===')
    console.log('To:', NOTIFICATION_EMAIL)
    console.log('Subject:', emailSubject)
    console.log('Body:', emailBody)
    console.log('====================================')

    // If Resend is configured, send actual email
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Notdienst <notdienst@mueller-elektro.de>',
            to: NOTIFICATION_EMAIL,
            subject: emailSubject,
            text: emailBody,
          }),
        })
      } catch (error) {
        console.error('Failed to send email notification:', error)
      }
    }

    // Log for debugging
    console.log('Emergency lead captured:', {
      name: body.name,
      phone: body.phone,
      problem: body.problemLabel,
      priority,
      preferCallback: body.preferCallback,
      personId,
    })

    return NextResponse.json({
      success: true,
      message: 'Emergency lead captured successfully',
      personId,
      priority,
    })

  } catch (error) {
    console.error('Error processing emergency lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
