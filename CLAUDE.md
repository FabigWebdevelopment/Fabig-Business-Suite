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

## 💰 Pricing Tiers (All Include WhatsApp AI!)

| Feature | Starter (€299) | Professional (€499) | Premium (€799) | Enterprise (€2000+) |
|---------|----------------|---------------------|----------------|---------------------|
| **Landing Page** | ✅ 5 pages | ✅ 10 pages | ✅ Unlimited | ✅ Unlimited + Custom |
| **Twenty CRM** | ✅ Unlimited leads | ✅ Unlimited leads | ✅ Unlimited leads | ✅ Unlimited leads |
| **WhatsApp AI** | ✅ 500 conv/mo | ✅ 1500 conv/mo | ✅ 3000 conv/mo | ✅ Unlimited |
| **Email Automation** | ✅ Basic (3 sequences) | ✅ Advanced (10 sequences) | ✅ Advanced | ✅ Custom |
| **SMS Notifications** | ✅ 100/mo | ✅ 300/mo | ✅ 1000/mo | ✅ Unlimited |
| **Local SEO** | ✅ Basic (5 directories) | ✅ Pro (10+ directories) | ✅ Enterprise (20+ directories) | ✅ Custom + Google Ads |
| **Updates/Month** | 2 content updates | 5 content updates | Unlimited | Unlimited + Priority |
| **Support** | Email (48h response) | Email + Chat (24h) | Priority (12h) | Dedicated manager |

**Key Differentiator:** WhatsApp AI automation is included in ALL tiers - not just premium. Every local business gets 24/7 AI customer service.

**Conversation Limits Explained:**
- 1 conversation = Complete exchange (can be 10+ messages)
- Average business uses 200-400 conversations/month
- Overages: €0.50/conversation (still cheaper than hiring staff)

**Add-ons (Optional):**
- Google Ads Management: +€500/mo (requires €1000+ ad spend)
- Additional WhatsApp conversations: +€100/1000 conversations
- Custom integrations (POS, booking systems): Quote-based
- Industry-specific features (menu management for restaurants, appointment booking for salons): +€150/mo

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
