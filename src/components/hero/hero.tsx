import type { PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { HeroVisual } from '@/components/hero/hero-visual'
import { Button } from '@/components/ui/button'
import { Spotlight } from '@/components/ui/spotlight'
import { siteConfig } from '@/config/site'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()

  // Posición normalizada del cursor (−0.5…0.5) suavizada con muelles.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointerX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 })
  const pointerY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 })

  // Paralaje sutil del texto en sentido contrario a la escena.
  const textX = useTransform(pointerX, (x) => x * -14)
  const textY = useTransform(pointerY, (y) => y * -10)

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || reduceMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    rawX.set((event.clientX - rect.left) / rect.width - 0.5)
    rawY.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  const handlePointerLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative overflow-hidden bg-[radial-gradient(120%_80%_at_85%_10%,#f3e9da_0%,var(--ivory)_55%)] pt-[4.5rem]"
    >
      <Spotlight className="z-0" size={520} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-sand/40 blur-3xl"
      />

      <div className="container-page relative z-10 grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1fr_1.08fr] lg:gap-14 lg:py-12">
        <motion.div style={reduceMotion ? undefined : { x: textX, y: textY }} className="flex flex-col gap-7">
          <motion.p
            className="eyebrow flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="h-px w-10 bg-olive" aria-hidden="true" />
            {siteConfig.slogan}
          </motion.p>

          <motion.h1
            id="hero-title"
            className="text-[3.1rem] leading-[0.98] font-medium tracking-[-0.01em] text-charcoal sm:text-7xl xl:text-[5.6rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Tu hogar merece un diseño <em className="font-normal text-walnut">extraordinario.</em>
          </motion.h1>

          <motion.p
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            Descubre muebles que combinan diseño contemporáneo, comodidad y personalidad para transformar cada espacio
            de tu hogar.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            <Button size="lg" asChild>
              <a href="#colecciones">
                Explorar colección
                <ArrowRight />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#catalogo">Descubrir nuestros muebles</a>
            </Button>
          </motion.div>

          <motion.ul
            className="mt-2 grid max-w-lg grid-cols-3 gap-4 border-t border-charcoal/10 pt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              ['Diseño', 'contemporáneo'],
              ['Materiales', 'nobles'],
              ['Asesoría', 'por WhatsApp'],
            ].map(([title, subtitle]) => (
              <li key={title} className="flex flex-col">
                <span className="font-serif text-xl text-charcoal">{title}</span>
                <span className="text-muted-foreground">{subtitle}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative aspect-[1/1.02] w-full overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-charcoal/5 sm:aspect-[5/4] lg:aspect-[1/1.02]"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.15, ease }}
        >
          <HeroVisual pointerX={pointerX} pointerY={pointerY} />
          <div className="pointer-events-none absolute top-4 left-4 rounded-full bg-ivory/85 px-3 py-1.5 text-[11px] font-medium tracking-[0.16em] text-charcoal uppercase shadow-soft backdrop-blur">
            Sala Oslo · Escena 3D
          </div>
        </motion.div>
      </div>

      <a
        href="#colecciones"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 rounded-full px-3 py-2 text-xs tracking-[0.18em] text-muted-foreground uppercase hover:text-charcoal lg:flex"
      >
        <ArrowDown className="size-4 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
        Descubre más
      </a>
    </section>
  )
}
