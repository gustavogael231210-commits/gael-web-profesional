import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.14em] whitespace-nowrap uppercase',
  {
    variants: {
      variant: {
        default: 'bg-charcoal text-ivory',
        olive: 'bg-olive text-ivory',
        walnut: 'bg-walnut text-ivory',
        soft: 'bg-ivory/95 text-charcoal shadow-soft backdrop-blur',
        outline: 'border border-charcoal/15 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

// eslint-disable-next-line react/only-export-components
export { Badge, badgeVariants }
