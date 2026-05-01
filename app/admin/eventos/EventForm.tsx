'use client'

import { Event } from '@/lib/types'
import { upsertEvent } from './actions'
import { useState } from 'react'

export function EventForm({ event }: { event?: Event }) {
  const [pricingTiers, setPricingTiers] = useState(
    event?.pricing_tiers ?? [{ name: '1 lote', deadline: '', price_cents: 30000 }]
  )
  const [schedule, setSchedule] = useState(
    event?.schedule ?? [
      { time: '18h', activity: 'Abertura da Casa' },
      { time: '19h', activity: 'Roda de Rapé' },
      { time: '20h', activity: 'Início do Ritual' },
      { time: '01h', activity: 'Término do Ritual' },
    ]
  )

  return (
    <form action={upsertEvent} className="space-y-6 max-w-3xl">
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-[--color-floresta-escuro] text-sm uppercase tracking-wide border-b pb-2">Informações Básicas</h2>

        <FormField label="Título *" name="title" defaultValue={event?.title} required />
        <FormField label="Data e Hora *" name="date" type="datetime-local" defaultValue={event?.date?.slice(0, 16)} required />
        <FormField label="Local" name="location_name" defaultValue={event?.location_name ?? 'Casa Árvore da Vida'} />
        <FormField label="Endereço" name="address" defaultValue={event?.address} />
        <FormField label="Link Google Maps" name="maps_link" defaultValue={event?.maps_link ?? ''} />
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Total de Vagas" name="spots_total" type="number" defaultValue={String(event?.spots_total ?? 30)} />
          <FormField label="Vagas Disponíveis" name="spots_available" type="number" defaultValue={String(event?.spots_available ?? 30)} />
        </div>
        <FormField label="Medicinas (separadas por vírgula)" name="medicines" defaultValue={event?.medicines?.join(', ') ?? 'Ayahuasca, Rapé, Sananga'} />

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={event?.is_active ?? true} className="w-4 h-4 accent-[--color-floresta]" />
          <label htmlFor="is_active" className="text-sm font-medium text-[--color-floresta-escuro]">Evento ativo</label>
        </div>
      </div>

      {/* Lotes de preço */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-[--color-floresta-escuro] text-sm uppercase tracking-wide border-b pb-2">Lotes de Preço</h2>
        <input type="hidden" name="pricing_tiers" value={JSON.stringify(pricingTiers)} />
        {pricingTiers.map((tier, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold mb-1">Nome</label>
              <input type="text" value={tier.name} onChange={(e) => {
                const t = [...pricingTiers]; t[i] = { ...t[i], name: e.target.value }; setPricingTiers(t)
              }} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[--color-floresta]" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Prazo</label>
              <input type="date" value={tier.deadline} onChange={(e) => {
                const t = [...pricingTiers]; t[i] = { ...t[i], deadline: e.target.value }; setPricingTiers(t)
              }} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-[--color-floresta]" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Valor (R$)</label>
              <div className="flex gap-2">
                <input type="number" value={tier.price_cents / 100} onChange={(e) => {
                  const t = [...pricingTiers]; t[i] = { ...t[i], price_cents: Number(e.target.value) * 100 }; setPricingTiers(t)
                }} className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
                {pricingTiers.length > 1 && (
                  <button type="button" onClick={() => setPricingTiers(pricingTiers.filter((_, j) => j !== i))} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                )}
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setPricingTiers([...pricingTiers, { name: `${pricingTiers.length + 1} lote`, deadline: '', price_cents: 0 }])} className="text-sm text-[--color-floresta] hover:underline">
          + Adicionar lote
        </button>
      </div>

      {/* Transfer */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-[--color-floresta-escuro] text-sm uppercase tracking-wide border-b pb-2">Transfer</h2>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="transfer_available" id="transfer" defaultChecked={event?.transfer_available} className="w-4 h-4 accent-[--color-floresta]" />
          <label htmlFor="transfer" className="text-sm font-medium">Disponível</label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Local de saída" name="transfer_location" defaultValue={event?.transfer_location ?? 'Estação Brooklin'} />
          <FormField label="Valor (R$)" name="transfer_price_cents" type="number" defaultValue={String((event?.transfer_price_cents ?? 8000) / 100)} />
        </div>
      </div>

      {/* Cronograma */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-[--color-floresta-escuro] text-sm uppercase tracking-wide border-b pb-2">Cronograma</h2>
        <input type="hidden" name="schedule" value={JSON.stringify(schedule)} />
        {schedule.map((item, i) => (
          <div key={i} className="grid grid-cols-4 gap-2 items-center">
            <input value={item.time} onChange={(e) => { const s = [...schedule]; s[i] = { ...s[i], time: e.target.value }; setSchedule(s) }} placeholder="18h" className="border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
            <div className="col-span-3 flex gap-2">
              <input value={item.activity} onChange={(e) => { const s = [...schedule]; s[i] = { ...s[i], activity: e.target.value }; setSchedule(s) }} className="flex-1 border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none" />
              <button type="button" onClick={() => setSchedule(schedule.filter((_, j) => j !== i))} className="text-red-400 text-xs">✕</button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => setSchedule([...schedule, { time: '', activity: '' }])} className="text-sm text-[--color-floresta] hover:underline">+ Adicionar horário</button>
      </div>

      {/* Textos */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-[--color-floresta-escuro] text-sm uppercase tracking-wide border-b pb-2">Textos</h2>
        <TextAreaField label="Descrição (HTML)" name="description" defaultValue={event?.description ?? ''} rows={6} />
        <TextAreaField label="Orientações Gerais (HTML)" name="orientations" defaultValue={event?.orientations ?? ''} rows={4} />
        <TextAreaField label="Política de Cancelamento" name="cancellation_policy" defaultValue={event?.cancellation_policy ?? 'Sem reembolso após pagamento. O valor ficará de crédito para uma próxima cerimônia.'} rows={2} />
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-[--color-floresta] text-[--color-bege] px-6 py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors">
          Salvar Evento
        </button>
        <a href="/admin/eventos" className="border border-gray-300 text-gray-600 px-6 py-3 rounded font-bold text-sm uppercase hover:bg-gray-50 transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}

function FormField({ label, name, type = 'text', defaultValue, required }: {
  label: string; name: string; type?: string; defaultValue?: string; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} required={required} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta]" />
    </div>
  )
}

function TextAreaField({ label, name, defaultValue, rows = 3 }: {
  label: string; name: string; defaultValue?: string; rows?: number
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={rows} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-y" />
    </div>
  )
}
