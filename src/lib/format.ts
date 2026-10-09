const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
})

/** 24900 → "$24,900" (pesos mexicanos). */
export function formatMXN(value: number): string {
  return mxn.format(value)
}

/** Medidas en cm → "220 × 95 × 82 cm" (ancho × fondo × alto). */
export function formatDimensions({
  width,
  depth,
  height,
}: {
  width: number
  depth: number
  height: number
}): string {
  return `${width} × ${depth} × ${height} cm`
}
