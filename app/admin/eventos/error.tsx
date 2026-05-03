'use client'

export default function AdminEventosError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 bg-red-50 rounded-lg border border-red-200">
      <h2 className="text-red-700 font-bold text-lg mb-2">Erro ao carregar eventos</h2>
      <p className="text-red-600 text-sm font-mono mb-4">{error.message}</p>
      <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded text-sm">
        Tentar novamente
      </button>
    </div>
  )
}
