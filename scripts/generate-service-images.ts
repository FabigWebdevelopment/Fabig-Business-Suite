#!/usr/bin/env tsx
/**
 * Generate service showcase images only (no human portraits)
 *
 * Gemini excels at technical/equipment images but has restrictions
 * on realistic human faces. This script focuses on what works.
 *
 * Run with: npx tsx scripts/generate-service-images.ts
 */

import {
  generateServiceImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const services = [
  {
    id: 'installation',
    type: 'installation' as const,
    filename: 'installation-service.jpg',
    description: 'Electrical panel and wiring installation',
  },
  {
    id: 'security',
    type: 'security' as const,
    filename: 'security-service.jpg',
    description: 'Security camera and alarm system',
  },
]

async function generateServiceImages() {
  console.log('🔧 Generating service showcase images with Gemini AI...')
  console.log('💡 Focusing on technical/equipment images (Gemini strength)\n')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    console.error('Please add your Gemini API key to .env.local:')
    console.error('GOOGLE_GEMINI_API_KEY=your_key_here')
    process.exit(1)
  }

  console.log('📦 Generating service images for electrician demo\n')
  console.log('Note: Generating WITHOUT human faces (Gemini limitation)')
  console.log('      Images will focus on equipment and installations\n')

  let successCount = 0
  let failCount = 0

  for (const service of services) {
    try {
      console.log(`\n${'─'.repeat(60)}`)
      console.log(`🔧 ${service.id.toUpperCase()}: ${service.description}`)
      console.log('─'.repeat(60))

      // Generate image WITHOUT persona (no human faces)
      console.log('  - Generating service showcase image...')
      const serviceImage = await generateServiceImage(service.type, false)

      const servicePath = await saveImageToPublic(
        serviceImage.data,
        service.filename,
        'demo-electrician'
      )

      console.log(`  ✅ Success! Saved: ${servicePath}`)
      successCount++

      // Wait between images to avoid rate limits
      if (services.indexOf(service) < services.length - 1) {
        console.log('  ⏳ Waiting 3 seconds before next image...')
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
    } catch (error) {
      console.error(`  ❌ Failed to generate ${service.id}:`, error)
      failCount++

      // Continue with other services even if one fails
      console.log('  → Continuing with next service...')

      if (services.indexOf(service) < services.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }
  }

  console.log('\n\n' + '='.repeat(60))
  console.log('📊 Generation Summary')
  console.log('='.repeat(60))
  console.log(`✅ Successful: ${successCount}/${services.length}`)
  console.log(`❌ Failed: ${failCount}/${services.length}`)

  if (successCount > 0) {
    console.log('\n📁 Generated files:')
    console.log('  public/demo-electrician/')
    services.forEach((s) => {
      console.log(`    - ${s.filename}`)
    })
  }

  console.log('\n💡 For CEO portraits:')
  console.log('  → Gemini has limitations on realistic human faces')
  console.log('  → Recommended: Use professional stock photos from:')
  console.log('     • Unsplash (unsplash.com) - Free')
  console.log('     • Pexels (pexels.com) - Free')
  console.log('     • Generated.photos (generated.photos) - AI faces')
  console.log('     • Or DALL-E 3 ($0.04/image) for custom portraits')

  console.log('\n🎉 Service image generation complete!\n')
}

// Run the script
generateServiceImages().catch((error) => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
