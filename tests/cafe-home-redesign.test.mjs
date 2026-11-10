import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const home = read('src/pages/CafeFilosofico.tsx')
const styles = read('src/pages/CafeFilosofico.css')
const catalog = read('src/data/cafeFilosoficoEvents.ts')

test('la portada usa una sola fuente de datos y conserva los carteles documentales', () => {
  assert.ok(home.includes("import { cafeEvents }"))
  assert.equal(home.includes('inteligenciaArtificialArchiveCover'), false)
  assert.ok(home.includes("published.map((event) =>"))
  assert.ok(home.includes('event.poster'))
  assert.ok(home.includes('nextEvent.poster'))

  for (const poster of [
    'meritocracia/poster-original.jpg',
    'mercadotecnia/poster-original.jpg',
    'agua/poster-original.svg',
    'redes-sociales/poster-oficial.png',
    'inteligencia-artificial/poster-oficial.png',
  ]) {
    assert.ok(catalog.includes(poster), 'Falta cartel documental en catálogo: ' + poster)
  }
  assert.ok(styles.includes("content: 'NUESTRO MÉTODO'"))
})

test('la dirección visual de la portada está construida como papel editorial', () => {
  for (const contract of [
    '--cafe-paper:',
    '--cafe-paper-deep:',
    'cafe-home-grain',
    'cafe-poster-tape',
    'clip-path:',
    'cafe-manifesto-tear',
    'cafe-next-tape',
    'cafe-evidence',
  ]) {
    assert.ok(styles.includes(contract), 'Falta contrato visual de papel: ' + contract)
  }

  assert.ok(styles.includes('feTurbulence'))
  assert.ok(styles.includes('prefers-reduced-motion'))
  assert.ok(styles.includes('scroll-snap-type'))
})

test('hero, navegación y secciones esenciales del PRD permanecen presentes', () => {
  for (const contract of [
    'cafe-nav-shell',
    'cafe-search-panel',
    'cafe-hero-collage',
    'Cafés que han sucedido',
    'cafe-method-grid',
    'El Café',
    'PRÓXIMA CONVERSACIÓN',
    'ARCHIVO · MEMORIA · EVIDENCIA',
  ]) {
    assert.ok(home.includes(contract), 'Falta sección o contrato: ' + contract)
  }
})
