import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Link from 'next/link'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('title,excerpt').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.title, description: data.excerpt ?? '' }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[--color-creme]">
      {post.cover_image && (
        <div className="h-64 md:h-96 overflow-hidden">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/blog" className="text-xs text-[--color-floresta] hover:underline mb-6 inline-block">
          ← Voltar ao Blog
        </Link>

        <p className="text-xs text-[--color-dourado] uppercase tracking-wide mb-3">
          {post.published_at ? format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''} — {post.author}
        </p>
        <h1 className="font-[--font-titulo] text-3xl md:text-4xl font-bold text-[--color-floresta-escuro] mb-8 leading-tight">
          {post.title}
        </h1>

        <div
          className="prose-xamanica"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />

        {/* Fonte / Referência */}
        {post.source && (
          <div className="mt-10 pt-6 border-t border-[--color-bege-escuro]">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Fonte</p>
            {post.source_url ? (
              <a
                href={post.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[--color-floresta] hover:underline font-medium"
              >
                {post.source} ↗
              </a>
            ) : (
              <p className="text-sm text-[--color-terra] font-medium">{post.source}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
