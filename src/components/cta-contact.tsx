import { Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

interface CtaContactProps {
  heading?: string
  description?: string
  phone?: string
  email?: string
  whatsapp?: string
  className?: string
}

const CtaContact = ({
  heading = 'Kontaktieren Sie uns',
  description = 'Wir beraten Sie gerne zu Ihrem Projekt. Rufen Sie uns an oder schreiben Sie uns eine Nachricht.',
  phone,
  email,
  whatsapp,
  className = '',
}: CtaContactProps) => {
  return (
    <section className={`py-24 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-2xl p-8 md:rounded-2xl lg:p-12">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-4 text-3xl font-semibold text-primary-foreground md:text-5xl lg:mb-6 lg:text-5xl">
              {heading}
            </h3>
            <p className="text-primary-foreground/80 mb-8 text-lg font-medium lg:text-xl">
              {description}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
              {phone && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary hover:bg-white/90"
                  asChild
                >
                  <a href={`tel:${phone.replace(/\s/g, '')}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {phone}
                  </a>
                </Button>
              )}
              {whatsapp && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/20"
                  asChild
                >
                  <a
                    href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    WhatsApp
                  </a>
                </Button>
              )}
              {email && (
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/20"
                  asChild
                >
                  <a href={`mailto:${email}`}>
                    <Mail className="mr-2 h-5 w-5" />
                    E-Mail
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { CtaContact }
