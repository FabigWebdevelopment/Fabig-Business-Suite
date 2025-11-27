#!/usr/bin/env tsx
/**
 * Regenerate Benefit Images with Visual DNA System
 *
 * Uses psychology-based prompts with consistent visual tone
 * Run with: npx tsx scripts/regenerate-benefits-v2.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import {
  electricianVisualDNA,
  wallboxBenefitPrompts,
  generateBenefitPrompt,
  buildBasePrompt
} from '../src/lib/prompts/image-system'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const imageConfigs = [
  { id: 'speed', filename: 'benefit-speed.jpg' },
  { id: 'savings', filename: 'benefit-savings.jpg' },
  { id: 'overnight', filename: 'benefit-overnight.jpg' },
  { id: 'solar', filename: 'benefit-solar.jpg' },
]

async function regenerateBenefits() {
  console.log('🎨 Regenerating Benefit Images with Visual DNA System')
  console.log('=' .repeat(60))
  console.log('\n📸 Visual DNA: Warm, calm, aspirational German home')
  console.log('🧠 Psychology: Show OUTCOMES, not products')
  console.log('🎯 Goal: Trigger emotional desire, not logical features\n')

  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    process.exit(1)
  }

  // Show Visual DNA summary
  console.log('🖼️  VISUAL DNA SUMMARY:')
  console.log('   • Lighting: Warm golden hour')
  console.log('   • Environment: Modern German homes')
  console.log('   • Mood: Calm confidence')
  console.log('   • Style: Editorial lifestyle photography')
  console.log('   • Human: Outcomes, not faces\n')

  let successCount = 0

  for (const config of imageConfigs) {
    const benefit = wallboxBenefitPrompts.find(b => b.id === config.id)
    if (!benefit) continue

    console.log(`\n${'─'.repeat(60)}`)
    console.log(`🖼️  ${benefit.title.toUpperCase()}`)
    console.log(`   Pain: ${benefit.painPoint.substring(0, 50)}...`)
    console.log(`   Desire: ${benefit.desire.substring(0, 50)}...`)
    console.log('─'.repeat(60))

    try {
      console.log('   ⏳ Generating with Visual DNA...')

      // Generate the full prompt with visual DNA
      const fullPrompt = generateBenefitPrompt(benefit, electricianVisualDNA, '4:3')

      const image = await generateImage({
        prompt: fullPrompt,
        aspectRatio: '4:3',
        imageSize: '2K',
        temperature: 0.4, // Slightly creative but consistent
      })

      const imagePath = await saveImageToPublic(
        image.data,
        config.filename,
        'demo-electrician'
      )

      console.log(`   ✅ Success! Saved: ${imagePath}`)
      successCount++

      // Rate limiting
      if (imageConfigs.indexOf(config) < imageConfigs.length - 1) {
        console.log('   ⏳ Waiting 5 seconds...')
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    } catch (error) {
      console.error(`   ❌ Failed: ${error}`)
    }
  }

  console.log('\n\n' + '='.repeat(60))
  console.log('📊 GENERATION COMPLETE')
  console.log('='.repeat(60))
  console.log(`✅ Successful: ${successCount}/${imageConfigs.length}`)

  console.log('\n📁 Generated files:')
  imageConfigs.forEach(c => console.log(`   - /demo-electrician/${c.filename}`))

  console.log('\n💡 Next: Update page to use new images')
}

regenerateBenefits().catch(error => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
