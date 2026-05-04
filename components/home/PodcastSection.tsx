import Link from 'next/link'

const PODCAST_VIDEOS = [
  {
    id: 'zqfaB8OOLZI',
    start: 7337,
    title: 'Podcast — Episódio 1',
  },
  {
    id: 'eQcusXukRB4',
    start: 0,
    title: 'Podcast — Episódio 2',
  },
]

export function PodcastSection({ limit }: { limit?: number }) {
  const videos = limit ? PODCAST_VIDEOS.slice(0, limit) : PODCAST_VIDEOS

  return (
    <section className="relative py-20 px-4 bg-[#0D0D0D] overflow-hidden">

      {/* Padrão kene de fundo */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M0 24 L24 0 L48 24 L24 48 Z' fill='none' stroke='%23F5EDD6' stroke-width='0.8'/%3E%3Cpath d='M12 24 L24 12 L36 24 L24 36 Z' fill='%23F5EDD6' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Brilho central verde suave */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0F1F0F 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-3">Mídia</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-white tracking-wider mb-4">
            PODCASTS
          </h2>
          <p className="text-white/70 max-w-xl mx-auto text-sm leading-relaxed">
            Conversas sobre medicina ancestral, espiritualidade e o caminho xamânico.
          </p>
        </div>

        <div className={`grid grid-cols-1 ${videos.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-6`}>
          {videos.map((video) => (
            <div key={video.id} className="overflow-hidden rounded-lg bg-[#0D0D0D] shadow-lg">
              <div className="relative aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}${video.start ? `?start=${video.start}` : ''}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/midia"
            className="inline-block border border-white text-white px-10 py-3 font-[--font-titulo] font-bold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0D0D0D] transition-all"
          >
            Ver Toda a Mídia
          </Link>
        </div>
      </div>
    </section>
  )
}
