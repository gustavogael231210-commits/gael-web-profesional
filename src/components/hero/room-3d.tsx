import type { CSSProperties, ReactNode } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'

import { cn } from '@/lib/utils'

/**
 * Sala contemporánea en 3D construida con CSS (sin WebGL).
 *
 * Cada pieza es un plano posicionado en el espacio con `translateZ` / `rotateX`
 * dentro de un escenario con `preserve-3d`: suelo y alfombra son planos
 * horizontales reales y la mesa de centro tiene cubierta horizontal, así que la
 * perspectiva y el paralaje son geométricamente correctos al girar la cámara.
 *
 * - `pointerX` / `pointerY` (−0.5…0.5) giran la cámara siguiendo el cursor.
 * - `mode="idle"` aplica un balanceo suave (móviles y pantallas táctiles).
 * - `mode="static"` no anima (usuarios con "reducir movimiento").
 */

/** Línea del suelo (base de la pared) en % de la altura del escenario. */
const FLOOR = 74
/** Inclinación (mirada ligeramente desde arriba) y giro base de la cámara, en grados. */
const BASE_TILT = -10
const BASE_TURN = -16

type Layer = {
  /** Profundidad en cqw (negativo = más lejos). */
  z: number
  className?: string
  style: CSSProperties
  /** Plano horizontal apoyado en el suelo o en una superficie. */
  flat?: boolean
  /** Elevación del plano horizontal en cqw (evita parpadeo entre planos coplanares). */
  lift?: number
  children?: ReactNode
  delay: number
}

function RoomLayer({ z, className, style, flat, lift = 0, children, delay, animate }: Layer & { animate: boolean }) {
  const y = flat ? `${-lift}cqw` : 0
  return (
    <motion.div
      aria-hidden="true"
      className={cn('room-layer', className)}
      style={{
        ...style,
        z: `${z}cqw`,
        ...(flat ? { rotateX: 90, originY: 0 } : null),
      }}
      initial={animate ? { opacity: 0, y: flat ? y : 28 } : false}
      animate={{ opacity: 1, y }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Room3D({
  pointerX,
  pointerY,
  mode,
  className,
}: {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  mode: 'interactive' | 'idle' | 'static'
  className?: string
}) {
  const rotateY = useTransform(pointerX, (x) => BASE_TURN + x * 18)
  const rotateX = useTransform(pointerY, (y) => BASE_TILT + y * 8)
  const animate = mode !== 'static'

  const floorTop = `${FLOOR}%`
  const above = (cqw: number) => `calc(${FLOOR}% - ${cqw}cqw)`

  const layers: Layer[] = [
    // Pared del fondo con ventana arqueada, luz natural, cuadro y repisa
    {
      z: -24,
      className: 'room-wall',
      style: { left: '-45%', width: '190%', top: '-30%', height: `${FLOOR + 30}%` },
      delay: 0,
      children: (
        <>
          <div className="room-window" />
          <div className="room-lightbeam" />
          <div className="room-art" />
          <div className="room-shelf">
            <div className="room-shelf-items">
              <span className="room-book" style={{ height: '5.2cqw', background: '#6f7a4a' }} />
              <span className="room-book" style={{ height: '4.4cqw', background: '#c9b28f' }} />
              <span className="room-book" style={{ height: '4.8cqw', background: '#4a3222' }} />
              <span className="room-ceramic" />
            </div>
          </div>
          <div className="room-baseboard" />
        </>
      ),
    },
    // Suelo de madera (plano horizontal)
    {
      z: -24,
      flat: true,
      className: 'room-floor',
      style: { left: '-45%', width: '190%', top: floorTop, height: '120cqw' },
      delay: 0.05,
    },
    // Mancha de luz de la ventana sobre el suelo
    {
      z: -24,
      flat: true,
      className: 'room-floorlight',
      style: { left: '2%', width: '44%', top: floorTop, height: '30cqw' }, lift: 0.1,
      delay: 0.1,
    },
    // Alfombra
    {
      z: -13,
      flat: true,
      className: 'room-rug',
      style: { left: '6%', width: '86%', top: floorTop, height: '30cqw' }, lift: 0.2,
      delay: 0.15,
    },
    // Sombra de contacto del sofá
    {
      z: -21,
      flat: true,
      className: 'room-contact',
      style: { left: '11%', width: '68%', top: floorTop, height: '13cqw' }, lift: 0.3,
      delay: 0.2,
    },
    // Planta
    {
      z: -17,
      className: 'room-plant',
      style: { left: '0%', width: '15%', top: above(34), height: '34cqw' },
      delay: 0.25,
      children: (
        <>
          {[-58, -30, -8, 14, 38, 62].map((rot, i) => (
            <span
              key={rot}
              className="plant-leaf"
              style={{ transform: `rotate(${rot}deg)`, height: `${46 + (i % 3) * 8}%` }}
            />
          ))}
          <div className="plant-pot" />
        </>
      ),
    },
    // Lámpara de arco
    {
      z: -20,
      className: 'room-lamp',
      style: { left: '62%', width: '30%', top: above(58), height: '58cqw' },
      delay: 0.3,
      children: (
        <>
          <div className="lamp-arc" />
          <div className="lamp-glow" />
          <div className="lamp-shade" />
          <div className="lamp-base" />
        </>
      ),
    },
    // Sofá — respaldo y brazos
    {
      z: -20,
      className: 'room-sofa-back',
      style: { left: '13%', width: '64%', top: above(25), height: '25cqw' },
      delay: 0.35,
      children: (
        <>
          <div className="sofa-backrest" />
          <div className="sofa-cushion" style={{ left: '12%' }} />
          <div className="sofa-cushion" style={{ right: '12%' }} />
        </>
      ),
    },
    // Sofá — cojines decorativos
    {
      z: -16,
      className: 'room-sofa-pillows',
      style: { left: '13%', width: '64%', top: above(19), height: '9cqw' },
      delay: 0.45,
      children: (
        <>
          <div className="sofa-pillow" style={{ left: '16%', background: '#6f7a4a', transform: 'rotate(-8deg)' }} />
          <div className="sofa-pillow" style={{ left: '27%', background: '#e9dcc6', transform: 'rotate(5deg)' }} />
          <div className="sofa-pillow" style={{ right: '17%', background: '#9b6b47', transform: 'rotate(7deg)' }} />
        </>
      ),
    },
    // Sofá — asiento, brazos frontales y patas
    {
      z: -12,
      className: 'room-sofa-front',
      style: { left: '13%', width: '64%', top: above(14), height: '14cqw' },
      delay: 0.4,
      children: (
        <>
          <div className="sofa-arm" style={{ left: 0 }} />
          <div className="sofa-arm" style={{ right: 0 }} />
          <div className="sofa-seat" />
          <div className="sofa-throw" />
          <span className="sofa-leg" style={{ left: '7%' }} />
          <span className="sofa-leg" style={{ right: '7%' }} />
        </>
      ),
    },
    // Sombra de la mesa
    {
      z: -6,
      flat: true,
      className: 'room-contact',
      style: { left: '28%', width: '40%', top: floorTop, height: '18cqw' }, lift: 0.3,
      delay: 0.5,
    },
    // Mesa de centro — patas
    {
      z: 0,
      className: 'room-table-legs',
      style: { left: '33%', width: '30%', top: above(7.5), height: '7.5cqw' },
      delay: 0.5,
      children: (
        <>
          <span className="table-leg" style={{ left: '8%' }} />
          <span className="table-leg" style={{ right: '8%' }} />
        </>
      ),
    },
    // Mesa de centro — canto (da grosor a la cubierta)
    {
      z: -6,
      flat: true,
      className: 'room-table-edge',
      style: { left: '30%', width: '36%', top: above(7.5), height: '16cqw' }, lift: -0.9,
      delay: 0.55,
    },
    // Mesa de centro — cubierta (plano horizontal)
    {
      z: -6,
      flat: true,
      className: 'room-table-top',
      style: { left: '30%', width: '36%', top: above(7.5), height: '16cqw' },
      delay: 0.6,
    },
    // Objetos sobre la mesa
    {
      z: 1,
      className: 'room-table-objects',
      style: { left: '30%', width: '36%', top: above(19.5), height: '12cqw' },
      delay: 0.7,
      children: (
        <>
          <div className="table-books">
            <span className="table-book" style={{ background: '#e8dcc8', width: '100%' }} />
            <span className="table-book" style={{ background: '#5f6b3c', width: '88%' }} />
            <span className="table-book" style={{ background: '#2a2724', width: '94%' }} />
          </div>
          <div className="table-vase" />
          <div className="table-branch" style={{ transform: 'rotate(-12deg)' }} />
          <div className="table-branch" style={{ transform: 'rotate(14deg)', height: '70%' }} />
        </>
      ),
    },
  ]

  return (
    <div className={cn('room-frame h-full w-full', className)}>
      <div className="room relative h-full w-full overflow-hidden">
        <div className={cn('room-camera', mode === 'idle' && 'room-camera--idle')}>
          <motion.div
            className="room-stage"
            style={mode === 'interactive' ? { rotateX, rotateY } : { rotateX: BASE_TILT, rotateY: BASE_TURN }}
          >
            {layers.map((layer, index) => (
              <RoomLayer key={index} {...layer} animate={animate} />
            ))}
          </motion.div>
        </div>
        <div className="room-vignette" aria-hidden="true" />
      </div>
    </div>
  )
}
