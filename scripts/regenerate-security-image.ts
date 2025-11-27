#!/usr/bin/env tsx
/**
 * Regenerate security service image with cleaner design
 *
 * Run with: npx tsx scripts/regenerate-security-image.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const securityPrompt = `
Professional product photography of modern home security system installation:

COMPOSITION (clean, focused):
- Hero shot of sleek video doorbell mounted on white/grey modern door frame
- Elegant wall-mounted security panel visible inside (soft focus background)
- Clean, minimalist framing - NOT cluttered

PRIMARY FOCUS - Video Doorbell:
- Modern Ring Pro or Nest Hello style doorbell
- Brushed metal or matte black finish
- Blue LED ring glowing softly (active status)
- Perfectly mounted on contemporary door frame
- German home entrance aesthetic

SECONDARY ELEMENTS (soft background):
- Interior security touchscreen panel showing camera grid
- Subtle motion sensor light above door
- Clean modern architecture

ENVIRONMENT:
- Contemporary German home entrance
- White/grey rendered wall or modern wood cladding
- Afternoon natural light
- Premium residential feel
- Minimal distractions - clean background

PHOTOGRAPHY STYLE:
- Product photography meets architectural
- Shot on Sony A7R V, 50mm f/1.4 at f/2.0
- Shallow depth of field - doorbell sharp, background soft
- Natural daylight with subtle fill
- Premium commercial quality
- Magazine cover aesthetic

COLOR PALETTE:
- White/grey architecture
- Black/silver security hardware
- Soft blue LED accents
- Warm natural light tones
- Clean, modern, premium feel

MOOD:
- Modern protection
- Sophisticated security
- Premium technology
- Peace of mind
- German engineering quality

CRITICAL EXCLUSIONS:
- NO people in frame
- NO cluttered backgrounds
- NO visible wiring
- NO cheap plastic equipment
- NO surveillance/military aesthetic
- NO shoes, personal items, or domestic clutter
- NO harsh shadows or unflattering angles
- NO artificial or forced composition

Target: Premium security technology that homeowners aspire to have
`

async function regenerateSecurityImage() {
  console.log('🔒 Regenerating security service image with clean design...\n')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    process.exit(1)
  }

  try {
    console.log('📸 Generating clean security product shot...')

    const image = await generateImage({
      prompt: securityPrompt,
      aspectRatio: '16:9',
      imageSize: '2K',
      includeText: false,
      temperature: 0.3,
    })

    const imagePath = await saveImageToPublic(
      image.data,
      'security-service.jpg',
      'demo-electrician'
    )

    console.log(`\n✅ Success! New security image saved: ${imagePath}`)
    console.log('\n🎉 Security image regeneration complete!')

  } catch (error) {
    console.error('❌ Failed to generate security image:', error)
    process.exit(1)
  }
}

regenerateSecurityImage()
