import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ImageSectionProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imagePosition?: 'left' | 'right'
  badge?: string
  features?: string[]
  ctaText?: string
  ctaHref?: string
  className?: string
}

/**
 * A versatile image + content section based on shadcnblocks Feature1/Feature2 pattern.
 * Use imagePosition to alternate between left and right layouts.
 */
const ImageSection = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = 'right',
  badge,
  features,
  ctaText,
  ctaHref,
  className = '',
}: ImageSectionProps) => {
  const ContentBlock = (
    <div className="flex flex-col justify-center">
      {badge && (
        <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight lg:text-4xl mb-4">
        {title}
      </h2>
      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
        {description}
      </p>
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      )}
      {ctaText && ctaHref && (
        <Button className="w-fit" asChild>
          <a href={ctaHref}>
            {ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      )}
    </div>
  )

  const ImageBlock = (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl shadow-xl">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover aspect-[4/3]"
        />
      </div>
    </div>
  )

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {imagePosition === 'left' ? (
            <>
              {ImageBlock}
              {ContentBlock}
            </>
          ) : (
            <>
              {ContentBlock}
              {ImageBlock}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export { ImageSection }
