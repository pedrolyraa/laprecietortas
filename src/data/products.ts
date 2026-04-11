import type { Product, ProductCategory } from '@/types'

export const categoryLabels: Record<string, string> = {
  'todas': 'Todos',
  'tortas-doces': 'Tortas Doces',
  'tortas-salgadas': 'Tortas Salgadas',
  'bolos-caseiros': 'Bolos Caseiros',
  'bolos-confeitados': 'Bolos Confeitados',
  'sobremesas-individuais': 'Sobremesas Individuais',
  'linha-zero': 'Linha Zero',
}

const customDescriptions: Record<string, string> = {
  'torta_de_limao_siciliano': 'Creme aveludado de limão siciliano com merengue italiano tostado sobre massa amanteigada.',
  'torta_de_maracuja': 'Mousse leve de maracujá fresco com calda tropical, perfeita para o cardápio do verão.',
  'mousse_de_chocolate_belga_com_nozes': 'Mousse delicada e cremosa feita com legítimo chocolate belga e nozes crocantes.',
  'torta_bombom_de_uva_com_ganache': 'Surpresa de uvas frescas envoltas em brigadeiro branco cremoso e ganache de chocolate meio amargo.',
  'torta_cheescake_frutas_vermelhas': 'Cheesecake assada clássica finalizada com generosa calda artesanal de frutas vermelhas.',
  'torta_de_ninho_trufado': 'Massa amanteigada recheada com creme de leite Ninho original e trufa de chocolate.',
  'torta_de_nozes': 'Torta elegante e saborosa com recheio rico de nozes e doce de leite.',
  'torta_merengue_de_morango': 'Morangos frescos, suspirinhos e creme finalizador, formando o clássico merengue.',
  'torta_negresco': 'Base e recheio cremoso inspirados no clássico biscoito, com pedaços crocantes.',
  'torta_nuvem_de_banana': 'Torta suave de banana com doce de leite e cobertura super leve.',
  'torta_de_frango': 'Recheio cremoso de frango desfiado com requeijão artesanal em massa amanteigada folhada. Disponível também em sabores como Palmito Alho Poró e Requeijão. Pode ser fornecida nos tamanhos 2 kg, 1,7 kg e 1 kg Individual.',
  'bolo_de_laranja_com_calda': 'Bolo caseiro fofinho de laranja natural, regado com uma calda cítrica aromática.',
  'bolo_de_limao_com_mousse': 'Bolo macio de limão com cobertura generosa de mousse aerada e refrescante.',
  'bolo_zero_glutem_lactose': 'Desenvolvido especialmente para restrições alimentares, mantendo sabor e textura premium.',
  'bolo_caseiro_cenoura': 'Clássico bolo de cenoura caseiro com cobertura de chocolate, fofinho e na medida certa — ideal para vitrines e cafeterias.',
  'bolo_caseiro_milho': 'Bolo de milho cremoso e úmido, com sabor rústico e aconchegante, perfeito para acompanhar um café.',
  // Sobremesas Individuais — produtos nomeados
  'pudim': 'Pudim de Leite Moça artesanal com textura sedosa e calda de caramelo. Disponível em diferentes formatos: Individual, de Vidro e de Corte.',
  'brigadeiro_gourmet': 'Brigadeiro gourmet irresistível, feito com chocolate premium e finalização artesanal — sobremesa individual de alto padrão.',
  'bolo_gelado': 'Bolo gelado cremoso e refrescante, com camadas de sabor equilibradas, perfeito para vitrines e cardápios sazonais.',
}

function parseFilenameRule(filename: string) {
  let base = filename.replace(/\.[^/.]+$/, '') // remove extension

  // Suffixos comuns que indicam ordem da imagem
  const suffixes = ['_1', '_2', '_3', '_4', '_5', '_um', '_dois', '_tres', '_treis', '_quatro', '_cinco', '_seis']
  for (const suf of suffixes) {
    if (base.endsWith(suf)) {
      base = base.substring(0, base.length - suf.length)
      break
    }
  }

  // Pre, replace '_' with spaces and title case
  const title = base
    .split('_')
    .map(word => {
      // Small words that shouldn't be capitalized in pt-BR normally
      if (['de', 'com', 'da', 'do', 'e'].includes(word.toLowerCase())) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
    // Fix first letter just in case it was a connector
    .replace(/^./, str => str.toUpperCase())

  return { base, title }
}

const paths = Object.keys(import.meta.glob('/public/images/products/**/*.{jpg,jpeg,png,webp}'))

const productMap = new Map<string, Product>()

paths.forEach((path) => {
  // Extract correct runtime URL
  const url = path.replace('/public', '')

  const segments = path.split('/')
  const filename = segments.pop()!
  const categorySlug = segments.pop()! as ProductCategory

  // Ignore folders that don't match categories
  if (!categoryLabels[categorySlug]) return

  const { base, title } = parseFilenameRule(filename)

  let productKey = base
  let productName = title
  let description = customDescriptions[base] || 'Produto artesanal com ingredientes selecionados, feito sob os mais altos padrões de qualidade L\'apreciê.'

  // Exceção (Regra B): Agrupar Bolos Confeitados, Tortas Salgadas e Sobremesas Individuais genéricas
  // Produtos nomeados em sobremesas-individuais (pudim, brigadeiro_gourmet, bolo_gelado)
  // ficam como cards próprios; apenas os arquivos 'sobremesas_individuais_*' são agrupados.
  if (categorySlug === 'tortas-salgadas') {
    productKey = 'tortas-salgadas-variadas'
    productName = 'Tortas Salgadas'
    description = 'Tortas salgadas artesanais com recheios cremosos em massa amanteigada folhada. Disponível em sabores como Frango com Requeijão, Palmito Alho Poró e Requeijão. Fornecidas nos tamanhos 2 kg, 1,7 kg e 1 kg Individual.'
  } else if (categorySlug === 'bolos-confeitados') {
    productKey = 'bolos-confeitados-variados'
    productName = 'Bolos Confeitados Variados'
    description = 'Opções premium de bolos confeitados elaborados com ingredientes nobres e decoração impecável.'
  } else if (categorySlug === 'sobremesas-individuais' && base.startsWith('sobremesas_individuais')) {
    productKey = 'sobremesas-individuais-variadas'
    productName = 'Sobremesas Individuais Variadas'
    description = 'Seleção de sobremesas exclusivas para servir em porções individuais.'
  } else if (categorySlug === 'sobremesas-individuais' && base === 'pudim') {
    productKey = 'pudim-de-leite-moca'
    productName = 'Pudim De Leite Moça'
  } else if (categorySlug === 'sobremesas-individuais' && base === 'brigadeiro_gourmet') {
    productKey = 'brigadeiro-gourmet'
    productName = 'Brigadeiro Gourmet'
  } else if (categorySlug === 'sobremesas-individuais' && base === 'bolo_gelado') {
    productKey = 'bolo-gelado'
    productName = 'Bolo Gelado'
  }

  const idStr = `${categorySlug}-${productKey}`

  if (!productMap.has(idStr)) {
    productMap.set(idStr, {
      id: idStr,
      name: productName,
      description,
      category: categorySlug,
      images: [],
      alt: `${productName} para revenda`,
      featured: true, // Mark all as featured so they show up everywhere, or could customize
    })
  }

  const product = productMap.get(idStr)!
  product.images.push(url)
})

// Convert Map to Array and sort images (simple sort works for our prefixes mostly, but _um, _dois won't be alphabetical)
export const products: Product[] = Array.from(productMap.values()).map(p => {
  p.images.sort()
  return p
})

export const featuredProducts = products.filter(p => p.featured)

export const testimonials = [
  {
    id: '1',
    text: 'A parceria transformou nosso cardápio. Os clientes pedem pelo nome da torta — é um produto que vende sozinho.',
    author: 'Mariana Costa',
    business: 'Empório Gourmet Mariana',
    location: 'São Paulo, SP',
  },
  {
    id: '2',
    text: 'Recebi 3 produtos, coloquei na vitrine e no mesmo dia vendi tudo. Qualidade impecável e padronização ideal para revenda.',
    author: 'Rafael Mendes',
    business: 'Café Central',
    location: 'Campinas, SP',
  },
  {
    id: '3',
    text: 'Hoje 30% da nossa receita vem dos produtos L\'apreciê. Aumentou nosso ticket médio e fidelizou clientes.',
    author: 'Claudia Alves',
    business: 'Bistrô da Claudia',
    location: 'Santos, SP',
  },
]
