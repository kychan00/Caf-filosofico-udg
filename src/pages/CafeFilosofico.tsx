import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router'
import { cafeEvents } from '../data/cafeFilosoficoEvents'
import './CafeFilosofico.css'

const method = [
  {
    number: '01',
    title: 'Preguntar',
    copy: 'Abrir problemas y explorar nuevas perspectivas.',
    mark: '?',
  },
  {
    number: '02',
    title: 'Escuchar',
    copy: 'Atender con respeto y disposición a lo que otros piensan.',
    mark: '◌',
  },
  {
    number: '03',
    title: 'Argumentar',
    copy: 'Construir razones, examinar ideas y contrastar posturas.',
    mark: '≋',
  },
  {
    number: '04',
    title: 'Dialogar',
    copy: 'Encontrarnos en la diferencia para pensar en común.',
    mark: '↔',
  },
]

const evidence = [
  {
    src: 'images/cafe-filosofico/gale01.JPG',
    label: 'Edición 01',
    caption: 'Conversación abierta · septiembre 2026',
  },
  {
    src: 'images/cafe-filosofico/meritocracia/session-02/01.jpg',
    label: 'Edición 02',
    caption: 'Meritocracia · memoria del encuentro',
  },
  {
    src: 'images/cafe-filosofico/agua/sesion-04/IMG_1846.jpg',
    label: 'Edición 04',
    caption: 'Agua · diálogo y comunidad',
  },
  {
    src: 'images/cafe-filosofico/redes-sociales/sesion-05/01.jpg',
    label: 'Edición 05',
    caption: 'Redes sociales · evidencia de sesión',
  },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

export default function CafeFilosofico() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const cardTrackRef = useRef<HTMLDivElement>(null)

  const base = import.meta.env.BASE_URL
  const published = cafeEvents.filter((event) => event.status === 'publicado')
  const editionCount = cafeEvents.length
  const nextEvent = cafeEvents.find((event) => event.status === 'proximo')

  const searchResults = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('es')
    if (!needle) return cafeEvents

    return cafeEvents.filter((event) =>
      [
        event.title,
        event.shortTitle,
        event.question,
        event.deck,
        ...event.themes,
      ]
        .join(' ')
        .toLocaleLowerCase('es')
        .includes(needle)
    )
  }, [query])

  const heroBust = `${base}images/cafe-filosofico/meritocracia/aristotle-bust.png`
  const heroBooks = `${base}images/cafe-filosofico/meritocracia/books-stack.png`
  const heroCoffee = `${base}images/cafe-filosofico/meritocracia/coffee-cup.png`

  useEffect(() => {
    const closeOverlays = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      setSearchOpen(false)
    }

    window.addEventListener('keydown', closeOverlays)
    return () => window.removeEventListener('keydown', closeOverlays)
  }, [])

  const goToSection = (id: string) => {
    setMenuOpen(false)
    setSearchOpen(false)
    scrollToSection(id)
  }

  const scrollCards = (direction: -1 | 1) => {
    const track = cardTrackRef.current
    if (!track) return

    track.scrollBy({
      left: direction * Math.max(280, track.clientWidth * 0.72),
      behavior: 'smooth',
    })
  }

  return (
    <main className="cafe-home" id="inicio">
      <div className="cafe-home-grain" aria-hidden="true" />

      <header className="cafe-nav-shell">
        <nav className="cafe-nav" aria-label="Navegación principal del Café Filosófico">
          <Link to="/cafe-filosofico" className="cafe-brand" aria-label="Café Filosófico · inicio">
            <span className="cafe-brand-cup" aria-hidden="true">
              <i />
            </span>
            <span>
              <strong>CAFÉ</strong>
              <strong>FILOSÓFICO</strong>
            </span>
          </Link>

          <div id="cafe-nav-links" className={`cafe-nav-links ${menuOpen ? 'is-open' : ''}`}>
            <button type="button" onClick={() => goToSection('inicio')}>Inicio</button>
            <button type="button" onClick={() => goToSection('cafes')}>Cafés</button>
            <button type="button" onClick={() => goToSection('archivo')}>Archivo</button>
            <button type="button" onClick={() => goToSection('metodo')}>El proyecto</button>
            <button type="button" onClick={() => goToSection('recursos')}>Recursos</button>
          </div>

          <div className="cafe-nav-actions">
            <button
              type="button"
              className="cafe-search-trigger"
              aria-label="Buscar conversaciones"
              aria-expanded={searchOpen}
              aria-controls="cafe-search-panel"
              onClick={() => {
                setMenuOpen(false)
                setSearchOpen((value) => !value)
              }}
            >
              <span aria-hidden="true">⌕</span>
            </button>

            {nextEvent && (
              <Link className="cafe-nav-next" to={nextEvent.route}>
                Próximo Café <span aria-hidden="true">→</span>
              </Link>
            )}

            <button
              type="button"
              className="cafe-menu-trigger"
              aria-label="Abrir navegación"
              aria-expanded={menuOpen}
              aria-controls="cafe-nav-links"
              onClick={() => {
                setSearchOpen(false)
                setMenuOpen((value) => !value)
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        {searchOpen && (
          <div id="cafe-search-panel" className="cafe-search-panel" role="search" aria-label="Buscar en el archivo del Café Filosófico">
            <div className="cafe-search-paper">
              <label htmlFor="cafe-search">Buscar en las conversaciones</label>
              <div className="cafe-search-field">
                <input
                  id="cafe-search"
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Tema, pregunta o concepto…"
                />
                <button
                  type="button"
                  aria-label="Cerrar búsqueda"
                  onClick={() => {
                    setSearchOpen(false)
                    setQuery('')
                  }}
                >
                  ×
                </button>
              </div>

              <div className="cafe-search-results" aria-live="polite">
                {searchResults.length ? (
                  searchResults.map((event) => (
                    <Link
                      to={event.route}
                      key={event.id}
                      onClick={() => setSearchOpen(false)}
                    >
                      <span>{String(event.edition).padStart(2, '0')}</span>
                      <strong>{event.shortTitle}</strong>
                      <small>{event.displayDate}</small>
                    </Link>
                  ))
                ) : (
                  <p>No encontramos una conversación con ese término.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="cafe-hero">
        <div className="cafe-hero-copy">
          <p className="cafe-overline">DIÁLOGO · PREGUNTA · ARGUMENTO · COMUNIDAD</p>
          <h1>
            <span>Café</span>
            <span>Filosófico</span>
          </h1>
          <p className="cafe-hero-deck">
            Pensar juntos cambia la manera<br />
            de mirar <em>lo cotidiano.</em>
          </p>
          <p className="cafe-hero-intro">
            Un espacio universitario para preguntar, escuchar, disentir y construir
            pensamiento en común.
          </p>

          <div className="cafe-hero-actions">
            <button type="button" className="cafe-button cafe-button-primary" onClick={() => goToSection('cafes')}>
              Explorar los cafés <span aria-hidden="true">→</span>
            </button>
            <button type="button" className="cafe-button cafe-button-paper" onClick={() => goToSection('metodo')}>
              Conocer el proyecto <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="cafe-hero-index" aria-label={`${editionCount} ediciones registradas`}>
            <span>01</span>
            <i />
            <span>{String(editionCount).padStart(2, '0')}</span>
            <b aria-hidden="true">● ○ ○</b>
          </div>
        </div>

        <figure className="cafe-hero-collage">
          <span className="cafe-collage-sun" aria-hidden="true" />
          <span className="cafe-collage-paper cafe-collage-paper-a" aria-hidden="true" />
          <span className="cafe-collage-paper cafe-collage-paper-b" aria-hidden="true" />
          <span className="cafe-collage-paper cafe-collage-paper-c" aria-hidden="true" />

          <img className="cafe-collage-bust" src={heroBust} alt="" aria-hidden="true" decoding="async" fetchPriority="high" />
          <img className="cafe-collage-books" src={heroBooks} alt="" aria-hidden="true" decoding="async" />
          <img className="cafe-collage-coffee" src={heroCoffee} alt="" aria-hidden="true" decoding="async" />

          <div className="cafe-collage-building" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="cafe-collage-note" aria-hidden="true">
            <span>filosofía</span>
            <i />
          </div>

          <div className="cafe-collage-orbit" aria-hidden="true" />
          <div className="cafe-collage-strokes" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>

          <figcaption className="cafe-collage-caption">
            <span>CUCSH · UdeG</span>
            Un archivo vivo de conversaciones que permanecen abiertas.
          </figcaption>
        </figure>

        <div className="cafe-torn-edge" aria-hidden="true" />
      </section>

      <section className="cafe-conversations cafe-section" id="cafes">
        <header className="cafe-section-heading">
          <div>
            <p>CONVERSACIONES QUE HEMOS ABIERTO</p>
            <h2>Cafés que han sucedido</h2>
          </div>
          <div className="cafe-section-aside">
            <p className="cafe-section-lead">
              Temas contemporáneos, preguntas filosóficas y un diálogo interdisciplinario
              que sigue creciendo.
            </p>
            <div className="cafe-card-controls" aria-label="Navegar cafés">
              <button type="button" onClick={() => scrollCards(-1)} aria-label="Ver cafés anteriores">←</button>
              <button type="button" onClick={() => scrollCards(1)} aria-label="Ver cafés siguientes">→</button>
            </div>
          </div>
        </header>

        <div className="cafe-card-track" ref={cardTrackRef}>
          {published.map((event) => (
            <article className="cafe-event-card" key={event.id}>
              <Link to={event.route} className="cafe-event-poster">
                <span className="cafe-poster-tape" aria-hidden="true" />
                <img
                  src={`${base}${event.poster}`}
                  alt={event.posterAlt}
                  loading="lazy"
                  decoding="async"
                />
                {event.assetKind === 'archivo' && (
                  <span className="cafe-archive-asset">PIEZA DE ARCHIVO</span>
                )}
              </Link>

              <div className="cafe-event-meta">
                <span>{String(event.edition).padStart(2, '0')} / {String(editionCount).padStart(2, '0')}</span>
                <span>{event.displayDate}</span>
              </div>
              <h3>{event.shortTitle}</h3>
              <p>{event.question}</p>
              <Link to={event.route} className="cafe-circle-link" aria-label={`Abrir ${event.shortTitle}`}>
                →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="cafe-manifesto" id="metodo">
        <div className="cafe-manifesto-tear cafe-manifesto-tear-top" aria-hidden="true" />
        <div className="cafe-manifesto-copy">
          <p className="cafe-manifesto-quote">
            NO ES UNA CONFERENCIA.<br />
            NO ES UN DEBATE PARA GANAR.<br />
            <strong>ES UN LUGAR PARA<br />PENSAR CON OTROS.</strong>
          </p>
          <span className="cafe-hand-arrow" aria-hidden="true">↗</span>
        </div>

        <div className="cafe-method-grid" aria-label="Método del Café Filosófico">
          {method.map((item) => (
            <article key={item.title}>
              <span className="cafe-method-mark" aria-hidden="true">{item.mark}</span>
              <small>{item.number}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>

        <div className="cafe-manifesto-tear cafe-manifesto-tear-bottom" aria-hidden="true" />
      </section>

      <section className="cafe-numbers cafe-section" aria-labelledby="cafe-numbers-title">
        <div className="cafe-numbers-title">
          <p>UNA COMUNIDAD QUE CRECE CON SUS CONVERSACIONES</p>
          <h2 id="cafe-numbers-title">El Café<br />en números</h2>
        </div>
        <div className="cafe-stat-grid">
          <article>
            <strong>{String(published.length).padStart(2, '0')}</strong>
            <span>cafés realizados</span>
          </article>
          <article>
            <strong>+150</strong>
            <span>participaciones</span>
          </article>
          <article>
            <strong>+300</strong>
            <span>preguntas discutidas</span>
          </article>
          <article>
            <strong>01</strong>
            <span>comunidad abierta</span>
          </article>
        </div>
      </section>

      {nextEvent && (
        <section className="cafe-next" aria-labelledby="cafe-next-title">
          <div className="cafe-next-poster-wrap">
            <span className="cafe-next-paper-back" aria-hidden="true" />
            <span className="cafe-next-tape" aria-hidden="true" />
            <img
              src={`${base}${nextEvent.poster}`}
              alt={nextEvent.posterAlt}
              className="cafe-next-poster"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="cafe-next-copy">
            <p>PRÓXIMA CONVERSACIÓN · EDICIÓN {String(nextEvent.edition).padStart(2, '0')}</p>
            <h2 id="cafe-next-title">{nextEvent.shortTitle}</h2>
            <blockquote>{nextEvent.question}</blockquote>

            <div className="cafe-next-facts">
              <span><small>CUÁNDO</small>{nextEvent.displayDate}</span>
              <span><small>HORA</small>{nextEvent.time}</span>
              <span><small>DÓNDE</small>{nextEvent.location}</span>
            </div>

            <Link to={nextEvent.route} className="cafe-button cafe-button-light">
              Ver el próximo Café <span aria-hidden="true">→</span>
            </Link>
          </div>

          <span className="cafe-next-scribble" aria-hidden="true">↝</span>
        </section>
      )}

      <section className="cafe-archive cafe-section" id="archivo">
        <header className="cafe-section-heading cafe-archive-heading">
          <div>
            <p>ARCHIVO · MEMORIA · EVIDENCIA</p>
            <h2>Lo que queda<br />después de conversar</h2>
          </div>
          <p className="cafe-section-lead">
            Pósters, fotografías, memorias y sistemas conceptuales conservan el hilo de
            cada encuentro sin convertir una discusión abierta en una doctrina única.
          </p>
        </header>

        <div className="cafe-evidence-grid">
          {evidence.map((item, index) => (
            <figure className={`cafe-evidence cafe-evidence-${index + 1}`} key={item.src}>
              <div className="cafe-evidence-photo">
                <img src={`${base}${item.src}`} alt={item.caption} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <span>{item.label}</span>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="cafe-archive-note">
          <span aria-hidden="true">φ</span>
          <p>
            Cada memoria distingue entre material preparatorio, diálogo celebrado,
            reconstrucción editorial y verificación externa.
          </p>
          <button type="button" onClick={() => goToSection('cafes')}>
            Explorar el archivo <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      <section className="cafe-resources cafe-section" id="recursos" aria-labelledby="cafe-resources-title">
        <header className="cafe-section-heading cafe-resources-heading">
          <div>
            <p>RECURSOS PARA VOLVER A LA CONVERSACIÓN</p>
            <h2 id="cafe-resources-title">Leer, mapear,<br />volver a preguntar</h2>
          </div>
          <p className="cafe-section-lead">
            El archivo no termina en una fotografía: cada edición conserva herramientas para
            reconstruir problemas, argumentos y rutas de lectura.
          </p>
        </header>

        <div className="cafe-resource-grid">
          <article>
            <span className="cafe-resource-index">01</span>
            <p className="cafe-resource-mark" aria-hidden="true">¶</p>
            <h3>Memorias de sesión</h3>
            <p>Reconstrucciones editoriales del diálogo, con fronteras claras entre preparación, intervención y verificación.</p>
            <button type="button" onClick={() => goToSection('cafes')}>
              Explorar memorias <span aria-hidden="true">→</span>
            </button>
          </article>

          <article>
            <span className="cafe-resource-index">02</span>
            <p className="cafe-resource-mark" aria-hidden="true">⌁</p>
            <h3>Sistemas 2D</h3>
            <p>Mapas conceptuales interactivos para estudiar relaciones, tensiones y recorridos argumentales.</p>
            <Link to="/cafe-filosofico/2026/11/03/redes-sociales/sistema-2d">
              Abrir un sistema 2D <span aria-hidden="true">→</span>
            </Link>
          </article>

          <article>
            <span className="cafe-resource-index">03</span>
            <p className="cafe-resource-mark" aria-hidden="true">?</p>
            <h3>Preguntas detonadoras</h3>
            <p>Las preguntas que abren cada sesión permanecen disponibles para preparar la siguiente conversación.</p>
            {nextEvent ? (
              <Link to={nextEvent.route}>
                Ver próximas preguntas <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <button type="button" onClick={() => goToSection('cafes')}>
                Revisar el archivo <span aria-hidden="true">→</span>
              </button>
            )}
          </article>
        </div>
      </section>

      <footer className="cafe-footer">
        <div>
          <span className="cafe-brand-cup cafe-brand-cup-light" aria-hidden="true"><i /></span>
          <p><strong>CAFÉ FILOSÓFICO</strong><br />CUCSH · UdeG</p>
        </div>
        <p>Espacio de pensamiento libre, diálogo y comunidad universitaria.</p>
        <span>GUADALAJARA · MMXXVI</span>
      </footer>
    </main>
  )
}
