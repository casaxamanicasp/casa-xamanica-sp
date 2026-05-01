import { createAdminClient } from '@/lib/supabase/admin'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default async function AdminInscricoesPage() {
  const supabase = createAdminClient()

  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      *,
      events(title, date),
      anamnesis(full_name, email, phone, birth_date, health_conditions, current_medications, ceremony_expectation)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Inscrições</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[--color-floresta-escuro] text-[--color-bege]">
              <tr>
                {['Nome', 'E-mail', 'Telefone', 'Evento', 'Lote', 'Valor', 'Status', 'Data', 'Anamnese'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(registrations ?? []).map((reg: any) => {
                const anam = reg.anamnesis
                const event = reg.events
                return (
                  <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-[--color-floresta-escuro]">{anam?.full_name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{anam?.email ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{anam?.phone ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{event?.title ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.pricing_tier_name}</td>
                    <td className="px-4 py-3 font-medium">R$ {((reg.amount_cents ?? 0) / 100).toFixed(0)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        reg.status === 'approved' ? 'bg-green-100 text-green-700' :
                        reg.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {reg.status === 'approved' ? 'Confirmado' : reg.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {format(new Date(reg.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                    </td>
                    <td className="px-4 py-3">
                      {anam && (
                        <details className="cursor-pointer">
                          <summary className="text-xs text-[--color-floresta] hover:underline">Ver ficha</summary>
                          <div className="mt-2 text-xs bg-[--color-bege] rounded p-3 space-y-1 min-w-[300px]">
                            <p><b>Medicações:</b> {anam.current_medications}</p>
                            <p><b>Condições:</b> {(anam.health_conditions ?? []).join(', ')}</p>
                            <p><b>Intenção:</b> {anam.ceremony_expectation}</p>
                          </div>
                        </details>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {(registrations ?? []).length === 0 && (
          <p className="text-center text-gray-500 py-10">Nenhuma inscrição ainda.</p>
        )}
      </div>
    </div>
  )
}
