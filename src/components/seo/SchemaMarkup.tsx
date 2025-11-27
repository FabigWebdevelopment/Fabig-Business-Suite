/**
 * Schema.org Structured Data Components
 * Helps Google understand page content and show rich results
 */

interface LocalBusinessSchemaProps {
  name: string
  description: string
  image: string
  telephone: string
  email: string
  address: {
    street: string
    city: string
    region: string
    postalCode: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  priceRange: string
  openingHours: Array<{
    days: string[]
    opens: string
    closes: string
  }>
  rating?: {
    value: number
    count: number
  }
  url: string
}

export function LocalBusinessSchema(props: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    name: props.name,
    description: props.description,
    image: props.image,
    telephone: props.telephone,
    email: props.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.street,
      addressLocality: props.address.city,
      addressRegion: props.address.region,
      postalCode: props.address.postalCode,
      addressCountry: 'DE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: props.geo.latitude,
      longitude: props.geo.longitude
    },
    url: props.url,
    priceRange: props.priceRange,
    openingHoursSpecification: props.openingHours.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes
    })),
    ...(props.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: props.rating.value.toString(),
        reviewCount: props.rating.count.toString()
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ServiceSchemaProps {
  name: string
  description: string
  provider: string
  areaServed: string
  price?: {
    min: number
    currency: string
  }
  url: string
}

export function ServiceSchema(props: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: props.name,
    description: props.description,
    provider: {
      '@type': 'Electrician',
      name: props.provider
    },
    areaServed: {
      '@type': 'City',
      name: props.areaServed
    },
    ...(props.price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: props.price.currency,
        price: props.price.min.toString(),
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: props.price.min.toString(),
          priceCurrency: props.price.currency,
          valueAddedTaxIncluded: 'true'
        }
      }
    }),
    url: props.url
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQItem {
  question: string
  answer: string
}

interface FAQSchemaProps {
  items: FAQItem[]
}

export function FAQSchema(props: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema(props: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: props.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
