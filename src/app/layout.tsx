import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Fabig Business Suite',
    default: 'Fabig Business Suite',
  },
  description:
    'Enterprise multi-tenant SaaS platform for German local businesses. Website, CRM, WhatsApp AI - all in one.',
  keywords: [
    'Website Builder',
    'CRM',
    'WhatsApp Automation',
    'AI Assistant',
    'Local Business',
    'German SaaS',
  ],
  authors: [{ name: 'Thomas Fabig', url: 'https://fabig-webdevelopment.de' }],
  creator: 'Fabig Webdevelopment',
  publisher: 'Fabig Webdevelopment',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://fabig-suite.de',
    title: 'Fabig Business Suite',
    description: 'Die All-in-One Plattform für lokale Unternehmen',
    siteName: 'Fabig Business Suite',
    images: [
      {
        url: '/logo-fabig.png',
        width: 1200,
        height: 630,
        alt: 'Fabig Business Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fabig Business Suite',
    description: 'Die All-in-One Plattform für lokale Unternehmen',
    images: ['/logo-fabig.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo-fabig.png',
    shortcut: '/logo-fabig.png',
    apple: '/logo-fabig.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
