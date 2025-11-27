#!/usr/bin/env tsx
/**
 * Generate service page images for electrician demo
 *
 * Uses ultra-detailed prompts optimized for German local business context.
 * Images focus on technical equipment and environments.
 *
 * Run with: npx tsx scripts/generate-service-page-images.ts
 */

import {
  generateImage,
  saveImageToPublic,
  loadReferenceImage,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

// Service page image configurations
const serviceImages = [
  {
    id: 'knx-installation',
    filename: 'knx-service.jpg',
    description: 'KNX smart home installation and programming',
    prompt: `Close-up technical shot of professional KNX smart home installation.

MAIN FOCUS - KNX Control Cabinet:
- Modern electrical cabinet with doors open
- KNX bus components on DIN-rail:
  * Gira or ABB KNX actuators (switching, dimming, blinds)
  * KNX power supply (red LED indicator lit)
  * KNX IP interface/router
  * Logic modules
- Green KNX bus cable (2-wire twisted pair) neatly routed
- Professional cable management with routing channels
- Each component labeled with printed labels

TECHNICAL DETAILS (German VDE Standard):
- Color-coded power wiring visible:
  * Brown = Phase/Live (L)
  * Blue = Neutral (N)
  * Green-Yellow = Protective Earth (PE)
- KNX bus topology diagram posted inside cabinet door
- VDE certification stickers on equipment
- Professional ferrules on all wire ends

LAPTOP/TABLET VISIBLE:
- ETS6 software interface on screen (KNX programming tool)
- Building topology tree visible
- German interface language
- Connected via USB to KNX interface

WORK ENVIRONMENT:
- Clean modern utility room
- Good LED task lighting
- Professional Wera and Knipex tools nearby
- Organized workspace, no clutter

PHOTOGRAPHY SPECIFICATIONS:
- Canon EOS R5, 50mm f/2.8 macro lens
- Sharp detail on components
- Professional technical documentation style
- Clean, well-lit exposure
- Slight shallow depth of field

CRITICAL EXCLUSIONS:
NO messy wiring, NO wrong wire colors, NO generic components,
NO old software versions, NO cluttered workspace, NO poor lighting,
NO unsafe installation practices

Target emotion: "KNX vom Profi - sauber installiert und programmiert"
(KNX by a professional - cleanly installed and programmed)`,
  },
  {
    id: 'loxone-miniserver',
    filename: 'loxone-service.jpg',
    description: 'Loxone Miniserver smart home installation',
    prompt: `Professional Loxone smart home installation showcase.

MAIN FOCUS - Loxone Miniserver Setup:
- Loxone Miniserver Gen. 2 mounted on DIN-rail (grey housing, green status LEDs lit)
- Loxone Extensions below:
  * Extension (digital I/O)
  * Dimmer Extension
  * Relay Extension
- Loxone Tree modules connected
- Green Loxone Tree cable (4-wire) neatly routed
- Loxone Air base station visible

ELECTRICAL CABINET:
- Modern grey/white electrical cabinet
- Professional DIN-rail layout
- Color-coded wiring (German VDE standard)
- Printed component labels
- Cable management channels
- Proper ventilation spacing

TABLET/DISPLAY VISIBLE:
- Loxone Config software on laptop screen
- OR Loxone App on tablet showing:
  * Room overview with German labels
  * Temperature: 21°C
  * Lighting controls
  * "Automatik aktiv" status

ENVIRONMENT:
- New-build utility room or technical space
- Clean white/grey finishes
- Good LED working light
- Professional installation site

PHOTOGRAPHY SPECIFICATIONS:
- Canon EOS R5, 50mm f/2.8 lens at f/4.0
- Sharp detail on Miniserver and extensions
- Technical product photography lighting
- Clean, professional documentation style

LOXONE BRANDING:
- Loxone logo visible on Miniserver
- Green Loxone corporate color visible
- "Loxone Partner" certification implied

CRITICAL EXCLUSIONS:
NO messy wiring, NO generic smart home box, NO cramped cabinet,
NO missing labels, NO old Miniserver generation, NO dust/dirt

Target emotion: "Loxone Installation vom zertifizierten Partner"
(Loxone installation by a certified partner)`,
  },
  {
    id: 'lighting-control',
    filename: 'lighting-service.jpg',
    description: 'Intelligent lighting control system',
    prompt: `Modern intelligent lighting installation in premium German living room.

MAIN SCENE - Lighting Showcase:
- Modern living room with multiple lighting zones active
- Evening ambiance demonstrating intelligent lighting design
- Various lighting types working in harmony

LIGHTING ELEMENTS (all active, different levels):
- Recessed LED downlights in ceiling (dimmed to 40%)
- Indirect cove lighting (warm 2700K glow)
- Pendant lights over dining area (60% brightness)
- LED strip lighting under floating shelves (warm white accent)
- Floor lamp in reading corner (accent lighting)
- Window with smart blinds partially closed

SMART CONTROL VISIBLE:
- Modern wall-mounted light switch panel (Gira or Jung design)
- Small touchscreen showing lighting scenes:
  * "Abendessen" - Dinner scene
  * "Film" - Movie scene
  * "Entspannen" - Relax scene
  * "Party" - Party scene
- Brightness percentage sliders
- German interface labels

INTERIOR DESIGN:
- Modern minimalist German living room
- Neutral palette (greys, whites, warm wood tones)
- Contemporary furniture (clean lines)
- Large windows (blinds at 45° angle)
- Indoor plants adding warmth
- Hardwood or large-format tile flooring

ATMOSPHERE:
- Warm, inviting evening ambiance
- Multiple color temperatures visible (warm accent + neutral task)
- Dramatic but comfortable lighting balance
- Interior design magazine quality

PHOTOGRAPHY SPECIFICATIONS:
- Canon EOS R5, 24mm f/1.8 wide angle lens at f/2.8
- Mixed lighting exposure showcasing all zones
- Warm color temperature overall (2700-3000K feel)
- Interior architecture photography style
- No harsh shadows or blown highlights

CRITICAL EXCLUSIONS:
NO harsh overhead lighting only, NO single light source,
NO dark corners, NO cheap fixtures, NO clinical/cold feel,
NO visible wiring, NO dated interior design, NO clutter

Target emotion: "Perfekte Lichtstimmung auf Knopfdruck"
(Perfect lighting mood at the touch of a button)`,
  },
  {
    id: 'team-van',
    filename: 'team-service.jpg',
    description: 'Professional electrician team with company van',
    prompt: `Professional electrician company van with equipment - German Meisterbetrieb.

MAIN FOCUS - Company Vehicle:
- Modern white Mercedes Sprinter or VW Transporter
- Clean, well-maintained vehicle
- Professional vehicle wrap/branding:
  * Company name "Müller Elektrotechnik" in professional typography
  * Tagline: "Smart Home | Elektroinstallation | 24/7 Notdienst"
  * Phone number prominently displayed
  * VDE and Meisterbetrieb badges
  * Red/orange accent color in branding

VEHICLE DETAILS:
- Rear doors open showing organized interior:
  * Professional tool storage system
  * Labeled compartments
  * Cable reels organized
  * Test equipment secured
- Roof rack with ladder (properly secured)
- Clean wheels and body
- Company logo on doors

WORK EQUIPMENT VISIBLE:
- Professional tool cases (Sortimo or similar system)
- Knipex and Wera branded tool bags
- Fluke testing equipment case
- Cable drums organized
- Safety equipment (hard hats, vests)
- iPad/tablet for digital work orders

ENVIRONMENT:
- Parked in front of modern German home
- Morning golden hour light
- Blue sky with some clouds
- Clean residential street
- Professional, trustworthy setting

PHOTOGRAPHY SPECIFICATIONS:
- Canon EOS R5, 35mm f/2.0 lens at f/5.6
- Vehicle and equipment sharp
- House as context background
- Bright, professional daylight
- Corporate fleet photography style

BRANDING ELEMENTS:
- Red/orange company colors visible
- Professional typography
- VDE certification badge
- "Meisterbetrieb" designation
- Munich area indication

CRITICAL EXCLUSIONS:
NO dirty/damaged vehicle, NO disorganized tools, NO cheap signage,
NO dark/poor lighting, NO industrial background, NO visible safety issues,
NO old/dated vehicle model, NO generic white van look

Target emotion: "Das ist ein professioneller Meisterbetrieb"
(This is a professional master craftsman business)`,
  },
  {
    id: 'photovoltaik',
    filename: 'photovoltaik-service.jpg',
    description: 'Rooftop solar panel installation',
    prompt: `Professional rooftop solar installation on German residential home.

MAIN FOCUS - Solar Array:
- Modern black monocrystalline solar panels
- Perfectly aligned rows (German precision)
- Professional mounting system on roof tiles
- Optimizers or micro-inverters visible at panel edges
- Clean cable routing in weatherproof conduit

INSTALLATION QUALITY:
- Panels perfectly level and evenly spaced
- Professional flashing around mounts (no leak risk)
- Cable management clips and channels
- Proper grounding visible
- Safety anchor points on roof

ROOF ENVIRONMENT:
- German residential roof (clay or concrete tiles, dark grey)
- Well-maintained roof structure
- Clean installation area
- Blue sky with some white clouds
- Bright daylight conditions

ELECTRICAL COMPONENTS:
- String inverter or hybrid inverter on exterior wall (lower portion of image)
- DC disconnect switch
- Monitoring display showing:
  * "4.2 kW aktuell" (current production)
  * "18.5 kWh heute" (today's yield)
  * Performance graph
- Professional cable entry into building

HOME CONTEXT:
- Modern German single-family home visible
- Contemporary architecture
- Well-maintained property
- Garden/landscaping partially visible
- Premium residential neighborhood feel

PHOTOGRAPHY SPECIFICATIONS:
- Canon EOS R5, 24mm f/2.8 wide angle lens at f/8.0
- Entire array sharp and detailed
- Sky properly exposed (not blown out)
- Architectural photography style
- Professional documentation quality

CRITICAL EXCLUSIONS:
NO crooked panels, NO visible gaps, NO poor mounting,
NO messy cabling, NO old/dirty modules, NO damaged roof,
NO unsafe access visible, NO construction debris

Target emotion: "Professionelle Solaranlage vom Meisterbetrieb"
(Professional solar system from master craftsman)`,
  },
]

async function generateServicePageImages() {
  console.log('🔧 Generating service page images for electrician demo...')
  console.log('━'.repeat(60))
  console.log('')

  // Check API key
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    console.error('Please add your Gemini API key to .env.local:')
    console.error('GOOGLE_GEMINI_API_KEY=your_key_here')
    process.exit(1)
  }

  console.log('📋 Images to generate:')
  serviceImages.forEach((img, i) => {
    console.log(`   ${i + 1}. ${img.id}: ${img.description}`)
  })
  console.log('')

  let successCount = 0
  let failCount = 0
  const results: { id: string; status: 'success' | 'failed'; path?: string; error?: string }[] = []

  for (const image of serviceImages) {
    const index = serviceImages.indexOf(image) + 1
    console.log(`\n${'─'.repeat(60)}`)
    console.log(`[${index}/${serviceImages.length}] 🖼️  ${image.id.toUpperCase()}`)
    console.log(`    ${image.description}`)
    console.log('─'.repeat(60))

    try {
      console.log('  ⏳ Generating image with Gemini AI...')

      const generatedImage = await generateImage({
        prompt: image.prompt,
        aspectRatio: '16:9',
        imageSize: '2K',
        includeText: false,
        temperature: 0.4,
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
      if (index < serviceImages.length) {
        console.log('  ⏳ Waiting 5 seconds before next image...')
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      console.error(`  ❌ Failed: ${errorMessage}`)
      failCount++
      results.push({ id: image.id, status: 'failed', error: errorMessage })

      // Wait before retrying or continuing
      if (index < serviceImages.length) {
        console.log('  ⏳ Waiting 10 seconds before continuing...')
        await new Promise(resolve => setTimeout(resolve, 10000))
      }
    }
  }

  // Summary
  console.log('\n\n' + '═'.repeat(60))
  console.log('📊 GENERATION SUMMARY')
  console.log('═'.repeat(60))
  console.log(`✅ Successful: ${successCount}/${serviceImages.length}`)
  console.log(`❌ Failed: ${failCount}/${serviceImages.length}`)

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

  console.log('\n💡 Next steps:')
  console.log('   1. Review generated images in public/demo-electrician/')
  console.log('   2. Re-run script if any failed')
  console.log('   3. Update service pages to use new images')

  console.log('\n🎉 Done!\n')
}

// Run the script
generateServicePageImages().catch(error => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
