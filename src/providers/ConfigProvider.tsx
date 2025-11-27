'use client'

/**
 * Config Provider
 *
 * Provides access to fabig.config.ts throughout the application.
 * Use the hooks below to access specific config sections.
 */

import { createContext, useContext, ReactNode } from 'react'
import type { FabigConfig } from '@/types/config'

// Import the actual config (will be created per-client)
// For now, import the example config
import config from '../../fabig.config.example'

// ═══════════════════════════════════════════════════════════════════════════
// CONTEXT
// ═══════════════════════════════════════════════════════════════════════════

const ConfigContext = createContext<FabigConfig>(config)

export function ConfigProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get the full config object
 */
export function useConfig(): FabigConfig {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider')
  }
  return context
}

/**
 * Get business information
 */
export function useBusiness() {
  return useConfig().business
}

/**
 * Get contact information
 */
export function useContact() {
  return useConfig().contact
}

/**
 * Get location and service area
 */
export function useLocation() {
  return useConfig().location
}

/**
 * Get business hours
 */
export function useHours() {
  return useConfig().hours
}

/**
 * Get theme configuration
 */
export function useTheme() {
  return useConfig().theme
}

/**
 * Get SEO configuration
 */
export function useSEO() {
  return useConfig().seo
}

/**
 * Get feature flags
 */
export function useFeatures() {
  return useConfig().features
}

/**
 * Get integrations configuration
 */
export function useIntegrations() {
  return useConfig().integrations
}

/**
 * Get legal information
 */
export function useLegal() {
  return useConfig().legal
}

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY HOOKS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get formatted phone link
 */
export function usePhoneLink() {
  const { phone } = useContact()
  return `tel:${phone.link}`
}

/**
 * Get formatted WhatsApp link with default message
 */
export function useWhatsAppLink(customMessage?: string) {
  const { whatsapp } = useContact()
  const message = customMessage || whatsapp.defaultMessage
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`
}

/**
 * Get formatted email link
 */
export function useEmailLink(subject?: string) {
  const { email } = useContact()
  if (subject) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}`
  }
  return `mailto:${email}`
}

/**
 * Get full address as string
 */
export function useFormattedAddress() {
  const { address } = useLocation()
  return `${address.street}, ${address.zip} ${address.city}`
}

/**
 * Check if a feature is enabled
 */
export function useFeature(feature: keyof ReturnType<typeof useFeatures>) {
  const features = useFeatures()
  return features[feature]
}

// ═══════════════════════════════════════════════════════════════════════════
// DEMO UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Check if this is a demo website
 */
export function useIsDemo() {
  return useConfig().isDemo
}

/**
 * Get demo configuration (returns undefined if not a demo)
 */
export function useDemo() {
  const config = useConfig()
  if (!config.isDemo) return undefined
  return config.demo
}

// ═══════════════════════════════════════════════════════════════════════════
// SERVER-SIDE UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Get config for server components (direct import)
 * Use this in server components instead of hooks
 */
export function getConfig(): FabigConfig {
  return config
}

/**
 * Check if demo mode is enabled (server-side)
 */
export function getIsDemo(): boolean {
  return config.isDemo
}

/**
 * Get demo config (server-side)
 */
export function getDemoConfig() {
  if (!config.isDemo) return undefined
  return config.demo
}

/**
 * Get specific config section for server components
 */
export function getBusinessConfig() {
  return config.business
}

export function getContactConfig() {
  return config.contact
}

export function getLocationConfig() {
  return config.location
}

export function getSEOConfig() {
  return config.seo
}

export function getLegalConfig() {
  return config.legal
}
