# 🚀 Workflow de Otimização de Performance — L'Apreciê Tortas e Bolos
> Stack: React 18 + Vite + Tailwind CSS + Framer Motion  
> Objetivo: Resolver débitos técnicos de Web Vitals, Mobile UX e Cross-browser  
> Executar **em ordem**. Cada passo depende do anterior.

---

## ⚙️ PRÉ-REQUISITOS

Antes de iniciar qualquer mudança:

1. Rode o Lighthouse no Chrome DevTools (modo Mobile, throttling "Slow 4G") e **anote os scores atuais** de Performance, LCP, CLS e TBT.
2. Abra o site no Safari (iOS real ou simulador) e observe se há tela preta no Hero e ghost hovers.
3. Confirme que o projeto está rodando com `vite build` sem erros antes de começar.

---

## FASE 1 — CORE WEB VITALS: IMAGENS
> Impacto: LCP, CLS, Bounce Rate  
> Prioridade: 🔴 Crítica

---

### PASSO 1 — Substituir o Hero de `background-image` CSS por `<img>` nativa

**Arquivo alvo:** Componente Hero (provavelmente `src/components/Hero.tsx` ou similar)

**Problema:** A imagem principal está em `style={{ backgroundImage: "url(...)" }}` dentro de uma `<div>` ou `<section>`. O browser não descobre esse recurso até o CSSOM estar pronto, atrasando o LCP em 2–3s em redes móveis.

**O que fazer:**

Localize a `<section>` ou `<div>` que usa `background-image` para o banner principal.

Substitua o padrão:
```tsx
// ❌ ANTES — imagem oculta no CSS, browser não faz preload
<section style={{ backgroundImage: `url(${heroBg})` }} className="...">
  {/* conteúdo */}
</section>
```

Por este padrão:
```tsx
// ✅ DEPOIS — img estrutural com fetchpriority high
<section className="relative overflow-hidden ...">
  <img
    src="/images/hero-bg.webp"
    alt="Tortas e bolos artesanais L'Apreciê"
    fetchPriority="high"
    loading="eager"
    decoding="async"
    className="absolute inset-0 w-full h-full object-cover"
    width={1920}
    height={1080}
  />
  {/* conteúdo sobreposto com z-index */}
  <div className="relative z-10">
    {/* título, subtítulo, CTA */}
  </div>
</section>
```

**Checklist do Passo 1:**
- [ ] `<img>` com `fetchPriority="high"` inserida
- [ ] `loading="eager"` explícito
- [ ] `width` e `height` declarados na tag
- [ ] Overlay/gradiente recriado via Tailwind (`before:` ou `<div>` com `absolute inset-0 bg-black/40`)
- [ ] Conteúdo filho tem `relative z-10`
- [ ] Nenhum `background-image` inline restante no Hero

---

### PASSO 2 — Adicionar dimensões em todas as `<img>` dos Cards

**Arquivo alvo:** `src/components/ui/ProductCard.tsx` (e qualquer outro card com imagem)

**Problema:** Tags `<img>` sem `width` e `height` causam CLS — o browser não reserva espaço antes do download, fazendo o layout "pular".

**O que fazer:**

```tsx
// ❌ ANTES — sem dimensões, causa CLS
<img src={product.image} alt={product.name} className="w-full object-cover" />

// ✅ DEPOIS — dimensões declaradas + aspect ratio via Tailwind
<img
  src={product.image}
  alt={product.name}
  width={600}
  height={450}
  className="w-full aspect-[4/3] object-cover"
/>
```

> **Regra:** Use a proporção real das suas imagens. Se forem 16:9, use `aspect-[16/9]` e `height={337}` para `width={600}`.

**Checklist do Passo 2:**
- [ ] Todo `<img>` dentro de cards tem `width` e `height` numéricos
- [ ] Classe `aspect-[...]` aplicada para garantir reserva de espaço
- [ ] Nenhuma imagem de card sem dimensões restante

---

### PASSO 3 — Lazy Loading inteligente nos cards

**Arquivo alvo:** `src/components/ui/ProductCard.tsx` e componente de grid/lista de produtos

**Problema:** O primeiro card tem `loading="lazy"`, o que atrasa a imagem mais visível. Cards fora da viewport deveriam ter lazy, os visíveis não.

**O que fazer:**

No componente que renderiza a lista de cards, passe o índice e controle o `loading`:

```tsx
// No componente pai (ex: ProductGrid.tsx)
{products.map((product, index) => (
  <ProductCard
    key={product.id}
    product={product}
    priority={index < 4} // Os 4 primeiros são "above the fold"
  />
))}
```

```tsx
// No ProductCard.tsx
interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <img
      src={product.image}
      alt={product.name}
      width={600}
      height={450}
      loading={priority ? "eager" : "lazy"}
      className="w-full aspect-[4/3] object-cover"
    />
  );
}
```

**Checklist do Passo 3:**
- [ ] Os 2–4 primeiros cards recebem `loading="eager"`
- [ ] Demais cards mantêm `loading="lazy"`
- [ ] A lógica de índice está no componente pai, não hardcoded

---

## FASE 2 — JAVASCRIPT E ANIMAÇÕES
> Impacto: TTI, Main Thread, Mobile CPU  
> Prioridade: 🟠 Alta

---

### PASSO 4 — Adicionar `will-change` nas animações Framer Motion

**Arquivo alvo:** `ProductCard.tsx`, componente do carrossel, qualquer `motion.div` com transições de entrada

**Problema:** O Safari/WebKit não promove elementos animados para a GPU automaticamente. Sem `will-change`, cada frame recalcula o layout na CPU (reflow), travando o framerate.

**O que fazer:**

```tsx
// ✅ Adicionar style prop nos motion.div dos cards
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  style={{ willChange: "transform, opacity" }} // ← adicionar isso
  className="..."
>
```

> **Nota:** Remova `willChange` de elementos **estáticos** (sem animação). O uso indiscriminado consome memória de GPU desnecessariamente.

**Checklist do Passo 4:**
- [ ] `style={{ willChange: "transform, opacity" }}` nos cards animados
- [ ] `style={{ willChange: "transform" }}` no wrapper do carrossel
- [ ] Elementos sem animação NÃO recebem `willChange`

---

### PASSO 5 — Migrar para `LazyMotion` do Framer Motion

**Arquivo alvo:** `src/main.tsx` ou `src/App.tsx` + todos os componentes com `motion.*`

**Problema:** O bundle completo do Framer Motion pesa ~35KB (gzip). Com `LazyMotion`, apenas as features usadas são carregadas.

**O que fazer:**

```bash
# Verificar versão atual do framer-motion
npm list framer-motion
```

Em `src/main.tsx` ou `src/App.tsx`:
```tsx
// ✅ Envolver a aplicação com LazyMotion
import { LazyMotion, domAnimation } from "framer-motion";

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      {/* resto do app */}
    </LazyMotion>
  );
}
```

Nos componentes, trocar `motion.div` por `m.div`:
```tsx
// ❌ ANTES
import { motion } from "framer-motion";
<motion.div animate={{ opacity: 1 }}>

// ✅ DEPOIS
import { m } from "framer-motion";
<m.div animate={{ opacity: 1 }}>
```

> **Atenção:** `AnimatePresence` continua importado de `"framer-motion"` normalmente.

**Checklist do Passo 5:**
- [ ] `LazyMotion` envolvendo o App com `features={domAnimation}`
- [ ] Todos os `motion.div/motion.img/etc` substituídos por `m.div/m.img/etc`
- [ ] `AnimatePresence` mantido sem alteração
- [ ] Build sem erros após a migração

---

### PASSO 6 — Lazy Loading sob demanda no Carrossel

**Arquivo alvo:** Componente do carrossel de produtos

**Problema:** Todas as imagens do carrossel são baixadas no primeiro acesso, mesmo as que nunca serão vistas. O `AnimatePresence` desmonta e remonta nós, ativando o Garbage Collector com frequência.

**O que fazer:**

```tsx
// ✅ Renderizar apenas a imagem do slide ativo (e adjacentes)
function ProductCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  // Pré-carrega apenas o slide anterior e o próximo
  const visibleIndexes = [
    (current - 1 + images.length) % images.length,
    current,
    (current + 1) % images.length,
  ];

  return (
    <div>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          width={600}
          height={450}
          loading={visibleIndexes.includes(i) ? "eager" : "lazy"}
          className={i === current ? "block" : "hidden"}
          style={{ willChange: "transform" }}
        />
      ))}
    </div>
  );
}
```

> **Alternativa com AnimatePresence:** Se mantiver `AnimatePresence`, mova apenas o texto para fora do wrapper animado — anime só a imagem para evitar recalcular o layout do texto a cada slide.

**Checklist do Passo 6:**
- [ ] Apenas slide ativo (+ adjacentes) renderizado/carregado
- [ ] Texto do card NÃO está dentro do `AnimatePresence` wrapper
- [ ] Sem downloads desnecessários de imagens fora da viewport

---

### PASSO 7 — Extrair strings do WhatsApp do ciclo de render

**Arquivo alvo:** `ProductCard.tsx` e qualquer componente com link `wa.me`

**Problema:** A URL do WhatsApp é recriada a cada render (incluindo a cada slide do carrossel), gerando micro-alocações desnecessárias de string.

**O que fazer:**

```tsx
// ❌ ANTES — recria a string em todo render
<a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá, tenho interesse em ${product.name}`}>

// ✅ DEPOIS — memoizar com useMemo ou extrair para constante
const whatsappUrl = useMemo(
  () =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `Olá, tenho interesse em ${product.name}`
    )}`,
  [product.name] // Só recalcula se o nome mudar
);

// Se product.name for estático (vem de um array fixo), use uma constante fora do componente:
// const WHATSAPP_URL = `https://wa.me/...`;
```

**Checklist do Passo 7:**
- [ ] Strings do WhatsApp fora do corpo do render ou dentro de `useMemo`
- [ ] `encodeURIComponent` aplicado na mensagem

---

## FASE 3 — MOBILE UX E CROSS-BROWSER
> Impacto: Safari iOS, Android Mid-range, Touch UX  
> Prioridade: 🟡 Média-Alta

---

### PASSO 8 — Corrigir Ghost Hover no iOS Safari

**Arquivos alvo:** Todos os componentes com classes Tailwind de hover (`hover:bg-*`, `hover:scale-*`, `hover:opacity-*`, etc.)

**Problema:** No iOS Safari, o `:hover` é ativado ao toque e permanece ativo até o usuário tocar em outro lugar ("ghost hover"), deixando botões e cards com aparência incorreta.

**O que fazer:**

Instale o plugin ou adicione a variante manualmente no Tailwind:

```bash
npm install tailwindcss-hover-media-query
# OU use a variante nativa do Tailwind v3.3+:
# @media (hover: hover) { ... }
```

**Opção A — Com Tailwind v3.3+** (recomendado):

No `tailwind.config.js`, adicione um plugin simples:
```js
// tailwind.config.js
module.exports = {
  plugins: [
    function ({ addVariant }) {
      addVariant("hocus", "@media (hover: hover) { &:hover }");
    },
  ],
};
```

Nos componentes, substitua `hover:` por `hocus:`:
```tsx
// ❌ ANTES — ativa no touch também
<button className="hover:bg-primary-light hover:scale-105">

// ✅ DEPOIS — só ativa em dispositivos com mouse real
<button className="hocus:bg-primary-light hocus:scale-105">
```

**Opção B — Sem plugin**, envolva com `@media (hover: hover)` no CSS global:
```css
@media (hover: hover) {
  .card:hover { transform: scale(1.05); }
}
```

**Checklist do Passo 8:**
- [ ] Variante `hocus` configurada no Tailwind OU CSS media query aplicado
- [ ] Todos os `hover:` em elementos interativos substituídos por `hocus:`
- [ ] Testado no Safari iOS — sem ghost hover ao tocar nos cards

---

## FASE 4 — VALIDAÇÃO FINAL
> Executar após todas as fases anteriores

---

### PASSO 9 — Auditoria com Lighthouse

1. Rode `vite build && vite preview`
2. Abra o Chrome DevTools > Lighthouse
3. Configure: **Mobile**, **Slow 4G**, **Clear storage**
4. Execute e compare com os scores anotados no pré-requisito

**Metas mínimas após as otimizações:**

| Métrica | Antes (estimado) | Meta |
|---|---|---|
| Performance Score | < 60 | ≥ 80 |
| LCP | > 4s | < 2.5s |
| CLS | > 0.1 | < 0.1 |
| TBT | > 300ms | < 200ms |

---

### PASSO 10 — Checklist de Validação Cross-browser

Teste manualmente nos seguintes ambientes:

| Ambiente | O que verificar |
|---|---|
| Chrome Desktop | Animações suaves, sem console errors, LCP OK |
| Safari iOS (real ou simulador) | Hero sem tela preta, sem ghost hover, carrossel sem jank |
| Android mid-range (Chrome) | Scroll suave, animações de entrada sem travamento |
| Firefox Desktop | Layout do Hero correto, carrossel funcional |

**Ghost hover test no iOS:**
1. Toque em um card
2. Tire o dedo imediatamente
3. O card deve voltar ao estado normal — sem highlight residual

**LCP test no Safari:**
1. Throttle a rede para "Slow 3G" no DevTools
2. Recarregue a página
3. A imagem do Hero deve aparecer progressivamente — sem bloco preto prolongado

---

## 📋 SUMÁRIO DOS PASSOS

| # | Passo | Fase | Prioridade | Arquivo Principal |
|---|---|---|---|---|
| 1 | Hero: `background-image` → `<img>` | Imagens | 🔴 Crítica | `Hero.tsx` |
| 2 | Dimensões em todas as `<img>` de cards | Imagens | 🔴 Crítica | `ProductCard.tsx` |
| 3 | Lazy loading inteligente por índice | Imagens | 🔴 Crítica | `ProductGrid.tsx` |
| 4 | `will-change` nas animações | JS/Animações | 🟠 Alta | `ProductCard.tsx` |
| 5 | Migrar para `LazyMotion` | JS/Animações | 🟠 Alta | `App.tsx` + todos |
| 6 | Carrossel sob demanda | JS/Animações | 🟠 Alta | Carousel component |
| 7 | `useMemo` nas strings do WhatsApp | JS/Animações | 🟡 Média | `ProductCard.tsx` |
| 8 | Ghost hover com `hocus:` ou media query | Mobile UX | 🟡 Média | Global / todos |
| 9 | Auditoria Lighthouse | Validação | — | — |
| 10 | Checklist cross-browser manual | Validação | — | — |

---

> **Dica para a IA:** Execute os passos **em sequência**. Não pule para a Fase 2 sem concluir todos os checkboxes da Fase 1. A cada passo, rode `vite build` para garantir que nenhum erro foi introduzido.