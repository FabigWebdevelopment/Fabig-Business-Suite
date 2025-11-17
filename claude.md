# Fabig Business Suite - Claude Development Guide

> **Last Updated:** November 16, 2025
> **Status:** In Development - Week 1 Foundation Phase
> **Target Launch:** February 2025 (12-week timeline)
> **Owner:** Thomas Fabig | Fabig Webdevelopment

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Context](#business-context)
3. [Brand Identity](#brand-identity)
4. [Technical Architecture](#technical-architecture)
5. [Code Standards & Patterns](#code-standards--patterns)
6. [Database Schema](#database-schema)
7. [Development Workflow](#development-workflow)
8. [Testing Strategy](#testing-strategy)
9. [Security Guidelines](#security-guidelines)
10. [Performance Requirements](#performance-requirements)
11. [Common Tasks](#common-tasks)
12. [Deployment & DevOps](#deployment--devops)
13. [Troubleshooting](#troubleshooting)

---

## Project Overview

### What is Fabig Business Suite?

**Fabig Business Suite** is a **multi-tenant SaaS platform** developed by **Thomas Fabig** (Fabig Webdevelopment) specifically for **German local businesses** with 5-20 employees. It provides:

- **Website Builder** with industry-specific templates
- **Lead-Board CRM** (simplified Kanban-style lead management)
- **WhatsApp AI Assistant** (24/7 AI-powered conversations, automatic booking) ⭐ KILLER FEATURE
- **Automation System** (email/SMS/WhatsApp follow-ups, review requests)
- **Review Management** (Google Business Profile integration)
- **White-Label Capabilities** (custom domains, branding)

### Target Market

**Primary Verticals:**

1. **Handwerk (Trades)**
   - Elektriker (Electricians)
   - Klempner (Plumbers)
   - Dachdecker (Roofers)
   - Maler (Painters)
   - Tischler (Carpenters)
   - Heizungsbauer (HVAC)

2. **Gastronomie (Food Service)**
   - Restaurants
   - Cafés
   - Bäckereien (Bakeries)
   - Catering Services
   - Food Trucks

3. **Beauty & Wellness**
   - Friseure (Hair Salons)
   - Nagelstudios (Nail Salons)
   - Kosmetikstudios (Beauty Salons)
   - Massage & Spa
   - Fitness Studios

4. **Gesundheit (Healthcare)**
   - Physiotherapie
   - Zahnärzte (Dentists)
   - Tierärzte (Veterinarians)
   - Heilpraktiker (Alternative Medicine)

5. **Dienstleistungen (Services)**
   - Reinigungsdienste (Cleaning Services)
   - Gartenbau (Landscaping)
   - Fotografen (Photography)
   - Veranstaltungstechnik (Event Services)
   - KFZ-Werkstätten (Auto Repair)

6. **Einzelhandel (Retail)**
   - Boutiquen
   - Fachgeschäfte (Specialty Stores)
   - Blumenläden (Florists)
   - Buchhandlungen (Bookstores)

**Common Characteristics:**
- 5-20 employees (small to medium local business)
- Need professional online presence
- Struggle with lead management
- Want automated customer follow-up
- Need more online reviews
- Limited technical knowledge
- German-speaking market

### Market Position

- **Brand:** Fabig Business Suite by Thomas Fabig
- **Target Market:** German local businesses across all service industries
- **Market Size:** ~3.5 million small businesses in Germany (500k+ potential customers)
- **Pricing:** €299-€799/month (self-service) | €2000+/month (Enterprise)
- **Alternative to:** GoHighLevel (but simpler and German-focused)
- **USP:**
  - **WhatsApp AI Assistant** - First German platform with built-in AI for WhatsApp automation
  - Built by Thomas Fabig with 10+ years experience digitizing local businesses
  - Simplified CRM terminology (Lead-Board instead of complex CRM)
  - German-first with "Du" form (friendly, approachable)
  - **Industry-specific templates** for 20+ business types
  - **Industry-trained AI** that understands trades, restaurants, salons, medical practices
  - Templates based on real customer projects (not generic)
  - Personal support from the founder (Enterprise tier)

### The WhatsApp AI Advantage

**Why this is revolutionary for German local businesses:**

- **90%+ WhatsApp penetration in Germany** - customers expect businesses on WhatsApp
- **98% open rate** vs 20% email - WhatsApp is the primary communication channel
- **AI handles 70-80% of conversations** autonomously (bookings, questions, inquiries)
- **Zero missed opportunities** - AI responds in seconds, 24/7
- **Human-like conversations** - customers don't realize they're talking to AI
- **Automatic lead creation** - every conversation becomes a qualified lead in the CRM
- **Function calling** - AI can book appointments, check availability, create quotes
- **Industry-specific knowledge** - trained on restaurant menus, salon services, trade pricing

**Example ROI:**
```
Restaurant receives 30 WhatsApp inquiries/day
Without AI: 5 missed (busy) × €150 avg = €750/day lost = €22,500/month
With AI (€399/mo): 0 missed = ROI of 5,637%
```

### Success Criteria

A customer can:
1. Onboard in <30 minutes
2. Save 10+ hours/month with automation
3. Generate 3x more reviews
4. See clear ROI that justifies €500/month subscription
5. Recommend to other tradesmen

---

## Business Context

### Founder Background

**Thomas Fabig** | Fabig Webdevelopment
- 10+ years experience building custom websites for German local businesses
- Portfolio: Tradespeople, restaurants, salons, medical practices, retail
- Previous model: €7,000-€9,000 one-time custom projects per client
- Transition goal: Recurring SaaS revenue while leveraging existing client relationships
- Personal brand positioning: "The expert for digitizing local businesses in Germany"

### Migration Strategy

**Existing Custom Clients → Fabig Business Suite Enterprise:**
- ~20-30 custom website clients
- Offer: €999 one-time migration + €799-€2000/mo Enterprise subscription
- Value proposition: Always updated, maintained, better features than static custom site
- Target: Convert 30-50% within first year

**New Customer Acquisition:**
- Self-service tiers (Starter/Pro/Premium): Digital marketing, content, referrals
- Enterprise tier: Direct sales, agency partnerships, existing client referrals

### Revenue Model

| Tier | Price | Features | Target Customer |
|------|-------|----------|-----------------|
| **Starter** | €299/mo | Website + Basic CRM + Email automation | Solo businesses testing the platform (1-5 employees) |
| **Professional** | €499/mo | + SMS + WhatsApp Inbox (manual) + Advanced automation | Growing businesses (5-15 employees) |
| **Premium** | €799/mo | ⭐ + **WhatsApp AI** (1000 AI conversations/mo) + Automatic booking + Custom domain + Priority support | **MOST POPULAR** - Established businesses wanting 24/7 automation (10-20 employees) |
| **Enterprise** | €2000+/mo | + Unlimited AI conversations + Custom AI training + Voice/Image recognition + Multi-language AI + Full white-label + Multi-location + API access + Dedicated support | Multi-location businesses, agencies, franchises, partners |

### WhatsApp AI Capabilities (Premium & Enterprise)

**What the AI can do:**

✅ **Answer common questions** (hours, pricing, location, services)
✅ **Book appointments** (checks availability, confirms, sends reminders)
✅ **Qualify leads** (collects name, contact, service interest, urgency)
✅ **Handle emergencies** (detects urgent keywords, escalates immediately to owner)
✅ **Provide quotes** (based on service description and pricing rules)
✅ **Send payment links** (for deposits or prepayments)
✅ **Multi-language** (German primary, can handle English, Turkish, Arabic - Enterprise)
✅ **Voice transcription** (customer sends voice message, AI transcribes and responds - Enterprise)
✅ **Image recognition** (customer sends photo of problem, AI analyzes - Enterprise)
✅ **Smart escalation** (knows when to hand over to human for complex issues)

**Margins:**
- Customer pays: €399/mo (AI add-on in Premium)
- Costs: ~€10-15/mo (OpenAI + WhatsApp API + infrastructure)
- Gross margin: **96%+** 🚀

### Target Timeline

- **Week 1:** Foundation (monorepo, multi-tenant, core collections)
- **Week 2-3:** Website Builder (templates, blocks, routing)
- **Week 4-5:** Lead-Board CRM (Kanban, timeline)
- **Week 6-7:** Automation (email/SMS, triggers)
- **Week 8-9:** Reviews & White-Label
- **Week 10-11:** Testing & Localization
- **Week 12:** Launch with 2 pilot customers

### Key Metrics

**Technical:**
- Page load: <2s
- Admin dashboard: <1s
- API response: <200ms
- Uptime: 99.9%

**Business:**
- Customer onboarding: <30 min
- Lead response time: <5 min (with automation)
- Review response rate: >30%
- Customer retention: >90%

---

## Brand Identity

### Logo & Colors

**Primary Logo:** `logo-fabig.png`
- Blue rounded shield/frame design
- Clean, modern, professional
- Symbolizes protection, trust, reliability

**Color Palette:**
```css
/* Primary - Professional Blue (from logo) */
--primary: #2563EB;
--primary-hover: #1D4ED8;
--primary-light: #DBEAFE;

/* Accent - Warm, Approachable */
--accent: #F59E0B;
--accent-hover: #D97706;

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-900: #111827;

/* Semantic */
--success: #10B981;
--warning: #F59E0B;
--error: #EF4444;
--info: #3B82F6;
```

**Typography:**
```css
/* Headings */
font-family: 'Inter', -apple-system, sans-serif;
font-weight: 600-700;

/* Body */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
font-weight: 400-500;
```

### Brand Voice

**Tone:** Friendly, professional, approachable
- Use "Du" form (informal but respectful)
- Avoid corporate jargon
- Focus on benefits, not features
- Be helpful, not salesy

**Examples:**
- ✅ "Dein Business-System – einfach und professionell"
- ✅ "Mehr Leads. Mehr Aufträge. Mehr Zeit für dein Handwerk."
- ❌ "Enterprise-grade CRM solution leveraging cutting-edge technology"

### Taglines

**Primary:** "Dein Business-System – entwickelt von Thomas Fabig"

**Alternatives:**
- "Software für lokale Unternehmen, gemacht von einem der es versteht"
- "Mehr Kunden. Mehr Umsatz. Mehr Zeit für dein Business."
- "Das All-in-One System für dein lokales Geschäft"
- "Website, CRM & Automatisierung – alles in einem"

**Industry-Specific:**
- Handwerk: "Mehr Aufträge für dein Handwerk"
- Gastronomie: "Mehr Reservierungen für dein Restaurant"
- Beauty: "Mehr Termine für deinen Salon"
- Retail: "Mehr Kunden für dein Geschäft"

### Domain Strategy

- **Main Product:** `fabig-suite.de` (or `fabig.business`)
- **Tenant Subdomains:** `{kunde}.fabig-suite.de`
- **Admin/App:** `app.fabig-suite.de`
- **Marketing:** `fabig-webdevelopment.de` (existing agency site)
- **Personal:** `thomasfabig.de` (redirect to Fabig Suite or personal brand page)
- **Enterprise:** `enterprise.fabig-suite.de` (sales page)

### Branding in Application

**Admin Panel Header:**
```
┌─────────────────────────────────────────────┐
│  [Logo]  FABIG                              │
│          Business Suite        [User Menu]  │
└─────────────────────────────────────────────┘
```

**Customer Website Footer (Non-Enterprise):**
```
Powered by Fabig Business Suite | © 2025 Thomas Fabig
```

**Enterprise Customers:**
- Full white-label option (all "Fabig" branding removed)
- Or optional co-branding: "Powered by Fabig Business Suite"

---

## Technical Architecture

### Core Technology Stack

```yaml
Framework: Next.js 15+ (App Router)
CMS/Backend: Payload CMS 3.0+
Database: PostgreSQL (NOT MongoDB)
ORM: Drizzle (via Payload's @payloadcms/db-postgres)
Multi-Tenancy: @payloadcms/plugin-multi-tenant v3.64.0+
UI Components: shadcn/ui
Component Library: Payblocks (blocks/templates)
Styling: Tailwind CSS
Type Safety: TypeScript (strict mode)
Package Manager: pnpm
Node Version: 20+
```

### Why PostgreSQL Over MongoDB?

**CRITICAL DECISION:** Despite Payblocks recommending MongoDB, we use PostgreSQL because:

1. **Relational Data Model** - LokalBoost is heavily relational (Tenants → Leads → Timeline → Messages)
2. **ACID Transactions** - Critical for CRM data integrity
3. **Row-Level Security** - PostgreSQL RLS provides database-level multi-tenant isolation
4. **Complex Queries** - Analytics and reporting require JOINs
5. **Migration Control** - Version-controlled schema changes for production SaaS
6. **Industry Standard** - PostgreSQL is proven for multi-tenant SaaS

**What we lose:** Payblocks' MongoDB-only backup plugin (irrelevant - we use `pg_dump`)

### Architecture Principles

#### 1. Service Layer Abstraction

**NEVER** directly call Payload API in route handlers or components.

```typescript
// ❌ BAD - Direct Payload usage
export async function POST(req: Request) {
  const lead = await payload.create({
    collection: 'leads',
    data: req.body
  })
}

// ✅ GOOD - Service layer
export async function POST(req: Request) {
  const lead = await leadsService.createLead(req.body)
}
```

**Why:** When Payload API changes, update 1 service file instead of 50 routes.

#### 2. Type Safety Everywhere

```typescript
// Use Payload's generated types
import type { Lead, Tenant, User } from '@/payload/payload-types'

// Define service interfaces
interface CreateLeadInput {
  firstName: string
  lastName: string
  email?: string
  phone: string
  tenantId: string
}

// Never use 'any'
```

#### 3. Tenant Context is Sacred

Every request must have tenant context:

```typescript
// Middleware sets tenant context
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')
  const tenant = await resolveTenant(hostname)

  response.headers.set('x-tenant-id', tenant.id)
  response.headers.set('x-tenant-slug', tenant.slug)
}

// All services check tenant context
export class LeadsService {
  async getLeads(tenantId: string) {
    // ALWAYS filter by tenant
    return payload.find({
      collection: 'leads',
      where: {
        tenant: { equals: tenantId }
      }
    })
  }
}
```

**Security Rule:** Never trust client-provided tenant IDs. Always derive from authenticated session.

#### 4. Feature Flags for Risky Code

```typescript
// lib/features.ts
export const features = {
  usePayloadJobs: process.env.FEATURE_PAYLOAD_JOBS === 'true',
  useNewEmailProvider: process.env.FEATURE_NEW_EMAIL === 'true',
}

// Use in code
if (features.usePayloadJobs) {
  // New implementation
} else {
  // Stable fallback
}
```

### Project Structure

```
fabig-suite/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (app)/                    # Authenticated admin routes
│   │   │   ├── lead-board/
│   │   │   ├── automation/
│   │   │   └── settings/
│   │   ├── (public)/                 # Public website routes
│   │   │   └── [...slug]/            # Dynamic page rendering
│   │   ├── (legal)/                  # Impressum, Datenschutz
│   │   ├── api/                      # API routes
│   │   │   ├── leads/
│   │   │   ├── automation/
│   │   │   └── webhooks/
│   │   └── admin/[[...rest]]/        # Payload admin UI
│   │
│   ├── payload/                      # Payload CMS configuration
│   │   ├── collections/              # Collection configs
│   │   │   ├── Tenants.ts
│   │   │   ├── Users.ts
│   │   │   ├── Leads.ts
│   │   │   ├── Pages.ts
│   │   │   ├── AutomationTemplates.ts
│   │   │   ├── Reviews.ts
│   │   │   ├── Messages.ts
│   │   │   ├── Timeline.ts
│   │   │   └── Media.ts
│   │   ├── blocks/                   # Page builder blocks
│   │   │   ├── Hero.ts
│   │   │   ├── Services.ts
│   │   │   ├── Testimonials.ts
│   │   │   ├── ContactForm.ts
│   │   │   ├── Gallery.ts
│   │   │   └── FAQ.ts
│   │   ├── plugins/                  # Custom Payload plugins
│   │   ├── access/                   # Access control functions
│   │   ├── hooks/                    # Payload hooks
│   │   └── payload.config.ts         # Main Payload config
│   │
│   ├── lib/                          # Business logic & utilities
│   │   ├── services/                 # Service layer (CRITICAL)
│   │   │   ├── tenant.service.ts
│   │   │   ├── leads.service.ts
│   │   │   ├── automation.service.ts
│   │   │   ├── email.service.ts
│   │   │   ├── sms.service.ts
│   │   │   ├── template.service.ts
│   │   │   └── onboarding.service.ts
│   │   ├── utils/                    # Utility functions
│   │   │   ├── tenant-resolver.ts
│   │   │   ├── variable-replacer.ts
│   │   │   └── slug-generator.ts
│   │   ├── hooks/                    # React hooks
│   │   │   ├── useTenant.ts
│   │   │   └── useLeads.ts
│   │   ├── context/                  # React contexts
│   │   │   └── tenant.context.tsx
│   │   ├── types/                    # Shared TypeScript types
│   │   └── features.ts               # Feature flags
│   │
│   ├── components/                   # React components
│   │   ├── admin/                    # Admin panel components
│   │   │   ├── TenantSelector.tsx
│   │   │   └── DashboardStats.tsx
│   │   ├── website/                  # Public website components
│   │   │   ├── blocks/               # Block renderers
│   │   │   │   ├── HeroBlock.tsx
│   │   │   │   ├── ServicesBlock.tsx
│   │   │   │   └── ContactFormBlock.tsx
│   │   │   └── RenderBlocks.tsx
│   │   ├── lead-board/               # CRM components
│   │   │   ├── LeadColumn.tsx
│   │   │   ├── LeadCard.tsx
│   │   │   └── LeadDetail.tsx
│   │   ├── ui/                       # shadcn/ui components
│   │   └── providers/                # Context providers
│   │
│   └── middleware.ts                 # Tenant detection middleware
│
├── migrations/                       # PostgreSQL migrations
│   └── [timestamp]_[name].sql
│
├── tests/                            # Test suites
│   ├── e2e/                          # End-to-end tests (Playwright)
│   │   ├── lead-flow.spec.ts
│   │   └── website-builder.spec.ts
│   ├── integration/                  # Integration tests (Vitest)
│   │   └── services/
│   └── unit/                         # Unit tests (Vitest)
│       └── utils/
│
├── scripts/                          # Utility scripts
│   ├── seed-pilot-customer.ts
│   └── generate-migration.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Continuous Integration
│       └── deploy.yml                # Deployment
│
├── public/                           # Static assets
│   ├── templates/                    # Industry template assets
│   └── fonts/
│
├── .env.local                        # Local environment variables
├── .env.example                      # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── claude.md                         # This file
```

---

## Code Standards & Patterns

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Rules:**
- ✅ Always use `strict` mode
- ✅ No `any` types (use `unknown` if truly dynamic)
- ✅ Prefer `interface` for object shapes
- ✅ Use `type` for unions/intersections
- ✅ Export all types used across files

### Naming Conventions

```typescript
// Collections: PascalCase
export const Leads: CollectionConfig = { ... }

// Services: PascalCase + Service suffix
export class LeadsService { ... }

// Components: PascalCase
export function LeadCard({ lead }: LeadCardProps) { ... }

// Files: kebab-case
// leads.service.ts
// lead-card.tsx
// tenant-resolver.ts

// Constants: UPPER_SNAKE_CASE
const MAX_LEADS_PER_PAGE = 50

// Environment variables: UPPER_SNAKE_CASE with prefix
DATABASE_URI=...
PAYLOAD_SECRET=...
SENDGRID_API_KEY=...
```

### Service Layer Pattern

**Every Payload collection gets a service:**

```typescript
// src/lib/services/leads.service.ts
import type { Payload } from 'payload'
import type { Lead } from '@/payload/payload-types'

export class LeadsService {
  constructor(private payload: Payload) {}

  async createLead(data: CreateLeadInput): Promise<Lead> {
    // Validate input
    if (!data.tenantId) {
      throw new Error('Tenant ID is required')
    }

    // Create lead
    const lead = await this.payload.create({
      collection: 'leads',
      data: {
        ...data,
        tenant: data.tenantId,
        status: 'new',
      },
    })

    // Trigger side effects
    await this.triggerNewLeadAutomation(lead)

    return lead
  }

  async getLeadsByTenant(
    tenantId: string,
    filters?: LeadFilters
  ): Promise<Lead[]> {
    const result = await this.payload.find({
      collection: 'leads',
      where: {
        and: [
          { tenant: { equals: tenantId } },
          ...(filters?.status ? [{ status: { equals: filters.status } }] : []),
          ...(filters?.search ? [
            {
              or: [
                { firstName: { contains: filters.search } },
                { lastName: { contains: filters.search } },
                { email: { contains: filters.search } },
              ],
            },
          ] : []),
        ],
      },
      sort: '-createdAt',
      limit: filters?.limit || 50,
      page: filters?.page || 1,
    })

    return result.docs
  }

  async updateLeadStatus(
    leadId: string,
    status: LeadStatus,
    tenantId: string
  ): Promise<Lead> {
    // Verify tenant ownership
    const lead = await this.getLeadById(leadId, tenantId)
    if (!lead) {
      throw new Error('Lead not found or access denied')
    }

    // Update status
    const updated = await this.payload.update({
      collection: 'leads',
      id: leadId,
      data: { status },
    })

    // Automation hook will be triggered by Payload's afterChange hook

    return updated
  }

  private async getLeadById(
    id: string,
    tenantId: string
  ): Promise<Lead | null> {
    try {
      const lead = await this.payload.findByID({
        collection: 'leads',
        id,
      })

      // Verify tenant ownership
      if (lead.tenant !== tenantId) {
        return null
      }

      return lead
    } catch {
      return null
    }
  }

  private async triggerNewLeadAutomation(lead: Lead): Promise<void> {
    // Delegate to automation service
    // Don't implement automation logic here
  }
}

// Export singleton instance
export const leadsService = new LeadsService(payload)
```

### Component Patterns

#### Server Components (Default)

```typescript
// src/app/(app)/lead-board/page.tsx
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@/payload/payload.config'
import { LeadBoard } from '@/components/lead-board/LeadBoard'
import { cookies } from 'next/headers'

export default async function LeadBoardPage() {
  const tenantId = cookies().get('tenant-id')?.value

  if (!tenantId) {
    return <div>Unauthorized</div>
  }

  const payload = await getPayloadHMR({ config })

  // Fetch server-side
  const leads = await payload.find({
    collection: 'leads',
    where: {
      tenant: { equals: tenantId },
    },
  })

  return <LeadBoard initialLeads={leads.docs} tenantId={tenantId} />
}
```

#### Client Components (When Needed)

```typescript
// src/components/lead-board/LeadBoard.tsx
'use client'

import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import type { Lead } from '@/payload/payload-types'

interface LeadBoardProps {
  initialLeads: Lead[]
  tenantId: string
}

export function LeadBoard({ initialLeads, tenantId }: LeadBoardProps) {
  const [leads, setLeads] = useState(initialLeads)

  // Client-side interactivity
  async function handleDragEnd(event: DragEndEvent) {
    // Optimistic update + API call
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Kanban UI */}
    </DndContext>
  )
}
```

**Rule:** Use Server Components by default. Only mark `'use client'` when you need:
- React hooks (useState, useEffect, etc.)
- Event handlers (onClick, onChange, etc.)
- Browser APIs (localStorage, window, etc.)
- Third-party libraries that require client rendering

### Error Handling Pattern

```typescript
// Service layer
export class LeadsService {
  async createLead(data: CreateLeadInput): Promise<Lead> {
    try {
      const lead = await this.payload.create({ ... })
      return lead
    } catch (error) {
      // Log error with context
      console.error('Failed to create lead', {
        error,
        data,
        timestamp: new Date().toISOString(),
      })

      // Re-throw with user-friendly message
      throw new Error('Lead konnte nicht erstellt werden. Bitte versuche es erneut.')
    }
  }
}

// API route
export async function POST(req: Request) {
  try {
    const data = await req.json()
    const lead = await leadsService.createLead(data)

    return Response.json({ success: true, lead })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten'
      },
      { status: 500 }
    )
  }
}

// Client component
async function handleSubmit(data: FormData) {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!result.success) {
      toast.error(result.error)
      return
    }

    toast.success('Lead erfolgreich erstellt!')
  } catch (error) {
    toast.error('Netzwerkfehler. Bitte prüfe deine Internetverbindung.')
  }
}
```

### German Language Standards

**All user-facing text must be in German:**

```typescript
// ✅ GOOD
const STATUS_LABELS = {
  new: 'Neue Anfragen',
  contacted: 'Kontaktiert',
  quoted: 'Angebot erstellt',
  won: 'Gewonnen',
  lost: 'Verloren',
}

// ❌ BAD
const STATUS_LABELS = {
  new: 'New Inquiries',
  contacted: 'Contacted',
  ...
}
```

**Use informal "Du" form:**

```typescript
// ✅ GOOD - Informal, friendly tone
'Möchtest du diesen Lead wirklich löschen?'
'Willkommen zurück! Hier ist deine Lead-Übersicht.'
'Du hast 5 neue Anfragen.'

// ❌ BAD - Too formal for our target market
'Möchten Sie diesen Lead wirklich löschen?'
'Willkommen zurück! Hier ist Ihre Lead-Übersicht.'

// ❌ BAD - English
'Do you want to delete this lead?'
```

**Rationale:** The "Du" form creates a more personal, approachable relationship with local tradespeople. It positions LokalBoost as a friendly partner rather than a distant corporate tool. This aligns with the simplified, non-intimidating UX we're building.

**Important Consistency Rule:**
- **Admin UI / CRM / Internal tools:** Always "Du" (Deine Leads, Deine Automatisierungen, Möchtest du speichern?)
- **Customer-facing website content:** Can use "Sie" if the tenant prefers it for their customers (editable in templates)
- **System emails/SMS to tenants:** "Du" (from LokalBoost to the business owner)
- **Automation emails/SMS to end customers:** Follows tenant's preference (usually "Sie" for professional services)

**Date/Number Formatting:**

```typescript
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

// Dates: DD.MM.YYYY
format(new Date(), 'dd.MM.yyyy', { locale: de })
// Output: "16.11.2025"

// Numbers: 1.234,56 €
const formatter = new Intl.NumberFormat('de-DE', {
  style: 'currency',
  currency: 'EUR',
})
formatter.format(1234.56)
// Output: "1.234,56 €"
```

---

## Database Schema

### Collections Overview

```
Tenants (Core)
├── Leads (CRM)
│   ├── Timeline (Activity Feed)
│   ├── Messages (Email/SMS Log)
│   └── Reviews (Customer Reviews)
├── Pages (Website Builder)
├── AutomationTemplates (Marketing Automation)
├── Users (Authentication)
└── Media (File Uploads)
```

### Tenants Collection

**The foundation of multi-tenancy.** Every customer business is a tenant.

```typescript
// src/payload/collections/Tenants.ts
import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'subscriptionTier', 'subscriptionStatus'],
    group: 'System',
  },
  access: {
    // Only super-admins can create tenants
    create: ({ req }) => req.user?.role === 'super-admin',

    // Users can only read tenants they belong to
    read: ({ req }) => {
      if (req.user?.role === 'super-admin') return true

      return {
        id: {
          in: req.user?.tenants?.map((t: any) => t.id) || [],
        },
      }
    },

    // Only super-admins can update
    update: ({ req }) => req.user?.role === 'super-admin',

    // Only super-admins can delete
    delete: ({ req }) => req.user?.role === 'super-admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description: 'Firmenname (z.B. "Müller Elektrik")',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-Slug für Subdomain (z.B. "mueller-elektrik" → mueller-elektrik.lokalboost.de)',
      },
    },
    {
      name: 'customDomain',
      type: 'text',
      unique: true,
      admin: {
        description: 'Eigene Domain (z.B. "www.mueller-elektrik.de")',
      },
    },
    {
      name: 'industry',
      type: 'select',
      required: true,
      options: [
        // Handwerk
        { label: 'Elektriker', value: 'electrician' },
        { label: 'Klempner', value: 'plumber' },
        { label: 'Dachdecker', value: 'roofer' },
        { label: 'Maler', value: 'painter' },
        { label: 'Tischler', value: 'carpenter' },
        { label: 'Heizungsbauer', value: 'hvac' },

        // Gastronomie
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Café', value: 'cafe' },
        { label: 'Bäckerei', value: 'bakery' },
        { label: 'Catering', value: 'catering' },

        // Beauty & Wellness
        { label: 'Friseursalon', value: 'hair_salon' },
        { label: 'Nagelstudio', value: 'nail_salon' },
        { label: 'Kosmetikstudio', value: 'beauty_salon' },
        { label: 'Fitnessstudio', value: 'fitness_studio' },
        { label: 'Spa & Wellness', value: 'spa' },

        // Gesundheit
        { label: 'Physiotherapie', value: 'physiotherapy' },
        { label: 'Zahnarztpraxis', value: 'dentist' },
        { label: 'Tierarztpraxis', value: 'veterinarian' },

        // Dienstleistungen
        { label: 'Reinigungsdienst', value: 'cleaning_service' },
        { label: 'Gartenbau', value: 'landscaping' },
        { label: 'Fotograf', value: 'photographer' },
        { label: 'KFZ-Werkstatt', value: 'auto_repair' },

        // Einzelhandel
        { label: 'Boutique', value: 'boutique' },
        { label: 'Blumenladen', value: 'flower_shop' },
        { label: 'Buchhandlung', value: 'bookstore' },

        // Sonstiges
        { label: 'Sonstiges', value: 'other' },
      ],
    },
    {
      type: 'group',
      name: 'branding',
      label: 'Branding',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#0066cc',
          admin: {
            description: 'Hauptfarbe (Hex-Code)',
          },
        },
        {
          name: 'accentColor',
          type: 'text',
          defaultValue: '#ff6600',
          admin: {
            description: 'Akzentfarbe (Hex-Code)',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Kontaktinformationen',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          type: 'group',
          name: 'address',
          fields: [
            { name: 'street', type: 'text', label: 'Straße' },
            { name: 'city', type: 'text', label: 'Stadt' },
            { name: 'postalCode', type: 'text', label: 'PLZ' },
            { name: 'country', type: 'text', defaultValue: 'Deutschland' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'subscription',
      label: 'Abonnement',
      fields: [
        {
          name: 'tier',
          type: 'select',
          required: true,
          defaultValue: 'basic',
          options: [
            { label: 'Basic (299€/Monat)', value: 'basic' },
            { label: 'Professional (499€/Monat)', value: 'professional' },
            { label: 'Premium (799€/Monat)', value: 'premium' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'active',
          options: [
            { label: 'Aktiv', value: 'active' },
            { label: 'Testphase', value: 'trial' },
            { label: 'Pausiert', value: 'paused' },
            { label: 'Gekündigt', value: 'cancelled' },
          ],
          index: true,
        },
        {
          name: 'trialEndsAt',
          type: 'date',
          admin: {
            condition: (data) => data.subscription?.status === 'trial',
          },
        },
      ],
    },
    {
      type: 'group',
      name: 'integrations',
      label: 'Integrationen',
      fields: [
        {
          name: 'googleBusinessUrl',
          type: 'text',
          admin: {
            description: 'Google Business Profile URL für Bewertungen',
          },
        },
        {
          type: 'group',
          name: 'email',
          label: 'E-Mail',
          fields: [
            {
              name: 'provider',
              type: 'select',
              defaultValue: 'managed',
              options: [
                { label: 'Verwaltet (LokalBoost SendGrid)', value: 'managed' },
                { label: 'Eigener Account (BYOA)', value: 'byoa' },
              ],
            },
            {
              name: 'sendgridApiKey',
              type: 'text',
              admin: {
                condition: (data) => data.integrations?.email?.provider === 'byoa',
                description: 'SendGrid API Key des Kunden',
              },
            },
            {
              name: 'fromEmail',
              type: 'email',
              admin: {
                description: 'Absender E-Mail-Adresse',
              },
            },
            {
              name: 'fromName',
              type: 'text',
              admin: {
                description: 'Absender Name',
              },
            },
          ],
        },
        {
          type: 'group',
          name: 'sms',
          label: 'SMS/WhatsApp',
          fields: [
            {
              name: 'provider',
              type: 'select',
              defaultValue: 'managed',
              options: [
                { label: 'Verwaltet (LokalBoost Twilio)', value: 'managed' },
                { label: 'Eigener Account (BYOA)', value: 'byoa' },
              ],
            },
            {
              name: 'twilioAccountSid',
              type: 'text',
              admin: {
                condition: (data) => data.integrations?.sms?.provider === 'byoa',
              },
            },
            {
              name: 'twilioAuthToken',
              type: 'text',
              admin: {
                condition: (data) => data.integrations?.sms?.provider === 'byoa',
              },
            },
            {
              name: 'twilioPhoneNumber',
              type: 'text',
              admin: {
                description: 'Twilio Telefonnummer',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        // Auto-generate slug from name if not provided
        if (operation === 'create' && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
        }

        return data
      },
    ],
  },
}
```

### Leads Collection

**The heart of the CRM system.**

```typescript
// src/payload/collections/Leads.ts
export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'status', 'phone', 'createdAt'],
    group: 'CRM',
  },
  access: {
    // Handled by multi-tenant plugin
    // Users can only access leads from their tenant
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return `${data?.firstName || ''} ${data?.lastName || ''}`.trim()
          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'Vorname',
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Nachname',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Telefon',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'Neue Anfragen', value: 'new' },
        { label: 'Kontaktiert', value: 'contacted' },
        { label: 'Angebot erstellt', value: 'quoted' },
        { label: 'Gewonnen', value: 'won' },
        { label: 'Verloren', value: 'lost' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'website',
      options: [
        { label: 'Website', value: 'website' },
        { label: 'Manuell', value: 'manual' },
        { label: 'Import', value: 'import' },
        { label: 'Empfehlung', value: 'referral' },
      ],
    },
    {
      name: 'serviceInterest',
      type: 'text',
      label: 'Benötigte Dienstleistung',
    },
    {
      name: 'projectDescription',
      type: 'textarea',
      label: 'Projektbeschreibung',
    },
    {
      name: 'estimatedValue',
      type: 'number',
      label: 'Geschätzter Auftragswert (€)',
      admin: {
        step: 50,
      },
    },
    {
      name: 'notes',
      type: 'richText',
      label: 'Notizen',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'lastContactedAt',
      type: 'date',
      label: 'Zuletzt kontaktiert',
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      label: 'Zugewiesen an',
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Detect status changes
        if (operation === 'update' && doc.status !== previousDoc?.status) {
          // Create timeline entry
          await req.payload.create({
            collection: 'timeline',
            data: {
              lead: doc.id,
              tenant: doc.tenant,
              type: 'status_change',
              description: `Status geändert von "${previousDoc.status}" zu "${doc.status}"`,
              createdBy: req.user?.id,
            },
          })

          // Trigger automation
          if (doc.status === 'won') {
            // Queue review request automation
            // Implementation in automation.service.ts
          }
        }

        // New lead notification
        if (operation === 'create') {
          // Send notification to tenant
          // Implementation in notification.service.ts
        }
      },
    ],
  },
}
```

### Pages Collection

**Website builder with block system.**

```typescript
// src/payload/collections/Pages.ts
import { HeroBlock } from '../blocks/Hero'
import { ServicesBlock } from '../blocks/Services'
import { TestimonialsBlock } from '../blocks/Testimonials'
import { ContactFormBlock } from '../blocks/ContactForm'
import { GalleryBlock } from '../blocks/Gallery'
import { FAQBlock } from '../blocks/FAQ'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'isPublished', 'updatedAt'],
    group: 'Website',
  },
  access: {
    // Public read access for published pages
    read: ({ req }) => {
      // Admins can see all pages
      if (req.user) return true

      // Public can only see published pages
      return {
        isPublished: { equals: true },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Seitentitel',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      label: 'URL-Pfad',
      admin: {
        description: 'URL der Seite (z.B. "dienstleistungen" → /dienstleistungen)',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Inhaltsblöcke',
      blocks: [
        HeroBlock,
        ServicesBlock,
        TestimonialsBlock,
        ContactFormBlock,
        GalleryBlock,
        FAQBlock,
      ],
    },
    {
      type: 'group',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta-Titel',
          admin: {
            description: 'Überschreibt Seitentitel für Suchmaschinen (optional)',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta-Beschreibung',
          maxLength: 160,
        },
        {
          name: 'keywords',
          type: 'text',
          label: 'Keywords',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Social Media Bild',
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      label: 'Veröffentlicht',
    },
  ],
}
```

### Multi-Tenant Plugin Configuration

**CRITICAL:** Configure the multi-tenant plugin to apply to all tenant-scoped collections.

```typescript
// src/payload/payload.config.ts
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'

export default buildConfig({
  // ... other config

  plugins: [
    multiTenantPlugin({
      enabled: true,
      debug: process.env.NODE_ENV === 'development',
      tenantsSlug: 'tenants',

      collections: {
        // Apply tenant isolation to these collections
        leads: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        pages: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        'automation-templates': {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        reviews: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        messages: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        timeline: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
        media: {
          useTenantAccess: true,
          useBaseFilter: true,
        },
      },

      // Define super-admin check
      userHasAccessToAllTenants: (user) => {
        return user?.role === 'super-admin'
      },

      // Clean up data when tenant is deleted
      cleanupAfterTenantDelete: true,
    }),
  ],
})
```

---

## Development Workflow

### Environment Setup

```bash
# Clone repository
git clone <repo-url>
cd fabig-suite

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your credentials
# Required variables:
# - DATABASE_URI (PostgreSQL connection string)
# - PAYLOAD_SECRET (random 32+ character string)
# - NEXT_PUBLIC_SERVER_URL (http://localhost:3000 for dev)
# - NEXT_PUBLIC_APP_NAME (Fabig Business Suite)
# - NEXT_PUBLIC_BRAND_OWNER (Thomas Fabig)

# Run database migrations
pnpm run payload migrate

# Seed initial data (optional)
pnpm run payload seed

# Start development server
pnpm dev
```

### Development Server

```bash
# Start Next.js + Payload CMS
pnpm dev

# Access points:
# - Frontend: http://localhost:3000
# - Admin Panel: http://localhost:3000/admin
# - API: http://localhost:3000/api
```

### Database Workflow

#### Development Mode

```typescript
// In development, Payload auto-pushes schema changes
// payload.config.ts
db: postgresAdapter({
  pool: { connectionString: process.env.DATABASE_URI },
  push: process.env.NODE_ENV === 'development', // Auto-push in dev
})
```

Changes to collection configs automatically update the database schema.

#### Production Mode

```bash
# Generate migration from schema changes
pnpm run payload migrate:create

# This creates: migrations/[timestamp]_[name].sql

# Review the generated SQL

# Apply migration
pnpm run payload migrate

# Rollback if needed (manual - edit migration files)
```

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/lead-board-filters

# Make changes, commit frequently
git add .
git commit -m "feat: add status filter to lead board"

# Push to remote
git push origin feature/lead-board-filters

# Create Pull Request on GitHub
# Review your own code before merging

# Merge to main
git checkout main
git merge feature/lead-board-filters
git push origin main
```

**Commit Message Convention:**

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

### Testing Workflow

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test leads.service.test.ts

# Run E2E tests
pnpm test:e2e

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
```

### Code Quality Checks

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Run all checks (before committing)
pnpm validate
```

**Pre-commit Hook (recommended):**

```json
// package.json
{
  "scripts": {
    "validate": "pnpm type-check && pnpm lint && pnpm test"
  },
  "husky": {
    "hooks": {
      "pre-commit": "pnpm validate"
    }
  }
}
```

---

## Testing Strategy

### Test Pyramid

```
      /\
     /E2E\        10% - End-to-end (Playwright)
    /------\
   /Integr. \     30% - Integration (Vitest)
  /----------\
 /   Unit     \   60% - Unit tests (Vitest)
/---------------\
```

### Unit Tests

**Test individual functions and utilities:**

```typescript
// tests/unit/utils/variable-replacer.test.ts
import { describe, it, expect } from 'vitest'
import { replaceVariables } from '@/lib/utils/variable-replacer'

describe('replaceVariables', () => {
  it('should replace single variable', () => {
    const template = 'Hallo {firstName}!'
    const data = { firstName: 'Hans' }

    expect(replaceVariables(template, data)).toBe('Hallo Hans!')
  })

  it('should replace multiple variables', () => {
    const template = 'Hallo {firstName} {lastName}!'
    const data = { firstName: 'Hans', lastName: 'Schmidt' }

    expect(replaceVariables(template, data)).toBe('Hallo Hans Schmidt!')
  })

  it('should handle missing variables gracefully', () => {
    const template = 'Hallo {firstName}!'
    const data = {}

    expect(replaceVariables(template, data)).toBe('Hallo !')
  })
})
```

### Integration Tests

**Test services and business logic:**

```typescript
// tests/integration/services/leads.service.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { LeadsService } from '@/lib/services/leads.service'

describe('LeadsService', () => {
  let payload: Payload
  let leadsService: LeadsService
  let testTenant: Tenant

  beforeAll(async () => {
    payload = await getPayloadHMR({ config })
    leadsService = new LeadsService(payload)

    // Create test tenant
    testTenant = await payload.create({
      collection: 'tenants',
      data: {
        name: 'Test Tenant',
        slug: 'test-tenant',
        industry: 'electrician',
      },
    })
  })

  afterAll(async () => {
    // Clean up test data
    await payload.delete({
      collection: 'tenants',
      id: testTenant.id,
    })
  })

  it('should create lead with correct tenant', async () => {
    const lead = await leadsService.createLead({
      firstName: 'Test',
      lastName: 'User',
      phone: '+491234567890',
      tenantId: testTenant.id,
    })

    expect(lead.tenant).toBe(testTenant.id)
    expect(lead.status).toBe('new')
  })

  it('should prevent access to other tenant leads', async () => {
    // Create another tenant
    const otherTenant = await payload.create({
      collection: 'tenants',
      data: { name: 'Other Tenant', slug: 'other-tenant' },
    })

    // Try to get leads from other tenant
    const leads = await leadsService.getLeadsByTenant(otherTenant.id)

    expect(leads).toHaveLength(0)
  })
})
```

### E2E Tests

**Test complete user flows:**

```typescript
// tests/e2e/lead-flow.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Lead Flow', () => {
  test('complete lead capture and management flow', async ({ page }) => {
    // 1. Visit tenant website
    await page.goto('http://test-tenant.localhost:3000')

    // 2. Fill contact form
    await page.fill('input[name="firstName"]', 'Hans')
    await page.fill('input[name="lastName"]', 'Schmidt')
    await page.fill('input[name="email"]', 'hans@example.com')
    await page.fill('input[name="phone"]', '+491234567890')
    await page.fill('textarea[name="message"]', 'Ich brauche einen Elektriker')

    await page.click('button[type="submit"]')

    // 3. Verify success message
    await expect(page.locator('.success-message')).toBeVisible()

    // 4. Login as tenant admin
    await page.goto('http://localhost:3000/admin')
    await page.fill('input[name="email"]', 'admin@test-tenant.com')
    await page.fill('input[name="password"]', 'password123')
    await page.click('button[type="submit"]')

    // 5. Navigate to Lead Board
    await page.goto('http://localhost:3000/lead-board')

    // 6. Verify lead appears in "Neue Anfragen" column
    const leadCard = page.locator('.lead-card', { hasText: 'Hans Schmidt' })
    await expect(leadCard).toBeVisible()

    // 7. Drag lead to "Kontaktiert" column
    await leadCard.dragTo(page.locator('[data-column="contacted"]'))

    // 8. Verify status changed
    await expect(
      page.locator('[data-column="contacted"] .lead-card', { hasText: 'Hans Schmidt' })
    ).toBeVisible()

    // 9. Open lead detail
    await leadCard.click()

    // 10. Verify timeline entry created
    await expect(
      page.locator('.timeline-entry', { hasText: 'Status geändert' })
    ).toBeVisible()
  })
})
```

### Test Coverage Requirements

**Minimum coverage targets:**

- Overall: 70%
- Services: 90%
- Utilities: 95%
- Components: 60% (E2E tests cover UI)

```bash
# Check coverage
pnpm test:coverage

# View HTML coverage report
open coverage/index.html
```

---

## Security Guidelines

### 1. Tenant Isolation (CRITICAL)

**Rule:** NEVER trust client-provided tenant IDs.

```typescript
// ❌ DANGEROUS - Client controls tenant
export async function GET(
  req: Request,
  { params }: { params: { tenantId: string } }
) {
  // Attacker can request any tenant's data!
  const leads = await payload.find({
    collection: 'leads',
    where: { tenant: { equals: params.tenantId } },
  })
}

// ✅ SAFE - Tenant from authenticated session
export async function GET(req: Request) {
  const session = await getSession(req)
  const tenantId = session.user.tenantId // From JWT/session

  const leads = await payload.find({
    collection: 'leads',
    where: { tenant: { equals: tenantId } },
  })
}
```

### 2. Input Validation

**Always validate and sanitize user input:**

```typescript
import { z } from 'zod'

const CreateLeadSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\+?[0-9\s\-()]+$/),
  projectDescription: z.string().max(5000).optional(),
})

export async function POST(req: Request) {
  const body = await req.json()

  // Validate input
  const result = CreateLeadSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      { error: 'Ungültige Eingabedaten', details: result.error },
      { status: 400 }
    )
  }

  // Proceed with validated data
  const lead = await leadsService.createLead(result.data)
  return Response.json(lead)
}
```

### 3. SQL Injection Prevention

**Use Payload's query builder - NEVER raw SQL:**

```typescript
// ✅ SAFE - Payload handles escaping
const leads = await payload.find({
  collection: 'leads',
  where: {
    firstName: { contains: searchTerm },
  },
})

// ❌ DANGEROUS - Raw SQL (don't do this)
const leads = await db.query(
  `SELECT * FROM leads WHERE first_name LIKE '%${searchTerm}%'`
)
```

### 4. XSS Prevention

**Use React's built-in escaping:**

```typescript
// ✅ SAFE - React escapes automatically
<div>{lead.firstName}</div>

// ❌ DANGEROUS - dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: lead.notes }} />

// ✅ SAFE - Use rich text renderer
<RichText content={lead.notes} />
```

### 5. Authentication

**Use Payload's built-in auth:**

```typescript
// Check if user is authenticated
const isAuthed = ({ req }: { req: PayloadRequest }) => {
  return Boolean(req.user)
}

// Check if user belongs to tenant
const isTenantMember = ({ req }: { req: PayloadRequest }) => {
  const tenantId = req.headers.get('x-tenant-id')
  return req.user?.tenants?.some((t: any) => t.id === tenantId)
}
```

### 6. Rate Limiting

**Protect public endpoints:**

```typescript
// src/middleware.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requests per 10 seconds
})

export async function middleware(request: NextRequest) {
  // Rate limit contact form submissions
  if (request.nextUrl.pathname === '/api/contact') {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new Response('Too many requests', { status: 429 })
    }
  }

  // ... rest of middleware
}
```

### 7. Secrets Management

**NEVER commit secrets to git:**

```bash
# .env.local (gitignored)
# Fabig Business Suite - Environment Variables

# Database
DATABASE_URI=postgresql://...

# Payload CMS
PAYLOAD_SECRET=...

# Application
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Fabig Business Suite"
NEXT_PUBLIC_BRAND_OWNER="Thomas Fabig"

# Email (SendGrid)
SENDGRID_API_KEY=...

# SMS (Twilio)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...

# Encryption
ENCRYPTION_KEY=...
```

**Encrypt sensitive tenant data:**

```typescript
import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!

function encrypt(text: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

function decrypt(text: string): string {
  const parts = text.split(':')
  const iv = Buffer.from(parts.shift()!, 'hex')
  const encrypted = Buffer.from(parts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encrypted)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

// Use for API keys, tokens, etc.
```

### 8. CORS Configuration

```typescript
// payload.config.ts
export default buildConfig({
  cors: [
    process.env.NEXT_PUBLIC_APP_URL!,
    // Add allowed domains for API access
  ],
  csrf: [
    process.env.NEXT_PUBLIC_APP_URL!,
  ],
})
```

---

## Performance Requirements

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): <2.5s
- **FID** (First Input Delay): <100ms
- **CLS** (Cumulative Layout Shift): <0.1

### Database Query Optimization

**Add indexes to frequently queried fields:**

```typescript
// Collections should have indexes on:
// - Foreign keys (tenant, lead, user)
// - Filter fields (status, source, isPublished)
// - Search fields (slug, email, phone)

{
  name: 'status',
  type: 'select',
  index: true, // ← Add index
}
```

**Use pagination:**

```typescript
// ❌ BAD - Fetch all leads
const leads = await payload.find({
  collection: 'leads',
})

// ✅ GOOD - Paginate
const leads = await payload.find({
  collection: 'leads',
  limit: 50,
  page: 1,
})
```

### Image Optimization

**Use Next.js Image component:**

```typescript
import Image from 'next/image'

// ✅ Automatic optimization
<Image
  src={tenant.branding.logo.url}
  alt={tenant.name}
  width={200}
  height={80}
  priority // For above-the-fold images
/>

// ❌ Unoptimized
<img src={tenant.branding.logo.url} alt={tenant.name} />
```

### Caching Strategy

```typescript
// Static pages - ISR with revalidation
export const revalidate = 3600 // 1 hour

// Dynamic pages - cache with stale-while-revalidate
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

// API routes - manual caching
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

export async function GET(req: Request) {
  const tenantId = getTenantId(req)

  // Check cache
  const cached = await redis.get(`leads:${tenantId}`)
  if (cached) {
    return Response.json(cached)
  }

  // Fetch fresh data
  const leads = await leadsService.getLeads(tenantId)

  // Cache for 5 minutes
  await redis.setex(`leads:${tenantId}`, 300, JSON.stringify(leads))

  return Response.json(leads)
}
```

---

## Common Tasks

### Adding a New Collection

```bash
# 1. Create collection file
touch src/payload/collections/NewCollection.ts

# 2. Define collection config
# See existing collections for examples

# 3. Add to payload.config.ts
import { NewCollection } from './collections/NewCollection'

collections: [
  // ... existing
  NewCollection,
]

# 4. Add to multi-tenant plugin (if tenant-scoped)
plugins: [
  multiTenantPlugin({
    collections: {
      'new-collection': {
        useTenantAccess: true,
        useBaseFilter: true,
      },
    },
  }),
]

# 5. Create migration (production)
pnpm run payload migrate:create

# 6. Create service layer
touch src/lib/services/new-collection.service.ts
```

### Adding a New Page Block

```bash
# 1. Create block definition
touch src/payload/blocks/NewBlock.ts

# 2. Define block config
export const NewBlock: Block = {
  slug: 'new-block',
  fields: [
    // ... fields
  ],
}

# 3. Add to Pages collection
import { NewBlock } from '../blocks/NewBlock'

fields: [
  {
    name: 'blocks',
    type: 'blocks',
    blocks: [
      // ... existing
      NewBlock,
    ],
  },
]

# 4. Create React component
touch src/components/website/blocks/NewBlock.tsx

export function NewBlock({ headline, content }: NewBlockProps) {
  return (
    <section>
      {/* Render block */}
    </section>
  )
}

# 5. Add to RenderBlocks
import { NewBlock } from './blocks/NewBlock'

switch (block.blockType) {
  case 'new-block':
    return <NewBlock key={index} {...block} />
  // ... other cases
}
```

### Adding a New Automation Trigger

```bash
# 1. Add trigger option to AutomationTemplates collection
options: [
  // ... existing
  { label: 'Neuer Trigger', value: 'new_trigger' },
]

# 2. Implement trigger logic in automation.service.ts
async trigger(event: string, data: any) {
  if (event === 'new_trigger') {
    // Find matching templates
    // Execute actions
  }
}

# 3. Call trigger from appropriate hook
// e.g., in Leads collection afterChange hook
if (doc.someCondition) {
  await automationService.trigger('new_trigger', doc)
}
```

### Onboarding a New Pilot Customer

```bash
# 1. Run onboarding script
pnpm run onboard-customer

# 2. Follow prompts:
# - Business name: "Müller Elektrik"
# - Email: "mueller@example.com"
# - Phone: "+491234567890"
# - Industry: "electrician"

# 3. Script will:
# - Create tenant
# - Generate admin user
# - Create website from template
# - Set up default automations
# - Send welcome email

# 4. Provide customer with:
# - Login URL: https://app.lokalboost.de
# - Temporary password
# - Website URL: https://mueller-elektrik.lokalboost.de

# 5. Schedule onboarding call (1-2 hours)
```

### Debugging Multi-Tenant Issues

```typescript
// Enable debug mode in multi-tenant plugin
multiTenantPlugin({
  debug: true, // Shows tenant field in admin UI
})

// Check tenant context in middleware
export async function middleware(request: NextRequest) {
  console.log('Hostname:', request.headers.get('host'))
  console.log('Resolved tenant:', tenantSlug)
  console.log('Tenant ID:', tenant?.id)
}

// Verify access control
// In Payload admin, try to access another tenant's data
// Should be blocked

// Check database directly
// psql $DATABASE_URI
# SELECT id, name, slug FROM tenants;
# SELECT id, "firstName", "lastName", tenant FROM leads WHERE tenant = '<tenant-id>';
```

---

## Deployment & DevOps

### Production Environment Variables

```bash
# .env.production
# Fabig Business Suite - Production Environment

NODE_ENV=production
DATABASE_URI=postgresql://user:pass@host:5432/fabig_suite_prod
PAYLOAD_SECRET=<64-character-random-string>
NEXT_PUBLIC_SERVER_URL=https://app.fabig-suite.de
NEXT_PUBLIC_APP_NAME="Fabig Business Suite"
NEXT_PUBLIC_BRAND_OWNER="Thomas Fabig"

# Email
SENDGRID_API_KEY_MASTER=<master-sendgrid-key>

# SMS
TWILIO_ACCOUNT_SID_MASTER=<master-twilio-sid>
TWILIO_AUTH_TOKEN_MASTER=<master-twilio-token>

# Monitoring
SENTRY_DSN=<sentry-dsn>

# Encryption
ENCRYPTION_KEY=<32-byte-key>

# Redis (for caching/rate limiting)
REDIS_URL=<redis-connection-string>
```

### Deployment Checklist

**Before deploying to production:**

- [ ] All tests passing
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Security audit completed
- [ ] Performance tested (Lighthouse score >90)
- [ ] GDPR compliance verified
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Error tracking active (Sentry)
- [ ] Domain DNS configured
- [ ] SSL certificates valid

### CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

### Database Backup Strategy

```bash
# Automated daily backups
# Run via cron job or managed service

#!/bin/bash
# scripts/backup-database.sh
# Fabig Business Suite - Database Backup Script

DATE=$(date +%Y-%m-%d-%H%M%S)
BACKUP_FILE="fabig-suite-backup-$DATE.dump"

# Create backup
pg_dump $DATABASE_URI -Fc -f "/backups/$BACKUP_FILE"

# Upload to S3
aws s3 cp "/backups/$BACKUP_FILE" "s3://fabig-suite-backups/$BACKUP_FILE"

# Keep only last 30 days of backups
find /backups -name "fabig-suite-backup-*.dump" -mtime +30 -delete

# Notify Thomas on successful backup
# (Optional: send email/Slack notification)
```

### Monitoring

**Sentry for error tracking:**

```typescript
// src/instrumentation.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

**Custom metrics dashboard:**

```typescript
// Track business metrics
await analytics.track('lead_created', {
  tenantId: tenant.id,
  source: lead.source,
  timestamp: new Date(),
})

await analytics.track('automation_triggered', {
  tenantId: tenant.id,
  templateId: template.id,
  trigger: template.trigger,
})
```

---

## Troubleshooting

### Common Issues

#### Issue: Multi-tenant plugin not filtering data

**Symptoms:** Users can see data from other tenants

**Solution:**
```typescript
// Verify plugin configuration
collections: {
  'collection-name': {
    useTenantAccess: true,  // ← Must be true
    useBaseFilter: true,    // ← Must be true
  },
}

// Check middleware is setting tenant context
console.log(req.headers.get('x-tenant-id'))

// Verify user has tenant assignment
console.log(req.user.tenants)
```

#### Issue: Payload migrations not applying

**Symptoms:** Database schema out of sync

**Solution:**
```bash
# Check migration status
pnpm run payload migrate:status

# Force re-run migrations
pnpm run payload migrate:fresh

# If stuck, manually check database
psql $DATABASE_URI
\dt  # List tables
\d leads  # Describe table
```

#### Issue: Automation not triggering

**Symptoms:** Emails/SMS not sending

**Solution:**
```typescript
// Check automation template is active
const template = await payload.findByID({
  collection: 'automation-templates',
  id: templateId,
})
console.log(template.isActive)  // Must be true

// Check conditions are met
console.log('Trigger:', template.trigger)
console.log('Conditions:', template.conditions)

// Check email/SMS credentials
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY ? 'Set' : 'Missing')
console.log('Twilio SID:', process.env.TWILIO_ACCOUNT_SID ? 'Set' : 'Missing')

// Test email service directly
await emailService.send({
  to: 'test@example.com',
  subject: 'Test',
  html: '<p>Test</p>',
  tenantId: tenant.id,
})
```

#### Issue: Slow page loads

**Symptoms:** Pages taking >3s to load

**Solution:**
```typescript
// Enable Next.js speed insights
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}

// Check database query performance
// Add indexes to frequently queried fields
// Use pagination
// Enable caching
```

---

## Update Management

### Dependency Update Strategy

**Weekly (Security Only):**
```bash
pnpm audit
pnpm update --latest <package-with-security-issue>
```

**Monthly (Patch Updates):**
```bash
pnpm update  # Updates to latest patch versions
pnpm test    # Verify nothing broke
```

**Quarterly (Minor Updates):**
```bash
pnpm outdated  # Check what's outdated
pnpm update --latest payload  # Update Payload
pnpm update --latest next     # Update Next.js
# Test thoroughly
```

**Yearly (Major Updates):**
```bash
# Create update branch
git checkout -b deps/payload-v4

# Update major versions
pnpm update --latest payload

# Read migration guide
# Test extensively
# Budget 1-2 weeks
```

### Breaking Change Protocol

1. **Create update branch**
2. **Read changelog/migration guide**
3. **Update package**
4. **Fix TypeScript errors**
5. **Run full test suite**
6. **Manual testing of critical flows**
7. **Deploy to staging**
8. **Monitor for 1 week**
9. **Deploy to production**

---

## Support & Resources

### Documentation

- **Payload CMS:** https://payloadcms.com/docs
- **Next.js:** https://nextjs.org/docs
- **Drizzle ORM:** https://orm.drizzle.team/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Tailwind CSS:** https://tailwindcss.com/docs

### Community

- **Payload Discord:** https://discord.gg/payload
- **GitHub Issues:** https://github.com/payloadcms/payload/issues

### Internal Resources

- **Figma Designs:** [Link to designs]
- **Product Roadmap:** [Link to roadmap]
- **Customer Feedback:** [Link to feedback board]

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-16 | 1.0 | Initial creation - Foundation phase |

---

## Notes for Future Claude Instances

### Context Preservation

This file represents the **single source of truth** for the **Fabig Business Suite** project by **Thomas Fabig**. When starting a new conversation:

1. **Read this file completely** before making any code changes
2. **Respect the architectural decisions** (especially PostgreSQL over MongoDB)
3. **Follow the established patterns** (service layer, type safety, multi-tenancy)
4. **Maintain German language** in all user-facing text
5. **Update this file** when making significant architectural changes

### Decision Rationale

Key decisions that should NOT be changed without strong justification:

- **Fabig Branding:** Personal brand of Thomas Fabig - builds on existing reputation
- **PostgreSQL:** Chosen for relational data model, ACID transactions, RLS
- **Multi-tenant plugin:** Saves development time despite being actively developed
- **Service layer pattern:** Abstracts Payload API for easier updates
- **TypeScript strict mode:** Catches bugs at compile time
- **German-first with "Du" form:** Target market is German local businesses, friendly tone
- **Multi-industry templates:** 20+ templates covering trades, gastronomy, beauty, health, services, retail
- **Enterprise tier focus:** Higher revenue per customer, leverages Thomas's expertise

### Current Status

**Week:** 1 (Foundation Phase)
**Next Steps:**
1. Complete monorepo setup
2. Implement core collections (Tenants, Users, Media)
3. Configure multi-tenant plugin
4. Build tenant detection middleware
5. Create service layer foundation

### Known Limitations

- Payload jobs don't respect tenant scope (workaround: custom queue)
- Tenant deletion requires manual cleanup in some cases
- No mobile app (web-only for now)

### Owner Information

**Project Owner:** Thomas Fabig
**Company:** Fabig Webdevelopment
**Contact:** [Add contact info]
**Brand Assets:** Logo located at `/logo-fabig.png`

---

**End of Fabig Business Suite Development Guide**
**© 2025 Thomas Fabig | Fabig Webdevelopment**
