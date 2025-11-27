#!/usr/bin/env npx tsx

/**
 * Fabig Client Setup Script
 *
 * Master script that orchestrates the entire client setup process.
 * Run after cloning a demo repo to configure it for a new client.
 *
 * Usage:
 *   npm run setup                           # Interactive mode
 *   npm run setup -- --data=./client.json   # From JSON file
 *   npm run setup -- --no-interactive       # Headless mode (CI/CD)
 *
 * What this script does:
 * 1. Collects client information (interactive or from JSON)
 * 2. Generates business configuration
 * 3. Applies selected theme
 * 4. Disables demo mode
 * 5. Creates .env.local
 * 6. Updates package.json
 * 7. Optionally generates AI images
 * 8. Runs build verification
 */

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'

// ============================================================================
// Types
// ============================================================================

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
  companyName: string
  ownerName: string
  phone: string
  email: string
  website?: string

  street: string
  zip: string
  city: string
  state: string

  industry: string
  foundedYear: string
  employeeCount: string
  services: string[]
  certifications: string[]
  serviceArea: string[]

  tagline: string
  selectedTheme: ThemeId
  logoFile?: string

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

  openingHours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }

  crm?: {
    workspaceId: string
    apiKey: string
  }

  emailConfig?: {
    resendApiKey: string
    fromDomain: string
  }
}

interface SetupOptions {
  dataPath?: string
  noInteractive: boolean
  skipImages: boolean
  skipBuild: boolean
}

// ============================================================================
// Theme Registry
// ============================================================================

const themes: Record<ThemeId, { name: string; description: string; industries: string[] }> = {
  'warm-orange': {
    name: 'Warm Orange',
    description: 'Einladend & energiegeladen',
    industries: ['Restaurant', 'Café', 'Bäckerei', 'Handwerk'],
  },
  'fresh-green': {
    name: 'Fresh Green',
    description: 'Natürlich & vertrauenswürdig',
    industries: ['Gartenbau', 'Wellness', 'Fitness', 'Bio'],
  },
  'professional-blue': {
    name: 'Professional Blue',
    description: 'Seriös & kompetent',
    industries: ['Elektriker', 'IT', 'Beratung', 'Handwerk'],
  },
  'elegant-purple': {
    name: 'Elegant Purple',
    description: 'Luxuriös & kreativ',
    industries: ['Friseur', 'Kosmetik', 'Spa', 'Mode'],
  },
  'modern-slate': {
    name: 'Modern Slate',
    description: 'Minimalistisch & zeitlos',
    industries: ['Architektur', 'Fotografie', 'Tech', 'Agentur'],
  },
  'energetic-red': {
    name: 'Energetic Red',
    description: 'Dynamisch & leidenschaftlich',
    industries: ['Sport', 'Fitness', 'Automotive', 'Events'],
  },
  'calm-teal': {
    name: 'Calm Teal',
    description: 'Beruhigend & professionell',
    industries: ['Arztpraxis', 'Zahnarzt', 'Therapie', 'Pflege'],
  },
  'sunny-yellow': {
    name: 'Sunny Yellow',
    description: 'Fröhlich & optimistisch',
    industries: ['Kinder', 'Events', 'Freizeit', 'Tourismus'],
  },
}

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
// CLI Helpers
// ============================================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim())
    })
  })
}

function print(message: string) {
  console.log(message)
}

function printHeader(title: string) {
  const line = '═'.repeat(60)
  print(`\n╔${line}╗`)
  print(`║ ${title.padEnd(58)} ║`)
  print(`╚${line}╝\n`)
}

function printSection(title: string) {
  print(`\n${title}`)
  print('─'.repeat(40))
}

function printSuccess(message: string) {
  print(`✅ ${message}`)
}

function printError(message: string) {
  print(`❌ ${message}`)
}

function printWarning(message: string) {
  print(`⚠️  ${message}`)
}

// ============================================================================
// Interactive Data Collection
// ============================================================================

async function collectDataInteractively(): Promise<OnboardingData> {
  printHeader('FABIG CLIENT SETUP WIZARD')

  // Step 1: Basic Information
  printSection('Step 1/5: Basic Information')
  const companyName = await ask('? Company name: ')
  const ownerName = await ask('? Owner name: ')
  const phone = await ask('? Phone number: ')
  const email = await ask('? Email: ')
  const website = await ask('? Website (optional): ')

  // Step 2: Address
  printSection('Step 2/5: Address')
  const street = await ask('? Street: ')
  const zip = await ask('? ZIP code: ')
  const city = await ask('? City: ')
  const state = await ask('? State: ')

  // Step 3: Business Details
  printSection('Step 3/5: Business Details')
  const industry = await ask('? Industry (e.g., electrician, restaurant): ')
  const foundedYear = await ask('? Founded year: ')
  const employeeCount = await ask('? Employee count (e.g., 5-10): ')
  const servicesStr = await ask('? Services (comma-separated): ')
  const certificationsStr = await ask('? Certifications (comma-separated): ')
  const serviceAreaStr = await ask('? Service areas (comma-separated): ')
  const tagline = await ask('? Tagline: ')

  // Step 4: Theme Selection
  printSection('Step 4/5: Theme Selection')
  print('\nAvailable themes:\n')
  const themeIds = Object.keys(themes) as ThemeId[]
  themeIds.forEach((id, index) => {
    const theme = themes[id]
    print(`  ${index + 1}. ${theme.name.padEnd(20)} - ${theme.description}`)
    print(`     ${theme.industries.join(', ')}`)
  })
  print('')
  const themeChoice = await ask('? Select theme (1-8): ')
  const selectedTheme = themeIds[parseInt(themeChoice) - 1] || 'professional-blue'

  // Step 5: Legal Info
  printSection('Step 5/5: Legal Information')
  const geschaeftsfuehrer = await ask('? Geschäftsführer: ')
  const handelsregister = await ask('? Handelsregister (optional): ')
  const ustId = await ask('? USt-ID (optional): ')

  // Social Media (optional)
  print('\nSocial Media (press Enter to skip):')
  const instagram = await ask('? Instagram URL: ')
  const facebook = await ask('? Facebook URL: ')
  const googleMaps = await ask('? Google Maps URL: ')

  // CRM Integration (optional)
  print('\nCRM Integration (press Enter to skip):')
  const crmWorkspaceId = await ask('? Twenty CRM Workspace ID: ')
  const crmApiKey = await ask('? Twenty CRM API Key: ')

  return {
    companyName,
    ownerName,
    phone,
    email,
    website: website || undefined,
    street,
    zip,
    city,
    state,
    industry,
    foundedYear,
    employeeCount,
    services: servicesStr.split(',').map((s) => s.trim()).filter(Boolean),
    certifications: certificationsStr.split(',').map((s) => s.trim()).filter(Boolean),
    serviceArea: serviceAreaStr.split(',').map((s) => s.trim()).filter(Boolean),
    tagline,
    selectedTheme,
    socialMedia: {
      instagram: instagram || undefined,
      facebook: facebook || undefined,
      googleMaps: googleMaps || undefined,
    },
    legalInfo: {
      geschaeftsfuehrer,
      handelsregister: handelsregister || undefined,
      ustId: ustId || undefined,
    },
    openingHours: {
      monday: '08:00 - 17:00',
      tuesday: '08:00 - 17:00',
      wednesday: '08:00 - 17:00',
      thursday: '08:00 - 17:00',
      friday: '08:00 - 16:00',
      saturday: 'Geschlossen',
      sunday: 'Geschlossen',
    },
    crm: crmWorkspaceId
      ? { workspaceId: crmWorkspaceId, apiKey: crmApiKey }
      : undefined,
  }
}

// ============================================================================
// File Generators
// ============================================================================

function generateSlug(companyName: string): string {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

function generateBusinessConfig(data: OnboardingData): string {
  const slug = generateSlug(data.companyName)
  const themeInfo = themeImports[data.selectedTheme]

  return `import type { BusinessConfig } from '../business.types'
import { ${themeInfo.varName} } from '../themes/${themeInfo.file}'

/**
 * Client Configuration
 *
 * Company: ${data.companyName}
 * Industry: ${data.industry}
 * Theme: ${data.selectedTheme}
 * Generated: ${new Date().toISOString()}
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

  foundedYear: ${data.foundedYear || new Date().getFullYear()},
  employeeCount: '${data.employeeCount}',
}
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
    features: [] as string[],
    priceIndicator: '',
  },
} as const

export type DemoConfig = typeof demoConfig
`
}

function generateEnvLocal(data: OnboardingData): string {
  const domain = data.website || generateSlug(data.companyName) + '.de'

  return `# Client Configuration
# Generated: ${new Date().toISOString()}
# DO NOT COMMIT THIS FILE

# Demo Mode - DISABLED for production
NEXT_PUBLIC_DEMO_MODE=false

# Site
NEXT_PUBLIC_SITE_URL=https://${domain}
NEXT_PUBLIC_SITE_NAME="${data.companyName}"

# Twenty CRM
TWENTY_API_URL=https://crm.fabig-suite.de/graphql
TWENTY_API_KEY=${data.crm?.apiKey || 'CONFIGURE_ME'}
TWENTY_WORKSPACE_ID=${data.crm?.workspaceId || 'CONFIGURE_ME'}

# Email (Resend)
RESEND_API_KEY=${data.emailConfig?.resendApiKey || 'CONFIGURE_ME'}
RESEND_FROM_EMAIL=info@${data.emailConfig?.fromDomain || domain}

# n8n Webhooks
N8N_WEBHOOK_URL=https://automation.fabig.website/webhook

# Image Generation (Gemini)
GEMINI_API_KEY=CONFIGURE_ME

# Analytics (Pirsch)
# NEXT_PUBLIC_PIRSCH_CODE=

# Google Maps
# NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
`
}

function generateClientsIndex(): string {
  return `import type { BusinessConfig } from '../business.types'
import { clientConfig } from './client.config'

/**
 * Client configuration registry
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
}

function updatePackageJson(data: OnboardingData): void {
  const packagePath = './package.json'
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))

  pkg.name = generateSlug(data.companyName) + '-website'
  pkg.description = `Website for ${data.companyName}`

  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n')
}

// ============================================================================
// Main Setup Function
// ============================================================================

async function setup(options: SetupOptions) {
  printHeader('FABIG CLIENT SETUP')

  let data: OnboardingData

  // Step 1: Get onboarding data
  if (options.dataPath) {
    print(`📂 Reading data from: ${options.dataPath}`)
    if (!fs.existsSync(options.dataPath)) {
      printError(`File not found: ${options.dataPath}`)
      process.exit(1)
    }
    data = JSON.parse(fs.readFileSync(options.dataPath, 'utf-8'))
    printSuccess(`Loaded data for: ${data.companyName}`)
  } else if (options.noInteractive) {
    printError('No data file provided and --no-interactive flag set')
    print('Usage: npm run setup -- --data=./client.json --no-interactive')
    process.exit(1)
  } else {
    data = await collectDataInteractively()
  }

  // Validate theme
  if (!themeImports[data.selectedTheme]) {
    printError(`Invalid theme: ${data.selectedTheme}`)
    print(`Valid themes: ${Object.keys(themeImports).join(', ')}`)
    process.exit(1)
  }

  print(`\n🎨 Selected theme: ${themes[data.selectedTheme].name}`)

  // Step 2: Create directories
  const dirs = ['./src/config/clients', './src/config/themes', './public/images']
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  }

  // Step 3: Generate configuration files
  printSection('Generating Configuration')

  // Business config
  const businessConfig = generateBusinessConfig(data)
  fs.writeFileSync('./src/config/clients/client.config.ts', businessConfig)
  printSuccess('Created: src/config/clients/client.config.ts')

  // Clients index
  const clientsIndex = generateClientsIndex()
  fs.writeFileSync('./src/config/clients/index.ts', clientsIndex)
  printSuccess('Created: src/config/clients/index.ts')

  // Demo config (disabled)
  const demoConfig = generateDemoConfig()
  fs.writeFileSync('./src/config/demo.config.ts', demoConfig)
  printSuccess('Created: src/config/demo.config.ts (demo mode disabled)')

  // Environment variables
  const envPath = './.env.local'
  if (fs.existsSync(envPath)) {
    printWarning('.env.local already exists - skipping to preserve existing values')
    print('   Review and update manually if needed')
  } else {
    const envLocal = generateEnvLocal(data)
    fs.writeFileSync(envPath, envLocal)
    printSuccess('Created: .env.local')
  }

  // Update package.json
  updatePackageJson(data)
  printSuccess('Updated: package.json')

  // Step 4: Build verification (optional)
  if (!options.skipBuild) {
    printSection('Build Verification')
    print('Running: npm run build...\n')

    const { execSync } = await import('child_process')
    try {
      execSync('npm run build', { stdio: 'inherit' })
      printSuccess('Build successful!')
    } catch {
      printError('Build failed - please check errors above')
      print('You can fix issues and run: npm run build')
    }
  }

  // Step 5: Print next steps
  printSection('Setup Complete!')

  print(`
📋 Next Steps:

   1. Add client logo
      cp /path/to/logo.png ./public/images/logo.png

   2. Update API keys in .env.local
      - TWENTY_API_KEY
      - RESEND_API_KEY
      - GEMINI_API_KEY (for image generation)

   3. Preview locally
      npm run dev

   4. Generate custom images (optional)
      npm run generate-images

   5. Deploy to production
      git add .
      git commit -m "Setup: ${data.companyName}"
      git push origin main

═══════════════════════════════════════════════════════════════

   Site: https://${data.website || generateSlug(data.companyName) + '.de'}
   Theme: ${themes[data.selectedTheme].name}
   Industry: ${data.industry}
`)

  rl.close()
}

// ============================================================================
// CLI Entry Point
// ============================================================================

function parseArgs(): SetupOptions {
  const args = process.argv.slice(2)
  const options: SetupOptions = {
    noInteractive: false,
    skipImages: false,
    skipBuild: false,
  }

  for (const arg of args) {
    if (arg.startsWith('--data=')) {
      options.dataPath = arg.replace('--data=', '')
    }
    if (arg === '--no-interactive') {
      options.noInteractive = true
    }
    if (arg === '--skip-images') {
      options.skipImages = true
    }
    if (arg === '--skip-build') {
      options.skipBuild = true
    }
    if (arg === '--help' || arg === '-h') {
      print(`
Fabig Client Setup Script

Usage:
  npm run setup                           Interactive mode
  npm run setup -- --data=./client.json   From JSON file
  npm run setup -- --no-interactive       Headless mode (requires --data)
  npm run setup -- --skip-build           Skip build verification
  npm run setup -- --skip-images          Skip image generation prompt

Options:
  --data=<path>      Path to onboarding JSON file
  --no-interactive   Run without prompts (CI/CD mode)
  --skip-build       Skip build verification step
  --skip-images      Skip image generation prompt
  --help, -h         Show this help message
`)
      process.exit(0)
    }
  }

  return options
}

// Run
const options = parseArgs()
setup(options).catch((error) => {
  printError(`Setup failed: ${error.message}`)
  process.exit(1)
})
