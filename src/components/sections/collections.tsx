import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { SmartImage } from '@/components/common/smart-image'
import { useCatalog } from '@/context/catalog-context'
import { collections, type Collection } from '@/data/collections'
import { cn } from '@/lib/utils'

export function Collections() {
  return (
    <section id="colecciones" aria-labelledby="colecciones-title" className="bg-beige/50 py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="colecciones-title"
            eyebrow="Colecciones"
            title={
              <>
                Ambientes pensados para <em className="font-normal text-walnut">vivirse</em>
              </>
            }
            description="Cada colección reúne piezas que conversan entre sí: proporciones, materiales y tonos que funcionan juntos."
          />
        </div>

        <ul className="mt-14 grid auto-rows-[18rem] gap-4 sm:auto-rows-[20rem] sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {collections.map((collection, index) => (
            <Reveal
              as="li"
              key={collection.id}
              delay={index * 0.06}
              className={cn(
                index === 0 && 'sm:col-span-2 sm:row-span-2 lg:col-span-3',
                index === 1 && 'lg:col-span-3',
                index === 2 && 'lg:col-span-3',
                index === 3 && 'lg:col-span-3',
                index === 4 && 'sm:col-span-2 lg:col-span-6',
              )}
            >
              <CollectionTile collection={collection} large={index === 0} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CollectionTile({ collection, large }: { collection: Collection; large?: boolean }) {
  const { showCategory } = useCatalog()
  return (
    <button
      type="button"
      onClick={() => showCategory(collection.category)}
      className="group relative block h-full w-full overflow-hidden rounded-3xl text-left focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
    >
      <SmartImage
        src={collection.image.src}
        alt={collection.image.alt}
        width={large ? 1400 : 1000}
        sizes={large ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw'}
        wrapperClassName="absolute inset-0"
        className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
        <div className="flex max-w-md flex-col gap-2 text-ivory">
          <h3 className={cn('leading-tight font-medium', large ? 'text-4xl sm:text-5xl' : 'text-3xl')}>
            {collection.title}
          </h3>
          <p className="text-sm leading-relaxed text-ivory/85">{collection.description}</p>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-ivory/90 text-charcoal transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-45"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <span className="sr-only">. Ver piezas en el catálogo</span>
    </button>
  )
}
