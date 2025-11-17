# Fabig Business Suite - Development Roadmap
**Version:** 1.0
**Created:** November 17, 2025
**Target Launch:** February 2025 (12 weeks)
**Status:** Week 1 - Foundation Phase

---

## 🎯 **End Goal: What We're Building**

A **multi-tenant SaaS platform** for German local businesses featuring:
- ✅ Multi-tenant architecture (isolated data per customer)
- ✅ Website Builder with industry templates
- ✅ Lead-Board CRM (simplified Kanban)
- ✅ WhatsApp AI Assistant (24/7 automated conversations) ⭐ **KILLER FEATURE**
- ✅ Automation System (email/SMS/WhatsApp follow-ups)
- ✅ Review Management (Google Business Profile)
- ✅ White-label capabilities (custom domains, branding)

**Revenue Target:** €299-€799/month per customer (Premium tier most popular)
**Target Market:** German local businesses (Handwerk, Gastronomie, Beauty, etc.)
**Margin on WhatsApp AI:** 96%+ (€399/mo charge vs €10-15/mo cost)

---

## 🏗️ **Architecture Principles (Keep in Mind Always)**

### 1. **Multi-Tenancy First**
Every feature must support:
- Data isolation (tenant-scoped queries)
- Custom branding per tenant
- Usage limits per subscription tier
- Tenant-specific configurations

**Why This Matters**: WhatsApp AI settings, automation rules, email templates must be tenant-specific.

### 2. **Service-Oriented**
Never call Payload API directly in routes:
```typescript
// ❌ WRONG - Direct Payload in route
await payload.create({ collection: 'leads', data })

// ✅ RIGHT - Service layer
await leadsService.createLead(data, tenantId)
```

**Why This Matters**: WhatsApp AI will trigger lead creation, automation will trigger emails, webhooks will trigger SMS. Services orchestrate these.

### 3. **Event-Driven for Automation**
Actions trigger events → Events trigger automations:
```typescript
// Lead created → Check automation rules → Send WhatsApp message
// Lead status changed → Log timeline → Notify assigned user
// Review received → Check if >4 stars → Request to share on social
```

**Why This Matters**: Automation system depends on reliable event hooks.

### 4. **Extensible Storage**
- Images/PDFs: Tenant-scoped cloud storage (Vercel Blob or S3)
- Never store files locally (serverless!)
- Support future: Voice messages, AI-generated images, videos

**Why This Matters**: WhatsApp AI Enterprise will handle voice messages and image recognition.

### 5. **Queue-Based Jobs**
Long-running tasks (sending 100 emails, WhatsApp AI training) must use job queues:
```typescript
// ❌ WRONG - Block HTTP request for 30 seconds
await sendEmailToAllCustomers()

// ✅ RIGHT - Queue job
await jobQueue.add('send-bulk-email', { campaignId })
```

**Why This Matters**: Serverless functions timeout at 10-60 seconds.

---

## 📅 **Phased Development Plan**

### **PHASE 0: Foundation (Week 1) - CURRENT**
**Goal**: Get admin panel working locally and in production, create first tenant

#### Deliverables
- [x] Local development environment working
- [x] PostgreSQL database connected
- [x] Payload admin panel loads
- [ ] Production deployment successful
- [ ] First super-admin user created
- [ ] First tenant created via admin panel

#### Collections (Minimal)
```typescript
Tenants {
  companyName, slug, industry
  contactInfo { email, phone, address }
  subscription { tier, status }
}

Users {
  firstName, lastName, email, password
  tenant (relationship)
  role (super-admin | admin | user)
}

Media {
  filename, mimeType, url
  tenant (relationship)
}
```

#### Critical Decisions
- ✅ PostgreSQL (not MongoDB) - supports complex queries for CRM
- ✅ Manual tenant field (not multi-tenant plugin) - full control
- ✅ Migrations for production (not auto-push) - safe deployments
- ✅ Service layer abstraction - future-proof

#### Architecture for Future
- Tenant field on every collection → Multi-tenancy ready
- Service pattern established → Easy to add automation
- Access control helpers → Secure by default

---

### **PHASE 1: Website Builder (Weeks 2-3)**
**Goal**: Tenants can create professional websites with templates

#### Deliverables
- [ ] Pages collection with block system
- [ ] 3 basic blocks (Hero, Services, Contact Form)
- [ ] 1 industry template (Electrician)
- [ ] Public route rendering (/{tenantSlug}/{pageSlug})
- [ ] Tenant subdomain routing (tenant.fabig-suite.de)

#### New Collections
```typescript
Pages {
  tenant (relationship)
  title, slug
  blocks (polymorphic)
  isPublished, publishedAt
  seo { title, description, keywords }
}

Blocks {
  Hero { headline, subtitle, backgroundImage, ctaButton }
  Services { title, services[] { name, description, icon } }
  ContactForm { headline, submitEndpoint }
  // More blocks added incrementally
}
```

#### Critical Architecture
**Tenant Routing Middleware**:
```typescript
// src/middleware.ts
export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host')

  // fabig-suite.de → Admin/marketing site
  // tenant.fabig-suite.de → Tenant's public website
  // tenant.customdomain.com → Custom domain (later)

  if (isAdminDomain(hostname)) {
    return NextResponse.next() // Admin panel
  }

  const tenantSlug = extractTenantSlug(hostname)
  const tenant = await resolveTenant(tenantSlug)

  // Pass tenant to page via headers
  req.headers.set('x-tenant-id', tenant.id)
  req.headers.set('x-tenant-slug', tenant.slug)

  return NextResponse.rewrite(new URL(`/site/${tenant.slug}${req.nextUrl.pathname}`, req.url))
}
```

**Why This Matters**:
- WhatsApp AI will send links to pages: `{tenant}.fabig-suite.de/booking`
- Contact forms will create leads for correct tenant
- SEO metadata must be tenant-specific

#### Block System Design
Use Payload's native blocks (not a custom system):
```typescript
{
  name: 'blocks',
  type: 'blocks',
  blocks: [HeroBlock, ServicesBlock, ContactFormBlock]
}
```

**Future-proofing**:
- `ContactFormBlock` will integrate with Leads collection (Phase 2)
- `BookingBlock` will integrate with WhatsApp AI (Phase 5)
- `ReviewsBlock` will integrate with Review Management (Phase 4)

#### Templates Strategy
Create template presets as JSON:
```typescript
// src/lib/templates/electrician.template.ts
export const electricianTemplate = {
  pages: [
    {
      title: 'Startseite',
      slug: 'home',
      blocks: [
        { type: 'hero', data: { headline: 'Ihr Elektriker in...' } },
        { type: 'services', data: { ... } },
        { type: 'contact-form', data: { ... } }
      ]
    },
    { title: 'Leistungen', slug: 'leistungen', blocks: [...] },
    { title: 'Kontakt', slug: 'kontakt', blocks: [...] }
  ]
}
```

Apply template on tenant creation:
```typescript
// tenantsService.provisionTenant()
const template = getTemplateForIndustry(data.industry)
await this.createPagesFromTemplate(tenant, template)
```

**Why This Matters**:
- Fast onboarding (<30 min goal in CLAUDE.md)
- Industry-specific → Looks professional immediately
- WhatsApp AI can reference page URLs in responses

---

### **PHASE 2: Lead-Board CRM (Weeks 4-5)**
**Goal**: Capture leads from website, manage in Kanban view

#### Deliverables
- [ ] Leads collection with statuses
- [ ] Lead capture from contact forms
- [ ] Drag-and-drop Kanban board (dnd-kit)
- [ ] Lead detail view with timeline
- [ ] Manual lead creation

#### New Collections
```typescript
Leads {
  tenant (relationship)

  // Contact info
  firstName, lastName, email, phone
  company, position

  // Lead data
  source (website | manual | whatsapp | referral)
  status (new | contacted | quoted | won | lost)
  estimatedValue
  serviceInterest
  projectDescription

  // Relationships
  assignedTo (relationship: Users)

  // Metadata
  lastContactedAt
  createdAt, updatedAt
}

Timeline {
  tenant (relationship)
  lead (relationship)

  type (note | call | email | sms | whatsapp | status_change)
  description
  metadata (JSON) // Call duration, email subject, etc.

  createdBy (relationship: Users)
  createdAt
}
```

#### Critical Architecture
**Lead Sources**:
- Website contact forms → `source: 'website'`
- Manual entry → `source: 'manual'`
- WhatsApp AI conversations → `source: 'whatsapp'` (Phase 5)
- Email replies → `source: 'email'` (Phase 3)

**Timeline Integration**:
Every action creates timeline entry:
```typescript
// leadService.updateStatus()
await payload.create({
  collection: 'timeline',
  data: {
    tenant: lead.tenant,
    lead: lead.id,
    type: 'status_change',
    description: `Status changed from ${oldStatus} to ${newStatus}`,
    createdBy: req.user.id
  }
})
```

**Why This Matters**:
- Timeline becomes audit log
- WhatsApp AI conversations will appear in timeline
- Automation can check "last contact >7 days ago" for follow-ups

#### Lead-Board UI
**Technology**: `@dnd-kit/core` for drag-and-drop
**Columns**:
- Neue Anfragen (new)
- Kontaktiert (contacted)
- Angebot erstellt (quoted)
- Gewonnen (won)
- Verloren (lost)

**Future-proofing**:
- Custom columns per tenant (later)
- Automation triggers on column moves
- WhatsApp AI can suggest moving leads

---

### **PHASE 3: Basic Automation (Weeks 6-7)**
**Goal**: Send email follow-ups automatically based on rules

#### Deliverables
- [ ] AutomationTemplates collection
- [ ] Trigger system (lead created, status changed)
- [ ] Email sending (Resend integration)
- [ ] Variable replacement in templates
- [ ] Manual trigger test

#### New Collections
```typescript
AutomationTemplates {
  tenant (relationship)

  name
  trigger (lead_created | lead_status_changed | lead_inactive_7days)
  conditions (JSON) // e.g., { status: 'quoted', estimatedValue: { gte: 5000 } }

  actions[] {
    type (send_email | send_sms | create_task | notify_user)
    delay (minutes)
    config (JSON) // Email template, recipient, etc.
  }

  isActive
}

Messages {
  tenant (relationship)
  lead (relationship)

  type (email | sms | whatsapp)
  direction (inbound | outbound)

  subject, body
  status (queued | sent | delivered | failed | bounced)

  sentAt, deliveredAt
  errorMessage
}
```

#### Architecture
**Job Queue** (use Vercel KV + BullMQ or Inngest):
```typescript
// automation.service.ts
async triggerAutomations(event: 'lead_created', data: Lead) {
  const templates = await this.findMatchingTemplates(event, data)

  for (const template of templates) {
    for (const action of template.actions) {
      await jobQueue.add('execute-automation-action', {
        templateId: template.id,
        actionId: action.id,
        leadId: data.id,
        tenantId: data.tenant
      }, {
        delay: action.delay * 60 * 1000 // Convert minutes to ms
      })
    }
  }
}
```

**Email Integration** (Resend):
```typescript
// email.service.ts
async sendEmail(to: string, subject: string, html: string, tenantId: string) {
  const tenant = await getTenant(tenantId)

  const result = await resend.emails.send({
    from: tenant.contactInfo.email || 'noreply@fabig-suite.de',
    to,
    subject,
    html: this.replaceVariables(html, { tenant, ...data })
  })

  // Log to Messages collection
  await payload.create({
    collection: 'messages',
    data: {
      tenant: tenantId,
      lead: leadId,
      type: 'email',
      direction: 'outbound',
      subject, body: html,
      status: result.error ? 'failed' : 'sent'
    }
  })
}
```

**Why This Matters**:
- SMS and WhatsApp will use same job queue pattern
- WhatsApp AI conversations logged in Messages collection
- Automation becomes foundation for WhatsApp AI triggers

#### Variable Replacement
```typescript
// Variable syntax: {variable}
// Example: "Hallo {firstName}, vielen Dank für deine Anfrage..."

const variables = {
  // Lead data
  firstName, lastName, email, phone, company, serviceInterest

  // Tenant data
  companyName, ownerName, phone, email, address

  // Meta
  currentDate, currentTime
}
```

---

### **PHASE 4: Review Management (Weeks 8-9)**
**Goal**: Request and display Google reviews automatically

#### Deliverables
- [ ] Reviews collection
- [ ] Review request automation (won leads → request after 7 days)
- [ ] Google Business Profile integration
- [ ] Review display block for website
- [ ] Review request email template

#### New Collections
```typescript
Reviews {
  tenant (relationship)
  lead (relationship) // Optional - if review came from lead

  // Review data
  authorName
  rating (1-5)
  text
  source (google | manual)

  // Google Business Profile data
  externalId
  reviewUrl
  createdAt

  // Moderation
  isPublished
  moderatedBy (relationship: Users)
}
```

#### Google Business Profile Integration
**API**: Google My Business API
**Flow**:
1. Tenant connects Google account (OAuth)
2. System fetches new reviews daily (cron job)
3. Auto-publish reviews ≥4 stars
4. Manual moderation for <4 stars

**Review Request Automation**:
```typescript
// Trigger: Lead status = 'won', 7 days later
{
  trigger: 'lead_won_after_7_days',
  actions: [
    {
      type: 'send_email',
      template: 'review-request',
      delay: 10080 // 7 days in minutes
    }
  ]
}
```

**Email Template**:
```html
Hallo {firstName},

vielen Dank für Ihr Vertrauen in {companyName}!

Wir würden uns sehr über eine Bewertung auf Google freuen:
{reviewLink}

Herzliche Grüße,
{ownerName}
```

**Why This Matters**:
- Social proof on website
- WhatsApp AI can mention positive reviews ("Wir haben 4.8⭐ auf Google!")
- Automation increases review count (key metric for local businesses)

---

### **PHASE 5: WhatsApp AI Assistant (Weeks 10-11) ⭐ KILLER FEATURE**
**Goal**: AI handles 70-80% of WhatsApp conversations automatically

#### Deliverables
- [ ] WhatsApp Business API integration (Meta)
- [ ] OpenAI integration for conversations
- [ ] Conversation management (threads)
- [ ] AI function calling (book appointment, create lead, get pricing)
- [ ] Human handoff when needed
- [ ] Conversation display in admin

#### New Collections
```typescript
WhatsAppConversations {
  tenant (relationship)
  lead (relationship) // Auto-created if doesn't exist

  customerPhone
  customerName (detected from messages)

  status (active | resolved | handed_off_to_human)
  handedOffTo (relationship: Users)

  // AI context
  summary (AI-generated summary of conversation)
  intent (inquiry | booking | complaint | pricing)

  createdAt, updatedAt, closedAt
}

WhatsAppMessages {
  tenant (relationship)
  conversation (relationship)

  direction (inbound | outbound)
  sender (customer | ai | user)

  content { text?, imageUrl?, voiceUrl?, documentUrl? }

  // AI metadata
  aiModel (gpt-4o-mini, gpt-4o)
  aiTokensUsed
  functionsCalled[] // e.g., ['check_availability', 'create_lead']

  sentAt
}

AIKnowledgeBase {
  tenant (relationship)

  category (services | pricing | hours | location | faq)
  question
  answer

  isActive
  priority // Higher priority = AI uses first
}
```

#### Architecture
**WhatsApp Business API Setup**:
1. Tenant applies for WhatsApp Business Account (Meta)
2. We provision phone number (or tenant uses existing)
3. Webhook routes messages to our system

**Webhook Flow**:
```typescript
// src/app/api/webhooks/whatsapp/route.ts
export async function POST(req: Request) {
  const { from, body, tenant_phone } = await req.json()

  // 1. Resolve tenant from phone number
  const tenant = await resolveTenantByPhone(tenant_phone)

  // 2. Find or create conversation
  const conversation = await findOrCreateConversation(tenant.id, from)

  // 3. Save incoming message
  await payload.create({
    collection: 'whatsapp-messages',
    data: {
      tenant: tenant.id,
      conversation: conversation.id,
      direction: 'inbound',
      sender: 'customer',
      content: { text: body }
    }
  })

  // 4. Queue AI response (don't block webhook!)
  await jobQueue.add('whatsapp-ai-respond', {
    conversationId: conversation.id,
    messageText: body
  })

  return Response.json({ success: true })
}
```

**AI Response Logic**:
```typescript
// whatsappAI.service.ts
async generateResponse(conversation: Conversation, messageText: string) {
  const tenant = await getTenant(conversation.tenant)
  const lead = await getLead(conversation.lead)

  // Build context
  const knowledgeBase = await getKnowledgeBase(tenant.id)
  const conversationHistory = await getMessages(conversation.id, limit: 20)

  const systemPrompt = `
    Du bist der AI-Assistent für ${tenant.companyName}.

    Firmeninfos:
    - Branche: ${tenant.industry}
    - Telefon: ${tenant.contactInfo.phone}
    - Adresse: ${tenant.contactInfo.address}

    Services: ${tenant.services}
    Öffnungszeiten: ${tenant.businessHours}

    Wissensdatenbank:
    ${formatKnowledgeBase(knowledgeBase)}

    WICHTIG:
    - Sei freundlich und professionell
    - Verwende "Du" (informal)
    - Wenn du unsicher bist, empfehle einen Rückruf
    - Nutze Funktionen für Termine, Lead-Erstellung, etc.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini', // Fast + cheap for most conversations
    messages: [
      { role: 'system', content: systemPrompt },
      ...formatHistory(conversationHistory),
      { role: 'user', content: messageText }
    ],
    functions: [
      {
        name: 'create_lead',
        description: 'Create a new lead when customer shows interest',
        parameters: {
          firstName: string,
          lastName: string,
          serviceInterest: string,
          projectDescription: string
        }
      },
      {
        name: 'check_availability',
        description: 'Check if a time slot is available for booking',
        parameters: {
          date: string,
          time: string
        }
      },
      {
        name: 'hand_off_to_human',
        description: 'Escalate to human when AI cannot help',
        parameters: {
          reason: string
        }
      }
    ],
    function_call: 'auto'
  })

  // Handle function calls
  if (response.choices[0].message.function_call) {
    await this.executeFunctionCall(response.choices[0].message.function_call, conversation)
  }

  // Send AI response via WhatsApp
  await whatsappAPI.sendMessage(conversation.customerPhone, {
    text: response.choices[0].message.content
  })

  // Log outbound message
  await payload.create({
    collection: 'whatsapp-messages',
    data: {
      tenant: tenant.id,
      conversation: conversation.id,
      direction: 'outbound',
      sender: 'ai',
      content: { text: response.choices[0].message.content },
      aiModel: 'gpt-4o-mini',
      aiTokensUsed: response.usage.total_tokens,
      functionsCalled: response.choices[0].message.function_call ? [response.choices[0].message.function_call.name] : []
    }
  })
}
```

**Auto Lead Creation**:
When AI detects interest, it calls `create_lead` function:
```typescript
async createLeadFromWhatsApp(conversation: Conversation, data: any) {
  const lead = await leadsService.createLead({
    tenant: conversation.tenant,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: conversation.customerPhone,
    source: 'whatsapp',
    serviceInterest: data.serviceInterest,
    projectDescription: data.projectDescription,
    status: 'new'
  })

  // Link conversation to lead
  await payload.update({
    collection: 'whatsapp-conversations',
    id: conversation.id,
    data: { lead: lead.id }
  })

  // Notify tenant admin
  await notificationService.notify(conversation.tenant, {
    type: 'new_lead_from_whatsapp',
    leadId: lead.id
  })
}
```

**Why This Matters**:
- 24/7 availability → Never miss an inquiry
- Instant responses → Better customer experience
- Auto-qualification → Only hot leads reach human
- Logged conversations → Complete audit trail
- 96%+ margin → High-profit feature

#### Cost Management
**Per Conversation**:
- Customer message inbound: ~0.005 EUR (WhatsApp API)
- AI response generation: ~0.002 EUR (GPT-4o-mini, ~500 tokens)
- AI message outbound: ~0.005 EUR (WhatsApp API)
- **Total per message exchange: ~0.012 EUR**

**Premium Tier**: €399/mo = 1000 AI conversations included
- 1000 conversations × ~5 exchanges each = 5000 message pairs
- Cost: 5000 × 0.012 = 60 EUR
- **Gross Margin: €339 (85%)**

Actually even better than 96% once we account for infrastructure, but still excellent.

---

### **PHASE 6: Polish & Launch (Week 12)**
**Goal**: Production-ready with 2 pilot customers

#### Deliverables
- [ ] SMS integration (Twilio)
- [ ] White-label settings (remove "Powered by Fabig")
- [ ] Custom domain setup guide
- [ ] Billing integration (Stripe)
- [ ] Onboarding wizard
- [ ] Help documentation
- [ ] Performance optimization
- [ ] Security audit
- [ ] Backup strategy
- [ ] Monitoring & alerts

#### Billing Integration
```typescript
Subscriptions {
  tenant (relationship)

  stripeCustomerId
  stripeSubscriptionId

  tier (starter | professional | premium | enterprise)
  status (active | trial | past_due | cancelled)

  currentPeriodStart, currentPeriodEnd
  trialEndsAt
  cancelledAt

  // Usage tracking
  usageThisMonth {
    whatsappConversations
    emailsSent
    smsSent
    storageUsedMB
  }
}
```

**Stripe Webhooks**:
- `invoice.payment_succeeded` → Activate subscription
- `invoice.payment_failed` → Mark past_due, send reminder
- `customer.subscription.deleted` → Mark cancelled, disable tenant

#### White-Label
```typescript
// Tenant settings
whiteLabelSettings {
  removePoweredBy (Enterprise only)
  customLoginLogo
  customEmailFooter
  customFavicon
}
```

#### Launch Checklist
- [ ] 2 pilot customers onboarded
- [ ] Feedback collected and incorporated
- [ ] All features tested end-to-end
- [ ] Performance: <2s page load
- [ ] Uptime monitoring active
- [ ] Error tracking (Sentry) configured
- [ ] Backup tested (restore from backup successful)
- [ ] Security: No XSS, SQL injection, CSRF vulnerabilities
- [ ] GDPR: Privacy policy, data deletion flow
- [ ] Legal: Terms of service, Impressum, Datenschutz

---

## 🔧 **Technical Decisions Reference**

### Database Schema Principles
1. **Every collection has `tenant` field** (except Tenants, Media exceptions)
2. **Use relationships, not embedding** (easier to query, update)
3. **Index frequently queried fields** (tenant, status, createdAt)
4. **Soft deletes** (add `deletedAt` field, don't actually delete)

### API Design
1. **Service layer for all business logic** (no direct Payload in routes)
2. **Validate input with Zod schemas**
3. **Return consistent response format**:
   ```typescript
   { success: boolean, data?: any, error?: string }
   ```
4. **Use HTTP status codes correctly** (200, 201, 400, 401, 403, 404, 500)

### Security
1. **Never trust client-provided tenant IDs** (always from session)
2. **Validate all input** (SQL injection, XSS prevention)
3. **Rate limit public endpoints** (contact forms, login)
4. **Encrypt sensitive data** (API keys, tokens)
5. **HTTPS only in production**

### Performance
1. **Paginate all list queries** (limit: 50 default)
2. **Cache static data** (templates, industry lists)
3. **Optimize images** (Next.js Image component)
4. **Database connection pooling** (max 20 connections)
5. **CDN for static assets**

### Testing
1. **Integration tests for critical flows** (tenant creation, lead capture, automation)
2. **E2E tests for user journeys** (onboarding, creating page, sending email)
3. **Manual testing checklist before each deployment**
4. **Test with real data** (10-100 leads, realistic content)

---

## 📊 **Success Metrics**

### Technical Metrics
- **Uptime**: >99.9%
- **Page Load**: <2s (95th percentile)
- **API Response**: <200ms (median)
- **Database Query**: <50ms (median)
- **Error Rate**: <0.1%

### Business Metrics
- **Onboarding Time**: <30 minutes (goal from CLAUDE.md)
- **Time to First Lead**: <24 hours
- **WhatsApp AI Response Time**: <5 seconds
- **Automation Trigger Success Rate**: >95%
- **Customer Retention (Month 1-3)**: >90%

### Usage Metrics per Tenant
- **Website Page Views**: 100-1000/month
- **Leads Captured**: 10-50/month
- **WhatsApp Conversations**: 20-100/month
- **Emails Sent (Automation)**: 50-200/month
- **Reviews Requested**: 5-20/month

---

## 🚨 **Risk Mitigation**

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Vercel cold starts slow | High | Use edge functions, optimize bundle size |
| Database connection limits | High | Connection pooling, read replicas |
| WhatsApp API rate limits | Medium | Queue messages, implement backoff |
| OpenAI API downtime | High | Fallback to simpler responses, cache common Q&A |
| Multi-tenant data leak | Critical | Thorough testing, row-level security, access control review |

### Business Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Low adoption of WhatsApp AI | Critical | Start with manual WhatsApp + show ROI, then upsell AI |
| Customers churn after trial | High | Strong onboarding, dedicated support, quick wins |
| Competitors copy idea | Medium | Focus on German market, personal brand (Thomas Fabig) |
| Regulatory changes (WhatsApp, GDPR) | Medium | Legal review, stay updated on regulations |

---

## ✅ **Definition of Done (Each Phase)**

### Phase Complete When:
1. All deliverables checked off
2. Local testing passed
3. Staging deployment successful
4. Manual testing by developer
5. Performance metrics within targets
6. No critical bugs
7. Documentation updated
8. Git commits clean and descriptive

### Launch Ready When:
1. All 6 phases complete
2. 2 pilot customers using system successfully
3. Positive feedback from pilots
4. All critical and high-priority bugs fixed
5. Backup and restore tested
6. Monitoring and alerting active
7. Legal documents (Terms, Privacy) published
8. Payment processing working end-to-end

---

## 📝 **Next Steps (Immediate)**

### This Week (Week 1)
1. ✅ Fix local admin panel (done)
2. [ ] Fix production deployment
   - Create initial migration
   - Apply to Neon database
   - Deploy to Vercel
   - Test admin panel in production
3. [ ] Create first super-admin user
4. [ ] Create first test tenant
5. [ ] Document what works/doesn't work

### Next Week (Week 2)
1. Start Phase 1: Website Builder
2. Implement tenant subdomain routing
3. Create Pages collection with blocks
4. Build first template (Electrician)
5. Test public website rendering

---

**Status**: This roadmap is a living document. Update after completing each phase.
**Owner**: Thomas Fabig
**Last Updated**: November 17, 2025
