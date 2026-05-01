'use client'

import { Event, PricingTier, RegistrationFormData } from '@/lib/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function Step1Summary({
  event,
  form,
  updateForm,
  onNext,
}: {
  event: Event
  form: RegistrationFormData
  updateForm: (d: Partial<RegistrationFormData>) => void
  onNext: () => void
}) {
  const now = new Date()
  const availableTiers = event.pricing_tiers.filter(
    (t) => new Date(t.deadline) >= now
  )

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro] mb-1">
          {event.title}
        </h3>
        <p className="text-sm text-[--color-terra]">
          {format(new Date(event.date), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })}
        </p>
        <p className="text-xs text-[--color-terra] opacity-70">📍 {event.location_name}</p>
      </div>

      {/* Seleção de lote */}
      {availableTiers.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-2">
            Escolha seu lote
          </label>
          <div className="space-y-2">
            {availableTiers.map((tier) => (
              <label
                key={tier.name}
                className={`flex items-center justify-between p-3 rounded border-2 cursor-pointer transition-colors ${
                  form.pricing_tier_name === tier.name
                    ? 'border-[--color-floresta] bg-[--color-bege]'
                    : 'border-[--color-bege-escuro] hover:border-[--color-floresta-claro]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="tier"
                    checked={form.pricing_tier_name === tier.name}
                    onChange={() =>
                      updateForm({ pricing_tier_name: tier.name, pricing_tier_price: tier.price_cents })
                    }
                    className="accent-[--color-floresta]"
                  />
                  <div>
                    <p className="text-sm font-bold text-[--color-floresta-escuro]">{tier.name}</p>
                    <p className="text-xs text-[--color-terra]">
                      até {format(new Date(tier.deadline), "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <span className="font-[--font-titulo] text-lg font-bold text-[--color-floresta]">
                  R$ {(tier.price_cents / 100).toFixed(0)}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Transfer */}
      {event.transfer_available && (
        <label className={`flex items-center justify-between p-3 rounded border-2 cursor-pointer transition-colors ${
          form.include_transfer ? 'border-[--color-floresta] bg-[--color-bege]' : 'border-[--color-bege-escuro]'
        }`}>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.include_transfer}
              onChange={(e) => updateForm({ include_transfer: e.target.checked })}
              className="accent-[--color-floresta] w-4 h-4"
            />
            <div>
              <p className="text-sm font-bold text-[--color-floresta-escuro]">Transfer ida e volta</p>
              <p className="text-xs text-[--color-terra]">Saída: {event.transfer_location}</p>
            </div>
          </div>
          <span className="text-sm font-bold text-[--color-floresta]">
            + R$ {((event.transfer_price_cents ?? 0) / 100).toFixed(0)}
          </span>
        </label>
      )}

      {/* Política */}
      <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
        ⚠️ {event.cancellation_policy}
      </div>

      <button
        onClick={onNext}
        disabled={!form.pricing_tier_name}
        className="w-full bg-[--color-floresta] text-[--color-bege] py-3 rounded font-[--font-titulo] font-bold text-sm uppercase tracking-wider hover:bg-[--color-floresta-claro] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Quero me inscrever →
      </button>
    </div>
  )
}
