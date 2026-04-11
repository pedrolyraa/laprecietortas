import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'


const partners = [
  // LEMBRETE IMPORTANTE: Verifique se a extensão (.png/.webp) e o nome literal do arquivo
  // no seu computador estão EXATAMENTE iguais ao nome listado abaixo, incluindo letras
  // maiúsculas e minúsculas. O Vite/React é case-sensitive (ex: Logo.png != logo.png).
  { name: 'Aromatta Café', img: 'aromattacafe' },
  { name: 'Baleno Café', img: 'balenocafe' },
  { name: 'Bialetti', img: 'logo_preto-bialetti' },
  { name: 'Café do Rico', img: 'cafedorico' },
  { name: 'Logo Canto', img: 'logo-canto', className: 'scale-[1.6]' },
  { name: 'Coffe Roasters', img: 'cofferoasters' },
  { name: 'Croi Coffe', img: 'croicoffe' },
  { name: 'Doce & Café', img: 'doce-cafe' },
  { name: 'Pancremo', img: 'pancremo' },
  { name: 'Prema', img: 'prema' },
  { name: 'PUB KFE', img: 'pubkfe' },
  { name: 'Spagnol', img: 'spagnol' },
]

export function PartnersCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      // Scroll by roughly the width of the container minus a small offset
      const scrollAmount = carouselRef.current.clientWidth * 0.8
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative group/carousel w-full max-w-6xl mx-auto px-4 md:px-12"
    >
      {/* Left Arrow Button — desktop only */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-200 shadow-sm rounded-full text-gray-500 hover:text-primary hover:border-primary/50 focus:outline-none transition-all duration-200 xl:-ml-4 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Mobile fade mask — suaviza as bordas laterais dando o efeito de "infinite scroll"
          Apenas visual, zero impacto de performance. Escondido em md+. */}
      <div
        className="md:hidden absolute inset-y-0 left-0 w-10 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white 10%, transparent)' }}
      />
      <div
        className="md:hidden absolute inset-y-0 right-0 w-10 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white 10%, transparent)' }}
      />

      {/* Carousel Track
          - Mobile: overflow-x-auto + snap-x → swipe nativo, zero JS de touch
          - Desktop: overflow-x-hidden → controlado pelos botões de seta
          - Item width mobile: 60% → 1 logo centralizado + "peek" do próximo
          - Item width tablet+: proporcional ao tamanho da tela */}
      <div
        ref={carouselRef}
        className="flex gap-6 md:gap-12 overflow-x-auto md:overflow-x-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth items-center py-4 px-4 md:px-0"
      >
        {partners.map((partner) => {
          const customClass = (partner as any).className || '';
          return (
            <div
              key={partner.name}
              className="shrink-0 w-[60%] sm:w-[35%] md:w-[22%] lg:w-[16%] snap-center flex items-center justify-center transition-all duration-300"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`/images/parceiros/${partner.img}.webp`}
                  sizes="(max-width: 768px) 150px, 300px"
                />
                <img
                  src={`/images/parceiros/${partner.img}.png`}
                  alt={`Logo ${partner.name}`}
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={150}
                  style={{ contentVisibility: 'auto' }}
                  className={`max-h-[50px] md:max-h-[70px] w-auto object-contain mx-auto ${customClass}`}
                />
              </picture>
            </div>
          );
        })}
      </div>

      {/* Right Arrow Button — desktop only */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-200 shadow-sm rounded-full text-gray-500 hover:text-primary hover:border-primary/50 focus:outline-none transition-all duration-200 xl:-mr-4 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Próximo"
      >
        <ChevronRight size={20} />
      </button>
    </m.div>
  )
}
