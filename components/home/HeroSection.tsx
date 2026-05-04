import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP ?? '5511984837287'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]">

      {/* Foto de fundo */}
      <Image
        src="/hero-bg.png"
        alt="Cerimônia Casa Xamânica SP"
        fill
        className="object-cover object-top"
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
        <p className="text-[#ddd] text-base md:text-lg tracking-[0.15em] mb-10 max-w-xl mx-auto leading-relaxed">
          A floresta chama. São Paulo escuta.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/eventos"
            className="border border-white/40 text-white px-10 py-4 font-[--font-titulo] font-bold tracking-[0.2em] uppercase text-sm hover:border-[--color-dourado] hover:text-[--color-dourado] transition-all backdrop-blur-sm"
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

      {/* Scroll indicator animado */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="text-white text-[11px] tracking-[0.35em] uppercase font-medium">Rolar</span>
        <div className="animate-bounce">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Fade bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent" />
    </section>
  )
}
