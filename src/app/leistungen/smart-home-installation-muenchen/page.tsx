import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/SchemaMarkup'
import { FAQSection } from '@/components/seo/FAQSection'
import { Header } from '@/components/layout/Header'
import { ElectricianLogo } from '@/components/ElectricianLogo'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { SystemShowcase } from '@/components/system-showcase'
import { MonthlyBillChart } from '@/components/charts/MonthlyBillChart'
import { SystemPriceChart } from '@/components/charts/SystemPriceChart'
import { PaybackChart } from '@/components/charts/PaybackChart'
import { SystemComparisonChart } from '@/components/charts/SystemComparisonChart'
import { FunnelTriggerButton } from '@/components/funnel/FunnelTriggerButton'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Lightbulb, Shield, Zap, Check, ArrowRight, Phone, Clock, MapPin, Star, Award, Mail } from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Smart Home Installation München | KNX & Loxone Partner | Müller Elektrotechnik',
  description: 'Smart Home nachrüsten in München. ✓ KNX & Loxone ✓ Kostenlose Planung ✓ VDE-zertifiziert ✓ 15 Jahre Erfahrung. Jetzt beraten lassen!',
  keywords: 'smart home münchen, smart home installation, knx münchen, loxone münchen, smart home nachrüsten',
  openGraph: {
    title: 'Smart Home Installation München | KNX & Loxone Partner',
    description: 'Smart Home nachrüsten in München. VDE-zertifiziert. Jetzt beraten lassen!',
    url: 'https://mueller-elektro.de/leistungen/smart-home-installation-muenchen',
    type: 'website',
  }
}

const ceoProfile = {
  name: 'Thomas Müller',
  title: 'Geschäftsführer & Elektrotechnikermeister',
  phone: '+49 89 1234 5678',
  email: 'thomas.mueller@mueller-elektro.de',
  whatsapp: '+4989123456789'
}

export default function SmartHomeInstallationPage() {
  const breadcrumbItems = [
    { name: 'Leistungen', url: '/#services' },
    { name: 'Smart Home Installation München', url: '/leistungen/smart-home-installation-muenchen' }
  ]

  const faqItems = [
    {
      question: 'Was kostet eine Smart Home Installation in München?',
      answer: 'Die Kosten variieren je nach Umfang und gewähltem System. Nach einer kostenlosen Vor-Ort-Beratung erstellen wir Ihnen ein individuelles Angebot mit transparenter Festpreisgarantie. Rufen Sie uns an oder schreiben Sie uns per WhatsApp für einen unverbindlichen Beratungstermin.'
    },
    {
      question: 'Kann ich Smart Home in meinem Altbau nachrüsten?',
      answer: 'Ja! In München haben wir über 150 Altbauwohnungen erfolgreich mit Smart Home Technologie nachgerüstet. Moderne Funksysteme wie Loxone oder Z-Wave ermöglichen die Installation ohne aufwendige Kabelverlegung. Unsere Elektriker kennen die Besonderheiten Münchner Altbauten.'
    },
    {
      question: 'Welches Smart Home System ist das beste für mich?',
      answer: 'Die Wahl hängt von Ihren Anforderungen ab: KNX bietet maximale Flexibilität, Loxone überzeugt durch intuitive Bedienung. Als zertifizierte Partner beider Systeme beraten wir Sie objektiv und finden die beste Lösung für Ihre Situation.'
    },
    {
      question: 'Wie lange dauert die Smart Home Installation?',
      answer: 'Die Dauer hängt vom Umfang ab. Ein Basis-System ist in 2-3 Werktagen installiert, umfassende KNX-Installationen benötigen je nach Größe 1-2 Wochen. Nach der Installation folgt eine ausführliche Einweisung.'
    },
    {
      question: 'Gibt es Förderungen für Smart Home in München?',
      answer: 'Ja! Über KfW-Programme können Sie Zuschüsse für Smart Home Systeme erhalten, besonders wenn diese zur Energieeffizienz beitragen. Wir beraten Sie zu verfügbaren Fördermitteln und unterstützen bei der Antragstellung.'
    }
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://mueller-elektro.de/' },
        { name: 'Leistungen', url: 'https://mueller-elektro.de/leistungen' },
        { name: 'Smart Home Installation München', url: 'https://mueller-elektro.de/leistungen/smart-home-installation-muenchen' }
      ]} />

      <ServiceSchema
        name="Smart Home Installation"
        description="Professionelle Smart Home Installation in München. KNX, Loxone und Gira Systeme von VDE-zertifizierten Elektrikern."
        provider="Müller Elektrotechnik"
        areaServed="München"
        url="https://mueller-elektro.de/leistungen/smart-home-installation-muenchen"
      />

      <div className="min-h-screen bg-background">
        {/* Enterprise Header */}
        <Header
          businessName="Müller Elektrotechnik"
          tagline="Ihr Meisterbetrieb in München"
          phone={ceoProfile.phone}
          whatsapp={ceoProfile.whatsapp}
          useIconLogo={true}
        />

        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedDiv animation="slideRight" className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">150+ Smart Home Projekte in München</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Smart Home
                    <span className="block text-primary">Installation München</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    KNX, Loxone & moderne Hausautomation – von Ihrem zertifizierten Smart Home Experten Thomas Müller.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FunnelTriggerButton
                    funnelId="smart-home-beratung"
                    className="text-lg px-8"
                    phoneNumber={ceoProfile.phone}
                    whatsappNumber={ceoProfile.whatsapp}
                  >
                    Kostenlose Beratung starten
                  </FunnelTriggerButton>
                  <Button size="lg" variant="outline" className="text-lg px-8 group" asChild>
                    <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo Thomas, ich interessiere mich für eine Smart Home Installation.')}`}>
                      <WhatsAppIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <StaggerContainer className="flex flex-wrap gap-6 pt-4">
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">VDE-zertifiziert</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">KNX Partner</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Loxone Partner</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">15 Jahre Erfahrung</span>
                  </StaggerItem>
                </StaggerContainer>
              </AnimatedDiv>

              <AnimatedDiv animation="slideLeft" delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <AspectRatio ratio={4/3}>
                      <Image
                        src="/demo-electrician/smart-home-service.webp"
                        alt="Smart Home Installation München - KNX und Loxone"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </AspectRatio>
                    {/* Overlay Stats */}
                    <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xl p-4 rounded-xl border border-primary/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">Abgeschlossene Projekte</p>
                          <p className="text-2xl font-bold text-primary">150+</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Kundenzufriedenheit</p>
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                            <p className="text-2xl font-bold">4.9/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4">Smart Home Experte</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Was ist Smart Home Installation?
              </h2>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p>
                  Smart Home Installation verwandelt Ihr Zuhause in ein intelligentes, vernetztes System. Als VDE-zertifizierte Elektriker in München installieren wir Systeme wie <Link href="/leistungen/smart-home-installation-muenchen/knx" className="text-primary hover:underline font-medium">KNX</Link> und <Link href="/leistungen/smart-home-installation-muenchen/loxone" className="text-primary hover:underline font-medium">Loxone</Link>, die Beleuchtung, Heizung, Jalousien und Sicherheit zentral steuern.
                </p>

                <p>
                  Mit über 150 realisierten Smart Home Projekten in München kennen wir die Besonderheiten lokaler Immobilien. Vom denkmalgeschützten Altbau in Schwabing bis zur modernen Penthouse-Wohnung – wir finden für jede Situation die passende Lösung.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 py-6">
                  <div className="p-4 rounded-xl bg-background border border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Komfort</h3>
                    <p className="text-sm">Steuern Sie Ihr Zuhause zentral per App oder Sprachbefehl.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Energieeffizienz</h3>
                    <p className="text-sm">Intelligente Steuerung spart bis zu 30% Heizkosten.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-primary/20">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">Sicherheit</h3>
                    <p className="text-sm">Anwesenheitssimulation und Remote-Überwachung.</p>
                  </div>
                </div>

                <p>
                  Als <strong className="text-foreground">KNX Partner</strong> und <strong className="text-foreground">Loxone Silver Partner</strong> bieten wir herstellerunabhängige Beratung und finden die beste Lösung für Ihre Situation.
                </p>
              </div>
            </AnimatedDiv>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Unser Prozess</Badge>
              <h2 className="text-4xl font-bold mb-4">So läuft Ihre Smart Home Installation ab</h2>
              <p className="text-xl text-muted-foreground">Von der Beratung bis zur Einweisung – in 4 Schritten zum smarten Zuhause</p>
            </AnimatedDiv>

            <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Kostenlose Beratung',
                  description: 'Vor Ort oder online besprechen wir Ihre Wünsche und zeigen Möglichkeiten.',
                  time: '60-90 Minuten'
                },
                {
                  step: '02',
                  title: 'Planung & Angebot',
                  description: 'Detaillierter Installationsplan und transparentes Festpreis-Angebot.',
                  time: 'Innerhalb 48h'
                },
                {
                  step: '03',
                  title: 'Installation',
                  description: 'VDE-zertifizierte Elektriker installieren Ihr Smart Home System.',
                  time: '2-5 Werktage'
                },
                {
                  step: '04',
                  title: 'Einweisung & Support',
                  description: 'Ausführliche Schulung aller Funktionen plus dauerhafter Support.',
                  time: 'Inklusive'
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="p-8 h-full border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="text-6xl font-bold text-primary/10 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-primary">{item.time}</div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Bereit für Ihr Smart Home?</h2>
              <p className="text-xl opacity-90">
                In nur 2 Minuten erfahren Sie, welches System zu Ihnen passt und was es kostet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <FunnelTriggerButton
                  funnelId="smart-home-beratung"
                  variant="secondary"
                  className="text-lg px-8"
                  phoneNumber={ceoProfile.phone}
                  whatsappNumber={ceoProfile.whatsapp}
                >
                  Jetzt Beratung starten
                </FunnelTriggerButton>
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}`}>
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Antwort innerhalb 2 Stunden</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ganz München & Umland</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Services - Visual System Showcase */}
        <SystemShowcase
          title="Welches System passt zu Ihnen?"
          subtitle="Wir beraten herstellerunabhängig und finden das perfekte System für Ihre Anforderungen"
          systems={[
            {
              name: 'KNX',
              tagline: 'Der weltweite Standard für maximale Flexibilität',
              image: '/demo-electrician/knx-service.jpg',
              priceRange: 'ab 8.000€',
              highlights: [
                '500+ kompatible Hersteller',
                'Höchste Zukunftssicherheit',
                'Ideal für Neubauten',
                'Maximale Anpassbarkeit'
              ],
              href: '/leistungen/smart-home-installation-muenchen/knx',
              accentColor: 'blue',
              badge: 'Premium'
            },
            {
              name: 'Loxone',
              tagline: 'Alles aus einer Hand – besonders einfach zu bedienen',
              image: '/demo-electrician/loxone-service.jpg',
              priceRange: 'ab 6.000€',
              highlights: [
                '20-30% günstiger als KNX',
                'Intuitive App-Steuerung',
                'Perfekt für Nachrüstung',
                'Schnelle Installation'
              ],
              href: '/leistungen/smart-home-installation-muenchen/loxone',
              accentColor: 'green',
              badge: 'Beliebteste Wahl'
            },
            {
              name: 'Beleuchtung',
              tagline: 'Perfektes Licht für jeden Moment – per Knopfdruck',
              image: '/demo-electrician/lighting-service.jpg',
              priceRange: 'ab 1.500€',
              highlights: [
                'Bis zu 80% Energieeinsparung',
                'Szenen & Dimmung',
                'Präsenzerkennung',
                'RGB & Circadian Lighting'
              ],
              href: '/leistungen/smart-home-installation-muenchen/beleuchtung',
              accentColor: 'amber'
            }
          ]}
        />

        {/* Data Visualization Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Daten & Fakten</Badge>
              <h2 className="text-4xl font-bold mb-4">Was kostet Smart Home wirklich?</h2>
              <p className="text-xl text-muted-foreground">Echte Zahlen für Ihre Entscheidung – keine abstrakten Prozente</p>
            </AnimatedDiv>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Monthly Bill - What users REALLY care about */}
              <AnimatedDiv animation="slideUp" delay={0.1}>
                <Card className="p-6 h-full">
                  <MonthlyBillChart
                    title="So viel sparen Sie jeden Monat"
                    description="Durchschnittlicher Haushalt in München (4 Personen)"
                    withoutSmartHome={320}
                    withSmartHome={195}
                  />
                </Card>
              </AnimatedDiv>

              {/* System Prices - Real costs */}
              <AnimatedDiv animation="slideUp" delay={0.2}>
                <Card className="p-6 h-full">
                  <SystemPriceChart
                    title="Was kosten die Systeme?"
                    description="Komplettpreise für ein Einfamilienhaus (120-150m²)"
                  />
                </Card>
              </AnimatedDiv>

              {/* Payback Timeline - Full Width */}
              <AnimatedDiv animation="slideUp" delay={0.3} className="lg:col-span-2">
                <Card className="p-6">
                  <PaybackChart
                    title="Wann haben Sie Ihre Investition wieder raus?"
                    description="Am Beispiel einer €12.000 Smart Home Installation"
                    investment={12000}
                    annualSavings={1500}
                    years={15}
                  />
                </Card>
              </AnimatedDiv>

              {/* System Comparison - KNX vs Loxone */}
              <AnimatedDiv animation="slideUp" delay={0.4} className="lg:col-span-2">
                <Card className="p-6">
                  <SystemComparisonChart
                    title="KNX oder Loxone – was passt zu Ihnen?"
                    description="Stärken beider Systeme im direkten Vergleich"
                  />
                </Card>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="bg-background">
          <FAQSection
            title="Häufig gestellte Fragen"
            items={faqItems}
          />
        </div>

        {/* Related Services - With Images */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Weitere Leistungen</h2>
              <p className="text-muted-foreground">Entdecken Sie unser vollständiges Angebot</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Elektroinstallation',
                  description: 'Neubau & Sanierung vom Meister',
                  link: '/leistungen/elektroinstallation-muenchen',
                  icon: Zap,
                  image: '/demo-electrician/installation-service.webp', // Shows: electrician hands on panel
                  imagePosition: 'object-center'
                },
                {
                  name: 'E-Mobilität',
                  description: 'Wallbox & Ladeinfrastruktur',
                  link: '/leistungen/e-mobilitaet-muenchen',
                  icon: Zap,
                  image: '/demo-electrician/ev-charging-service.webp', // Shows: EV charging
                  imagePosition: 'object-center'
                },
                {
                  name: 'Sicherheitstechnik',
                  description: 'Alarmanlagen & Videoüberwachung',
                  link: '/leistungen/sicherheitstechnik-muenchen',
                  icon: Shield,
                  image: '/demo-electrician/security-service.webp', // Shows: smart door lock
                  imagePosition: 'object-center'
                }
              ].map((item) => (
                <Link key={item.link} href={item.link} className="group">
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 p-0 gap-0">
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${item.imagePosition}`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-lg">
                          <item.icon className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-primary transition-colors">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="flex items-center gap-1 mt-2 text-sm text-primary font-medium">
                        <span>Mehr erfahren</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 py-16 border-t">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <div className="mb-6">
                  <ElectricianLogo
                    businessName="Müller Elektrotechnik"
                    tagline="VDE-zertifizierter Meisterbetrieb"
                    size="lg"
                  />
                </div>
                <p className="text-muted-foreground mb-6">
                  Ihr persönlicher Partner für moderne Elektrotechnik und Smart Home Installation in München.
                </p>
                <div className="flex gap-3">
                  <Button size="icon" variant="outline" asChild>
                    <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href={`mailto:${ceoProfile.email}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="icon" variant="outline" asChild>
                    <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}`}>
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Smart Home</h3>
                <div className="space-y-3 text-sm">
                  <Link href="/leistungen/smart-home-installation-muenchen/knx" className="block text-muted-foreground hover:text-primary transition-colors">
                    KNX Installation
                  </Link>
                  <Link href="/leistungen/smart-home-installation-muenchen/loxone" className="block text-muted-foreground hover:text-primary transition-colors">
                    Loxone Installation
                  </Link>
                  <Link href="/leistungen/smart-home-installation-muenchen/beleuchtung" className="block text-muted-foreground hover:text-primary transition-colors">
                    Beleuchtungssteuerung
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-lg">Kontakt</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Musterstraße 123<br />80331 München</p>
                  <p>Tel: {ceoProfile.phone}</p>
                  <p>E-Mail: {ceoProfile.email}</p>
                  <p className="font-semibold text-foreground pt-2">
                    Mo-Fr: 7:00 - 18:00 Uhr<br />
                    <span className="text-primary">24/7 Notdienst verfügbar</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; 2025 Müller Elektrotechnik. Alle Rechte vorbehalten.</p>
              <div className="mt-4 space-x-6">
                <a href="#" className="hover:text-primary transition-colors">Impressum</a>
                <a href="#" className="hover:text-primary transition-colors">Datenschutz</a>
                <a href="#" className="hover:text-primary transition-colors">AGB</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
