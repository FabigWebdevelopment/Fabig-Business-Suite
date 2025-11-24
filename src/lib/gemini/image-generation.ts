/**
 * Gemini Image Generation Utility
 *
 * Uses Google's Gemini 3 Pro Image Preview (Nano Banana Pro) for generating
 * custom hero images and logos for client websites.
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
}

export interface GeneratedImage {
  data: string // base64 encoded image
  mimeType: string
  text?: string // optional description from Gemini
}

/**
 * Generate an image using Gemini API
 */
export async function generateImage(
  options: ImageGenerationOptions
): Promise<GeneratedImage> {
  const apiKey = getApiKey() // Get API key at runtime, not module load time

  const { prompt, aspectRatio = '16:9', imageSize = '2K', includeText = false } = options

  const requestBody = {
    contents: [{
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      responseModalities: includeText ? ['TEXT', 'IMAGE'] : ['IMAGE'],
      imageConfig: {
        aspectRatio,
        imageSize,
      }
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
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    // Extract image and text from response
    const parts = data.candidates[0]?.content?.parts || []
    const imagePart = parts.find((p: any) => p.inlineData)
    const textPart = parts.find((p: any) => p.text)

    if (!imagePart) {
      throw new Error('No image generated in response')
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
Professional close-up shot of experienced hands wearing modern work gloves installing a sleek smart home control panel on a pristine white wall in a luxury German home. The touchscreen panel shows energy monitoring interface, solar panel status graph, EV charging control icons (Tesla-style modern UI). Cables impeccably routed with professional cable management clips, color-coded wiring visible (German standard: brown, black, grey, blue, green-yellow) - all perfectly organized.

Hands & tools: Professional insulated screwdriver in hand (Wera brand visible), quality multimeter nearby, voltage tester with LED indicators. Gloves are modern technical fabric (not old leather). Small VDE certification seal visible on equipment. Meister certificate partially visible in background (blurred but recognizable).

Environment: Modern minimalist interior - white walls, soft natural daylight from floor-to-ceiling windows in soft focus background showing contemporary German home. Professional tool bag edge visible (KNIPEX logo), iPad showing installation software on nearby surface, everything clean and organized.

Photography style: Professional architectural/technical photography, shot on Sony A7R V, 50mm lens at f/2.2 for selective focus, cool professional color grading with technology blue accents and warm copper wire highlights. Editorial lighting with soft shadows, ultra-sharp macro detail on the panel and hands. Magazine-quality composition.

Color palette: Clean whites, professional blues, organized rainbow of electrical wiring, metallic silver tools, warm copper conductors creating visual interest against cool tones. Modern, clean, precise.

Mood & emotion: German precision engineering, "Das ist Qualität" (This is quality), Meister craftsmanship, attention to detail, modern professional service, safety-first mentality, future-forward technology

Visual message: "We don't just fix old wiring - we bring your home into the smart home era with German precision"

Focus details: The ORGANIZATION (perfect wire routing), PRECISION (exact wire stripping lengths), MODERN TECHNOLOGY (smart home features), CERTIFICATIONS (VDE seal), PROFESSIONAL TOOLS (branded equipment)

CRITICAL: NO messy wires, NO exposed dangerous conductors, NO dim/harsh lighting, NO cluttered background, NO old technology, NO unsafe practices, NO generic "guy with drill" stock photo

Target: Make German homeowners aged 35-65 think "Dem vertraue ich mein Haus an" (I trust this person with my home)`,
}

/**
 * Generate a hero image for a local business
 */
export async function generateHeroImage(
  businessType: string,
  businessName: string,
  style: 'modern' | 'professional' | 'elegant' | 'minimalist' = 'professional'
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
