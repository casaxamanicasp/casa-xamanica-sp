'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('casaxamanica@gmail.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)
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

  async function handleMagicLink() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin` },
    })
    setLoading(false)
    if (error) {
      setError('Erro ao enviar link: ' + error.message)
    } else {
      setMagicSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center px-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-6">
          <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">
            CASA XAMÂNICA
          </h1>
          <p className="text-xs text-[--color-terra] mt-1">Painel Administrativo</p>
        </div>

        {magicSent ? (
          <div className="text-center py-4">
            <p className="text-2xl mb-3">📬</p>
            <p className="text-sm font-bold text-[--color-floresta-escuro] mb-2">Link enviado!</p>
            <p className="text-xs text-[--color-terra]">
              Verifique o e-mail <strong>{email}</strong> e clique no link para entrar.
            </p>
            <button
              onClick={() => setMagicSent(false)}
              className="mt-4 text-xs text-[--color-floresta] underline"
            >
              Voltar
            </button>
          </div>
        ) : (
          <>
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
                {loading ? 'Entrando...' : 'Entrar com senha'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400 mb-2">ou</p>
              <button
                onClick={handleMagicLink}
                disabled={loading || !email}
                className="w-full border border-[--color-floresta] text-[--color-floresta] py-2.5 rounded text-xs font-bold uppercase tracking-wider hover:bg-[--color-floresta] hover:text-white transition-colors disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'Entrar com link por e-mail'}
              </button>
              <p className="text-[10px] text-gray-400 mt-2">
                Sem precisar de senha — receba um link no seu e-mail
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
