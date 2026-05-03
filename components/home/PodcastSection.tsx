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
    <section className="py-20 px-4 bg-[--color-floresta-escuro]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Mídia</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-bege] tracking-wider mb-4">
            PODCASTS
          </h2>
          <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto text-sm leading-relaxed">
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
            className="inline-block border border-[--color-dourado] text-[--color-dourado] px-10 py-3 font-[--font-titulo] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[--color-dourado] hover:text-[#0D0D0D] transition-all"
          >
            Ver Toda a Mídia
          </Link>
        </div>
      </div>
    </section>
  )
}
