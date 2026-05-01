import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendRegistrationConfirmation({
  to,
  name,
  eventTitle,
  eventDate,
  eventLocation,
  paymentMethod,
}: {
  to: string
  name: string
  eventTitle: string
  eventDate: string
  eventLocation: string
  paymentMethod: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `✅ Inscrição confirmada — ${eventTitle}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FBF7EE; padding: 40px; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #2D4A2D; font-size: 28px; margin-bottom: 8px;">Casa Xamânica SP</h1>
          <p style="color: #C9A84C; font-size: 16px;">Inscrição Confirmada</p>
        </div>

        <p style="color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Olá, <strong>${name}</strong>!
        </p>
        <p style="color: #1A1A1A; font-size: 16px; line-height: 1.6;">
          Sua inscrição para <strong>${eventTitle}</strong> foi confirmada com sucesso.
        </p>

        <div style="background: #2D4A2D; color: #F5EDD6; padding: 24px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-size: 14px; opacity: 0.8;">CERIMÔNIA</p>
          <p style="margin: 0 0 12px; font-size: 20px; font-weight: bold;">${eventTitle}</p>
          <p style="margin: 0 0 6px; font-size: 14px;">📅 ${eventDate}</p>
          <p style="margin: 0; font-size: 14px;">📍 ${eventLocation}</p>
        </div>

        <p style="color: #1A1A1A; font-size: 14px; line-height: 1.6;">
          Pagamento realizado via: <strong>${paymentMethod}</strong>
        </p>

        <div style="border-top: 2px solid #E8D9B8; margin-top: 32px; padding-top: 24px;">
          <h3 style="color: #2D4A2D; margin-bottom: 12px;">Orientações gerais</h3>
          <ul style="color: #1A1A1A; font-size: 14px; line-height: 1.8; padding-left: 20px;">
            <li>Prefira roupas leves e confortáveis — calças, vestidos ou saias compridas</li>
            <li>Traga colchonete e manta/coberta</li>
            <li>Não ingira álcool ou drogas sintéticas nos 3 dias anteriores</li>
            <li>No dia: hidrate-se bem e prefira alimentação leve (frutas, mingau)</li>
          </ul>
        </div>

        <p style="color: #8B5E3C; font-size: 13px; margin-top: 32px; text-align: center;">
          Dúvidas? Fale conosco pelo WhatsApp: <a href="https://wa.me/5511984837287" style="color: #2D4A2D;">(11) 98483-7287</a>
        </p>
      </div>
    `,
  })
}

export async function sendOrderConfirmation({
  to,
  name,
  productName,
  quantity,
  amount,
}: {
  to: string
  name: string
  productName: string
  quantity: number
  amount: string
}) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: `✅ Pedido confirmado — ${productName}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #FBF7EE; padding: 40px;">
        <h1 style="color: #2D4A2D;">Casa Xamânica SP — Pedido Confirmado</h1>
        <p>Olá, <strong>${name}</strong>! Seu pedido foi confirmado.</p>
        <div style="background: #2D4A2D; color: #F5EDD6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>${productName}</strong></p>
          <p>Quantidade: ${quantity}</p>
          <p>Total: ${amount}</p>
        </div>
        <p>Entraremos em contato em breve para combinar a entrega.</p>
        <p style="color: #8B5E3C;">WhatsApp: <a href="https://wa.me/5511984837287" style="color: #2D4A2D;">(11) 98483-7287</a></p>
      </div>
    `,
  })
}
