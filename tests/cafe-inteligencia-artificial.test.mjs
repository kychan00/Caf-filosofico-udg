import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const page = read('src/pages/CafeInteligenciaArtificialEvent.tsx')
const styles = read('src/pages/CafeInteligenciaArtificialEvent.css')
const catalog = read('src/data/cafeFilosoficoEvents.ts')
const archive = read('src/pages/CafeFilosofico.tsx')
const editorialRules = read('docs/REGLAS-EDITORIALES-CAFE.md')
const router = read('src/App.jsx')

test('la edición 06 conserva literalmente la convocatoria y no anticipa una memoria', () => {
  assert.equal(new Date('2026-11-17T12:00:00Z').getUTCDay(), 2, 'El 17 de noviembre de 2026 cae en martes')

  for (const literal of [
    '¿Cómo afecta la IA a la identidad humana?',
    '¿Un riesgo existencial o una herramienta?',
    '¿Qué pasa si se sale de control?',
    'Kefren Martínez',
    'Omar Villegas',
    'Diego Jimenez',
    'Cristian Pelayo',
    '2:00 P. M.',
    'EDIFICIO C · AULA 5',
    'CAFÉ GRATIS',
  ]) assert.ok(page.includes(literal), 'Falta dato constatado de la convocatoria: ' + literal)

  assert.match(page, /PREPARACIÓN EDITORIAL · NO ES MEMORIA DEL DIÁLOGO/)
  assert.match(page, /PRÓXIMO ENCUENTRO/)
  assert.match(page, /El cartel es la fuente/)
  assert.match(page, /no representan posiciones del Café/)
  assert.doesNotMatch(page, /Memory|System2D|MEMORIA PUBLICADA/)
  assert.match(editorialRules, /Convocatoria y memoria no son lo mismo/)
  assert.match(editorialRules, /Primero fidelidad; después claridad; después diseño/)
})

test('ruta, catálogo y archivo público distinguen la edición como próxima', () => {
  const route = '/cafe-filosofico/2026/11/17/inteligencia-artificial'
  assert.ok(router.includes('CafeInteligenciaArtificialEvent'))
  assert.ok(router.includes('path="' + route + '"'))
  assert.ok(catalog.includes("slug: 'inteligencia-artificial'"))
  assert.ok(catalog.includes("status: 'proximo'"))
  assert.ok(catalog.includes(route))
  assert.ok(archive.includes("edition: 'EDICIÓN 06'"))
  assert.ok(archive.includes("badge: 'PRÓXIMO ENCUENTRO'"))
  assert.ok(archive.includes(route))
  assert.match(archive, /No sustituye ni modifica el cartel oficial/)
})

test('la convocatoria conserva interacción, accesibilidad y geometría adaptable', () => {
  assert.match(page, /aria-pressed=\{active === index\}/)
  assert.match(page, /onClick=\{\(\) => setActive\(index\)\}/)
  assert.match(page, /aria-live="polite"/)
  assert.match(page, /scrollIntoView/)
  assert.match(page, /role="group"/)
  assert.match(styles, /@media\(max-width:980px\)/)
  assert.match(styles, /@media\(max-width:720px\)/)
  assert.match(styles, /@media\(max-width:430px\)/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
  assert.match(styles, /overflow-x:hidden/)
})
