import test from 'node:test'
import assert from 'node:assert/strict'
import {
  redesArguments,
  redesEvidence,
  redesNodeById,
  redesRelations,
  redesSections,
  redesStudyQuestions,
} from '../src/data/cafeRedesSocialesSystem2D.js'

const NODE_WIDTH = 326
const NODE_HEIGHT = 238

test('sistema 2D de redes sociales conserva 12 nodos y relaciones válidas', () => {
  assert.equal(redesArguments.length, 12)
  assert.equal(new Set(redesArguments.map((node) => node.id)).size, 12)
  assert.equal(redesRelations.length, 16)

  for (const relation of redesRelations) {
    assert.ok(redesNodeById(relation.from), 'Origen inexistente: ' + relation.from)
    assert.ok(redesNodeById(relation.to), 'Destino inexistente: ' + relation.to)
    assert.ok(relation.label)
  }
})

test('geometría real del mapa no solapa nodos', () => {
  for (let i = 0; i < redesArguments.length; i += 1) {
    for (let j = i + 1; j < redesArguments.length; j += 1) {
      const a = redesArguments[i]
      const b = redesArguments[j]
      const separated =
        a.position.x + NODE_WIDTH <= b.position.x ||
        b.position.x + NODE_WIDTH <= a.position.x ||
        a.position.y + NODE_HEIGHT <= b.position.y ||
        b.position.y + NODE_HEIGHT <= a.position.y

      assert.ok(separated, 'Solapamiento entre ' + a.id + ' y ' + b.id)
    }
  }
})

test('cada ruta tiene guía, pregunta de estudio y antes/después', () => {
  assert.equal(redesSections.length, 4)

  for (const section of redesSections) {
    const nodes = redesArguments.filter((node) => node.section === section.id)
    assert.ok(nodes.length >= 3, 'Ruta sin nodos suficientes: ' + section.id)
    assert.ok(redesStudyQuestions.some((question) => question.section === section.id))
    assert.ok(section.before)
    assert.ok(section.after)
    assert.ok(section.question)
  }
})

test('el sistema contiene esquemas conceptuales trazables', () => {
  const withSchema = redesArguments.filter((node) => node.schema)
  assert.ok(withSchema.length >= 3)

  for (const node of withSchema) {
    assert.ok(node.schema.nodes.length >= 4)
    assert.ok(node.schema.edges.length >= 3)
    assert.ok(node.schema.ariaLabel)
  }
})

test('evidencia fotográfica queda separada de las tesis', () => {
  assert.equal(redesEvidence.length, 2)
  for (const photo of redesEvidence) {
    assert.match(photo.src, /redes-sociales\/sesion-05\/0[12]\.jpg$/)
    assert.ok(photo.alt)
    assert.ok(photo.title)
    assert.ok(photo.caption)
  }
})
