# Environment Variables - Quick Reference

**Last Updated:** January 2025
**For:** Fabig Business Suite

---

## 📋 Copy-Paste Templates

### Local Development (.env.local)

```bash
# Core (Required)
DATABASE_URI=postgresql://user:pass@host.neon.tech/db?sslmode=require
PAYLOAD_SECRET=<openssl rand -base64 32>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NODE_ENV=development

# Email (Week 5+)
RESEND_API_KEY=re_123456789
EMAIL_FROM=dev@localhost

# OpenAI (Week 8+)
OPENAI_API_KEY=sk-your-personal-key

# Stripe Test Mode (Week 10+)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
```

---

### Vercel Production

```bash
# Core
DATABASE_URI=postgresql://user:pass@prod-host.neon.tech/fabig_suite_production?sslmode=require
PAYLOAD_SECRET=<unique-production-secret>
NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de
NODE_ENV=production

# Email
RESEND_API_KEY=re_production_key
EMAIL_FROM=noreply@fabig-suite.de

# SMS & Phone
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+4915112345678

# WhatsApp
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<openssl rand -base64 32>

# OpenAI
OPENAI_API_KEY=sk-production-key

# Stripe LIVE Mode
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY

# Background Jobs
TRIGGER_API_KEY=tr_prod_xxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev

# Error Tracking
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENTRY_ORG=fabig-webdevelopment
SENTRY_PROJECT=fabig-business-suite
```

---

### Vercel Preview (Staging)

```bash
# Core
DATABASE_URI=postgresql://user:pass@staging-host.neon.tech/fabig_suite_staging?sslmode=require
PAYLOAD_SECRET=<unique-staging-secret>
NEXT_PUBLIC_SERVER_URL=https://staging.fabig-suite.de
NODE_ENV=production

# Email (same as production)
RESEND_API_KEY=re_production_key
EMAIL_FROM=staging@fabig-suite.de

# SMS & Phone (same as production)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+4915112345678

# WhatsApp (same as production or test credentials)
WHATSAPP_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<staging-verify-token>

# OpenAI (same as production)
OPENAI_API_KEY=sk-production-key

# Stripe TEST Mode
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY

# Background Jobs
TRIGGER_API_KEY=tr_dev_xxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev

# Error Tracking (optional)
SENTRY_DSN=https://xxxxxxxxxxxxx@sentry.io/xxxxxxx
```

---

### GitHub Actions Secrets

```bash
# Vercel Deployment
VERCEL_TOKEN=<token-from-vercel-dashboard>
VERCEL_ORG_ID=<your-org-id>
VERCEL_PROJECT_ID=<your-project-id>

# Testing Database
DATABASE_URI_TEST=postgresql://user:pass@test-host.neon.tech/fabig_suite_test?sslmode=require
PAYLOAD_SECRET_TEST=<openssl rand -base64 32>
```

---

## 🔑 How to Get Each Value

| Variable | Where to Get It | When Needed |
|----------|----------------|-------------|
| **DATABASE_URI** | Neon Dashboard → Project → Connection Details | Week 1 |
| **PAYLOAD_SECRET** | Generate: `openssl rand -base64 32` | Week 1 |
| **NEXT_PUBLIC_SERVER_URL** | Your domain (e.g., https://fabig-suite.de) | Week 1 |
| **RESEND_API_KEY** | Resend Dashboard → API Keys → Create | Week 5 |
| **EMAIL_FROM** | Your sending email (e.g., noreply@fabig-suite.de) | Week 5 |
| **TWILIO_ACCOUNT_SID** | Twilio Console → Account Info | Week 7 |
| **TWILIO_AUTH_TOKEN** | Twilio Console → Account Info | Week 7 |
| **TWILIO_PHONE_NUMBER** | Twilio Console → Buy Phone Number | Week 7 |
| **WHATSAPP_ACCESS_TOKEN** | Meta Business → WhatsApp → API Setup | Week 8 |
| **WHATSAPP_PHONE_NUMBER_ID** | Meta Business → WhatsApp → API Setup | Week 8 |
| **WHATSAPP_BUSINESS_ACCOUNT_ID** | Meta Business → WhatsApp → API Setup | Week 8 |
| **WHATSAPP_WEBHOOK_VERIFY_TOKEN** | Generate: `openssl rand -base64 32` | Week 8 |
| **OPENAI_API_KEY** | OpenAI Platform → API Keys → Create | Week 8 |
| **STRIPE_SECRET_KEY** | Stripe Dashboard → Developers → API Keys | Week 10 |
| **STRIPE_WEBHOOK_SECRET** | Stripe Dashboard → Webhooks → Endpoint → Signing Secret | Week 10 |
| **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** | Stripe Dashboard → Developers → API Keys | Week 10 |
| **TRIGGER_API_KEY** | Trigger.dev Dashboard → Project Settings → API Keys | Week 5 |
| **TRIGGER_API_URL** | Usually: https://api.trigger.dev | Week 5 |
| **SENTRY_DSN** | Sentry → Project → Settings → Client Keys | Week 11 |
| **SENTRY_AUTH_TOKEN** | Sentry → Account → API → Auth Tokens | Week 11 |
| **VERCEL_TOKEN** | Vercel Dashboard → Settings → Tokens | Week 1 |
| **VERCEL_ORG_ID** | Vercel Dashboard → Account Settings | Week 1 |
| **VERCEL_PROJECT_ID** | Vercel Project → Settings → General | Week 1 |

---

## 🚀 Step-by-Step Setup Commands

### 1. Generate All Secrets Locally

```bash
# Payload secret for local
openssl rand -base64 32

# Payload secret for staging
openssl rand -base64 32

# Payload secret for production
openssl rand -base64 32

# WhatsApp verify token for production
openssl rand -base64 32

# WhatsApp verify token for staging
openssl rand -base64 32

# Payload secret for CI tests
openssl rand -base64 32
```

**Save these to your password manager immediately!**

---

### 2. Set Up Neon Databases

```bash
# Create 4 database branches in Neon:
1. main → fabig_suite_production
2. develop → fabig_suite_staging
3. dev-thomas → fabig_suite_dev_thomas
4. ci-tests → fabig_suite_test

# Get connection string for each:
# Neon → Project → Branches → Select branch → Connection Details
```

---

### 3. Configure Vercel Environment Variables

```bash
# Via Vercel CLI (faster)
vercel env add DATABASE_URI production
vercel env add PAYLOAD_SECRET production
vercel env add NEXT_PUBLIC_SERVER_URL production

# Or via Dashboard:
# Vercel → Project → Settings → Environment Variables
```

---

### 4. Add GitHub Secrets

```bash
# Go to: GitHub Repo → Settings → Secrets → Actions

# Add these 5 secrets:
1. VERCEL_TOKEN
2. VERCEL_ORG_ID
3. VERCEL_PROJECT_ID
4. DATABASE_URI_TEST
5. PAYLOAD_SECRET_TEST
```

---

## ⚠️ Important Security Rules

### Secret Management

1. **Never commit secrets to Git**
   - `.env.local` is in `.gitignore`
   - Double-check before committing

2. **Use unique secrets for each environment**
   - Production ≠ Staging ≠ Local
   - Generate fresh secrets for each

3. **Rotate secrets regularly**
   - Production secrets: Every 90 days
   - API keys: Every 180 days
   - Immediately if leaked

4. **Store secrets securely**
   - Use password manager (1Password, Bitwarden, etc.)
   - Never share via email/Slack
   - Only share via secure channels

### Environment Separation

```
Local Development:
→ Test database
→ Test Stripe keys
→ Personal OpenAI key

Staging/Preview:
→ Staging database
→ Test Stripe keys
→ Production APIs (Resend, Twilio)

Production:
→ Production database
→ Live Stripe keys
→ Production APIs
→ Error tracking enabled
```

---

## 🔍 Verification Checklist

After setting up environment variables:

### Local Development
```bash
# Test database connection
pnpm db:push

# Test build
pnpm build

# Start dev server
pnpm dev

# Visit http://localhost:3000/admin
# → Should load without errors
```

### Vercel Production
```bash
# Deploy to production
git push origin main

# Check deployment logs in Vercel

# Visit https://fabig-suite.de
# → Should load without errors

# Check environment variables loaded:
# Vercel → Deployment → View Function Logs
# → Look for successful database connection
```

### GitHub Actions
```bash
# Create test PR

# Check Actions tab
# → CI should pass all checks

# Check for environment variable errors in logs
```

---

## 📞 Support

**If you see these errors:**

```
Error: DATABASE_URI is not defined
→ Add DATABASE_URI to .env.local or Vercel

Error: PAYLOAD_SECRET must be at least 32 characters
→ Generate new secret: openssl rand -base64 32

Error: connect ETIMEDOUT
→ Check DATABASE_URI includes ?sslmode=require

Error: Invalid Stripe secret key
→ Verify you're using correct mode (test vs live)

Error: CORS blocked
→ Add domain to payload.config.ts cors array
```

**Documentation:**
- Complete guide: `ENVIRONMENT_SETUP.md`
- Setup checklist: `SETUP_CHECKLIST.md`
- Deployment workflow: `DEV_TO_PROD_WORKFLOW.md`

---

**Last Updated:** January 2025
**Maintained By:** Thomas Fabig
