import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/logo-fabig.png"
            alt="Fabig Business Suite"
            width={200}
            height={200}
            priority
          />

          <h1 className="text-4xl font-bold text-center">
            Willkommen bei Fabig Business Suite
          </h1>

          <p className="text-xl text-center text-muted-foreground max-w-2xl">
            Die All-in-One Plattform für lokale Unternehmen.
            <br />
            Website, CRM, WhatsApp AI - alles aus einer Hand.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/admin"
              className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Admin Panel öffnen
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-lg mb-2">🌐 Website Builder</h3>
              <p className="text-sm text-muted-foreground">
                Erstelle professionelle Websites mit branchenspezifischen Templates
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-lg mb-2">💬 WhatsApp AI</h3>
              <p className="text-sm text-muted-foreground">
                Automatisiere Kundenanfragen mit intelligenter KI-Unterstützung
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold text-lg mb-2">📊 CRM & Leads</h3>
              <p className="text-sm text-muted-foreground">
                Verwalte Kunden, Leads und Termine an einem zentralen Ort
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
