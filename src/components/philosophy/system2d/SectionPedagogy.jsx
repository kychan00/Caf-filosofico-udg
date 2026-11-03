import { useEffect, useMemo, useState } from 'react'
import { buildSectionPedagogy } from './SectionPedagogyModel.js'
import './SectionPedagogy.css'

// Pure section derivation is shared with Node tests and all seven systems.
export { buildSectionPedagogy } from './SectionPedagogyModel.js'
const title = (node) => node?.data?.title || node?.id || 'Nodo'
const location = (node) => node?.data?.sourceRef || node?.data?.page
  || node?.data?.source || 'Localizador no documentado'

export default function SectionPedagogy({
  nodes, routes, nodeOrder, activeRoute, selectedId, onSectionChange, onFocusNode,
}) {
  const sections = useMemo(() => buildSectionPedagogy(nodes, routes, nodeOrder), [nodes, routes, nodeOrder])
  const [sectionId, setSectionId] = useState(() =>
    activeRoute !== 'all' ? activeRoute : sections[0]?.id,
  )
  const [mode, setMode] = useState('closed')
  const [stepIndex, setStepIndex] = useState(0)
  const [studyIndex, setStudyIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [marks, setMarks] = useState({})

  useEffect(() => {
    if (activeRoute !== 'all' && sections.some((s) => s.id === activeRoute)) {
      setSectionId(activeRoute)
    }
  }, [activeRoute, sections])

  const section = sections.find((s) => s.id === sectionId) || sections[0]
  const members = section?.members || []
  const questions = section?.questions || []
  const currentIndex = Math.max(0, Math.min(stepIndex, members.length - 1))
  const current = members[currentIndex]
  const questionIndex = Math.max(0, Math.min(studyIndex, questions.length - 1))
  const studyNode = questions[questionIndex]
  const questionText = studyNode?.data?.question || studyNode?.data?.nextQuestion
  const reviewed = section ? questions.filter((node) =>
    marks[section.id + ':' + node.id] === 'reviewed'
  ).length : 0

  useEffect(() => {
    if (!section || !selectedId) return
    const i = members.findIndex((node) => node.id === selectedId)
    if (i >= 0) setStepIndex(i)
    const j = questions.findIndex((node) => node.id === selectedId)
    if (j >= 0) setStudyIndex(j)
  }, [selectedId, section, members, questions])

  if (!section) return null

  const navigate = (node) => {
    if (!node) return
    if (activeRoute !== section.id) onSectionChange(section.id)
    onFocusNode(node.id)
  }
  const changeSection = (id) => {
    setSectionId(id)
    setStepIndex(0)
    setStudyIndex(0)
    setRevealed(false)
    onSectionChange(id)
  }
  const goGuide = (index) => {
    const i = Math.max(0, Math.min(index, members.length - 1))
    setStepIndex(i)
    navigate(members[i])
  }
  const goStudy = (index) => {
    const i = Math.max(0, Math.min(index, questions.length - 1))
    setStudyIndex(i)
    setRevealed(false)
    navigate(questions[i])
  }
  const switchMode = (next) => {
    const now = mode === next ? 'closed' : next
    setMode(now)
    setRevealed(false)
    if (now === 'guide') goGuide(currentIndex)
    if (now === 'study' && questions.length) goStudy(questionIndex)
  }
  return (
    <section className="ph2d-pedagogy" aria-label="Guía y estudio por sección" data-ph2d-section={section.id}>
      <header className="ph2d-pedagogy-head">
        <span>PEDAGOGÍA POR SECCIÓN</span>
        <strong>Comprender · recorrer · comprobar</strong>
      </header>
      <label className="ph2d-pedagogy-select">
        <span>SECCIÓN / RUTA</span>
        <select value={section.id} onChange={(event) => changeSection(event.target.value)}>
          {sections.map((item) => (
            <option key={item.id} value={item.id}>{item.label} · {item.members.length} nodos</option>
          ))}
        </select>
      </label>
      <div className="ph2d-pedagogy-arc">
        <div>
          <small>ANTES · DEPENDENCIAS DOCUMENTADAS</small>
          {section.prior.length ? (
            <ul>{section.prior.map((node) => <li key={node.id}>{title(node)}</li>)}</ul>
          ) : <p>No consta dependencia externa en este recorrido.</p>}
        </div>
        <div>
          <small>DESARROLLO · ORDEN PEDAGÓGICO</small>
          <p><b>{title(members[0])}</b> → <b>{title(members[members.length - 1])}</b></p>
          <em>El orden de ruta no equivale por sí solo a deducción del autor.</em>
        </div>
        <div>
          <small>DESPUÉS · CONTINUIDADES DOCUMENTADAS</small>
          {section.later.length ? (
            <ul>{section.later.map((node) => <li key={node.id}>{title(node)}</li>)}</ul>
          ) : <p>No consta consecuencia externa en este recorrido.</p>}
        </div>
      </div>
      <div className="ph2d-pedagogy-actions">
        <button type="button" className={mode === 'guide' ? 'is-active' : ''} onClick={() => switchMode('guide')}>
          {mode === 'guide' ? 'Cerrar guía' : 'Guía de esta sección'}
        </button>
        <button type="button" className={mode === 'study' ? 'is-active' : ''} onClick={() => switchMode('study')} disabled={!questions.length}>
          {mode === 'study' ? 'Cerrar estudio' : 'Estudiar esta sección'}
        </button>
      </div>
      {mode === 'guide' && current && (
        <div className="ph2d-pedagogy-work">
          <span aria-live="polite">GUÍA EXHAUSTIVA · {currentIndex + 1} / {members.length}</span>
          <progress value={currentIndex + 1} max={members.length} />
          <strong>{title(current)}</strong>
          <nav className="ph2d-pedagogy-rail" aria-label="Pasos de la sección">
            {members.map((node, index) => (
              <button key={node.id} type="button" title={title(node)}
                aria-current={index === currentIndex ? 'step' : undefined}
                className={index === currentIndex ? 'is-current' : ''}
                onClick={() => goGuide(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{title(node)}</strong>
              </button>
            ))}
          </nav>
          <p>{current.data?.explanation || current.data?.detail ||
            'Sin explicación documentada: consultar el folio y la fuente.'}</p>
          <small>Fuente / posición: {location(current)}</small>
          {current.data?.question && <blockquote>{current.data.question}</blockquote>}
          <div className="ph2d-pedagogy-nav">
            <button type="button" disabled={!currentIndex} onClick={() => goGuide(currentIndex - 1)}>← Anterior</button>
            <button type="button" onClick={() => navigate(current)}>Ver nodo</button>
            <button type="button" disabled={currentIndex === members.length - 1} onClick={() => goGuide(currentIndex + 1)}>Siguiente →</button>
          </div>
        </div>
      )}
      {mode === 'study' && studyNode && (
        <div className="ph2d-pedagogy-work">
          <span aria-live="polite">MODO ESTUDIO · {questionIndex + 1} / {questions.length} · {reviewed} revisadas</span>
          <progress value={reviewed} max={questions.length} />
          <small>{studyNode.data?.questionProvenance === 'teacher' ? 'PREGUNTA DE CLASE · PROCEDENCIA ACREDITADA' : 'EJERCICIO DE ESTUDIO · SIN ATRIBUCIÓN DOCENTE'}</small>
          <strong>{questionText || ('Explique desde el texto el papel de «' + title(studyNode) + '».')}</strong>
          <p>Intente responder antes de consultar la explicación.</p>
          {!revealed ? (
            <button type="button" onClick={() => setRevealed(true)}>Revelar explicación</button>
          ) : (
            <div className="ph2d-pedagogy-answer">
              <small>EXPLICACIÓN Y RETROALIMENTACIÓN</small>
              <p>{studyNode.data?.explanation || studyNode.data?.detail || studyNode.data?.short || 'No consta explicación suficiente.'}</p>
              <small>Fuente / posición: {location(studyNode)}</small>
              <div className="ph2d-pedagogy-nav">
                <button type="button" onClick={() => setMarks((old) => ({ ...old, [section.id + ':' + studyNode.id]: 'reviewed' }))}>Comprendido · autoevaluación</button>
                <button type="button" onClick={() => setMarks((old) => ({ ...old, [section.id + ':' + studyNode.id]: 'repeat' }))}>Necesito repasar</button>
              </div>
            </div>
          )}
          <div className="ph2d-pedagogy-nav">
            <button type="button" disabled={!questionIndex} onClick={() => goStudy(questionIndex - 1)}>← Anterior</button>
            <button type="button" onClick={() => navigate(studyNode)}>Ir al nodo / fuente</button>
            <button type="button" disabled={questionIndex === questions.length - 1} onClick={() => goStudy(questionIndex + 1)}>Siguiente →</button>
          </div>
          <button type="button" className="ph2d-pedagogy-reset" onClick={() => {
            setMarks((old) => Object.fromEntries(Object.entries(old).filter(([key]) => !key.startsWith(section.id + ':'))))
            goStudy(0)
          }}>Reiniciar sección</button>
        </div>
      )}
    </section>
  )
}
