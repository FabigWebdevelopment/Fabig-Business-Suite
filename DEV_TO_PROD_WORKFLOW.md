# Dev-to-Prod Workflow - Fabig Business Suite

> **Last Updated:** November 16, 2025
> **Owner:** Thomas Fabig
> **Infrastructure:** Vercel + Neon (PostgreSQL) + GitHub

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Infrastructure Stack](#infrastructure-stack)
3. [Local Development Setup](#local-development-setup)
4. [Environment Strategy](#environment-strategy)
5. [Git Workflow](#git-workflow)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Database Management](#database-management)
8. [Domain Configuration](#domain-configuration)
9. [Deployment Process](#deployment-process)
10. [Monitoring & Observability](#monitoring--observability)
11. [Disaster Recovery](#disaster-recovery)

---

## Architecture Overview

### High-Level Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                         PRODUCTION                           │
│                                                              │
│  app.fabig-suite.de                                         │
│  *.fabig-suite.de (tenant subdomains)                       │
│                                                              │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Vercel     │────────▶│ Neon         │                 │
│  │   (Next.js   │         │ (PostgreSQL) │                 │
│  │   + Payload) │         │              │                 │
│  └──────────────┘         └──────────────┘                 │
│         │                                                    │
│         │                                                    │
│         ▼                                                    │
│  ┌──────────────────────────────────────┐                  │
│  │  External Services                   │                  │
│  │  ├── OpenAI (AI conversations)       │                  │
│  │  ├── WhatsApp API (messaging)        │                  │
│  │  ├── SendGrid (email)                │                  │
│  │  ├── Twilio (SMS)                    │                  │
│  │  ├── Sentry (error tracking)         │                  │
│  │  └── Vercel Analytics (performance)  │                  │
│  └──────────────────────────────────────┘                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                          STAGING                             │
│  staging.fabig-suite.de                                     │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Vercel     │────────▶│ Neon         │                 │
│  │   (Preview)  │         │ (Staging DB) │                 │
│  └──────────────┘         └──────────────┘                 │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      LOCAL DEVELOPMENT                       │
│  localhost:3000                                             │
│  ┌──────────────┐         ┌──────────────┐                 │
│  │   Next.js    │────────▶│ PostgreSQL   │                 │
│  │   (Native)   │         │ (Docker)     │                 │
│  └──────────────┘         └──────────────┘                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Infrastructure Stack

### Hosting & Deployment

**Vercel (Primary Platform)**
- **Why Vercel:**
  - ✅ Built Next.js (perfect optimization)
  - ✅ Automatic deployments from GitHub
  - ✅ Preview deployments for every PR
  - ✅ Edge network (global CDN)
  - ✅ Serverless functions
  - ✅ Zero-config setup
  - ✅ Custom domains with SSL
  - ✅ Environment variables per environment
  - ✅ Built-in analytics

**Vercel Plan:** Pro ($20/mo)
- Needed for:
  - Custom domains with wildcard (*.fabig-suite.de)
  - Password protection on staging
  - Advanced analytics
  - Function execution time (60s vs 10s hobby)

### Database

**Neon (Serverless PostgreSQL)** ⭐ RECOMMENDED
- **Why Neon:**
  - ✅ Serverless Postgres (scales to zero)
  - ✅ **Database branching** (auto-create DB per preview deployment!)
  - ✅ Generous free tier (0.5GB storage, 191.9 compute hours/mo)
  - ✅ Point-in-time restore
  - ✅ Read replicas
  - ✅ Fast cold starts (<1s)
  - ✅ Compatible with Vercel
  - ✅ Can scale later without migration

**Pricing:**
- Free tier: €0/mo (good for development + small staging)
- Launch plan: ~€19/mo (1GB storage, unlimited compute)
- Scale plan: ~€69/mo (10GB storage, production-ready)

**Alternative: Supabase**
- Also great, more features (auth, storage, realtime)
- But we only need Postgres
- Neon is simpler and has database branching

### Version Control

**GitHub**
- Repository: `https://github.com/FabigWebdevelopment/Fabig-Business-Suite.git`
- Free for private repos
- GitHub Actions for CI/CD (2,000 minutes/mo free)

### External Services

| Service | Purpose | Cost |
|---------|---------|------|
| **OpenAI** | WhatsApp AI (GPT-4o-mini) | Pay-as-you-go (~€5-20/mo) |
| **Meta WhatsApp API** | WhatsApp messaging | Free (user-initiated) + €0.04/template |
| **SendGrid** | Email sending | Free (100/day) → €15/mo (40k/mo) |
| **Twilio** | SMS sending | Pay-as-you-go (~€0.08/SMS) |
| **Sentry** | Error tracking | Free (5k events/mo) → €26/mo (50k) |
| **Vercel Analytics** | Performance monitoring | Included in Pro plan |

**Total Infrastructure Cost (Early Stage):**
```
Vercel Pro: €20/mo
Neon Free: €0/mo (or €19/mo for Launch)
GitHub: €0/mo
SendGrid Free: €0/mo
OpenAI: ~€10/mo
Sentry Free: €0/mo

Total: ~€30-50/mo (scales with usage)
```

---

## Local Development Setup

### Option 1: Hybrid (Recommended for Solo Dev) ⭐

**Run Next.js natively, PostgreSQL in Docker**

**Pros:**
- ✅ Fast hot reload (Next.js Fast Refresh)
- ✅ Native debugging
- ✅ Isolated database
- ✅ Easy to reset DB
- ✅ Lightweight

**Setup:**

```bash
# 1. Install dependencies
pnpm install

# 2. Start PostgreSQL in Docker
docker-compose up -d postgres

# 3. Run migrations
pnpm run payload migrate

# 4. Start Next.js
pnpm dev

# Access:
# - App: http://localhost:3000
# - Payload Admin: http://localhost:3000/admin
# - Database: localhost:5432
```

**docker-compose.yml:**

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: fabig-suite-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: fabig_suite_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Optional: pgAdmin for database management
  pgadmin:
    image: dpage/pgadmin4:latest
    container_name: fabig-suite-pgadmin
    restart: unless-stopped
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@fabig-suite.local
      PGADMIN_DEFAULT_PASSWORD: admin
    ports:
      - "5050:80"
    depends_on:
      - postgres
    profiles:
      - tools # Only start when explicitly requested

volumes:
  postgres_data:
    name: fabig_suite_postgres_data
```

**.env.local (Local Environment):**

```bash
# Database
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/fabig_suite_dev

# Payload
PAYLOAD_SECRET=your-super-secret-key-change-this-in-production-min-32-chars
PAYLOAD_CONFIG_PATH=src/payload/payload.config.ts

# Application
NODE_ENV=development
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Fabig Business Suite"
NEXT_PUBLIC_BRAND_OWNER="Thomas Fabig"

# Email (SendGrid - use test mode or sandbox)
SENDGRID_API_KEY=SG.test_key_for_local_development

# SMS (Twilio - use test credentials)
TWILIO_ACCOUNT_SID=AC_test_sid
TWILIO_AUTH_TOKEN=test_auth_token
TWILIO_PHONE_NUMBER=+15005550006  # Twilio test number

# WhatsApp (Meta - use test number)
WHATSAPP_PHONE_NUMBER_ID=test_phone_id
WHATSAPP_BUSINESS_ACCOUNT_ID=test_business_id
WHATSAPP_ACCESS_TOKEN=test_access_token
WHATSAPP_VERIFY_TOKEN=test_verify_token_12345
WHATSAPP_APP_SECRET=test_app_secret

# AI (OpenAI - use personal key for testing)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Monitoring (optional in dev)
# SENTRY_DSN=
# SENTRY_AUTH_TOKEN=

# Feature Flags (for testing)
FEATURE_WHATSAPP_AI=true
FEATURE_PAYMENT_LINKS=false
```

**package.json scripts:**

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:db": "docker-compose up -d postgres",
    "dev:full": "docker-compose up -d && pnpm dev",

    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",

    "payload": "payload",
    "payload:migrate": "payload migrate",
    "payload:migrate:create": "payload migrate:create",
    "payload:seed": "payload seed",

    "db:studio": "docker-compose --profile tools up pgadmin",
    "db:reset": "docker-compose down -v && docker-compose up -d postgres && pnpm run payload:migrate",

    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",

    "validate": "pnpm type-check && pnpm lint && pnpm test"
  }
}
```

**Daily Workflow:**

```bash
# Morning: Start development
pnpm run dev:db        # Start Postgres
pnpm dev               # Start Next.js

# During development
pnpm type-check        # Check types
pnpm lint              # Check code style
pnpm test              # Run tests

# Database tasks
pnpm run db:studio     # Open pgAdmin (http://localhost:5050)
pnpm run db:reset      # Reset database completely

# Evening: Stop everything
docker-compose down    # Stop Postgres (data persists in volume)
```

---

### Option 2: Full Docker (For Team/CI Consistency)

**Run everything in Docker containers**

**Pros:**
- ✅ 100% consistent environment
- ✅ Easy onboarding for new team members
- ✅ Production-like environment
- ✅ Can test Docker builds locally

**Cons:**
- ⚠️ Slower hot reload
- ⚠️ More memory usage
- ⚠️ More complex debugging

**docker-compose.yml (Full):**

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    container_name: fabig-suite-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URI=postgresql://postgres:postgres@postgres:5432/fabig_suite_dev
      - NODE_ENV=development
    env_file:
      - .env.local
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    container_name: fabig-suite-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: fabig_suite_dev
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

**Dockerfile.dev:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["pnpm", "dev"]
```

**Usage:**

```bash
docker-compose up -d
# Everything runs in Docker

# Access:
# - App: http://localhost:3000
# - Logs: docker-compose logs -f app
# - Shell: docker-compose exec app sh
```

---

### Recommended Approach for Thomas

**Start with Option 1 (Hybrid)**, transition to Option 2 when hiring team members.

**Why:**
- ✅ You're solo, need fast iteration
- ✅ Native Next.js = instant hot reload
- ✅ Docker for Postgres = isolated, easy to reset
- ✅ Can still use Docker for production builds/testing
- ✅ Switch to full Docker when onboarding developers

---

## Environment Strategy

### Three Environments

```
┌─────────────┬──────────────────────┬────────────────────┬──────────────────┐
│ Environment │ URL                  │ Database           │ Purpose          │
├─────────────┼──────────────────────┼────────────────────┼──────────────────┤
│ Local       │ localhost:3000       │ Docker Postgres    │ Development      │
│ Staging     │ staging.fabig-       │ Neon (staging)     │ Testing          │
│             │ suite.de             │                    │                  │
│ Production  │ app.fabig-suite.de   │ Neon (production)  │ Live customers   │
└─────────────┴──────────────────────┴────────────────────┴──────────────────┘
```

### Environment Variables Management

**Vercel Dashboard:**
- Set different variables for Production vs Preview vs Development
- Never commit secrets to git!

**Structure:**

```
Production Environment Variables (Vercel):
├── DATABASE_URI → Neon production connection string
├── PAYLOAD_SECRET → Random 64-char string
├── OPENAI_API_KEY → Production API key
├── WHATSAPP_ACCESS_TOKEN → Production token
├── SENDGRID_API_KEY → Production key
└── SENTRY_DSN → Production project

Preview Environment Variables (Vercel):
├── DATABASE_URI → Neon staging connection string (or branch)
├── PAYLOAD_SECRET → Same as production (data compatibility)
├── OPENAI_API_KEY → Test API key (limited quota)
├── WHATSAPP_ACCESS_TOKEN → Test number token
└── ... (test credentials)

Development (Local .env.local):
├── DATABASE_URI → localhost:5432
└── ... (local/test credentials)
```

**Never Store in Git:**

```gitignore
# .gitignore
.env
.env.local
.env.production
.env.development
.env.staging
*.pem
*.key
secrets/
```

**Use `.env.example` as template:**

```bash
# .env.example (commit this to git)
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/fabig_suite_dev
PAYLOAD_SECRET=CHANGE_THIS_TO_RANDOM_STRING_MIN_32_CHARS
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
OPENAI_API_KEY=sk-your-key-here
# ... etc
```

---

## Git Workflow

### Branch Strategy (GitHub Flow)

```
main (production)
├── Protected branch
├── Requires PR approval
├── Auto-deploys to app.fabig-suite.de
└── Never commit directly

develop (staging)
├── Integration branch
├── Auto-deploys to staging.fabig-suite.de
└── Merge feature branches here first

feature/* (feature branches)
├── feature/whatsapp-ai
├── feature/lead-board-filters
├── feature/salon-template
├── Creates Vercel preview deployment
└── Delete after merging
```

**Workflow:**

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/whatsapp-ai

# 2. Develop
# ... make changes ...
git add .
git commit -m "feat: add WhatsApp AI response generation"

# 3. Push and create PR
git push origin feature/whatsapp-ai
# Open PR on GitHub: feature/whatsapp-ai → develop

# 4. Vercel automatically creates preview deployment
# Review at: https://fabig-suite-git-feature-whatsapp-ai.vercel.app

# 5. After approval, merge to develop
# GitHub automatically deploys to staging.fabig-suite.de

# 6. Test on staging, then merge develop → main
# Automatically deploys to production app.fabig-suite.de
```

### Commit Message Convention

```
feat: add new feature
fix: fix bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance tasks
perf: performance improvement
ci: CI/CD changes

Examples:
feat(whatsapp): add AI response generation
fix(lead-board): resolve drag-and-drop bug on mobile
docs(readme): update setup instructions
```

### Protected Branches

**Configure on GitHub:**

```yaml
Branch Protection Rules for 'main':
✅ Require pull request before merging
✅ Require approvals: 1 (can approve your own as solo dev)
✅ Require status checks to pass:
   - ✅ Type Check
   - ✅ Lint
   - ✅ Tests
   - ✅ Build
✅ Require conversation resolution before merging
✅ Do not allow bypassing the above settings
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**.github/workflows/ci.yml** (Run on every PR)

```yaml
name: CI

on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [develop, main]

jobs:
  quality:
    name: Code Quality Checks
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Get pnpm store directory
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Setup pnpm cache
        uses: actions/cache@v4
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Type check
        run: pnpm type-check

      - name: Lint
        run: pnpm lint

      - name: Run tests
        run: pnpm test

      - name: Build
        run: pnpm build
        env:
          DATABASE_URI: postgresql://postgres:postgres@localhost:5432/test_db
          PAYLOAD_SECRET: test-secret-for-ci-min-32-characters-long
          NEXT_PUBLIC_SERVER_URL: http://localhost:3000

  # Optional: E2E tests (can be expensive, run only on main)
  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Setup pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          DATABASE_URI: postgresql://postgres:postgres@localhost:5432/test_db
          PAYLOAD_SECRET: test-secret-for-e2e

      - name: Upload test results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

**.github/workflows/deploy.yml** (Auto-deploy)

```yaml
name: Deploy

on:
  push:
    branches:
      - main      # Production
      - develop   # Staging

jobs:
  deploy:
    name: Deploy to Vercel
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: ${{ github.ref == 'refs/heads/main' && '--prod' || '' }}
```

**Secrets to Add on GitHub:**
1. Go to repo → Settings → Secrets and variables → Actions
2. Add:
   - `VERCEL_TOKEN` (from Vercel dashboard)
   - `VERCEL_ORG_ID` (from Vercel)
   - `VERCEL_PROJECT_ID` (from Vercel)

---

## Database Management

### Neon Setup

**1. Create Neon Account**
```bash
# Visit: https://neon.tech
# Sign up with GitHub
# Create project: "fabig-suite-production"
```

**2. Create Databases**

```
Production Database:
├── Name: fabig-suite-production
├── Region: Europe (Frankfurt) - closest to German customers
└── Connection String: postgresql://user:pass@host/db

Staging Database:
├── Name: fabig-suite-staging
├── Region: Europe (Frankfurt)
└── Connection String: postgresql://user:pass@host/db_staging
```

**3. Database Branching (Neon Feature)**

```bash
# For every preview deployment, create a database branch
# This is AUTOMATIC in Neon + Vercel integration

# Main database branch: main (production)
# Feature branch: feature/whatsapp-ai → Neon creates DB branch

# Benefits:
# - Test migrations on branch before production
# - Isolated data for testing
# - No risk to production data
```

**4. Connection Pooling**

```typescript
// Neon provides connection pooling automatically
// Use pooled connection string from Neon dashboard

DATABASE_URI=postgresql://user:pass@host/db?sslmode=require&connection_limit=10
```

### Migration Strategy

**Development (Local):**
```bash
# 1. Make schema changes to collections
# 2. Payload auto-pushes to local DB (push: true in dev)
# 3. No manual migration needed in dev
```

**Staging/Production:**
```bash
# 1. Make schema changes
# 2. Generate migration
pnpm run payload migrate:create

# This creates: migrations/YYYYMMDD_HHMMSS_description.ts

# 3. Commit migration to git
git add migrations/
git commit -m "chore: add migration for whatsapp-conversations"

# 4. Push to GitHub
git push

# 5. Vercel build runs migration automatically
# (via build command or Vercel build script)
```

**Automatic Migration on Deploy:**

```json
// package.json
{
  "scripts": {
    "build": "pnpm run payload migrate && next build",
    "vercel-build": "pnpm run payload migrate && next build"
  }
}
```

**Rollback Strategy:**

```bash
# If deployment fails due to migration:

# Option 1: Revert migration
git revert <commit-hash>
git push

# Option 2: Manual rollback on Neon
# - Go to Neon dashboard
# - Use point-in-time restore
# - Restore to before migration

# Option 3: Fix migration forward
# - Create new migration fixing the issue
# - Deploy
```

### Backup Strategy

**Neon Automatic Backups:**
- ✅ Point-in-time restore (last 7 days on Free tier, 30 days on paid)
- ✅ Automatic daily backups
- ✅ No configuration needed

**Additional Backups (Recommended for Production):**

```bash
#!/bin/bash
# scripts/backup-database.sh

# Run nightly via GitHub Actions or cron

DATE=$(date +%Y-%m-%d)
BACKUP_FILE="backup-$DATE.sql"

# Dump database
pg_dump $DATABASE_URI > $BACKUP_FILE

# Upload to cloud storage (S3, Backblaze, etc.)
# Example with AWS S3:
aws s3 cp $BACKUP_FILE s3://fabig-suite-backups/$BACKUP_FILE

# Keep only last 30 days locally
find . -name "backup-*.sql" -mtime +30 -delete

echo "Backup completed: $BACKUP_FILE"
```

**GitHub Action for Nightly Backup:**

```yaml
# .github/workflows/backup.yml
name: Nightly Database Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
  workflow_dispatch:  # Manual trigger

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Backup database
        run: bash scripts/backup-database.sh
        env:
          DATABASE_URI: ${{ secrets.DATABASE_URI_PRODUCTION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## Domain Configuration

### DNS Setup (fabig-suite.de)

**Cloudflare (Recommended) or Vercel DNS**

```
A Records / CNAME Records:

@                  → Vercel (app.fabig-suite.de)
app                → Vercel
staging            → Vercel
*                  → Vercel (wildcard for tenant subdomains)

MX Records (Email):
@  10  → mail.fabig-suite.de (if you need email @fabig-suite.de)

TXT Records:
@  → "v=spf1 include:sendgrid.net ~all" (for SendGrid email sending)
```

**Vercel Configuration:**

```bash
# 1. Go to Vercel Project → Settings → Domains

# 2. Add domains:
app.fabig-suite.de (Production)
staging.fabig-suite.de (Staging)
*.fabig-suite.de (Tenant Subdomains - requires Vercel Pro)

# 3. Vercel provides DNS instructions
# 4. Add CNAME/A records to your DNS provider
# 5. Vercel automatically provisions SSL certificates (Let's Encrypt)
```

**Middleware for Subdomain Detection:**

```typescript
// src/middleware.ts
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Extract subdomain
  let subdomain: string | null = null

  // Check if it's a subdomain
  if (hostname.endsWith('.fabig-suite.de')) {
    const parts = hostname.split('.')
    if (parts.length >= 3) {
      subdomain = parts[0]

      // Skip system subdomains
      if (['app', 'staging', 'www', 'api'].includes(subdomain)) {
        subdomain = null
      }
    }
  }

  if (subdomain) {
    // This is a tenant website
    // Look up tenant by subdomain
    const tenant = await getTenantBySlug(subdomain)

    if (!tenant) {
      return new NextResponse('Tenant not found', { status: 404 })
    }

    // Set tenant context
    const response = NextResponse.next()
    response.headers.set('x-tenant-id', tenant.id)
    response.headers.set('x-tenant-slug', tenant.slug)

    return response
  }

  // This is the main app
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

**Environment-Specific URLs:**

```typescript
// lib/utils/urls.ts
export function getAppUrl(env: 'local' | 'staging' | 'production') {
  switch (env) {
    case 'local':
      return 'http://localhost:3000'
    case 'staging':
      return 'https://staging.fabig-suite.de'
    case 'production':
      return 'https://app.fabig-suite.de'
  }
}

export function getTenantUrl(slug: string, env: string) {
  if (env === 'local') {
    return `http://${slug}.localhost:3000`
  }
  return `https://${slug}.fabig-suite.de`
}
```

---

## Deployment Process

### Deployment Flow

```
┌──────────────────────────────────────────────────────────────┐
│  Developer pushes code to GitHub                             │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│  GitHub triggers webhook to Vercel                           │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│  Vercel Build Process:                                       │
│  1. Clone repository                                         │
│  2. Install dependencies (pnpm install)                      │
│  3. Run migrations (pnpm run payload migrate)                │
│  4. Build Next.js (next build)                               │
│  5. Deploy to Edge Network                                   │
└────────────────────┬─────────────────────────────────────────┘
                     │
              ┌──────┴──────┐
              ▼             ▼
    ┌─────────────┐   ┌─────────────┐
    │  Preview    │   │ Production  │
    │  Deployment │   │ Deployment  │
    └─────────────┘   └─────────────┘
```

### Vercel Configuration

**vercel.json:**

```json
{
  "buildCommand": "pnpm run vercel-build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install --frozen-lockfile",
  "framework": "nextjs",
  "regions": ["fra1"],
  "env": {
    "NEXT_PUBLIC_APP_NAME": "Fabig Business Suite",
    "NEXT_PUBLIC_BRAND_OWNER": "Thomas Fabig"
  },
  "build": {
    "env": {
      "DATABASE_URI": "@database-uri",
      "PAYLOAD_SECRET": "@payload-secret"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    }
  ]
}
```

**Build Settings in Vercel Dashboard:**

```
Framework Preset: Next.js
Build Command: pnpm run vercel-build
Output Directory: .next
Install Command: pnpm install --frozen-lockfile
Development Command: pnpm dev
Root Directory: ./
Node.js Version: 20.x
```

### Deployment Checklist

**Before Every Deployment:**

```bash
# 1. Run quality checks locally
pnpm validate  # type-check + lint + test

# 2. Test build locally
pnpm build

# 3. Test production build
pnpm start

# 4. Check environment variables
# Verify all secrets are set in Vercel

# 5. Review database migrations
# Ensure migrations are reversible

# 6. Create deployment plan
# - What's changing?
# - Rollback plan?
# - Database changes?

# 7. Deploy to staging first
git push origin develop

# 8. Test on staging
# - Manual testing
# - Check logs in Vercel
# - Verify integrations work

# 9. Deploy to production
git push origin main

# 10. Monitor deployment
# - Watch Vercel build logs
# - Check Sentry for errors
# - Verify critical paths work
```

### Rollback Procedure

**If deployment causes issues:**

```bash
# Option 1: Instant Rollback (Vercel UI)
# 1. Go to Vercel Dashboard
# 2. Deployments → Previous deployment
# 3. Click "Promote to Production"
# ✅ Instant rollback (30 seconds)

# Option 2: Git Revert
git revert HEAD
git push origin main
# ✅ New deployment with reverted code

# Option 3: Redeploy Specific Commit
# 1. Vercel Dashboard → Deployments
# 2. Find working deployment
# 3. Redeploy
```

---

## Monitoring & Observability

### Error Tracking (Sentry)

**Setup:**

```bash
pnpm add @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**sentry.client.config.ts:**

```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% of transactions
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})
```

**sentry.server.config.ts:**

```typescript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
})
```

### Performance Monitoring

**Vercel Analytics:**
- Automatically enabled with Vercel deployment
- Real User Monitoring (RUM)
- Web Vitals tracking
- No setup required

**Custom Metrics:**

```typescript
// lib/monitoring/metrics.ts
export async function trackMetric(metric: string, value: number) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics service
    await fetch('/api/metrics', {
      method: 'POST',
      body: JSON.stringify({ metric, value }),
    })
  }
}

// Usage:
await trackMetric('whatsapp.ai.response_time', 1234) // ms
await trackMetric('leads.created', 1)
await trackMetric('bookings.completed', 1)
```

### Logging Strategy

**Vercel Logs:**
- Automatic (all console.log captured)
- View in Vercel Dashboard → Logs
- Real-time streaming

**Structured Logging:**

```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
})

// Usage:
logger.info({ tenantId, leadId }, 'Lead created successfully')
logger.error({ error, context }, 'WhatsApp API error')
```

### Health Checks

**API Endpoint:**

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: false,
    payload: false,
  }

  try {
    // Check database
    const payload = await getPayloadHMR({ config })
    await payload.db.drizzle.execute('SELECT 1')
    checks.database = true
    checks.payload = true

    return NextResponse.json(checks, { status: 200 })
  } catch (error) {
    checks.status = 'unhealthy'
    return NextResponse.json(checks, { status: 503 })
  }
}
```

**Uptime Monitoring:**

```bash
# Use external service:
# - UptimeRobot (free, checks every 5 min)
# - Better Uptime (paid, advanced features)
# - Checkly (synthetic monitoring)

# Monitor:
# - https://app.fabig-suite.de/api/health
# - Alert on >2 consecutive failures
# - Email + SMS alerts
```

---

## Disaster Recovery

### Backup Restoration

**Scenario: Database corruption**

```bash
# 1. Stop application (Vercel deployment)
# Pause new deployments temporarily

# 2. Restore from Neon point-in-time
# Go to Neon Dashboard → Restore → Select timestamp

# 3. Verify data integrity
# Connect to restored DB
# Run validation queries

# 4. Update connection string
# Vercel → Environment Variables → Update DATABASE_URI

# 5. Trigger redeployment
git commit --allow-empty -m "chore: trigger redeploy after DB restore"
git push

# 6. Monitor for errors
# Check Sentry, Vercel logs

# 7. Notify customers (if downtime occurred)
```

### Data Loss Prevention

**Strategies:**

1. **Neon Point-in-Time Restore:** Last 7-30 days
2. **Daily Automated Backups:** S3 or Backblaze
3. **Replication:** Neon read replicas (paid plan)
4. **Testing Backups:** Monthly restoration test

### Incident Response Plan

**Priority Levels:**

```
P0 (Critical): Production down, data loss
├── Response time: Immediate
├── Fix: Within 1 hour
└── Examples: Database offline, site unreachable

P1 (High): Major feature broken
├── Response time: Within 1 hour
├── Fix: Within 4 hours
└── Examples: WhatsApp AI not responding, bookings failing

P2 (Medium): Minor feature broken
├── Response time: Within 4 hours
├── Fix: Within 24 hours
└── Examples: Analytics not loading, UI glitch

P3 (Low): Cosmetic issue
├── Response time: Within 24 hours
├── Fix: Next sprint
└── Examples: Typo, color issue
```

**Incident Template:**

```markdown
## Incident Report: [Title]

**Date:** YYYY-MM-DD
**Severity:** P0/P1/P2/P3
**Duration:** XX minutes
**Affected Users:** XX customers

### What Happened:
[Description]

### Root Cause:
[Technical explanation]

### Timeline:
- HH:MM - Incident detected
- HH:MM - Investigation started
- HH:MM - Fix deployed
- HH:MM - Verified resolved

### Resolution:
[What was done]

### Prevention:
[How to prevent in future]

### Action Items:
- [ ] Task 1
- [ ] Task 2
```

---

## Quick Reference Commands

### Daily Development

```bash
# Start development
pnpm run dev:db && pnpm dev

# Check code quality
pnpm validate

# Database tasks
pnpm run db:reset           # Reset local database
pnpm run payload migrate    # Run migrations

# Testing
pnpm test                   # Unit tests
pnpm test:e2e              # E2E tests
```

### Deployment

```bash
# Deploy to staging
git push origin develop

# Deploy to production
git push origin main

# Rollback
# Use Vercel Dashboard → Previous Deployment → Promote
```

### Database

```bash
# Create migration
pnpm run payload migrate:create

# Run migrations
pnpm run payload migrate

# Backup
bash scripts/backup-database.sh
```

### Monitoring

```bash
# View logs (Vercel CLI)
vercel logs app.fabig-suite.de

# Check deployment status
vercel ls

# Open dashboard
vercel open
```

---

## Security Checklist

**Before Production:**

- [ ] All secrets in Vercel environment variables (never in code)
- [ ] `.env` files in `.gitignore`
- [ ] HTTPS enforced (Vercel handles automatically)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled on public endpoints
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Payload handles)
- [ ] XSS prevention (React handles)
- [ ] CSRF protection (Next.js handles)
- [ ] Content Security Policy headers
- [ ] Regular dependency updates (`pnpm update`)
- [ ] Sentry error tracking active
- [ ] Database backups automated
- [ ] Access logs monitored
- [ ] Two-factor auth on critical accounts (GitHub, Vercel, Neon)

---

## Scaling Considerations

**When you reach 100+ customers:**

### Database
- Upgrade Neon plan (more storage, better performance)
- Consider read replicas for reporting
- Add database indexes for common queries
- Implement connection pooling (PgBouncer)

### Application
- Enable Vercel Edge Caching
- Implement Redis for session storage
- Use ISR (Incremental Static Regeneration) for tenant websites
- Optimize images with next/image

### Monitoring
- Upgrade Sentry plan (more events)
- Add custom dashboards (Grafana)
- Implement alerts for key metrics
- Set up on-call rotation

---

## Cost Projection

### Month 1-3 (0-10 customers)

```
Vercel Pro: €20/mo
Neon Free: €0/mo
GitHub: €0/mo
SendGrid Free: €0/mo
OpenAI: ~€5/mo
Sentry Free: €0/mo

Total: ~€25/mo
Revenue: 10 × €799 = €7,990/mo
Profit: €7,965/mo
```

### Month 6 (50 customers)

```
Vercel Pro: €20/mo
Neon Launch: €19/mo
SendGrid Essentials: €15/mo (40k emails/mo)
OpenAI: ~€50/mo (AI conversations)
Sentry Team: €26/mo (50k events)

Total: ~€130/mo
Revenue: 50 × €799 = €39,950/mo
Profit: €39,820/mo
```

### Month 12 (100 customers)

```
Vercel Pro: €20/mo
Neon Scale: €69/mo
SendGrid Pro: €90/mo (100k emails/mo)
OpenAI: ~€150/mo
Sentry Team: €26/mo
Backups (S3): €10/mo

Total: ~€365/mo
Revenue: 100 × €799 = €79,900/mo
Profit: €79,535/mo
```

**Infrastructure scales efficiently - costs stay <1% of revenue! 🚀**

---

## Next Steps

**To implement this workflow:**

1. ✅ **Neon Account** - Create production + staging databases
2. ✅ **Vercel Project** - Connect GitHub repo
3. ✅ **Domain DNS** - Point fabig-suite.de to Vercel
4. ✅ **Environment Variables** - Set in Vercel dashboard
5. ✅ **GitHub Actions** - Add CI workflow
6. ✅ **Local Development** - Set up Docker Compose
7. ✅ **Deploy Staging** - Test on staging.fabig-suite.de
8. ✅ **Deploy Production** - Launch on app.fabig-suite.de

**Ready to scaffold the project structure?** 🏗️

---

**End of Dev-to-Prod Workflow Documentation**
**© 2025 Thomas Fabig | Fabig Webdevelopment**
