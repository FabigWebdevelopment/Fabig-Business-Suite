'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  staggerContainer,
  staggerItem,
  staggers,
  getReducedMotionVariant,
} from '@/lib/animations/config'

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  /**
   * Delay between each child animation (in seconds)
   * @default 0.05 (50ms)
   */
  staggerDelay?: number

  /**
   * Delay before first child animates (in seconds)
   * @default 0.1
   */
  initialDelay?: number

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
 * StaggerContainer Component
 *
 * Animates children sequentially with a stagger delay
 * Perfect for lists, grids, feature sections
 *
 * @example
 * ```tsx
 * <StaggerContainer staggerDelay={0.1}>
 *   <div>Item 1</div> // Animates first
 *   <div>Item 2</div> // Animates 0.1s later
 *   <div>Item 3</div> // Animates 0.2s later
 * </StaggerContainer>
 * ```
 */
export function StaggerContainer({
  staggerDelay = staggers.normal,
  initialDelay = 0.1,
  inView: enableInView = true,
  viewportAmount = 0.1,
  once = true,
  children,
  ...props
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    amount: viewportAmount,
  })

  const variants = getReducedMotionVariant({
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  })

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

/**
 * StaggerItem Component
 *
 * Child component for StaggerContainer
 * Use this to wrap individual items
 *
 * @example
 * ```tsx
 * <StaggerContainer>
 *   <StaggerItem>
 *     <Card>Item 1</Card>
 *   </StaggerItem>
 *   <StaggerItem>
 *     <Card>Item 2</Card>
 *   </StaggerItem>
 * </StaggerContainer>
 * ```
 */
export function StaggerItem({
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  const variants = getReducedMotionVariant(staggerItem)

  return (
    <motion.div variants={variants} {...props}>
      {children}
    </motion.div>
  )
}
