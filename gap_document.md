# 📋 O que Falta para o Site Ficar Completo

> Análise comparativa: implementação atual × `LAPRECIÊ_GUIA_DEV.md`

---

## ✅ Já Implementado

| Item | Status |
|---|---|
| React 18 + Vite + TypeScript | ✅ |
| Tailwind CSS + design tokens (cores e tipografia) | ✅ |
| Todos as 4 páginas (`/`, `/sobre`, `/produtos`, `/parceiro`) | ✅ |
| Header sticky com mobile drawer | ✅ |
| Footer com contato e social | ✅ |
| WhatsApp button fixo + pulse | ✅ |
| Formulário React Hook Form + Zod + WhatsApp fallback | ✅ |
| FAQ accordion animado | ✅ |
| Filtros por categoria com AnimatePresence | ✅ |
| Framer Motion em todas as seções | ✅ |
| React Helmet Async (meta tags por página) | ✅ |
| JSON-LD `LocalBusiness` schema na Home | ✅ |
| [robots.txt](file:///d:/antigravityprojects/leprecietortas/public/robots.txt) e [sitemap.xml](file:///d:/antigravityprojects/leprecietortas/public/sitemap.xml) | ✅ |
| Lazy loading em imagens | ✅ |

---

## 🔴 Crítico — Falta para Lançar

### 1. Número de WhatsApp Real
**Arquivo:** [src/lib/utils.ts](file:///d:/antigravityprojects/leprecietortas/src/lib/utils.ts) linha `WHATSAPP_NUMBER`
```ts
// Atual (placeholder)
export const WHATSAPP_NUMBER = '5511999999999'

// Substituir por:
export const WHATSAPP_NUMBER = '55XXXXXXXXXXX' // número real da L'Apreciê
```
> Também atualizar em [src/pages/Parceiro.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Parceiro.tsx) (linha com `wa.me/5511999999999`)

---

### 2. EmailJS para receber leads por e-mail
**Arquivo:** [src/pages/Parceiro.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Parceiro.tsx)
- Atualmente o formulário abre WhatsApp como fallback
- Instalar e configurar EmailJS:
```bash
npm install @emailjs/browser
```
```ts
// Preencher em Parceiro.tsx:
const SERVICE_ID = 'service_xxxxxxx'
const TEMPLATE_ID = 'template_xxxxxxx'
const PUBLIC_KEY = 'xxxxxxxxxxxxxxxxx'
```
- Template do e-mail deve incluir: nome, empresa, cidade, telefone, tipo de negócio, mensagem

---

### 3. Imagens Reais dos Produtos
- As imagens atuais são do **Unsplash** (placeholder)
- Precisam ser substituídas pelas fotos reais da L'Apreciê
- Formato exigido: **WebP**, `600×450px` (produto), `1920×1080px` (hero)
- Colocar em `public/images/products/` com nomes amigáveis para SEO:
  - `torta-limao-siciliano-premium.webp`
  - `quiche-lorraine-cafeteria.webp`
  - etc.

---

## 🟡 Importante — Completa o Spec

### 4. Google Maps Embed
- Especificado no guia para `/sobre` ou rodapé
- Embed via `<iframe>` do Google Maps:
```html
<iframe src="https://maps.google.com/maps?q=ENDEREÇO&output=embed" />
```
- **Falta:** endereço físico real da L'Apreciê

---

### 5. Instagram Feed
- Especificado via **Behold.so** (widget leve)
- Mostrar 6–9 posts mais recentes na Home ou `/sobre`
- Requer conta no behold.so + handle do Instagram `@lapreciê`

---

### 6. Schema [Product](file:///d:/antigravityprojects/leprecietortas/src/types/index.ts#1-10) no JSON-LD
- Guia exige: `LocalBusiness` ✅ + [Product](file:///d:/antigravityprojects/leprecietortas/src/types/index.ts#1-10) ❌
- Adicionar schema `@type: Product` para cada produto na página `/produtos`
- Impacta SEO diretamente (rich results no Google)

---

### 7. Hero com `loading="eager"` + `fetchpriority="high"`
- A imagem de background do hero usa `background-image` CSS (invisível para LCP)
- Adicionar uma `<img>` real no hero com `loading="eager"` para maximizar o LCP
- O Lighthouse atual pode penalizar por isso

---

### 8. Sitemap Dinâmico
- Atualmente [public/sitemap.xml](file:///d:/antigravityprojects/leprecietortas/public/sitemap.xml) é estático com data hardcoded
- Instalar `vite-plugin-sitemap` para geração automática:
```bash
npm install vite-plugin-sitemap
```
- Isso garante que `lastmod` seja sempre correto no build

---

## 🟠 Antes do Deploy em Produção

### 9. Variáveis de Ambiente
Criar `.env.production`:
```env
VITE_WHATSAPP_NUMBER=55XXXXXXXXXXX
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
VITE_GA4_ID=G-XXXXXXXXXX
```

### 10. Google Analytics 4
- Adicionar ao [index.html](file:///d:/antigravityprojects/leprecietortas/index.html):
```html
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX"></script>
```
- Configurar eventos: `lead_form_submit`, `whatsapp_click`, `catalog_view`

### 11. Domínio e URLs Canônicas
- Atualizar em todas as páginas `<link rel="canonical">` com domínio real
- Atualizar [sitemap.xml](file:///d:/antigravityprojects/leprecietortas/public/sitemap.xml) com a URL final
- Atualizar schema JSON-LD `"url"` na Home

### 12. Open Graph / Social Cards
- Adicionar ao `<head>` de todas as páginas:
```html
<meta property="og:image" content="https://dominio.com/og-image.jpg" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta name="twitter:card" content="summary_large_image" />
```
- Criar uma imagem OG `1200×630px` com a identidade visual da marca

---

## ⚡ Problemas de Performance Encontrados

| Problema | Localização | Impacto | Solução |
|---|---|---|---|
| Hero usa `background-image` CSS | [Home.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Home.tsx) linha 52 | LCP alto | Substituir por `<img loading="eager" fetchpriority="high">` |
| Imagens de produto sem dimensões `width/height` | todos os cards | Layout shift (CLS) | Adicionar `width={600} height={450}` |
| `loading="lazy"` no primeiro card | [Home.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Home.tsx) produtos destaque | Atraso na LCP | Primeiro card deve ser `loading="eager"` |
| `AnimatePresence` re-cria todos os nodes | [Produtos.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Produtos.tsx) | Jank em filtros | Usar `layout` prop do Framer Motion em vez de unmount |
| WhatsApp URL concatenada inline | [Home.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Home.tsx) produto cards | Recria string a cada render | Mover para constante fora do JSX |

---

## 🧹 Melhorias de Código a Implementar

| Item | Localização | Descrição |
|---|---|---|
| `WHATSAPP_URL` hardcoded em [Parceiro.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Parceiro.tsx) | linhas com `wa.me/5511999999999` | Usar `WHATSAPP_NUMBER` de [utils.ts](file:///d:/antigravityprojects/leprecietortas/src/lib/utils.ts) |
| Textos do schema JSON-LD com endereço placeholder | [Home.tsx](file:///d:/antigravityprojects/leprecietortas/src/pages/Home.tsx) | Atualizar telefone, endereço e URL reais |
| `useScrollAnimation` custom hook | não existe | Extrair o padrão `whileInView + variants` repetido em todas as seções |
| Não há `404.tsx` | `/src/pages/` | Adicionar página de erro 404 no roteador |
| `sitemap.xml` date hardcoded | `public/sitemap.xml` | Automatizar com `vite-plugin-sitemap` |

---

## 🚀 Checklist Final para Go-Live

- [ ] Substituir número WhatsApp (`src/lib/utils.ts`)
- [] Configurar EmailJS (Parceiro.tsx)
- [ ] Receber e otimizar fotos reais em WebP
- [ ] Adicionar endereço real ao JSON-LD da Home
- [X] Configurar domínio no Vercel + SSL
- [ ] Adicionar Google Analytics 4 / GTM
- [ ] Criar imagem Open Graph `1200×630px`
- [ ] Atualizar URLs canônicas e sitemap para domínio final
- [X] Adicionar Google Maps embed em `/sobre`
- [ ] Configurar Google Search Console + submeter sitemap
- [ ] Teste Lighthouse (meta: Performance > 90, SEO > 95)
- [ ] Teste cross-browser (Chrome, Safari, Firefox)
- [ ] Teste mobile iOS + Android (real device)
