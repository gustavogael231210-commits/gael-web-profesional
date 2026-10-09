export type CategoryId =
  | 'sofas'
  | 'salas'
  | 'comedores'
  | 'mesas-sillas'
  | 'recamaras'
  | 'escritorios'
  | 'tv'
  | 'libreros'
  | 'decorativos'

export interface Category {
  id: CategoryId
  label: string
}

export interface ProductColor {
  name: string
  /** Color aproximado para la muestra visual. */
  hex: string
}

export interface ProductImage {
  src: string
  alt: string
}

export type ProductBadge = 'Nuevo' | 'Promoción' | 'Edición limitada'

export interface Product {
  id: string
  /** Identificador para la URL (?producto=slug). */
  slug: string
  name: string
  /** Artículo para los mensajes: "el Sofá Oslo", "la Mesa de centro Roble". */
  article: 'el' | 'la'
  category: CategoryId
  /** Precio en pesos mexicanos (MXN), sin decimales. */
  price: number
  /** Precio anterior, solo si el producto está en promoción. */
  compareAtPrice?: number
  shortDescription: string
  description: string
  materials: string[]
  /** Medidas en centímetros. */
  dimensions: { width: number; depth: number; height: number }
  colors: ProductColor[]
  badge?: ProductBadge
  image: ProductImage
  /** Destacar en "Piezas que hacen especial cada espacio". */
  featured?: boolean
  /** Pieza recomendada para espacios pequeños. */
  compact?: boolean
}

/** Filtro del catálogo: una categoría, todas, o la selección para espacios pequeños. */
export type CategoryFilter = CategoryId | 'todas' | 'compactos'

export type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc'
