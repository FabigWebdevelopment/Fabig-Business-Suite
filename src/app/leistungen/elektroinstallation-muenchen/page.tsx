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
import { FunnelTriggerButton } from '@/components/funnel/FunnelTriggerButton'
import Link from 'next/link'
import Image from 'next/image'
import {
  Zap, Shield, Home, Check, ArrowRight, Phone,
  Clock, MapPin, Star, Award, Mail, Wrench, Building,
  FileCheck, HardHat, AlertTriangle, Quote, Flame,
  CircleSlash, TrendingDown
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elektroinstallation München | VDE-Meisterbetrieb | Müller Elektrotechnik',
  description: 'Elektroinstallation in München vom Meisterbetrieb. ✓ Neubau & Sanierung ✓ VDE-zertifiziert ✓ Festpreisgarantie ✓ 500+ Projekte. Jetzt beraten lassen!',
  keywords: 'elektroinstallation münchen, elektriker münchen, elektro neubau, elektro sanierung, vde elektriker',
  openGraph: {
    title: 'Elektroinstallation München | VDE-Meisterbetrieb',
    description: 'Professionelle Elektroinstallation vom Meisterbetrieb. VDE-zertifiziert. Jetzt beraten lassen!',
    url: 'https://mueller-elektro.de/leistungen/elektroinstallation-muenchen',
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

// Testimonials - Social proof for big investment decisions
const testimonials = [
  {
    quote: 'Komplette Sanierung im Altbau – Thomas hat alles sauber geplant und termingerecht umgesetzt. Der Festpreis wurde eingehalten. Absolut empfehlenswert!',
    name: 'Familie Schneider',
    location: 'München-Haidhausen',
    project: 'Altbausanierung',
    rating: 5
  },
  {
    quote: 'Neubau mit Smart Home Vorbereitung. Die Beratung war super, die Ausführung top. Besonders die saubere Arbeit hat uns beeindruckt.',
    name: 'Michael & Sandra K.',
    location: 'München-Trudering',
    project: 'Neubau EFH',
    rating: 5
  },
  {
    quote: 'Nach 40 Jahren wurde es Zeit für neue Leitungen. Herr Müller hat uns die Gefahren erklärt und alles professionell erneuert. Endlich keine Angst mehr!',
    name: 'Renate B.',
    location: 'München-Sendling',
    project: 'Komplettsanierung',
    rating: 5
  }
]

export default function ElektroinstallationPage() {
  const breadcrumbItems = [
    { name: 'Leistungen', url: '/#services' },
    { name: 'Elektroinstallation München', url: '/leistungen/elektroinstallation-muenchen' }
  ]

  const faqItems = [
    {
      question: 'Was kostet eine Elektroinstallation im Neubau?',
      answer: 'Die Kosten für eine komplette Elektroinstallation im Neubau liegen typischerweise bei 3-5% der Baukosten. Für ein Einfamilienhaus (120-150m²) rechnen Sie mit ca. €8.000-15.000 je nach Ausstattung. Nach einer kostenlosen Vor-Ort-Beratung erstellen wir Ihnen ein detailliertes Festpreis-Angebot.'
    },
    {
      question: 'Wie lange dauert eine Elektroinstallation?',
      answer: 'Bei einem Neubau (Einfamilienhaus) dauert die Rohinstallation etwa 1-2 Wochen, die Fertigmontage nach Malerarbeiten weitere 3-5 Tage. Bei Sanierungen hängt die Dauer vom Umfang ab – von wenigen Tagen bis zu 2-3 Wochen.'
    },
    {
      question: 'Arbeiten Sie auch in bewohnten Räumen?',
      answer: 'Ja, wir führen auch Sanierungen in bewohnten Immobilien durch. Wir arbeiten sauber, staubarm und koordinieren die Arbeiten so, dass Sie minimal beeinträchtigt werden. Abends ist alles aufgeräumt und provisorisch angeschlossen.'
    },
    {
      question: 'Brauche ich eine Genehmigung für Elektroarbeiten?',
      answer: 'Elektroarbeiten an der Hausinstallation dürfen nur von zugelassenen Fachbetrieben ausgeführt werden. Als VDE-zertifizierter Meisterbetrieb führen wir alle Arbeiten normgerecht aus und erstellen die erforderlichen Prüfprotokolle für Versicherung und Behörden.'
    },
    {
      question: 'Bieten Sie auch Kleinreparaturen an?',
      answer: 'Selbstverständlich! Von der defekten Steckdose bis zum Sicherungswechsel – wir sind auch für kleine Arbeiten da. Unser Notdienst ist 24/7 erreichbar für dringende Probleme wie Stromausfälle oder Kurzschlüsse.'
    }
  ]

  // Images verified against IMAGE_CATALOG.md
  // imagePosition: object-top for images with people, object-center for objects/technical
  const services = [
    {
      icon: Building,
      title: 'Neubau-Installation',
      benefit: 'Perfekt geplant von Anfang an',
      description: 'Komplette Elektroplanung und -installation für Ihr neues Zuhause oder Gewerbe.',
      features: ['Elektroplanung nach Ihren Wünschen', 'Koordination mit anderen Gewerken', 'Smart Home vorbereitet'],
      image: '/demo-electrician/process-step-2-planung.webp', // Shows: floor plans, technical drawings
      imagePosition: 'object-center'
    },
    {
      icon: Wrench,
      title: 'Sanierung & Modernisierung',
      benefit: 'Alte Leitungen raus, Sicherheit rein',
      description: 'Erneuerung alter Elektrik – sicher, normgerecht und zukunftsfähig.',
      features: ['Altbausanierung mit Fingerspitzengefühl', 'Austausch veralteter Leitungen', 'Nachrüsten von Schutzschaltern'],
      image: '/demo-electrician/installation-service.webp', // Shows: electrician hands on panel
      imagePosition: 'object-center'
    },
    {
      icon: Shield,
      title: 'Sicherheitsprüfung (E-Check)',
      benefit: 'Gewissheit über den Zustand Ihrer Anlage',
      description: 'Regelmäßige Überprüfung Ihrer Elektroanlage für maximale Sicherheit.',
      features: ['VDE-normgerechte Prüfung', 'Prüfprotokoll für Versicherung', 'Mängelbeseitigung'],
      image: '/demo-electrician/echeck-inspection.webp', // Shows: multimeter, electrical panel, inspection equipment
      imagePosition: 'object-center'
    },
    {
      icon: Zap,
      title: 'Zählerschrank & Unterverteiler',
      benefit: 'Das Herz Ihrer Elektrik – modern und sicher',
      description: 'Installation und Modernisierung von Verteilungen nach aktuellen Normen.',
      features: ['Erweiterung bei Kapazitätsbedarf', 'Smart Meter Integration', 'Überspannungsschutz'],
      image: '/demo-electrician/knx-service.webp', // Shows: technical wiring, bus systems
      imagePosition: 'object-center'
    }
  ]

  const stats = [
    { value: '500+', label: 'Projekte abgeschlossen' },
    { value: '15+', label: 'Jahre Erfahrung' },
    { value: '100%', label: 'Festpreisgarantie' }
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://mueller-elektro.de/' },
        { name: 'Leistungen', url: 'https://mueller-elektro.de/leistungen' },
        { name: 'Elektroinstallation München', url: 'https://mueller-elektro.de/leistungen/elektroinstallation-muenchen' }
      ]} />

      <ServiceSchema
        name="Elektroinstallation"
        description="Professionelle Elektroinstallation in München. Neubau, Sanierung und Modernisierung von VDE-zertifizierten Elektrikern."
        provider="Müller Elektrotechnik"
        areaServed="München"
        url="https://mueller-elektro.de/leistungen/elektroinstallation-muenchen"
      />

      <div className="min-h-screen bg-background">
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

        {/* Hero Section - Benefit-Focused */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedDiv animation="slideRight" className="space-y-8">
                {/* Google Rating - Trust Signal First */}
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9/5 bei Google (127 Bewertungen)</span>
                </div>

                <div className="space-y-4">
                  {/* Specific Benefit-Focused Headline */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Elektrik, die
                    <span className="block text-primary">ein Leben lang hält</span>
                  </h1>
                  {/* Benefit-Focused Subheadline */}
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Neubau oder Sanierung – als VDE-Meisterbetrieb garantieren wir sichere, normgerechte Installation.
                    <span className="text-foreground font-medium"> Mit Festpreis. Ohne Überraschungen.</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FunnelTriggerButton
                    funnelId="elektro-anfrage"
                    className="text-lg px-8 shadow-lg"
                    phoneNumber={ceoProfile.phone}
                    whatsappNumber={ceoProfile.whatsapp}
                  >
                    Kostenlose Beratung starten
                  </FunnelTriggerButton>
                  <Button size="lg" variant="outline" className="text-lg px-8 group" asChild>
                    <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo, ich brauche eine Elektroinstallation.')}`}>
                      <WhatsAppIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Anxiety Reducer */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Kostenlos & unverbindlich
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Festpreis-Angebot in 48h
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Termine diese Woche frei
                  </span>
                </div>
              </AnimatedDiv>

              <AnimatedDiv animation="slideLeft" delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <AspectRatio ratio={4/3}>
                      <Image
                        src="/demo-electrician/installation-service.webp"
                        alt="Elektroinstallation München - VDE-zertifizierter Meisterbetrieb"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </AspectRatio>
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xl p-4 rounded-xl border border-primary/20">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        {stats.map((stat, index) => (
                          <div key={index}>
                            <p className="text-xl font-bold text-primary">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Trust Bar - Authority Signals */}
        <section className="py-8 border-y bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold">VDE-zertifiziert</p>
                  <p className="text-sm text-muted-foreground">Geprüfte Qualität</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold">Meisterbetrieb</p>
                  <p className="text-sm text-muted-foreground">Höchste Qualifikation</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold">Seit 2009</p>
                  <p className="text-sm text-muted-foreground">15+ Jahre Erfahrung</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Fear Section - Psychological Trigger */}
        <section className="py-16 bg-destructive/5 border-y border-destructive/10">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Flame className="h-8 w-8 text-destructive" />
                <span className="text-sm font-medium text-destructive uppercase tracking-wide">Das Risiko</span>
              </div>
              <p className="text-5xl md:text-6xl font-bold text-destructive mb-4">30% aller Brände</p>
              <p className="text-2xl mb-6">entstehen durch defekte Elektrik.</p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Alte Leitungen, überlastete Sicherungen, fehlende Schutzschalter – in vielen Münchner Altbauten tickt eine Zeitbombe.
                <span className="text-foreground font-medium"> Ein E-Check zeigt, wie es um Ihre Anlage steht.</span>
              </p>
              <Button size="lg" variant="destructive" className="text-lg px-8" asChild>
                <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                  <Shield className="mr-2 h-5 w-5" />
                  Kostenlose Ersteinschätzung
                </a>
              </Button>
            </AnimatedDiv>
          </div>
        </section>

        {/* Services Grid - With Images */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Unsere Leistungen</Badge>
              <h2 className="text-4xl font-bold mb-4">Elektroinstallation für jeden Bedarf</h2>
              <p className="text-xl text-muted-foreground">Vom Neubau bis zur Komplettsanierung – alles aus einer Hand</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <AnimatedDiv key={index} animation="slideUp" delay={index * 0.1}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group p-0 gap-0">
                    {/* Service Image - h-56 for more room to show faces */}
                    <div className="relative h-56 overflow-hidden rounded-t-xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className={`object-cover group-hover:scale-105 transition-transform duration-500 ${service.imagePosition}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                          <service.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                      <p className="text-primary font-medium text-sm mb-3">{service.benefit}</p>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </AnimatedDiv>
              ))}
            </div>

            {/* Mini CTA after Services */}
            <AnimatedDiv animation="slideUp" delay={0.4} className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Welche Installation brauchen Sie?</p>
              <Button size="lg" variant="outline" className="group" asChild>
                <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Jetzt kostenlos beraten lassen
                </a>
              </Button>
            </AnimatedDiv>
          </div>
        </section>

        {/* Transformation Section - Peace of Mind Visualization */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Ihr Ergebnis</Badge>
              <h2 className="text-4xl font-bold mb-4">So fühlt sich sichere Elektrik an</h2>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatedDiv animation="slideUp" delay={0.1}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Sicherheit</h3>
                  <p className="text-muted-foreground">
                    Moderne Schutzschalter, geprüfte Leitungen, aktuelle Normen.
                    <span className="text-foreground font-medium"> Ihre Familie ist geschützt.</span>
                  </p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.2}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <FileCheck className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Dokumentation</h3>
                  <p className="text-muted-foreground">
                    VDE-Prüfprotokoll, Schaltpläne, Gewährleistung.
                    <span className="text-foreground font-medium"> Ihre Versicherung ist zufrieden.</span>
                  </p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.3}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Home className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Zukunftssicher</h3>
                  <p className="text-muted-foreground">
                    Vorbereitet für E-Auto, Smart Home, Wärmepumpe.
                    <span className="text-foreground font-medium"> Keine Nachrüstung nötig.</span>
                  </p>
                </Card>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Social Proof */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Kundenstimmen</Badge>
              <h2 className="text-4xl font-bold mb-4">Was Münchner Bauherren sagen</h2>
              <p className="text-muted-foreground">Über 500 erfolgreiche Projekte in München und Umgebung</p>
            </AnimatedDiv>

            <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <StaggerItem key={index}>
                  <Card className="p-8 h-full hover:shadow-lg transition-shadow">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-muted-foreground mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">{testimonial.project}</Badge>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Unser Prozess</Badge>
              <h2 className="text-4xl font-bold mb-4">So läuft Ihre Installation ab</h2>
              <p className="text-muted-foreground">Transparent und planbar – 500 Mal erfolgreich durchgeführt</p>
            </AnimatedDiv>

            <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Beratung vor Ort',
                  description: 'Wir besprechen Ihre Wünsche und nehmen die Gegebenheiten auf.',
                  time: 'Kostenlos',
                  emotion: 'Klarheit bekommen'
                },
                {
                  step: '02',
                  title: 'Festpreis-Angebot',
                  description: 'Detaillierter Kostenvoranschlag mit allen Leistungen transparent.',
                  time: 'Innerhalb 48h',
                  emotion: 'Genau wissen, was kommt'
                },
                {
                  step: '03',
                  title: 'Installation',
                  description: 'Termingerechte Ausführung durch unsere VDE-zertifizierten Elektriker.',
                  time: 'Nach Vereinbarung',
                  emotion: 'Zurücklehnen'
                },
                {
                  step: '04',
                  title: 'Abnahme & Protokoll',
                  description: 'Gemeinsame Abnahme, Prüfprotokoll und Einweisung.',
                  time: 'Inklusive',
                  emotion: 'Sicher fühlen'
                }
              ].map((item, index) => (
                <StaggerItem key={index}>
                  <Card className="p-8 h-full border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="text-6xl font-bold text-primary/10 mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{item.emotion}</p>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <div className="text-sm font-medium text-primary">{item.time}</div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Main CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Sichere Elektrik beginnt mit einem Gespräch</h2>
              <p className="text-xl opacity-90">
                In nur 2 Minuten erfahren Sie, was Ihr Projekt kostet – mit
                <span className="font-bold"> Festpreis-Garantie.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <FunnelTriggerButton
                  funnelId="elektro-anfrage"
                  variant="secondary"
                  className="text-lg px-8"
                  phoneNumber={ceoProfile.phone}
                  whatsappNumber={ceoProfile.whatsapp}
                >
                  Jetzt Angebot anfordern
                </FunnelTriggerButton>
                <Button size="lg" className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}`}>
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Noch 3 Termine diese Woche frei</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ganz München & 30km Umkreis</span>
                </div>
              </div>
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
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Weitere Leistungen</h2>
              <p className="text-muted-foreground">Entdecken Sie unser vollständiges Angebot</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: 'Smart Home',
                  description: 'Ihr Zuhause intelligent vernetzen',
                  link: '/leistungen/smart-home-installation-muenchen',
                  icon: Home,
                  image: '/demo-electrician/smart-home-service.webp', // Shows: living room with smart home
                  imagePosition: 'object-top'
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
                  Ihr persönlicher Partner für Elektroinstallation in München – Qualität und Sicherheit seit 2009.
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
                <h3 className="font-semibold mb-4 text-lg">Leistungen</h3>
                <div className="space-y-3 text-sm">
                  <Link href="/leistungen/smart-home-installation-muenchen" className="block text-muted-foreground hover:text-primary transition-colors">
                    Smart Home Installation
                  </Link>
                  <Link href="/leistungen/e-mobilitaet-muenchen" className="block text-muted-foreground hover:text-primary transition-colors">
                    E-Mobilität & Wallbox
                  </Link>
                  <Link href="/leistungen/sicherheitstechnik-muenchen" className="block text-muted-foreground hover:text-primary transition-colors">
                    Sicherheitstechnik
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

        {/* Sticky Mobile Phone FAB */}
        <div className="fixed bottom-6 right-6 z-50 lg:hidden">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-2xl animate-pulse hover:animate-none"
            asChild
          >
            <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
              <Phone className="h-7 w-7" />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
