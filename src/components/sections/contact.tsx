import { useId, useState, type FormEvent } from 'react'
import { Mail, MapPin, Send } from 'lucide-react'

import { Reveal } from '@/components/common/reveal'
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'
import { useWhatsApp } from '@/context/whatsapp-context'
import { categories } from '@/data/products'
import { buildWhatsAppUrl, contactMessage, generalInquiryMessage } from '@/lib/whatsapp'

type Errors = Partial<Record<'name' | 'message', string>>

/**
 * Formulario de contacto: no envía datos a ningún servidor.
 * Compone un mensaje y abre WhatsApp para que el cliente lo envíe.
 */
export function Contact() {
  const ids = { name: useId(), city: useId(), interest: useId(), message: useId() }
  const [form, setForm] = useState({ name: '', city: '', interest: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const { openWhatsApp } = useWhatsApp()

  const validate = (data: typeof form): Errors => {
    const next: Errors = {}
    if (data.name.trim().length < 2) next.name = 'Escribe tu nombre para saber cómo dirigirnos a ti.'
    if (data.message.trim().length < 5) next.message = 'Cuéntanos brevemente qué buscas (mínimo 5 caracteres).'
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      const firstInvalid = nextErrors.name ? ids.name : ids.message
      document.getElementById(firstInvalid)?.focus()
      return
    }
    openWhatsApp(buildWhatsAppUrl(contactMessage(form)))
    setSent(true)
  }

  const update = (field: keyof typeof form) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    if (field in errors) setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
  }

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="bg-background py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <p className="eyebrow">Contacto</p>
          <h2 id="contacto-title" className="text-4xl leading-[1.05] font-medium text-charcoal sm:text-5xl lg:text-6xl">
            Hablemos de <em className="font-normal text-walnut">tu espacio</em>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Cuéntanos qué habitación quieres transformar y te ayudamos a elegir las piezas adecuadas.
          </p>
          <ul className="mt-2 flex flex-col gap-4 text-sm">
            <li>
              <a
                href={buildWhatsAppUrl(generalInquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full text-charcoal hover:text-olive-deep focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-olive text-ivory">
                  <WhatsAppIcon className="size-5" />
                </span>
                Escríbenos por WhatsApp
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-3 rounded-full text-charcoal hover:text-olive-deep focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-beige text-walnut">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  {siteConfig.email}
                </a>
              </li>
            )}
            {siteConfig.serviceArea && (
              <li className="inline-flex items-center gap-3 text-charcoal">
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-beige text-walnut">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                {siteConfig.serviceArea}
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-[2rem] bg-card p-6 shadow-soft ring-1 ring-border sm:p-10"
            aria-describedby="contact-privacy"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor={ids.name}>
                  Nombre <span className="text-destructive" aria-hidden="true">*</span>
                </Label>
                <Input
                  id={ids.name}
                  name="name"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(event) => update('name')(event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${ids.name}-error` : undefined}
                />
                {errors.name && (
                  <p id={`${ids.name}-error`} className="text-sm text-destructive">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor={ids.city}>
                  Ciudad <span className="font-normal text-muted-foreground">(opcional)</span>
                </Label>
                <Input
                  id={ids.city}
                  name="city"
                  autoComplete="address-level2"
                  value={form.city}
                  onChange={(event) => update('city')(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={ids.interest}>
                ¿Qué te interesa? <span className="font-normal text-muted-foreground">(opcional)</span>
              </Label>
              <select
                id={ids.interest}
                name="interest"
                value={form.interest}
                onChange={(event) => update('interest')(event.target.value)}
                className="h-11 w-full appearance-none rounded-full border border-input bg-card px-4 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 md:text-sm"
              >
                <option value="">Selecciona una opción</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.label}>
                    {category.label}
                  </option>
                ))}
                <option value="Asesoría para un espacio completo">Asesoría para un espacio completo</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor={ids.message}>
                Mensaje <span className="text-destructive" aria-hidden="true">*</span>
              </Label>
              <Textarea
                id={ids.message}
                name="message"
                required
                placeholder="Ej. Busco un sofá de tres plazas para una sala de 4 × 3 m."
                value={form.message}
                onChange={(event) => update('message')(event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${ids.message}-error` : undefined}
              />
              {errors.message && (
                <p id={`${ids.message}-error`} className="text-sm text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <Button type="submit" variant="olive" size="lg" className="mt-1">
              <Send />
              Enviar por WhatsApp
            </Button>
            <p id="contact-privacy" className="text-xs leading-relaxed text-muted-foreground">
              {siteConfig.demoMode
                ? 'Demostración: al enviar verás una vista previa del mensaje de WhatsApp. No se guarda ni se envía nada.'
                : 'Al enviar se abrirá WhatsApp con tu mensaje listo para que lo mandes. Este formulario no guarda ni envía tus datos a ningún servidor.'}
            </p>
            <p role="status" className="text-sm text-olive-deep">
              {sent &&
                (siteConfig.demoMode
                  ? 'Mensaje preparado. En la demostración se muestra como vista previa.'
                  : 'Abrimos WhatsApp en una pestaña nueva. Si no se abrió, revisa el bloqueador de ventanas emergentes.')}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
