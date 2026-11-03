import { useEffect } from 'react'
import { Link } from 'react-router'
import './CafeMercadotecniaDefinitions.css'

export default function CafeMercadotecniaDefinitions() {
  useEffect(() => {
    const previous = document.title
    const bell = document.querySelector('.academic-bell')
    const previousBellDisplay = bell instanceof HTMLElement ? bell.style.display : ''

    document.title = 'Definiciones · Café Filosófico · Mercadotecnia'

    if (bell instanceof HTMLElement) {
      bell.style.display = 'none'
    }

    return () => {
      document.title = previous
      if (bell instanceof HTMLElement) {
        bell.style.display = previousBellDisplay
      }
    }
  }, [])

  return (
    <main className="mktdefs-page">
      <nav className="mktdefs-topbar">
        <Link to="/cafe-filosofico/2026/10/05/mercadotecnia">← Mercadotecnia</Link>
        <strong>DEFINICIONES</strong>
        <span>Café Filosófico · 05 OCT 2026</span>
      </nav>

      <header className="mktdefs-hero">
        <p>CAFÉ FILOSÓFICO · MATERIAL DE APOYO</p>
        <h1>Definiciones</h1>
        <h2>Mercadotecnia</h2>
        <p className="mktdefs-intro">
          Base conceptual para acompañar la discusión del café:
          origen del término, definiciones de referencia y diferencia
          entre marketing tradicional y neuromarketing.
        </p>
      </header>

      <section className="mktdefs-section">
        <div className="mktdefs-number">01</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">ETIMOLOGÍA</p>
          <h2>¿De dónde viene <em>marketing</em>?</h2>

          <div className="mktdefs-etymology">
            <article>
              <strong>market + -ing</strong>
              <p>Del inglés <em>market</em> + sufijo <em>-ing</em> (acción o proceso).</p>
            </article>
            <article>
              <strong>marcatus / mercatus</strong>
              <p><em>Market</em> proviene del latín tardío <em>marcatus</em>, variante de <em>mercatus</em> (“comercio, feria, mercado”).</p>
            </article>
            <article>
              <strong>mercari / merx, mercis</strong>
              <p><em>Mercatus</em> deriva del verbo <em>mercari</em> (“comerciar, comprar”) y de <em>merx, mercis</em> (“mercancía”).</p>
            </article>
          </div>

          <div className="mktdefs-chain" aria-label="Ruta etimológica">
            <span>MERX</span><b>→</b><span>MERCARI</span><b>→</b><span>MERCATUS</span><b>→</b><span>MARKET</span><b>→</b><span>MARKETING</span>
          </div>
        </div>
      </section>

      <section className="mktdefs-section is-dark">
        <div className="mktdefs-number">02</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">RAE</p>
          <h2>Marketing</h2>

          <div className="mktdefs-rae">
            <article>
              <span>1</span>
              <div>
                <small>f. Econ.</small>
                <p>Conjunto de estudios y técnicas encaminados a favorecer la comercialización de productos y servicios.</p>
              </div>
            </article>
            <article>
              <span>2</span>
              <div>
                <small>f.</small>
                <p>marketing (‖ acción de promocionar productos o servicios).</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mktdefs-section">
        <div className="mktdefs-number">03</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">A.M.A.</p>
          <h2>American Marketing Association</h2>
          <blockquote className="mktdefs-quote">
            “Actividad, conjunto de instituciones y procesos para crear, comunicar,
            entregar y cambiar las ofertas que tengan valor para los consumidores,
            clientes, asociados y sociedades en general”.
          </blockquote>
        </div>
      </section>

      <section className="mktdefs-section is-accent">
        <div className="mktdefs-number">04</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">PHILIP KOTLER</p>
          <h2>Marketing como proceso social y administrativo</h2>
          <p className="mktdefs-body">
            Philip Kotler, considerado el padre de la mercadotecnia moderna,
            describió el marketing como un proceso que es tanto social como
            administrativo, cuya meta es cubrir necesidades a través del
            intercambio de valor. Fue este teórico quien definió las etapas
            del marketing.
          </p>
        </div>
      </section>

      <section className="mktdefs-section">
        <div className="mktdefs-number">05</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">DEFINICIÓN DE TRABAJO</p>
          <h2>Entender al cliente para crear valor</h2>
          <p className="mktdefs-definition">
            Capacidad de una empresa para entender a un cliente y atenderlo,
            satisfacer una necesidad y así obtener rentabilidad.
          </p>

          <div className="mktdefs-flow">
            <article><span>01</span><strong>Entender</strong><small>al cliente</small></article>
            <b>→</b>
            <article><span>02</span><strong>Atender</strong><small>su situación</small></article>
            <b>→</b>
            <article><span>03</span><strong>Satisfacer</strong><small>una necesidad</small></article>
            <b>→</b>
            <article><span>04</span><strong>Rentabilidad</strong><small>intercambio de valor</small></article>
          </div>
        </div>
      </section>

      <section className="mktdefs-section is-dark">
        <div className="mktdefs-number">06</div>
        <div className="mktdefs-content">
          <p className="mktdefs-kicker">NEUROMARKETING</p>
          <h2>Lo expresado y lo automático</h2>
          <p className="mktdefs-body">
            El neuromarketing es la disciplina que aplica las técnicas de la
            neurociencia al marketing para medir las respuestas cerebrales,
            emocionales y subconscientes de los consumidores ante estímulos
            comerciales.
          </p>

          <div className="mktdefs-compare">
            <article>
              <span>MARKETING TRADICIONAL</span>
              <strong>Lo que las personas expresan</strong>
              <p>
                Se basa en lo que los consumidores expresan deliberadamente:
                encuestas, entrevistas y <em>focus groups</em>.
              </p>
            </article>

            <article>
              <span>NEUROMARKETING</span>
              <strong>Lo que las personas responden automáticamente</strong>
              <p>
                Se apoya en mediciones fisiológicas y neurológicas para observar
                respuestas automáticas y subconscientes, proporcionando una
                perspectiva más directa de cómo reaccionan las personas ante
                los estímulos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <footer className="mktdefs-footer">
        <Link to="/cafe-filosofico/2026/10/05/mercadotecnia">← Volver al Café</Link>
        <strong>Mercadotecnia · Definiciones</strong>
        <span>Material para la sesión</span>
      </footer>
    </main>
  )
}
