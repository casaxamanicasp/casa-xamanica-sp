import { createClient } from '@/lib/supabase/server'
import { BlogPost } from '@/lib/types'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Metadata } from 'next'

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
      <div className="bg-[--color-floresta-escuro] py-16 px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Conhecimento</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4">Blog</h1>
        <p className="text-[--color-bege] opacity-80 max-w-xl mx-auto">
          Artigos sobre xamanismo, plantas de poder, cerimônias e autoconhecimento.
        </p>
      </div>

      <div className="h-8 bg-[--color-floresta-escuro]" style={{ clipPath: 'polygon(0 0, 2% 100%, 4% 0, 6% 100%, 8% 0, 10% 100%, 12% 0, 14% 100%, 16% 0, 18% 100%, 20% 0, 22% 100%, 24% 0, 26% 100%, 28% 0, 30% 100%, 32% 0, 34% 100%, 36% 0, 38% 100%, 40% 0, 42% 100%, 44% 0, 46% 100%, 48% 0, 50% 100%, 52% 0, 54% 100%, 56% 0, 58% 100%, 60% 0, 62% 100%, 64% 0, 66% 100%, 68% 0, 70% 100%, 72% 0, 74% 100%, 76% 0, 78% 100%, 80% 0, 82% 100%, 84% 0, 86% 100%, 88% 0, 90% 100%, 92% 0, 94% 100%, 96% 0, 98% 100%, 100% 0)' }} />

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
