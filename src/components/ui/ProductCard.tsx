import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react'
import { m } from 'framer-motion'
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/utils'
import { categoryLabels } from '@/data/products'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  i?: number
  priority?: boolean
}

export const ProductCard = memo(function ProductCard({ product, priority = false }: ProductCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const hasMultiple = product.images.length > 1

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${product.name}`
      )}`,
    [product.name]
  )

  // Detecta se a descrição ultrapassa 3 linhas (está sendo truncada pelo line-clamp)
  useEffect(() => {
    const el = descRef.current
    if (!el) return

    // Clona o parágrafo sem line-clamp para medir a altura real do texto
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.webkitLineClamp = 'unset'
    clone.style.display = 'block'
    clone.style.position = 'absolute'
    clone.style.visibility = 'hidden'
    clone.style.width = `${el.offsetWidth}px`
    clone.style.pointerEvents = 'none'
    document.body.appendChild(clone)

    const fullHeight = clone.scrollHeight
    document.body.removeChild(clone)

    setIsTruncated(fullHeight > el.clientHeight + 2)
  }, [product.description])

  // Sync dot indicator with native scroll position via IntersectionObserver
  useEffect(() => {
    if (!hasMultiple || !railRef.current) return
    const rail = railRef.current
    const imgs = Array.from(rail.querySelectorAll('[data-snap-item]'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = imgs.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setCurrentIdx(idx)
            break
          }
        }
      },
      { root: rail, threshold: 0.5 }
    )

    imgs.forEach((img) => observer.observe(img))
    return () => observer.disconnect()
  }, [hasMultiple, product.images.length])

  // Dot click → smooth scroll to slide
  const goTo = useCallback((idx: number) => {
    if (!railRef.current) return
    const rail = railRef.current
    rail.scrollTo({ left: rail.offsetWidth * idx, behavior: 'smooth' })
  }, [])

  return (
    <m.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ layout: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }, duration: 0.15 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hocus:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image area — CSS Scroll Snap rail */}
      <div className="relative h-52 bg-gray-100">
        {/* Scroll Snap Rail */}
        <div
          ref={railRef}
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {product.images.map((src, idx) => (
            <div
              key={src}
              data-snap-item
              className="flex-none w-full h-full snap-center overflow-hidden"
            >
              <img
                src={src}
                alt={product.alt}
                width={600}
                height={450}
                loading={priority && idx === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-sm">
            {categoryLabels[product.category]}
          </span>
        </div>

        {/* Carousel Dots */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 w-full mb-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  goTo(idx)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIdx ? 'bg-white opacity-100 scale-125' : 'bg-white/50 hocus:bg-white/80'
                }`}
                aria-label={`Ver imagem ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display text-brand-dark font-semibold text-base mb-2 leading-snug">
          {product.name}
        </h3>

        {/* Descrição com expand/collapse */}
        <div className="mb-4">
          <p
            ref={descRef}
            className="text-gray-500 text-xs leading-relaxed"
            style={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: expanded ? 'unset' : 3,
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
          {isTruncated && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-1.5 flex items-center gap-0.5 text-primary text-xs font-medium hocus:text-primary-light transition-colors duration-150"
              aria-expanded={expanded}
            >
              {expanded ? (
                <>Ver menos <ChevronUp size={13} /></>
              ) : (
                <>Ver mais <ChevronDown size={13} /></>
              )}
            </button>
          )}
        </div>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400 font-medium">Preço sob consulta</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary font-semibold text-xs hocus:gap-2 transition-all duration-200"
          >
            Quero esse
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </m.div>
  )
})
