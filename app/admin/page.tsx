import { createAdminClient } from '@/lib/supabase/admin'

export default async function AdminDashboard() {
  const supabase = createAdminClient()

  const [
    { count: eventsCount },
    { count: registrationsCount },
    { count: postsCount },
    { count: productsCount },
    { count: ordersCount },
  ] = await Promise.all([
    supabase.from('events').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('registrations').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
    supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
  ])

  const stats = [
    { label: 'Eventos Ativos', value: eventsCount ?? 0, color: 'bg-emerald-500' },
    { label: 'Inscrições Confirmadas', value: registrationsCount ?? 0, color: 'bg-blue-500' },
    { label: 'Posts Publicados', value: postsCount ?? 0, color: 'bg-violet-500' },
    { label: 'Produtos Ativos', value: productsCount ?? 0, color: 'bg-amber-500' },
    { label: 'Pedidos Confirmados', value: ordersCount ?? 0, color: 'bg-rose-500' },
  ]

  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${s.color} rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg`}>
              {s.value}
            </div>
            <p className="text-xs text-gray-500 leading-snug">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { href: '/admin/eventos', label: 'Gerenciar Eventos', icon: '🔥', desc: 'Criar, editar e excluir cerimônias' },
          { href: '/admin/inscricoes', label: 'Ver Inscrições', icon: '📋', desc: 'Inscrições e fichas de anamnese' },
          { href: '/admin/blog', label: 'Gerenciar Blog', icon: '✍️', desc: 'Publicar e editar posts' },
          { href: '/admin/produtos', label: 'Gerenciar Loja', icon: '🛍️', desc: 'Produtos e estoque' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:border-[--color-floresta-claro] hover:shadow-md transition-all flex items-center gap-4"
          >
            <span className="text-3xl">{link.icon}</span>
            <div>
              <p className="font-bold text-[--color-floresta-escuro] text-sm">{link.label}</p>
              <p className="text-xs text-gray-500">{link.desc}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
