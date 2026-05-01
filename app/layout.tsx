import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const cinzel = Cinzel({
  variable: '--font-titulo',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-corpo',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Casa Xamânica SP — Cerimônias de Ayahuasca em São Paulo',
    template: '%s | Casa Xamânica SP',
  },
  description:
    'Instituto de medicina tradicional indígena. Realizamos cerimônias de Ayahuasca, Rapé e Sananga em São Paulo e em outros estados do Brasil.',
  keywords: ['ayahuasca', 'cerimônia', 'xamanismo', 'medicina da floresta', 'São Paulo', 'rapé', 'sananga'],
  openGraph: {
    siteName: 'Casa Xamânica SP',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[--color-creme]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
