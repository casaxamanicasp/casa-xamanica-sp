import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Fotos das cerimônias e vivências da Casa Xamânica SP.',
}

const categories = [
  { value: 'cerimonia', label: 'Cerimônias' },
  { value: 'vivencia', label: 'Vivências' },
  { value: 'natureza', label: 'Natureza' },
]

export default async function GaleriaPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true })

  const grouped = categories.map((cat) => ({
    ...cat,
    images: (images ?? []).filter((img) => img.category === cat.value),
  })).filter((g) => g.images.length > 0)

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Cabeçalho */}
      <div className="bg-[#0D0D0D] py-20 px-4 text-center border-b border-[#1a1a1a]">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Memórias</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
          GALERIA
        </h1>
        <p className="text-[#666] max-w-xl mx-auto text-sm leading-relaxed">
          Registros das cerimônias, vivências e momentos sagrados da Casa Xamânica SP.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {(images ?? []).length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#444] text-lg">Em breve, fotos das nossas cerimônias.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map((group) => (
              <div key={group.value}>
                <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-dourado] uppercase tracking-[0.3em] mb-6 pb-3 border-b border-[#1a1a1a]">
                  {group.label}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {group.images.map((img) => (
                    <div key={img.id} className="group relative overflow-hidden bg-[#111] aspect-square">
                      <img
                        src={img.url}
                        alt={img.caption ?? 'Casa Xamânica SP'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {img.caption && (
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <p className="text-white text-xs leading-snug">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Grid geral se não houver categorias */}
            {grouped.length === 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {(images ?? []).map((img) => (
                  <div key={img.id} className="group relative overflow-hidden bg-[#111] aspect-square">
                    <img
                      src={img.url}
                      alt={img.caption ?? 'Casa Xamânica SP'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
