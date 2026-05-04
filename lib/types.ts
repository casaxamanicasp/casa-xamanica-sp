// Tipos principais do sistema Casa Xamânica SP

export type PricingTier = {
  name: string          // "1 lote"
  deadline: string      // "2026-05-10"
  price_cents: number
}

export type ScheduleItem = {
  time: string          // "18h"
  activity: string      // "Abertura da Casa"
}

export type Event = {
  id: string
  title: string
  slug: string
  event_type: 'cerimonia' | 'vivencia'
  description: string | null
  date: string
  location_name: string
  address: string
  maps_link: string | null
  spots_total: number
  spots_available: number
  cover_image: string | null
  medicines: string[]
  schedule: ScheduleItem[]
  pricing_tiers: PricingTier[]
  transfer_available: boolean
  transfer_price_cents: number
  transfer_location: string | null
  cancellation_policy: string
  orientations: string | null
  end_date: string | null
  is_active: boolean
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string | null
  excerpt: string | null
  cover_image: string | null
  author: string
  published_at: string | null
  is_published: boolean
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price_cents: number
  stock: number
  images: string[]
  category: string | null
  is_active: boolean
  created_at: string
}

export type Registration = {
  id: string
  event_id: string
  pricing_tier_name: string | null
  include_transfer: boolean
  status: 'pending' | 'approved' | 'rejected'
  payment_id: string | null
  payment_method: string | null
  amount_cents: number
  created_at: string
}

export type Anamnesis = {
  id: string
  registration_id: string
  full_name: string
  email: string
  birth_date: string
  phone: string
  address: string
  previous_ayahuasca: string
  health_treatment: string
  current_medications: string
  allergies: string
  health_conditions: string[]
  other_health_issues: string
  ceremony_expectation: string
  terms_accepted: boolean
  created_at: string
}

export type Order = {
  id: string
  product_id: string
  buyer_name: string
  buyer_email: string
  buyer_phone: string
  buyer_address: string | null
  quantity: number
  amount_cents: number
  status: 'pending' | 'approved' | 'rejected'
  payment_id: string | null
  payment_method: string | null
  created_at: string
}

export type Supporter = {
  id: string
  name: string
  description: string | null
  logo_url: string | null
  website: string | null
  category: string | null
  display_order: number
  is_active: boolean
  created_at: string
}

// Dados do formulário de inscrição (wizard)
export type RegistrationFormData = {
  // Step 1 — seleção
  pricing_tier_name: string
  pricing_tier_price: number
  include_transfer: boolean

  // Step 2 — dados pessoais
  full_name: string
  email: string
  birth_date: string
  phone: string
  address: string

  // Step 3 — saúde
  previous_ayahuasca: string
  health_treatment: string
  current_medications: string
  allergies: string
  health_conditions: string[]
  other_health_issues: string

  // Step 4 — intenção + termos
  ceremony_expectation: string
  terms_accepted: boolean

  // Step 5 — pagamento
  payment_method: 'pix' | 'credit_card' | null
}
