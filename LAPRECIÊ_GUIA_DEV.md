# 🛠️ Guia Técnico – Site L'Apreciê Tortas e Bolos
> Documento destinado à equipe de desenvolvimento (Antigravity)

---

## 🧱 Stack Recomendada

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Framework** | React 18 + Vite | Build ultrarrápido, DX moderno, ecossistema sólido |
| **Linguagem** | TypeScript | Tipagem estática, menos bugs, melhor manutenção |
| **Estilização** | Tailwind CSS v3 | Utility-first, responsividade nativa, design token-friendly |
| **Componentes** | shadcn/ui | Componentes acessíveis, customizáveis, sem opinião visual |
| **Animações** | Framer Motion | Animações fluidas de alto impacto para marca premium |
| **Formulários** | React Hook Form + Zod | Validação performática e tipada |
| **Roteamento** | React Router v6 | SPA com URLs amigáveis para SEO |
| **SEO** | React Helmet Async | Meta tags dinâmicas por página |
| **Mapas** | Google Maps Embed API | Integração leve via iframe otimizado |
| **Ícones** | Lucide React | Ícones modernos e consistentes |
| **Fontes** | Google Fonts (Playfair Display + DM Sans) | Premium + legível |
| **Deploy** | Vercel ou Netlify | CI/CD automático, CDN global, SSL grátis |
| **Analytics** | Google Analytics 4 + Tag Manager | Rastreio de leads e eventos |

---

## 📁 Estrutura de Pastas

```
lapreciê/
├── public/
│   ├── images/           # Fotos dos produtos (otimizadas)
│   ├── fonts/
│   └── favicon.ico
├── src/
│   ├── assets/           # SVGs, logos
│   ├── components/
│   │   ├── ui/           # shadcn/ui base
│   │   ├── layout/       # Header, Footer, WhatsAppButton
│   │   └── sections/     # Seções reutilizáveis (Hero, Products, etc.)
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Sobre.tsx
│   │   ├── Produtos.tsx
│   │   └── Parceiro.tsx
│   ├── hooks/            # Custom hooks (useForm, useScrollAnimation)
│   ├── lib/              # Helpers, constantes, config
│   ├── types/            # Interfaces TypeScript
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## 📄 Páginas & Seções

### 1. `/` — Home
- **Hero Section** — Banner fullscreen com headline forte, subheadline B2B e 3 CTAs (WhatsApp, Quero Revender, Ver Catálogo)
- **O que fazemos** — Bloco de apresentação rápida (3–4 linhas + ícones de benefício)
- **Produtos em destaque** — Grid com as 4 categorias (doces, salgadas, bolos, sobremesas), link para `/produtos`
- **Por que L'Apreciê?** — Seção de diferenciais (padronização, qualidade, ticket médio, etc.)
- **Depoimentos / Parceiros** — Logos ou frases de clientes B2B (cafeterias, empórios)
- **CTA Final** — Bloco de conversão com botão WhatsApp e link para `/parceiro`

---

### 2. `/sobre` — Sobre a Empresa
- História da marca (timeline ou texto narrativo)
- Posicionamento premium
- Processo produtivo (fotos do processo + texto)
- Público atendido (ícones: cafeterias, empórios, restaurantes)

---

### 3. `/produtos` — Produtos
- Filtros por categoria: Tortas Doces | Tortas Salgadas | Bolos Caseiros | Sobremesas Individuais
- Grid de cards com foto + nome + breve descrição
- Sem preços (foco em revenda B2B)
- CTA em cada card: "Quero esse produto → WhatsApp"
- CTA global no topo: "Solicite nosso catálogo completo"

---

### 4. `/parceiro` — Seja um Parceiro ⚠️ PRIORIDADE MÁXIMA
- Headline de impacto voltada ao tomador de decisão
- Explicação do modelo de fornecimento
- Benefícios em destaque:
  - Aumento de ticket médio
  - Redução de custo operacional
  - Produto padronizado e pronto para servir
- Passo a passo: Como funciona (3–4 etapas visuais)
- Formulário de captação de lead (Nome, Empresa, Cidade, Telefone, Tipo de negócio, Mensagem)
- Botão WhatsApp em destaque
- FAQ simples (prazo, entrega, pedido mínimo)

---

## ⚙️ Funcionalidades Técnicas

### WhatsApp Fixo
```tsx
// Componente flutuante em todas as páginas
<a
  href="https://wa.me/55XXXXXXXXXX?text=Olá, tenho interesse em revender os produtos da L'Apreciê"
  target="_blank"
  className="fixed bottom-6 right-6 z-50 bg-green-500 rounded-full p-4 shadow-lg"
>
  <WhatsappIcon />
</a>
```

### Formulário de Lead
- Campos: Nome, Empresa, Cidade, Telefone, Tipo de negócio, Mensagem
- Envio via **EmailJS** (gratuito, sem backend) ou **Formspree**
- Confirmação visual após envio
- Validação em tempo real com Zod

### Google Maps
- Embed via iframe responsivo na página `/sobre` ou rodapé
- Marcar endereço da fábrica/ateliê

### Instagram Feed
- Embed via **Behold.so** (widget leve, sem API complexa) ou iframe do próprio IG
- Exibir os 6–9 posts mais recentes

---

## 🔍 SEO – Implementação Técnica

### Meta Tags (por página)
```tsx
// Home
<title>L'Apreciê | Fornecedor de Tortas e Bolos para Cafeterias e Empórios</title>
<meta name="description" content="Fornecimento B2B de tortas doces, salgadas e bolos artesanais premium para cafeterias, empórios e restaurantes. Produto padronizado, pronto para revender." />

// Produtos
<title>Produtos | Tortas para Revenda – L'Apreciê</title>

// Parceiro
<title>Seja um Parceiro | Revenda L'Apreciê – Tortas Premium para seu Negócio</title>
```

### Palavras-chave Prioritárias
- fornecedor de tortas
- tortas para revenda
- tortas para cafeteria
- tortas doces e salgadas
- fornecedor para empórios
- tortas premium

### Boas Práticas Técnicas
- H1 único por página, H2/H3 com palavras-chave naturais
- URLs: `/`, `/sobre`, `/produtos`, `/parceiro`
- Imagens com `alt` descritivo e nome de arquivo amigável (ex: `torta-de-limao-premium.webp`)
- Todas as imagens em formato **WebP** com lazy loading
- Sitemap XML gerado automaticamente (plugin Vite)
- `robots.txt` configurado
- Schema markup (LocalBusiness + Product) via JSON-LD
- Core Web Vitals: LCP < 2.5s, CLS < 0.1

---

## 🎨 Design System

### Paleta de Cores
> Extraída diretamente da logo oficial da L'Apreciê

```css
:root {
  --color-primary:    #2B3A6B; /* Azul marinho escuro – cor principal da marca */
  --color-secondary:  #3D4F8A; /* Azul médio – círculo da logo */
  --color-accent:     #4A5C99; /* Azul claro – detalhe e hover */
  --color-bg:         #F4F6FB; /* Azul gelo claríssimo – fundo das páginas */
  --color-text:       #FFFFFF; /* Branco – tipografia principal sobre escuro */
  --color-text-dark:  #1C2340; /* Azul muito escuro – texto sobre fundo claro */
  --color-muted:      #8A96C0; /* Azul acinzentado – texto secundário */
}
```

### Tipografia
```css
/* Display / Headings */
font-family: 'Playfair Display', serif;

/* Body / UI */
font-family: 'DM Sans', sans-serif;
```

### Referência Visual
- Sofisticado, clean, produto em foco
- Referências: Starbucks website, padarias premium europeias
- Fotos grandes, espaço negativo generoso
- Sem poluição visual – menos é mais

---

## 📱 Responsividade

- **Mobile-first** em todos os componentes
- Breakpoints Tailwind padrão: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Menu mobile: Drawer lateral (shadcn Sheet)
- Grid de produtos: 1 coluna mobile → 2 tablet → 3/4 desktop
- Hero: Texto empilhado no mobile, lado a lado no desktop

---

## 🚀 Deploy & Infraestrutura

| Item | Solução |
|---|---|
| Hospedagem | Vercel (free tier ou Pro) |
| Domínio | A configurar com cliente |
| SSL | Automático (Vercel) |
| CDN | Global (Vercel Edge Network) |
| CI/CD | Push no `main` = deploy automático |
| Analytics | Google Analytics 4 via GTM |
| Formulário | EmailJS ou Formspree |

---

## ✅ Checklist de Entrega

- [ ] Design aprovado no Figma (ou direto em código com revisão do cliente)
- [ ] Todas as imagens recebidas e otimizadas para WebP
- [ ] Textos institucionais recebidos e revisados
- [ ] Número de WhatsApp configurado
- [ ] Domínio apontado para Vercel
- [ ] GA4 configurado e testado
- [ ] Formulário de lead testado e e-mail de destino confirmado
- [ ] Google Maps com endereço correto
- [ ] Teste mobile em iOS e Android
- [ ] Lighthouse score: Performance > 90, SEO > 95
- [ ] Sitemap submetido no Google Search Console

---

*Documento gerado para: Antigravity Agency*
*Projeto: L'Apreciê Tortas e Bolos*
