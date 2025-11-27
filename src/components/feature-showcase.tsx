'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface FeatureItem {
  title: string
  description: string
  image: string
  icon?: ReactNode
  badge?: string
}

interface FeatureShowcaseProps {
  title: string
  subtitle?: string
  features: FeatureItem[]
  ctaText?: string
  ctaHref?: string
  className?: string
}

/**
 * Premium feature showcase with images showing each feature in action.
 * Designed for scanability - user understands without reading.
 * Use photos of the RESULT (cozy room, happy family) not the TECH (wires, devices).
 */
const FeatureShowcase = ({
  title,
  subtitle,
  features,
  ctaText,
  ctaHref,
  className = '',
}: FeatureShowcaseProps) => {
  // First feature is hero-sized, rest are in grid
  const [heroFeature, ...gridFeatures] = features

  return (
    <section className={`py-20 lg:py-28 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Hero Feature */}
        {heroFeature && (
          <div className="mb-8 lg:mb-12">
            <div className="relative rounded-2xl overflow-hidden aspect-[21/9] lg:aspect-[3/1]">
              <img
                src={heroFeature.image}
                alt={heroFeature.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="p-6 lg:p-12 max-w-xl">
                  {heroFeature.badge && (
                    <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {heroFeature.badge}
                    </span>
                  )}
                  <h3 className="text-2xl lg:text-4xl font-bold text-white mb-3">
                    {heroFeature.title}
                  </h3>
                  <p className="text-white/80 text-base lg:text-lg">
                    {heroFeature.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Grid */}
        {gridFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {gridFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden aspect-[4/5]"
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  {feature.badge && (
                    <span className="inline-block w-fit bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded mb-2">
                      {feature.badge}
                    </span>
                  )}
                  <h4 className="text-lg font-bold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {ctaText && ctaHref && (
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <a href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export { FeatureShowcase }
export type { FeatureItem, FeatureShowcaseProps }
