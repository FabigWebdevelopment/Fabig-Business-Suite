'use client'

import { ReactNode } from 'react'

interface BenefitItem {
  stat: string // e.g., "40-80%", "24/7", "500+"
  label: string // e.g., "Energieeinsparung"
  description: string
  image?: string // Background image URL
  icon?: ReactNode // Optional icon for visual accent
}

interface BenefitShowcaseProps {
  title: string
  subtitle?: string
  benefits: BenefitItem[]
  layout?: 'grid' | 'alternating'
  className?: string
}

/**
 * Premium benefit showcase with large stats and visual backgrounds.
 * Designed to create emotional impact and quick scanning.
 * Use images that show the RESULT, not the technology.
 */
const BenefitShowcase = ({
  title,
  subtitle,
  benefits,
  layout = 'grid',
  className = '',
}: BenefitShowcaseProps) => {
  if (layout === 'alternating') {
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

          {/* Alternating Layout */}
          <div className="space-y-8 lg:space-y-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                    {benefit.image ? (
                      <img
                        src={benefit.image}
                        alt={benefit.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span className="text-6xl lg:text-8xl font-bold text-primary/20">
                          {benefit.stat}
                        </span>
                      </div>
                    )}
                    {/* Stat Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <span className="text-4xl lg:text-5xl font-bold text-white">
                        {benefit.stat}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 lg:px-8">
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    {benefit.label}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Grid Layout (default)
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden min-h-[280px] lg:min-h-[320px]"
            >
              {/* Background Image or Gradient */}
              {benefit.image ? (
                <>
                  <img
                    src={benefit.image}
                    alt={benefit.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70" />
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                {/* Stat Badge */}
                <div className="absolute top-6 left-6 lg:top-8 lg:left-8">
                  <span className="text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                    {benefit.stat}
                  </span>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    {benefit.label}
                  </h3>
                  <p className="text-white/80 text-sm lg:text-base line-clamp-3">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { BenefitShowcase }
export type { BenefitItem, BenefitShowcaseProps }
