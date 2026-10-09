import { Logo } from '@/components/layout/logo'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { navLinks, siteConfig } from '@/config/site'
import { categories } from '@/data/products'
import { buildWhatsAppUrl, generalInquiryMessage } from '@/lib/whatsapp'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo inverted />
          <p className="max-w-sm font-serif text-2xl leading-snug text-ivory/85">{siteConfig.slogan}.</p>
          <a
            href={buildWhatsAppUrl(generalInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-ivory px-5 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-sand focus-visible:ring-[3px] focus-visible:ring-sand focus-visible:outline-none"
          >
            <WhatsAppIcon className="size-4" />
            Escríbenos por WhatsApp
          </a>
        </div>
        <nav aria-label="Pie de página">
          <h2 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] text-ivory/60 uppercase">Navegación</h2>
          <ul className="flex flex-col gap-2.5 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-ivory/80 hover:text-ivory">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="mb-4 font-sans text-xs font-medium tracking-[0.2em] text-ivory/60 uppercase">Categorías</h2>
          <ul className="flex flex-col gap-2.5 text-sm text-ivory/80">
            {categories.map((category) => (
              <li key={category.id}>{category.label}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Precios en pesos mexicanos (MXN).
          </p>
          {siteConfig.showDemoNotice && (
            <p>Catálogo de demostración: productos, precios e imágenes ilustrativos.</p>
          )}
        </div>
      </div>
    </footer>
  )
}
