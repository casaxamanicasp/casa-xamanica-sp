import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { deleteEvent } from './actions'

export default async function AdminEventosPage() {
  const supabase = createAdminClient()
  const { data: events } = await supabase
    .from('events')
    .select('id, title, date, spots_total, spots_available, is_active, pricing_tiers')
    .order('date', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">Eventos</h1>
        <Link
          href="/admin/eventos/novo"
          className="bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-bold hover:bg-[--color-floresta-claro] transition-colors"
        >
          + Novo Evento
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--color-floresta-escuro] text-[--color-bege]">
            <tr>
              {['Evento', 'Data', 'Vagas', 'Valor', 'Status', 'Ações'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(events ?? []).map((event: any) => {
              const price = event.pricing_tiers?.[0]?.price_cents ?? 0
              return (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-[--color-floresta-escuro] max-w-[200px] truncate">{event.title}</td>
                  <td className="px-4 py-3 text-gray-600">{format(new Date(event.date), "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                  <td className="px-4 py-3 text-gray-600">{event.spots_available}/{event.spots_total}</td>
                  <td className="px-4 py-3 text-gray-600">R$ {(price / 100).toFixed(0)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${event.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {event.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/eventos/${event.id}`} className="text-xs text-[--color-floresta] hover:underline">Editar</Link>
                      <form action={deleteEvent}>
                        <input type="hidden" name="id" value={event.id} />
                        <button type="submit" className="text-xs text-red-500 hover:underline" onClick={(e) => { if (!confirm('Excluir este evento?')) e.preventDefault() }}>
                          Excluir
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {(events ?? []).length === 0 && <p className="text-center text-gray-500 py-10">Nenhum evento cadastrado.</p>}
      </div>
    </div>
  )
}
