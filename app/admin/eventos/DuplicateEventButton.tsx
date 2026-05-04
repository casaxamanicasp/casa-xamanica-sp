'use client'

import { duplicateEvent } from './actions'
import { useState } from 'react'

export function DuplicateEventButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDuplicate(formData: FormData) {
    setLoading(true)
    await duplicateEvent(formData)
  }

  return (
    <form action={handleDuplicate}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        disabled={loading}
        className="text-xs text-blue-500 hover:underline disabled:opacity-50"
      >
        {loading ? 'Duplicando...' : 'Duplicar'}
      </button>
    </form>
  )
}
