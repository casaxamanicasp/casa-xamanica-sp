import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMercadoPagoClient } from '@/lib/mercadopago/client'
import { Payment, Preference } from 'mercadopago'
import { RegistrationFormData } from '@/lib/types'

export async function POST(req: NextRequest) {
  try {
    const { event_id, form, total_cents }: {
      event_id: string
      form: RegistrationFormData
      total_cents: number
    } = await req.json()

    const supabase = createAdminClient()

    // 1. Verifica vagas disponíveis
    const { data: event } = await supabase
      .from('events')
      .select('spots_available, title, date, location_name, address')
      .eq('id', event_id)
      .single()

    if (!event || event.spots_available <= 0) {
      return NextResponse.json({ error: 'Vagas esgotadas' }, { status: 400 })
    }

    // 2. Cria a inscrição
    const { data: registration, error: regError } = await supabase
      .from('registrations')
      .insert({
        event_id,
        pricing_tier_name: form.pricing_tier_name,
        include_transfer: form.include_transfer,
        status: 'pending',
        amount_cents: total_cents,
      })
      .select()
      .single()

    if (regError || !registration) {
      return NextResponse.json({ error: 'Erro ao criar inscrição' }, { status: 500 })
    }

    // 3. Salva a ficha de anamnese
    await supabase.from('anamnesis').insert({
      registration_id: registration.id,
      full_name: form.full_name,
      email: form.email,
      birth_date: form.birth_date,
      phone: form.phone,
      address: form.address,
      previous_ayahuasca: form.previous_ayahuasca,
      health_treatment: form.health_treatment,
      current_medications: form.current_medications,
      allergies: form.allergies,
      health_conditions: form.health_conditions,
      other_health_issues: form.other_health_issues,
      ceremony_expectation: form.ceremony_expectation,
      terms_accepted: form.terms_accepted,
    })

    const mp = getMercadoPagoClient()
    const totalReais = total_cents / 100
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

    // 4a. PIX — cria pagamento direto
    if (form.payment_method === 'pix') {
      const payment = new Payment(mp)
      const pixPayment = await payment.create({
        body: {
          transaction_amount: totalReais,
          description: event.title,
          payment_method_id: 'pix',
          payer: { email: form.email, first_name: form.full_name.split(' ')[0] },
          external_reference: registration.id,
          notification_url: `${siteUrl}/api/payments/webhook`,
        },
      })

      await supabase
        .from('registrations')
        .update({ payment_id: String(pixPayment.id) })
        .eq('id', registration.id)

      return NextResponse.json({
        registration_id: registration.id,
        pix: pixPayment.point_of_interaction?.transaction_data,
      })
    }

    // 4b. Cartão — cria preference (Checkout Pro)
    const preference = new Preference(mp)
    const pref = await preference.create({
      body: {
        items: [{
          id: registration.id,
          title: event.title,
          unit_price: totalReais,
          quantity: 1,
          currency_id: 'BRL',
        }],
        payer: { email: form.email, name: form.full_name },
        payment_methods: { installments: 2, excluded_payment_types: [{ id: 'ticket' }] },
        back_urls: {
          success: `${siteUrl}/sucesso?reg=${registration.id}`,
          failure: `${siteUrl}/eventos`,
          pending: `${siteUrl}/sucesso?reg=${registration.id}&pending=1`,
        },
        auto_return: 'approved',
        external_reference: registration.id,
        notification_url: `${siteUrl}/api/payments/webhook`,
      },
    })

    await supabase
      .from('registrations')
      .update({ payment_id: pref.id })
      .eq('id', registration.id)

    return NextResponse.json({
      registration_id: registration.id,
      preference_id: pref.id,
    })

  } catch (err: any) {
    console.error('Payment create error:', err)
    return NextResponse.json({ error: err.message ?? 'Erro interno' }, { status: 500 })
  }
}
