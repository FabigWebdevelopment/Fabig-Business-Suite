/**
 * Enterprise Animation Configuration
 * Apple-inspired animation system with elastic bezier curves
 *
 * Philosophy:
 * - Natural, not robotic
 * - Enhance experience, don't distract
 * - Performance-first (60fps target)
 * - Accessible (respects prefers-reduced-motion)
 */

import type { Transition, Variants } from 'framer-motion'

/**
 * Easing Curves (Apple-style)
 */
export const easings = {
  // Smooth, natural easing (most common)
  smooth: [0.16, 1, 0.3, 1] as [number, number, number, number],

  // Elastic spring effect (buttons, cards)
  elastic: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],

  // Sharp, purposeful (modals, overlays)
  sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],

  // Gentle, subtle (backgrounds, large elements)
  gentle: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],

  // Overshoot slightly (CTAs, important actions)
  overshoot: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
}

/**
 * Spring Configurations (Physics-based)
 */
export const springs = {
  // Default spring (balanced, natural)
  default: {
    type: 'spring' as const,
    damping: 25,
    stiffness: 120,
  },

  // Bouncy spring (playful, energetic)
  bouncy: {
    type: 'spring' as const,
    damping: 15,
    stiffness: 200,
  },

  // Smooth spring (elegant, refined)
  smooth: {
    type: 'spring' as const,
    damping: 30,
    stiffness: 100,
  },

  // Snappy spring (quick, responsive)
  snappy: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300,
  },

  // Gentle spring (slow, dramatic)
  gentle: {
    type: 'spring' as const,
    damping: 35,
    stiffness: 80,
  },
}

/**
 * Duration Presets (in seconds)
 */
export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
}

/**
 * Stagger Delays (for sequential animations)
 */
export const staggers = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.1,
}

/**
 * Default Transitions
 */
export const transitions = {
  // Smooth bezier transition (most common)
  smooth: {
    duration: durations.normal,
    ease: easings.smooth,
  } as Transition,

  // Elastic bounce
  elastic: {
    duration: durations.slow,
    ease: easings.elastic,
  } as Transition,

  // Spring physics
  spring: springs.default,

  // Instant (no animation)
  instant: {
    duration: durations.instant,
  } as Transition,
}

/**
 * Viewport Scroll Thresholds
 */
export const viewportMargins = {
  // Trigger when element enters viewport
  immediate: '0px 0px 0px 0px',

  // Trigger slightly before element enters
  early: '0px 0px -100px 0px',

  // Trigger when element is 50% visible
  half: '0px 0px -50% 0px',

  // Trigger when element is fully visible
  full: '0px 0px 100% 0px',
}

/**
 * Animation Variants Library
 * Reusable animation presets for common patterns
 */

// Fade In/Out
export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
  exit: {
    opacity: 0,
    transition: transitions.smooth,
  },
}

// Slide from bottom (hero text, cards)
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
}

// Slide from top (headers, navigation)
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
}

// Slide from left (sidebar, menus)
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.spring,
  },
}

// Slide from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.spring,
  },
}

// Scale up (cards, images, modals)
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.elastic,
  },
}

// Scale down (reverse reveal)
export const scaleDown: Variants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.elastic,
  },
}

// Rotate + Scale (dramatic entrance)
export const rotateScale: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: transitions.spring,
  },
}

// Blur In (premium feel)
export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: transitions.smooth,
  },
}

// Stagger Container (for lists)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggers.normal,
      delayChildren: 0.1,
    },
  },
}

// Stagger Child (for list items)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.spring,
  },
}

/**
 * Hover Animations
 */
export const hoverScale = {
  scale: 1.05,
  transition: transitions.spring,
}

export const hoverLift = {
  y: -4,
  transition: transitions.spring,
}

export const hoverGlow = {
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  transition: transitions.smooth,
}

/**
 * Tap Animations (Mobile-friendly)
 */
export const tapScale = {
  scale: 0.95,
}

/**
 * Accessibility: Respect prefers-reduced-motion
 */
export function getReducedMotionVariant(variants: Variants): Variants {
  if (typeof window === 'undefined') return variants

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (!prefersReducedMotion) return variants

  // Strip animations for users who prefer reduced motion
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.01 } },
  }
}
