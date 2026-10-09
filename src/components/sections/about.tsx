import { Armchair, Compass, Sparkles } from 'lucide-react'

import { Reveal } from '@/components/common/reveal'
import { siteConfig } from '@/config/site'

const principles = [
  { icon: Compass, title: 'Diseño', text: 'Líneas contemporáneas y proporciones equilibradas que perduran.' },
  { icon: Armchair, title: 'Comodidad', text: 'Piezas pensadas para usarse todos los días, no solo para verse bien.' },
  { icon: Sparkles, title: 'Funcionalidad', text: 'Medidas y materiales descritos con claridad para elegir con confianza.' },
]

export function About() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="relative overflow-hidden bg-beige/60 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 font-serif text-[22rem] leading-none text-sand/30 select-none"
      >
        N
      </div>
      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-5">
          <p className="eyebrow">Nosotros</p>
          <h2 id="nosotros-title" className="text-4xl leading-[1.05] font-medium text-charcoal sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h2>
          <p className="font-serif text-xl text-walnut italic">{siteConfig.slogan}</p>
        </Reveal>
        <div className="flex flex-col gap-10">
          <Reveal delay={0.1}>
            <blockquote className="font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
              “Creemos que los muebles son parte de los momentos que vivimos y de la forma en que disfrutamos nuestro
              hogar. Nuestra selección busca combinar diseño, funcionalidad y comodidad para crear espacios con
              personalidad”.
            </blockquote>
          </Reveal>
          <ul className="grid gap-6 sm:grid-cols-3">
            {principles.map((item, index) => (
              <Reveal as="li" key={item.title} delay={0.15 + index * 0.06} className="flex flex-col gap-2">
                <item.icon className="size-5 text-olive" aria-hidden="true" />
                <h3 className="text-xl font-medium text-charcoal">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
