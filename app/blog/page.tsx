import { createClient } from '@/lib/supabase/server'
import { BlogPost } from '@/lib/types'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'
import { KeneDivider } from '@/components/ui/KeneDivider'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Artigos sobre xamanismo, plantas de poder, cerimônias e autoconhecimento.',
}

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Conhecimento</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">BLOG</h1>
        <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto leading-relaxed">
          Artigos sobre xamanismo, plantas de poder, cerimônias e autoconhecimento.
        </p>
      </div>

      <KeneDivider />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {(posts ?? []).length === 0 ? (
          <p className="text-center text-[--color-terra] py-20">Em breve novos artigos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(posts as BlogPost[]).map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <article className="bg-white rounded-lg overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all hover:-translate-y-1">
                  {post.cover_image && (
                    <div className="h-48 overflow-hidden">
                      <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-[--color-dourado] uppercase tracking-wide mb-2">
                      {post.published_at ? format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''}
                    </p>
                    <h2 className="font-[--font-titulo] text-lg font-bold text-[--color-floresta-escuro] mb-2 group-hover:text-[--color-floresta] transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-[--color-preto] opacity-70 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    )}
                    <p className="text-xs font-bold text-[--color-dourado] mt-3 group-hover:underline">Ler mais →</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
