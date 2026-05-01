'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteSupporter(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  await supabase.from('supporters').delete().eq('id', id)
  revalidatePath('/admin/apoiadores')
  revalidatePath('/apoiadores')
}

export async function upsertSupporter(formData: FormData) {
  const id = formData.get('id') as string | null
  const supabase = createAdminClient()

  const payload = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    logo_url: formData.get('logo_url') as string,
    website: formData.get('website') as string,
    category: formData.get('category') as string,
    display_order: Number(formData.get('display_order') ?? 0),
    is_active: formData.get('is_active') === 'on',
  }

  if (id) {
    await supabase.from('supporters').update(payload).eq('id', id)
  } else {
    await supabase.from('supporters').insert(payload)
  }

  revalidatePath('/admin/apoiadores')
  revalidatePath('/apoiadores')
  redirect('/admin/apoiadores')
}
