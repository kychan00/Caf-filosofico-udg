import SectionPedagogy from '../components/philosophy/system2d/SectionPedagogy'
import { initialSystem2DRoute, useSystem2DCompactViewport } from '../components/philosophy/system2d/mobilePerformance.js'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import {
  Background,
  Controls,
  MarkerType,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import './CafeMercadotecniaSystem2D.css'

import CafeMercadotecniaNode from '../components/cafe/CafeMercadotecniaNode'
import AnimatedConceptSchema from '../components/philosophy/schema/AnimatedConceptSchema'
import {
  marketingDialogueEdges,
  marketingDialogueGuidedRoute,
  marketingDialogueNodeById,
  marketingDialogueNodes,
  marketingDialogueRoutes,
  marketingDialogueSource,
} from '../data/cafeMercadotecniaSystem2D'

const nodeTypes = { text: CafeMercadotecniaNode, core: CafeMercadotecniaNode }

function SystemCanvas({ embedded = false }) {
  const [route, setRoute] = useState(() => initialSystem2DRoute(marketingDialogueRoutes))
  const compactViewport = useSystem2DCompactViewport()
  const [selectedId, setSelectedId] = useState(null)
  const [folioId, setFolioId] = useState(null)
  const [guidedMode, setGuidedMode] = useState(false)
  const [guidedIndex, setGuidedIndex] = useState(0)
  const [history, setHistory] = useState([])
  const [workspaceFullscreen, setWorkspaceFullscreen] = useState(false)
  const workspaceRef = useRef(null)
  const { fitView, setCenter } = useReactFlow()

  const selected = marketingDialogueNodeById(selectedId)
  const folio = marketingDialogueNodeById(folioId)
  const guidedStep = marketingDialogueGuidedRoute[guidedIndex] || null
  const guidedNext = marketingDialogueGuidedRoute[guidedIndex + 1] || null

  const guidedSequence = useMemo(
    () => marketingDialogueGuidedRoute.map((step) => step.id),
    [],
  )

  const routeSequence = useMemo(
    () =>
      route === 'all'
        ? marketingDialogueNodes.map((node) => node.id)
        : marketingDialogueNodes
            .filter((node) => node.data.branch.includes(route))
            .map((node) => node.id),
    [route],
  )

  const routeIds = useMemo(() => new Set(routeSequence), [routeSequence])

  const routeSupport = useMemo(() => {
    if (route === 'all') return new Set()
    const support = new Set()

    marketingDialogueNodes.forEach((node) => {
      if (!routeIds.has(node.id)) return
      node.data.dependsOn.forEach((id) => {
        if (!routeIds.has(id)) support.add(id)
      })
    })

    return support
  }, [route, routeIds])

  const routeNumberById = useMemo(
    () => new Map(routeSequence.map((id, index) => [id, index + 1])),
    [routeSequence],
  )

  const relatedIds = useMemo(() => {
    if (!selectedId) return new Set()
    const ids = new Set([selectedId])
    marketingDialogueEdges.forEach((edge) => {
      if (edge.source === selectedId) ids.add(edge.target)
      if (edge.target === selectedId) ids.add(edge.source)
    })
    return ids
  }, [selectedId])

  const nodes = useMemo(
    () =>
      marketingDialogueNodes.map((node) => {
        const routeActive = route === 'all' || routeIds.has(node.id)
        const support = routeSupport.has(node.id)
        const guidedCurrent = guidedMode && node.id === guidedStep?.id
        const guidedNextNode = guidedMode && node.id === guidedNext?.id
        const dimmed = guidedMode
          ? !guidedCurrent && !guidedNextNode && node.id !== selectedId
          : selectedId
            ? !relatedIds.has(node.id)
            : !routeActive && !support

        return {
          ...node,
          hidden: !guidedMode && route !== 'all' && !routeActive && !support,
          draggable: false,
          data: {
            ...node.data,
            routeActive: route !== 'all' && routeActive,
            routeNumber: route !== 'all' && routeActive ? routeNumberById.get(node.id) : null,
            routeTotal: route !== 'all' && routeActive ? routeSequence.length : null,
            highlighted: selectedId && node.id !== selectedId && relatedIds.has(node.id),
            dimmed,
            guidedCurrent,
            guidedNext: guidedNextNode,
            onOpenFolio: () => setFolioId(node.id),
          },
        }
      }),
    [route, routeIds, routeSupport, routeNumberById, routeSequence.length, guidedMode, guidedStep, guidedNext, selectedId, relatedIds],
  )

  const edges = useMemo(
    () =>
      marketingDialogueEdges.map((edge) => {
        const sourceVisible = routeIds.has(edge.source) || routeSupport.has(edge.source)
        const targetVisible = routeIds.has(edge.target) || routeSupport.has(edge.target)
        const visible = route === 'all' || (sourceVisible && targetVisible)
        const touches = selectedId && (edge.source === selectedId || edge.target === selectedId)
        const guidedActive = guidedMode && (
          (edge.source === guidedStep?.id && edge.target === guidedNext?.id) ||
          edge.target === guidedStep?.id
        )
        const stroke = guidedActive ? '#526c59' : touches ? '#9c7434' : '#61584d'
        return {
          ...edge,
          hidden: !guidedMode && !visible,
          type: 'smoothstep',
          style: {
            stroke,
            strokeWidth: guidedActive ? 3 : touches ? 2.7 : 1.1,
            opacity: guidedMode ? (guidedActive ? 1 : .06) : touches ? 1 : .34,
          },
          markerEnd: { type: MarkerType.ArrowClosed, width: 11, height: 11, color: stroke },
        }
      }),
    [route, routeIds, routeSupport, selectedId, guidedMode, guidedStep, guidedNext],
  )

  const selectNode = useCallback((node) => {
    if (!node) return
    setSelectedId(node.id)
    setHistory((current) => current[current.length - 1] === node.id ? current : [...current.slice(-9), node.id])
    setCenter(node.position.x + 150, node.position.y + 90, { zoom: 1.05, duration: 450 })
  }, [setCenter])

  const selectById = useCallback((id) => {
    const node = marketingDialogueNodeById(id)
    if (!node) return

    if (guidedMode) {
      const guideIndex = guidedSequence.indexOf(id)

      if (guideIndex >= 0) {
        setGuidedIndex(guideIndex)
        return
      }

      setGuidedMode(false)
      setGuidedIndex(0)
    }

    selectNode(node)
  }, [selectNode, guidedMode, guidedSequence])

  useEffect(() => {
    window.setTimeout(() => {
      fitView({ padding: .16, duration: 650, maxZoom: .9 })
    }, 0)
  }, [route, fitView])

  useEffect(() => {
    if (!guidedMode || !guidedStep) return
    const node = marketingDialogueNodeById(guidedStep.id)
    if (!node) return
    setSelectedId(node.id)
    setCenter(node.position.x + 150, node.position.y + 90, { zoom: 1.05, duration: 500 })
  }, [guidedMode, guidedIndex, guidedStep, setCenter])

  const toggleFullscreen = useCallback(async () => {
    const el = workspaceRef.current
    if (!el) return

    const activeElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      null

    try {
      if (activeElement) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen
        if (exit) await Promise.resolve(exit.call(document))
        return
      }

      const request = el.requestFullscreen || el.webkitRequestFullscreen
      if (request) {
        await Promise.resolve(request.call(el))
        return
      }

      setWorkspaceFullscreen((value) => !value)
    } catch {
      setWorkspaceFullscreen((value) => !value)
    }

    window.setTimeout(() => fitView({ padding: .06, duration: 420 }), 100)
  }, [fitView])

  useEffect(() => {
    const sync = () => {
      const activeElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        null

      setWorkspaceFullscreen(activeElement === workspaceRef.current)

      window.setTimeout(() => {
        fitView({ padding: .06, duration: 420 })
      }, 100)
    }

    document.addEventListener('fullscreenchange', sync)
    document.addEventListener('webkitfullscreenchange', sync)

    return () => {
      document.removeEventListener('fullscreenchange', sync)
      document.removeEventListener('webkitfullscreenchange', sync)
    }
  }, [fitView])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setFolioId(null)
        if (!document.fullscreenElement) setWorkspaceFullscreen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const selectedConsequences = useMemo(
    () =>
      selectedId
        ? marketingDialogueNodes.filter((node) => node.data.dependsOn.includes(selectedId))
        : [],
    [selectedId],
  )

  const routeIndex = selectedId ? routeSequence.indexOf(selectedId) : -1

  const navigationSequence = guidedMode ? guidedSequence : routeSequence
  const navigationIndex = guidedMode ? guidedIndex : routeIndex

  const prevId =
    navigationIndex > 0
      ? navigationSequence[navigationIndex - 1]
      : null

  const nextId =
    navigationIndex >= 0 && navigationIndex < navigationSequence.length - 1
      ? navigationSequence[navigationIndex + 1]
      : navigationIndex < 0
        ? navigationSequence[0] || null
        : null

  const goPrevious = () => {
    if (guidedMode) {
      setGuidedIndex((index) => Math.max(0, index - 1))
      return
    }

    if (prevId) selectById(prevId)
  }

  const goNext = () => {
    if (guidedMode) {
      setGuidedIndex((index) =>
        Math.min(marketingDialogueGuidedRoute.length - 1, index + 1),
      )
      return
    }

    if (nextId) selectById(nextId)
  }

  const routeLabel = marketingDialogueRoutes.find((item) => item.id === route)?.label || 'Ruta'
  const navigationLabel = guidedMode ? 'LECTURA GUIADA' : routeLabel.toUpperCase()
  const navigationTotal = guidedMode ? guidedSequence.length : routeSequence.length

  const Root = embedded ? 'section' : 'main'

  return (
    <Root className={'cafe2d-page' + (embedded ? ' is-embedded' : '')}>
      {!embedded && (
        <>
          <nav className="cafe2d-nav">
            <Link to="/cafe-filosofico/2026/10/05/mercadotecnia">← MERCADOTECNIA</Link>
            <strong>MAPA DIALÓGICO 2D</strong>
            <span>EDICIÓN 03 · 05 OCT 2026</span>
          </nav>

          <header className="cafe2d-hero">
            <p>CAFÉ FILOSÓFICO · MEMORIA ARGUMENTAL</p>
            <h1>Mercadotecnia</h1>
            <h2>Deseo · persuasión · libertad</h2>
            <p>
              Reconstrucción 2D de la conversación real: posiciones, distinciones,
              ejemplos, autores y problemas abiertos conectados por dependencia argumental.
            </p>
          </header>
        </>
      )}

      {embedded && (
        <header className="cafe2d-embedded-head">
          <div>
            <span>SISTEMA 2D · MEMORIA ARGUMENTAL</span>
            <h2>Mapa dialógico del Café</h2>
            <p>
              Recorra directamente aquí las posiciones, objeciones, ejemplos,
              autores y problemas abiertos de la sesión.
            </p>
          </div>
          <Link to="/cafe-filosofico/2026/10/05/mercadotecnia/sistema-2d">
            Abrir en vista completa →
          </Link>
        </header>
      )}

      <section className="cafe2d-source">
        <div><span>FRONTERA DE FUENTE</span><strong>{marketingDialogueSource.title}</strong></div>
        <p>{marketingDialogueSource.boundary}</p>
      </section>

      <section className="cafe2d-guide-launcher">
        <div>
          <span>LECTURA GUIADA</span>
          <strong>{marketingDialogueGuidedRoute.length} pasos · recorrido completo de todos los nodos</strong>
        </div>
        <button type="button" onClick={() => setGuidedMode((value) => !value)}>
          {guidedMode ? 'Salir de la guía' : 'Iniciar guía'}
        </button>
      </section>

      {guidedMode && guidedStep && (
        <section className="cafe2d-guide">
          <div><span>PASO {String(guidedIndex + 1).padStart(2,'0')} / {marketingDialogueGuidedRoute.length}</span><strong>{guidedStep.focus}</strong></div>
          <p>{guidedStep.explanation}</p>
          <div>
            <button type="button" disabled={guidedIndex === 0} onClick={() => setGuidedIndex((i) => Math.max(0, i - 1))}>← Anterior</button>
            <button type="button" disabled={guidedIndex === marketingDialogueGuidedRoute.length - 1} onClick={() => setGuidedIndex((i) => Math.min(marketingDialogueGuidedRoute.length - 1, i + 1))}>Siguiente →</button>
          </div>
        </section>
      )}

      <section className="cafe2d-routes">
        {marketingDialogueRoutes.map((item) => (
          <button
            key={item.id}
            type="button"
            className={route === item.id ? 'is-active' : ''}
            onClick={() => {
              setGuidedMode(false)
              setGuidedIndex(0)
              setRoute(item.id)
              setSelectedId(null)
            }}
          >
            <strong>{item.label}</strong><span>{item.description}</span>
          </button>
        ))}
      </section>

      <section ref={workspaceRef} className={'cafe2d-workspace' + (workspaceFullscreen ? ' is-fullscreen' : '')}>
        <div className="cafe2d-canvas-wrap">
          <div className="cafe2d-toolbar">
            <span>{routeLabel}</span>
            <button type="button" onClick={toggleFullscreen}>{workspaceFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}</button>
          </div>
          <ReactFlow
            nodes={compactViewport ? nodes.filter((node) => !node.hidden) : nodes}
            edges={compactViewport ? edges.filter((edge) => !edge.hidden) : edges}
            nodeTypes={nodeTypes}
              onlyRenderVisibleElements={compactViewport && route === 'all'}
            onNodeClick={(_, node) => selectById(node.id)}
            fitView
            minZoom={.18}
            maxZoom={1.65}
          >
            <Background gap={26} size={1} color="rgba(55,45,36,.14)" />
            {!compactViewport && <MiniMap pannable zoomable nodeColor={(node) => node.data.critical ? '#8b3d34' : '#9c7434'} />} 
            <Controls />
          </ReactFlow>

          <footer className="cafe2d-route-footer">
            <button type="button" disabled={!prevId} onClick={goPrevious}>← Anterior</button>
            <span>
              {navigationLabel} · {navigationIndex >= 0 ? String(navigationIndex + 1).padStart(2,'0') : '—'} / {navigationTotal}
            </span>
            <button type="button" disabled={!nextId} onClick={goNext}>
              {navigationIndex >= 0 ? 'Siguiente →' : 'Empezar →'}
            </button>
          </footer>
        </div>

        <aside className="cafe2d-inspector">
          <SectionPedagogy
            nodes={marketingDialogueNodes}
            routes={marketingDialogueRoutes}
            activeRoute={route}
            selectedId={selectedId}
            onSectionChange={(id) => { setGuidedMode(false); setRoute(id); setSelectedId(null) }}
            onFocusNode={(id) => {
              setGuidedMode(false)
              selectNode(marketingDialogueNodeById(id))
            }}
          />

          {selected ? (
            <div className="cafe2d-inspector-scroll">
              <div className="cafe2d-inspector-head"><span>{selected.data.phase}</span><b>{selected.data.code}</b></div>
              <h2>{selected.data.title}</h2>
              <blockquote>{selected.data.excerpt}</blockquote>
              <section><small>EXPLICACIÓN</small><p>{selected.data.explanation}</p></section>
              <section><small>PREGUNTA DE ESTUDIO</small><strong>{selected.data.question}</strong></section>
              {selected.data.schema && (
                <section><small>ESQUEMA CONCEPTUAL</small><AnimatedConceptSchema key={'schema-' + selected.id} schema={selected.data.schema} /></section>
              )}
              <section>
                <small>DEPENDE DE</small>
                <div className="cafe2d-relations">
                  {selected.data.dependsOn.length ? selected.data.dependsOn.map((id) => {
                    const node = marketingDialogueNodeById(id)
                    return <button type="button" key={id} onClick={() => selectById(id)}>{node?.data.code} · {node?.data.title}</button>
                  }) : <em>Punto de partida</em>}
                </div>
              </section>
              <section>
                <small>ABRE HACIA</small>
                <div className="cafe2d-relations">
                  {selectedConsequences.length ? selectedConsequences.map((node) => (
                    <button type="button" key={node.id} onClick={() => selectById(node.id)}>
                      {node.data.code} · {node.data.title}
                    </button>
                  )) : <em>Cierre de esta línea</em>}
                </div>
              </section>
              <button type="button" className="cafe2d-open-folio" onClick={() => setFolioId(selected.id)}>Abrir folio completo</button>
            </div>
          ) : (
            <div className="cafe2d-empty">
              <span>INSPECTOR</span>
              <strong>Seleccione un nodo</strong>
              <p>Los nodos relacionados permanecerán nítidos y el resto se atenuará para mostrar la estructura del argumento.</p>
            </div>
          )}
        </aside>
      </section>

      {history.length > 0 && (
        <section className="cafe2d-history">
          <span>HISTORIAL</span>
          <div>{history.map((id) => {
            const node = marketingDialogueNodeById(id)
            return <button type="button" key={'history-' + id} onClick={() => selectById(id)}>{node?.data.code} · {node?.data.title}</button>
          })}</div>
        </section>
      )}

      <section className="cafe2d-context">
        <span>CONTINUIDAD</span>
        <h2>Del deseo a la libertad</h2>
        <p>
          El recorrido del café quedó estructurado como una cadena: definición de mercadotecnia
          → persuasión → necesidad y deseo → identidad → mercancía → perfilado → causalidad
          → libertad → posibilidad de un marketing ético.
        </p>
      </section>

      {!embedded && (
        <footer className="cafe2d-footer">
          <Link to="/cafe-filosofico/2026/10/05/mercadotecnia">← Volver a la memoria</Link>
          <strong>PHILOSOPHIA · CAFÉ FILOSÓFICO</strong>
        </footer>
      )}

      {folio && (
        <div className="cafe2d-folio-backdrop" role="presentation" onMouseDown={() => setFolioId(null)}>
          <article className="cafe2d-folio" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" className="cafe2d-folio-close" onClick={() => setFolioId(null)}>×</button>
            <div className="cafe2d-inspector-head"><span>{folio.data.phase}</span><b>{folio.data.code}</b></div>
            <h2>{folio.data.title}</h2>
            <blockquote>{folio.data.excerpt}</blockquote>
            <section><small>RECONSTRUCCIÓN</small><p>{folio.data.explanation}</p></section>
            <section><small>CONCEPTOS</small><div className="cafe2d-tags">{folio.data.concepts.map((concept) => <b key={concept}>{concept}</b>)}</div></section>
            <section><small>PREGUNTA</small><strong>{folio.data.question}</strong></section>
            {folio.data.schema && <section><small>ESQUEMA</small><AnimatedConceptSchema schema={folio.data.schema} /></section>}
            <small className="cafe2d-folio-source">{folio.data.source}</small>
          </article>
        </div>
      )}
    </Root>
  )
}

export default function CafeMercadotecniaSystem2D({ embedded = false }) {
  return <ReactFlowProvider><SystemCanvas embedded={embedded} /></ReactFlowProvider>
}
