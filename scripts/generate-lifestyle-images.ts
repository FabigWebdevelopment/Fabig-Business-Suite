#!/usr/bin/env tsx
/**
 * Generate smart home LIFESTYLE images for electrician demo
 *
 * These images show the USER EXPERIENCE of smart homes:
 * - People interacting with tablets/controls
 * - Automated scenes in action (lights dimming, blinds lowering)
 * - The "wow" moment of smart home automation
 *
 * Run with: npx tsx scripts/generate-lifestyle-images.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// Lifestyle image configurations - showing the EXPERIENCE
const lifestyleImages = [
  {
    id: 'tablet-control',
    filename: 'smart-home-tablet-control.jpg',
    description: 'Person controlling smart home via tablet',
    prompt: `Lifestyle photograph: Person using tablet to control smart home.

SCENE COMPOSITION:
- Modern German living room, evening ambiance
- Person (30-40 years old, casual elegant) sitting on designer sofa
- Holding iPad/tablet at comfortable viewing angle
- Screen shows smart home interface with room controls

TABLET SCREEN VISIBLE (important detail):
- Clean smart home app interface
- Room overview with icons for:
  * Lighting (dimmer slider at 40%)
  * Blinds/Jalousien (half-closed icon)
  * Temperature (21°C display)
  * Music (now playing indicator)
- German labels: "Wohnzimmer", "Licht", "Jalousien"
- Warm orange/amber accent color in UI

SMART HOME IN ACTION (background):
- Living room lights dimmed to warm 2700K glow
- Motorized blinds/Raffstores at 45° angle
- Indirect LED strip lighting under TV console (soft glow)
- One pendant light dimmed low over dining area

INTERIOR DESIGN:
- Modern minimalist German style
- Neutral colors: warm grey sofa, oak flooring
- Designer furniture (clean lines)
- Large windows with motorized blinds visible
- Indoor plant adding warmth
- Evening city lights visible through blinds

LIGHTING & MOOD:
- Golden hour / early evening atmosphere
- Multiple light sources at different levels (demonstrating zones)
- Warm, cozy, inviting ambiance
- Screen glow reflecting slightly on person's face

PHOTOGRAPHY STYLE:
- Canon EOS R5, 35mm f/1.8 lens at f/2.8
- Shallow depth of field (person & tablet sharp, room softly blurred)
- Warm color grading
- Lifestyle/interior magazine quality
- Natural, candid moment feel

CRITICAL REQUIREMENTS:
- Tablet screen must be clearly visible with smart home UI
- Room must show ACTIVE automation (lights dimmed, blinds angled)
- Premium, aspirational lifestyle feel
- NO stock photo feel, NO staged/fake expressions

Target emotion: "So einfach steuere ich mein Zuhause"
(This is how easily I control my home)`,
  },
  {
    id: 'morning-automation',
    filename: 'smart-home-morning-scene.jpg',
    description: 'Smart home morning automation scene',
    prompt: `Lifestyle photograph: Smart home morning wake-up automation in action.

SCENE - BEDROOM AWAKENING:
- Modern German master bedroom
- Early morning golden light streaming through windows
- Motorized blinds OPENING automatically (capturing mid-motion blur)
- Person (30s) sitting up in bed, stretching, happy expression

AUTOMATION IN ACTION (key visual elements):
- Blinds/Raffstores at 30° angle, clearly motorized (visible motor housing)
- Bedroom lights gently fading ON (bedside lamps at 20% brightness)
- Digital display on nightstand showing:
  * Time: 6:30
  * "Guten Morgen" message
  * Weather icon: 18°C, sunny
  * "Kaffee wird zubereitet" (Coffee being prepared)

SMART DEVICES VISIBLE:
- Modern wall-mounted light switch panel (Gira/Jung design)
- Small bedside smart display (like Echo Show or Loxone Touch)
- Motorized blind mechanism visible at window top
- Optional: subtle glow from hallway (lights turning on)

INTERIOR DESIGN:
- Clean Scandinavian-German bedroom style
- Neutral bedding (white/light grey)
- Warm oak furniture and flooring
- Large floor-to-ceiling windows
- Minimal clutter, organized space
- Green plant on windowsill

LIGHTING:
- Natural morning sunlight as primary source
- Warm artificial accent lights fading in
- Golden hour quality light
- Soft, optimistic morning atmosphere

PHOTOGRAPHY STYLE:
- Canon EOS R5, 24mm f/2.0 wide angle at f/4.0
- Capture the full room showing automation
- Warm, hopeful color grading
- Editorial lifestyle photography
- Motion blur on opening blinds (suggests automation)

CRITICAL REQUIREMENTS:
- MUST show blinds in motion (opening)
- MUST show smart display with German text
- Natural, not-posed feeling
- Premium bedroom, aspirational lifestyle
- NO messy room, NO dark/moody atmosphere

Target emotion: "Jeden Morgen perfekt aufwachen"
(Wake up perfectly every morning)`,
  },
  {
    id: 'light-scene-change',
    filename: 'smart-home-lighting-scene.jpg',
    description: 'Living room with multiple lighting scenes',
    prompt: `Lifestyle photograph: Smart lighting scene transformation in modern living room.

SCENE - "FILMABEND" (MOVIE NIGHT) LIGHTING:
- Open-plan living/dining room in modern German home
- Evening setting with dramatic lighting demonstration
- Shows the DIFFERENCE smart lighting makes

LIGHTING ZONES (all visible, different levels):
- TV area: Bias lighting behind TV (soft blue/purple glow)
- Ceiling spots: Dimmed to 10% (barely visible warm glow)
- Floor lamp near sofa: OFF
- Kitchen area (background): Pendant lights at 30%
- Indirect cove lighting: Warm amber at 20%
- LED strip under floating shelf: Soft white accent

SMART CONTROL VISIBLE:
- Wall-mounted touch panel showing "Filmabend" scene active
- OR person holding smartphone with lighting app visible
- German interface: "Szene: Filmabend aktiv"

ROOM DESIGN:
- Modern open-plan German living space
- Large TV on wall (65"+)
- L-shaped sectional sofa
- Contemporary furniture (clean lines)
- Polished concrete or large-format tile floor
- Kitchen island visible in background
- Floor-to-ceiling windows with blinds closed

THE "WOW" FACTOR:
- Clear contrast between different lighting zones
- Cinema-like ambiance created by smart lighting
- Premium, magazine-worthy interior
- Demonstrates what's possible with intelligent lighting

PHOTOGRAPHY STYLE:
- Canon EOS R5, 16mm f/2.8 ultra-wide at f/4.0
- HDR-style exposure to show all lighting zones
- Warm color temperature overall
- Interior architecture photography quality
- Wide shot capturing the entire atmosphere

CRITICAL REQUIREMENTS:
- Multiple distinct lighting zones clearly visible
- Smart control panel or phone with UI visible
- Premium interior, not average apartment
- Evening/night setting (windows dark or blinds closed)
- NO single harsh light source, NO flat lighting

Target emotion: "Perfekte Atmosphäre auf Knopfdruck"
(Perfect atmosphere at the touch of a button)`,
  },
  {
    id: 'wall-panel-touch',
    filename: 'smart-home-wall-panel.jpg',
    description: 'Hand touching smart wall panel',
    prompt: `Detail photograph: Hand touching modern smart home wall panel.

MAIN FOCUS - WALL PANEL INTERACTION:
- Elegant hand (well-groomed, neutral) touching glass panel
- Modern smart home wall controller (Gira, Jung, or Loxone design)
- Panel showing active scene selection

WALL PANEL DETAILS:
- Flush-mounted glass touch panel (black or white glass)
- 4-6 touch buttons with subtle icons:
  * Light bulb icon (Licht)
  * Blind/shutter icon (Jalousien)
  * Thermometer icon (Klima)
  * Scene icon (Szenen)
- One button actively pressed (subtle glow/highlight)
- LED indicator showing active state
- Premium German switch design (Gira E2, Jung LS990, or Loxone Touch)

HAND POSITION:
- Index finger touching one button
- Natural, relaxed hand position
- Subtle motion suggestion (just pressed)
- Clean, manicured but natural nails

WALL & SURROUNDINGS:
- Clean white or light grey wall
- Subtle texture (fine plaster or matte paint)
- Soft shadow from panel
- Blurred background showing:
  * Hint of modern living room
  * Warm ambient lighting
  * Premium interior context

LIGHTING:
- Soft, even lighting on panel and hand
- Subtle panel backlight glow
- Warm ambient light in background
- No harsh shadows

PHOTOGRAPHY STYLE:
- Canon EOS R5, 85mm f/1.4 macro-style at f/2.8
- Sharp focus on panel and fingertip
- Creamy bokeh in background
- Product photography meets lifestyle
- Clean, minimalist composition

TECHNICAL ACCURACY:
- Realistic smart switch design (German brands)
- Proper proportions (panel ~10cm wide)
- Visible but subtle touch interface
- Premium materials (glass, metal frame)

CRITICAL REQUIREMENTS:
- Panel must look like real German smart switch
- Hand must be touching (interaction moment)
- Premium, high-end feel
- NO cheap plastic switches, NO outdated designs

Target emotion: "Intelligente Technik, elegantes Design"
(Intelligent technology, elegant design)`,
  },
  {
    id: 'blinds-automation',
    filename: 'smart-home-blinds-auto.jpg',
    description: 'Automated blinds lowering with sunset',
    prompt: `Lifestyle photograph: Smart blinds automatically lowering at sunset.

SCENE - AUTOMATED SUNSET ROUTINE:
- Modern German living room with large windows
- Golden hour sunset visible through windows
- Motorized blinds/Raffstores IN MOTION (mid-lowering position)
- Person relaxing on sofa, looking at the automation approvingly

BLINDS AUTOMATION (key visual):
- Floor-to-ceiling windows (2-3 panels)
- External Raffstores or internal blinds
- Blinds at DIFFERENT positions showing sequential closing:
  * Left blind: 70% closed
  * Middle blind: 50% closed
  * Right blind: 30% closed
- This shows the "wave" effect of automated closing
- Visible motorized mechanism at top

SUNSET LIGHTING:
- Warm golden/orange sunset light streaming in
- Sun low on horizon visible through partially open blinds
- Interior bathed in warm sunset glow
- Dramatic lighting contrast

ROOM CONTEXT:
- Modern living room with contemporary furniture
- Person comfortably seated, perhaps with book or drink
- Expression of satisfaction/contentment
- Coffee table with smart display showing:
  * "Sonnenuntergang-Automatik aktiv"
  * Blind position indicators

INTERIOR DESIGN:
- Premium German home interior
- Large windows as architectural feature
- Neutral furniture colors
- Hardwood flooring
- Clean, uncluttered space
- Indoor plants adding life

PHOTOGRAPHY STYLE:
- Canon EOS R5, 24mm f/2.0 wide angle at f/5.6
- HDR-style to capture sunset AND interior
- Warm, golden color grading
- Architectural interior photography
- Dramatic but natural lighting

CRITICAL REQUIREMENTS:
- Blinds MUST show motion/different positions
- Sunset MUST be visible creating atmosphere
- Person looking satisfied (not surprised)
- Premium interior, not basic apartment
- NO static blinds (must suggest automation)

Target emotion: "Mein Zuhause denkt mit"
(My home thinks with me)`,
  },
  {
    id: 'voice-control',
    filename: 'smart-home-voice-control.jpg',
    description: 'Person using voice control for smart home',
    prompt: `Lifestyle photograph: Person using voice command to control smart home.

SCENE - VOICE CONTROL MOMENT:
- Modern German kitchen/living area
- Person (30-40, casual elegant) speaking toward smart speaker
- Hands free (perhaps holding coffee cup)
- Lights visibly responding to command

VOICE ASSISTANT DEVICE:
- Premium smart speaker on kitchen counter
- (Amazon Echo, Google Home, or Sonos style)
- LED ring or indicator showing "listening" state
- Positioned naturally in kitchen setting

SMART HOME RESPONSE (visible):
- Kitchen pendant lights dimming or changing
- Under-cabinet LED strips adjusting
- Perhaps blinds moving in background
- Clear visual feedback that command is working

PERSON'S POSTURE:
- Natural speaking position (not shouting)
- Relaxed, confident body language
- Perhaps slight smile
- One hand holding coffee mug
- Standing at kitchen island

KITCHEN/LIVING DESIGN:
- Modern German kitchen (handleless, sleek)
- Kitchen island as focal point
- Open-plan to living area visible
- High-end appliances integrated
- Warm oak accents, white/grey tones
- Morning or evening light

LIGHTING DEMONSTRATION:
- Show lights AT DIFFERENT LEVELS
- Kitchen work lights at 80%
- Living room ambient at 30%
- Clear demonstration of zone control

PHOTOGRAPHY STYLE:
- Canon EOS R5, 35mm f/2.0 at f/2.8
- Person in focus, room softly defined
- Natural lifestyle moment
- Warm, inviting color palette
- Editorial quality

CRITICAL REQUIREMENTS:
- Smart speaker clearly visible and "active"
- Lights showing response to command
- Natural, not-staged interaction
- Premium kitchen environment
- NO visible screens/phones (voice-only interaction)

Target emotion: "Hey Google, Licht an - So einfach."
(Hey Google, lights on - That simple.)`,
  },
]

async function generateLifestyleImages() {
  console.log('🏠 Generating smart home LIFESTYLE images...')
  console.log('━'.repeat(60))
  console.log('')
  console.log('These images show the USER EXPERIENCE of smart homes:')
  console.log('- People interacting with controls')
  console.log('- Automation in action')
  console.log('- The "wow" moments')
  console.log('')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    process.exit(1)
  }

  console.log('📋 Images to generate:')
  lifestyleImages.forEach((img, i) => {
    console.log(`   ${i + 1}. ${img.id}: ${img.description}`)
  })
  console.log('')

  let successCount = 0
  let failCount = 0
  const results: { id: string; status: 'success' | 'failed'; path?: string; error?: string }[] = []

  for (const image of lifestyleImages) {
    const index = lifestyleImages.indexOf(image) + 1
    console.log(`\n${'─'.repeat(60)}`)
    console.log(`[${index}/${lifestyleImages.length}] 🖼️  ${image.id.toUpperCase()}`)
    console.log(`    ${image.description}`)
    console.log('─'.repeat(60))

    try {
      console.log('  ⏳ Generating image with Gemini AI...')

      const generatedImage = await generateImage({
        prompt: image.prompt,
        aspectRatio: '16:9',
        imageSize: '2K',
        includeText: false,
        temperature: 0.5, // Slightly higher for more creative lifestyle shots
      })

      const savedPath = await saveImageToPublic(
        generatedImage.data,
        image.filename,
        'demo-electrician'
      )

      console.log(`  ✅ Success! Saved to: ${savedPath}`)
      successCount++
      results.push({ id: image.id, status: 'success', path: savedPath })

      // Wait between images to avoid rate limits
      if (index < lifestyleImages.length) {
        console.log('  ⏳ Waiting 5 seconds before next image...')
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`  ❌ Failed: ${errorMessage}`)
      failCount++
      results.push({ id: image.id, status: 'failed', error: errorMessage })

      // Wait before continuing
      if (index < lifestyleImages.length) {
        console.log('  ⏳ Waiting 10 seconds before continuing...')
        await new Promise(resolve => setTimeout(resolve, 10000))
      }
    }
  }

  // Summary
  console.log('\n\n' + '═'.repeat(60))
  console.log('📊 GENERATION SUMMARY')
  console.log('═'.repeat(60))
  console.log(`✅ Successful: ${successCount}/${lifestyleImages.length}`)
  console.log(`❌ Failed: ${failCount}/${lifestyleImages.length}`)

  if (successCount > 0) {
    console.log('\n📁 Generated files:')
    results.filter(r => r.status === 'success').forEach(r => {
      console.log(`   ✓ ${r.path}`)
    })
  }

  if (failCount > 0) {
    console.log('\n⚠️  Failed images:')
    results.filter(r => r.status === 'failed').forEach(r => {
      console.log(`   ✗ ${r.id}: ${r.error}`)
    })
  }

  console.log('\n💡 Usage suggestions:')
  console.log('   - tablet-control.jpg → Smart Home overview pages')
  console.log('   - morning-automation.jpg → Automation benefits section')
  console.log('   - lighting-scene.jpg → Beleuchtungssteuerung page')
  console.log('   - wall-panel.jpg → KNX/Loxone pages (control interface)')
  console.log('   - blinds-auto.jpg → Jalousiensteuerung section')
  console.log('   - voice-control.jpg → Modern convenience section')

  console.log('\n🎉 Done!\n')
}

// Run the script
generateLifestyleImages().catch(error => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
