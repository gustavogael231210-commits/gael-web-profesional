/**
 * URL de la escena de Spline tomada de VITE_SPLINE_SCENE_URL.
 * Solo se acepta una URL https válida; si falta o está mal escrita se devuelve ''
 * y la portada usa la sala 3D hecha con CSS.
 */
function readSplineSceneUrl(): string {
  const raw = (import.meta.env.VITE_SPLINE_SCENE_URL as string | undefined)?.trim() ?? ''
  if (!raw) return ''
  try {
    const url = new URL(raw)
    if (url.protocol === 'https:') return url.toString()
  } catch {
    // Valor no válido: se ignora.
  }
  if (import.meta.env.DEV) {
    console.warn(`VITE_SPLINE_SCENE_URL no es una URL https válida ("${raw}"); se usa la sala 3D en CSS.`)
  }
  return ''
}

/**
 * Configuración central del sitio.
 * Cambia aquí los datos de contacto y la marca; el resto del sitio los lee de este archivo.
 */
export const siteConfig = {
  name: 'NÓRDICA HOME',
  slogan: 'Diseño que transforma tu espacio',
  description:
    'Muebles modernos para el hogar: sofás, salas, comedores, recámaras, escritorios y piezas decorativas con diseño contemporáneo, comodidad y personalidad.',

  /**
   * Número de WhatsApp en formato internacional, solo dígitos (sin +, espacios ni guiones).
   * México: 52 + 1 + número a 10 dígitos (p. ej. 5215512345678).
   * ⚠️ IMPORTANTE: 5210000000000 es un MARCADOR. Sustitúyelo por el número real antes de publicar.
   */
  whatsappNumber: '5210000000000',

  /** Correo de contacto. Déjalo vacío para no mostrarlo. */
  email: '',

  /** Ciudad o zona de atención. Déjala vacía para no mostrarla. */
  serviceArea: '',

  /**
   * Muestra el aviso "productos y precios de demostración" en el pie de página.
   * Cámbialo a `false` cuando cargues tu catálogo real.
   */
  showDemoNotice: true,

  /**
   * Escena 3D de Spline (.splinecode) para el hero. Se toma de la variable VITE_SPLINE_SCENE_URL.
   * Si está vacía, se muestra la sala 3D construida con CSS (más ligera).
   */
  splineSceneUrl: readSplineSceneUrl(),
} as const

export const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#catalogo', label: 'Catálogo' },
  { href: '#colecciones', label: 'Colecciones' },
  { href: '#inspiracion', label: 'Inspiración' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
] as const
