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

export async function sendAnamnesisToAdmin({
  eventTitle,
  eventDate,
  eventLocation,
  eventType,
  pricingTier,
  amountCents,
  paymentMethod,
  anamnesis,
}: {
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventType: string
  pricingTier: string
  amountCents: number
  paymentMethod: string
  anamnesis: {
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
  }
}) {
  const tipo = eventType === 'vivencia' ? 'Vivência' : 'Cerimônia'
  const valor = `R$ ${(amountCents / 100).toFixed(0)}`
  const pagamento = paymentMethod === 'pix' ? 'Pix' : 'Cartão de Crédito'

  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;background:#f5f5f5;font-weight:bold;width:35%;vertical-align:top;font-size:13px;color:#555;">${label}</td><td style="padding:8px 12px;font-size:13px;color:#1a1a1a;">${value || '—'}</td></tr>`

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: 'casaxamanica@gmail.com',
    subject: `📋 Nova inscrição confirmada — ${anamnesis.full_name} | ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #fff; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">

        <div style="background: #2D4A2D; color: #F5EDD6; padding: 24px 32px;">
          <h1 style="margin: 0 0 4px; font-size: 20px;">Casa Xamânica SP</h1>
          <p style="margin: 0; font-size: 14px; opacity: 0.8;">Nova inscrição confirmada — ${tipo}</p>
        </div>

        <div style="padding: 24px 32px;">

          <h2 style="font-size: 16px; color: #2D4A2D; border-bottom: 2px solid #E8D9B8; padding-bottom: 8px; margin-bottom: 16px;">🗓 Evento</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Evento', eventTitle)}
            ${row('Tipo', tipo)}
            ${row('Data', eventDate)}
            ${row('Local', eventLocation)}
            ${row('Lote', pricingTier)}
            ${row('Valor pago', valor)}
            ${row('Pagamento', pagamento)}
          </table>

          <h2 style="font-size: 16px; color: #2D4A2D; border-bottom: 2px solid #E8D9B8; padding-bottom: 8px; margin-bottom: 16px;">👤 Dados Pessoais</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Nome completo', anamnesis.full_name)}
            ${row('E-mail', anamnesis.email)}
            ${row('Data de nascimento', anamnesis.birth_date)}
            ${row('Telefone/WhatsApp', anamnesis.phone)}
            ${row('Endereço', anamnesis.address)}
          </table>

          <h2 style="font-size: 16px; color: #2D4A2D; border-bottom: 2px solid #E8D9B8; padding-bottom: 8px; margin-bottom: 16px;">🌿 Saúde e Histórico</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Experiência com Ayahuasca', anamnesis.previous_ayahuasca)}
            ${row('Tratamento de saúde atual', anamnesis.health_treatment)}
            ${row('Medicações em uso', anamnesis.current_medications)}
            ${row('Alergias', anamnesis.allergies)}
            ${row('Condições de saúde', anamnesis.health_conditions?.join(', ') || 'Nenhuma')}
            ${row('Outros problemas de saúde', anamnesis.other_health_issues)}
          </table>

          <h2 style="font-size: 16px; color: #2D4A2D; border-bottom: 2px solid #E8D9B8; padding-bottom: 8px; margin-bottom: 16px;">🙏 Intenção</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            ${row('Expectativa da cerimônia', anamnesis.ceremony_expectation)}
          </table>

        </div>

        <div style="background: #f9f9f9; padding: 16px 32px; font-size: 12px; color: #999; text-align: center;">
          Ficha gerada automaticamente pelo site Casa Xamânica SP
        </div>
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
