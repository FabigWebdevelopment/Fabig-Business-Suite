# 🚨 Security Incident - API Keys Compromised

**Date**: January 17, 2025
**Severity**: CRITICAL
**Action Required**: Immediate (within 15 minutes)

---

## Compromised Credentials

The following credentials were exposed in conversation and must be rotated **immediately**:

### 1. Neon Database Credentials ⚠️ CRITICAL
- **Connection String**: `postgresql://[REDACTED]`
- **Password**: `[REDACTED]`
- **Database**: `neondb`

### 2. Resend API Key ⚠️ HIGH
- **Key**: `re_[REDACTED]`

### 3. Twilio Credentials ⚠️ HIGH
- **Account SID**: `[REDACTED]`
- **Auth Token**: `[REDACTED]`
- **Phone Number**: `[REDACTED]`

### 4. Stripe Live Keys ⚠️ CRITICAL
- **Secret Key**: `sk_live_[REDACTED]`
- **Publishable Key**: `pk_live_[REDACTED]`
- **Price ID**: `price_[REDACTED]`

---

## Immediate Actions Required

### ✅ Step 1: Rotate Stripe Keys (DO THIS FIRST - 2 minutes)

**Why First**: This is your LIVE payment system. A compromised key could allow unauthorized charges or access to customer payment data.

1. Go to: https://dashboard.stripe.com/apikeys
2. Find the **Secret key** ending in `...1x41TkKf`
3. Click **"⋮"** → **"Roll key"**
4. Confirm the roll
5. **Copy the new key** and save to password manager
6. Update in Vercel:
   - Go to Vercel → Project → Settings → Environment Variables
   - Find `STRIPE_SECRET_KEY` in Production environment
   - Click **"Edit"** → Paste new key → Save
7. Redeploy production (Vercel → Deployments → Redeploy)

**Publishable key**: The pk_live key is less critical (it's meant to be public) but rotate it too for safety.

---

### ✅ Step 2: Reset Neon Database Password (3 minutes)

**Why Critical**: Full read/write access to your production database.

1. Go to: https://console.neon.tech
2. Select your project
3. Click **"Settings"** → **"General"**
4. Click **"Reset password"**
5. Copy the new password
6. **Don't manually update Vercel** - Neon integration will auto-update!
7. Verify in Vercel → Settings → Environment Variables → `DATABASE_URI` updated

---

### ✅ Step 3: Rotate Resend API Key (2 minutes)

**Why Important**: Could be used to send phishing emails from your domain.

1. Go to: https://resend.com/api-keys
2. Find the key starting with `re_STCZFJDP_...`
3. Click **"Delete"**
4. Click **"Create API Key"**
5. Copy the new key
6. Update in Vercel:
   - Production: `RESEND_API_KEY` → New key
   - Preview: `RESEND_API_KEY` → Same new key
7. Redeploy both environments

---

### ✅ Step 4: Reset Twilio Auth Token (2 minutes)

**Why Important**: Could be used to send SMS/make calls costing you money.

1. Go to: https://console.twilio.com
2. Click **"Account"** → **"API credentials"**
3. Find **"Auth Token"**
4. Click **"View"** → **"Reset"**
5. Confirm reset
6. Copy new auth token
7. Update in Vercel:
   - Production: `TWILIO_AUTH_TOKEN` → New token
   - Preview: `TWILIO_AUTH_TOKEN` → Same new token
8. Redeploy both environments

**Note**: `TWILIO_ACCOUNT_SID` doesn't need rotation (it's not secret), but it's now associated with this incident.

---

### ✅ Step 5: Delete Local Files with Real Secrets (1 minute)

1. Open `.env.production`
2. Delete ALL real values
3. Replace with placeholders: `REPLACE_WITH_YOUR_KEY`
4. Save the file
5. **Never put real secrets in local files again**

---

## Verification Checklist

After completing all rotations:

- [ ] Stripe Secret Key rotated and updated in Vercel
- [ ] Stripe Publishable Key rotated (optional but recommended)
- [ ] Neon database password reset (Vercel auto-updated)
- [ ] Resend API key deleted and recreated
- [ ] Resend new key updated in Vercel (Production + Preview)
- [ ] Twilio Auth Token reset
- [ ] Twilio new token updated in Vercel (Production + Preview)
- [ ] Production redeployed successfully
- [ ] Preview redeployed successfully
- [ ] Local `.env.production` file cleaned (no real secrets)
- [ ] Test production site works (https://fabig-suite.de)
- [ ] Test staging site works (https://staging.fabig-suite.de)

---

## How This Happened

### The Mistake

1. You created `.env.production` file locally
2. You filled it with **real production secrets**
3. Claude read the file during troubleshooting
4. The secrets were exposed in the conversation log

### Why It's Dangerous

- This conversation could be logged by Anthropic
- The file could have been accidentally committed to git
- Anyone with access to this conversation could use the keys

---

## Preventing This in the Future

### ✅ DO

1. **Only add secrets directly in Vercel Dashboard**
   - Never store real secrets in local files

2. **Use placeholders in template files**
   - `.env.production` should ONLY contain `REPLACE_WITH_YOUR_KEY`

3. **Use Vercel CLI for adding secrets**
   ```bash
   vercel env add SECRET_NAME production
   # Paste value when prompted (not stored in file)
   ```

4. **Use password manager for secrets**
   - 1Password, Bitwarden, etc.
   - Never store in plaintext files

5. **Rotate secrets regularly**
   - Every 90 days for production
   - Immediately if suspected compromise

### ❌ DON'T

1. **Never put real secrets in files you might share/read**
2. **Never commit .env files to git** (already in .gitignore)
3. **Never share secrets via chat/email/Slack**
4. **Never reuse secrets across environments**

---

## Long-term Security Improvements

After this incident is resolved, implement these:

### Week 2: Set Up Secret Rotation Schedule
- Add calendar reminder to rotate secrets every 90 days
- Document rotation procedure for team

### Week 11: Enable Monitoring
- Set up Sentry error tracking
- Enable Stripe fraud detection
- Monitor Twilio usage for anomalies
- Set up billing alerts

### Before Launch: Security Audit
- Review all API keys and permissions
- Enable 2FA on all accounts (Stripe, Twilio, Resend, Neon)
- Set up IP whitelisting where possible
- Enable audit logs on all services

---

## Post-Incident Review

**What we learned:**
- Local template files should never contain real secrets
- Secrets should only exist in secure vaults (Vercel, password managers)
- Always assume any file you create could be accidentally shared

**Process improvement:**
- Updated all template files with warnings
- Added git-ignore for .env.production/.env.staging
- Created this incident checklist for future reference

---

## Need Help?

If you encounter issues during rotation:

- **Stripe**: https://support.stripe.com (24/7 chat)
- **Neon**: https://neon.tech/docs/introduction/support
- **Resend**: https://resend.com/support
- **Twilio**: https://support.twilio.com

---

**Time to Complete**: ~10-15 minutes
**Impact**: Zero downtime if done correctly
**Priority**: Critical - do this before any other work

---

✅ Once complete, delete this file and continue with deployment.
