/**
 * Gemini Image Generation Utility
 *
 * Uses Google's Gemini image generation models for generating
 * custom hero images and logos for client websites.
 *
 * Note: Using gemini-3-pro-image-preview as it's confirmed working
 * in the free tier. Newer models may require paid plans.
 */

const GEMINI_MODEL = 'gemini-3-pro-image-preview'
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`

function getApiKey(): string {
  const key = process.env.GOOGLE_GEMINI_API_KEY
  if (!key) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not configured')
  }
  return key
}

export interface ImageGenerationOptions {
  prompt: string
  aspectRatio?: '1:1' | '16:9' | '4:3' | '9:16' | '3:4'
  imageSize?: '1K' | '2K' | '4K'
  includeText?: boolean
  temperature?: number // 0.0 (deterministic) to 2.0 (creative). Default: 1.0
  referenceImages?: string[] // URLs or base64 images for context
  colorPalette?: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

export interface GeneratedImage {
  data: string // base64 encoded image
  mimeType: string
  text?: string // optional description from Gemini
}

/**
 * Generate an image using Gemini API with automatic retry on overload
 */
export async function generateImage(
  options: ImageGenerationOptions,
  retryCount = 0,
  maxRetries = 5
): Promise<GeneratedImage> {
  const apiKey = getApiKey() // Get API key at runtime, not module load time

  const {
    prompt,
    aspectRatio = '16:9',
    imageSize = '2K',
    includeText = false,
    temperature = 0.4, // Lower temperature for more consistent, predictable results
    referenceImages,
    colorPalette
  } = options

  // Enhance prompt with color palette if provided
  let enhancedPrompt = prompt
  if (colorPalette) {
    const colorInfo = `\n\nCompany Brand Colors (incorporate naturally through branded elements):
- Primary/Brand Color: ${colorPalette.primary} (professional red-orange)
- Use this color NATURALLY through:
  • Work clothing/overalls with company branding
  • Tool bags, equipment cases with company logo
  • Company vehicle details visible in background
  • Safety gear, hard hats with company colors
  • Company signage or branding on equipment
- Keep technical equipment realistic (panels, wires, devices in their natural colors)
- Natural environment with branded red accents, NOT forced into technical equipment

CRITICAL: Red should appear through COMPANY BRANDING (clothing, tools, vehicles), not through artificial coloring of equipment/LEDs/panels.`
    enhancedPrompt = prompt + colorInfo
  }

  // Build content parts (text + optional reference images)
  const contentParts: any[] = [{ text: enhancedPrompt }]

  if (referenceImages && referenceImages.length > 0) {
    // Add reference images for context
    referenceImages.forEach((imageData) => {
      contentParts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData
        }
      })
    })
  }

  // Request structure matching AI Studio
  const requestBody = {
    contents: [{
      parts: contentParts
    }],
    generationConfig: {
      responseModalities: ['IMAGE'],
      temperature: temperature, // Control creativity vs consistency
    }
  }

  try {
    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()

      // Check if it's a retryable error (503, 500, 429)
      const isRetryable = [503, 500, 429].includes(errorData.error?.code)
      if (isRetryable && retryCount < maxRetries) {
        // Exponential backoff: 5s, 10s, 20s, 40s, 80s
        const waitTime = Math.min(5000 * Math.pow(2, retryCount), 80000)
        const errorType = errorData.error?.code === 500 ? 'Internal error' : 'API overloaded'
        console.log(`  ⏳ ${errorType}. Retrying in ${waitTime/1000}s... (attempt ${retryCount + 1}/${maxRetries})`)

        await new Promise(resolve => setTimeout(resolve, waitTime))
        return generateImage(options, retryCount + 1, maxRetries)
      }

      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    // Extract image and text from response
    const parts = data.candidates[0]?.content?.parts || []
    const imagePart = parts.find((p: any) => p.inlineData)
    const textPart = parts.find((p: any) => p.text)

    if (!imagePart) {
      // Log the full response for debugging
      console.error('  ⚠️  API Response (no image):', JSON.stringify(data, null, 2))

      // Check for content filtering or other issues
      if (data.candidates[0]?.finishReason) {
        console.error(`  ⚠️  Finish reason: ${data.candidates[0].finishReason}`)
      }
      if (data.promptFeedback) {
        console.error(`  ⚠️  Prompt feedback:`, JSON.stringify(data.promptFeedback, null, 2))
      }

      throw new Error('No image generated in response. Check logs above for details.')
    }

    return {
      data: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
      text: textPart?.text,
    }
  } catch (error) {
    console.error('Gemini image generation failed:', error)
    throw error
  }
}

/**
 * Industry-specific ultra-converting hero image prompts
 */
const industryPrompts: Record<string, (businessName: string) => string> = {
  'Barbershop / Friseur': (name: string) => `
Cinematic over-the-shoulder shot of a sharply dressed man (navy blue suit, crisp white shirt) looking at his reflection in a vintage ornate gold-framed mirror. Focus is on his reflection showing a PERFECT fresh fade haircut with styled dark hair, confident subtle smile, strong jawline. Mirror reflection is crystal sharp, foreground slightly soft (shallow depth of field f/1.4).

Environment: Premium barbershop atmosphere visible in the mirror reflection - warm wood paneling, vintage leather barber chair edge, antique brass fixtures, softly glowing Edison bulb lights in background creating warm bokeh. Golden hour twilight lighting streaming from the side, creating warm rim light and subtle lens flare.

Photography style: Anamorphic cinema lens aesthetic (2.39:1 crop feel even in 16:9), shot on ARRI Alexa with Cooke anamorphic lenses, film grain texture, warm color grading with teal shadows and golden highlights. Looks like a frame from a luxury menswear commercial or high-end cologne ad.

Color palette: Rich browns, deep blacks, warm gold/brass accents, subtle teal shadows for contrast. Masculine but refined, premium without being pretentious.

Mood & emotion: Confidence, success, masculine elegance, "I look damn good", personal transformation, premium self-care for men

Focus details: The PRECISION of the fade (sharp lines, perfect graduation), natural hair shine, confident posture, premium environment details

CRITICAL: NO barber visible, NO scissors or combs in shot, NO busy background clutter, NO harsh lighting, NO generic stock photo feel

Target: Make German men aged 25-45 think "Das will ich auch" (I want that)`,

  'Elektroinstallation': (name: string) => `
Professional environmental portrait in front of modern German home:

SCENE:
- Person standing confidently in front of contemporary white German house
- Red polo shirt with company branding
- Tablet in hand showing smart home interface
- Modern home with solar panels visible on roof
- Well-maintained garden, clean driveway
- Golden hour afternoon sunlight

BACKGROUND:
- Contemporary single-family home (Einfamilienhaus)
- White/grey render exterior
- Smart doorbell visible on entrance
- Blurred but recognizable premium home

PHOTOGRAPHY:
- Environmental portrait style
- 85mm lens at f/2.0, shallow depth of field
- Golden hour warm lighting
- 3/4 length framing
- Magazine editorial quality

MOOD:
- Professional, trustworthy, approachable
- Local expert you can trust
- Warm and welcoming

CRITICAL: NO harsh lighting, NO cluttered background, NO formal suit`,
}

/**
 * Generate a hero image for a local business
 */
export async function generateHeroImage(
  businessType: string,
  businessName: string,
  style: 'modern' | 'professional' | 'elegant' | 'minimalist' = 'professional',
  colorPalette?: { primary: string; secondary: string; accent: string; background: string },
  referenceImage?: string // base64 encoded reference photo for personal hero
): Promise<GeneratedImage> {
  // Use industry-specific prompt if available
  const industryPrompt = industryPrompts[businessType]

  if (industryPrompt) {
    const prompt = industryPrompt(businessName)
    return generateImage({
      prompt,
      aspectRatio: '16:9',
      imageSize: '2K',
      includeText: false,
      temperature: 0.3, // Lower for consistency with reference
      colorPalette,
      referenceImages: referenceImage ? [referenceImage] : undefined,
    })
  }

  // Fallback to generic prompt
  const styleDescriptions = {
    modern: 'modern, vibrant colors, dynamic composition',
    professional: 'professional, clean, trustworthy, polished',
    elegant: 'elegant, sophisticated, high-end luxury aesthetic',
    minimalist: 'minimalist, clean lines, lots of negative space',
  }

  const prompt = `Create a ${styleDescriptions[style]} hero image for "${businessName}", a ${businessType} business in Germany.

The image should:
- Be photorealistic and high-quality
- Evoke trust and professionalism
- Show the essence of the ${businessType} industry
- Have a subtle depth-of-field effect
- Use natural lighting
- Be suitable for a premium business website header
- NO TEXT OR LOGOS in the image
- Focus on the craftsmanship and quality of ${businessType} work

Style: ${styleDescriptions[style]}, cinematic photography, 8K quality, professional commercial photography`

  return generateImage({
    prompt,
    aspectRatio: '16:9',
    imageSize: '2K',
    includeText: false,
    temperature: 0.4,
    colorPalette,
  })
}

/**
 * Industry-specific logo prompts optimized for conversion
 */
const logoPrompts: Record<string, (businessName: string) => string> = {
  'Barbershop / Friseur': (name: string) => `
Design a premium logo for "${name}", a high-end German barbershop.

Logo concept: Vintage-meets-modern aesthetic combining classic barbershop heritage with contemporary minimalism. Think: Tom Ford meets traditional German craftsmanship.

Visual elements:
- Central icon: Stylized razor blade or scissors in elegant geometric form (NOT clipart style)
- Or: Abstract "S" monogram with blade-like sharp angles
- Typography: Bold sans-serif for "SCHNITT", refined serif or elegant sans for "& Stil"
- Subtle masculine details: Sharp angles, strong lines, geometric precision
- Optional: Small accent element (dot, line, star) for sophistication

Style reference: Luxury fashion brand logos (Dior Homme, Tom Ford), premium barber brands (Fellow Barber, Blind Barber), German precision design

Color: Black monochrome primary version (must work in pure black). Gold/brass accent version for premium touchpoints.

Layout: Horizontal lockup preferred, symmetrical balance, clean negative space

Technical requirements:
- Vector-style flat design (NO gradients, NO shadows, NO 3D effects)
- Must be recognizable at 32x32px (favicon size)
- Must work on light backgrounds AND dark backgrounds
- Simple enough to emboss on leather or etch on glass
- Timeless design that won't look dated in 10 years

Typography style: Bold + elegant, masculine but refined, NOT aggressive or cliché "barber pole" aesthetic

Mood: Premium men's grooming, traditional craftsmanship meets modern style, Berlin/Munich urban sophistication

CRITICAL: NO barber poles, NO literal hair illustrations, NO cheesy clipart scissors, NO busy details, NO thin lines that won't scale down, NO wordmark only (needs memorable icon)

Reference aesthetic: Aesop skincare, Blind Barber, Fellow Barber, luxury menswear brands`,

  'Elektroinstallation': (name: string) => `
Design a modern professional logo for "${name}", a premium German electrical contractor specializing in smart home technology.

Logo concept: Modern technical precision meets German engineering trust. The logo should communicate: certified expertise, cutting-edge technology, reliable safety.

Visual elements:
- Central icon: Abstract geometric representation of electrical concepts
  Option 1: Stylized lightning bolt in minimalist geometric form (angular, precise)
  Option 2: Circuit pattern forming an "M" monogram (for Müller)
  Option 3: Power button symbol integrated with house outline (smart home angle)
- Typography: Modern technical sans-serif (similar to: DIN, Eurostile, or Univers)
- Optional: Small "VDE" or "Meister" badge integration (if space allows)

Style reference: Siemens, ABB, Schneider Electric (professional technical brands), Tesla minimalism, German engineering brands (Bosch, Miele)

Color: Primary = Deep professional blue (trust, technology) + Electric orange/copper accent (energy, warmth)
        Must work in: Full color, blue monochrome, black monochrome

Layout: Horizontal preferred with icon left + text right, or stacked with icon above text. Clean alignment, breathing space.

Technical requirements:
- Vector-style flat design or subtle single-direction gradient allowed
- Must be clear at 48x48px (mobile icon size)
- Works on white, dark, and photo backgrounds
- Professional enough for VDE certification documents
- Modern enough for smart home marketing materials

Typography style: Technical, precise, modern, trustworthy - NOT decorative, NOT playful

Details that signal quality:
- Sharp precise angles (no wobbly hand-drawn feel)
- Professional color palette (no neon, no cartoon colors)
- Balanced negative space
- German precision in geometry

Mood: Modern German engineering, VDE-certified expertise, smart home innovation, professional trustworthiness, "Qualität und Sicherheit"

CRITICAL: NO generic lightning bolt clipart, NO residential house outline (too basic), NO Edison bulb illustrations (overdone), NO socket/plug imagery (too literal), NO cursive fonts, NO construction/hard-hat imagery

Reference aesthetic: Siemens, Tesla branding, modern German B2B brands, smart home tech companies (Loxone, Gira, Jung)`,
}

/**
 * Generate a logo for a local business
 */
export async function generateLogo(
  businessName: string,
  businessType: string,
  style: 'modern' | 'classic' | 'minimalist' | 'bold' = 'modern'
): Promise<GeneratedImage> {
  // Use industry-specific prompt if available
  const industryPrompt = logoPrompts[businessType]

  if (industryPrompt) {
    const prompt = industryPrompt(businessName)
    return generateImage({
      prompt,
      aspectRatio: '1:1',
      imageSize: '1K',
      includeText: false,
    })
  }

  // Fallback to generic prompt
  const styleDescriptions = {
    modern: 'modern, sleek, contemporary design with clean lines',
    classic: 'classic, timeless, traditional with refined elements',
    minimalist: 'minimalist, simple, geometric, monochromatic',
    bold: 'bold, strong, impactful with confident typography',
  }

  const prompt = `Design a professional logo for "${businessName}", a ${businessType} business in Germany.

Logo requirements:
- ${styleDescriptions[style]}
- Simple and memorable
- Works well at small sizes
- Suitable for both digital and print
- Professional and trustworthy aesthetic
- Incorporates elements that represent ${businessType} industry
- Can be used on light and dark backgrounds
- Vector-style artwork
- NO complex gradients or photo-realistic elements
- Clean, scalable design

Style: ${styleDescriptions[style]}, professional logo design, brand identity`

  return generateImage({
    prompt,
    aspectRatio: '1:1',
    imageSize: '1K',
    includeText: false,
  })
}

/**
 * Generate a feature/service icon
 */
export async function generateFeatureIcon(
  featureName: string,
  description: string
): Promise<GeneratedImage> {
  const prompt = `Create a modern, minimalist icon representing "${featureName}": ${description}

Icon requirements:
- Simple geometric shapes
- Clean lines and clear silhouette
- Works at small sizes (64x64px minimum)
- Flat design or subtle depth
- Professional and modern aesthetic
- Single concept, not overcomplicated
- Suitable for a SaaS/tech product
- No text or labels

Style: modern icon design, flat illustration, clean vector artwork`

  return generateImage({
    prompt,
    aspectRatio: '1:1',
    imageSize: '1K',
    includeText: false,
  })
}

/**
 * Generate CEO portrait for personal branding (Thomas Müller persona)
 */
export async function generateCEOPortrait(
  ceoName: string,
  businessType: string,
  style: 'professional-headshot' | 'at-work' | 'consulting' = 'professional-headshot',
  referenceImage?: string // base64 encoded reference photo
): Promise<GeneratedImage> {
  const stylePrompts = {
    'professional-headshot': `
Professional corporate headshot of Thomas Müller, a 42-year-old German master electrician (Elektrotechnikermeister) and business owner.

Physical appearance:
- Age: Early 40s, mature and experienced but energetic
- Hair: Short, well-groomed dark brown hair with slight grey at temples (signals experience)
- Face: Confident, approachable expression with warm smile showing teeth slightly
- Eyes: Direct eye contact, intelligent and trustworthy gaze
- Build: Athletic but not overly muscular, fit from physical work
- Skin: Slightly tanned from outdoor work, healthy complexion
- Facial hair: Clean-shaven or very short well-maintained stubble

Clothing & styling:
- Dark blue or black business casual shirt (rolled sleeves showing forearms)
- OR: Smart casual polo shirt in company colors (navy/orange)
- VDE certification badge visible on collar or chest pocket
- Clean, professional appearance - not suit-and-tie, but polished craftsman
- Wedding ring visible (signals stability and trustworthiness)
- Simple quality watch (not luxury, but good quality - signals success without arrogance)

Background & lighting:
- Soft grey or white professional backdrop with subtle gradient
- Studio lighting: Key light from 45° creating dimensional modeling
- Rim light separating subject from background
- Soft fill light to reduce harsh shadows
- Professional but warm atmosphere

Photography style:
- Shot on Canon EOS R5, 85mm f/1.4 lens at f/2.0
- Shallow depth of field, background softly blurred
- Sharp focus on eyes
- Natural skin tones, minimal retouching
- Professional corporate portrait style but approachable
- Color grading: Slightly warm tones, professional blues

Body language & pose:
- Slight lean forward showing engagement
- Arms crossed confidently but not defensively (one hand visible)
- OR: Arms relaxed at sides with confident posture
- Shoulders square to camera, slight 3/4 turn of face
- Relaxed but professional posture

Mood & psychology:
- "I'm an expert you can trust" (authority + approachability)
- Confident but not arrogant
- Successful but relatable
- German Meister pride: "Qualität, Erfahrung, Vertrauen"
- The face you want entering your home to work on your electrical system

CRITICAL: NO stock photo smile, NO overly formal suit, NO harsh lighting, NO generic corporate backdrop, NO visible company logos (just VDE badge), NO crossed arms defensive pose, NO extreme close-up

Target emotion: German homeowner thinks "Der wirkt kompetent und sympathisch" (He seems competent and likeable)`,

    'at-work': `
Action shot of Thomas Müller, German master electrician, working on a smart home installation in a premium residential setting.

Physical appearance (consistent):
- 42-year-old man, short dark brown hair with grey at temples
- Athletic build from physical work
- Focused, concentrated expression showing expertise
- Clean-shaven or short stubble

Work clothing & equipment:
- Clean professional work shirt (dark blue with company logo small on chest)
- Modern technical work pants with tool pockets (not baggy carpenter pants)
- Professional work gloves (modern technical fabric, partially removed and hanging from pocket)
- VDE-certified tools in hand: Wera screwdriver, Knipex pliers, Fluke multimeter
- Tool belt or small professional tool bag nearby (KNIPEX visible)
- Safety glasses pushed up on head or hanging from shirt collar

Scene & action:
- Installing or configuring a modern smart home control panel (Loxone or KNX)
- Hands working with precision on color-coded wiring (German standard colors visible)
- Touchscreen panel showing smart home interface in background
- iPad or tablet nearby showing installation software
- Professional cable management clips and organized wiring
- Everything clean and organized (no mess, no chaos)

Environment:
- Modern German home interior: white walls, minimalist design
- Floor-to-ceiling windows with soft natural daylight
- Contemporary furniture blurred in background
- Professional dust sheets protecting floor
- Small toolbox and organized workspace

Photography style:
- Editorial photojournalism style (not posed, but composed)
- Shot on Nikon Z9, 35mm f/1.4 lens at f/2.2
- Captured mid-action: hands working, slight movement blur on hands showing activity
- Natural daylight from window + subtle fill light
- 3/4 profile view showing Thomas's face in concentration and his hands working
- Shallow depth of field: sharp focus on Thomas and installation point, background softly blurred

Lighting & mood:
- Soft natural daylight creating professional atmosphere
- Clean shadows showing dimension
- Warm but professional color grading
- Detail visible in tools and equipment

Body language & expertise signals:
- Confident, precise movements
- Professional grip on tools (proper technique visible)
- Organized workspace around him
- Meister-level attention to detail
- "This is my craft" pride in work

Visual storytelling elements:
- Meister certificate visible but blurred in background (hanging on wall)
- Multiple VDE certification stickers on toolbox
- Color-coded cable labels and professional organization
- Quality branded tools (Wera, Knipex, Fluke)
- Smart home technology (not just basic electrical work)

Mood & psychology:
- German craftsmanship: "Handwerk hat goldenen Boden"
- Meister expertise in action
- Modern technology + traditional quality
- "I trust this person working in my home"
- Precision, safety, professionalism

CRITICAL: NO messy wiring, NO chaotic workspace, NO old technology, NO harsh lighting, NO unsafe practices, NO posed looking at camera, NO generic "contractor" stock photo, NO dirty clothes or hands (clean professional)

Target emotion: "Das ist kein Pfuscher - das ist ein echter Profi" (This is no hack - this is a real professional)`,

    'consulting': `
Thomas Müller, German master electrician, consulting with homeowners about smart home planning in their living room.

Scene composition:
- Thomas sitting at dining table or standing near wall, showing tablet or plans to client
- Couple (man 40s, woman 30s) listening attentively and engaged
- Tablet showing smart home floor plan or energy monitoring app
- Professional brochures or samples on table (switch samples, control panels)
- Modern German living room: minimalist, natural light, contemporary furniture

Thomas's appearance (consistent):
- Business casual: navy polo or button-up shirt (rolled sleeves)
- Professional but approachable
- Engaged in conversation, pointing at tablet or plans
- Confident body language but listening posture

Client interaction:
- Clients leaning in, interested and engaged
- Natural conversation, not overly posed
- Thomas explaining something with hand gestures
- Tablet/iPad as focal point of discussion

Photography style:
- Editorial style: natural, candid but composed
- Shot on Sony A7 IV, 35mm f/1.8 at f/2.5
- Natural daylight from large windows
- Warm, inviting atmosphere
- 3/4 wide shot showing interaction

Mood & psychology:
- Professional consultation
- Trust building moment
- "He takes time to explain everything"
- Personal service, not rushed
- Expert advisor, not pushy salesman

CRITICAL: NO staged stock photo feel, NO overly formal, NO sales pressure body language, NO cluttered background

Target emotion: "Der nimmt sich Zeit für uns" (He takes time for us)`
  }

  // If reference image provided, use simplified prompt (just describe scenario, not appearance)
  // If no reference, use full detailed prompt
  let prompt = stylePrompts[style]

  if (referenceImage) {
    // Simplified prompts that focus on scenario, not physical appearance
    const simplifiedPrompts = {
      'professional-headshot': `
Professional corporate headshot of a German master electrician and business owner.

Styling:
- Dark blue or black business casual shirt
- VDE certification badge visible on collar
- Clean, professional appearance
- Simple quality watch visible

Background & lighting:
- Soft grey professional backdrop
- Studio lighting with key light from 45°
- Professional warm atmosphere

Photography style:
- Shot on Canon EOS R5, 85mm f/1.4 at f/2.0
- Shallow depth of field
- Sharp focus on face
- Professional corporate portrait style

Body language:
- Confident, approachable expression
- Slight lean forward showing engagement
- Professional but warm demeanor

CRITICAL: Professional German craftsman style, NO stock photo look`,

      'at-work': `
Action shot of German master electrician installing smart home control panel.

Work scene:
- Installing Loxone/KNX smart home touchscreen panel
- Modern German home with white walls
- Using professional Wera/Knipex tools
- VDE-compliant color-coded wiring (Brown=L, Blue=N, Green-Yellow=PE)
- Company-branded red work shirt or overalls

Photography:
- Shot on Sony A7R V, 35mm f/1.4 at f/2.2
- Natural window light + subtle fill
- Photojournalism style capturing authentic work moment

Environment:
- Clean modern interior
- Professional cable management
- Quality German equipment and brands

CRITICAL: Authentic work documentation style, NOT staged stock photo`,

      'consulting': `
German master electrician consulting with homeowner clients in modern living room.

Scene setup:
- Discussing smart home installation plans
- Tablet showing Loxone/KNX system interface
- Modern German home interior
- Clients partially visible (blurred, backs/sides)
- Company-branded red work shirt

Body language:
- Explaining technical details with hand gestures
- Engaged, helpful, professional demeanor
- Building trust and rapport

Photography:
- Shot on Nikon Z9, 50mm f/1.8 at f/2.5
- Natural lighting from large windows
- Documentary/editorial style

CRITICAL: Real consultation moment, NOT staged stock photo, NO crossed arms`
    }

    prompt = simplifiedPrompts[style]
  }

  return generateImage({
    prompt,
    aspectRatio: style === 'professional-headshot' ? '4:3' : '16:9',
    imageSize: '2K',
    includeText: false,
    temperature: 0.3, // Lower temperature for better consistency with reference
    referenceImages: referenceImage ? [referenceImage] : undefined,
  })
}

/**
 * Generate service-specific showcase images with personal/authentic touch
 */
export async function generateServiceImage(
  service: 'smart-home' | 'installation' | 'security' | 'solar' | 'ev-charging',
  includePersona: boolean = true,
  referenceImage?: string // base64 encoded reference photo
): Promise<GeneratedImage> {
  const servicePrompts = {
    'smart-home': `
${includePersona ? 'Thomas demonstrating completed smart home installation to delighted homeowner couple' : 'Premium smart home control center showcase in modern German home'}:

${includePersona ? `
MAIN SCENE - Handover moment (authentic interaction):
- Thomas standing at smart home panel, showing features to homeowner couple
- Couple visible from behind/side (backs of heads, partial profiles)
- Woman pointing at screen with interest, man nodding appreciatively
- Thomas explaining with hand gesture toward display
- Genuine interaction, not posed stock photo
- Moment of pride: "Look what we built for you"

THOMAS (with reference photo):
- Company-branded red polo shirt or work shirt
- Professional but relaxed posture (job well done)
- Tablet in hand showing same interface
- Confident, helpful demeanor
- Positioned at panel, facing partially toward clients
` : ''}

SMART HOME CONTROL CENTER (focal point):
- Large wall-mounted touchscreen panel (Loxone or KNX Gira HomeServer)
- Screen displaying: Room temperature 21°C, lighting scenes, energy graph showing 35% savings
- Solar panel status: "3.8 kW aktuell"
- Rooms listed: Wohnzimmer, Küche, Schlafzimmer
- Modern UI with clean German iconography
- Sleek brushed aluminum frame, perfect flush mounting
- Small "Installiert von Müller Elektrotechnik" label below

ENVIRONMENT - Premium German home:
- Modern open-plan living area
- Floor-to-ceiling windows with afternoon daylight
- Contemporary furniture partially visible
- Indoor plants, hardwood flooring
- Clean, organized, aspirational living space

ADDITIONAL SMART ELEMENTS:
- Smart light switches (Gira System 55) on wall
- Smart thermostat nearby
- Sonos speaker on shelf
- Everything coordinated in white/silver

PHOTOGRAPHY:
- Shot on Sony A7R V, 35mm f/1.8 at f/2.8
- Editorial documentary style
- Sharp focus on interaction and panel
- Natural daylight, warm professional atmosphere
- Magazine-quality composition

MOOD & PSYCHOLOGY:
- Trust handover moment: "Your smart home is ready"
- Customer delight and satisfaction
- Professional service completion
- "Worth every euro" feeling
- Personal attention, not just installation

CRITICAL EXCLUSIONS:
- NO clear customer faces (back/side views only)
- NO staged stock photo poses
- NO messy wiring visible
- NO cold/sterile feeling
- NO generic smart home imagery

Target emotion: "So persönlich möchte ich auch beraten werden" (I want this personal service too)`,

    'installation': `
${includePersona ? 'Thomas Müller (Meister) training young apprentice during professional electrical panel installation - authentic team moment' : 'Professional electrical panel installation showing expert-level German craftsmanship'}:

${includePersona ? `
MAIN SCENE - Meister and apprentice working together:
- Thomas (Meister) supervising/guiding younger apprentice at electrical panel
- Apprentice (early 20s) visible from side/back, working on panel
- Thomas pointing at specific connection, teaching moment
- Authentic mentorship scene, traditional German craft training
- Two-person team showing established business, not one-man operation

THOMAS (with reference photo):
- Company-branded red work shirt or overalls (Müller Elektrotechnik)
- Standing slightly behind apprentice, supervisory position
- Holding tablet showing electrical diagram, checking work
- Professional but supportive demeanor
- Meister expertise evident in confident posture

APPRENTICE (no clear face - back/side view):
- Young man, early 20s, seen from behind or side profile
- Matching company work clothing (red overalls)
- Hands working on panel with precision
- Focused on task, learning from Meister
- Proper safety equipment (gloves, tools)
` : ''}

ELECTRICAL PANEL (technical excellence):
- Modern Hager or ABB distribution board, doors open
- Perfectly organized color-coded wiring (German VDE standard):
  * Brown = Phase/Live (L)
  * Black = Phase/Live (L2)
  * Grey = Phase/Live (L3)
  * Blue = Neutral (N)
  * Green-Yellow = Protective Earth (PE)
- Professional cable routing with uniform bends
- Each circuit labeled: "Küche Steckdosen", "Bad Beleuchtung", "Wohnzimmer"
- RCD breakers (FI-Schalter), surge protection visible
- VDE certification stickers on equipment

PROFESSIONAL TOOLS & EQUIPMENT:
- Wera Kraftform VDE screwdrivers (German quality)
- Knipex pliers and cable strippers
- Fluke digital multimeter
- Professional tool bags with KNIPEX logo
- iPad showing installation plans nearby
- Laser level for perfect alignment

ENVIRONMENT:
- Clean renovation site, drywall installed
- Protective dust sheets on floor
- Natural daylight from window
- Organized workspace, no chaos
- Professional, safe working conditions

PHOTOGRAPHY:
- Shot on Canon EOS R5, 35mm f/1.8 at f/2.8
- Editorial documentary style
- Sharp focus on team interaction and panel
- Natural lighting with soft shadows
- Magazine-quality craftsmanship documentation

MOOD & PSYCHOLOGY:
- German Meisterbetrieb tradition: knowledge passed down
- Established business with trained team
- Quality through expertise and mentorship
- "This is how professionals work"
- Trust in systematic training and standards

CRITICAL EXCLUSIONS:
- NO clear apprentice face (back/side only)
- NO messy wires or chaos
- NO unsafe practices
- NO cheap or damaged tools
- NO incorrect wire colors
- NO staged stock photo feel

Target emotion: "Das ist ein richtiger Meisterbetrieb" (This is a real master craftsman business) + Team you can trust`,

    'security': `
${includePersona ? 'Young mother with child at front door, feeling safe with newly installed security system - Thomas visible on doorbell screen' : 'Modern home security system protecting German family home'}:

${includePersona ? `
MAIN SCENE - Family safety moment (emotional, not technical):
- Young mother (30s) at front door, child (4-6 years) holding her hand
- Looking at video doorbell screen showing friendly visitor
- Feeling of safety and control over who enters home
- Warm, protective atmosphere - NOT surveillance paranoia
- Thomas visible on small video doorbell screen (delivery/service visit context)

MOTHER AND CHILD (no clear faces - natural moment):
- Mother seen from behind or side, looking at doorbell screen
- Child partially visible, holding mother's hand
- Relaxed body language - feeling secure
- Afternoon light through door sidelights
- Natural family moment, not staged
` : ''}

SECURITY SYSTEM (subtle integration):
- Smart video doorbell (Ring/Nest style) at entrance
- Small security panel inside showing camera feeds
- Motion sensor light above door
- Discreet outdoor camera under eaves
- Everything integrated, not intimidating

ENVIRONMENT - Welcoming German home entrance:
- Modern front door with sidelight windows
- Clean, well-maintained entrance area
- Afternoon natural light
- Shoes organized, family photos blurred on wall
- Warm, lived-in feeling - real home, not showroom

TECHNOLOGY SHOWN (reassuring, not overwhelming):
- Clear video feed on doorbell screen
- Simple interface: "Besucher" notification
- App integration implied (phone nearby)
- Green "armed" indicator on panel
- German security standards badge (VdS)

PHOTOGRAPHY:
- Shot on Nikon Z9, 35mm f/1.4 at f/2.5
- Warm, intimate lighting
- Focus on family safety feeling
- Documentary lifestyle style
- Magazine-quality but authentic

MOOD & PSYCHOLOGY:
- "Meine Familie ist sicher" (My family is safe)
- Peace of mind, not paranoia
- Technology enabling protection
- Modern parenting confidence
- Worth the investment for family safety

CRITICAL EXCLUSIONS:
- NO clear faces (back/side views only)
- NO surveillance/military aesthetic
- NO intimidating camera arrays
- NO cold/sterile security feel
- NO complicated interfaces
- NO stock photo family poses

Target emotion: "So möchte ich meine Familie auch schützen" (I want to protect my family like this too)`,

    'solar': `
Rooftop solar panel installation with electrical integration, ${includePersona ? 'Thomas Müller on roof coordinating installation' : 'professional solar installation view'}.

Main focus:
- Modern black monocrystalline solar panels (perfectly aligned rows)
- Professional mounting system on German roof tiles
- DC optimizer boxes and cabling
- Main inverter visible on wall below
- Energy monitoring display showing production

${includePersona ? `
Thomas Müller:
- Safety harness and professional roof safety equipment
- Checking connection boxes
- Measuring equipment in hand
- Safety-conscious working posture
- Professional solar installation clothing` : ''}

Details:
- Cable management from roof to inverter
- Professional weatherproofing
- Electrical connection to home system
- Monitoring display: "3.8 kW aktuell, 2,450 kWh heute"

Environment:
- German residential roof (clay tiles)
- Blue sky with some clouds
- Modern home architecture
- Professional safety equipment visible

Mood: Clean energy, German Energiewende, professional installation, return on investment

CRITICAL: NO unsafe roof work, NO poor panel alignment, NO visible damage or gaps`,

    'ev-charging': `
${includePersona ? 'Proud customer receiving keys to newly installed wallbox from Thomas - first charge moment' : 'Premium home EV charging station (Wallbox) professional installation'}:

${includePersona ? `
MAIN SCENE - Customer handover moment:
- Thomas handing over small welcome folder/manual to homeowner
- Homeowner (man, 40s) seen from side/back, receiving documentation
- Both standing in front of freshly installed wallbox
- Electric vehicle plugged in, first charge in progress
- Celebratory "job complete" atmosphere
- Handshake moment or documentation handover

THOMAS (with reference photo):
- Company-branded red polo shirt (clean, professional)
- Confident, satisfied posture - job well done
- Handing over welcome packet with charging instructions
- Gesturing toward wallbox features
- Professional but warm demeanor

CUSTOMER (no clear face - side/back view):
- Man in casual weekend clothes (it's his home)
- Receiving documentation, looking at wallbox
- Body language showing satisfaction
- Standing next to his new EV
` : ''}

WALLBOX INSTALLATION (premium quality):
- Modern Heidelberg/ABB wallbox mounted on garage wall
- Sleek white housing with status LED glowing green
- "Laden: 7.2 kW" display visible
- Charging cable connected to vehicle
- Professional cable routing in conduit
- "Installiert von Müller Elektrotechnik" small label

ELECTRIC VEHICLE:
- Modern EV partially visible (VW ID.4, Tesla Model 3, or similar)
- Charging port open, cable connected
- Clean, premium vehicle
- Positioned in residential driveway/carport

ENVIRONMENT - German residential:
- Modern carport or garage setting
- Clean, organized space
- Contemporary home architecture visible
- Evening golden hour light
- Well-maintained property

PHOTOGRAPHY:
- Shot on Sony A7R V, 35mm f/1.8 at f/2.8
- Warm golden hour lighting
- Editorial documentary style
- Focus on interaction and wallbox
- Magazine-quality composition

MOOD & PSYCHOLOGY:
- Future of mobility, delivered today
- Customer satisfaction moment
- Professional service completion
- "Welcome to electric driving"
- Investment that pays off

CRITICAL EXCLUSIONS:
- NO clear customer face (side/back only)
- NO messy installation
- NO exposed wiring
- NO staged stock photo feel
- NO generic charging station image

Target emotion: "So möchte ich auch mein E-Auto laden" (I want to charge my EV like this too)`
  }

  // If reference image provided, remove physical appearance details from prompt
  // Keep scenario details, but let reference image handle the appearance
  let prompt = servicePrompts[service]

  if (referenceImage && includePersona) {
    // Remove lines describing physical appearance (age, hair, facial features)
    prompt = prompt.replace(/- Mid-40s German electrician with short dark hair\n/g, '')
    prompt = prompt.replace(/- 42-year-old master electrician\n/g, '')
    prompt = prompt.replace(/- Short dark brown hair with grey at temples\n/g, '')
    prompt = prompt.replace(/- Athletic build from physical work\n/g, '')
    prompt = prompt.replace(/- Confident, approachable expression\n/g, '')
    prompt = prompt.replace(/- Slightly tanned complexion\n/g, '')
  }

  return generateImage({
    prompt,
    aspectRatio: '16:9',
    imageSize: '2K',
    includeText: false,
    temperature: 0.3, // Lower for consistency with reference
    referenceImages: referenceImage ? [referenceImage] : undefined,
  })
}

/**
 * Load reference image and convert to base64
 */
export async function loadReferenceImage(imagePath: string): Promise<string> {
  const fs = await import('fs/promises')
  const path = await import('path')

  // Resolve path (handles both absolute and relative paths)
  const fullPath = path.isAbsolute(imagePath)
    ? imagePath
    : path.join(process.cwd(), imagePath)

  try {
    // Read image file
    const imageBuffer = await fs.readFile(fullPath)

    // Convert to base64
    const base64Image = imageBuffer.toString('base64')

    console.log(`  ✅ Loaded reference image: ${path.basename(fullPath)} (${(imageBuffer.length / 1024).toFixed(1)} KB)`)

    return base64Image
  } catch (error) {
    console.error(`  ❌ Failed to load reference image from ${fullPath}:`, error)
    throw new Error(`Could not load reference image: ${imagePath}`)
  }
}

/**
 * Save generated image to public folder
 */
export async function saveImageToPublic(
  imageData: string,
  filename: string,
  subfolder: string = 'generated'
): Promise<string> {
  const fs = await import('fs/promises')
  const path = await import('path')

  // Create directory if it doesn't exist
  const dir = path.join(process.cwd(), 'public', subfolder)
  await fs.mkdir(dir, { recursive: true })

  // Decode base64 and save
  const buffer = Buffer.from(imageData, 'base64')
  const filepath = path.join(dir, filename)
  await fs.writeFile(filepath, buffer)

  // Return public URL
  return `/${subfolder}/${filename}`
}
