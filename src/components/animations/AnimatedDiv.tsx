'use client'

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  fade,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleUp,
  scaleDown,
  rotateScale,
  blurIn,
  getReducedMotionVariant,
} from '@/lib/animations/config'

/**
 * Animation presets
 */
const animationPresets = {
  fade,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleUp,
  scaleDown,
  rotateScale,
  blurIn,
} as const

export type AnimationPreset = keyof typeof animationPresets

interface AnimatedDivProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  /**
   * Animation preset to use
   * @default 'slideUp'
   */
  animation?: AnimationPreset

  /**
   * Custom animation variants (overrides preset)
   */
  variants?: Variants

  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number

  /**
   * Duration of animation (in seconds)
   * Overrides preset duration
   */
  duration?: number

  /**
   * Trigger animation when element enters viewport
   * @default true
   */
  inView?: boolean

  /**
   * How much of the element should be visible before triggering
   * @default 0.1 (10%)
   */
  viewportAmount?: number

  /**
   * Only animate once (don't re-animate when scrolling)
   * @default true
   */
  once?: boolean

  /**
   * Children to animate
   */
  children: React.ReactNode
}

/**
 * AnimatedDiv Component
 *
 * A flexible animation wrapper with preset animations and scroll triggers
 *
 * @example
 * ```tsx
 * // Slide up on scroll
 * <AnimatedDiv animation="slideUp">
 *   <h1>Hello World</h1>
 * </AnimatedDiv>
 *
 * // Fade in with delay
 * <AnimatedDiv animation="fade" delay={0.2}>
 *   <p>Content</p>
 * </AnimatedDiv>
 *
 * // Custom variants
 * <AnimatedDiv variants={myCustomVariants}>
 *   <div>Custom animation</div>
 * </AnimatedDiv>
 * ```
 */
export function AnimatedDiv({
  animation = 'slideUp',
  variants: customVariants,
  delay = 0,
  duration,
  inView: enableInView = true,
  viewportAmount = 0.1,
  once = true,
  children,
  ...props
}: AnimatedDivProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: viewportAmount,
  })

  // Use custom variants or preset
  let variants = customVariants || animationPresets[animation]

  // Apply reduced motion if needed
  variants = getReducedMotionVariant(variants)

  // Add delay and duration overrides
  if (delay > 0 || duration) {
    variants = {
      ...variants,
      visible: {
        ...variants.visible,
        transition: {
          ...(variants.visible as any)?.transition,
          delay,
          ...(duration && { duration }),
        },
      },
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={enableInView ? (isInView ? 'visible' : 'hidden') : 'visible'}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
