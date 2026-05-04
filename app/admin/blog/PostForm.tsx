'use client'

import { upsertPost } from './actions'

export function PostForm({ post }: { post?: any }) {
  return (
    <form action={upsertPost} className="space-y-5 max-w-3xl">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 space-y-4">
        <FormField label="Título *" name="title" defaultValue={post?.title} required />
        <FormField label="Autor" name="author" defaultValue={post?.author ?? 'Casa Xamânica SP'} />
        <FormField label="URL da Imagem de Capa" name="cover_image" defaultValue={post?.cover_image ?? ''} />
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Fonte / Referência" name="source" defaultValue={post?.source ?? ''} placeholder="Ex: Brasil de Fato, Portal Katukina..." />
          <FormField label="Link da Fonte (opcional)" name="source_url" defaultValue={post?.source_url ?? ''} placeholder="https://..." />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Resumo</label>
          <textarea name="excerpt" defaultValue={post?.excerpt ?? ''} rows={2} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-none" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Conteúdo (HTML)</label>
          <textarea name="content" defaultValue={post?.content ?? ''} rows={16} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] resize-y font-mono" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" id="is_published" defaultChecked={post?.is_published} className="w-4 h-4 accent-[--color-floresta]" />
          <label htmlFor="is_published" className="text-sm font-medium">Publicar agora</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" className="bg-[--color-floresta] text-[--color-bege] px-6 py-3 rounded font-bold text-sm uppercase hover:bg-[--color-floresta-claro] transition-colors">
          Salvar Post
        </button>
        <a href="/admin/blog" className="border border-gray-300 text-gray-600 px-6 py-3 rounded font-bold text-sm uppercase hover:bg-gray-50 transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}

function FormField({ label, name, defaultValue, required, placeholder }: { label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">{label}</label>
      <input type="text" name={name} defaultValue={defaultValue} required={required} placeholder={placeholder} className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta] placeholder:text-gray-300" />
    </div>
  )
}
