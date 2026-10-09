import { unsplash } from '@/lib/images'
import type { Category, CategoryFilter, Product } from '@/types/product'

/**
 * CATÁLOGO DE DEMOSTRACIÓN
 * ------------------------------------------------------------------
 * Productos, precios (MXN), medidas e imágenes son de ejemplo.
 * Para editar el catálogo modifica este arreglo: el sitio se actualiza solo.
 *
 * Imágenes: fotografías ilustrativas de Unsplash (no son productos reales de la marca).
 * Para usar fotos propias, colócalas en /public/images y usa p. ej.
 *   image: { src: '/images/sofa-oslo.webp', alt: 'Sofá Oslo color arena' }
 */

export const categories: Category[] = [
  { id: 'sofas', label: 'Sofás y sillones' },
  { id: 'salas', label: 'Salas modernas' },
  { id: 'comedores', label: 'Comedores' },
  { id: 'mesas-sillas', label: 'Mesas y sillas' },
  { id: 'recamaras', label: 'Camas y recámaras' },
  { id: 'escritorios', label: 'Escritorios' },
  { id: 'tv', label: 'Muebles para TV' },
  { id: 'libreros', label: 'Libreros y estanterías' },
  { id: 'decorativos', label: 'Muebles decorativos' },
]

export const categoryLabel = (id: CategoryFilter) => {
  if (id === 'todas') return 'Todo'
  if (id === 'compactos') return 'Espacios pequeños'
  return categories.find((category) => category.id === id)?.label ?? id
}

export const products: Product[] = [
  {
    id: 'p-001',
    slug: 'sofa-oslo',
    name: 'Sofá Oslo',
    article: 'el',
    category: 'sofas',
    price: 24900,
    shortDescription: 'Tres plazas de líneas limpias y asiento profundo.',
    description:
      'Un sofá de tres plazas con proporciones generosas, cojines de respaldo independientes y patas de madera ligeramente inclinadas. Pensado para tardes largas de conversación y descanso.',
    materials: ['Estructura de madera de pino tratada', 'Espuma de alta densidad', 'Tela tipo lino lavable', 'Patas de madera de nogal'],
    dimensions: { width: 220, depth: 95, height: 82 },
    colors: [
      { name: 'Arena', hex: '#d8c6a8' },
      { name: 'Oliva', hex: '#6f7a4a' },
      { name: 'Carbón', hex: '#3a3633' },
    ],
    badge: 'Nuevo',
    featured: true,
    image: {
      src: unsplash('photo-1555041469-a586c61ea9bc'),
      alt: 'Sofá tapizado de tres plazas con cojines frente a una pared clara',
    },
  },
  {
    id: 'p-002',
    slug: 'sillon-aura',
    name: 'Sillón Aura',
    article: 'el',
    category: 'sofas',
    price: 9800,
    shortDescription: 'Formas envolventes para tu rincón de lectura.',
    description:
      'Sillón individual de respaldo curvo y brazos suaves que abrazan el cuerpo. Su silueta compacta lo hace ideal para recámaras, estudios o como acento en la sala.',
    materials: ['Estructura de madera maciza', 'Espuma moldeada', 'Tela bouclé', 'Base de madera de roble'],
    dimensions: { width: 78, depth: 80, height: 76 },
    colors: [
      { name: 'Marfil', hex: '#efe7da' },
      { name: 'Arena', hex: '#d8c6a8' },
      { name: 'Terracota', hex: '#b5714e' },
    ],
    featured: true,
    compact: true,
    image: {
      src: unsplash('photo-1586023492125-27b2c045efd7'),
      alt: 'Sillón tapizado en un interior luminoso con decoración contemporánea',
    },
  },
  {
    id: 'p-003',
    slug: 'mesa-de-centro-roble',
    name: 'Mesa de centro Roble',
    article: 'la',
    category: 'mesas-sillas',
    price: 7450,
    shortDescription: 'Madera natural con bordes redondeados.',
    description:
      'Mesa de centro de cubierta ovalada y patas robustas. La veta natural de la madera aporta calidez y se integra con estilos nórdicos, japandi o contemporáneos.',
    materials: ['Chapa de roble natural', 'Tablero MDF de alta densidad', 'Acabado mate al agua'],
    dimensions: { width: 110, depth: 60, height: 38 },
    colors: [
      { name: 'Roble natural', hex: '#c49a6c' },
      { name: 'Nogal', hex: '#6b4a33' },
    ],
    compact: true,
    image: {
      src: unsplash('photo-1532372320572-cda25653a26d'),
      alt: 'Mesa de madera natural con objetos decorativos',
    },
  },
  {
    id: 'p-004',
    slug: 'comedor-napoles',
    name: 'Comedor Nápoles',
    article: 'el',
    category: 'comedores',
    price: 38500,
    compareAtPrice: 42900,
    shortDescription: 'Mesa para seis personas y presencia escultórica.',
    description:
      'Comedor de mesa rectangular con esquinas suavizadas y base de madera sólida. Su cubierta amplia permite reuniones de hasta seis personas con comodidad.',
    materials: ['Cubierta de chapa de nogal', 'Base de madera maciza', 'Barniz resistente a manchas'],
    dimensions: { width: 200, depth: 95, height: 76 },
    colors: [
      { name: 'Nogal', hex: '#6b4a33' },
      { name: 'Roble claro', hex: '#d2b48c' },
    ],
    badge: 'Promoción',
    featured: true,
    image: {
      src: unsplash('photo-1617806118233-18e1de247200'),
      alt: 'Comedor contemporáneo con mesa de madera y sillas en un espacio iluminado',
    },
  },
  {
    id: 'p-005',
    slug: 'silla-siena',
    name: 'Silla Siena',
    article: 'la',
    category: 'mesas-sillas',
    price: 3290,
    shortDescription: 'Madera curvada y asiento ergonómico.',
    description:
      'Silla de comedor con respaldo curvo y asiento ligeramente contorneado. Ligera, resistente y fácil de combinar con distintas mesas.',
    materials: ['Madera de fresno', 'Asiento tapizado opcional', 'Acabado mate'],
    dimensions: { width: 48, depth: 52, height: 80 },
    colors: [
      { name: 'Natural', hex: '#d6b88f' },
      { name: 'Nogal', hex: '#6b4a33' },
      { name: 'Negro carbón', hex: '#2a2724' },
    ],
    compact: true,
    image: {
      src: unsplash('photo-1503602642458-232111445657'),
      alt: 'Silla de madera de diseño minimalista sobre fondo claro',
    },
  },
  {
    id: 'p-006',
    slug: 'cama-boreal',
    name: 'Cama Boreal',
    article: 'la',
    category: 'recamaras',
    price: 21900,
    shortDescription: 'Cabecera tapizada y base flotante.',
    description:
      'Cama matrimonial o king size con cabecera acolchada de altura media y base de apariencia flotante. Un refugio sereno para descansar.',
    materials: ['Estructura de madera de pino', 'Cabecera tapizada en tela texturizada', 'Base de tambor reforzada'],
    dimensions: { width: 170, depth: 215, height: 110 },
    colors: [
      { name: 'Arena', hex: '#d8c6a8' },
      { name: 'Gris piedra', hex: '#9b958c' },
      { name: 'Oliva', hex: '#6f7a4a' },
    ],
    badge: 'Nuevo',
    featured: true,
    image: {
      src: unsplash('photo-1505693416388-ac5ce068fe85'),
      alt: 'Recámara acogedora con cama vestida en tonos neutros',
    },
  },
  {
    id: 'p-007',
    slug: 'escritorio-studio',
    name: 'Escritorio Studio',
    article: 'el',
    category: 'escritorios',
    price: 11200,
    shortDescription: 'Superficie amplia con cajón para orden diario.',
    description:
      'Escritorio de líneas sencillas con cajón frontal y paso para cables. Proporciones pensadas para trabajar en casa sin perder la estética del espacio.',
    materials: ['Cubierta de chapa de roble', 'Patas de madera maciza', 'Correderas metálicas de cierre suave'],
    dimensions: { width: 130, depth: 60, height: 75 },
    colors: [
      { name: 'Roble natural', hex: '#c49a6c' },
      { name: 'Blanco marfil', hex: '#f3ede2' },
    ],
    compact: true,
    image: {
      src: unsplash('photo-1524758631624-e2822e304c36'),
      alt: 'Oficina en casa con escritorio de madera, silla y plantas',
    },
  },
  {
    id: 'p-008',
    slug: 'mueble-tv-horizon',
    name: 'Mueble de TV Horizon',
    article: 'el',
    category: 'tv',
    price: 14600,
    compareAtPrice: 16200,
    shortDescription: 'Línea baja con puertas acanaladas.',
    description:
      'Mueble para televisión de perfil bajo con puertas de frente acanalado y compartimentos para equipos. Mantiene el orden y aporta textura a la pared principal.',
    materials: ['Chapa de nogal', 'Frentes acanalados', 'Herrajes de cierre suave'],
    dimensions: { width: 180, depth: 42, height: 50 },
    colors: [
      { name: 'Nogal', hex: '#6b4a33' },
      { name: 'Roble claro', hex: '#d2b48c' },
    ],
    badge: 'Promoción',
    image: {
      src: unsplash('photo-1600210492486-724fe5c67fb0'),
      alt: 'Sala contemporánea con mueble bajo de madera y decoración neutra',
    },
  },
  {
    id: 'p-009',
    slug: 'librero-fiordo',
    name: 'Librero Fiordo',
    article: 'el',
    category: 'libreros',
    price: 12800,
    shortDescription: 'Repisas abiertas para libros y objetos.',
    description:
      'Librero de cinco niveles con estructura ligera y repisas de madera. Funciona como divisor de ambientes o como vitrina para tus objetos favoritos.',
    materials: ['Repisas de madera de roble', 'Estructura metálica con pintura electrostática'],
    dimensions: { width: 90, depth: 35, height: 190 },
    colors: [
      { name: 'Roble y negro', hex: '#9c7a55' },
      { name: 'Nogal y negro', hex: '#5c4030' },
    ],
    compact: true,
    image: {
      src: unsplash('photo-1594620302200-9a762244a156'),
      alt: 'Librero con libros y objetos decorativos en un interior',
    },
  },
  {
    id: 'p-010',
    slug: 'consola-alba',
    name: 'Consola Alba',
    article: 'la',
    category: 'decorativos',
    price: 6900,
    shortDescription: 'Una pieza de acento para recibidores.',
    description:
      'Consola de proporciones esbeltas para recibidores, pasillos o detrás del sofá. Su cubierta estrecha sostiene lámparas, libros o una composición de objetos.',
    materials: ['Madera de fresno', 'Acabado aceitado natural'],
    dimensions: { width: 120, depth: 35, height: 78 },
    colors: [
      { name: 'Fresno natural', hex: '#d9bf98' },
      { name: 'Negro carbón', hex: '#2a2724' },
    ],
    badge: 'Edición limitada',
    compact: true,
    image: {
      src: unsplash('photo-1616486338812-3dadae4b4ace'),
      alt: 'Interior contemporáneo con muebles de madera y piezas decorativas',
    },
  },
  {
    id: 'p-011',
    slug: 'sala-modular-lund',
    name: 'Sala modular Lund',
    article: 'la',
    category: 'salas',
    price: 46900,
    shortDescription: 'Módulos que se adaptan a tu espacio.',
    description:
      'Sala modular en forma de L con chaise reversible. Sus módulos se reorganizan según la distribución de tu sala, de un depa compacto a un espacio amplio.',
    materials: ['Estructura de madera tratada', 'Espuma de alta resiliencia', 'Tela antimanchas', 'Cubiertas desenfundables'],
    dimensions: { width: 290, depth: 165, height: 80 },
    colors: [
      { name: 'Arena', hex: '#d8c6a8' },
      { name: 'Gris piedra', hex: '#9b958c' },
    ],
    image: {
      src: unsplash('photo-1493663284031-b7e3aefcae8e'),
      alt: 'Sala moderna con sofá amplio, mesa de centro y luz natural',
    },
  },
]

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug)
