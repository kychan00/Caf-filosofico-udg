const schemaInfluence = {
  layout: 'flow',
  ariaLabel: 'Del informar a la manipulación',
  nodes: [
    { id: 'info', label: 'informar', shapeRole: 'term' },
    { id: 'influence', label: 'influir', shapeRole: 'mediation' },
    { id: 'persuade', label: 'persuadir', shapeRole: 'structure', emphasis: true, tone: 'accent' },
    { id: 'manipulate', label: 'manipular', shapeRole: 'result', tone: 'accent' },
  ],
  edges: [
    { from: 'info', to: 'influence', label: 'puede convertirse en', relationKind: 'derives' },
    { from: 'influence', to: 'persuade', label: 'puede intensificarse como', relationKind: 'derives' },
    { from: 'persuade', to: 'manipulate', label: 'cruza un umbral ético', relationKind: 'transversal' },
  ],
  animation: { mode: 'sequence', nodeDuration: .34, edgeDuration: .38 },
}

const schemaNeed = {
  layout: 'flow',
  ariaLabel: 'Captura comercial de una necesidad social',
  nodes: [
    { id: 'need', label: 'necesidad social', shapeRole: 'concept' },
    { id: 'brand', label: 'marca', shapeRole: 'mediation', emphasis: true, tone: 'accent' },
    { id: 'symbol', label: 'valor simbólico', shapeRole: 'structure' },
    { id: 'purchase', label: 'consumo', shapeRole: 'result', tone: 'accent' },
    { id: 'open', label: 'necesidad permanece abierta', shapeRole: 'term' },
  ],
  edges: [
    { from: 'need', to: 'brand', label: 'es capturada por', relationKind: 'derives' },
    { from: 'brand', to: 'symbol', label: 'se asocia con', relationKind: 'constitutes' },
    { from: 'symbol', to: 'purchase', label: 'orienta', relationKind: 'derives' },
    { from: 'purchase', to: 'open', label: 'no necesariamente cierra', relationKind: 'transversal' },
  ],
  animation: { mode: 'sequence', nodeDuration: .34, edgeDuration: .38 },
}

const schemaFreedom = {
  layout: 'hierarchy',
  direction: 'vertical',
  ariaLabel: 'Perfilado, condicionamiento y libertad',
  rootId: 'data',
  nodes: [
    { id: 'data', label: 'datos y hábitos', shapeRole: 'structure' },
    { id: 'profile', label: 'perfil predictivo', shapeRole: 'mediation' },
    { id: 'environment', label: 'entorno de decisión', shapeRole: 'structure' },
    { id: 'choice', label: 'elección sentida como propia', shapeRole: 'result', tone: 'accent' },
    { id: 'causes', label: 'conocer las causas', shapeRole: 'concept', emphasis: true, tone: 'accent' },
  ],
  edges: [
    { from: 'data', to: 'profile', label: 'permite construir', relationKind: 'derives' },
    { from: 'profile', to: 'environment', label: 'permite orientar', relationKind: 'derives' },
    { from: 'environment', to: 'choice', label: 'condiciona', relationKind: 'transversal' },
    { from: 'causes', to: 'choice', label: 'hace más crítica', relationKind: 'reciprocal' },
  ],
  animation: { mode: 'sequence', nodeDuration: .34, edgeDuration: .38 },
}

const N = ({
  id, code, title, kind, phase, branch, excerpt, explanation, question,
  dependsOn = [], concepts = [], diagram = [], schema = null, critical = false, position,
}) => ({
  id,
  type: critical ? 'core' : 'text',
  position,
  data: {
    code,
    title,
    kind,
    phase,
    branch,
    excerpt,
    explanation,
    question,
    dependsOn,
    concepts,
    diagram,
    schema,
    critical,
    source: 'Café Filosófico · Mercadotecnia · 05 OCT 2026',
  },
})

export const marketingDialogueNodes = [
  N({ id:'D00', code:'00', title:'¿Sugerencia, persuasión o manipulación?', kind:'Pregunta rectora', phase:'Apertura', branch:['persuasion','ethics'], excerpt:'¿La mercadotecnia informa o también influye, y qué tan libres somos al elegir?', explanation:'La sesión parte de tres preguntas que convergen en un mismo problema: cómo distinguir una ayuda legítima a la decisión de una intervención que explota o condiciona al consumidor.', question:'¿Qué criterio permitiría distinguir influencia legítima de manipulación?', concepts:['mercadotecnia','influencia','libertad'], diagram:['informar','→','influir','→','persuadir','→','manipular'], schema:schemaInfluence, critical:true, position:{x:0,y:0} }),
  N({ id:'D01', code:'01', title:'Mercadotecnia como promoción e investigación', kind:'Distinción', phase:'Apertura', branch:['persuasion'], excerpt:'Puede promocionar un producto ya existente, pero también estudiar el mercado y detectar necesidades.', explanation:'La apertura separa dos funciones: comunicar lo ya producido y estudiar al consumidor para orientar producción, oferta o segmentación.', question:'¿En cuál de las dos funciones aparece con más fuerza el problema ético?', dependsOn:['D00'], concepts:['promoción','investigación','mercado'], position:{x:360,y:-220} }),
  N({ id:'D02', code:'02', title:'Rentabilidad como criterio empresarial', kind:'Tesis', phase:'Apertura', branch:['ethics'], excerpt:'Satisfacer una necesidad y así obtener rentabilidad.', explanation:'La rentabilidad aparece como componente explícito de la definición de trabajo. La sesión pregunta qué sucede cuando deja de ser un resultado y se vuelve el fin dominante.', question:'¿La rentabilidad debe ser un límite, un fin o una consecuencia?', dependsOn:['D01'], concepts:['rentabilidad','empresa','fin'], position:{x:360,y:120} }),
  N({ id:'D03', code:'03', title:'Obsolescencia y duración', kind:'Ejemplo', phase:'Apertura', branch:['ethics'], excerpt:'Si un producto satisface demasiado bien la necesidad, puede dejar de moverse la economía.', explanation:'La obsolescencia programada funciona como ejemplo para mostrar una tensión entre satisfacción duradera y repetición del consumo.', question:'¿Puede una economía de consumo premiar la durabilidad sin perder rentabilidad?', dependsOn:['D02'], concepts:['durabilidad','obsolescencia','consumo'], position:{x:720,y:120} }),
  N({ id:'D04', code:'04', title:'Marketing tradicional y neuromarketing', kind:'Distinción', phase:'Apertura', branch:['freedom','persuasion'], excerpt:'Uno pregunta lo que el consumidor expresa; el otro intenta observar respuestas automáticas.', explanation:'La sesión usa esta diferencia para preguntar qué ocurre cuando la empresa busca acceder a reacciones que el sujeto no formula conscientemente.', question:'¿Conocer respuestas automáticas aumenta información o reduce autonomía?', dependsOn:['D01'], concepts:['neuromarketing','respuesta automática','encuesta'], position:{x:720,y:-220} }),

  N({ id:'D05', code:'05', title:'Técnica de intercambio vs instrumento capitalista', kind:'Distinción', phase:'Conceptos', branch:['ethics','persuasion'], excerpt:'Mercadotecnia puede entenderse como técnica racional de intercambio o como instrumento del sistema capitalista.', explanation:'Una intervención propone no identificar sin más intercambio, mercado y capitalismo. La rentabilidad y la acumulación cambian el sentido ético del instrumento.', question:'¿Qué añade el capitalismo a una técnica de intercambio?', dependsOn:['D00'], concepts:['técnica','intercambio','capitalismo'], position:{x:1080,y:-260} }),
  N({ id:'D06', code:'06', title:'Persuasión no equivale a manipulación', kind:'Tesis', phase:'Conceptos', branch:['persuasion'], excerpt:'Toda persuasión implica influencia, pero no toda influencia ni toda persuasión implica manipulación.', explanation:'Este fue uno de los criterios más claros de la sesión. Persuadir puede modificar una disposición sin suprimir necesariamente la capacidad del otro para decidir.', question:'¿Qué debe añadirse a la persuasión para que se vuelva manipulación?', dependsOn:['D05'], concepts:['persuasión','influencia','manipulación'], schema:schemaInfluence, critical:true, position:{x:1080,y:80} }),
  N({ id:'D07', code:'07', title:'La identidad como punto de presión', kind:'Ejemplo', phase:'Conceptos', branch:['persuasion','identity'], excerpt:'“Si eres libre, ven a nuestro café” ya presiona sobre quién eres, no sólo sobre lo que eliges.', explanation:'El ejemplo muestra una transición: la invitación deja de ofrecer una opción y liga la elección con una valoración moral o identitaria del receptor.', question:'¿Condicionar la identidad reduce la libertad de una elección?', dependsOn:['D06'], concepts:['identidad','presión','elección'], position:{x:1440,y:80} }),
  N({ id:'D08', code:'08', title:'Perfilado predictivo', kind:'Problema', phase:'Datos', branch:['freedom'], excerpt:'¿Qué pasa cuando otra entidad puede construir un perfil de mí con información que yo mismo no reúno?', explanation:'Palantir aparece como ejemplo oral para formular el problema general del cruce masivo de datos y la predicción de conducta.', question:'¿Puede haber consentimiento significativo si el perfil excede lo que el sujeto conoce de sí?', dependsOn:['D04'], concepts:['datos','perfil','predicción'], schema:schemaFreedom, critical:true, position:{x:1080,y:-560} }),

  N({ id:'D09', code:'09', title:'Satisfacer necesidades o producirlas', kind:'Pregunta', phase:'Deseo', branch:['desire','ethics'], excerpt:'¿Se satisfacen necesidades o se crean necesidades ficticias?', explanation:'La sesión desplaza el problema desde qué se vende hacia cómo se construye la necesidad que hace vendible algo.', question:'¿Qué hace que una necesidad sea real, social, artificial o inducida?', dependsOn:['D02'], concepts:['necesidad','producción','deseo'], position:{x:1440,y:360} }),
  N({ id:'D10', code:'10', title:'Marketing ético como posibilidad', kind:'Problema abierto', phase:'Ética', branch:['ethics'], excerpt:'¿Puede existir una mercadotecnia ética?', explanation:'Se propone que la técnica podría ser defendible si no convierte a la persona en simple medio y si la rentabilidad no ocupa el lugar de fin absoluto.', question:'¿Qué condiciones mínimas tendría un marketing ético?', dependsOn:['D09'], concepts:['ética','rentabilidad','persona'], position:{x:1800,y:500} }),
  N({ id:'D11', code:'11', title:'Crear insuficiencia para vender reparación', kind:'Ejemplo', phase:'Deseo', branch:['desire','identity'], excerpt:'Primero hacerte sentir defectuoso; después venderte la actualización.', explanation:'La película Robots y los anuncios sobre acné, cuerpo o suplementos se usan para mostrar una estrategia: producir malestar o insuficiencia y vender el remedio.', question:'¿La creación deliberada de inseguridad cruza el umbral de manipulación?', dependsOn:['D09'], concepts:['inseguridad','insatisfacción','venta'], position:{x:1800,y:180} }),
  N({ id:'D12', code:'12', title:'Propaganda y mercadotecnia', kind:'Distinción', phase:'Conceptos', branch:['persuasion','ethics'], excerpt:'La propaganda buscaría adhesión; la mercadotecnia tendría como fin el dinero.', explanation:'Una intervención diferencia los fines: convencimiento de masas frente a rentabilidad. La sesión conserva esta posición como propuesta, no como definición final.', question:'¿Puede una campaña comercial ser también propaganda?', dependsOn:['D06'], concepts:['propaganda','adhesión','dinero'], position:{x:1800,y:-120} }),
  N({ id:'D13', code:'13', title:'Estética y vulnerabilidad', kind:'Tesis', phase:'Deseo', branch:['identity','desire'], excerpt:'Un estándar puede imponerse sin formularse directamente como una orden.', explanation:'La manipulación estética aparece como acción sobre aspiraciones, autoestima y comparación social, especialmente cuando el sujeto es joven.', question:'¿Qué responsabilidad existe al explotar vulnerabilidades estéticas?', dependsOn:['D11'], concepts:['belleza','autoestima','aspiración'], position:{x:2160,y:180} }),

  N({ id:'D14', code:'14', title:'Necesidad vs deseo', kind:'Distinción', phase:'Deseo', branch:['desire'], excerpt:'El marketing se enfoca más en vender deseos que en cubrir necesidades.', explanation:'Una intervención distingue necesidades de conservación y equilibrio de deseos orientados a placer, novedad, reconocimiento o comparación.', question:'¿Puede el deseo convertirse en necesidad?', dependsOn:['D09'], concepts:['necesidad','deseo','placer'], critical:true, position:{x:1440,y:700} }),
  N({ id:'D15', code:'15', title:'Deseo mimético', kind:'Hipótesis', phase:'Deseo', branch:['desire','identity'], excerpt:'Deseamos lo que vemos desear a otros.', explanation:'Se introduce, sin fijar autor en la grabación, una teoría mimética del deseo para pensar rivalidad, moda y contagio social.', question:'¿Cuánto de lo que deseamos depende del deseo ajeno?', dependsOn:['D14'], concepts:['mimesis','rivalidad','deseo'], position:{x:1800,y:820} }),
  N({ id:'D16', code:'16', title:'¿Cómo identificar una necesidad real?', kind:'Pregunta', phase:'Deseo', branch:['desire','ethics'], excerpt:'¿Qué herramienta me permite distinguir una necesidad real de algo inducido?', explanation:'La moderación convierte la distinción teórica en criterio práctico para defenderse de estrategias comerciales.', question:'¿Qué prueba usaríamos para distinguir necesidad, deseo e inducción?', dependsOn:['D14'], concepts:['criterio','necesidad','inducción'], position:{x:2160,y:700} }),
  N({ id:'D17', code:'17', title:'Necesidades artificiales y bien común', kind:'Tesis', phase:'Deseo', branch:['desire','ethics'], excerpt:'Una necesidad puede ser artificial y aun así ser humana y moralmente relevante.', explanation:'Vivienda, agua limpia, seguridad o formas de vida social no se reducen a fisiología. Se propone evaluarlas según reducción del sufrimiento y bien común.', question:'¿Qué hace legítima una necesidad socialmente construida?', dependsOn:['D16'], concepts:['necesidad artificial','bien común','sufrimiento'], position:{x:2520,y:700} }),
  N({ id:'D18', code:'18', title:'Pertenencia e identidad como necesidades sociales', kind:'Tesis', phase:'Identidad', branch:['identity','desire'], excerpt:'Una marca puede aprovechar una necesidad real de pertenencia y convertirla en deseo de un objeto.', explanation:'Las marcas de lujo aparecen como ejemplo de cómo una necesidad social previa puede ser capturada y traducida en consumo.', question:'¿Comprar pertenencia satisface pertenencia?', dependsOn:['D17'], concepts:['pertenencia','identidad','lujo'], schema:schemaNeed, critical:true, position:{x:2520,y:360} }),
  N({ id:'D19', code:'19', title:'Publicidad emocional y asociación de marca', kind:'Ejemplo', phase:'Identidad', branch:['identity'], excerpt:'Ya no importa sólo el producto: importa la idea que asocias con él.', explanation:'Familia, Navidad, amistad o fiesta funcionan como valores que la marca intenta adherir simbólicamente al producto.', question:'¿Puede una marca apropiarse de un valor comunitario?', dependsOn:['D18'], concepts:['emoción','marca','asociación'], position:{x:2880,y:360} }),

  N({ id:'D20', code:'20', title:'Rentabilidad como límite de la ética', kind:'Tesis', phase:'Ética', branch:['ethics'], excerpt:'Un marketing ético requeriría que la rentabilidad dejara de ser el fin más importante.', explanation:'La propuesta no elimina el intercambio económico; intenta subordinar la rentabilidad a reglas de honestidad, no explotación y satisfacción efectiva.', question:'¿Una empresa competitiva puede sostener ese límite?', dependsOn:['D10','D17'], concepts:['marketing ético','límite','rentabilidad'], position:{x:2880,y:700} }),
  N({ id:'D21', code:'21', title:'Marx: fetichismo de la mercancía', kind:'Autor', phase:'Mercancía', branch:['commodity','identity'], excerpt:'El producto aparece como si tuviera valor por sí mismo y se olvida el trabajo que lo produjo.', explanation:'La sesión recupera el fetichismo para pensar la mercancía como objeto separado de sus condiciones materiales y relaciones sociales de producción.', question:'¿Qué oculta la forma terminada de una mercancía?', dependsOn:['D19'], concepts:['Marx','fetichismo','trabajo'], critical:true, position:{x:3240,y:160} }),
  N({ id:'D22', code:'22', title:'La mercancía como signo de estatus', kind:'Tesis', phase:'Mercancía', branch:['commodity','identity'], excerpt:'No es cualquier café: es Starbucks.', explanation:'El objeto funciona simultáneamente como cosa útil y como signo social. El consumo comunica gusto, identidad, pertenencia o estatus.', question:'¿Qué parte del valor pagado corresponde al objeto y cuál al signo?', dependsOn:['D21'], concepts:['estatus','signo','marca'], position:{x:3600,y:160} }),

  N({ id:'D23', code:'23', title:'Spinoza: libertad como conocimiento de causas', kind:'Autor', phase:'Libertad', branch:['freedom'], excerpt:'Eres más libre en la medida en que conoces las causas que te condicionan.', explanation:'El diálogo usa a Spinoza como herramienta crítica: la libertad de consumo aumenta cuando se conocen afectos, hábitos, asociaciones y condicionamientos.', question:'¿Conocer una causa basta para dejar de estar condicionado por ella?', dependsOn:['D08','D22'], concepts:['Spinoza','causa','libertad'], schema:schemaFreedom, critical:true, position:{x:3240,y:-260} }),
  N({ id:'D24', code:'24', title:'Libertad bajo perfilado', kind:'Problema', phase:'Libertad', branch:['freedom'], excerpt:'¿Qué tanto sigue siendo libertad si otra entidad conoce mi cadena causal mejor que yo?', explanation:'La libertad subjetivamente sentida puede convivir con un entorno de decisión diseñado a partir de hábitos, datos y predicciones.', question:'¿Una elección condicionada sigue siendo libre si el condicionamiento es invisible?', dependsOn:['D23'], concepts:['perfilado','causalidad','elección'], position:{x:3600,y:-260} }),
  N({ id:'D25', code:'25', title:'Distorsionar necesidades sociales', kind:'Tesis', phase:'Libertad', branch:['freedom','desire'], excerpt:'Más que crear todas las necesidades, la mercadotecnia puede distorsionarlas.', explanation:'La necesidad de comunidad, familia o reconocimiento puede ser real; el mercado puede redirigirla hacia productos que sólo prometen cubrirla.', question:'¿Cuándo una mediación comercial distorsiona una necesidad legítima?', dependsOn:['D18','D24'], concepts:['distorsión','necesidad social','mercado'], position:{x:3960,y:40} }),
  N({ id:'D26', code:'26', title:'Mantener al consumidor necesitando', kind:'Tesis', phase:'Ética', branch:['ethics','desire'], excerpt:'Si la necesidad se satisface del todo, se acaba el negocio.', explanation:'Una intervención lleva al extremo la tensión entre satisfacción y rentabilidad: el mercado puede vivir mejor de necesidades recurrentes que de necesidades definitivamente cerradas.', question:'¿Puede una empresa ser rentable sin depender de necesidades recurrentes?', dependsOn:['D20','D25'], concepts:['recurrencia','negocio','necesidad'], schema:schemaNeed, position:{x:3960,y:500} }),
  N({ id:'D27', code:'27', title:'No basta saber que existe manipulación', kind:'Tesis', phase:'Libertad', branch:['freedom','ethics'], excerpt:'Es necesario saber cómo se nos manipula.', explanation:'La alfabetización crítica exige reconstruir mecanismos concretos: datos, interfaces, asociaciones, segmentación, hábitos y vulnerabilidades.', question:'¿Qué conocimiento práctico necesita hoy un consumidor para decidir mejor?', dependsOn:['D24','D26'], concepts:['alfabetización','mecanismos','crítica'], position:{x:4320,y:120} }),
  N({ id:'D28', code:'28', title:'¿Es el deseo una necesidad humana?', kind:'Problema abierto', phase:'Cierre', branch:['desire','ethics'], excerpt:'El deseo desea desear. ¿Entendemos el deseo como una necesidad?', explanation:'La conversación posterior al cierre deja abierta una cuestión antropológica: si desear forma parte constitutiva de la vida humana, el problema no puede ser eliminar el deseo sino distinguir su cultivo de su explotación.', question:'¿Cómo distinguir deseo humano de deseo comercialmente explotado?', dependsOn:['D15','D27'], concepts:['deseo','condición humana','explotación'], critical:true, position:{x:4320,y:520} }),
  N({ id:'D29', code:'29', title:'Conocer las causas como herramienta crítica', kind:'Síntesis', phase:'Cierre', branch:['freedom','ethics','commodity'], excerpt:'La mejor herramienta propuesta fue conocer las causas que nos condicionan.', explanation:'La sesión no cierra con una condena total del marketing. Su síntesis práctica es aumentar la inteligibilidad de las fuerzas que orientan deseos, asociaciones, datos y mercancías.', question:'¿Hasta dónde puede llegar esa conciencia crítica en un entorno diseñado para anticiparnos?', dependsOn:['D21','D23','D27','D28'], concepts:['causas','conciencia crítica','libertad'], diagram:['mercancía','+','deseo','+','datos','→','condicionamiento','→','conocimiento de causas'], critical:true, position:{x:4680,y:220} }),
]

export const marketingDialogueEdges = marketingDialogueNodes.flatMap((node) =>
  node.data.dependsOn.map((source) => ({
    id: 'e-' + source + '-' + node.id,
    source,
    target: node.id,
    relation: 'development',
  })),
)

export const marketingDialogueRoutes = [
  { id:'all', label:'Mapa completo', description:'Toda la conversación.' },
  { id:'persuasion', label:'Persuasión', description:'Información, influencia, persuasión y manipulación.' },
  { id:'desire', label:'Necesidad / deseo', description:'Necesidades fisiológicas, sociales y deseos inducidos.' },
  { id:'identity', label:'Identidad', description:'Pertenencia, estética, marca y valor simbólico.' },
  { id:'freedom', label:'Libertad', description:'Datos, perfilado, causalidad y decisión.' },
  { id:'commodity', label:'Mercancía', description:'Fetichismo, trabajo y mercancía-signo.' },
  { id:'ethics', label:'Ética', description:'Rentabilidad, límites y posibilidad de marketing ético.' },
]

export const marketingDialogueGuidedRoute = marketingDialogueNodes.map((node) => ({
  id: node.id,
  focus: node.data.title,
  explanation: node.data.explanation,
}))

export function marketingDialogueNodeById(id) {
  return marketingDialogueNodes.find((node) => node.id === id) || null
}

export const marketingDialogueSource = {
  label: 'Fuente de la reconstrucción',
  title: 'Café Filosófico · Mercadotecnia · 5 de octubre de 2026',
  boundary:
    'El sistema reconstruye la conversación documentada. Las afirmaciones de participantes se presentan como posiciones del diálogo y no como hechos externos verificados.',
  vault:
    '09 - Café Filosófico/Sesiones/2026-10-05 - Mercadotecnia - Transcripción.md',
}
