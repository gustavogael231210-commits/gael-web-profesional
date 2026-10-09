import { MotionConfig } from 'framer-motion'

import { CatalogSection } from '@/components/catalog/catalog-section'
import { ProductDialog } from '@/components/catalog/product-dialog'
import { Hero } from '@/components/hero/hero'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import { QuoteSheet } from '@/components/quote/quote-sheet'
import { About } from '@/components/sections/about'
import { Collections } from '@/components/sections/collections'
import { Contact } from '@/components/sections/contact'
import { Featured } from '@/components/sections/featured'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Inspiration } from '@/components/sections/inspiration'
import { CatalogProvider } from '@/context/catalog-context'
import { QuoteProvider } from '@/context/quote-context'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CatalogProvider>
        <QuoteProvider>
          <a
            href="#contenido"
            className="sr-only z-50 rounded-full bg-charcoal px-4 py-2 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido" tabIndex={-1} className="outline-none">
            <Hero />
            <Collections />
            <Featured />
            <CatalogSection />
            <Inspiration />
            <HowItWorks />
            <About />
            <Contact />
          </main>
          <Footer />
          <WhatsAppFab />
          <ProductDialog />
          <QuoteSheet />
        </QuoteProvider>
      </CatalogProvider>
    </MotionConfig>
  )
}
