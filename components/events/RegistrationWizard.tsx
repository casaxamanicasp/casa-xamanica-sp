'use client'

import { useState } from 'react'
import { Event, PricingTier, RegistrationFormData } from '@/lib/types'
import { Step1Summary } from './steps/Step1Summary'
import { Step2Personal } from './steps/Step2Personal'
import { Step3Health } from './steps/Step3Health'
import { Step4Intention } from './steps/Step4Intention'
import { Step5Payment } from './steps/Step5Payment'

const STEPS = [
  'Resumo',
  'Dados Pessoais',
  'Saúde',
  'Intenção',
  'Pagamento',
]

const emptyForm: RegistrationFormData = {
  pricing_tier_name: '',
  pricing_tier_price: 0,
  include_transfer: false,
  full_name: '',
  email: '',
  birth_date: '',
  phone: '',
  address: '',
  previous_ayahuasca: '',
  health_treatment: '',
  current_medications: '',
  allergies: '',
  health_conditions: [],
  other_health_issues: '',
  ceremony_expectation: '',
  terms_accepted: false,
  payment_method: null,
}

export function RegistrationWizard({
  event,
  activeTier,
}: {
  event: Event
  activeTier: PricingTier | null
}) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<RegistrationFormData>({
    ...emptyForm,
    pricing_tier_name: activeTier?.name ?? event.pricing_tiers[0]?.name ?? '',
    pricing_tier_price: activeTier?.price_cents ?? event.pricing_tiers[0]?.price_cents ?? 0,
  })
  const [registrationId, setRegistrationId] = useState<string | null>(null)

  const updateForm = (data: Partial<RegistrationFormData>) =>
    setForm((prev) => ({ ...prev, ...data }))

  const next = () => setStep((s) => Math.min(s + 1, 5))
  const back = () => setStep((s) => Math.max(s - 1, 1))

  const totalAmount =
    form.pricing_tier_price + (form.include_transfer ? (event.transfer_price_cents ?? 0) : 0)

  return (
    <div className="bg-white rounded-lg shadow-[--shadow-card] overflow-hidden">
      {/* Progress bar */}
      <div className="bg-[--color-floresta-escuro] px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  i + 1 < step
                    ? 'bg-[--color-dourado] text-[--color-floresta-escuro]'
                    : i + 1 === step
                    ? 'bg-white text-[--color-floresta-escuro]'
                    : 'bg-[--color-floresta-claro] text-[--color-bege] opacity-50'
                }`}
              >
                {i + 1 < step ? '✓' : i + 1}
              </div>
              <span className="text-[8px] text-[--color-bege] opacity-70 mt-1 hidden sm:block text-center leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-[--color-floresta-claro] rounded-full h-1">
          <div
            className="bg-[--color-dourado] h-1 rounded-full transition-all duration-300"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Valor total */}
      <div className="bg-[--color-bege] px-4 py-2 text-center border-b border-[--color-bege-escuro]">
        <p className="text-xs text-[--color-terra] uppercase tracking-wide">Total a pagar</p>
        <p className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro]">
          R$ {(totalAmount / 100).toFixed(2).replace('.', ',')}
        </p>
      </div>

      {/* Steps */}
      <div className="p-5">
        {step === 1 && (
          <Step1Summary
            event={event}
            form={form}
            updateForm={updateForm}
            onNext={next}
          />
        )}
        {step === 2 && (
          <Step2Personal
            form={form}
            updateForm={updateForm}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 3 && (
          <Step3Health
            form={form}
            updateForm={updateForm}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 4 && (
          <Step4Intention
            form={form}
            updateForm={updateForm}
            onNext={next}
            onBack={back}
          />
        )}
        {step === 5 && (
          <Step5Payment
            event={event}
            form={form}
            totalAmount={totalAmount}
            onBack={back}
            registrationId={registrationId}
            setRegistrationId={setRegistrationId}
          />
        )}
      </div>
    </div>
  )
}
