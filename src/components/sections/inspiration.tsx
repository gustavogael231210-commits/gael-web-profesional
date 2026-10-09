import { Reveal } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { SmartImage } from '@/components/common/smart-image'
import { Button } from '@/components/ui/button'
import { inspirationImages } from '@/data/collections'

const ideas = [
  {
    title: 'Capas de textura',
    text: 'Combina lino, bouclé y madera natural para que un espacio neutro se sienta cálido y vivido.',
  },
  {
    title: 'Madera y luz natural',
    text: 'Los tonos nogal y roble reflejan la luz de forma suave y aportan profundidad sin recargar.',
  },
  {
    title: 'Menos piezas, mejor elegidas',
    text: 'Un sofá con buenas proporciones o una mesa con carácter pueden definir toda la habitación.',
  },
]

export function Inspiration() {
  return (
    <section id="inspiracion" aria-labelledby="inspiracion-title" className="bg-background py-24 sm:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
        <div className="relative">
          <Reveal>
            <SmartImage
              src={inspirationImages.main.src}
              alt={inspirationImages.main.alt}
              width={1400}
              sizes="(min-width: 1024px) 55vw, 100vw"
              wrapperClassName="aspect-[4/5] rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Reveal>
          <Reveal
            delay={0.15}
            className="absolute -right-2 -bottom-10 hidden w-[42%] rounded-[1.5rem] border-8 border-background shadow-lift sm:block lg:-right-10"
          >
            <SmartImage
              src={inspirationImages.detail.src}
              alt={inspirationImages.detail.alt}
              width={700}
              sizes="25vw"
              wrapperClassName="aspect-square rounded-2xl"
            />
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <SectionHeading
            id="inspiracion-title"
            eyebrow="Inspiración"
            title={
              <>
                Ideas para un hogar con <em className="font-normal text-walnut">personalidad</em>
              </>
            }
            description="Pequeñas decisiones de diseño que transforman la forma en que se siente un espacio."
          />
          <ol className="flex flex-col divide-y divide-border border-y border-border">
            {ideas.map((idea, index) => (
              <Reveal as="li" key={idea.title} delay={index * 0.08} className="flex gap-6 py-6">
                <span className="font-serif text-2xl text-olive tabular-nums" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-2xl font-medium text-charcoal">{idea.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{idea.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <div>
            <Button variant="outline" size="lg" asChild>
              <a href="#catalogo">Ver piezas del catálogo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
