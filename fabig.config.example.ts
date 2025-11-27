/**
 * Fabig Configuration Example
 *
 * Copy this file to `fabig.config.ts` and fill in your client's data.
 * This is the SINGLE SOURCE OF TRUTH for all client-specific information.
 *
 * DO NOT hardcode any client data in components - always use config!
 */

import type { FabigConfig } from '@/types/config'

export const config: FabigConfig = {
  // ═══════════════════════════════════════════════════════════════════════════
  // DEMO MODE
  // Set to false when cloning for a real client
  // ═══════════════════════════════════════════════════════════════════════════
  isDemo: true,

  // Demo-specific settings (only used when isDemo: true)
  demo: {
    agencyUrl: 'https://fabig-suite.de',
    agencyName: 'Fabig Webdevelopment',
    showBanner: true,
    showBadge: true,
    showFooterCTA: true,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BUSINESS IDENTITY
  // ═══════════════════════════════════════════════════════════════════════════
  business: {
    name: 'Müller Elektrotechnik',
    legalName: 'Müller Elektrotechnik GmbH',
    tagline: 'Ihr Meisterbetrieb in München',
    description:
      'VDE-zertifizierter Elektrofachbetrieb für Smart Home, E-Mobilität und Elektroinstallationen in München und Umgebung. Über 15 Jahre Erfahrung und 500+ zufriedene Kunden.',
    foundedYear: 2010,
    employeeCount: '5-10',
    industry: 'electrician',

    certifications: [
      { name: 'VDE-zertifiziert', icon: 'shield-check' },
      { name: 'Meisterbetrieb', icon: 'award' },
      { name: 'E-Marke', icon: 'zap' },
    ],

    stats: {
      yearsExperience: 15,
      completedProjects: 500,
      googleRating: 4.9,
      googleReviewCount: 127,
      employees: 8,
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CONTACT INFORMATION
  // ═══════════════════════════════════════════════════════════════════════════
  contact: {
    phone: {
      display: '+49 89 1234 5678',
      link: '+4989123456789',
    },
    email: 'info@mueller-elektro.de',
    whatsapp: {
      number: '+4989123456789',
      defaultMessage:
        'Hallo, ich interessiere mich für Ihre Dienstleistungen und hätte gerne ein unverbindliches Angebot.',
    },

    primaryContact: {
      name: 'Thomas Müller',
      title: 'Geschäftsführer & Elektrotechnikermeister',
      email: 'thomas.mueller@mueller-elektro.de',
      phone: '+49 89 1234 5679',
      image: '/images/team/thomas-mueller.jpg',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LOCATION & SERVICE AREA
  // ═══════════════════════════════════════════════════════════════════════════
  location: {
    address: {
      street: 'Musterstraße 123',
      city: 'München',
      zip: '80331',
      state: 'Bayern',
      country: 'Deutschland',
    },
    coordinates: {
      lat: 48.1351,
      lng: 11.582,
    },
    serviceAreas: [
      'München',
      'Schwabing',
      'Bogenhausen',
      'Pasing',
      'Trudering',
      'Giesing',
      'Sendling',
      'Fürstenried',
      'Landkreis München',
      'Dachau',
    ],
    serviceRadius: '30km',
    googlePlaceId: 'ChIJ2V-Mo_l1nkcRfZixfUq4DAE', // Example
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // BUSINESS HOURS
  // ═══════════════════════════════════════════════════════════════════════════
  hours: {
    regular: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '09:00', close: '14:00' },
      sunday: null,
    },
    emergency: {
      available: true,
      text: '24/7 Notdienst verfügbar',
      phone: '+49 89 1234 5670',
    },
    displayFormat: 'Mo-Fr: 8-18 Uhr, Sa: 9-14 Uhr',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // THEME & BRANDING
  // ═══════════════════════════════════════════════════════════════════════════
  theme: {
    preset: 'warm-orange',

    // Uncomment to override specific colors
    // colors: {
    //   primary: 'oklch(0.4650 0.1470 24.9381)',
    // },

    logo: {
      type: 'icon',
      icon: 'zap',
      alt: 'Müller Elektrotechnik Logo',
    },

    font: {
      heading: 'Inter',
      body: 'Inter',
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // SEO & DOMAIN
  // ═══════════════════════════════════════════════════════════════════════════
  seo: {
    domain: 'mueller-elektro.de',
    siteUrl: 'https://mueller-elektro.de',

    defaultTitle: 'Müller Elektrotechnik München | Ihr Meisterbetrieb',
    titleTemplate: '%s | Müller Elektrotechnik',
    defaultDescription:
      'VDE-zertifizierter Elektrofachbetrieb in München. Smart Home, E-Mobilität, Elektroinstallationen. ⭐ 4.9/5 Sterne (127 Bewertungen). Jetzt kostenlos beraten lassen!',

    ogImage: '/images/og-default.jpg',
    googleMapsUrl: 'https://maps.google.com/?cid=123456789',
    googleMyBusinessId: 'accounts/123/locations/456',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // FEATURE FLAGS
  // ═══════════════════════════════════════════════════════════════════════════
  features: {
    // Contact methods
    whatsapp: true,
    phoneCall: true,
    contactForm: true,

    // UI elements
    emergencyBanner: true,
    stickyPhoneFAB: true,
    cookieConsent: true,

    // Integrations
    googleMaps: true,
    analytics: 'pirsch',

    // Advanced features (coming soon)
    onlineBooking: false,
    liveChat: false,
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // INTEGRATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  integrations: {
    crm: {
      enabled: true,
      type: 'twenty',
      // API key goes in .env.local as TWENTY_API_KEY
    },

    analytics: {
      pirsch: { enabled: true },
      // Site ID goes in .env.local as PIRSCH_SITE_ID
    },

    messaging: {
      provider: 'twilio',
      // Credentials go in .env.local
    },
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // LEGAL
  // ═══════════════════════════════════════════════════════════════════════════
  legal: {
    vatId: 'DE123456789',
    tradeRegister: 'HRB 12345, Amtsgericht München',
    responsiblePerson: 'Thomas Müller',
    dataProtectionOfficer: undefined, // Or contact details if applicable

    impressumUrl: '/impressum',
    datenschutzUrl: '/datenschutz',
    agbUrl: '/agb',
  },
}

export default config
