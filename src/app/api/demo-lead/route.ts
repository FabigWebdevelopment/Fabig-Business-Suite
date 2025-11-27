import { NextRequest, NextResponse } from 'next/server'

const TWENTY_API_URL = process.env.TWENTY_CRM_API_URL || 'https://api.twenty.com/rest'
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || ''

interface DemoLeadRequest {
  businessName: string
  businessType: string
  contactName: string
  phone: string
  email?: string
  source: string
  funnelData?: {
    problem?: string
    completedSteps?: string[]
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: DemoLeadRequest = await request.json()

    // Validate required fields
    if (!body.businessName || !body.contactName || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Split contact name into first and last name
    const nameParts = body.contactName.trim().split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Create person in Twenty CRM
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
        emails: body.email ? {
          primaryEmail: body.email,
        } : undefined,
        phones: {
          primaryPhoneNumber: body.phone,
        },
        jobTitle: body.businessType || undefined,
      }),
    })

    if (!personResponse.ok) {
      const errorText = await personResponse.text()
      console.error('Twenty CRM person creation failed:', errorText)
      // Continue anyway - we'll create the company
    }

    const person = personResponse.ok ? await personResponse.json() : null

    // Create company in Twenty CRM
    const companyResponse = await fetch(`${TWENTY_API_URL}/companies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TWENTY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: body.businessName,
        domainName: {
          primaryLinkUrl: '',
        },
      }),
    })

    if (!companyResponse.ok) {
      const errorText = await companyResponse.text()
      console.error('Twenty CRM company creation failed:', errorText)
    }

    const company = companyResponse.ok ? await companyResponse.json() : null

    // Create a note with the funnel data
    if (person?.data?.id) {
      const noteContent = `
📍 Lead Source: ${body.source}
🏢 Business: ${body.businessName}
📋 Type: ${body.businessType || 'Not specified'}

Funnel Data:
- Problem selected: ${body.funnelData?.problem || 'N/A'}
- Steps completed: ${body.funnelData?.completedSteps?.join(', ') || 'N/A'}

Created at: ${new Date().toISOString()}
      `.trim()

      await fetch(`${TWENTY_API_URL}/notes`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TWENTY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: noteContent,
          personId: person.data.id,
        }),
      })
    }

    // Log for debugging
    console.log('Demo lead captured:', {
      businessName: body.businessName,
      contactName: body.contactName,
      phone: body.phone,
      source: body.source,
      personId: person?.data?.id,
      companyId: company?.data?.id,
    })

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      personId: person?.data?.id,
      companyId: company?.data?.id,
    })

  } catch (error) {
    console.error('Error processing demo lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
