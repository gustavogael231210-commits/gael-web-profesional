import { formatMXN } from '@/lib/format'
import { cn } from '@/lib/utils'

export function Price({
  value,
  compareAt,
  className,
  size = 'md',
  tone = 'dark',
}: {
  value: number
  compareAt?: number
  className?: string
  size?: 'md' | 'lg'
  /** `light` para fondos oscuros. */
  tone?: 'dark' | 'light'
}) {
  const muted = tone === 'light' ? 'text-ivory/65' : 'text-muted-foreground'
  const discount = compareAt && compareAt > value ? Math.round((1 - value / compareAt) * 100) : 0
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span
        className={cn(
          'font-medium tabular-nums',
          tone === 'light' ? 'text-ivory' : 'text-charcoal',
          size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg',
        )}
      >
        {formatMXN(value)}
        <span className={cn('ml-1 text-xs font-normal tracking-wide', muted)}>MXN</span>
      </span>
      {discount > 0 && (
        <>
          <span className={cn('text-sm tabular-nums line-through', muted)}>
            <span className="sr-only">Precio anterior: </span>
            {formatMXN(compareAt!)}
          </span>
          <span className={cn('text-xs font-semibold', tone === 'light' ? 'text-sand' : 'text-olive-deep')}>−{discount}%</span>
        </>
      )}
    </div>
  )
}
