/**
 * Demo Components
 *
 * Components for indicating that a website is a demo
 * and directing users to the agency website.
 *
 * @example
 * // Quick setup - wrap your demo page
 * import { DemoLayout } from '@/components/demo'
 *
 * export default function DemoPage() {
 *   return (
 *     <DemoLayout showFooterCTA={true}>
 *       <YourPageContent />
 *     </DemoLayout>
 *   )
 * }
 *
 * @example
 * // Just indicators (banner + badge)
 * import { DemoIndicator } from '@/components/demo'
 *
 * <DemoIndicator
 *   agencyUrl="https://fabig.de"
 *   showBanner={true}
 *   showBadge={true}
 * />
 *
 * @example
 * // Individual components
 * import { DemoBanner, DemoBadge, DemoFooterCTA } from '@/components/demo'
 *
 * <DemoBanner variant="gradient" />
 * <DemoBadge position="bottom-left" />
 * <DemoFooterCTA variant="card" />
 */

export { DemoBanner } from './DemoBanner'
export { DemoBadge } from './DemoBadge'
export { DemoFooterCTA } from './DemoFooterCTA'
export { DemoIndicator } from './DemoIndicator'
export { DemoLayout, withDemoLayout } from './DemoLayout'

// Re-export the centralized demo config
export { DEMO_MODE, demoConfig } from '@/config/demo.config'
