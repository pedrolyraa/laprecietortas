import { Helmet } from 'react-helmet-async'
import { m  } from 'framer-motion'
import { ChefHat, Leaf, Award, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

const timeline = [
  { year: '2012', title: 'Mimos Sobremesas', desc: 'Em 22 de fevereiro nasce a Mimos Sobremesas — sem loja, vendendo de porta em porta em salões e empresas.' },
  { year: '2018', title: 'Consolidação da marca', desc: 'Seis anos de proximidade com o cliente moldam a essência da marca: qualidade consistente e compromisso com cada entrega.' },
  { year: '2020', title: 'Primeira loja', desc: 'Em plena pandemia, é inaugurada a primeira loja em Campinas, consolidando a marca como referência local.' },
  { year: '2023', title: 'L\'Apreciê Fábrica B2B', desc: 'Em 1º de dezembro nasce a L\'Apreciê como fábrica — já nos principais shopping centers de Campinas em menos de um mês.' },
]

export function Sobre() {
  return (
    <>
      <Helmet>
        <title>Sobre | L'Apreciê – Uma história de recomeço, fé e propósito</title>
        <meta
          name="description"
          content="Conheça a história da L'Apreciê: de vendas porta a porta em 2012 à fábrica B2B de confeitaria artesanal premium para cafeterias e empórios de Campinas e região."
        />
        <link rel="canonical" href="https://laprecietortas.com.br/sobre" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 section-padding" style={{ backgroundColor: '#2B3A6B' }}>
        <div className="container-custom text-center mt-4">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3 block">
              Nossa história
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
              Uma história de recomeço,
              <br />
              <em>fé e propósito</em>
            </h1>
            <p className="text-white/65 text-xl max-w-2xl mx-auto leading-relaxed">
              Da cozinha residencial às prateleiras dos melhores Shopping Centers de Campinas —
              tudo construído com trabalho, dedicação e amor pelo que fazemos.
            </p>
          </m.div>
        </div>
      </section>

      {/* História real */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <m.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                  A origem
                </span>
                <h2 className="font-display text-4xl text-brand-dark font-bold mb-6 leading-tight">
                  Uma jornada de<br />reconstrução
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    A L'apreciê nasceu de uma jornada de reconstrução. Seus fundadores, <strong>Juan e Nathália</strong>, enfrentaram perdas severas e decidiram recomeçar do zero — com uma filha de um ano nos braços e a determinação de construir algo sólido pelo trabalho.
                  </p>
                  <p>
                    Em <strong>22 de fevereiro de 2012</strong>, surgiu a Mimos Sobremesas: sem loja, sem estrutura, com vendas de porta em porta em salões e empresas. Por seis anos, esse caminho de proximidade com o cliente moldou a essência da marca — qualidade consistente e compromisso com cada entrega.
                  </p>
                  <p>
                    Em <strong>novembro de 2020</strong>, em plena pandemia, foi inaugurada a primeira loja, consolidando a marca como referência em Campinas. Mas o mercado já sinalizava uma oportunidade maior: o fornecimento B2B.
                  </p>
                  <p>
                    Em <strong>1º de dezembro de 2023</strong>, nasceu oficialmente a L'apreciê como fábrica — com equipamentos instalados e os primeiros parceiros atendidos em apenas dois dias. Em menos de um mês, já estava presente nos mais renomados shopping centers de Campinas.
                  </p>
                </div>
              </div>

              {/* Timeline vertical */}
              <div className="relative pl-8 lg:pl-12">
                <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/40 to-transparent" />
                <div className="space-y-10">
                  {timeline.map((item, i) => (
                    <m.div key={item.year} custom={i} variants={fadeUp} className="relative">
                      <div className="absolute -left-8 lg:-left-12 top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md" />
                      <div className="font-display text-2xl font-bold text-primary mb-1">{item.year}</div>
                      <h3 className="font-semibold text-brand-dark text-base mb-1">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </m.div>
                  ))}
                </div>
              </div>
            </m.div>

            {/* 📸 Testemunho Visual / Ponto de Virada */}
            <m.div variants={fadeUp} className="w-full flex justify-center my-16 md:my-24 px-4">
              <picture className="w-full max-w-4xl block">
                {/* Otimização WebP Presumida */}
                <source 
                  type="image/webp" 
                  srcSet="/images/sobre/imagem_juan.jpeg"
                />
                
                {/* Fallback JPEG/PNG Clássico com CLS Defense */}
                <img
                  src="/images/sobre/imagem_juan.jpeg"
                  alt="Testemunho visual de parceria comercial L'Apreciê"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={800} // Proporção assumida 3:2 para reservar o espaço correto no DOM (CLS: 0)
                  style={{ contentVisibility: 'auto' }}
                  className="w-full h-auto object-cover rounded-2xl shadow-xl"
                />
              </picture>
            </m.div>

            {/* Modelo */}
            <m.div variants={fadeUp} className="bg-primary rounded-3xl p-10 md:p-14 text-white text-center" style={{ backgroundColor: '#2B3A6B' }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Confeitaria artesanal em escala
              </h2>
              <p className="text-white/75 max-w-2xl mx-auto leading-relaxed text-lg">
                A L'apreciê não industrializou. Criou um modelo próprio: produção em maior volume com rigor técnico, mantendo qualidade artesanal, padronização de receitas, controle de processos e alto padrão de higiene.
              </p>
              <p className="text-white/60 max-w-xl mx-auto leading-relaxed mt-4">
                Hoje atende cafeterias, empórios, buffets e eventos de alta gastronomia na Região Metropolitana de Campinas — com expansão em andamento para a Grande São Paulo.
              </p>
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Diferenciais de qualidade */}
      <section className="bg-brand-bg section-padding">
        <div className="container-custom">
          <m.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <m.div variants={fadeUp}>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-6 leading-tight">
                Posicionamento premium,
                <br />
                <em>sem abrir mão do artesanal</em>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Na L'Apreciê, acreditamos que produto premium não é apenas ingrediente caro
                — é atenção ao detalhe, consistência e presença de marca. Cada produto que sai
                da nossa cozinha representa o padrão que seu cliente espera de você.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Trabalhamos com receitas exclusivas, matérias-primas selecionadas e processos
                de controle de qualidade rigorosos para garantir que o primeiro pedido seja
                idêntico ao milésimo.
              </p>
            </m.div>
            <m.div variants={stagger} className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, title: 'Qualidade certificada', desc: 'Ingredientes rastreados e aprovados' },
                { icon: Leaf, title: 'Sem conservantes', desc: 'Produtos naturais e frescos' },
                { icon: ChefHat, title: 'Receitas exclusivas', desc: 'Desenvolvidas por confeiteiros' },
                { icon: Users, title: 'Suporte contínuo', desc: 'Equipe dedicada ao seu sucesso' },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <item.icon size={24} className="text-primary mb-3" />
                  <div className="font-semibold text-brand-dark text-sm mb-1">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              ))}
            </m.div>
          </m.div>
        </div>
      </section>

      {/* Público atendido */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-4">
              Quem atendemos
            </h2>
            <p className="text-gray-500 mb-12 max-w-xl mx-auto">
              Nossos produtos foram pensados para estabelecimentos que valorizam qualidade
              e buscam diferenciação no mercado.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { emoji: '☕', label: 'Cafeterias', desc: 'Vitrine gourmet premium' },
                { emoji: '🛍️', label: 'Empórios', desc: 'Produtos artesanais para varejo' },
                { emoji: '🍽️', label: 'Restaurantes', desc: 'Sobremesas de alto padrão' },
                { emoji: '🥂', label: 'Bistrôs & Buffets', desc: 'Cardápio exclusivo e diferenciado' },
              ].map((type) => (
                <div
                  key={type.label}
                  className="p-8 bg-brand-bg rounded-2xl border border-gray-100 hocus:border-primary-light/30 hocus:shadow-lg transition-all duration-300 group"
                >
                  <div className="text-4xl mb-3 group-hocus:scale-110 transition-transform duration-200">
                    {type.emoji}
                  </div>
                  <div className="font-display font-semibold text-brand-dark text-lg mb-1">{type.label}</div>
                  <div className="text-gray-400 text-xs">{type.desc}</div>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* ─── ONDE ESTAMOS ─── */}
      <section className="bg-brand-bg section-padding">
        <div className="container-custom">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <span className="text-sm font-semibold text-primary-soft uppercase tracking-widest mb-3 block">
                Localização
              </span>
              <h2 className="font-display text-4xl md:text-5xl text-brand-dark font-bold mb-3">
                Onde estamos
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Rua Apiaba, 147 — Parque Universitário de Viracopos<br />
                <span className="text-sm">Campinas • SP • CEP 13056-485</span>
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              <iframe
                title="Localização L'Apreciê Tortas e Bolos — Campinas SP"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.2!2d-47.1!3d-22.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Apiaba%2C+147%2C+Parque+Universit%C3%A1rio+de+Viracopos%2C+Campinas%2C+SP%2C+13056-485!5e0!3m2!1spt-BR!2sbr!4v1710000000000"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="text-center mt-6">
              <a
                href="https://maps.google.com/?q=Rua+Apiaba,+147,+Parque+Universitario+de+Viracopos,+Campinas,+SP"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hocus:underline"
              >
                Ver no Google Maps →
              </a>
            </div>
          </m.div>
        </div>
      </section>
    </>
  )
}
