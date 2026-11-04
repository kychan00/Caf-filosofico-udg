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
  assert.match(memory,/Afirmaciones empíricas|afirmaciones empíricas/i)
  assert.match(editorialRules,/Primero fidelidad; después claridad; después diseño/)
  assert.doesNotMatch(page + memoryPage + memory,/transcripci[oó]n|grabaci[oó]n/i)
})
test('ruta única y convocatoria vinculada desde ambos catálogos', () => {
  const route='/cafe-filosofico/2026/11/03/redes-sociales'
  assert.ok(router.includes('CafeRedesSocialesEvent'))
  assert.ok(router.includes('path="'+route+'"'))
  assert.ok(catalog.includes("status: 'publicado'"))
  assert.ok(catalog.includes("slug: 'redes-sociales'"))
  assert.ok(catalog.includes(route))
  assert.ok(archive.includes(route))
  assert.ok(archive.includes('MEMORIA PUBLICADA'))
  assert.ok(archive.includes('redes-sociales/poster-oficial.png'))
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
