import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { getProductBySlug } from '@/data/products'
import { scrollToSection } from '@/lib/scroll'
import type { CategoryFilter, Product, SortOption } from '@/types/product'

const PRODUCT_PARAM = 'producto'

interface CatalogContextValue {
  query: string
  setQuery: (query: string) => void
  category: CategoryFilter
  setCategory: (category: CategoryFilter) => void
  sort: SortOption
  setSort: (sort: SortOption) => void
  resetFilters: () => void
  /** Filtra por categoría y lleva al catálogo (usado por colecciones). */
  showCategory: (category: CategoryFilter) => void
  /** Aplica una búsqueda y lleva al catálogo (usado por el buscador del menú). */
  showSearch: (query: string) => void
  activeProduct: Product | null
  openProduct: (slug: string) => void
  closeProduct: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

function readProductParam(): string | null {
  return new URLSearchParams(window.location.search).get(PRODUCT_PARAM)
}

/**
 * Cambia la URL sin recargar. Algunos navegadores lo bloquean al abrir la página
 * como archivo (file://); en ese caso el modal funciona igual, sin enlace directo.
 */
function updateHistory(method: 'pushState' | 'replaceState', state: unknown, url: string) {
  try {
    window.history[method](state, '', url)
  } catch {
    // Sin enlace directo en este navegador; el resto funciona igual.
  }
}

function urlWithProduct(slug: string | null): string {
  const url = new URL(window.location.href)
  if (slug) url.searchParams.set(PRODUCT_PARAM, slug)
  else url.searchParams.delete(PRODUCT_PARAM)
  return `${url.pathname}${url.search}${url.hash}`
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('todas')
  const [sort, setSort] = useState<SortOption>('relevancia')
  // Permite compartir un enlace directo a un producto: /?producto=sofa-oslo
  const [activeSlug, setActiveSlug] = useState<string | null>(() => readProductParam())

  useEffect(() => {
    const onPopState = () => setActiveSlug(readProductParam())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openProduct = useCallback((slug: string) => {
    setActiveSlug(slug)
    updateHistory('pushState', { nhProduct: slug }, urlWithProduct(slug))
  }, [])

  const closeProduct = useCallback(() => {
    setActiveSlug(null)
    if (window.history.state?.nhProduct) {
      // El modal se abrió desde el sitio: "atrás" devuelve la URL anterior.
      window.history.back()
    } else {
      updateHistory('replaceState', null, urlWithProduct(null))
    }
  }, [])

  const resetFilters = useCallback(() => {
    setQuery('')
    setCategory('todas')
    setSort('relevancia')
  }, [])

  const showCategory = useCallback((next: CategoryFilter) => {
    setQuery('')
    setCategory(next)
    scrollToSection('catalogo')
  }, [])

  const showSearch = useCallback((next: string) => {
    setCategory('todas')
    setQuery(next)
    scrollToSection('catalogo')
  }, [])

  const activeProduct = useMemo(
    () => (activeSlug ? (getProductBySlug(activeSlug) ?? null) : null),
    [activeSlug],
  )

  const value = useMemo<CatalogContextValue>(
    () => ({
      query,
      setQuery,
      category,
      setCategory,
      sort,
      setSort,
      resetFilters,
      showCategory,
      showSearch,
      activeProduct,
      openProduct,
      closeProduct,
    }),
    [query, category, sort, resetFilters, showCategory, showSearch, activeProduct, openProduct, closeProduct],
  )

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog debe usarse dentro de <CatalogProvider>')
  return ctx
}
