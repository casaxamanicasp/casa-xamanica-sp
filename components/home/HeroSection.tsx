import Link from 'next/link'

export function HeroSection() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">
      {/* Padrão geométrico kene de fundo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M0 24 L24 0 L48 24 L24 48 Z' fill='none' stroke='%23F5EDD6' stroke-width='0.8'/%3E%3Cpath d='M12 24 L24 12 L36 24 L24 36 Z' fill='%23F5EDD6' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Brilho central quente — como brasa de cerimônia */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 55%, #2D4A2D 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(ellipse 30% 30% at 50% 60%, #C9A84C 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-24">
        {/* Tipé */}
        <div className="flex justify-center mb-8">
          <svg width="56" height="62" viewBox="0 0 60 66" fill="none">
            <line x1="30" y1="3" x2="4" y2="57" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="3" x2="56" y2="57" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="3" x2="30" y2="7" stroke="#F5EDD6" strokeWidth="3" strokeLinecap="round" />
            <path d="M13 44 Q30 38 47 44" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            <path d="M8 53 Q30 45 52 53" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            <ellipse cx="30" cy="57" rx="26" ry="4" stroke="#C9A84C" strokeWidth="1" fill="none" />
          </svg>
        </div>

        {/* Subtítulo acima do título */}
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-5 font-medium">
          Medicina Tradicional Indígena
        </p>

        <h1 className="font-[--font-titulo] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-5 leading-none tracking-widest">
          CASA XAMÂNICA SP
        </h1>

        {/* Tagline — floresta encontra a cidade */}
        <p className="text-[#aaa] text-base md:text-lg tracking-[0.1em] mb-10 max-w-xl mx-auto leading-relaxed">
          A floresta chama. São Paulo escuta.
          <br />
          <span className="text-[#777] text-sm">
            Ayahuasca · Rapé · Sananga — onde o sagrado encontra a cidade.
          </span>
        </p>

        {/* Divisor kene */}
        <div className="flex justify-center mb-10">
          <svg viewBox="0 0 280 10" width="280" height="10" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 14 }).map((_, i) => (
              <polygon
                key={i}
                points={`${i * 20},10 ${i * 20 + 10},0 ${i * 20 + 20},10`}
                fill="#C9A84C"
                opacity={i % 2 === 0 ? '1' : '0.4'}
              />
            ))}
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/eventos"
            className="bg-[--color-dourado] text-[#0D0D0D] px-10 py-4 font-[--font-titulo] font-bold tracking-[0.2em] uppercase text-sm hover:bg-[--color-dourado-claro] transition-all hover:scale-105 shadow-2xl"
          >
            Próximas Cerimônias
          </Link>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#444] text-[#ccc] px-10 py-4 font-[--font-titulo] font-bold tracking-[0.2em] uppercase text-sm hover:border-[--color-dourado] hover:text-[--color-dourado] transition-all"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Fade bottom para seção seguinte */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  )
}
