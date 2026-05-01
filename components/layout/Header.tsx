'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/eventos', label: 'Cerimônias' },
  { href: '/blog', label: 'Blog' },
  { href: '/loja', label: 'Loja' },
  { href: '/apoiadores', label: 'Apoiadores' },
  { href: '/contato', label: 'Contato' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[--color-floresta] text-[--color-bege] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <LogoIcon />
            <div className="leading-tight">
              <p className="font-[--font-titulo] text-lg md:text-xl font-bold tracking-wider text-[--color-bege] group-hover:text-[--color-dourado] transition-colors">
                CASA XAMÂNICA
              </p>
              <p className="text-[10px] tracking-[0.3em] text-[--color-dourado] uppercase">São Paulo</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[--color-bege] hover:text-[--color-dourado] transition-colors uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/eventos"
              className="bg-[--color-dourado] text-[--color-floresta-escuro] px-4 py-2 rounded text-sm font-bold tracking-wide hover:bg-[--color-dourado-claro] transition-colors uppercase"
            >
              Inscreva-se
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-[--color-bege] hover:text-[--color-dourado] transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[--color-floresta-escuro] border-t border-[--color-floresta-claro]">
          <nav className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[--color-bege] hover:text-[--color-dourado] transition-colors font-medium tracking-wide uppercase text-sm py-2 border-b border-[--color-floresta-claro]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/eventos"
              onClick={() => setMenuOpen(false)}
              className="bg-[--color-dourado] text-[--color-floresta-escuro] px-4 py-3 rounded text-sm font-bold tracking-wide text-center uppercase mt-2"
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
