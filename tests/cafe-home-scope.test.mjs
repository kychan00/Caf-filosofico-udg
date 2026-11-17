import test from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const expected = new Map([
  ['src/pages/CafeCapitalismoEvent.tsx', 'ca89c5a88d175d64e7fa3ac1f12cfe22989f83a9'],
  ['src/pages/CafeCapitalismoEvent.css', 'db923b3d33f8faf117ba3ae5730d40b440f1155b'],
  ['src/pages/CafeMeritocraciaEvent.tsx', 'f92effc4db13a9b1194cf53f66f45a5292747741'],
  ['src/pages/CafeMeritocraciaEvent.css', 'f2e8652a38b00a2b67aa9957c2d19683d224fe4b'],
  ['src/pages/CafeMercadotecniaEvent.tsx', '97b163c00331df91b0f3636beb42bcd3e47db0d2'],
  ['src/pages/CafeMercadotecniaEvent.css', '9d351a014537637b2432ef6b63b28a8f32719646'],
  ['src/pages/CafeAguaEvent.tsx', '375b57df442294a972d22ccfdc7ab87416cb5f83'],
  ['src/pages/CafeAguaEvent.css', '723d64e9341f077867b9d4f0c58141fc8e3817f9'],
  ['src/pages/CafeRedesSocialesEvent.tsx', '71fe68aa681619e65da7ef79591a80210250162f'],
  ['src/pages/CafeRedesSocialesEvent.css', '1100e206063526c733791da0ed24573c52a57332'],
  ['src/pages/CafeInteligenciaArtificialEvent.tsx', '480a02fd75b7eefe460478410287d1a3176f1602'],
  ['src/pages/CafeInteligenciaArtificialEvent.css', '17e84e5c20cef54f0ff6e303cf27471025d3bab8'],
])

function gitBlobSha(path) {
  const buffer = readFileSync(new URL('../' + path, import.meta.url))
  const header = Buffer.from('blob ' + buffer.length + '\0')
  return createHash('sha1').update(header).update(buffer).digest('hex')
}

test('las páginas históricas conservan su contenido y estilos salvo cambios documentados de cartel', () => {
  for (const [path, sha] of expected) {
    if (path === 'src/pages/CafeMercadotecniaEvent.tsx' || path === 'src/pages/CafeAguaEvent.tsx') continue
    assert.equal(
      gitBlobSha(path),
      sha,
      path + ' cambió fuera del único reemplazo permitido del cartel',
    )
  }
})

test('Mercadotecnia conserva su página histórica salvo la referencia exacta al nuevo cartel', () => {
  const path = 'src/pages/CafeMercadotecniaEvent.tsx'
  const source = readFileSync(new URL('../' + path, import.meta.url), 'utf8')
  const nuevo = 'poster-mercadotecnia-eleccion.webp'
  const anterior = 'poster-original.jpg'

  assert.equal(source.split(nuevo).length - 1, 1, 'El nuevo cartel debe aparecer exactamente una vez')

  const original = Buffer.from(source.replace(nuevo, anterior), 'utf8')
  const header = Buffer.from('blob ' + original.length + String.fromCharCode(0))
  const actual = createHash('sha1').update(header).update(original).digest('hex')
  assert.equal(
    actual,
    expected.get(path),
    'Se modificó contenido histórico de Mercadotecnia distinto a la referencia del cartel',
  )
})

test('Agua conserva el contenido de su página histórica salvo el cartel y sus etiquetas', () => {
  const path = 'src/pages/CafeAguaEvent.tsx'
  let source = readFileSync(new URL('../' + path, import.meta.url), 'utf8')
  const cambios = [
    ['poster-hablemos-2026.webp', 'poster-original.svg'],
    ['Cartel actualizado de Hablemos sobre el agua, edición 04 del Café Filosófico', 'Cartel original de Hablemos sobre el agua, edición 04 del Café Filosófico'],
    ['EL CARTEL ACTUALIZADO · EDICIÓN 04', 'EL CARTEL ORIGINAL · EDICIÓN 04'],
  ]
  for (const [nuevo, anterior] of cambios) {
    assert.equal(source.split(nuevo).length - 1, 1, 'La sustitución del cartel de Agua debe ser única: ' + nuevo)
    source = source.replace(nuevo, anterior)
  }
  const content = Buffer.from(source, 'utf8')
  const header = Buffer.from('blob ' + content.length + String.fromCharCode(0))
  const sha = createHash('sha1').update(header).update(content).digest('hex')
  assert.equal(sha, expected.get(path), 'Se cambió otro contenido histórico en Agua')
})

test('el CSS de la home no introduce selectores globales que contaminen páginas históricas', () => {
  const css = readFileSync(new URL('../src/pages/CafeFilosofico.css', import.meta.url), 'utf8')
  assert.equal(/^:root\s*\{/m.test(css), false)
  assert.equal(/^html\s*\{/m.test(css), false)
  assert.equal(/^body\s*\{/m.test(css), false)
  assert.equal(/^\*\s*\{/m.test(css), false)
  assert.ok(css.includes('.cafe-home,\n.cafe-home *,'))
})
