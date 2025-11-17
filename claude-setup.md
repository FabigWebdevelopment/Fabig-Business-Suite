# LokalBoost - Enterprise SaaS Platform

## Project Overview

LokalBoost is a multi-tenant SaaS platform designed specifically for German local service businesses (electricians, plumbers, contractors with 5-20 employees). It serves as a GoHighLevel alternative, providing website builders, lead management, automated follow-ups, SMS/WhatsApp messaging, and review gathering in one integrated system.

### Business Model

- **Target Market**: German local businesses (Elektriker, Klempner, Handwerker)
- **Transition Goal**: From custom JavaScript projects (7,000-9,000€) to SaaS subscriptions (~500€/month)
- **Pricing Tiers**:
  - Basic: 299€/month (website + basic CRM + email automation)
  - Professional: 499€/month (+ SMS/WhatsApp + advanced automation)
  - Premium: 799€/month (+ white-label + custom domain + priority support)

### Core Value Proposition

- Simplified CRM using "Lead-Board" (Kanban-style) instead of complex CRM terminology
- Complete automation from lead capture to review generation
- Professional website templates optimized for local service businesses
- German-language first with proper localization

## Technical Architecture

### Core Stack

- **Framework**: Next.js 14+ (App Router)
- **CMS/Backend**: Payload CMS 3.0+ (native Next.js integration)
- **Database**: PostgreSQL with Drizzle ORM
- **UI Components**: shadcn/ui via Payblocks template
- **Multi-tenancy**: Payload Multi-Tenant Plugin (@payloadcms/plugin-multi-tenant)
- **Authentication**: Payload's built-in auth system
- **File Storage**: Payload cloud storage or S3-compatible
- **Email**: SendGrid (Managed Mode) or customer's own account (BYOA Mode)
- **SMS/WhatsApp**: Twilio (Managed Mode) or customer's own account (BYOA Mode)

### Architecture Decisions

#### Why Payload CMS?

- Native Next.js integration (runs in same process)
- Built-in multi-tenant plugin with tenant isolation
- Automatic admin UI generation
- Type-safe collections with TypeScript
- Flexible hooks system for automation
- White-labeling capabilities
- Local development friendly

#### Why Payblocks?

- 70+ pre-built shadcn/ui blocks
- Theme customization system
- Modern, professional aesthetic
- Mobile-responsive by default
- Dark/light mode support
- Copy-paste components approach

#### Multi-Tenancy Strategy

- **Tenant Isolation**: Each customer (electrician, plumber, etc.) is a separate tenant
- **Data Separation**: Using Payload's multi-tenant plugin with tenant field
- **Subdomain Structure**: `kunde-name.lokalboost.de` or custom domain
- **White-Label Admin**: Customers see custom-branded admin panels
- **Agency Dashboard**: Main dashboard at `app.lokalboost.de` for agency oversight

## Core Features

### 1. Website Builder

- **Template System**: Pre-built templates for specific industries
  - Electrician template (Elektriker)
  - Plumber template (Klempner)
  - General contractor template (Handwerker)
  - Roofer template (Dachdecker)
  - Painter template (Maler)
- **Customization**: Theme colors, fonts, logo, images via admin
- **Sections**: Hero, Services, About, Testimonials, Contact, Gallery
- **Forms**: Contact form with automatic lead capture
- **SEO**: Meta tags, structured data, sitemap generation
- **Performance**: Image optimization, lazy loading, Core Web Vitals

### 2. Lead-Board (Simplified CRM)

- **Kanban Columns**:
  - Neue Anfragen (New Inquiries)
  - Kontaktiert (Contacted)
  - Angebot erstellt (Quote Sent)
  - Gewonnen (Won)
  - Verloren (Lost)
- **Lead Card Information**:
  - Name, phone, email
  - Source (website form, manual entry, import)
  - Notes and timeline
  - Drag-and-drop between columns
- **Automation Triggers**: Moving leads triggers automated actions
- **No Complex CRM Features**: Focus on simplicity for small businesses

### 3. Automation System

- **Lead Capture Automation**:
  - Form submission → instant email/SMS confirmation
  - Assign to lead board automatically
  - Notify business owner via email/SMS
- **Follow-Up Sequences**:
  - Day 1: Thank you + next steps
  - Day 3: Follow-up if no response
  - Day 7: Last reminder before archiving
  - Customizable timing and content
- **Review Request Automation**:
  - Trigger after lead marked as "Won"
  - Wait X days (configurable, default 14)
  - Send review request via SMS/email
  - Include direct Google Business Profile link
- **SMS/WhatsApp Integration**:
  - Template-based messaging
  - Two-way conversations
  - Bulk messaging capabilities

### 4. Review Management

- **Google Business Profile Integration**:
  - Direct link generation for reviews
  - Review monitoring and notifications
  - Review display on website
- **Review Widget**: Embeddable widget for websites
- **Reputation Dashboard**: Track review metrics over time

### 5. White-Label System

- **Custom Branding**:
  - Customer's logo in admin panel
  - Custom color scheme
  - Custom domain (kunde-firmenname.de)
  - Remove LokalBoost branding (premium tier)
- **Customer Experience**: Looks like their own system, not a third-party tool

## Database Schema (Payload Collections)

### Core Collections

#### 1. Tenants Collection

```typescript
{
  slug: 'tenants',
  fields: [
    { name: 'name', type: 'text', required: true }, // Business name
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'domain', type: 'text' }, // Custom domain
    { name: 'industry', type: 'select', options: ['electrician', 'plumber', 'contractor', ...] },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    { name: 'primaryColor', type: 'text', defaultValue: '#0066cc' },
    { name: 'accentColor', type: 'text', defaultValue: '#ff6600' },
    { name: 'contactEmail', type: 'email' },
    { name: 'contactPhone', type: 'text' },
    { name: 'address', type: 'group', fields: [...] },
    { name: 'googleBusinessUrl', type: 'text' },
    { name: 'subscriptionTier', type: 'select', options: ['basic', 'professional', 'premium'] },
    { name: 'subscriptionStatus', type: 'select', options: ['active', 'canceled', 'paused'] },
    { name: 'emailProvider', type: 'select', options: ['managed', 'byoa'] },
    { name: 'smsProvider', type: 'select', options: ['managed', 'byoa'] },
    { name: 'sendgridApiKey', type: 'text' }, // If BYOA
    { name: 'twilioAccountSid', type: 'text' }, // If BYOA
    { name: 'twilioAuthToken', type: 'text' }, // If BYOA
    { name: 'twilioPhoneNumber', type: 'text' },
  ]
}
```

#### 2. Leads Collection

```typescript
{
  slug: 'leads',
  fields: [
    { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'phone', type: 'text', required: true },
    { name: 'status', type: 'select',
      options: ['new', 'contacted', 'quoted', 'won', 'lost'],
      defaultValue: 'new'
    },
    { name: 'source', type: 'select',
      options: ['website', 'manual', 'import', 'referral'],
      defaultValue: 'website'
    },
    { name: 'serviceInterest', type: 'text' }, // What service they need
    { name: 'projectDescription', type: 'textarea' },
    { name: 'estimatedValue', type: 'number' },
    { name: 'notes', type: 'textarea' },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text' }] },
    { name: 'lastContactedAt', type: 'date' },
    { name: 'assignedTo', type: 'relationship', relationTo: 'users' },
  ],
  hooks: {
    afterChange: [
      // Trigger automation when status changes
      // Send notifications
      // Update metrics
    ]
  }
}
```

#### 3. Timeline Collection

```typescript
{
  slug: 'timeline',
  fields: [
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true },
    { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
    { name: 'type', type: 'select',
      options: ['note', 'email', 'sms', 'call', 'status_change', 'automation'],
    },
    { name: 'description', type: 'textarea' },
    { name: 'createdBy', type: 'relationship', relationTo: 'users' },
    { name: 'metadata', type: 'json' }, // Additional data (email ID, SMS ID, etc.)
  ]
}
```

#### 4. Automation Templates Collection

```typescript
{
  slug: 'automation-templates',
  fields: [
    { name: 'tenant', type: 'relationship', relationTo: 'tenants' },
    { name: 'name', type: 'text', required: true },
    { name: 'trigger', type: 'select',
      options: ['lead_created', 'status_changed', 'days_after_won', 'manual'],
    },
    { name: 'conditions', type: 'json' }, // When to run this automation
    { name: 'actions', type: 'array',
      fields: [
        { name: 'type', type: 'select', options: ['email', 'sms', 'notification', 'webhook'] },
        { name: 'delay', type: 'number' }, // Minutes to wait
        { name: 'subject', type: 'text' },
        { name: 'body', type: 'richText' },
        { name: 'variables', type: 'json' }, // Available variables: {firstName}, {businessName}, etc.
      ]
    },
    { name: 'isActive', type: 'checkbox', defaultValue: true },
  ]
}
```

#### 5. Website Pages Collection

```typescript
{
  slug: 'pages',
  fields: [
    { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'template', type: 'select',
      options: ['home', 'services', 'about', 'contact', 'custom'],
    },
    { name: 'blocks', type: 'blocks',
      blocks: [
        // Hero block
        {
          slug: 'hero',
          fields: [
            { name: 'headline', type: 'text' },
            { name: 'subheadline', type: 'textarea' },
            { name: 'ctaText', type: 'text' },
            { name: 'ctaLink', type: 'text' },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
          ]
        },
        // Services block
        {
          slug: 'services',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'services', type: 'array',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'description', type: 'textarea' },
                { name: 'icon', type: 'select', options: ['wrench', 'zap', 'droplet', ...] },
              ]
            }
          ]
        },
        // Testimonials block
        // Contact form block
        // Gallery block
        // Custom HTML block
      ]
    },
    { name: 'seo', type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'keywords', type: 'text' },
      ]
    },
    { name: 'isPublished', type: 'checkbox', defaultValue: false },
  ]
}
```

#### 6. Reviews Collection

```typescript
{
  slug: 'reviews',
  fields: [
    { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads' },
    { name: 'reviewerName', type: 'text', required: true },
    { name: 'rating', type: 'number', required: true, min: 1, max: 5 },
    { name: 'reviewText', type: 'textarea' },
    { name: 'source', type: 'select', options: ['google', 'manual', 'import'] },
    { name: 'reviewUrl', type: 'text' }, // Link to Google review
    { name: 'displayOnWebsite', type: 'checkbox', defaultValue: true },
    { name: 'reviewDate', type: 'date' },
  ]
}
```

#### 7. Messages Collection

```typescript
{
  slug: 'messages',
  fields: [
    { name: 'tenant', type: 'relationship', relationTo: 'tenants', required: true },
    { name: 'lead', type: 'relationship', relationTo: 'leads', required: true },
    { name: 'type', type: 'select', options: ['email', 'sms', 'whatsapp'] },
    { name: 'direction', type: 'select', options: ['inbound', 'outbound'] },
    { name: 'subject', type: 'text' }, // For emails
    { name: 'body', type: 'textarea', required: true },
    { name: 'status', type: 'select',
      options: ['queued', 'sent', 'delivered', 'failed', 'bounced'],
      defaultValue: 'queued'
    },
    { name: 'externalId', type: 'text' }, // SendGrid/Twilio message ID
    { name: 'metadata', type: 'json' }, // Provider-specific data
  ]
}
```

## Implementation Priorities

### Phase 1: Foundation (Weeks 1-2)

1. Set up Next.js + Payload CMS project
2. Configure multi-tenant plugin
3. Implement core collections (Tenants, Users)
4. Set up authentication and tenant context
5. Create basic admin UI customization

### Phase 2: Website Builder (Weeks 3-4)

1. Integrate Payblocks components
2. Implement Pages collection with block system
3. Create industry-specific templates
4. Build theme customization system
5. Implement public-facing Next.js routes for websites
6. Add contact form with lead capture

### Phase 3: Lead-Board CRM (Weeks 5-6)

1. Build Leads collection and API
2. Create Kanban-style Lead-Board UI
3. Implement drag-and-drop functionality
4. Add Timeline/activity feed
5. Build lead detail view with notes
6. Implement search and filtering

### Phase 4: Automation System (Weeks 7-8)

1. Create Automation Templates collection
2. Build automation engine (trigger detection)
3. Implement email integration (SendGrid)
4. Implement SMS integration (Twilio)
5. Create automation template builder UI
6. Add default automation templates (welcome, follow-up, review request)

### Phase 5: Review Management (Week 9)

1. Build Reviews collection
2. Create review request automation
3. Build review widget for websites
4. Implement review display on pages
5. Add reputation dashboard

### Phase 6: White-Label & Polish (Weeks 10-11)

1. Implement custom domain support
2. Build white-label configuration
3. Create agency dashboard for multi-client management
4. Add analytics and reporting
5. Implement billing/subscription management
6. Security audit and performance optimization

### Phase 7: Testing & Launch (Week 12)

1. End-to-end testing with pilot customers
2. German language localization
3. Documentation and training materials
4. Launch preparation
5. Customer onboarding system

## Code Standards & Patterns

### TypeScript

- Use strict mode
- Define types for all collections
- Use Payload's generated types
- Prefer interfaces over types for object shapes

### Next.js Patterns

- Use App Router (not Pages Router)
- Server Components by default
- Client Components only when needed (interactivity, hooks)
- Implement proper error boundaries
- Use Suspense for loading states

### Component Structure

```
/components
  /admin        # Admin panel components
  /website      # Public website components
  /ui           # shadcn/ui components
  /blocks       # Payblocks components
  /forms        # Form components
  /lead-board   # CRM components
```

### Payload Patterns

- Use hooks for automation logic
- Implement access control at collection level
- Use field-level access control for sensitive data
- Leverage beforeChange/afterChange hooks
- Use virtual fields for computed data

### API Routes

- Use Payload's REST API where possible
- Create custom endpoints only when necessary
- Implement rate limiting
- Add proper error handling and validation

### Multi-Tenant Patterns

```typescript
// Always filter by tenant in queries
const leads = await payload.find({
  collection: "leads",
  where: {
    tenant: {
      equals: currentTenant.id,
    },
  },
});

// Use middleware to set tenant context
// Prevent cross-tenant data access
```

### Security Best Practices

- Encrypt sensitive credentials (API keys, tokens)
- Implement RBAC (Role-Based Access Control)
- Sanitize user inputs
- Use CSRF protection
- Implement rate limiting on public endpoints
- Regular security audits

## Email & SMS Infrastructure

### Managed Mode (Recommended for Start)

- **Email**: Master SendGrid account with subusers per tenant
- **SMS**: Master Twilio account with subaccounts per tenant
- **Pricing**: Include markup in subscription (managed cost + margin)
- **Pros**: Easier onboarding, immediate setup, agency control
- **Cons**: Higher cost for customers, deliverability concerns at scale

### BYOA Mode (Bring Your Own Account)

- **Email**: Customer provides SendGrid API key
- **SMS**: Customer provides Twilio credentials
- **Pricing**: Lower subscription, customer pays provider directly
- **Pros**: Better deliverability (own reputation), lower cost at scale
- **Cons**: More complex onboarding, requires customer technical setup

### Implementation

- Support both modes in Tenants collection
- Dynamic provider selection based on tenant settings
- Fallback to managed mode if BYOA credentials fail
- Dashboard to track usage and costs per tenant

## German Localization Requirements

### Language

- All UI text in German
- Professional terminology for trades (Handwerker)
- Use formal "Sie" form in customer communications
- Proper umlauts and special characters (ä, ö, ü, ß)

### Legal Compliance

- GDPR compliance (data protection, consent, deletion)
- Impressum and Datenschutz pages required
- Cookie consent banner
- Double opt-in for email marketing
- Right to data export/deletion

### Business Context

- Invoice templates with German tax format
- Support for German phone number formats
- Integration with German business directories
- German business hours and holidays

### Currency & Formatting

- Euro (€) currency
- German number format (1.234,56)
- Date format (DD.MM.YYYY)
- German address format

## Key Performance Indicators

### Technical KPIs

- Page load time < 2s
- Admin dashboard load < 1s
- API response time < 200ms
- 99.9% uptime
- Mobile responsiveness score > 95

### Business KPIs

- Customer onboarding time < 30 minutes
- Lead response time < 5 minutes (with automation)
- Review request response rate > 30%
- Customer retention rate > 90%
- NPS score > 50

## Development Environment Setup

```bash
# Initialize project
npx create-payload-app@latest
# Choose Next.js template with Postgres

# Install additional dependencies
npm install @payloadcms/plugin-multi-tenant
npm install @payloadcms/ui
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react
npm install @dnd-kit/core @dnd-kit/sortable  # For Kanban board
npm install date-fns  # Date manipulation
npm install twilio sendgrid  # Communication providers

# Environment variables (.env.local)
DATABASE_URI=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
SENDGRID_API_KEY=...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
```

## Deployment Architecture

### Production Setup

- **Hosting**: Vercel (Next.js optimized) or self-hosted
- **Database**: Managed PostgreSQL (Supabase, Neon, or AWS RDS)
- **File Storage**: S3-compatible storage
- **CDN**: Cloudflare or Vercel Edge Network
- **Email**: SendGrid (production account)
- **SMS**: Twilio (production account)
- **Monitoring**: Sentry for errors, Vercel Analytics for performance
- **Backups**: Automated daily database backups

### Scaling Considerations

- Horizontal scaling for Next.js instances
- Database read replicas for reporting
- Redis for caching and session management
- Queue system (BullMQ) for automation processing
- CDN for static assets and images

## Customer Onboarding Checklist

### Initial Setup

1. Create tenant account
2. Choose subscription tier
3. Select industry template
4. Configure business information
5. Upload logo and brand assets
6. Choose email/SMS provider mode
7. Configure custom domain (if applicable)

### Website Configuration

1. Customize color scheme
2. Add business photos
3. Edit page content
4. Configure contact form
5. Set up services list
6. Add team members (optional)
7. Publish website

### CRM Setup

1. Import existing leads (if any)
2. Configure automation templates
3. Set up review request timing
4. Train on Lead-Board usage
5. Test automation flow

### Go-Live

1. Connect custom domain
2. Set up Google Business Profile integration
3. Enable automations
4. Final testing
5. Launch!

## Support & Maintenance

### Customer Support Tiers

- **Basic**: Email support (48h response)
- **Professional**: Email + chat support (24h response)
- **Premium**: Priority support + dedicated account manager + phone support

### Maintenance Tasks

- Weekly database backups verification
- Monthly security updates
- Quarterly feature reviews with customers
- Annual infrastructure optimization

## Success Metrics (First 6 Months)

### Customer Acquisition

- **Month 1-2**: 5-10 pilot customers (discounted pricing)
- **Month 3-4**: 15-25 paying customers
- **Month 5-6**: 30-50 paying customers
- **Year 1 Goal**: 100+ active customers

### Revenue Targets

- **Month 3**: 7,500€ MRR (15 customers × 500€)
- **Month 6**: 20,000€ MRR (40 customers × 500€)
- **Year 1**: 50,000€ MRR (100 customers × 500€)
- **Break-even**: ~20-30 customers

### Product Metrics

- **Lead conversion**: 10% improvement for customers
- **Review generation**: 3x more reviews for customers
- **Time saved**: 10+ hours/month per customer
- **Customer satisfaction**: NPS > 50

## Additional Notes

### Competition Analysis

- GoHighLevel: More complex, US-focused, expensive
- HoneyBook: More freelancer-focused, less automation
- Dubsado: Similar complexity issues
- **Our Advantage**: Simplified for German market, trades-specific, better pricing

### Future Feature Ideas (Post-MVP)

- Mobile app for on-the-go lead management
- Appointment scheduling integration
- Invoice and quote generation
- Employee management for larger teams
- Advanced reporting and analytics
- API for third-party integrations
- Marketplace for add-ons and templates
- AI-powered lead scoring
- Voice AI for phone call automation
- Integration with German accounting software (DATEV, Lexoffice)

### Risk Mitigation

- **Technical**: Use proven stack (Payload, Next.js), avoid bleeding-edge tech
- **Business**: Start with pilot customers, validate before scaling
- **Legal**: Work with German lawyer for terms, GDPR compliance
- **Competition**: Focus on niche (local trades), German market
- **Churn**: Excellent onboarding, regular check-ins, prove ROI early

## Development Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start

# Database migrations
npm run payload migrate

# Generate types
npm run payload generate:types

# Seed initial data
npm run payload seed
```

## Project Success Definition

This project is successful when:

1. A local tradesman can onboard in < 30 minutes
2. Automated lead follow-up saves them 10+ hours/month
3. Review automation generates 3x more reviews
4. They happily pay 500€/month because ROI is obvious
5. They recommend it to other tradesmen
6. We maintain 90%+ customer retention
7. System runs reliably with minimal support burden

---

**Remember**: The goal is simplicity for the end customer. When in doubt, remove features rather than add them. A simple system that works beats a complex system that confuses users.
