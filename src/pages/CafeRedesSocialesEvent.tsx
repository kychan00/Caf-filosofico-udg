import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import './CafeRedesSocialesEvent.css'

const questions = [
  {
    id: 'identidad',
    number: '01',
    short: 'Identidad',
    motif: 'YO / PERFIL',
    question: '¿Quién soy cuando me muestro en una red; una representación de mí o una construcción distinta?',
    inquiry: '¿Qué permanece de nuestra identidad cuando escogemos qué mostrar y qué dejar fuera de la pantalla?',
    concepts: ['Identidad', 'Representación', 'Construcción'],
  },
  {
    id: 'privacidad',
    number: '02',
    short: 'Privacidad',
    motif: 'PÚBLICO / PRIVADO',
    question: '¿Es posible la privacidad cuando exhibirse es la condición para participar?',
    inquiry: '¿Participar exige exponer la propia vida? ¿Qué límites debería poder decidir cada persona?',
    concepts: ['Exposición', 'Participación', 'Límites'],
  },
  {
    id: 'reconocimiento',
    number: '03',
    short: 'Reconocimiento',
    motif: 'VISIBILIDAD / VALOR',
    question: '¿Qué sentido tiene “ser visto” y por qué buscamos validación cuantificada (likes, seguidores)?',
    inquiry: '¿Qué cambia cuando el reconocimiento de otras personas se expresa mediante cifras visibles?',
    concepts: ['Visibilidad', 'Validación', 'Cuantificación'],
  },
]

const moderators = ['Kefren Martínez', 'Omar Villegas', 'Diego Jimenez', 'Cristian Pelayo']

export default function CafeRedesSocialesEvent() {
  const [active, setActive] = useState(0)
  const current = questions[active]

  useEffect(() => {
    const previous = document.title
    document.title = 'Café Filosófico · Redes sociales · 3 de noviembre de 2026'
    return () => { document.title = previous }
  }, [])

  return (
    <main className="rs-page">
      <nav className="rs-nav" aria-label="Navegación del Café Filosófico">
        <Link to="/cafe-filosofico" className="rs-back">← Archivo del Café</Link>
        <span>PHILOSOPHIA <b aria-hidden="true">/</b> 05</span>
        <span className="rs-nav-status"><i aria-hidden="true" /> PRÓXIMO ENCUENTRO</span>
      </nav>

      <header className="rs-hero">
        <div className="rs-hero-copy">
          <p className="rs-serial"><span>CAFÉ FILOSÓFICO INTERDISCIPLINARIO</span><span>EDICIÓN 005 — 2026</span></p>
          <p className="rs-hero-overline">¿QUIÉN ES EL YO QUE APARECE EN PANTALLA?</p>
          <h1><span>Redes</span><em>sociales<span className="rs-title-period">.</span></em></h1>
          <p className="rs-hero-lead">Nos mostramos. Nos miran. Nos contamos.</p>
          <p className="rs-hero-description">
            Una conversación abierta para cuestionar la identidad que presentamos,
            la privacidad que negociamos y el valor que atribuimos a ser vistos.
          </p>
          <div className="rs-hero-actions">
            <button type="button" onClick={() => document.getElementById('rs-preguntas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              EXPLORAR LAS PREGUNTAS <span aria-hidden="true">↘</span>
            </button>
            <span>ENTRADA LIBRE · CAFÉ GRATIS</span>
          </div>
          <div className="rs-event-data" aria-label="Datos del encuentro">
            <div><small>CUÁNDO</small><strong>MAR · 03 NOV 2026</strong></div>
            <div><small>A QUÉ HORA</small><strong>2:00 P. M.</strong></div>
            <div><small>DÓNDE</small><strong>EDIFICIO C · AULA 5</strong></div>
          </div>
        </div>

        <div className="rs-stage" aria-label="Ilustración editorial: una identidad entre la pantalla y la mirada de los demás">
          <span className="rs-stage-coordinates" aria-hidden="true">FIG. 01 / PERFIL EN CONSTRUCCIÓN</span>
          <div className="rs-orbit rs-orbit-one" aria-hidden="true" />
          <div className="rs-orbit rs-orbit-two" aria-hidden="true" />
          <div className="rs-sticker rs-sticker-top" aria-hidden="true"><span>¿QUIÉN</span><strong>SOY?</strong></div>
          <div className="rs-phone" aria-hidden="true">
            <div className="rs-phone-bar"><span className="rs-phone-dot" /><span>PERFIL / YO</span><span>•••</span></div>
            <div className="rs-avatar"><span className="rs-avatar-head" /><span className="rs-avatar-body" /></div>
            <div className="rs-phone-handle">@yo_en_la_red</div>
            <div className="rs-phone-rule" />
            <div className="rs-phone-numbers"><span>♡ <b>0</b></span><span>◎ <b>0</b></span><span>◌ <b>0</b></span></div>
            <div className="rs-phone-lines"><i /><i /><i /></div>
            <div className="rs-phone-foot"><span>VER PERFIL</span><span>↗</span></div>
          </div>
          <div className="rs-sticker rs-sticker-bottom" aria-hidden="true"><span>VISTO ≠</span><strong>CONOCIDO</strong></div>
          <span className="rs-stage-caption" aria-hidden="true">SIMULACIÓN GRÁFICA · NO SON DATOS DE UNA PERSONA</span>
        </div>
      </header>

      <section className="rs-signal" aria-label="Tres tensiones de apertura">
        <span>01 / IDENTIDAD ↔ PERFIL</span>
        <span>02 / PRIVACIDAD ↔ EXPOSICIÓN</span>
        <span>03 / RECONOCIMIENTO ↔ MÉTRICA</span>
      </section>

      <section className="rs-questions rs-container" id="rs-preguntas" aria-labelledby="rs-questions-heading">
        <div className="rs-section-heading">
          <span>01 — TRES PREGUNTAS, NINGUNA RESPUESTA PREFABRICADA</span>
          <h2 id="rs-questions-heading">¿Dónde empieza <em>la conversación?</em></h2>
          <p>Seleccione una pregunta para explorar sus tensiones. Los enunciados proceden del cartel del encuentro; los apoyos de lectura son editoriales.</p>
        </div>

        <div className="rs-question-grid" role="group" aria-label="Preguntas del cartel">
          {questions.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={'rs-question-card' + (active === index ? ' is-active' : '')}
              aria-pressed={active === index}
              aria-controls="rs-question-detail"
              onClick={() => setActive(index)}
            >
              <span className="rs-question-card-top"><small>{item.number} / {item.motif}</small><b aria-hidden="true">↗</b></span>
              <span className="rs-question-card-text">{item.question}</span>
              <span className="rs-question-card-bottom">{active === index ? 'EN FOCO' : 'ABRIR INTERROGANTE'} <span aria-hidden="true">→</span></span>
            </button>
          ))}
        </div>

        <div className="rs-question-detail" id="rs-question-detail" aria-live="polite">
          <div className="rs-detail-sidebar"><span>LECTURA DEL PROBLEMA</span><strong>{current.number}</strong><small>Preparación editorial, no memoria del diálogo.</small></div>
          <div className="rs-detail-main">
            <span className="rs-detail-eyebrow">PREGUNTA {current.number} / {current.short.toUpperCase()}</span>
            <h3>{current.question}</h3>
            <p>{current.inquiry}</p>
            <div className="rs-concept-tags">{current.concepts.map(concept => <span key={concept}>{concept}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="rs-map-section" aria-labelledby="rs-map-heading">
        <div className="rs-container rs-map-layout">
          <div className="rs-map-copy">
            <span className="rs-section-index">02 — CARTOGRAFÍA DE APERTURA</span>
            <h2 id="rs-map-heading">El yo no cabe en <em>un contador.</em></h2>
            <p>Un esquema editorial previo al encuentro: tres problemas conectados por una pregunta central. No representa intervenciones, acuerdos ni conclusiones de participantes.</p>
            <p className="rs-map-instruction">Toque cada eje para llevarlo al centro de la lectura.</p>
          </div>
          <div className="rs-map" role="group" aria-label="Mapa de tres interrogantes filosóficos">
            <div className="rs-map-center"><small>PREGUNTA TRANSVERSAL</small><strong>¿Quién soy ante la mirada ajena?</strong></div>
            <div className="rs-map-tracks">
              {questions.map((item, index) => (
                <button type="button" key={item.id} className={'rs-map-node' + (active === index ? ' is-active' : '')}
                  aria-pressed={active === index} onClick={() => { setActive(index); document.getElementById('rs-preguntas')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}>
                  <span>{item.number}</span><strong>{item.short}</strong><small>{item.motif}</small>
                </button>
              ))}
            </div>
            <span className="rs-map-note">CONEXIONES HIPOTÉTICAS · MAPA DE PREPARACIÓN</span>
          </div>
        </div>
      </section>

      <section className="rs-info rs-container" aria-labelledby="rs-info-heading">
        <div className="rs-info-heading"><span className="rs-section-index">03 — LA CITA</span><h2 id="rs-info-heading">Desconéctate un rato.<br /><em>Conversemos.</em></h2></div>
        <div className="rs-info-grid">
          <div className="rs-info-tile rs-info-date"><small>MARTES</small><strong>03</strong><span>NOVIEMBRE / 2026</span></div>
          <div className="rs-info-tile"><small>HORA</small><strong>2:00 <span>P. M.</span></strong><p>Edificio C · Aula 5</p></div>
          <div className="rs-info-tile rs-info-coffee"><small>AL ENTRAR</small><strong>Café<br />gratis.</strong><p>Un espacio de diálogo interdisciplinario.</p></div>
        </div>
      </section>

      <section className="rs-people rs-container" aria-label="Moderadores del encuentro">
        <span>MODERAN / EDICIÓN 05</span>
        <div>{moderators.map(name => <strong key={name}>{name}</strong>)}</div>
      </section>

      <section className="rs-rules rs-container" aria-labelledby="rs-rules-heading">
        <div><span className="rs-section-index">04 — CÓMO DIALOGAMOS</span><h2 id="rs-rules-heading">Las ideas se discuten.<br /><em>Las personas se respetan.</em></h2></div>
        <p>Protocolo habitual del Café: turnos de 3 minutos, 30 segundos para cerrar, sin interrupciones y con críticas dirigidas a los argumentos, no a las personas. Estas son reglas de referencia; el encuentro puede precisar su dinámica.</p>
      </section>

      <footer className="rs-footer"><div><span>CF / 05</span><strong>El diálogo comienza con una pregunta.</strong></div><Link to="/cafe-filosofico">← VOLVER AL ARCHIVO</Link></footer>
    </main>
  )
}
