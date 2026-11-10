export type CafeEvent = {
  id: string
  edition: number
  date: string
  displayDate: string
  slug: string
  eyebrow: string
  title: string
  shortTitle: string
  question: string
  deck: string
  route: string
  status: 'publicado' | 'proximo'
  themes: string[]
  poster: string
  posterAlt: string
  assetKind?: 'poster' | 'archivo'
  time?: string
  location?: string
}

export const cafeEvents: CafeEvent[] = [
  {
    id: 'cafe-2026-09-07-capitalismo',
    edition: 1,
    date: '2026-09-07',
    displayDate: '07 SEP 2026',
    slug: 'fin-del-mundo-fin-del-capitalismo',
    eyebrow: 'Café filosófico · diálogo abierto',
    title:
      '¿Por qué es más fácil pensar en el fin del mundo que en el fin del capitalismo?',
    shortTitle: 'Fin del mundo / capitalismo',
    question: '¿Por qué resulta más fácil imaginar el fin del mundo que el fin del capitalismo?',
    deck:
      'Una discusión sobre sistema, deseo, medios de producción, naturaleza, mérito y la dificultad de imaginar alternativas.',
    route:
      '/cafe-filosofico/2026/09/07/fin-del-mundo-fin-del-capitalismo',
    status: 'publicado',
    themes: [
      'capitalismo',
      'sistema',
      'deseo',
      'medios de producción',
      'naturaleza',
      'valor',
    ],
    poster: 'images/cafe-filosofico/session-01-thumb.png',
    posterAlt:
      'Pieza editorial de archivo de la primera sesión del Café Filosófico sobre capitalismo y fin del mundo.',
    assetKind: 'archivo',
  },
  {
    id: 'cafe-2026-09-22-meritocracia',
    edition: 2,
    date: '2026-09-22',
    displayDate: '22 SEP 2026',
    slug: 'meritocracia',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'La meritocracia',
    shortTitle: 'La meritocracia',
    question: '¿El mérito explica realmente quién prospera y quién queda atrás?',
    deck:
      'Memoria del diálogo sobre mérito, pobreza, merecimiento, trabajo, desigualdad, competencia y las condiciones sociales que hacen posible atribuir éxito o fracaso.',
    route: '/cafe-filosofico/2026/09/22/meritocracia',
    status: 'publicado',
    themes: [
      'meritocracia',
      'desigualdad',
      'pobreza',
      'individuo',
      'estructura',
    ],
    poster: 'images/cafe-filosofico/meritocracia/poster-original.jpg',
    posterAlt: 'Cartel original de la edición 02 del Café Filosófico sobre meritocracia.',
  },
  {
    id: 'cafe-2026-10-05-mercadotecnia',
    edition: 3,
    date: '2026-10-05',
    displayDate: '05 OCT 2026',
    slug: 'mercadotecnia',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Mercadotecnia · ¿Sugerencia, persuasión o manipulación?',
    shortTitle: 'Mercadotecnia',
    question: '¿Libertad de elección o forma de manipulación?',
    deck:
      'Memoria del diálogo sobre persuasión, deseo, necesidades sociales, identidad, perfilado, mercancía y libertad de elección.',
    route: '/cafe-filosofico/2026/10/05/mercadotecnia',
    status: 'publicado',
    themes: ['mercadotecnia', 'persuasión', 'manipulación', 'consumo', 'libertad'],
    poster: 'images/cafe-filosofico/mercadotecnia/poster-original.jpg',
    posterAlt: 'Cartel original de la edición 03 del Café Filosófico sobre mercadotecnia.',
  },
  {
    id: 'cafe-2026-10-19-agua',
    edition: 4,
    date: '2026-10-19',
    displayDate: '19 OCT 2026',
    slug: 'agua',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Hablemos sobre el agua',
    shortTitle: 'El agua en la ZMG',
    question: '¿Un recurso, un derecho o un privilegio?',
    deck:
      'Memoria crítica sobre ecología, infraestructura, gestión, concesiones, consumo, justicia y responsabilidad intergeneracional.',
    route: '/cafe-filosofico/2026/10/19/agua',
    status: 'publicado',
    themes: ['agua', 'derecho', 'recurso', 'bien común', 'responsabilidad'],
    poster: 'images/cafe-filosofico/agua/poster-original.svg',
    posterAlt: 'Cartel original de la edición 04 del Café Filosófico sobre el agua.',
  },
  {
    id: 'cafe-2026-11-03-redes-sociales',
    edition: 5,
    date: '2026-11-03',
    displayDate: '03 NOV 2026',
    slug: 'redes-sociales',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Redes sociales',
    shortTitle: 'Redes sociales',
    question: '¿Nos conectan, nos vigilan o nos aíslan?',
    deck:
      'Memoria del diálogo sobre identidad digital, atención, reconocimiento cuantificado, realidad de lo virtual, algoritmos, capitalismo, responsabilidad e inteligencia artificial.',
    route: '/cafe-filosofico/2026/11/03/redes-sociales',
    status: 'publicado',
    themes: [
      'redes sociales',
      'identidad',
      'atención',
      'algoritmos',
      'virtualidad',
      'responsabilidad',
      'inteligencia artificial',
    ],
    poster: 'images/cafe-filosofico/redes-sociales/poster-oficial.png',
    posterAlt: 'Cartel oficial de la edición 05 del Café Filosófico sobre redes sociales.',
  },
  {
    id: 'cafe-2026-11-17-inteligencia-artificial',
    edition: 6,
    date: '2026-11-17',
    displayDate: '17 NOV 2026',
    slug: 'inteligencia-artificial',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Inteligencia Artificial',
    shortTitle: 'Inteligencia Artificial',
    question: '¿Herramienta, riesgo o límite de lo humano?',
    deck:
      'Convocatoria para discutir cómo afecta la IA a la identidad humana, si debe pensarse como riesgo existencial o herramienta y qué significa que pueda salirse de control.',
    route: '/cafe-filosofico/2026/11/17/inteligencia-artificial',
    status: 'proximo',
    themes: ['inteligencia artificial', 'identidad humana', 'riesgo', 'herramienta', 'control'],
    poster: 'images/cafe-filosofico/inteligencia-artificial/poster-oficial.png',
    posterAlt: 'Cartel oficial de la edición 06 del Café Filosófico sobre Inteligencia Artificial.',
    time: '2:00 P. M.',
    location: 'Edificio C · Aula 5',
  },
]

export function getCafeEventBySlug(slug: string) {
  return cafeEvents.find((event) => event.slug === slug)
}
