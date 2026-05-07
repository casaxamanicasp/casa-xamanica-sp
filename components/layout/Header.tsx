'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navLinks = [
  { href: '/eventos', label: 'Cerimônias' },
  { href: '/vivencias', label: 'Vivências' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/midia', label: 'Mídia' },
  { href: '/blog', label: 'Blog' },
  { href: '/apoiadores', label: 'Apoiadores' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="relative bg-[#070E07] text-[#F5EDD6] sticky top-0 z-50 border-b border-[#111a11] overflow-hidden">

      {/* Padrão kene de fundo */}
      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M0 24 L24 0 L48 24 L24 48 Z' fill='none' stroke='%23F5EDD6' stroke-width='0.8'/%3E%3Cpath d='M12 24 L24 12 L36 24 L24 36 Z' fill='%23F5EDD6' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Brilho central verde suave */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 200% at 50% 50%, #0F1F0F 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-branco.png"
              alt="Casa Xamânica SP"
              width={180}
              height={72}
              className="h-12 md:h-14 w-auto object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium tracking-[0.15em] text-[#aaa] hover:text-[--color-dourado] transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/eventos"
              className="bg-[--color-dourado] text-[#0D0D0D] px-5 py-2 text-xs font-bold tracking-[0.15em] uppercase hover:bg-[--color-dourado-claro] transition-colors"
            >
              Inscreva-se
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[#aaa] hover:text-[--color-dourado] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#050C05] border-t border-[#111a11]">
          <nav className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[#aaa] hover:text-[--color-dourado] transition-colors font-medium tracking-[0.15em] uppercase text-xs py-3 border-b border-[#1a1a1a]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/eventos"
              onClick={() => setMenuOpen(false)}
              className="bg-[--color-dourado] text-[#0D0D0D] px-4 py-3 text-xs font-bold tracking-[0.15em] text-center uppercase mt-3"
            >
              Inscreva-se
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

function LogoIcon() {
  return (
    <svg width="40" height="44" viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tipé (tenda indígena) simplificada */}
      <line x1="20" y1="2" x2="3" y2="38" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="2" x2="37" y2="38" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="2" x2="20" y2="4" stroke="#F5EDD6" strokeWidth="2" strokeLinecap="round"/>
      <ellipse cx="20" cy="38" rx="17" ry="3" stroke="#C9A84C" strokeWidth="1" fill="none"/>
      <path d="M9 30 Q20 26 31 30" stroke="#C9A84C" strokeWidth="1" fill="none"/>
      <path d="M6 36 Q20 31 34 36" stroke="#C9A84C" strokeWidth="1" fill="none"/>
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
