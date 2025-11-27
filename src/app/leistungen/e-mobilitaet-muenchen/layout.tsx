import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'E-Mobilität München | Wallbox Installation | Müller Elektrotechnik',
  description: 'Wallbox Installation in München vom Meisterbetrieb. ✓ KfW-förderfähig ✓ Alle Hersteller ✓ PV-Integration ✓ Festpreisgarantie. Jetzt beraten lassen!',
  keywords: 'wallbox münchen, wallbox installation, ladestation elektroauto, e-auto ladestation, kfw förderung wallbox',
  openGraph: {
    title: 'E-Mobilität München | Wallbox Installation vom Meisterbetrieb',
    description: 'Professionelle Wallbox Installation in München. KfW-förderfähig. Alle Hersteller. Jetzt beraten lassen!',
    url: 'https://mueller-elektro.de/leistungen/e-mobilitaet-muenchen',
    type: 'website',
  }
}

export default function EMobilitaetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
