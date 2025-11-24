'use client'

import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils/cn'
import { hoverLift, springs } from '@/lib/animations/config'

const AnimatedCard = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<'div'> & {
    /**
     * Enable hover lift effect
     * @default true
     */
    hoverLift?: boolean
  }
>(({ className, hoverLift: enableHoverLift = true, ...props }, ref) => (
  <motion.div
    ref={ref}
    className={cn(
      'rounded-xl border bg-card text-card-foreground shadow',
      className
    )}
    whileHover={
      enableHoverLift
        ? {
            ...hoverLift,
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)',
          }
        : undefined
    }
    transition={springs.smooth}
    {...props}
  />
))
AnimatedCard.displayName = 'AnimatedCard'

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
AnimatedCardHeader.displayName = 'AnimatedCardHeader'

const AnimatedCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
AnimatedCardTitle.displayName = 'AnimatedCardTitle'

const AnimatedCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AnimatedCardDescription.displayName = 'AnimatedCardDescription'

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
AnimatedCardContent.displayName = 'AnimatedCardContent'

const AnimatedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
AnimatedCardFooter.displayName = 'AnimatedCardFooter'

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardFooter,
  AnimatedCardTitle,
  AnimatedCardDescription,
  AnimatedCardContent,
}
