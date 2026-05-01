'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/produtos')
  revalidatePath('/loja')
}

export async function upsertProduct(formData: FormData) {
  const id = formData.get('id') as string | null
  const name = formData.get('name') as string
  const supabase = createAdminClient()
  const slug = slugify(name, { lower: true, strict: true, locale: 'pt' })
  const images = (formData.get('images') as string ?? '').split('\n').map((s) => s.trim()).filter(Boolean)

  const payload = {
    name,
    slug,
    description: formData.get('description') as string,
    price_cents: Number(formData.get('price') ?? 0) * 100,
    stock: Number(formData.get('stock') ?? 0),
    images,
    category: formData.get('category') as string,
    is_active: formData.get('is_active') === 'on',
  }

  if (id) {
    await supabase.from('products').update(payload).eq('id', id)
  } else {
    await supabase.from('products').insert(payload)
  }

  revalidatePath('/admin/produtos')
  revalidatePath('/loja')
  redirect('/admin/produtos')
}
