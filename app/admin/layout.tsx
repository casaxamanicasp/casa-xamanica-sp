import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const adminLinks = [
  { href: '/admin', label: '📊 Dashboard' },
  { href: '/admin/eventos', label: '🔥 Eventos' },
  { href: '/admin/inscricoes', label: '📋 Inscrições' },
  { href: '/admin/blog', label: '✍️ Blog' },
  { href: '/admin/produtos', label: '🛍️ Produtos' },
  { href: '/admin/apoiadores', label: '🤝 Apoiadores' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[--color-floresta-escuro] text-[--color-bege] flex flex-col fixed h-full">
        <div className="p-4 border-b border-[--color-floresta-claro]">
          <p className="font-[--font-titulo] text-sm font-bold text-[--color-dourado]">CASA XAMÂNICA</p>
          <p className="text-xs opacity-50 text-[--color-bege]">Administração</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded text-sm text-[--color-bege] hover:bg-[--color-floresta] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[--color-floresta-claro]">
          <p className="text-xs opacity-50 mb-2">{user.email}</p>
          <form action="/api/auth/logout" method="POST">
            <button type="submit" className="text-xs text-[--color-bege] opacity-60 hover:opacity-100">
              Sair →
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="ml-56 flex-1 p-6">{children}</main>
    </div>
  )
}
