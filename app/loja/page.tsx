import type { Metadata } from 'next'
import { TribalDivider } from '@/components/ui/TribalDivider'

export const metadata: Metadata = {
  title: 'Loja — Em breve',
  description: 'Nossa loja de produtos xamânicos está chegando em breve.',
}

export default function LojaPage() {
  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] min-h-[288px] flex flex-col items-center justify-center px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.5em] uppercase mb-3">Produtos</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4 tracking-wider">LOJA</h1>
        <p className="text-[--color-bege] opacity-70 max-w-xl mx-auto leading-relaxed">
          Produtos sagrados e artesanatos da floresta.
        </p>
      </div>

      <TribalDivider />

      <div className="max-w-6xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <p className="text-5xl mb-6">🌿</p>
        <h2 className="font-[--font-titulo] text-2xl font-bold text-[--color-floresta-escuro] mb-3">Em breve</h2>
        <p className="text-[--color-terra] max-w-sm leading-relaxed">
          Nossa loja está sendo preparada com cuidado. Em breve você poderá encontrar aqui produtos sagrados, artesanatos e muito mais.
        </p>
      </div>
    </div>
  )
}
