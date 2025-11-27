'use client'

/**
 * Demo Indicator - Master Component
 *
 * Combines all demo indicator components into a single, easy-to-use wrapper.
 * Uses centralized config from src/config/demo.config.ts
 *
 * IMPORTANT: Set NEXT_PUBLIC_DEMO_MODE=true to enable demo components.
 * For client sites, this should be false or unset.
 *
 * @example
 * // In your demo layout - just add it, config controls visibility
 * <DemoIndicator />
 *
 * @example
 * // Override config settings
 * <DemoIndicator
 *   agencyUrl="https://fabig.website"
 *   showBanner={true}
 *   showBadge={true}
 * />
 */

import { DemoBanner } from './DemoBanner'
import { DemoBadge } from './DemoBadge'
import { DEMO_MODE, demoConfig } from '@/config/demo.config'

interface DemoIndicatorProps {
  /** Agency website URL */
  agencyUrl?: string
  /** Agency name */
  agencyName?: string
  /** Show the top banner */
  showBanner?: boolean
  /** Show the floating badge */
  showBadge?: boolean
  /** Banner variant */
  bannerVariant?: 'default' | 'gradient' | 'minimal'
  /** Badge variant */
  badgeVariant?: 'default' | 'minimal' | 'expanded'
  /** Badge position */
  badgePosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  /** Allow dismissing the banner */
  dismissibleBanner?: boolean
  /** Is this in development/preview mode (always shows banner) */
  isPreview?: boolean
}

export function DemoIndicator({
  agencyUrl = demoConfig.agency.url,
  agencyName = demoConfig.agency.name,
  showBanner = true,
  showBadge = true,
  bannerVariant = demoConfig.banner.variant,
  badgeVariant = 'default',
  badgePosition = demoConfig.badge.position,
  dismissibleBanner = demoConfig.banner.dismissible,
  isPreview = false,
}: DemoIndicatorProps) {
  // Don't render anything if demo mode is disabled
  if (!DEMO_MODE) {
    return null
  }

  // In preview mode, use a different storage key so banner always shows
  const storageKey = isPreview
    ? 'fabig-demo-banner-preview'
    : 'fabig-demo-banner-dismissed'

  return (
    <>
      {showBanner && (
        <DemoBanner
          agencyUrl={agencyUrl}
          agencyName={agencyName}
          variant={bannerVariant}
          dismissible={dismissibleBanner}
          storageKey={storageKey}
        />
      )}

      {showBadge && (
        <DemoBadge
          agencyUrl={agencyUrl}
          agencyName={agencyName}
          variant={badgeVariant}
          position={badgePosition}
        />
      )}
    </>
  )
}
