import { lazy, Suspense, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { aguaArguments, aguaRelations, aguaSections } from '../data/cafeAguaSystem2D'
import { cafeAguaPhotos } from '../data/cafeAguaPhotos'
import CafeAguaMemory from './CafeAguaMemory'
import './CafeAguaEvent.css'

const CafeAguaSystem2D = lazy(() => import('./CafeAguaSystem2D'))
const ASSET = `${import.meta.env.BASE_URL}images/cafe-filosofico/agua`

const questions = [
  { id: 'derecho', number: '01', label: 'DERECHO · BIEN COMÚN', text: '¿El agua es un derecho, un recurso, un servicio o un bien común?' },
  { id: 'consumo', number: '02', label: 'CONSUMO · NECESIDAD', text: '¿El agua embotellada es una necesidad real o creada?' },
  { id: 'futuro', number: '03', label: 'DAÑO · RESPONSABILIDAD', text: '¿Quién responde por los daños que aparecen décadas después?' },
]

const viewpoints = [
  { no: '01', title: 'Una fuente no es agua potable', label: 'ECOLOGÍA · ABASTECIMIENTO' },
  { no: '02', title: 'La ciudad de los arreglos provisionales', label: 'INFRAESTRUCTURA' },
  { no: '03', title: '¿Quién distribuye el agua?', label: 'JUSTICIA · CONCESIONES' },
  { no: '04', title: 'Pensar juntos, actuar juntos', label: 'ÉTICA · COMUNIDAD' },
]

const moderators = ['Kefren Martínez', 'Mildred Solís', 'Omar Villegas', 'Diego Jimenez', 'Cristian']

export default function CafeAguaEvent() {
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [allPhotos, setAllPhotos] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [showMemory, setShowMemory] = useState(false)

  useEffect(() => {
    const prior = document.title
    document.title = 'Café Filosófico · Hablemos sobre el agua'
    return () => { document.title = prior }
  }, [])

  const question = questions[activeQuestion]

  return (
    <main className="water-cafe-page">
      <nav className="water-edition-topbar">
        <Link to="/cafe-filosofico">← CAFÉ FILOSÓFICO</Link>
        <span>EDICIÓN 04 · 19 OCT 2026</span>
        <span>DIÁLOGO INTERDISCIPLINARIO</span>
      </nav>

      <header className="water-edition-hero">
        <div className="water-edition-hero-copy">
          <p className="water-edition-kicker">IDEAS · DIÁLOGO · COMUNIDAD</p>
          <div className="water-edition-brand">
            <span>Café</span>
            <strong>Filosófico</strong>
          </div>
          <div className="water-edition-brand-rule" />
          <p className="water-edition-subbrand">interdisciplinario</p>

          <div className="water-edition-topic">
            <small>Edición especial · 19 de octubre de 2026</small>
            <h1>Hablemos sobre <em>el agua.</em></h1>
            <strong>¿Derecho, recurso o bien común?</strong>
          </div>

          <div className="water-edition-facts">
            <span><b>FECHA</b> 19 OCT</span>
            <span><b>HORA</b> 1:00 P. M.</span>
            <span><b>LUGAR</b> EDIFICIO C · AULA 5</span>
          </div>
        </div>

        <figure className="water-edition-poster">
          <div className="water-edition-tape" aria-hidden="true" />
          <img src={ASSET + '/poster-original.svg'} alt="Cartel original de Hablemos sobre el agua, edición 04 del Café Filosófico" />
          <figcaption>EL CARTEL ORIGINAL · EDICIÓN 04</figcaption>
        </figure>
      </header>

      <div className="water-edition-strip" aria-label="Cuatro ejes del encuentro">
        {['DERECHO', 'RECURSO', 'SERVICIO', 'BIEN COMÚN'].map((label,i) =>
          <div key={label}><span>{String(i+1).padStart(2,'0')}</span><strong>{label}</strong></div>)}
      </div>

      <section className="water-edition-section water-edition-questions" id="preguntas" aria-labelledby="water-questions-title">
        <header className="water-edition-section-heading"><span>01 / PREGUNTAS</span><h2 id="water-questions-title">¿Y si empezamos por preguntar?</h2></header>
        <div className="water-edition-question-tabs" role="group" aria-label="Preguntas del encuentro">
          {questions.map((item,index) =>
            <button type="button" key={item.id} className={activeQuestion===index?'is-active':''}
              aria-pressed={activeQuestion===index} onClick={() => setActiveQuestion(index)}>
              <span>{item.number}</span><strong>{item.label}</strong>
            </button>)}
        </div>
        <div className="water-edition-question-focus" aria-live="polite">
          <span>PREGUNTA {question.number}</span><blockquote>{question.text}</blockquote>
        </div>
      </section>

      <section className="water-edition-section water-edition-debate" aria-labelledby="water-debate-title">
        <header className="water-edition-section-heading"><span>02 / LO QUE SE DISCUTIÓ</span><h2 id="water-debate-title">Cuatro hilos del diálogo.</h2></header>
        <div className="water-edition-debate-grid">
          {viewpoints.map((item) =>
            <article key={item.no}>
              <span>{item.no} / {item.label}</span>
              <h3>{item.title}</h3>
            </article>)}
        </div>
        <p className="water-edition-source-note">Son ejes editoriales de una conversación abierta, no conclusiones unánimes.</p>
      </section>

      <section className="water-edition-section water-edition-gallery" id="galeria-agua" aria-labelledby="water-gallery-title">
        <header className="water-edition-section-heading">
          <span>03 / ÁLBUM DEL ENCUENTRO</span>
          <h2 id="water-gallery-title">Así se vivió.</h2>
          <p>19 de octubre · Edificio C, Aula 5</p>
        </header>
        <div className="water-edition-gallery-grid">
          {cafeAguaPhotos.slice(0,allPhotos?cafeAguaPhotos.length:4).map((photo,index) =>
            <figure key={photo.file} className={index===0?'is-cover':''}>
              <a href={ASSET+'/sesion-04/'+photo.file} target="_blank" rel="noopener noreferrer"
                aria-label={'Abrir fotografía '+(index+1)+': '+photo.caption}>
                <img src={ASSET+'/sesion-04/'+photo.file} loading="lazy" decoding="async" alt={photo.alt} width="1200" height="900" />
                <span aria-hidden="true">{String(index+1).padStart(2,'0')} / 08 ↗</span>
              </a>
            </figure>)}
        </div>
        <button type="button" className="water-edition-gallery-toggle" aria-expanded={allPhotos}
          onClick={() => setAllPhotos(v=>!v)}>{allPhotos?'MOSTRAR MENOS ↑':'VER LAS 8 FOTOGRAFÍAS ↓'}</button>
      </section>

      <section className="water-edition-section water-edition-atlas" id="atlas-agua" aria-labelledby="water-atlas-title">
        <div className="water-edition-atlas-main">
          <div>
            <span>04 / SISTEMA DE ESTUDIO</span>
            <h2 id="water-atlas-title">Las ideas también <em>se conectan.</em></h2>
            <p>Explore las tesis, las objeciones y lo que quedó abierto.</p>
            <div className="water-edition-atlas-stats">
              <span><b>{aguaArguments.length}</b> nodos</span>
              <span><b>{aguaRelations.length}</b> relaciones</span>
              <span><b>{aguaSections.length}</b> rutas</span>
            </div>
            <div className="water-edition-atlas-actions">
              <Link to="/cafe-filosofico/2026/10/19/agua/sistema-2d">ABRIR SISTEMA 2D ↗</Link>
              <button type="button" aria-expanded={showMap} aria-controls="water-atlas-inline" onClick={() => setShowMap(v=>!v)}>{showMap?'OCULTAR MAPA ↑':'VER AQUÍ ↓'}</button>
            </div>
          </div>
          <div className="water-edition-atlas-routes" aria-label="Rutas de estudio">
            {aguaSections.map((section,index)=><div key={section.id}><span>{section.number}</span><strong>{section.title}</strong>{index<aguaSections.length-1&&<i aria-hidden="true">↓</i>}</div>)}
          </div>
        </div>
        {showMap && <div id="water-atlas-inline"><Suspense fallback={<p className="water-edition-loading">Preparando el atlas…</p>}><CafeAguaSystem2D embedded /></Suspense></div>}
      </section>

      <section className="water-edition-section water-edition-archive" id="archivo-agua" aria-labelledby="water-archive-title">
        <div>
          <span>05 / HEMEROTECA</span>
          <h2 id="water-archive-title">La memoria completa.</h2>
          <p>Intervenciones, desacuerdos y fuentes, disponibles para una lectura más profunda.</p>
        </div>
        <button type="button" aria-expanded={showMemory} aria-controls="water-archive-content" onClick={() => setShowMemory(v=>!v)}>
          {showMemory?'CERRAR ARCHIVO ↑':'LEER MEMORIA ACADÉMICA ↗'}
        </button>
      </section>
      {showMemory && <div id="water-archive-content"><CafeAguaMemory /></div>}

      <section className="water-edition-credits">
        <details><summary>Moderación anunciada y créditos del encuentro <span>＋</span></summary>
          <p>{moderators.join(' · ')}</p><p>Las fotografías documentan el encuentro, no atribuyen argumentos a las personas retratadas.</p>
        </details>
      </section>

      <footer className="water-edition-footer">
        <div><span>EDICIÓN 04 · 19 OCT 2026</span><strong>El diálogo sigue abierto.</strong><small>Próximo tema anunciado: redes sociales · fecha por confirmar.</small></div>
        <Link to="/cafe-filosofico">← VOLVER AL CAFÉ FILOSÓFICO</Link>
      </footer>
    </main>
  )
}
