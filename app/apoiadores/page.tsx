import { createClient } from '@/lib/supabase/server'
import { Supporter } from '@/lib/types'
import type { Metadata } from 'next'
import { KeneDivider } from '@/components/ui/KeneDivider'

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

  const all = (supporters as Supporter[] ?? [])

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Gratidão</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">
          APOIADORES
        </h1>
        <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto leading-relaxed">
          Conheça os parceiros e apoiadores que tornam possível o nosso trabalho.
        </p>
      </div>

      <KeneDivider />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {all.length === 0 ? (
          <p className="text-center text-[--color-terra] py-20">Em breve novos apoiadores.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {all.map((supporter) => (
              <SupporterCard key={supporter.id} supporter={supporter} />
            ))}
          </div>
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
