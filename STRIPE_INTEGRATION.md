# Stripe Integration Guide - Fabig Business Suite

**Based on:** [T3/Theo's Stripe Recommendations](https://github.com/t3dotgg/stripe-recommendations)
**Implementation Week:** Week 10
**Status:** 🟡 Planned (Not Yet Implemented)

---

## Core Philosophy: Avoiding the "Split Brain" Problem

The fundamental challenge with Stripe integration is maintaining consistent state between:
- **Stripe** (source of truth for payment status)
- **Your database** (source of truth for tenant data)

### The Problem

Traditional webhook-based integration creates race conditions:
```
User completes checkout → Redirect to /success → Webhook fires → Database update
                                                     ↓
                            Page loads before webhook arrives
                            User sees "No active subscription"
                            Support tickets flood in
```

### The Solution: Single Sync Function Pattern

Instead of handling 18+ webhook events differently, implement **ONE** function that syncs all Stripe data to a key-value store:

```typescript
async function syncStripeDataToKV(customerId: string): Promise<void>
```

Call this function:
1. ✅ Immediately after checkout success (on `/success` page)
2. ✅ On ALL webhook events (18+ events, same function)
3. ✅ When admin views tenant billing details (ensure fresh data)

---

## Architecture for Multi-Tenant SaaS

### Data Model

Our multi-tenant architecture requires Stripe integration at the **tenant level**:

```typescript
// src/payload/collections/Tenants.ts
{
  name: 'billing',
  type: 'group',
  fields: [
    // Stripe Customer Mapping
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: { readOnly: true },
      index: true, // Fast lookups
    },

    // Cached Subscription State (from Stripe)
    {
      name: 'subscription',
      type: 'group',
      admin: { readOnly: true }, // Synced from Stripe, not editable
      fields: [
        {
          name: 'id',
          type: 'text',
          label: 'Subscription ID',
        },
        {
          name: 'status',
          type: 'select',
          options: [
            'active',
            'past_due',
            'canceled',
            'incomplete',
            'incomplete_expired',
            'trialing',
            'paused',
          ],
        },
        {
          name: 'priceId',
          type: 'text',
          label: 'Stripe Price ID',
        },
        {
          name: 'productId',
          type: 'text',
          label: 'Stripe Product ID',
        },
        {
          name: 'currentPeriodStart',
          type: 'date',
        },
        {
          name: 'currentPeriodEnd',
          type: 'date',
        },
        {
          name: 'cancelAtPeriodEnd',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'canceledAt',
          type: 'date',
        },
        {
          name: 'trialEnd',
          type: 'date',
        },
      ],
    },

    // Payment Method (cached)
    {
      name: 'paymentMethod',
      type: 'group',
      admin: { readOnly: true },
      fields: [
        {
          name: 'brand',
          type: 'text',
          label: 'Card Brand (e.g., Visa)',
        },
        {
          name: 'last4',
          type: 'text',
          label: 'Last 4 Digits',
        },
        {
          name: 'expMonth',
          type: 'number',
        },
        {
          name: 'expYear',
          type: 'number',
        },
      ],
    },

    // Sync Metadata
    {
      name: 'lastSyncedAt',
      type: 'date',
      admin: { readOnly: true },
    },
  ],
}
```

### Upstash Redis for KV Store

We'll use **Upstash Redis** (serverless, Vercel-compatible) as the key-value store:

**Why Upstash:**
- ✅ Serverless (no connection pooling issues on Vercel)
- ✅ EU region available (GDPR compliance)
- ✅ Free tier: 10,000 requests/day
- ✅ Global edge caching
- ✅ REST API (works in serverless functions)

**Pricing:**
- Free: 10,000 requests/day
- Pro: €0.20 per 100,000 requests

**Data stored in Redis:**
```typescript
// Key: stripe:customer:{stripeCustomerId}
{
  subscriptionId: "sub_xxx",
  status: "active",
  priceId: "price_xxx",
  productId: "prod_xxx",
  currentPeriodStart: 1234567890,
  currentPeriodEnd: 1234567890,
  cancelAtPeriodEnd: false,
  paymentMethod: {
    brand: "visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025
  },
  lastSynced: 1234567890
}
```

---

## Implementation Phases

### Phase 1: Core Setup (Week 10, Day 1)

#### 1.1 Environment Variables

Add to `.env.local`:
```bash
# Stripe Test Mode (for local development)
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_TEST_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY

# Stripe Price IDs (Test Mode)
STRIPE_PRICE_BASIC_MONTHLY=price_test_basic_monthly
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_test_professional_monthly
STRIPE_PRICE_PREMIUM_MONTHLY=price_test_premium_monthly
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_test_enterprise_monthly

# Upstash Redis
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
```

Add to Vercel (Production):
```bash
# Stripe LIVE Mode
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_WEBHOOK_SECRET
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY

# Stripe Price IDs (Live Mode)
STRIPE_PRICE_BASIC_MONTHLY=price_live_basic_monthly
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_live_professional_monthly
STRIPE_PRICE_PREMIUM_MONTHLY=price_live_premium_monthly
STRIPE_PRICE_ENTERPRISE_MONTHLY=price_live_enterprise_monthly

# Upstash Redis (Production)
UPSTASH_REDIS_REST_URL=https://prod-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=prod-token
```

#### 1.2 Install Dependencies

```bash
pnpm add stripe @upstash/redis
pnpm add -D @types/stripe
```

#### 1.3 Stripe Configuration

In Stripe Dashboard:
1. **Enable "Limit customers to one subscription"**
   - Settings → Customer Portal → Subscriptions
   - This prevents race conditions from dual-checkout attempts

2. **Disable Cash App Pay**
   - Settings → Payment Methods
   - Reports show 90%+ fraud rate in production

3. **Create Products & Prices**
   - Products → Create product for each tier (Basic, Professional, Premium, Enterprise)
   - Create monthly recurring price for each
   - Copy Price IDs to environment variables

4. **Set up Customer Portal**
   - Settings → Customer Portal → Configure
   - Enable: Update payment method, Cancel subscription, View invoices

---

### Phase 2: Core Service Implementation (Week 10, Day 2)

#### 2.1 Upstash Redis Client

```typescript
// src/lib/services/redis.ts
import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is not defined')
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined')
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Helper to build Redis keys
export const redisKeys = {
  stripeCustomer: (customerId: string) => `stripe:customer:${customerId}`,
  userToCustomer: (userId: string) => `stripe:user:${userId}`,
  tenantToCustomer: (tenantId: string) => `stripe:tenant:${tenantId}`,
}
```

#### 2.2 Stripe Client

```typescript
// src/lib/services/stripe.ts
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia', // Use latest version
  typescript: true,
  appInfo: {
    name: 'Fabig Business Suite',
    version: '1.0.0',
    url: 'https://fabig-suite.de',
  },
})

// Price ID mapping (from env vars)
export const STRIPE_PRICES = {
  basic: {
    monthly: process.env.STRIPE_PRICE_BASIC_MONTHLY!,
  },
  professional: {
    monthly: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY!,
  },
  premium: {
    monthly: process.env.STRIPE_PRICE_PREMIUM_MONTHLY!,
  },
  enterprise: {
    monthly: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
  },
} as const

// Reverse mapping: price ID → tier
export function getTierFromPriceId(priceId: string): string | null {
  for (const [tier, prices] of Object.entries(STRIPE_PRICES)) {
    if (prices.monthly === priceId) {
      return tier
    }
  }
  return null
}
```

---

### Phase 3: The Single Sync Function (Week 10, Day 3)

This is the **CORE** of our Stripe integration - the function that prevents the "split brain" problem.

```typescript
// src/lib/services/stripe-sync.ts
import type { Payload } from 'payload'
import { stripe } from './stripe'
import { redis, redisKeys } from './redis'

interface StripeCustomerData {
  subscriptionId: string | null
  status: string | null
  priceId: string | null
  productId: string | null
  currentPeriodStart: number | null
  currentPeriodEnd: number | null
  cancelAtPeriodEnd: boolean
  canceledAt: number | null
  trialEnd: number | null
  paymentMethod: {
    brand: string | null
    last4: string | null
    expMonth: number | null
    expYear: number | null
  } | null
  lastSynced: number
}

/**
 * THE SINGLE SOURCE OF TRUTH SYNC FUNCTION
 *
 * Call this function:
 * 1. On checkout success (/api/checkout/success)
 * 2. On ALL webhook events
 * 3. When viewing billing details (admin panel)
 *
 * This function:
 * - Fetches fresh data from Stripe API
 * - Caches to Upstash Redis
 * - Updates Payload database
 * - Returns the synced data
 */
export async function syncStripeDataToKV(
  payload: Payload,
  customerId: string,
): Promise<StripeCustomerData> {
  // 1. Fetch customer from Stripe (includes default payment method)
  const customer = await stripe.customers.retrieve(customerId, {
    expand: ['invoice_settings.default_payment_method'],
  })

  if (customer.deleted) {
    throw new Error(`Stripe customer ${customerId} has been deleted`)
  }

  // 2. Fetch active subscriptions
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: 'all',
    limit: 1, // We enforce "one subscription per customer" in Stripe settings
  })

  const subscription = subscriptions.data[0] || null

  // 3. Extract payment method details
  let paymentMethod: StripeCustomerData['paymentMethod'] = null

  if (subscription?.default_payment_method) {
    const pm = await stripe.paymentMethods.retrieve(
      subscription.default_payment_method as string,
    )

    if (pm.card) {
      paymentMethod = {
        brand: pm.card.brand || null,
        last4: pm.card.last4 || null,
        expMonth: pm.card.exp_month || null,
        expYear: pm.card.exp_year || null,
      }
    }
  }

  // 4. Build the data object
  const data: StripeCustomerData = {
    subscriptionId: subscription?.id || null,
    status: subscription?.status || null,
    priceId: (subscription?.items.data[0]?.price.id as string) || null,
    productId: (subscription?.items.data[0]?.price.product as string) || null,
    currentPeriodStart: subscription?.current_period_start || null,
    currentPeriodEnd: subscription?.current_period_end || null,
    cancelAtPeriodEnd: subscription?.cancel_at_period_end || false,
    canceledAt: subscription?.canceled_at || null,
    trialEnd: subscription?.trial_end || null,
    paymentMethod,
    lastSynced: Math.floor(Date.now() / 1000),
  }

  // 5. Cache to Upstash Redis
  await redis.set(redisKeys.stripeCustomer(customerId), data, {
    ex: 86400, // 24 hour TTL
  })

  // 6. Update Payload database
  // Find tenant by stripeCustomerId
  const tenants = await payload.find({
    collection: 'tenants',
    where: {
      'billing.stripeCustomerId': {
        equals: customerId,
      },
    },
    limit: 1,
  })

  if (tenants.docs.length > 0) {
    const tenant = tenants.docs[0]

    await payload.update({
      collection: 'tenants',
      id: tenant.id,
      data: {
        'billing.subscription': {
          id: data.subscriptionId,
          status: data.status,
          priceId: data.priceId,
          productId: data.productId,
          currentPeriodStart: data.currentPeriodStart
            ? new Date(data.currentPeriodStart * 1000).toISOString()
            : null,
          currentPeriodEnd: data.currentPeriodEnd
            ? new Date(data.currentPeriodEnd * 1000).toISOString()
            : null,
          cancelAtPeriodEnd: data.cancelAtPeriodEnd,
          canceledAt: data.canceledAt
            ? new Date(data.canceledAt * 1000).toISOString()
            : null,
          trialEnd: data.trialEnd
            ? new Date(data.trialEnd * 1000).toISOString()
            : null,
        },
        'billing.paymentMethod': data.paymentMethod,
        'billing.lastSyncedAt': new Date().toISOString(),
      },
    })
  }

  return data
}

/**
 * Helper: Get cached subscription data (fast, from Redis)
 * Falls back to Stripe API if cache miss
 */
export async function getSubscriptionData(
  payload: Payload,
  customerId: string,
): Promise<StripeCustomerData> {
  // Try cache first
  const cached = await redis.get<StripeCustomerData>(
    redisKeys.stripeCustomer(customerId),
  )

  if (cached) {
    return cached
  }

  // Cache miss - sync from Stripe
  return syncStripeDataToKV(payload, customerId)
}
```

---

### Phase 4: Checkout Flow (Week 10, Day 4)

#### 4.1 Create Checkout Session API

```typescript
// src/app/api/checkout/create/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { stripe, STRIPE_PRICES } from '@/lib/services/stripe'
import { redis, redisKeys } from '@/lib/services/redis'

export async function POST(req: NextRequest) {
  const payload = await getPayloadHMR({ config: configPromise })

  // 1. Authenticate user (get from session)
  const user = await payload.auth({ headers: req.headers })

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Get tenant
  const { tenantId, tier } = await req.json()

  if (!tenantId || !tier) {
    return NextResponse.json(
      { error: 'Missing tenantId or tier' },
      { status: 400 },
    )
  }

  // Validate tier
  if (!['basic', 'professional', 'premium', 'enterprise'].includes(tier)) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  // 3. Get or create Stripe customer
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: tenantId,
  })

  let stripeCustomerId = tenant.billing?.stripeCustomerId

  // CRITICAL: Always create customer BEFORE checkout
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: tenant.contactInfo.email,
      name: tenant.companyName,
      metadata: {
        tenantId: tenant.id,
        userId: user.user?.id || '',
      },
      // For German businesses, include tax info
      address: {
        country: 'DE',
      },
    })

    stripeCustomerId = customer.id

    // Save to database AND Redis
    await payload.update({
      collection: 'tenants',
      id: tenant.id,
      data: {
        'billing.stripeCustomerId': stripeCustomerId,
      },
    })

    await redis.set(
      redisKeys.tenantToCustomer(tenant.id),
      stripeCustomerId,
    )
  }

  // 4. Create checkout session
  const priceId = STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES].monthly

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId, // CRITICAL: Always pass existing customer
    mode: 'subscription',
    payment_method_types: ['card', 'sepa_debit'], // SEPA for Germany
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/billing`,
    metadata: {
      tenantId: tenant.id,
      userId: user.user?.id || '',
    },
    // Enable tax collection for German VAT
    automatic_tax: {
      enabled: true,
    },
    // Collect billing address (required for SEPA)
    billing_address_collection: 'required',
    // Allow promotion codes
    allow_promotion_codes: true,
  })

  return NextResponse.json({ url: session.url })
}
```

#### 4.2 Checkout Success Handler

```typescript
// src/app/api/checkout/success/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { stripe } from '@/lib/services/stripe'
import { syncStripeDataToKV } from '@/lib/services/stripe-sync'

export async function GET(req: NextRequest) {
  const payload = await getPayloadHMR({ config: configPromise })

  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing session_id' },
      { status: 400 },
    )
  }

  // 1. Retrieve checkout session
  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (!session.customer) {
    return NextResponse.json(
      { error: 'No customer in session' },
      { status: 400 },
    )
  }

  // 2. CRITICAL: Immediately sync Stripe data
  // This ensures data is available BEFORE page renders
  await syncStripeDataToKV(payload, session.customer as string)

  // 3. Log provisioning event
  const tenantId = session.metadata?.tenantId

  if (tenantId) {
    await payload.update({
      collection: 'tenants',
      id: tenantId,
      data: {
        provisioningLogs: {
          timestamp: new Date().toISOString(),
          service: 'stripe',
          action: 'checkout_completed',
          status: 'success',
          message: `Subscription activated: ${session.subscription}`,
          metadata: {
            sessionId: session.id,
            subscriptionId: session.subscription,
          },
        },
      },
    })
  }

  return NextResponse.json({
    success: true,
    customerId: session.customer,
  })
}
```

---

### Phase 5: Webhook Handler (Week 10, Day 5)

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { stripe } from '@/lib/services/stripe'
import { syncStripeDataToKV } from '@/lib/services/stripe-sync'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const payload = await getPayloadHMR({ config: configPromise })

  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 },
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 },
    )
  }

  // Extract customer ID from event
  let customerId: string | null = null

  switch (event.type) {
    // Checkout events
    case 'checkout.session.completed':
    case 'checkout.session.expired':
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.async_payment_failed':
      customerId = (event.data.object as Stripe.Checkout.Session).customer as string
      break

    // Subscription events
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.paused':
    case 'customer.subscription.resumed':
    case 'customer.subscription.trial_will_end':
      customerId = (event.data.object as Stripe.Subscription).customer as string
      break

    // Invoice events
    case 'invoice.paid':
    case 'invoice.payment_failed':
    case 'invoice.payment_succeeded':
    case 'invoice.payment_action_required':
    case 'invoice.marked_uncollectible':
      customerId = (event.data.object as Stripe.Invoice).customer as string
      break

    // Payment intent events
    case 'payment_intent.succeeded':
    case 'payment_intent.payment_failed':
    case 'payment_intent.canceled':
      customerId = (event.data.object as Stripe.PaymentIntent).customer as string
      break

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  // THE KEY PATTERN: Same sync function for ALL events
  if (customerId) {
    try {
      await syncStripeDataToKV(payload, customerId)
      console.log(`✅ Synced Stripe data for customer ${customerId} (event: ${event.type})`)
    } catch (error) {
      console.error(`Failed to sync Stripe data for ${customerId}:`, error)
      // Still return 200 to Stripe to acknowledge receipt
    }
  }

  return NextResponse.json({ received: true })
}
```

---

## Testing Strategy

### Local Testing with Stripe CLI

1. **Install Stripe CLI**
   ```bash
   # Windows (via Scoop)
   scoop install stripe

   # macOS
   brew install stripe/stripe-cli/stripe
   ```

2. **Login to Stripe**
   ```bash
   stripe login
   ```

3. **Forward webhooks to local server**
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   # Copy the webhook signing secret to STRIPE_WEBHOOK_SECRET in .env.local
   ```

4. **Trigger test events**
   ```bash
   # Test subscription created
   stripe trigger customer.subscription.created

   # Test payment succeeded
   stripe trigger payment_intent.succeeded

   # Test invoice paid
   stripe trigger invoice.paid
   ```

### Test Checklist

- [ ] Create checkout session → redirects to Stripe
- [ ] Complete payment → redirects to success page
- [ ] Success page loads with active subscription (no race condition)
- [ ] Webhook fires → data synced to Redis + Payload
- [ ] Admin panel shows correct subscription status
- [ ] Cancel subscription → status updates in real-time
- [ ] Payment fails → tenant notified, features disabled
- [ ] Customer portal works (update card, cancel, view invoices)

---

## Monitoring & Observability

### Stripe Dashboard

Monitor these metrics daily:
- **MRR (Monthly Recurring Revenue)**
- **Churn rate**
- **Failed payment rate** (should be <5%)
- **Subscription growth**

### Webhook Reliability

In Stripe Dashboard → Developers → Webhooks:
- Monitor webhook success rate (should be >99%)
- Check for failed deliveries
- Stripe auto-retries failed webhooks for 3 days

### Redis Cache Health

```typescript
// Add to admin panel or cron job
import { redis, redisKeys } from '@/lib/services/redis'

async function checkCacheHealth() {
  const tenants = await payload.find({
    collection: 'tenants',
    where: {
      'billing.stripeCustomerId': {
        exists: true,
      },
    },
  })

  let cacheHits = 0
  let cacheMisses = 0

  for (const tenant of tenants.docs) {
    const cached = await redis.get(
      redisKeys.stripeCustomer(tenant.billing.stripeCustomerId),
    )

    if (cached) {
      cacheHits++
    } else {
      cacheMisses++
    }
  }

  const hitRate = (cacheHits / (cacheHits + cacheMisses)) * 100

  console.log(`Cache hit rate: ${hitRate.toFixed(2)}%`)

  // Alert if hit rate drops below 80%
  if (hitRate < 80) {
    // Send alert via Sentry or email
  }
}
```

---

## Security Considerations

### 1. Webhook Signature Verification

Always verify webhook signatures to prevent spoofed requests:
```typescript
stripe.webhooks.constructEvent(body, signature, webhookSecret)
```

### 2. Customer Metadata Validation

Before processing webhooks, validate that the customer belongs to your system:
```typescript
const customer = await stripe.customers.retrieve(customerId)

// Verify metadata contains your tenant ID
if (!customer.metadata?.tenantId) {
  throw new Error('Customer not from our system')
}
```

### 3. Rate Limiting

Add rate limiting to checkout API to prevent abuse:
```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { redis } from '@/lib/services/redis'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 checkouts per hour
})

// In checkout route
const identifier = req.ip ?? 'anonymous'
const { success } = await ratelimit.limit(identifier)

if (!success) {
  return NextResponse.json(
    { error: 'Too many checkout attempts' },
    { status: 429 },
  )
}
```

### 4. PCI Compliance

- ✅ Never store card details in your database
- ✅ Use Stripe Elements for card input (handles PCI compliance)
- ✅ Only store `stripeCustomerId` and subscription metadata
- ✅ Use Stripe's Customer Portal for card updates

---

## Cost Optimization

### Stripe Fees (Germany)

- **2.9% + €0.30** per successful card charge
- **1.4% + €0.30** per SEPA Direct Debit (cheaper for German customers)
- **0.5%** additional for international cards
- **No monthly fees** for Stripe Billing

### Upstash Redis Costs

- **Free tier**: 10,000 requests/day (enough for 300 tenants with hourly cache refreshes)
- **Pro tier**: €0.20 per 100,000 requests

### Cost Projection (1,000 Active Tenants)

```
Stripe Fees (avg €50/month subscription):
- 1,000 × €50 = €50,000 MRR
- 2.9% = €1,450/month
- Fixed fees: 1,000 × €0.30 = €300/month
- Total: €1,750/month (3.5% of revenue)

Upstash Redis:
- ~30,000 requests/day (1,000 tenants × 30 syncs/day)
- €0.20 per 100,000 requests
- Monthly: 900,000 requests = €1.80/month

Total Infrastructure: €1,751.80/month
```

---

## Migration Plan (Existing Customers)

If you have tenants before Stripe integration:

1. **Create Stripe customers for existing tenants**
   ```typescript
   // src/scripts/migrate-to-stripe.ts
   async function migrateExistingTenants() {
     const tenants = await payload.find({
       collection: 'tenants',
       where: {
         'billing.stripeCustomerId': {
           exists: false,
         },
       },
       limit: 1000,
     })

     for (const tenant of tenants.docs) {
       const customer = await stripe.customers.create({
         email: tenant.contactInfo.email,
         name: tenant.companyName,
         metadata: {
           tenantId: tenant.id,
           migrated: 'true',
         },
       })

       await payload.update({
         collection: 'tenants',
         id: tenant.id,
         data: {
           'billing.stripeCustomerId': customer.id,
         },
       })

       console.log(`✅ Migrated tenant ${tenant.id} → ${customer.id}`)
     }
   }
   ```

2. **Grandfather existing tenants**
   - Create a "Legacy" plan in Stripe with special pricing
   - Allow existing customers to keep current pricing
   - Optionally migrate them to new plans with incentives

---

## Troubleshooting

### Problem: "No active subscription" on success page

**Cause:** Webhook hasn't fired yet, database not synced

**Solution:** This is WHY we call `syncStripeDataToKV()` immediately on success page load. Verify it's being called:
```typescript
// In /api/checkout/success
console.log('Syncing customer:', customerId)
await syncStripeDataToKV(payload, customerId)
console.log('Sync complete')
```

### Problem: Webhook signature verification fails

**Cause:** Wrong webhook secret or body parsing issue

**Solution:**
1. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe Dashboard
2. Use `await req.text()` not `await req.json()` for webhook body
3. Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Problem: Customer has multiple subscriptions

**Cause:** "One subscription per customer" not enabled in Stripe

**Solution:**
1. Enable in Stripe Dashboard → Customer Portal → Subscriptions
2. Cancel duplicate subscriptions manually
3. Refund if necessary

### Problem: High Redis cache miss rate

**Cause:** TTL too short or high traffic spikes

**Solution:**
1. Increase TTL from 24h to 48h for stable subscriptions
2. Add cache warming for active tenants
3. Monitor with cache health check script

---

## Next Steps After Implementation

1. **Week 11**: Add Sentry error tracking for payment failures
2. **Week 12**: Build admin dashboard for subscription analytics
3. **Week 13**: Implement usage-based billing (e.g., per-message pricing)
4. **Week 14**: Add annual billing discount (e.g., 2 months free)
5. **Week 15**: Implement affiliate/referral program

---

## References

- **T3/Theo's Stripe Recommendations**: https://github.com/t3dotgg/stripe-recommendations
- **Stripe API Docs**: https://stripe.com/docs/api
- **Upstash Redis Docs**: https://upstash.com/docs/redis
- **Payload Lifecycle Hooks**: https://payloadcms.com/docs/hooks/overview

---

**Last Updated:** January 2025
**Maintained By:** Thomas Fabig
**Status:** 🟡 Planned for Week 10 Implementation
