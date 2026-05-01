import { getMercadoPagoClient } from './client'
import { Preference } from 'mercadopago'

type CreatePreferenceParams = {
  title: string
  unit_price: number    // valor em reais (não centavos)
  quantity?: number
  payer_email?: string
  external_reference?: string
  back_url_success?: string
  back_url_failure?: string
  installments?: number // máximo de parcelas no cartão
}

export async function createPreference({
  title,
  unit_price,
  quantity = 1,
  payer_email,
  external_reference,
  back_url_success,
  back_url_failure,
  installments = 2,
}: CreatePreferenceParams) {
  const client = getMercadoPagoClient()
  const preference = new Preference(client)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const result = await preference.create({
    body: {
      items: [
        {
          id: external_reference ?? 'item',
          title,
          unit_price,
          quantity,
          currency_id: 'BRL',
        },
      ],
      payer: payer_email ? { email: payer_email } : undefined,
      payment_methods: {
        installments,
        excluded_payment_types: [{ id: 'ticket' }], // sem boleto
      },
      back_urls: {
        success: back_url_success ?? `${siteUrl}/sucesso`,
        failure: back_url_failure ?? `${siteUrl}/erro-pagamento`,
        pending: `${siteUrl}/pagamento-pendente`,
      },
      auto_return: 'approved',
      external_reference,
      notification_url: `${siteUrl}/api/payments/webhook`,
    },
  })

  return result
}
