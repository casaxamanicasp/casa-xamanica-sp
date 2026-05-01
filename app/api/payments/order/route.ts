import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getMercadoPagoClient } from '@/lib/mercadopago/client'
import { Payment, Preference } from 'mercadopago'

export async function POST(req: NextRequest) {
  try {
    const { product_id, quantity, form, payment_method } = await req.json()
    const supabase = createAdminClient()

    const { data: product } = await supabase
      .from('products')
      .select('name, price_cents, stock')
      .eq('id', product_id)
      .single()

    if (!product || product.stock < quantity) {
      return NextResponse.json({ error: 'Produto indisponível' }, { status: 400 })
    }

    const totalCents = product.price_cents * quantity

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        product_id,
        buyer_name: form.name,
        buyer_email: form.email,
        buyer_phone: form.phone,
        buyer_address: form.address,
        quantity,
        amount_cents: totalCents,
        status: 'pending',
      })
      .select()
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Erro ao criar pedido' }, { status: 500 })
    }

    const mp = getMercadoPagoClient()
    const totalReais = totalCents / 100
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

    if (payment_method === 'pix') {
      const payment = new Payment(mp)
      const pixPayment = await payment.create({
        body: {
          transaction_amount: totalReais,
          description: product.name,
          payment_method_id: 'pix',
          payer: { email: form.email, first_name: form.name.split(' ')[0] },
          external_reference: order.id,
          notification_url: `${siteUrl}/api/payments/webhook`,
        },
      })

      await supabase.from('orders').update({ payment_id: String(pixPayment.id) }).eq('id', order.id)

      return NextResponse.json({ pix: pixPayment.point_of_interaction?.transaction_data })
    }

    const preference = new Preference(mp)
    const pref = await preference.create({
      body: {
        items: [{ id: order.id, title: product.name, unit_price: totalReais, quantity, currency_id: 'BRL' }],
        payer: { email: form.email, name: form.name },
        payment_methods: { installments: 2, excluded_payment_types: [{ id: 'ticket' }] },
        back_urls: {
          success: `${siteUrl}/sucesso?order=${order.id}`,
          failure: `${siteUrl}/loja`,
          pending: `${siteUrl}/sucesso?order=${order.id}&pending=1`,
        },
        auto_return: 'approved',
        external_reference: order.id,
        notification_url: `${siteUrl}/api/payments/webhook`,
      },
    })

    await supabase.from('orders').update({ payment_id: pref.id }).eq('id', order.id)

    return NextResponse.json({ preference_id: pref.id })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
