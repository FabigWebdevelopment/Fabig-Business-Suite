# Fabig Enterprise Local Business Platform

## The Mission

**We deliver in weeks what normally takes months and multiple experts.**

Local businesses in Germany deserve enterprise-level digital presence - stunning websites, CRM systems, automated follow-ups, WhatsApp integration, and local SEO dominance. But traditionally, this requires:

- A web designer (€5,000-15,000)
- A developer (€10,000-30,000)
- A CRM consultant (€3,000-8,000)
- An SEO specialist (€2,000-5,000/month)
- A marketing automation expert (€5,000-15,000)
- **6-12 months** to coordinate everything

**We compress this into one integrated package delivered in 2-3 weeks.**

### What We Deliver

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE COMPLETE PACKAGE                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  🌐 STUNNING WEBSITE                                            │
│     • Enterprise-quality design (Apple-level polish)            │
│     • Mobile-first (70%+ of traffic)                           │
│     • Lightning fast (<2.5s load)                              │
│     • AI-generated custom imagery                               │
│                                                                 │
│  📊 CRM SYSTEM                                                  │
│     • Every lead captured automatically                         │
│     • Full customer history                                     │
│     • Pipeline management                                       │
│     • Never lose a lead again                                   │
│                                                                 │
│  🤖 AUTOMATION                                                  │
│     • Instant email confirmations                               │
│     • Follow-up sequences (day 1, 3, 7)                        │
│     • WhatsApp notifications                                    │
│     • Review request automation                                 │
│                                                                 │
│  🔍 LOCAL SEO DOMINANCE                                         │
│     • "Elektriker München" rankings                             │
│     • Google My Business optimization                           │
│     • 12+ German business directories                           │
│     • Schema.org structured data                                │
│                                                                 │
│  📱 WHATSAPP INTEGRATION                                        │
│     • Business WhatsApp inbox                                   │
│     • Template quick-replies                                    │
│     • Optional: AI that responds 24/7                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Target Market

**German local businesses** who are great at their craft but struggling digitally:

- **Handwerk**: Elektriker, Installateure, Maler, Schreiner
- **Gastronomie**: Restaurants, Cafés, Bäckereien
- **Wellness**: Friseure, Kosmetik, Massage, Fitness
- **Healthcare**: Ärzte, Zahnärzte, Physiotherapie
- **Services**: Steuerberater, Anwälte, Immobilienmakler

These businesses lose customers daily because:
- Their website looks dated or doesn't exist
- They forget to follow up on inquiries
- They can't be found on Google
- They respond too slowly to WhatsApp/email

**We fix all of this.**

---

## The Business Model

### Pricing Tiers (Apple-Style Anchoring)

| Tier | Price | What They Get |
|------|-------|---------------|
| **Starter** | €299/mo | 5-page site, CRM, manual WhatsApp, basic emails |
| **Professional** ⭐ | €449/mo | 10-page site, WhatsApp templates, email sequences, 12 directories |
| **Premium** | €749/mo | Unlimited pages, WhatsApp AI (24/7), custom funnels |
| **Enterprise** | €1,499/mo | Multi-location, Google Ads, dedicated manager |

**Target:** 60% of clients on Professional (€449/mo)
**Goal:** 30 clients Year 1 = €16,830 MRR

### Why This Works

Traditional agency: "We'll build you a website for €15,000"
→ Client gets a website. That's it. No CRM. No automation. No SEO maintenance.

**Our model:** "€449/month for the complete digital business system"
→ Client gets everything, continuously maintained and optimized.

**The math for a client:**
- 1 new customer/month from better Google rankings = €500-2,000 revenue
- 20% more conversions from follow-up automation = €1,000-5,000/month
- 3 hours/week saved on WhatsApp = €300-500 value
- **ROI: 5-20x their investment**

---

## Technical Architecture

### The Stack

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   NEXT.JS 15    │────▶│   TWENTY CRM    │────▶│      N8N        │
│   (Website)     │     │   (Leads/Data)  │     │  (Automation)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   SHADCN/UI     │     │    GRAPHQL      │     │     RESEND      │
│   (Components)  │     │     (API)       │     │    (Email)      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                                               │
        ▼                                               ▼
┌─────────────────┐                             ┌─────────────────┐
│   GEMINI AI     │                             │     TWILIO      │
│   (Images)      │                             │ (WhatsApp/SMS)  │
└─────────────────┘                             └─────────────────┘
```

### Why These Choices

| Technology | Why |
|------------|-----|
| **Next.js 15** | Best-in-class performance, SEO, developer experience |
| **shadcn/ui** | Enterprise-quality components, fully customizable |
| **Twenty CRM** | Open-source, self-hosted, no per-seat fees |
| **n8n** | Visual automation, self-hosted, unlimited workflows |
| **Resend** | Modern email API, great deliverability |
| **Twilio** | Reliable WhatsApp Business API |
| **Gemini** | High-quality AI images at $0.05-0.10 each |

### Key Architectural Decisions

1. **NO DATABASE** - All customer data lives in Twenty CRM
2. **Config-driven** - Content in TypeScript config files, not a CMS
3. **Pre-built themes** - 8 professionally designed themes, no color picking
4. **Demo → Client workflow** - Clone demo repo, run setup script, deploy

---

## The Workflow

### For Thomas (Agency Owner)

```
1. SELL
   └─▶ Show demo site to prospect
   └─▶ "This could be yours in 2 weeks"

2. ONBOARD
   └─▶ Client fills Google Form (10 minutes)
   └─▶ Data syncs to JSON file

3. SETUP (15 minutes)
   └─▶ git clone demo-repo client-name
   └─▶ npm run setup --data=client.json
   └─▶ Script generates all config automatically

4. CUSTOMIZE (1-2 days)
   └─▶ Add client logo
   └─▶ Generate custom AI images
   └─▶ Adjust content/copy

5. DEPLOY
   └─▶ git push → Vercel auto-deploys
   └─▶ Connect custom domain
   └─▶ Submit to directories

6. MAINTAIN
   └─▶ Monthly content updates
   └─▶ SEO optimization
   └─▶ Automation monitoring
```

### For Claude (AI Assistant)

When building features or pages:

**ALWAYS:**
1. Use shadcn/ui components (NOT custom CSS)
2. Mobile-first design (70%+ traffic is mobile)
3. German language ("Du" form for B2C)
4. GDPR-compliant (privacy-first)
5. Theme CSS variables (NOT hardcoded colors)
6. Schema.org structured data on every page
7. Optimize images (WebP, <200KB)
8. Validate forms with Zod
9. **Check `docs/IMAGE_CATALOG.md` before selecting ANY image** - filename ≠ content!

**NEVER:**
1. Use a database (data lives in Twenty CRM)
2. Create a CMS (content in config files)
3. Use English text (except code comments)
4. Skip accessibility (WCAG 2.1 AA)
5. Generate realistic faces (Gemini limitation)
6. **Guess image content from filename** - always verify in IMAGE_CATALOG.md
7. Hardcode colors like `bg-orange-500`

---

## Project Structure

```
src/
├── app/                      # Next.js pages
│   ├── demo/[industry]/      # Demo landing pages
│   └── api/                  # API routes (leads, images)
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── demo/                 # Demo mode components
│   └── seo/                  # Schema markup
├── config/
│   ├── clients/              # Client configurations
│   │   └── client.config.ts  # ← Generated by setup script
│   ├── themes/               # 8 pre-built themes
│   ├── business.types.ts     # TypeScript interfaces
│   └── demo.config.ts        # Demo mode toggle
└── lib/
    ├── gemini/               # AI image generation
    └── animations/           # Framer Motion

scripts/
├── setup.ts                  # ⭐ Master setup script
├── apply-config.ts           # Config transformation
└── generate-*.ts             # Image generation

docs/
├── SETUP_WORKFLOW.md         # Clone & setup guide
├── CLIENT_ONBOARDING_FLOW.md # Full onboarding process
├── SHADCNBLOCKS_LIBRARY.md   # Component reference
└── IMAGE_PROMPT_TEMPLATES.md # AI image prompts
```

---

## Setup Commands

```bash
# New client setup (interactive wizard)
npm run setup

# Setup from JSON file (e.g., from Google Forms)
npm run setup -- --data=./client.json

# Generate AI images for client
npm run generate-images

# Development
npm run dev

# Production build
npm run build
```

---

## Theme System

**8 Pre-built Themes** - Clients select during onboarding, no color customization needed:

| Theme | Personality | Best For |
|-------|-------------|----------|
| `professional-blue` | Seriös & kompetent | Elektriker, IT, Beratung |
| `warm-orange` | Einladend & energiegeladen | Restaurant, Café, Handwerk |
| `fresh-green` | Natürlich & vertrauenswürdig | Wellness, Fitness, Bio |
| `elegant-purple` | Luxuriös & kreativ | Friseur, Kosmetik, Spa |
| `modern-slate` | Minimalistisch & zeitlos | Architektur, Tech |
| `energetic-red` | Dynamisch & leidenschaftlich | Sport, Automotive |
| `calm-teal` | Beruhigend & professionell | Arztpraxis, Pflege |
| `sunny-yellow` | Fröhlich & optimistisch | Kinder, Events |

**Usage:**
```tsx
// ✅ Correct - uses theme variables
<div className="bg-primary text-primary-foreground">
<Button variant="default">

// ❌ Wrong - breaks theming
<div className="bg-blue-500">
```

---

## Page Architecture

### Visual-First Design

Users understand the page by **scanning images**. Text is secondary support.

**The 3-Second Rule:** If someone can't understand what you offer in 3 seconds of scrolling, the page fails.

### Standard Page Structure

```
┌─────────────────────────────────────────────────────────────────┐
│  HERO (0-3 seconds)                                             │
│  "What do you do? Why should I care?"                          │
│  → Headline + CTA + Trust indicator + Hero image                │
├─────────────────────────────────────────────────────────────────┤
│  TRUST BAR                                                      │
│  → Certifications, Google rating, years in business             │
├─────────────────────────────────────────────────────────────────┤
│  SERVICES (Bento Grid)                                          │
│  → Visual cards, scannable, clickable                           │
├─────────────────────────────────────────────────────────────────┤
│  TESTIMONIALS                                                   │
│  → Customer quotes, photos, Google review link                  │
├─────────────────────────────────────────────────────────────────┤
│  PROCESS (3-4 Steps)                                            │
│  → How it works, remove friction                                │
├─────────────────────────────────────────────────────────────────┤
│  FAQ                                                            │
│  → Handle objections (pricing, timing, quality)                 │
├─────────────────────────────────────────────────────────────────┤
│  FINAL CTA                                                      │
│  → Contact form, phone number, WhatsApp                         │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER                                                         │
│  → NAP (must match Google My Business exactly!)                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Selection (shadcnblocks.com)

| Section | Block | Notes |
|---------|-------|-------|
| Hero | `hero-125` | Image + trust bar |
| Services | `feature-8` | Bento grid |
| Testimonials | `testimonial-3` | Carousel |
| CTA | `cta-3` | Split with image |
| FAQ | `faq-1` | Accordion with schema |
| Footer | `footer-3` | Full NAP |

---

## SEO Strategy

### Goal: Dominate "[Service] + [Stadt]" Searches

Example targets:
- "Elektriker München" (homepage)
- "Smart Home Installation München" (service page)
- "Elektriker Schwabing" (district page)

### Every Page Must Have

- [ ] `<title>` with city + service (50-60 chars)
- [ ] Meta description with CTA (150-160 chars)
- [ ] Schema.org LocalBusiness + Service markup
- [ ] H1 with primary keyword
- [ ] NAP in footer (identical across all pages)
- [ ] Internal links (min 3 per page)
- [ ] Image alt text with keywords

### German Business Directories (Professional Tier: 12)

1. Google My Business (critical!)
2. Gelbe Seiten
3. Das Örtliche
4. Meinestadt
5. 11880
6. Yelp Deutschland
7. GoLocal
8. StadtBranche
9. Cylex
10. Tupalo
11. Branchenbuch
12. Industry-specific (MyHammer, etc.)

---

## Performance Requirements

| Metric | Target | Why |
|--------|--------|-----|
| Lighthouse | >90 | Google ranking factor |
| LCP | <2.5s | User experience |
| FID | <100ms | Interactivity |
| CLS | <0.1 | Visual stability |
| Hero image | <100KB | Fast first paint |
| Total initial | <500KB | Mobile users |

---

## Integration Points

### Lead Flow

```
Website Form Submit
       │
       ▼
┌─────────────────┐
│   Twenty CRM    │ ← Lead created with source attribution
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   n8n Webhook   │ ← Triggers automation
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌───────┐ ┌────────┐
│ Email │ │WhatsApp│ ← Instant notifications
└───────┘ └────────┘
    │
    ▼
┌─────────────────┐
│ Follow-up       │ ← Day 1, 3, 7 sequences
│ Sequence        │
└─────────────────┘
```

### Demo Mode

Controlled by `NEXT_PUBLIC_DEMO_MODE` environment variable:

- **ON** (demo sites): Shows agency branding, "I want this" buttons
- **OFF** (client sites): Clean client-only experience

Setup script automatically disables demo mode.

---

## Quality Checklist

Before launching any client site:

**Technical:**
- [ ] Build passes (`npm run build`)
- [ ] No TypeScript errors
- [ ] Mobile responsive (test on real device)
- [ ] Forms submit to CRM successfully
- [ ] WhatsApp link works
- [ ] Phone number clickable on mobile

**Content:**
- [ ] Logo in `/public/images/logo.png`
- [ ] All placeholder text replaced
- [ ] German spelling/grammar correct
- [ ] NAP matches Google My Business exactly

**SEO:**
- [ ] Unique title/description per page
- [ ] Schema.org validates (Google Rich Results Test)
- [ ] Sitemap generated
- [ ] robots.txt correct
- [ ] Google Search Console connected

**Performance:**
- [ ] Lighthouse >90 mobile
- [ ] Images optimized (<200KB each)
- [ ] No render-blocking resources

---

## Documentation Index

| Document | When to Read |
|----------|--------------|
| `docs/SETUP_WORKFLOW.md` | Setting up new client |
| `docs/CLIENT_ONBOARDING_FLOW.md` | Understanding onboarding funnel |
| `docs/SHADCNBLOCKS_LIBRARY.md` | Choosing components |
| `docs/IMAGE_CATALOG.md` | **ALWAYS check before selecting any image** |
| `docs/IMAGE_PROMPT_TEMPLATES.md` | Generating AI images |
| `docs/CLIENT_BUILD_CHECKLIST.md` | Pre-launch verification |
| `docs/MULTI_REPO_ARCHITECTURE.md` | System architecture |

---

## The Vision

**Year 1:** 30 clients, €16,830 MRR, prove the model
**Year 2:** 100 clients, scale with AI automation
**Year 3:** White-label platform for other agencies

Every German Handwerker, restaurant owner, and salon deserves a digital presence that matches the quality of their work. We're building the system to make that happen at scale.

---

**Built by Thomas Fabig | Fabig Webdevelopment**
*Elevating German local businesses to enterprise level*
