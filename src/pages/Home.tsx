import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { m  } from 'framer-motion'
import { ArrowRight, Star, TrendingUp, Handshake, Package, ShieldCheck, Truck, MapPin, Coffee, ShoppingBag, Building2, ChefHat, Shield, Clock, Users } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'
import { products, testimonials } from '@/data/products'
import { trackEvent } from '@/lib/analytics'
import { ProductCard } from '@/components/ui/ProductCard'
import { PartnersCarousel } from '@/components/ui/PartnersCarousel'


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export function Home() {
  return (
    <>
      <Helmet>
        <title>L'Apreciê | Fornecedor de Tortas e Bolos para Cafeterias e Empórios</title>
        <meta
          name="description"
          content="Fornecimento B2B de tortas doces, salgadas e bolos artesanais premium para cafeterias, empórios e restaurantes. Produto padronizado, pronto para revender."
        />
        <link rel="canonical" href="https://laprecietortas.com.br/" />
        {/* LCP Preload: Pré-carregar a imagem principal de fundo para máxima performance */}
        <link rel="preload" as="image" href="/images/hero/hero.webp" type="image/webp" fetchPriority="high" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "L'Apreciê Tortas e Bolos",
          "description": "Fornecedora premium de tortas e bolos artesanais para cafeterias, empórios e restaurantes",
          "cnpj": "27.919.179/0001-31",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Apiaba, 147 - Parque Universitário de Viracopos",
            "addressLocality": "Campinas",
            "addressRegion": "SP",
            "postalCode": "13056-485",
            "addressCountry": "BR"
          },
          "url": "https://laprecietortas.com.br",
          "telephone": "+55-19-99610-9814",
          "email": "pedro.lucena.lyra@gmail.com",
          "sameAs": [
            "https://www.instagram.com/lapreciee_tortas/",
            "https://www.ifood.com.br/delivery/campinas-sp/laprecie-tortas---mimos-sobremesas-confeitaria-parque-universitario-de-viracopos/f782f536-4f98-45c1-b059-2212a29c3a7e"
          ],
          "priceRange": "$$",
          "servesCuisine": "Bakery",
        })}</script>
      </Helmet>

      {/* ─── 1. HERO ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        
      >
        {/* Background image natively loaded for LCP */}
        <img
          src="/images/hero/hero.webp"
          alt="Tortas Doces, Salgadas e Bolos Artesanais Premium L'Apreciê"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover opacity-100  -z-10"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(27,35,64,0.97) 0%, rgba(43,58,107,0.88) 60%, rgba(74,92,153,0.70) 100%)',
          }}
        />

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary-light/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-soft/10 blur-3xl" />

        {/* Main content — Ajustado com pt-36 no mobile para fugir do header h-20 gigante */}
        <div className="relative z-10 container-custom text-center px-4 md:px-6 pb-20 pt-40 md:pt-24 flex flex-col justify-center items-center w-full">
          <m.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto w-full"
          >
            <m.div variants={fadeUp} className="mb-8 flex justify-center w-full">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/90 text-[13px] md:text-sm font-medium backdrop-blur-sm shadow-sm">
                <Star size={14} className="text-yellow-400" fill="currentColor" />
                Fornecedor Premium B2B · São Paulo
              </span>
            </m.div>

            <m.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight font-bold mb-6"
            >
              Eleve o cardápio
              <br />
              <span className="italic text-white/85">do seu negócio</span>
            </m.h1>

            <m.p
              variants={fadeUp}
              className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            >
              Tortas doces, salgadas e bolos artesanais prontos para servir e revender.
              Produto padronizado que aumenta seu ticket médio sem aumentar sua operação.
            </m.p>

            <m.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href={WHATSAPP_URL}
                onClick={() => trackEvent('whatsapp_click')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hocus:bg-white/90 transition-all duration-200 shadow-2xl hocus:shadow-white/20 hocus:-translate-y-0.5 text-base"
              >
                Falar no WhatsApp
                <ArrowRight size={16} />
              </a>
              <Link
                to="/parceiro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-full hocus:border-white hocus:bg-white/10 transition-all duration-200 text-base"
              >
                Quero Revender
              </Link>
              <Link
                to="/produtos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white/80 font-medium rounded-full hocus:border-white/40 hocus:text-white transition-all duration-200 text-sm"
              >
                Ver Catálogo
              </Link>
            </m.div>

            {/* Scroll indicator — Integrado ao fluxo visual (em vez de absoluto flutuante) com espaço para não sobrepor */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-12 md:mt-16 flex flex-col items-center gap-2 pointer-events-none mx-auto"
            >
              <span className="text-white/40 text-xs uppercase tracking-widest">Conheça</span>
              <m.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
              </m.div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── 2. O QUE FAZEMOS ─── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <m.div variants={fadeUp}>
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Sobre nós
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold leading-tight mb-6">
                Artesanal na receita,
                <br />
                <em>profissional na entrega</em>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                Somos fornecedores especializados em tortas e bolos premium para o mercado B2B.
                Cada produto é preparado com ingredientes selecionados, padronizado para servir
                diretamente na mesa do seu cliente.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Atendemos cafeterias, empórios gourmet, bistrôs e restaurantes que buscam
                um diferencial premium no cardápio sem aumentar a carga operacional.
              </p>
            </m.div>

            <m.div variants={stagger} className="grid grid-cols-2 gap-4">
              {[
                { icon: ChefHat, title: 'Receitas Exclusivas', desc: 'Formuladas por chefs especialistas' },
                { icon: Shield, title: 'Padronização Total', desc: 'Mesma qualidade em todos os pedidos' },
                { icon: TrendingUp, title: 'Ticket Médio+', desc: 'Produto premium que justifica margem' },
                { icon: Clock, title: 'Pronto para Servir', desc: 'Zero preparo na sua cozinha' },
              ].map((item, i) => (
                <m.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-brand-bg border border-gray-100 hocus:border-primary-light/30 hocus:shadow-lg hocus:-translate-y-1 transition-all duration-300 group"
                >
                  <item.icon size={28} className="text-primary mb-3 group-hocus:scale-110 transition-transform duration-200" />
                  <div className="font-semibold text-brand-dark text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── 4. PRODUTOS EM DESTAQUE ─── */}
      <section className="bg-brand-bg section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.div variants={fadeUp} className="text-center mb-14">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Catálogo
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-4">
                Produtos em destaque
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Uma seleção dos nossos bestsellers — os produtos que mais vendem nas cafeterias parceiras.
              </p>
            </m.div>

            <m.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                'tortas-doces-torta_cheescake_frutas_vermelhas',
                'tortas-salgadas-torta_de_frango',
                'bolos-caseiros-bolo_de_limao_com_mousse',
                'linha-zero-bolo_zero_glutem_lactose'
              ].map((targetId, i) => {
                const product = products.find(p => p.id === targetId)
                if (!product) return null
                return <ProductCard key={product.id} product={product} i={i} priority={true} />
              })}
            </m.div>

            <m.div variants={fadeUp} className="text-center">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hocus:bg-primary-light transition-colors duration-200 shadow-lg hocus:shadow-xl hocus:-translate-y-0.5"
              >
                Ver catálogo completo
                <ArrowRight size={16} />
              </Link>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── 5. POR QUE L'APRECIÊ? ─── */}
      <section className="bg-primary section-padding" style={{ backgroundColor: '#2B3A6B' }}>
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.div variants={fadeUp} className="text-center mb-14">
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 block">
                Diferenciais
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-4">
                Por que L'Apreciê?
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">
                Entendemos o desafio de quem gerencia um negócio de alimentação.
                É por isso que fazemos a parte difícil por você.
              </p>
            </m.div>

            <m.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Padrão Premium',
                  desc: 'Produtos artesanais com padronização industrial — qualidade consistente em cada entrega, sem variação.',
                },
                {
                  icon: Handshake,
                  title: 'Parceria Estratégica',
                  desc: 'Não somos só fornecedores. Apoiamos com estratégias de venda, mix de produtos e execução de vitrine.',
                },
                {
                  icon: Package,
                  title: 'Pronto para Vender',
                  desc: 'Todos os produtos chegam prontos para expor e servir — sem produção local necessária.',
                },
                {
                  icon: TrendingUp,
                  title: 'Aumento de Ticket Médio',
                  desc: 'Nossos produtos elevam o valor percebido do seu estabelecimento e aumentam o ticket médio.',
                },
                {
                  icon: Truck,
                  title: 'Entrega Frequente',
                  desc: 'Entrega 1 a 2x por semana, ajustável conforme sua demanda. Sempre fresco, sempre no prazo.',
                },
                {
                  icon: MapPin,
                  title: 'Região Metropolitana',
                  desc: 'Atendimento em toda a Região Metropolitana de Campinas, com expansão para São Paulo em andamento.',
                },
              ].map((item, i) => (
                <m.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-6 hocus:bg-white/12 transition-colors duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h3 className="font-display text-white font-semibold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── 6. DEPOIMENTOS ─── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.div variants={fadeUp} className="text-center mb-14">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Parceiros
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-4">
                O que dizem nossos parceiros
              </h2>
            </m.div>

            <m.div variants={stagger} className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <m.div
                  key={t.id}
                  custom={i}
                  variants={fadeUp}
                  className="relative bg-brand-bg rounded-2xl p-8 border border-gray-100"
                >
                  {/* Quote mark */}
                  <div className="absolute -top-4 left-8 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-display text-xl font-bold leading-none">"</span>
                  </div>
                  <div className="flex mb-4 mt-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={14} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic mb-6 text-sm">
                    "{t.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-brand-dark text-sm">{t.author}</div>
                    <div className="text-primary-soft text-xs font-medium">{t.business}</div>
                    <div className="text-gray-400 text-xs">{t.location}</div>
                  </div>
                </m.div>
              ))}
            </m.div>

            {/* Grid de Logos Integrado (PROVA SOCIAL) */}
            <m.div variants={fadeUp} className="mt-16 md:mt-20">
              <PartnersCarousel />
            </m.div>

            {/* Tipos de parceiros */}
            <m.div variants={fadeUp} className="mt-20 md:mt-24 pt-12 border-t border-gray-100">
              <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">
                Atendemos
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                {[
                  { icon: Coffee, label: 'Cafeterias' },
                  { icon: ShoppingBag, label: 'Empórios' },
                  { icon: Building2, label: 'Restaurantes' },
                  { icon: Users, label: 'Bistrôs' },
                ].map((type) => (
                  <div key={type.label} className="flex flex-col items-center gap-2 text-gray-400 hocus:text-primary transition-colors duration-200">
                    <type.icon size={28} />
                    <span className="text-xs font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── 7. CTA FINAL ─── */}
      <section className="section-padding" style={{ backgroundColor: '#1C2340' }}>
        <div className="container-custom">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
              Pronto para levar produtos
              <br />
              <em>premium ao seu negócio?</em>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Entre em contato agora e descubra como a L'Apreciê pode transformar
              o cardápio do seu estabelecimento.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                onClick={() => trackEvent('whatsapp_click')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-full hocus:bg-green-400 transition-colors duration-200 shadow-2xl text-base"
              >
                Falar no WhatsApp agora
                <ArrowRight size={16} />
              </a>
              <Link
                to="/parceiro"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hocus:bg-white/20 transition-colors duration-200 text-base"
              >
                Quero ser parceiro
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
