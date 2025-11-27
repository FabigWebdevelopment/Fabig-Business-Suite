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
  Shield, Lock, Camera, Bell, AlertTriangle, Check, ArrowRight,
  Phone, Clock, MapPin, Star, Award, Mail, Zap, Home,
  Eye, Wifi, Smartphone, Quote, TrendingDown
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sicherheitstechnik München | Alarmanlagen & Videoüberwachung | Müller Elektrotechnik',
  description: 'Sicherheitstechnik vom Meisterbetrieb in München. ✓ Alarmanlagen ✓ Videoüberwachung ✓ Zutrittskontrolle ✓ Smart Home Integration. Jetzt beraten lassen!',
  keywords: 'sicherheitstechnik münchen, alarmanlage münchen, videoüberwachung münchen, einbruchschutz, smart home sicherheit',
  openGraph: {
    title: 'Sicherheitstechnik München | Alarmanlagen & Videoüberwachung',
    description: 'Professionelle Sicherheitstechnik vom Meisterbetrieb. Alarmanlagen, Videoüberwachung und Smart Home Sicherheit.',
    url: 'https://mueller-elektro.de/leistungen/sicherheitstechnik-muenchen',
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

// Testimonials - Social proof is critical for security purchases
const testimonials = [
  {
    quote: 'Nach dem Einbruch bei unseren Nachbarn war klar: Wir brauchen eine Alarmanlage. Thomas hat alles schnell und sauber installiert. Endlich schlafen wir wieder ruhig.',
    name: 'Familie Weber',
    location: 'München-Schwabing',
    rating: 5
  },
  {
    quote: 'Die App-Steuerung ist genial. Im Urlaub sehe ich sofort, wenn der Paketbote kommt. Und die Kinder können sich nicht mehr unbemerkt davonschleichen.',
    name: 'Stefan B.',
    location: 'München-Bogenhausen',
    rating: 5
  },
  {
    quote: 'Herr Müller hat uns die Schwachstellen an unserem Altbau gezeigt - wir waren schockiert. Jetzt fühlen wir uns sicher. Faire Preise, top Service.',
    name: 'Maria K.',
    location: 'München-Sendling',
    rating: 5
  }
]

export default function SicherheitstechnikPage() {
  const breadcrumbItems = [
    { name: 'Leistungen', url: '/#services' },
    { name: 'Sicherheitstechnik München', url: '/leistungen/sicherheitstechnik-muenchen' }
  ]

  const faqItems = [
    {
      question: 'Was kostet eine Alarmanlage für mein Haus?',
      answer: 'Basis-Systeme starten ab €2.000, Premium mit Video ab €5.000. Nach einer kostenlosen Beratung erhalten Sie ein Festpreis-Angebot.'
    },
    {
      question: 'Kann ich die Alarmanlage mit dem Smartphone steuern?',
      answer: 'Ja! Per App sehen Sie Live-Kameras, erhalten Push-Nachrichten bei Alarm und schalten das System scharf/unscharf – von überall.'
    },
    {
      question: 'Wie lange dauert die Installation?',
      answer: 'Basis-Anlagen: 1-2 Tage. Mit Videoüberwachung: 2-4 Tage. Wir arbeiten sauber und hinterlassen keine Baustelle.'
    },
    {
      question: 'Funktioniert die Anlage bei Stromausfall?',
      answer: 'Ja! Alle Systeme haben Notstrom-Akkus, die mehrere Stunden überbrücken. Bei Bedarf installieren wir eine USV.'
    },
    {
      question: 'Brauche ich das wirklich?',
      answer: '85% aller Einbrecher brechen ab, wenn eine Alarmanlage auslöst. Die Frage ist nicht ob, sondern wann – bevor oder nach einem Einbruch.'
    }
  ]

  // Images verified against IMAGE_CATALOG.md (2025-11-27)
  // imagePosition: object-top for images with people, object-center for objects/technical
  const services = [
    {
      icon: Bell,
      title: 'Alarmanlagen',
      benefit: 'Einbrecher abschrecken, Familie schützen',
      description: 'Einbruchmeldeanlagen nach VdS-Standard für maximalen Schutz.',
      features: ['Funk- und Hybridsysteme', 'Bewegungs- und Öffnungsmelder', 'Außenhaut- und Innenraumüberwachung'],
      image: '/demo-electrician/security-alarm-panel.webp', // Shows: alarm control panel with touchscreen
      imagePosition: 'object-center'
    },
    {
      icon: Camera,
      title: 'Videoüberwachung',
      benefit: 'Immer wissen, was zuhause passiert',
      description: 'HD-Kameras für Innen und Außen mit Nachtsicht und App-Zugriff.',
      features: ['4K-Auflösung verfügbar', 'Nachtsicht bis 30m', 'Cloud oder lokale Speicherung'],
      image: '/demo-electrician/security-camera-dome.webp', // Shows: dome security camera on exterior wall
      imagePosition: 'object-center'
    },
    {
      icon: Lock,
      title: 'Zutrittskontrolle',
      benefit: 'Nie wieder Schlüssel suchen',
      description: 'Elektronische Schließsysteme und smarte Türschlösser.',
      features: ['Fingerprint & PIN-Code', 'Transponder-Systeme', 'Protokollierung aller Zutritte'],
      image: '/demo-electrician/security-fingerprint-lock.webp', // Shows: fingerprint door lock with keypad
      imagePosition: 'object-center'
    },
    {
      icon: AlertTriangle,
      title: 'Brandschutz',
      benefit: 'Leben retten, Eigentum schützen',
      description: 'Rauchmelder und Brandmeldeanlagen für Ihre Sicherheit.',
      features: ['Vernetzte Rauchmelder', 'Wärmemelder für Küche', 'Integration in Alarmanlage'],
      image: '/demo-electrician/security-smoke-detector.webp', // Shows: smoke detector on ceiling
      imagePosition: 'object-center'
    }
  ]

  const stats = [
    { value: '200+', label: 'Installierte Anlagen' },
    { value: '24/7', label: 'Überwachung möglich' },
    { value: '< 2h', label: 'Reaktionszeit' }
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://mueller-elektro.de/' },
        { name: 'Leistungen', url: 'https://mueller-elektro.de/leistungen' },
        { name: 'Sicherheitstechnik München', url: 'https://mueller-elektro.de/leistungen/sicherheitstechnik-muenchen' }
      ]} />

      <ServiceSchema
        name="Sicherheitstechnik"
        description="Professionelle Sicherheitstechnik in München. Alarmanlagen, Videoüberwachung und Zutrittskontrolle vom VDE-zertifizierten Meisterbetrieb."
        provider="Müller Elektrotechnik"
        areaServed="München"
        url="https://mueller-elektro.de/leistungen/sicherheitstechnik-muenchen"
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

        {/* Hero Section - Specific, Benefit-Focused */}
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
                  {/* Specific Headline - Clear Value Proposition */}
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Einbruchschutz für
                    <span className="block text-primary">München & Umland</span>
                  </h1>
                  {/* Benefit-Focused Subheadline */}
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Endlich wieder ruhig schlafen. Professionelle Alarmanlagen und Videoüberwachung –
                    <span className="text-foreground font-medium"> installiert in 1-3 Tagen, mit Festpreis-Garantie.</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FunnelTriggerButton
                    funnelId="sicherheit-beratung"
                    className="text-lg px-8 shadow-lg"
                    phoneNumber={ceoProfile.phone}
                    whatsappNumber={ceoProfile.whatsapp}
                  >
                    Kostenlose Sicherheitsberatung
                  </FunnelTriggerButton>
                  <Button size="lg" variant="outline" className="text-lg px-8 group" asChild>
                    <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo, ich möchte mein Zuhause absichern.')}`}>
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
                    Beratung vor Ort
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    Antwort in 2h
                  </span>
                </div>
              </AnimatedDiv>

              <AnimatedDiv animation="slideLeft" delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <AspectRatio ratio={4/3}>
                      <Image
                        src="/demo-electrician/security-service.webp"
                        alt="Sicherheitstechnik München - Alarmanlagen und Videoüberwachung"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </AspectRatio>
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xl p-4 rounded-xl border border-primary/20">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
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
                  <p className="font-bold">VdS-anerkannt</p>
                  <p className="text-sm text-muted-foreground">Geprüfte Sicherheit</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-bold">ABUS Partner</p>
                  <p className="text-sm text-muted-foreground">Premium Marken</p>
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
                <TrendingDown className="h-8 w-8 text-destructive" />
                <span className="text-sm font-medium text-destructive uppercase tracking-wide">Die Realität</span>
              </div>
              <p className="text-5xl md:text-6xl font-bold text-destructive mb-4">Alle 3 Minuten</p>
              <p className="text-2xl mb-6">wird in Deutschland eingebrochen.</p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Die meisten Einbrecher brauchen weniger als 3 Minuten, um einzusteigen.
                <span className="text-foreground font-medium"> 85% brechen ab, wenn eine Alarmanlage auslöst.</span>
              </p>
              <Button size="lg" variant="destructive" className="text-lg px-8" asChild>
                <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                  <Shield className="mr-2 h-5 w-5" />
                  Schwachstellen finden lassen
                </a>
              </Button>
            </AnimatedDiv>
          </div>
        </section>

        {/* Services Grid - With Images */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Unsere Sicherheitslösungen</Badge>
              <h2 className="text-4xl font-bold mb-4">Rundum-Schutz für Ihr Eigentum</h2>
              <p className="text-xl text-muted-foreground">Professionelle Sicherheitstechnik – individuell auf Sie abgestimmt</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <AnimatedDiv key={index} animation="slideUp" delay={index * 0.1}>
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow group p-0 gap-0">
                    {/* Service Image - h-56 for more room to show content */}
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
              <p className="text-muted-foreground mb-4">Welche Lösung passt zu Ihnen?</p>
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
              <Badge variant="outline" className="mb-4">Ihr neues Sicherheitsgefühl</Badge>
              <h2 className="text-4xl font-bold mb-4">Stellen Sie sich vor...</h2>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatedDiv animation="slideUp" delay={0.1}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Home className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Urlaub ohne Sorgen</h3>
                  <p className="text-muted-foreground">
                    Sie liegen am Strand. Ein kurzer Blick auf die App: Alles ruhig zuhause.
                    <span className="text-foreground font-medium"> Sie können entspannen.</span>
                  </p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.2}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Nachts ruhig schlafen</h3>
                  <p className="text-muted-foreground">
                    Ein Geräusch? Kurzer Blick aufs Handy – nur die Katze.
                    <span className="text-foreground font-medium"> Zurück zum Träumen.</span>
                  </p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.3}>
                <Card className="p-8 h-full border-primary/20 bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Kinder kommen heim</h3>
                  <p className="text-muted-foreground">
                    Push-Nachricht: &quot;Ben ist zuhause angekommen.&quot;
                    <span className="text-foreground font-medium"> Sie wissen immer Bescheid.</span>
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
              <h2 className="text-4xl font-bold mb-4">Was Münchner Familien sagen</h2>
              <p className="text-muted-foreground">Über 200 zufriedene Kunden in München und Umgebung</p>
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
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Smart Security Features */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Smart Security</Badge>
              <h2 className="text-4xl font-bold mb-4">Sicherheit per App</h2>
              <p className="text-xl text-muted-foreground">Volle Kontrolle – jederzeit und überall</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <AnimatedDiv animation="slideUp" delay={0.1}>
                <Card className="p-8 text-center h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Live-Ansicht</h3>
                  <p className="text-muted-foreground">Sehen Sie jederzeit live, was zu Hause passiert – per Smartphone oder Tablet.</p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.2}>
                <Card className="p-8 text-center h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Bell className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Push-Benachrichtigung</h3>
                  <p className="text-muted-foreground">Sofortige Benachrichtigung bei Bewegung, Öffnung oder Alarm – auch im Urlaub.</p>
                </Card>
              </AnimatedDiv>

              <AnimatedDiv animation="slideUp" delay={0.3}>
                <Card className="p-8 text-center h-full border-primary/20 hover:border-primary/40 transition-colors">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Wifi className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Smart Home Integration</h3>
                  <p className="text-muted-foreground">Verbinden Sie Ihre Alarmanlage mit Licht, Rollläden und Heizung für mehr Komfort.</p>
                </Card>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Unser Prozess</Badge>
              <h2 className="text-4xl font-bold mb-4">In 4 Schritten zur sicheren Immobilie</h2>
              <p className="text-muted-foreground">Über 200 Mal erfolgreich durchgeführt</p>
            </AnimatedDiv>

            <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: '01',
                  title: 'Sicherheitsanalyse',
                  description: 'Wir identifizieren Schwachstellen an Ihrer Immobilie.',
                  time: 'Kostenlos vor Ort',
                  emotion: 'Klarheit bekommen'
                },
                {
                  step: '02',
                  title: 'Konzept & Angebot',
                  description: 'Sie erhalten ein Festpreis-Angebot ohne versteckte Kosten.',
                  time: 'Innerhalb 48h',
                  emotion: 'Genau wissen, was kommt'
                },
                {
                  step: '03',
                  title: 'Installation',
                  description: 'Saubere, professionelle Montage ohne Baustellen-Chaos.',
                  time: '1-3 Werktage',
                  emotion: 'Zurücklehnen'
                },
                {
                  step: '04',
                  title: 'Einweisung & Support',
                  description: 'Sie verstehen jede Funktion. Bei Fragen sind wir da.',
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

        {/* Main CTA Section - After Process */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ihr Zuhause hat Schwachstellen.<br />Wir finden sie.</h2>
              <p className="text-xl opacity-90">
                In nur 2 Minuten sagen Sie uns, was Sie brauchen – wir melden uns mit
                <span className="font-bold"> einem individuellen Sicherheitskonzept.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <FunnelTriggerButton
                  funnelId="sicherheit-beratung"
                  variant="secondary"
                  className="text-lg px-8"
                  phoneNumber={ceoProfile.phone}
                  whatsappNumber={ceoProfile.whatsapp}
                >
                  Jetzt Beratung starten
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
                  <span>Ganz München & Umland</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="bg-muted/30">
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
                  name: 'Smart Home',
                  description: 'Ihr Zuhause intelligent vernetzen',
                  link: '/leistungen/smart-home-installation-muenchen',
                  icon: Home,
                  image: '/demo-electrician/smart-home-service.webp',
                  imagePosition: 'object-top'
                },
                {
                  name: 'Elektroinstallation',
                  description: 'Neubau & Sanierung vom Meister',
                  link: '/leistungen/elektroinstallation-muenchen',
                  icon: Zap,
                  image: '/demo-electrician/installation-service.webp',
                  imagePosition: 'object-center'
                },
                {
                  name: 'E-Mobilität',
                  description: 'Wallbox & Ladeinfrastruktur',
                  link: '/leistungen/e-mobilitaet-muenchen',
                  icon: Zap,
                  image: '/demo-electrician/ev-charging-service.webp',
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
                  Ihr persönlicher Partner für Sicherheitstechnik in München – Schutz und Sicherheit seit 2009.
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
                  <Link href="/leistungen/elektroinstallation-muenchen" className="block text-muted-foreground hover:text-primary transition-colors">
                    Elektroinstallation
                  </Link>
                  <Link href="/leistungen/e-mobilitaet-muenchen" className="block text-muted-foreground hover:text-primary transition-colors">
                    E-Mobilität & Wallbox
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
