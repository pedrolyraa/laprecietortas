import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'


const partners = [
  { name: 'Aromatta Café', img: 'aromattacafe' },
  { name: 'Baleno Café', img: 'balenocafe' },
  { name: 'Café do Rico', img: 'cafedorico' },
  { name: 'Logo Canto', img: 'logo-canto', className: 'scale-[1.6]' },
  { name: 'Coffe Roasters', img: 'cofferoasters' },
  { name: 'Croi Coffe', img: 'croicoffe' },
  { name: 'Doce & Café', img: 'doce-cafe' },
  { name: 'Pancremo', img: 'pancremo' },
  { name: 'Prema', img: 'prema' },
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
      {/* Left Arrow Button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-white border border-gray-200 shadow-sm rounded-full text-gray-500 hover:text-primary hover:border-primary/50 focus:outline-none transition-all duration-200 xl:-ml-4 opacity-0 group-hover/carousel:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Carousel Track */}
      {/* Opção A: CSS Grid/Flex Nativo com Snap Mandatory para performance extrema */}
      <div
        ref={carouselRef}
        className="flex gap-8 md:gap-12 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth items-center py-4"
      >
        {partners.map((partner) => {
          // Add a type cast or allow optional chaining, but in JS/TS an inline optional property works fine if defined in the array
          const customClass = (partner as any).className || '';
          return (
            <div
              key={partner.name}
              className="flex-none w-[45%] sm:w-[30%] md:w-[22%] lg:w-[16%] snap-center flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300"
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

      {/* Right Arrow Button */}
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
