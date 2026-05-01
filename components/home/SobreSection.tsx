export function SobreSection() {
  return (
    <section className="py-20 px-4 bg-[--color-bege]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Texto */}
          <div>
            <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Quem Somos</p>
            <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-floresta-escuro] mb-6 leading-tight">
              A Casa Xamânica SP
            </h2>
            <div className="text-[--color-preto] text-base leading-relaxed space-y-4 opacity-85">
              <p>
                A Casa Xamânica SP é um instituto de medicina tradicional indígena, dedicado à realização de cerimônias sagradas com as plantas de poder da floresta amazônica.
              </p>
              <p>
                Nosso trabalho é guiado pelo respeito às tradições ancestrais dos povos indígenas e pelo compromisso com a cura, o autoconhecimento e a reconexão com a natureza.
              </p>
              <p>
                Realizamos cerimônias com Ayahuasca, Rapé e Sananga em São Paulo e em outros estados do Brasil, sempre num ambiente seguro, acolhedor e espiritualmente preparado.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { num: '5+', label: 'Anos de cerimônias' },
                { num: '500+', label: 'Participantes' },
                { num: '100%', label: 'Tradição respeitada' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-[--font-titulo] text-3xl font-bold text-[--color-floresta]">{stat.num}</p>
                  <p className="text-xs text-[--color-terra] uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Elemento visual */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-72 h-72 rounded-full border-2 border-[--color-dourado] flex items-center justify-center bg-[--color-floresta-escuro]">
                <svg width="160" height="176" viewBox="0 0 60 66" fill="none">
                  <line x1="30" y1="3" x2="4" y2="57" stroke="#C9A84C" strokeWidth="2"/>
                  <line x1="30" y1="3" x2="56" y2="57" stroke="#C9A84C" strokeWidth="2"/>
                  <line x1="30" y1="3" x2="30" y2="6" stroke="#F5EDD6" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M13 44 Q30 38 47 44" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                  <path d="M9 51 Q30 44 51 51" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                  <path d="M8 57 Q30 50 52 57" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
                  <ellipse cx="30" cy="57" rx="26" ry="4" stroke="#C9A84C" strokeWidth="1" fill="none"/>
                  <text x="30" y="28" textAnchor="middle" fill="#F5EDD6" fontSize="3" fontFamily="serif" letterSpacing="1">
                    ✦  ✦  ✦
                  </text>
                </svg>
              </div>
              {/* Círculos decorativos */}
              <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full border border-[--color-dourado] opacity-40" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full border border-[--color-dourado] opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
