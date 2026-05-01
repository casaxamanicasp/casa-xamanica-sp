import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import { PostForm } from '../PostForm'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single()
  if (!data) notFound()
  return (
    <div>
      <h1 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">Editar Post</h1>
      <PostForm post={data} />
    </div>
  )
}
