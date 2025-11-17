# Database Migrations Guide

**Official Payload Postgres Workflow**

---

## 🚀 Quick Start

### Local Development
```bash
# Start dev server - schema auto-updates!
pnpm dev
```

That's it! Make changes to collections in `src/payload/collections/` and your local database updates automatically via Drizzle push mode.

### Before Deploying
```bash
# Generate migration for production
pnpm migrate:create

# Check what was generated
ls migrations/

# Review the SQL, then commit
git add migrations/
git commit -m "feat: add new collections"
git push origin staging
```

### Production (Automatic)
Vercel runs: `payload migrate && next build`
- Migrations execute against production DB
- Build completes
- Deploy! ✅

---

## 📋 The Rules

### ✅ DO:
- Use push mode for local development (enabled by default)
- Create migrations when you're done with a feature
- Review generated SQL before committing
- Let CI run migrations automatically during build

### ❌ DON'T:
- Run migrations against your local dev database
- Mix push mode and migrations on the same database
- Edit migration files after they've been run in production
- Skip reviewing generated migrations

---

## 🔄 Complete Workflow Example

**Scenario:** Adding a new `Pages` collection for the website builder

### Step 1: Local Development
```bash
# Create the collection file
# src/payload/collections/Pages.ts

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    // ... more fields
  ],
}

# Add to payload.config.ts
collections: [
  Tenants,
  Users,
  Media,
  Pages, // ← New!
]

# Start dev server
pnpm dev
# ✅ Database automatically updated with 'pages' table!
```

### Step 2: Generate Migration
```bash
# When feature is complete
pnpm migrate:create

# Output:
# ✅ Created: migrations/20251117_add_pages_collection.ts
# 📝 Review the SQL before committing!

# Check the migration
cat migrations/20251117_add_pages_collection.ts

# Should contain:
# - CREATE TABLE pages (...)
# - CREATE INDEX pages_slug_idx (...)
# - etc.
```

### Step 3: Commit & Deploy
```bash
git add migrations/ src/payload/collections/Pages.ts src/payload/payload.config.ts
git commit -m "feat: add Pages collection for website builder"
git push origin staging

# Vercel automatically:
# 1. Runs `payload migrate` (applies migration to Neon)
# 2. Runs `next build`
# 3. Deploys ✅
```

---

## 🛠️ Available Commands

```bash
# Create a new migration (after making schema changes)
pnpm migrate:create

# Check migration status
pnpm migrate:status

# Access Payload CLI directly
pnpm payload [command]
```

---

## 🔍 Troubleshooting

### "No changes detected"
**When:** Running `migrate:create` but Payload says no changes found

**Why:** Your local database is already in sync via push mode

**Solution:** This is normal! Payload compares your config to the database. If push mode already updated it, there's nothing to migrate.

### "Migration failed: relation already exists"
**When:** Running migrations in production

**Why:** The migration was partially applied before, or push mode was accidentally enabled in production

**Solution:**
1. Check `NODE_ENV` is set to `production` in Vercel
2. Verify `push: process.env.NODE_ENV === 'development'` in config
3. Manually fix the database schema to match expectations, then re-run

### "Push mode and migrations cannot be mixed"
**When:** Trying to run migrations against local dev database

**Why:** You have push mode enabled (which you should!)

**Solution:** Don't run migrations locally. Push mode handles it. Only generate migrations for production.

---

## 🏗️ Project Setup

### Local (Docker Postgres)
- **Database:** `localhost:5433`
- **Push Mode:** ✅ Enabled (auto-syncs schema)
- **Migrations:** ❌ Don't run locally

### Staging/Production (Neon)
- **Database:** Neon PostgreSQL
- **Push Mode:** ❌ Disabled in production
- **Migrations:** ✅ Run automatically during build

---

## 📚 Further Reading

- [Payload Migrations Docs](https://payloadcms.com/docs/database/migrations)
- [Drizzle Push Mode](https://orm.drizzle.team/docs/push)
- Our workflow: `PRODUCTION-SETUP.md`
