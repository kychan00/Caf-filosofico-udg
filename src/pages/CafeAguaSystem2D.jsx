import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import '../components/philosophy/system2d/System2DTheme.css'
import {
  aguaArguments,
  aguaNodeById,
  aguaNodesForSection,
  aguaPositionFor,
  aguaQuestions,
  aguaRelations,
  aguaSections,
} from '../data/cafeAguaSystem2D'
import './CafeAguaSystem2D.css'

const NODE_WIDTH = 326
const NODE_HEIGHT = 258
const sourceLabel = 'MEMORIA DEL DIÁLOGO · 19 OCT 2026'

function AguaArgumentNode({ data }) {
  const node = data.argument
  return (
    <article
      className={[
        'agua2d-node',
        data.selected ? 'is-selected' : '',
        data.guided ? 'is-guided-current' : '',
        data.next ? 'is-guided-next' : '',
        data.related ? 'is-related' : '',
        data.dimmed ? 'is-dimmed' : '',
        node.critical ? 'is-critical' : '',
      ].filter(Boolean).join(' ')}
      data-topic={data.tone}
      data-node-id={node.id}
    >
      <Handle type="target" id="left" position={Position.Left} />
      <Handle type="target" id="top" position={Position.Top} />
      <div className="agua2d-node-top">
        <span>{node.id} / {aguaArguments.length}</span>
        <strong>{node.kind}</strong>
      </div>
      <p className="agua2d-node-family">{data.sectionTitle}</p>
      <h3>{node.title}</h3>
      <p className="agua2d-node-summary">{node.summary}</p>
      <footer>
        <span>{node.critical ? 'PUNTO DE DISCUSIÓN · ' : ''}{node.voice}</span>
        <strong>ABRIR FOLIO ↗</strong>
      </footer>
      <Handle type="source" id="right" position={Position.Right} />
      <Handle type="source" id="bottom" position={Position.Bottom} />
    </article>
  )
}

const nodeTypes = { argumento: AguaArgumentNode }

function AguaSystemWorkspace({ embedded = false }) {
  const { setCenter, fitView } = useReactFlow()
  const [sectionKey, setSectionKey] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [mode, setMode] = useState('map')
  const [studyIndex, setStudyIndex] = useState(0)
  const [answerIndex, setAnswerIndex] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [history, setHistory] = useState([])
  const workspace = useRef(null)
  const selected = selectedId ? aguaNodeById(selectedId) : null
  const currentSection = aguaSections.find((s) => s.id === sectionKey) || aguaSections.find((s) => s.id === selected?.section) || aguaSections[0]
  const guide = useMemo(() => aguaNodesForSection(sectionKey), [sectionKey])
  const stepIndex = guide.findIndex((n) => n.id === selectedId)
  const questions = useMemo(() => sectionKey === 'all' ? aguaQuestions : aguaQuestions.filter((q) => q.section === sectionKey), [sectionKey])
  const study = questions[studyIndex] || questions[0]
  const sourceEdges = useMemo(() => {
    const byId = new Map(aguaArguments.map((arg) => [arg.id, arg]))
    return aguaRelations.filter((r) => byId.has(r.from) && byId.has(r.to))
  }, [])
  const related = useMemo(() => {
    const connected = new Set(selectedId ? [selectedId] : [])
    sourceEdges.forEach((r) => {
      if (r.from === selectedId) connected.add(r.to)
      if (r.to === selectedId) connected.add(r.from)
    })
    return connected
  }, [selectedId, sourceEdges])

  const center = useCallback((nodeId, duration = 480) => {
    const arg = aguaNodeById(nodeId)
    if (!arg) return
    const p = aguaPositionFor(arg)
    setCenter(p.x + NODE_WIDTH / 2, p.y + NODE_HEIGHT / 2, {
      zoom: typeof window !== 'undefined' && window.innerWidth < 740 ? 0.81 : 1.03,
      duration,
    })
  }, [setCenter])

  const choose = useCallback((nodeId, nextMode) => {
    const arg = aguaNodeById(nodeId)
    if (!arg) return
    setSelectedId(nodeId)
    setHistory((previous) => previous.includes(nodeId) ? previous : [...previous, nodeId])
    if (nextMode) setMode(nextMode)
    if (sectionKey !== 'all' && sectionKey !== arg.section) {
      setSectionKey('all')
      window.setTimeout(() => center(nodeId), 185)
    } else {
      center(nodeId)
    }
  }, [center, sectionKey])

  const switchSection = useCallback((id) => {
    setSectionKey(id)
    setSelectedId(null)
    setMode('map')
    setStudyIndex(0)
    setAnswerIndex(null)
  }, [])

  // Refit is tied to the route, never to the selected/dimmed node array.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const visible = aguaNodesForSection(sectionKey).map((arg) => ({ id: arg.id }))
      fitView({ nodes: visible, padding: 0.20, duration: 550, maxZoom: 0.93 })
    }, 110)
    return () => window.clearTimeout(t)
  }, [sectionKey, fitView])

  useEffect(() => {
    const onEscape = (event) => { if (event.key === 'Escape') setFullscreen(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('agua2d-page-fullscreen', fullscreen)
    return () => document.body.classList.remove('agua2d-page-fullscreen')
  }, [fullscreen])

  const flowNodes = useMemo(() => aguaArguments.map((arg) => {
    const group = aguaSections.find((s) => s.id === arg.section)
    const isRelated = related.has(arg.id)
    const next = mode === 'guide' && stepIndex >= 0 && guide[stepIndex + 1]?.id === arg.id
    return {
      id: arg.id,
      type: 'argumento',
      position: aguaPositionFor(arg),
      draggable: false,
      selectable: true,
      hidden: sectionKey !== 'all' && arg.section !== sectionKey,
      data: {
        argument: arg,
        tone: group?.tone || 'blue',
        sectionTitle: group?.title || 'Diálogo',
        selected: selectedId === arg.id,
        guided: mode === 'guide' && selectedId === arg.id,
        next,
        related: isRelated,
        dimmed: Boolean(selectedId) && !isRelated && !next,
      },
    }
  }), [sectionKey, selectedId, related, mode, stepIndex, guide])

  const flowEdges = useMemo(() => sourceEdges.map((r) => {
    const from = aguaNodeById(r.from)
    const to = aguaNodeById(r.to)
    const cross = from?.section !== to?.section
    const focus = Boolean(selectedId) && (r.from === selectedId || r.to === selectedId)
    const visibleRoute = sectionKey === 'all' || (from?.section === sectionKey && to?.section === sectionKey)
    return {
      id: r.id,
      source: r.from,
      target: r.to,
      sourceHandle: cross ? 'bottom' : 'right',
      targetHandle: cross ? 'top' : 'left',
      type: 'smoothstep',
      hidden: !visibleRoute || (cross && !focus && selectedId !== null),
      style: {
        stroke: r.kind === 'tension' ? 'var(--ph2d-topic-rust)' : 'var(--ph2d-edge)',
        strokeWidth: focus ? 2.9 : cross ? 1.35 : 1.85,
        opacity: !selectedId ? cross ? 0.20 : 0.55 : focus ? 1 : 0.12,
        strokeDasharray: cross && !focus ? '6 6' : undefined,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: r.kind === 'tension' ? '#9b4b38' : '#61584d',
      },
    }
  }), [sectionKey, selectedId, sourceEdges])

  const startGuide = () => {
    const first = (selected && guide.some((x) => x.id === selected.id)) ? selected : guide[0]
    if (first) choose(first.id, 'guide')
  }
  const startStudy = () => {
    if (sectionKey === 'all' && selected) setSectionKey(selected.section)
    setMode('study')
    setStudyIndex(0)
    setAnswerIndex(null)
    const first = aguaQuestions.find((q) => q.section === (sectionKey === 'all' && selected ? selected.section : currentSection.id))
    if (first) choose(first.nodeId)
  }
  const goTo = (offset) => {
    const next = guide[stepIndex + offset] || (stepIndex === -1 ? guide[0] : null)
    if (next) choose(next.id, mode === 'guide' ? 'guide' : undefined)
  }

  const controls = (
    <div className="agua2d-command-bar">
      <div className="agua2d-command-info"><strong>ATLAS 2D</strong><span>{aguaArguments.length} NODOS · {aguaRelations.length} RELACIONES · {aguaSections.length} RUTAS</span></div>
      <div className="agua2d-command-buttons">
        <button type="button" onClick={() => fitView({ padding: 0.14, duration: 500, maxZoom: 0.9 })}>ENCUADRAR ↗</button>
        <button type="button" onClick={() => setFullscreen((v) => !v)} aria-pressed={fullscreen}>{fullscreen ? 'SALIR DEL MAPA ×' : 'EXPANDIR ↗'}</button>
      </div>
    </div>
  )

  return (
    <div className={'agua2d-shell ' + (embedded ? 'is-embedded' : 'is-page')}>
      <header className="agua2d-intro">
        <div className="agua2d-intro-head">
          <p>SUPLEMENTO ANALÍTICO · EDICIÓN 04 · 19 DE OCTUBRE DE 2026</p>
          <h2>{embedded ? 'La crisis, conectada.' : 'Atlas del agua.'}</h2>
          <p>De la hipótesis ecológico-material a la pregunta por la justicia. Un mapa de lo argumentado y discutido, no un modelo hidrológico ni un consenso del encuentro.</p>
        </div>
        {embedded
          ? <Link className="agua2d-open-link" to="/cafe-filosofico/2026/10/19/agua/sistema-2d">ABRIR SISTEMA INDEPENDIENTE ↗</Link>
          : <Link className="agua2d-open-link" to="/cafe-filosofico/2026/10/19/agua">← REGRESAR AL REPORTAJE</Link>}
      </header>
      <div className="agua2d-provenance">
        <span>FRONTERA DE LAS FUENTES</span>
        <p>Base: memoria del encuentro del 19 de octubre. Las fichas son paráfrasis y reconstrucciones pedagógicas. La verificación documental externa permanece separada en el reportaje.</p>
      </div>
      <nav className="agua2d-routes" aria-label="Rutas de estudio">
        <button type="button" className={sectionKey === 'all' ? 'is-active' : ''} onClick={() => switchSection('all')}>
          <b>00</b><strong>Mapa completo</strong><small>{aguaArguments.length} nodos</small>
        </button>
        {aguaSections.map((section) =>
          <button key={section.id} type="button" className={sectionKey === section.id ? 'is-active' : ''} onClick={() => switchSection(section.id)} data-topic={section.tone}>
            <b>{section.number}</b><strong>{section.title}</strong><small>{aguaNodesForSection(section.id).length} nodos</small>
          </button>
        )}
      </nav>
      <section className="agua2d-orientation" aria-label="Orientación de la sección">
        <p><strong>ANTES</strong><span>{currentSection.before}</span></p>
        <p className="is-focus"><strong>{sectionKey === 'all' ? 'PROBLEMA RECTOR' : currentSection.title}</strong><span>{sectionKey === 'all' ? '¿Cómo interactúan ecología, infraestructura, decisiones y responsabilidad moral?' : currentSection.question}</span></p>
        <p><strong>DESPUÉS</strong><span>{currentSection.after}</span></p>
      </section>
      <div className="agua2d-study-launcher">
        <div><strong>RECORRIDO PEDAGÓGICO</strong><p>Puede seguir cada ruta completa, explorar libremente las relaciones o responder preguntas de recuperación activa.</p></div>
        <div>
          <button type="button" onClick={startGuide}>INICIAR GUÍA {sectionKey === 'all' ? 'COMPLETA' : 'DE ESTA SECCIÓN'} ↗</button>
          <button type="button" onClick={startStudy}>ESTUDIAR {sectionKey === 'all' ? 'UNA SECCIÓN' : 'ESTA SECCIÓN'} ↗</button>
        </div>
      </div>
      {mode === 'guide' && selected && <aside className="agua2d-guide-panel" aria-label="Guía activa">
        <div><span>GUÍA ACTIVA · {sectionKey === 'all' ? 'COMPLETA' : currentSection.title.toUpperCase()}</span><h3>Etapa {Math.max(1, stepIndex + 1)} / {guide.length} · {selected.title}</h3><p>{selected.explanation}</p></div>
        <div className="agua2d-guide-controls"><button type="button" disabled={stepIndex <= 0} onClick={() => goTo(-1)}>← ANTERIOR</button><button type="button" disabled={stepIndex >= guide.length - 1} onClick={() => goTo(1)}>SIGUIENTE →</button><button type="button" onClick={() => setMode('map')}>SALIR DE GUÍA</button></div>
      </aside>}
      {mode === 'study' && study && <aside className="agua2d-study-panel" aria-label="Modo estudio">
        <div className="agua2d-study-head"><span>PRÁCTICA EDITORIAL · NO ES PREGUNTA DEL PROFESOR</span><strong>PREGUNTA {studyIndex + 1} / {questions.length}</strong></div>
        <h3>{study.prompt}</h3>
        <div className="agua2d-answers">{study.options.map((answer, index) =>
          <button type="button" key={index} disabled={answerIndex !== null} className={answerIndex !== null && index === study.correct ? 'is-correct' : answerIndex === index ? 'is-incorrect' : ''} onClick={() => setAnswerIndex(index)}>{String(index + 1).padStart(2, '0')}. {answer}</button>)}</div>
        {answerIndex !== null && <div className="agua2d-study-feedback" role="status"><strong>{answerIndex === study.correct ? 'RESPUESTA ADECUADA' : 'REVISE LA DISTINCIÓN'}</strong><p>{study.explanation}</p><button type="button" onClick={() => choose(study.nodeId)}>VER NODO Y FUENTE ↗</button></div>}
        <footer><button type="button" onClick={() => { setStudyIndex(0); setAnswerIndex(null) }}>REINICIAR</button><button type="button" onClick={() => setMode('map')}>VOLVER AL MAPA</button><button type="button" disabled={answerIndex === null || studyIndex >= questions.length - 1} onClick={() => { setStudyIndex((i) => i + 1); setAnswerIndex(null); const next = questions[studyIndex + 1]; if (next) choose(next.nodeId) }}>SIGUIENTE PREGUNTA →</button></footer>
      </aside>}
      <div ref={workspace} className={'agua2d-workspace ' + (fullscreen ? 'is-fullscreen' : '')}>
        {controls}
        <div className="agua2d-workspace-body">
          <div className="agua2d-graph" role="region" aria-label="Mapa bidimensional navegable de argumentos">
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
              nodeTypes={nodeTypes}
              onNodeClick={(_, node) => choose(node.id)}
              onPaneClick={() => { if (mode === 'map') setSelectedId(null) }}
              fitView
              fitViewOptions={{ padding: 0.14, maxZoom: 0.9 }}
              nodesDraggable={false}
              minZoom={0.12}
              maxZoom={1.5}
              onlyRenderVisibleElements
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#b2a99c" gap={26} size={1} />
              <Controls showInteractive={false} position="bottom-left" />
            </ReactFlow>
          </div>
          <aside className="agua2d-inspector" aria-label="Folio del nodo seleccionado">
            {selected ? <>
              <div className="agua2d-inspector-meta"><span>{selected.id} / {aguaArguments.length} · {selected.kind}</span><span>{selected.critical ? 'PUNTO EN DISCUSIÓN' : 'DIÁLOGO DOCUMENTADO'}</span></div>
              <h3>{selected.title}</h3>
              <p className="agua2d-inspector-lead">{selected.summary}</p>
              <div className="agua2d-inspector-scroll">
                <section><h4>QUÉ SIGNIFICA</h4><p>{selected.explanation}</p></section>
                <section><h4>FUNCIÓN ARGUMENTAL</h4><p>{selected.argument}</p></section>
                <section><h4>PROCEDENCIA</h4><p>{selected.voice}</p><small>{sourceLabel} · Paráfrasis de memoria, no cita textual.</small></section>
                <section><h4>PREGUNTA PARA ESTUDIAR</h4><p>{selected.question}</p><details><summary>VER RESPUESTA DE ESTUDIO</summary><p>{selected.studyAnswer}</p></details></section>
                <section><h4>RELACIONES DOCUMENTADAS / EDITORIALES</h4><ul>{sourceEdges.filter((r) => r.from === selected.id || r.to === selected.id).map((r) => {
                  const other = aguaNodeById(r.from === selected.id ? r.to : r.from)
                  return <li key={r.id}><button type="button" onClick={() => choose(other.id)}>{r.label} → {other.title} ({other.id})</button></li>
                })}</ul><small>Las conexiones se rotulan como reconstrucción de estudio cuando relacionan intervenciones distintas.</small></section>
                <section className="agua2d-mini-tree"><h4>ESQUEMA DEL FOLIO</h4><div><span>ANTES · {currentSection.before}</span><b>↓</b><strong>{selected.title}</strong><b>↓</b><span>DESPUÉS · {currentSection.after}</span></div></section>
              </div>
            </> : <div className="agua2d-empty"><span>FOLIO · NÚM. 00</span><h3>Una pregunta abre el mapa.</h3><p>Seleccione cualquier nodo para leer su argumento, su procedencia, sus objeciones y las relaciones con otras intervenciones.</p></div>}
          </aside>
        </div>
        <footer className="agua2d-workspace-footer"><button type="button" disabled={stepIndex <= 0} onClick={() => goTo(-1)}>← ANTERIOR</button><span>{sectionKey === 'all' ? 'ATLAS COMPLETO' : currentSection.title.toUpperCase()} · {stepIndex < 0 ? '—' : stepIndex + 1} / {guide.length}</span><button type="button" disabled={stepIndex >= guide.length - 1} onClick={() => goTo(1)}>{stepIndex < 0 ? 'EMPEZAR' : 'SIGUIENTE'} →</button></footer>
      </div>
      <section className="agua2d-history" aria-label="Historial de estudio">
        <div><span>HISTORIAL DE LECTURA</span><p>{history.length} de {aguaArguments.length} argumentos visitados.</p></div>
        <div>{history.length ? history.slice(-12).map((id) => <button type="button" key={id} onClick={() => choose(id)}>{id} · {aguaNodeById(id)?.title}</button>) : <p>Explore el mapa para construir su recorrido.</p>}</div>
      </section>
      <p className="agua2d-footnote">Este atlas organiza lo discutido en el Café Filosófico. No es un dictamen técnico, un posicionamiento colectivo ni un registro literal de las voces. Los nodos críticos y las relaciones editoriales conservan esa advertencia.</p>
    </div>
  )
}

export default function CafeAguaSystem2D({ embedded = false }) {
  return <ReactFlowProvider><AguaSystemWorkspace embedded={embedded} /></ReactFlowProvider>
}
