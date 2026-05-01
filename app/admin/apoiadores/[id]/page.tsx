import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { ApoiadorForm } from '../ApoiadorForm'

export default async function EditApoiadorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('supporters').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Editar Apoiador</h1>
      <ApoiadorForm supporter={data} />
    </div>
  )
}
