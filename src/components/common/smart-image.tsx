import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'

import { imageSrcSet, sizedImage } from '@/lib/images'
import { cn } from '@/lib/utils'

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string
  alt: string
  /** Ancho por defecto solicitado al CDN. */
  width?: number
  /** `sizes` del srcset responsive. */
  sizes?: string
  /** Clases del contenedor (que reserva el espacio y evita saltos de diseño). */
  wrapperClassName?: string
  priority?: boolean
}

/**
 * Imagen con:
 * - srcset responsive para Unsplash,
 * - carga diferida (salvo `priority`),
 * - esqueleto mientras carga,
 * - respaldo elegante si la URL falla.
 */
export function SmartImage({
  src,
  alt,
  width = 1080,
  sizes = '100vw',
  className,
  wrapperClassName,
  priority = false,
  ...props
}: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  return (
    <div className={cn('relative overflow-hidden bg-muted', wrapperClassName)}>
      {status === 'loading' && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {status === 'error' ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(120%_90%_at_30%_10%,#f6efe3,#e6d8c2)] p-6 text-center"
        >
          <ImageOff className="size-6 text-walnut/60" aria-hidden="true" />
          <span className="max-w-[24ch] font-serif text-lg leading-snug text-walnut/80 italic">{alt}</span>
        </div>
      ) : (
        <img
          src={sizedImage(src, width)}
          srcSet={imageSrcSet(src)}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700',
            status === 'loaded' ? 'opacity-100' : 'opacity-0',
            className,
          )}
          {...props}
        />
      )}
    </div>
  )
}
