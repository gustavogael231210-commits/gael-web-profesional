import { afterEach, describe, expect, it, vi } from 'vitest'

async function loadSplineUrl(value: string) {
  vi.stubEnv('VITE_SPLINE_SCENE_URL', value)
  vi.resetModules()
  const { siteConfig } = await import('@/config/site')
  return siteConfig.splineSceneUrl
}

describe('configuración de Spline', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('sin URL usa la sala 3D en CSS', async () => {
    expect(await loadSplineUrl('')).toBe('')
    expect(await loadSplineUrl('   ')).toBe('')
  })

  it('ignora valores que no son una URL https válida', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(await loadSplineUrl('mi-escena')).toBe('')
    expect(await loadSplineUrl('http://ejemplo.test/scene.splinecode')).toBe('')
  })

  it('acepta una URL https', async () => {
    expect(await loadSplineUrl(' https://ejemplo.test/escena/scene.splinecode ')).toBe(
      'https://ejemplo.test/escena/scene.splinecode',
    )
  })

  it('el número de WhatsApp tiene formato internacional (solo dígitos)', async () => {
    vi.resetModules()
    const { siteConfig } = await import('@/config/site')
    expect(siteConfig.whatsappNumber).toMatch(/^\d{12,13}$/)
  })
})
