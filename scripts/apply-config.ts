#!/usr/bin/env npx tsx

/**
 * Apply Config Script
 *
 * Transforms onboarding data from Google Drive into client configuration files.
 * This script is run when setting up a new client from a demo template.
 *
 * Usage:
 *   npx tsx scripts/apply-config.ts --data=./path/to/onboarding-data.json
 *   npx tsx scripts/apply-config.ts --client=mueller-elektrik
 *
 * What this script does:
 * 1. Reads onboarding data (JSON from Google Drive or local file)
 * 2. Generates business.config.ts with client data
 * 3. Links to selected pre-built theme (no color conversion needed!)
 * 4. Generates .env.local with CRM/email credentials
 * 5. Updates package.json with client name
 * 6. Disables demo mode
 *
 * Prerequisites:
 * - Node.js 18+
 * - tsx installed (npm install -g tsx)
 * - Valid onboarding-data.json file
 */

import * as fs from 'fs'

// ============================================================================
// Types
// ============================================================================

/**
 * Valid theme IDs from the theme registry
 */
type ThemeId =
  | 'warm-orange'
  | 'fresh-green'
  | 'professional-blue'
  | 'elegant-purple'
  | 'modern-slate'
  | 'energetic-red'
  | 'calm-teal'
  | 'sunny-yellow'

interface OnboardingData {
  // Step 1: Basic Info
  companyName: string
  ownerName: string
  phone: string
  email: string
  website?: string

  // Step 2: Address
  street: string
  zip: string
  city: string
  state: string

  // Step 3: Business Details
  industry: string
  foundedYear: string
  employeeCount: string
  services: string[]
  certifications: string[]
  serviceArea: string[]

  // Step 4: Branding - THEME SELECTION (not hex colors!)
  tagline: string
  /** Selected theme ID from the theme registry */
  selectedTheme: ThemeId
  logoFile?: string

  // Step 5: Social & Legal
  socialMedia: {
    instagram?: string
    facebook?: string
    linkedIn?: string
    googleMaps?: string
  }
  legalInfo: {
    handelsregister?: string
    ustId?: string
    geschaeftsfuehrer: string
  }

  // Opening Hours
  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }

  // CRM & Integration
  crm?: {
    workspaceId: string
    apiKey: string
  }
  emailConfig?: {
    resendApiKey: string
    fromDomain: string
  }
}

interface GeneratedConfig {
  businessConfig: string
  envLocal: string
  demoConfig: string
}

// ============================================================================
// Theme Mapping
// ============================================================================

/**
 * Maps theme IDs to their import statements and variable names
 */
const themeImports: Record<ThemeId, { file: string; varName: string }> = {
  'warm-orange': { file: 'warm-orange.theme', varName: 'warmOrangeTheme' },
  'fresh-green': { file: 'fresh-green.theme', varName: 'freshGreenTheme' },
  'professional-blue': { file: 'professional-blue.theme', varName: 'professionalBlueTheme' },
  'elegant-purple': { file: 'elegant-purple.theme', varName: 'elegantPurpleTheme' },
  'modern-slate': { file: 'modern-slate.theme', varName: 'modernSlateTheme' },
  'energetic-red': { file: 'energetic-red.theme', varName: 'energeticRedTheme' },
  'calm-teal': { file: 'calm-teal.theme', varName: 'calmTealTheme' },
  'sunny-yellow': { file: 'sunny-yellow.theme', varName: 'sunnyYellowTheme' },
}

// ============================================================================
// Template Generators
// ============================================================================

function generateBusinessConfig(data: OnboardingData): string {
  const slug = data.companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  const themeInfo = themeImports[data.selectedTheme]

  return `import type { BusinessConfig } from '../business.types'
import { ${themeInfo.varName} } from '../themes/${themeInfo.file}'

/**
 * Client: ${data.companyName}
 * Industry: ${data.industry}
 * Theme: ${data.selectedTheme}
 * Generated: ${new Date().toISOString()}
 *
 * DO NOT EDIT MANUALLY - Use apply-config script to regenerate
 */
export const clientConfig: BusinessConfig = {
  slug: '${slug}',

  industry: '${data.industry}',

  tier: 'professional',

  branding: {
    logoUrl: '/images/logo.png',
    faviconUrl: '/images/favicon.ico',
    companyName: '${data.companyName}',
    tagline: '${data.tagline}',
  },

  contact: {
    phone: '${data.phone}',
    whatsapp: '${data.phone}',
    email: '${data.email}',
    address: {
      street: '${data.street}',
      city: '${data.city}',
      zip: '${data.zip}',
      state: '${data.state}',
      country: 'Deutschland',
    },
  },

  seo: {
    title: '${data.companyName} | ${data.tagline}',
    description: '${data.companyName} in ${data.city}. ${data.services.slice(0, 3).join(', ')}. Jetzt Kontakt aufnehmen!',
    keywords: [
${data.services.map((s) => `      '${s} ${data.city}',`).join('\n')}
      '${data.industry} ${data.city}',
    ],
    ogImage: '/images/og-image.jpg',
  },

  social: {
    instagram: '${data.socialMedia.instagram || ''}',
    facebook: '${data.socialMedia.facebook || ''}',
    linkedIn: '${data.socialMedia.linkedIn || ''}',
    googleMaps: '${data.socialMedia.googleMaps || ''}',
  },

  openingHours: {
    monday: '${data.openingHours.monday}',
    tuesday: '${data.openingHours.tuesday}',
    wednesday: '${data.openingHours.wednesday}',
    thursday: '${data.openingHours.thursday}',
    friday: '${data.openingHours.friday}',
    saturday: '${data.openingHours.saturday}',
    sunday: '${data.openingHours.sunday}',
  },

  // Pre-built theme from tweakcn - no color conversion needed!
  theme: ${themeInfo.varName},

  customDomain: '${data.website || slug + '.de'}',

  twentyWorkspaceId: '${data.crm?.workspaceId || 'CONFIGURE_ME'}',

  webhooks: {
    leadCreated: 'https://n8n.fabig-suite.de/webhook/lead-created',
    quoteRequested: 'https://n8n.fabig-suite.de/webhook/quote-requested',
  },

  features: {
    whatsappAI: false,
    bookingSystem: false,
    quoteSystem: true,
    emailAutomation: true,
    smsMarketing: false,
    analytics: true,
  },

  legal: {
    handelsregister: '${data.legalInfo.handelsregister || ''}',
    ustId: '${data.legalInfo.ustId || ''}',
    geschaeftsfuehrer: '${data.legalInfo.geschaeftsfuehrer}',
  },

  services: [
${data.services.map((s) => `    '${s}',`).join('\n')}
  ],

  certifications: [
${data.certifications.map((c) => `    '${c}',`).join('\n')}
  ],

  serviceArea: [
${data.serviceArea.map((a) => `    '${a}',`).join('\n')}
  ],

  foundedYear: ${data.foundedYear},
  employeeCount: '${data.employeeCount}',
}
`
}

function generateEnvLocal(data: OnboardingData): string {
  const domain = data.website || data.companyName.toLowerCase().replace(/\s+/g, '-') + '.de'

  return `# Client Configuration
# Generated: ${new Date().toISOString()}
# DO NOT COMMIT THIS FILE

# Demo Mode - DISABLED for production
NEXT_PUBLIC_DEMO_MODE=false

# Site
NEXT_PUBLIC_SITE_URL=https://${domain}
NEXT_PUBLIC_SITE_NAME="${data.companyName}"

# Twenty CRM - Client Workspace
TWENTY_API_URL=https://crm.fabig-suite.de/graphql
TWENTY_API_KEY=${data.crm?.apiKey || 'CONFIGURE_ME'}
TWENTY_WORKSPACE_ID=${data.crm?.workspaceId || 'CONFIGURE_ME'}

# Email - Client Domain
RESEND_API_KEY=${data.emailConfig?.resendApiKey || 'CONFIGURE_ME'}
RESEND_FROM_EMAIL=info@${data.emailConfig?.fromDomain || domain}

# n8n Webhooks
N8N_WEBHOOK_URL=https://automation.fabig.website/webhook

# WhatsApp (Twilio) - if enabled
# TWILIO_ACCOUNT_SID=
# TWILIO_AUTH_TOKEN=
# TWILIO_WHATSAPP_NUMBER=

# Analytics
# NEXT_PUBLIC_PIRSCH_CODE=

# Google Maps (for contact page)
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
`
}

function generateDemoConfig(): string {
  return `/**
 * Demo Mode Configuration
 *
 * DEMO MODE: DISABLED
 * This is a production client site.
 */

export const DEMO_MODE = false

export const demoConfig = {
  enabled: false,
  agency: {
    name: 'Fabig Webdevelopment',
    url: 'https://fabig.website',
    contactUrl: 'https://fabig.website/kontakt',
    phone: '',
    email: '',
  },
  banner: {
    message: '',
    ctaText: '',
    variant: 'gradient' as const,
    dismissible: true,
  },
  badge: {
    position: 'bottom-left' as const,
    text: '',
    showDetails: false,
  },
  footerCta: {
    headline: '',
    description: '',
    primaryButton: '',
    secondaryButton: '',
  },
  modal: {
    headline: '',
    features: [],
    priceIndicator: '',
  },
} as const

export type DemoConfig = typeof demoConfig
`
}

// ============================================================================
// Main Script
// ============================================================================

async function main() {
  const args = process.argv.slice(2)

  // Parse arguments
  let dataPath: string | null = null

  for (const arg of args) {
    if (arg.startsWith('--data=')) {
      dataPath = arg.replace('--data=', '')
    }
    if (arg.startsWith('--client=')) {
      const clientName = arg.replace('--client=', '')
      // Look for data in Google Drive sync folder or local path
      dataPath = `./client-data/${clientName}/onboarding-data.json`
    }
  }

  if (!dataPath) {
    console.error('Usage: npx tsx scripts/apply-config.ts --data=./path/to/onboarding-data.json')
    console.error('   or: npx tsx scripts/apply-config.ts --client=client-name')
    process.exit(1)
  }

  // Read onboarding data
  console.log(`📂 Reading onboarding data from: ${dataPath}`)

  if (!fs.existsSync(dataPath)) {
    console.error(`❌ File not found: ${dataPath}`)
    process.exit(1)
  }

  const rawData = fs.readFileSync(dataPath, 'utf-8')
  const data: OnboardingData = JSON.parse(rawData)

  console.log(`✅ Loaded data for: ${data.companyName}`)
  console.log(`🎨 Selected theme: ${data.selectedTheme}`)

  // Validate theme selection
  if (!themeImports[data.selectedTheme]) {
    console.error(`❌ Invalid theme: ${data.selectedTheme}`)
    console.error(`   Valid themes: ${Object.keys(themeImports).join(', ')}`)
    process.exit(1)
  }

  // Generate configs
  console.log('\n🔧 Generating configuration files...\n')

  const configs: GeneratedConfig = {
    businessConfig: generateBusinessConfig(data),
    envLocal: generateEnvLocal(data),
    demoConfig: generateDemoConfig(),
  }

  // Write files
  const outputPaths = {
    businessConfig: './src/config/clients/client.config.ts',
    envLocal: './.env.local',
    demoConfig: './src/config/demo.config.ts',
  }

  // Ensure directories exist
  for (const dir of ['./src/config/clients', './src/config/themes']) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  // Write business config
  fs.writeFileSync(outputPaths.businessConfig, configs.businessConfig)
  console.log(`✅ Written: ${outputPaths.businessConfig}`)

  // Write demo config (disabled)
  fs.writeFileSync(outputPaths.demoConfig, configs.demoConfig)
  console.log(`✅ Written: ${outputPaths.demoConfig}`)

  // Write .env.local (only if it doesn't exist or user confirms)
  if (fs.existsSync(outputPaths.envLocal)) {
    console.log(`⚠️  ${outputPaths.envLocal} already exists. Skipping to avoid overwriting.`)
    console.log('   To update, delete the file and run this script again.')
    console.log('   Generated .env.local content:')
    console.log('   ---')
    console.log(configs.envLocal.split('\n').map(l => '   ' + l).join('\n'))
    console.log('   ---')
  } else {
    fs.writeFileSync(outputPaths.envLocal, configs.envLocal)
    console.log(`✅ Written: ${outputPaths.envLocal}`)
  }

  // Update clients/index.ts to use new config
  const indexContent = `import type { BusinessConfig } from '../business.types'
import { clientConfig } from './client.config'

/**
 * Client configuration registry
 * For client sites, this just exports the single client config
 */
export const clients: Record<string, BusinessConfig> = {
  client: clientConfig,
}

export function getClientConfig(): BusinessConfig {
  return clientConfig
}

export function getAllClients(): BusinessConfig[] {
  return [clientConfig]
}
`

  fs.writeFileSync('./src/config/clients/index.ts', indexContent)
  console.log(`✅ Updated: ./src/config/clients/index.ts`)

  console.log('\n🎉 Configuration applied successfully!')
  console.log(`\n🎨 Theme "${data.selectedTheme}" has been applied.`)
  console.log('   No color conversion needed - using pre-built tweakcn theme!\n')
  console.log('📋 Next steps:')
  console.log('   1. Review generated config files')
  console.log('   2. Add client logo to /public/images/logo.png')
  console.log('   3. Update .env.local with actual API keys')
  console.log('   4. Run: npm run dev to preview')
  console.log('   5. Run: npm run build to verify no errors')
  console.log('   6. Deploy to Vercel')
}

main().catch(console.error)
