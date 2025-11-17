# WhatsApp AI Architecture - Fabig Business Suite

> **Last Updated:** November 16, 2025
> **Status:** Design Phase - Implementation Week 8-12
> **Owner:** Thomas Fabig

---

## Table of Contents

1. [Overview](#overview)
2. [Why WhatsApp AI?](#why-whatsapp-ai)
3. [Technical Architecture](#technical-architecture)
4. [Database Schema](#database-schema)
5. [AI Implementation](#ai-implementation)
6. [Industry-Specific Prompts](#industry-specific-prompts)
7. [Function Calling](#function-calling)
8. [Security & Compliance](#security--compliance)
9. [Pricing & Economics](#pricing--economics)
10. [Implementation Roadmap](#implementation-roadmap)

---

## Overview

### The Opportunity

**WhatsApp is THE primary communication channel in Germany:**
- 90%+ penetration (vs 60% in US)
- 98% message open rate (vs 20% email)
- Customers **expect** businesses to be on WhatsApp
- Local businesses receive 20-50 WhatsApp messages/day
- **Problem:** Can't respond fast enough → lost customers

### The Solution

**AI-powered WhatsApp assistant that:**
- Responds in seconds, 24/7
- Books appointments automatically
- Qualifies leads and adds to CRM
- Handles 70-80% of conversations autonomously
- Escalates complex issues to humans
- Speaks like a real employee (German "Du" form)

### Business Impact

```
Restaurant Example:
├── 30 WhatsApp inquiries/day
├── Without AI: 5 missed (busy) = €750/day lost
├── With AI (€399/mo): 0 missed
└── ROI: 5,637%

Salon Example:
├── 40 booking requests/day
├── Without AI: 8 missed (closed) = €480/day lost
├── With AI: Auto-booked during night
└── Revenue increase: €14,400/month
```

---

## Why WhatsApp AI?

### Market Reality in Germany

**WhatsApp Usage:**
- **58 million** active users in Germany (70% of population)
- **87% of small businesses** use WhatsApp for customer communication
- **#1 preferred channel** for service bookings (above phone, email, website)

**Customer Expectations:**
- Response within **5 minutes** or they move to competitor
- Availability **outside business hours** (evening bookings)
- **Simple, conversational** booking process

**Business Pain Points:**
- Owner is **busy with customers** → can't answer WhatsApp
- **After-hours** messages go unanswered until morning
- Manual responses are **time-consuming**
- **No CRM integration** → leads get lost

### Competitive Advantage

| Feature | Fabig WhatsApp AI | Standalone Chatbots | Manual WhatsApp |
|---------|-------------------|---------------------|-----------------|
| **Setup Time** | 15 minutes | Days/weeks | Instant |
| **Price** | €399/mo (included in Premium) | €800-2000/mo | Free (but inefficient) |
| **CRM Integration** | Native (same platform) | External API | None |
| **AI Quality** | Industry-specific German | Generic multilingual | Human |
| **Function Calling** | Books appointments, creates leads | Limited | Manual |
| **24/7 Availability** | ✅ | ✅ | ❌ |
| **Smart Escalation** | Context-aware | Rule-based | N/A |
| **German Market Focus** | ✅ Native | ⚠️ Translation | ✅ |

**Nobody else in the German market offers:**
- Website + CRM + WhatsApp AI in one platform
- Industry-trained AI (restaurants, salons, trades)
- Seamless integration with booking system
- German-native with "Du" form

---

## Technical Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Customer (WhatsApp)                   │
│            "Habt ihr heute noch einen Tisch frei?"       │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Meta WhatsApp Business Platform             │
│                      (Cloud API)                         │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS Webhook
                         ▼
┌─────────────────────────────────────────────────────────┐
│          Fabig Suite API: /api/webhooks/whatsapp        │
│  ├── Verify Meta signature (security)                   │
│  ├── Extract: message, sender phone, tenant phone       │
│  ├── Rate limiting (prevent abuse)                      │
│  └── Queue processing (async)                           │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Message Router                        │
│  ├── Identify tenant (phone number mapping)             │
│  ├── Check AI enabled? (tenant config)                  │
│  ├── Load conversation history                          │
│  └── Determine routing                                  │
└────────┬────────────────────────────────────────────────┘
         │
    ┌────┴─────────┐
    ▼              ▼
┌──────────┐  ┌──────────────────┐
│   AI     │  │  Human Inbox     │
│ Handler  │  │  (Manual Reply)  │
└────┬─────┘  └──────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│                 AI Decision Engine                       │
│  1. Load tenant context (business info, services, etc)  │
│  2. Load conversation history (last 10 messages)         │
│  3. Prepare system prompt (industry-specific)           │
│  4. Call OpenAI GPT-4o-mini API                         │
│  5. Parse response                                      │
│  6. Check for function calls needed                     │
│  7. Execute functions if needed                         │
│  8. Generate final response                             │
└────────┬────────────────────────────────────────────────┘
         │
    ┌────┴──────────┐
    ▼               ▼
┌──────────┐  ┌──────────────────────────────┐
│  Send    │  │  Function Execution          │
│  Reply   │  │  ├── Book appointment        │
│          │  │  ├── Check availability      │
│          │  │  ├── Create lead in CRM      │
│          │  │  ├── Send payment link       │
│          │  │  ├── Escalate to human       │
│          │  │  └── Update conversation log │
└──────────┘  └────────┬─────────────────────┘
                       │
                       ▼
              ┌────────────────────┐
              │   Update CRM       │
              │  ├── Create/update │
              │  │   lead           │
              │  ├── Log timeline  │
              │  ├── Send SMS to   │
              │  │   owner (if     │
              │  │   escalated)    │
              │  └── Update stats  │
              └────────────────────┘
```

### Component Breakdown

#### 1. **WhatsApp Business Platform (Meta)**

```typescript
// Configuration
const whatsappConfig = {
  apiVersion: 'v21.0',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  webhookVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
}

// Receive Messages (Webhook)
// Meta sends to: https://app.fabig-suite.de/api/webhooks/whatsapp
```

**Free Message Window:**
- Customer initiates → 24-hour window opens
- Unlimited messages within window = **FREE**
- After 24h → must use template messages (cost: ~€0.04 each)

#### 2. **Webhook Handler**

```typescript
// src/app/api/webhooks/whatsapp/route.ts
import crypto from 'crypto'

export async function POST(req: Request) {
  // 1. Verify Meta signature
  const signature = req.headers.get('x-hub-signature-256')
  const body = await req.text()

  const expectedSignature = crypto
    .createHmac('sha256', process.env.WHATSAPP_APP_SECRET!)
    .update(body)
    .digest('hex')

  if (signature !== `sha256=${expectedSignature}`) {
    return new Response('Invalid signature', { status: 403 })
  }

  const data = JSON.parse(body)

  // 2. Extract message
  const message = data.entry?.[0]?.changes?.[0]?.value?.messages?.[0]

  if (!message) {
    return new Response('OK', { status: 200 }) // Webhook verification
  }

  // 3. Queue for async processing (avoid webhook timeout)
  await messageQueue.add('process-whatsapp-message', {
    messageId: message.id,
    from: message.from, // Customer phone
    to: data.entry[0].changes[0].value.metadata.phone_number_id, // Business phone
    text: message.text?.body,
    type: message.type, // text, image, voice, etc.
    timestamp: message.timestamp,
  })

  return new Response('OK', { status: 200 })
}

export async function GET(req: Request) {
  // Webhook verification (Meta setup)
  const url = new URL(req.url)
  const mode = url.searchParams.get('hub.mode')
  const token = url.searchParams.get('hub.verify_token')
  const challenge = url.searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 })
  }

  return new Response('Forbidden', { status: 403 })
}
```

#### 3. **Message Processor**

```typescript
// src/lib/services/whatsapp/message-processor.ts
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function processWhatsAppMessage(job: Job) {
  const { from, to, text, messageId } = job.data

  const payload = await getPayloadHMR({ config })

  // 1. Identify tenant
  const tenant = await identifyTenant(to)

  if (!tenant) {
    console.error('Tenant not found for phone:', to)
    return
  }

  // 2. Load or create conversation
  let conversation = await payload.find({
    collection: 'whatsapp-conversations',
    where: {
      and: [
        { tenant: { equals: tenant.id } },
        { customerPhone: { equals: from } },
        { status: { not_equals: 'closed' } },
      ],
    },
    limit: 1,
  })

  if (!conversation.docs.length) {
    // New conversation
    conversation = await payload.create({
      collection: 'whatsapp-conversations',
      data: {
        tenant: tenant.id,
        customerPhone: from,
        status: 'ai_active',
        messages: [],
      },
    })
  } else {
    conversation = conversation.docs[0]
  }

  // 3. Add customer message to conversation
  await payload.update({
    collection: 'whatsapp-conversations',
    id: conversation.id,
    data: {
      messages: [
        ...(conversation.messages || []),
        {
          sender: 'customer',
          text,
          timestamp: new Date(),
          whatsappMessageId: messageId,
          status: 'delivered',
        },
      ],
    },
  })

  // 4. Check if AI is enabled
  const aiConfig = await getAIConfig(tenant.id)

  if (!aiConfig.enabled || aiConfig.tier === 'inbox_only') {
    // Manual mode - just store message and notify owner
    await notifyOwner(tenant, from, text)
    return
  }

  // 5. Generate AI response
  const aiResponse = await generateAIResponse(tenant, conversation, text, aiConfig)

  // 6. Send response via WhatsApp
  await sendWhatsAppMessage(from, aiResponse.text)

  // 7. Log AI response
  await payload.update({
    collection: 'whatsapp-conversations',
    id: conversation.id,
    data: {
      messages: [
        ...(conversation.messages || []),
        {
          sender: 'ai',
          text: aiResponse.text,
          timestamp: new Date(),
          status: 'sent',
        },
      ],
      status: aiResponse.escalated ? 'escalated' : conversation.status,
    },
  })

  // 8. Execute function calls if any
  if (aiResponse.functionCalls) {
    for (const func of aiResponse.functionCalls) {
      await executeFunctionCall(func, tenant, conversation, from)
    }
  }
}

async function identifyTenant(businessPhoneId: string): Promise<Tenant | null> {
  const payload = await getPayloadHMR({ config })

  const result = await payload.find({
    collection: 'tenants',
    where: {
      'integrations.whatsapp.phoneNumberId': { equals: businessPhoneId },
    },
    limit: 1,
  })

  return result.docs[0] || null
}
```

#### 4. **AI Response Generator**

```typescript
// src/lib/services/whatsapp/ai-generator.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAIResponse(
  tenant: Tenant,
  conversation: WhatsAppConversation,
  customerMessage: string,
  aiConfig: WhatsAppAIConfig
) {
  // 1. Build conversation history for context
  const conversationHistory = conversation.messages
    .slice(-10) // Last 10 messages
    .map(msg => ({
      role: msg.sender === 'customer' ? 'user' : 'assistant',
      content: msg.text,
    }))

  // 2. Build system prompt
  const systemPrompt = buildSystemPrompt(tenant, aiConfig)

  // 3. Call OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Fast + cheap
    temperature: 0.7, // Slightly creative but consistent
    messages: [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: customerMessage },
    ],
    tools: getFunctionTools(tenant, aiConfig),
    tool_choice: 'auto',
  })

  const message = response.choices[0].message

  // 4. Check for escalation keywords
  const shouldEscalate = checkEscalationTriggers(
    customerMessage,
    aiConfig.escalationKeywords
  )

  if (shouldEscalate) {
    await escalateToHuman(tenant, conversation, customerMessage)

    return {
      text: 'Ich leite das sofort an jemanden vom Team weiter! Du bekommst gleich Bescheid. 👍',
      escalated: true,
    }
  }

  // 5. Parse response
  return {
    text: message.content || aiConfig.fallbackMessage,
    functionCalls: message.tool_calls || [],
    escalated: false,
  }
}

function buildSystemPrompt(tenant: Tenant, aiConfig: WhatsAppAIConfig): string {
  const industry = INDUSTRY_TEMPLATES[tenant.industry]

  return `Du bist der WhatsApp-Assistent für ${tenant.name}, ein ${industry.name} in ${tenant.contact.address.city}.

DEINE PERSÖNLICHKEIT:
${aiConfig.aiPersonality}

GESCHÄFTSINFORMATIONEN:
- Name: ${tenant.name}
- Adresse: ${tenant.contact.address.street}, ${tenant.contact.address.postalCode} ${tenant.contact.address.city}
- Telefon: ${tenant.contact.phone}
- Email: ${tenant.contact.email}
- Öffnungszeiten: ${formatOpeningHours(tenant.openingHours)}

DIENSTLEISTUNGEN:
${tenant.services?.map(s => `- ${s.name}: ${s.description} (${s.price})`).join('\n')}

ZUSÄTZLICHES WISSEN:
${aiConfig.knowledgeBase || 'Keine zusätzlichen Informationen.'}

WICHTIGE REGELN:
1. Kommuniziere IMMER im "Du"-Form (informell aber respektvoll)
2. Nutze NUR Informationen aus diesem Kontext
3. Wenn du etwas nicht weißt, sage: "${aiConfig.fallbackMessage}"
4. Sei freundlich, hilfsbereit und professionell
5. Verwende Emojis sparsam (1-2 pro Nachricht) 😊
6. Halte Antworten kurz und präzise (max 3-4 Sätze)
7. Bei Buchungswünschen: sammle Name, gewünschten Zeitraum, Service
8. Bei Notfällen (Wörter: "notfall", "dringend", "sofort"): Eskaliere sofort!

DEINE FÄHIGKEITEN:
${aiConfig.capabilities.canBookAppointments ? '✅ Termine buchen' : '❌ Keine Terminbuchung'}
${aiConfig.capabilities.canCheckAvailability ? '✅ Verfügbarkeit prüfen' : '❌ Keine Verfügbarkeitsprüfung'}
${aiConfig.capabilities.canSendPricing ? '✅ Preise nennen' : '❌ Keine Preisauskunft'}
${aiConfig.capabilities.canCreateLeads ? '✅ Leads erstellen' : '❌ Keine Lead-Erstellung'}

Antworte jetzt auf die Kundenanfrage:`
}

function checkEscalationTriggers(
  message: string,
  keywords: string[]
): boolean {
  const lowerMessage = message.toLowerCase()

  // Check custom keywords
  for (const keyword of keywords) {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      return true
    }
  }

  // Check default escalation patterns
  const defaultTriggers = [
    'beschwerde',
    'reklamation',
    'anwalt',
    'rechtsanwalt',
    'gericht',
    'polizei',
    'betrug',
    'abzocke',
  ]

  return defaultTriggers.some(trigger => lowerMessage.includes(trigger))
}
```

---

## Database Schema

### WhatsApp Conversations Collection

```typescript
// src/payload/collections/WhatsAppConversations.ts
import type { CollectionConfig } from 'payload'

export const WhatsAppConversations: CollectionConfig = {
  slug: 'whatsapp-conversations',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerPhone', 'status', 'intent', 'updatedAt'],
    group: 'WhatsApp',
  },
  access: {
    // Tenant-specific access
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      index: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Customer WhatsApp phone number (E.164 format)',
      },
    },
    {
      name: 'customerName',
      type: 'text',
      admin: {
        description: 'Extracted from conversation or manually entered',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'ai_active',
      options: [
        { label: 'AI aktiv', value: 'ai_active' },
        { label: 'Mensch aktiv', value: 'human_active' },
        { label: 'Lead erstellt', value: 'lead_created' },
        { label: 'Termin gebucht', value: 'appointment_booked' },
        { label: 'Eskaliert', value: 'escalated' },
        { label: 'Geschlossen', value: 'closed' },
      ],
      index: true,
    },
    {
      name: 'lead',
      type: 'relationship',
      relationTo: 'leads',
      admin: {
        description: 'Linked lead if created from this conversation',
      },
    },
    {
      name: 'messages',
      type: 'array',
      label: 'Nachrichten',
      fields: [
        {
          name: 'sender',
          type: 'select',
          required: true,
          options: [
            { label: 'Kunde', value: 'customer' },
            { label: 'AI', value: 'ai' },
            { label: 'Mensch', value: 'human' },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
        {
          name: 'timestamp',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
        },
        {
          name: 'whatsappMessageId',
          type: 'text',
          admin: {
            description: 'WhatsApp message ID for tracking',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Gesendet', value: 'sent' },
            { label: 'Zugestellt', value: 'delivered' },
            { label: 'Gelesen', value: 'read' },
            { label: 'Fehler', value: 'failed' },
          ],
        },
        {
          name: 'mediaUrl',
          type: 'text',
          admin: {
            description: 'URL for images, voice messages, etc.',
          },
        },
      ],
    },
    {
      name: 'aiSummary',
      type: 'textarea',
      admin: {
        description: 'AI-generated summary of the conversation',
        readOnly: true,
      },
    },
    {
      name: 'intent',
      type: 'select',
      options: [
        { label: 'Anfrage', value: 'inquiry' },
        { label: 'Buchung', value: 'booking' },
        { label: 'Support', value: 'support' },
        { label: 'Beschwerde', value: 'complaint' },
        { label: 'Notfall', value: 'emergency' },
        { label: 'Sonstiges', value: 'other' },
      ],
      admin: {
        description: 'AI-detected conversation intent',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Assigned team member (if escalated)',
      },
    },
    {
      name: 'escalationReason',
      type: 'text',
      admin: {
        condition: (data) => data.status === 'escalated',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional data (function call results, etc.)',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Auto-create lead if booking detected
        if (doc.intent === 'booking' && !doc.lead && doc.customerName) {
          const lead = await req.payload.create({
            collection: 'leads',
            data: {
              tenant: doc.tenant,
              firstName: doc.customerName.split(' ')[0],
              lastName: doc.customerName.split(' ').slice(1).join(' ') || '',
              phone: doc.customerPhone,
              source: 'whatsapp',
              status: 'new',
              notes: `WhatsApp-Anfrage: ${doc.aiSummary}`,
            },
          })

          // Link lead to conversation
          await req.payload.update({
            collection: 'whatsapp-conversations',
            id: doc.id,
            data: { lead: lead.id, status: 'lead_created' },
          })
        }
      },
    ],
  },
}
```

### WhatsApp AI Config Collection

```typescript
// src/payload/collections/WhatsAppAIConfig.ts
export const WhatsAppAIConfig: CollectionConfig = {
  slug: 'whatsapp-ai-config',
  admin: {
    group: 'WhatsApp',
  },
  access: {
    // Tenant-specific access
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
      label: 'WhatsApp AI aktiviert',
      admin: {
        description: 'AI-Antworten für WhatsApp-Nachrichten aktivieren',
      },
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'inbox_only',
      options: [
        { label: 'Nur Inbox (Manuelle Antworten)', value: 'inbox_only' },
        { label: 'Smart (Auto-Antworten)', value: 'smart' },
        { label: 'AI (Volle KI)', value: 'ai' },
      ],
    },
    {
      name: 'aiPersonality',
      type: 'textarea',
      defaultValue: 'Du bist freundlich, hilfsbereit und professionell. Du beantwortest Fragen schnell und präzise.',
      admin: {
        description: 'Wie soll die AI kommunizieren? (Persönlichkeit, Ton, Stil)',
        condition: (data) => data.tier === 'ai',
      },
    },
    {
      name: 'operatingMode',
      type: 'select',
      defaultValue: 'always',
      options: [
        { label: 'Immer aktiv', value: 'always' },
        { label: 'Nur während Geschäftszeiten', value: 'business_hours_only' },
        { label: 'Nur außerhalb Geschäftszeiten', value: 'after_hours_only' },
      ],
      admin: {
        description: 'Wann soll die AI automatisch antworten?',
      },
    },
    {
      name: 'knowledgeBase',
      type: 'richText',
      admin: {
        description: 'Zusätzliche Informationen für die AI (FAQ, Besonderheiten, Regeln, etc.)',
      },
    },
    {
      type: 'group',
      name: 'capabilities',
      label: 'Fähigkeiten',
      fields: [
        {
          name: 'canBookAppointments',
          type: 'checkbox',
          label: 'Termine buchen',
          defaultValue: false,
          admin: {
            description: 'AI darf automatisch Termine buchen (erfordert Kalenderintegration)',
          },
        },
        {
          name: 'canCreateLeads',
          type: 'checkbox',
          label: 'Leads erstellen',
          defaultValue: true,
          admin: {
            description: 'AI darf automatisch Leads im CRM anlegen',
          },
        },
        {
          name: 'canSendPricing',
          type: 'checkbox',
          label: 'Preise nennen',
          defaultValue: true,
          admin: {
            description: 'AI darf Preisinformationen weitergeben',
          },
        },
        {
          name: 'canCheckAvailability',
          type: 'checkbox',
          label: 'Verfügbarkeit prüfen',
          defaultValue: false,
          admin: {
            description: 'AI kann Verfügbarkeit in Echtzeit prüfen',
          },
        },
      ],
    },
    {
      name: 'escalationKeywords',
      type: 'array',
      label: 'Eskalations-Schlüsselwörter',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
          label: 'Stichwort',
        },
      ],
      defaultValue: [
        { keyword: 'beschwerde' },
        { keyword: 'reklamation' },
        { keyword: 'manager' },
        { keyword: 'chef' },
        { keyword: 'sprechen' },
      ],
      admin: {
        description: 'Wenn diese Wörter vorkommen, wird an einen Menschen übergeben',
      },
    },
    {
      name: 'fallbackMessage',
      type: 'textarea',
      label: 'Fallback-Nachricht',
      defaultValue: 'Das kann ich leider nicht beantworten. Jemand vom Team meldet sich gleich bei dir! 👍',
      admin: {
        description: 'Nachricht, wenn AI unsicher ist oder keine Antwort hat',
      },
    },
    {
      name: 'monthlyConversationLimit',
      type: 'number',
      defaultValue: 1000,
      admin: {
        description: 'Maximale AI-Gespräche pro Monat (laut Abo-Tier)',
      },
    },
    {
      name: 'conversationsThisMonth',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        description: 'Anzahl AI-Gespräche diesen Monat',
      },
    },
  ],
}
```

---

## AI Implementation

### Industry-Specific Prompts

#### Restaurant AI

```typescript
const restaurantSystemPrompt = `Du bist der WhatsApp-Assistent für ${restaurantName}, ein Restaurant in ${city}.

DEINE AUFGABE:
Du hilfst Gästen bei:
- Tischreservierungen
- Fragen zur Speisekarte
- Öffnungszeiten
- Allergieninformationen
- Wegbeschreibung
- Veranstaltungen

PERSÖNLICHKEIT:
- Gastfreundlich und einladend
- Professionell aber nicht steif
- Begeistert für unser Essen
- Hilfreich und geduldig

SPEISEKARTE:
${menuItems.map(item => `- ${item.name}: ${item.description} (${item.price}€)`).join('\n')}

ALLERGIE-INFORMATIONEN:
${allergyInfo}

ÖFFNUNGSZEITEN:
${openingHours}

SPEZIELLE REGELN:
1. Bei Reservierungen: Sammle Name, Anzahl Personen, Datum, Uhrzeit
2. Bei großen Gruppen (>10 Personen): Eskaliere an das Team
3. Bei Veranstaltungsanfragen: Gib Kontakt für Events weiter
4. Erwähne Tagesgerichte wenn vorhanden: "${dailySpecial}"
5. Bei Allergien: Sei SEHR vorsichtig, sage "Ich frage in der Küche nach"

BEISPIEL-GESPRÄCH:
Gast: "Habt ihr heute Abend noch einen Tisch frei?"
Du: "Hallo! 👋 Ja, wir haben heute Abend noch Plätze. Für wie viele Personen und um welche Uhrzeit?"
Gast: "4 Personen, 19 Uhr"
Du: "Perfekt! Tisch für 4 Personen um 19:00 Uhr. Auf welchen Namen darf ich reservieren?"
Gast: "Schmidt"
Du: "Super! Tisch für 4 Personen auf den Namen Schmidt, heute 19:00 Uhr ist reserviert. Wir freuen uns auf euch! 🎉"`
```

#### Hair Salon AI

```typescript
const salonSystemPrompt = `Du bist die Terminassistentin für ${salonName}, einen Friseursalon in ${city}.

DEINE AUFGABE:
- Terminbuchungen koordinieren
- Dienstleistungen erklären
- Preise nennen
- Stylisten vorstellen
- Pflegetipps geben

PERSÖNLICHKEIT:
- Stylisch und modern
- Freundlich und sympathisch
- Beratend aber nicht aufdringlich
- Begeistert für Haarpflege

DIENSTLEISTUNGEN & PREISE:
${services.map(s => `- ${s.name}: ${s.description} (ab ${s.price}€, Dauer: ${s.duration} Min.)`).join('\n')}

STYLISTEN:
${stylists.map(s => `- ${s.name}: Spezialist/in für ${s.specialty}`).join('\n')}

ÖFFNUNGSZEITEN:
${openingHours}

SPEZIELLE REGELN:
1. Bei Terminwünschen: Frage nach gewünschter Dienstleistung, Datum, Uhrzeit
2. Bei Erstkundinnen: Begrüße sie extra herzlich
3. Bei komplexen Colorationen: Empfehle Beratungstermin
4. Erwähne unsere Instagram-Seite für Inspiration: @${instagramHandle}
5. Bei Hochzeitsfrisuren: Verweise auf spezielle Beratung

BEISPIEL-GESPRÄCH:
Kundin: "Was kostet Balayage?"
Du: "Hallo! 💇 Balayage kostet bei uns ab 120€, je nach Haarlänge und gewünschter Intensität. Die Behandlung dauert ca. 3-4 Stunden. Möchtest du direkt einen Termin vereinbaren?"
Kundin: "Ja gerne, Donnerstag Nachmittag?"
Du: "Perfekt! Donnerstag habe ich noch 14:00 und 16:00 Uhr frei. Was passt dir besser?"
Kundin: "14 Uhr bitte"
Du: "Top! Donnerstag 14:00 Uhr für Balayage-Behandlung ist für dich reserviert. Wie heißt du?"
Kundin: "Lisa"
Du: "Super Lisa! Dein Termin am Donnerstag 14:00 Uhr ist bestätigt. Freu dich schon mal auf deine neue Haarfarbe! 😊✨"`
```

#### Electrician AI (Emergency-Ready)

```typescript
const electricianSystemPrompt = `Du bist der Notdienst-Koordinator für ${companyName}, ein Elektrikerbetrieb in ${city}.

DEINE AUFGABE:
- Notfälle SOFORT erkennen und eskalieren
- Serviceanfragen entgegennehmen
- Terminvereinbarungen koordinieren
- Grobe Kosteneinschätzungen geben

PERSÖNLICHKEIT:
- Bei Notfällen: Ruhig, schnell, effizient
- Bei normalen Anfragen: Freundlich, kompetent, zuverlässig
- Immer professionell
- Sicherheitsbewusst

DIENSTLEISTUNGEN:
${services.map(s => `- ${s.name}: ${s.description} (ab ${s.price}€)`).join('\n')}

NOTDIENST:
- 24/7 verfügbar
- Anfahrt in ${responseTime} Minuten (Notfall)
- Zusatzkosten Notdienst: +${emergencySurcharge}€

EINSATZGEBIET:
${serviceArea}

KRITISCHE NOTFALL-SCHLÜSSELWÖRTER:
- "notfall", "dringend", "sofort"
- "strom weg", "stromausfall", "blackout"
- "funken", "qualm", "rauch", "feuer"
- "kurzschluss", "schlag bekommen"
- "gefahr", "lebensgefahr"

WENN NOTFALL ERKANNT:
1. SOFORT SMS an Chef: ${ownerPhone}
2. Adresse und Telefonnummer sammeln
3. Art des Notfalls
4. Sage: "Jemand ruft dich in den nächsten 3 Minuten an! 🚨"

BEISPIEL NOTFALL:
Kunde: "Hilfe! Bei mir qualmt die Steckdose!"
Du: "⚡ NOTFALL verstanden! Bitte SOFORT Sicherung raus und nichts anfassen! Wo bist du? (Adresse)"
Kunde: "Hauptstraße 15, Berlin"
Du: "Danke! Unter welcher Nummer können wir dich anrufen?"
Kunde: "+49170123456"
Du: "Perfekt! Unser Techniker ruft dich in max. 3 Minuten an und ist in ca. 15 Minuten vor Ort. FASS NICHTS AN! 🚨"
[ESKALIERE SOFORT]

BEISPIEL NORMALE ANFRAGE:
Kunde: "Ich bräuchte einen Termin für neue Steckdosen"
Du: "Hallo! Gerne helfe ich dir weiter. 😊 Wie viele Steckdosen sollen es werden und wo sollen sie installiert werden?"
Kunde: "3 Steckdosen in der Küche"
Du: "Alles klar! Das kostet ca. 150-200€ je nach Aufwand. Wann hättest du denn Zeit für einen Termin?"
Kunde: "Nächste Woche Mittwoch?"
Du: "Mittwoch hätte ich 9:00 oder 14:00 Uhr einen Slot frei. Was passt besser?"
Kunde: "9 Uhr"
Du: "Super! Mittwoch 9:00 Uhr für 3 Steckdosen-Installation in der Küche. Auf welchen Namen?"
Kunde: "Müller"
Du: "Perfekt Herr/Frau Müller! Der Termin ist notiert. Wir freuen uns! ⚡"`
```

---

## Function Calling

### Available Functions

```typescript
// src/lib/services/whatsapp/functions.ts

export const whatsappFunctions: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: 'Check available time slots for appointments',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Date in YYYY-MM-DD format',
          },
          serviceType: {
            type: 'string',
            description: 'Type of service requested',
          },
          duration: {
            type: 'number',
            description: 'Expected duration in minutes',
          },
        },
        required: ['date'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'book_appointment',
      description: 'Book an appointment for the customer',
      parameters: {
        type: 'object',
        properties: {
          customerName: {
            type: 'string',
            description: 'Customer full name',
          },
          customerPhone: {
            type: 'string',
            description: 'Customer phone number',
          },
          service: {
            type: 'string',
            description: 'Service to be booked',
          },
          dateTime: {
            type: 'string',
            description: 'Appointment date and time in ISO format',
          },
          notes: {
            type: 'string',
            description: 'Additional notes or special requests',
          },
        },
        required: ['customerName', 'customerPhone', 'service', 'dateTime'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_lead',
      description: 'Create a lead in the CRM system',
      parameters: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' },
          serviceInterest: { type: 'string' },
          projectDescription: { type: 'string' },
          urgency: {
            type: 'string',
            enum: ['low', 'medium', 'high', 'emergency'],
          },
        },
        required: ['firstName', 'phone', 'serviceInterest'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'escalate_to_human',
      description: 'Escalate the conversation to a human team member',
      parameters: {
        type: 'object',
        properties: {
          reason: {
            type: 'string',
            description: 'Reason for escalation',
          },
          urgency: {
            type: 'string',
            enum: ['normal', 'high', 'emergency'],
          },
          summary: {
            type: 'string',
            description: 'Summary of conversation so far',
          },
        },
        required: ['reason'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'send_payment_link',
      description: 'Send a payment link for deposit or prepayment',
      parameters: {
        type: 'object',
        properties: {
          amount: {
            type: 'number',
            description: 'Amount in EUR',
          },
          description: {
            type: 'string',
            description: 'What the payment is for',
          },
        },
        required: ['amount', 'description'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_menu_info',
      description: 'Get information about menu items (restaurants only)',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'Menu category (appetizers, mains, desserts, etc.)',
          },
          allergen: {
            type: 'string',
            description: 'Filter by allergen (gluten, lactose, nuts, etc.)',
          },
        },
      },
    },
  },
]

// Function execution
export async function executeFunctionCall(
  toolCall: OpenAI.Chat.ChatCompletionMessageToolCall,
  tenant: Tenant,
  conversation: WhatsAppConversation,
  customerPhone: string
) {
  const functionName = toolCall.function.name
  const args = JSON.parse(toolCall.function.arguments)

  switch (functionName) {
    case 'check_availability':
      return await checkAvailability(tenant.id, args.date, args.serviceType)

    case 'book_appointment':
      return await bookAppointment(tenant.id, {
        customerName: args.customerName,
        customerPhone: args.customerPhone || customerPhone,
        service: args.service,
        dateTime: args.dateTime,
        notes: args.notes,
      })

    case 'create_lead':
      return await createLead(tenant.id, {
        ...args,
        phone: args.phone || customerPhone,
        source: 'whatsapp',
      })

    case 'escalate_to_human':
      return await escalateToHuman(tenant, conversation, args.reason, args.urgency)

    case 'send_payment_link':
      return await sendPaymentLink(customerPhone, args.amount, args.description)

    case 'get_menu_info':
      return await getMenuInfo(tenant.id, args.category, args.allergen)

    default:
      console.error('Unknown function:', functionName)
      return null
  }
}
```

---

## Security & Compliance

### WhatsApp Business Platform Policies

**Must comply with:**
1. **User-initiated conversations** - Can only respond to customer messages
2. **24-hour window** - Free messaging within 24h of customer message
3. **Opt-out mechanism** - Customer can type "STOP" to unsubscribe
4. **No spam** - No unsolicited marketing messages
5. **No sensitive content** - No adult content, weapons, etc.
6. **Privacy** - Must have privacy policy, GDPR compliance

### Implementation:

```typescript
// Opt-out handling
if (customerMessage.toLowerCase().trim() === 'stop') {
  await payload.update({
    collection: 'whatsapp-conversations',
    id: conversation.id,
    data: {
      status: 'closed',
      messages: [
        ...conversation.messages,
        {
          sender: 'ai',
          text: 'Du wurdest von WhatsApp-Nachrichten abgemeldet. Schreib uns jederzeit wieder wenn du Hilfe brauchst!',
          timestamp: new Date(),
        },
      ],
    },
  })

  // Blacklist the number
  await blacklistPhoneNumber(tenant.id, customerPhone)
  return
}

// Rate limiting (prevent abuse)
const messageCount = await redis.incr(`whatsapp:ratelimit:${customerPhone}`)
await redis.expire(`whatsapp:ratelimit:${customerPhone}`, 3600) // 1 hour

if (messageCount > 20) {
  // More than 20 messages/hour → potential spam
  await escalateToHuman(tenant, conversation, 'Rate limit exceeded')
  return
}

// GDPR: Data retention
// Delete conversations older than 2 years (configurable)
const twoYearsAgo = new Date()
twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2)

await payload.delete({
  collection: 'whatsapp-conversations',
  where: {
    and: [
      { updatedAt: { less_than: twoYearsAgo.toISOString() } },
      { status: { equals: 'closed' } },
    ],
  },
})
```

### AI Safety

```typescript
// Content moderation
import OpenAI from 'openai'

async function moderateContent(text: string): Promise<boolean> {
  const moderation = await openai.moderations.create({
    input: text,
  })

  const flagged = moderation.results[0].flagged

  if (flagged) {
    // Log and escalate
    console.warn('Flagged content:', text, moderation.results[0].categories)
    return false
  }

  return true
}

// Use before sending AI response
const isSafe = await moderateContent(aiResponse)
if (!isSafe) {
  await escalateToHuman(tenant, conversation, 'Unsafe content detected')
  return 'Ich leite das an jemanden vom Team weiter.'
}
```

---

## Pricing & Economics

### Cost Breakdown (Per Customer)

**Customer Pays: €399/mo (Premium tier with AI)**

**Your Costs:**

```
1. OpenAI API (GPT-4o-mini):
   - Input: $0.15 / 1M tokens
   - Output: $0.60 / 1M tokens
   - Average conversation: ~500 input + 200 output tokens
   - Cost per conversation: ~$0.00019 (€0.00018)
   - 100 conversations/month: €0.018
   - 1000 conversations/month: €0.18

2. WhatsApp Business API:
   - User-initiated messages: FREE (within 24h window)
   - Template messages: ~€0.04 each
   - Typical usage: 90% user-initiated, 10% templates
   - 100 conversations: ~€0.40
   - 1000 conversations: ~€4.00

3. Infrastructure:
   - Redis (caching): €5/mo
   - Queue processing: €3/mo
   - Database storage: €2/mo
   - Total: €10/mo

TOTAL COST PER CUSTOMER:
- Light usage (100 AI conversations/mo): €10.50/mo
- Heavy usage (1000 AI conversations/mo): €14.20/mo

GROSS MARGIN:
- €399 - €15 = €384/mo per customer
- Margin: 96.2%
```

**At Scale (100 Premium Customers):**

```
Revenue: 100 × €399 = €39,900/mo
Costs: 100 × €15 = €1,500/mo
Profit: €38,400/mo = €460,800/year
```

### Pricing Tiers

```typescript
export const AI_PRICING_TIERS = {
  inbox_only: {
    price: 0, // Included in Professional tier
    conversationLimit: 0,
    features: ['WhatsApp inbox', 'Manual replies', 'Templates'],
  },
  smart: {
    price: 99, // €99/mo add-on
    conversationLimit: 500,
    features: [
      'Auto-responses',
      'After-hours messages',
      'Lead creation',
      'Basic analytics',
    ],
  },
  ai: {
    price: 399, // Included in Premium (€799/mo total)
    conversationLimit: 1000,
    features: [
      'AI conversations',
      'Appointment booking',
      'Lead qualification',
      'Function calling',
      'Smart escalation',
      '24/7 availability',
      'Advanced analytics',
    ],
  },
  ai_pro: {
    price: 799, // Included in Enterprise (€2000+/mo total)
    conversationLimit: null, // Unlimited
    features: [
      'All AI features',
      'Voice transcription',
      'Image recognition',
      'Multi-language',
      'Custom training',
      'Dedicated support',
    ],
  },
}
```

---

## Implementation Roadmap

### Week 8: WhatsApp Foundation

**Days 43-45: WhatsApp Business API Setup**

```bash
# 1. Register with Meta Business
# 2. Create WhatsApp Business Account
# 3. Get Phone Number ID, Access Token
# 4. Set up webhook endpoint
```

**Tasks:**
- ✅ Create Meta Business Manager account
- ✅ Apply for WhatsApp Business API access
- ✅ Get phone numbers (one test, one production)
- ✅ Configure webhook: `https://app.fabig-suite.de/api/webhooks/whatsapp`
- ✅ Verify webhook with Meta
- ✅ Test sending/receiving messages

**Days 46-49: Inbox & Manual Replies**

```typescript
// Build WhatsApp inbox UI
// src/app/(app)/whatsapp/page.tsx

export default async function WhatsAppInboxPage() {
  const tenantId = getTenantId()

  const conversations = await payload.find({
    collection: 'whatsapp-conversations',
    where: {
      tenant: { equals: tenantId },
      status: { not_equals: 'closed' },
    },
    sort: '-updatedAt',
    limit: 50,
  })

  return (
    <div className="grid grid-cols-3 h-screen">
      <ConversationList conversations={conversations.docs} />
      <ConversationView />
      <ConversationDetails />
    </div>
  )
}
```

**Deliverables:**
- ✅ WhatsApp webhook receiving messages
- ✅ Conversations collection storing messages
- ✅ Inbox UI showing conversations
- ✅ Manual reply functionality
- ✅ Message templates
- ✅ Phone number → Tenant mapping

---

### Week 9: Smart Auto-Responses

**Days 50-52: Rule-Based Automation**

```typescript
// src/lib/services/whatsapp/auto-responses.ts

const AUTO_RESPONSES = {
  openingHours: {
    triggers: ['öffnungszeiten', 'offen', 'geöffnet', 'geschlossen'],
    response: (tenant) =>
      `Wir haben ${formatOpeningHours(tenant.openingHours)} geöffnet! 🕐`,
  },

  location: {
    triggers: ['adresse', 'wo', 'standort', 'location'],
    response: (tenant) =>
      `Wir sind hier: ${tenant.contact.address.street}, ${tenant.contact.address.postalCode} ${tenant.contact.address.city}\n\nGoogle Maps: ${tenant.googleMapsUrl}`,
  },

  pricing: {
    triggers: ['preis', 'kosten', 'kostet'],
    response: (tenant) =>
      `Unsere Preise findest du hier: ${tenant.pricingUrl}\n\nFür eine genaue Kostenschätzung können wir gerne einen Termin vereinbaren!`,
  },

  booking: {
    triggers: ['termin', 'buchen', 'reservierung', 'appointment'],
    response: () =>
      `Gerne! Wann hättest du denn Zeit? Ich schaue gleich nach verfügbaren Terminen. 😊`,
  },
}

export function getAutoResponse(
  message: string,
  tenant: Tenant
): string | null {
  const lowerMessage = message.toLowerCase()

  for (const [key, config] of Object.entries(AUTO_RESPONSES)) {
    for (const trigger of config.triggers) {
      if (lowerMessage.includes(trigger)) {
        return config.response(tenant)
      }
    }
  }

  return null
}
```

**Days 53-56: After-Hours Messages**

```typescript
// src/lib/services/whatsapp/business-hours.ts

export function isBusinessHours(tenant: Tenant): boolean {
  const now = new Date()
  const day = now.toLocaleDateString('de-DE', { weekday: 'lowercase' })
  const time = now.toTimeString().slice(0, 5) // HH:MM

  const hours = tenant.openingHours[day]

  if (!hours || hours === 'closed') {
    return false
  }

  const [open, close] = hours.split('-')

  return time >= open && time <= close
}

// Auto-response for after hours
if (!isBusinessHours(tenant)) {
  return `Danke für deine Nachricht! Wir sind gerade geschlossen, aber melden uns morgen früh bei dir. 😊\n\nÖffnungszeiten:\n${formatOpeningHours(tenant.openingHours)}`
}
```

**Deliverables:**
- ✅ Rule-based auto-responses (10+ common questions)
- ✅ After-hours auto-reply
- ✅ Business hours detection
- ✅ Template message system
- ✅ Analytics (response time, message volume)

---

### Week 10-11: AI Integration ⭐

**Days 57-59: OpenAI Integration**

```bash
# Install dependencies
pnpm add openai

# Set environment variable
OPENAI_API_KEY=sk-...
```

```typescript
// Test AI response
const testConversation = {
  tenant: {
    name: 'Café Sonnenschein',
    industry: 'cafe',
    city: 'Berlin',
    openingHours: 'Mo-Fr 8:00-18:00, Sa-So 9:00-17:00',
  },
  customerMessage: 'Habt ihr heute noch Kuchen?',
}

const response = await generateAIResponse(
  testConversation.tenant,
  testConversation,
  testConversation.customerMessage,
  aiConfig
)

console.log(response.text)
// Expected: "Ja klar! Wir haben heute frischen Käsekuchen, Apfelkuchen und Schokoladentorte. Möchtest du einen reservieren? 🍰"
```

**Days 60-63: Industry-Specific Training**

```typescript
// Create and test prompts for each industry
const industries = [
  'restaurant',
  'cafe',
  'hair_salon',
  'electrician',
  'plumber',
  'physiotherapy',
  'photographer',
]

for (const industry of industries) {
  await testIndustryPrompt(industry)
}
```

**Days 64-70: Conversation Management & Escalation**

```typescript
// src/lib/services/whatsapp/escalation.ts

export async function escalateToHuman(
  tenant: Tenant,
  conversation: WhatsAppConversation,
  reason: string,
  urgency: 'normal' | 'high' | 'emergency' = 'normal'
) {
  // 1. Update conversation status
  await payload.update({
    collection: 'whatsapp-conversations',
    id: conversation.id,
    data: {
      status: 'escalated',
      escalationReason: reason,
    },
  })

  // 2. Notify owner
  if (urgency === 'emergency') {
    // SMS for emergencies
    await smsService.send({
      to: tenant.contact.phone,
      body: `🚨 NOTFALL: WhatsApp-Nachricht von ${conversation.customerPhone}\n\nGrund: ${reason}\n\nJetzt antworten: app.fabig-suite.de/whatsapp/${conversation.id}`,
      tenantId: tenant.id,
    })
  } else {
    // Email for normal escalations
    await emailService.send({
      to: tenant.contact.email,
      subject: 'WhatsApp-Nachricht benötigt deine Antwort',
      html: `
        <p>Eine WhatsApp-Konversation wurde an dich weitergeleitet.</p>
        <p><strong>Grund:</strong> ${reason}</p>
        <p><strong>Kunde:</strong> ${conversation.customerPhone}</p>
        <p><a href="https://app.fabig-suite.de/whatsapp/${conversation.id}">Jetzt antworten</a></p>
      `,
      tenantId: tenant.id,
    })
  }

  // 3. Send message to customer
  await sendWhatsAppMessage(
    conversation.customerPhone,
    'Ich leite das an jemanden vom Team weiter! Du bekommst gleich eine Antwort. 👍'
  )
}
```

**Deliverables Week 10-11:**
- ✅ OpenAI GPT-4o-mini integration
- ✅ Industry-specific system prompts (7+ industries)
- ✅ Conversation context loading
- ✅ AI response generation
- ✅ Confidence scoring
- ✅ Smart escalation system
- ✅ Emergency detection
- ✅ Conversation logging
- ✅ AI analytics dashboard
- ✅ Token usage tracking (cost monitoring)

---

### Week 12: AI Function Calling

**Days 71-73: Appointment Booking**

```typescript
// src/lib/services/whatsapp/booking.ts

export async function bookAppointment(
  tenantId: string,
  appointmentData: {
    customerName: string
    customerPhone: string
    service: string
    dateTime: string
    notes?: string
  }
) {
  const payload = await getPayloadHMR({ config })

  // 1. Check availability (if calendar integration exists)
  const isAvailable = await checkAvailability(
    tenantId,
    appointmentData.dateTime,
    appointmentData.service
  )

  if (!isAvailable) {
    return {
      success: false,
      message: 'Dieser Termin ist leider nicht mehr verfügbar. Hast du einen anderen Wunschtermin?',
    }
  }

  // 2. Create lead with appointment
  const lead = await payload.create({
    collection: 'leads',
    data: {
      tenant: tenantId,
      firstName: appointmentData.customerName.split(' ')[0],
      lastName: appointmentData.customerName.split(' ').slice(1).join(' ') || '',
      phone: appointmentData.customerPhone,
      source: 'whatsapp',
      status: 'contacted', // Already confirmed
      serviceInterest: appointmentData.service,
      notes: `WhatsApp-Buchung:\n${appointmentData.service}\nTermin: ${appointmentData.dateTime}\n${appointmentData.notes || ''}`,
    },
  })

  // 3. Create appointment (if calendar system exists)
  // await createCalendarEvent(...)

  // 4. Send confirmation
  const confirmationMessage = `Perfekt! Dein Termin ist bestätigt! ✅\n\n📅 ${formatDateTime(appointmentData.dateTime)}\n🔧 ${appointmentData.service}\n👤 ${appointmentData.customerName}\n\nWir freuen uns auf dich!`

  return {
    success: true,
    message: confirmationMessage,
    leadId: lead.id,
  }
}
```

**Days 74-77: Lead Creation & Payment Links**

```typescript
// Auto-create leads from conversations
// Send payment links for deposits
// Integration with Stripe/PayPal
```

**Days 78-80: Testing & Launch Prep**

```bash
# Test scenarios:
1. Restaurant reservation (happy path)
2. Salon booking with rescheduling
3. Electrician emergency escalation
4. Photographer quote request
5. Restaurant complaint (escalation)
6. Salon after-hours booking
7. Multi-turn conversation (context)
8. Language edge cases
9. Emoji handling
10. Voice message (future)
```

**Deliverables Week 12:**
- ✅ Function calling implementation
- ✅ Appointment booking (end-to-end)
- ✅ Lead creation from conversations
- ✅ Payment link generation
- ✅ Availability checking
- ✅ 100+ test scenarios passed
- ✅ Error handling & fallbacks
- ✅ Documentation for customers
- ✅ Training materials
- ✅ READY FOR BETA LAUNCH 🚀

---

## Success Metrics

### Technical KPIs

- **Response time:** <3 seconds (from customer message to AI reply)
- **AI accuracy:** >85% (responses don't require human correction)
- **Escalation rate:** <20% (AI handles 80%+ autonomously)
- **Uptime:** 99.9%
- **Token efficiency:** <800 tokens per conversation

### Business KPIs

- **Conversion rate:** 30%+ (conversations → bookings/leads)
- **Customer satisfaction:** >4.5/5 stars
- **Time saved:** 10+ hours/month per customer
- **Missed opportunity reduction:** 90%+ (vs manual WhatsApp)

### Cost KPIs

- **Cost per conversation:** <€0.02
- **Gross margin:** >95%
- **CAC payback:** <2 months (Premium tier)

---

## Beta Launch Strategy

### Phase 1: Internal Testing (Week 10-11)

```
Test with 3 businesses:
- 1 restaurant (Thomas's client)
- 1 salon (Thomas's client)
- 1 trade business (Thomas's client)

Goals:
- Verify AI accuracy
- Test booking flow
- Gather feedback
- Refine prompts

Duration: 2 weeks
Price: FREE (in exchange for testimonials)
```

### Phase 2: Closed Beta (Week 12 - Month 4)

```
Expand to 10 businesses:
- 3 restaurants
- 3 salons
- 2 trades
- 2 other services

Goals:
- Scale testing
- Measure KPIs
- Get case studies
- Identify bugs

Duration: 1 month
Price: €199/mo (50% discount)
Requirement: Weekly feedback call
```

### Phase 3: Public Launch (Month 5+)

```
Open to all Fabig Suite customers

Goals:
- 100 AI customers by Month 6
- €40,000 MRR from AI features
- 4+ five-star case studies
- Featured in industry press

Price: Full €799/mo (Premium tier)
Marketing: Case studies, demos, webinars
```

---

## Next Steps

1. ✅ Integrate this architecture into main `claude.md`
2. ✅ Add WhatsApp collections to database schema
3. ✅ Update Week 8-12 timeline
4. ✅ Create industry prompt templates
5. ⏳ Begin Week 1 implementation (foundation)

---

**End of WhatsApp AI Architecture Documentation**
**© 2025 Thomas Fabig | Fabig Webdevelopment**
