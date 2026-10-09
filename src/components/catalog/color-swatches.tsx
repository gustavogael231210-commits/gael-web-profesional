import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { ProductColor } from '@/types/product'

/** Muestras solo visuales (tarjeta de producto). */
export function ColorDots({ colors, className }: { colors: ProductColor[]; className?: string }) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <span className="sr-only">Colores disponibles: {colors.map((c) => c.name).join(', ')}</span>
      {colors.map((color) => (
        <span
          key={color.name}
          title={color.name}
          aria-hidden="true"
          className="size-3.5 rounded-full ring-1 ring-charcoal/15 ring-offset-1 ring-offset-card"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  )
}

/** Selector accesible de color (grupo de radio). */
export function ColorSelector({
  colors,
  value,
  onChange,
  name,
}: {
  colors: ProductColor[]
  value: string
  onChange: (value: string) => void
  name: string
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-charcoal">
        Color: <span className="font-normal text-muted-foreground">{value}</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const checked = value === color.name
          return (
            <label
              key={color.name}
              className={cn(
                'relative inline-flex min-h-11 items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/40',
                checked ? 'border-charcoal bg-charcoal/[0.04]' : 'border-border hover:border-charcoal/40',
              )}
            >
              <input
                type="radio"
                name={name}
                value={color.name}
                checked={checked}
                onChange={() => onChange(color.name)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className="flex size-6 items-center justify-center rounded-full ring-1 ring-charcoal/15"
                style={{ backgroundColor: color.hex }}
              >
                {checked && <Check className="size-3.5 text-ivory mix-blend-difference" />}
              </span>
              {color.name}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
