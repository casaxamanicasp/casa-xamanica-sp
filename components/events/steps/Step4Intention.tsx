'use client'

import { RegistrationFormData } from '@/lib/types'

const TERMS = [
  'Estar ciente de toda informação recebida e fornecida e estar de acordo com as normas estabelecidas para participação da Cerimônia Espiritual.',
  'Ter prestado informações fidedignas e não necessitar de cuidados médicos especiais.',
  'Ter ciência dos efeitos proporcionados pelo uso da Ayahuasca como elemento enteógeno.',
  'Me comprometo a permanecer no recinto até o término do trabalho, não me ausentando em nenhuma hipótese.',
]

export function Step4Intention({
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
  const valid = form.ceremony_expectation.trim() && form.terms_accepted

  return (
    <div className="space-y-4">
      <h3 className="font-[--font-titulo] text-base font-bold text-[--color-floresta-escuro]">
        Intenção e Termos
      </h3>

      <div>
        <label className="block text-xs font-bold text-[--color-floresta-escuro] mb-1">
          12. O que espera ao final da cerimônia? *
        </label>
        <textarea
          value={form.ceremony_expectation}
          onChange={(e) => updateForm({ ceremony_expectation: e.target.value })}
          placeholder="Descreva sua intenção e o que espera vivenciar..."
          rows={4}
          className="w-full border border-[--color-bege-escuro] rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] bg-white resize-none"
        />
      </div>

      {/* Política de cancelamento */}
      <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800 leading-relaxed">
        <p className="font-bold mb-1">Desistência e Devolução</p>
        Se houver desistência após o pagamento, não haverá devolução do valor. O valor ficará de crédito para uma próxima cerimônia da Casa Xamânica.
      </div>

      {/* Termos */}
      <div>
        <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-3">
          13. Eu li este documento e declaro: *
        </label>
        <div className="space-y-3">
          {TERMS.map((term, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-[--color-preto] leading-snug">
              <span className="mt-0.5 text-[--color-floresta] shrink-0">✓</span>
              {term}
            </div>
          ))}
        </div>
        <label className="flex items-center gap-3 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={form.terms_accepted}
            onChange={(e) => updateForm({ terms_accepted: e.target.checked })}
            className="accent-[--color-floresta] w-4 h-4"
          />
          <span className="text-xs font-bold text-[--color-floresta-escuro]">
            Declaro que li e concordo com todos os itens acima
          </span>
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-1 border border-[--color-floresta] text-[--color-floresta] py-3 rounded font-bold text-sm uppercase hover:bg-[--color-bege] transition-colors">
          ← Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!valid}
          className="flex-1 bg-[--color-floresta] text-[--color-bege] py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Escolher Pagamento →
        </button>
      </div>
    </div>
  )
}
