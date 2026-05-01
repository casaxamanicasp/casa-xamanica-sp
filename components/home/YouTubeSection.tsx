import { YouTubeVideo } from '@/lib/youtube/fetch-videos'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function YouTubeSection({ videos }: { videos: YouTubeVideo[] }) {
  if (videos.length === 0) return null

  return (
    <section className="py-20 px-4 bg-[--color-bege]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Canal</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-floresta-escuro] mb-4">
            Últimos Vídeos
          </h2>
          <div className="zigzag-border w-32 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-white rounded-lg overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                  <div className="bg-red-600 rounded-full p-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-[--font-titulo] text-sm font-bold text-[--color-floresta-escuro] line-clamp-2 mb-2 group-hover:text-[--color-floresta] transition-colors">
                  {video.title}
                </h3>
                <p className="text-xs text-[--color-terra]">
                  {format(new Date(video.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
