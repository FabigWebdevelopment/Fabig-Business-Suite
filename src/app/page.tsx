import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Zap, MessageSquare, Users, Globe, BarChart3, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-fabig.png"
                alt="Fabig"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-semibold">Fabig Business Suite</span>
            </div>
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              Admin Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-gray-300">Die All-in-One Plattform für lokale Unternehmen</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Dein Business.
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Vollautomatisiert.
              </span>
            </h1>

            <p className="mb-10 text-lg leading-8 text-gray-400 sm:text-xl">
              Website, CRM, WhatsApp AI und Automatisierung – alles aus einer Hand.
              <br />
              Entwickelt von <strong className="text-white">Thomas Fabig</strong> für deutsche Unternehmen.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/admin"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/50 transition-all hover:bg-blue-700 hover:shadow-blue-600/75 sm:w-auto"
              >
                Admin Panel öffnen
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://fabig.website"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
              >
                Mehr erfahren
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-t border-white/10 bg-gradient-to-b from-transparent to-blue-950/20">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Alles, was du brauchst
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Eine Plattform. Unbegrenzte Möglichkeiten.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Website Builder */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Website Builder</h3>
              <p className="text-gray-400">
                Professionelle Websites mit branchenspezifischen Templates. Kein Code erforderlich.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>

            {/* Feature 2: WhatsApp AI */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">WhatsApp AI</h3>
              <p className="text-gray-400">
                24/7 KI-Assistent für Kundenanfragen. Automatische Terminbuchung und Leadgenerierung.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>

            {/* Feature 3: CRM & Leads */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Lead-Board CRM</h3>
              <p className="text-gray-400">
                Verwalte Kunden, Leads und Termine an einem zentralen Ort. Einfach und übersichtlich.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>

            {/* Feature 4: Automation */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Automatisierung</h3>
              <p className="text-gray-400">
                E-Mail, SMS und WhatsApp Follow-ups. Automatische Bewertungsanfragen nach Projekten.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>

            {/* Feature 5: Analytics */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Analytics</h3>
              <p className="text-gray-400">
                Detaillierte Einblicke in Leads, Conversions und ROI. Datengetriebene Entscheidungen.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>

            {/* Feature 6: Security */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-white/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Enterprise Security</h3>
              <p className="text-gray-400">
                Multi-Tenant Isolation, verschlüsselte Daten und DSGVO-Konformität ab Tag 1.
              </p>
              <div className="absolute bottom-0 right-0 h-24 w-24 bg-gradient-to-br from-blue-600/20 to-transparent blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-fabig.png"
                alt="Fabig"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-sm text-gray-400">
                © 2025 Fabig Webdevelopment | Thomas Fabig
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="https://fabig.website" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Portfolio
              </a>
              <Link href="/admin" className="hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
