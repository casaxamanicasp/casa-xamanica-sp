import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Event } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RegistrationWizard } from '@/components/events/RegistrationWizard'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('title,description').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: data.title,
    description: data.description?.slice(0, 160) ?? '',
  }
}

export default async function EventoPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('events').select('*').eq('slug', slug).single()
  if (!data) notFound()

  const event = data as Event
  const date = new Date(event.date)
  const now = new Date()
  const isPast = date < now

  // Preço atual
  const activeTier = event.pricing_tiers
    .filter((t) => new Date(t.deadline) >= now)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]

  return (
    <div className="min-h-screen bg-[--color-creme]">
      {/* Hero do evento */}
      <div className="bg-[--color-floresta-escuro] relative overflow-hidden">
        {event.cover_image && (
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.cover_image})` }}
          />
        )}
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-16 text-[--color-bege]">
          {event.event_type !== 'vivencia' && event.medicines.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {event.medicines.map((m) => (
                <span key={m} className="text-xs bg-[--color-floresta-claro] text-[--color-bege] px-3 py-1 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-[--font-titulo] text-3xl md:text-5xl font-bold mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-6 text-sm opacity-90">
            {event.event_type === 'vivencia' && event.end_date ? (
              <span>📅 {format(date, "dd/MM/yyyy", { locale: ptBR })} → {format(new Date(event.end_date), "dd/MM/yyyy", { locale: ptBR })}</span>
            ) : (
              <span>📅 {format(date, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
            )}
            <span>🕐 {format(date, 'HH:mm')}{event.event_type === 'vivencia' && event.end_date ? ` → ${format(new Date(event.end_date), 'HH:mm')}` : ''}</span>
            <span>📍 {event.location_name}</span>
            <span>👥 {event.spots_available} vagas disponíveis</span>
          </div>
        </div>
      </div>

      {/* Zigue-zague */}
      <div className="h-8 bg-[--color-floresta-escuro]" style={{
        clipPath: 'polygon(0 0, 2% 100%, 4% 0, 6% 100%, 8% 0, 10% 100%, 12% 0, 14% 100%, 16% 0, 18% 100%, 20% 0, 22% 100%, 24% 0, 26% 100%, 28% 0, 30% 100%, 32% 0, 34% 100%, 36% 0, 38% 100%, 40% 0, 42% 100%, 44% 0, 46% 100%, 48% 0, 50% 100%, 52% 0, 54% 100%, 56% 0, 58% 100%, 60% 0, 62% 100%, 64% 0, 66% 100%, 68% 0, 70% 100%, 72% 0, 74% 100%, 76% 0, 78% 100%, 80% 0, 82% 100%, 84% 0, 86% 100%, 88% 0, 90% 100%, 92% 0, 94% 100%, 96% 0, 98% 100%, 100% 0)'
      }} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            {event.description && (
              <div className="bg-white rounded-lg p-6 shadow-[--shadow-card]">
                <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-4">
                  {event.event_type === 'vivencia' ? 'Sobre a Vivência' : 'Sobre a Cerimônia'}
                </h2>
                <div
                  className="prose-xamanica"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
            )}

            {/* Cronograma / Vivências e Atividades */}
            {event.schedule.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-[--shadow-card]">
                <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-4">
                  {event.event_type === 'vivencia' ? 'Vivências e Atividades' : 'Cronograma'}
                </h2>
                <div className="space-y-3">
                  {event.schedule.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      {item.time && (
                        <span className="font-[--font-titulo] font-bold text-[--color-dourado] min-w-[48px] text-sm shrink-0">{item.time}</span>
                      )}
                      <span className="text-[--color-preto] text-sm">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orientações */}
            {event.orientations && (
              <div className="bg-[--color-bege] rounded-lg p-6 border border-[--color-bege-escuro]">
                <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-4">⚠️ Orientações Gerais</h2>
                <div
                  className="prose-xamanica text-sm"
                  dangerouslySetInnerHTML={{ __html: event.orientations }}
                />
              </div>
            )}

            {/* Como chegar */}
            <div className="bg-white rounded-lg p-6 shadow-[--shadow-card]">
              <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-2">📍 Local</h2>
              <p className="text-[--color-terra] font-medium mb-1">{event.location_name}</p>
              <p className="text-sm text-[--color-preto] opacity-70 mb-4">{event.address}</p>
              {event.maps_link && (
                <a
                  href={event.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-medium hover:bg-[--color-floresta-claro] transition-colors"
                >
                  Abrir no Google Maps →
                </a>
              )}
            </div>
          </div>

          {/* Sidebar — Inscrição */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {isPast ? (
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <p className="text-gray-500 font-medium">Esta cerimônia já ocorreu.</p>
                </div>
              ) : event.spots_available === 0 ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-600 font-bold font-[--font-titulo] text-lg mb-2">Vagas Esgotadas</p>
                  <p className="text-sm text-red-500">Entre em contato pelo WhatsApp para lista de espera.</p>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-green-500 text-white px-6 py-3 rounded font-bold text-sm"
                  >
                    Entrar na lista de espera
                  </a>
                </div>
              ) : (
                <RegistrationWizard event={event} activeTier={activeTier ?? null} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
