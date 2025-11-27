'use client'

import { cn } from '@/lib/utils'

interface GoogleMapProps {
  address?: string
  businessName?: string
  lat?: number
  lng?: number
  zoom?: number
  className?: string
  height?: string
  showMarker?: boolean
}

export function GoogleMap({
  address = 'München, Germany',
  businessName = 'Müller Elektrotechnik',
  lat = 48.1351, // Munich center
  lng = 11.5820,
  zoom = 11,
  className,
  height = '400px',
  showMarker = true,
}: GoogleMapProps) {
  // Build the embed URL
  // Using the embed API which doesn't require an API key for basic functionality
  const encodedAddress = encodeURIComponent(`${businessName}, ${address}`)
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${zoom === 11 ? '87400' : '43700'}!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDA4JzA2LjQiTiAxMcKwMzQnNTUuMiJF!5e0!3m2!1sde!2sde!4v1700000000000!5m2!1sde!2sde`

  // Alternative: use place search embed
  const placeSearchUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}&zoom=${zoom}`

  // For demo, use a static map embed that works without API key
  const staticEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`

  return (
    <div className={cn('w-full overflow-hidden rounded-xl shadow-lg', className)}>
      <iframe
        src={staticEmbedUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Standort ${businessName}`}
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  )
}

// Service area display component
interface ServiceAreaMapProps {
  title?: string
  description?: string
  areas?: string[]
  className?: string
}

export function ServiceAreaMap({
  title = 'Unser Einsatzgebiet',
  description = 'Wir sind in ganz München und Umgebung für Sie da',
  areas = [
    'Schwabing',
    'Haidhausen',
    'Sendling',
    'Pasing',
    'Bogenhausen',
    'Maxvorstadt',
    'Neuhausen',
    'Giesing',
    'Berg am Laim',
    'Trudering',
    'Starnberg',
    'Freising',
    'Dachau',
    'Erding',
  ],
  className,
}: ServiceAreaMapProps) {
  return (
    <section className={cn('py-16 bg-muted/30', className)}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <div className="order-2 lg:order-1">
            <GoogleMap
              height="450px"
              zoom={10}
              className="shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {areas.map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border hover:border-primary/50 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              Auch außerhalb dieser Gebiete? Rufen Sie uns an – wir finden eine Lösung!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
