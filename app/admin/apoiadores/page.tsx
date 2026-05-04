import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { DeleteSupporterButton } from './DeleteSupporterButton'

export default async function AdminApoiadoresPage() {
  try {
  const supabase = createAdminClient()
  const { data: supporters } = await supabase
    .from('supporters')
    .select('id, name, category, website, display_order, is_active')
    .order('display_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">Apoiadores</h1>
        <Link href="/admin/apoiadores/novo" className="bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-bold hover:bg-[--color-floresta-claro] transition-colors">
          + Novo Apoiador
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--color-floresta-escuro] text-[--color-bege]">
            <tr>
              {['Ordem', 'Nome', 'Categoria', 'Website', 'Status', 'Ações'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(supporters ?? []).map((s: any) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 text-center">{s.display_order}</td>
                <td className="px-4 py-3 font-medium max-w-[200px] truncate">{s.name}</td>
                <td className="px-4 py-3 text-gray-600">{s.category ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600 max-w-[180px] truncate">
                  {s.website ? <a href={s.website} target="_blank" rel="noopener noreferrer" className="text-[--color-floresta] hover:underline">{s.website}</a> : '—'}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {s.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/apoiadores/${s.id}`} className="text-xs text-[--color-floresta] hover:underline">Editar</Link>
                    <DeleteSupporterButton id={s.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(supporters ?? []).length === 0 && <p className="text-center text-gray-500 py-10">Nenhum apoiador cadastrado.</p>}
      </div>
    </div>
  )
  } catch (e: any) {
    return <div className="p-8 text-red-600 font-mono text-sm bg-red-50 rounded whitespace-pre-wrap"><strong>Erro:</strong> {e?.message ?? String(e)}</div>
  }
}
