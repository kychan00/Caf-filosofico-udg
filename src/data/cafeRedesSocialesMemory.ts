export type RedesMemoryChapter = {
  id: string
  number: string
  eyebrow: string
  title: string
  summary: string
  positions: string[]
}

export type RedesMemoryTension = {
  id: string
  left: string
  right: string
  reconstruction: string
}

export const redesMemoryChapters: RedesMemoryChapter[] = [
  {
    id: 'atencion',
    number: '01',
    eyebrow: 'ATENCIÓN · SCROLL · ABURRIMIENTO',
    title: 'Cuando la espera deja de estar vacía',
    summary:
      'La apertura situó el scroll continuo como una tecnología que compite por la atención y reduce los momentos de espera sin estímulo. El problema no se formuló sólo como distracción individual: también como una transformación de hábitos de lectura, conversación, ocio y consumo cultural.',
    positions: [
      'Se cuestionó la búsqueda constante de gratificación inmediata y el consumo acelerado de información.',
      'Se señaló que el teléfono puede ocupar tiempos antes disponibles para aburrirse, observar o sostener una conversación sin estímulo paralelo.',
      'Apareció la pregunta por si el deterioro de la atención es únicamente responsabilidad del usuario o también efecto del diseño de las plataformas.',
    ],
  },
  {
    id: 'identidad',
    number: '02',
    eyebrow: 'IDENTIDAD · PERFIL · RECONOCIMIENTO',
    title: 'No sólo mostramos quiénes somos: aprendemos qué versión mostrar',
    summary:
      'Una línea fuerte del diálogo sostuvo que el perfil no funciona como simple espejo. Seleccionamos, editamos y ponemos en circulación una versión de nosotros mismos; luego la respuesta de otras personas y de la propia plataforma retroalimenta esa selección.',
    positions: [
      'Se distinguió entre representar una identidad ya dada y participar activamente en su construcción.',
      'La validación mediante likes, comentarios y seguidores apareció como una forma cuantificada de reconocimiento.',
      'Se comparó el perfil con una máscara, una abstracción, una obra editada o incluso una forma de marketing personal.',
      'También se objetó que toda convivencia presencial ya implica selección de conducta y presentación de sí; la discusión quedó en si las redes cambian la naturaleza del fenómeno o lo intensifican.',
    ],
  },
  {
    id: 'distancia',
    number: '03',
    eyebrow: 'DISTANCIA · ODIO · RESPONSABILIDAD',
    title: 'La distancia digital modifica el costo de atacar',
    summary:
      'Varias intervenciones relacionaron la ausencia de copresencia corporal con formas de hostilidad que pueden prolongarse sin los frenos inmediatos de una interacción cara a cara. El desacuerdo online fue descrito como una cadena de comentarios sobre comentarios que puede perder el problema original.',
    positions: [
      'La distancia entre sujetos fue propuesta como condición que facilita deshumanización, insistencia y hostigamiento.',
      'Se planteó que el desacuerdo en redes puede convertirse en un disenso difícil de resolver porque las intervenciones ya no comparten una misma situación material.',
      'La persistencia de publicaciones añadió otra dimensión: el problema de ser evaluado años después por expresiones realizadas en otra etapa de la vida.',
      'De ahí surgió una discusión ética y jurídica sobre menores de edad, responsabilidad y capacidad para administrar una exposición pública permanente.',
    ],
  },
  {
    id: 'virtualidad',
    number: '04',
    eyebrow: 'VIRTUALIDAD · REALIDAD · CONSECUENCIAS',
    title: 'Lo digital no deja de ser real por ser virtual',
    summary:
      'Otra ruta del Café se concentró en la ontología de lo digital. La virtualidad fue discutida no como sinónimo de irrealidad, sino como una modalidad capaz de actualizarse y producir consecuencias materiales, económicas, afectivas y políticas.',
    positions: [
      'Se sostuvo que una identidad, un dinero o una relación digital pueden ser reales sin compartir exactamente la misma modalidad material que una interacción presencial.',
      'Se propuso pensar lo virtual mediante la relación potencia–actualización, evitando reducirlo a “algo falso”.',
      'Se discutió que reconocer realidad a lo digital obliga a preguntar también por criterios de verdad, validez y responsabilidad.',
      'La página, el algoritmo y la infraestructura fueron recordados como productos de trabajo humano, no como agentes aparecidos de manera autónoma.',
    ],
  },
  {
    id: 'algoritmos',
    number: '05',
    eyebrow: 'ALGORITMOS · DATOS · CAPITALISMO',
    title: 'Consumimos, pero también producimos para la plataforma',
    summary:
      'La conversación pasó de la experiencia individual a la arquitectura económica de las redes. El usuario fue descrito no sólo como consumidor sino como productor de datos, atención e interacción que puede convertirse en valor para empresas y sistemas de recomendación.',
    positions: [
      'Se habló de una economía de la atención que premia retención, repetición y permanencia.',
      'Apareció la figura del “proletariado digital” para pensar al usuario como alguien que produce datos mientras usa el servicio.',
      'Se discutió si el problema pertenece al capitalismo en particular o si las redes podrían persistir bajo otros sistemas económicos.',
      'También se planteó que las plataformas no sólo alojan conductas: mediante reglas, métricas y formatos participan en qué puede mostrarse y cómo circula.',
    ],
  },
  {
    id: 'deseo',
    number: '06',
    eyebrow: 'DESEO · PLACER · INCONSCIENTE',
    title: 'El deseo no está fuera de la infraestructura',
    summary:
      'Desde un enfoque deliberadamente interdisciplinario se cruzaron psicoanálisis, filosofía y crítica social para preguntar por qué seguimos participando en sistemas cuyos efectos problemáticos reconocemos. El placer, el reconocimiento y el deseo fueron tratados como parte del mecanismo, no como elementos externos a él.',
    positions: [
      'Se propuso que las redes aprovechan tendencias humanas previas —placer, reconocimiento, comparación— en lugar de crearlas desde cero.',
      'Otra intervención habló de un inconsciente atravesado por formas de producción, consumo y globalización.',
      'Se insistió en que el ocio y la presentación de sí pueden convertirse en espacios económicamente explotables.',
      'La objeción abierta fue evitar un determinismo total: si la estructura condiciona el deseo, todavía queda por precisar dónde y cómo aparece la agencia del usuario.',
    ],
  },
  {
    id: 'ia',
    number: '07',
    eyebrow: 'IA · TRANSHUMANISMO · FUTURO',
    title: '¿Herramienta humana o horizonte de sustitución?',
    summary:
      'El cierre desplazó la conversación hacia inteligencia artificial, transhumanismo y posthumanismo. No hubo una posición única: unas intervenciones imaginaron una creciente dependencia tecnológica; otras rechazaron atribuir pensamiento o agencia propia a la IA y devolvieron la responsabilidad a los seres humanos e instituciones que la diseñan y utilizan.',
    positions: [
      'Se discutió la singularidad tecnológica como horizonte especulativo, no como hecho establecido por el Café.',
      'Una objeción fuerte sostuvo que la IA no tiene problemas propios: resuelve problemas formulados por humanos y funciona dentro de infraestructura material.',
      'El transhumanismo fue comparado críticamente con una promesa de salvación frente a enfermedad, límite y muerte.',
      'La pregunta final quedó puesta en la responsabilidad humana: incluso si las tecnologías se vuelven más capaces, ¿quién define sus fines, quién se beneficia y quién responde por sus efectos?',
    ],
  },
  {
    id: 'complejidad',
    number: '08',
    eyebrow: 'COMPLEJIDAD · ORGANIZACIÓN · ACCIÓN',
    title: 'Si la responsabilidad se distribuye, la respuesta también tendrá que organizarse',
    summary:
      'Las últimas intervenciones señalaron que los problemas digitales ya no parecen reducibles a un solo actor. Empresas, programadores, usuarios, gobiernos, mercados y culturas participan simultáneamente. Frente a esa complejidad, surgió la necesidad de pensar formas colectivas e interdisciplinarias de organización.',
    positions: [
      'Se preguntó cómo actuar cuando resulta difícil señalar un único centro de decisión o responsabilidad.',
      'La interdisciplinariedad apareció no sólo como método descriptivo, sino como necesidad práctica para reunir saberes parciales.',
      'Privacidad, términos de servicio, derechos sobre imágenes y responsabilidad de plataformas quedaron como problemas que exigen lectura jurídica y política además de filosófica.',
      'El siguiente tema anunciado para el Café fue inteligencia artificial, dejando abierta la continuidad entre ambas discusiones.',
    ],
  },
]

export const redesMemoryTensions: RedesMemoryTension[] = [
  {
    id: 'representation-construction',
    left: 'representación',
    right: 'construcción',
    reconstruction:
      'El perfil puede expresar rasgos reales y, al mismo tiempo, participar en la producción de la identidad que después reconocemos como propia.',
  },
  {
    id: 'material-digital',
    left: 'continuidad social',
    right: 'intensificación digital',
    reconstruction:
      'Una posición vio la presentación digital como continuidad de las máscaras sociales; otra subrayó que edición, escala, permanencia y distancia cambian cualitativamente sus efectos.',
  },
  {
    id: 'capitalism-network',
    left: 'herramienta capitalista',
    right: 'infraestructura más amplia',
    reconstruction:
      'Se criticó la monetización de atención y datos, pero quedó abierta la pregunta de si una red social dejaría de existir bajo otro sistema económico.',
  },
  {
    id: 'ai-agency',
    left: 'singularidad / autonomía',
    right: 'herramienta humana',
    reconstruction:
      'El horizonte de una inteligencia capaz de superar a los humanos fue contrapuesto a la tesis de que la IA carece de fines propios y debe analizarse dentro del trabajo e intereses humanos.',
  },
]

export const redesMemoryOpenProblems = [
  '¿Qué parte de una identidad digital es representación y qué parte es producción de un yo posible?',
  '¿Qué derecho debería tener una persona a no quedar fijada para siempre a expresiones de su adolescencia?',
  '¿Cómo se reparte la responsabilidad entre usuario, empresa, programadores, diseño algorítmico y regulación?',
  '¿Puede existir disenso online que conserve una situación compartida suficiente para resolver desacuerdos?',
  '¿Qué formas de reconocimiento no dependen de métricas visibles?',
  '¿Puede una red social organizarse sin convertir atención, datos o deseo en mercancía?',
  '¿Dónde termina el condicionamiento de la plataforma y dónde comienza la agencia del sujeto?',
  '¿Qué criterios permiten hablar de inteligencia, agencia o responsabilidad cuando intervienen sistemas de IA?',
  '¿Cómo organizar respuestas colectivas ante problemas cuya causalidad está distribuida entre muchos actores?',
]

export const redesMemoryUnverified = [
  'Durante el diálogo se mencionaron noticias, ejemplos de plataformas, posibles efectos neuropsicológicos, decisiones judiciales, diferencias entre feeds nacionales, fechas de singularidad y proyecciones tecnológicas.',
  'Esas afirmaciones se conservan como parte del contexto argumental de la sesión, pero esta memoria no las convierte en hechos verificados.',
  'Cuando una afirmación empírica sea necesaria para una investigación posterior deberá cotejarse en una capa documental separada.',
]
