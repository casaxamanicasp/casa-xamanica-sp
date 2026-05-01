'use client'

import { RegistrationFormData } from '@/lib/types'

const CONDITIONS = [
  'Gestação',
  'Depressão',
  'Síndrome do Pânico',
  'Crises de Ansiedade',
  'Surtos Psicóticos',
  'Alcoolismo',
  'Dependência Química',
  'Convulsão',
  'Redução de Estômago',
  'Bipolaridade',
  'Nenhuma',
]

export function Step3Health({
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
  const toggleCondition = (cond: string) => {
    const current = form.health_conditions
    if (cond === 'Nenhuma') {
      updateForm({ health_conditions: current.includes('Nenhuma') ? [] : ['Nenhuma'] })
      return
    }
    const without = current.filter((c) => c !== 'Nenhuma')
    if (without.includes(cond)) {
      updateForm({ health_conditions: without.filter((c) => c !== cond) })
    } else {
      updateForm({ health_conditions: [...without, cond] })
    }
  }

  const valid =
    form.previous_ayahuasca.trim() &&
    form.health_treatment.trim() &&
    form.current_medications.trim() &&
    form.allergies.trim() &&
    form.health_conditions.length > 0 &&
    form.other_health_issues.trim()

  return (
    <div className="space-y-4">
      <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro]">
        Saúde e Histórico
      </h3>
      <p className="text-xs text-[--color-terra] bg-[--color-bege] rounded p-2">
        ⚠️ Determinados medicamentos têm interação contraindicada com Ayahuasca. Por favor, responda com sinceridade.
      </p>

      <TextArea
        label="6. Já consagrou Ayahuasca / Santo Daime / NixiPae? Se sim, onde e quantas vezes? *"
        value={form.previous_ayahuasca}
        onChange={(v) => updateForm({ previous_ayahuasca: v })}
        placeholder="Responda mesmo que seja 'Não'"
      />
      <TextArea
        label="7. Está fazendo algum tratamento de saúde? Qual? *"
        value={form.health_treatment}
        onChange={(v) => updateForm({ health_treatment: v })}
        placeholder="Descreva ou escreva 'Não'"
      />
      <TextArea
        label="8. Utiliza alguma medicação atualmente? Se sim, qual? *"
        value={form.current_medications}
        onChange={(v) => updateForm({ current_medications: v })}
        placeholder="Nome e dosagem, ou 'Não'"
      />
      <TextArea
        label="9. Tem alergia a alguma medicação ou alimento? Se sim, qual? *"
        value={form.allergies}
        onChange={(v) => updateForm({ allergies: v })}
        placeholder="Descreva ou escreva 'Não'"
      />

      {/* Checkboxes condições */}
      <div>
        <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-2">
          10. Se encontra em alguma dessas condições? * (marque todas que se aplicam)
        </label>
        <div className="grid grid-cols-2 gap-1">
          {CONDITIONS.map((cond) => (
            <label key={cond} className="flex items-center gap-2 text-xs cursor-pointer hover:text-[--color-floresta] transition-colors py-1">
              <input
                type="checkbox"
                checked={form.health_conditions.includes(cond)}
                onChange={() => toggleCondition(cond)}
                className="accent-[--color-floresta] w-3.5 h-3.5"
              />
              {cond}
            </label>
          ))}
        </div>
      </div>

      <TextArea
        label="11. Teve ou tem algum problema de saúde que acha importante dizer? *"
        value={form.other_health_issues}
        onChange={(v) => updateForm({ other_health_issues: v })}
        placeholder="Descreva ou escreva 'Não'"
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

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[--color-floresta-escuro] mb-1 leading-snug">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full border border-[--color-bege-escuro] rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] bg-white transition-colors resize-none"
      />
    </div>
  )
}
