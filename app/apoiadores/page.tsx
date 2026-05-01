import { createClient } from '@/lib/supabase/server'
import { Supporter } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apoiadores',
  description: 'Conheça os apoiadores e parceiros da Casa Xamânica SP.',
}

export default async function ApoiadoresPage() {
  const supabase = await createClient()
  const { data: supporters } = await supabase
    .from('supporters')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const byCategory = (supporters as Supporter[] ?? []).reduce<Record<string, Supporter[]>>((acc, s) => {
    const cat = s.category ?? 'Parceiros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] py-16 px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Gratidão</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4">
          Apoiadores
        </h1>
        <p className="text-[--color-bege] opacity-80 max-w-xl mx-auto">
          Conheça os parceiros e apoiadores que tornam possível o nosso trabalho.
        </p>
      </div>

      <div className="h-8 bg-[--color-floresta-escuro]" style={{ clipPath: 'polygon(0 0, 2% 100%, 4% 0, 6% 100%, 8% 0, 10% 100%, 12% 0, 14% 100%, 16% 0, 18% 100%, 20% 0, 22% 100%, 24% 0, 26% 100%, 28% 0, 30% 100%, 32% 0, 34% 100%, 36% 0, 38% 100%, 40% 0, 42% 100%, 44% 0, 46% 100%, 48% 0, 50% 100%, 52% 0, 54% 100%, 56% 0, 58% 100%, 60% 0, 62% 100%, 64% 0, 66% 100%, 68% 0, 70% 100%, 72% 0, 74% 100%, 76% 0, 78% 100%, 80% 0, 82% 100%, 84% 0, 86% 100%, 88% 0, 90% 100%, 92% 0, 94% 100%, 96% 0, 98% 100%, 100% 0)' }} />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {Object.keys(byCategory).length === 0 ? (
          <p className="text-center text-[--color-terra] py-20">Em breve novos apoiadores.</p>
        ) : (
          Object.entries(byCategory).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-6 pb-2 border-b-2 border-[--color-dourado]">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((supporter) => (
                  <SupporterCard key={supporter.id} supporter={supporter} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function SupporterCard({ supporter }: { supporter: Supporter }) {
  const Card = (
    <div className="bg-white rounded-lg p-6 shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all hover:-translate-y-1 h-full flex flex-col">
      {supporter.logo_url && (
        <div className="h-20 flex items-center justify-center mb-4">
          <img src={supporter.logo_url} alt={supporter.name} className="max-h-full max-w-full object-contain" />
        </div>
      )}
      <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro] mb-2">
        {supporter.name}
      </h3>
      {supporter.description && (
        <p className="text-sm text-[--color-preto] opacity-70 leading-relaxed flex-1">
          {supporter.description}
        </p>
      )}
      {supporter.website && (
        <a
          href={supporter.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-xs font-bold text-[--color-floresta] hover:underline"
        >
          Visitar site →
        </a>
      )}
    </div>
  )

  return supporter.website ? (
    <a href={supporter.website} target="_blank" rel="noopener noreferrer" className="block group">
      {Card}
    </a>
  ) : (
    <div>{Card}</div>
  )
}
