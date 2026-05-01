'use client'

import { RegistrationFormData } from '@/lib/types'

export function Step2Personal({
  form,
  updateForm,
  onNext,
  onBack,
}: {
  form: RegistrationFormData
  updateForm: (d: Partial<RegistrationFormData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const valid =
    form.full_name.trim() &&
    form.email.trim() &&
    form.birth_date &&
    form.phone.trim() &&
    form.address.trim()

  return (
    <div className="space-y-4">
      <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro]">
        Dados Pessoais
      </h3>

      <Field
        label="Nome Completo *"
        value={form.full_name}
        onChange={(v) => updateForm({ full_name: v })}
        placeholder="Seu nome completo"
      />
      <Field
        label="E-mail *"
        type="email"
        value={form.email}
        onChange={(v) => updateForm({ email: v })}
        placeholder="seu@email.com"
      />
      <Field
        label="Data de Nascimento *"
        type="date"
        value={form.birth_date}
        onChange={(v) => updateForm({ birth_date: v })}
      />
      <Field
        label="Telefone / WhatsApp *"
        type="tel"
        value={form.phone}
        onChange={(v) => updateForm({ phone: v })}
        placeholder="(11) 99999-9999"
      />
      <Field
        label="Endereço Completo *"
        value={form.address}
        onChange={(v) => updateForm({ address: v })}
        placeholder="Rua, número, bairro, cidade, estado"
      />

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border border-[--color-floresta] text-[--color-floresta] py-3 rounded font-bold text-sm uppercase hover:bg-[--color-bege] transition-colors">
          ← Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 bg-[--color-floresta] text-[--color-bege] py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[--color-bege-escuro] rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] bg-white transition-colors"
      />
    </div>
  )
}
