import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pagamento Confirmado' }

export default function SucessoPage() {
  return (
    <div className="min-h-screen bg-[--color-creme] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white rounded-lg shadow-[--shadow-card] p-10">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[--color-floresta] rounded-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <h1 className="font-[--font-titulo] text-3xl font-bold text-[--color-floresta-escuro] mb-3">
          Pagamento Confirmado!
        </h1>
        <p className="text-[--color-terra] leading-relaxed mb-8">
          Sua inscrição foi realizada com sucesso. Você receberá um e-mail de confirmação em breve com todos os detalhes.
        </p>

        <div className="bg-[--color-bege] rounded-lg p-4 mb-8 text-sm text-[--color-floresta-escuro]">
          <p className="font-bold mb-1">Dúvidas?</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'}`}
            className="text-[--color-floresta] font-medium hover:underline"
          >
            Fale conosco pelo WhatsApp
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/eventos"
            className="bg-[--color-floresta] text-[--color-bege] px-6 py-3 rounded font-[--font-titulo] font-bold uppercase tracking-wide text-sm hover:bg-[--color-floresta-claro] transition-colors"
          >
            Ver mais cerimônias
          </Link>
          <Link href="/" className="text-sm text-[--color-terra] hover:underline">
            Voltar à página inicial
          </Link>
        </div>
      </div>
    </div>
  )
}
