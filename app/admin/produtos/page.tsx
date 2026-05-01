import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { deleteProduct } from './actions'

export default async function AdminProdutosPage() {
  const supabase = createAdminClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price_cents, stock, category, is_active')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">Produtos</h1>
        <Link href="/admin/produtos/novo" className="bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-bold hover:bg-[--color-floresta-claro] transition-colors">
          + Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--color-floresta-escuro] text-[--color-bege]">
            <tr>
              {['Produto', 'Categoria', 'Preço', 'Estoque', 'Status', 'Ações'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(products ?? []).map((p: any) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.category ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600">R$ {(p.price_cents / 100).toFixed(2).replace('.', ',')}</td>
                <td className="px-4 py-3 text-gray-600">{p.stock}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/produtos/${p.id}`} className="text-xs text-[--color-floresta] hover:underline">Editar</Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="id" value={p.id} />
                      <button type="submit" className="text-xs text-red-500 hover:underline" onClick={(e) => { if (!confirm('Excluir produto?')) e.preventDefault() }}>Excluir</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(products ?? []).length === 0 && <p className="text-center text-gray-500 py-10">Nenhum produto cadastrado.</p>}
      </div>
    </div>
  )
}
