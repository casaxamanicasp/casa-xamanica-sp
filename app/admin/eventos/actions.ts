'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import slugify from 'slugify'

export async function duplicateEvent(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createAdminClient()

  const { data: original } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (!original) return

  const { id: _id, created_at: _ca, ...rest } = original

  const newTitle = `Cópia de ${rest.title}`
  const newSlug = slugify(newTitle, { lower: true, strict: true, locale: 'pt' }) + '-' + Date.now()

  const duplicate = {
    ...rest,
    title: newTitle,
    slug: newSlug,
    is_active: false,
    spots_available: rest.spots_total,
  }

  await supabase.from('events').insert(duplicate)
  revalidatePath('/admin/eventos')
}

export async function deleteEvent(formData: FormData) {
  const id = formData.get('id') as string
  const supabase = createAdminClient()
  await supabase.from('events').delete().eq('id', id)
  revalidatePath('/admin/eventos')
}

export async function upsertEvent(formData: FormData) {
  const id = formData.get('id') as string | null
  const title = formData.get('title') as string
  const supabase = createAdminClient()

  const slug = slugify(title, { lower: true, strict: true, locale: 'pt' })

  const pricingTiers = JSON.parse(formData.get('pricing_tiers') as string ?? '[]')
  const schedule = JSON.parse(formData.get('schedule') as string ?? '[]')
  const medicines = (formData.get('medicines') as string ?? '').split(',').map((m) => m.trim()).filter(Boolean)

  const eventType = (formData.get('event_type') as string) || 'cerimonia'

  const payload = {
    title,
    slug,
    event_type: eventType,
    description: formData.get('description') as string,
    date: formData.get('date') as string,
    location_name: formData.get('location_name') as string,
    address: formData.get('address') as string,
    maps_link: formData.get('maps_link') as string,
    spots_total: Number(formData.get('spots_total')),
    spots_available: Number(formData.get('spots_available')),
    medicines,
    schedule,
    pricing_tiers: pricingTiers,
    transfer_available: formData.get('transfer_available') === 'on',
    transfer_price_cents: Number(formData.get('transfer_price_cents') ?? 0) * 100,
    transfer_location: formData.get('transfer_location') as string,
    cancellation_policy: formData.get('cancellation_policy') as string,
    orientations: formData.get('orientations') as string,
    is_active: formData.get('is_active') === 'on',
  }

  if (id) {
    await supabase.from('events').update(payload).eq('id', id)
  } else {
    await supabase.from('events').insert(payload)
  }

  revalidatePath('/admin/eventos')
  revalidatePath('/eventos')
  revalidatePath('/vivencias')
  redirect('/admin/eventos')
}
