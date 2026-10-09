import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'

import { SmartImage } from '@/components/common/smart-image'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useCatalog } from '@/context/catalog-context'
import { useQuote } from '@/context/quote-context'
import { formatMXN } from '@/lib/format'
import { buildWhatsAppUrl, quoteMessage } from '@/lib/whatsapp'

/** Panel lateral "Mi selección": piezas para cotizar por WhatsApp (no es un carrito de pago). */
export function QuoteSheet() {
  const { lines, total, count, setQuantity, removeItem, clear, isOpen, setOpen } = useQuote()
  const { openProduct } = useCatalog()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="gap-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle>Mi selección</SheetTitle>
          <SheetDescription>
            Reúne las piezas que te interesan y envíanos la lista por WhatsApp para recibir una cotización.
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag className="size-8 text-walnut/60" aria-hidden="true" />
            <p className="font-serif text-2xl text-charcoal">Tu selección está vacía</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Abre cualquier pieza del catálogo y pulsa “Agregar a mi selección”.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)} asChild>
              <a href="#catalogo">Explorar catálogo</a>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto overscroll-contain px-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-4 py-5">
                  <button
                    type="button"
                    className="shrink-0 overflow-hidden rounded-xl focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                    onClick={() => {
                      setOpen(false)
                      openProduct(line.slug)
                    }}
                    aria-label={`Ver ${line.name}`}
                  >
                    <SmartImage src={line.image} alt={line.imageAlt} width={240} sizes="96px" wrapperClassName="size-24" />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="font-serif text-xl leading-tight text-charcoal">{line.name}</p>
                    {line.color && <p className="text-xs text-muted-foreground">Color: {line.color}</p>}
                    <p className="text-sm text-charcoal tabular-nums">{formatMXN(line.unitPrice)}</p>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center rounded-full border border-border" role="group" aria-label={`Cantidad de ${line.name}`}>
                        <button
                          type="button"
                          className="inline-flex size-10 items-center justify-center rounded-full hover:bg-charcoal/[0.06] focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                          onClick={() => setQuantity(line.key, line.quantity - 1)}
                          aria-label="Quitar una unidad"
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          className="inline-flex size-10 items-center justify-center rounded-full hover:bg-charcoal/[0.06] focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                          onClick={() => setQuantity(line.key, line.quantity + 1)}
                          aria-label="Agregar una unidad"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeItem(line.key)} aria-label={`Quitar ${line.name} de la selección`}>
                        <Trash2 />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <SheetFooter className="border-t border-border bg-card">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">
                  Total de referencia ({count} {count === 1 ? 'pieza' : 'piezas'})
                </span>
                <span className="text-xl font-medium text-charcoal tabular-nums">
                  {formatMXN(total)} <span className="text-xs text-muted-foreground">MXN</span>
                </span>
              </div>
              <Button variant="olive" size="lg" asChild>
                <a href={buildWhatsAppUrl(quoteMessage(lines))} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" />
                  Solicitar cotización por WhatsApp
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={clear}>
                Vaciar selección
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                No es un pedido ni un pago. Te confirmaremos disponibilidad, precio final y entrega por WhatsApp.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
