'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'

export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  await supabase.from('blog_posts').delete().eq('id', id)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}

export async function upsertPost(formData: FormData) {
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const supabase = createAdminClient()
  const slug = slugify(title, { lower: true, strict: true, locale: 'pt' })
  const isPublished = formData.get('is_published') === 'on'

  const sourceRaw = (formData.get('source') as string)?.trim() || null
  const sourceUrlRaw = (formData.get('source_url') as string)?.trim() || null

  const payload = {
    title,
    slug,
    content: formData.get('content') as string,
    excerpt: formData.get('excerpt') as string,
    cover_image: formData.get('cover_image') as string,
    author: formData.get('author') as string || 'Casa Xamânica SP',
    source: sourceRaw,
    source_url: sourceUrlRaw,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  }

  if (id) {
    await supabase.from('blog_posts').update(payload).eq('id', id)
  } else {
    await supabase.from('blog_posts').insert(payload)
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  redirect('/admin/blog')
}
