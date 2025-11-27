import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import { Button } from '@/components/ui/button'
import { AnimatedCard } from '@/components/ui/animated-card'
import { Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react'

interface PrimaryCTAProps {
  title: string
  description: string
  phone: string
  email: string
  whatsapp?: string
  className?: string
}

export function PrimaryCTA({ title, description, phone, email, whatsapp, className = '' }: PrimaryCTAProps) {
  return (
    <section className={`py-24 bg-gradient-to-br from-primary to-gray-900 text-white ${className}`}>
      <div className="container mx-auto px-4 text-center">
        <AnimatedDiv animation="scaleUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              asChild
            >
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 h-5 w-5" />
                {phone}
              </a>
            </Button>

            {whatsapp && (
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <a href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </a>
              </Button>
            )}

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 h-5 w-5" />
                E-Mail
              </a>
            </Button>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  )
}

interface ServiceCTABoxProps {
  title: string
  description: string
  ctaText: string
  ctaLink: string
  phone?: string
}

export function ServiceCTABox({ title, description, ctaText, ctaLink, phone }: ServiceCTABoxProps) {
  return (
    <AnimatedDiv animation="scaleUp" className="my-12">
      <AnimatedCard className="p-8 bg-gradient-to-br from-primary/5 to-gray-50 dark:from-primary/10 dark:to-gray-900/20 border-2 border-primary/20 dark:border-primary/30">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-lg text-muted-foreground">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href={ctaLink}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {phone && (
              <Button size="lg" variant="outline" asChild>
                <a href={`tel:${phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Direkt anrufen
                </a>
              </Button>
            )}
          </div>
        </div>
      </AnimatedCard>
    </AnimatedDiv>
  )
}

interface RelatedServicesProps {
  title?: string
  services: Array<{
    name: string
    description: string
    link: string
    icon?: React.ReactNode
  }>
}

export function RelatedServices({ title = 'Weitere Leistungen', services }: RelatedServicesProps) {
  // Dynamic grid: center items when less than 4
  const getGridCols = () => {
    const count = services.length
    if (count === 1) return 'md:grid-cols-1 max-w-md'
    if (count === 2) return 'md:grid-cols-2 max-w-2xl'
    if (count === 3) return 'md:grid-cols-3 max-w-4xl'
    return 'md:grid-cols-2 lg:grid-cols-4 max-w-6xl'
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedDiv animation="slideUp" className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
        </AnimatedDiv>

        <div className={`grid grid-cols-1 gap-6 mx-auto ${getGridCols()}`}>
          {services.map((service, index) => (
            <AnimatedDiv key={service.link} animation="slideUp" delay={index * 0.1}>
              <AnimatedCard className="p-6 h-full hover:shadow-xl transition-shadow group">
                <a href={service.link} className="block space-y-4">
                  {service.icon && (
                    <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                  )}
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <div className="flex items-center text-sm text-primary font-medium">
                    Mehr erfahren
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </AnimatedCard>
            </AnimatedDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
