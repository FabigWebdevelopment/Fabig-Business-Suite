'use client'

import { cn } from '@/lib/utils'
import { Zap } from 'lucide-react'

interface ElectricianLogoProps {
  businessName?: string
  tagline?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'light' | 'dark'
  className?: string
}

const sizeClasses = {
  sm: {
    icon: 'h-5 w-5',
    container: 'h-8 w-8',
    text: 'text-sm',
    tagline: 'text-[10px]',
    gap: 'gap-2',
  },
  md: {
    icon: 'h-6 w-6',
    container: 'h-10 w-10',
    text: 'text-lg',
    tagline: 'text-xs',
    gap: 'gap-2',
  },
  lg: {
    icon: 'h-8 w-8',
    container: 'h-12 w-12',
    text: 'text-xl',
    tagline: 'text-xs',
    gap: 'gap-3',
  },
  xl: {
    icon: 'h-10 w-10',
    container: 'h-14 w-14',
    text: 'text-2xl',
    tagline: 'text-sm',
    gap: 'gap-3',
  },
}

export function ElectricianLogo({
  businessName = 'Müller Elektrotechnik',
  tagline = 'Elektrotechnik München',
  showText = true,
  size = 'md',
  variant = 'default',
  className,
}: ElectricianLogoProps) {
  const sizes = sizeClasses[size]

  return (
    <div className={cn('flex items-center', sizes.gap, className)}>
      {/* Icon Logo */}
      <div
        className={cn(
          'relative flex items-center justify-center rounded-xl transition-transform hover:scale-105',
          sizes.container,
          variant === 'default' && 'bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25',
          variant === 'light' && 'bg-white shadow-lg',
          variant === 'dark' && 'bg-gray-900 shadow-lg'
        )}
      >
        <Zap
          className={cn(
            sizes.icon,
            variant === 'default' && 'text-primary-foreground',
            variant === 'light' && 'text-primary',
            variant === 'dark' && 'text-white'
          )}
          strokeWidth={2.5}
          fill="currentColor"
        />
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-lg -z-10 opacity-50" />
      </div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              'font-bold leading-tight tracking-tight',
              sizes.text,
              variant === 'dark' && 'text-white'
            )}
          >
            {businessName}
          </span>
          {tagline && (
            <span
              className={cn(
                'text-muted-foreground leading-tight',
                sizes.tagline,
                variant === 'dark' && 'text-gray-400'
              )}
            >
              {tagline}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Standalone icon logo for favicon/small usage
export function ElectricianLogoIcon({
  size = 'md',
  variant = 'default',
  className,
}: Omit<ElectricianLogoProps, 'businessName' | 'tagline' | 'showText'>) {
  const sizes = sizeClasses[size]

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-xl',
        sizes.container,
        variant === 'default' && 'bg-gradient-to-br from-primary via-primary to-primary/80 shadow-lg shadow-primary/25',
        variant === 'light' && 'bg-white shadow-lg',
        variant === 'dark' && 'bg-gray-900 shadow-lg',
        className
      )}
    >
      <Zap
        className={cn(
          sizes.icon,
          variant === 'default' && 'text-primary-foreground',
          variant === 'light' && 'text-primary',
          variant === 'dark' && 'text-white'
        )}
        strokeWidth={2.5}
        fill="currentColor"
      />
    </div>
  )
}
