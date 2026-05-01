'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('E-mail ou senha incorretos.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[--color-floresta-escuro] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">
            CASA XAMÂNICA
          </h1>
          <p className="text-xs text-[--color-terra] mt-1">Painel Administrativo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[--color-floresta-escuro] uppercase tracking-wide mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[--color-floresta]"
            />
          </div>
          {error && <p className="text-red-600 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[--color-floresta] text-[--color-bege] py-3 rounded font-[--font-titulo] font-bold uppercase tracking-wider text-sm hover:bg-[--color-floresta-claro] transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
