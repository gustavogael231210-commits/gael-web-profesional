import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const STANDALONE_FILE = 'nordica-home-demo.html'

/**
 * Convierte la compilación en UN solo archivo HTML (JS y CSS en línea) que se
 * abre con doble clic, sin servidor. Solo se usa con `--mode standalone`.
 */
function standaloneHtml(): Plugin {
  const escapeScript = (code: string) => code.replace(/<\/script/gi, '<\\/script').replace(/<!--/g, '<\\!--')
  return {
    name: 'nordica-standalone-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const html = bundle['index.html']
      if (!html || html.type !== 'asset') return
      let source = String(html.source)

      source = source.replace(/<script type="module" crossorigin src="\.\/([^"]+)"><\/script>/g, (_tag, file) => {
        const chunk = bundle[file]
        if (!chunk || chunk.type !== 'chunk') throw new Error(`No se encontró ${file}`)
        delete bundle[file]
        return `<script type="module">${escapeScript(chunk.code)}</script>`
      })
      source = source.replace(/<link rel="stylesheet" crossorigin href="\.\/([^"]+)">/g, (_tag, file) => {
        const asset = bundle[file]
        if (!asset || asset.type !== 'asset') throw new Error(`No se encontró ${file}`)
        delete bundle[file]
        return `<style>${String(asset.source)}</style>`
      })

      const favicon = fs.readFileSync(path.resolve(import.meta.dirname, 'public/favicon.svg'), 'utf8')
      source = source
        .replace('href="/favicon.svg"', `href="data:image/svg+xml,${encodeURIComponent(favicon)}"`)
        .replace(/\s*<link rel="apple-touch-icon"[^>]*>/, '')
        .replace(/\s*<!-- Open Graph[\s\S]*?<meta name="twitter:card"[^>]*>/, '')
        

      const leftovers = Object.keys(bundle).filter((file) => file !== 'index.html' && !file.endsWith('.map'))
      if (leftovers.length) throw new Error(`Archivos sin incrustar: ${leftovers.join(', ')}`)

      html.fileName = STANDALONE_FILE
      html.source = source
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const standalone = mode === 'standalone'

  return {
    plugins: [react(), tailwindcss(), standalone && standaloneHtml()],
    resolve: {
      alias: [
        // La demo en un solo archivo no incluye Spline (usa la sala 3D en CSS).
        ...(standalone
          ? [
              {
                find: /^@\/components\/ui\/splite$/,
                replacement: path.resolve(import.meta.dirname, './src/components/ui/splite-standalone.tsx'),
              },
            ]
          : []),
        { find: '@', replacement: path.resolve(import.meta.dirname, './src') },
      ],
    },
    ...(standalone && { base: './', publicDir: false as const }),
    build: standalone
      ? {
          outDir: 'demo',
          emptyOutDir: true,
          modulePreload: false,
          cssCodeSplit: false,
          assetsInlineLimit: Number.MAX_SAFE_INTEGER,
          chunkSizeWarningLimit: 2000,
          rolldownOptions: { output: { codeSplitting: false } },
        }
      : {
          // El runtime de Spline genera fragmentos grandes, pero solo se descargan
          // si se configura VITE_SPLINE_SCENE_URL y el visitante usa escritorio.
          chunkSizeWarningLimit: 700,
          rolldownOptions: {
            output: {
              codeSplitting: {
                groups: [
                  { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
                  { name: 'vendor-motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils)[\\/]/ },
                ],
              },
            },
          },
        },
  }
})
