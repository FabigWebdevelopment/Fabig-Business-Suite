'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Phone, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StickyEmergencyBannerProps {
  phone: string
  onEmergencyClick: () => void
  isModalOpen?: boolean
  className?: string
}

export function StickyEmergencyBanner({ phone, onEmergencyClick, isModalOpen, className }: StickyEmergencyBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure we're mounted on client before using portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Show banner after a short delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Check if user previously dismissed (session storage)
  useEffect(() => {
    const dismissed = sessionStorage.getItem('emergencyBannerDismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem('emergencyBannerDismissed', 'true')
  }

  // Hide when not visible, not mounted, or when modal is open
  if (!isVisible || !mounted || isModalOpen) return null

  // Floating FAB when banner is dismissed
  if (isDismissed) {
    const fabContent = (
      <button
        onClick={onEmergencyClick}
        className="fixed bottom-6 right-6 z-[9999] group"
        aria-label="Notdienst kontaktieren"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl group-hover:bg-red-500/40 transition-colors" />

          {/* Button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <AlertTriangle className="h-6 w-6 text-white" />

            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
            </span>
          </div>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-background border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            <p className="text-xs font-medium">24/7 Notdienst</p>
          </div>
        </div>
      </button>
    )

    return createPortal(fabContent, document.body)
  }

  // Full banner
  const bannerContent = (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999] animate-in slide-in-from-bottom duration-500',
        className
      )}
      style={{ isolation: 'isolate' }}
    >
      {/* Subtle top border */}
      <div className="h-px bg-border" />

      <div className="bg-background/95 backdrop-blur-lg border-t shadow-2xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Message */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Icon with pulsing indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shadow-sm">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-sm sm:text-base truncate">
                  24/7 Elektriker-Notdienst
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm truncate">
                  Stromausfall? Wir sind in 60 Min. bei Ihnen
                </p>
              </div>
            </div>

            {/* Right side - CTAs */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Direct call - visible on mobile */}
              <Button
                size="sm"
                variant="ghost"
                className="sm:hidden"
                asChild
              >
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="h-4 w-4" />
                </a>
              </Button>

              {/* Main CTA */}
              <Button
                size="sm"
                onClick={onEmergencyClick}
                className="font-semibold shadow-lg"
              >
                <Phone className="mr-2 h-4 w-4 hidden sm:inline" />
                <span className="hidden sm:inline">Notfall melden</span>
                <span className="sm:hidden">Hilfe</span>
              </Button>

              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Banner schließen"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Use portal to render at document body level, escaping all stacking contexts
  return createPortal(bannerContent, document.body)
}
