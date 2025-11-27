'use client'

import { useState } from 'react'
import { AnimatedButton } from '@/components/ui/animated-button'
import { AnimatedCard } from '@/components/ui/animated-card'
import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import { Loader2, Download, Wand2 } from 'lucide-react'

const industryPrompts = {
  electricianHero: {
    name: 'Electrician Hero',
    prompt: `Professional close-up shot of experienced hands wearing modern work gloves installing a sleek smart home control panel on a pristine white wall in a luxury German home. The touchscreen panel shows energy monitoring interface, solar panel status graph, EV charging control icons (Tesla-style modern UI). Cables impeccably routed with professional cable management clips, color-coded wiring visible (German standard: brown, black, grey, blue, green-yellow) - all perfectly organized.

Hands & tools: Professional insulated screwdriver in hand (Wera brand visible), quality multimeter nearby, voltage tester with LED indicators. Gloves are modern technical fabric (not old leather). Small VDE certification seal visible on equipment.

Environment: Modern minimalist interior - white walls, soft natural daylight from floor-to-ceiling windows in soft focus background showing contemporary German home. Professional tool bag edge visible (KNIPEX logo), iPad showing installation software on nearby surface, everything clean and organized.

Photography style: Professional architectural/technical photography, shot on Sony A7R V, 50mm lens at f/2.2 for selective focus, cool professional color grading with technology blue accents and warm copper wire highlights. Editorial lighting with soft shadows, ultra-sharp macro detail on the panel and hands. Magazine-quality composition.

CRITICAL: NO messy wires, NO exposed dangerous conductors, NO dim/harsh lighting, NO cluttered background, NO old technology, NO unsafe practices`
  },
  electricianLogo: {
    name: 'Electrician Logo',
    prompt: `Design a modern professional logo for "Müller Elektrotechnik", a premium German electrical contractor specializing in smart home technology.

Logo concept: Modern technical precision meets German engineering trust. The logo should communicate: certified expertise, cutting-edge technology, reliable safety.

Visual elements:
- Central icon: Abstract geometric representation of electrical concepts
  - Stylized lightning bolt in minimalist geometric form (angular, precise)
  - Or circuit pattern forming an "M" monogram
  - Or power button symbol integrated with house outline
- Typography: Modern technical sans-serif (similar to: DIN, Eurostile, or Univers)

Style reference: Siemens, ABB, Schneider Electric, Tesla minimalism

Color: Primary = Deep professional blue (trust, technology) + Electric orange/copper accent (energy, warmth)

Technical requirements:
- Vector-style flat design or subtle single-direction gradient allowed
- Must be clear at 48x48px (mobile icon size)
- Professional enough for VDE certification documents

CRITICAL: NO generic lightning bolt clipart, NO residential house outline (too basic), NO Edison bulb illustrations, NO socket/plug imagery`
  },
  smartHome: {
    name: 'Smart Home',
    prompt: `Interior photography of a modern German living room with smart home technology seamlessly integrated. Elegant minimalist space with floor-to-ceiling windows showing Munich skyline at golden hour. Warm ambient lighting controlled by invisible automation - subtle LED strips under floating shelves, pendant lights dimmed to perfect level.

Key elements visible:
- Sleek wall-mounted tablet showing Loxone/KNX interface
- Motorized blinds partially open at perfect angle
- Hidden speakers integrated into ceiling
- Subtle climate sensor on wall
- Modern leather sofa and designer furniture

Mood: Warm, inviting, luxurious but livable. The technology is present but not dominant - it enhances life without being visible.

Photography style: Architectural interior photography, wide angle lens, professional lighting with warm color temperature. High-end real estate photography aesthetic.

CRITICAL: NO visible wires, NO cluttered tech, NO cold/sterile feeling, NO stock photo generic look`
  },
  wallboxInstallation: {
    name: 'Wallbox Installation',
    prompt: `Professional installation photo of a premium EV wallbox charger mounted on a clean garage wall. Modern German home garage with concrete floor, white walls. Tesla Model 3 or BMW iX visible partially in frame, charging cable connected.

The wallbox is sleek white design (ABB, Webasto, or similar premium brand aesthetic), LED status ring glowing green. Professional cable routing from ceiling to wallbox, all conduits perfectly aligned and painted to match wall.

Environment: Immaculately clean garage, daylight coming through window, professional tools and equipment case visible in background suggesting just-completed installation.

Photography style: Product photography meets architectural, clean composition, professional lighting highlighting the wallbox as hero element.

CRITICAL: NO messy garage, NO visible old electrical work, NO budget chargers, NO poor cable management`
  }
}

export default function GenerateImagePage() {
  const [selectedPrompt, setSelectedPrompt] = useState<keyof typeof industryPrompts>('electricianHero')
  const [customPrompt, setCustomPrompt] = useState('')
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '1:1' | '4:3'>('16:9')
  const [imageSize, setImageSize] = useState<'1K' | '2K'>('2K')
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError(null)
    setGeneratedImage(null)

    try {
      const promptToUse = customPrompt || industryPrompts[selectedPrompt].prompt

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToUse,
          aspectRatio,
          imageSize,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image')
      }

      // Convert base64 to data URL
      const imageUrl = `data:${data.image.mimeType};base64,${data.image.data}`
      setGeneratedImage(imageUrl)

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement('a')
    link.href = generatedImage
    link.download = `generated-${selectedPrompt}-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <AnimatedDiv animation="slideDown">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">AI Image Generator</h1>
            <p className="text-muted-foreground text-lg">
              Generate professional images for electrician websites with Gemini AI
            </p>
          </div>
        </AnimatedDiv>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <AnimatedDiv animation="slideRight" delay={0.1}>
            <AnimatedCard className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Select Template</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(industryPrompts).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedPrompt(key as keyof typeof industryPrompts)
                        setCustomPrompt('')
                      }}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPrompt === key
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-sm">{value.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Or Custom Prompt</h2>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter your custom prompt..."
                  className="w-full h-32 p-3 rounded-lg border border-border bg-background resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as '16:9' | '1:1' | '4:3')}
                    className="w-full p-2 rounded-lg border border-border bg-background"
                  >
                    <option value="16:9">16:9 (Hero)</option>
                    <option value="1:1">1:1 (Logo)</option>
                    <option value="4:3">4:3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image Size</label>
                  <select
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value as '1K' | '2K')}
                    className="w-full p-2 rounded-lg border border-border bg-background"
                  >
                    <option value="1K">1K (1024px)</option>
                    <option value="2K">2K (2048px)</option>
                  </select>
                </div>
              </div>

              <AnimatedButton
                onClick={handleGenerate}
                disabled={loading}
                className="w-full"
                size="lg"
                hoverEffect="glow"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Image
                  </>
                )}
              </AnimatedButton>

              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive text-destructive">
                  <p className="font-medium">Error:</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              )}
            </AnimatedCard>
          </AnimatedDiv>

          {/* Preview */}
          <AnimatedDiv animation="slideLeft" delay={0.2}>
            <AnimatedCard className="p-6">
              <h2 className="text-xl font-semibold mb-4">Generated Image</h2>

              {!generatedImage && !loading && (
                <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
                  Your generated image will appear here
                </div>
              )}

              {loading && (
                <div className="aspect-video rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <p className="text-muted-foreground">Generating your image...</p>
                    <p className="text-sm text-muted-foreground">This may take 10-30 seconds</p>
                  </div>
                </div>
              )}

              {generatedImage && (
                <div className="space-y-4">
                  <div className="rounded-lg overflow-hidden border border-border">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-auto"
                    />
                  </div>

                  <AnimatedButton
                    onClick={handleDownload}
                    variant="outline"
                    className="w-full"
                    hoverEffect="lift"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Image
                  </AnimatedButton>
                </div>
              )}
            </AnimatedCard>
          </AnimatedDiv>
        </div>
      </div>
    </div>
  )
}
