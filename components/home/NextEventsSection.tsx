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
    <section className="relative py-20 px-4 bg-[#0D0D0D] overflow-hidden">

      {/* Padrão kene de fundo */}
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath d='M0 24 L24 0 L48 24 L24 48 Z' fill='none' stroke='%23F5EDD6' stroke-width='0.8'/%3E%3Cpath d='M12 24 L24 12 L36 24 L24 36 Z' fill='%23F5EDD6' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '48px 48px',
        }}
      />
      {/* Brilho central verde suave */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #0F1F0F 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Agenda</p>
          <h2 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-white mb-4 tracking-wider">
            PRÓXIMOS EVENTOS
          </h2>
          <p className="text-[#666] text-sm max-w-xl mx-auto">
            Cerimônias realizadas em São Paulo e outros estados, sempre num ambiente seguro e espiritualmente preparado.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-16 border border-[#1e1e1e]">
            <p className="text-[#555] text-base mb-4">Novas datas em breve.</p>
            <p className="text-[#444] text-sm">Siga nosso Instagram para ser avisado primeiro.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} reverse={index % 2 !== 0} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/eventos"
            className="inline-block border border-white text-white px-10 py-3 font-[--font-titulo] font-bold text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#0D0D0D] transition-all"
          >
            Ver Todas as Cerimônias
          </Link>
        </div>
      </div>
    </section>
  )
}

function getDurationDays(event: Event): number | null {
  if (event.event_type !== 'vivencia' || !event.end_date) return null
  const start = new Date(event.date)
  const end = new Date(event.end_date)
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff + 1 : null // +1 para contar dia de início e fim
}

function EventCard({ event, reverse }: { event: Event; reverse: boolean }) {
  const price = getCurrentPrice(event)
  const date = new Date(event.date)
  const spotsLeft = event.spots_available
  const sold = spotsLeft === 0
  const durationDays = getDurationDays(event)

  return (
    <Link href={`/eventos/${event.slug}`} className="group block border-b border-white/20 last:border-b-0">
      <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} min-h-[280px] hover:bg-[#111] transition-colors duration-300`}>
        {/* Imagem — quadrada pequena, expande no hover */}
        <div className="relative shrink-0 self-center mx-6 my-6 md:my-0 w-[200px] h-[200px] md:w-[220px] md:h-[220px] overflow-hidden group-hover:w-[340px] group-hover:h-[340px] transition-all duration-500 ease-in-out bg-[#111]">
          {event.cover_image ? (
            <img
              src={event.cover_image}
              alt={event.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="60" height="66" viewBox="0 0 60 66" fill="none" className="opacity-20">
                <line x1="30" y1="3" x2="4" y2="57" stroke="#C9A84C" strokeWidth="2" />
                <line x1="30" y1="3" x2="56" y2="57" stroke="#C9A84C" strokeWidth="2" />
                <ellipse cx="30" cy="57" rx="26" ry="4" stroke="#C9A84C" strokeWidth="1" fill="none" />
              </svg>
            </div>
          )}
          {/* Badge vagas — só mostra se esgotado ou últimas vagas */}
          {(sold || spotsLeft <= 5) && (
            <div className={`absolute top-3 left-3 px-2 py-0.5 text-xs font-bold tracking-wide ${sold ? 'bg-red-700 text-white' : 'bg-[--color-dourado] text-[#0D0D0D]'}`}>
              {sold ? 'ESGOTADO' : `${spotsLeft} VAGAS`}
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="md:w-[55%] flex flex-col justify-center px-8 py-10">
          <div className="flex items-center gap-3 text-xs text-white font-medium mb-3 uppercase tracking-[0.15em]">
            <CalendarIcon />
            {event.event_type === 'vivencia' && event.end_date
              ? `${format(date, "dd/MM/yyyy", { locale: ptBR })} → ${format(new Date(event.end_date), "dd/MM/yyyy", { locale: ptBR })}`
              : format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
            }
            {durationDays && (
              <span className="bg-[--color-dourado] text-[#0D0D0D] px-2 py-0.5 font-bold tracking-normal normal-case">
                {durationDays} dias
              </span>
            )}
          </div>

          <h3 className="font-[--font-titulo] text-2xl font-bold text-white mb-3 group-hover:text-[--color-dourado] transition-colors leading-tight">
            {event.title}
          </h3>

          <div className="flex items-center gap-1 text-xs text-[#666] mb-4">
            <PinIcon />
            {event.location_name}
          </div>

          {event.medicines.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {event.medicines.slice(0, 4).map((m) => (
                <span key={m} className="text-xs text-[#888] border border-[#2a2a2a] px-3 py-1 tracking-wide">
                  {m}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-[--font-titulo] text-2xl font-bold text-white">
              {price > 0 ? `R$ ${(price / 100).toFixed(0)}` : 'Gratuito'}
            </span>
            <span className="text-xs font-bold text-white border border-[#333] px-5 py-2 tracking-[0.15em] uppercase group-hover:border-[--color-dourado] group-hover:text-[--color-dourado] transition-colors">
              SAIBA MAIS →
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
