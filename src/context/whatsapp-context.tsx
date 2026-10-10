import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Check, Copy } from 'lucide-react'

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { siteConfig } from '@/config/site'

const WHATSAPP_PREFIX = 'https://wa.me/'

interface WhatsAppContextValue {
  /** Abre WhatsApp, o la vista previa si el sitio está en modo demostración. */
  openWhatsApp: (url: string) => void
}

const WhatsAppContext = createContext<WhatsAppContextValue | null>(null)

/**
 * En modo demostración intercepta todos los enlaces a wa.me de la página
 * (tarjetas, fichas, selección, menú, pie, botón flotante…) y muestra el
 * mensaje generado en lugar de abrir WhatsApp.
 */
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const openWhatsApp = useCallback((url: string) => {
    if (siteConfig.demoMode) setPreviewUrl(url)
    else window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  useEffect(() => {
    if (!siteConfig.demoMode) return
    const intercept = (event: MouseEvent) => {
      if (event.button > 1) return
      const anchor = (event.target as Element | null)?.closest?.('a[href]')
      const href = anchor?.getAttribute('href')
      if (!href?.startsWith(WHATSAPP_PREFIX)) return
      event.preventDefault()
      setPreviewUrl(href)
    }
    document.addEventListener('click', intercept, true)
    document.addEventListener('auxclick', intercept, true)
    return () => {
      document.removeEventListener('click', intercept, true)
      document.removeEventListener('auxclick', intercept, true)
    }
  }, [])

  const value = useMemo(() => ({ openWhatsApp }), [openWhatsApp])

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
      <WhatsAppPreview url={previewUrl} onClose={() => setPreviewUrl(null)} />
    </WhatsAppContext.Provider>
  )
}

function WhatsAppPreview({ url, onClose }: { url: string | null; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const message = useMemo(() => {
    if (!url) return ''
    try {
      return new URL(url).searchParams.get('text') ?? ''
    } catch {
      return ''
    }
  }, [url])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Dialog
      open={url !== null}
      onOpenChange={(open) => {
        if (!open) {
          setCopied(false)
          onClose()
        }
      }}
    >
      <DialogContent className="max-w-md gap-5 sm:rounded-3xl">
        <DialogHeader className="pr-10">
          <p className="eyebrow">Modo demostración</p>
          <DialogTitle>Mensaje de WhatsApp</DialogTitle>
          <DialogDescription>
            Así se vería el mensaje que el visitante enviaría. En esta demostración no se abre WhatsApp ni se envía
            nada.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl bg-[#e9e2d4] p-4">
          <div className="ml-auto max-w-[92%] rounded-2xl rounded-tr-sm bg-[#dcf2c8] px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-charcoal shadow-soft">
            {message || 'Sin mensaje'}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <WhatsAppIcon className="size-3.5" />
            Para: +{siteConfig.whatsappNumber} (número ficticio)
          </p>
        </div>

        <details className="text-xs text-muted-foreground">
          <summary className="cursor-pointer font-medium text-charcoal">Ver enlace generado</summary>
          <p className="mt-2 rounded-xl bg-muted p-3 font-mono break-all">{url}</p>
        </details>

        <DialogFooter>
          <Button variant="outline" onClick={copy}>
            {copied ? <Check /> : <Copy />}
            {copied ? 'Copiado' : 'Copiar mensaje'}
          </Button>
          <Button variant="olive" onClick={onClose}>
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// eslint-disable-next-line react/only-export-components
export function useWhatsApp() {
  const ctx = useContext(WhatsAppContext)
  if (!ctx) throw new Error('useWhatsApp debe usarse dentro de <WhatsAppProvider>')
  return ctx
}
