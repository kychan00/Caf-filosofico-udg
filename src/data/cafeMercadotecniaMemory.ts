export type MarketingMemoryKind =
  | 'distincion'
  | 'tesis'
  | 'objecion'
  | 'ejemplo'
  | 'autor'
  | 'problema-abierto'

export type MarketingMemoryTrack =
  | 'persuasion'
  | 'need'
  | 'identity'
  | 'freedom'
  | 'commodity'
  | 'ethics'

export type MarketingMemoryNode = {
  id: string
  code: string
  kind: MarketingMemoryKind
  track: MarketingMemoryTrack
  title: string
  summary: string
  excerpt: string
}

export const marketingMemoryTrackLabels: Record<MarketingMemoryTrack, string> = {
  persuasion: 'Influencia / persuasión',
  need: 'Necesidad / deseo',
  identity: 'Identidad / pertenencia',
  freedom: 'Libertad / perfilado',
  commodity: 'Mercancía / fetichismo',
  ethics: 'Ética del marketing',
}

export const marketingMemoryNodes: MarketingMemoryNode[] = [
  {
    id: 'MK01',
    code: '01',
    kind: 'distincion',
    track: 'persuasion',
    title: 'Influencia no equivale a manipulación',
    summary:
      'La sesión distinguió entre informar, influir, persuadir y manipular. Se defendió que toda persuasión implica influencia, pero que no toda influencia ni toda persuasión elimina la capacidad de decidir.',
    excerpt:
      '“Toda persuasión implica influencia, pero no toda influencia ni toda persuasión implica manipulación.”',
  },
  {
    id: 'MK02',
    code: '02',
    kind: 'tesis',
    track: 'persuasion',
    title: 'La manipulación puede operar sobre identidad',
    summary:
      'Una estrategia cambia de nivel cuando ya no sólo presenta un producto, sino que condiciona la identidad del receptor: pertenecer, ser libre, verse bien o ser aceptado.',
    excerpt:
      '“Si eres libre, ven a nuestro Café Filosófico” fue usado como ejemplo de una invitación que ya presiona sobre la identidad.',
  },
  {
    id: 'MK03',
    code: '03',
    kind: 'distincion',
    track: 'need',
    title: 'Necesidad y deseo no son lo mismo',
    summary:
      'Una línea del diálogo sostuvo que muchas necesidades son relativamente estables, mientras que el deseo puede crecer hacia placer, reconocimiento, novedad y comparación.',
    excerpt:
      '“El marketing se enfoca más en venderte deseos, no en cubrirte necesidades.”',
  },
  {
    id: 'MK04',
    code: '04',
    kind: 'objecion',
    track: 'need',
    title: 'No toda necesidad es fisiológica',
    summary:
      'Se objetó una definición demasiado estrecha de necesidad. Vivienda, pertenencia, reconocimiento y comunidad pueden convertirse en necesidades humanas reales dentro de una sociedad.',
    excerpt:
      '“Podemos hablar de necesidades artificiales, pero algunas llegan a ser necesidades reales para una vida humana.”',
  },
  {
    id: 'MK05',
    code: '05',
    kind: 'tesis',
    track: 'identity',
    title: 'La marca puede capturar una necesidad social',
    summary:
      'La necesidad de pertenencia no tiene por qué ser inventada por la publicidad; una marca puede apropiarse simbólicamente de ella y presentarse como vía de acceso a identidad, prestigio o comunidad.',
    excerpt:
      '“Te están generando el deseo, pero también está la necesidad de identidad, de ser parte.”',
  },
  {
    id: 'MK06',
    code: '06',
    kind: 'ejemplo',
    track: 'identity',
    title: 'Vender una emoción además del producto',
    summary:
      'Se discutieron anuncios de familia, fiesta, belleza y pertenencia para mostrar que el producto puede quedar asociado a una experiencia emocional que excede su función material.',
    excerpt:
      '“Al final ya ni siquiera lo que importa es el producto; es la idea que asocies a él.”',
  },
  {
    id: 'MK07',
    code: '07',
    kind: 'tesis',
    track: 'freedom',
    title: 'Otra entidad puede conocer mejor nuestros patrones',
    summary:
      'La pregunta por la libertad se volvió más exigente cuando se introdujo el perfilado digital: hábitos, horarios, desplazamientos, preferencias y respuestas pueden ser usados para orientar el entorno de decisión.',
    excerpt:
      '“¿Qué tanto sigue siendo libertad si hay otra entidad que conoce esta cadena de causalidad mejor que yo?”',
  },
  {
    id: 'MK08',
    code: '08',
    kind: 'autor',
    track: 'freedom',
    title: 'Spinoza: libertad como conocimiento de causas',
    summary:
      'La sesión recuperó a Spinoza para pensar que la libertad no consiste en ausencia de causas, sino en conocer mejor aquello que nos determina y afecta.',
    excerpt:
      '“Eres libre en la medida en la que conoces las causas que te condicionan.”',
  },
  {
    id: 'MK09',
    code: '09',
    kind: 'autor',
    track: 'commodity',
    title: 'Marx: la mercancía puede ocultar su producción',
    summary:
      'El fetichismo de la mercancía apareció como marco para pensar cómo un objeto se presenta separado del trabajo y de las relaciones sociales que lo hicieron posible.',
    excerpt:
      '“Se despoja del trabajo del producto para ponerlo como una especie de Dios.”',
  },
  {
    id: 'MK10',
    code: '10',
    kind: 'tesis',
    track: 'commodity',
    title: 'La mercancía funciona también como signo',
    summary:
      'El valor del objeto no quedó reducido a su uso. La conversación subrayó su dimensión simbólica: estatus, gusto, pertenencia e identidad.',
    excerpt:
      '“No estoy tomando cualquier café; estoy tomando un Starbucks.”',
  },
  {
    id: 'MK11',
    code: '11',
    kind: 'tesis',
    track: 'ethics',
    title: 'El mercado puede mantener abierta la necesidad',
    summary:
      'Una posición sostuvo que una empresa puede tener incentivos para no cerrar completamente una necesidad si necesita que el consumo continúe.',
    excerpt:
      '“Tengo que mantenerte necesitando, porque si no se me acaba el negocio.”',
  },
  {
    id: 'MK12',
    code: '12',
    kind: 'problema-abierto',
    track: 'ethics',
    title: '¿Puede existir un marketing ético?',
    summary:
      'Se propuso que podría ser más defendible cuando la rentabilidad no ocupa el lugar de fin supremo y cuando no depende de engaño, explotación o producción deliberada de malestar.',
    excerpt:
      '“Podríamos hablar de marketing ético en la medida en que se dejara de lado la rentabilidad como el fin más importante.”',
  },
  {
    id: 'MK13',
    code: '13',
    kind: 'problema-abierto',
    track: 'need',
    title: '¿Es el deseo una necesidad humana?',
    summary:
      'La sesión cerró sin resolver si el deseo mismo forma parte de la condición humana y, por tanto, si puede tratarse como una necesidad de un tipo distinto.',
    excerpt:
      '“¿Entendemos el deseo como una necesidad?”',
  },
  {
    id: 'MK14',
    code: '14',
    kind: 'problema-abierto',
    track: 'freedom',
    title: '¿Cómo resistir cuando la influencia es invisible?',
    summary:
      'El cierre dejó una exigencia epistemológica: no basta saber que existe influencia; hay que comprender sus mecanismos y los datos que permiten anticipar conductas.',
    excerpt:
      '“No es suficiente saber que nos están manipulando; es necesario saber cómo.”',
  },
]

export const marketingOpenProblems = [
  '¿Dónde termina la persuasión legítima y comienza la manipulación?',
  '¿Puede existir mercadotecnia sin rentabilidad como fin dominante?',
  '¿Qué diferencia una necesidad real de un deseo inducido?',
  '¿Son las necesidades sociales menos reales que las fisiológicas?',
  '¿Puede una marca satisfacer una necesidad sin tener incentivos para mantenerla abierta?',
  '¿Qué tan libre es una elección cuando otra entidad conoce mejor nuestros condicionamientos?',
  '¿Cómo distinguir valor material, valor social y valor simbólico?',
  'Si el deseo forma parte de la condición humana, ¿cómo distinguir entre cultivarlo y explotarlo comercialmente?',
]
