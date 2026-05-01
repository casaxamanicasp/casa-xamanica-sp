import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMercadoPagoClient } from '@/lib/mercadopago/client'
import { Payment } from 'mercadopago'
import { sendRegistrationConfirmation, sendOrderConfirmation } from '@/lib/resend/send-confirmation'
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
      .select('*, events(title, date, location_name, address), anamnesis(full_name, email)')
      .eq('id', registrationId)
      .single()

    if (registration) {
      await supabase
        .from('registrations')
        .update({ status: 'approved', payment_method: paymentData.payment_method_id })
        .eq('id', registrationId)

      // Decrementa vagas
      await supabase.rpc('decrement_spots', { event_id: registration.event_id })

      // Envia e-mail de confirmação
      const anamnesis = registration.anamnesis as any
      const event = registration.events as any
      if (anamnesis?.email) {
        await sendRegistrationConfirmation({
          to: anamnesis.email,
          name: anamnesis.full_name,
          eventTitle: event.title,
          eventDate: format(new Date(event.date), "dd 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR }),
          eventLocation: event.location_name,
          paymentMethod: paymentData.payment_method_id === 'pix' ? 'Pix' : 'Cartão de Crédito',
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
