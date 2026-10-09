import { describe, expect, it } from 'vitest'

import { products } from '@/data/products'
import {
  buildWhatsAppUrl,
  contactMessage,
  productInquiryMessage,
  productWhatsAppUrl,
  quoteMessage,
} from '@/lib/whatsapp'

const oslo = products.find((p) => p.slug === 'sofa-oslo')!
const mesa = products.find((p) => p.slug === 'mesa-de-centro-roble')!

describe('WhatsApp', () => {
  it('genera el mensaje predefinido del producto', () => {
    expect(productInquiryMessage(oslo)).toBe(
      'Hola, me interesa conocer más sobre el Sofá Oslo de NÓRDICA HOME. ¿Me pueden compartir información sobre disponibilidad, colores y entrega?',
    )
  })

  it('usa el artículo correcto y añade el color elegido', () => {
    expect(productInquiryMessage(mesa, 'Nogal')).toContain('sobre la Mesa de centro Roble en color Nogal de NÓRDICA HOME')
  })

  it('codifica el mensaje y usa el número configurado', () => {
    const url = productWhatsAppUrl(oslo)
    expect(url.startsWith('https://wa.me/5210000000000?text=')).toBe(true)
    const text = new URL(url).searchParams.get('text')
    expect(text).toBe(productInquiryMessage(oslo))
    // Caracteres especiales codificados (acentos, ¿, espacios)
    expect(url).toContain('%C2%BF')
    expect(url).not.toContain(' ')
  })

  it('limpia el número de teléfono', () => {
    expect(buildWhatsAppUrl('Hola', '+52 1 (55) 1234-5678')).toBe('https://wa.me/5215512345678?text=Hola')
  })

  it('arma la lista de cotización con total de referencia', () => {
    const message = quoteMessage([
      { name: 'Sofá Oslo', color: 'Arena', quantity: 1, unitPrice: 24900 },
      { name: 'Silla Siena', quantity: 4, unitPrice: 3290 },
    ])
    expect(message).toContain('• 1 × Sofá Oslo (Arena) — $24,900 c/u')
    expect(message).toContain('• 4 × Silla Siena — $3,290 c/u')
    expect(message).toContain('Total de referencia: $38,060 MXN')
  })

  it('compone el mensaje del formulario de contacto', () => {
    expect(contactMessage({ name: ' Ana ', city: 'Puebla', interest: 'Comedores', message: 'Busco mesa para 6.' })).toBe(
      'Hola, soy Ana de Puebla.\nMe interesa: Comedores.\nBusco mesa para 6.',
    )
  })
})
