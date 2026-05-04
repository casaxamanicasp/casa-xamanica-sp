import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export async function GaleriaSection() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('id, url, caption')
    .order('display_order', { ascending: true })

  if (!images || images.length === 0) return null

  return (
    <section className="relative py-20 px-4 bg-[#080808] overflow-hidden">

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
          <p className="text-white/60 text-xs tracking-[0.5em] uppercase mb-3">Memórias</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-white tracking-wider">
            GALERIA
          </h2>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
          {images.map((img) => (
            <Link
              key={img.id}
              href="/galeria"
              className="group relative overflow-hidden bg-[#111] break-inside-avoid block"
            >
              <img
                src={img.url}
                alt={img.caption ?? 'Galeria Casa Xamânica'}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-white text-xs leading-snug">{img.caption}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/galeria"
            className="inline-block border border-white text-white px-10 py-3 font-[--font-titulo] font-bold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0D0D0D] transition-all"
          >
            Ver Galeria Completa
          </Link>
        </div>
      </div>
    </section>

  )
}
