import type { Metadata } from 'next'
import { TribalDivider } from '@/components/ui/TribalDivider'

export const metadata: Metadata = {
  title: 'Mídia',
  description: 'Podcasts, entrevistas e aparições da Casa Xamânica SP na mídia.',
}

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

export default function MidiaPage() {
  return (
    <div className="min-h-screen bg-[--color-creme]">
      {/* Cabeçalho */}
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Aparições</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">
          MÍDIA
        </h1>
        <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto text-base leading-relaxed">
          Podcasts, entrevistas e conversas sobre medicina ancestral e o caminho xamânico.
        </p>
      </div>

      <TribalDivider />

      <div className="max-w-6xl mx-auto px-4 py-12">

        <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-8 uppercase tracking-wider">
          Podcasts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PODCAST_VIDEOS.map((video) => (
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

      </div>
    </div>
  )
}
