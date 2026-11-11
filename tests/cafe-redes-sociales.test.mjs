import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'

const read = path => readFileSync(new URL('../'+path, import.meta.url), 'utf8')
const page = read('src/pages/CafeRedesSocialesEvent.tsx')
const styles = read('src/pages/CafeRedesSocialesEvent.css')
const catalog = read('src/data/cafeFilosoficoEvents.ts')
const archive = read('src/pages/CafeFilosofico.tsx')
const memory = read('src/data/cafeRedesSocialesMemory.ts')
const memoryPage = read('src/pages/CafeRedesSocialesMemory.tsx')
const editorialRules = read('docs/REGLAS-EDITORIALES-CAFE.md')
const router = read('src/App.jsx')
const officialPoster = new URL('../public/images/cafe-filosofico/redes-sociales/poster-oficial.png', import.meta.url)

test('convocatoria, memoria y datos constatables de la edición 05', () => {
  assert.equal(new Date('2026-11-03T12:00:00Z').getUTCDay(),2,'El 3 de noviembre de 2026 cae en martes')
  for(const literal of [
    '¿Quién soy cuando me muestro en una red; una representación de mí o una construcción distinta?',
    '¿Es posible la privacidad cuando exhibirse es la condición para participar?',
    '¿Qué sentido tiene “ser visto” y por qué buscamos validación cuantificada (likes, seguidores)?',
    'Kefren Martínez', 'Omar Villegas', 'Diego Jimenez', 'Cristian Pelayo',
    '2:00 P. M.', 'EDIFICIO C · AULA 5', 'CAFÉ GRATIS',
  ]) assert.ok(page.includes(literal), 'Falta dato del cartel: '+literal)
  assert.match(page,/Preparación editorial, no memoria del diálogo/)
  assert.match(page,/MEMORIA PUBLICADA/)
  assert.match(page,/CafeRedesSocialesMemory/)
  assert.match(memoryPage,/FRONTERA DE FUENTE/)
  assert.match(memory,/Atención, scroll y pérdida del aburrimiento|ATENCIÓN · SCROLL · ABURRIMIENTO/)
  assert.match(memory,/Lo digital no deja de ser real por ser virtual/)
  assert.match(memory,/proletariado digital/)
  assert.match(memory,/IA · TRANSHUMANISMO · FUTURO/)
  assert.match(memoryPage,/Afirmaciones empíricas mencionadas durante el diálogo/)
  assert.match(editorialRules,/Primero fidelidad; después claridad; después diseño/)
  assert.doesNotMatch(page + memoryPage + memory,/transcripci[oó]n|grabaci[oó]n/i)
})
test('ruta única y memoria vinculada desde ambos catálogos', () => {
  const route='/cafe-filosofico/2026/11/03/redes-sociales'
  assert.ok(router.includes('CafeRedesSocialesEvent'))
  assert.ok(router.includes('path="'+route+'"'))
  assert.ok(catalog.includes("status: 'publicado'"))
  assert.ok(catalog.includes("slug: 'redes-sociales'"))
  assert.ok(catalog.includes(route))
  assert.match(archive, /import \{ cafeEvents \}/)
  assert.match(archive, /published\.map\(\(event\) =>/)
  assert.match(archive, /to=\{event\.route\}/)
  assert.match(archive, /event\.poster/)
  assert.ok(catalog.includes("poster: 'images/cafe-filosofico/redes-sociales/poster-oficial.png'"))
  assert.ok(statSync(officialPoster).size > 0)
})
test('interacción, semántica, reducción de movimiento y geometría adaptable', () => {
  assert.match(page,/aria-pressed=\{active === index\}/)
  assert.match(page,/onClick=\{\(\) => setActive\(index\)\}/)
  assert.match(page,/aria-live="polite"/)
  assert.match(page,/scrollIntoView/)
  assert.match(page,/role="group"/)
  assert.match(styles,/@media\(max-width:540px\)/)
  assert.match(styles,/@media\(max-width:840px\)/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
  assert.match(memoryPage,/redesMemoryOpenProblems/)
})


test('la galería no publica el JPEG 01 cuyo contenido presenta una región gris', () => {
  const system = read('src/data/cafeRedesSocialesSystem2D.js')
  const gallery = read('src/pages/CafeRedesSocialesSystem2D.jsx')
  assert.doesNotMatch(system, /sesion-05\/01\.jpg/)
  assert.match(system, /sesion-05\/02\.webp/)
  assert.match(gallery, /Esta fotografía documenta la realización presencial/)
})
