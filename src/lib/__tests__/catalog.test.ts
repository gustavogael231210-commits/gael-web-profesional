import { describe, expect, it } from 'vitest'

import { products } from '@/data/products'
import { filterProducts, normalize } from '@/lib/catalog'
import { formatMXN } from '@/lib/format'

const base = { query: '', category: 'todas', sort: 'relevancia' } as const

describe('catálogo', () => {
  it('tiene al menos los 8 productos requeridos con datos completos', () => {
    const required = [
      'Sofá Oslo',
      'Sillón Aura',
      'Mesa de centro Roble',
      'Comedor Nápoles',
      'Silla Siena',
      'Cama Boreal',
      'Escritorio Studio',
      'Mueble de TV Horizon',
    ]
    for (const name of required) expect(products.map((p) => p.name)).toContain(name)
    for (const p of products) {
      expect(p.price).toBeGreaterThan(0)
      expect(p.materials.length).toBeGreaterThan(0)
      expect(p.colors.length).toBeGreaterThan(0)
      expect(p.image.alt.length).toBeGreaterThan(10)
      if (p.compareAtPrice) expect(p.compareAtPrice).toBeGreaterThan(p.price)
    }
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length)
  })

  it('busca por nombre sin importar acentos ni mayúsculas', () => {
    expect(normalize('  SOFÁ ')).toBe('sofa')
    expect(filterProducts(products, { ...base, query: 'sofa' }).map((p) => p.name)).toEqual(['Sofá Oslo'])
    expect(filterProducts(products, { ...base, query: 'NAPOLES' }).map((p) => p.name)).toEqual(['Comedor Nápoles'])
    expect(filterProducts(products, { ...base, query: 'zzz' })).toHaveLength(0)
  })

  it('filtra por categoría y por espacios pequeños', () => {
    const sofas = filterProducts(products, { ...base, category: 'sofas' })
    expect(sofas.every((p) => p.category === 'sofas')).toBe(true)
    expect(sofas.length).toBe(2)
    const compact = filterProducts(products, { ...base, category: 'compactos' })
    expect(compact.length).toBeGreaterThan(0)
    expect(compact.every((p) => p.compact)).toBe(true)
  })

  it('ordena por precio', () => {
    const asc = filterProducts(products, { ...base, sort: 'precio-asc' }).map((p) => p.price)
    const desc = filterProducts(products, { ...base, sort: 'precio-desc' }).map((p) => p.price)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
    expect(desc).toEqual([...asc].reverse())
  })

  it('formatea precios en pesos mexicanos', () => {
    expect(formatMXN(24900)).toBe('$24,900')
  })
})
