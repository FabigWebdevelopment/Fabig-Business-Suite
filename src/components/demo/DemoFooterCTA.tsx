'use client'

/**
 * Demo Footer CTA Component
 *
 * A call-to-action section that appears above or within the footer
 * to convert demo viewers into agency leads.
 *
 * IMPORTANT: This component uses centralized demo config.
 * Configure defaults in: src/config/demo.config.ts
 */

import { ArrowRight, Sparkles, Star, Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DEMO_MODE, demoConfig } from '@/config/demo.config'

interface DemoFooterCTAProps {
  /** Agency website URL */
  agencyUrl?: string
  /** Agency name */
  agencyName?: string
  /** Headline */
  headline?: string
  /** Description */
  description?: string
  /** CTA button text */
  ctaText?: string
  /** Show stats/trust indicators */
  showStats?: boolean
  /** Variant style */
  variant?: 'default' | 'gradient' | 'card'
  /** Custom class name */
  className?: string
}

export function DemoFooterCTA({
  agencyUrl = demoConfig.agency.url,
  agencyName = demoConfig.agency.name,
  headline = demoConfig.footerCta.headline,
  description = demoConfig.footerCta.description,
  ctaText = demoConfig.footerCta.primaryButton,
  showStats = true,
  variant = 'gradient',
  className,
}: DemoFooterCTAProps) {
  // Don't render if demo mode is disabled
  if (!DEMO_MODE) {
    return null
  }
  const stats = [
    { icon: Star, value: '50+', label: 'Projekte' },
    { icon: Zap, value: '4.9', label: 'Bewertung' },
    { icon: Clock, value: '2-4', label: 'Wochen' },
  ]

  return (
    <section
      className={cn(
        'relative overflow-hidden',
        variant === 'gradient' &&
          'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 text-white py-16',
        variant === 'default' && 'bg-muted py-16',
        variant === 'card' && 'py-8',
        className
      )}
    >
      {/* Background decoration */}
      {variant === 'gradient' && (
        <>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {variant === 'card' ? (
          <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
            <CardContent
              headline={headline}
              description={description}
              ctaText={ctaText}
              agencyUrl={agencyUrl}
              agencyName={agencyName}
              showStats={showStats}
              stats={stats}
            />
          </div>
        ) : (
          <CardContent
            headline={headline}
            description={description}
            ctaText={ctaText}
            agencyUrl={agencyUrl}
            agencyName={agencyName}
            showStats={showStats}
            stats={stats}
            variant={variant}
          />
        )}
      </div>
    </section>
  )
}

function CardContent({
  headline,
  description,
  ctaText,
  agencyUrl,
  agencyName,
  showStats,
  stats,
  variant = 'gradient',
}: {
  headline: string
  description: string
  ctaText: string
  agencyUrl: string
  agencyName: string
  showStats: boolean
  stats: Array<{ icon: any; value: string; label: string }>
  variant?: 'default' | 'gradient' | 'card'
}) {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      {/* Badge */}
      <div className="inline-flex items-center gap-2">
        <Badge
          variant="secondary"
          className={cn(
            'px-4 py-1.5',
            variant === 'gradient' || variant === 'card'
              ? 'bg-white/20 text-white hover:bg-white/30'
              : ''
          )}
        >
          <Sparkles className="h-3.5 w-3.5 mr-1.5" />
          Demo von {agencyName}
        </Badge>
      </div>

      {/* Headline */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {headline}
      </h2>

      {/* Description */}
      <p
        className={cn(
          'text-lg md:text-xl max-w-2xl mx-auto',
          variant === 'gradient' || variant === 'card'
            ? 'text-white/80'
            : 'text-muted-foreground'
        )}
      >
        {description}
      </p>

      {/* Stats */}
      {showStats && (
        <div className="flex items-center justify-center gap-8 md:gap-16 py-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-2">
                <stat.icon
                  className={cn(
                    'h-5 w-5',
                    variant === 'gradient' || variant === 'card'
                      ? 'text-yellow-300'
                      : 'text-primary'
                  )}
                />
                <span className="text-2xl md:text-3xl font-bold">{stat.value}</span>
              </div>
              <span
                className={cn(
                  'text-sm',
                  variant === 'gradient' || variant === 'card'
                    ? 'text-white/70'
                    : 'text-muted-foreground'
                )}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          size="lg"
          className={cn(
            'text-lg px-8 h-14 group',
            variant === 'gradient' || variant === 'card'
              ? 'bg-white text-blue-700 hover:bg-white/90 shadow-xl'
              : ''
          )}
          asChild
        >
          <a href={agencyUrl} target="_blank" rel="noopener noreferrer">
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>

        <Button
          size="lg"
          variant="ghost"
          className={cn(
            'text-lg px-8 h-14',
            variant === 'gradient' || variant === 'card'
              ? 'text-white hover:bg-white/10'
              : ''
          )}
          asChild
        >
          <a href={`${agencyUrl}/portfolio`} target="_blank" rel="noopener noreferrer">
            Mehr Projekte ansehen
          </a>
        </Button>
      </div>

      {/* Trust text */}
      <p
        className={cn(
          'text-sm',
          variant === 'gradient' || variant === 'card'
            ? 'text-white/60'
            : 'text-muted-foreground'
        )}
      >
        ✓ Kostenlose Erstberatung · ✓ Festpreisangebot · ✓ Made in Germany
      </p>
    </div>
  )
}
