import { useState } from 'react'
import { Menu, Search, ShoppingBag } from 'lucide-react'

import { Logo } from '@/components/layout/logo'
import { SearchDialog } from '@/components/layout/search-dialog'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { navLinks, siteConfig } from '@/config/site'
import { useQuote } from '@/context/quote-context'
import { useActiveSection } from '@/hooks/use-active-section'
import { useScrolled } from '@/hooks/use-scrolled'
import { cn } from '@/lib/utils'
import { buildWhatsAppUrl, generalInquiryMessage } from '@/lib/whatsapp'

const sectionIds = navLinks.map((link) => link.href.slice(1))

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const { count, setOpen: setQuoteOpen } = useQuote()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300',
        scrolled ? 'bg-ivory/85 shadow-[0_1px_0_rgb(31_29_27/0.06)] backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <nav aria-label="Principal" className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none',
                    isActive ? 'text-charcoal' : 'text-charcoal/65 hover:text-charcoal',
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-olive transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Buscar muebles">
            <Search className="size-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setQuoteOpen(true)}
            aria-label={`Mi selección, ${count} ${count === 1 ? 'pieza' : 'piezas'}`}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute top-1.5 right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-olive px-1 text-[11px] leading-5 font-semibold text-ivory tabular-nums">
                {count}
              </span>
            )}
          </Button>
          <Button variant="olive" size="default" className="hidden sm:inline-flex" asChild>
            <a href={buildWhatsAppUrl(generalInquiryMessage())} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent id="mobile-menu" side="right" className="gap-0">
          <SheetHeader>
            <SheetTitle className="sr-only">Menú</SheetTitle>
            <SheetDescription className="sr-only">Navegación principal de {siteConfig.name}</SheetDescription>
            <Logo />
          </SheetHeader>
          <nav aria-label="Móvil" className="flex-1 overflow-y-auto px-5">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href} className="border-b border-border">
                  <SheetClose asChild>
                    <a
                      href={link.href}
                      className="flex min-h-14 items-center justify-between py-3 font-serif text-3xl text-charcoal focus-visible:text-olive focus-visible:outline-none"
                    >
                      {link.label}
                      <span className="font-sans text-xs text-muted-foreground tabular-nums">0{index + 1}</span>
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
          <SheetFooter>
            <Button variant="olive" size="lg" asChild>
              <a href={buildWhatsAppUrl(generalInquiryMessage())} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-5" />
                Escríbenos por WhatsApp
              </a>
            </Button>
            <p className="text-center text-xs text-muted-foreground">{siteConfig.slogan}</p>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
