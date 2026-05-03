import { createClient } from '@/lib/supabase/server'
import { Product } from '@/lib/types'
import Link from 'next/link'
import type { Metadata } from 'next'
import { TribalDivider } from '@/components/ui/TribalDivider'

export const metadata: Metadata = {
  title: 'Loja',
  description: 'Produtos xamânicos — rapé, cristais, incensos e muito mais.',
}

export default async function LojaPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const byCategory = (products as Product[] ?? []).reduce<Record<string, Product[]>>((acc, p) => {
    const cat = p.category ?? 'Produtos'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(p)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="bg-[--color-floresta-escuro] py-16 px-4 text-center">
        <p className="text-[--color-dourado] text-xs tracking-[0.4em] uppercase mb-2">Produtos</p>
        <h1 className="font-[--font-titulo] text-4xl md:text-5xl font-bold text-[--color-bege] mb-4">Loja</h1>
        <p className="text-[--color-bege] opacity-80 max-w-xl mx-auto">
          Produtos sagrados e artesanatos da floresta.
        </p>
      </div>

      <TribalDivider />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {Object.keys(byCategory).length === 0 ? (
          <p className="text-center text-[--color-terra] py-20">Novos produtos em breve.</p>
        ) : (
          Object.entries(byCategory).map(([cat, items]) => (
            <div key={cat} className="mb-12">
              {Object.keys(byCategory).length > 1 && (
                <h2 className="font-[--font-titulo] text-xl font-bold text-[--color-floresta-escuro] mb-6 pb-2 border-b-2 border-[--color-dourado]">
                  {cat}
                </h2>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images[0]

  return (
    <Link href={`/loja/${product.slug}`} className="group block">
      <div className="bg-white rounded-lg overflow-hidden shadow-[--shadow-card] hover:shadow-[--shadow-hover] transition-all hover:-translate-y-1">
        <div className="aspect-square bg-[--color-bege] overflow-hidden">
          {mainImage ? (
            <img src={mainImage} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">🌿</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-[--font-titulo] text-sm font-bold text-[--color-floresta-escuro] mb-1 line-clamp-2 group-hover:text-[--color-floresta] transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold text-[--color-floresta]">
              R$ {(product.price_cents / 100).toFixed(2).replace('.', ',')}
            </span>
            {product.stock <= 0 && (
              <span className="text-xs text-red-500 font-medium">Esgotado</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
