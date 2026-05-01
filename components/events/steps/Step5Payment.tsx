'use client'

import { useState } from 'react'
import { Event, RegistrationFormData } from '@/lib/types'

type PaymentState = 'selecting' | 'pix_waiting' | 'card_form' | 'processing' | 'error'

export function Step5Payment({
  event,
  form,
  totalAmount,
  onBack,
  registrationId,
  setRegistrationId,
}: {
  event: Event
  form: RegistrationFormData
  totalAmount: number
  onBack: () => void
  registrationId: string | null
  setRegistrationId: (id: string) => void
}) {
  const [state, setState] = useState<PaymentState>('selecting')
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string; ticket_url: string } | null>(null)
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const totalReais = totalAmount / 100

  async function saveRegistration() {
    const res = await fetch('/api/payments/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_id: event.id, form, total_cents: totalAmount }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error ?? 'Erro ao criar inscrição')
    setRegistrationId(data.registration_id)
    return data
  }

  async function handlePix() {
    setState('processing')
    setError(null)
    try {
      const data = await saveRegistration()
      setPixData(data.pix)
      setState('pix_waiting')
    } catch (e: any) {
      setError(e.message)
      setState('error')
    }
  }

  async function handleCard() {
    setState('processing')
    setError(null)
    try {
      const data = await saveRegistration()
      setPreferenceId(data.preference_id)
      setState('card_form')
    } catch (e: any) {
      setError(e.message)
      setState('error')
    }
  }

  if (state === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4">
        <div className="w-8 h-8 border-4 border-[--color-floresta-claro] border-t-[--color-floresta] rounded-full animate-spin" />
        <p className="text-sm text-[--color-terra]">Processando...</p>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded p-4 text-sm text-red-700">
          {error ?? 'Ocorreu um erro. Tente novamente.'}
        </div>
        <button onClick={() => setState('selecting')} className="w-full border border-[--color-floresta] text-[--color-floresta] py-3 rounded font-bold text-sm uppercase">
          Tentar Novamente
        </button>
      </div>
    )
  }

  if (state === 'pix_waiting' && pixData) {
    return (
      <div className="space-y-4">
        <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro] text-center">
          Pagamento via Pix
        </h3>
        <div className="text-center">
          <p className="text-2xl font-bold text-[--color-floresta]">R$ {totalReais.toFixed(2).replace('.', ',')}</p>
        </div>

        {pixData.qr_code_base64 && (
          <div className="flex justify-center">
            <img
              src={`data:image/png;base64,${pixData.qr_code_base64}`}
              alt="QR Code Pix"
              className="w-48 h-48 border-4 border-[--color-floresta] rounded-lg p-2"
            />
          </div>
        )}

        <div>
          <p className="text-xs text-[--color-terra] mb-1 text-center">Ou copie a chave Pix:</p>
          <div className="flex gap-2">
            <input
              readOnly
              value={pixData.qr_code}
              className="flex-1 border border-[--color-bege-escuro] rounded px-3 py-2 text-xs bg-[--color-bege] font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(pixData.qr_code)}
              className="bg-[--color-floresta] text-[--color-bege] px-3 py-2 rounded text-xs font-bold hover:bg-[--color-floresta-claro] transition-colors"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-3 text-xs text-green-700 text-center">
          Após o pagamento, você receberá um e-mail de confirmação em até 5 minutos.
        </div>

        <p className="text-xs text-center text-[--color-terra]">
          Pague no app do seu banco usando o QR Code ou a chave Pix acima.
        </p>
      </div>
    )
  }

  if (state === 'card_form' && preferenceId) {
    const mpUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preferenceId}`
    window.location.href = mpUrl
    return (
      <div className="flex flex-col items-center py-10">
        <p className="text-sm text-[--color-terra]">Redirecionando para o pagamento...</p>
      </div>
    )
  }

  // Seleção de método
  return (
    <div className="space-y-4">
      <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro]">
        Forma de Pagamento
      </h3>

      <div className="bg-[--color-bege] rounded p-3 text-center">
        <p className="text-xs text-[--color-terra] uppercase tracking-wide">Total</p>
        <p className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">
          R$ {totalReais.toFixed(2).replace('.', ',')}
        </p>
        <p className="text-xs text-[--color-terra]">{form.pricing_tier_name}{form.include_transfer ? ' + Transfer' : ''}</p>
      </div>

      <div className="space-y-3">
        {/* Pix */}
        <button
          onClick={handlePix}
          className="w-full border-2 border-[--color-floresta] rounded-lg p-4 flex items-center gap-4 hover:bg-[--color-bege] transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-[#32BCAD] rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M11.9 2C6.4 2 2 6.5 2 12s4.4 10 9.9 10 9.9-4.5 9.9-10S17.4 2 11.9 2zm4.6 14.5c-.4.4-1 .6-1.5.6-.5 0-1-.2-1.5-.6L11 13.9l-2.4 2.6c-.4.4-1 .6-1.5.6-.5 0-1-.2-1.5-.6-.8-.8-.8-2.2 0-3l2.4-2.6-2.4-2.4c-.8-.8-.8-2.2 0-3 .8-.8 2.2-.8 3 0L11 7.9l2.6-2.4c.8-.8 2.2-.8 3 0 .8.8.8 2.2 0 3L14.1 11l2.4 2.6c.8.7.8 2.1 0 2.9z"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-[--color-floresta-escuro] text-sm">Pix</p>
            <p className="text-xs text-[--color-terra]">Pagamento instantâneo — confirmação imediata</p>
          </div>
          <span className="ml-auto text-[--color-floresta] group-hover:translate-x-1 transition-transform">→</span>
        </button>

        {/* Cartão */}
        <button
          onClick={handleCard}
          className="w-full border-2 border-[--color-floresta] rounded-lg p-4 flex items-center gap-4 hover:bg-[--color-bege] transition-colors text-left group"
        >
          <div className="w-10 h-10 bg-[--color-floresta] rounded-lg flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
          <div>
            <p className="font-bold text-[--color-floresta-escuro] text-sm">Cartão de Crédito</p>
            <p className="text-xs text-[--color-terra]">Parcelado em até 2x sem juros</p>
          </div>
          <span className="ml-auto text-[--color-floresta] group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>

      <button onClick={onBack} className="w-full border border-gray-200 text-gray-500 py-2 rounded text-sm hover:bg-gray-50 transition-colors">
        ← Voltar
      </button>
    </div>
  )
}
