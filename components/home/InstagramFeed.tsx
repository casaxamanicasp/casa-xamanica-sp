import { InstagramPost } from '@/lib/instagram/fetch-posts'

export function InstagramFeed({ posts }: { posts: InstagramPost[] }) {
  const handle = process.env.NEXT_PUBLIC_INSTAGRAM ?? 'casaxamanicasp'

  if (posts.length === 0) return null

  return (
    <section className="py-20 px-4 bg-[--color-floresta-escuro]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Siga-nos</p>
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-bege] hover:text-[--color-dourado] transition-colors"
          >
            @{handle}
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3 max-w-3xl mx-auto">
          {posts.slice(0, 9).map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group rounded"
            >
              <img
                src={post.media_type === 'VIDEO' ? post.thumbnail_url ?? post.media_url : post.media_url}
                alt={post.caption?.slice(0, 50) ?? 'Post Instagram'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[--color-floresta-escuro] opacity-0 group-hover:opacity-60 transition-opacity duration-300 flex items-center justify-center">
                {post.media_type === 'VIDEO' ? (
                  <PlayIcon className="text-white w-8 h-8" />
                ) : (
                  <InstagramIcon className="text-white w-8 h-8" />
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-[--color-bege] text-[--color-bege] px-6 py-3 text-sm font-bold tracking-wide uppercase rounded hover:bg-[--color-bege] hover:text-[--color-floresta-escuro] transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            Ver mais no Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  )
}
