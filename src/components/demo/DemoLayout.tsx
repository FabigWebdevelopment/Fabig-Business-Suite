'use client'

/**
 * Demo Layout Wrapper
 *
 * Wrap demo pages with this component to automatically include
 * all demo indicators (banner, badge, footer CTA).
 *
 * IMPORTANT: This component only renders demo elements when DEMO_MODE is true.
 * Set via environment variable: NEXT_PUBLIC_DEMO_MODE=true
 *
 * @example
 * // In a demo page
 * import { DemoLayout } from '@/components/demo'
 *
 * export default function DemoPage() {
 *   return (
 *     <DemoLayout>
 *       <YourPageContent />
 *     </DemoLayout>
 *   )
 * }
 *
 * @example
 * // With custom options
 * <DemoLayout
 *   showFooterCTA={true}
 *   badgePosition="bottom-right"
 *   bannerVariant="minimal"
 * >
 *   <YourPageContent />
 * </DemoLayout>
 */

import { ReactNode } from 'react'
import { DemoIndicator } from './DemoIndicator'
import { DemoFooterCTA } from './DemoFooterCTA'
import { DEMO_MODE, demoConfig } from '@/config/demo.config'

interface DemoLayoutProps {
  children: ReactNode
  /** Agency URL - defaults to config value */
  agencyUrl?: string
  /** Agency name - defaults to config value */
  agencyName?: string
  /** Show top banner */
  showBanner?: boolean
  /** Show floating badge */
  showBadge?: boolean
  /** Show footer CTA section */
  showFooterCTA?: boolean
  /** Banner variant */
  bannerVariant?: 'default' | 'gradient' | 'minimal'
  /** Badge variant */
  badgeVariant?: 'default' | 'minimal' | 'expanded'
  /** Badge position */
  badgePosition?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  /** Footer CTA variant */
  footerCTAVariant?: 'default' | 'gradient' | 'card'
  /** Insert footer CTA before this element (CSS selector) */
  footerCTABefore?: string
}

export function DemoLayout({
  children,
  agencyUrl = demoConfig.agency.url,
  agencyName = demoConfig.agency.name,
  showBanner = true,
  showBadge = true,
  showFooterCTA = false,
  bannerVariant = demoConfig.banner.variant,
  badgeVariant = 'default',
  badgePosition = demoConfig.badge.position,
  footerCTAVariant = 'card',
}: DemoLayoutProps) {
  // If demo mode is disabled, just render children without any demo elements
  if (!DEMO_MODE) {
    return <>{children}</>
  }

  return (
    <>
      {/* Demo Indicators (Banner + Badge) */}
      <DemoIndicator
        agencyUrl={agencyUrl}
        agencyName={agencyName}
        showBanner={showBanner}
        showBadge={showBadge}
        bannerVariant={bannerVariant}
        badgeVariant={badgeVariant}
        badgePosition={badgePosition}
      />

      {/* Page Content */}
      {children}

      {/* Footer CTA (optional) */}
      {showFooterCTA && (
        <DemoFooterCTA
          agencyUrl={agencyUrl}
          agencyName={agencyName}
          variant={footerCTAVariant}
        />
      )}
    </>
  )
}

/**
 * HOC to wrap a page component with DemoLayout
 *
 * @example
 * export default withDemoLayout(MyPage, {
 *   showFooterCTA: true,
 *   badgePosition: 'bottom-right'
 * })
 */
export function withDemoLayout<P extends object>(
  Component: React.ComponentType<P>,
  layoutProps?: Partial<DemoLayoutProps>
) {
  return function WrappedComponent(props: P) {
    return (
      <DemoLayout {...layoutProps}>
        <Component {...props} />
      </DemoLayout>
    )
  }
}
