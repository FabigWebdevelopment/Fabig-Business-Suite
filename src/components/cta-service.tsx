import { Phone, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CtaServiceProps {
  title?: string
  description?: string
  buttonText?: string
  buttonUrl?: string
  phone?: string
  items?: string[]
  className?: string
}

const defaultItems = [
  'Kostenlose Erstberatung',
  'Festpreis-Angebot',
  'VDE-zertifiziert',
  'Meisterbetrieb',
]

const CtaService = ({
  title = 'Jetzt Beratungstermin sichern',
  description = 'Wir beraten Sie kostenlos und unverbindlich zu Ihrem Projekt.',
  buttonText = 'Termin vereinbaren',
  buttonUrl = '#kontakt',
  phone,
  items = defaultItems,
  className = '',
}: CtaServiceProps) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="max-w-5xl w-full">
            <div className="bg-muted flex flex-col items-start justify-between gap-8 rounded-xl px-6 py-10 md:flex-row lg:px-12 lg:py-14">
              <div className="md:w-1/2">
                <h4 className="mb-2 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground text-lg">{description}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button size="lg" asChild>
                    <a href={buttonUrl}>
                      {buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  {phone && (
                    <Button size="lg" variant="outline" asChild>
                      <a href={`tel:${phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Direkt anrufen
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-3 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-3 h-5 w-5 flex-shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CtaService }
