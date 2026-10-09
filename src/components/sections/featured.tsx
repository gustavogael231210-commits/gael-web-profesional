import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/common/reveal'
import { SmartImage } from '@/components/common/smart-image'
import { Price } from '@/components/catalog/price'
import { useCatalog } from '@/context/catalog-context'
import { categoryLabel, products } from '@/data/products'
import { cn } from '@/lib/utils'

const featured = products.filter((product) => product.featured).slice(0, 4)

/** "Piezas que hacen especial cada espacio": selección editorial de productos destacados. */
export function Featured() {
  const { openProduct } = useCatalog()

  return (
    <section aria-labelledby="piezas-title" className="overflow-hidden bg-charcoal py-24 text-ivory sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.22em] text-sand uppercase">Selección destacada</p>
            <h2 id="piezas-title" className="max-w-3xl text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
              Piezas que hacen especial cada espacio
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">
              Muebles con presencia propia: cada uno puede convertirse en el centro de una habitación.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal as="li" key={product.id} delay={index * 0.08} className={cn(index % 2 === 1 && 'lg:mt-16')}>
              <button
                type="button"
                onClick={() => openProduct(product.slug)}
                className="group flex w-full flex-col gap-4 text-left focus-visible:outline-none"
              >
                <div className="relative overflow-hidden rounded-3xl ring-1 ring-ivory/10 transition-shadow group-focus-visible:ring-[3px] group-focus-visible:ring-sand">
                  <SmartImage
                    src={product.image.src}
                    alt={product.image.alt}
                    width={800}
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                    wrapperClassName="aspect-[3/4] bg-walnut-deep"
                    className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-4 inline-flex size-11 items-center justify-center rounded-full bg-ivory/90 text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs tracking-[0.16em] text-ivory/60 uppercase">
                    {categoryLabel(product.category)}
                  </span>
                  <span className="font-serif text-3xl leading-tight">{product.name}</span>
                  <Price
                    value={product.price}
                    compareAt={product.compareAtPrice}
                    tone="light"
                  />
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
