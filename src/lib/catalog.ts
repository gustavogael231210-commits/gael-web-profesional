import type { CategoryFilter, Product, SortOption } from '@/types/product'

export interface CatalogFilters {
  query: string
  category: CategoryFilter
  sort: SortOption
}

/** Normaliza texto para búsquedas sin acentos ni mayúsculas ("Sofá" ≈ "sofa"). */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function matchesQuery(product: Product, query: string): boolean {
  const q = normalize(query)
  if (!q) return true
  const haystack = normalize(product.name)
  return q.split(/\s+/).every((term) => haystack.includes(term))
}

export function matchesCategory(product: Product, category: CategoryFilter): boolean {
  if (category === 'todas') return true
  if (category === 'compactos') return Boolean(product.compact)
  return product.category === category
}

export function filterProducts(products: Product[], { query, category, sort }: CatalogFilters): Product[] {
  const result = products.filter(
    (product) => matchesCategory(product, category) && matchesQuery(product, query),
  )
  if (sort === 'precio-asc') return [...result].sort((a, b) => a.price - b.price)
  if (sort === 'precio-desc') return [...result].sort((a, b) => b.price - a.price)
  return result
}
