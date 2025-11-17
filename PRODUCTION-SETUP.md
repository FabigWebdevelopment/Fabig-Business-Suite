# Production Database Setup Guide

## Status: Using Auto-Push (Phase 0)

**Created:** November 17, 2025
**Updated:** November 17, 2025
**Database:** Neon PostgreSQL
**Strategy:** Auto-push with DATABASE_PUSH_ENABLED=true

---

## 📝 Migration Strategy (Official Payload Workflow)

We're following **Payload's recommended workflow** for Postgres migrations:

### **Local Development (Push Mode)**
```bash
# Schema auto-updates via Drizzle push mode
pnpm dev
# Make changes to collections → Database updates automatically ✅
```

**Key:** DON'T run migrations against local dev database when using push mode!

### **Before Deploying**
```bash
# 1. Complete your feature/changes locally (push mode handled it)

# 2. Generate migration for production
pnpm migrate:create

# 3. Review the generated SQL in /migrations
# 4. Commit to git
git add migrations/
git commit -m "feat: add new schema changes"

# 5. Push to staging/production
git push origin staging
```

### **Production (CI/Build)**
```bash
# Vercel/CI runs this automatically:
payload migrate && next build

# This:
# 1. Runs pending migrations against production DB
# 2. Builds Next.js app
# 3. Deploys ✅
```

### **Why This Workflow?**
- ✅ **Fast local dev:** Schema auto-syncs via push mode
- ✅ **Safe production:** Migrations track and version schema changes
- ✅ **Official best practice:** Recommended by Payload for Postgres
- ✅ **Don't mix approaches:** Push for dev, migrations for prod

---

## 🎯 What This Does (Auto-Push Mode)

This SQL file creates the complete database schema for Fabig Business Suite:

**Tables Created:**
- ✅ `tenants` - Customer businesses
- ✅ `users` - Admin users
- ✅ `users_sessions` - Authentication sessions
- ✅ `media` - File uploads
- ✅ Payload system tables (migrations, preferences, locked documents, etc.)

**Total:** 15+ tables with indexes, constraints, and relationships

---

## 📋 Step-by-Step Instructions

### Step 1: Access Neon Console

1. Go to https://console.neon.tech
2. Select your **fabig-suite-production** project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run the Schema SQL

1. Open the file `schema-export.sql` in your text editor
2. **Copy ALL content** (Ctrl+A, Ctrl+C)
3. **Paste into Neon SQL Editor**
4. Click **Run** button
5. Wait ~5-10 seconds for execution

### Step 3: Verify Tables Created

Run this query in Neon SQL Editor:
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

**Expected Output:** You should see 15+ tables including:
- media
- tenants
- users
- users_sessions
- payload_migrations
- ... and more

### Step 4: Remove DATABASE_PUSH_ENABLED from Vercel

⚠️ **IMPORTANT:** Now that the schema exists, disable auto-push!

1. Go to Vercel Dashboard
2. Select **fabig-suite** project
3. Go to **Settings → Environment Variables**
4. **DELETE** the variable `DATABASE_PUSH_ENABLED`
   - Or set it to `false` (but deletion is cleaner)
5. Save changes

### Step 5: Redeploy

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click **⋯ (three dots)** → **Redeploy**
4. Wait for deployment to complete (~2-3 minutes)

### Step 6: Test Production Admin Panel

1. Visit: https://fabig-suite.de/admin
2. You should see: **"Create First User"** page ✅
3. If you see error → Check Step 7 below

---

## ✅ Expected Result

**Before Schema Applied:**
```
Error: relation "users" does not exist
```

**After Schema Applied:**
```
✅ Create First User page loads
✅ Can create super-admin user
✅ Can log in to admin panel
✅ Can create first tenant
```

---

## 🔍 Troubleshooting

### Issue 1: "Permission Denied" Error

**Solution:** Make sure you're connected to the correct Neon database branch:
- **Production:** `main` branch
- **Staging:** `preview` branch (if you created one)

### Issue 2: "Table Already Exists" Error

**Cause:** Schema was partially applied before

**Solution:**
1. Drop all tables first:
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```
2. Then run `schema-export.sql` again

### Issue 3: Still Getting "relation does not exist"

**Check:**
1. Verify tables exist: `\dt` (if using psql) or check Neon console
2. Verify Vercel environment variables point to correct database
3. Check `DATABASE_URI` includes correct database name
4. Try hard refresh in browser (Ctrl+Shift+R)

### Issue 4: "Connection Timeout" in Neon

**Solution:**
1. Split the SQL into smaller chunks
2. Run each `CREATE TABLE` statement individually
3. Or increase timeout in Neon settings

---

## 🔐 Security Notes

### After First Admin Created

1. **Change default PAYLOAD_SECRET** in Vercel
   - Generate new: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`
   - Update in Vercel environment variables
   - Redeploy

2. **Secure Neon Database**
   - Review IP allowlist in Neon settings
   - Consider enabling pooling for production
   - Set up automatic backups (Neon Pro feature)

3. **Monitor Database Usage**
   - Check Neon dashboard for connection count
   - Watch storage usage
   - Set up alerts for high usage

---

## 📊 What Happens Next

### Immediate (Today)
1. ✅ Schema applied to production
2. ✅ Create super-admin user
3. ✅ Create first tenant
4. ✅ Test tenant creation flow

### This Week (Phase 0 Complete)
1. Document any issues found
2. Test admin panel thoroughly
3. Create a second test tenant
4. Verify data isolation works
5. **Phase 0 DONE ✅**

### Next Week (Phase 1 Starts)
1. Begin Website Builder implementation
2. Create Pages collection
3. Implement tenant subdomain routing
4. Build first industry template

See `ROADMAP.md` for full development plan.

---

## 🆘 Emergency Rollback

If something goes wrong and you need to start over:

### Full Database Reset
```sql
-- ⚠️ WARNING: This deletes ALL data!

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
```

Then run `schema-export.sql` again from scratch.

### Vercel Rollback
1. Go to Deployments
2. Find last working deployment
3. Click **Promote to Production**

---

## 📞 Support

**If stuck:**
1. Check Neon SQL Editor error messages (detailed info)
2. Check Vercel deployment logs (Runtime Logs section)
3. Check local logs if testing locally
4. Review `ROADMAP.md` for architecture context

**Common Mistakes:**
- ❌ Not removing DATABASE_PUSH_ENABLED after schema applied
- ❌ Running schema against wrong database branch
- ❌ Not waiting for Vercel deployment to complete
- ❌ Browser cache showing old error (hard refresh needed)

---

## ✨ Success Checklist

After completing all steps, verify:

- [ ] Schema applied to Neon (15+ tables exist)
- [ ] `DATABASE_PUSH_ENABLED` removed from Vercel
- [ ] Production deployment successful (no build errors)
- [ ] `/admin` page loads (shows Create First User)
- [ ] Can create super-admin user
- [ ] Can log in to admin panel
- [ ] Can create a tenant
- [ ] Tenant appears in admin list
- [ ] Can log out and log back in
- [ ] No errors in Vercel logs

**When all checked:** Phase 0 is complete! 🎉

Move to `ROADMAP.md` Phase 1: Website Builder

---

**File Location:** `schema-export.sql`
**Safe to commit:** Yes (contains no secrets, only schema structure)
**Re-runnable:** Yes (idempotent - won't break if tables exist)
