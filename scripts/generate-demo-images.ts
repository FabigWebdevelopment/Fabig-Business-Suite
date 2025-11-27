#!/usr/bin/env tsx
/**
 * Generate demo images for sample businesses
 *
 * Run with: npx tsx scripts/generate-demo-images.ts [--electrician-only]
 */

import {
  generateHeroImage,
  generateLogo,
  generateCEOPortrait,
  generateServiceImage,
  saveImageToPublic,
  loadReferenceImage,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// Reference image path (set to null to skip using reference)
const REFERENCE_IMAGE_PATH = 'public/reference.jpg'

// Check for command line arguments
const args = process.argv.slice(2)
const electricianOnly = args.includes('--electrician-only')

// Brand color palettes for demos (matching shadcn theme)
const brandColors = {
  electrician: {
    primary: '#C73125', // Professional red-orange (from shadcn theme oklch(0.4650 0.1470 24.9381))
    secondary: '#16A34A', // Trust-building green accent
    accent: '#EA580C', // Warm red-orange highlights
    background: '#FAFAF9', // Clean warm white
  },
  barber: {
    primary: '#1F2937', // Sophisticated charcoal
    secondary: '#D4AF37', // Luxury gold
    accent: '#9CA3AF', // Silver accent
    background: '#FFFFFF', // Pure white
  },
}

interface Demo {
  id: string
  name: string
  type: string
  style: 'modern' | 'professional' | 'elegant' | 'minimalist'
  ceo?: {
    name: string
    title: string
  }
  services?: Array<{
    id: string
    type: 'smart-home' | 'installation' | 'security' | 'solar' | 'ev-charging'
    filename: string
  }>
}

const demos: Demo[] = [
  {
    id: 'barber',
    name: 'Schnitt & Stil Barbershop',
    type: 'Barbershop / Friseur',
    style: 'modern',
  },
  {
    id: 'electrician',
    name: 'Müller Elektrotechnik',
    type: 'Elektroinstallation',
    style: 'professional',
    ceo: {
      name: 'Thomas Müller',
      title: 'Geschäftsführer & Elektrotechnikermeister',
    },
    services: [
      { id: 'smart-home', type: 'smart-home', filename: 'smart-home-service.jpg' },
      { id: 'installation', type: 'installation', filename: 'installation-service.jpg' },
      { id: 'security', type: 'security', filename: 'security-service.jpg' },
      { id: 'ev-charging', type: 'ev-charging', filename: 'ev-charging-service.jpg' },
    ],
  },
]

async function generateBasicImages(demo: Demo, referenceImageBase64?: string) {
  console.log(`\n📸 Generating basic images for ${demo.name}...`)
  if (referenceImageBase64 && demo.ceo) {
    console.log(`  🎯 Using reference photo for personal hero image`)
  }

  try {
    // Generate hero image (with reference photo for personal touch)
    console.log('  - Generating hero image...')
    const heroImage = await generateHeroImage(
      demo.type,
      demo.name,
      demo.style,
      undefined, // colorPalette
      referenceImageBase64 // reference photo for personal hero
    )
    const heroPath = await saveImageToPublic(
      heroImage.data,
      `${demo.id}-hero.png`,
      `demo-${demo.id}`
    )
    console.log(`  ✅ Hero image saved: ${heroPath}`)

    // Wait a bit to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate logo
    console.log('  - Generating logo...')
    const logo = await generateLogo(
      demo.name,
      demo.type,
      demo.style === 'modern' ? 'modern' : 'classic'
    )
    const logoPath = await saveImageToPublic(
      logo.data,
      `${demo.id}-logo.png`,
      `demo-${demo.id}`
    )
    console.log(`  ✅ Logo saved: ${logoPath}`)
  } catch (error) {
    console.error(`\n❌ Error generating basic images:`, error)
    throw error
  }
}

async function generatePersonaImages(demo: Demo, referenceImageBase64?: string) {
  if (!demo.ceo) {
    console.log(`  ⏭️  Skipping persona images (no CEO defined)`)
    return
  }

  console.log(`\n👤 Generating persona-focused images for ${demo.ceo.name}...`)
  if (referenceImageBase64) {
    console.log(`  🎯 Using reference photo to match appearance`)
  }

  try {
    // Generate CEO portrait (professional headshot)
    console.log('  - Generating CEO professional portrait...')
    const portraitImage = await generateCEOPortrait(
      demo.ceo.name,
      demo.type,
      'professional-headshot',
      referenceImageBase64
    )
    const portraitPath = await saveImageToPublic(
      portraitImage.data,
      'thomas-mueller-portrait.jpg',
      `demo-${demo.id}`
    )
    console.log(`  ✅ CEO portrait saved: ${portraitPath}`)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate CEO at work image
    console.log('  - Generating CEO at work image...')
    const atWorkImage = await generateCEOPortrait(
      demo.ceo.name,
      demo.type,
      'at-work',
      referenceImageBase64
    )
    const atWorkPath = await saveImageToPublic(
      atWorkImage.data,
      'thomas-mueller-at-work.jpg',
      `demo-${demo.id}`
    )
    console.log(`  ✅ CEO at work image saved: ${atWorkPath}`)

    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate CEO consulting image
    console.log('  - Generating CEO consulting image...')
    const consultingImage = await generateCEOPortrait(
      demo.ceo.name,
      demo.type,
      'consulting',
      referenceImageBase64
    )
    const consultingPath = await saveImageToPublic(
      consultingImage.data,
      'thomas-mueller-consulting.jpg',
      `demo-${demo.id}`
    )
    console.log(`  ✅ CEO consulting image saved: ${consultingPath}`)
  } catch (error) {
    console.error(`\n❌ Error generating persona images:`, error)
    throw error
  }
}

async function generateServiceImages(demo: Demo, referenceImageBase64?: string) {
  if (!demo.services || demo.services.length === 0) {
    console.log(`  ⏭️  Skipping service images (no services defined)`)
    return
  }

  console.log(`\n🔧 Generating service showcase images...`)
  if (referenceImageBase64) {
    console.log(`  🎯 Using reference photo for persona consistency`)
  }

  for (const service of demo.services) {
    try {
      console.log(`  - Generating ${service.id} service image...`)
      const serviceImage = await generateServiceImage(service.type, true, referenceImageBase64)
      const servicePath = await saveImageToPublic(
        serviceImage.data,
        service.filename,
        `demo-${demo.id}`
      )
      console.log(`  ✅ ${service.id} service image saved: ${servicePath}`)

      // Wait between service images
      await new Promise((resolve) => setTimeout(resolve, 3000))
    } catch (error) {
      console.error(`\n❌ Error generating ${service.id} service image:`, error)
      // Continue with other services even if one fails
    }
  }
}

async function generateDemoImages() {
  console.log('🎨 Generating demo images with Gemini AI...')
  console.log('💡 Using ultra-detailed, persona-focused prompts for professional results\n')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    console.error('Please add your Gemini API key to .env.local:')
    console.error('GOOGLE_GEMINI_API_KEY=your_key_here')
    process.exit(1)
  }

  const demosToGenerate = electricianOnly
    ? demos.filter((d) => d.id === 'electrician')
    : demos

  if (electricianOnly) {
    console.log('🎯 Generating electrician demo images only\n')
  }

  // Load reference image if available
  let referenceImageBase64: string | undefined
  try {
    console.log(`\n📸 Loading reference image...`)
    referenceImageBase64 = await loadReferenceImage(REFERENCE_IMAGE_PATH)
  } catch (error) {
    console.log(`  ⚠️  No reference image found at ${REFERENCE_IMAGE_PATH}`)
    console.log(`  ℹ️  Continuing without reference photo (generic persona will be used)\n`)
  }

  for (const demo of demosToGenerate) {
    console.log(`\n${'='.repeat(60)}`)
    console.log(`📦 Processing: ${demo.name}`)
    console.log(`${'='.repeat(60)}`)

    try {
      // Step 1: Basic images (hero with reference photo, logo)
      await generateBasicImages(demo, referenceImageBase64)

      // Wait between steps
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 2: Persona images (CEO portraits)
      await generatePersonaImages(demo, referenceImageBase64)

      // Wait between steps
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Step 3: Service showcase images
      await generateServiceImages(demo, referenceImageBase64)

      console.log(`\n✨ Completed ${demo.name}`)
    } catch (error) {
      console.error(`\n❌ Error generating images for ${demo.name}:`, error)
      console.log('Continuing with next demo...')
    }

    // Wait between businesses
    if (demosToGenerate.indexOf(demo) < demosToGenerate.length - 1) {
      console.log('\n⏳ Waiting before next business...')
      await new Promise((resolve) => setTimeout(resolve, 5000))
    }
  }

  console.log('\n\n' + '='.repeat(60))
  console.log('🎉 Image generation complete!')
  console.log('='.repeat(60))
  console.log('\n📁 Generated files:')

  if (!electricianOnly) {
    console.log('\n  Barber Demo:')
    console.log('    - public/demo-barber/barber-hero.png')
    console.log('    - public/demo-barber/barber-logo.png')
  }

  console.log('\n  Electrician Demo (Premium Persona-Focused):')
  console.log('    - public/demo-electrician/electrician-hero.png')
  console.log('    - public/demo-electrician/electrician-logo.png')
  console.log('    - public/demo-electrician/thomas-mueller-portrait.jpg')
  console.log('    - public/demo-electrician/thomas-mueller-at-work.jpg')
  console.log('    - public/demo-electrician/thomas-mueller-consulting.jpg')
  console.log('    - public/demo-electrician/smart-home-service.jpg')
  console.log('    - public/demo-electrician/installation-service.jpg')
  console.log('    - public/demo-electrician/security-service.jpg')

  console.log('\n💡 Next steps:')
  console.log('  1. Review generated images')
  console.log('  2. Update image paths in demo pages if needed')
  console.log('  3. Optimize images for web (already 2K resolution)')
  console.log(
    '  4. Consider generating variations for different personas/industries\n'
  )
}

// Run the script
generateDemoImages().catch((error) => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
