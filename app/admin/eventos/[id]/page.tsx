import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { EventForm } from '../EventForm'
import { Event } from '@/lib/types'

export default async function EditEventoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('events').select('*').eq('id', id).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Editar Evento</h1>
      <EventForm event={data as Event} />
    </div>
  )
}
