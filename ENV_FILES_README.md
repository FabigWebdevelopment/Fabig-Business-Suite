# Environment Files - Quick Guide

This folder contains environment configuration templates for different deployment environments.

## 📁 Available Files

### For Vercel Deployment
- **`.env.production`** - Production environment (fabig-suite.de)
- **`.env.staging`** - Staging/Preview environment (staging.fabig-suite.de)

### For Local Development
- **`.env.local.example`** - Template for local development
- **`.env.local`** - Your actual local environment (git-ignored, create from example)

### Documentation & Templates
- **`vercel-env-production.txt`** - Detailed production template with comments
- **`vercel-env-preview.txt`** - Detailed staging template with comments
- **`VERCEL_DEPLOYMENT_GUIDE.md`** - Complete deployment instructions

---

## 🚀 How to Use

### Option 1: Copy to Vercel Dashboard (Recommended)

1. **Open the file:**
   - For production: Open `.env.production`
   - For staging: Open `.env.staging`

2. **Replace placeholders:**
   - Replace all `XXXXXXXX` with your actual values
   - Replace `REPLACE_WITH_*` with real secrets

3. **Copy to Vercel:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Click "Paste .env" or add variables individually
   - Select the correct environment (Production or Preview)
   - Click Save

### Option 2: Use Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link your project
vercel link

# Add production variables from file
vercel env add DATABASE_URI production
# Paste the value when prompted

# Or import all variables (if you have them in a file)
# Note: Vercel CLI doesn't directly import .env files
# You'll need to add them one by one
```

---

## 🔐 Security Rules

### ✅ DO
- Replace ALL placeholders before using
- Use unique secrets for each environment
- Generate secrets with: `openssl rand -base64 32`
- Store real values in password manager
- Use Stripe TEST mode for staging
- Use Stripe LIVE mode for production

### ❌ DON'T
- Commit files with real secrets to git (they're git-ignored)
- Reuse production secrets in staging
- Share secrets via email/Slack
- Use LIVE Stripe keys in staging

---

## 📝 Quick Setup (Week 1)

You only need **4 variables** to get started:

### For Production
```bash
DATABASE_URI=postgresql://...fabig_suite_production?sslmode=require
PAYLOAD_SECRET=<openssl rand -base64 32>
NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de
NODE_ENV=production
```

### For Staging
```bash
DATABASE_URI=postgresql://...fabig_suite_staging?sslmode=require
PAYLOAD_SECRET=<different secret than production>
NEXT_PUBLIC_SERVER_URL=https://staging.fabig-suite.de
NODE_ENV=production
```

Add more variables as you build features (Week 5+).

---

## 📋 Variable Checklist by Week

- **Week 1** (4 vars): Database, Secret, URL, Node Env
- **Week 5** (4 vars): Resend, Email From, Trigger.dev
- **Week 7** (3 vars): Twilio SMS
- **Week 8** (5 vars): WhatsApp, OpenAI
- **Week 10** (10 vars): Stripe, Upstash Redis
- **Week 11** (4 vars): Sentry

---

## 🔍 Where to Get Values

| Variable | Source |
|----------|--------|
| `DATABASE_URI` | Neon Dashboard → Connection Details |
| `PAYLOAD_SECRET` | Generate: `openssl rand -base64 32` |
| `RESEND_API_KEY` | https://resend.com/api-keys |
| `TWILIO_*` | https://console.twilio.com |
| `WHATSAPP_*` | https://business.facebook.com |
| `OPENAI_API_KEY` | https://platform.openai.com/api-keys |
| `STRIPE_*` | https://dashboard.stripe.com/apikeys |
| `UPSTASH_*` | https://console.upstash.com |
| `SENTRY_*` | https://sentry.io/settings |

---

## 🆘 Troubleshooting

### "Variable not found" error in Vercel
→ Variable wasn't added to correct environment (Production vs Preview)

### "Invalid DATABASE_URI"
→ Make sure connection string includes `?sslmode=require`

### "Stripe key invalid"
→ Check you're using correct mode (test vs live) for environment

### "CORS error"
→ Add domain to `payload.config.ts` cors array

---

## 📚 More Help

- **Detailed setup**: `VERCEL_DEPLOYMENT_GUIDE.md`
- **All variables explained**: `ENVIRONMENT_SETUP.md`
- **Quick reference**: `ENV_QUICK_REFERENCE.md`
- **Setup checklist**: `SETUP_CHECKLIST.md`

---

**Remember:** Only 4 variables needed for Week 1. Add the rest as you build features!
