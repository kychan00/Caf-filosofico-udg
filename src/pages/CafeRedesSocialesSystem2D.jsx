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
import AnimatedConceptSchema from '../components/philosophy/schema/AnimatedConceptSchema'
import '../components/philosophy/system2d/System2DTheme.css'
import {
  redesArguments,
  redesEvidence,
  redesNodeById,
  redesNodesForSection,
  redesPositionFor,
  redesRelations,
  redesSections,
  redesStudyQuestions,
} from '../data/cafeRedesSocialesSystem2D'
import './CafeRedesSocialesSystem2D.css'

const NODE_WIDTH = 326
const NODE_HEIGHT = 238

function RedesNode({ data }) {
  const node = data.argument
  return (
    <article
      className={[
        'redes2d-node',
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
      <div className="redes2d-node-top">
        <span>{node.code} / {redesArguments.length}</span>
        <strong>{node.kind}</strong>
      </div>
      <p className="redes2d-node-family">{data.sectionTitle}</p>
      <h3>{node.title}</h3>
      <p className="redes2d-node-summary">{node.summary}</p>
      <footer>
        <span>{node.critical ? 'PUNTO DE TENSIÓN · ' : ''}MEMORIA DEL DIÁLOGO</span>
        <strong>ABRIR FOLIO ↗</strong>
      </footer>
      <Handle type="source" id="right" position={Position.Right} />
      <Handle type="source" id="bottom" position={Position.Bottom} />
    </article>
  )
}

const nodeTypes = { argumento: RedesNode }

function RedesWorkspace({ embedded = false }) {
  const { setCenter, fitView } = useReactFlow()
  const [sectionKey, setSectionKey] = useState('all')
  const [selectedId, setSelectedId] = useState(null)
  const [mode, setMode] = useState('map')
  const [studyIndex, setStudyIndex] = useState(0)
  const [answerIndex, setAnswerIndex] = useState(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [history, setHistory] = useState([])
  const workspaceRef = useRef(null)

  const selected = selectedId ? redesNodeById(selectedId) : null
  const currentSection =
    redesSections.find((section) => section.id === sectionKey) ||
    redesSections.find((section) => section.id === selected?.section) ||
    redesSections[0]

  const guide = useMemo(() => redesNodesForSection(sectionKey), [sectionKey])
  const stepIndex = guide.findIndex((node) => node.id === selectedId)
  const questions = useMemo(
    () => sectionKey === 'all'
      ? redesStudyQuestions
      : redesStudyQuestions.filter((question) => question.section === sectionKey),
    [sectionKey],
  )
  const study = questions[studyIndex] || questions[0]

  const related = useMemo(() => {
    const connected = new Set(selectedId ? [selectedId] : [])
    redesRelations.forEach((relation) => {
      if (relation.from === selectedId) connected.add(relation.to)
      if (relation.to === selectedId) connected.add(relation.from)
    })
    return connected
  }, [selectedId])

  const center = useCallback((nodeId, duration = 440) => {
    const node = redesNodeById(nodeId)
    if (!node) return
    const position = redesPositionFor(node)
    const narrow = typeof window !== 'undefined' && window.innerWidth < 760
    setCenter(
      position.x + NODE_WIDTH / 2,
      position.y + NODE_HEIGHT / 2,
      { zoom: narrow ? 0.76 : 1.02, duration },
    )
  }, [setCenter])

  const choose = useCallback((nodeId, nextMode) => {
    const node = redesNodeById(nodeId)
    if (!node) return

    setSelectedId(nodeId)
    setHistory((previous) => previous.includes(nodeId) ? previous : [...previous, nodeId].slice(-12))
    if (nextMode) setMode(nextMode)

    if (sectionKey !== 'all' && sectionKey !== node.section) {
      setSectionKey('all')
      window.setTimeout(() => center(nodeId), 170)
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const visible = redesNodesForSection(sectionKey).map((node) => ({ id: node.id }))
      fitView({ nodes: visible, padding: 0.19, duration: 520, maxZoom: 0.9 })
    }, 110)
    return () => window.clearTimeout(timer)
  }, [sectionKey, fitView])

  useEffect(() => {
    const syncFullscreen = () => {
      const active = document.fullscreenElement === workspaceRef.current
      setFullscreen(active || workspaceRef.current?.classList.contains('is-fallback-fullscreen'))
      window.setTimeout(() => fitView({ padding: 0.1, duration: 380, maxZoom: 0.92 }), 80)
    }

    document.addEventListener('fullscreenchange', syncFullscreen)
    return () => document.removeEventListener('fullscreenchange', syncFullscreen)
  }, [fitView])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape' && fullscreen && !document.fullscreenElement) {
        workspaceRef.current?.classList.remove('is-fallback-fullscreen')
        setFullscreen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [fullscreen])

  const toggleFullscreen = async () => {
    const host = workspaceRef.current
    if (!host) return

    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    if (host.requestFullscreen) {
      await host.requestFullscreen()
      return
    }

    host.classList.toggle('is-fallback-fullscreen')
    setFullscreen(host.classList.contains('is-fallback-fullscreen'))
    window.setTimeout(() => fitView({ padding: 0.1, duration: 380, maxZoom: 0.92 }), 80)
  }

  const flowNodes = useMemo(() => redesArguments.map((node) => {
    const section = redesSections.find((item) => item.id === node.section)
    const next = mode === 'guide' && stepIndex >= 0 && guide[stepIndex + 1]?.id === node.id
    const isRelated = related.has(node.id)

    return {
      id: node.id,
      type: 'argumento',
      position: redesPositionFor(node),
      draggable: false,
      selectable: true,
      hidden: sectionKey !== 'all' && node.section !== sectionKey,
      data: {
        argument: node,
        tone: section?.tone || 'blue',
        sectionTitle: section?.title || 'Diálogo',
        selected: selectedId === node.id,
        guided: mode === 'guide' && selectedId === node.id,
        next,
        related: isRelated,
        dimmed: Boolean(selectedId) && !isRelated && !next && selectedId !== node.id,
      },
    }
  }), [sectionKey, selectedId, related, mode, stepIndex, guide])

  const flowEdges = useMemo(() => redesRelations.map((relation) => {
    const from = redesNodeById(relation.from)
    const to = redesNodeById(relation.to)
    const cross = from?.section !== to?.section
    const focus = Boolean(selectedId) && (relation.from === selectedId || relation.to === selectedId)
    const visibleRoute =
      sectionKey === 'all' ||
      (from?.section === sectionKey && to?.section === sectionKey)

    return {
      id: relation.id,
      source: relation.from,
      target: relation.to,
      sourceHandle: cross ? 'bottom' : 'right',
      targetHandle: cross ? 'top' : 'left',
      type: 'smoothstep',
      hidden: !visibleRoute,
      label: focus ? relation.label : undefined,
      labelStyle: { fontSize: 11, fontWeight: 700, fill: '#433b33' },
      labelBgStyle: { fill: '#f7f0e4', fillOpacity: 0.92 },
      style: {
        stroke: relation.kind === 'tension' ? 'var(--ph2d-topic-rust)' : 'var(--ph2d-edge)',
        strokeWidth: focus ? 2.9 : cross ? 1.35 : 1.85,
        opacity: !selectedId ? (cross ? 0.28 : 0.62) : focus ? 1 : 0.12,
        strokeDasharray: relation.kind === 'tension' ? '7 5' : undefined,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 14,
        height: 14,
        color: relation.kind === 'tension' ? '#9b4b38' : '#61584d',
      },
    }
  }), [sectionKey, selectedId])

  const startGuide = () => {
    const first = selected && guide.some((node) => node.id === selected.id)
      ? selected
      : guide[0]
    if (first) choose(first.id, 'guide')
  }

  const startStudy = () => {
    const targetSection = sectionKey === 'all' && selected
      ? selected.section
      : sectionKey

    if (sectionKey === 'all' && selected) setSectionKey(selected.section)
    setMode('study')
    setStudyIndex(0)
    setAnswerIndex(null)

    const first = redesStudyQuestions.find(
      (question) => targetSection === 'all' || question.section === targetSection,
    )
    if (first) choose(first.nodeId)
  }

  const goTo = (offset) => {
    const next = guide[stepIndex + offset] || (stepIndex === -1 ? guide[0] : null)
    if (next) choose(next.id, mode === 'guide' ? 'guide' : undefined)
  }

  return (
    <div className={'redes2d-shell ' + (embedded ? 'is-embedded' : 'is-page')}>
      <header className="redes2d-intro">
        <div>
          <p>SISTEMA 2D · EDICIÓN 05 · 03 NOV 2026</p>
          <h1>{embedded ? 'La red, conectada.' : 'Atlas de las redes sociales.'}</h1>
          <p>
            Doce argumentos reconstruidos desde la memoria del encuentro. El mapa
            conserva desacuerdos y relaciones editoriales sin convertirlos en una
            doctrina única del Café.
          </p>
        </div>
        {embedded
          ? <Link to="/cafe-filosofico/2026/11/03/redes-sociales/sistema-2d">ABRIR SISTEMA INDEPENDIENTE ↗</Link>
          : <Link to="/cafe-filosofico/2026/11/03/redes-sociales">← REGRESAR A LA MEMORIA</Link>}
      </header>

      <aside className="redes2d-source-boundary">
        <span>FRONTERA DE LAS FUENTES</span>
        <p>
          Base: memoria del diálogo del 3 de noviembre. Los nodos son paráfrasis y
          reconstrucciones pedagógicas. Las noticias, cifras y ejemplos empíricos
          mencionados durante la sesión permanecen fuera del mapa mientras no hayan
          sido verificados por una capa documental separada.
        </p>
      </aside>

      <nav className="redes2d-routes" aria-label="Rutas del sistema 2D">
        <button
          type="button"
          className={sectionKey === 'all' ? 'is-active' : ''}
          onClick={() => switchSection('all')}
        >
          <b>00</b><strong>Mapa completo</strong><small>{redesArguments.length} nodos</small>
        </button>
        {redesSections.map((section) => (
          <button
            key={section.id}
            type="button"
            data-topic={section.tone}
            className={sectionKey === section.id ? 'is-active' : ''}
            onClick={() => switchSection(section.id)}
          >
            <b>{section.number}</b>
            <strong>{section.title}</strong>
            <small>{redesNodesForSection(section.id).length} nodos</small>
          </button>
        ))}
      </nav>

      <section className="redes2d-orientation" aria-label="Antes, desarrollo y después">
        <p><strong>ANTES</strong><span>{currentSection.before}</span></p>
        <p className="is-focus">
          <strong>{sectionKey === 'all' ? 'PROBLEMA RECTOR' : currentSection.title}</strong>
          <span>
            {sectionKey === 'all'
              ? '¿Cómo se conectan identidad, distancia, plataforma, deseo y responsabilidad?'
              : currentSection.question}
          </span>
        </p>
        <p><strong>DESPUÉS</strong><span>{currentSection.after}</span></p>
      </section>

      <section className="redes2d-pedagogy">
        <div>
          <strong>RECORRIDO PEDAGÓGICO</strong>
          <p>
            Puede explorar libremente, seguir todos los nodos de una ruta o practicar
            recuperación activa con preguntas ligadas a la memoria.
          </p>
        </div>
        <div>
          <button type="button" onClick={startGuide}>
            INICIAR GUÍA {sectionKey === 'all' ? 'COMPLETA' : 'DE ESTA RUTA'} ↗
          </button>
          <button type="button" onClick={startStudy}>
            ESTUDIAR {sectionKey === 'all' ? 'EL MAPA' : 'ESTA RUTA'} ↗
          </button>
        </div>
      </section>

      {mode === 'guide' && selected && (
        <aside className="redes2d-guide" aria-label="Guía activa">
          <div>
            <span>GUÍA ACTIVA · {sectionKey === 'all' ? 'MAPA COMPLETO' : currentSection.title.toUpperCase()}</span>
            <h2>Etapa {Math.max(1, stepIndex + 1)} / {guide.length} · {selected.title}</h2>
            <p>{selected.explanation}</p>
          </div>
          <div>
            <button type="button" disabled={stepIndex <= 0} onClick={() => goTo(-1)}>← ANTERIOR</button>
            <button type="button" disabled={stepIndex >= guide.length - 1} onClick={() => goTo(1)}>SIGUIENTE →</button>
            <button type="button" onClick={() => setMode('map')}>SALIR DE GUÍA</button>
          </div>
        </aside>
      )}

      {mode === 'study' && study && (
        <aside className="redes2d-study" aria-label="Modo estudio">
          <div className="redes2d-study-head">
            <span>EJERCICIO DE ESTUDIO · SIN ATRIBUCIÓN DOCENTE</span>
            <strong>PREGUNTA {studyIndex + 1} / {questions.length}</strong>
          </div>
          <h2>{study.prompt}</h2>
          <div className="redes2d-study-options">
            {study.options.map((option, index) => (
              <button
                type="button"
                key={option}
                disabled={answerIndex !== null}
                className={
                  answerIndex !== null && index === study.correct
                    ? 'is-correct'
                    : answerIndex === index
                      ? 'is-incorrect'
                      : ''
                }
                onClick={() => setAnswerIndex(index)}
              >
                {String(index + 1).padStart(2, '0')}. {option}
              </button>
            ))}
          </div>
          {answerIndex !== null && (
            <div className="redes2d-study-feedback" role="status">
              <strong>{answerIndex === study.correct ? 'RESPUESTA ADECUADA' : 'REVISE LA DISTINCIÓN'}</strong>
              <p>{study.explanation}</p>
              <button type="button" onClick={() => choose(study.nodeId)}>VER NODO ↗</button>
            </div>
          )}
          <footer>
            <button type="button" onClick={() => { setStudyIndex(0); setAnswerIndex(null) }}>REINICIAR</button>
            <button type="button" onClick={() => setMode('map')}>VOLVER AL MAPA</button>
            <button
              type="button"
              disabled={answerIndex === null || studyIndex >= questions.length - 1}
              onClick={() => {
                const nextIndex = studyIndex + 1
                setStudyIndex(nextIndex)
                setAnswerIndex(null)
                const next = questions[nextIndex]
                if (next) choose(next.nodeId)
              }}
            >
              SIGUIENTE PREGUNTA →
            </button>
          </footer>
        </aside>
      )}

      <div ref={workspaceRef} className="redes2d-workspace">
        <div className="redes2d-command">
          <div>
            <strong>ATLAS 2D</strong>
            <span>{redesArguments.length} NODOS · {redesRelations.length} RELACIONES · {redesSections.length} RUTAS</span>
          </div>
          <div>
            <button type="button" onClick={() => fitView({ padding: 0.14, duration: 480, maxZoom: 0.9 })}>ENCUADRAR ↗</button>
            <button type="button" onClick={toggleFullscreen} aria-pressed={fullscreen}>
              {fullscreen ? 'SALIR DEL MAPA ×' : 'PANTALLA COMPLETA ↗'}
            </button>
          </div>
        </div>

        <div className="redes2d-workspace-body">
          <div className="redes2d-graph" role="region" aria-label="Mapa bidimensional navegable de Redes sociales">
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

          <aside className="redes2d-inspector" aria-label="Folio del nodo seleccionado">
            {selected ? (
              <>
                <div className="redes2d-inspector-meta">
                  <span>{selected.code} / {redesArguments.length} · {selected.kind}</span>
                  <span>{selected.critical ? 'PUNTO DE TENSIÓN' : 'DIÁLOGO DOCUMENTADO'}</span>
                </div>
                <h2>{selected.title}</h2>
                <p className="redes2d-inspector-lead">{selected.summary}</p>
                <div className="redes2d-inspector-scroll">
                  <section>
                    <h3>QUÉ SIGNIFICA</h3>
                    <p>{selected.explanation}</p>
                  </section>
                  <section>
                    <h3>FUNCIÓN ARGUMENTAL</h3>
                    <p>{selected.argument}</p>
                  </section>
                  <section>
                    <h3>CONCEPTOS</h3>
                    <div className="redes2d-concepts">
                      {selected.concepts.map((concept) => <span key={concept}>{concept}</span>)}
                    </div>
                  </section>
                  <section>
                    <h3>PROCEDENCIA</h3>
                    <p>{selected.source}</p>
                    <small>Paráfrasis de memoria, no cita textual.</small>
                  </section>
                  <section>
                    <h3>PREGUNTA DE ESTUDIO</h3>
                    <p>{selected.question}</p>
                  </section>
                  {selected.schema && (
                    <section className="redes2d-schema">
                      <h3>ESQUEMA CONCEPTUAL</h3>
                      <AnimatedConceptSchema key={'redes-schema-' + selected.id} schema={selected.schema} />
                    </section>
                  )}
                  <section>
                    <h3>RELACIONES</h3>
                    <ul>
                      {redesRelations
                        .filter((relation) => relation.from === selected.id || relation.to === selected.id)
                        .map((relation) => {
                          const other = redesNodeById(relation.from === selected.id ? relation.to : relation.from)
                          return (
                            <li key={relation.id}>
                              <button type="button" onClick={() => choose(other.id)}>
                                {relation.label} → {other.title} ({other.id})
                              </button>
                            </li>
                          )
                        })}
                    </ul>
                  </section>
                  <section className="redes2d-mini-tree">
                    <h3>ANTES → DESARROLLO → DESPUÉS</h3>
                    <div>
                      <span>{currentSection.before}</span>
                      <b>↓</b>
                      <strong>{selected.title}</strong>
                      <b>↓</b>
                      <span>{currentSection.after}</span>
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <div className="redes2d-empty">
                <span>FOLIO · NÚM. 00</span>
                <h2>Una pregunta abre la red.</h2>
                <p>
                  Seleccione cualquier nodo para leer su argumento, procedencia,
                  relaciones y pregunta de estudio.
                </p>
              </div>
            )}
          </aside>
        </div>

        <footer className="redes2d-workspace-footer">
          <button type="button" disabled={stepIndex <= 0} onClick={() => goTo(-1)}>← ANTERIOR</button>
          <span>
            {sectionKey === 'all' ? 'ATLAS COMPLETO' : currentSection.title.toUpperCase()}
            {' · '}
            {stepIndex < 0 ? '—' : stepIndex + 1} / {guide.length}
          </span>
          <button type="button" disabled={stepIndex >= guide.length - 1} onClick={() => goTo(1)}>
            {stepIndex < 0 ? 'EMPEZAR' : 'SIGUIENTE'} →
          </button>
        </footer>
      </div>

      <section className="redes2d-evidence" aria-labelledby="redes2d-evidence-title">
        <header>
          <span>EVIDENCIA DEL ENCUENTRO · 03 NOV 2026</span>
          <h2 id="redes2d-evidence-title">La conversación también ocurrió <em>en un lugar.</em></h2>
          <p>
            Estas fotografías documentan la realización presencial de la edición 05.
            Funcionan como evidencia material del encuentro y no como prueba de una
            tesis filosófica particular.
          </p>
        </header>
        <div className="redes2d-evidence-grid">
          {redesEvidence.map((photo) => (
            <figure key={photo.id}>
              {photo.src
                ? <img src={import.meta.env.BASE_URL + photo.src} alt={photo.alt} loading="lazy" />
                : <div className="redes2d-evidence-pending" role="note" data-evidence-pending={photo.id}>
                    <strong>Fotografía pendiente de recuperación</strong>
                    <p>La copia disponible está incompleta. La imagen original debe recuperarse antes de su publicación, sin reconstruir ni inventar contenido.</p>
                  </div>}
              <figcaption>
                <strong>{photo.title}</strong>
                <p>{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="redes2d-history" aria-label="Historial de lectura">
        <div>
          <span>HISTORIAL DE LECTURA</span>
          <p>{history.length} de {redesArguments.length} argumentos visitados.</p>
        </div>
        <div>
          {history.length
            ? history.map((id) => (
                <button type="button" key={id} onClick={() => choose(id)}>
                  {id} · {redesNodeById(id)?.title}
                </button>
              ))
            : <p>Explore el mapa para construir su recorrido.</p>}
        </div>
      </section>

      <p className="redes2d-footnote">
        Este sistema organiza lo discutido en el Café Filosófico. No es un
        posicionamiento colectivo, un modelo causal de redes sociales ni una
        transcripción literal de las voces.
      </p>
    </div>
  )
}

export default function CafeRedesSocialesSystem2D({ embedded = false }) {
  return (
    <ReactFlowProvider>
      <RedesWorkspace embedded={embedded} />
    </ReactFlowProvider>
  )
}
