import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'industry', 'subscriptionTier', 'status'],
    group: 'System',
  },
  access: {
    // Only super admins can manage tenants
    create: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      // Users can only read their own tenant
      return {
        id: {
          equals: user?.tenant,
        },
      }
    },
    update: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
    delete: ({ req: { user } }) => {
      return user?.role === 'super-admin'
    },
  },
  fields: [
    // =========================================================================
    // BASIC INFORMATION
    // =========================================================================
    {
      name: 'companyName',
      type: 'text',
      required: true,
      label: 'Firmenname',
    },
    {
      name: 'industry',
      type: 'select',
      required: true,
      label: 'Branche',
      options: [
        // Handwerk (Trades)
        { label: 'Elektriker', value: 'electrician' },
        { label: 'Klempner', value: 'plumber' },
        { label: 'Tischler', value: 'carpenter' },
        { label: 'Maler', value: 'painter' },
        { label: 'Heizungsbauer', value: 'hvac' },
        { label: 'Dachdecker', value: 'roofer' },

        // Gastronomie
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Café', value: 'cafe' },
        { label: 'Bäckerei', value: 'bakery' },
        { label: 'Catering', value: 'catering' },

        // Beauty & Wellness
        { label: 'Friseursalon', value: 'hair_salon' },
        { label: 'Kosmetikstudio', value: 'beauty_salon' },
        { label: 'Nagelstudio', value: 'nail_salon' },
        { label: 'Massage', value: 'massage' },
        { label: 'Fitnessstudio', value: 'gym' },

        // Gesundheit
        { label: 'Arztpraxis', value: 'medical_practice' },
        { label: 'Zahnarzt', value: 'dental_practice' },
        { label: 'Physiotherapie', value: 'physiotherapy' },

        // Dienstleistungen
        { label: 'Reinigungsdienst', value: 'cleaning_service' },
        { label: 'Immobilienmakler', value: 'real_estate' },

        // Einzelhandel
        { label: 'Mode', value: 'fashion_retail' },
        { label: 'Lebensmittel', value: 'grocery' },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Subdomain',
      admin: {
        description: 'Wird verwendet für: {slug}.fabig-suite.de',
      },
    },

    // =========================================================================
    // CONTACT INFORMATION (Single Source of Truth for Automation)
    // =========================================================================
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
          validate: (value: string | null | undefined) => {
            if (!value) return true
            // E.164 format validation for international numbers
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
          validate: (value: string | null | undefined) => {
            if (!value) return true
            // Domain validation
            if (!value.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/)) {
              return 'Ungültiges Domain-Format (z.B. bellaitalia.de)'
            }
            return true
          },
          admin: {
            description:
              'Deine eigene Domain (z.B. bellaitalia.de). Wird automatisch für E-Mail und Website konfiguriert.',
          },
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      label: 'Adresse',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          label: 'Straße & Hausnummer',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'postalCode',
              type: 'text',
              required: true,
              label: 'PLZ',
            },
            {
              name: 'city',
              type: 'text',
              required: true,
              label: 'Stadt',
            },
          ],
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'Deutschland',
          label: 'Land',
        },
      ],
    },

    // =========================================================================
    // SUBSCRIPTION & BILLING
    // =========================================================================
    {
      name: 'subscriptionTier',
      type: 'select',
      required: true,
      defaultValue: 'starter',
      label: 'Abonnement',
      options: [
        { label: 'Starter (€299/mo)', value: 'starter' },
        { label: 'Professional (€499/mo)', value: 'professional' },
        { label: 'Premium (€799/mo)', value: 'premium' },
        { label: 'Enterprise (€2000+/mo)', value: 'enterprise' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      label: 'Status',
      options: [
        { label: 'Aktiv', value: 'active' },
        { label: 'Testphase', value: 'trial' },
        { label: 'Pausiert', value: 'paused' },
        { label: 'Gekündigt', value: 'cancelled' },
      ],
    },
    {
      name: 'trialEndsAt',
      type: 'date',
      label: 'Testphase endet am',
      admin: {
        condition: (data) => data.status === 'trial',
      },
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      label: 'Stripe Customer ID',
      admin: {
        readOnly: true,
      },
    },

    // =========================================================================
    // FEATURE FLAGS
    // =========================================================================
    {
      name: 'features',
      type: 'group',
      label: 'Features',
      fields: [
        {
          name: 'whatsappEnabled',
          type: 'checkbox',
          label: 'WhatsApp aktiviert',
          defaultValue: false,
        },
        {
          name: 'whatsappAIEnabled',
          type: 'checkbox',
          label: 'WhatsApp AI aktiviert',
          defaultValue: false,
          admin: {
            condition: (data) => data.features?.whatsappEnabled,
          },
        },
        {
          name: 'smsEnabled',
          type: 'checkbox',
          label: 'SMS aktiviert',
          defaultValue: false,
        },
        {
          name: 'customDomainEnabled',
          type: 'checkbox',
          label: 'Custom Domain aktiviert',
          defaultValue: false,
        },
      ],
    },

    // =========================================================================
    // CUSTOM DOMAIN
    // =========================================================================
    {
      name: 'customDomain',
      type: 'text',
      label: 'Custom Domain',
      admin: {
        condition: (data) => data.features?.customDomainEnabled,
        description: 'z.B. www.deine-firma.de',
      },
    },

    // =========================================================================
    // AUTOMATED EMAIL DOMAIN SETUP
    // =========================================================================
    {
      name: 'emailDomain',
      type: 'group',
      label: 'E-Mail Domain Setup',
      admin: {
        description: 'Automatisch konfiguriert basierend auf deiner Domain',
      },
      fields: [
        {
          name: 'sendingDomain',
          type: 'text',
          label: 'Versand-Domain',
          admin: {
            readOnly: true,
            description: 'z.B. emails.bellaitalia.de oder emails.fabig-suite.de (fallback)',
          },
        },
        {
          name: 'resendDomainId',
          type: 'text',
          label: 'Resend Domain ID',
          admin: {
            readOnly: true,
          },
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
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'dnsRecords',
          type: 'array',
          label: 'DNS-Einträge',
          admin: {
            description: 'Diese Einträge müssen beim Domain-Provider eingetragen werden',
            readOnly: true,
          },
          fields: [
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'TXT', value: 'TXT' },
                { label: 'CNAME', value: 'CNAME' },
                { label: 'MX', value: 'MX' },
              ],
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
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'lastCheckedAt',
          type: 'date',
          label: 'Zuletzt geprüft',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          label: 'Fehlermeldung',
          admin: {
            readOnly: true,
            condition: (data) => data.emailDomain?.status === 'failed',
          },
        },
      ],
    },

    // =========================================================================
    // AUTOMATED PHONE NUMBER SETUP
    // =========================================================================
    {
      name: 'phoneNumber',
      type: 'group',
      label: 'Telefonnummer Setup',
      admin: {
        description: 'Automatisch konfiguriert für SMS/Voice',
        condition: (data) => data.features?.smsEnabled,
      },
      fields: [
        {
          name: 'twilioPhoneNumber',
          type: 'text',
          label: 'Twilio Nummer',
          admin: {
            readOnly: true,
            description: 'Automatisch gekauft und konfiguriert',
          },
        },
        {
          name: 'twilioPhoneSid',
          type: 'text',
          label: 'Twilio Phone SID',
          admin: {
            readOnly: true,
          },
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
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'voice',
              type: 'checkbox',
              label: 'Anrufe',
              defaultValue: false,
              admin: {
                readOnly: true,
              },
            },
            {
              name: 'mms',
              type: 'checkbox',
              label: 'MMS',
              defaultValue: false,
              admin: {
                readOnly: true,
              },
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
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'provisionedAt',
          type: 'date',
          label: 'Bereitgestellt am',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'errorMessage',
          type: 'textarea',
          label: 'Fehlermeldung',
          admin: {
            readOnly: true,
            condition: (data) => data.phoneNumber?.status === 'failed',
          },
        },
      ],
    },

    // =========================================================================
    // AUTOMATED WHATSAPP BUSINESS API SETUP
    // =========================================================================
    {
      name: 'whatsappBusiness',
      type: 'group',
      label: 'WhatsApp Business Setup',
      admin: {
        description: 'Automatisch konfiguriert für WhatsApp-Nachrichten',
        condition: (data) => data.features?.whatsappEnabled,
      },
      fields: [
        {
          name: 'phoneNumberId',
          type: 'text',
          label: 'WhatsApp Phone Number ID',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'businessAccountId',
          type: 'text',
          label: 'WhatsApp Business Account ID',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'displayName',
          type: 'text',
          label: 'Anzeigename',
          admin: {
            readOnly: true,
          },
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
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'verifiedAt',
          type: 'date',
          label: 'Verifiziert am',
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    // =========================================================================
    // PROVISIONING LOGS
    // =========================================================================
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
        },
        {
          name: 'service',
          type: 'select',
          options: [
            { label: 'Resend', value: 'resend' },
            { label: 'Twilio', value: 'twilio' },
            { label: 'Vercel', value: 'vercel' },
            { label: 'WhatsApp', value: 'whatsapp' },
          ],
        },
        {
          name: 'action',
          type: 'text',
          admin: {
            description: 'e.g., create_domain, verify_dns, buy_phone_number',
          },
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Started', value: 'started' },
            { label: 'Success', value: 'success' },
            { label: 'Failed', value: 'failed' },
          ],
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

    // =========================================================================
    // METADATA
    // =========================================================================
    {
      name: 'metadata',
      type: 'group',
      label: 'Metadaten',
      admin: {
        condition: ({ req: { user } }) => user?.role === 'super-admin',
      },
      fields: [
        {
          name: 'onboardedAt',
          type: 'date',
          label: 'Onboarding abgeschlossen am',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'notes',
          type: 'textarea',
          label: 'Interne Notizen',
          admin: {
            description: 'Nur für Admins sichtbar',
          },
        },
      ],
    },
  ],
  timestamps: true,

  // ===========================================================================
  // LIFECYCLE HOOKS - AUTOMATED PROVISIONING MAGIC
  // ===========================================================================
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Only trigger on update (not create)
        if (operation !== 'update') return doc

        const tenant = doc
        const previous = previousDoc || {}

        // =====================================================================
        // DOMAIN CHANGED - Trigger Email Domain Provisioning
        // =====================================================================
        const domainChanged =
          tenant.contactInfo?.domain !== previous.contactInfo?.domain

        if (domainChanged && tenant.contactInfo?.domain) {
          console.warn(
            `[Provisioning] Domain changed for tenant ${tenant.id}: ${tenant.contactInfo.domain}`
          )

          // Update status immediately
          await req.payload.update({
            collection: 'tenants',
            id: tenant.id,
            data: {
              'emailDomain.status': 'provisioning',
            },
          })

          // TODO: Enqueue background job for email domain setup
          // This will be implemented with Trigger.dev in next step
          console.warn(
            `[Provisioning] Email domain provisioning queued for ${tenant.contactInfo.domain}`
          )
        }

        // =====================================================================
        // PHONE NUMBER CHANGED - Trigger Twilio Number Setup
        // =====================================================================
        const phoneChanged =
          tenant.contactInfo?.phone !== previous.contactInfo?.phone

        if (phoneChanged && tenant.contactInfo?.phone && tenant.features?.smsEnabled) {
          console.warn(
            `[Provisioning] Phone number changed for tenant ${tenant.id}: ${tenant.contactInfo.phone}`
          )

          await req.payload.update({
            collection: 'tenants',
            id: tenant.id,
            data: {
              'phoneNumber.status': 'provisioning',
            },
          })

          // TODO: Enqueue background job for phone number setup
          console.warn(
            `[Provisioning] Phone number provisioning queued for ${tenant.contactInfo.phone}`
          )
        }

        // =====================================================================
        // WHATSAPP ENABLED - Trigger WhatsApp Business Setup
        // =====================================================================
        const whatsappEnabled =
          tenant.features?.whatsappEnabled && !previous.features?.whatsappEnabled

        if (whatsappEnabled) {
          console.warn(`[Provisioning] WhatsApp enabled for tenant ${tenant.id}`)

          await req.payload.update({
            collection: 'tenants',
            id: tenant.id,
            data: {
              'whatsappBusiness.status': 'registering',
            },
          })

          // TODO: Enqueue background job for WhatsApp Business setup
          console.warn(`[Provisioning] WhatsApp Business provisioning queued`)
        }

        return doc
      },
    ],
  },
}
