import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com a Casa Xamânica SP pelo WhatsApp, e-mail ou visite-nos.',
}

export default function ContatoPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'
  const email = process.env.NEXT_PUBLIC_EMAIL ?? 'casaxamanica@gmail.com'
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM ?? 'casaxamanicasp'

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Fale Conosco</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">CONTATO</h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Informações */}
          <div className="space-y-6">
            <div>
              <h2 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-6">
                Informações de Contato
              </h2>

              <div className="space-y-4">
                <ContactItem
                  icon="💬"
                  label="WhatsApp"
                  value="(11) 98483-7287"
                  href={`https://wa.me/${whatsapp}`}
                />
                <ContactItem
                  icon="✉️"
                  label="E-mail"
                  value={email}
                  href={`mailto:${email}`}
                />
                <ContactItem
                  icon="📸"
                  label="Instagram"
                  value={`@${instagram}`}
                  href={`https://instagram.com/${instagram}`}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-[--shadow-card]">
              <h3 className="font-[--font-titulo] text-lg font-bold text-[--color-floresta-escuro] mb-3">📍 Local das Cerimônias</h3>
              <p className="font-medium text-[--color-floresta]">Casa Árvore da Vida</p>
              <p className="text-sm text-[--color-terra] mt-1 leading-relaxed">
                Estrada Turística Morro do Saboó, 6201<br />
                São Roque — SP
              </p>
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 leading-relaxed">
                <p className="font-bold mb-1">Como chegar:</p>
                <p>Pela Rodovia Castelo Branco, saída no km 57,5 (Estrada Turística do Saboó). Ao chegar no n° 6201, aperte o botão do portão.</p>
              </div>
              <a
                href="https://g.co/kgs/Yye4cZ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-[--color-floresta] text-[--color-bege] px-4 py-2 rounded text-sm font-medium hover:bg-[--color-floresta-claro] transition-colors"
              >
                Abrir no Google Maps →
              </a>
            </div>
          </div>

          {/* Mapa embed */}
          <div className="rounded-lg overflow-hidden shadow-[--shadow-card]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0!2d-47.14!3d-23.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMxJzQ4LjAiUyA0N8KwMDgnMjQuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="100%"
              className="min-h-[400px] lg:min-h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Casa Xamânica SP"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: string
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all group"
    >
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-[--color-terra] uppercase tracking-wide">{label}</p>
        <p className="font-medium text-[--color-floresta-escuro] group-hover:text-[--color-floresta] transition-colors">
          {value}
        </p>
      </div>
      <span className="ml-auto text-[--color-floresta] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </a>
  )
}
