# Automated Provisioning Architecture

**Goal**: Single source of truth for tenant settings with automatic provisioning of all downstream services

---

## Core Concept

When a tenant updates their **domain**, **email**, or **phone number**, the system automatically:

1. ✅ Validates the input
2. ✅ Provisions resources in external services (Resend, Twilio, WhatsApp)
3. ✅ Generates setup instructions for the tenant
4. ✅ Monitors verification status
5. ✅ Auto-retries failed provisions
6. ✅ Updates tenant status when ready
7. ✅ Sends notifications to tenant

**No manual setup required** - Everything happens automatically!

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                       TENANT SETTINGS                            │
│                    (Single Source of Truth)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Tenant Updates Domain: bellaitalia.de                   │  │
│  └────────────────────┬─────────────────────────────────────┘  │
│                       │                                          │
│                       │ Triggers Lifecycle Hook                 │
│                       │                                          │
│            ┌──────────▼──────────┐                              │
│            │  afterChange Hook   │                              │
│            │  (Payload CMS)      │                              │
│            └──────────┬──────────┘                              │
│                       │                                          │
│                       │ Enqueues Background Jobs                │
│                       │                                          │
│      ┌────────────────┼────────────────┐                        │
│      │                │                │                        │
│  ┌───▼────┐      ┌───▼────┐      ┌───▼────┐                   │
│  │ Email  │      │ Phone  │      │ Website│                    │
│  │ Domain │      │ Number │      │ Domain │                    │
│  │ Setup  │      │ Setup  │      │ Setup  │                    │
│  └───┬────┘      └───┬────┘      └───┬────┘                   │
│      │               │               │                          │
└──────┼───────────────┼───────────────┼──────────────────────────┘
       │               │               │
       │               │               │
┌──────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│   RESEND    │ │   TWILIO    │ │  VERCEL    │
│             │ │             │ │            │
│ - Create    │ │ - Buy       │ │ - Add      │
│   domain    │ │   number    │ │   domain   │
│ - Generate  │ │ - Configure │ │ - Provision│
│   DNS       │ │   webhooks  │ │   SSL      │
│ - Monitor   │ │ - Setup     │ │ - Route    │
│   verify    │ │   SMS/Voice │ │   traffic  │
└──────┬──────┘ └──────┬──────┘ └─────┬──────┘
       │               │               │
       │               │               │
┌──────▼───────────────▼───────────────▼──────┐
│      PROVISIONING STATUS TRACKING            │
│                                              │
│  - pending_verification                      │
│  - dns_configured                            │
│  - verified ✅                               │
│  - failed ❌ (with retry logic)              │
└──────────────────────────────────────────────┘
```

---

## Tenant Settings Schema (Enhanced)

```typescript
// src/payload/collections/Tenants.ts

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  fields: [
    // =====================================================================
    // CONTACT INFORMATION (Single Source of Truth)
    // =====================================================================
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Kontaktinformationen',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Haupt-E-Mail',
          admin: {
            description: 'Wird für Admin-Login und Benachrichtigungen verwendet',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Telefonnummer',
          validate: (value) => {
            // E.164 format validation
            if (!value.match(/^\+[1-9]\d{1,14}$/)) {
              return 'Telefonnummer muss im internationalen Format sein (z.B. +4915112345678)'
            }
            return true
          },
          admin: {
            description: 'Internationale Nummer im E.164 Format: +4915112345678',
          },
        },
        {
          name: 'domain',
          type: 'text',
          label: 'Eigene Domain (optional)',
          validate: (value) => {
            if (!value) return true
            // Domain validation
            if (!value.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/)) {
              return 'Ungültiges Domain-Format (z.B. bellaitalia.de)'
            }
            return true
          },
          admin: {
            description: 'Deine eigene Domain (z.B. bellaitalia.de)',
          },
        },
      ],
    },

    // =====================================================================
    // AUTOMATED EMAIL DOMAIN SETUP
    // =====================================================================
    {
      name: 'emailDomain',
      type: 'group',
      label: 'E-Mail Domain Setup',
      admin: {
        description: 'Automatisch konfiguriert basierend auf deiner Domain',
        readOnly: true, // Users can't edit this directly
      },
      fields: [
        {
          name: 'sendingDomain',
          type: 'text',
          label: 'Versand-Domain',
          admin: {
            description: 'z.B. emails.bellaitalia.de oder emails.fabig-suite.de (fallback)',
          },
        },
        {
          name: 'resendDomainId',
          type: 'text',
          label: 'Resend Domain ID',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Nicht konfiguriert', value: 'not_configured' },
            { label: 'Wird erstellt...', value: 'provisioning' },
            { label: 'DNS-Konfiguration ausstehend', value: 'pending_dns' },
            { label: 'DNS wird geprüft...', value: 'verifying' },
            { label: '✅ Verifiziert und aktiv', value: 'verified' },
            { label: '❌ Fehler', value: 'failed' },
          ],
          defaultValue: 'not_configured',
        },
        {
          name: 'dnsRecords',
          type: 'array',
          label: 'DNS-Einträge',
          admin: {
            description: 'Diese Einträge müssen beim Domain-Provider eingetragen werden',
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              options: ['TXT', 'CNAME', 'MX'],
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name/Host',
            },
            {
              name: 'value',
              type: 'text',
              label: 'Wert',
            },
            {
              name: 'priority',
              type: 'number',
              label: 'Priorität',
              admin: {
                condition: (data) => data.type === 'MX',
              },
            },
            {
              name: 'status',
              type: 'select',
              options: [
                { label: 'Ausstehend', value: 'pending' },
                { label: '✅ Verifiziert', value: 'verified' },
              ],
              defaultValue: 'pending',
            },
          ],
        },
        {
          name: 'verifiedAt',
          type: 'date',
          label: 'Verifiziert am',
        },
        {
          name: 'lastCheckedAt',
          type: 'date',
          label: 'Zuletzt geprüft',
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          label: 'Fehlermeldung',
          admin: {
            condition: (data) => data.emailDomain?.status === 'failed',
          },
        },
      ],
    },

    // =====================================================================
    // AUTOMATED PHONE NUMBER SETUP
    // =====================================================================
    {
      name: 'phoneNumber',
      type: 'group',
      label: 'Telefonnummer Setup',
      admin: {
        description: 'Automatisch konfiguriert für SMS/Voice',
        readOnly: true,
      },
      fields: [
        {
          name: 'twilioPhoneNumber',
          type: 'text',
          label: 'Twilio Nummer',
          admin: {
            description: 'Automatisch gekauft und konfiguriert',
          },
        },
        {
          name: 'twilioPhoneSid',
          type: 'text',
          label: 'Twilio Phone SID',
        },
        {
          name: 'capabilities',
          type: 'group',
          fields: [
            {
              name: 'sms',
              type: 'checkbox',
              label: 'SMS',
              defaultValue: false,
            },
            {
              name: 'voice',
              type: 'checkbox',
              label: 'Anrufe',
              defaultValue: false,
            },
            {
              name: 'mms',
              type: 'checkbox',
              label: 'MMS',
              defaultValue: false,
            },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Nicht konfiguriert', value: 'not_configured' },
            { label: 'Wird gekauft...', value: 'provisioning' },
            { label: 'Wird konfiguriert...', value: 'configuring' },
            { label: '✅ Aktiv', value: 'active' },
            { label: '❌ Fehler', value: 'failed' },
          ],
          defaultValue: 'not_configured',
        },
        {
          name: 'provisionedAt',
          type: 'date',
          label: 'Bereitgestellt am',
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          label: 'Fehlermeldung',
          admin: {
            condition: (data) => data.phoneNumber?.status === 'failed',
          },
        },
      ],
    },

    // =====================================================================
    // AUTOMATED WEBSITE DOMAIN SETUP
    // =====================================================================
    {
      name: 'websiteDomain',
      type: 'group',
      label: 'Website Domain Setup',
      admin: {
        description: 'Automatisch konfiguriert für öffentliche Website',
        readOnly: true,
      },
      fields: [
        {
          name: 'customDomain',
          type: 'text',
          label: 'Custom Domain',
          admin: {
            description: 'z.B. www.bellaitalia.de oder bellaitalia.de',
          },
        },
        {
          name: 'subdomain',
          type: 'text',
          label: 'Subdomain (Fallback)',
          admin: {
            description: 'z.B. bellaitalia.fabig-suite.de',
          },
        },
        {
          name: 'vercelProjectId',
          type: 'text',
          label: 'Vercel Project ID',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Nicht konfiguriert', value: 'not_configured' },
            { label: 'DNS-Konfiguration ausstehend', value: 'pending_dns' },
            { label: 'SSL wird erstellt...', value: 'provisioning_ssl' },
            { label: '✅ Aktiv', value: 'active' },
            { label: '❌ Fehler', value: 'failed' },
          ],
          defaultValue: 'not_configured',
        },
        {
          name: 'sslCertificate',
          type: 'group',
          fields: [
            {
              name: 'status',
              type: 'select',
              options: [
                { label: 'Ausstehend', value: 'pending' },
                { label: 'Wird erstellt', value: 'provisioning' },
                { label: '✅ Aktiv', value: 'active' },
                { label: 'Läuft ab', value: 'expiring' },
              ],
            },
            {
              name: 'expiresAt',
              type: 'date',
            },
          ],
        },
        {
          name: 'dnsRecords',
          type: 'array',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: ['A', 'CNAME'],
            },
            {
              name: 'name',
              type: 'text',
            },
            {
              name: 'value',
              type: 'text',
            },
            {
              name: 'status',
              type: 'select',
              options: [
                { label: 'Ausstehend', value: 'pending' },
                { label: '✅ Verifiziert', value: 'verified' },
              ],
            },
          ],
        },
        {
          name: 'verifiedAt',
          type: 'date',
        },
      ],
    },

    // =====================================================================
    // WHATSAPP BUSINESS API SETUP
    // =====================================================================
    {
      name: 'whatsappBusiness',
      type: 'group',
      label: 'WhatsApp Business Setup',
      admin: {
        description: 'Automatisch konfiguriert für WhatsApp-Nachrichten',
        readOnly: true,
        condition: (data) => data.features?.whatsappEnabled,
      },
      fields: [
        {
          name: 'phoneNumberId',
          type: 'text',
          label: 'WhatsApp Phone Number ID',
        },
        {
          name: 'businessAccountId',
          type: 'text',
          label: 'WhatsApp Business Account ID',
        },
        {
          name: 'displayName',
          type: 'text',
          label: 'Anzeigename',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Nicht konfiguriert', value: 'not_configured' },
            { label: 'Wird registriert...', value: 'registering' },
            { label: 'Verifizierung ausstehend', value: 'pending_verification' },
            { label: '✅ Verifiziert', value: 'verified' },
            { label: '❌ Fehler', value: 'failed' },
          ],
          defaultValue: 'not_configured',
        },
        {
          name: 'verifiedAt',
          type: 'date',
        },
      ],
    },

    // =====================================================================
    // PROVISIONING LOGS
    // =====================================================================
    {
      name: 'provisioningLogs',
      type: 'array',
      label: 'Provisioning Logs',
      admin: {
        readOnly: true,
        condition: ({ req: { user } }) => user?.role === 'super-admin',
      },
      fields: [
        {
          name: 'timestamp',
          type: 'date',
          defaultValue: () => new Date(),
        },
        {
          name: 'service',
          type: 'select',
          options: ['resend', 'twilio', 'vercel', 'whatsapp'],
        },
        {
          name: 'action',
          type: 'text',
          admin: {
            description: 'e.g., "create_domain", "verify_dns", "buy_phone_number"',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: ['started', 'success', 'failed'],
        },
        {
          name: 'message',
          type: 'textarea',
        },
        {
          name: 'metadata',
          type: 'json',
        },
      ],
    },
  ],

  // =====================================================================
  // LIFECYCLE HOOKS - THE MAGIC HAPPENS HERE
  // =====================================================================
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Only trigger on update (not create)
        if (operation !== 'update') return doc

        const tenant = doc
        const previous = previousDoc

        // ================================================================
        // DOMAIN CHANGED - Trigger Email Domain Provisioning
        // ================================================================
        if (tenant.contactInfo?.domain !== previous.contactInfo?.domain) {
          const newDomain = tenant.contactInfo?.domain

          if (newDomain) {
            // Enqueue background job for email domain setup
            await req.payload.create({
              collection: 'background-jobs',
              data: {
                type: 'provision_email_domain',
                tenant: tenant.id,
                data: {
                  domain: newDomain,
                  subscriptionTier: tenant.subscriptionTier,
                },
                status: 'queued',
                priority: 'high',
              },
            })

            // Update status immediately
            await req.payload.update({
              collection: 'tenants',
              id: tenant.id,
              data: {
                'emailDomain.status': 'provisioning',
              },
            })
          }
        }

        // ================================================================
        // PHONE NUMBER CHANGED - Trigger Twilio Number Setup
        // ================================================================
        if (tenant.contactInfo?.phone !== previous.contactInfo?.phone) {
          const newPhone = tenant.contactInfo?.phone

          if (newPhone && tenant.features?.smsEnabled) {
            await req.payload.create({
              collection: 'background-jobs',
              data: {
                type: 'provision_phone_number',
                tenant: tenant.id,
                data: {
                  phone: newPhone,
                },
                status: 'queued',
                priority: 'high',
              },
            })

            await req.payload.update({
              collection: 'tenants',
              id: tenant.id,
              data: {
                'phoneNumber.status': 'provisioning',
              },
            })
          }
        }

        // ================================================================
        // WHATSAPP ENABLED - Trigger WhatsApp Business Setup
        // ================================================================
        if (
          tenant.features?.whatsappEnabled &&
          !previous.features?.whatsappEnabled
        ) {
          await req.payload.create({
            collection: 'background-jobs',
            data: {
              type: 'provision_whatsapp_business',
              tenant: tenant.id,
              data: {
                phone: tenant.contactInfo?.phone,
                businessName: tenant.companyName,
              },
              status: 'queued',
              priority: 'high',
            },
          })

          await req.payload.update({
            collection: 'tenants',
            id: tenant.id,
            data: {
              'whatsappBusiness.status': 'registering',
            },
          })
        }

        return doc
      },
    ],
  },
}
```

---

## Background Jobs Collection

```typescript
// src/payload/collections/BackgroundJobs.ts

export const BackgroundJobs: CollectionConfig = {
  slug: 'background-jobs',
  admin: {
    useAsTitle: 'type',
    defaultColumns: ['type', 'tenant', 'status', 'createdAt'],
    group: 'System',
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        'provision_email_domain',
        'verify_email_domain',
        'provision_phone_number',
        'provision_whatsapp_business',
        'provision_website_domain',
        'send_email',
        'send_sms',
        'analyze_review',
      ],
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
    },
    {
      name: 'data',
      type: 'json',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'queued',
      options: [
        { label: 'Queued', value: 'queued' },
        { label: 'Running', value: 'running' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Retrying', value: 'retrying' },
      ],
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: ['low', 'normal', 'high', 'urgent'],
    },
    {
      name: 'attempts',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'maxAttempts',
      type: 'number',
      defaultValue: 3,
    },
    {
      name: 'result',
      type: 'json',
      admin: {
        description: 'Result data from job execution',
      },
    },
    {
      name: 'error',
      type: 'textarea',
      admin: {
        condition: (data) => data.status === 'failed',
      },
    },
    {
      name: 'startedAt',
      type: 'date',
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'scheduledFor',
      type: 'date',
      admin: {
        description: 'Run job at specific time (optional)',
      },
    },
  ],
  timestamps: true,
}
```

---

## Provisioning Services

### 1. Email Domain Provisioning

```typescript
// src/lib/provisioning/email-domain.ts

import { Resend } from 'resend'
import type { Payload } from 'payload'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function provisionEmailDomain(
  payload: Payload,
  tenantId: string,
  domain: string,
  tier: string
) {
  try {
    // ================================================================
    // STEP 1: Determine sending domain
    // ================================================================
    const sendingDomain =
      tier === 'premium' || tier === 'enterprise'
        ? `emails.${domain}` // Dedicated domain for Premium/Enterprise
        : 'emails.fabig-suite.de' // Shared domain for Starter/Professional

    // Log start
    await logProvisioning(payload, tenantId, 'resend', 'create_domain', 'started', {
      domain: sendingDomain,
      tier,
    })

    // ================================================================
    // STEP 2: Create domain in Resend
    // ================================================================
    const { id, records } = await resend.domains.create({
      name: sendingDomain,
      region: 'eu-central-1', // GDPR compliance
    })

    // ================================================================
    // STEP 3: Save DNS records to database
    // ================================================================
    const dnsRecords = records.map((record) => ({
      type: record.type,
      name: record.name,
      value: record.value,
      priority: record.priority,
      status: 'pending',
    }))

    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: {
        'emailDomain.sendingDomain': sendingDomain,
        'emailDomain.resendDomainId': id,
        'emailDomain.status': 'pending_dns',
        'emailDomain.dnsRecords': dnsRecords,
      },
    })

    // ================================================================
    // STEP 4: Send setup instructions email
    // ================================================================
    const tenant = await payload.findByID({
      collection: 'tenants',
      id: tenantId,
    })

    await sendEmail({
      to: tenant.contactInfo.email,
      subject: 'Deine E-Mail-Domain ist fast bereit! 📧',
      template: 'email-domain-setup-instructions',
      data: {
        domain: sendingDomain,
        dnsRecords,
        setupGuideUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/setup/email-domain`,
      },
    })

    // ================================================================
    // STEP 5: Schedule verification job
    // ================================================================
    await payload.create({
      collection: 'background-jobs',
      data: {
        type: 'verify_email_domain',
        tenant: tenantId,
        data: { resendDomainId: id },
        status: 'queued',
        priority: 'normal',
        scheduledFor: new Date(Date.now() + 5 * 60 * 1000), // Check in 5 minutes
      },
    })

    // Log success
    await logProvisioning(payload, tenantId, 'resend', 'create_domain', 'success', {
      domainId: id,
      dnsRecords: dnsRecords.length,
    })

    return { success: true, domainId: id, dnsRecords }
  } catch (error) {
    // Log failure
    await logProvisioning(
      payload,
      tenantId,
      'resend',
      'create_domain',
      'failed',
      {},
      error.message
    )

    // Update tenant status
    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: {
        'emailDomain.status': 'failed',
        'emailDomain.errorMessage': error.message,
      },
    })

    throw error
  }
}

export async function verifyEmailDomain(
  payload: Payload,
  tenantId: string,
  resendDomainId: string
) {
  try {
    // ================================================================
    // STEP 1: Check domain status in Resend
    // ================================================================
    const domain = await resend.domains.get(resendDomainId)

    // ================================================================
    // STEP 2: Update DNS record statuses
    // ================================================================
    const tenant = await payload.findByID({
      collection: 'tenants',
      id: tenantId,
    })

    const updatedRecords = tenant.emailDomain.dnsRecords.map((record) => {
      const resendRecord = domain.records.find(
        (r) => r.name === record.name && r.type === record.type
      )
      return {
        ...record,
        status: resendRecord?.status === 'verified' ? 'verified' : 'pending',
      }
    })

    const allVerified = updatedRecords.every((r) => r.status === 'verified')

    // ================================================================
    // STEP 3: Update tenant status
    // ================================================================
    if (allVerified) {
      await payload.update({
        collection: 'tenants',
        id: tenantId,
        data: {
          'emailDomain.status': 'verified',
          'emailDomain.dnsRecords': updatedRecords,
          'emailDomain.verifiedAt': new Date(),
        },
      })

      // Send success email
      await sendEmail({
        to: tenant.contactInfo.email,
        subject: 'Deine E-Mail-Domain ist bereit! ✅',
        template: 'email-domain-verified',
        data: {
          domain: tenant.emailDomain.sendingDomain,
        },
      })

      await logProvisioning(
        payload,
        tenantId,
        'resend',
        'verify_domain',
        'success',
        {}
      )

      return { verified: true }
    } else {
      // Still pending - schedule next check
      await payload.update({
        collection: 'tenants',
        id: tenantId,
        data: {
          'emailDomain.status': 'verifying',
          'emailDomain.dnsRecords': updatedRecords,
          'emailDomain.lastCheckedAt': new Date(),
        },
      })

      // Schedule next verification in 15 minutes
      await payload.create({
        collection: 'background-jobs',
        data: {
          type: 'verify_email_domain',
          tenant: tenantId,
          data: { resendDomainId },
          status: 'queued',
          priority: 'normal',
          scheduledFor: new Date(Date.now() + 15 * 60 * 1000),
        },
      })

      return { verified: false, nextCheckIn: 15 }
    }
  } catch (error) {
    await logProvisioning(
      payload,
      tenantId,
      'resend',
      'verify_domain',
      'failed',
      {},
      error.message
    )
    throw error
  }
}

// Helper function
async function logProvisioning(
  payload: Payload,
  tenantId: string,
  service: string,
  action: string,
  status: 'started' | 'success' | 'failed',
  metadata: any,
  errorMessage?: string
) {
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: tenantId,
  })

  const logs = tenant.provisioningLogs || []

  await payload.update({
    collection: 'tenants',
    id: tenantId,
    data: {
      provisioningLogs: [
        ...logs,
        {
          timestamp: new Date(),
          service,
          action,
          status,
          message: errorMessage || `${action} ${status}`,
          metadata,
        },
      ],
    },
  })
}
```

---

### 2. Phone Number Provisioning

```typescript
// src/lib/provisioning/phone-number.ts

import twilio from 'twilio'
import type { Payload } from 'payload'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function provisionPhoneNumber(
  payload: Payload,
  tenantId: string,
  preferredAreaCode?: string
) {
  try {
    // ================================================================
    // STEP 1: Search for available phone numbers
    // ================================================================
    const availableNumbers = await client.availablePhoneNumbers('DE').local.list({
      areaCode: preferredAreaCode,
      smsEnabled: true,
      voiceEnabled: true,
      limit: 5,
    })

    if (availableNumbers.length === 0) {
      throw new Error('Keine verfügbaren Telefonnummern gefunden')
    }

    const selectedNumber = availableNumbers[0]

    // ================================================================
    // STEP 2: Purchase phone number
    // ================================================================
    const purchasedNumber = await client.incomingPhoneNumbers.create({
      phoneNumber: selectedNumber.phoneNumber,
      smsUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/twilio/sms`,
      smsMethod: 'POST',
      voiceUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/twilio/voice`,
      voiceMethod: 'POST',
      statusCallback: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/twilio/status`,
      statusCallbackMethod: 'POST',
    })

    // ================================================================
    // STEP 3: Update tenant with phone number details
    // ================================================================
    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: {
        'phoneNumber.twilioPhoneNumber': purchasedNumber.phoneNumber,
        'phoneNumber.twilioPhoneSid': purchasedNumber.sid,
        'phoneNumber.capabilities': {
          sms: purchasedNumber.capabilities.sms,
          voice: purchasedNumber.capabilities.voice,
          mms: purchasedNumber.capabilities.mms,
        },
        'phoneNumber.status': 'active',
        'phoneNumber.provisionedAt': new Date(),
      },
    })

    // ================================================================
    // STEP 4: Send confirmation email
    // ================================================================
    const tenant = await payload.findByID({
      collection: 'tenants',
      id: tenantId,
    })

    await sendEmail({
      to: tenant.contactInfo.email,
      subject: 'Deine Telefonnummer ist bereit! 📞',
      template: 'phone-number-provisioned',
      data: {
        phoneNumber: purchasedNumber.phoneNumber,
        capabilities: purchasedNumber.capabilities,
      },
    })

    await logProvisioning(
      payload,
      tenantId,
      'twilio',
      'buy_phone_number',
      'success',
      {
        phoneNumber: purchasedNumber.phoneNumber,
        sid: purchasedNumber.sid,
      }
    )

    return { success: true, phoneNumber: purchasedNumber.phoneNumber }
  } catch (error) {
    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: {
        'phoneNumber.status': 'failed',
        'phoneNumber.errorMessage': error.message,
      },
    })

    await logProvisioning(
      payload,
      tenantId,
      'twilio',
      'buy_phone_number',
      'failed',
      {},
      error.message
    )

    throw error
  }
}
```

---

## Job Processor (Trigger.dev)

```typescript
// src/trigger/provisioning-jobs.ts

import { eventTrigger, cronTrigger } from '@trigger.dev/sdk'
import { client } from '@/trigger'
import { payload } from '@/lib/payload'
import { provisionEmailDomain, verifyEmailDomain } from '@/lib/provisioning/email-domain'
import { provisionPhoneNumber } from '@/lib/provisioning/phone-number'

// ====================================================================
// EMAIL DOMAIN PROVISIONING JOB
// ====================================================================
export const provisionEmailDomainJob = client.defineJob({
  id: 'provision-email-domain',
  name: 'Provision Email Domain',
  version: '1.0.0',
  trigger: eventTrigger({ name: 'provision.email-domain' }),
  run: async (payload, io, ctx) => {
    const { tenantId, domain, tier } = payload

    await io.runTask('provision-domain', async () => {
      return await provisionEmailDomain(payload, tenantId, domain, tier)
    })

    return { success: true }
  },
})

// ====================================================================
// EMAIL DOMAIN VERIFICATION JOB (Cron)
// ====================================================================
export const verifyEmailDomainsJob = client.defineJob({
  id: 'verify-email-domains',
  name: 'Verify Email Domains (Cron)',
  version: '1.0.0',
  trigger: cronTrigger({
    cron: '*/15 * * * *', // Every 15 minutes
  }),
  run: async (payload, io, ctx) => {
    // Find all tenants with pending email domain verification
    const tenants = await io.runTask('find-pending-tenants', async () => {
      return await payload.find({
        collection: 'tenants',
        where: {
          'emailDomain.status': { in: ['pending_dns', 'verifying'] },
        },
      })
    })

    // Verify each domain
    for (const tenant of tenants.docs) {
      await io.runTask(`verify-${tenant.id}`, async () => {
        return await verifyEmailDomain(
          payload,
          tenant.id,
          tenant.emailDomain.resendDomainId
        )
      })
    }

    return { checked: tenants.docs.length }
  },
})

// ====================================================================
// PHONE NUMBER PROVISIONING JOB
// ====================================================================
export const provisionPhoneNumberJob = client.defineJob({
  id: 'provision-phone-number',
  name: 'Provision Phone Number',
  version: '1.0.0',
  trigger: eventTrigger({ name: 'provision.phone-number' }),
  run: async (payload, io, ctx) => {
    const { tenantId, areaCode } = payload

    await io.runTask('buy-phone-number', async () => {
      return await provisionPhoneNumber(payload, tenantId, areaCode)
    })

    return { success: true }
  },
})

// ====================================================================
// JOB PROCESSOR (Processes background-jobs collection)
// ====================================================================
export const processBackgroundJobs = client.defineJob({
  id: 'process-background-jobs',
  name: 'Process Background Jobs',
  version: '1.0.0',
  trigger: cronTrigger({
    cron: '* * * * *', // Every minute
  }),
  run: async (payload, io, ctx) => {
    // Find queued jobs
    const jobs = await io.runTask('find-queued-jobs', async () => {
      return await payload.find({
        collection: 'background-jobs',
        where: {
          status: { equals: 'queued' },
          attempts: { less_than_equal: { field: 'maxAttempts' } },
          or: [
            { scheduledFor: { exists: false } },
            { scheduledFor: { less_than_equal: new Date() } },
          ],
        },
        sort: 'priority,-createdAt',
        limit: 10,
      })
    })

    // Process each job
    for (const job of jobs.docs) {
      await io.runTask(`job-${job.id}`, async () => {
        try {
          // Update status to running
          await payload.update({
            collection: 'background-jobs',
            id: job.id,
            data: {
              status: 'running',
              startedAt: new Date(),
              attempts: job.attempts + 1,
            },
          })

          // Execute job based on type
          let result

          switch (job.type) {
            case 'provision_email_domain':
              result = await provisionEmailDomain(
                payload,
                job.tenant,
                job.data.domain,
                job.data.subscriptionTier
              )
              break

            case 'verify_email_domain':
              result = await verifyEmailDomain(
                payload,
                job.tenant,
                job.data.resendDomainId
              )
              break

            case 'provision_phone_number':
              result = await provisionPhoneNumber(
                payload,
                job.tenant,
                job.data.areaCode
              )
              break

            default:
              throw new Error(`Unknown job type: ${job.type}`)
          }

          // Mark as completed
          await payload.update({
            collection: 'background-jobs',
            id: job.id,
            data: {
              status: 'completed',
              completedAt: new Date(),
              result,
            },
          })
        } catch (error) {
          // Handle failure
          const shouldRetry = job.attempts < job.maxAttempts

          await payload.update({
            collection: 'background-jobs',
            id: job.id,
            data: {
              status: shouldRetry ? 'retrying' : 'failed',
              error: error.message,
              ...(shouldRetry && {
                // Retry with exponential backoff
                scheduledFor: new Date(
                  Date.now() + Math.pow(2, job.attempts) * 60 * 1000
                ),
              }),
            },
          })
        }
      })
    }

    return { processed: jobs.docs.length }
  },
})
```

---

## Admin UI - Setup Instructions Component

```tsx
// src/components/admin/EmailDomainSetup.tsx
'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, XCircle, Copy } from 'lucide-react'

export function EmailDomainSetupInstructions({ tenant }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="text-green-500" />
      case 'pending':
        return <Clock className="text-yellow-500" />
      case 'failed':
        return <XCircle className="text-red-500" />
    }
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg border">
      <div>
        <h3 className="text-lg font-semibold">E-Mail-Domain einrichten</h3>
        <p className="text-sm text-gray-600 mt-1">
          Füge diese DNS-Einträge bei deinem Domain-Provider hinzu
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        {getStatusIcon(tenant.emailDomain?.status)}
        <div>
          <div className="font-medium">
            Status: {getStatusLabel(tenant.emailDomain?.status)}
          </div>
          {tenant.emailDomain?.lastCheckedAt && (
            <div className="text-sm text-gray-500">
              Zuletzt geprüft:{' '}
              {new Date(tenant.emailDomain.lastCheckedAt).toLocaleString('de-DE')}
            </div>
          )}
        </div>
      </div>

      {/* DNS Records */}
      <div className="space-y-3">
        {tenant.emailDomain?.dnsRecords?.map((record, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-gray-50 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-1 bg-gray-200 rounded">
                  {record.type}
                </span>
                {getStatusIcon(record.status)}
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    `${record.type} ${record.name} ${record.value}`,
                    `record-${index}`
                  )
                }
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                {copied === `record-${index}` ? 'Kopiert!' : 'Kopieren'}
              </button>
            </div>

            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-500">Name/Host:</span>
                <code className="ml-2 font-mono bg-white px-2 py-1 rounded">
                  {record.name}
                </code>
              </div>
              <div>
                <span className="text-gray-500">Wert:</span>
                <code className="ml-2 font-mono bg-white px-2 py-1 rounded break-all">
                  {record.value}
                </code>
              </div>
              {record.priority && (
                <div>
                  <span className="text-gray-500">Priorität:</span>
                  <code className="ml-2 font-mono bg-white px-2 py-1 rounded">
                    {record.priority}
                  </code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Help Links */}
      <div className="pt-4 border-t">
        <p className="text-sm text-gray-600 mb-2">
          Benötigst Du Hilfe? Hier sind Anleitungen für beliebte Provider:
        </p>
        <div className="flex gap-2">
          <a
            href="/docs/dns-setup/godaddy"
            className="text-sm text-blue-600 hover:underline"
          >
            GoDaddy
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/docs/dns-setup/namecheap"
            className="text-sm text-blue-600 hover:underline"
          >
            Namecheap
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/docs/dns-setup/cloudflare"
            className="text-sm text-blue-600 hover:underline"
          >
            Cloudflare
          </a>
          <span className="text-gray-300">|</span>
          <a
            href="/docs/dns-setup/strato"
            className="text-sm text-blue-600 hover:underline"
          >
            Strato
          </a>
        </div>
      </div>
    </div>
  )
}

function getStatusLabel(status: string): string {
  const labels = {
    not_configured: 'Nicht konfiguriert',
    provisioning: 'Wird erstellt...',
    pending_dns: 'DNS-Konfiguration ausstehend',
    verifying: 'Wird geprüft...',
    verified: 'Verifiziert und aktiv ✅',
    failed: 'Fehler ❌',
  }
  return labels[status] || status
}
```

---

## Summary

This automated provisioning system provides:

1. ✅ **Single Source of Truth**: All settings in `Tenants` collection
2. ✅ **Automatic Provisioning**: Lifecycle hooks trigger setup workflows
3. ✅ **Background Processing**: Trigger.dev handles async jobs
4. ✅ **Status Tracking**: Real-time status updates
5. ✅ **Auto-Retry**: Failed jobs retry with exponential backoff
6. ✅ **User Notifications**: Email alerts for setup progress
7. ✅ **Admin Dashboard**: Visual setup instructions with copy-paste
8. ✅ **Audit Trail**: Provisioning logs for debugging

### Flow Example:

1. **User updates domain**: `bellaitalia.de`
2. **Lifecycle hook fires**: `afterChange` hook detects change
3. **Job queued**: `provision_email_domain` job created
4. **Background processor**: Picks up job within 1 minute
5. **Resend API**: Creates domain, generates DNS records
6. **Database updated**: Status → `pending_dns`, records saved
7. **User notified**: Email with setup instructions
8. **Cron verification**: Checks DNS every 15 minutes
9. **DNS verified**: Status → `verified`
10. **User notified**: "Your email domain is ready! ✅"

**Result**: Zero manual work. Tenant just enters their domain, system handles the rest!
