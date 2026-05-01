import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Product } from '@/lib/types'
import { CheckoutForm } from '@/components/store/CheckoutForm'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('name,description').eq('slug', slug).single()
  if (!data) return {}
  return { title: data.name, description: data.description?.slice(0, 160) ?? '' }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('*').eq('slug', slug).eq('is_active', true).single()
  if (!data) notFound()

  const product = data as Product

  return (
    <div className="min-h-screen bg-[--color-creme]">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Imagens */}
          <div>
            <div className="aspect-square bg-[--color-bege] rounded-lg overflow-hidden mb-3">
              {product.images[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">🌿</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div key={i} className="aspect-square rounded overflow-hidden">
                    <img src={img} alt={`${product.name} ${i + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Detalhes + compra */}
          <div>
            {product.category && (
              <p className="text-xs text-[--color-dourado] uppercase tracking-widest mb-2">{product.category}</p>
            )}
            <h1 className="font-[--font-titulo] text-3xl font-bold text-[--color-floresta-escuro] mb-3">{product.name}</h1>
            <p className="font-[--font-titulo] text-3xl font-bold text-[--color-floresta] mb-4">
              R$ {(product.price_cents / 100).toFixed(2).replace('.', ',')}
            </p>

            {product.description && (
              <div className="prose-xamanica text-sm mb-6" dangerouslySetInnerHTML={{ __html: product.description }} />
            )}

            {product.stock <= 0 ? (
              <div className="bg-red-50 border border-red-200 rounded p-4 text-center text-red-600 font-medium">
                Produto esgotado
              </div>
            ) : (
              <CheckoutForm product={product} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
