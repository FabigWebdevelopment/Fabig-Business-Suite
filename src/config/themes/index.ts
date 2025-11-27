/**
 * Theme Registry
 *
 * Pre-built tweakcn themes ready for client selection.
 * Each theme is fully configured with light/dark modes, typography, and shadows.
 *
 * Clients select a theme during onboarding by clicking through previews.
 * No hex color input needed - just pick the theme that fits your brand.
 */

import type { ThemeConfig } from '../theme.types'
import { warmOrangeTheme } from './warm-orange.theme'
import { freshGreenTheme } from './fresh-green.theme'
import { professionalBlueTheme } from './professional-blue.theme'
import { elegantPurpleTheme } from './elegant-purple.theme'
import { modernSlateTheme } from './modern-slate.theme'
import { energeticRedTheme } from './energetic-red.theme'
import { calmTealTheme } from './calm-teal.theme'
import { sunnyYellowTheme } from './sunny-yellow.theme'

/**
 * Theme metadata for the selection UI
 */
export interface ThemeMeta {
  /** Unique identifier */
  id: string
  /** Display name */
  name: string
  /** Short description */
  description: string
  /** Suggested industries */
  industries: string[]
  /** Personality keywords */
  personality: string[]
  /** Preview colors (for theme cards) */
  preview: {
    primary: string
    secondary: string
    background: string
  }
  /** The actual theme config */
  config: ThemeConfig
}

/**
 * All available themes with metadata
 */
export const themes: ThemeMeta[] = [
  {
    id: 'warm-orange',
    name: 'Warm Orange',
    description: 'Einladend und energiegeladen',
    industries: ['Restaurant', 'Café', 'Bäckerei', 'Food Service', 'Handwerk'],
    personality: ['Warm', 'Einladend', 'Energetisch', 'Freundlich'],
    preview: {
      primary: '#C2410C', // oklch(0.4650 0.1470 24.9381) approximation
      secondary: '#FEF3C7',
      background: '#FFFBEB',
    },
    config: warmOrangeTheme,
  },
  {
    id: 'fresh-green',
    name: 'Fresh Green',
    description: 'Natürlich und vertrauenswürdig',
    industries: ['Gartenbau', 'Wellness', 'Fitness', 'Bio/Öko', 'Umwelt'],
    personality: ['Frisch', 'Natürlich', 'Vertrauenswürdig', 'Gesund'],
    preview: {
      primary: '#16A34A',
      secondary: '#DCFCE7',
      background: '#F0FDF4',
    },
    config: freshGreenTheme,
  },
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    description: 'Seriös und kompetent',
    industries: ['Elektriker', 'Handwerk', 'Beratung', 'Technik', 'IT'],
    personality: ['Professionell', 'Vertrauenswürdig', 'Kompetent', 'Seriös'],
    preview: {
      primary: '#2563EB',
      secondary: '#DBEAFE',
      background: '#EFF6FF',
    },
    config: professionalBlueTheme,
  },
  {
    id: 'elegant-purple',
    name: 'Elegant Purple',
    description: 'Luxuriös und kreativ',
    industries: ['Friseur', 'Kosmetik', 'Spa', 'Mode', 'Design'],
    personality: ['Elegant', 'Luxuriös', 'Kreativ', 'Exklusiv'],
    preview: {
      primary: '#7C3AED',
      secondary: '#EDE9FE',
      background: '#FAF5FF',
    },
    config: elegantPurpleTheme,
  },
  {
    id: 'modern-slate',
    name: 'Modern Slate',
    description: 'Minimalistisch und zeitlos',
    industries: ['Architektur', 'Fotografie', 'Agentur', 'Tech', 'Startup'],
    personality: ['Modern', 'Minimalistisch', 'Zeitlos', 'Sophisticated'],
    preview: {
      primary: '#475569',
      secondary: '#E2E8F0',
      background: '#F8FAFC',
    },
    config: modernSlateTheme,
  },
  {
    id: 'energetic-red',
    name: 'Energetic Red',
    description: 'Dynamisch und leidenschaftlich',
    industries: ['Sport', 'Fitness', 'Automotive', 'Event', 'Entertainment'],
    personality: ['Dynamisch', 'Leidenschaftlich', 'Kraftvoll', 'Mutig'],
    preview: {
      primary: '#DC2626',
      secondary: '#FEE2E2',
      background: '#FEF2F2',
    },
    config: energeticRedTheme,
  },
  {
    id: 'calm-teal',
    name: 'Calm Teal',
    description: 'Beruhigend und professionell',
    industries: ['Arztpraxis', 'Zahnarzt', 'Therapie', 'Pflege', 'Apotheke'],
    personality: ['Beruhigend', 'Professionell', 'Sauber', 'Vertrauensvoll'],
    preview: {
      primary: '#0D9488',
      secondary: '#CCFBF1',
      background: '#F0FDFA',
    },
    config: calmTealTheme,
  },
  {
    id: 'sunny-yellow',
    name: 'Sunny Yellow',
    description: 'Fröhlich und optimistisch',
    industries: ['Kinder', 'Spielzeug', 'Events', 'Freizeit', 'Tourismus'],
    personality: ['Fröhlich', 'Optimistisch', 'Freundlich', 'Einladend'],
    preview: {
      primary: '#CA8A04',
      secondary: '#FEF9C3',
      background: '#FEFCE8',
    },
    config: sunnyYellowTheme,
  },
]

/**
 * Get theme by ID
 */
export function getThemeById(id: string): ThemeMeta | undefined {
  return themes.find((t) => t.id === id)
}

/**
 * Get theme config by ID
 */
export function getThemeConfigById(id: string): ThemeConfig | undefined {
  return getThemeById(id)?.config
}

/**
 * Get themes suggested for an industry
 */
export function getThemesByIndustry(industry: string): ThemeMeta[] {
  const normalized = industry.toLowerCase()
  return themes.filter((t) =>
    t.industries.some((i) => i.toLowerCase().includes(normalized))
  )
}

/**
 * Default theme (fallback)
 */
export const defaultTheme = professionalBlueTheme

/**
 * Theme IDs for type safety
 */
export type ThemeId =
  | 'warm-orange'
  | 'fresh-green'
  | 'professional-blue'
  | 'elegant-purple'
  | 'modern-slate'
  | 'energetic-red'
  | 'calm-teal'
  | 'sunny-yellow'
