import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload/payload.config'

/**
 * Database Initialization Endpoint
 *
 * This endpoint initializes the database schema by creating all required tables.
 *
 * IMPORTANT SECURITY:
 * - Only call this endpoint ONCE during initial deployment
 * - Delete this file after successful initialization
 * - Or add authentication to prevent unauthorized access
 *
 * Usage:
 * 1. Deploy with DATABASE_PUSH_ENABLED=true
 * 2. Visit: https://your-domain.com/api/db/init
 * 3. Wait for "Database initialized successfully" message
 * 4. Remove DATABASE_PUSH_ENABLED from Vercel
 * 5. Delete this file or add auth
 */
export async function GET() {
  try {
    // Security check: Only allow in production if DATABASE_PUSH_ENABLED is true
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_PUSH_ENABLED !== 'true') {
      return NextResponse.json(
        {
          error: 'Database initialization is disabled',
          message: 'Set DATABASE_PUSH_ENABLED=true in Vercel to enable',
        },
        { status: 403 }
      )
    }

    console.warn('[DB Init] Starting database initialization...')

    // Initialize Payload - this will create tables if push is enabled
    const payload = await getPayload({ config })

    // Verify tables were created by checking if we can query users
    const usersCount = await payload.count({
      collection: 'users',
    })

    console.warn(`[DB Init] Database initialized successfully. Found ${usersCount.totalDocs} users.`)

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      collections: ['tenants', 'users', 'media'],
      usersCount: usersCount.totalDocs,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[DB Init] Failed to initialize database:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      },
      { status: 500 }
    )
  }
}
