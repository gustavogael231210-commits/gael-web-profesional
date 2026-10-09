import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PackageSearch, RotateCcw } from 'lucide-react'

import { SectionHeading } from '@/components/common/section-heading'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { CatalogToolbar } from '@/components/catalog/catalog-toolbar'
import { ProductCard } from '@/components/catalog/product-card'
import { siteConfig } from '@/config/site'
import { useCatalog } from '@/context/catalog-context'
import { categoryLabel, products } from '@/data/products'
import { filterProducts } from '@/lib/catalog'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export function CatalogSection() {
  const { query, category, sort, resetFilters, setQuery } = useCatalog()

  const results = useMemo(() => filterProducts(products, { query, category, sort }), [query, category, sort])
  const hasFilters = query !== '' || category !== 'todas' || sort !== 'relevancia'

  return (
    <section id="catalogo" aria-labelledby="catalogo-title" className="bg-background py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="catalogo-title"
          eyebrow="Catálogo"
          title={
            <>
              Muebles con <em className="font-normal text-walnut">carácter</em> para cada rincón
            </>
          }
          description="Explora la selección, filtra por tipo de mueble y consulta disponibilidad, colores y entrega directamente por WhatsApp."
        />

        <div className="mt-12">
          <CatalogToolbar />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
            {results.length === 1 ? '1 pieza' : `${results.length} piezas`}
            {category !== 'todas' && <> en {categoryLabel(category)}</>}
            {query && <> para “{query}”</>}
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <RotateCcw />
              Limpiar filtros
            </Button>
          )}
        </div>

        {results.length > 0 ? (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((product) => (
                <motion.li
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={product} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
            <PackageSearch className="size-8 text-walnut/70" aria-hidden="true" />
            <div className="flex flex-col gap-2">
              <p className="font-serif text-3xl text-charcoal">No encontramos esa pieza</p>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                Prueba con otra palabra, como <button type="button" className="underline underline-offset-4 hover:text-charcoal" onClick={() => setQuery('sofá')}>sofá</button>,{' '}
                <button type="button" className="underline underline-offset-4 hover:text-charcoal" onClick={() => setQuery('mesa')}>mesa</button> o{' '}
                <button type="button" className="underline underline-offset-4 hover:text-charcoal" onClick={() => setQuery('cama')}>cama</button>, o pregúntanos por WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" onClick={resetFilters}>
                <RotateCcw />
                Ver todo el catálogo
              </Button>
              <Button variant="olive" asChild>
                <a
                  href={buildWhatsAppUrl(
                    `Hola, estoy buscando ${query ? `“${query}”` : 'un mueble'} y no lo encontré en el catálogo de ${siteConfig.name}. ¿Me pueden ayudar?`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="size-4" />
                  Preguntar por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
