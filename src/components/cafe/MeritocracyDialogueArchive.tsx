import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

import {
  meritocracyEdges,
  meritocracyNodeById,
  meritocracyNodes,
  meritocracyTrackLabels,
  type MeritDialogueNode,
} from '../../data/cafeMeritocraciaDialogue'
import { parseMeritocracyTranscript } from '../../data/cafeMeritocraciaTranscript'

const kindLabels: Record<string, string> = {
  pregunta: 'PREGUNTA',
  distincion: 'DISTINCIÓN',
  tesis: 'TESIS',
  objecion: 'OBJECIÓN',
  ejemplo: 'EJEMPLO',
  autor: 'AUTOR',
  'problema-abierto': 'PROBLEMA ABIERTO',
}

function DialogueNode({
  data,
  selected,
}: {
  data: MeritDialogueNode & {
    dimmed?: boolean
    related?: boolean
  }
  selected: boolean
}) {
  return (
    <article
      className={[
        'merit-dialogue-node',
        `is-${data.kind}`,
        selected ? 'is-selected' : '',
        data.related ? 'is-related' : '',
        data.dimmed ? 'is-dimmed' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Handle type="target" position={Position.Left} className="merit-dialogue-handle" />
      <header>
        <span>{kindLabels[data.kind]}</span>
        <b>{data.code}</b>
      </header>
      <strong>{data.title}</strong>
      <p>{data.summary}</p>
      <footer>{data.introducedBy}</footer>
      <Handle type="source" position={Position.Right} className="merit-dialogue-handle" />
    </article>
  )
}

const nodeTypes = {
  pregunta: DialogueNode,
  distincion: DialogueNode,
  tesis: DialogueNode,
  objecion: DialogueNode,
  ejemplo: DialogueNode,
  autor: DialogueNode,
  'problema-abierto': DialogueNode,
}

function DialogueCanvas() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [track, setTrack] = useState('all')
  const [fullscreen, setFullscreen] = useState(false)
  const workspaceRef = useRef<HTMLDivElement | null>(null)
  const { fitView, setCenter } = useReactFlow()

  const selected = selectedId ? meritocracyNodeById(selectedId) : null

  const relatedIds = useMemo(() => {
    const set = new Set<string>()
    if (!selected) return set
    set.add(selected.id)
    selected.respondsTo.forEach((id) => set.add(id))
    selected.objections.forEach((id) => set.add(id))
    selected.leadsTo.forEach((id) => set.add(id))
    return set
  }, [selected])

  const nodes = useMemo(
    () =>
      meritocracyNodes.map((node) => {
        const visible = track === 'all' || node.track === track
        const related = selectedId ? relatedIds.has(node.id) : false

        return {
          id: node.id,
          type: node.kind,
          position: node.position,
          draggable: false,
          hidden: track !== 'all' && !visible,
          data: {
            ...node,
            related,
            dimmed: Boolean(selectedId) && !related,
          },
        }
      }),
    [track, selectedId, relatedIds],
  )

  const edges = useMemo(
    () =>
      meritocracyEdges.map((edge) => {
        const touches =
          Boolean(selectedId) &&
          (edge.source === selectedId || edge.target === selectedId)
        const isObjection = edge.kind === 'objection'
        const source = meritocracyNodeById(edge.source)
        const target = meritocracyNodeById(edge.target)
        const visible =
          track === 'all' ||
          (source?.track === track && target?.track === track)

        return {
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: 'smoothstep',
          hidden: !visible,
          style: {
            stroke: isObjection ? '#9b4b38' : touches ? '#b68435' : '#665c4b',
            strokeWidth: touches ? 3 : isObjection ? 2 : 1.2,
            opacity: selectedId ? (touches ? 1 : 0.12) : 0.36,
          },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 10,
            height: 10,
            color: isObjection ? '#9b4b38' : touches ? '#b68435' : '#665c4b',
          },
        }
      }),
    [selectedId, track],
  )

  const chooseNode = useCallback(
    (node: MeritDialogueNode) => {
      setSelectedId(node.id)
      setCenter(node.position.x + 120, node.position.y + 72, {
        zoom: 1.05,
        duration: 420,
      })
    },
    [setCenter],
  )

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreen(document.fullscreenElement === workspaceRef.current)
      window.setTimeout(() => fitView({ padding: 0.1, duration: 350 }), 80)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [fitView])

  const toggleFullscreen = async () => {
    if (!workspaceRef.current) return
    if (document.fullscreenElement === workspaceRef.current) {
      await document.exitFullscreen()
    } else {
      await workspaceRef.current.requestFullscreen()
    }
  }

  return (
    <>
      <div className="merit-dialogue-toolbar">
        <div>
          <span>RUTA DEL DIÁLOGO</span>
          {Object.entries(meritocracyTrackLabels).map(([id, label]) => (
            <button
              type="button"
              key={id}
              className={track === id ? 'is-active' : ''}
              onClick={() => {
                setTrack(id)
                setSelectedId(null)
                window.setTimeout(
                  () => fitView({ padding: 0.12, duration: 420 }),
                  50,
                )
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={toggleFullscreen}>
          {fullscreen ? 'SALIR ×' : 'PANTALLA COMPLETA ↗'}
        </button>
      </div>

      <div
        ref={workspaceRef}
        className={`merit-dialogue-workspace ${fullscreen ? 'is-fullscreen' : ''}`}
      >
        <div className="merit-dialogue-flow">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={(_, flowNode) => {
              const node = meritocracyNodeById(flowNode.id)
              if (node) chooseNode(node)
            }}
            onPaneClick={() => setSelectedId(null)}
            fitView
            fitViewOptions={{ padding: 0.08 }}
            minZoom={0.15}
            maxZoom={1.6}
            nodesConnectable={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background gap={28} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <aside className="merit-dialogue-inspector">
          {selected ? (
            <>
              <header>
                <span>{kindLabels[selected.kind]}</span>
                <b>{selected.code}</b>
              </header>

              <h3>{selected.title}</h3>
              <p className="merit-dialogue-summary">{selected.summary}</p>

              <section>
                <span>INTRODUCIDO POR</span>
                <strong>{selected.introducedBy}</strong>
              </section>

              <section className="is-excerpt">
                <span>FRAGMENTO DE LA SESIÓN</span>
                <blockquote>{selected.excerpt}</blockquote>
              </section>

              <section>
                <span>RESPONDE A</span>
                <div className="merit-dialogue-links">
                  {selected.respondsTo.length ? (
                    selected.respondsTo.map((id) => {
                      const node = meritocracyNodeById(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => node && chooseNode(node)}
                        >
                          <b>{node?.code}</b>
                          <small>{node?.title}</small>
                        </button>
                      )
                    })
                  ) : (
                    <em>Punto de apertura.</em>
                  )}
                </div>
              </section>

              <section>
                <span>OBJECIONES / TENSIONES</span>
                <div className="merit-dialogue-links">
                  {selected.objections.length ? (
                    selected.objections.map((id) => {
                      const node = meritocracyNodeById(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => node && chooseNode(node)}
                        >
                          <b>{node?.code}</b>
                          <small>{node?.title}</small>
                        </button>
                      )
                    })
                  ) : (
                    <em>Sin objeción directa registrada.</em>
                  )}
                </div>
              </section>

              <section>
                <span>CONDUCE A</span>
                <div className="merit-dialogue-links">
                  {selected.leadsTo.length ? (
                    selected.leadsTo.map((id) => {
                      const node = meritocracyNodeById(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => node && chooseNode(node)}
                        >
                          <b>{node?.code}</b>
                          <small>{node?.title}</small>
                        </button>
                      )
                    })
                  ) : (
                    <em>Cierre o problema abierto.</em>
                  )}
                </div>
              </section>
            </>
          ) : (
            <div className="merit-dialogue-empty">
              <span>SELECTIO</span>
              <strong>Seleccione un nodo</strong>
              <p>
                Se iluminarán la intervención, sus antecedentes, objeciones y
                consecuencias.
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  )
}


type MagazineCard = {
  id: string
  label: string
  title: string
  dek: string
  angle?: string
  kicker?: string
  bullets?: string[]
  quote?: string
  tags?: string[]
}

const meritocracyMagazineCards: MagazineCard[] = [
  {
    id: 'revista-1',
    label: 'APERTURA',
    title: 'Meritocracia: una narrativa bajo sospecha',
    dek:
      'La conversación abrió cuestionando la idea de que las posiciones sociales se expliquen simplemente por esfuerzo, talento o disciplina individual.',
    kicker: 'NÚCLEO DEL TEMA',
    bullets: [
      'Se recuperó la etimología meritum + kratos.',
      'Se recordó a Michael Young y el origen satírico del término.',
      'La meritocracia apareció como posible legitimación de desigualdades previas.',
    ],
    quote:
      'La cuestión central terminó siendo: ¿cuándo una diferencia de desempeño se convierte en justificación moral de una desigualdad social?',
    tags: ['Young', 'justificación', 'desigualdad'],
    angle: 'rotate(-1.2deg)',
  },
  {
    id: 'revista-2',
    label: 'DILEMA',
    title: '¿El pobre es pobre porque quiere?',
    dek:
      'La mesa mostró que esta frase no funciona como descripción inocente, sino como fórmula cargada de premisas sociales y políticas.',
    kicker: 'SE DESARMÓ LA FRASE',
    bullets: [
      'Presupone que existe una ruta real y accesible para dejar de ser pobre.',
      'Supone que el esfuerzo individual basta para activar esa salida.',
      'Ignora condiciones materiales, históricas y estructurales.',
    ],
    quote:
      'La sesión insistió en confrontar la frase con la realidad concreta: agua, alimento, transporte, trabajo, tiempo y oportunidades efectivas.',
    tags: ['pobreza', 'querer', 'estructura'],
    angle: 'rotate(0.8deg)',
  },
  {
    id: 'revista-3',
    label: 'DISTINCIÓN',
    title: 'Pobreza espiritual no es pobreza material',
    dek:
      'Uno de los movimientos más importantes fue separar la renuncia religiosa, el desapego y la pobreza de espíritu de la carencia material efectiva.',
    kicker: 'NO TODO “POBRE” SIGNIFICA LO MISMO',
    bullets: [
      'Votos de pobreza y carencia económica no son equivalentes.',
      'La subsistencia mínima, la dignidad y la propiedad no se superponen de modo simple.',
      'La riqueza espiritual y la riqueza material se cruzan históricamente, pero no deben confundirse.',
    ],
    tags: ['religión', 'espíritu', 'materialidad'],
    angle: 'rotate(-0.6deg)',
  },
  {
    id: 'revista-4',
    label: 'CRUCE',
    title: 'Mérito, privilegio y merecimiento',
    dek:
      'La sesión afinó conceptos: una ventaja no es automáticamente mérito, y mérito tampoco significa sin más merecimiento.',
    kicker: 'DONDE SE VOLVIÓ FILOSÓFICO',
    bullets: [
      'Talento natural, herencia, salud y contactos pueden producir ventajas sin ser méritos.',
      'Merecer implica reglas, instituciones y criterios de valoración.',
      'La discusión evocó a Aristóteles: magnanimidad, vanidad y pusilanimidad.',
    ],
    quote:
      'El debate se desplazó desde “quién se esforzó” hacia “quién establece qué cuenta como mérito y por qué eso debería ser recompensado”.',
    tags: ['Aristóteles', 'mérito', 'merecimiento'],
    angle: 'rotate(1deg)',
  },
  {
    id: 'revista-5',
    label: 'MERCADO',
    title: 'Trabajo, justicia y retribución',
    dek:
      'El café introdujo una tensión entre mercado, mérito y justicia distributiva, apoyándose en Hayek y Marx.',
    kicker: 'DOS VÍAS DE CRÍTICA',
    bullets: [
      'Hayek: el mercado no rastrea ni premia el mérito en sentido estricto.',
      'Marx: hay pobreza cuando el trabajo no retorna al trabajador en medida suficiente.',
      'La conversación amplió el problema hacia labores que el mercado infravalora o no paga.',
    ],
    tags: ['Hayek', 'Marx', 'trabajo'],
    angle: 'rotate(-1deg)',
  },
  {
    id: 'revista-6',
    label: 'PREGUNTA ABIERTA',
    title: '¿Por qué todos tendríamos que competir?',
    dek:
      'La crítica se radicalizó cuando la mesa dejó de discutir solamente la igualdad de partida y comenzó a cuestionar la competencia como modelo social.',
    kicker: 'DEL LIBERALISMO A LA CRÍTICA SOCIAL',
    bullets: [
      'Se discutió si la competencia es biológica, cultural o institucional.',
      'Se distinguió competir para sobrevivir de competir para acumular bienes.',
      'La igualdad de salida no garantiza justicia en los resultados.',
    ],
    quote:
      'Quedó abierta una duda decisiva: aun si todos comenzaran desde la misma línea, ¿por qué la vida social tendría que organizarse como carrera?',
    tags: ['competencia', 'biología', 'capitalismo'],
    angle: 'rotate(0.4deg)',
  },
  {
    id: 'revista-7',
    label: 'ACTUALIZACIÓN',
    title: 'La IA como nuevo medio de producción',
    dek:
      'La discusión se proyectó al presente: acceso de uso no equivale a propiedad del medio de producción.',
    kicker: 'GIRO CONTEMPORÁNEO',
    bullets: [
      'No toda persona que usa IA controla su infraestructura o sus derechos.',
      'La concentración tecnológica puede reproducir nuevas desigualdades.',
      'La competencia actual también pasa por plataformas, datos y propiedad técnica.',
    ],
    tags: ['IA', 'medios de producción', 'tecnología'],
    angle: 'rotate(-0.7deg)',
  },
  {
    id: 'revista-8',
    label: 'CIERRE',
    title: 'Lo que el café dejó abierto',
    dek:
      'La sesión no clausuró el tema: lo refinó. La pobreza, los criterios de mérito y la naturaleza de la competencia quedaron como problemas pendientes.',
    kicker: 'PARA EL SIGUIENTE CAFÉ',
    bullets: [
      '¿Dónde empieza realmente la pobreza?',
      '¿Qué tipo de competencia está en juego: supervivencia o acumulación?',
      '¿Quién mide los méritos y con qué legitimidad?',
    ],
    quote:
      'La mesa terminó reconociendo que “meritocracia” y “pobreza” se tocan, pero no se reducen una a la otra.',
    tags: ['problemas abiertos', 'síntesis'],
    angle: 'rotate(1.1deg)',
  },
]

function MeritocracyMagazine() {
  return (
    <div className="merit-zine">
      <header className="merit-zine-hero">
        <div className="merit-zine-kicker">06 · MEMORIA EDITORIAL</div>
        <div className="merit-zine-titleblock">
          <div className="merit-zine-sticker is-red">CAFÉ FILOSÓFICO</div>
          <h2>Meritocracia, pobreza y competencia</h2>
          <p>
            En lugar de reproducir la conversación en forma de diálogo, esta página la
            reorganiza como crónica visual: conceptos, tensiones, preguntas abiertas y
            hallazgos filosóficos de la sesión.
          </p>
        </div>
        <aside className="merit-zine-note">
          <span>PEGATINA DE REDACCIÓN</span>
          <strong>Tesis editorial</strong>
          <p>
            La meritocracia apareció menos como un simple premio al esfuerzo y más como un
            dispositivo narrativo que puede justificar desigualdades preexistentes.
          </p>
        </aside>
      </header>

      <section className="merit-zine-grid">
        {meritocracyMagazineCards.map((card) => (
          <article
            key={card.id}
            className="merit-zine-card"
            style={card.angle ? { transform: card.angle } : undefined}
          >
            <div className="merit-zine-card-top">
              <span>{card.label}</span>
              {card.kicker ? <b>{card.kicker}</b> : null}
            </div>

            <h3>{card.title}</h3>
            <p className="merit-zine-dek">{card.dek}</p>

            {card.bullets?.length ? (
              <ul>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}

            {card.quote ? (
              <blockquote>{card.quote}</blockquote>
            ) : null}

            {card.tags?.length ? (
              <footer>
                {card.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </footer>
            ) : null}
          </article>
        ))}
      </section>

      <section className="merit-zine-bottom">
        <article className="merit-zine-poster">
          <span>MAPA DE FONDO</span>
          <h3>Rutas del debate</h3>
          <ol>
            <li>Meritocracia como narrativa de legitimación.</li>
            <li>Pobreza como concepto histórico y no unívoco.</li>
            <li>Mérito, privilegio y merecimiento como niveles distintos.</li>
            <li>Mercado y trabajo como espacios de injusticia distributiva.</li>
            <li>Competencia y acumulación como problema político mayor.</li>
          </ol>
        </article>

        <article className="merit-zine-collage">
          <div className="merit-zine-sticker is-gold">TEMA FUTURO</div>
          <h3>La pobreza merece un café propio</h3>
          <p>
            La conversación cerró reconociendo que el problema de la pobreza quedó apenas
            esbozado. Su definición, sus umbrales y su relación con mérito y justicia
            distributiva merecen un desarrollo autónomo.
          </p>
          <div className="merit-zine-mini-quotes">
            <p>“No es fácil marcar dónde empieza la pobreza.”</p>
            <p>“Igualdad de partida no garantiza igualdad real.”</p>
            <p>“Supervivencia no es lo mismo que acumulación.”</p>
          </div>
        </article>
      </section>
    </div>
  )
}


export default function MeritocracyDialogueArchive() {
  return (
    <>
      <section className="merit-section merit-after-dialogue">
        <div className="merit-section-head">
          <span>05</span>
          <div>
            <p>DESPUÉS DEL DIÁLOGO</p>
            <h2>El mapa que produjo la conversación</h2>
          </div>
        </div>

        <div className="merit-emergent-thesis">
          <span>PROBLEMA EMERGENTE</span>
          <blockquote>
            La cuestión ya no es simplemente si alguien “se esforzó”, sino quién
            establece el criterio de mérito, bajo qué condiciones puede cumplirse
            y por qué una determinada recompensa tendría que seguirse de él.
          </blockquote>
        </div>

        <ReactFlowProvider>
          <DialogueCanvas />
        </ReactFlowProvider>
      </section>


      <section className="merit-section merit-transcript-section">
        <div className="merit-section-head">
          <span>06</span>
          <div>
            <p>MEMORIA EDITORIAL</p>
            <h2>Revista del café</h2>
          </div>
        </div>

        <p className="merit-transcript-intro">
          Aquí ya no aparece la sesión como conversación literal. La memoria está reorganizada
          como página de revista, con fichas visuales, pegatinas y núcleos temáticos que
          condensan lo abordado en el encuentro.
        </p>

        <MeritocracyMagazine />
      </section>

    </>
  )
}
