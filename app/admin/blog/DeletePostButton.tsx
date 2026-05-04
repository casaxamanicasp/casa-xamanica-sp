'use client'

import { deletePost } from './actions'

export function DeletePostButton({ id }: { id: string }) {
  return (
    <form action={deletePost}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-500 hover:underline"
        onClick={(e) => { if (!confirm('Excluir este post?')) e.preventDefault() }}
      >
        Excluir
      </button>
    </form>
  )
}
