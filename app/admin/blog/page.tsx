import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { deletePost } from './actions'

export default async function AdminBlogPage() {
  const supabase = createAdminClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, author, is_published, published_at, created_at')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro]">Blog</h1>
        <Link href="/admin/blog/novo" className="bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-bold hover:bg-[--color-floresta-claro] transition-colors">
          + Novo Post
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[--color-floresta-escuro] text-[--color-bege]">
            <tr>
              {['Título', 'Autor', 'Status', 'Data', 'Ações'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(posts ?? []).map((post: any) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-[--color-floresta-escuro] max-w-[250px] truncate">{post.title}</td>
                <td className="px-4 py-3 text-gray-600">{post.author}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {post.is_published ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {format(new Date(post.published_at ?? post.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/blog/${post.id}`} className="text-xs text-[--color-floresta] hover:underline">Editar</Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-xs text-red-500 hover:underline" onClick={(e) => { if (!confirm('Excluir post?')) e.preventDefault() }}>
                        Excluir
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(posts ?? []).length === 0 && <p className="text-center text-gray-500 py-10">Nenhum post ainda.</p>}
      </div>
    </div>
  )
}
