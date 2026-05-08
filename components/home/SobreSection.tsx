export function SobreSection() {
  return (
    <section className="bg-[--color-floresta-escuro]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Foto real — quadrada centralizada */}
          <div className="flex items-center justify-center bg-[--color-floresta-escuro] pt-10 pb-2 md:py-12 px-8">
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
            <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold mb-6 leading-tight tracking-wide" style={{ color: '#2D4A2D' }}>
              A MISSÃO DA<br />CASA XAMÂNICA SP
            </h2>
            <div className="space-y-4 text-[#aaa] text-sm leading-relaxed mb-8">
              <p>
                Somos uma Casa Xamânica dedicada ao cuidado do corpo, da mente e do espírito, guiados pelos saberes ancestrais dos povos da floresta. Nosso propósito é criar um espaço seguro, sagrado e acolhedor para aqueles que sentem o chamado do autoconhecimento, da cura e da reconexão com sua essência.
              </p>
              <p>
                Trabalhamos em parceria e respeito com as tradições indígenas, honrando seus rituais, cantos, medicinas e ensinamentos. Acreditamos na força da natureza como caminho de equilíbrio e na espiritualidade como ponte para uma vida mais consciente.
              </p>
              <p>
                Nossos trabalhos são conduzidos com seriedade, responsabilidade e amor, oferecendo vivências, cerimônias e encontros que auxiliam cada pessoa em seu próprio processo de transformação.
              </p>
              <p>
                Aqui, cada jornada é única. Cada história é respeitada. E cada passo é guiado com presença, verdade e conexão.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#222]">
              {[
                { num: '7+', label: 'Anos' },
                { num: '300+', label: 'Cerimônias' },
                { num: '5.000+', label: 'Participantes' },
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
