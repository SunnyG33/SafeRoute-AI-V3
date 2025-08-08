import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import AppProviders from "@/components/providers/app-providers"
import DemoBanner from "@/components/common/demo-banner"

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
  html {
    font-family: ${GeistSans.style.fontFamily};
    --font-sans: ${GeistSans.variable};
    --font-mono: ${GeistMono.variable};
  }
        `}</style>
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded">
          Skip to content
        </a>
        <AppProviders>
          <DemoBanner />
          <main id="main">{children}</main>
        </AppProviders>
      </body>
    </html>
  )
}
