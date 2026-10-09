import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { getProductBySlug } from '@/data/products'
import type { QuoteLine } from '@/lib/whatsapp'

/**
 * "Mi selección": lista de piezas para solicitar cotización por WhatsApp.
 * No es un carrito de compra ni procesa pagos. Se guarda solo en este navegador.
 */
export interface QuoteItem {
  slug: string
  color?: string
  quantity: number
}

interface QuoteContextValue {
  items: QuoteItem[]
  lines: (QuoteLine & { slug: string; key: string; image: string; imageAlt: string })[]
  count: number
  total: number
  addItem: (slug: string, color?: string) => void
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const STORAGE_KEY = 'nordica-home:seleccion'
const MAX_QUANTITY = 20

const QuoteContext = createContext<QuoteContextValue | null>(null)

const itemKey = (item: Pick<QuoteItem, 'slug' | 'color'>) => `${item.slug}::${item.color ?? ''}`

function loadItems(): QuoteItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item): item is QuoteItem =>
        typeof item?.slug === 'string' &&
        Boolean(getProductBySlug(item.slug)) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
  } catch {
    return []
  }
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>(loadItems)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Almacenamiento no disponible (modo privado, etc.): la lista vive solo en memoria.
    }
  }, [items])

  const addItem = useCallback((slug: string, color?: string) => {
    setItems((current) => {
      const key = itemKey({ slug, color })
      const existing = current.find((item) => itemKey(item) === key)
      if (existing) {
        return current.map((item) =>
          itemKey(item) === key ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item,
        )
      }
      return [...current, { slug, color, quantity: 1 }]
    })
  }, [])

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((item) => itemKey(item) !== key)
        : current.map((item) =>
            itemKey(item) === key ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) } : item,
          ),
    )
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => itemKey(item) !== key))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<QuoteContextValue>(() => {
    const lines = items.flatMap((item) => {
      const product = getProductBySlug(item.slug)
      if (!product) return []
      return [
        {
          key: itemKey(item),
          slug: item.slug,
          name: product.name,
          color: item.color,
          quantity: item.quantity,
          unitPrice: product.price,
          image: product.image.src,
          imageAlt: product.image.alt,
        },
      ]
    })
    return {
      items,
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      total: lines.reduce((sum, line) => sum + line.quantity * line.unitPrice, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
      isOpen,
      setOpen,
    }
  }, [items, addItem, setQuantity, removeItem, clear, isOpen])

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

// eslint-disable-next-line react/only-export-components
export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error('useQuote debe usarse dentro de <QuoteProvider>')
  return ctx
}
