import { NextResponse } from 'next/server'

/**
 * Health check endpoint
 *
 * Used by:
 * - Vercel deployment verification
 * - Uptime monitoring services
 * - GitHub Actions post-deployment verification
 *
 * Returns:
 * - 200 OK if service is healthy
 * - 500 Internal Server Error if service is unhealthy
 */
export async function GET() {
  try {
    // Basic health check
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_VERSION || '0.1.0',
      uptime: process.uptime(),
    }

    // TODO: Add database health check once Payload is initialized
    // Example:
    // const dbHealth = await checkDatabaseConnection()
    // if (!dbHealth.connected) {
    //   throw new Error('Database connection failed')
    // }

    return NextResponse.json(healthStatus, { status: 200 })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}
