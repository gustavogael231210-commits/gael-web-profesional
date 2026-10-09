import { Component, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, type MotionValue } from 'framer-motion'

import { Room3D } from '@/components/hero/room-3d'
import { SplineScene } from '@/components/ui/splite'
import { siteConfig } from '@/config/site'
import { useMediaQuery } from '@/hooks/use-media-query'

/** Si la escena de Spline falla, se mantiene la sala CSS. */
class SplineErrorBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

const SPLINE_TIMEOUT_MS = 15000

function prefersLightweight(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return Boolean(connection?.saveData)
}

/**
 * Visual del hero:
 * - Siempre renderiza la sala 3D en CSS (ligera, sin descargas extra).
 * - Si hay una escena de Spline configurada, en escritorio con puntero fino y sin
 *   "reducir movimiento" ni ahorro de datos, la carga en diferido por encima y
 *   la muestra cuando termina. Si falla o tarda demasiado, queda la sala CSS.
 */
export function HeroVisual({
  pointerX,
  pointerY,
}: {
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
}) {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const canUseSpline = Boolean(siteConfig.splineSceneUrl) && desktop && finePointer && !reducedMotion
  const [splineState, setSplineState] = useState<'idle' | 'loading' | 'ready' | 'failed'>('idle')

  // Monta Spline cuando el navegador está libre para no competir con la carga inicial.
  useEffect(() => {
    if (!canUseSpline || prefersLightweight() || splineState !== 'idle') return
    const start = () => setSplineState('loading')
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = globalThis.setTimeout(start, 1200)
    return () => globalThis.clearTimeout(id)
  }, [canUseSpline, splineState])

  useEffect(() => {
    if (splineState !== 'loading') return
    const id = window.setTimeout(() => setSplineState('failed'), SPLINE_TIMEOUT_MS)
    return () => window.clearTimeout(id)
  }, [splineState])

  const mode = reducedMotion ? 'static' : finePointer ? 'interactive' : 'idle'
  const showSpline = canUseSpline && (splineState === 'loading' || splineState === 'ready')

  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: splineState === 'ready' ? 0 : 1 }}
        transition={{ duration: 0.8 }}
      >
        <Room3D pointerX={pointerX} pointerY={pointerY} mode={mode} />
      </motion.div>

      {showSpline && (
        <SplineErrorBoundary onError={() => setSplineState('failed')}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: splineState === 'ready' ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            <SplineScene
              scene={siteConfig.splineSceneUrl}
              className="h-full w-full"
              onLoad={() => setSplineState('ready')}
            />
          </motion.div>
        </SplineErrorBoundary>
      )}

      <AnimatePresence>
        {splineState === 'loading' && (
          <motion.div
            className="pointer-events-none absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-ivory/90 px-3 py-1.5 text-xs text-muted-foreground shadow-soft backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="status"
          >
            <span className="loader !size-3.5 !border" aria-hidden="true" />
            Cargando escena 3D…
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
