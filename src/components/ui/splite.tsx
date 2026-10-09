import { Suspense, lazy } from 'react'
import type { Application } from '@splinetool/runtime'

// Carga diferida: el runtime de Spline (~2 MB) solo se descarga si se usa la escena.
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (app: Application) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="loader" role="status" aria-label="Cargando escena 3D" />
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  )
}
