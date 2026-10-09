import { useState } from 'react'
import { Check, Info, Layers, Ruler, ShoppingBag } from 'lucide-react'

import { SmartImage } from '@/components/common/smart-image'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { ColorSelector } from '@/components/catalog/color-swatches'
import { Price } from '@/components/catalog/price'
import { useCatalog } from '@/context/catalog-context'
import { useQuote } from '@/context/quote-context'
import { categoryLabel } from '@/data/products'
import { formatDimensions } from '@/lib/format'
import { productWhatsAppUrl } from '@/lib/whatsapp'
import type { Product } from '@/types/product'

/** Detalle del producto en una ventana modal accesible (foco atrapado, Esc para cerrar). */
export function ProductDialog() {
  const { activeProduct, closeProduct } = useCatalog()

  return (
    <Dialog open={activeProduct !== null} onOpenChange={(open) => !open && closeProduct()}>
      <DialogContent className="max-w-5xl gap-0 p-0 sm:rounded-3xl">
        {activeProduct && <ProductDetail key={activeProduct.id} product={activeProduct} onDone={closeProduct} />}
      </DialogContent>
    </Dialog>
  )
}

function ProductDetail({ product, onDone }: { product: Product; onDone: () => void }) {
  const [color, setColor] = useState(product.colors[0]?.name ?? '')
  const [added, setAdded] = useState(false)
  const { addItem, setOpen } = useQuote()

  return (
    <div className="grid md:grid-cols-[1.05fr_1fr]">
      <div className="relative">
        <SmartImage
          src={product.image.src}
          alt={product.image.alt}
          width={1200}
          sizes="(min-width: 768px) 50vw, 100vw"
          wrapperClassName="aspect-[4/3] md:aspect-auto md:h-full md:min-h-[560px] md:rounded-l-3xl"
          priority
        />
        {product.badge && (
          <Badge variant="soft" className="absolute top-4 left-4">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 pr-10">
          <p className="eyebrow">{categoryLabel(product.category)}</p>
          <DialogTitle className="text-4xl sm:text-5xl">{product.name}</DialogTitle>
          <Price value={product.price} compareAt={product.compareAtPrice} size="lg" />
        </div>

        <DialogDescription className="text-base leading-relaxed text-muted-foreground">
          {product.description}
        </DialogDescription>

        {product.colors.length > 0 && (
          <ColorSelector
            name={`color-${product.slug}`}
            colors={product.colors}
            value={color}
            onChange={(next) => {
              setColor(next)
              setAdded(false)
            }}
          />
        )}

        <dl className="grid gap-4 rounded-2xl bg-muted/70 p-5 text-sm sm:grid-cols-2">
          <div className="flex gap-3">
            <Layers className="mt-0.5 size-4 shrink-0 text-walnut" aria-hidden="true" />
            <div>
              <dt className="font-medium text-charcoal">Materiales</dt>
              <dd className="mt-1 text-muted-foreground">
                <ul className="flex flex-col gap-1">
                  {product.materials.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </div>
          <div className="flex gap-3">
            <Ruler className="mt-0.5 size-4 shrink-0 text-walnut" aria-hidden="true" />
            <div>
              <dt className="font-medium text-charcoal">Dimensiones</dt>
              <dd className="mt-1 text-muted-foreground">
                {formatDimensions(product.dimensions)}
                <span className="block text-xs">Ancho × fondo × alto</span>
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3">
          <Button variant="olive" size="lg" asChild>
            <a href={productWhatsAppUrl(product, color || undefined)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" />
              Consultar por WhatsApp
            </a>
          </Button>
          {added ? (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                onDone()
                setOpen(true)
              }}
            >
              <Check />
              Agregado · Ver mi selección
            </Button>
          ) : (
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                addItem(product.slug, color || undefined)
                setAdded(true)
              }}
            >
              <ShoppingBag />
              Agregar a mi selección
            </Button>
          )}
          <p className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Precio de referencia. Disponibilidad, tiempos y costo de entrega se confirman por WhatsApp; este sitio
            no procesa pagos.
          </p>
        </div>
      </div>
    </div>
  )
}
