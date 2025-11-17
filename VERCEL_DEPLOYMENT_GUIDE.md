# Vercel Deployment Guide - Fabig Business Suite

**Quick guide to deploy your project to Vercel with proper environment variables**

---

## Step 1: Import Project to Vercel

### Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `FabigWebdevelopment/Fabig-Business-Suite`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`
5. Click **"Deploy"** (first deployment will fail - that's expected, we haven't set env vars yet)

### Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy
vercel --prod
```

---

## Step 2: Configure Production Environment Variables

1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

2. For each variable in `vercel-env-production.txt`:
   - Click **"Add New"**
   - **Key**: Copy the variable name (e.g., `DATABASE_URI`)
   - **Value**: Copy the value (replace placeholders with real values)
   - **Environment**: Select **Production**
   - Click **"Save"**

### Required for Week 1 (Minimum to Deploy)

Add these 4 variables first:

```bash
DATABASE_URI=postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/fabig_suite_production?sslmode=require
PAYLOAD_SECRET=<generate with: openssl rand -base64 32>
NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de
NODE_ENV=production
```

### Quick Add Method (Faster)

Instead of adding one-by-one, you can use the **bulk import** feature:

1. Copy the entire `vercel-env-production.txt` file
2. Replace all placeholders with real values
3. In Vercel Dashboard → Environment Variables
4. Click **"Add Multiple"** or paste directly
5. Vercel will parse the key=value format

**Example format for bulk import:**
```
DATABASE_URI=postgresql://actual-connection-string
PAYLOAD_SECRET=actual-secret-here
NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de
NODE_ENV=production
```

---

## Step 3: Configure Preview/Staging Environment Variables

Same process as production, but:

1. Select **Preview** environment instead of **Production**
2. Use values from `vercel-env-preview.txt`
3. Important differences:
   - Different DATABASE_URI (staging branch)
   - Different PAYLOAD_SECRET
   - Different NEXT_PUBLIC_SERVER_URL (`staging.fabig-suite.de`)
   - Stripe TEST mode keys (not LIVE)

### Quick Preview Setup

```bash
# Minimum required for staging
DATABASE_URI=postgresql://user:password@ep-xxxxx.eu-central-1.aws.neon.tech/fabig_suite_staging?sslmode=require
PAYLOAD_SECRET=<different secret than production>
NEXT_PUBLIC_SERVER_URL=https://staging.fabig-suite.de
NODE_ENV=production
```

---

## Step 4: Set Up Custom Domains

### Production Domain

1. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Domains**
2. Add domains:
   - `fabig-suite.de` (primary)
   - `www.fabig-suite.de` (redirect to primary)
   - `fabig-suite.com` (redirect to primary)
   - `www.fabig-suite.com` (redirect to primary)

3. Configure DNS at your domain provider:

**For fabig-suite.de:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**For fabig-suite.com:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Staging Domain

1. Add domain: `staging.fabig-suite.de`
2. Configure DNS:

```
Type: CNAME
Name: staging
Value: cname.vercel-dns.com
TTL: 3600
```

3. In Vercel, assign `staging.fabig-suite.de` to **Preview** deployments from `develop` branch

---

## Step 5: Configure Git Integration

### Branch → Environment Mapping

Vercel will automatically deploy:

- **`main` branch** → Production (`https://fabig-suite.de`)
- **`develop` branch** → Preview/Staging (`https://staging.fabig-suite.de`)
- **Feature branches** → Preview URLs (`https://fabig-suite-git-feature-branch.vercel.app`)

### Configure Branch Settings

1. Go to **Settings** → **Git**
2. **Production Branch**: `main`
3. Enable **"Automatic Deployments"** for `main` and `develop`

---

## Step 6: Verify Deployment

### Production Checklist

After deploying to production:

```bash
✅ Visit https://fabig-suite.de
✅ Site loads without errors
✅ Check SSL certificate (green lock icon)
✅ Visit https://fabig-suite.de/admin
✅ Admin panel loads
✅ Can create super admin account
✅ Can create test tenant
✅ Check Vercel function logs for errors
✅ Check browser console for errors
✅ Test API endpoint: https://fabig-suite.de/api/health
```

### Staging Checklist

```bash
✅ Visit https://staging.fabig-suite.de
✅ Site loads without errors
✅ Admin panel accessible
✅ Can create test data
✅ All features work in staging before promoting to production
```

---

## Step 7: Redeploy After Adding Environment Variables

If you added environment variables after the first deploy:

### Via Dashboard

1. Go to **Deployments** tab
2. Find latest deployment
3. Click **⋯** (three dots) → **Redeploy**
4. Check **"Use existing Build Cache"** (faster)
5. Click **"Redeploy"**

### Via CLI

```bash
# Redeploy production
vercel --prod

# Redeploy preview/staging
vercel
```

---

## Step 8: Monitor Deployments

### Vercel Dashboard

- **Deployments**: See all deployments and their status
- **Functions**: Monitor serverless function execution
- **Analytics**: Track page views and performance
- **Logs**: Real-time function logs

### GitHub Integration

- Vercel will comment on PRs with preview URLs
- Check marks appear when deployment succeeds
- Red X appears if deployment fails

---

## Common Issues & Solutions

### Issue: "DATABASE_URI is not defined"

**Solution**: Environment variable not set or not saved correctly

1. Check **Settings** → **Environment Variables**
2. Verify `DATABASE_URI` exists for the environment
3. Redeploy after adding

### Issue: "Build failed"

**Solution**: Check build logs in Vercel

```bash
# Common causes:
- Missing environment variables
- TypeScript errors
- Missing dependencies
- Incorrect build command
```

### Issue: "Domain not verified"

**Solution**: DNS not configured correctly

1. Check DNS records at domain provider
2. Use https://dnschecker.org to verify propagation
3. Wait up to 24 hours for DNS propagation
4. Vercel will auto-verify once DNS is correct

### Issue: "Deployment succeeded but site shows error"

**Solution**: Check function logs

1. Go to **Deployments** → Click deployment
2. Click **"View Function Logs"**
3. Look for errors in server-side rendering

### Issue: "CORS errors in browser console"

**Solution**: Update `payload.config.ts`

```typescript
export default buildConfig({
  cors: [
    'https://fabig-suite.de',
    'https://www.fabig-suite.de',
    'https://fabig-suite.com',
    'https://www.fabig-suite.com',
    'https://staging.fabig-suite.de',
  ],
  // ...
})
```

---

## Environment Variable Priority

When you have multiple environments:

1. **Production**: Only loads when deployed to production (`main` branch)
2. **Preview**: Loads for all preview deployments (`develop` and feature branches)
3. **Development**: Not used by Vercel (only for local `.env.local`)

---

## Adding New Services Later

When you're ready to add new services (Week 5+):

### Example: Adding Resend (Week 5)

1. Get API key from https://resend.com/api-keys
2. Add to **both** Production and Preview:
   ```
   RESEND_API_KEY=re_your_key
   EMAIL_FROM=noreply@fabig-suite.de  # Production
   EMAIL_FROM=staging@fabig-suite.de  # Preview
   ```
3. Redeploy to apply changes

### Example: Adding Stripe (Week 10)

1. **Production**: Use LIVE mode keys
   ```
   STRIPE_SECRET_KEY=sk_live_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
   ```

2. **Preview**: Use TEST mode keys
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxx
   STRIPE_WEBHOOK_SECRET=whsec_test_xxxxx
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   ```

3. Set up webhook endpoints in Stripe Dashboard:
   - Production: `https://fabig-suite.de/api/webhooks/stripe`
   - Test: `https://staging.fabig-suite.de/api/webhooks/stripe`

---

## Vercel CLI Quick Commands

```bash
# See current environment variables
vercel env ls

# Add environment variable
vercel env add DATABASE_URI production
# Then paste the value when prompted

# Remove environment variable
vercel env rm DATABASE_URI production

# Pull environment variables to .env.local (for local dev)
vercel env pull .env.local
```

---

## Security Best Practices

### ✅ DO

- Use unique secrets for each environment
- Generate secrets with `openssl rand -base64 32`
- Store secrets in password manager
- Use Stripe TEST mode for staging
- Enable Vercel's DDoS protection
- Monitor function logs regularly
- Rotate secrets every 90 days

### ❌ DON'T

- Commit `.env.local` to git
- Reuse production secrets in staging
- Share secrets via email/Slack
- Use LIVE Stripe keys in staging
- Expose sensitive variables client-side (unless prefixed with `NEXT_PUBLIC_`)

---

## Next Steps After Deployment

1. ✅ Verify production deployment works
2. ✅ Verify staging deployment works
3. ✅ Test admin panel access
4. ✅ Create first super admin account
5. ✅ Create first test tenant
6. ✅ Set up monitoring (Sentry, Week 11)
7. ✅ Enable Vercel Analytics
8. ✅ Configure custom error pages
9. ✅ Set up status page monitoring
10. ✅ Document deployment process for team

---

## Support

**Documentation:**
- Environment Variables: `ENV_QUICK_REFERENCE.md`
- Setup Checklist: `SETUP_CHECKLIST.md`
- Full Environment Guide: `ENVIRONMENT_SETUP.md`

**Vercel Resources:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support
- Status: https://vercel-status.com

**Contact:**
- Email: thomas@fabig-webdevelopment.de
- GitHub: https://github.com/FabigWebdevelopment/Fabig-Business-Suite/issues

---

**Last Updated:** January 2025
**Maintained By:** Thomas Fabig
