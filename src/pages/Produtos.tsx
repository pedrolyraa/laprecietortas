import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowRight, Search } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'
import { products, categoryLabels } from '@/data/products'
import { trackEvent } from '@/lib/analytics'
import { ProductCard } from '@/components/ui/ProductCard'
import type { ProductCategory } from '@/types'

const categories: Array<'todas' | ProductCategory> = [
  'todas',
  'tortas-doces',
  'tortas-salgadas',
  'bolos-caseiros',
  'bolos-confeitados',
  'sobremesas-individuais',
  'linha-zero',
]

export function Produtos() {
  const [activeCategory, setActiveCategory] = useState<'todas' | ProductCategory>('todas')

  useEffect(() => {
    trackEvent('catalog_view');
  }, []);
  const filtered =
    activeCategory === 'todas'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "ItemList",
    "itemListElement": filtered.map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "description": p.description,
        "category": categoryLabels[p.category] || p.category,
        "image": p.images[0] ? `https://laprecietortas.com.br${p.images[0]}` : undefined
      }
    }))
  }

  return (
    <>
      <Helmet>
        <title>Produtos | Tortas para Revenda – L'apreciê</title>
        <meta
          name="description"
          content="Catálogo completo de tortas doces, salgadas, bolos caseiros, bolos confeitados e sobremesas individuais para revenda. Fornecimento premium para cafeterias e empórios."
        />
        <link rel="canonical" href="https://laprecietortas.com.br/produtos" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding" style={{ backgroundColor: '#2B3A6B' }}>
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mt-5">
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 block">
                Catálogo para Revenda
              </span>
              <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-4 leading-tight">
                Nossos produtos
              </h1>
              <p className="text-white/65 text-lg max-w-xl leading-relaxed">
                Todos prontos para servir na vitrine do seu estabelecimento. 
                Preços sob consulta — foco em qualidade e volume.
              </p>
            </m.div>
            <m.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <a
                href={WHATSAPP_URL}
                onClick={() => trackEvent('whatsapp_click')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hocus:bg-white/90 transition-all duration-200 shadow-lg text-sm whitespace-nowrap"
              >
                <Search size={16} />
                Solicitar catálogo completo
              </a>
            </m.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white sticky top-16 z-30 border-b border-gray-100 shadow-sm">
        <div className="container-custom">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-500 hocus:text-brand-dark hocus:bg-gray-50'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-brand-bg section-padding">
        <div className="container-custom">
          <m.div 
            layout 
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} i={i} priority={i < 4} />
              ))}
            </AnimatePresence>
          </m.div>

          {/* Bottom CTA */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center p-12 rounded-3xl border-2 border-dashed border-primary/30 bg-white"
          >
            <h3 className="font-display text-2xl md:text-3xl text-brand-dark font-bold mb-3">
              Não encontrou o que procurava?
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
              Temos um catálogo completo com muito mais opções. 
              Entre em contato e solicite nosso portfólio exclusivo.
            </p>
            <a
              href={WHATSAPP_URL}
              onClick={() => trackEvent('whatsapp_click')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hocus:bg-primary-light transition-colors duration-200"
            >
              Solicitar catálogo completo
              <ArrowRight size={16} />
            </a>
          </m.div>
        </div>
      </section>
    </>
  )
}
