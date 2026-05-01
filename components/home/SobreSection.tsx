export function SobreSection() {
  return (
    <section className="bg-[--color-floresta-escuro]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Lado visual — mosaico geométrico indígena */}
          <div className="relative bg-[#111] flex items-center justify-center overflow-hidden min-h-[320px] md:min-h-0">
            {/* Padrão kene de fundo */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Crect width='32' height='32' fill='none'/%3E%3Cpath d='M0 16 L16 0 L32 16 L16 32 Z' fill='none' stroke='%23C9A84C' stroke-width='0.6'/%3E%3C/svg%3E")`,
                backgroundSize: '32px 32px',
              }}
            />
            {/* Glow central */}
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #2D4A2D 0%, transparent 70%)' }}
            />

            {/* Mandala / Tipé grande centralizado */}
            <div className="relative z-10 flex flex-col items-center gap-6 py-16 px-8">
              <svg width="200" height="220" viewBox="0 0 60 66" fill="none">
                {/* Círculos concêntricos */}
                <circle cx="30" cy="34" r="28" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.3" />
                <circle cx="30" cy="34" r="22" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.2" />
                <circle cx="30" cy="34" r="16" stroke="#C9A84C" strokeWidth="0.4" fill="none" opacity="0.2" />
                {/* Tipé */}
                <line x1="30" y1="3" x2="4" y2="57" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="30" y1="3" x2="56" y2="57" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="30" y1="3" x2="30" y2="7" stroke="#F5EDD6" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M13 44 Q30 38 47 44" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
                <path d="M9 51 Q30 44 51 51" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
                <path d="M7 57 Q30 50 53 57" stroke="#C9A84C" strokeWidth="1.2" fill="none" />
                <ellipse cx="30" cy="57" rx="26" ry="3.5" stroke="#C9A84C" strokeWidth="0.8" fill="none" />
              </svg>

              {/* Estrelas decorativas */}
              <div className="flex gap-4 text-[--color-dourado] text-lg opacity-60">
                <span>✦</span><span>✦</span><span>✦</span>
              </div>
            </div>
          </div>

          {/* Lado texto */}
          <div className="flex flex-col justify-center px-10 md:px-16 py-16">
            <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-4">Quem Somos</p>
            <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-white mb-6 leading-tight tracking-wide">
              A MISSÃO DA<br />CASA XAMÂNICA SP
            </h2>
            <div className="space-y-4 text-[#aaa] text-sm leading-relaxed mb-8">
              <p>
                Somos um instituto de medicina tradicional indígena, dedicado à realização de cerimônias sagradas com as plantas de poder da floresta amazônica — no coração de São Paulo.
              </p>
              <p>
                Nosso trabalho une o conhecimento ancestral dos povos indígenas com a busca contemporânea por cura, autoconhecimento e reconexão com a natureza.
              </p>
              <p>
                Realizamos cerimônias com Ayahuasca, Rapé e Sananga em São Paulo e em outros estados do Brasil, sempre num ambiente seguro, acolhedor e espiritualmente preparado.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#222]">
              {[
                { num: '5+', label: 'Anos' },
                { num: '500+', label: 'Participantes' },
                { num: '100%', label: 'Tradição' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[--font-titulo] text-3xl font-bold text-[--color-dourado]">{stat.num}</p>
                  <p className="text-xs text-[#555] uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
