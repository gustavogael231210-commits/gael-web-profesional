import { ArrowUpRight } from 'lucide-react'

import { SmartImage } from '@/components/common/smart-image'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ColorDots } from '@/components/catalog/color-swatches'
import { Price } from '@/components/catalog/price'
import { useCatalog } from '@/context/catalog-context'
import { categoryLabel } from '@/data/products'
import { productWhatsAppUrl } from '@/lib/whatsapp'
import type { Product } from '@/types/product'

const badgeVariant = {
  Nuevo: 'olive',
  'Promoción': 'walnut',
  'Edición limitada': 'default',
} as const

export function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useCatalog()

  return (
    <Card className="group relative h-full gap-0 overflow-hidden p-0 transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <SmartImage
          src={product.image.src}
          alt={product.image.alt}
          width={800}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
          wrapperClassName="aspect-[4/5]"
          className="transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <Badge variant={badgeVariant[product.badge]} className="absolute top-4 left-4">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
            {categoryLabel(product.category)}
          </p>
          <ColorDots colors={product.colors} />
        </div>
        <h3 className="text-[1.7rem] leading-tight font-medium text-charcoal">
          <button
            type="button"
            onClick={() => openProduct(product.slug)}
            className="rounded-sm text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50"
          >
            {product.name}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <Price value={product.price} compareAt={product.compareAtPrice} className="mt-auto pt-1" />

        {/* z-10 para quedar por encima del área clicable del título */}
        <div className="relative z-10 mt-2 grid grid-cols-[1fr_auto] gap-2">
          <Button variant="outline" onClick={() => openProduct(product.slug)}>
            Ver detalles
            <ArrowUpRight />
          </Button>
          <Button variant="olive" size="icon" asChild>
            <a
              href={productWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Consultar ${product.name} por WhatsApp (se abre en una pestaña nueva)`}
              title="Consultar por WhatsApp"
            >
              <WhatsAppIcon className="size-5" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
