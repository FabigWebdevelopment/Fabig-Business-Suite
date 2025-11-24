# Fabig Enterprise Local Business Platform

> **Mission:** Elevate German local businesses to enterprise-level web presence, SEO, and automation
>
> **Strategy:** Premium landing pages + Twenty CRM + WhatsApp AI + Local SEO domination

---

## 🎯 Business Model

**Target Market:** German local businesses (Handwerk, Gastronomie, Wellness, Healthcare, Services)

**Pricing:** €299-2000+/month per client
**Goal:** 20-30 clients in Year 1 = €6k-15k MRR

**What EVERY Client Gets (Full Package):**
1. ✅ **Enterprise-grade landing page** (shadcn + premium components)
2. ✅ **Twenty CRM** (Kanban board, lead management)
3. ✅ **WhatsApp AI automation** (24/7 customer service) - **INCLUDED IN ALL TIERS**
4. ✅ **Email automation** (react-email templates)
5. ✅ **SMS notifications** (Twilio)
6. ✅ **Local SEO optimization** (Google My Business, directories, schema markup)

**USP:** WhatsApp AI is NOT an add-on - it's standard. Every client gets 24/7 AI customer service from day one.

**What Thomas Does:**
- Builds websites FOR clients (agency model, not self-service)
- Manages content updates via config files (no CMS needed)
- Handles automation setup (n8n workflows)
- Optimizes for local search rankings

---

## 🏗️ Technical Architecture

```
Landing Page (Next.js)
  ↓
Contact Form Submission
  ↓
Twenty CRM (GraphQL API) - Creates lead
  ↓
n8n Webhook Trigger
  ↓
Email Automation (react-email templates)
  +
WhatsApp AI Follow-up (ALWAYS - included in all tiers)
  +
SMS Notifications (appointment reminders, confirmations)
```

**Key Decision:** NO DATABASE
All customer data lives in Twenty CRM. Content lives in JSON config files.

---

## 🎨 Enterprise Design System

### Premium Component Libraries

**Core:** shadcn/ui (headless, accessible, customizable)

**Additional Libraries:**
1. **Magic UI** (https://magicui.design/) - Animated components
2. **Aceternity UI** (https://ui.aceternity.com/) - Premium effects
3. **Framer Motion** - Smooth animations

### Design Principles

✅ **Mobile-first** - 70%+ of local business traffic is mobile
✅ **Fast loading** - Core Web Vitals optimized (<2.5s LCP)
✅ **Accessible** - WCAG 2.1 AA compliance
✅ **German UX** - "Du" form, local phone formats, GDPR-compliant

---

## 🔍 Local SEO Strategy (CRITICAL)

### Goal: Dominate "Stadt + Service" searches

**Example:** "Elektriker München", "Friseur Hamburg", "Restaurant Berlin Mitte"

### German Business Directory Submissions

**Auto-submit to these directories:**
- ✅ Gelbe Seiten (gelbeseiten.de)
- ✅ Das Örtliche (dasoertliche.de)
- ✅ Meinestadt (meinestadt.de)
- ✅ 11880.com
- ✅ Yelp Deutschland
- ✅ GoLocal
- ✅ StadtBranche
- ✅ Cylex
- ✅ Tupalo
- ✅ Industry-specific (e.g., MyHammer for Handwerk)

### NAP Consistency (Critical!)

**NAP = Name, Address, Phone**
Must be **identical** across:
- Website footer
- Google My Business
- All directories
- Social media

---

## 🚀 Deployment & Infrastructure

**Production:** Vercel (Next.js optimized)
**CRM:** Hetzner CX32 (€11.90/mo) - Twenty CRM self-hosted
**Automation:** Hostinger KVM 2 (€15/mo, prepaid until 4/27) - n8n
**Email:** Resend (per-tenant verified domains)

### Environment Variables

```bash
# Twenty CRM
TWENTY_API_URL=https://crm.fabig-suite.de/graphql
TWENTY_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
TWENTY_WORKSPACE_ID=44209aaf-a215-4f56-a04e-adbe4ada0ddb

# n8n
N8N_WEBHOOK_URL=https://automation.fabig.website/webhook/lead-created

# Email (Resend)
RESEND_API_KEY=re_xxx
FROM_EMAIL=info@client-domain.de

# WhatsApp (Twilio) - INCLUDED IN ALL TIERS
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_WHATSAPP_NUMBER=+14155238886

# OpenAI (for WhatsApp AI)
OPENAI_API_KEY=sk-proj-xxx
OPENAI_MODEL=gpt-4o-mini

# SMS (Twilio) - INCLUDED IN ALL TIERS
TWILIO_SMS_NUMBER=+4930123456789
```

---

## 💰 Pricing Strategy (Apple-Style Psychological Anchoring)

### The Ladder Effect™

**Goal:** Make customers naturally upgrade by positioning "just one tier higher" as the obvious better value.

---

### **Tier 1: Starter** - €299/mo
*"Perfect for solo Handwerker getting started"*

**What's Included:**
- ✅ 5-page landing page
- ✅ Twenty CRM (unlimited leads)
- ✅ **WhatsApp AI** (300 conversations/mo)
- ✅ Email automation (2 sequences)
- ✅ SMS (50/mo)
- ✅ Local SEO (5 directories)
- ✅ 1 content update/month
- ⏱️ Email support (48h response)

**Limitations that push upgrades:**
- ⚠️ Only 300 WhatsApp conversations (runs out mid-month for active businesses)
- ⚠️ Only 1 content update (need to wait 30 days for changes)
- ⚠️ Basic email sequences (no advanced nurturing)

---

### **Tier 2: Professional** - €449/mo ⭐ MOST POPULAR
*"For established businesses (5-15 employees)"*

**Everything in Starter, PLUS:**
- ✅ **10-page landing page** (vs 5)
- ✅ **WhatsApp AI: 1,000 conversations/mo** (+700 vs Starter) 🔥
- ✅ **Email automation: 6 sequences** (vs 2)
- ✅ **SMS: 200/mo** (vs 50)
- ✅ **Local SEO: 12 directories** (vs 5)
- ✅ **3 content updates/month** (vs 1)
- ✅ **Chat support** (24h response vs email only)

**The Anchor:**
- Only €150 more than Starter, but 3x WhatsApp capacity
- "For just €5/day extra, never run out of AI conversations"

**Psychological Trigger:**
> "Starter clients upgrade to Professional within 2 months when they hit conversation limits. Why not start here?"

---

### **Tier 3: Premium** - €749/mo
*"For growing businesses ready to scale"*

**Everything in Professional, PLUS:**
- ✅ **Unlimited landing pages**
- ✅ **WhatsApp AI: 3,000 conversations/mo** (+2,000 vs Professional) 🔥
- ✅ **Email automation: Unlimited sequences**
- ✅ **SMS: 500/mo**
- ✅ **Local SEO: 20+ directories + Google My Business optimization**
- ✅ **Unlimited content updates**
- ✅ **Priority support** (12h response)
- ✅ **Monthly SEO reports**

**The Anchor:**
- Only €300 more than Professional, but 3x WhatsApp capacity again
- "Professional is great until you get 30+ customer inquiries/day"

**Psychological Trigger:**
> "Once you're at €449/mo, €749 feels like the 'serious business' tier. And you get SEO reports to justify the ROI."

---

### **Tier 4: Enterprise** - €1,499/mo 💎
*"For multi-location or franchise operations"*

**Everything in Premium, PLUS:**
- ✅ **Unlimited WhatsApp AI conversations** (no caps ever)
- ✅ **Unlimited SMS**
- ✅ **Google Ads management** (€1000/mo ad spend included)
- ✅ **Custom integrations** (POS, booking systems, ERP)
- ✅ **Dedicated account manager**
- ✅ **Quarterly strategy reviews**
- ✅ **API access** (build your own tools)
- ✅ **White-label option** (for agencies)

**The Anchor:**
- 2x Premium price, but removes ALL limits
- "When WhatsApp drives 50% of your bookings, €1,499 is cheaper than hiring reception staff (€2,500+/mo)"

---

### 📊 Psychological Pricing Breakdown (Like Apple)

| What You Pay | What You Get | Hidden Anchor |
|--------------|--------------|---------------|
| **€299** | 300 WhatsApp conv | "Runs out → upgrade mid-month" |
| **€449** (+€150) | 1,000 WhatsApp conv | "3x more for just €5/day" ⭐ |
| **€749** (+€300) | 3,000 WhatsApp conv | "2x price = 3x capacity" |
| **€1,499** (+€750) | **Unlimited** | "Remove anxiety, scale freely" 💎 |

### 🧠 The Psychology:

**Starter → Professional:**
- Customer thinks: "€299 is cheap, but I'll hit 300 conversations in 2 weeks. €449 is only €5/day more and I get 3x capacity. No-brainer."

**Professional → Premium:**
- Customer thinks: "I'm already at €449. For €300 more I get unlimited updates, 3x WhatsApp, and SEO reports to show my boss the ROI. Makes sense."

**Premium → Enterprise:**
- Customer thinks: "€749 works, but we have 3 locations. For 2x the price, we get unlimited everything + Google Ads + dedicated manager. That's cheaper than hiring."

---

### 🎯 Upsell Triggers (Automated in n8n)

**When customer hits 80% of WhatsApp limit:**
```
Email: "You're crushing it! 🚀 You've used 240/300 WhatsApp conversations this month.
Upgrade to Professional (€449) for 1,000/mo and never worry about limits again."

CTA: Upgrade for €5/day
```

**When customer requests 2nd content update in Starter:**
```
Email: "Need more updates? Professional includes 3 updates/mo (vs waiting 30 days).
Plus 3x WhatsApp capacity for €150 more."

CTA: Upgrade to Professional
```

**When Premium customer has 3+ months of 2,500+ conversations:**
```
Email: "You're consistently near your 3,000 conversation limit. Enterprise removes
ALL caps for €750 more + includes Google Ads management. Let's scale without limits."

CTA: Book Enterprise Demo
```

---

### 💡 Add-Ons (One-Time or Recurring)

These are positioned as "unlocks" rather than core features:

| Add-On | Price | Who Needs It |
|--------|-------|--------------|
| **Extra WhatsApp Pack** | +€100/mo | +1,000 conversations (any tier) |
| **Industry Template** | €500 one-time | Restaurant menu system, salon booking, etc. |
| **Custom Domain Email** | +€25/mo | Professional branded email (@mueller-elektrik.de) |
| **Advanced Analytics** | +€99/mo | Conversion tracking, heatmaps, session replays |
| **Multilingual Website** | +€200/mo | Add English, Turkish, Polish versions |
| **Priority Onboarding** | €500 one-time | Go live in 48h instead of 7 days |

---

### 🎁 Promotional Anchors (Limited Time)

**"Storage Upgrade" Strategy (Like Apple):**

Normal pricing:
- Starter: €299 (300 WhatsApp conv)
- Professional: €449 (1,000 WhatsApp conv)

**Promotional anchor:**
> "Upgrade Starter to 600 conversations for +€75/mo"
>
> **Now Starter costs €374** - which makes Professional at €449 look like a steal for 1,000 conversations.

Customer thinks: "Why pay €374 for 600 when I can pay €75 more (€449) and get 1,000 conversations PLUS chat support, more email sequences, etc?"

**Result:** 80% choose Professional instead of "upgraded Starter"

---

### 📈 Revenue Optimization

**Target Distribution:**
- 20% Starter (€299) → €60/customer avg
- 50% Professional (€449) → €224/customer avg ⭐
- 25% Premium (€749) → €187/customer avg
- 5% Enterprise (€1,499) → €75/customer avg

**Average Revenue Per Client:** ~€546/mo

**20 clients = €10,920 MRR**
**30 clients = €16,380 MRR**

**With natural upgrades over 12 months:**
- 30% of Starter → Professional (+€150/mo each)
- 20% of Professional → Premium (+€300/mo each)

**Year 1 MRR Growth:** €16k → €22k+ organically

---

## 📊 Analytics & Attribution System (CRITICAL for ROI)

### Why Analytics Matter for Your Business:

**You're charging €299-1499/mo** - Clients NEED to see:
- "Where are my leads coming from?" (Google My Business vs directories vs organic)
- "Is WhatsApp AI actually working?" (conversation → booking rate)
- "What's my ROI?" (€749/mo → €15k in new revenue)

**You need data to trigger upsells:**
- "You've had 280/300 WhatsApp conversations → upgrade to Professional"
- "3 leads came from Gelbe Seiten this month → SEO is working"

---

### 🎯 Analytics Stack (GDPR-Compliant)

#### **1. Website Analytics - Pirsch Analytics** (€19/mo per client)

**Why Pirsch:**
- ✅ Made in Germany (GDPR by default)
- ✅ No cookie consent needed
- ✅ Lightweight (doesn't slow down site)
- ✅ Simple dashboards clients understand
- ✅ Affordable white-label option

**What We Track:**
- Page views, unique visitors
- Traffic sources (Google, directories, direct)
- Device breakdown (mobile/desktop)
- Top landing pages
- Conversion events (form submissions)

**Integration:**
```typescript
// src/app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          defer
          data-domain={process.env.NEXT_PUBLIC_SITE_DOMAIN}
          src="https://api.pirsch.io/pa.js"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Custom Events:**
```typescript
// Track contact form submission
pirsch('Contact Form Submitted', {
  meta: {
    source: 'hero-section',
    service: 'Elektroinstallation'
  }
})
```

---

#### **2. Product Analytics - PostHog** (Self-hosted on Hetzner)

**Why PostHog:**
- ✅ Self-host = GDPR compliant + cheaper at scale
- ✅ Session replays (see exactly how users navigate)
- ✅ Funnel analysis (landing page → form → CRM → customer)
- ✅ Feature flags (A/B test landing pages)
- ✅ Event tracking (every WhatsApp msg, email sent, etc.)

**What We Track:**
- Complete user journeys (first visit → conversion)
- Form abandonment (started form but didn't submit)
- Button clicks, scroll depth
- Session replays (watch recordings of user sessions)
- Cohort analysis (users from Google vs directories)

**Deploy on Hetzner:**
```bash
# docker-compose.yml for PostHog
version: '3'
services:
  posthog:
    image: posthog/posthog:latest
    environment:
      - SECRET_KEY=${POSTHOG_SECRET}
      - SITE_URL=https://analytics.fabig-suite.de
    ports:
      - "8000:8000"
```

**Integration:**
```typescript
// src/lib/analytics/posthog.ts
import posthog from 'posthog-js'

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
  api_host: 'https://analytics.fabig-suite.de',
  capture_pageview: true,
  capture_pageleave: true,
})

// Track custom events
export function trackEvent(eventName: string, properties?: object) {
  posthog.capture(eventName, properties)
}

// Identify user (when they submit form)
export function identifyUser(leadId: string, properties: object) {
  posthog.identify(leadId, properties)
}
```

**Track Lead Journey:**
```typescript
// When form is submitted
trackEvent('Lead Created', {
  service: 'Elektroinstallation',
  source: 'Google Organic',
  value: 500, // estimated deal value
})

// When lead enters CRM
identifyUser(lead.id, {
  email: lead.email,
  phone: lead.phone,
  company: business.name,
})

// When WhatsApp conversation starts
trackEvent('WhatsApp Conversation Started', {
  leadId: lead.id,
})

// When deal closes
trackEvent('Deal Won', {
  leadId: lead.id,
  value: 2500,
  source: 'Google My Business',
})
```

---

#### **3. CRM Analytics - Twenty CRM Built-in**

Twenty has native analytics for:
- Lead pipeline (Kanban board stages)
- Conversion rates (new → contacted → quoted → won)
- Deal values
- Time in stage

**Custom Dashboards in Twenty:**
- Total leads this month
- Win rate by source (Google vs directories)
- Average deal size
- Response time (how fast Thomas/AI responds)

---

#### **4. Attribution Tracking (WHERE did the lead come from?)**

**This is CRITICAL for ROI reporting!**

**Method 1: UTM Parameters**
```
Google My Business link:
https://mueller-elektrik.de?utm_source=gmb&utm_medium=organic

Gelbe Seiten listing:
https://mueller-elektrik.de?utm_source=gelbe-seiten&utm_medium=directory

Google Ads:
https://mueller-elektrik.de?utm_source=google&utm_medium=cpc&utm_campaign=elektriker-muenchen
```

**Method 2: Referrer Detection**
```typescript
// src/lib/analytics/attribution.ts
export function getLeadSource(): string {
  const urlParams = new URLSearchParams(window.location.search)
  const utmSource = urlParams.get('utm_source')
  const referrer = document.referrer

  if (utmSource) return utmSource
  if (referrer.includes('google.com')) return 'Google Organic'
  if (referrer.includes('gelbeseiten.de')) return 'Gelbe Seiten'
  if (referrer.includes('facebook.com')) return 'Facebook'
  return 'Direct'
}

// Save to localStorage for form submission
localStorage.setItem('leadSource', getLeadSource())
```

**Method 3: First-Touch Attribution**
```typescript
// Track first visit source (even if they don't convert immediately)
const firstTouch = localStorage.getItem('firstTouch')
if (!firstTouch) {
  localStorage.setItem('firstTouch', JSON.stringify({
    source: getLeadSource(),
    timestamp: Date.now(),
    landingPage: window.location.pathname,
  }))
}

// When form is submitted, include first-touch data
const attribution = {
  firstTouch: JSON.parse(localStorage.getItem('firstTouch')),
  lastTouch: {
    source: getLeadSource(),
    timestamp: Date.now(),
  }
}
```

**Store in Twenty CRM:**
```graphql
mutation CreateLeadWithAttribution {
  createPerson(data: {
    name: { firstName: "Hans", lastName: "Schmidt" }
    email: "hans@example.com"
    customFields: {
      leadSource: "Google My Business"
      firstTouchDate: "2025-11-24"
      landingPage: "/elektriker-muenchen"
      utmCampaign: "local-seo"
    }
  }) {
    id
  }
}
```

---

#### **5. WhatsApp AI Analytics**

**Track conversation quality:**
```typescript
// In n8n workflow, after WhatsApp conversation
const conversationMetrics = {
  leadId: lead.id,
  messageCount: 8,
  duration: 320, // seconds
  sentiment: 'positive', // from OpenAI analysis
  intent: 'booking', // detected intent
  resolved: true, // AI handled it vs escalated to human
  bookingMade: true,
}

// Send to PostHog
posthog.capture('WhatsApp Conversation Completed', conversationMetrics)

// Send to Twenty CRM
updateLead(lead.id, {
  whatsappConversations: lead.whatsappConversations + 1,
  lastWhatsappDate: new Date(),
  aiResolutionRate: 0.85, // 85% of conversations resolved by AI
})
```

**AI Performance Dashboard:**
- Total conversations / month
- Resolution rate (AI vs human handoff)
- Booking conversion rate
- Average response time
- Customer satisfaction (ask "War diese Antwort hilfreich? Ja/Nein")

---

#### **6. Local SEO Analytics**

**Google My Business Insights:**
```typescript
// Use Google My Business API
const gmbInsights = await fetchGMBData(business.gmbId)

// Track:
// - Search impressions (how many saw your listing)
// - Map views
// - Direction requests (huge intent signal!)
// - Phone calls from listing
// - Website clicks from GMB
```

**Directory Performance:**
```typescript
// Track which directories drive traffic
const directoryPerformance = {
  'Gelbe Seiten': { clicks: 45, leads: 3, conversionRate: 0.067 },
  'Das Örtliche': { clicks: 28, leads: 1, conversionRate: 0.036 },
  'Google My Business': { clicks: 320, leads: 18, conversionRate: 0.056 },
  '11880': { clicks: 12, leads: 0, conversionRate: 0 },
}

// Show client: "Google My Business drove 18 leads this month"
```

---

### 📈 Client-Facing ROI Dashboard

**Build custom dashboard at `/dashboard` using shadcn/ui:**

```tsx
// src/app/dashboard/page.tsx
export default async function ClientDashboard() {
  const analytics = await getAnalytics(clientId)

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* KPI Cards */}
      <Card>
        <CardTitle>Leads This Month</CardTitle>
        <CardValue>{analytics.leads.total}</CardValue>
        <CardChange>+23% vs last month</CardChange>
      </Card>

      <Card>
        <CardTitle>WhatsApp Conversations</CardTitle>
        <CardValue>{analytics.whatsapp.total}</CardValue>
        <CardProgress value={analytics.whatsapp.total} max={1000} />
        <CardSubtext>240/1000 used (Professional tier)</CardSubtext>
      </Card>

      <Card>
        <CardTitle>Revenue from Leads</CardTitle>
        <CardValue>€12,450</CardValue>
        <CardChange>ROI: 16.6x (€749/mo cost)</CardChange>
      </Card>

      {/* Lead Sources Chart */}
      <Chart title="Lead Sources" data={analytics.sources} />

      {/* Conversion Funnel */}
      <Funnel steps={[
        { name: 'Website Visitors', count: 1240 },
        { name: 'Contact Forms', count: 42 },
        { name: 'WhatsApp Conversations', count: 38 },
        { name: 'Bookings Made', count: 18 },
      ]} />

      {/* Upsell Banner (if near limit) */}
      {analytics.whatsapp.total > 800 && (
        <Alert variant="warning">
          You're at 80% of your WhatsApp limit. Upgrade to Premium for 3,000 conversations/mo.
        </Alert>
      )}
    </div>
  )
}
```

**Monthly Email Report (Automated):**
```
Subject: 📊 November Analytics - Müller Elektrik

Hallo Thomas,

Hier ist dein monatlicher Performance-Report:

✅ 42 neue Leads (+23% vs Oktober)
✅ 18 Buchungen (43% Conversion Rate)
✅ €12,450 Umsatz aus Website-Leads

Top Lead-Quellen:
1. Google My Business: 18 Leads
2. Gelbe Seiten: 3 Leads
3. Google Organic: 8 Leads

WhatsApp AI:
- 240/1000 Gespräche genutzt (24%)
- 85% von AI gelöst (ohne dein Eingreifen)
- ⭐ Durchschnittliche Bewertung: 4.8/5

Nächste Schritte:
- Du bist auf gutem Weg!
- Bei diesem Wachstum wirst du in 2 Monaten das WhatsApp-Limit erreichen.
- Upgrade zu Premium? → 3,000 Gespräche + unbegrenzte Updates

[Dashboard ansehen]
```

---

### 🔌 Integration Architecture

```
Website (Next.js)
  ↓ (Pirsch Analytics - website traffic)
  ↓ (PostHog - events, session replays)
  ↓
Contact Form Submitted
  ↓ (Attribution data attached)
  ↓
Twenty CRM (Lead created with source)
  ↓
n8n Webhook
  ↓
WhatsApp AI Conversation
  ↓ (Track: messages, sentiment, resolution)
  ↓
Booking Made
  ↓ (Update Twenty: Deal won, revenue tracked)
  ↓
Monthly ROI Report Generated
  ↓
Email to Client + Dashboard Update
```

**All data synced to:**
- Pirsch (website behavior)
- PostHog (user journey + events)
- Twenty CRM (lead pipeline + revenue)
- Custom Client Dashboard (ROI metrics)

---

### 💰 Cost Breakdown

| Tool | Cost | Purpose |
|------|------|---------|
| **Pirsch Analytics** | €19/mo per client | Website analytics (GDPR-compliant) |
| **PostHog** | €0/mo (self-hosted on Hetzner) | Advanced analytics, session replays |
| **Twenty CRM** | €0/mo (self-hosted) | Lead management, pipeline |
| **Custom Dashboard** | €0 (built in Next.js) | Client-facing ROI reports |

**Total per client:** €19/mo (absorbed in €299-1499 pricing)

---

### 🎯 Analytics-Driven Upsells (Automated in n8n)

**Trigger 1: WhatsApp Usage at 80%**
```
If whatsappConversations >= 800 (of 1000 in Professional):
  Send email: "You're crushing it! Upgrade to Premium for 3,000 conversations"
```

**Trigger 2: High Lead Volume**
```
If leadsThisMonth > 50:
  Send email: "You're getting 50+ leads/month! Premium tier includes unlimited
  content updates + priority support"
```

**Trigger 3: Strong ROI**
```
If revenueFromLeads > tierPrice * 10:
  Send email: "Your website generated 10x ROI this month (€7,490 cost → €74,500 revenue).
  Want to scale? Enterprise tier includes Google Ads management."
```

---

## 🎓 Claude Instructions

### When Building Features

**ALWAYS:**
1. Use shadcn/ui components (NOT custom CSS)
2. Optimize for mobile FIRST
3. Use German language ("Du" form)
4. Follow GDPR (cookie consent, data privacy)
5. Validate forms with Zod
6. Use react-email for emails (NOT HTML strings)
7. Add structured data (Schema.org)
8. Optimize images (WebP, lazy loading)

**NEVER:**
9. Use a database (data lives in Twenty CRM)
10. Create a CMS (content lives in config files)
11. Use English text (except code comments)
12. Skip accessibility (WCAG 2.1 AA required)

### SEO Checklist

Every page MUST have:
- [ ] Unique `<title>` with city + service keyword
- [ ] Meta description (155 chars, includes CTA)
- [ ] Open Graph tags
- [ ] Schema.org LocalBusiness markup
- [ ] H1 tag with keyword
- [ ] NAP in footer
- [ ] Mobile viewport meta tag
- [ ] Canonical URL
- [ ] Alt text on all images
- [ ] Internal links to other pages

### Performance Requirements

- [ ] Lighthouse score >90 (mobile & desktop)
- [ ] LCP <2.5s
- [ ] FID <100ms
- [ ] CLS <0.1
- [ ] All images optimized (WebP, next/image)
- [ ] Fonts preloaded
- [ ] No render-blocking CSS/JS

---

## 📝 Next Steps (Build Order)

1. ✅ **Phase 1: Foundation**
   - Clean Next.js 16 setup
   - Directory structure created

2. **Phase 2: Setup shadcn/ui + Premium Components**
   - Install shadcn/ui
   - Add Magic UI components
   - Configure Tailwind with brand system

3. **Phase 3: Config System**
   - `src/config/business.ts` - Company info
   - `src/config/theme.ts` - Brand colors
   - `src/config/seo.ts` - SEO settings
   - `src/config/local-seo.ts` - NAP data

4. **Phase 4: Landing Page Components**
   - Hero block (with animations)
   - Features/Services grid
   - Testimonials carousel
   - Contact form (Twenty CRM integration)
   - Footer (NAP, sitemap links)

5. **Phase 5: SEO Implementation**
   - Schema.org structured data
   - Sitemap generation
   - robots.txt
   - German business directory submissions

6. **Phase 6: CRM Integration**
   - Twenty GraphQL client
   - Contact form → Lead creation
   - Webhook to n8n

7. **Phase 7: Email Automation**
   - react-email templates
   - `/api/send-email` endpoint
   - n8n workflow templates

8. **Phase 8: WhatsApp AI (Premium tier)**
   - Twilio integration
   - GPT-4 conversation handling

---

**Built by Thomas Fabig | Fabig Webdevelopment**
**Elevating German local businesses to enterprise level** 🚀
