# Fabig Business Suite - Complete Setup Checklist

**Start Date:** _____________
**Target Completion:** Week 1
**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Phase 1: Account Creation (Day 1)

### Core Services (Required Immediately)

- [ ] **Neon PostgreSQL**
  - [ ] Create account at https://neon.tech
  - [ ] Verify email
  - [ ] Add payment method
  - [ ] Note: Organization ID: _____________

- [ ] **Vercel**
  - [ ] Create account at https://vercel.com
  - [ ] Connect GitHub account
  - [ ] Add payment method (Pro plan required for team features)
  - [ ] Note: Organization ID: _____________

- [ ] **GitHub**
  - [ ] Repository already created: ✅ `FabigWebdevelopment/Fabig-Business-Suite`
  - [ ] Enable branch protection on `main` and `develop`
  - [ ] Add yourself as admin

### Optional Services (Can be added later)

- [ ] **Resend** (Week 5) - https://resend.com
- [ ] **Twilio** (Week 7) - https://twilio.com
- [ ] **OpenAI** (Week 8) - https://platform.openai.com
- [ ] **Meta Business** (Week 8) - https://business.facebook.com
- [ ] **Stripe** (Week 10) - https://stripe.com
- [ ] **Trigger.dev** (Week 5) - https://cloud.trigger.dev
- [ ] **Sentry** (Week 11) - https://sentry.io

---

## Phase 2: Database Setup (Day 1)

### Neon Project Configuration

- [ ] **Create Project**
  - Project name: `fabig-business-suite`
  - Region: **EU Central (Frankfurt)** - GDPR compliance
  - Compute: Autoscaling (0.25 - 1 vCPU)

- [ ] **Create Database Branches**
  - [ ] `main` → `fabig_suite_production`
  - [ ] `develop` → `fabig_suite_staging`
  - [ ] `dev-thomas` → `fabig_suite_dev_thomas` (your personal dev branch)

- [ ] **Enable Database Branching**
  - Settings → Branching → Enable
  - This creates automatic preview databases for each PR

- [ ] **Copy Connection Strings**
  ```
  Production:  _____________________________________________
  Staging:     _____________________________________________
  Dev (local): _____________________________________________
  ```

- [ ] **Configure Connection Pooling**
  - Enable connection pooling for production
  - Set max connections: 100

---

## Phase 3: Local Development Setup (Day 1)

### Prerequisites

- [ ] Node.js 18.17.0+ installed
- [ ] pnpm 8.0.0+ installed (`npm install -g pnpm`)
- [ ] Git configured
- [ ] Docker Desktop installed (for optional local PostgreSQL)
- [ ] VS Code (recommended) with extensions:
  - [ ] ESLint
  - [ ] Prettier
  - [ ] Tailwind CSS IntelliSense

### Project Setup

- [ ] **Clone Repository**
  ```bash
  git clone https://github.com/FabigWebdevelopment/Fabig-Business-Suite.git
  cd Fabig-Business-Suite
  ```

- [ ] **Install Dependencies**
  ```bash
  pnpm install
  ```

- [ ] **Create Environment File**
  ```bash
  cp .env.local.example .env.local
  ```

- [ ] **Generate Secrets**
  ```bash
  # Generate Payload secret
  openssl rand -base64 32
  # Copy output to PAYLOAD_SECRET in .env.local

  # Generate WhatsApp verify token
  openssl rand -base64 32
  # Copy output to WHATSAPP_WEBHOOK_VERIFY_TOKEN in .env.local
  ```

- [ ] **Configure .env.local**
  - [ ] Set `DATABASE_URI` (from Neon dev branch)
  - [ ] Set `PAYLOAD_SECRET` (generated above)
  - [ ] Set `NEXT_PUBLIC_SERVER_URL=http://localhost:3000`

- [ ] **Push Database Schema**
  ```bash
  pnpm db:push
  ```

- [ ] **Start Development Server**
  ```bash
  pnpm dev
  ```

- [ ] **Verify Setup**
  - [ ] Open http://localhost:3000
  - [ ] Should see welcome page
  - [ ] Open http://localhost:3000/admin
  - [ ] Create first super admin account:
    - Email: thomas@fabig-webdevelopment.de
    - Password: (use strong password)
    - First Name: Thomas
    - Last Name: Fabig
    - Role: Super Admin

---

## Phase 4: Vercel Setup (Day 2)

### Project Configuration

- [ ] **Import GitHub Repository**
  - Go to https://vercel.com/new
  - Import: `FabigWebdevelopment/Fabig-Business-Suite`
  - Configure:
    - Framework Preset: Next.js
    - Root Directory: `./`
    - Build Command: `pnpm build`
    - Output Directory: `.next`
    - Install Command: `pnpm install`

- [ ] **Get Vercel IDs**
  ```
  Project ID:      _____________________________________________
  Organization ID: _____________________________________________
  ```

### Environment Variables - Production

Go to: Project Settings → Environment Variables → Production

- [ ] **Core Variables**
  ```
  DATABASE_URI=<neon-production-connection-string>
  PAYLOAD_SECRET=<generate-new-secret-different-from-local>
  NEXT_PUBLIC_SERVER_URL=https://fabig-suite.de
  NODE_ENV=production
  ```

- [ ] **Email (Resend)** - Can add later in Week 5
  ```
  RESEND_API_KEY=
  EMAIL_FROM=noreply@fabig-suite.de
  ```

- [ ] **Mark as "Add Later"** (Week 5+)
  - [ ] Twilio credentials
  - [ ] WhatsApp credentials
  - [ ] OpenAI API key
  - [ ] Stripe keys
  - [ ] Trigger.dev key
  - [ ] Sentry DSN

### Environment Variables - Preview

Go to: Project Settings → Environment Variables → Preview

- [ ] **Core Variables**
  ```
  DATABASE_URI=<neon-staging-connection-string>
  PAYLOAD_SECRET=<generate-new-secret-different-from-production>
  NEXT_PUBLIC_SERVER_URL=https://staging.fabig-suite.de
  NODE_ENV=production
  ```

### Domain Configuration

- [ ] **Add Production Domain**
  - Project Settings → Domains
  - Add domain: `fabig-suite.de`
  - Add domain: `www.fabig-suite.de`
  - Add domain: `fabig-suite.com`
  - Add domain: `www.fabig-suite.com`

- [ ] **Add Staging Domain**
  - Add domain: `staging.fabig-suite.de`

- [ ] **Configure DNS at Domain Provider**

  For `fabig-suite.de` and `fabig-suite.com`:
  ```
  Type: A
  Name: @
  Value: 76.76.21.21

  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

  For `staging.fabig-suite.de`:
  ```
  Type: CNAME
  Name: staging
  Value: cname.vercel-dns.com
  ```

- [ ] **Verify DNS Propagation**
  - Wait up to 24 hours
  - Check: https://dnschecker.org
  - Vercel will auto-provision SSL certificates

---

## Phase 5: GitHub Actions Setup (Day 2)

### Add Repository Secrets

Go to: GitHub Repository → Settings → Secrets and variables → Actions

- [ ] **Vercel Deployment Secrets**
  - [ ] `VERCEL_TOKEN` (from Vercel Dashboard → Settings → Tokens)
  - [ ] `VERCEL_ORG_ID` (from Vercel)
  - [ ] `VERCEL_PROJECT_ID` (from Vercel)

- [ ] **Test Database Secrets**
  - [ ] `DATABASE_URI_TEST` (create separate Neon branch for CI tests)
  - [ ] `PAYLOAD_SECRET_TEST` (generate with `openssl rand -base64 32`)

### Verify Workflows

- [ ] **Check Workflow Files Exist**
  - [ ] `.github/workflows/ci.yml`
  - [ ] `.github/workflows/deploy-staging.yml`
  - [ ] `.github/workflows/deploy-production.yml`

- [ ] **Enable GitHub Actions**
  - Repository → Settings → Actions → General
  - Allow all actions and reusable workflows

- [ ] **Test CI Workflow**
  ```bash
  # Create test branch
  git checkout -b test/ci-setup
  echo "# CI Test" >> README.md
  git add .
  git commit -m "Test: Verify CI pipeline"
  git push origin test/ci-setup

  # Create PR on GitHub
  # → Check Actions tab to see if CI runs
  ```

---

## Phase 6: Git Workflow Configuration (Day 2)

### Branch Protection Rules

GitHub Repository → Settings → Branches → Add rule

**For `main` branch:**
- [ ] Branch name pattern: `main`
- [ ] Require a pull request before merging
  - [ ] Require approvals: 1 (for team) or 0 (for solo dev)
- [ ] Require status checks to pass before merging
  - [ ] Require branches to be up to date
  - [ ] Status checks: `quality-checks` (from CI workflow)
- [ ] Do not allow bypassing the above settings

**For `develop` branch:**
- [ ] Branch name pattern: `develop`
- [ ] Require status checks to pass before merging
  - [ ] Status checks: `quality-checks`

### Default Branch

- [ ] Set default branch to `develop`
  - Repository → Settings → Branches → Default branch → Change to `develop`

---

## Phase 7: Domain Email Setup (Week 5 - Can Skip for Now)

### Resend Account Setup

- [ ] Create account at https://resend.com
- [ ] Verify email
- [ ] Get API key: Dashboard → API Keys → Create
  - Name: `fabig-suite-production`
  - Copy key to password manager

### Configure Sending Domain

- [ ] Add domain: `emails.fabig-suite.de`
- [ ] Copy DNS records:
  ```
  Type: TXT
  Name: emails.fabig-suite.de
  Value: (SPF record from Resend)

  Type: TXT
  Name: resend._domainkey.emails.fabig-suite.de
  Value: (DKIM record from Resend)

  Type: TXT
  Name: _dmarc.emails.fabig-suite.de
  Value: v=DMARC1; p=none; rua=mailto:dmarc@fabig-suite.de
  ```

- [ ] Add DNS records to domain provider
- [ ] Wait for verification (check every 15 minutes)
- [ ] Verify domain shows "Verified" in Resend

### Update Environment Variables

- [ ] Add to Vercel (Production + Preview):
  ```
  RESEND_API_KEY=re_...
  EMAIL_FROM=noreply@emails.fabig-suite.de
  ```

---

## Phase 8: Testing & Verification (Day 3)

### Local Development Tests

- [ ] **Database Connection**
  ```bash
  pnpm db:push
  # Should succeed without errors
  ```

- [ ] **Type Checking**
  ```bash
  pnpm type-check
  # Should pass with 0 errors
  ```

- [ ] **Linting**
  ```bash
  pnpm lint
  # Should pass with 0 errors
  ```

- [ ] **Build**
  ```bash
  pnpm build
  # Should complete successfully
  ```

- [ ] **Development Server**
  ```bash
  pnpm dev
  # Should start on http://localhost:3000
  ```

- [ ] **Admin Panel Access**
  - [ ] Navigate to http://localhost:3000/admin
  - [ ] Login with super admin account
  - [ ] Create test tenant:
    - Company: "Test Restaurant"
    - Industry: Restaurant
    - Email: test@example.com
    - Phone: +4915112345678

### Staging Deployment Tests

- [ ] **Deploy to Staging**
  ```bash
  git checkout develop
  git pull
  echo "# Staging test" >> README.md
  git add .
  git commit -m "Test: Staging deployment"
  git push origin develop

  # Check GitHub Actions for deployment
  # Visit https://staging.fabig-suite.de
  ```

- [ ] **Verify Staging**
  - [ ] Site loads correctly
  - [ ] Admin panel accessible: https://staging.fabig-suite.de/admin
  - [ ] Can create super admin account
  - [ ] Can create test tenant
  - [ ] Database writes work
  - [ ] No console errors

### Production Deployment Tests

- [ ] **Deploy to Production**
  ```bash
  # Create PR: develop → main
  git checkout develop
  git pull
  git checkout -b release/initial-deployment
  git push origin release/initial-deployment

  # Create PR on GitHub: release/initial-deployment → main
  # Wait for CI to pass
  # Merge PR
  # → This triggers production deployment
  ```

- [ ] **Verify Production**
  - [ ] Site loads: https://fabig-suite.de
  - [ ] SSL certificate valid (green lock)
  - [ ] Admin panel: https://fabig-suite.de/admin
  - [ ] Health check: https://fabig-suite.de/api/health
  - [ ] No console errors
  - [ ] Fast load times (< 2 seconds)

---

## Phase 9: Monitoring Setup (Optional - Week 11)

### Sentry (Error Tracking)

- [ ] Create account at https://sentry.io
- [ ] Create project: `fabig-business-suite`
- [ ] Get DSN: Settings → Client Keys (DSN)
- [ ] Get Auth Token: Settings → Account → API → Auth Tokens
- [ ] Add to Vercel environment variables:
  ```
  SENTRY_DSN=https://xxx@sentry.io/xxx
  SENTRY_AUTH_TOKEN=sntrys_xxx
  SENTRY_ORG=fabig-webdevelopment
  SENTRY_PROJECT=fabig-business-suite
  ```

### Vercel Analytics

- [ ] Enable in Vercel: Project → Analytics → Enable
- [ ] Verify tracking code added to app
- [ ] Check real-time visitors after deployment

---

## Phase 10: Documentation (Ongoing)

### Project Documentation

- [x] README.md (basic setup instructions)
- [x] ENVIRONMENT_SETUP.md (complete env var guide)
- [x] DEV_TO_PROD_WORKFLOW.md (deployment guide)
- [x] GOHIGHLEVEL_RESEARCH.md (competitor research)
- [x] AUTOMATED_PROVISIONING.md (provisioning architecture)
- [x] WHATSAPP_AI_ARCHITECTURE.md (WhatsApp AI spec)
- [x] claude.md (main development guide)

### Update Documentation

- [ ] Add team members to README (when team grows)
- [ ] Document custom workflows
- [ ] Add troubleshooting tips as issues arise
- [ ] Keep environment variable list updated

---

## Completion Checklist

### ✅ Phase 1: Core Setup (Week 1)
- [ ] Local development working
- [ ] Can create super admin account
- [ ] Can create test tenant
- [ ] Database schema pushed
- [ ] TypeScript compiles with no errors
- [ ] Tests pass (when implemented)

### ✅ Phase 2: CI/CD (Week 1)
- [ ] GitHub Actions CI runs on every PR
- [ ] Staging auto-deploys from `develop` branch
- [ ] Production deploys from `main` branch
- [ ] Branch protection enabled
- [ ] DNS configured and SSL working

### ✅ Phase 3: Infrastructure (Week 1)
- [ ] Neon database running (all 3 branches)
- [ ] Vercel deployments working
- [ ] GitHub Actions passing
- [ ] Environment variables configured
- [ ] Monitoring enabled (optional)

### 🟡 Phase 4: Features (Week 2+)
- [ ] Email automation (Week 5)
- [ ] Review gathering (Week 7-8)
- [ ] WhatsApp AI (Week 8-12)
- [ ] Payment processing (Week 10)
- [ ] Full feature set (Week 12)

---

## Next Steps After Setup

Once all checklist items are complete:

1. **Start Week 2 Development**
   - Begin implementing core collections (Leads, Pages, Services)
   - Build service layer abstraction
   - Create API routes

2. **Set Up Project Management**
   - Create GitHub Projects board
   - Add issues for Week 2-12 features
   - Track progress

3. **Plan Feature Development**
   - Review WHATSAPP_AI_ARCHITECTURE.md
   - Review AUTOMATED_PROVISIONING.md
   - Prioritize features based on customer value

---

## Support & Help

**Documentation:**
- Complete setup guide: `ENVIRONMENT_SETUP.md`
- Deployment workflow: `DEV_TO_PROD_WORKFLOW.md`
- Development guide: `claude.md`

**External Resources:**
- Neon Docs: https://neon.tech/docs
- Vercel Docs: https://vercel.com/docs
- Payload CMS Docs: https://payloadcms.com/docs
- Next.js Docs: https://nextjs.org/docs

**Contact:**
- Email: thomas@fabig-webdevelopment.de
- GitHub Issues: https://github.com/FabigWebdevelopment/Fabig-Business-Suite/issues

---

**Setup Started:** _____________
**Setup Completed:** _____________
**Time Taken:** _____________ hours
**Notes:**

_________________________________________________________________

_________________________________________________________________

_________________________________________________________________
