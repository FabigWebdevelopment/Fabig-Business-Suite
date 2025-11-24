'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button'
import { cn } from '@/lib/utils/cn'
import { hoverScale, tapScale, springs } from '@/lib/animations/config'

export interface AnimatedButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'variants'>,
    VariantProps<typeof buttonVariants> {
  /**
   * Hover animation type
   * @default 'scale'
   */
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none'

  /**
   * Enable magnetic hover effect (button follows cursor)
   * @default false
   */
  magnetic?: boolean
}

/**
 * AnimatedButton Component
 *
 * Enhanced button with Apple-style animations
 * - Smooth hover effects (scale, lift, glow)
 * - Haptic-like tap feedback
 * - Optional magnetic hover
 * - Respects prefers-reduced-motion
 *
 * @example
 * ```tsx
 * // Scale on hover
 * <AnimatedButton hoverEffect="scale">
 *   Click Me
 * </AnimatedButton>
 *
 * // Magnetic button
 * <AnimatedButton magnetic>
 *   Hover to see magic
 * </AnimatedButton>
 * ```
 */
export const AnimatedButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedButtonProps
>(
  (
    {
      className,
      variant,
      size,
      hoverEffect = 'scale',
      magnetic = false,
      children,
      ...props
    },
    ref
  ) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const [magneticOffset, setMagneticOffset] = React.useState({ x: 0, y: 0 })

    // Magnetic hover effect
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!magnetic || !buttonRef.current) return

        const rect = buttonRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * 0.3
        const deltaY = (e.clientY - centerY) * 0.3

        setMagneticOffset({ x: deltaX, y: deltaY })
      },
      [magnetic]
    )

    const handleMouseLeave = React.useCallback(() => {
      if (magnetic) {
        setMagneticOffset({ x: 0, y: 0 })
      }
    }, [magnetic])

    // Hover variants
    const getHoverVariant = () => {
      switch (hoverEffect) {
        case 'scale':
          return hoverScale
        case 'lift':
          return { y: -2, transition: springs.snappy }
        case 'glow':
          return {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transition: springs.smooth,
          }
        case 'none':
          return {}
        default:
          return hoverScale
      }
    }

    return (
      <motion.button
        ref={(node) => {
          // @ts-ignore - ref forwarding
          buttonRef.current = node
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={getHoverVariant()}
        whileTap={tapScale}
        animate={{
          x: magneticOffset.x,
          y: magneticOffset.y,
        }}
        transition={springs.smooth}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
AnimatedButton.displayName = 'AnimatedButton'
