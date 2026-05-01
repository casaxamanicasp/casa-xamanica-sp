import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[--color-floresta-escuro]">
      {/* Fundo com gradiente e textura */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--color-floresta-escuro] via-[--color-floresta] to-[--color-floresta-escuro] opacity-90" />

      {/* Padrão geométrico tribal de fundo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M0 20 L20 0 L40 20 L20 40 Z' fill='none' stroke='%23F5EDD6' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Ícone tipé decorativo */}
        <div className="flex justify-center mb-6">
          <svg width="60" height="66" viewBox="0 0 60 66" fill="none" className="opacity-80">
            <line x1="30" y1="3" x2="4" y2="57" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
            <line x1="30" y1="3" x2="56" y2="57" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round"/>
            <line x1="30" y1="3" x2="30" y2="6" stroke="#F5EDD6" strokeWidth="3" strokeLinecap="round"/>
            <path d="M13 44 Q30 38 47 44" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
            <path d="M8 54 Q30 46 52 54" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
            <ellipse cx="30" cy="57" rx="26" ry="4" stroke="#C9A84C" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        <h1 className="font-[--font-titulo] text-4xl md:text-6xl lg:text-7xl font-bold text-[--color-bege] mb-4 leading-tight tracking-wide">
          CASA XAMÂNICA SP
        </h1>
        <p className="text-[--color-dourado] text-sm md:text-base tracking-[0.4em] uppercase mb-6">
          Medicina Tradicional Indígena
        </p>

        {/* Divisor zigue-zague */}
        <div className="flex justify-center mb-8">
          <svg viewBox="0 0 240 12" width="240" height="12" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 12 }).map((_, i) => (
              <polyline
                key={i}
                points={`${i * 20},12 ${i * 20 + 10},0 ${i * 20 + 20},12`}
                fill="none"
                stroke="#C9A84C"
                strokeWidth="1.5"
              />
            ))}
          </svg>
        </div>

        <p className="text-[--color-bege] text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
          Cerimônias de Ayahuasca, Rapé e Sananga — uma jornada de cura, autoconhecimento e conexão com a floresta.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/eventos"
            className="bg-[--color-dourado] text-[--color-floresta-escuro] px-8 py-4 font-[--font-titulo] font-bold tracking-wider uppercase text-sm rounded hover:bg-[--color-dourado-claro] transition-all hover:scale-105 shadow-lg"
          >
            Próximas Cerimônias
          </Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[--color-bege] text-[--color-bege] px-8 py-4 font-[--font-titulo] font-bold tracking-wider uppercase text-sm rounded hover:bg-[--color-bege] hover:text-[--color-floresta-escuro] transition-all"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Zigue-zague na base */}
      <div className="absolute bottom-0 left-0 right-0 h-12 flex">
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,0 L40,48 L80,0 L120,48 L160,0 L200,48 L240,0 L280,48 L320,0 L360,48 L400,0 L440,48 L480,0 L520,48 L560,0 L600,48 L640,0 L680,48 L720,0 L760,48 L800,0 L840,48 L880,0 L920,48 L960,0 L1000,48 L1040,0 L1080,48 L1120,0 L1160,48 L1200,0 L1240,48 L1280,0 L1320,48 L1360,0 L1400,48 L1440,0 L1440,48 L0,48 Z"
            fill="#FBF7EE"
          />
        </svg>
      </div>
    </section>
  )
}
