'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import { useRouter } from 'next/navigation'

export function CheckoutForm({ product }: { product: Product }) {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [method, setMethod] = useState<'pix' | 'card' | null>(null)
  const [step, setStep] = useState<'form' | 'payment' | 'processing' | 'done'>('form')
  const [pixData, setPixData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const total = (product.price_cents * qty) / 100
  const valid = form.name && form.email && form.phone && method

  async function handleBuy() {
    if (!method) return
    setStep('processing')
    setError(null)

    try {
      const res = await fetch('/api/payments/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: product.id, quantity: qty, form, payment_method: method }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erro')

      if (method === 'pix') {
        setPixData(data.pix)
        setStep('payment')
      } else {
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.preference_id}`
      }
    } catch (e: any) {
      setError(e.message)
      setStep('form')
    }
  }

  if (step === 'processing') {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-4 border-[--color-floresta-claro] border-t-[--color-floresta] rounded-full animate-spin" />
      </div>
    )
  }

  if (step === 'payment' && pixData) {
    return (
      <div className="space-y-4 bg-white border border-[--color-bege-escuro] rounded-lg p-5">
        <h3 className="font-[--font-titulo] font-bold text-[--color-floresta-escuro]">Pague via Pix</h3>
        <p className="text-2xl font-bold text-[--color-floresta]">R$ {total.toFixed(2).replace('.', ',')}</p>
        {pixData.qr_code_base64 && (
          <div className="flex justify-center">
            <img src={`data:image/png;base64,${pixData.qr_code_base64}`} alt="QR Pix" className="w-44 h-44 border-2 border-[--color-floresta] rounded p-1" />
          </div>
        )}
        <div className="flex gap-2">
          <input readOnly value={pixData.qr_code ?? ''} className="flex-1 border border-[--color-bege-escuro] rounded px-3 py-2 text-xs font-mono bg-[--color-bege]" />
          <button onClick={() => navigator.clipboard.writeText(pixData.qr_code ?? '')} className="bg-[--color-floresta] text-white px-3 py-2 rounded text-xs font-bold">Copiar</button>
        </div>
        <p className="text-xs text-center text-[--color-terra]">Você receberá um e-mail de confirmação após o pagamento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded">{error}</p>}

      {/* Quantidade */}
      <div className="flex items-center gap-3">
        <label className="text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide">Quantidade</label>
        <div className="flex items-center border border-[--color-bege-escuro] rounded overflow-hidden">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-[--color-floresta] hover:bg-[--color-bege] transition-colors">-</button>
          <span className="px-4 py-2 text-sm font-bold">{qty}</span>
          <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="px-3 py-2 text-[--color-floresta] hover:bg-[--color-bege] transition-colors">+</button>
        </div>
        <span className="text-xs text-[--color-terra]">{product.stock} em estoque</span>
      </div>

      {/* Dados */}
      {[
        { label: 'Nome Completo *', key: 'name', type: 'text' },
        { label: 'E-mail *', key: 'email', type: 'email' },
        { label: 'Telefone *', key: 'phone', type: 'tel' },
        { label: 'Endereço de Entrega', key: 'address', type: 'text' },
      ].map(({ label, key, type }) => (
        <div key={key}>
          <label className="block text-xs font-bold text-[--color-floresta-escuro] mb-1 uppercase tracking-wide">{label}</label>
          <input
            type={type}
            value={form[key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="w-full border border-[--color-bege-escuro] rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] bg-white"
          />
        </div>
      ))}

      {/* Pagamento */}
      <div>
        <label className="block text-xs font-bold text-[--color-floresta-escuro] mb-2 uppercase tracking-wide">Forma de Pagamento *</label>
        <div className="grid grid-cols-2 gap-2">
          {(['pix', 'card'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`border-2 rounded py-3 text-sm font-bold transition-colors ${method === m ? 'border-[--color-floresta] bg-[--color-bege] text-[--color-floresta-escuro]' : 'border-[--color-bege-escuro] text-[--color-terra] hover:border-[--color-floresta-claro]'}`}
            >
              {m === 'pix' ? '🟢 Pix' : '💳 Cartão (2x)'}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[--color-bege-escuro]">
        <div className="flex justify-between mb-3">
          <span className="text-sm text-[--color-terra]">Total</span>
          <span className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro]">
            R$ {total.toFixed(2).replace('.', ',')}
          </span>
        </div>
        <button
          onClick={handleBuy}
          disabled={!valid}
          className="w-full bg-[--color-floresta] text-[--color-bege] py-3 rounded font-[--font-titulo] font-bold uppercase tracking-wider text-sm hover:bg-[--color-floresta-claro] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Comprar agora
        </button>
      </div>
    </div>
  )
}
