import { siteConfig } from '@/config/site'
import { formatMXN } from '@/lib/format'
import type { Product } from '@/types/product'

/** Construye un enlace wa.me con el mensaje codificado para URL. */
export function buildWhatsAppUrl(message: string, phone: string = siteConfig.whatsappNumber): string {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

/** Mensaje predefinido para consultar un producto (opcionalmente con color). */
export function productInquiryMessage(
  product: Pick<Product, 'name' | 'article'>,
  colorName?: string,
): string {
  const piece = colorName ? `${product.name} en color ${colorName}` : product.name
  return `Hola, me interesa conocer más sobre ${product.article} ${piece} de ${siteConfig.name}. ¿Me pueden compartir información sobre disponibilidad, colores y entrega?`
}

export function productWhatsAppUrl(
  product: Pick<Product, 'name' | 'article'>,
  colorName?: string,
): string {
  return buildWhatsAppUrl(productInquiryMessage(product, colorName))
}

export function generalInquiryMessage(): string {
  return `Hola, me gustaría recibir asesoría sobre los muebles de ${siteConfig.name}.`
}

export interface QuoteLine {
  name: string
  color?: string
  quantity: number
  unitPrice: number
}

/** Mensaje con la lista de piezas seleccionadas para solicitar cotización. */
export function quoteMessage(lines: QuoteLine[]): string {
  const items = lines.map((line) => {
    const color = line.color ? ` (${line.color})` : ''
    return `• ${line.quantity} × ${line.name}${color} — ${formatMXN(line.unitPrice)} c/u`
  })
  const total = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  return [
    `Hola, me gustaría cotizar estas piezas de ${siteConfig.name}:`,
    '',
    ...items,
    '',
    `Total de referencia: ${formatMXN(total)} MXN`,
    '¿Me pueden confirmar disponibilidad, precio final y tiempos de entrega?',
  ].join('\n')
}

export interface ContactFormData {
  name: string
  city?: string
  interest?: string
  message: string
}

export function contactMessage({ name, city, interest, message }: ContactFormData): string {
  return [
    `Hola, soy ${name.trim()}${city?.trim() ? ` de ${city.trim()}` : ''}.`,
    interest ? `Me interesa: ${interest}.` : '',
    message.trim(),
  ]
    .filter(Boolean)
    .join('\n')
}
