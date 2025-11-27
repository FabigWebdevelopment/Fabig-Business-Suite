/**
 * Demo Mode Configuration
 *
 * Controls whether demo-specific components are rendered.
 * Set via environment variable: NEXT_PUBLIC_DEMO_MODE
 *
 * Demo Sites: NEXT_PUBLIC_DEMO_MODE=true
 * Client Sites: NEXT_PUBLIC_DEMO_MODE=false (or unset)
 */

/**
 * Whether the site is running in demo mode
 * Demo mode shows:
 * - Top banner promoting the agency
 * - Floating badge
 * - Footer CTA
 * - "I want this" modal triggers
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

/**
 * Demo configuration options
 */
export const demoConfig = {
  /** Whether demo mode is enabled */
  enabled: DEMO_MODE,

  /** Agency information (shown in demo components) */
  agency: {
    name: 'Fabig Webdevelopment',
    url: 'https://fabig.website',
    contactUrl: 'https://fabig.website/kontakt',
    phone: '+49 89 12345678',
    email: 'info@fabig.website',
  },

  /** Demo banner configuration */
  banner: {
    /** Message shown in the banner */
    message: 'Dies ist eine Demo-Website',
    /** CTA button text */
    ctaText: 'Ihre eigene Website anfragen',
    /** Banner variant: 'default' | 'gradient' | 'minimal' */
    variant: 'gradient' as const,
    /** Allow users to dismiss the banner */
    dismissible: true,
  },

  /** Floating badge configuration */
  badge: {
    /** Position: 'bottom-left' | 'bottom-right' */
    position: 'bottom-left' as const,
    /** Text shown on the badge */
    text: 'Demo',
    /** Show expanded info on hover */
    showDetails: true,
  },

  /** Footer CTA configuration */
  footerCta: {
    /** Headline text */
    headline: 'Gefällt Ihnen diese Website?',
    /** Description text */
    description: 'Wir erstellen eine individuelle Website für Ihr Unternehmen.',
    /** Primary button text */
    primaryButton: 'Jetzt Angebot anfordern',
    /** Secondary button text */
    secondaryButton: 'Demo-Features erkunden',
  },

  /** Modal configuration */
  modal: {
    /** Headline in the modal */
    headline: 'Ihre eigene professionelle Website',
    /** Features list */
    features: [
      'Individuelles Design nach Ihren Wünschen',
      'Suchmaschinenoptimiert (SEO)',
      'Mobilfreundlich & schnell',
      'Integrierte Lead-Generierung',
      'Automatisierte E-Mail-Sequenzen',
    ],
    /** Price indicator */
    priceIndicator: 'Ab €299/Monat',
  },
} as const

/**
 * Type for demo config
 */
export type DemoConfig = typeof demoConfig
