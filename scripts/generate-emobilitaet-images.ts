#!/usr/bin/env tsx
/**
 * Generate all images for E-Mobilität/Wallbox landing page
 *
 * Visual-first approach: Each section needs compelling imagery
 * to guide users through the page without heavy reading.
 *
 * Run with: npx tsx scripts/generate-emobilitaet-images.ts
 */

import {
  generateImage,
  saveImageToPublic,
} from '../src/lib/gemini/image-generation'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env.local') })

interface ImageConfig {
  id: string
  filename: string
  prompt: string
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4'
}

const emobilitaetImages: ImageConfig[] = [
  // Hero Image (already generated, but including for completeness)
  {
    id: 'hero',
    filename: 'ev-charging-service.jpg',
    aspectRatio: '4:3',
    prompt: `Premium home EV charging station (Wallbox) professional installation:

MAIN FOCUS - Modern Wallbox Installation:
- Sleek white Heidelberg or ABB wallbox mounted on garage wall
- Status LED glowing green, displaying "Laden: 7.2 kW"
- Charging cable elegantly connected to premium electric vehicle
- Professional cable routing in white conduit along wall
- Small "Installiert von Müller Elektrotechnik" label visible

ELECTRIC VEHICLE (partial view):
- Modern premium EV (Tesla Model 3, VW ID.4, BMW iX style)
- Charging port open with cable connected
- Clean, aspirational vehicle in white or dark grey
- Positioned in residential carport/garage

ENVIRONMENT - German residential premium:
- Modern carport with clean concrete floor
- Contemporary home architecture visible in background
- Evening golden hour lighting creating warm atmosphere
- Well-maintained property with landscaping hints

PHOTOGRAPHY STYLE:
- Shot on Sony A7R V, 35mm f/1.8 at f/2.8
- Warm golden hour lighting from side
- Editorial product photography style
- Sharp focus on wallbox and charging connection
- Premium lifestyle magazine quality

MOOD: Future of mobility, sustainable living, premium home upgrade

CRITICAL: NO people, NO faces, focus on product and environment`
  },

  // Benefit 1: Speed comparison visual
  {
    id: 'benefit-speed',
    filename: 'wallbox-speed-comparison.jpg',
    aspectRatio: '1:1',
    prompt: `Clean infographic-style visualization comparing EV charging speeds:

VISUAL CONCEPT:
- Split image showing contrast between slow and fast charging
- Left side: Standard household outlet (Schuko) with thin trickle of energy
- Right side: Wallbox with powerful energy flow indicator
- Clock/time icons showing "12h" vs "2h" comparison
- Battery fill indicators: left barely filling, right rapidly filling

DESIGN STYLE:
- Modern flat illustration with subtle 3D depth
- Clean white background with soft shadows
- Primary color (warm orange) for highlights
- Minimalist iconography style
- German text labels: "Haushaltssteckdose" and "Wallbox 11kW"

COLOR PALETTE:
- White/light grey background
- Orange accent for wallbox/fast side
- Grey for slow/household side
- Green for battery/energy indicators

PHOTOGRAPHY/ILLUSTRATION:
- Product photography meets infographic
- Studio lighting, clean shadows
- Professional marketing material quality

CRITICAL: NO text heavy, purely visual comparison, NO people`
  },

  // Benefit 2: Cost savings visual
  {
    id: 'benefit-savings',
    filename: 'wallbox-cost-savings.jpg',
    aspectRatio: '1:1',
    prompt: `Clean visualization showing cost comparison home vs public charging:

VISUAL CONCEPT:
- Two charging scenarios side by side
- Left: Public charging station with euro coins/expensive indicator
- Right: Home wallbox with piggy bank/savings indicator
- Visual price tags: "0.59€/kWh" vs "0.30€/kWh"
- Home setting feels warm and comfortable

DESIGN STYLE:
- Modern product photography with infographic overlay
- Soft lighting, premium feel
- Euro symbols and coins as visual elements
- Green savings indicators on home side
- Red/orange expense indicators on public side

ENVIRONMENT:
- Split scene: cold public parking vs warm home garage
- Home side has soft warm lighting
- Public side has harsh fluorescent feel

PHOTOGRAPHY STYLE:
- Commercial advertising quality
- Clean studio product shot aesthetic
- Soft shadows and highlights

CRITICAL: Purely visual cost comparison, minimal text, NO people`
  },

  // Benefit 3: Overnight charging comfort
  {
    id: 'benefit-overnight',
    filename: 'wallbox-overnight-charging.jpg',
    aspectRatio: '1:1',
    prompt: `Cozy evening scene of EV charging at home overnight:

VISUAL CONCEPT:
- Modern German home at dusk/night
- EV connected to wallbox in carport
- Warm light from house windows
- Moon and stars visible
- Battery indicator showing gradual fill through night
- Morning sun rising on horizon (implied passage of time)

SCENE ELEMENTS:
- Contemporary German single-family home
- Clean carport with modern wallbox
- Premium EV (Tesla/VW ID style) plugged in
- Soft garden lighting
- Cozy domestic atmosphere

LIGHTING:
- Blue hour/dusk lighting
- Warm yellow light from house windows
- Soft glow from wallbox LED
- Stars visible in sky
- Dreamy, peaceful mood

PHOTOGRAPHY STYLE:
- Editorial lifestyle photography
- Shot on medium format, soft depth of field
- Color grading: warm home vs cool night sky
- Magazine quality architecture photography

MOOD: Convenience, peace of mind, "wake up to full battery"

CRITICAL: NO people visible, focus on home and car`
  },

  // Benefit 4: Solar integration
  {
    id: 'benefit-solar',
    filename: 'wallbox-solar-integration.jpg',
    aspectRatio: '1:1',
    prompt: `Modern German home with solar panels and EV charging integration:

VISUAL CONCEPT:
- Contemporary German house with rooftop solar panels
- Visible energy flow: Sun → Panels → Wallbox → Car
- Modern wallbox mounted on house wall
- EV connected and charging with green indicator
- Energy flow visualization (subtle light trails/arrows)

SCENE COMPOSITION:
- Wide angle showing complete system
- Solar panels clearly visible on roof
- Inverter/energy meter on wall (subtle)
- Wallbox with "PV-Laden" display
- Premium EV in driveway

ENVIRONMENT:
- Bright sunny day, blue sky with white clouds
- Well-maintained German property
- Modern architecture (white render, large windows)
- Green garden elements

VISUAL ELEMENTS:
- Sun rays highlighted
- Green energy flow indicators
- "Kostenlos laden" / "0€" subtle indicator
- Eco-friendly atmosphere

PHOTOGRAPHY STYLE:
- Architectural photography meets product shot
- Golden hour sunlight
- Sharp focus throughout
- Premium real estate photography quality

MOOD: Sustainability, independence, free energy

CRITICAL: NO people, focus on system integration`
  },

  // Process Step 1: Consultation
  {
    id: 'process-consultation',
    filename: 'process-step-1-beratung.jpg',
    aspectRatio: '4:3',
    prompt: `Professional electrical consultation scene (no faces visible):

VISUAL CONCEPT:
- Tablet/iPad showing electrical diagram and wallbox options
- Hands pointing at screen (technician explaining)
- Electrical panel visible in background
- Professional clipboard with checklist
- Customer's hands visible taking notes

SCENE ELEMENTS:
- Modern iPad showing wallbox configurator/planner
- Professional electrical assessment checklist
- Garage/utility room setting
- VDE certification badge visible on tablet
- Clean, organized environment

COMPOSITION:
- Over-the-shoulder angle from behind
- Focus on tablet screen and documents
- Hands and arms only, no faces
- Professional but approachable atmosphere

LIGHTING:
- Natural daylight from garage door
- Clean, bright lighting
- Soft shadows

PHOTOGRAPHY STYLE:
- Editorial documentary style
- Shot at f/2.8, medium depth of field
- Focus on consultation materials
- Business photography quality

MOOD: Professional, trustworthy, expertise

CRITICAL: NO faces visible, only hands and materials`
  },

  // Process Step 2: Planning & Approval
  {
    id: 'process-planning',
    filename: 'process-step-2-planung.jpg',
    aspectRatio: '4:3',
    prompt: `Professional electrical planning documents and approval forms:

VISUAL CONCEPT:
- Electrical installation plan/blueprint on desk
- Official German form (Netzanmeldung) partially visible
- Laptop showing CAD/planning software
- Professional tools: ruler, pen, calculator
- Company stamp/letterhead visible

SCENE ELEMENTS:
- Technical drawing of wallbox installation
- German electrical symbols (VDE standard)
- Official paperwork/forms
- Modern laptop with planning software
- Professional desk setup

COMPOSITION:
- Top-down or angled desk shot
- Focus on documents and plans
- Clean, organized workspace
- Professional office environment

DESIGN ELEMENTS:
- Color-coded wiring diagram
- Measurement annotations
- Approval checkmarks/stamps
- Professional stationery

PHOTOGRAPHY STYLE:
- Flat lay or elevated angle
- Studio lighting, soft shadows
- Commercial product photography
- Sharp focus on documents

MOOD: Organization, expertise, official process

CRITICAL: NO people, focus on professional documents`
  },

  // Process Step 3: Installation
  {
    id: 'process-installation',
    filename: 'process-step-3-installation.jpg',
    aspectRatio: '4:3',
    prompt: `Professional wallbox installation in progress (hands only):

VISUAL CONCEPT:
- Gloved hands installing wallbox on wall
- Professional VDE-certified tools visible
- Color-coded wiring (German standard: brown, blue, green-yellow)
- Clean installation in progress
- Spirit level ensuring perfect alignment

SCENE ELEMENTS:
- Wallbox being mounted (half-installed)
- Professional Wera/Knipex tools
- Cable conduit and organized wiring
- Wall mounting bracket
- Dust sheet protecting floor

COMPOSITION:
- Close-up action shot
- Focus on hands and wallbox
- Professional work in progress
- Clean, organized workspace

TECHNICAL DETAILS:
- VDE-compliant color coding visible
- Professional cable management
- Quality German tools (branded)
- Safety equipment visible

PHOTOGRAPHY STYLE:
- Editorial documentary
- Natural garage lighting + fill
- f/2.8, sharp focus on installation point
- Magazine quality craftsmanship shot

MOOD: Craftsmanship, precision, professionalism

CRITICAL: Only hands/arms visible, NO faces`
  },

  // Process Step 4: Handover
  {
    id: 'process-handover',
    filename: 'process-step-4-uebergabe.jpg',
    aspectRatio: '4:3',
    prompt: `Completed wallbox installation handover (product focus):

VISUAL CONCEPT:
- Beautifully installed wallbox on clean wall
- Welcome documentation folder on car hood
- Key/card and charging cable neatly presented
- "Installation Complete" check mark overlay
- First charge in progress (green LED)

SCENE ELEMENTS:
- Pristine wallbox installation
- Welcome packet with instructions
- RFID card or app QR code visible
- EV connected and charging
- Clean, finished project

COMPOSITION:
- Wide shot showing complete installation
- Welcome materials in foreground
- Pride in completed work
- Evening golden hour lighting

DETAILS:
- "Müller Elektrotechnik" branding subtle
- VDE certification sticker on wallbox
- Clean cable management
- Professional finish quality

PHOTOGRAPHY STYLE:
- Commercial product photography
- Golden hour warm lighting
- Sharp throughout
- Premium lifestyle magazine quality

MOOD: Completion, satisfaction, quality

CRITICAL: NO people, focus on finished product and materials`
  },

  // Package comparison visual
  {
    id: 'packages-comparison',
    filename: 'wallbox-packages-visual.jpg',
    aspectRatio: '16:9',
    prompt: `Three wallbox models displayed side by side for comparison:

VISUAL CONCEPT:
- Three different wallbox models on clean background
- Left: Basic Heidelberg wallbox (simple, white)
- Center: Smart wallbox with display/app (highlighted, premium)
- Right: Premium wallbox with solar integration features
- Subtle feature callouts for each

ARRANGEMENT:
- Products on clean white/grey gradient background
- Center product slightly elevated (most popular)
- Soft studio lighting with product shadows
- Clean, minimalist product photography

PRODUCT DETAILS:
- Each wallbox clearly different in features
- LED indicators visible
- Charging cables coiled neatly
- Subtle price tier indicators (€, €€, €€€)

DESIGN STYLE:
- Apple-style product photography
- Clean white background
- Soft shadows and reflections
- Premium e-commerce quality

PHOTOGRAPHY STYLE:
- Studio product photography
- Multiple soft light sources
- High-key lighting
- Sharp focus throughout

MOOD: Choice, quality, premium products

CRITICAL: Products only, NO people, clean background`
  },

  // München location/service area visual
  {
    id: 'service-area-munich',
    filename: 'service-area-muenchen.jpg',
    aspectRatio: '16:9',
    prompt: `Munich cityscape with residential areas at golden hour:

VISUAL CONCEPT:
- Panoramic view of Munich skyline
- Mix of historic and modern architecture
- Residential neighborhoods in foreground
- Frauenkirche towers visible in distance
- Warm golden hour lighting

SCENE ELEMENTS:
- Munich city panorama
- Suburban residential homes (typical German style)
- Green spaces and gardens
- Alps visible on horizon (if weather permits)
- Blue sky with golden clouds

COMPOSITION:
- Wide panoramic shot
- Elevated viewpoint (drone-style)
- City and suburbs balanced
- Warm, inviting atmosphere

LIGHTING:
- Golden hour sunset lighting
- Warm tones on buildings
- Soft shadows
- Dreamy, aspirational mood

PHOTOGRAPHY STYLE:
- Aerial/elevated cityscape
- Professional travel photography
- High dynamic range, rich colors
- Magazine quality landscape

MOOD: Local expertise, community, home

CRITICAL: NO people, focus on city and residential areas`
  }
]

async function generateAllImages() {
  console.log('🚗 Generating E-Mobilität/Wallbox Landing Page Images')
  console.log('=' .repeat(60))
  console.log(`📸 Total images to generate: ${emobilitaetImages.length}`)
  console.log('🎨 Visual-first approach: Each section gets compelling imagery\n')

  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    console.error('❌ Error: GOOGLE_GEMINI_API_KEY not found in .env.local')
    process.exit(1)
  }

  let successCount = 0
  let failCount = 0
  const results: { id: string; path: string; status: 'success' | 'failed' }[] = []

  for (const img of emobilitaetImages) {
    console.log(`\n${'─'.repeat(60)}`)
    console.log(`🖼️  ${img.id.toUpperCase()}`)
    console.log(`   File: ${img.filename}`)
    console.log(`   Aspect: ${img.aspectRatio}`)
    console.log('─'.repeat(60))

    try {
      console.log('   ⏳ Generating image...')

      const image = await generateImage({
        prompt: img.prompt,
        aspectRatio: img.aspectRatio,
        imageSize: '2K',
        temperature: 0.3,
      })

      const imagePath = await saveImageToPublic(
        image.data,
        img.filename,
        'demo-electrician'
      )

      console.log(`   ✅ Success! Saved: ${imagePath}`)
      successCount++
      results.push({ id: img.id, path: imagePath, status: 'success' })

      // Rate limiting - wait between images
      if (emobilitaetImages.indexOf(img) < emobilitaetImages.length - 1) {
        console.log('   ⏳ Waiting 5 seconds before next image...')
        await new Promise(resolve => setTimeout(resolve, 5000))
      }
    } catch (error) {
      console.error(`   ❌ Failed: ${error}`)
      failCount++
      results.push({ id: img.id, path: '', status: 'failed' })

      // Continue with next image
      if (emobilitaetImages.indexOf(img) < emobilitaetImages.length - 1) {
        console.log('   ⏳ Waiting 3 seconds before retry...')
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
  }

  // Summary
  console.log('\n\n' + '='.repeat(60))
  console.log('📊 GENERATION SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Successful: ${successCount}/${emobilitaetImages.length}`)
  console.log(`❌ Failed: ${failCount}/${emobilitaetImages.length}`)

  if (successCount > 0) {
    console.log('\n📁 Generated files:')
    results
      .filter(r => r.status === 'success')
      .forEach(r => console.log(`   ✅ ${r.path}`))
  }

  if (failCount > 0) {
    console.log('\n⚠️  Failed images (retry manually):')
    results
      .filter(r => r.status === 'failed')
      .forEach(r => console.log(`   ❌ ${r.id}`))
  }

  console.log('\n🎉 Image generation complete!')
  console.log('\n💡 Next steps:')
  console.log('   1. Review generated images in public/demo-electrician/')
  console.log('   2. Update E-Mobilität page to use new visuals')
  console.log('   3. Test page load performance with new images')
}

// Run
generateAllImages().catch(error => {
  console.error('\n💥 Fatal error:', error)
  process.exit(1)
})
