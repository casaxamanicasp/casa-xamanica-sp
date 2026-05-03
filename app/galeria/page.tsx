import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'
import { TribalDivider } from '@/components/ui/TribalDivider'

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

  return (
    <div className="min-h-screen bg-[--color-creme]">
      {/* Cabeçalho */}
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Memórias</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">
          GALERIA
        </h1>
        <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto text-sm leading-relaxed">
          Registros das cerimônias, vivências e momentos sagrados da Casa Xamânica SP.
        </p>
      </div>

      <TribalDivider />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {(images ?? []).length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[--color-terra] text-lg">Em breve, fotos das nossas cerimônias.</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-2 space-y-2">
            {(images ?? []).map((img) => (
              <div key={img.id} className="group relative overflow-hidden bg-[#111] break-inside-avoid">
                <img
                  src={img.url}
                  alt={img.caption ?? 'Casa Xamânica SP'}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-xs leading-snug">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
