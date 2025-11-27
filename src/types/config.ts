/**
 * Fabig Configuration Type Definitions
 *
 * This file defines the structure for all client-specific configuration.
 * Every piece of client data should come from fabig.config.ts
 */

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface FabigConfig {
  /** Is this a demo website? If false, demo indicators are hidden */
  isDemo: boolean
  business: BusinessConfig
  contact: ContactConfig
  location: LocationConfig
  hours: HoursConfig
  theme: ThemeConfig
  seo: SEOConfig
  features: FeatureFlags
  integrations: IntegrationsConfig
  legal: LegalConfig
  /** Demo-specific configuration (only used when isDemo: true) */
  demo?: DemoConfig
}

// ═══════════════════════════════════════════════════════════════════════════
// DEMO CONFIG
// ═══════════════════════════════════════════════════════════════════════════

export interface DemoConfig {
  /** Agency website URL */
  agencyUrl: string
  /** Agency name */
  agencyName: string
  /** Show top banner */
  showBanner: boolean
  /** Show floating badge */
  showBadge: boolean
  /** Show footer CTA */
  showFooterCTA: boolean
}

// ═══════════════════════════════════════════════════════════════════════════
// BUSINESS
// ═══════════════════════════════════════════════════════════════════════════

export type IndustryType =
  | 'electrician'
  | 'barber'
  | 'restaurant'
  | 'clinic'
  | 'plumber'
  | 'hvac'
  | 'painter'
  | 'carpenter'
  | 'other'

export interface Certification {
  name: string
  icon: string
  url?: string
}

export interface BusinessStats {
  yearsExperience: number
  completedProjects: number
  googleRating: number
  googleReviewCount: number
  employees?: number
}

export interface BusinessConfig {
  /** Display name (e.g., "Müller Elektrotechnik") */
  name: string

  /** Legal entity name (e.g., "Müller Elektrotechnik GmbH") */
  legalName: string

  /** Short tagline (e.g., "Ihr Meisterbetrieb in München") */
  tagline: string

  /** Longer description for SEO and about sections */
  description: string

  /** Year founded */
  foundedYear: number

  /** Employee count range */
  employeeCount: string

  /** Industry type for schema and templates */
  industry: IndustryType

  /** Certifications and badges */
  certifications: Certification[]

  /** Key stats for trust building */
  stats: BusinessStats
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════════════════════════════════

export interface PhoneNumber {
  /** Formatted for display (e.g., "+49 89 1234 5678") */
  display: string

  /** For tel: links (e.g., "+4989123456789") */
  link: string
}

export interface WhatsAppConfig {
  /** Phone number for WhatsApp (e.g., "+4989123456789") */
  number: string

  /** Default message when opening WhatsApp */
  defaultMessage: string
}

export interface ContactPerson {
  name: string
  title: string
  email: string
  phone: string
  image?: string
}

export interface ContactConfig {
  phone: PhoneNumber
  email: string
  whatsapp: WhatsAppConfig

  /** Primary contact person (owner/manager) */
  primaryContact: ContactPerson

  /** Additional team contacts (optional) */
  teamContacts?: ContactPerson[]
}

// ═══════════════════════════════════════════════════════════════════════════
// LOCATION
// ═══════════════════════════════════════════════════════════════════════════

export interface Address {
  street: string
  city: string
  zip: string
  state: string
  country: string
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface LocationConfig {
  address: Address
  coordinates: Coordinates

  /** List of service areas/districts */
  serviceAreas: string[]

  /** Service radius (e.g., "30km") */
  serviceRadius: string

  /** Google Maps place ID (for embed) */
  googlePlaceId?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// HOURS
// ═══════════════════════════════════════════════════════════════════════════

export interface TimeSlot {
  open: string  // "08:00"
  close: string // "18:00"
}

export interface WeeklyHours {
  monday: TimeSlot | null
  tuesday: TimeSlot | null
  wednesday: TimeSlot | null
  thursday: TimeSlot | null
  friday: TimeSlot | null
  saturday: TimeSlot | null
  sunday: TimeSlot | null
}

export interface EmergencyHours {
  available: boolean
  text: string
  phone?: string
}

export interface HoursConfig {
  regular: WeeklyHours
  emergency: EmergencyHours

  /** Pre-formatted display string (e.g., "Mo-Fr: 8-18 Uhr") */
  displayFormat: string
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════════════════

export type ThemePreset =
  | 'warm-orange'
  | 'professional-blue'
  | 'nature-green'
  | 'elegant-dark'
  | 'custom'

export type LogoType = 'icon' | 'image' | 'text'

export interface LogoConfig {
  type: LogoType

  /** Lucide icon name if type is "icon" */
  icon?: string

  /** Image path if type is "image" */
  image?: string

  /** Alt text for logo */
  alt?: string
}

export interface ThemeColors {
  primary?: string
  secondary?: string
  accent?: string
  background?: string
  foreground?: string
  muted?: string
  destructive?: string
}

export interface ThemeConfig {
  /** Use a predefined theme preset */
  preset: ThemePreset

  /** Override specific colors (optional) */
  colors?: ThemeColors

  /** Logo configuration */
  logo: LogoConfig

  /** Font family */
  font?: {
    heading?: string
    body?: string
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SEO
// ═══════════════════════════════════════════════════════════════════════════

export interface SEOConfig {
  /** Primary domain (without https://) */
  domain: string

  /** Full site URL */
  siteUrl: string

  /** Default page title */
  defaultTitle: string

  /** Title template (use %s for page title) */
  titleTemplate: string

  /** Default meta description */
  defaultDescription: string

  /** Default OG image path */
  ogImage: string

  /** Google My Business URL */
  googleMapsUrl?: string

  /** Google My Business account ID */
  googleMyBusinessId?: string

  /** Twitter handle (without @) */
  twitterHandle?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURES
// ═══════════════════════════════════════════════════════════════════════════

export type AnalyticsProvider = 'pirsch' | 'plausible' | 'google' | 'none'

export interface FeatureFlags {
  // Contact methods
  whatsapp: boolean
  phoneCall: boolean
  contactForm: boolean

  // UI elements
  emergencyBanner: boolean
  stickyPhoneFAB: boolean
  cookieConsent: boolean

  // Integrations
  googleMaps: boolean
  analytics: AnalyticsProvider

  // Advanced features
  onlineBooking: boolean
  liveChat: boolean
}

// ═══════════════════════════════════════════════════════════════════════════
// INTEGRATIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface CRMIntegration {
  enabled: boolean
  type: 'twenty' | 'hubspot' | 'pipedrive' | 'none'
}

export interface AnalyticsIntegration {
  pirsch?: { enabled: boolean }
  plausible?: { enabled: boolean; domain?: string }
  google?: { enabled: boolean; measurementId?: string }
}

export interface MessagingIntegration {
  provider: 'twilio' | 'messagebird' | 'none'
}

export interface IntegrationsConfig {
  crm: CRMIntegration
  analytics: AnalyticsIntegration
  messaging: MessagingIntegration
}

// ═══════════════════════════════════════════════════════════════════════════
// LEGAL
// ═══════════════════════════════════════════════════════════════════════════

export interface LegalConfig {
  vatId: string
  tradeRegister?: string
  responsiblePerson: string
  dataProtectionOfficer?: string

  // Page URLs
  impressumUrl: string
  datenschutzUrl: string
  agbUrl?: string
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTENT TYPES (for content/*.json files)
// ═══════════════════════════════════════════════════════════════════════════

export interface ServiceContent {
  id: string
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  icon: string
  image: string
  benefits: ServiceBenefit[]
  packages?: string[]
  faqIds?: string[]
}

export interface ServiceBenefit {
  title: string
  highlight: string
  description: string
  image: string
  points: string[]
  cta: string
}

export interface TestimonialContent {
  id: string
  name: string
  location: string
  service: string
  detail?: string
  rating: number
  quote: string
  date: string
  verified: boolean
  source: 'google' | 'proven-expert' | 'direct'
}

export interface FAQContent {
  id: string
  question: string
  answer: string
  service?: string
}

export interface PackageContent {
  id: string
  name: string
  price: string
  priceNote?: string
  features: string[]
  highlight?: boolean
  badge?: string
}
