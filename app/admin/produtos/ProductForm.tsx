'use client'

import { upsertProduct } from './actions'

export function ProductForm({ product }: { product?: any }) {
  return (
    <form action={upsertProduct} className="space-y-5 max-w-2xl">
      {product?.id && <input type="hidden" name="id" value={product.id} />}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <Field label="Nome *" name="name" defaultValue={product?.name} required />
        <Field label="Categoria" name="category" defaultValue={product?.category ?? ''} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preço (R$) *" name="price" type="number" step="0.01" defaultValue={String((product?.price_cents ?? 0) / 100)} required />
          <Field label="Estoque *" name="stock" type="number" defaultValue={String(product?.stock ?? 0)} required />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">URLs das Imagens (uma por linha)</label>
          <textarea name="images" defaultValue={product?.images?.join('\n') ?? ''} rows={3} placeholder="https://..." className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-none font-mono" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Descrição (HTML)</label>
          <textarea name="description" defaultValue={product?.description ?? ''} rows={6} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-y" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" id="is_active" defaultChecked={product?.is_active ?? true} className="w-4 h-4 accent-[--color-floresta]" />
          <label htmlFor="is_active" className="text-sm font-medium">Produto ativo</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-[--color-floresta] text-[--color-bege] px-6 py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors">
          Salvar Produto
        </button>
        <a href="/admin/produtos" className="border border-gray-300 text-gray-600 px-6 py-3 rounded font-bold text-sm uppercase hover:bg-gray-50 transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}

function Field({ label, name, type = 'text', defaultValue, required, step }: { label: string; name: string; type?: string; defaultValue?: string; required?: boolean; step?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} required={required} step={step} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta]" />
    </div>
  )
}
