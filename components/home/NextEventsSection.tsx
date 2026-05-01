import Link from 'next/link'
import { Event } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

function getCurrentPrice(event: Event): number {
  const now = new Date()
  const active = event.pricing_tiers
    .filter((t) => new Date(t.deadline) >= now)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  return active[0]?.price_cents ?? event.pricing_tiers[event.pricing_tiers.length - 1]?.price_cents ?? 0
}

export function NextEventsSection({ events }: { events: Event[] }) {
  return (
    <section className="py-20 px-4 bg-[--color-creme]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Agenda</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-floresta-escuro] mb-4">
            Próximas Cerimônias
          </h2>
          <div className="zigzag-border w-32 mx-auto" />
        </div>

        {events.length === 0 ? (
          <p className="text-center text-[--color-terra] text-lg py-12">
            Novas datas em breve. Siga nosso Instagram para ser avisado.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/eventos"
            className="inline-block border-2 border-[--color-floresta] text-[--color-floresta] px-8 py-3 font-[--font-titulo] font-bold text-sm tracking-wider uppercase rounded hover:bg-[--color-floresta] hover:text-[--color-bege] transition-all"
          >
            Ver Todas as Cerimônias
          </Link>
        </div>
      </div>
    </section>
  )
}

function EventCard({ event }: { event: Event }) {
  const price = getCurrentPrice(event)
  const date = new Date(event.date)
  const spotsLeft = event.spots_available
  const sold = spotsLeft === 0

  return (
    <Link href={`/eventos/${event.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all duration-300 border border-[--color-bege-escuro] hover:-translate-y-1">
        {/* Imagem */}
        <div className="relative h-48 bg-[--color-floresta]">
          {event.cover_image ? (
            <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-30">
              <svg width="60" height="66" viewBox="0 0 60 66" fill="none">
                <line x1="30" y1="3" x2="4" y2="57" stroke="#F5EDD6" strokeWidth="2"/>
                <line x1="30" y1="3" x2="56" y2="57" stroke="#F5EDD6" strokeWidth="2"/>
                <ellipse cx="30" cy="57" rx="26" ry="4" stroke="#F5EDD6" strokeWidth="1" fill="none"/>
              </svg>
            </div>
          )}
          {/* Badge vagas */}
          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold ${sold ? 'bg-red-600 text-white' : spotsLeft <= 5 ? 'bg-[--color-dourado] text-[--color-floresta-escuro]' : 'bg-[--color-floresta] text-[--color-bege]'}`}>
            {sold ? 'Esgotado' : `${spotsLeft} vagas`}
          </div>
        </div>

        {/* Padrão zigue-zague separador */}
        <div className="h-3 bg-[--color-floresta]" style={{
          clipPath: 'polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)'
        }} />

        {/* Conteúdo */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-[--color-dourado] font-medium mb-2 uppercase tracking-wide">
            <CalendarIcon />
            {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </div>

          <h3 className="font-[--font-titulo] text-lg font-bold text-[--color-floresta-escuro] mb-2 group-hover:text-[--color-floresta] transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-[--color-terra] mb-3">
            <PinIcon />
            {event.location_name}
          </div>

          {/* Medicinas */}
          {event.medicines.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {event.medicines.slice(0, 4).map((m) => (
                <span key={m} className="text-xs bg-[--color-bege] text-[--color-floresta] px-2 py-0.5 rounded-full border border-[--color-bege-escuro]">
                  {m}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-[--color-bege-escuro]">
            <span className="text-[--color-floresta-escuro] font-bold text-lg">
              {price > 0 ? `R$ ${(price / 100).toFixed(0)}` : 'Gratuito'}
            </span>
            <span className="text-xs font-bold text-[--color-dourado] uppercase tracking-wide group-hover:underline">
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CalendarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}
