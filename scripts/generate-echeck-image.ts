#!/usr/bin/env tsx
/**
 * Generate E-Check / Sicherheitsprüfung image
 *
 * Shows electrical inspection equipment without people
 *
 * Run with: npx tsx scripts/generate-echeck-image.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const echeckImage = {
  id: 'echeck-inspection',
  filename: 'echeck-inspection.jpg',
  description: 'E-Check electrical safety inspection',
  prompt: `Professional electrical safety inspection scene in German residential home.

The image shows:
- Modern digital multimeter/measuring device displaying readings
- Open electrical distribution panel (Sicherungskasten) in background
- Professional testing equipment on clean work surface
- E-Check inspection clipboard or tablet with checklist visible
- Green "passed" indicator or checkmark symbol
- Clean, organized work area
- Soft natural lighting from window
- Modern German home interior setting

Technical requirements:
- Photorealistic, high quality
- 4:3 aspect ratio
- NO people, NO faces, NO hands visible
- Focus on the inspection equipment and panel as main subjects
- Professional, trustworthy atmosphere
- German residential electrical panel style (DIN rail, labeled circuits)
- Conveys safety and thoroughness`
}

async function generateECheckImage() {
  console.log('🔌 Generating E-Check inspection image with Gemini AI...')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    process.exit(1)
  }

  try {
    console.log(`\n${'─'.repeat(60)}`)
    console.log(`🔧 ${echeckImage.id.toUpperCase()}: ${echeckImage.description}`)
    console.log('─'.repeat(60))

    console.log('  - Generating image...')
    const result = await generateImage({
      prompt: echeckImage.prompt,
      aspectRatio: '4:3',
      temperature: 0.3,
    })

    const savedPath = await saveImageToPublic(
      result.data,
      echeckImage.filename,
      'demo-electrician'
    )

    console.log(`  ✅ Success! Saved: ${savedPath}`)

    console.log(`\n${'═'.repeat(60)}`)
    console.log('📊 GENERATION COMPLETE')
    console.log('═'.repeat(60))
    console.log('\n📝 NEXT STEPS:')
    console.log('1. Run: npx tsx scripts/optimize-images.ts')
    console.log('2. Update docs/IMAGE_CATALOG.md with new image')
    console.log('3. Update elektroinstallation-muenchen page to use new image')

  } catch (error) {
    console.error(`  ❌ Failed to generate image:`, error)
    process.exit(1)
  }
}

generateECheckImage().catch(console.error)
