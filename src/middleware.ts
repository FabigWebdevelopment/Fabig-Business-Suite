import { type NextRequest, NextResponse } from 'next/server'

/**
 * Middleware for tenant detection and routing
 *
 * This middleware:
 * 1. Detects the tenant from subdomain (e.g., kunde.fabig-suite.de)
 * 2. Detects custom domains (e.g., www.kunde.de)
 * 3. Sets tenant context headers for downstream requests
 * 4. Handles admin panel routing
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  // ============================================================================
  // ADMIN PANEL DETECTION
  // ============================================================================
  // Admin panel is always accessed via main domain
  const isAdminPath = url.pathname.startsWith('/admin')
  const isPayloadPath = url.pathname.startsWith('/_payload')

  if (isAdminPath || isPayloadPath) {
    // Admin panel - no tenant context needed
    return NextResponse.next()
  }

  // ============================================================================
  // TENANT DETECTION
  // ============================================================================
  let tenantSlug: string | null = null
  let isCustomDomain = false

  const mainDomains = [
    'fabig-suite.de',
    'fabig-suite.com',
    'localhost:3000',
    'staging.fabig-suite.de',
  ]

  // Check if this is a subdomain request
  const isMainDomain = mainDomains.some((domain) => hostname === domain)

  if (!isMainDomain) {
    // Check if it's a subdomain (e.g., kunde.fabig-suite.de)
    const isSubdomain = mainDomains.some((domain) => hostname.endsWith(`.${domain}`))

    if (isSubdomain) {
      // Extract tenant slug from subdomain
      const parts = hostname.split('.')
      tenantSlug = parts[0] ?? null
    } else {
      // This is a custom domain (e.g., www.kunde.de)
      // We'll need to look up the tenant by custom domain
      isCustomDomain = true
      tenantSlug = hostname // Will be resolved to actual tenant in API
    }
  }

  // ============================================================================
  // SET TENANT CONTEXT HEADERS
  // ============================================================================
  const response = NextResponse.next()

  if (tenantSlug) {
    // Add tenant context to request headers
    response.headers.set('x-tenant-slug', tenantSlug)
    response.headers.set('x-is-custom-domain', isCustomDomain ? 'true' : 'false')
  }

  // ============================================================================
  // SECURITY HEADERS
  // ============================================================================
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

// ============================================================================
// MATCHER CONFIGURATION
// ============================================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
