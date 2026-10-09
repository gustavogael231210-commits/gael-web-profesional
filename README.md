# NÓRDICA HOME — Tienda web de muebles

> Diseño que transforma tu espacio

Sitio web premium para una tienda de muebles modernos: hero con sala 3D interactiva, catálogo con búsqueda, filtros y orden por precio, fichas de producto, lista de cotización y consultas por WhatsApp. Precios en pesos mexicanos (MXN).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · shadcn/ui (Radix) · Framer Motion · Lucide · Spline (opcional)

---

## Inicio rápido

Requisitos: Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
```

| Comando             | Qué hace                                              |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Desarrollo con recarga en caliente                    |
| `npm run build`     | Verifica TypeScript y genera la versión de producción en `dist/` |
| `npm run preview`   | Sirve `dist/` localmente para revisarlo               |
| `npm test`          | Pruebas unitarias (WhatsApp, filtros, precios)        |
| `npm run lint`      | Revisión de código con oxlint                         |
| `npm run typecheck` | Solo verificación de tipos                            |

---

## Dónde cambiar cada cosa

| Quiero cambiar…                         | Archivo                                   |
| --------------------------------------- | ----------------------------------------- |
| **Número de WhatsApp**                  | `src/config/site.ts` → `whatsappNumber`   |
| Correo, zona de servicio, aviso de demo | `src/config/site.ts`                      |
| **Productos, precios, medidas, colores, imágenes** | `src/data/products.ts`         |
| Categorías                              | `src/data/products.ts` → `categories`     |
| Colecciones e imágenes de inspiración   | `src/data/collections.ts`                 |
| Textos de los mensajes de WhatsApp      | `src/lib/whatsapp.ts`                     |
| Colores y tipografías de la marca       | `src/index.css` (sección `:root`)         |
| Título, descripción SEO, Open Graph     | `index.html`                              |
| Escena 3D de Spline                     | Variable `VITE_SPLINE_SCENE_URL` (ver abajo) |

### WhatsApp

`5210000000000` es un **marcador**. Sustitúyelo en `src/config/site.ts` por el número real en formato internacional, solo dígitos (México: `52` + `1` + 10 dígitos, p. ej. `5215512345678`). Todos los botones usan ese valor.

### Productos e imágenes

Cada producto en `src/data/products.ts` tiene nombre, artículo (`el`/`la`, para los mensajes), categoría, precio en MXN (y precio anterior opcional para promociones), descripción, materiales, medidas en cm, colores, etiqueta opcional e imagen.

Las imágenes actuales son **fotografías ilustrativas de Unsplash**, no productos reales de la marca. Para usar fotos propias, colócalas en `public/images/` y usa:

```ts
image: { src: '/images/sofa-oslo.webp', alt: 'Sofá Oslo color arena en una sala luminosa' },
```

Si una imagen no carga, el sitio muestra un respaldo elegante con el texto alternativo.

Cuando cargues el catálogo real, cambia `showDemoNotice` a `false` en `src/config/site.ts`.

### Escena 3D

El hero muestra una **sala 3D construida con CSS** (perspectiva real, sin WebGL). Sigue el cursor en escritorio, se balancea suavemente en móviles y queda estática si el usuario activó "reducir movimiento".

Para usar una escena propia de [Spline](https://spline.design): en Spline, *Export → Code → React*, copia la URL `.splinecode` y defínela en `.env`:

```
VITE_SPLINE_SCENE_URL=<pega aquí la URL .splinecode de tu escena>
```

La escena solo se descarga en escritorio (puntero fino, sin "reducir movimiento" ni ahorro de datos), en diferido. Mientras carga, o si falla o tarda más de 15 s, se mantiene la sala CSS.

Mientras no tengas una escena, deja la variable vacía: la portada usa la sala CSS y no descarga nada de Spline. Si el valor no es una URL `https://` válida, se ignora.

---

## Publicar

### Netlify
1. Sube el repositorio a GitHub.
2. En Netlify: *Add new site → Import from Git* y elige el repositorio. `netlify.toml` ya define `npm run build` y la carpeta `dist`.
3. En *Site configuration → Environment variables* añade `VITE_SITE_URL` (tu dominio, sin `/` final) y, si la usas, `VITE_SPLINE_SCENE_URL`.

### Vercel
1. En Vercel: *Add New → Project* e importa el repositorio. Detecta Vite automáticamente (build `npm run build`, salida `dist`).
2. Añade las mismas variables de entorno en *Settings → Environment Variables*.

Cualquier cambio en las variables requiere volver a desplegar.

---

## Qué es real y qué es demostrativo

**Funciona de verdad**
- Búsqueda por nombre (sin importar acentos), filtros por categoría y "espacios pequeños", orden por precio.
- Fichas de producto en ventana modal accesible, con enlace directo (`/?producto=sofa-oslo`).
- Enlaces de WhatsApp con mensajes predefinidos y codificados (producto, color, lista de cotización y formulario de contacto).
- "Mi selección": lista de piezas para cotizar, guardada en el navegador del visitante (`localStorage`).

**Demostrativo / pendiente**
- Productos, precios, medidas e imágenes son de ejemplo.
- No hay pagos en línea, inventario, cuentas de cliente ni envío de pedidos: las compras se coordinan por WhatsApp.
- El formulario de contacto no guarda datos; solo abre WhatsApp con el mensaje.

## Antes de vender muebles reales

- [ ] Número real de WhatsApp en `src/config/site.ts`.
- [ ] Catálogo real: fotos propias, precios, medidas, materiales y disponibilidad.
- [ ] `showDemoNotice: false`.
- [ ] Dominio propio y `VITE_SITE_URL` para las vistas previas en redes.
- [ ] Aviso de privacidad y términos y condiciones (políticas de entrega, devoluciones y garantía).
- [ ] Si quieres cobrar en línea: integrar una pasarela (p. ej. Stripe, Mercado Pago o Shopify) y gestión de inventario y pedidos.
- [ ] Analítica (p. ej. Google Analytics o Plausible) y alta en Google Search Console.

## Estructura

```
src/
├── App.tsx                  # Composición de la página
├── config/site.ts           # Marca, WhatsApp, Spline
├── data/                    # Productos, categorías y colecciones
├── lib/                     # WhatsApp, filtros, formato MXN, imágenes (+ pruebas)
├── context/                 # Estado del catálogo y de "Mi selección"
├── hooks/                   # Media queries, scroll, sección activa
└── components/
    ├── ui/                  # shadcn/ui (button, card, dialog, sheet…), splite, spotlight
    ├── hero/                # Hero, sala 3D CSS, integración con Spline
    ├── catalog/             # Tarjeta, filtros, modal de producto, precio
    ├── sections/            # Colecciones, destacados, inspiración, nosotros, contacto
    ├── layout/              # Navbar, buscador, footer, botón flotante
    └── quote/               # Panel "Mi selección"
```

Los componentes de shadcn/ui están en `src/components/ui` y se configuraron siguiendo su instalación manual (`components.json` incluido), así que `npx shadcn@latest add <componente>` funciona para añadir más.
