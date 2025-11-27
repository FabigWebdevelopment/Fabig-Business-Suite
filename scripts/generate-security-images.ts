#!/usr/bin/env tsx
/**
 * Generate security-specific images for Sicherheitstechnik page
 *
 * These images are MISSING from our catalog and needed for:
 * - Alarmanlagen (alarm panels)
 * - Videoüberwachung (security cameras)
 * - Zutrittskontrolle (fingerprint locks)
 * - Brandschutz (smoke detectors)
 *
 * Run with: npx tsx scripts/generate-security-images.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const securityImages = [
  {
    id: 'alarm-panel',
    filename: 'security-alarm-panel.jpg',
    description: 'Modern alarm system control panel',
    prompt: `Professional modern home alarm system control panel mounted on white wall in German residential home.

The image shows:
- Sleek white or silver alarm panel with 7-inch touchscreen display
- Screen shows "System Armed" status with green indicator
- Numeric keypad visible below screen
- Small LED status lights (green = armed)
- Clean professional installation with hidden wiring
- Soft ambient lighting from nearby window
- Modern minimalist German interior style

Technical requirements:
- Photorealistic, high quality
- 4:3 aspect ratio
- No people, no faces, no hands
- Focus on the alarm panel as hero subject
- German residential setting (not American style)
- Professional installation quality visible`
  },
  {
    id: 'security-camera',
    filename: 'security-camera-dome.jpg',
    description: 'Security camera mounted on exterior',
    prompt: `Professional security surveillance camera mounted on exterior wall of German residential building.

The image shows:
- Modern white dome-style security camera
- Mounted on beige/white exterior wall
- Daytime, clear weather
- Camera positioned at corner for optimal coverage
- Visible but unobtrusive installation
- Clean cable management (cables hidden or neatly routed)
- Background shows typical German residential architecture

Technical requirements:
- Photorealistic, high quality
- 4:3 aspect ratio
- No people, no faces
- Focus on camera as main subject
- Professional, clean installation
- European/German residential style`
  },
  {
    id: 'fingerprint-lock',
    filename: 'security-fingerprint-lock.jpg',
    description: 'Electronic fingerprint door lock',
    prompt: `Modern electronic door lock with fingerprint scanner installed on white interior door in German home.

The image shows:
- Sleek electronic door lock with integrated fingerprint scanner
- Stainless steel or matte black finish
- Numeric keypad backup below fingerprint sensor
- Blue LED indicator light showing ready state
- Installed on white or light wood interior door
- Clean professional installation
- Modern German interior visible in background

Technical requirements:
- Photorealistic, high quality
- 4:3 aspect ratio
- No people, no hands, no fingers touching the lock
- Focus on the lock mechanism as hero subject
- Premium quality hardware visible
- German/European door style (not American)`
  },
  {
    id: 'smoke-detector',
    filename: 'security-smoke-detector.jpg',
    description: 'Smoke detector on ceiling',
    prompt: `Modern smoke detector mounted on white ceiling in German residential room.

The image shows:
- Circular white smoke detector, modern slim design
- Mounted flush on white ceiling
- Small green LED status indicator
- Clean, minimal design (like Nest Protect style)
- Background shows part of modern German living room
- Subtle ambient lighting
- Professional installation

Technical requirements:
- Photorealistic, high quality
- 4:3 aspect ratio (shot looking up at ceiling)
- No people, no faces
- Focus on smoke detector as main subject
- Clean, modern German interior style
- Premium quality device visible`
  }
]

async function generateSecurityImages() {
  console.log('🔐 Generating security equipment images with Gemini AI...')
  console.log('📋 These images are MISSING from IMAGE_CATALOG.md\n')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    console.error('Please add your Gemini API key to .env.local:')
    console.error('GOOGLE_GEMINI_API_KEY=your_key_here')
    process.exit(1)
  }

  let successCount = 0
  let failCount = 0

  for (const image of securityImages) {
    try {
      console.log(`\n${'─'.repeat(60)}`)
      console.log(`🔧 ${image.id.toUpperCase()}: ${image.description}`)
      console.log('─'.repeat(60))

      console.log('  - Generating image...')
      const result = await generateImage({
        prompt: image.prompt,
        aspectRatio: '4:3',
        temperature: 0.3, // Lower for more consistent results
      })

      const savedPath = await saveImageToPublic(
        result.data,
        image.filename,
        'demo-electrician'
      )

      console.log(`  ✅ Success! Saved: ${savedPath}`)
      successCount++

      // Wait between images to avoid rate limits
      if (securityImages.indexOf(image) < securityImages.length - 1) {
        console.log('  ⏳ Waiting 5 seconds before next image...')
        await new Promise((resolve) => setTimeout(resolve, 5000))
      }
    } catch (error) {
      console.error(`  ❌ Failed to generate ${image.id}:`, error)
      failCount++
    }
  }

  console.log(`\n${'═'.repeat(60)}`)
  console.log('📊 GENERATION COMPLETE')
  console.log('═'.repeat(60))
  console.log(`✅ Success: ${successCount}`)
  console.log(`❌ Failed: ${failCount}`)

  if (successCount > 0) {
    console.log('\n📝 NEXT STEPS:')
    console.log('1. Run: npx tsx scripts/optimize-images.ts')
    console.log('2. Update docs/IMAGE_CATALOG.md with new images')
    console.log('3. Update src/app/leistungen/sicherheitstechnik-muenchen/page.tsx')
  }
}

generateSecurityImages().catch(console.error)
