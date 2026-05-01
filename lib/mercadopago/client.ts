import MercadoPago from 'mercadopago'

let client: MercadoPago | null = null

export function getMercadoPagoClient(): MercadoPago {
  if (!client) {
    client = new MercadoPago({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })
  }
  return client
}
