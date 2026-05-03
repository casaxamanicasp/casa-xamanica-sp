export function SobreSection() {
  return (
    <section className="bg-[--color-floresta-escuro]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Foto real — quadrada centralizada */}
          <div className="flex items-center justify-center bg-[--color-floresta-escuro] py-12 px-8">
            <div className="relative w-[360px] h-[360px] md:w-[460px] md:h-[460px] overflow-hidden shrink-0">
              <img
                src="https://ejgoiouwzkmxuuvtxulv.supabase.co/storage/v1/object/public/events/foto%20quem%20somos.jpeg"
                alt="Quem somos — Casa Xamânica SP"
                className="w-full h-full object-cover object-center"
              />
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
