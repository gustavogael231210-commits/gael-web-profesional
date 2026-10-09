import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion'

import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string
  /** Diámetro del haz de luz en píxeles. */
  size?: number
  springOptions?: SpringOptions
}

/**
 * Luz suave que sigue al cursor dentro del elemento padre.
 * El padre debe tener posición relativa/absoluta y `overflow-hidden`.
 * Escucha los eventos del contenedor padre y los elimina al desmontarse.
 * En pantallas táctiles no se activa (no hay cursor que seguir).
 */
export function Spotlight({
  className,
  size = 420,
  springOptions = { stiffness: 120, damping: 22, mass: 0.6 },
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)
  const left = useTransform(mouseX, (x) => `${x - size / 2}px`)
  const top = useTransform(mouseY, (y) => `${y - size / 2}px`)

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const handleMove = (event: PointerEvent) => {
      const { left: pl, top: pt } = parent.getBoundingClientRect()
      mouseX.set(event.clientX - pl)
      mouseY.set(event.clientY - pt)
    }
    const handleEnter = () => setIsHovered(true)
    const handleLeave = () => setIsHovered(false)

    parent.addEventListener('pointermove', handleMove)
    parent.addEventListener('pointerenter', handleEnter)
    parent.addEventListener('pointerleave', handleLeave)
    return () => {
      parent.removeEventListener('pointermove', handleMove)
      parent.removeEventListener('pointerenter', handleEnter)
      parent.removeEventListener('pointerleave', handleLeave)
    }
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_70%)] from-[#fff6e4]/70 via-[#fff6e4]/20 to-transparent blur-2xl transition-opacity duration-500',
        isHovered ? 'opacity-100' : 'opacity-0',
        className,
      )}
      style={{ width: size, height: size, left, top }}
    />
  )
}
