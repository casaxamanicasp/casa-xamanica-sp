import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { ProductForm } from '../ProductForm'

export default async function EditProdutoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Editar Produto</h1>
      <ProductForm product={data} />
    </div>
  )
}
