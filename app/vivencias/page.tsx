import { createClient } from '@/lib/supabase/server'
import { Event } from '@/lib/types'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'
import { TribalDivider } from '@/components/ui/TribalDivider'

export const metadata: Metadata = {
  title: 'Vivências',
  description: 'Retiros, imersões e encontros da Casa Xamânica SP — mergulhe na tradição ancestral indígena.',
}

function getCurrentPrice(event: Event): number {
  const now = new Date()
  const active = event.pricing_tiers
    .filter((t) => new Date(t.deadline) >= now)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
  return active[0]?.price_cents ?? event.pricing_tiers.at(-1)?.price_cents ?? 0
}

export default async function VivenciasPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .eq('is_active', true)
    .eq('event_type', 'vivencia')
    .order('date', { ascending: true })

  const upcoming = (events ?? []).filter((e) => new Date(e.date) >= new Date()) as Event[]
  const past = (events ?? []).filter((e) => new Date(e.date) < new Date()) as Event[]

  return (
    <div className="min-h-screen bg-[--color-creme]">
      {/* Cabeçalho */}
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Experiências</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">
          VIVÊNCIAS
        </h1>
        <p className="text-[--color-bege] opacity-80 max-w-xl mx-auto text-base leading-relaxed">
          Retiros, imersões e encontros de aprofundamento — um mergulho mais profundo na medicina ancestral indígena.
        </p>
      </div>

      <TribalDivider />

      <div className="max-w-5xl mx-auto px-4 py-12">
{upcoming.length === 0 ? (
          <div className="text-center py-20 border border-[--color-bege-escuro] rounded-lg bg-white">
            <p className="text-[--color-terra] text-lg mb-2">Novas vivências em breve.</p>
            <p className="text-sm text-[#999] mb-4">Siga nosso Instagram para ser avisado primeiro.</p>
            <a
              href={`https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM ?? 'casaxamanicasp'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-floresta] underline font-medium text-sm"
            >
              @casaxamanicasp
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {upcoming.map((event) => (
              <EventRow key={event.id} event={event} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-16">
            <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-terra] mb-6 opacity-60">
              Vivências Anteriores
            </h2>
            <div className="space-y-4 opacity-60">
              {past.slice(0, 3).map((event) => (
                <EventRow key={event.id} event={event} past />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function getDurationDays(event: Event): number | null {
  if (!event.end_date) return null
  const start = new Date(event.date)
  const end = new Date(event.end_date)
  const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff + 1 : null
}

function EventRow({ event, past = false }: { event: Event; past?: boolean }) {
  const price = getCurrentPrice(event)
  const date = new Date(event.date)
  const spotsLeft = event.spots_available
  const sold = spotsLeft === 0
  const durationDays = getDurationDays(event)

  return (
    <Link href={`/eventos/${event.slug}`} className="group block">
      <div className="bg-white rounded-lg border border-[--color-bege-escuro] shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all overflow-hidden flex flex-col md:flex-row">
        {/* Foto de capa (mobile: topo, desktop: lado esquerdo) */}
        {event.cover_image && (
          <div className="md:hidden w-full overflow-hidden">
            <img src={event.cover_image} alt={event.title} className="w-full h-auto block" />
          </div>
        )}

        {/* Data */}
        <div className="bg-[--color-floresta-escuro] text-[--color-bege] p-6 flex flex-col items-center justify-center min-w-[120px] text-center">
          <span className="font-[--font-titulo] text-3xl font-bold">{format(date, 'dd')}</span>
          <span className="text-xs uppercase tracking-wider text-[--color-dourado]">
            {format(date, 'MMM', { locale: ptBR })}
          </span>
          <span className="text-sm opacity-80">{format(date, 'yyyy')}</span>
          {durationDays && (
            <span className="mt-2 bg-[--color-dourado] text-[#0D0D0D] text-xs font-bold px-2 py-0.5">
              {durationDays} dias
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Vivência</span>
            </div>
            <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] group-hover:text-[--color-floresta] transition-colors mb-1">
              {event.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[--color-terra] mb-2">
              <span>📍 {event.location_name}</span>
              {event.end_date
                ? <span>📅 {format(date, 'dd/MM/yyyy', { locale: ptBR })} → {format(new Date(event.end_date), 'dd/MM/yyyy', { locale: ptBR })}</span>
                : <span>📅 {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
              }
            </div>
            {event.medicines.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {event.medicines.slice(0, 4).map((m) => (
                  <span key={m} className="text-xs bg-[--color-bege] text-[--color-floresta] px-2 py-0.5 rounded-full border border-[--color-bege-escuro]">
                    {m}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">
              {price > 0 ? `R$ ${(price / 100).toFixed(0)}` : 'Gratuito'}
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              past ? 'bg-gray-100 text-gray-500' :
              sold ? 'bg-red-100 text-red-600' :
              spotsLeft <= 5 ? 'bg-amber-100 text-amber-700' :
              'bg-green-100 text-green-700'
            }`}>
              {past ? 'Encerrado' : sold ? 'Esgotado' : `${spotsLeft} vagas`}
            </span>
            {!past && !sold && (
              <span className="text-xs font-bold text-[--color-dourado] uppercase group-hover:underline">
                Inscrever-se →
              </span>
            )}
          </div>
        </div>

        {/* Foto de capa (desktop: direita) */}
        {event.cover_image && (
          <div className="hidden md:block w-44 shrink-0 overflow-hidden">
            <img src={event.cover_image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
        )}
      </div>
    </Link>
  )
}
