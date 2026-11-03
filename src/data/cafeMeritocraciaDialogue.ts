export type MeritNodeKind =
  | 'pregunta'
  | 'distincion'
  | 'tesis'
  | 'objecion'
  | 'ejemplo'
  | 'autor'
  | 'problema-abierto'

export type MeritTrack =
  | 'fundamento'
  | 'pobreza'
  | 'merito'
  | 'trabajo'
  | 'competencia'
  | 'religion'
  | 'sintesis'

export type MeritDialogueNode = {
  id: string
  code: string
  kind: MeritNodeKind
  track: MeritTrack
  title: string
  summary: string
  introducedBy: string
  excerpt: string
  respondsTo: string[]
  objections: string[]
  leadsTo: string[]
  position: { x: number; y: number }
}

const N = (
  id: string,
  code: string,
  kind: MeritNodeKind,
  track: MeritTrack,
  title: string,
  summary: string,
  introducedBy: string,
  excerpt: string,
  respondsTo: string[],
  objections: string[],
  leadsTo: string[],
  position: { x: number; y: number },
): MeritDialogueNode => ({
  id, code, kind, track, title, summary, introducedBy, excerpt,
  respondsTo, objections, leadsTo, position,
})

export const meritocracyTrackLabels: Record<string, string> = {
  all: 'Todo',
  fundamento: 'Fundamento',
  pobreza: 'Pobreza',
  merito: 'Mérito',
  trabajo: 'Trabajo / mercado',
  competencia: 'Competencia',
  religion: 'Religión',
  sintesis: 'Síntesis',
}

export const meritocracyNodes: MeritDialogueNode[] = [
  N('M00','00','pregunta','fundamento','¿Qué es la meritocracia?',
    'El café parte de meritum + kratos y de la advertencia satírica de Michael Young. El problema no es sólo quién tiene mérito, sino cómo una narrativa del mérito legitima posiciones sociales ya distribuidas.',
    'Persona 1',
    '“Nacemos y ya estamos insertos en un mundo que está repartido... hay algunos que ya tienen muchas posiciones, pero ‘es que tienen mérito’.”',
    [],[],['M01','P00','J00'],{x:80,y:330}),
  N('M01','01','autor','fundamento','Michael Young: una advertencia invertida',
    'El término “meritocracia” aparece en 1958 en una obra satírica que advertía sobre el orden social producido por la lógica del mérito; la sesión observa la inversión posterior del término hasta convertirse en justificación.',
    'Persona 1',
    '“Michael Young acuñó el término meritocracia en 1958, en una obra satírica que funcionaba como una especie de advertencia.”',
    ['M00'],[],['S00'],{x:380,y:80}),
  N('P00','02','pregunta','pobreza','¿Qué significa ser pobre?',
    'La primera dificultad conceptual consiste en evitar que “pobreza” mezcle pobreza material, pobreza extrema, renuncia voluntaria a la propiedad y pobreza espiritual.',
    'Personas 2, 3, 4, 5 y 6',
    '“Pero habría que delimitar la pobreza. ¿En qué sentido? Pobreza espiritual, pobreza económica…”',
    ['M00'],[],['P01','R00','P02'],{x:380,y:260}),
  N('R00','03','distincion','religion','Pobreza espiritual ≠ pobreza material',
    'La renuncia religiosa a la propiedad privada no equivale a carecer de alimento, subsistencia o dignidad. El diálogo separa desapego espiritual de privación material.',
    'Personas 6 y 7',
    '“Ellos renuncian a su propiedad privada... pero eso no implica que esa pobreza les impida acceder a lo mínimo para su subsistencia.”',
    ['P00'],[],['R01','P04'],{x:680,y:50}),
  N('P01','04','pregunta','pobreza','¿Qué significa “querer” dejar de ser pobre?',
    'La frase “el pobre es pobre porque quiere” se reformula como una tesis sobre disposición a realizar ciertas acciones. Eso obliga a preguntar qué acciones se presuponen y cuáles son éticamente admisibles.',
    'Persona 8',
    '“¿Qué significa ‘querer’ en la frase ‘el pobre es pobre porque quiere’?”',
    ['P00'],[],['P02'],{x:680,y:250}),
  N('P02','05','tesis','pobreza','Premisas ocultas de “el pobre es pobre porque quiere”',
    'La afirmación supone una riqueza posible, una ruta accesible para alcanzarla y la suficiencia del esfuerzo individual. La conclusión depende de esas premisas no demostradas.',
    'Persona 1',
    '“Se asume que hay una riqueza posible detrás de esa pobreza... ‘Si le echas ganas, vas a dejar de ser pobre’.”',
    ['P01'],['P03','J02'],['P03','S00'],{x:980,y:250}),
  N('P03','06','objecion','pobreza','Confrontar la narrativa con la realidad',
    'La objeción práctica pregunta si personas sin agua, calzado o condiciones básicas realmente eligen esa situación. El “querer” no puede suponerse sólo desde la existencia abstracta de una salida.',
    'Persona 1',
    '“¿Es verdad que la gente quiere ser pobre? ¿La gente quiere andar descalza? ¿La gente quiere vivir sin agua? Pues no.”',
    ['P02'],[],['P04','J02'],{x:1280,y:250}),
  N('R01','07','tesis','religion','Méritos espirituales y legitimación',
    'El diálogo explora si la lógica del mérito tiene antecedentes religiosos: hacer méritos para la salvación, contribuir a instituciones o convertir éxito material en signo de superioridad espiritual.',
    'Personas 2 y 10',
    '“Como que está generando méritos para alcanzar el cielo o para alcanzar la divinidad.”',
    ['R00'],['M03'],['M02'],{x:980,y:50}),
  N('P04','08','pregunta','pobreza','¿Dónde empieza la pobreza?',
    'La pobreza aparece como histórica y relacional: aquello considerado lujo, necesidad o carencia cambia con las condiciones materiales de una sociedad. El café deja esta cuestión deliberadamente abierta.',
    'Personas 9, 12 y 14',
    '“Entonces es difícil marcar dónde empieza la pobreza.”',
    ['P00','P03'],[],['J01','S02'],{x:1580,y:250}),
  N('M02','09','pregunta','merito','¿Toda meritocracia es negativa?',
    'La discusión distingue el concepto crítico de meritocracia de cualquier sistema de requisitos, evaluación o reconocimiento. La pregunta se desplaza a quién define, mide y legitima los méritos.',
    'Personas 11 y 12',
    '“Entonces no toda meritocracia es necesariamente detestable ni negativa. El asunto es: ¿Quién mide tus méritos?”',
    ['R01','M00'],[],['M03','M04'],{x:680,y:460}),
  N('M03','10','distincion','merito','Mérito ≠ privilegio',
    'No toda ventaja es mérito. Salud, talento natural, disposiciones físicas, herencias y contactos pueden generar ventajas sin haber sido producidos por el esfuerzo del agente.',
    'Persona 1',
    '“Si entendemos meritocracia como cualquier privilegio, perdemos el concepto.”',
    ['M02'],[],['M05','J02'],{x:980,y:460}),
  N('M04','11','pregunta','merito','¿Quién juzga los méritos?',
    'La institución aparece como mediación decisiva: universidad, familia, Iglesia o mercado establecen criterios, reglas y recompensas. El mérito no circula sin una instancia de valoración.',
    'Persona 12',
    '“¿Quién mide tus méritos? ¿Quién es el juez de tus méritos? ¿Y por qué tendrías que seguirlos?”',
    ['M02'],['C00'],['M05','J00','C00'],{x:1280,y:460}),
  N('M05','12','distincion','merito','Mérito ≠ merecimiento',
    'El café distingue esfuerzo realizado de aquello que alguien merece recibir. Con Aristóteles aparecen magnanimidad, vanidad y pusilanimidad para pensar reconocimiento, dignidad y retribución.',
    'Persona 1',
    '“Hay que diferenciar que una cosa es el mérito y otra cosa es merecer.”',
    ['M03','M04'],[],['J01','M07'],{x:1580,y:460}),
  N('J00','13','autor','trabajo','Hayek: el mercado no premia el mérito',
    'La intervención introduce una crítica al imaginario meritocrático desde Hayek: el mercado no puede medir ni rastrear adecuadamente el mérito individual.',
    'Persona 1',
    '“Hayek sostiene que el mercado no debe ni puede premiar el mérito, porque el mérito no es medible ni rastreable de esa manera.”',
    ['M00','M04'],[],['J01','S00'],{x:680,y:670}),
  N('J01','14','tesis','trabajo','Marx: pobreza como retribución insuficiente',
    'Una posible medida económica de pobreza aparece cuando el valor producido por el trabajador no retorna en una medida suficiente para su vida o proporcional a su producción.',
    'Persona 12',
    '“Los trabajadores son miserables cuando su trabajo no les es devuelto en la medida en la que ellos lo produjeron.”',
    ['P04','M05'],[],['J02'],{x:980,y:670}),
  N('J02','15','objecion','trabajo','El mercado no valora todo trabajo',
    'Enfermería, cuidados, trabajo doméstico, arte y servicios muestran que esfuerzo, utilidad social, salario y valor de mercado no coinciden necesariamente.',
    'Persona 14',
    '“Hay mucho trabajo que no es remunerado o que no es remunerado como debería.”',
    ['J01','M03'],[],['S00','M06'],{x:1280,y:670}),
  N('M06','16','distincion','merito','Meritocracia “real” y “falsa”',
    'Se propone distinguir un mérito ligado a sacrificios y disciplina de una falsa autoatribución del éxito que oculta contactos, herencia o posición. La dificultad de fijar un criterio definitivo queda abierta.',
    'Persona 17',
    '“Creo que existen dos tipos de meritocracia: una meritocracia real y una meritocracia falsa.”',
    ['M03'],['J02'],['S00'],{x:1580,y:670}),
  N('C00','17','tesis','competencia','Meritocracia como imposición institucional',
    'La meritocracia puede vivirse como un conjunto de reglas preestablecidas por instituciones más grandes que el individuo: si se quiere atravesarlas, hay que cumplir sus criterios.',
    'Persona 16',
    '“Yo veo la meritocracia como una imposición que hace la élite a la sociedad.”',
    ['M04'],['C01'],['C01'],{x:680,y:880}),
  N('C01','18','pregunta','competencia','¿Por qué tenemos que competir?',
    'La crítica más profunda desplaza el debate desde igualdad de oportunidades hacia la premisa de la competencia misma: aun con una línea de salida igual, ¿por qué la organización social debe estructurarse como competencia?',
    'Persona 1',
    '“¿Está en la naturaleza humana la competencia o es algo socialmente inculcado?”',
    ['C00','M05'],['C02'],['C02','C03'],{x:980,y:880}),
  N('C02','19','objecion','competencia','La competencia tendría una base biológica',
    'Una intervención compara la competencia social con procesos de supervivencia biológica: árboles compiten por agua y organismos por permanencia, aunque no exista intención consciente.',
    'Persona 18',
    '“Yo creo que sí es necesaria, pero no necesariamente en un sentido social, sino en un sentido biológico.”',
    ['C01'],['C03'],['C03'],{x:1280,y:880}),
  N('C03','20','problema-abierto','competencia','Supervivencia ≠ acumulación',
    'La conclusión distingue competencia por supervivencia de competencia por acumulación de bienes. El hecho de que exista la primera no demuestra que la segunda sea necesaria o natural.',
    'Persona 12',
    '“Una cosa es una competencia por la supervivencia... y otra es una competencia por la acumulación de bienes.”',
    ['C02'],[],['S03'],{x:1580,y:880}),
  N('M07','21','objecion','merito','Igualdad de partida no garantiza igualdad efectiva',
    'Incluso una línea de salida formalmente igual deja intactas disposiciones, apoyos, instituciones, trayectorias y diferencias posteriores. Igualdad inicial y justicia distributiva no son equivalentes.',
    'Personas 1 y 12',
    '“Incluso si imagináramos un mundo hipotético en el que todos iniciáramos exactamente desde la misma línea de salida, seguiría habiendo desigualdad.”',
    ['M05','P02'],[],['S00'],{x:1880,y:460}),
  N('M08','22','ejemplo','merito','“Todos pueden llegar a donde yo estoy”',
    'La narrativa de ascenso individual borra redes de apoyo, contactos y bienes iniciales. Dos niños pueden esforzarse dentro de condiciones materiales radicalmente distintas.',
    'Persona 15',
    '“Algunas cosas que para determinadas personas son completamente normales, para otras son privilegios.”',
    ['P02','M03'],[],['M07','S00'],{x:1880,y:250}),
  N('C04','23','tesis','competencia','IA como nuevo medio de producción',
    'La IA introduce una nueva asimetría: acceso de uso no equivale a propiedad del medio de producción. Quienes controlan derechos, infraestructura y modelos pueden capturar una ventaja estructural.',
    'Persona 14',
    '“Parece democrática porque todo el mundo puede acceder a una IA, pero no todo el mundo puede ser dueño de una IA.”',
    ['J01','C01'],[],['S01'],{x:1880,y:880}),
  N('S00','24','tesis','sintesis','Meritocracia como legitimación',
    'El problema emergente no es negar que existan esfuerzo, habilidad o disciplina, sino preguntar cuándo esas diferencias se convierten en una justificación moral de desigualdades cuyo origen también es estructural.',
    'Síntesis del diálogo',
    'Pregunta emergente: “¿quién establece el criterio de mérito, bajo qué condiciones puede cumplirse y por qué una determinada recompensa tendría que seguirse de él?”',
    ['M01','P02','J00','J02','M07','M08'],[],['S01','S02','S03'],{x:2200,y:460}),
  N('S01','25','problema-abierto','sintesis','Propiedad, comunidad y nuevos medios',
    'La discusión sobre IA abre una pregunta por propiedad y coordinación colectiva: ¿la tecnología amplía capacidades comunes o concentra nuevos medios de producción?',
    'Persona 14',
    '“Parece que nos tienen peleando entre nosotros mientras otros aprovechan esa competencia para su propio beneficio.”',
    ['C04'],[],[],{x:2500,y:670}),
  N('S02','26','problema-abierto','sintesis','Próximo problema: la pobreza',
    'La propia sesión reconoce que el concepto de pobreza quedó abierto y merece un café específico: tipos, umbrales, historicidad y relación con mérito.',
    'Persona 10',
    '“Yo creo que un tema interesante para dentro de dos semanas sería la pobreza.”',
    ['P04'],[],[],{x:2500,y:250}),
  N('S03','27','problema-abierto','sintesis','Biología o convención social',
    'El café cierra sin resolver si la competencia relevante para la meritocracia es innata, biológica, cultural o institucional, ni si distintos tipos de competencia deben evaluarse del mismo modo.',
    'Persona 12',
    '“¿Está determinado biológica o innatamente o es algún tipo de convención social?”',
    ['C03'],[],[],{x:2500,y:880}),
]

export const meritocracyEdges = meritocracyNodes.flatMap((node) => [
  ...node.leadsTo.map((target) => ({
    id: `e-${node.id}-${target}`,
    source: node.id,
    target,
    kind: 'development' as const,
  })),
  ...node.objections.map((target) => ({
    id: `o-${node.id}-${target}`,
    source: node.id,
    target,
    kind: 'objection' as const,
  })),
])

export function meritocracyNodeById(id: string) {
  return meritocracyNodes.find((node) => node.id === id) || null
}
