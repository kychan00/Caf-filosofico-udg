import {
  redesMemoryChapters,
  redesMemoryOpenProblems,
  redesMemoryTensions,
  redesMemoryUnverified,
} from '../data/cafeRedesSocialesMemory'
import './CafeRedesSocialesMemory.css'

export default function CafeRedesSocialesMemory() {
  return (
    <section className="rsm" id="memoria-redes" aria-labelledby="rsm-title">
      <div className="rsm-shell">
        <header className="rsm-header">
          <div>
            <span>05 / MEMORIA DEL ENCUENTRO</span>
            <h2 id="rsm-title">Lo que realmente <em>quedó abierto.</em></h2>
          </div>
          <p>
            Reconstrucción editorial del diálogo celebrado el 3 de noviembre de 2026.
            Conserva posiciones, objeciones y problemas sin convertirlos en una doctrina
            única del Café.
          </p>
        </header>

        <aside className="rsm-boundary" aria-label="Frontera de fuente">
          <strong>FRONTERA DE FUENTE</strong>
          <p>
            La memoria distingue el material de apertura de lo efectivamente discutido.
            No usa afirmaciones empíricas no verificadas como hechos y evita atribuir una
            tesis a una persona cuando la identificación no es segura.
          </p>
        </aside>

        <div className="rsm-chapters">
          {redesMemoryChapters.map((chapter) => (
            <article className="rsm-chapter" key={chapter.id} id={'memoria-' + chapter.id}>
              <div className="rsm-chapter-number">
                <strong>{chapter.number}</strong>
                <small>{chapter.eyebrow}</small>
              </div>
              <div className="rsm-chapter-copy">
                <h3>{chapter.title}</h3>
                <p>{chapter.summary}</p>
                <ul>
                  {chapter.positions.map((position) => (
                    <li key={position}>{position}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <section className="rsm-tensions" aria-labelledby="rsm-tensions-title">
          <header>
            <span>06 / DESACUERDOS PRODUCTIVOS</span>
            <h3 id="rsm-tensions-title">Tensiones que no se resolvieron.</h3>
          </header>
          <div className="rsm-tension-grid">
            {redesMemoryTensions.map((tension) => (
              <article key={tension.id}>
                <div>
                  <strong>{tension.left}</strong>
                  <span>↔</span>
                  <strong>{tension.right}</strong>
                </div>
                <p>{tension.reconstruction}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rsm-open" aria-labelledby="rsm-open-title">
          <header>
            <span>07 / PROBLEMAS ABIERTOS</span>
            <h3 id="rsm-open-title">Preguntas para seguir pensando.</h3>
          </header>
          <ol>
            {redesMemoryOpenProblems.map((problem, index) => (
              <li key={problem}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{problem}</p>
              </li>
            ))}
          </ol>
        </section>

        <details className="rsm-unverified">
          <summary>Afirmaciones empíricas mencionadas durante el diálogo</summary>
          <div>
            {redesMemoryUnverified.map((item) => <p key={item}>{item}</p>)}
          </div>
        </details>
      </div>
    </section>
  )
}