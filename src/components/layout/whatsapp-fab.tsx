import { AnimatePresence, motion } from 'framer-motion'

import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { useScrolled } from '@/hooks/use-scrolled'
import { buildWhatsAppUrl, generalInquiryMessage } from '@/lib/whatsapp'

/** Botón flotante de WhatsApp (aparece al desplazarse). */
export function WhatsAppFab() {
  const visible = useScrolled(480)
  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={buildWhatsAppUrl(generalInquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-olive text-ivory shadow-lift transition-colors hover:bg-olive-deep focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:outline-none sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25 }}
        >
          <WhatsAppIcon className="size-7" />
        </motion.a>
      )}
    </AnimatePresence>
  )
}
