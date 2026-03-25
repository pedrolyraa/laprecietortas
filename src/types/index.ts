export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  images: string[]
  alt: string
  featured?: boolean
}

export type ProductCategory =
  | 'tortas-doces'
  | 'tortas-salgadas'
  | 'bolos-caseiros'
  | 'bolos-confeitados'
  | 'sobremesas-individuais'
  | 'linha-zero'

export interface LeadFormData {
  nome: string
  empresa: string
  cidade: string
  telefone: string
  tipoNegocio: string
  mensagem: string
}

export interface Testimonial {
  id: string
  text: string
  author: string
  business: string
  location: string
}
