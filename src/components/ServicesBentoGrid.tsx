'use client'

import { useState } from 'react'
import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Phone, AlertTriangle, ArrowRight, Clock } from 'lucide-react'
import { StickyEmergencyBanner } from '@/components/StickyEmergencyBanner'
import { EmergencyFunnelModal } from '@/components/EmergencyFunnelModal'
import Link from 'next/link'

interface ServicesBentoGridProps {
  phone: string
  whatsapp: string
  showEmergencyBanner?: boolean
}

export function ServicesBentoGrid({ phone, whatsapp, showEmergencyBanner = true }: ServicesBentoGridProps) {
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false)

  const handleEmergencyClick = () => {
    setEmergencyModalOpen(true)
  }

  return (
    <>
      {/* Sticky Emergency Banner */}
      {showEmergencyBanner && (
        <StickyEmergencyBanner
          phone={phone}
          onEmergencyClick={handleEmergencyClick}
          isModalOpen={emergencyModalOpen}
        />
      )}

      {/* Emergency Funnel Modal */}
      <EmergencyFunnelModal
        isOpen={emergencyModalOpen}
        onOpenChange={setEmergencyModalOpen}
        phone={phone}
        whatsapp={whatsapp}
      />

      {/* Bento Grid - Clean, Cohesive Design */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[160px]">

        {/* Smart Home - Large feature card */}
        <AnimatedDiv animation="slideUp" delay={0} className="col-span-2 row-span-2">
          <Link href="/leistungen/smart-home-installation-muenchen" className="block group h-full">
            <Card className="relative overflow-hidden h-full border-0 hover:shadow-2xl transition-all duration-500">
              <img
                src="/demo-electrician/smart-home-service.jpg"
                alt="Smart Home Installation München"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative h-full p-6 flex flex-col justify-end text-white">
                <Badge variant="secondary" className="w-fit mb-3 font-semibold">
                  KNX & Loxone Partner
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">Smart Home</h3>
                <p className="text-white/90 text-sm md:text-base mb-3 max-w-sm">
                  Steuern Sie Licht, Heizung und Jalousien intelligent.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5 bg-white/20 px-2 py-1 rounded-full">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.9</span>
                  </span>
                  <span className="text-white/80">150+ Projekte</span>
                </div>
              </div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </Card>
          </Link>
        </AnimatedDiv>

        {/* Elektroinstallation - Tall image card */}
        <AnimatedDiv animation="slideUp" delay={0.1} className="col-span-1 row-span-2">
          <Link href="/leistungen/elektroinstallation-muenchen" className="block group h-full">
            <Card className="relative overflow-hidden h-full border-0 hover:shadow-2xl transition-all duration-500">
              <img
                src="/demo-electrician/installation-service.jpg"
                alt="Elektroinstallation München"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative h-full p-5 flex flex-col justify-end text-white">
                <Badge variant="secondary" className="w-fit mb-2 text-[10px]">
                  VDE-zertifiziert
                </Badge>
                <h3 className="text-xl font-bold mb-1">Elektro­installation</h3>
                <p className="text-white/80 text-sm hidden md:block">Neubau & Sanierung</p>
                <div className="flex items-center gap-2 mt-2 text-xs bg-white/20 px-2 py-1 rounded-full w-fit">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>4.8 · 500+ Projekte</span>
                </div>
              </div>
            </Card>
          </Link>
        </AnimatedDiv>

        {/* E-Mobilität - Image card */}
        <AnimatedDiv animation="slideUp" delay={0.2} className="col-span-1 row-span-1">
          <Link href="/leistungen/e-mobilitaet-muenchen" className="block group h-full">
            <Card className="relative overflow-hidden h-full border-0 hover:shadow-xl transition-all duration-300">
              <img
                src="/demo-electrician/ev-charging-service.jpg"
                alt="E-Mobilität & Wallbox München"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              {/* Badge */}
              <Badge className="absolute top-3 right-3 bg-primary/90 hover:bg-primary text-primary-foreground border-0 text-[10px]">
                Förderung
              </Badge>
              <div className="relative h-full p-4 flex flex-col justify-end text-white">
                <h3 className="font-bold text-sm">E-Mobilität</h3>
                <p className="text-white/80 text-xs">Wallbox Installation</p>
              </div>
            </Card>
          </Link>
        </AnimatedDiv>

        {/* Sicherheit - Image card */}
        <AnimatedDiv animation="slideUp" delay={0.3} className="col-span-1 row-span-1">
          <Link href="/leistungen/sicherheitstechnik-muenchen" className="block group h-full">
            <Card className="relative overflow-hidden h-full border-0 hover:shadow-xl transition-all duration-300">
              <img
                src="/demo-electrician/security-service.jpg"
                alt="Sicherheitstechnik München"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
              <div className="relative h-full p-4 flex flex-col justify-end text-white">
                <h3 className="font-bold text-sm">Sicherheitstechnik</h3>
                <p className="text-white/80 text-xs">Alarmanlagen & Video</p>
              </div>
            </Card>
          </Link>
        </AnimatedDiv>

        {/* Photovoltaik - Image card */}
        <AnimatedDiv animation="slideUp" delay={0.4} className="col-span-1 row-span-1">
          <Link href="#contact" className="block group h-full">
            <Card className="relative overflow-hidden h-full border-0 hover:shadow-xl transition-all duration-300">
              <img
                src="/demo-electrician/photovoltaik-service.jpg"
                alt="Photovoltaik & Solaranlagen München"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
              {/* Badge */}
              <Badge variant="secondary" className="absolute top-3 right-3 text-[10px]">
                Demnächst
              </Badge>
              <div className="relative h-full p-4 flex flex-col justify-end text-white">
                <h3 className="font-bold text-sm">Photovoltaik</h3>
                <p className="text-white/80 text-xs">Eigener Solarstrom</p>
              </div>
            </Card>
          </Link>
        </AnimatedDiv>

        {/* 24/7 Notdienst - Horizontal emergency card with team photo */}
        <AnimatedDiv animation="slideUp" delay={0.5} className="col-span-2 md:col-span-3 row-span-1">
          <Card
            className="relative overflow-hidden h-full border-0 hover:shadow-2xl transition-all duration-500 cursor-pointer group"
            onClick={handleEmergencyClick}
          >
            {/* Background image */}
            <img
              src="/demo-electrician/thomas-mueller-at-work.jpg"
              alt="24/7 Elektriker-Notdienst München"
              className="absolute inset-0 w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient overlay - stronger on right for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/60 to-black/80" />

            {/* Content */}
            <div className="relative h-full p-4 md:p-5 flex items-center">
              {/* Left spacer for image visibility */}
              <div className="hidden md:block w-1/4 flex-shrink-0" />

              {/* Right content */}
              <div className="flex-1 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Live indicator with icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 md:h-7 md:w-7 text-red-400" />
                    </div>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>

                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-base md:text-lg">24/7 Elektriker-Notdienst</h3>
                      <Badge className="hidden sm:inline-flex bg-red-500/90 hover:bg-red-500 text-white border-0 text-[10px]">
                        Sofort
                      </Badge>
                    </div>
                    <p className="text-white/80 text-xs md:text-sm">
                      Stromausfall? In <span className="font-semibold text-white">60 Min.</span> bei Ihnen!
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  size="sm"
                  className="flex-shrink-0 bg-white text-black hover:bg-white/90 font-semibold shadow-xl"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Notfall melden</span>
                  <span className="sm:hidden">Hilfe</span>
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedDiv>

      </div>
    </>
  )
}
