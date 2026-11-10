export type CafeEvent = {
  id: string
  date: string
  slug: string
  eyebrow: string
  title: string
  deck: string
  route: string
  status: 'publicado' | 'proximo'
  themes: string[]
}

export const cafeEvents: CafeEvent[] = [
  {
    id: 'cafe-2026-09-07-capitalismo',
    date: '2026-09-07',
    slug: 'fin-del-mundo-fin-del-capitalismo',
    eyebrow: 'Café filosófico · diálogo abierto',
    title:
      '¿Por qué es más fácil pensar en el fin del mundo que en el fin del capitalismo?',
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
  },
  {
    id: 'cafe-2026-09-22-meritocracia',
    date: '2026-09-22',
    slug: 'meritocracia',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'La meritocracia',
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
  },
  {
    id: 'cafe-2026-10-05-mercadotecnia',
    date: '2026-10-05',
    slug: 'mercadotecnia',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Mercadotecnia · ¿Sugerencia, persuasión o manipulación?',
    deck:
      'Memoria del diálogo sobre persuasión, deseo, necesidades sociales, identidad, perfilado, mercancía y libertad de elección.',
    route: '/cafe-filosofico/2026/10/05/mercadotecnia',
    status: 'publicado',
    themes: ['mercadotecnia', 'persuasión', 'manipulación', 'consumo', 'libertad'],
  },

  {
    id: 'cafe-2026-10-19-agua',
    date: '2026-10-19',
    slug: 'agua',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Hablemos sobre el agua',
    deck:
      'Memoria crítica sobre ecología, infraestructura, gestión, concesiones, consumo, justicia y responsabilidad intergeneracional.',
    route: '/cafe-filosofico/2026/10/19/agua',
    status: 'publicado',
    themes: ['agua', 'derecho', 'recurso', 'bien común', 'responsabilidad'],
  },

  {
    id: 'cafe-2026-11-03-redes-sociales',
    date: '2026-11-03',
    slug: 'redes-sociales',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Redes sociales',
    deck: 'Memoria del diálogo sobre identidad digital, atención, reconocimiento cuantificado, realidad de lo virtual, algoritmos, capitalismo, responsabilidad e inteligencia artificial.',
    route: '/cafe-filosofico/2026/11/03/redes-sociales',
    status: 'publicado',
    themes: ['redes sociales', 'identidad', 'atención', 'algoritmos', 'virtualidad', 'responsabilidad', 'inteligencia artificial'],
  },

  {
    id: 'cafe-2026-11-17-inteligencia-artificial',
    date: '2026-11-17',
    slug: 'inteligencia-artificial',
    eyebrow: 'Café filosófico · interdisciplinario',
    title: 'Inteligencia Artificial',
    deck: 'Convocatoria para discutir cómo afecta la IA a la identidad humana, si debe pensarse como riesgo existencial o herramienta y qué significa que pueda salirse de control.',
    route: '/cafe-filosofico/2026/11/17/inteligencia-artificial',
    status: 'proximo',
    themes: ['inteligencia artificial', 'identidad humana', 'riesgo', 'herramienta', 'control'],
  },

]

export function getCafeEventBySlug(slug: string) {
  return cafeEvents.find((event) => event.slug === slug)
}
