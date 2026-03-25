import { useState, useMemo, memo } from 'react'
import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

  const whatsappUrl = useMemo(
    () =>
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${product.name}`
      )}`,
    [product.name]
  )

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
      {/* Image area — CSS crossfade replaces AnimatePresence (eliminates ref warning + overhead) */}
      <div className="relative h-52 overflow-hidden bg-gray-100">
        {product.images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={product.alt}
            width={600}
            height={450}
            loading={priority && idx === 0 ? 'eager' : 'lazy'}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
              idx === currentIdx ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full shadow-sm">
            {categoryLabels[product.category]}
          </span>
        </div>

        {/* Carousel Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 w-full mb-2">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setCurrentIdx(idx)
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
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>
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
