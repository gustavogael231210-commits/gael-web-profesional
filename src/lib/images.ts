/**
 * Utilidades para imágenes de Unsplash (CDN con redimensionado por parámetros).
 * Si usas tus propias fotos (p. ej. /images/sofa-oslo.webp), se devuelven sin cambios.
 */
const UNSPLASH_HOST = 'images.unsplash.com'

function isUnsplash(src: string) {
  try {
    return new URL(src).host === UNSPLASH_HOST
  } catch {
    return false
  }
}

export function sizedImage(src: string, width: number, quality = 72): string {
  if (!isUnsplash(src)) return src
  const url = new URL(src)
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality))
  return url.toString()
}

export function imageSrcSet(src: string, widths: number[] = [480, 768, 1080, 1440]): string | undefined {
  if (!isUnsplash(src)) return undefined
  return widths.map((w) => `${sizedImage(src, w)} ${w}w`).join(', ')
}

/** Atajo para fotos de Unsplash a partir de su identificador. */
export function unsplash(id: string): string {
  return `https://${UNSPLASH_HOST}/${id}`
}
