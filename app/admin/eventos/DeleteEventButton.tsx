'use client'

import { deleteEvent } from './actions'

export function DeleteEventButton({ id }: { id: string }) {
  return (
    <form action={deleteEvent}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-red-500 hover:underline"
        onClick={(e) => { if (!confirm('Excluir este evento?')) e.preventDefault() }}
      >
        Excluir
      </button>
    </form>
  )
}
