import Link from 'next/link'

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'
const EMAIL = process.env.NEXT_PUBLIC_EMAIL ?? 'casaxamanica@gmail.com'
const INSTAGRAM = process.env.NEXT_PUBLIC_INSTAGRAM ?? 'casaxamanicasp'

export function Footer() {
  return (
    <footer className="bg-[--color-floresta-escuro] text-[--color-bege]">
      {/* Zigue-zague decorativo */}
      <div className="zigzag-border zigzag-border-bege" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Coluna 1 — Identidade */}
          <div>
            <h3 className="font-[--font-titulo] text-xl font-bold text-[--color-bege] mb-2">
              CASA XAMÂNICA SP
            </h3>
            <p className="text-[--color-dourado] text-xs tracking-[0.3em] uppercase mb-4">
              Medicina Tradicional Indígena
            </p>
            <p className="text-sm text-[--color-bege] opacity-80 leading-relaxed">
              Cerimônias de Ayahuasca, Rapé e Sananga em São Paulo e outros estados do Brasil.
            </p>
          </div>

          {/* Coluna 2 — Links */}
          <div>
            <h4 className="font-[--font-titulo] text-sm font-bold text-[--color-dourado] tracking-wider uppercase mb-4">
              Navegação
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: '/eventos', label: 'Próximas Cerimônias' },
                { href: '/blog', label: 'Blog' },
                { href: '/loja', label: 'Loja' },
                { href: '/apoiadores', label: 'Apoiadores' },
                { href: '/contato', label: 'Contato' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[--color-bege] opacity-80 hover:opacity-100 hover:text-[--color-dourado] transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Coluna 3 — Contato */}
          <div>
            <h4 className="font-[--font-titulo] text-sm font-bold text-[--color-dourado] tracking-wider uppercase mb-4">
              Contato
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[--color-bege] opacity-80 hover:opacity-100 hover:text-[--color-dourado] transition-all"
              >
                <WhatsappIcon />
                (11) 98483-7287
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 text-[--color-bege] opacity-80 hover:opacity-100 hover:text-[--color-dourado] transition-all"
              >
                <EmailIcon />
                {EMAIL}
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[--color-bege] opacity-80 hover:opacity-100 hover:text-[--color-dourado] transition-all"
              >
                <InstagramIcon />
                @{INSTAGRAM}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[--color-floresta-claro] mt-10 pt-6 text-center text-xs text-[--color-bege] opacity-50">
          © {new Date().getFullYear()} Casa Xamânica SP — Todos os direitos reservados
        </div>
      </div>
    </footer>
  )
}

function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}
