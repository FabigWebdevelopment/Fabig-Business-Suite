'use client'

/**
 * Demo Banner Component
 *
 * Dismissible announcement bar that appears at the top of demo websites.
 * Shows on first visit, can be dismissed (stored in localStorage).
 *
 * IMPORTANT: This component uses centralized demo config.
 * Configure defaults in: src/config/demo.config.ts
 */

import { useState, useEffect } from 'react'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DEMO_MODE, demoConfig } from '@/config/demo.config'

interface DemoBannerProps {
  /** Agency website URL */
  agencyUrl?: string
  /** Agency name */
  agencyName?: string
  /** Custom message */
  message?: string
  /** CTA button text */
  ctaText?: string
  /** Allow dismissing the banner */
  dismissible?: boolean
  /** Storage key for dismissed state */
  storageKey?: string
  /** Variant style */
  variant?: 'default' | 'gradient' | 'minimal'
}

const STORAGE_KEY = 'fabig-demo-banner-dismissed'

export function DemoBanner({
  agencyUrl = demoConfig.agency.url,
  agencyName = demoConfig.agency.name,
  message = demoConfig.banner.message,
  ctaText = demoConfig.banner.ctaText,
  dismissible = demoConfig.banner.dismissible,
  storageKey = STORAGE_KEY,
  variant = demoConfig.banner.variant,
}: DemoBannerProps) {
  // Don't render if demo mode is disabled
  if (!DEMO_MODE) {
    return null
  }
  const [isDismissed, setIsDismissed] = useState(true) // Start hidden to prevent flash
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check localStorage on mount
    const dismissed = localStorage.getItem(storageKey)
    setIsDismissed(dismissed === 'true')
    setIsLoaded(true)
  }, [storageKey])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(storageKey, 'true')
  }

  // Don't render until we've checked localStorage (prevents flash)
  if (!isLoaded || isDismissed) {
    return null
  }

  return (
    <div
      className={cn(
        'relative z-[100] w-full py-2.5 px-4',
        variant === 'gradient' &&
          'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white',
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'minimal' && 'bg-muted border-b text-foreground'
      )}
    >
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
        {/* Icon */}
        <Sparkles className="h-4 w-4 flex-shrink-0 hidden sm:block" />

        {/* Message */}
        <p className="flex items-center gap-2 text-center">
          <span className="font-medium">{message}</span>
          <span className="hidden sm:inline text-white/80">–</span>
          <span className="hidden sm:inline text-white/80">
            erstellt von{' '}
            <a
              href={agencyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 hover:no-underline"
            >
              {agencyName}
            </a>
          </span>
        </p>

        {/* CTA Button */}
        <Button
          size="sm"
          variant={variant === 'minimal' ? 'default' : 'secondary'}
          className={cn(
            'h-7 text-xs font-semibold gap-1 hidden md:inline-flex',
            variant === 'gradient' && 'bg-white text-blue-700 hover:bg-white/90'
          )}
          asChild
        >
          <a href={agencyUrl} target="_blank" rel="noopener noreferrer">
            {ctaText}
            <ArrowRight className="h-3 w-3" />
          </a>
        </Button>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              'absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors',
              variant === 'gradient' && 'hover:bg-white/20',
              variant === 'default' && 'hover:bg-primary-foreground/20',
              variant === 'minimal' && 'hover:bg-muted-foreground/20'
            )}
            aria-label="Banner schließen"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
