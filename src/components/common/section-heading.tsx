import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { Reveal } from '@/components/common/reveal'

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}: {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  children?: ReactNode
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className,
      )}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="max-w-3xl text-4xl leading-[1.05] font-medium text-charcoal sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className={cn('max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
      {children}
    </Reveal>
  )
}
