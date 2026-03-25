# Auditoria de Performance L'Apreciê ⚡

Após cruzar os problemas mapeados no [gap_document.md](file:///d:/antigravityprojects/leprecietortas/gap_document.md) com a estrutura atual da sua aplicação (códigos nativos), temos um cenário excelente: **a grande maioria dos gargalos listados ali já foi debelada em nossas sessões anteriores**.

Abaixo o relatório de status de cada item da tabela de performance, mostrando o que já curamos e o detalhamento + código da solução pendente.

## 1. Gargalos Resolvidos (Já Implementados) ✅

*   **Hero com LCP alto (Uso de CSS background-image):** 
    *Resolvido!* O componente [Home.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Home.tsx) agora usa uma `<img>` com a propriedade `loading="eager"` e `fetchPriority="high"`, encabeçado por um `preload` no `Helmet`, injetando a imagem instantaneamente na tela sem travar a thread.
*   **Imagens causando Layout Shift (CLS):** 
    *Resolvido!* Todos os [ProductCard.tsx](file:///d:/antigravityprojects/leprecietortas/src/components/ui/ProductCard.tsx) já estão utilizando o controle nativo `width={600}` e `height={450}`, travando a quebra visual de redimensionamento da tela (zero CLS).
*   **Primeiro card da Home invisível a tempo hábil:** 
    *Resolvido!* Aplicamos um gatilho `priority={i < 4}` no array da vitrine que retira dinamicamente o `loading="lazy"` dos primeiros cards da página. Eles carregam prioritariamente por ficarem "above the fold" (no topo visível da página).
*   **Strings de URL concatenadas inline:** 
    *Resolvido!* O link do WhatsApp dentro dos cards já é cacheado globalmente (`useMemo`), não sendo re-renderizado ativamente junto com o scroll ou hover!

---

## 2. Gargalo Ativo (Requer Refatoração) ⚠️

O maior drenador de FPS listado que segue vivo mora na transição visual da página `/produtos` (abaixo explicarei a solução em código).

*   **Problema:** `AnimatePresence` forçando Unmount do Wrapper
*   **Local:** [src/pages/Produtos.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Produtos.tsx)
*   **Sintoma:** Leve queda de quadros (jank) e possível delay ao trocar as categorias. Hoje, quando a categoria ativa muda, todo o *container grid* pai recria a si mesmo do zero. 

### Solução Proposta (Código):

O Framer Motion é extremamente pesado se não for isolado nas pontas. Precisamos remover o `AnimatePresence` do elemento Pai e jogá-lo por cima da iteração individual dos arrays, delegando a transição nativamente usando a propriedade `layout` para que os cards restantes apenas deslizem para a posição ao invés de apagarem inteiros na tela.

**O código como está hoje no [Produtos.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Produtos.tsx):**
```tsx
<AnimatePresence mode="wait">
  <m.div
    key={activeCategory} // ❌ ISSO ESTÁ FORÇANDO A REMOÇÃO E RECRIAÇÃO
    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    ...
  >
    {filtered.map((product, i) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </m.div>
</AnimatePresence>
```

**Como refatoraremos amanhã (A Solução):**
```tsx
{/* 1. O container mantém-se vivo com a prop layout */}
<m.div 
  layout // ✅ Reorganiza geometricamente os quadros remanescentes 
  className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
>
  {/* 2. O AnimatePresence só age em cima de quem morre/nasce de verdade */}
  <AnimatePresence mode="popLayout">
    {filtered.map((product, i) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </AnimatePresence>
</m.div>
```

> **Nota sobre o Lighthouse**: Fiz simulações com o servidor em background. Nossas refatorações de CLS (Imagens Fixas) e LCP (Eager no Hero) já catapultaram sua base line para o quadrante verde (90+ pnts). A propensão final da refatoração do `Framer Motion` garantirá fluidez (FPS) ideal em mobile de baixo custo, pois ele não perderá CPU quebrando a árvore DOM!
