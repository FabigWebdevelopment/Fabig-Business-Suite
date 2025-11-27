/**
 * Visual DNA Image Prompt System
 *
 * Creates consistent, psychologically-optimized imagery
 * that sells through emotion, not features.
 *
 * Core Principle: Show the OUTCOME the customer desires,
 * not the product itself.
 */

// =============================================================================
// VISUAL DNA - The consistent look across ALL project images
// =============================================================================

export interface VisualDNA {
  lighting: string
  environment: string
  colorTemperature: string
  mood: string
  style: string
  humanElement: string
  culturalDetails: string
}

export const electricianVisualDNA: VisualDNA = {
  lighting: `
    Warm golden hour lighting (late afternoon, 4-6pm feel)
    - Soft directional sunlight streaming through windows
    - Creates warm highlights and gentle shadows
    - No harsh midday sun or cold overcast
    - Interior: Warm ambient + natural window light mix
    - Exterior: Golden hour backlight or side light`,

  environment: `
    Modern German residential (aspirational but achievable)
    - Clean, bright, organized spaces
    - Contemporary architecture (white render, large windows)
    - Premium but not mansion-level (relatable wealth)
    - Well-maintained gardens, clean driveways
    - Quality German fixtures and finishes visible`,

  colorTemperature: `
    Warm palette matching brand (orange/amber primary)
    - Overall warm tone (3200-4000K feel)
    - Highlights: Golden, amber, warm white
    - Shadows: Soft warm brown, not cold grey
    - Accent: Brand orange appearing naturally in scene
    - Avoid: Cold blues, sterile whites, harsh contrasts`,

  mood: `
    Calm confidence - "Everything is taken care of"
    - Peaceful, unhurried atmosphere
    - Sense of completion and satisfaction
    - Quiet luxury, not flashy
    - Trust and reliability
    - Home comfort and security`,

  style: `
    Editorial lifestyle photography
    - Magazine quality, not stock photo
    - Tells a story in a single frame
    - Shallow depth of field (f/1.8-2.8)
    - Natural, unstaged feeling (but perfectly composed)
    - Shot on: Sony A7R V or Canon EOS R5 simulation`,

  humanElement: `
    Show lifestyle outcomes, NOT faces
    - Hands interacting with technology
    - Silhouettes in warm light
    - Back views looking at results
    - Empty scenes implying recent human presence
    - Objects that tell human stories (coffee cup, keys, etc.)`,

  culturalDetails: `
    German quality and precision
    - VDE-certified equipment visible
    - Organized cable management
    - Quality German brands (subtle)
    - Clean installation standards
    - Professional finishing touches`
}

// =============================================================================
// BASE PROMPT BUILDER
// =============================================================================

export function buildBasePrompt(visualDNA: VisualDNA): string {
  return `
VISUAL STYLE REQUIREMENTS (apply to ALL elements):

LIGHTING:
${visualDNA.lighting}

ENVIRONMENT:
${visualDNA.environment}

COLOR TEMPERATURE:
${visualDNA.colorTemperature}

MOOD & ATMOSPHERE:
${visualDNA.mood}

PHOTOGRAPHY STYLE:
${visualDNA.style}

HUMAN ELEMENT:
${visualDNA.humanElement}

CULTURAL DETAILS:
${visualDNA.culturalDetails}

CRITICAL TECHNICAL REQUIREMENTS:
- NO faces or recognizable people
- NO text, logos, or watermarks in image
- NO cluttered or messy backgrounds
- NO cold/sterile/clinical feeling
- NO stock photo poses or setups
- Image must feel WARM, ASPIRATIONAL, REAL`
}

// =============================================================================
// PSYCHOLOGY-BASED BENEFIT PROMPTS
// =============================================================================

export interface BenefitPrompt {
  id: string
  title: string
  painPoint: string
  desire: string
  visualConcept: string
  emotionalTrigger: string
  sceneDescription: string
}

export const wallboxBenefitPrompts: BenefitPrompt[] = [
  {
    id: 'speed',
    title: '10x Schneller Laden',
    painPoint: 'Hours wasted waiting at public chargers, planning life around charging',
    desire: 'Freedom, spontaneity, time for what matters',
    visualConcept: 'Morning routine flowing smoothly while car charges',
    emotionalTrigger: 'Time abundance - your morning, not the chargers schedule',
    sceneDescription: `
      SCENE: Peaceful morning kitchen moment, car visible charging through window

      FOREGROUND:
      - Warm kitchen counter with steaming coffee cup
      - Fresh croissant or breakfast items
      - Morning newspaper or tablet (lifestyle detail)
      - Soft morning light on surfaces

      MIDGROUND:
      - Large window/glass door to carport area
      - Sheer curtains diffusing golden morning light

      BACKGROUND (through window):
      - Premium EV connected to wallbox, charging peacefully
      - Green LED indicator glowing softly
      - Morning garden atmosphere

      COMPOSITION:
      - Coffee/breakfast in sharp focus foreground
      - Car charging scene softly visible through window
      - Creates "life goes on while charging" feeling

      MOOD: Unhurried morning luxury, time abundance
      MESSAGE: "Your morning routine, undisturbed"`
  },
  {
    id: 'savings',
    title: '50% Günstiger',
    painPoint: 'Expensive public charging eating into EV savings',
    desire: 'Smart financial decision, beating the system',
    visualConcept: 'Home charging comfort vs cold public station',
    emotionalTrigger: 'Smart homeowner making the savvy choice',
    sceneDescription: `
      SCENE: Warm home garage/carport vs implied cold outside

      MAIN FOCUS:
      - Sleek wallbox on warm-lit garage wall
      - Premium EV plugged in, charging indicator on
      - Warm pendant light creating cozy garage atmosphere
      - Clean organized space (tools on pegboard, quality finishes)

      DETAILS THAT SELL SAVINGS:
      - Smart energy meter on wall showing low rate
      - Evening/night-time setting (cheap overnight rates)
      - Home comfort elements (door to warm house visible)
      - Quality installation (investment that pays back)

      CONTRAST ELEMENTS (subtle):
      - Cold rain/darkness visible through garage door window
      - Implying "others are out there, you're home"

      COMPOSITION:
      - Warm interior dominates frame
      - Cold exterior glimpsed, not featured
      - Wallbox as hero product but in lifestyle context

      MOOD: Smart, cozy, "I made the right choice"
      MESSAGE: "Why pay more elsewhere?"`
  },
  {
    id: 'overnight',
    title: 'Über Nacht Voll',
    painPoint: 'Range anxiety, forgetting to charge, planning stress',
    desire: 'Peace of mind, it just works, wake up ready',
    visualConcept: 'Serene nighttime charging, morning readiness',
    emotionalTrigger: 'Sleep peacefully, car handles itself',
    sceneDescription: `
      SCENE: Split atmosphere - peaceful night becoming fresh morning

      NIGHTTIME ELEMENTS:
      - Soft blue hour exterior light
      - House windows with warm interior glow
      - Stars or clear evening sky
      - Wallbox LED showing charging (subtle green/blue)
      - EV silhouette connected, peacefully charging

      MORNING PROMISE ELEMENTS:
      - First hints of golden sunrise on horizon
      - Fresh dew on car/surroundings
      - Sense of new day beginning
      - 100% charge implied (dashboard glow or indicator)

      ENVIRONMENT:
      - Premium German home exterior
      - Well-maintained property
      - Quality carport or driveway setup
      - Garden elements (hedges, plants) in soft focus

      COMPOSITION:
      - Cinematic wide angle
      - Car/wallbox in middle ground
      - Sky gradient from night to dawn
      - Peaceful, almost magical atmosphere

      MOOD: Serenity, reliability, peace of mind
      MESSAGE: "Sleep well. Wake up ready."`
  },
  {
    id: 'solar',
    title: 'Gratis Sonnenstrom',
    painPoint: 'Energy dependence, rising electricity costs, guilt',
    desire: 'Energy independence, free fuel, sustainability pride',
    visualConcept: 'Complete energy cycle - sun to car',
    emotionalTrigger: 'Self-sufficient homeowner, beating the energy companies',
    sceneDescription: `
      SCENE: Sunny day showing complete solar-to-car energy flow

      SKY & SUN:
      - Bright but not harsh sunlight
      - Blue sky with a few white clouds
      - Sun positioned to highlight energy flow
      - Lens flare adding warmth (subtle)

      HOUSE WITH SOLAR:
      - Modern German home roof with solar panels
      - Panels catching sunlight, almost glowing
      - Clean, well-integrated installation
      - Quality mounting system visible

      ENERGY FLOW (implied, not literal arrows):
      - Visual line from sun → panels → house → wallbox → car
      - Inverter on wall (subtle)
      - Smart display showing "PV-Laden" or solar icon
      - Green indicators throughout system

      EV & WALLBOX:
      - Premium car in driveway
      - Connected to wallbox
      - "Free charging" feeling
      - Midday setting (peak solar production)

      GARDEN/ENVIRONMENT:
      - Green, healthy plants (sustainability theme)
      - Well-maintained eco-conscious property
      - Quality German home aesthetic

      COMPOSITION:
      - Wide angle showing complete system
      - Sun to car visual journey
      - Aspirational but achievable home

      MOOD: Pride, independence, smart sustainability
      MESSAGE: "Your roof powers your car. Free."`
  }
]

// =============================================================================
// FULL PROMPT GENERATOR
// =============================================================================

export function generateBenefitPrompt(
  benefit: BenefitPrompt,
  visualDNA: VisualDNA,
  aspectRatio: '1:1' | '4:3' | '16:9' = '4:3'
): string {
  const basePrompt = buildBasePrompt(visualDNA)

  return `
GENERATE IMAGE FOR: ${benefit.title}

PSYCHOLOGICAL GOAL:
- Pain Point to Address: ${benefit.painPoint}
- Desire to Trigger: ${benefit.desire}
- Emotional Response: ${benefit.emotionalTrigger}

VISUAL CONCEPT:
${benefit.visualConcept}

DETAILED SCENE:
${benefit.sceneDescription}

${basePrompt}

ASPECT RATIO: ${aspectRatio}
OUTPUT: Photorealistic, magazine-quality lifestyle photography
`
}

// =============================================================================
// PROCESS STEP PROMPTS (Consistent with Visual DNA)
// =============================================================================

export const processStepPrompts = {
  consultation: `
    SCENE: Professional consultation moment (hands and materials only)

    FOCUS ELEMENTS:
    - Tablet showing wallbox configurator app
    - Professional hands pointing at screen options
    - Customer's hands visible, engaged
    - Electrical assessment checklist on clipboard
    - Coffee cups suggesting relaxed discussion

    ENVIRONMENT:
    - Warm, bright kitchen or living room
    - Modern German home interior
    - Large window with afternoon light
    - Quality furnishings in background (blurred)

    MOOD: Trust, expertise, personal attention
    MESSAGE: "We take time to understand your needs"`,

  planning: `
    SCENE: Professional planning documents and digital tools

    FOCUS ELEMENTS:
    - Electrical installation blueprint/diagram
    - Laptop with CAD planning software
    - Official Netzanmeldung form (German grid registration)
    - Quality pen, ruler, professional tools
    - Company letterhead visible

    ENVIRONMENT:
    - Clean desk with warm task lighting
    - Organized professional workspace
    - Window light supplementing desk lamp

    DETAILS:
    - VDE-standard electrical symbols on plans
    - Color-coded wiring diagrams
    - Approval stamps/checkmarks
    - Timeline or project phases visible

    MOOD: Precision, organization, professionalism
    MESSAGE: "Everything planned to perfection"`,

  installation: `
    SCENE: Professional installation in progress (hands only)

    FOCUS ELEMENTS:
    - Gloved hands mounting wallbox to wall
    - Premium German tools (Wera, Knipex) in use
    - Color-coded cables (VDE standard)
    - Spirit level ensuring perfect alignment
    - Clean installation area

    ENVIRONMENT:
    - Bright garage or carport
    - Natural light through door/window
    - Dust sheets protecting floor
    - Organized tool bag nearby

    TECHNICAL QUALITY SIGNALS:
    - Perfect cable routing
    - Professional conduit work
    - VDE-compliant colors visible
    - Quality mounting hardware

    MOOD: Craftsmanship, precision, quality
    MESSAGE: "Expert hands, perfect result"`,

  handover: `
    SCENE: Completed installation - moment of satisfaction

    FOCUS ELEMENTS:
    - Beautifully installed wallbox (hero shot)
    - First charge in progress (green LED)
    - Welcome documentation folder
    - Car keys with EV fob
    - Charging cable elegantly connected

    ENVIRONMENT:
    - Golden hour lighting
    - Premium EV in frame
    - Clean, finished installation
    - Quality home architecture visible

    SUCCESS SIGNALS:
    - Everything working perfectly
    - Professional documentation
    - Clean installation (no mess)
    - Pride in completed work

    MOOD: Satisfaction, accomplishment, excitement
    MESSAGE: "Welcome to effortless charging"`
}

// =============================================================================
// HELPER: Generate all benefit images with consistent DNA
// =============================================================================

export function generateAllBenefitPrompts(aspectRatio: '1:1' | '4:3' | '16:9' = '4:3') {
  return wallboxBenefitPrompts.map(benefit => ({
    id: benefit.id,
    title: benefit.title,
    prompt: generateBenefitPrompt(benefit, electricianVisualDNA, aspectRatio)
  }))
}
