# NÓRDICA HOME — Demostración interactiva

> Diseño que transforma tu espacio

**NÓRDICA HOME es una demostración local.** No es un sitio publicado ni un negocio real: la marca, los productos, los precios, las imágenes y el número de contacto son ficticios. No hay pagos, pedidos ni envío de datos.

La demo incluye: portada con sala 3D interactiva, catálogo con búsqueda, filtros y orden por precio, fichas de producto, "Mi selección", animaciones, menú móvil y botones de WhatsApp que muestran una **vista previa del mensaje** (no abren WhatsApp).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS 4 · shadcn/ui (Radix) · Framer Motion · Lucide · Spline (opcional)

---

## Opción A — Abrir el archivo HTML (lo más fácil)

No necesitas instalar nada.

1. Descarga el archivo **`demo/nordica-home-demo.html`** (está en esta carpeta del proyecto).
2. Haz doble clic sobre él. Se abrirá en tu navegador (Chrome, Edge, Firefox o Safari).
3. ¡Listo! Ya puedes probar todo.

Notas:
- Las **fotos** y las **tipografías** se cargan de internet (Unsplash y Google Fonts). Sin conexión, la demo sigue funcionando: las fotos se sustituyen por un recuadro con su descripción y el texto usa una tipografía del sistema.
- Este archivo no incluye Spline: siempre muestra la **sala 3D hecha con CSS**.
- "Mi selección" se guarda en tu navegador. Algunos navegadores (sobre todo Safari) limitan eso en archivos abiertos con doble clic; si pasa, la lista funciona pero se vacía al recargar.

## Opción B — Ejecutar el proyecto en tu computadora

### 1. Instala Node.js (una sola vez)
Descarga la versión **LTS** desde [nodejs.org](https://nodejs.org) e instálala. Se necesita Node 20.19 o superior (o 22.12+). Para comprobarlo, abre una terminal y escribe:

```bash
node -v
```

### 2. Descarga el proyecto
- **Con Git:**
  ```bash
  git clone -b claude/add-ui-ux-pro-max-skill https://github.com/gustavogael231210-commits/gael-web-profesional.git
  cd gael-web-profesional
  ```
- **Sin Git:** en GitHub, elige la rama `claude/add-ui-ux-pro-max-skill`, pulsa **Code → Download ZIP**, descomprime y abre una terminal dentro de la carpeta.

### 3. Instala las dependencias (una sola vez)
```bash
npm install
```

### 4. Inicia la demo
```bash
npm run dev
```
La terminal mostrará una dirección como `http://localhost:5173/`. Ábrela en tu navegador (o pulsa `o` + Enter en la terminal).

### 5. Para detenerla
En la terminal, pulsa **Ctrl + C**.

### Probarla en tu celular (opcional)
Con la computadora y el celular en la **misma red Wi-Fi**:
```bash
npm run dev -- --host
```
Abre en el celular la dirección que aparece como **Network** (por ejemplo `http://192.168.1.20:5173/`). Solo es visible dentro de tu red; no se publica en internet.

### Versión optimizada (opcional)
```bash
npm run demo
```
Compila la versión final y la abre en `http://localhost:4173/`.

---

## Qué probar

- **Portada:** mueve el cursor sobre la sala 3D (en el celular se balancea sola). Botones "Explorar colección" y "Descubrir nuestros muebles".
- **Menú:** enlaces de navegación; en pantalla estrecha, el botón ☰ abre el menú móvil.
- **Búsqueda:** icono de lupa del menú (resultados en vivo; Enter filtra el catálogo) o el buscador del catálogo. Funciona sin acentos: "sofa", "napoles".
- **Filtros:** categorías, "Espacios pequeños" y orden por precio. "Limpiar filtros" lo deja todo como al principio.
- **Colecciones:** al pulsar una, el catálogo se filtra solo.
- **Fichas de producto:** "Ver detalles" abre la ficha; elige un color; Esc o la X la cierran.
- **Mi selección:** "Agregar a mi selección" en una ficha y luego el icono de bolsa del menú; cambia cantidades.
- **WhatsApp (modo demostración):** cualquier botón de WhatsApp muestra el mensaje que se enviaría, con el producto y el color elegido. Nada se envía.
- **Contacto:** envía el formulario vacío para ver la validación; complétalo para ver la vista previa del mensaje.
- **Accesibilidad:** navegación con Tab; si tu sistema tiene activado "reducir movimiento", las animaciones se desactivan.

---

## Regenerar el archivo HTML independiente

Si cambias algo del proyecto y quieres actualizar `demo/nordica-home-demo.html`:

```bash
npm run build:standalone
```

Incrusta todo el JavaScript y el CSS en ese único archivo.

## Comandos

| Comando                    | Qué hace                                                    |
| -------------------------- | ----------------------------------------------------------- |
| `npm run dev`              | Demo en desarrollo con recarga automática (`localhost:5173`) |
| `npm run demo`             | Compila y abre la versión optimizada (`localhost:4173`)     |
| `npm run build:standalone` | Genera `demo/nordica-home-demo.html` (un solo archivo)      |
| `npm run build`            | Compila la versión optimizada en `dist/`                    |
| `npm test`                 | Pruebas unitarias                                           |
| `npm run lint`             | Revisión de código                                          |
| `npm run typecheck`        | Verificación de tipos                                       |

---

## Modo demostración

En `src/config/site.ts`, `demoMode: true` hace que los enlaces de WhatsApp muestren una vista previa del mensaje en lugar de abrir WhatsApp. El número `5210000000000` es ficticio.

## Sala 3D y Spline

La portada usa una **sala 3D hecha con CSS** (perspectiva real, sin WebGL). Spline sigue integrado como opción (`src/components/ui/splite.tsx`), pero no hay ninguna escena configurada: la variable `VITE_SPLINE_SCENE_URL` de `.env` está vacía, y así la portada no descarga nada de Spline.

Si algún día quieres probar una escena tuya en local, pega su URL `.splinecode` en `.env`:

```
VITE_SPLINE_SCENE_URL=<pega aquí la URL .splinecode de tu escena>
```

Solo se usa en escritorio. Si la escena falla o tarda más de 15 s, se queda la sala CSS; si el valor no es una URL `https://` válida, se ignora.

## Dónde cambiar cada cosa

| Quiero cambiar…                          | Archivo                                |
| ---------------------------------------- | -------------------------------------- |
| Productos, precios, medidas, colores, fotos | `src/data/products.ts`              |
| Colecciones e imágenes de inspiración    | `src/data/collections.ts`              |
| Nombre, eslogan, modo demostración       | `src/config/site.ts`                   |
| Textos de los mensajes de WhatsApp       | `src/lib/whatsapp.ts`                  |
| Colores y tipografías                    | `src/index.css` (sección `:root`)      |

Las fotos son ilustrativas (Unsplash), no productos reales. Para usar fotos propias, ponlas en `public/images/` y usa `image: { src: '/images/mi-foto.webp', alt: '…' }`.

## Sobre la publicación

Este proyecto **no se publica**. Archivos como `netlify.toml`, las etiquetas Open Graph o `robots.txt` se conservan del proyecto original, pero no se usan en la demo local.

## Estructura

```
demo/nordica-home-demo.html  # Demo en un solo archivo (se genera con build:standalone)
src/
├── App.tsx                  # Composición de la página
├── config/site.ts           # Marca, modo demostración, Spline
├── data/                    # Productos, categorías y colecciones
├── lib/                     # WhatsApp, filtros, formato MXN, imágenes (+ pruebas)
├── context/                 # Catálogo, "Mi selección" y vista previa de WhatsApp
├── hooks/                   # Media queries, scroll, sección activa
└── components/
    ├── ui/                  # shadcn/ui (button, card, dialog, sheet…), splite, spotlight
    ├── hero/                # Portada, sala 3D en CSS, integración con Spline
    ├── catalog/             # Tarjeta, filtros, ficha de producto, precio
    ├── sections/            # Colecciones, destacados, inspiración, nosotros, contacto
    ├── layout/              # Menú, buscador, pie de página, botón flotante
    └── quote/               # Panel "Mi selección"
```
