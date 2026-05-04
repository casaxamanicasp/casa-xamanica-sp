'use client'

import { deleteSupporter } from './actions'

export function DeleteSupporterButton({ id }: { id: string }) {
  return (
    <form action={deleteSupporter}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-500 hover:underline"
        onClick={(e) => { if (!confirm('Excluir apoiador?')) e.preventDefault() }}
      >
        Excluir
      </button>
    </form>
  )
}
