/**
 * Database Initialization Script
 *
 * This script initializes the production database by creating all required tables.
 *
 * Usage:
 * 1. Ensure DATABASE_URI is set in .env.local (pointing to production database)
 * 2. Run: pnpm run db:init
 * 3. Wait for "Database initialized successfully" message
 *
 * IMPORTANT:
 * - Only run this ONCE during initial deployment
 * - This connects to the production database defined in DATABASE_URI
 * - Make sure you have DATABASE_PUSH_ENABLED=true in environment
 */

import dotenv from 'dotenv'
import { getPayload } from 'payload'
import config from '../src/payload/payload.config'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function initializeDatabase() {
  try {
    console.log('🔄 Initializing database...')
    console.log('📍 Database:', process.env.DATABASE_URI?.split('@')[1] || 'unknown')

    // Force push mode
    process.env.DATABASE_PUSH_ENABLED = 'true'

    // Initialize Payload - this will create all tables
    const payload = await getPayload({ config })

    console.log('✅ Payload initialized')

    // Verify tables exist by checking collections
    const collections = ['tenants', 'users', 'media']

    for (const collection of collections) {
      try {
        const count = await payload.count({ collection: collection as any })
        console.log(`✅ ${collection}: ${count.totalDocs} documents`)
      } catch (error) {
        console.error(`❌ ${collection}: Failed to query`, error)
        throw error
      }
    }

    console.log('🎉 Database initialized successfully!')
    console.log('')
    console.log('Next steps:')
    console.log('1. Remove DATABASE_PUSH_ENABLED from Vercel environment variables')
    console.log('2. Redeploy your application')
    console.log('3. Create your first admin user at /admin')

    process.exit(0)
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    console.error('')
    console.error('Troubleshooting:')
    console.error('1. Verify DATABASE_URI is correct in .env.local')
    console.error('2. Ensure your IP is allowed in Neon dashboard')
    console.error('3. Check that the database exists in Neon')

    process.exit(1)
  }
}

// Run initialization
initializeDatabase()
