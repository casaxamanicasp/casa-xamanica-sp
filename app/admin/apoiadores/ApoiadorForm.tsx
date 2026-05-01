'use client'

import { upsertSupporter } from './actions'

export function ApoiadorForm({ supporter }: { supporter?: any }) {
  return (
    <form action={upsertSupporter} className="space-y-5 max-w-2xl">
      {supporter?.id && <input type="hidden" name="id" value={supporter.id} />}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <Field label="Nome *" name="name" defaultValue={supporter?.name} required />
        <Field label="Categoria" name="category" defaultValue={supporter?.category ?? ''} placeholder="Ex: Saúde, Educação, Alimentação..." />
        <Field label="Website" name="website" defaultValue={supporter?.website ?? ''} placeholder="https://..." />
        <Field label="URL do Logo" name="logo_url" defaultValue={supporter?.logo_url ?? ''} placeholder="https://..." />
        <Field label="Ordem de exibição" name="display_order" type="number" defaultValue={String(supporter?.display_order ?? 0)} />
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Descrição</label>
          <textarea name="description" defaultValue={supporter?.description ?? ''} rows={4} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-y" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={supporter?.is_active ?? true} className="w-4 h-4 accent-[--color-floresta]" />
          <label htmlFor="is_active" className="text-sm font-medium">Apoiador ativo</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-[--color-floresta] text-[--color-bege] px-6 py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors">
          Salvar Apoiador
        </button>
        <a href="/admin/apoiadores" className="border border-gray-300 text-gray-600 px-6 py-3 rounded font-bold text-sm uppercase hover:bg-gray-50 transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}

function Field({ label, name, type = 'text', defaultValue, required, placeholder }: { label: string; name: string; type?: string; defaultValue?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta]" />
    </div>
  )
}
