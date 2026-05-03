import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export async function GaleriaSection() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('id, url, caption')
    .order('display_order', { ascending: true })
    .limit(6)

  if (!images || images.length === 0) return null

  return (
    <section className="py-20 px-4 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Memórias</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-white tracking-wider">
            GALERIA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {images.map((img, i) => (
            <Link
              key={img.id}
              href="/galeria"
              className={`group relative overflow-hidden bg-[#111] ${i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''}`}
              style={{ aspectRatio: i === 0 ? '1/2' : '1/1' }}
            >
              <img
                src={img.url}
                alt={img.caption ?? 'Galeria Casa Xamânica'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {img.caption && (
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-xs">{img.caption}</p>
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/galeria"
            className="inline-block border border-[--color-dourado] text-[--color-dourado] px-10 py-3 font-[--font-titulo] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[--color-dourado] hover:text-[#0D0D0D] transition-all"
          >
            Ver Galeria Completa
          </Link>
        </div>
      </div>
    </section>
  )
}
