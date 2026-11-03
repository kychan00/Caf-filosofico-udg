import { Link } from 'react-router'
import './CafeCapitalismoEvent.css'

const openingPoints = [
  'Discutir argumentos y no personas.',
  'No es necesario estar en contra del capitalismo para participar.',
  'También puede argumentarse a favor de un capitalismo más equilibrado.',
  'La intención es imaginar qué podría existir después del capitalismo o cómo podría hacerse más equitativo.',
]

const interventions = [
  {
    id: '01',
    speaker: 'Participante 1',
    kicker: 'PROGRESO · HISTORIA',
    title: '¿Existe una dirección lineal de la historia?',
    body:
      'Se planteó que el capitalismo puede pensarse desde una metafísica del progreso, pero que la historia no parece avanzar de manera completamente lineal. Apareció como posibilidad un capitalismo ecológico y se cuestionó la idea de una superación definitiva de todas las contradicciones.',
  },
  {
    id: '02',
    speaker: 'Participante 2',
    kicker: 'TRASCENDENCIA · SISTEMA',
    title: 'Negocios e intercambio no son necesariamente capitalismo',
    body:
      'Se distinguió entre capitalismo, negocios e intercambio. También se discutió que los sistemas sociales no necesariamente nacen de un diseño único, sino de una acumulación de decisiones, intereses y procesos históricos.',
  },
  {
    id: '03',
    speaker: 'Participante 3',
    kicker: 'DESEO · INDIVIDUALISMO',
    title: '¿Podemos librarnos de nuestros intereses personales?',
    body:
      'Se preguntó si es posible renunciar a intereses personales para contribuir a un progreso social o comunitario. La conversación pasó por deseos comunes como casa, automóvil, bienes y acumulación, y por la dificultad de dejar de querer cosas.',
  },
  {
    id: '04',
    speaker: 'Participante 4',
    kicker: 'COMODIDAD · DESIGUALDAD',
    title: '“Estoy bien. Tengo suficiente. ¿Podría estar todavía mejor?”',
    body:
      'Se discutió cómo la comodidad adquirida puede convertirse en resistencia al cambio. También apareció la pregunta por la igualdad de remuneración entre actividades distintas y por la relación entre preparación, mérito y salario.',
  },
  {
    id: '05',
    speaker: 'Participante 5',
    kicker: 'ESTADO · SISTEMA',
    title: '¿El capitalismo está dentro del Estado o el Estado adopta al capitalismo?',
    body:
      'Se propuso distinguir Estado y sistema. El sistema fue descrito como una estructura que establece normas, organiza y limita conductas, mientras el Estado puede vigilar, administrar o reproducir esas reglas.',
  },
  {
    id: '06',
    speaker: 'Participante 6',
    kicker: 'PRODUCCIÓN · MÉRITO',
    title: '“Obtienes lo que mereces según lo que haces.”',
    body:
      'Se cuestionó que el mérito pueda identificarse sin más con la capacidad de producción. El ejemplo fue un obrero que puede trabajar muchas horas sin convertirse por ello en una persona rica.',
  },
  {
    id: '07',
    speaker: 'Participante 7',
    kicker: 'MEDIOS DE PRODUCCIÓN',
    title: 'Tener un automóvil no significa controlar la plataforma',
    body:
      'A partir de DiDi y Uber se discutió la diferencia entre poseer una herramienta de trabajo y controlar realmente los medios de producción. También se señaló que comprar acciones no equivale necesariamente a controlar una compañía.',
  },
  {
    id: '08',
    speaker: 'Participante 8',
    kicker: 'MUNDO AMOLDADO',
    title: 'El mundo no sólo está dentro del capitalismo',
    body:
      'Se sostuvo que instituciones como medicina, educación, trabajo y economía están diseñadas para funcionar dentro de la lógica capitalista. Por eso imaginar otro sistema exige imaginar también de otra manera esas instituciones.',
  },
]

const framework = [
  {
    label: 'ACUMULACIÓN',
    text:
      'Se propuso como rasgo fundamental la acumulación de riqueza y se señaló la tensión entre una acumulación potencialmente ilimitada y recursos naturales limitados.',
  },
  {
    label: 'PROPIEDAD',
    text:
      'La propiedad privada apareció junto con la pregunta por quién posee los medios de producción y quién administra el excedente.',
  },
  {
    label: 'TRABAJO',
    text:
      'También se insistió en que la fuerza de trabajo humana tiene límites y que debe formar parte de cualquier evaluación del sistema.',
  },
  {
    label: 'NATURALEZA',
    text:
      'Se discutió que los seres humanos no están separados de la naturaleza y que explotar la naturaleza también puede entenderse como explotarnos a nosotros mismos.',
  },
]

const questions = [
  '¿Qué propones en su lugar?',
  '¿Cuál sería la superación del capitalismo?',
  '¿Puede existir algo distinto de capitalismo y comunismo?',
  '¿Quién controla los medios de producción?',
  '¿Quién administra el excedente producido?',
  '¿Qué tipo de Estado regularía un sistema diferente?',
  '¿Con qué criterio decidimos cuánto merece cada persona?',
  '¿Por qué asumimos que determinadas jerarquías económicas son naturales?',
]

export default function CafeCapitalismoEvent() {
  const image01 = `${import.meta.env.BASE_URL}images/cafe-filosofico/01.png`
  const image02 = `${import.meta.env.BASE_URL}images/cafe-filosofico/02.png`
  const image03 = `${import.meta.env.BASE_URL}images/cafe-filosofico/03.png`
  const image04 = `${import.meta.env.BASE_URL}images/cafe-filosofico/04.png`
  const image05 = `${import.meta.env.BASE_URL}images/cafe-filosofico/05.png`

  return (
    <main className="cafe-paper">
      <header className="cafe-paper-topline">
        <Link to="/cafe-filosofico">← Calendario</Link>
        <span>CAFÉ FILOSÓFICO · EDICIÓN 01</span>
        <span>07 · IX · 2026</span>
      </header>

      <section className="cafe-paper-masthead">
        <div className="cafe-paper-sideword">
          <span>IDEAS</span>
          <span>DIÁLOGO</span>
          <span>SOCIEDAD</span>
        </div>

        <div>
          <p>ENCUENTRO DE DISCUSIÓN</p>
          <h1>Café Filosófico</h1>
        </div>

        <blockquote>
          Argumentos,
          <br />
          no personas.
        </blockquote>
      </section>

      <div className="cafe-paper-heavy-rule" />

      <nav className="cafe-paper-index" aria-label="Índice de la edición">
        <span>EN ESTA EDICIÓN</span>
        <button type="button" onClick={() => document.getElementById('cafe-apertura')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          01 · Apertura
        </button>
        <button type="button" onClick={() => document.getElementById('cafe-intervenciones')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          02 · Intervenciones
        </button>
        <button type="button" onClick={() => document.getElementById('cafe-ejes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          03 · Ejes
        </button>
        <button type="button" onClick={() => document.getElementById('cafe-globalizacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          04 · Globalización
        </button>
        <button type="button" onClick={() => document.getElementById('cafe-valores')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          05 · Valores
        </button>
        <button type="button" onClick={() => document.getElementById('cafe-cierre')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
          06 · Cierre
        </button>
      </nav>


      <section className="cafe-paper-lead">
        <div className="cafe-paper-concept" aria-hidden="true">
          <div className="cafe-paper-orbit orbit-a" />
          <div className="cafe-paper-orbit orbit-b" />
          <div className="cafe-paper-world">
            <span className="crack crack-a" />
            <span className="crack crack-b" />
            <span className="crack crack-c" />
          </div>
          <div className="cafe-paper-skyline">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>
            FIN DEL MUNDO
            <br />
            FIN DEL CAPITALISMO
          </p>
        </div>

        <aside className="cafe-paper-quote">
          <span>EL PUNTO DE PARTIDA</span>
          <blockquote>
            “El capitalismo se ha vuelto tan abarcante que pareciera imposible
            pensar algo más allá de él.”
          </blockquote>
          <p>
            La discusión no exigía una postura anticapitalista: también podía
            argumentarse por un capitalismo más equilibrado.
          </p>
        </aside>
      </section>

      <section className="cafe-paper-headline">
        <h2>
          ¿Por qué es más fácil pensar en el fin del mundo que en el fin del
          capitalismo?
        </h2>
        <p>
          <strong>7 DE SEPTIEMBRE DE 2026:</strong> diálogo sobre progreso,
          deseo, sistema, Estado, medios de producción, acumulación, propiedad,
          naturaleza y distribución.
        </p>
      </section>

      <section id="cafe-apertura" className="cafe-paper-opening">
        <figure className="cafe-paper-opening-image">
          <div className="cafe-paper-opening-image-mat">
            <img
              src={image01}
              alt="Ilustración editorial sobre el mundo, crecimiento económico y la dificultad de imaginar un sistema posterior al capitalismo."
            />
          </div>
          <figcaption>
            <span>01</span>
            <p>Fin del mundo / fin del capitalismo</p>
          </figcaption>
        </figure>

        <div className="cafe-paper-opening-copy">
          <span className="cafe-paper-section-label">APERTURA</span>
          <h3>La regla inicial fue discutir argumentos</h3>
          <p className="cafe-paper-dropcap">
            El encuentro comenzó pidiendo evitar puntos de vista demasiado
            personales cuando éstos pudieran hacer que una refutación se sintiera
            como un ataque. La regla fue formular argumentos y discutirlos sin
            convertir la crítica en una crítica a la persona.
          </p>

          <div className="cafe-paper-opening-points">
            {openingPoints.map((point) => (
              <p key={point}>{point}</p>
            ))}
          </div>
        </div>

        <aside className="cafe-paper-participants">
          <span>VOCES DEL DIÁLOGO</span>
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index}>Participante {index + 1}</div>
          ))}
          <small>
            Los nombres se omiten en esta edición. Las intervenciones se presentan
            únicamente como participantes.
          </small>
        </aside>
      </section>

      <section id="cafe-intervenciones" className="cafe-paper-dialogue">
        <header>
          <span>INTERVENCIONES</span>
          <h3>Ocho líneas de discusión que aparecieron durante el café</h3>
        </header>

        <figure className="cafe-paper-dialogue-image">
          <div className="cafe-paper-dialogue-image-frame">
            <img
              src={image02}
              alt="Ilustración editorial de una conversación colectiva sobre sociedad, producción, conocimiento y futuro."
            />
          </div>
          <figcaption>
            <span>02</span>
            <p>Ocho líneas de discusión · una conversación común</p>
          </figcaption>
        </figure>

        <div className="cafe-paper-dialogue-grid">
          {interventions.map((item) => (
            <article key={item.id}>
              <div className="cafe-paper-dialogue-meta">
                <span>{item.id}</span>
                <small>{item.speaker}</small>
              </div>
              <p className="cafe-paper-dialogue-kicker">{item.kicker}</p>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cafe-ejes" className="cafe-paper-breakout">
        <div className="cafe-paper-breakout-number">04</div>
        <div>
          <span>CUATRO EJES QUE SE REPITIERON</span>
          <h3>Acumulación, propiedad, trabajo y naturaleza</h3>
        </div>
      </section>

      <figure className="cafe-paper-axes-image">
        <div className="cafe-paper-axes-image-shell">
          <div className="cafe-paper-axes-image-rule" aria-hidden="true">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </div>

          <div className="cafe-paper-axes-image-mat">
            <img
              src={image03}
              alt="Ilustración editorial sobre transformación histórica, industria, trabajo, acumulación y naturaleza."
            />
          </div>

          <figcaption>
            <span className="cafe-paper-axes-image-number">03</span>
            <p>Acumulación · propiedad · trabajo · naturaleza</p>
            <small>Del orden feudal a la producción industrial y sus límites</small>
          </figcaption>
        </div>
      </figure>

      <section className="cafe-paper-framework">
        {framework.map((item, index) => (
          <article key={item.label}>
            <span>0{index + 1}</span>
            <h4>{item.label}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="cafe-paper-historical">
        <article>
          <span className="cafe-paper-section-label">COMPARACIÓN HISTÓRICA</span>
          <h3>Del feudalismo al capitalismo</h3>
          <p>
            Se planteó que una persona situada dentro de la Edad Media
            probablemente tampoco habría podido imaginar con claridad el
            capitalismo. Nosotros podemos observar esa transformación porque ya
            ocurrió; desde el presente, en cambio, no conocemos todavía qué
            sistema podría venir después.
          </p>
        </article>

        <aside>
          <span>OTRA DISTINCIÓN</span>
          <h4>Capitalismo ≠ mercado</h4>
          <p>
            En la conversación se recordó que el intercambio y los mercados
            existieron antes del capitalismo, incluso bajo el feudalismo. Por eso
            el mercado no puede tomarse, por sí solo, como aquello que define
            específicamente al capitalismo.
          </p>
        </aside>
      </section>

      <section className="cafe-paper-questions">
        <header>
          <span>PREGUNTAS ABIERTAS</span>
          <h3>El café no terminó con una respuesta definitiva</h3>
        </header>

        <div>
          {questions.map((question, index) => (
            <article key={question}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{question}</p>
            </article>
          ))}
        </div>
      </section>


      <section id="cafe-globalizacion" className="cafe-paper-global">
        <header>
          <span>GLOBALIZACIÓN</span>
          <h3>Deseos, comparación y condiciones materiales</h3>
        </header>

        <figure className="cafe-paper-global-image">
          <div className="cafe-paper-global-image-shell">
            <div className="cafe-paper-global-image-kicker" aria-hidden="true">
              <span>04</span>
              <i />
            </div>

            <div className="cafe-paper-global-image-mat">
              <img
                src={image04}
                alt="Ilustración editorial sobre globalización, consumo, redes sociales, comercio y desigualdad material."
              />
            </div>

            <figcaption>
              <span className="cafe-paper-global-image-number">04</span>
              <p>Globalización · deseo · comparación · condiciones materiales</p>
            </figcaption>
          </div>
        </figure>

        <div className="cafe-paper-global-grid">
          <article>
            <small>PARTICIPANTE 9</small>
            <h4>Las redes sociales expanden aspiraciones y modelos de consumo</h4>
            <p>
              Se señaló que la globalización ha contribuido a extender el
              capitalismo. Las redes sociales permiten observar de manera
              constante lo que poseen personas de otros países y alimentan
              comparaciones, aspiraciones, deseos y modelos de consumo.
            </p>
          </article>

          <article>
            <small>PARTICIPANTE 10</small>
            <h4>La globalización no alcanza a todos de la misma manera</h4>
            <p>
              También se sostuvo que la globalización es asimétrica: no todas las
              personas tienen internet, teléfono, computadora o trabajo digno.
              Las condiciones materiales siguen siendo profundamente desiguales.
            </p>
          </article>

          <aside>
            <span>CONDICIONES MATERIALES</span>
            <blockquote>
              “No todos tenemos las mismas condiciones.”
            </blockquote>
          </aside>
        </div>
      </section>

      <section className="cafe-paper-naturalized">
        <div className="cafe-paper-naturalized-head">
          <span>NATURALIZACIÓN</span>
          <h3>“Así son las cosas” no basta como argumento</h3>
        </div>

        <div className="cafe-paper-naturalized-grid">
          <article>
            <span>01</span>
            <h4>Patrón y empleado</h4>
            <p>
              Se preguntó por qué se considera natural que un patrón gane más que
              un empleado cuando ambos pueden haberse preparado, estudiado y
              esforzado. La respuesta “porque yo soy el patrón” fue presentada
              como insuficiente si no se justifica racional, lógica y éticamente.
            </p>
          </article>

          <article>
            <span>02</span>
            <h4>El argumento del riesgo</h4>
            <p>
              Se respondió que el patrón puede ganar más porque arriesga más. La
              discusión aceptó que este argumento puede resultar intuitivo en
              pequeñas empresas, pero cuestionó que funcione del mismo modo para
              grandes corporaciones y fortunas familiares.
            </p>
          </article>

          <article>
            <span>03</span>
            <h4>Tiempo de otras personas</h4>
            <p>
              En el caso de grandes propietarios apareció otra observación: el
              trabajador vende sus horas y la libertad del empresario depende, en
              parte, de poder utilizar tiempo laboral ajeno para obtener beneficio.
            </p>
          </article>

          <article>
            <span>04</span>
            <h4>Automatización y producción</h4>
            <p>
              Se imaginó el caso de empresas cada vez más automatizadas mediante
              inteligencia artificial y se formuló una pregunta: ¿para quién se
              produce si cada vez menos personas participan del proceso productivo?
            </p>
          </article>
        </div>
      </section>

      <section className="cafe-paper-market">
        <article>
          <span>ECONOMÍA CERRADA · MERCADO · ESTADO</span>
          <h3>Capitalismo y mercado no son sinónimos</h3>
          <p>
            Se recordó que había intercambio y mercados antes del capitalismo,
            incluso bajo el feudalismo. Por eso se propuso profundizar después en
            el papel del mercado, el Estado, el libre mercado, la intervención
            estatal, una economía más cerrada, la propiedad y los medios de
            producción.
          </p>
        </article>

        <aside>
          <span>PROPUESTA PARA OTRO CAFÉ</span>
          <p>
            Cada participante podría llevar su propia propuesta de sistema
            económico.
          </p>
        </aside>
      </section>

      <section id="cafe-valores" className="cafe-paper-values">
        <header>
          <span>VALORES</span>
          <h3>No sólo se cuestionaron estructuras: también beneficio, bienestar y comodidad</h3>
        </header>

        <figure className="cafe-paper-natural-image">
          <div className="cafe-paper-natural-image-shell">
            <div className="cafe-paper-natural-image-index" aria-hidden="true">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
            </div>

            <div className="cafe-paper-natural-image-mat">
              <img
                src={image05}
                alt="Ilustración editorial sobre jerarquía laboral, riesgo, tiempo de trabajo y automatización."
              />
            </div>

            <figcaption>
              <span className="cafe-paper-natural-image-number">05</span>
              <p>Patrón y empleado · riesgo · tiempo · automatización</p>
            </figcaption>
          </div>
        </figure>

        <div className="cafe-paper-values-grid">
          <article>
            <small>PARTICIPANTE 11</small>
            <h4>Comodidad e incomodidad</h4>
            <p>
              Se propuso cuestionar la idea de que toda la vida tenga que
              orientarse hacia maximizar beneficios y comodidad. La incomodidad y
              el sufrimiento también forman parte de la existencia humana.
            </p>
          </article>

          <article>
            <small>RESPUESTA</small>
            <h4>Bienestar no es lo mismo que placer</h4>
            <p>
              Se distinguió bienestar de placer. El bienestar puede implicar
              esfuerzo, dolor e incomodidad; el problema podría aparecer cuando el
              placer se convierte en criterio absoluto.
            </p>
          </article>

          <article>
            <small>PARTICIPANTE 12</small>
            <h4>Evitar sufrimiento innecesario</h4>
            <p>
              Al preguntar qué valores sí conservar, se propuso evitar el
              sufrimiento innecesario. Aceptar que existe sufrimiento en la vida
              no implica aceptar cualquier sufrimiento.
            </p>
          </article>
        </div>
      </section>

      <section className="cafe-paper-after">
        <header>
          <span>DESPUÉS DEL CIERRE FORMAL</span>
          <h3>La conversación continuó</h3>
          <p>
            Después del cierre aparecieron nuevas líneas relacionadas con la
            discusión principal.
          </p>
        </header>

        <div className="cafe-paper-after-grid">
          <article>
            <span>PSICOLOGÍA</span>
            <h4>Miedo, supervivencia, necesidad, orgullo y frustración</h4>
            <p>
              Se planteó que cualquier discusión sobre sistemas económicos
              también debe incorporar una dimensión psicológica. Algunas
              decisiones pueden estar atravesadas por deseos, miedo, necesidad,
              orgullo o frustración.
            </p>
          </article>

          <article>
            <span>EJEMPLO</span>
            <h4>Breaking Bad</h4>
            <p>
              Walter White fue utilizado como ejemplo de cómo una carencia
              material puede mezclarse con orgullo y resentimiento. La discusión
              insistió en que una conducta no puede reducirse únicamente al
              sistema económico.
            </p>
          </article>

          <article>
            <span>PODER</span>
            <h4>Dinero y capacidad de evadir reglas</h4>
            <p>
              Se discutió que una gran cantidad de riqueza o poder puede permitir
              influir sobre leyes, obtener privilegios, evitar consecuencias o
              perjudicar a personas con menores posibilidades de defensa.
            </p>
          </article>

          <article>
            <span>MOTIVACIÓN</span>
            <h4>Una acción útil también puede tener un motivo egoísta</h4>
            <p>
              Dar limosna o ayudar a otra persona puede producir un beneficio
              real y, al mismo tiempo, estar motivado por culpa, deseo de
              salvación o necesidad de sentirse mejor.
            </p>
          </article>

          <article>
            <span>COOPERACIÓN</span>
            <h4>El interés propio no impide toda cooperación</h4>
            <p>
              Se planteó que incluso individuos egoístas pueden cooperar si existe
              una estructura capaz de regular conflictos y producir relaciones en
              las que varias partes obtengan algún beneficio.
            </p>
          </article>

          <article>
            <span>DIGNIDAD</span>
            <h4>¿Cuánto produce una persona o cuánto vale su vida?</h4>
            <p>
              Se propuso imaginar una estructura axiológica en la que el valor
              principal no fuera cuánto produce una persona, sino la vida o la
              dignidad de cada individuo.
            </p>
          </article>

          <article>
            <span>JERARQUÍA</span>
            <h4>Tratar mejor a alguien no debería implicar tratar peor a los demás</h4>
            <p>
              Se observaron diferencias de trato hacia personas con posiciones
              económicas, institucionales o sociales destacadas y se cuestionó que
              esas diferencias terminen convirtiéndose en diferencias simbólicas
              de valor humano.
            </p>
          </article>

          <article>
            <span>IGUALDAD</span>
            <h4>Un fundamento común de dignidad</h4>
            <p>
              Se recordó la fórmula religiosa “todos somos hijos de Dios” como un
              principio capaz de afirmar una igualdad fundamental, aunque también
              se reconoció que históricamente esa igualdad convivió con jerarquías
              y privilegios.
            </p>
          </article>
        </div>
      </section>

      <section id="cafe-cierre" className="cafe-paper-close">
        <div>
          <span>CIERRE FORMAL</span>
          <h3>El café se realizará cada quince días</h3>
        </div>
        <p>
          El diálogo quedó abierto y se indicó que podía continuar fuera de la
          sesión formal.
        </p>
      </section>

      <section className="cafe-paper-open-issues">
        <header>
          <span>PROBLEMAS QUE QUEDARON ABIERTOS</span>
          <h3>El café no llegó a una respuesta definitiva</h3>
        </header>

        <div className="cafe-paper-open-issues-grid">
          <article>
            <span>01</span>
            <h4>Imaginar algo exterior al propio sistema</h4>
            <p>
              Vivimos dentro del capitalismo y muchas de nuestras categorías,
              instituciones, deseos y expectativas se han formado parcialmente
              dentro de él.
            </p>
          </article>

          <article>
            <span>02</span>
            <h4>Capitalismo y mercado</h4>
            <p>
              El intercambio económico y los mercados existieron antes del
              capitalismo, por lo que no pueden identificarse sin más.
            </p>
          </article>

          <article>
            <span>03</span>
            <h4>Medios de producción</h4>
            <p>
              Quedó abierta la pregunta por quién posee los medios de producción,
              quién los controla y quién administra el excedente producido.
            </p>
          </article>

          <article>
            <span>04</span>
            <h4>Estado y sistema</h4>
            <p>
              Un sistema económico distinto seguiría obligando a discutir qué
              funciones tendría el Estado y qué reglas organizarían la sociedad.
            </p>
          </article>

          <article>
            <span>05</span>
            <h4>Interés individual</h4>
            <p>
              No quedó resuelto hasta qué punto el individualismo procede del
              sistema y hasta qué punto depende de deseos, decisiones y
              motivaciones humanas.
            </p>
          </article>

          <article>
            <span>06</span>
            <h4>Comodidad y acumulación</h4>
            <p>
              Incluso una persona crítica del capitalismo puede resistirse a
              perder las comodidades que ha obtenido dentro de él.
            </p>
          </article>

          <article>
            <span>07</span>
            <h4>Recursos finitos</h4>
            <p>
              La acumulación potencialmente ilimitada fue contrapuesta a los
              límites de los recursos naturales y de la fuerza de trabajo humana.
            </p>
          </article>

          <article>
            <span>08</span>
            <h4>Supuestos naturalizados</h4>
            <p>
              Decir “así son las cosas” no explica por qué deberían seguir siendo
              así. Varias jerarquías económicas quedaron sujetas a justificación.
            </p>
          </article>
        </div>
      </section>

      <aside className="cafe-paper-source-note">
        <span>NOTA EDITORIAL</span>
        <p>
          Esta edición reorganiza y resume únicamente argumentos, ejemplos,
          preguntas y respuestas del Café Filosófico del 7 de septiembre de 2026.
          Los nombres personales fueron sustituidos por etiquetas de participante.
        </p>
      </aside>

      <footer className="cafe-paper-footer">
        <span>PHILOSOPHIA · CAFÉ FILOSÓFICO</span>
        <span>07 · IX · 2026</span>
      </footer>
    </main>
  )
}
