'use client'

/**
 * Demo Badge Component
 *
 * Floating badge that's always visible on demo websites.
 * Positioned in bottom-left to not interfere with phone/WhatsApp FABs.
 *
 * IMPORTANT: This component uses centralized demo config.
 * Configure defaults in: src/config/demo.config.ts
 */

import { useState } from 'react'
import { ExternalLink, ChevronRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { DEMO_MODE, demoConfig } from '@/config/demo.config'

interface DemoBadgeProps {
  /** Agency website URL */
  agencyUrl?: string
  /** Agency name */
  agencyName?: string
  /** Position on screen */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  /** Variant style */
  variant?: 'default' | 'minimal' | 'expanded'
  /** Custom class name */
  className?: string
}

export function DemoBadge({
  agencyUrl = demoConfig.agency.url,
  agencyName = demoConfig.agency.name,
  position = demoConfig.badge.position,
  variant = 'default',
  className,
}: DemoBadgeProps) {
  // Don't render if demo mode is disabled
  if (!DEMO_MODE) {
    return null
  }
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-20 left-4', // Account for header
    'top-right': 'top-20 right-4',
  }

  return (
    <a
      href={agencyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed z-50 group',
        positionClasses[position],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {variant === 'minimal' && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm border rounded-full shadow-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
          <span>Demo</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      )}

      {variant === 'default' && (
        <div
          className={cn(
            'flex items-center gap-2 px-3 py-2 bg-background/95 backdrop-blur-sm border rounded-xl shadow-xl transition-all duration-300',
            'hover:shadow-2xl hover:border-blue-500/30 hover:scale-105',
            isHovered && 'pr-4'
          )}
        >
          {/* Logo/Icon */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4 text-white" />
          </div>

          {/* Text */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
              Demo by
            </span>
            <span className="text-sm font-bold text-foreground leading-tight">
              {agencyName}
            </span>
          </div>

          {/* Arrow (shows on hover) */}
          <ChevronRight
            className={cn(
              'h-4 w-4 text-blue-500 transition-all duration-300',
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            )}
          />
        </div>
      )}

      {variant === 'expanded' && (
        <div className="flex flex-col gap-2 p-4 bg-background/95 backdrop-blur-sm border rounded-2xl shadow-xl max-w-[200px] hover:shadow-2xl hover:border-blue-500/30 transition-all">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Demo Website
              </span>
              <span className="text-sm font-bold text-foreground">
                {agencyName}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-2 border-t text-xs">
            <span className="text-muted-foreground">Gefällt Ihnen?</span>
            <span className="text-blue-500 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Kontakt
              <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      )}
    </a>
  )
}
