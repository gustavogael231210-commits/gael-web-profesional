import { cn } from '@/lib/utils'

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <a
      href="#inicio"
      className={cn(
        'group inline-flex min-h-11 items-center gap-2.5 rounded-full focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none',
        className,
      )}
      aria-label="NÓRDICA HOME, ir al inicio"
    >
      <svg viewBox="0 0 32 32" className="size-7 shrink-0 sm:size-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" className={inverted ? 'fill-ivory' : 'fill-charcoal'} />
        <path
          d="M9 22V10l7 9V10M23 10v12M16 16h7"
          fill="none"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={inverted ? 'stroke-charcoal' : 'stroke-ivory'}
        />
      </svg>
      <span
        className={cn(
          'font-serif text-[1.15rem] leading-none font-semibold tracking-[0.1em] whitespace-nowrap sm:text-[1.35rem] sm:tracking-[0.14em]',
          inverted ? 'text-ivory' : 'text-charcoal',
        )}
      >
        NÓRDICA<span className="font-normal text-olive"> HOME</span>
      </span>
    </a>
  )
}
