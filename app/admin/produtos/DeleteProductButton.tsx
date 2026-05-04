'use client'

import { deleteProduct } from './actions'

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-500 hover:underline"
        onClick={(e) => { if (!confirm('Excluir produto?')) e.preventDefault() }}
      >
        Excluir
      </button>
    </form>
  )
}
