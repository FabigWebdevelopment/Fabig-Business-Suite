#!/usr/bin/env tsx
/**
 * Generate demo images for sample businesses
 *
 * Run with: npx tsx scripts/generate-demo-images.ts
 */

import { generateHeroImage, generateLogo, saveImageToPublic } from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const demos = [
  {
    id: 'barber',
    name: 'Schnitt & Stil Barbershop',
    type: 'Barbershop / Friseur',
    style: 'modern' as const,
  },
  {
    id: 'electrician',
    name: 'Müller Elektrotechnik',
    type: 'Elektroinstallation',
    style: 'professional' as const,
  },
]

async function generateDemoImages() {
  console.log('🎨 Generating demo images with Gemini...\n')

  for (const demo of demos) {
    console.log(`\n📸 Generating images for ${demo.name}...`)

    try {
      // Generate hero image
      console.log('  - Generating hero image...')
      const heroImage = await generateHeroImage(demo.type, demo.name, demo.style)
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
      const logo = await generateLogo(demo.name, demo.type, demo.style === 'modern' ? 'modern' : 'classic')
      const logoPath = await saveImageToPublic(
        logo.data,
        `${demo.id}-logo.png`,
        `demo-${demo.id}`
      )
      console.log(`  ✅ Logo saved: ${logoPath}`)

      console.log(`\n✨ Completed ${demo.name}`)
    } catch (error) {
      console.error(`\n❌ Error generating images for ${demo.name}:`, error)
    }

    // Wait between businesses
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  console.log('\n\n🎉 All demo images generated successfully!')
  console.log('\nGenerated files:')
  console.log('  - public/demo-barber/barber-hero.png')
  console.log('  - public/demo-barber/barber-logo.png')
  console.log('  - public/demo-electrician/electrician-hero.png')
  console.log('  - public/demo-electrician/electrician-logo.png')
}

// Run the script
generateDemoImages().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
