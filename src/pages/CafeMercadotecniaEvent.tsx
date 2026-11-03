import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import {
  marketingMemoryNodes,
  marketingMemoryTrackLabels,
  marketingOpenProblems,
} from '../data/cafeMercadotecniaMemory'
import './CafeMercadotecniaEvent.css'
import './CafeMercadotecniaMemory.css'
import CafeMercadotecniaSystem2D from './CafeMercadotecniaSystem2D'

const ASSET = `${import.meta.env.BASE_URL}images/cafe-filosofico/mercadotecnia`

const questions = [
  {
    id: 'influence',
    number: '01',
    label: 'INFORMAR · INFLUIR',
    text: '¿La mercadotecnia solo informa o también influye en lo que pensamos y sentimos?',
  },
  {
    id: 'manipulation',
    number: '02',
    label: 'LEGITIMIDAD · MANIPULACIÓN',
    text: '¿Es una herramienta legítima o una forma moderna de manipulación?',
  },
  {
    id: 'freedom',
    number: '03',
    label: 'LIBERTAD · CONSUMO',
    text: '¿Qué tan libres somos realmente al “elegir” lo que consumimos?',
  },
]

const tensions = [
  ['INFORMAR', 'INFLUIR'],
  ['SUGERIR', 'PERSUADIR'],
  ['PERSUADIR', 'MANIPULAR'],
  ['ELEGIR', 'SER INFLUIDO'],
]

export default function CafeMercadotecniaEvent() {
  const [activeId, setActiveId] = useState('influence')

  const active = useMemo(
    () => questions.find((item) => item.id === activeId) || questions[0],
    [activeId],
  )

  useEffect(() => {
    const previous = document.title
    document.title = 'Café Filosófico · Mercadotecnia'
    return () => {
      document.title = previous
    }
  }, [])

  return (
    <main className="marketing-page">
      <div className="marketing-grain" aria-hidden="true" />

      <nav className="marketing-topbar">
        <Link to="/cafe-filosofico">← CAFÉ FILOSÓFICO</Link>
        <span>EDICIÓN 03 · 05 OCT 2026</span>
        <span>INTERDISCIPLINARIO</span>
      </nav>

      <header className="marketing-hero">
        <div className="marketing-hero-copy">
          <p className="marketing-kicker">IDEAS · DIÁLOGO · DIFERENTES MIRADAS</p>

          <div className="marketing-brand">
            <div>
              <span>Café</span>
              <i className="marketing-cup" aria-hidden="true"><b /></i>
            </div>
            <strong>Filosófico</strong>
          </div>

          <div className="marketing-rule" />
          <p className="marketing-subbrand">interdisciplinario</p>

          <div className="marketing-topic-paper">
            <small>Tema:</small>
            <h1>Mercadotecnia</h1>
            <strong>¿Sugerencia, persuasión o manipulación?</strong>
          </div>

          <div className="marketing-meta">
            <article><span>FECHA</span><strong>Lunes 5</strong></article>
            <article><span>HORA</span><strong>1:00</strong></article>
            <article><span>LUGAR</span><strong>Edificio C · Aula 5</strong></article>
            <article className="is-coffee"><span>CAFÉ</span><strong>gratis</strong></article>
          </div>
        </div>

        <figure className="marketing-poster">
          <div className="marketing-poster-tape" aria-hidden="true" />
          <img
            src={`${ASSET}/poster-original.jpg`}
            alt="Cartel del Café Filosófico interdisciplinario sobre mercadotecnia"
          />
          <figcaption>
            <span>MEMORIA DEL ENCUENTRO</span>
            <p>Lunes 5 de octubre · 1:00 · Edificio C · Aula 5</p>
          </figcaption>
        </figure>
      </header>

      <section className="marketing-strip" aria-label="Ejes del encuentro">
        <article><span>01</span><strong>SUGERENCIA</strong></article>
        <article><span>02</span><strong>PERSUASIÓN</strong></article>
        <article><span>03</span><strong>MANIPULACIÓN</strong></article>
        <article className="is-dark"><span>04</span><strong>ELECCIÓN</strong></article>
      </section>

      <CafeMercadotecniaSystem2D embedded />

      <section className="marketing-definitions-link">
        <div>
          <span>MATERIAL PARA LA SESIÓN</span>
          <h2>Definiciones</h2>
          <p>Versión clara y directa para consultar durante el Café Filosófico.</p>
        </div>
        <Link to="/cafe-filosofico/2026/10/05/mercadotecnia/definiciones">
          Abrir definiciones →
        </Link>
      </section>

      <section className="marketing-section marketing-foundations">
        <div className="marketing-section-head">
          <span>01</span>
          <div>
            <p>BASE CONCEPTUAL</p>
            <h2>¿Qué entendemos por mercadotecnia?</h2>
          </div>
        </div>

        <div className="marketing-definition-grid">
          <article className="marketing-definition-card is-etymology">
            <div className="marketing-card-tag">
              <span>ETIMOLOGÍA</span>
              <b>origen de la palabra</b>
            </div>

            <h3>Mercadotecnia</h3>

            <ul className="marketing-etymology-list">
              <li>
                Del inglés <strong>market</strong> + sufijo <strong>-ing</strong>
                <span>acción o proceso</span>
              </li>
              <li>
                <strong>Market</strong> proviene del latín tardío <em>marcatus</em>,
                variante de <em>mercatus</em>
                <span>“comercio, feria, mercado”</span>
              </li>
              <li>
                <em>Mercatus</em> deriva del verbo <em>mercari</em> y de
                <em> merx, mercis</em>
                <span>“comerciar, comprar” · “mercancía”</span>
              </li>
            </ul>

            <div className="marketing-word-route" aria-label="Ruta etimológica">
              <span>MERX</span><b>→</b><span>MERCARI</span><b>→</b><span>MERCATUS</span><b>→</b><span>MARKET</span><b>→</b><span>MARKETING</span>
            </div>
          </article>

          <article className="marketing-definition-card is-rae">
            <div className="marketing-card-tag">
              <span>RAE</span>
              <b>marketing</b>
            </div>

            <h3>Definición</h3>

            <ol className="marketing-rae-list">
              <li>
                <b>f. Econ.</b>
                <p>Conjunto de estudios y técnicas encaminados a favorecer la comercialización de productos y servicios.</p>
              </li>
              <li>
                <b>f.</b>
                <p>marketing (‖ acción de promocionar productos o servicios).</p>
              </li>
            </ol>
          </article>
        </div>

        <div className="marketing-authority-grid">
          <article>
            <div className="marketing-card-tag">
              <span>A.M.A.</span>
              <b>American Marketing Association</b>
            </div>
            <blockquote>
              “Actividad, conjunto de instituciones y procesos para crear, comunicar,
              entregar y cambiar las ofertas que tengan valor para los consumidores,
              clientes, asociados y sociedades en general”.
            </blockquote>
          </article>

          <article>
            <div className="marketing-card-tag">
              <span>KOTLER</span>
              <b>Philip Kotler</b>
            </div>
            <p>
              Considerado el padre de la mercadotecnia moderna, describió el marketing
              como un proceso social y administrativo cuya meta es cubrir necesidades
              mediante el intercambio de valor. Fue este teórico quien definió las
              etapas del marketing.
            </p>
          </article>
        </div>

        <div className="marketing-working-definition">
          <div>
            <span>DEFINICIÓN DE TRABAJO</span>
            <h3>Entender · atender · satisfacer · obtener rentabilidad</h3>
          </div>

          <p>
            Capacidad de una empresa para entender a un cliente y atenderlo,
            satisfacer una necesidad y así obtener rentabilidad.
          </p>

          <div className="marketing-working-flow" aria-label="Definición operativa de mercadotecnia">
            <article><span>01</span><strong>Entender</strong><small>al cliente</small></article>
            <b>→</b>
            <article><span>02</span><strong>Atender</strong><small>su situación</small></article>
            <b>→</b>
            <article><span>03</span><strong>Satisfacer</strong><small>una necesidad</small></article>
            <b>→</b>
            <article><span>04</span><strong>Rentabilidad</strong><small>intercambio de valor</small></article>
          </div>
        </div>

        <div className="marketing-neuro">
          <header>
            <div className="marketing-card-tag">
              <span>NEUROMARKETING</span>
              <b>respuesta consciente · respuesta automática</b>
            </div>
            <h3>Del discurso del consumidor a sus respuestas fisiológicas</h3>
            <p>
              El neuromarketing es la disciplina que aplica técnicas de la neurociencia
              al marketing para medir respuestas cerebrales, emocionales y subconscientes
              de los consumidores ante estímulos comerciales.
            </p>
          </header>

          <div className="marketing-neuro-comparison">
            <article>
              <span>MARKETING TRADICIONAL</span>
              <strong>Lo que el consumidor expresa</strong>
              <p>
                Se basa en lo que los consumidores comunican deliberadamente:
                encuestas, entrevistas y <em>focus groups</em>.
              </p>
            </article>

            <div className="marketing-neuro-divider">
              <span>VS</span>
            </div>

            <article className="is-neuro">
              <span>NEUROMARKETING</span>
              <strong>Lo que el organismo responde</strong>
              <p>
                Se apoya en mediciones fisiológicas y neurológicas para observar
                respuestas automáticas y subconscientes, ofreciendo una perspectiva
                más directa de cómo reaccionan las personas ante los estímulos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-section-head">
          <span>02</span>
          <div>
            <p>PREGUNTAS DE APERTURA</p>
            <h2>Tres entradas al problema</h2>
          </div>
        </div>

        <div className="marketing-question-tabs">
          {questions.map((item) => (
            <button
              type="button"
              key={item.id}
              className={activeId === item.id ? 'is-active' : ''}
              onClick={() => setActiveId(item.id)}
            >
              <span>{item.number}</span>
              <small>{item.label}</small>
              <strong>{item.text}</strong>
            </button>
          ))}
        </div>

        <div className="marketing-question-focus">
          <div className="marketing-stamp">PREGUNTA {active.number}</div>
          <small>{active.label}</small>
          <blockquote>{active.text}</blockquote>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-section-head">
          <span>03</span>
          <div>
            <p>MAPA DEL PROBLEMA</p>
            <h2>¿Dónde cambia la influencia de nombre?</h2>
          </div>
        </div>

        <div className="marketing-tensions">
          {tensions.map(([left, right], index) => (
            <article key={`${left}-${right}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>{left}</strong>
                <b>↔</b>
                <strong>{right}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-section-head">
          <span>04</span>
          <div>
            <p>PROBLEMA CENTRAL</p>
            <h2>Mercadotecnia y libertad de elección</h2>
          </div>
        </div>

        <div className="marketing-core">
          <aside>
            <span>LA PREGUNTA</span>
            <blockquote>
              ¿Qué tan libres somos realmente al “elegir” lo que consumimos?
            </blockquote>
          </aside>

          <div className="marketing-core-diagram">
            <article>
              <span>MENSAJE</span>
              <strong>lo que se nos presenta</strong>
            </article>
            <b>→</b>
            <article>
              <span>INFLUENCIA</span>
              <strong>lo que pensamos y sentimos</strong>
            </article>
            <b>→</b>
            <article className="active">
              <span>ELECCIÓN</span>
              <strong>lo que consumimos</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="marketing-section marketing-memory">
        <div className="marketing-section-head">
          <span>05</span>
          <div>
            <p>MEMORIA DEL ENCUENTRO</p>
            <h2>Lo que realmente apareció en la conversación</h2>
          </div>
        </div>

        <div className="marketing-memory-intro">
          <strong>05 OCT 2026 · EDICIÓN 03</strong>
          <p>
            Esta memoria distingue lo preparado antes del Café de las posiciones,
            objeciones y problemas que surgieron durante la conversación. Ninguna
            intervención se presenta como doctrina oficial del encuentro.
          </p>
        </div>

        <div className="marketing-memory-grid">
          {marketingMemoryNodes.map((node) => (
            <article key={node.id} className={'marketing-memory-card kind-' + node.kind}>
              <header>
                <span>{node.code}</span>
                <div>
                  <small>{marketingMemoryTrackLabels[node.track]}</small>
                  <b>{node.kind}</b>
                </div>
              </header>
              <h3>{node.title}</h3>
              <p>{node.summary}</p>
              <blockquote>{node.excerpt}</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="marketing-section marketing-open">
        <div className="marketing-section-head">
          <span>06</span>
          <div>
            <p>PROBLEMAS ABIERTOS</p>
            <h2>La conversación no termina aquí</h2>
          </div>
        </div>

        <ol className="marketing-open-list">
          {marketingOpenProblems.map((problem, index) => (
            <li key={problem}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{problem}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="marketing-section marketing-invite">
        <div>
          <span>MEMORIA · 05 OCT 2026</span>
          <h2>Mercadotecnia</h2>
          <p>¿Sugerencia, persuasión o manipulación?</p>
        </div>

        <aside>
          <strong>Edificio C · Aula 5</strong>
          <span>Edición realizada</span>
        </aside>
      </section>

      <footer className="marketing-footer">
        <Link to="/cafe-filosofico">← VOLVER AL CAFÉ FILOSÓFICO</Link>
        <div>
          <strong>MERCADOTECNIA</strong>
          <span>EDICIÓN 03 · 05 OCT 2026</span>
        </div>
      </footer>
    </main>
  )
}
