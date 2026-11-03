import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { aguaArguments, aguaSections, aguaRelations, aguaQuestions, aguaNodeById, aguaPositionFor, aguaNodesForSection } from '../src/data/cafeAguaSystem2D.js'

test('20 argumentos únicos y procedencia clara', () => {
  assert.equal(aguaArguments.length,20)
  assert.equal(aguaSections.length,5)
  assert.equal(new Set(aguaArguments.map(n=>n.id)).size,20)
  for(const n of aguaArguments){
    assert.equal(aguaNodeById(n.id),n)
    assert.ok(aguaSections.some(s=>s.id===n.section))
    for(const key of ['kind','title','summary','explanation','argument','voice','question','studyAnswer']) assert.ok(typeof n[key]==='string' && n[key].length >= (key==='kind' ? 4 : 9),n.id+': '+key)
  }
})
test('geometría real sin solapamiento entre nodos',()=>{
  for(let i=0;i<aguaArguments.length;i++)for(let j=i+1;j<aguaArguments.length;j++){
    const a=aguaPositionFor(aguaArguments[i]),b=aguaPositionFor(aguaArguments[j])
    assert.ok(Math.abs(a.x-b.x)>=426 || Math.abs(a.y-b.y)>=346,aguaArguments[i].id+' y '+aguaArguments[j].id+' chocan')
  }
})
test('guía completa y ejercicios de cada ruta',()=>{
  assert.deepEqual(aguaNodesForSection('all').map(n=>n.id),aguaArguments.map(n=>n.id))
  for(const s of aguaSections){
    assert.ok(s.title && s.question && s.before && s.after)
    assert.equal(aguaNodesForSection(s.id).length,4)
    assert.equal(aguaQuestions.filter(q=>q.section===s.id).length,2)
  }
  assert.equal(aguaQuestions.length,10)
  for(const q of aguaQuestions){
    assert.equal(aguaNodeById(q.nodeId)?.section,q.section)
    assert.ok(q.options.length>1 && q.correct>=0 && q.correct<q.options.length)
    assert.ok(q.explanation.length>10)
  }
})
test('24 relaciones válidas y conectividad entre secciones',()=>{
  assert.equal(aguaRelations.length,24)
  const ids=new Set(aguaArguments.map(n=>n.id)),seen=new Set()
  for(const r of aguaRelations){
    assert.ok(ids.has(r.from) && ids.has(r.to),r.id)
    assert.notEqual(r.from,r.to)
    const pair=r.from+'>'+r.to
    assert.ok(!seen.has(pair));seen.add(pair)
    assert.ok(r.label.length>3)
  }
})
test('navegación, guía y frontera editorial en el JSX',()=>{
  const ui=readFileSync(new URL('../src/pages/CafeAguaSystem2D.jsx',import.meta.url),'utf8')
  const css=readFileSync(new URL('../src/pages/CafeAguaSystem2D.css',import.meta.url),'utf8')
  const page=readFileSync(new URL('../src/pages/CafeAguaEvent.tsx',import.meta.url),'utf8')
  assert.match(ui,/ReactFlowProvider/)
  assert.match(ui,/const guide = useMemo/)
  assert.match(ui,/\[sectionKey, fitView\]/)
  assert.doesNotMatch(ui,/\[flowNodes, fitView\]|\[selectedId, fitView\]/)
  assert.match(ui,/startStudy/)
  assert.match(ui,/Paráfrasis de memoria/)
  assert.doesNotMatch(ui,/grabaci[oó]n|transcripci[oó]n/i)
  assert.match(css,/\.agua2d-node\.is-guided-current/)
  assert.match(css,/\.agua2d-node\.is-dimmed/)
  assert.match(css,/--ph2d-topic-blue/)
  assert.match(page,/const CafeAguaSystem2D = lazy/)
  assert.match(page,/showMap &&/)
  assert.match(page,/showMemory &&/)
  assert.match(page,/water-edition-hero/)
  assert.match(page,/water-edition-question-tabs/)
  assert.match(page,/cafeAguaPhotos\.slice\(0,allPhotos/)
  assert.doesNotMatch(page,/water-news-headlines|water-news-columns/)
  const memoir=readFileSync(new URL('../src/pages/CafeAguaMemory.tsx',import.meta.url),'utf8')
  assert.match(memoir,/<details className=/)
  assert.match(memoir,/water-memory-chapter-summary/)
  assert.match(memoir,/has-diagram/)
  assert.doesNotMatch(memoir,/href=\{'#agua-memoria-/)
})
