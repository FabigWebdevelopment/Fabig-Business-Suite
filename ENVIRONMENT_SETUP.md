# Environment Variables Setup Guide

**Last Updated:** January 2025
**For:** Fabig Business Suite
**Environments:** Local, Vercel Preview, Vercel Production, GitHub Actions

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [All Environment Variables](#all-environment-variables)
3. [Local Development Setup](#local-development-setup)
4. [Vercel Setup](#vercel-setup)
5. [GitHub Actions Setup](#github-actions-setup)
6. [Service-Specific Guides](#service-specific-guides)
7. [Security Best Practices](#security-best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Quick Start

### Prerequisites

Before setting up environment variables, ensure you have:

- [ ] Neon PostgreSQL account (https://neon.tech)
- [ ] Vercel account (https://vercel.com)
- [ ] GitHub repository created
- [ ] Domain purchased: `fabig-suite.de` and `fabig-suite.com`

### Optional Services (Can be added later)

- [ ] Resend account (https://resend.com) - Week 5
- [ ] Twilio account (https://twilio.com) - Week 7
- [ ] OpenAI API access (https://platform.openai.com) - Week 8
- [ ] Stripe account (https://stripe.com) - Week 10
- [ ] Sentry account (https://sentry.io) - Week 11

---

## All Environment Variables

### Core Variables (Required for All Environments)

```bash
# Database
DATABASE_URI=                    # PostgreSQL connection string
                                # Format: postgresql://user:password@host/database

# Payload CMS
PAYLOAD_SECRET=                  # Min 32 characters, use: openssl rand -base64 32
NEXT_PUBLIC_SERVER_URL=          # Your app URL (no trailing slash)

# Node Environment
NODE_ENV=                        # development | production
```

### Email (Resend) - Required Week 5+

```bash
RESEND_API_KEY=                  # Resend API key (re_...)
EMAIL_FROM=                      # Default sender email
                                # e.g., noreply@fabig-suite.de
```

### SMS & Phone (Twilio) - Required Week 7+

```bash
TWILIO_ACCOUNT_SID=              # Twilio Account SID (AC...)
TWILIO_AUTH_TOKEN=               # Twilio Auth Token
TWILIO_PHONE_NUMBER=             # Your Twilio phone number
                                # Format: +4915112345678
```

### WhatsApp Business API - Required Week 8+

```bash
WHATSAPP_ACCESS_TOKEN=           # Meta WhatsApp Business API token
WHATSAPP_PHONE_NUMBER_ID=        # WhatsApp Phone Number ID
WHATSAPP_BUSINESS_ACCOUNT_ID=    # WhatsApp Business Account ID
WHATSAPP_WEBHOOK_VERIFY_TOKEN=   # Random string for webhook verification
                                # Generate: openssl rand -base64 32
```

### AI (OpenAI) - Required Week 8+

```bash
OPENAI_API_KEY=                  # OpenAI API key (sk-...)
OPENAI_ORGANIZATION_ID=          # Optional: Organization ID
```

### Payments (Stripe) - Required Week 10+

```bash
STRIPE_SECRET_KEY=               # Stripe secret key (sk_test_... or sk_live_...)
STRIPE_WEBHOOK_SECRET=           # Stripe webhook signing secret (whsec_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Stripe publishable key (pk_test_... or pk_live_...)
```

### Error Tracking (Sentry) - Optional

```bash
SENTRY_DSN=                      # Sentry DSN for error tracking
SENTRY_AUTH_TOKEN=               # Sentry auth token for sourcemaps
SENTRY_ORG=                      # Sentry organization slug
SENTRY_PROJECT=                  # Sentry project slug
```

### Vercel (Auto-populated in Vercel environments)

```bash
VERCEL_ENV=                      # Auto-set: production | preview | development
VERCEL_URL=                      # Auto-set: Deployment URL
VERCEL_GIT_COMMIT_SHA=           # Auto-set: Git commit SHA
```

### Trigger.dev (Background Jobs) - Required Week 5+

```bash
TRIGGER_API_KEY=                 # Trigger.dev API key
TRIGGER_API_URL=                 # Trigger.dev API URL (usually https://api.trigger.dev)
```

---

## Local Development Setup

### Step 1: Copy Environment Template

```bash
cd C:\Users\Fabig\Desktop\Fabig Webdevelopment\projects\website-builder
cp .env.local.example .env.local
```

### Step 2: Generate Secrets

```bash
# Generate Payload secret (32+ characters)
openssl rand -base64 32

# Generate WhatsApp webhook verify token
openssl rand -base64 32
```

### Step 3: Set Up Neon Database (Local Branch)

1. Go to https://neon.tech
2. Create new project: `fabig-business-suite`
3. Create branch: `dev-local`
4. Copy connection string
5. Add to `.env.local`:

```bash
DATABASE_URI=postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

### Step 4: Configure Local Environment

Create `.env.local`:

```bash
# =============================================================================
# LOCAL DEVELOPMENT ENVIRONMENT
# =============================================================================

# Database (Neon dev-local branch)
DATABASE_URI=postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Payload CMS
PAYLOAD_SECRET=your-generated-secret-here-min-32-chars
NEXT_PUBLIC_SERVER_URL=http://localhost:3000

# Node Environment
NODE_ENV=development

# Email (Resend) - Optional for local dev
RESEND_API_KEY=re_123456789
EMAIL_FROM=dev@localhost

# SMS (Twilio) - Optional for local dev
# TWILIO_ACCOUNT_SID=
# TWILIO_AUTH_TOKEN=
# TWILIO_PHONE_NUMBER=

# WhatsApp - Optional for local dev (use test credentials)
# WHATSAPP_ACCESS_TOKEN=test_token
# WHATSAPP_PHONE_NUMBER_ID=test_id
# WHATSAPP_BUSINESS_ACCOUNT_ID=test_account
# WHATSAPP_WEBHOOK_VERIFY_TOKEN=test_verify_token

# OpenAI (use personal API key for testing)
OPENAI_API_KEY=sk-your-personal-openai-key

# Stripe (use test mode)
# STRIPE_SECRET_KEY=sk_test_...
# STRIPE_WEBHOOK_SECRET=whsec_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Trigger.dev (optional for local)
# TRIGGER_API_KEY=
# TRIGGER_API_URL=https://api.trigger.dev

# Sentry (optional for local)
# SENTRY_DSN=
```

### Step 5: Verify Setup

```bash
# Start Docker PostgreSQL (if using local Postgres instead of Neon)
docker-compose up -d postgres

# Install dependencies
pnpm install

# Push database schema
pnpm db:push

# Start dev server
pnpm dev
```

Visit http://localhost:3000 and create your first admin account.

---

## Vercel Setup

### Step 1: Connect GitHub Repository

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import: `FabigWebdevelopment/Fabig-Business-Suite`
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `pnpm build`
   - **Output Directory:** `.next`

### Step 2: Set Up Neon Database Branches

**Production Branch:**
```bash
Branch: main
Database: fabig_suite_production
```

**Preview Branch (for all PRs):**
```bash
Branch: develop
Database: fabig_suite_staging
```

### Step 3: Configure Environment Variables in Vercel

#### Production Environment

Go to: Vercel Dashboard → Project Settings → Environment Variables

**Select Environment:** Production

```bash
# Core
DATABASE_URI=postgresql://user:pass@prod-endpoint.neon.tech/fabig_suite_production?sslmode=require
PAYLOAD_SECRET=<generate-new-secret-for-production>
NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de

# Email (Resend)
RESEND_API_KEY=re_production_key
EMAIL_FROM=noreply@fabig-suite.de

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+4915112345678

# WhatsApp Business
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<generate-new-verify-token>

# OpenAI
OPENAI_API_KEY=sk-production-key

# Stripe (LIVE mode)
STRIPE_SECRET_KEY=sk_live_YOUR_STRIPE_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE

# Trigger.dev
TRIGGER_API_KEY=tr_prod_xxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev

# Sentry
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENTRY_ORG=fabig-webdevelopment
SENTRY_PROJECT=fabig-business-suite
```

#### Preview Environment

**Select Environment:** Preview

```bash
# Core
DATABASE_URI=postgresql://user:pass@preview-endpoint.neon.tech/fabig_suite_staging?sslmode=require
PAYLOAD_SECRET=<different-secret-than-production>
NEXT_PUBLIC_SERVER_URL=https://staging.fabig-suite.de

# Email (Resend - same as prod or separate test domain)
RESEND_API_KEY=re_production_key
EMAIL_FROM=staging@fabig-suite.de

# SMS (Twilio - same account, test numbers)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+4915112345678

# WhatsApp Business (Test credentials or same as prod)
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<staging-verify-token>

# OpenAI (same key okay for staging)
OPENAI_API_KEY=sk-production-key

# Stripe (TEST mode)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY

# Trigger.dev
TRIGGER_API_KEY=tr_dev_xxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev

# Sentry (optional for preview)
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxx
```

### Step 4: Configure Domains in Vercel

**Production Domains:**
- Primary: `fabig-suite.de`
- Alias: `www.fabig-suite.de`
- Alias: `fabig-suite.com`
- Alias: `www.fabig-suite.com`

**Staging Domain:**
- `staging.fabig-suite.de`

**Wildcard Subdomains (for tenant websites):**
- `*.fabig-suite.de` → Will be configured later for multi-tenant routing

### Step 5: Get Vercel Secrets for GitHub Actions

In Vercel Dashboard → Settings → Tokens:

1. Create new token: `github-actions-deployment`
2. Copy token
3. Copy Project ID from Project Settings → General
4. Copy Organization ID from Account Settings

These will be used in GitHub Actions setup.

---

## GitHub Actions Setup

### Step 1: Add Secrets to GitHub Repository

Go to: GitHub Repository → Settings → Secrets and variables → Actions

Click "New repository secret" and add:

#### Vercel Secrets

```bash
Name: VERCEL_TOKEN
Value: <token-from-vercel-dashboard>

Name: VERCEL_ORG_ID
Value: <org-id-from-vercel>

Name: VERCEL_PROJECT_ID
Value: <project-id-from-vercel>
```

#### Database Secrets (for CI tests)

```bash
Name: DATABASE_URI_TEST
Value: postgresql://user:pass@test-endpoint.neon.tech/fabig_suite_test?sslmode=require

Name: PAYLOAD_SECRET_TEST
Value: <generate-test-secret-min-32-chars>
```

### Step 2: Verify GitHub Actions Workflows

The workflows are already created in `.github/workflows/`:

- `ci.yml` - Runs on every PR (type-check, lint, build)
- `deploy-staging.yml` - Auto-deploys `develop` branch
- `deploy-production.yml` - Auto-deploys `main` branch

### Step 3: Test GitHub Actions

```bash
# Create a test branch
git checkout -b test/github-actions

# Make a small change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test GitHub Actions"
git push origin test/github-actions

# Create PR on GitHub
# → This should trigger CI workflow
```

Check Actions tab on GitHub to see if tests run successfully.

---

## Service-Specific Guides

### Neon PostgreSQL Setup

**1. Create Neon Account**
```
URL: https://console.neon.tech/signup
Plan: Free tier (500 MB) → Upgrade to Pro when needed
```

**2. Create Project**
```
Project Name: fabig-business-suite
Region: EU Central (Frankfurt) - GDPR compliance
Compute: Autoscaling (0.25 - 1 vCPU)
```

**3. Create Database Branches**
```bash
# Production (from main branch)
main → fabig_suite_production

# Staging (from develop branch)
develop → fabig_suite_staging

# Local dev (personal branch)
dev-thomas → fabig_suite_dev_thomas
```

**4. Get Connection Strings**
```
Go to: Project → Connection Details → Connection string
Copy string for each branch
Add to respective environments
```

**5. Enable Database Branching**
```
Settings → Branching → Enable
This allows automatic preview databases for each PR
```

---

### Resend Setup (Week 5)

**1. Create Account**
```
URL: https://resend.com/signup
Plan: Free (3,000 emails/month) → Pro when needed
```

**2. Get API Key**
```
Dashboard → API Keys → Create API Key
Name: fabig-suite-production
Permissions: Full access
Copy key → Add to RESEND_API_KEY
```

**3. Add Domain (Production)**
```
Dashboard → Domains → Add Domain
Domain: emails.fabig-suite.de
Region: EU (Frankfurt)

→ Copy DNS records
→ Add to domain provider (Cloudflare/Namecheap/etc.)
→ Verify
```

**4. Configure Email From Address**
```
Default FROM: noreply@emails.fabig-suite.de
Reply-To: support@fabig-suite.de
```

---

### Twilio Setup (Week 7)

**1. Create Account**
```
URL: https://www.twilio.com/try-twilio
Plan: Pay-as-you-go
```

**2. Get Credentials**
```
Console → Account Info
→ Copy Account SID → TWILIO_ACCOUNT_SID
→ Copy Auth Token → TWILIO_AUTH_TOKEN
```

**3. Buy Phone Number (Germany)**
```
Console → Phone Numbers → Buy a Number
Country: Germany (+49)
Capabilities: SMS + Voice
Number Type: Local

→ Copy phone number → TWILIO_PHONE_NUMBER
```

**4. Configure Webhooks**
```
Phone Numbers → Manage → Active Numbers → Select your number

SMS Webhooks:
- Incoming: https://fabig-suite.de/api/webhooks/twilio/sms
- Status: https://fabig-suite.de/api/webhooks/twilio/status

Voice Webhooks:
- Incoming: https://fabig-suite.de/api/webhooks/twilio/voice
```

---

### WhatsApp Business API Setup (Week 8)

**1. Create Meta Business Account**
```
URL: https://business.facebook.com
Create Business Account for: Fabig Webdevelopment
```

**2. Set Up WhatsApp Business API**
```
Meta Business Suite → WhatsApp → Get Started
Choose: WhatsApp Business API (not regular WhatsApp Business App)
```

**3. Register Phone Number**
```
Use Twilio phone number or buy separate WhatsApp number
Phone: +49 151 12345678 (example)
Verify with SMS/Voice
```

**4. Get API Credentials**
```
WhatsApp Manager → API Setup
→ Copy Access Token → WHATSAPP_ACCESS_TOKEN
→ Copy Phone Number ID → WHATSAPP_PHONE_NUMBER_ID
→ Copy Business Account ID → WHATSAPP_BUSINESS_ACCOUNT_ID
```

**5. Configure Webhook**
```
WhatsApp Manager → Configuration → Webhook
Callback URL: https://fabig-suite.de/api/webhooks/whatsapp
Verify Token: <your-generated-token> → WHATSAPP_WEBHOOK_VERIFY_TOKEN

Subscribe to:
- messages
- message_status
- message_template_status
```

**6. Set Up Message Templates**
```
WhatsApp Manager → Message Templates
Create templates for:
- Review requests
- Appointment confirmations
- Follow-ups
(Requires Meta approval - 24-48 hours)
```

---

### OpenAI Setup (Week 8)

**1. Create Account**
```
URL: https://platform.openai.com/signup
Add payment method (credit card)
```

**2. Get API Key**
```
Dashboard → API Keys → Create new secret key
Name: fabig-suite-production
Copy key → OPENAI_API_KEY
```

**3. Set Usage Limits**
```
Settings → Limits → Set monthly budget
Recommended: $100/month initially
Set up email alerts at 50%, 75%, 90%
```

**4. Choose Model**
```
Model: gpt-4o-mini
Cost: $0.150 / 1M input tokens, $0.600 / 1M output tokens
Much cheaper than gpt-4, perfect for WhatsApp conversations
```

---

### Stripe Setup (Week 10)

**1. Create Account**
```
URL: https://dashboard.stripe.com/register
Business: Fabig Webdevelopment
Country: Germany
```

**2. Activate Account**
```
Complete business verification:
- Business details
- Bank account
- Tax information (VAT ID)
```

**3. Get API Keys**

**Test Mode:**
```
Developers → API Keys → Test mode
→ Publishable key → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (test)
→ Secret key → STRIPE_SECRET_KEY (test)
```

**Live Mode:**
```
Developers → API Keys → Live mode
→ Publishable key → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (live)
→ Secret key → STRIPE_SECRET_KEY (live)
```

**4. Set Up Webhook**
```
Developers → Webhooks → Add endpoint
Endpoint URL: https://fabig-suite.de/api/webhooks/stripe
Events to send:
- checkout.session.completed
- customer.subscription.created
- customer.subscription.updated
- customer.subscription.deleted
- invoice.payment_succeeded
- invoice.payment_failed

→ Copy Signing Secret → STRIPE_WEBHOOK_SECRET
```

**5. Create Products**
```
Products → Add Product
1. Starter: €299/month
2. Professional: €499/month
3. Premium: €799/month
4. Enterprise: €2000/month

→ Copy Price IDs for each product
```

---

### Trigger.dev Setup (Week 5)

**1. Create Account**
```
URL: https://cloud.trigger.dev/signup
Plan: Free (3,000 runs/month) → Pro when needed
```

**2. Create Project**
```
Dashboard → Create Project
Name: fabig-business-suite
Framework: Next.js
```

**3. Get API Key**
```
Project Settings → API Keys
→ Copy API Key → TRIGGER_API_KEY
→ Copy API URL → TRIGGER_API_URL (usually https://api.trigger.dev)
```

**4. Initialize in Project**
```bash
pnpm add @trigger.dev/sdk @trigger.dev/nextjs

# Follow Trigger.dev setup wizard
npx @trigger.dev/cli@latest init
```

---

### Sentry Setup (Optional - Week 11)

**1. Create Account**
```
URL: https://sentry.io/signup
Plan: Developer (free) → Team when needed
```

**2. Create Project**
```
Projects → Create Project
Platform: Next.js
Name: fabig-business-suite
```

**3. Get DSN**
```
Settings → Projects → fabig-business-suite → Client Keys (DSN)
→ Copy DSN → SENTRY_DSN
```

**4. Get Auth Token (for sourcemaps)**
```
Settings → Account → API → Auth Tokens
→ Create token with scope: project:releases
→ Copy token → SENTRY_AUTH_TOKEN
```

**5. Configure Organization**
```
SENTRY_ORG=fabig-webdevelopment
SENTRY_PROJECT=fabig-business-suite
```

---

## Security Best Practices

### Secret Management

**✅ DO:**
- Use environment variables for all secrets
- Generate unique secrets for each environment
- Rotate secrets regularly (every 90 days)
- Use strong, random secrets (min 32 characters)
- Store production secrets in password manager

**❌ DON'T:**
- Commit secrets to Git (never!)
- Reuse secrets across environments
- Share secrets via email/Slack
- Use weak/predictable secrets
- Store secrets in code comments

### Secret Rotation Schedule

```bash
# Every 90 days:
1. Generate new PAYLOAD_SECRET
2. Generate new WHATSAPP_WEBHOOK_VERIFY_TOKEN
3. Rotate Stripe webhook secrets

# Every 180 days:
1. Rotate database passwords
2. Rotate API keys (Resend, Twilio, OpenAI)

# Immediately rotate if:
- Secret potentially leaked
- Employee with access leaves
- Suspicious activity detected
```

### Environment Separation

**Strict Separation:**
```
Local Development:
- Test database
- Test Stripe keys
- Test Twilio numbers
- Personal OpenAI key (low limit)

Staging/Preview:
- Separate database branch
- Test Stripe keys
- Same production APIs (Resend, Twilio)
- Shared OpenAI key

Production:
- Production database
- Live Stripe keys
- Production APIs
- Production OpenAI key (with spending limits)
```

### Monitoring & Alerts

**Set up alerts for:**
- Unusual API usage (OpenAI, Twilio)
- Failed database connections
- Stripe webhook failures
- High error rates (Sentry)
- Environment variable changes (Vercel)

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Fails

**Error:**
```
Error: connect ETIMEDOUT
```

**Fix:**
```bash
# Check DATABASE_URI format
# Must include ?sslmode=require for Neon
DATABASE_URI=postgresql://user:pass@host/db?sslmode=require

# Verify IP allowlist in Neon (should be 0.0.0.0/0 for Vercel)
```

#### 2. Payload Secret Too Short

**Error:**
```
Payload secret must be at least 32 characters
```

**Fix:**
```bash
# Generate new secret
openssl rand -base64 32

# Or use this JavaScript
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 3. Environment Variables Not Loading

**Error:**
```
process.env.RESEND_API_KEY is undefined
```

**Fix:**
```bash
# Restart Next.js dev server (required after .env changes)
pnpm dev

# Verify .env.local exists and has correct variables
cat .env.local | grep RESEND_API_KEY

# Check Vercel deployment logs for missing vars
```

#### 4. CORS Errors

**Error:**
```
Access to fetch blocked by CORS policy
```

**Fix:**
```typescript
// In payload.config.ts, verify CORS domains
cors: [
  process.env.NEXT_PUBLIC_SERVER_URL,
  'https://fabig-suite.de',
  'https://staging.fabig-suite.de',
].filter(Boolean)
```

#### 5. Stripe Webhook Signature Verification Failed

**Error:**
```
No signatures found matching the expected signature
```

**Fix:**
```bash
# Verify STRIPE_WEBHOOK_SECRET matches Stripe dashboard
# Dashboard → Webhooks → Select endpoint → Signing secret

# For local testing, use Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Environment Variables Checklist

Use this checklist when setting up each environment:

### Local Development
- [ ] DATABASE_URI (Neon dev branch)
- [ ] PAYLOAD_SECRET (generated with openssl)
- [ ] NEXT_PUBLIC_SERVER_URL (http://localhost:3000)
- [ ] RESEND_API_KEY (optional)
- [ ] OPENAI_API_KEY (personal key)

### Vercel Preview (Staging)
- [ ] DATABASE_URI (Neon staging branch)
- [ ] PAYLOAD_SECRET (unique for staging)
- [ ] NEXT_PUBLIC_SERVER_URL (https://staging.fabig-suite.de)
- [ ] RESEND_API_KEY
- [ ] TWILIO credentials
- [ ] WHATSAPP credentials
- [ ] OPENAI_API_KEY
- [ ] STRIPE_SECRET_KEY (test mode)
- [ ] TRIGGER_API_KEY

### Vercel Production
- [ ] DATABASE_URI (Neon production branch)
- [ ] PAYLOAD_SECRET (unique for production, stored securely)
- [ ] NEXT_PUBLIC_SERVER_URL (https://fabig-suite.de)
- [ ] RESEND_API_KEY
- [ ] TWILIO credentials
- [ ] WHATSAPP credentials
- [ ] OPENAI_API_KEY
- [ ] STRIPE_SECRET_KEY (live mode)
- [ ] TRIGGER_API_KEY
- [ ] SENTRY_DSN

### GitHub Actions
- [ ] VERCEL_TOKEN
- [ ] VERCEL_ORG_ID
- [ ] VERCEL_PROJECT_ID
- [ ] DATABASE_URI_TEST
- [ ] PAYLOAD_SECRET_TEST

---

## Quick Reference

### Generate Secrets Commands

```bash
# Payload secret (32+ chars)
openssl rand -base64 32

# WhatsApp webhook verify token
openssl rand -base64 32

# UUID for webhook verify token
node -e "console.log(require('crypto').randomUUID())"
```

### Check Environment Variables

```bash
# Local (shows all loaded vars)
pnpm dev
# Then check console output

# Vercel (via CLI)
vercel env ls

# Vercel (via dashboard)
# Project → Settings → Environment Variables
```

### Environment Variable Naming Convention

```bash
# Public (exposed to browser) - prefix with NEXT_PUBLIC_
NEXT_PUBLIC_SERVER_URL=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Private (server-only) - no prefix
DATABASE_URI=
PAYLOAD_SECRET=
STRIPE_SECRET_KEY=
```

---

## Support

If you encounter issues:

1. Check troubleshooting section above
2. Review service-specific documentation
3. Check Vercel deployment logs
4. Contact service support:
   - Neon: support@neon.tech
   - Resend: support@resend.com
   - Twilio: support@twilio.com
   - Stripe: support@stripe.com

---

**Last Updated:** January 2025
**Maintained By:** Thomas Fabig | Fabig Webdevelopment
