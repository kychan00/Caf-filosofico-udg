import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './CafeInteligenciaArtificialEvent.css'

const questions = [
  {
    id: 'identidad',
    number: '01',
    short: 'Identidad humana',
    signal: 'HUMANO / ARTIFICIAL',
    question: '¿Cómo afecta la IA a la identidad humana?',
    inquiry:
      '¿Qué cambia en la idea que tenemos de nosotros mismos cuando capacidades asociadas con pensar, crear o decidir también pueden ser realizadas por sistemas artificiales?',
    concepts: ['Identidad', 'Capacidades', 'Autocomprensión'],
  },
  {
    id: 'riesgo-herramienta',
    number: '02',
    short: 'Riesgo o herramienta',
    signal: 'POTENCIA / PELIGRO',
    question: '¿Un riesgo existencial o una herramienta?',
    inquiry:
      '¿Qué criterios permitirían distinguir entre una tecnología que amplía nuestras capacidades y una que introduce riesgos que ya no sabemos gobernar?',
    concepts: ['Herramienta', 'Riesgo', 'Criterio'],
  },
  {
    id: 'control',
    number: '03',
    short: 'Control',
    signal: 'CONTROL / INCERTIDUMBRE',
    question: '¿Qué pasa si se sale de control?',
    inquiry:
      '¿Qué significaría aquí “perder el control”: no poder predecir un sistema, no poder detenerlo, depender de él o no contar con instituciones capaces de responder?',
    concepts: ['Control', 'Dependencia', 'Responsabilidad'],
  },
]

const moderators = ['Kefren Martínez', 'Omar Villegas', 'Diego Jimenez', 'Cristian Pelayo']

const protocol = [
  'Levantar la mano para pedir turno.',
  '3 minutos para desarrollar la intervención.',
  'Señal al cumplirse el tiempo y 30 segundos adicionales para cerrar.',
  'No interrumpir a quien tiene la palabra.',
  'Criticar el argumento, nunca a la persona.',
  'Mantener respeto entre participantes.',
]

const tensions = [
  { left: 'IDENTIDAD HUMANA', right: 'SISTEMAS ARTIFICIALES', note: '¿La IA sólo hace cosas por nosotros o también modifica cómo nos comprendemos?' },
  { left: 'HERRAMIENTA', right: 'RIESGO', note: 'La pregunta no presupone una respuesta: obliga a discutir criterios y límites.' },
  { left: 'CONTROL', right: 'INCERTIDUMBRE', note: 'Antes de hablar de pérdida de control hay que precisar qué entendemos por control.' },
]

function EvolutionFigure({ stage }: { stage: number }) {
  return (
    <div className={'ia-figure ia-figure-' + stage} aria-hidden="true">
      <span className="ia-figure-head" />
      <span className="ia-figure-body" />
      <span className="ia-figure-arm ia-figure-arm-left" />
      <span className="ia-figure-arm ia-figure-arm-right" />
      <span className="ia-figure-leg ia-figure-leg-left" />
      <span className="ia-figure-leg ia-figure-leg-right" />
      {stage >= 3 && <span className="ia-figure-core" />}
    </div>
  )
}

export default function CafeInteligenciaArtificialEvent() {
  const [active, setActive] = useState(0)
  const [posterAvailable, setPosterAvailable] = useState(true)
  const current = questions[active]
  const posterSrc = import.meta.env.BASE_URL + 'images/cafe-filosofico/inteligencia-artificial/poster-oficial.png'

  useEffect(() => {
    const previous = document.title
    document.title = 'Café Filosófico · Inteligencia Artificial · 17 de noviembre de 2026'
    return () => { document.title = previous }
  }, [])

  return (
    <main className="ia-page">
      <nav className="ia-nav" aria-label="Navegación del Café Filosófico">
        <Link to="/cafe-filosofico" className="ia-back">← Archivo del Café</Link>
        <span>CAFÉ FILOSÓFICO <b aria-hidden="true">/</b> 06</span>
        <span className="ia-nav-status"><i aria-hidden="true" /> PRÓXIMO ENCUENTRO</span>
      </nav>

      <header className="ia-hero">
        <div className="ia-hero-paper" aria-hidden="true" />
        <div className="ia-hero-copy">
          <p className="ia-serial">
            <span>CAFÉ FILOSÓFICO INTERDISCIPLINARIO</span>
            <span>EDICIÓN 006 — 2026</span>
          </p>
          <p className="ia-overline">HUMANO · MÁQUINA · RESPONSABILIDAD</p>
          <h1><span>Inteligencia</span><strong>Artificial</strong></h1>
          <p className="ia-lead">¿Qué cambia cuando la inteligencia deja de ser una palabra reservada para nosotros?</p>
          <p className="ia-description">
            Una convocatoria para discutir identidad humana, el lugar de la IA como herramienta o riesgo y el problema de qué significaría perder su control.
          </p>
          <div className="ia-actions">
            <button type="button" onClick={() => document.getElementById('ia-preguntas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              VER PREGUNTAS <span aria-hidden="true">↘</span>
            </button>
            <span>ENTRADA LIBRE · CAFÉ GRATIS</span>
          </div>
          <div className="ia-event-data" aria-label="Datos del encuentro">
            <div><small>CUÁNDO</small><strong>MAR · 17 NOV 2026</strong></div>
            <div><small>A QUÉ HORA</small><strong>2:00 P. M.</strong></div>
            <div><small>DÓNDE</small><strong>EDIFICIO C · AULA 5</strong></div>
          </div>
        </div>

        <div className="ia-stage" aria-label="Composición editorial inspirada en la evolución de figura humana a máquina del cartel oficial">
          <span className="ia-stage-label">FIG. 01 / ¿DÓNDE TERMINA LA HERRAMIENTA?</span>
          <div className="ia-grid" aria-hidden="true" />
          <div className="ia-evolution">
            {[0, 1, 2, 3, 4].map(stage => <EvolutionFigure stage={stage} key={stage} />)}
          </div>
          <span className="ia-machine-note ia-machine-note-a" aria-hidden="true">IDENTIDAD</span>
          <span className="ia-machine-note ia-machine-note-b" aria-hidden="true">RIESGO</span>
          <span className="ia-machine-note ia-machine-note-c" aria-hidden="true">CONTROL</span>
          <div className="ia-stage-caption">
            <span>HUMANO</span><i /><span>ARTEFACTO</span><i /><span>SISTEMA</span>
          </div>
        </div>
      </header>

      <section className="ia-source" aria-label="Fuente documental de la convocatoria">
        <div>
          <span>FUENTE</span>
          <strong>Cartel oficial · Edición 06</strong>
        </div>
        <p>
          Esta página conserva únicamente datos y preguntas constatables del cartel. Las ampliaciones conceptuales están marcadas como preparación editorial y no representan posiciones del Café.
        </p>
      </section>

      <section className="ia-questions" id="ia-preguntas">
        <div className="ia-container">
          <header className="ia-section-heading">
            <p>01 — PREGUNTAS DEL CARTEL</p>
            <h2>Tres problemas.<br /><em>Ninguna respuesta prefabricada.</em></h2>
            <span>Las preguntas se conservan completas y se abren para discusión sin atribuir conclusiones antes del encuentro.</span>
          </header>

          <div className="ia-question-grid" role="group" aria-label="Preguntas centrales del encuentro">
            {questions.map((item, index) => (
              <button
                type="button"
                className={'ia-question-card ' + (active === index ? 'is-active' : '')}
                key={item.id}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span className="ia-question-number">{item.number}</span>
                <small>{item.signal}</small>
                <strong>{item.question}</strong>
                <span className="ia-question-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          <article className="ia-question-detail" aria-live="polite">
            <aside>
              <small>PROBLEMA ACTIVO</small>
              <strong>{current.number}</strong>
              <span>{current.short}</span>
            </aside>
            <div>
              <span className="ia-editorial-label">PREPARACIÓN EDITORIAL · NO ES MEMORIA DEL DIÁLOGO</span>
              <h3>{current.question}</h3>
              <p>{current.inquiry}</p>
              <div className="ia-concepts" aria-label="Conceptos preparatorios">
                {current.concepts.map(concept => <span key={concept}>{concept}</span>)}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="ia-tensions">
        <div className="ia-container ia-tensions-layout">
          <div className="ia-tensions-copy">
            <p>02 — MAPA PREPARATORIO</p>
            <h2>La conversación no empieza con una tesis.<br /><em>Empieza con tensiones.</em></h2>
            <p className="ia-tensions-intro">
              Este mapa es una reconstrucción editorial previa al encuentro. Sirve para orientar preguntas; no registra acuerdos, objeciones ni conclusiones de participantes.
            </p>
          </div>
          <div className="ia-tension-list">
            {tensions.map((tension, index) => (
              <article key={tension.left}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="ia-tension-poles"><strong>{tension.left}</strong><i /><strong>{tension.right}</strong></div>
                <p>{tension.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ia-poster-section">
        <div className="ia-container ia-poster-layout">
          <div className="ia-poster-copy">
            <p>03 — DOCUMENTO DE CONVOCATORIA</p>
            <h2>El cartel es la fuente.</h2>
            <p>
              La pieza visual compartida para este encuentro permanece como referencia documental de fecha, lugar, moderación y preguntas. No se sustituye por una versión “corregida” o inventada.
            </p>
            <div className="ia-poster-facts">
              <span>17 NOV 2026</span><span>2:00 P. M.</span><span>EDIFICIO C · AULA 5</span><span>CAFÉ GRATIS</span>
            </div>
          </div>
          <figure className={'ia-poster-frame ' + (posterAvailable ? '' : 'is-fallback')}>
            {posterAvailable ? (
              <img
                src={posterSrc}
                alt="Cartel oficial del Café Filosófico Interdisciplinario sobre Inteligencia Artificial."
                onError={() => setPosterAvailable(false)}
              />
            ) : (
              <div className="ia-poster-fallback" role="img" aria-label="Referencia al cartel oficial de Inteligencia Artificial">
                <small>CARTEL OFICIAL · EDICIÓN 06</small>
                <strong>INTELIGENCIA<br />ARTIFICIAL</strong>
                <span>17 NOV · 2:00 P. M. · EDIFICIO C / AULA 5</span>
              </div>
            )}
            <figcaption>Documento fuente de la convocatoria.</figcaption>
          </figure>
        </div>
      </section>

      <section className="ia-people">
        <div className="ia-container ia-people-grid">
          <div>
            <p>04 — MODERACIÓN</p>
            <h2>La conversación<br /><em>la hacemos entre todos.</em></h2>
          </div>
          <div className="ia-moderators" aria-label="Moderadores">
            {moderators.map((name, index) => (
              <div key={name}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="ia-rules">
        <div className="ia-container">
          <header>
            <p>05 — PROTOCOLO DE DIÁLOGO</p>
            <h2>Argumentar sin aplastar.</h2>
          </header>
          <div className="ia-rule-grid">
            {protocol.map((rule, index) => (
              <article key={rule}><span>{String(index + 1).padStart(2, '0')}</span><p>{rule}</p></article>
            ))}
          </div>
          <p className="ia-rule-principle">
            Participar no presupone aceptar una postura política, económica, religiosa o filosófica determinada.
          </p>
        </div>
      </section>

      <footer className="ia-footer">
        <div><strong>CAFÉ FILOSÓFICO</strong><span>INTERDISCIPLINARIO · CUCSH</span></div>
        <p>INTELIGENCIA ARTIFICIAL · EDICIÓN 06 · 17 NOV 2026</p>
        <Link to="/cafe-filosofico">Volver al archivo ↑</Link>
      </footer>
    </main>
  )
}
