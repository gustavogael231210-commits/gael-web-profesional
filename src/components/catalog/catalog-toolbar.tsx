import { ArrowDownUp, Search, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { useCatalog } from '@/context/catalog-context'
import { categories } from '@/data/products'
import { cn } from '@/lib/utils'
import type { CategoryFilter, SortOption } from '@/types/product'

const filterChips: { id: CategoryFilter; label: string }[] = [
  { id: 'todas', label: 'Todo' },
  ...categories.map(({ id, label }) => ({ id, label })),
  { id: 'compactos', label: 'Espacios pequeños' },
]

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevancia', label: 'Destacados' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export function CatalogToolbar() {
  const { query, setQuery, category, setCategory, sort, setSort } = useCatalog()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="catalog-search" className="mb-2 block text-sm font-medium text-charcoal">
            Buscar por nombre
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="catalog-search"
              type="search"
              inputMode="search"
              autoComplete="off"
              placeholder="Sofá, mesa, cama…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pr-12 pl-11 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute top-1/2 right-1 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-charcoal/[0.06] hover:text-charcoal focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                aria-label="Borrar búsqueda"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
        <div className="sm:w-64">
          <label htmlFor="catalog-sort" className="mb-2 block text-sm font-medium text-charcoal">
            Ordenar
          </label>
          <div className="relative">
            <ArrowDownUp
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <select
              id="catalog-sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="h-11 w-full appearance-none rounded-full border border-input bg-card pr-10 pl-11 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 md:text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div role="group" aria-label="Filtrar por categoría" className="flex flex-wrap gap-2">
        {filterChips.map((chip) => {
          const active = category === chip.id
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(chip.id)}
              className={cn(
                'min-h-10 rounded-full border px-4 text-sm transition-[background-color,border-color,color] duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none',
                active
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-border bg-card text-charcoal hover:border-charcoal/40',
              )}
            >
              {chip.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
