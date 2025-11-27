'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

interface SystemItem {
  name: string
  logo?: string // URL to system logo
  image: string // URL to showcase image
  tagline: string // One compelling line
  priceRange: string // e.g., "ab 8.000€"
  highlights: string[] // 3-4 quick benefits
  href: string
  accentColor: 'blue' | 'green' | 'amber' | 'purple'
  badge?: string // e.g., "Beliebteste Wahl"
}

interface SystemShowcaseProps {
  title: string
  subtitle?: string
  systems: SystemItem[]
  className?: string
}

const accentStyles = {
  blue: {
    gradient: 'from-blue-600 to-blue-800',
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
    badge: 'bg-blue-600',
  },
  green: {
    gradient: 'from-green-600 to-green-800',
    bg: 'bg-green-500/10',
    text: 'text-green-600 dark:text-green-400',
    border: 'border-green-500/20',
    badge: 'bg-green-600',
  },
  amber: {
    gradient: 'from-amber-600 to-amber-800',
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
    badge: 'bg-amber-600',
  },
  purple: {
    gradient: 'from-purple-600 to-purple-800',
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/20',
    badge: 'bg-purple-600',
  },
}

/**
 * Premium system comparison showcase.
 * Replaces generic icon cards with visual brand comparison.
 * Each system gets its own visual identity with logo, image, and accent color.
 */
const SystemShowcase = ({
  title,
  subtitle,
  systems,
  className = '',
}: SystemShowcaseProps) => {
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

        {/* Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {systems.map((system, index) => {
            const styles = accentStyles[system.accentColor]

            return (
              <div
                key={index}
                className={`group relative rounded-2xl overflow-hidden border ${styles.border} bg-card hover:shadow-2xl transition-all duration-500`}
              >
                {/* Badge (if present) */}
                {system.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className={`${styles.badge} text-white px-3 py-1`}>
                      {system.badge}
                    </Badge>
                  </div>
                )}

                {/* Image Section */}
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-90`} />
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-cover mix-blend-overlay opacity-60"
                  />

                  {/* Logo Overlay */}
                  {system.logo ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={system.logo}
                        alt={`${system.name} Logo`}
                        className="h-12 lg:h-16 object-contain brightness-0 invert"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl lg:text-4xl font-bold text-white">
                        {system.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8">
                  {/* Tagline */}
                  <p className="text-lg font-medium mb-4 text-foreground">
                    {system.tagline}
                  </p>

                  {/* Price Range */}
                  <div className={`inline-flex items-center gap-2 ${styles.bg} ${styles.text} px-3 py-1.5 rounded-full text-sm font-semibold mb-6`}>
                    {system.priceRange}
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3 mb-8">
                    {system.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 ${styles.text} flex-shrink-0 mt-0.5`} />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    className="w-full group/btn"
                    variant="outline"
                    asChild
                  >
                    <Link href={system.href}>
                      Mehr erfahren
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { SystemShowcase }
export type { SystemItem, SystemShowcaseProps }
