import { EventForm } from '../EventForm'

export default function NovoEventoPage() {
  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Novo Evento</h1>
      <EventForm />
    </div>
  )
}
