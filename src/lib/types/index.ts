/**
 * Shared TypeScript types for Fabig Business Suite
 *
 * This file will be populated with:
 * - Generated Payload types (from payload-types.ts)
 * - Custom application types
 * - API response types
 */

/**
 * Tenant context type
 * Used throughout the application to track which tenant is making a request
 */
export interface TenantContext {
  id: string
  slug: string
  companyName: string
  subscriptionTier: 'starter' | 'professional' | 'premium' | 'enterprise'
  features: {
    whatsappEnabled: boolean
    whatsappAIEnabled: boolean
    smsEnabled: boolean
    customDomainEnabled: boolean
  }
}

/**
 * API response wrapper
 * Standardizes all API responses
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
    details?: unknown
  }
  meta?: {
    timestamp: string
    requestId?: string
  }
}
