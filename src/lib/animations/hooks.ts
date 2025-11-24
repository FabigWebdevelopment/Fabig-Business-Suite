'use client'

import { useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/**
 * useScrollProgress
 *
 * Returns scroll progress of element (0 to 1)
 * Perfect for scroll-linked animations
 *
 * @example
 * ```tsx
 * const { scrollProgress } = useScrollProgress()
 * const opacity = useTransform(scrollProgress, [0, 1], [0, 1])
 *
 * <motion.div style={{ opacity }}>
 *   Fades in as you scroll
 * </motion.div>
 * ```
 */
export function useScrollProgress() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return {
    ref,
    scrollProgress: scrollYProgress,
  }
}

/**
 * useParallax
 *
 * Creates parallax effect based on scroll position
 * Element moves slower/faster than scroll speed
 *
 * @param speed - Parallax multiplier (negative = moves up, positive = moves down)
 * @param smooth - Apply spring smoothing
 *
 * @example
 * ```tsx
 * const y = useParallax(-50)
 *
 * <motion.div style={{ y }}>
 *   Moves 50px up as you scroll down
 * </motion.div>
 * ```
 */
export function useParallax(speed: number = 50, smooth: boolean = true) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const transform = useTransform(scrollYProgress, [0, 1], [-speed, speed])
  const y = smooth
    ? useSpring(transform, { stiffness: 100, damping: 30 })
    : transform

  return {
    ref,
    y,
  }
}

/**
 * useScrollOpacity
 *
 * Fade element in/out based on scroll position
 *
 * @param fadeInStart - Scroll progress to start fading in (0-1)
 * @param fadeInEnd - Scroll progress when fully visible (0-1)
 * @param fadeOutStart - Scroll progress to start fading out (0-1)
 * @param fadeOutEnd - Scroll progress when fully hidden (0-1)
 *
 * @example
 * ```tsx
 * const { opacity } = useScrollOpacity(0, 0.3, 0.7, 1)
 *
 * <motion.div style={{ opacity }}>
 *   Fades in at 0-30%, visible at 30-70%, fades out at 70-100%
 * </motion.div>
 * ```
 */
export function useScrollOpacity(
  fadeInStart: number = 0,
  fadeInEnd: number = 0.2,
  fadeOutStart: number = 0.8,
  fadeOutEnd: number = 1
) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, (progress) => {
    // Fade in
    if (progress < fadeInStart) return 0
    if (progress < fadeInEnd) {
      return (progress - fadeInStart) / (fadeInEnd - fadeInStart)
    }

    // Visible
    if (progress < fadeOutStart) return 1

    // Fade out
    if (progress < fadeOutEnd) {
      return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart)
    }

    return 0
  })

  return {
    ref,
    opacity,
  }
}

/**
 * useScrollScale
 *
 * Scale element based on scroll position
 * Creates zoom in/out effect
 *
 * @param scaleStart - Initial scale value
 * @param scaleEnd - Final scale value
 *
 * @example
 * ```tsx
 * const { scale } = useScrollScale(0.8, 1.2)
 *
 * <motion.div style={{ scale }}>
 *   Scales from 0.8 to 1.2 as you scroll
 * </motion.div>
 * ```
 */
export function useScrollScale(scaleStart: number = 0.8, scaleEnd: number = 1) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [scaleStart, scaleEnd])

  return {
    ref,
    scale,
  }
}

/**
 * useScrollRotate
 *
 * Rotate element based on scroll position
 *
 * @param rotateStart - Initial rotation (degrees)
 * @param rotateEnd - Final rotation (degrees)
 *
 * @example
 * ```tsx
 * const { rotate } = useScrollRotate(-10, 10)
 *
 * <motion.div style={{ rotate }}>
 *   Rotates from -10deg to 10deg as you scroll
 * </motion.div>
 * ```
 */
export function useScrollRotate(rotateStart: number = -10, rotateEnd: number = 10) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [rotateStart, rotateEnd])

  return {
    ref,
    rotate,
  }
}

/**
 * useMousePosition
 *
 * Track mouse position for magnetic hover effects
 *
 * @example
 * ```tsx
 * const { x, y } = useMousePosition()
 *
 * <motion.div
 *   style={{
 *     x: useTransform(x, [0, window.innerWidth], [-20, 20]),
 *     y: useTransform(y, [0, window.innerHeight], [-20, 20]),
 *   }}
 * >
 *   Follows mouse movement
 * </motion.div>
 * ```
 */
export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return mousePosition
}

/**
 * useScrollVelocity
 *
 * Get current scroll velocity
 * Useful for momentum-based animations
 *
 * @example
 * ```tsx
 * const velocity = useScrollVelocity()
 *
 * <motion.div
 *   style={{
 *     scale: useTransform(velocity, [-1000, 0, 1000], [0.8, 1, 0.8]),
 *   }}
 * >
 *   Shrinks when scrolling fast
 * </motion.div>
 * ```
 */
export function useScrollVelocity(): MotionValue<number> {
  const { scrollY } = useScroll()
  const scrollVelocity = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
  })

  return scrollVelocity
}
