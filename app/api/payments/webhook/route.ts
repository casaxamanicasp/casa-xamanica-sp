import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMercadoPagoClient } from '@/lib/mercadopago/client'
import { Payment } from 'mercadopago'
import { sendRegistrationConfirmation, sendOrderConfirmation, sendAnamnesisToAdmin } from '@/lib/resend/send-confirmation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { type, data } = body

    if (type !== 'payment') {
      return NextResponse.json({ ok: true })
    }

    const mp = getMercadoPagoClient()
    const payment = new Payment(mp)
    const paymentData = await payment.get({ id: data.id })

    if (paymentData.status !== 'approved') {
      return NextResponse.json({ ok: true })
    }

    const supabase = createAdminClient()
    const registrationId = paymentData.external_reference

    // Tenta atualizar como inscrição de cerimônia
    const { data: registration } = await supabase
      .from('registrations')
      .select(`
        *,
        events(title, date, location_name, address, event_type),
        anamnesis(
          full_name, email, birth_date, phone, address,
          previous_ayahuasca, health_treatment, current_medications,
          allergies, health_conditions, other_health_issues, ceremony_expectation
        )
      `)
      .eq('id', registrationId)
      .single()

    if (registration) {
      await supabase
        .from('registrations')
        .update({ status: 'approved', payment_method: paymentData.payment_method_id })
        .eq('id', registrationId)

      // Decrementa vagas
      await supabase.rpc('decrement_spots', { event_id: registration.event_id })

      const anamnesis = registration.anamnesis as any
      const event = registration.events as any
      const eventDate = format(new Date(event.date), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR })
      const paymentMethod = paymentData.payment_method_id === 'pix' ? 'Pix' : 'Cartão de Crédito'

      if (anamnesis?.email) {
        // E-mail de confirmação para o participante
        await sendRegistrationConfirmation({
          to: anamnesis.email,
          name: anamnesis.full_name,
          eventTitle: event.title,
          eventDate,
          eventLocation: event.location_name,
          paymentMethod,
        })

        // Ficha de anamnese completa para a Casa Xamânica
        await sendAnamnesisToAdmin({
          eventTitle: event.title,
          eventDate,
          eventLocation: event.location_name,
          eventType: event.event_type ?? 'cerimonia',
          pricingTier: registration.pricing_tier_name ?? '',
          amountCents: registration.amount_cents ?? 0,
          paymentMethod,
          anamnesis,
        })
      }

      return NextResponse.json({ ok: true })
    }

    // Tenta como pedido de loja
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', registrationId)
      .single()

    if (order) {
      await supabase
        .from('orders')
        .update({ status: 'approved', payment_method: paymentData.payment_method_id })
        .eq('id', registrationId)

      await sendOrderConfirmation({
        to: order.buyer_email,
        name: order.buyer_name,
        productName: order.product_name ?? 'Produto',
        quantity: order.quantity,
        amount: `R$ ${(order.amount_cents / 100).toFixed(2).replace('.', ',')}`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
