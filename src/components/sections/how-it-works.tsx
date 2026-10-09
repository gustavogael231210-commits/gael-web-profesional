import { MessageCircle, Search, Truck } from 'lucide-react'

import { Reveal } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

const steps = [
  {
    icon: Search,
    title: 'Explora',
    text: 'Revisa el catálogo, compara medidas y materiales y arma tu selección.',
  },
  {
    icon: MessageCircle,
    title: 'Consulta por WhatsApp',
    text: 'Envíanos la pieza o tu lista; te confirmamos disponibilidad, colores y precio final.',
  },
  {
    icon: Truck,
    title: 'Coordinamos la entrega',
    text: 'Acordamos contigo forma de pago, tiempos y entrega según tu ubicación.',
  },
]

/** Explica con honestidad cómo se compra hoy: por WhatsApp, sin pagos en línea. */
export function HowItWorks() {
  return (
    <section aria-labelledby="como-comprar-title" className="border-y border-border bg-card py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="como-comprar-title"
          eyebrow="Cómo comprar"
          title="Atención personal, de principio a fin"
          align="center"
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 0.08}
              className="flex flex-col gap-4 rounded-3xl bg-background p-7 ring-1 ring-border"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-olive/10 text-olive-deep">
                  <step.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-serif text-4xl text-sand" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-2xl font-medium text-charcoal">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
