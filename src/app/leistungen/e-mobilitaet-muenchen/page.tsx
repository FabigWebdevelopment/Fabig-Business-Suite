'use client'

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
  Zap, Battery, Car, Leaf, Check, ArrowRight, Phone,
  Clock, MapPin, Star, Award, Mail, Shield, Home, Sun, Gauge,
  Euro, Timer, Smartphone
} from 'lucide-react'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const ceoProfile = {
  name: 'Thomas Müller',
  title: 'Geschäftsführer & Elektrotechnikermeister',
  phone: '+49 89 1234 5678',
  email: 'thomas.mueller@mueller-elektro.de',
  whatsapp: '+4989123456789'
}

export default function EMobilitaetPage() {
  const breadcrumbItems = [
    { name: 'Leistungen', url: '/#services' },
    { name: 'E-Mobilität München', url: '/leistungen/e-mobilitaet-muenchen' }
  ]

  const faqItems = [
    {
      question: 'Was kostet eine Wallbox inklusive Installation?',
      answer: 'Eine komplette Wallbox-Installation kostet je nach Modell und Installationsaufwand zwischen €1.500 und €3.500. Ein Basis-Paket mit 11kW Wallbox, Anmeldung beim Netzbetreiber und Installation starten ab €1.800. Nach einer kostenlosen Vor-Ort-Beratung erstellen wir Ihnen ein Festpreis-Angebot.'
    },
    {
      question: 'Welche Wallbox ist die beste für mich?',
      answer: 'Das hängt von Ihren Anforderungen ab: Für die meisten Haushalte reicht eine 11kW-Wallbox. Diese ist anmeldepflichtig, aber nicht genehmigungspflichtig. 22kW-Boxen laden schneller, benötigen aber eine Genehmigung. Wir beraten Sie neutral zu allen Herstellern wie ABB, Heidelberg, Webasto oder Tesla.'
    },
    {
      question: 'Gibt es noch Förderungen für Wallboxen?',
      answer: 'Die KfW-Förderung für private Wallboxen ist ausgelaufen. Es gibt aber weiterhin regionale Förderprogramme und Förderungen für Unternehmen. Wir informieren Sie über aktuelle Möglichkeiten und unterstützen bei der Antragstellung.'
    },
    {
      question: 'Kann ich die Wallbox mit meiner Solaranlage verbinden?',
      answer: 'Ja! Das ist sogar sehr sinnvoll. Viele Wallboxen können den Überschuss Ihrer PV-Anlage direkt ins Auto laden. So fahren Sie quasi kostenlos mit Sonnenstrom. Wir planen die Integration mit Ihrer bestehenden oder geplanten Solaranlage.'
    },
    {
      question: 'Wie lange dauert die Installation einer Wallbox?',
      answer: 'Die Installation selbst dauert meist nur einen halben bis ganzen Tag. Die Vorlaufzeit für die Anmeldung beim Netzbetreiber beträgt ca. 2-4 Wochen. Von der Bestellung bis zur fertigen Wallbox vergehen typischerweise 3-6 Wochen.'
    },
    {
      question: 'Muss ich die Wallbox beim Netzbetreiber anmelden?',
      answer: '11kW-Wallboxen müssen angemeldet werden (Mitteilungspflicht). 22kW-Wallboxen sind genehmigungspflichtig. Wir übernehmen die komplette Anmeldung für Sie – das ist im Preis inklusive.'
    }
  ]

  const wallboxOptions = [
    {
      name: 'Basis-Paket',
      price: 'ab €1.800',
      power: '11 kW',
      features: ['11kW Wallbox (z.B. Heidelberg)', 'Installation und Anschluss', 'Anmeldung Netzbetreiber', 'Einweisung'],
      highlight: false
    },
    {
      name: 'Smart-Paket',
      price: 'ab €2.400',
      power: '11 kW',
      features: ['11kW Smart-Wallbox mit App', 'Lastmanagement', 'Installation und Anschluss', 'Anmeldung Netzbetreiber', 'Einweisung'],
      highlight: true,
      badge: 'Beliebt'
    },
    {
      name: 'Solar-Paket',
      price: 'ab €3.200',
      power: '11-22 kW',
      features: ['Smart-Wallbox mit PV-Überschussladen', 'Integration Wechselrichter', 'Installation und Anschluss', 'Anmeldung Netzbetreiber', 'Einweisung'],
      highlight: false,
      badge: 'Nachhaltig'
    }
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://mueller-elektro.de/' },
        { name: 'Leistungen', url: 'https://mueller-elektro.de/leistungen' },
        { name: 'E-Mobilität München', url: 'https://mueller-elektro.de/leistungen/e-mobilitaet-muenchen' }
      ]} />

      <ServiceSchema
        name="E-Mobilität & Wallbox Installation"
        description="Professionelle Wallbox Installation in München. E-Auto Ladestationen für Privat und Gewerbe vom VDE-zertifizierten Meisterbetrieb."
        provider="Müller Elektrotechnik"
        areaServed="München"
        url="https://mueller-elektro.de/leistungen/e-mobilitaet-muenchen"
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

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedDiv animation="slideRight" className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Leaf className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Nachhaltig laden – zu Hause</span>
                </div>

                <div className="space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                    Wallbox Installation
                    <span className="block text-primary">München</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Laden Sie Ihr E-Auto bequem zu Hause – bis zu 10x schneller als an der Haushaltssteckdose. Professionelle Installation vom Meisterbetrieb mit Festpreisgarantie.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <FunnelTriggerButton
                    funnelId="wallbox-anfrage"
                    className="text-lg px-8 shadow-lg"
                    phoneNumber={ceoProfile.phone}
                    whatsappNumber={ceoProfile.whatsapp}
                  >
                    Wallbox-Beratung starten
                  </FunnelTriggerButton>
                  <Button size="lg" variant="outline" className="text-lg px-8 group" asChild>
                    <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hallo Thomas, ich interessiere mich für eine Wallbox.')}`}>
                      <WhatsAppIcon className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Urgency */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span>Installation oft schon in 2-3 Wochen · Festpreisgarantie</span>
                </div>

                {/* Trust Indicators */}
                <StaggerContainer className="flex flex-wrap gap-6 pt-4">
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">VDE-zertifiziert</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Alle Hersteller</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">PV-Integration</span>
                  </StaggerItem>
                  <StaggerItem className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">150+ Installationen</span>
                  </StaggerItem>
                </StaggerContainer>
              </AnimatedDiv>

              <AnimatedDiv animation="slideLeft" delay={0.2}>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <AspectRatio ratio={4/3}>
                      <Image
                        src="/demo-electrician/ev-charging-service.webp"
                        alt="Wallbox Installation München - E-Auto laden zu Hause"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </AspectRatio>
                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-xl p-4 rounded-xl border border-primary/20">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-primary">150+</p>
                          <p className="text-xs text-muted-foreground">Installationen</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-primary">10x</p>
                          <p className="text-xs text-muted-foreground">schneller laden</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <p className="text-xl font-bold">4.9</p>
                          </div>
                          <p className="text-xs text-muted-foreground">Google</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Trust Bar - Social Proof Strip */}
        <section className="py-6 bg-muted/50 border-y">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                  <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                </div>
                <span className="font-semibold">4.9/5</span>
                <span className="text-muted-foreground text-sm">(47 Bewertungen)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="font-medium">VDE-zertifiziert</span>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="h-5 w-5 text-primary" />
                <span className="font-medium">150+ Wallboxen installiert</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">München & Umland</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Wallbox Section - Alternating Benefits (Scroll Story) */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16 md:mb-24">
              <Badge variant="outline" className="mb-4">Warum eine Wallbox?</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">Die Vorteile auf einen Blick</h2>
            </AnimatedDiv>
          </div>

          {/* Alternating full-width benefit sections */}
          {[
            {
              image: '/demo-electrician/benefit-speed.jpg',
              icon: Gauge,
              title: '10x Schneller Laden',
              highlight: '2 Stunden statt 12',
              description: 'Während Sie Ihren Morgenkaffee genießen, lädt Ihr Auto. Keine Wartezeiten, keine Planung – einfach losfahren.',
              points: [
                'Volle Ladung über Nacht',
                'Spontan losfahren können',
                'Zeit für die wichtigen Dinge'
              ],
              cta: 'Nie wieder warten'
            },
            {
              image: '/demo-electrician/benefit-savings.jpg',
              icon: Euro,
              title: '50% Günstiger Laden',
              highlight: '0,30€ statt 0,59€/kWh',
              description: 'Öffentliche Ladesäulen kosten fast das Doppelte. Mit Ihrer eigenen Wallbox laden Sie zum günstigen Hausstromtarif.',
              points: [
                'Günstige Nachtstromtarife nutzen',
                'Keine teuren Ladesäulen-Gebühren',
                'Investition amortisiert sich schnell'
              ],
              cta: 'Jeden Tag sparen'
            },
            {
              image: '/demo-electrician/benefit-overnight.jpg',
              icon: Timer,
              title: 'Über Nacht Vollgeladen',
              highlight: 'Morgens 100% Reichweite',
              description: 'Einstecken und vergessen. Jeden Morgen wartet Ihr Auto mit voller Batterie auf Sie – ganz automatisch.',
              points: [
                'Automatisches Laden programmierbar',
                'Kein Gedanke an Reichweite',
                'Stressfrei in den Tag starten'
              ],
              cta: 'Einfach schlafen gehen'
            },
            {
              image: '/demo-electrician/benefit-solar.jpg',
              icon: Sun,
              title: 'Gratis mit Sonnenstrom',
              highlight: 'Kostenlos fahren',
              description: 'Verbinden Sie Ihre Wallbox mit der Solaranlage und fahren Sie mit selbst erzeugtem Strom – komplett kostenlos.',
              points: [
                'Sonne tankt Ihr Auto',
                'Unabhängig von Strompreisen',
                'CO₂-neutral unterwegs'
              ],
              cta: 'Energie-Unabhängigkeit'
            }
          ].map((benefit, index) => {
            const isReversed = index % 2 === 1

            return (
              <div
                key={index}
                className={`py-12 md:py-20 ${index % 2 === 0 ? 'bg-muted/30' : 'bg-background'}`}
              >
                <div className="container mx-auto px-4">
                  <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`}>
                    {/* Image - Large, impactful */}
                    <AnimatedDiv
                      animation={isReversed ? 'slideLeft' : 'slideRight'}
                      className={`${isReversed ? 'lg:order-2' : ''}`}
                    >
                      <div className="relative group">
                        {/* Decorative background blur */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />

                        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                          <Image
                            src={benefit.image.replace('.jpg', '.webp')}
                            alt={benefit.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                          {/* Subtle gradient overlay for depth */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      </div>
                    </AnimatedDiv>

                    {/* Content - Minimal, scannable */}
                    <AnimatedDiv
                      animation={isReversed ? 'slideRight' : 'slideLeft'}
                      delay={0.2}
                      className={`${isReversed ? 'lg:order-1' : ''}`}
                    >
                      <div className="space-y-6">
                        {/* Highlight badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                          <benefit.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-bold text-primary">{benefit.highlight}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                          {benefit.title}
                        </h3>

                        {/* Description */}
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>

                        {/* Bullet points */}
                        <ul className="space-y-3">
                          {benefit.points.map((point, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Check className="h-3.5 w-3.5 text-primary" />
                              </div>
                              <span className="text-muted-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Emotional CTA */}
                        <p className="text-primary font-medium italic text-lg">
                          → {benefit.cta}
                        </p>
                      </div>
                    </AnimatedDiv>
                  </div>
                </div>
              </div>
            )
          })}
        </section>

        {/* Pricing Packages - Visual Comparison */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            {/* Visual header with product image */}
            <AnimatedDiv animation="slideUp" className="max-w-4xl mx-auto mb-16">
              <div className="relative rounded-2xl overflow-hidden mb-8 h-48 md:h-64">
                <Image
                  src="/demo-electrician/wallbox-packages-visual.webp"
                  alt="Wallbox Modelle im Vergleich"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <Badge variant="outline" className="mb-2 bg-background/80">Unsere Pakete</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">Wallbox-Pakete mit Festpreis</h2>
                </div>
              </div>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {wallboxOptions.map((option, index) => (
                <AnimatedDiv key={index} animation="slideUp" delay={index * 0.1}>
                  <Card className={`p-8 h-full relative ${option.highlight ? 'border-primary shadow-xl' : ''}`}>
                    {option.badge && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" variant={option.highlight ? 'default' : 'secondary'}>
                        {option.badge}
                      </Badge>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">{option.name}</h3>
                      <p className="text-3xl font-bold text-primary">{option.price}</p>
                      <p className="text-sm text-muted-foreground mt-1">{option.power} Ladeleistung</p>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={option.highlight ? 'default' : 'outline'} asChild>
                      <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                        Angebot anfordern
                      </a>
                    </Button>
                  </Card>
                </AnimatedDiv>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              * Preise gelten bei Standardinstallation bis 10m Kabellänge. Individuelles Angebot nach Vor-Ort-Check.
            </p>
          </div>
        </section>

        {/* Process Section - Alternating Timeline */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16 md:mb-24">
              <Badge variant="outline" className="mb-4">Unser Prozess</Badge>
              <h2 className="text-4xl md:text-5xl font-bold">In 4 Schritten zur Wallbox</h2>
            </AnimatedDiv>

            {/* Alternating process steps */}
            <div className="max-w-6xl mx-auto">
              {[
                {
                  step: '01',
                  image: '/demo-electrician/process-step-1-beratung.jpg',
                  title: 'Kostenlose Beratung',
                  time: 'Terminvereinbarung in 24h',
                  description: 'Wir kommen zu Ihnen, prüfen die Gegebenheiten vor Ort und beraten Sie zu allen Optionen.',
                  points: ['Vor-Ort-Check der Elektrik', 'Beratung zu Wallbox-Modellen', 'Festpreis-Angebot']
                },
                {
                  step: '02',
                  image: '/demo-electrician/process-step-2-planung.jpg',
                  title: 'Planung & Anmeldung',
                  time: '2-4 Wochen',
                  description: 'Wir übernehmen die komplette Planung und melden Ihre Wallbox beim Netzbetreiber an.',
                  points: ['Technische Planung', 'Netzanmeldung inklusive', 'Terminabstimmung']
                },
                {
                  step: '03',
                  image: '/demo-electrician/process-step-3-installation.jpg',
                  title: 'Professionelle Installation',
                  time: '0.5 - 1 Tag',
                  description: 'Unsere VDE-zertifizierten Elektriker installieren Ihre Wallbox sauber und fachgerecht.',
                  points: ['Saubere Kabelführung', 'VDE-konforme Installation', 'Funktionstest']
                },
                {
                  step: '04',
                  image: '/demo-electrician/process-step-4-uebergabe.jpg',
                  title: 'Übergabe & Einweisung',
                  time: 'Sofort startklar',
                  description: 'Sie erhalten eine Einweisung und können sofort mit dem Laden beginnen.',
                  points: ['Einweisung in die Bedienung', 'App-Einrichtung (falls vorhanden)', 'Dokumentation']
                }
              ].map((step, index) => {
                const isReversed = index % 2 === 1
                const isLast = index === 3

                return (
                  <div key={index} className="relative">
                    {/* Vertical connector line (hidden on mobile) */}
                    {!isLast && (
                      <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-16 bg-gradient-to-b from-primary/40 to-primary/10 -translate-x-1/2" />
                    )}

                    <div className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index > 0 ? 'mt-16' : ''}`}>
                      {/* Image */}
                      <AnimatedDiv
                        animation={isReversed ? 'slideLeft' : 'slideRight'}
                        className={`${isReversed ? 'lg:order-2' : ''}`}
                      >
                        <div className="relative group">
                          {/* Step number badge - large */}
                          <div className="absolute -top-4 -left-4 z-10 w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-xl">
                            {step.step}
                          </div>

                          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                            <Image
                              src={step.image.replace('.jpg', '.webp')}
                              alt={step.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                              sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                          </div>
                        </div>
                      </AnimatedDiv>

                      {/* Content */}
                      <AnimatedDiv
                        animation={isReversed ? 'slideRight' : 'slideLeft'}
                        delay={0.2}
                        className={`${isReversed ? 'lg:order-1' : ''}`}
                      >
                        <div className="space-y-4">
                          {/* Time badge */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            <span className="text-sm font-medium text-primary">{step.time}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-2xl md:text-3xl font-bold">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>

                          {/* Points */}
                          <ul className="space-y-2">
                            {step.points.map((point, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </AnimatedDiv>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA after steps */}
            <AnimatedDiv animation="slideUp" delay={0.3} className="text-center mt-16">
              <Button size="lg" className="text-lg px-8" asChild>
                <a href={`tel:${ceoProfile.phone.replace(/\s/g, '')}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  Jetzt Beratung starten
                </a>
              </Button>
            </AnimatedDiv>
          </div>
        </section>

        {/* Testimonials Section - Social Proof */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-16">
              <Badge variant="outline" className="mb-4">Kundenstimmen</Badge>
              <h2 className="text-4xl font-bold mb-4">Das sagen unsere Kunden</h2>
              <p className="text-xl text-muted-foreground">Über 150 zufriedene Wallbox-Besitzer in München</p>
            </AnimatedDiv>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'Michael S.',
                  location: 'Bogenhausen',
                  car: 'Tesla Model 3',
                  quote: 'Von der Beratung bis zur Installation top! Thomas hat sich viel Zeit genommen, die PV-Anbindung zu erklären. Jetzt lade ich mein Tesla mit eigenem Sonnenstrom.',
                  stars: 5
                },
                {
                  name: 'Sandra K.',
                  location: 'Schwabing',
                  car: 'VW ID.4',
                  quote: 'Sehr professionell und pünktlich. Die Wallbox wurde sauber installiert und alles wurde geduldig erklärt. Würde ich jederzeit weiterempfehlen!',
                  stars: 5
                },
                {
                  name: 'Thomas M.',
                  location: 'Pasing',
                  car: 'BMW iX3',
                  quote: 'Preis-Leistung stimmt absolut. Die Anmeldung beim Netzbetreiber war inklusive – das hat mir viel Aufwand erspart. Nach 3 Wochen war alles fertig.',
                  stars: 5
                }
              ].map((testimonial, index) => (
                <AnimatedDiv key={index} animation="slideUp" delay={index * 0.1}>
                  <Card className="p-6 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: testimonial.stars }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-primary">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location} · {testimonial.car}</p>
                      </div>
                    </div>
                  </Card>
                </AnimatedDiv>
              ))}
            </div>

            {/* Google Reviews Link */}
            <AnimatedDiv animation="slideUp" delay={0.3} className="text-center mt-8">
              <a
                href="https://g.page/mueller-elektrotechnik-muenchen/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-sm">Alle 47 Bewertungen auf Google ansehen</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </AnimatedDiv>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              {/* Urgency Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Nur noch 3 Termine im Dezember frei</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Bereit für Ihre Wallbox?</h2>
              <p className="text-xl opacity-90">
                In 2 Minuten sagen Sie uns, was Sie brauchen – wir melden uns mit einem
                <span className="font-bold"> Festpreis-Angebot.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <FunnelTriggerButton
                  funnelId="wallbox-anfrage"
                  variant="secondary"
                  className="text-lg px-8 bg-white text-primary hover:bg-white/90 shadow-lg"
                  phoneNumber={ceoProfile.phone}
                  whatsappNumber={ceoProfile.whatsapp}
                >
                  Jetzt Angebot anfordern
                </FunnelTriggerButton>
                <Button size="lg" className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white/20" asChild>
                  <a href={`https://wa.me/${ceoProfile.whatsapp.replace(/[^0-9]/g, '')}`}>
                    <WhatsAppIcon className="mr-2 h-5 w-5" />
                    WhatsApp Chat
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Antwort in unter 2 Stunden</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>München & Umland</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Area - Visual München */}
        <section className="py-16 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Visual side */}
              <AnimatedDiv animation="slideRight">
                <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 md:h-80">
                  <Image
                    src="/demo-electrician/service-area-muenchen.webp"
                    alt="München Stadtansicht - Unser Servicegebiet"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedDiv>

              {/* Content side - minimal */}
              <AnimatedDiv animation="slideLeft" delay={0.2}>
                <Badge variant="outline" className="mb-4">Servicegebiet</Badge>
                <h2 className="text-3xl font-bold mb-4">Ihr lokaler Partner in München</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Schwabing', 'Bogenhausen', 'Pasing', 'Trudering', 'Giesing', 'Sendling', 'Fürstenried', 'Dachau'].map((district) => (
                    <div key={district} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{district}</span>
                    </div>
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mt-4">+ weitere Stadtteile & Landkreis München</p>
              </AnimatedDiv>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground mb-6">Wir installieren alle führenden Marken</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              {['ABB', 'Heidelberg', 'Webasto', 'Mennekes', 'Tesla', 'Easee'].map((brand) => (
                <div key={brand} className="text-lg font-bold text-muted-foreground/60 hover:text-primary transition-colors">
                  {brand}
                </div>
              ))}
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

        {/* Related Services */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <AnimatedDiv animation="slideUp" className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Weitere Leistungen</h2>
              <p className="text-muted-foreground">Entdecken Sie unser vollständiges Angebot</p>
            </AnimatedDiv>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { name: 'Smart Home', link: '/leistungen/smart-home-installation-muenchen', icon: Home },
                { name: 'Elektroinstallation', link: '/leistungen/elektroinstallation-muenchen', icon: Zap },
                { name: 'Sicherheitstechnik', link: '/leistungen/sicherheitstechnik-muenchen', icon: Shield },
                { name: 'Startseite', link: '/', icon: ArrowRight }
              ].map((item) => (
                <Link key={item.link} href={item.link} className="group">
                  <Card className="p-4 text-center hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary transition-colors">
                      <item.icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.name}</span>
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
                  Ihr persönlicher Partner für E-Mobilität in München – nachhaltig laden seit 2020.
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
      </div>
    </>
  )
}
