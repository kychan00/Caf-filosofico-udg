const schemaIdentity = {
  layout: 'radial',
  ariaLabel: 'Bucle entre perfil, métricas y construcción de identidad',
  centerId: 'profile',
  nodes: [
    { id: 'profile', label: 'perfil visible', shapeRole: 'concept', emphasis: true, tone: 'accent' },
    { id: 'selection', label: 'selección de lo que muestro', shapeRole: 'mediation' },
    { id: 'metrics', label: 'likes · comentarios · seguidores', shapeRole: 'structure' },
    { id: 'learning', label: 'aprendo qué versión recibe reconocimiento', shapeRole: 'result', tone: 'accent' },
  ],
  edges: [
    { from: 'selection', to: 'profile', label: 'construye', relationKind: 'derives' },
    { from: 'profile', to: 'metrics', label: 'recibe', relationKind: 'derives' },
    { from: 'metrics', to: 'learning', label: 'retroalimenta', relationKind: 'derives' },
    { from: 'learning', to: 'selection', label: 'reorienta', relationKind: 'reciprocal' },
  ],
  animation: { mode: 'radial', nodeDuration: .34, edgeDuration: .38 },
}

const schemaPlatform = {
  layout: 'hierarchy',
  direction: 'vertical',
  ariaLabel: 'De la infraestructura de plataforma a la conducta visible',
  rootId: 'platform',
  nodes: [
    { id: 'platform', label: 'plataforma', shapeRole: 'structure', emphasis: true, tone: 'accent' },
    { id: 'rules', label: 'formatos · métricas · recomendación', shapeRole: 'mediation' },
    { id: 'attention', label: 'distribución de atención', shapeRole: 'concept' },
    { id: 'visibility', label: 'visibilidad diferencial', shapeRole: 'result' },
    { id: 'data', label: 'datos e interacción', shapeRole: 'term', tone: 'accent' },
  ],
  edges: [
    { from: 'platform', to: 'rules', label: 'organiza mediante', relationKind: 'derives' },
    { from: 'rules', to: 'attention', label: 'orienta', relationKind: 'derives' },
    { from: 'attention', to: 'visibility', label: 'produce', relationKind: 'derives' },
    { from: 'visibility', to: 'data', label: 'genera más', relationKind: 'transversal' },
  ],
  animation: { mode: 'sequence', nodeDuration: .34, edgeDuration: .38 },
}

const schemaResponsibility = {
  layout: 'radial',
  ariaLabel: 'Responsabilidad distribuida en sistemas digitales',
  centerId: 'effect',
  nodes: [
    { id: 'effect', label: 'efecto social / daño / decisión', shapeRole: 'concept', emphasis: true, tone: 'accent' },
    { id: 'user', label: 'usuario', shapeRole: 'term' },
    { id: 'company', label: 'empresa', shapeRole: 'structure' },
    { id: 'developers', label: 'equipos técnicos', shapeRole: 'mediation' },
    { id: 'law', label: 'regulación', shapeRole: 'structure' },
    { id: 'culture', label: 'cultura y hábitos', shapeRole: 'term' },
  ],
  edges: [
    { from: 'user', to: 'effect', label: 'participa en', relationKind: 'transversal' },
    { from: 'company', to: 'effect', label: 'define fines y reglas', relationKind: 'derives' },
    { from: 'developers', to: 'effect', label: 'materializa decisiones', relationKind: 'derives' },
    { from: 'law', to: 'effect', label: 'limita / habilita', relationKind: 'reciprocal' },
    { from: 'culture', to: 'effect', label: 'condiciona usos', relationKind: 'transversal' },
  ],
  animation: { mode: 'radial', nodeDuration: .34, edgeDuration: .38 },
}

const N = ({
  id, code, title, kind, section, summary, explanation, argument, question,
  concepts = [], critical = false, schema = null, position,
}) => ({
  id,
  code,
  title,
  kind,
  section,
  summary,
  explanation,
  argument,
  question,
  concepts,
  critical,
  schema,
  position,
  source: 'Memoria del diálogo · Café Filosófico 05 · Redes sociales · 03 NOV 2026',
})

export const redesSections = [
  {
    id: 'identity',
    number: '01',
    title: 'Atención e identidad',
    tone: 'blue',
    question: '¿Cómo intervienen atención, perfil y métricas en la construcción del yo visible?',
    before: 'La apertura pregunta quién soy cuando me muestro en una red.',
    after: 'La construcción del perfil conduce al problema de permanencia, distancia y reconocimiento.',
  },
  {
    id: 'distance',
    number: '02',
    title: 'Distancia y virtualidad',
    tone: 'rust',
    question: '¿Qué cambia cuando el otro aparece a distancia y lo virtual produce consecuencias reales?',
    before: 'La identidad ya está mediada por perfil, métricas y memoria digital.',
    after: 'La discusión pasa de la relación entre sujetos a la infraestructura que organiza la interacción.',
  },
  {
    id: 'platform',
    number: '03',
    title: 'Plataforma y economía',
    tone: 'gold',
    question: '¿Cómo participan plataformas, datos y modelos económicos en la conducta visible?',
    before: 'El desacuerdo digital mostró que la plataforma no es un escenario neutral.',
    after: 'La distribución del poder técnico conduce a la pregunta por responsabilidad y agencia.',
  },
  {
    id: 'future',
    number: '04',
    title: 'Responsabilidad y futuro',
    tone: 'moss',
    question: '¿Quién responde cuando la causalidad se distribuye y la discusión se prolonga hacia IA?',
    before: 'La infraestructura condiciona atención, visibilidad, datos y deseo.',
    after: 'El encuentro deja abierta una agenda sobre IA, organización colectiva y responsabilidad.',
  },
]

export const redesArguments = [
  N({
    id:'R01', code:'01', title:'Scroll y atención capturada', kind:'Problema', section:'identity',
    summary:'El scroll continuo fue discutido como una tecnología que ocupa tiempos de espera y favorece consumo acelerado.',
    explanation:'La sesión no trató la atención sólo como rasgo psicológico individual. También preguntó qué ocurre cuando el diseño de una plataforma convierte la continuidad del estímulo en condición normal de uso.',
    argument:'Si el entorno reduce sistemáticamente los intervalos sin estímulo, cambia la forma en que se distribuyen atención, espera y aburrimiento.',
    question:'¿Qué perdemos cuando cada pausa puede llenarse inmediatamente con contenido?',
    concepts:['scroll','atención','aburrimiento'], critical:true, position:{x:0,y:0},
  }),
  N({
    id:'R02', code:'02', title:'Perfil como construcción de identidad', kind:'Tesis', section:'identity',
    summary:'El perfil no funciona sólo como espejo: seleccionar qué mostrar participa en la construcción del yo visible.',
    explanation:'Una línea central sostuvo que mostramos una versión seleccionada de nosotros mismos y que esa selección puede volverse estable cuando recibe reconocimiento.',
    argument:'La autopresentación digital es simultáneamente representación de algo previo y producción de una versión socialmente disponible de uno mismo.',
    question:'¿Dónde termina representar quién soy y dónde comienza producir quién quiero ser?',
    concepts:['identidad','perfil','selección'], critical:true, schema:schemaIdentity, position:{x:430,y:-110},
  }),
  N({
    id:'R03', code:'03', title:'Reconocimiento cuantificado', kind:'Distinción', section:'identity',
    summary:'Likes, comentarios y seguidores aparecieron como signos medibles de reconocimiento.',
    explanation:'La conversación distinguió ser visible de ser conocido. Una cifra puede indicar interacción sin equivaler a comprensión, vínculo o reconocimiento pleno.',
    argument:'Cuando el reconocimiento se expresa mediante métricas públicas, puede retroalimentar qué versiones de uno mismo se consideran dignas de mostrarse.',
    question:'¿Qué formas de reconocimiento no dependen de una cifra visible?',
    concepts:['likes','visibilidad','reconocimiento'], position:{x:860,y:40},
  }),

  N({
    id:'R04', code:'04', title:'Persistencia digital y pasado', kind:'Problema ético', section:'distance',
    summary:'“Internet no olvida” abrió el problema de quedar fijado a expresiones realizadas en otra etapa de la vida.',
    explanation:'La pregunta por una publicación hecha a los 16 años desplazó el debate hacia responsabilidad, cambio personal y derecho a no quedar congelado por un archivo permanente.',
    argument:'La memoria digital puede conservar expresiones más allá del contexto biográfico en que fueron realizadas.',
    question:'¿Qué derecho debería tener una persona a no quedar definida para siempre por su pasado digital?',
    concepts:['memoria','adolescencia','responsabilidad'], critical:true, position:{x:0,y:520},
  }),
  N({
    id:'R05', code:'05', title:'Distancia digital y odio', kind:'Tesis', section:'distance',
    summary:'La ausencia de copresencia corporal fue propuesta como condición que puede facilitar hostilidad prolongada.',
    explanation:'Varias intervenciones señalaron que atacar a distancia puede disminuir frenos inmediatos de una confrontación cara a cara y favorecer la reducción del otro a usuario, avatar o comentario.',
    argument:'La distancia no causa por sí sola el odio, pero modifica el costo y la experiencia inmediata de agredir.',
    question:'¿Qué límites de la copresencia desaparecen cuando la relación ocurre a distancia?',
    concepts:['distancia','odio','deshumanización'], position:{x:430,y:410},
  }),
  N({
    id:'R06', code:'06', title:'Lo virtual también es real', kind:'Distinción ontológica', section:'distance',
    summary:'La sesión rechazó identificar virtual con irreal.',
    explanation:'Una relación, una identidad o un valor digital pueden producir consecuencias materiales, económicas, afectivas y políticas sin compartir la misma modalidad de la copresencia física.',
    argument:'Lo virtual puede entenderse como una modalidad de actualización de lo real, no como su simple negación.',
    question:'¿Qué criterio necesitamos para distinguir modalidad de realidad de falta de realidad?',
    concepts:['virtualidad','realidad','actualización'], critical:true, position:{x:860,y:560},
  }),

  N({
    id:'R07', code:'07', title:'La plataforma no es neutral', kind:'Tesis', section:'platform',
    summary:'Formatos, métricas, reglas y sistemas de recomendación participan en qué se muestra y qué obtiene visibilidad.',
    explanation:'La conversación trató la plataforma como una infraestructura que organiza posibilidades de interacción, no como un recipiente vacío.',
    argument:'Una interfaz define condiciones de posibilidad: hace unas acciones fáciles, otras difíciles y distribuye atención de manera desigual.',
    question:'¿Qué decisiones de diseño se vuelven invisibles cuando usamos una plataforma como si fuera neutral?',
    concepts:['plataforma','interfaz','recomendación'], critical:true, schema:schemaPlatform, position:{x:0,y:1040},
  }),
  N({
    id:'R08', code:'08', title:'Datos y proletariado digital', kind:'Propuesta crítica', section:'platform',
    summary:'El usuario fue pensado no sólo como consumidor sino como productor de datos, atención e interacción.',
    explanation:'Apareció la figura del “proletariado digital” para describir una relación en la que usar la plataforma también produce insumos que pueden convertirse en valor económico.',
    argument:'La actividad cotidiana del usuario puede integrarse al proceso económico de la plataforma sin presentarse como trabajo remunerado.',
    question:'¿Qué producimos para una plataforma mientras creemos solamente estar consumiendo?',
    concepts:['datos','atención','valor'], position:{x:430,y:930},
  }),
  N({
    id:'R09', code:'09', title:'Capitalismo, deseo y permanencia', kind:'Tensión', section:'platform',
    summary:'La monetización de atención y datos fue vinculada con deseo, reconocimiento y permanencia en la aplicación.',
    explanation:'Una posición interpretó las redes actuales como infraestructura profundamente integrada al capitalismo; otra dejó abierta la posibilidad de redes sociales bajo otros modelos económicos.',
    argument:'El problema puede no ser la existencia de una red social en abstracto, sino el modelo que convierte atención, datos y deseo en valor.',
    question:'¿Puede existir una red social que no dependa de extracción de atención y datos?',
    concepts:['capitalismo','deseo','economía de la atención'], critical:true, position:{x:860,y:1080},
  }),

  N({
    id:'R10', code:'10', title:'Responsabilidad distribuida', kind:'Problema político', section:'future',
    summary:'Empresa, equipos técnicos, usuarios, regulación y cultura participan simultáneamente en los efectos digitales.',
    explanation:'La complejidad vuelve difícil señalar un único actor, pero la sesión rechazó que esa dificultad elimine la responsabilidad.',
    argument:'Cuando la causalidad es distribuida, la responsabilidad necesita mecanismos de atribución también distribuidos.',
    question:'¿Cómo asignar responsabilidad sin fingir que un sistema complejo tiene una sola causa?',
    concepts:['responsabilidad','empresa','regulación'], critical:true, schema:schemaResponsibility, position:{x:0,y:1560},
  }),
  N({
    id:'R11', code:'11', title:'IA: herramienta o horizonte de sustitución', kind:'Disenso', section:'future',
    summary:'El cierre contrapuso la idea de una creciente autonomía tecnológica con la tesis de que la IA sigue operando dentro de fines humanos.',
    explanation:'La singularidad y el transhumanismo aparecieron como horizontes especulativos. Una objeción fuerte sostuvo que la IA no tiene problemas propios y que atribuirle agencia puede ocultar a los humanos e instituciones detrás del sistema.',
    argument:'La discusión sobre IA reabre la cuestión de quién define fines, quién se beneficia y quién responde.',
    question:'¿Qué significa llamar “inteligencia” a un sistema que no formula por sí mismo el problema que resuelve?',
    concepts:['IA','singularidad','agencia'], position:{x:430,y:1450},
  }),
  N({
    id:'R12', code:'12', title:'Organización colectiva ante la complejidad', kind:'Problema abierto', section:'future',
    summary:'La respuesta final no fue individualista: apareció la necesidad de reunir saberes y organizar respuestas colectivas.',
    explanation:'La interdisciplinariedad se propuso como método y como práctica: filosofía, derecho, educación, tecnología, economía y política aportan piezas distintas de un mismo problema.',
    argument:'Si ningún individuo puede abarcar por sí solo la complejidad del sistema, la acción crítica requiere organización y cooperación.',
    question:'¿Cómo convertir conocimiento distribuido en capacidad colectiva de intervención?',
    concepts:['organización','interdisciplina','acción'], critical:true, position:{x:860,y:1600},
  }),
]

export const redesRelations = [
  { id:'e01', from:'R01', to:'R02', label:'condiciona la autopresentación', kind:'development' },
  { id:'e02', from:'R02', to:'R03', label:'busca reconocimiento', kind:'development' },
  { id:'e03', from:'R03', to:'R02', label:'retroalimenta identidad', kind:'reciprocal' },
  { id:'e04', from:'R02', to:'R04', label:'deja huella persistente', kind:'development' },
  { id:'e05', from:'R04', to:'R05', label:'abre responsabilidad interpersonal', kind:'development' },
  { id:'e06', from:'R05', to:'R06', label:'obliga a precisar qué es real', kind:'tension' },
  { id:'e07', from:'R06', to:'R07', label:'desplaza hacia infraestructura', kind:'development' },
  { id:'e08', from:'R07', to:'R01', label:'administra atención', kind:'transversal' },
  { id:'e09', from:'R07', to:'R03', label:'ordena visibilidad', kind:'transversal' },
  { id:'e10', from:'R07', to:'R08', label:'registra interacción', kind:'development' },
  { id:'e11', from:'R08', to:'R09', label:'se convierte en valor', kind:'development' },
  { id:'e12', from:'R09', to:'R10', label:'exige atribuir responsabilidad', kind:'development' },
  { id:'e13', from:'R10', to:'R11', label:'replantea agencia', kind:'development' },
  { id:'e14', from:'R11', to:'R12', label:'abre tarea colectiva', kind:'development' },
  { id:'e15', from:'R09', to:'R02', label:'captura deseo de reconocimiento', kind:'tension' },
  { id:'e16', from:'R12', to:'R10', label:'organiza respuesta', kind:'reciprocal' },
]

export const redesStudyQuestions = [
  {
    id:'Q1', section:'identity', nodeId:'R02',
    prompt:'¿Por qué la memoria no trata el perfil como un simple espejo?',
    options:['Porque todo perfil es falso','Porque seleccionar y recibir retroalimentación puede participar en la construcción de identidad','Porque las redes eliminan la identidad previa'],
    correct:1,
    explanation:'La sesión sostuvo una posición intermedia: el perfil puede representar rasgos reales y al mismo tiempo intervenir en qué versión de uno mismo aprende a mostrarse.',
  },
  {
    id:'Q2', section:'distance', nodeId:'R06',
    prompt:'¿Qué distinción se defendió al hablar de virtualidad?',
    options:['Virtual equivale a imaginario y por tanto a irreal','Lo virtual puede ser real aunque tenga otra modalidad','Sólo lo material produce consecuencias'],
    correct:1,
    explanation:'La discusión separó virtualidad de irrealidad y atendió a las consecuencias efectivas de las relaciones digitales.',
  },
  {
    id:'Q3', section:'platform', nodeId:'R07',
    prompt:'¿Por qué la plataforma no aparece como recipiente neutral?',
    options:['Porque tiene colores e interfaz','Porque formatos, métricas y recomendación organizan posibilidades y visibilidad','Porque todo usuario obedece exactamente al algoritmo'],
    correct:1,
    explanation:'El argumento no es determinista: la plataforma condiciona y distribuye posibilidades sin eliminar por completo la agencia.',
  },
  {
    id:'Q4', section:'future', nodeId:'R10',
    prompt:'¿Qué ocurre con la responsabilidad cuando el sistema tiene muchos actores?',
    options:['Desaparece','Debe atribuirse sólo al programador','Necesita distribuirse sin perder la posibilidad de atribución'],
    correct:2,
    explanation:'La complejidad distribuye causalidad entre empresa, equipos técnicos, usuarios, regulación y cultura; eso dificulta, pero no elimina, la responsabilidad.',
  },
]

export const redesEvidence = [
  {
    id:'E01',
    src:null,
    status:'original-pendiente',
    alt:'Participantes sentados alrededor de mesas durante el Café Filosófico sobre redes sociales.',
    title:'Evidencia 01 · Vista general del círculo de diálogo',
    caption:'Vista general del encuentro presencial. La fotografía documenta la disposición de conversación y el uso compartido del aula durante la edición 05.',
  },
  {
    id:'E02',
    src:'images/cafe-filosofico/redes-sociales/sesion-05/02.webp',
    alt:'Vista lateral de participantes durante una intervención del Café Filosófico sobre redes sociales.',
    title:'Evidencia 02 · Desarrollo del intercambio',
    caption:'Vista complementaria del diálogo en curso. La imagen documenta escucha, intervención y trabajo presencial sin atribuir una posición filosófica concreta a las personas retratadas.',
  },
]

export function redesNodeById(id) {
  return redesArguments.find((node) => node.id === id) || null
}

export function redesNodesForSection(sectionId) {
  return sectionId === 'all'
    ? redesArguments
    : redesArguments.filter((node) => node.section === sectionId)
}

export function redesPositionFor(node) {
  return node?.position || { x:0, y:0 }
}
