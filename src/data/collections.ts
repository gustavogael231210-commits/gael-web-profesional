import { unsplash } from '@/lib/images'
import type { CategoryFilter } from '@/types/product'

export interface Collection {
  id: string
  title: string
  description: string
  /** Categoría que se filtra en el catálogo al hacer clic. */
  category: CategoryFilter
  image: { src: string; alt: string }
}

/** Colecciones e imágenes ilustrativas (Unsplash). Edita libremente. */
export const collections: Collection[] = [
  {
    id: 'salas',
    title: 'Salas modernas',
    description: 'Sofás generosos, texturas suaves y una paleta serena para reunirse.',
    category: 'salas',
    image: {
      src: unsplash('photo-1618221195710-dd6b41faaea6'),
      alt: 'Sala moderna con sofá claro, mesa de centro y luz natural',
    },
  },
  {
    id: 'comedores',
    title: 'Comedores contemporáneos',
    description: 'Mesas de madera que invitan a quedarse un rato más.',
    category: 'comedores',
    image: {
      src: unsplash('photo-1600585154526-990dced4db0d'),
      alt: 'Comedor contemporáneo integrado a la cocina con mesa de madera',
    },
  },
  {
    id: 'recamaras',
    title: 'Recámaras acogedoras',
    description: 'Cabeceras tapizadas y tonos cálidos para descansar mejor.',
    category: 'recamaras',
    image: {
      src: unsplash('photo-1616594039964-ae9021a400a0'),
      alt: 'Recámara acogedora con cama, textiles y tonos neutros',
    },
  },
  {
    id: 'oficinas',
    title: 'Oficinas en casa',
    description: 'Escritorios y estanterías para concentrarte con estilo.',
    category: 'escritorios',
    image: {
      src: unsplash('photo-1593062096033-9a26b09da705'),
      alt: 'Oficina en casa con escritorio, silla y luz natural',
    },
  },
  {
    id: 'espacios-pequenos',
    title: 'Espacios pequeños',
    description: 'Piezas compactas y versátiles que aprovechan cada metro.',
    category: 'compactos',
    image: {
      src: unsplash('photo-1522708323590-d24dbb6b0267'),
      alt: 'Departamento compacto con sala luminosa y muebles versátiles',
    },
  },
]

/** Imágenes de la sección Inspiración. */
export const inspirationImages = {
  main: {
    src: unsplash('photo-1600121848594-d8644e57abab'),
    alt: 'Sala luminosa con sofá, mesa de centro y textiles en tonos naturales',
  },
  detail: {
    src: unsplash('photo-1600607687939-ce8a6c25118c'),
    alt: 'Interior contemporáneo con madera, luz natural y decoración sobria',
  },
}
