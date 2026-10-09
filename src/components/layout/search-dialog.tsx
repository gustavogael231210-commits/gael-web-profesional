import { useId, useMemo, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'

import { SmartImage } from '@/components/common/smart-image'
import { Price } from '@/components/catalog/price'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCatalog } from '@/context/catalog-context'
import { categoryLabel, products } from '@/data/products'
import { matchesQuery } from '@/lib/catalog'

const suggestions = ['Sofá', 'Mesa', 'Cama', 'Silla', 'Librero']

/** Búsqueda rápida con resultados en vivo. Enter lleva al catálogo filtrado. */
export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [value, setValue] = useState('')
  const { openProduct, showSearch } = useCatalog()
  const inputId = useId()

  const results = useMemo(() => (value.trim() ? products.filter((p) => matchesQuery(p, value)).slice(0, 6) : []), [value])

  const close = () => {
    onOpenChange(false)
    setValue('')
  }

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? onOpenChange(true) : close())}>
      <DialogContent className="top-[12%] max-w-xl translate-y-0 gap-0 p-0 sm:rounded-3xl">
        <DialogTitle className="sr-only">Buscar en el catálogo</DialogTitle>
        <DialogDescription className="sr-only">
          Escribe el nombre de un mueble. Pulsa Enter para ver todos los resultados en el catálogo.
        </DialogDescription>
        <form
          role="search"
          className="border-b border-border p-4 pr-16"
          onSubmit={(event) => {
            event.preventDefault()
            showSearch(value.trim())
            close()
          }}
        >
          <label htmlFor={inputId} className="sr-only">
            Buscar muebles por nombre
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id={inputId}
              type="search"
              autoFocus
              autoComplete="off"
              placeholder="¿Qué mueble buscas?"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="pl-11"
            />
          </div>
        </form>

        <div className="max-h-[60dvh] overflow-y-auto p-3">
          {!value.trim() ? (
            <div className="p-3">
              <p className="mb-3 text-xs tracking-[0.16em] text-muted-foreground uppercase">Sugerencias</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setValue(term)}
                    className="min-h-10 rounded-full border border-border px-4 text-sm hover:border-charcoal/40 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground" role="status">
              Sin coincidencias para “{value}”. Prueba con otra palabra.
            </p>
          ) : (
            <>
              <p className="sr-only" role="status">
                {results.length} resultados
              </p>
              <ul className="flex flex-col">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      type="button"
                      onClick={() => {
                        close()
                        openProduct(product.slug)
                      }}
                      className="flex w-full items-center gap-4 rounded-2xl p-2 text-left transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    >
                      <SmartImage src={product.image.src} alt="" width={160} sizes="64px" wrapperClassName="size-16 shrink-0 rounded-xl" />
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="font-serif text-xl leading-tight text-charcoal">{product.name}</span>
                        <span className="text-xs text-muted-foreground">{categoryLabel(product.category)}</span>
                      </span>
                      <Price value={product.price} className="hidden sm:flex" />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  showSearch(value.trim())
                  close()
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl p-3 text-sm font-medium text-olive-deep hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
              >
                Ver todos los resultados en el catálogo
                <ArrowRight className="size-4" />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
