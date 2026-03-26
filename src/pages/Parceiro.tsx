import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { m, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign, Clock, ChevronDown, MessageSquare, Package, Handshake, BarChart3 } from 'lucide-react'
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'
import type { LeadFormData } from '@/types'

const schema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  empresa: z.string().min(2, 'Nome da empresa deve ter pelo menos 2 caracteres'),
  cidade: z.string().min(2, 'Informe sua cidade'),
  telefone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/, 'Formato: (11) 99999-9999'),
  tipoNegocio: z.string().min(1, 'Selecione o tipo de negócio'),
  mensagem: z.string().optional(),
})

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const faqs = [
  {
    q: 'Qual é o pedido mínimo?',
    a: 'Trabalhamos com pedidos a partir de 5 unidades por produto. Para novos parceiros, realizamos um pedido de degustação para você conhecer a qualidade antes de comprar em volume.',
  },
  {
    q: 'Como funciona a entrega?',
    a: 'Entregamos em toda a região de São Paulo e cidades próximas. Para outras regiões, avaliamos viabilidade de envio por transportadora com embalagem isotérmica especial.',
  },
  {
    q: 'Qual é o prazo de produção?',
    a: 'O prazo padrão é de 48 a 72 horas após confirmação do pedido. Para eventos ou volumes maiores, recomendamos pedidos com 5 dias de antecedência.',
  },
  {
    q: 'Os produtos têm conservantes?',
    a: 'Não. Todos os nossos produtos são artesanais e livres de conservantes artificiais. Por isso, prezamos pela frescura e pedidos programados.',
  },
  {
    q: 'Posso ter exclusividade em minha região?',
    a: 'Sim, trabalhamos com acordos de exclusividade geográfica para parceiros com volume consistente. Entre em contato para discutir condições.',
  },
]

export function Parceiro() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: LeadFormData) => {
    trackEvent('lead_form_submit', { form: 'parceiro_b2b' })
    try {
      const res = await fetch('https://formsubmit.co/ajax/laprecietortas@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Novo lead de parceria vindo do site!! – ${data.nome}`,
          name: data.nome,
          empresa: data.empresa,
          cidade: data.cidade,
          telefone: data.telefone,
          tipo_negocio: data.tipoNegocio,
          message: data.mensagem || 'Sem mensagem adicional',
        }),
      })

      if (!res.ok) throw new Error(`FormSubmit: ${res.status}`)

      setSubmitted(true)
      reset()
    } catch (err) {
      console.error('FormSubmit error:', err)
      // Fallback WhatsApp se o envio falhar
      const msg = encodeURIComponent(
        `*Novo Lead – L'apreciê Parceiro*\n\n` +
        `*Nome:* ${data.nome}\n*Empresa:* ${data.empresa}\n` +
        `*Cidade:* ${data.cidade}\n*Telefone:* ${data.telefone}\n` +
        `*Tipo:* ${data.tipoNegocio}`
      )
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      setSubmitted(true)
      reset()
    }
  }

  return (
    <>
      <Helmet>
        <title>Seja um Parceiro | Revenda L'apreciê – Confeitaria Artesanal em Campinas</title>
        <meta
          name="description"
          content="Torne-se parceiro da L'apreciê: fornecedora de confeitaria artesanal premium para cafeterias, empórios e restaurantes na Região Metropolitana de Campinas. Pedido mínimo R$350, entrega 2x/semana."
        />
        <link rel="canonical" href="https://laprecietortas.com.br/parceiro" />
      </Helmet>

      {/* ─── HERO PARCEIRO ─── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden" style={{ backgroundColor: '#1C2340' }}>
        <div className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&q=80)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(28,35,64,0.97) 0%, rgba(43,58,107,0.85) 100%)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-gradient-radial from-white to-transparent" />

        <div className="relative z-10 container-custom section-padding !py-0">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <m.div
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <m.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-medium mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Vagas abertas para parceiros
                </span>
              </m.div>
              <m.h1
                variants={fadeUp}
                className="font-display text-5xl md:text-6xl text-white font-bold leading-tight mb-6"
              >
                Seu negócio merece
                <br />
                <em className="text-white/80">o melhor produto</em>
              </m.h1>
              <m.p
                variants={fadeUp}
                className="text-white/65 text-xl mb-8 leading-relaxed max-w-lg"
              >
                Aumente o ticket médio, reduza custos operacionais e fidelize clientes
                com tortas e bolos artesanais prontos para servir.
              </m.p>

              <m.div variants={stagger} className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { value: '30%', label: 'Aumento médio de ticket' },
                  { value: '0h', label: 'Preparo na sua cozinha' },
                  { value: '48h', label: 'Prazo de entrega' },
                ].map((stat) => (
                  <m.div key={stat.label} variants={fadeUp} className="glass-card rounded-xl p-4 text-center">
                    <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-white/50 text-xs leading-snug">{stat.label}</div>
                  </m.div>
                ))}
              </m.div>

              <m.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#formulario"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hocus:bg-white/90 transition-all duration-200 shadow-xl text-base"
                >
                  Quero ser parceiro
                  <ArrowRight size={16} />
                </a>
                <a
                  href={WHATSAPP_URL}
                  onClick={() => trackEvent('whatsapp_click')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500/20 border border-green-400/40 text-green-300 font-semibold rounded-full hocus:bg-green-500/30 transition-all duration-200 text-base"
                >
                  Falar no WhatsApp
                </a>
              </m.div>
            </m.div>

            {/* Feature pills */}
            <m.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {[
                { icon: TrendingUp, text: 'Produto premium que vende mais por menos esforço' },
                { icon: DollarSign, text: 'Margens atrativas com sugestão de preço de revenda' },
                { icon: Clock, text: 'Entrega pontual, produto fresco e pronto para vitrine' },
                { icon: CheckCircle2, text: 'Sem mínimo assustador — comece pequeno e escale' },
                { icon: MessageSquare, text: 'Suporte dedicado da nossa equipe comercial' },
              ].map((item, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4 glass-card rounded-xl p-4"
                >
                  <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-white" />
                  </div>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </m.div>
              ))}
            </m.div>
          </div>
        </div>
      </section>

      {/* ─── BENEFÍCIOS ─── */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <m.div variants={fadeUp} className="text-center mb-14">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Por que revender L'apreciê?
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-4">
                Benefícios do modelo
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Desenvolvemos um modelo de fornecimento pensado para facilitar a vida de quem
                gerencia um negócio de alimentação.
              </p>
            </m.div>

            <m.div variants={stagger} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  accent: 'text-sky-600',
                  bg: 'bg-sky-50',
                  title: 'Aumento de ticket médio',
                  desc: 'Produtos premium com percepção de valor elevada. Estudos com nossos parceiros mostram aumento de 25–35% no ticket médio quando há tortas L\'apreciê no cardápio.',
                  highlight: '+30% ticket médio',
                },
                {
                  icon: DollarSign,
                  accent: 'text-emerald-600',
                  bg: 'bg-emerald-50',
                  title: 'Redução de custo operacional',
                  desc: 'Sem necessidade de contratar confeiteiro, comprar insumos ou dedicar espaço de cozinha. Você recebe pronto para servir, com custo previsível por unidade.',
                  highlight: 'Zero desperdício',
                },
                {
                  icon: CheckCircle2,
                  accent: 'text-violet-600',
                  bg: 'bg-violet-50',
                  title: 'Produto padronizado',
                  desc: 'Cada unidade entregue tem o mesmo sabor, tamanho e apresentação. Seus clientes esperam consistência — e a L\'apreciê garante isso em cada pedido.',
                  highlight: '100% padronizado',
                },
              ].map((item, i) => (
                <m.div
                  key={item.title}
                  custom={i}
                  variants={fadeUp}
                  className="relative bg-brand-bg rounded-3xl p-8 hocus:shadow-xl transition-shadow duration-300 group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gray-100/50 -translate-y-8 translate-x-8 group-hocus:scale-110 transition-transform duration-500" />
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                    <item.icon size={28} className={item.accent} />
                  </div>
                  <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-dark mb-4 shadow-sm">
                    {item.highlight}
                  </div>
                  <h3 className="font-display text-brand-dark font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </m.div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section className="bg-brand-bg section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <m.div variants={fadeUp} className="text-center mb-16">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Passo a passo
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-4">
                Como funciona
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Em 5 passos simples, você começa a revender produtos L'apreciê
                com acompanhamento da nossa equipe.
              </p>
            </m.div>

            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <m.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
                {[
                  { icon: MessageSquare, step: '01', title: 'Primeiro contato', desc: 'Entre em contato pelo WhatsApp ou formulário. Enviamos o catálogo completo de produtos.' },
                  { icon: Package, step: '02', title: 'Visita e degustação', desc: 'Agendamos uma visita com degustação para você conhecer nossos produtos pessoalmente.' },
                  { icon: BarChart3, step: '03', title: 'Definição do mix', desc: 'Juntos definimos o mix ideal de produtos para o seu ponto de venda.' },
                  { icon: Handshake, step: '04', title: 'Primeiro pedido', desc: 'Realizamos o primeiro pedido com acompanhamento assistido da nossa equipe.' },
                  { icon: TrendingUp, step: '05', title: 'Parceria ativa', desc: 'Acompanhamento contínuo de vendas, exposição e estratégias para maximizar seus resultados.' },
                ].map((item, i) => (
                  <m.div
                    key={item.step}
                    custom={i}
                    variants={fadeUp}
                    className="relative flex flex-col items-center text-center group"
                  >
                    <div className="relative w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mb-6 group-hocus:scale-105 transition-transform duration-200 shadow-lg shadow-primary/30">
                      <item.icon size={28} className="text-white" />
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                        <span className="text-primary font-bold text-xs">{i + 1}</span>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-primary-soft uppercase tracking-widest mb-2">{item.step}</div>
                    <h3 className="font-display text-brand-dark font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </m.div>
                ))}
              </m.div>
            </div>

            {/* Informações práticas */}
            <m.div variants={fadeUp} className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Pedido mínimo', value: 'R$ 350,00' },
                { label: 'Frequência de entrega', value: '1 a 2x por semana' },
                { label: 'Área de atendimento', value: 'Reg. Metropolitana de Campinas' },
                { label: 'Produto', value: '100% pronto para vender' },
              ].map((info) => (
                <div key={info.label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="text-xs font-semibold text-primary-soft uppercase tracking-wider mb-2">{info.label}</div>
                  <div className="font-display text-brand-dark font-bold text-lg leading-snug">{info.value}</div>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── FORMULÁRIO DE LEAD ─── */}
      <section id="formulario" className="section-padding" style={{ backgroundColor: '#2B3A6B' }}>
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-2 gap-16 items-start"
          >
            {/* Left info */}
            <m.div variants={fadeUp}>
              <span className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 block">
                Início da parceria
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
                Pronto para começar?
              </h2>
              <p className="text-white/65 text-lg leading-relaxed mb-8">
                Preencha o formulário e nossa equipe entrará em contato em até 24 horas
                com todas as informações sobre como iniciar a parceria.
              </p>
              <ul className="space-y-4">
                {[
                  'Resposta em até 24 horas úteis',
                  'Kit degustação gratuito para novos parceiros',
                  'Consultoria personalizada para seu negócio',
                  'Condições exclusivas para primeiros pedidos',
                ].map((text) => (
                  <li key={text} className="flex items-center gap-3 text-white/70 text-sm">
                    <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>

              {/* WhatsApp alternative */}
              <div className="mt-10 p-6 glass-card rounded-2xl">
                <p className="text-white/60 text-sm mb-3">Prefere contato imediato?</p>
                <a
                  href={WHATSAPP_URL}
                  onClick={() => trackEvent('whatsapp_click')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hocus:bg-green-400 transition-colors duration-200 text-sm"
                >
                  Chamar no WhatsApp
                  <ArrowRight size={14} />
                </a>
              </div>
            </m.div>

            {/* Form */}
            <m.div variants={fadeUp}>
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                {submitted ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h3 className="font-display text-2xl text-brand-dark font-bold mb-2">
                      Mensagem enviada!
                    </h3>
                    <p className="text-gray-500 mb-6 text-sm">
                      Nossa equipe entrará em contato em até 24 horas.
                      Enquanto isso, você pode nos chamar no WhatsApp!
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      onClick={() => trackEvent('whatsapp_click')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-full hocus:bg-green-400 transition-colors"
                    >
                      Abrir WhatsApp
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 block mx-auto text-gray-400 text-xs underline"
                    >
                      Enviar outro formulário
                    </button>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="mb-6">
                      <h3 className="font-display text-2xl text-brand-dark font-semibold mb-1">
                        Dados de contato
                      </h3>
                      <p className="text-gray-400 text-sm">Todos os campos marcados com * são obrigatórios</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">
                          Nome completo *
                        </label>
                        <input
                          {...register('nome')}
                          type="text"
                          placeholder="João Silva"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${errors.nome
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
                            } outline-none`}
                        />
                        {errors.nome && (
                          <p className="mt-1 text-red-500 text-xs">{errors.nome.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">
                          Empresa / Estabelecimento *
                        </label>
                        <input
                          {...register('empresa')}
                          type="text"
                          placeholder="Cafeteria Doce Lar"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${errors.empresa
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
                            } outline-none`}
                        />
                        {errors.empresa && (
                          <p className="mt-1 text-red-500 text-xs">{errors.empresa.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">
                          Cidade *
                        </label>
                        <input
                          {...register('cidade')}
                          type="text"
                          placeholder="São Paulo"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${errors.cidade
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
                            } outline-none`}
                        />
                        {errors.cidade && (
                          <p className="mt-1 text-red-500 text-xs">{errors.cidade.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-dark mb-1.5">
                          Telefone / WhatsApp *
                        </label>
                        <input
                          {...register('telefone')}
                          type="tel"
                          placeholder="(11) 99999-9999"
                          className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors ${errors.telefone
                              ? 'border-red-400 bg-red-50'
                              : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
                            } outline-none`}
                        />
                        {errors.telefone && (
                          <p className="mt-1 text-red-500 text-xs">{errors.telefone.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">
                        Tipo de negócio *
                      </label>
                      <select
                        {...register('tipoNegocio')}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors bg-white ${errors.tipoNegocio
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10'
                          } outline-none`}
                      >
                        <option value="">Selecione...</option>
                        <option value="cafeteria">Cafeteria</option>
                        <option value="emporio">Empório Gourmet</option>
                        <option value="restaurante">Restaurante</option>
                        <option value="bistro">Bistrô / Lanchonete</option>
                        <option value="hotel">Hotel / Pousada</option>
                        <option value="outro">Outro</option>
                      </select>
                      {errors.tipoNegocio && (
                        <p className="mt-1 text-red-500 text-xs">{errors.tipoNegocio.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-brand-dark mb-1.5">
                        Mensagem (opcional)
                      </label>
                      <textarea
                        {...register('mensagem')}
                        rows={3}
                        placeholder="Conte um pouco sobre seu negócio e o que precisa..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm outline-none resize-none transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary text-white font-semibold rounded-xl hocus:bg-primary-light transition-colors duration-200 text-sm shadow-lg hocus:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Quero ser parceiro
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-gray-400">
                      Ao enviar, você concorda com nossa política de privacidade.
                      Sem spam, prometemos.
                    </p>
                  </form>
                )}
              </div>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-white section-padding">
        <div className="container-custom max-w-3xl">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Dúvidas frequentes
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold">
                FAQ
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl border border-gray-100 bg-brand-bg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left gap-4 group"
                  >
                    <span className="font-semibold text-brand-dark text-sm">{faq.q}</span>
                    <m.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-primary"
                    >
                      <ChevronDown size={18} />
                    </m.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                          {faq.a}
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </div>

            {/* Final CTA below FAQ */}
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4 text-sm">Ainda tem dúvidas?</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-semibold rounded-full hocus:bg-green-400 transition-colors duration-200"
              >
                Falar no WhatsApp
                <ArrowRight size={16} />
              </a>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
