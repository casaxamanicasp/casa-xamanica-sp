import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">

      {/* Foto de fundo */}
      <Image
        src="/hero-bg.jpg"
        alt="Cerimônia Casa Xamânica SP"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />

      {/* Overlay escuro em camadas — atmosférico */}
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 80%, rgba(8,8,8,1) 100%)',
        }}
      />
      {/* Brilho verde central suave */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 60%, #0F1F0F 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-24">

        {/* Logo branco */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo-branco.png"
            alt="Casa Xamânica SP"
            width={280}
            height={112}
            className="h-24 md:h-32 w-auto object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Tagline */}
        <p className="text-[#ddd] text-base md:text-lg tracking-[0.15em] mb-4 max-w-xl mx-auto leading-relaxed">
          A floresta chama. São Paulo escuta.
        </p>
        <p className="text-[--color-dourado] text-sm tracking-[0.2em] uppercase mb-10">
          Ayahuasca · Rapé · Sananga
        </p>

        {/* Divisor kene dourado */}
        <div className="flex justify-center mb-10">
          <svg viewBox="0 0 280 10" width="240" height="10" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 14 }).map((_, i) => (
              <polygon
                key={i}
                points={`${i * 20},10 ${i * 20 + 10},0 ${i * 20 + 20},10`}
                fill="#C9A84C"
                opacity={i % 2 === 0 ? '1' : '0.4'}
              />
            ))}
          </svg>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/eventos"
            className="bg-[--color-dourado] text-[#0D0D0D] px-10 py-4 font-[--font-titulo] font-bold tracking-[0.2em] uppercase text-sm hover:bg-[--color-dourado-claro] transition-all hover:scale-105 shadow-2xl"
          >
            Próximas Cerimônias
          </Link>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/40 text-white px-10 py-4 font-[--font-titulo] font-bold tracking-[0.2em] uppercase text-sm hover:border-[--color-dourado] hover:text-[--color-dourado] transition-all backdrop-blur-sm"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  )
}
