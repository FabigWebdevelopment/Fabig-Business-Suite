import { ThemeProvider } from '@/components/ThemeProvider'
import { getClientConfig } from '@/config/clients'
import { AnimatedButton } from '@/components/ui/animated-button'
import {
  AnimatedCard,
  AnimatedCardContent,
  AnimatedCardDescription,
  AnimatedCardHeader,
  AnimatedCardTitle,
} from '@/components/ui/animated-card'
import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import {
  StaggerContainer,
  StaggerItem,
} from '@/components/animations/StaggerContainer'

export default function Home() {
  // For now, default to demo-barber
  // Later, this will be determined by routing/middleware
  const config = getClientConfig('demo-barber')

  if (!config) {
    return <div>Client not found</div>
  }

  return (
    <ThemeProvider config={config}>
      <div className="min-h-screen bg-background">
        {/* Header - Slide down animation */}
        <AnimatedDiv animation="slideDown" className="sticky top-0 z-50">
          <header className="border-b border-border bg-card/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {config.branding.companyName}
                  </h1>
                  {config.branding.tagline && (
                    <p className="text-sm text-muted-foreground">
                      {config.branding.tagline}
                    </p>
                  )}
                </div>
                <AnimatedButton magnetic hoverEffect="scale">
                  Termin buchen
                </AnimatedButton>
              </div>
            </div>
          </header>
        </AnimatedDiv>

        {/* Hero Section - Staggered animations */}
        <section className="container mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <AnimatedDiv animation="slideUp" delay={0.1}>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
                Willkommen bei {config.branding.companyName}
              </h2>
            </AnimatedDiv>

            <AnimatedDiv animation="slideUp" delay={0.2}>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
                {config.seo.description}
              </p>
            </AnimatedDiv>

            <AnimatedDiv animation="slideUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton
                  size="lg"
                  magnetic
                  hoverEffect="scale"
                  className="text-lg px-8"
                >
                  Jetzt buchen
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  hoverEffect="lift"
                  className="text-lg px-8"
                >
                  Mehr erfahren
                </AnimatedButton>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* Features Grid - Stagger container */}
        <section className="container mx-auto px-4 py-24 bg-muted/30">
          <AnimatedDiv animation="slideUp">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              Unsere Services
            </h3>
          </AnimatedDiv>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <StaggerItem>
              <AnimatedCard className="h-full">
                <AnimatedCardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <AnimatedCardTitle className="text-xl">
                    Online Buchung
                  </AnimatedCardTitle>
                  <AnimatedCardDescription>
                    Buche deinen Termin rund um die Uhr online
                  </AnimatedCardDescription>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <p className="text-sm text-muted-foreground">
                    Einfach, schnell und bequem - wähle deinen Wunschtermin aus
                    unserem Kalender.
                  </p>
                </AnimatedCardContent>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full">
                <AnimatedCardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <AnimatedCardTitle className="text-xl">
                    WhatsApp Service
                  </AnimatedCardTitle>
                  <AnimatedCardDescription>
                    Schreib uns direkt per WhatsApp
                  </AnimatedCardDescription>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <p className="text-sm text-muted-foreground">
                    Schnelle Antworten auf deine Fragen - 24/7 verfügbar.
                  </p>
                </AnimatedCardContent>
              </AnimatedCard>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCard className="h-full">
                <AnimatedCardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <AnimatedCardTitle className="text-xl">
                    Erfahrene Profis
                  </AnimatedCardTitle>
                  <AnimatedCardDescription>
                    Meisterbetrieb mit jahrelanger Erfahrung
                  </AnimatedCardDescription>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <p className="text-sm text-muted-foreground">
                    Unser Team sorgt dafür, dass du dich wohlfühlst.
                  </p>
                </AnimatedCardContent>
              </AnimatedCard>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* Contact Section - Fade in from bottom */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="scaleUp" className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                <h3 className="text-3xl font-bold text-foreground mb-8">
                  Kontakt
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">📞</span>
                    <div>
                      <p className="font-semibold text-foreground">Telefon</p>
                      <p>{config.contact.phone}</p>
                    </div>
                  </div>

                  {config.contact.whatsapp && (
                    <div className="flex items-start gap-3">
                      <span className="text-primary mt-1">💬</span>
                      <div>
                        <p className="font-semibold text-foreground">
                          WhatsApp
                        </p>
                        <p>{config.contact.whatsapp}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">✉️</span>
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p>{config.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-primary mt-1">📍</span>
                    <div>
                      <p className="font-semibold text-foreground">Adresse</p>
                      <p>
                        {config.contact.address.street}
                        <br />
                        {config.contact.address.zip} {config.contact.address.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <AnimatedButton
                    className="w-full"
                    size="lg"
                    magnetic
                    hoverEffect="glow"
                  >
                    Jetzt Kontakt aufnehmen
                  </AnimatedButton>
                </div>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* Footer - Fade in */}
        <AnimatedDiv animation="fade">
          <footer className="border-t border-border py-12 bg-muted/30">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              <p>
                © 2025 {config.branding.companyName}. Alle Rechte vorbehalten.
              </p>
            </div>
          </footer>
        </AnimatedDiv>
      </div>
    </ThemeProvider>
  )
}
