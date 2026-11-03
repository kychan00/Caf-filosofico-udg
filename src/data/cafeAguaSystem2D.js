// Capa 2D: reconstrucción editorial de la memoria del Café del Agua (19-10-2026).
// Las síntesis no son citas literales ni verificación técnica de hechos debatidos.
export const aguaSections = [
  {
    "id": "diagnostico",
    "number": "I",
    "title": "La materialidad del problema",
    "tone": "blue",
    "question": "¿Qué distingue la disponibilidad del agua de recibir agua potable?",
    "before": "La conversación parte de la experiencia doméstica de agua de mala calidad y de preguntas históricas sobre el abastecimiento.",
    "after": "Las diferencias entre fuente, tratamiento y distribución abren la investigación sobre redes y expansión urbana."
  },
  {
    "id": "infraestructura",
    "number": "II",
    "title": "La ciudad que improvisa",
    "tone": "moss",
    "question": "¿Quién planifica una infraestructura capaz de crecer con la ciudad?",
    "before": "Presupone la distinción entre existencia de agua y capacidad material de entregarla.",
    "after": "La discusión de decisiones de planeación conduce a prioridades institucionales y distribución del recurso."
  },
  {
    "id": "poder",
    "number": "III",
    "title": "Propiedad, reparto y responsabilidades",
    "tone": "rust",
    "question": "¿Qué puede exigirse cuando el acceso al agua sigue lógicas económicas y políticas?",
    "before": "Presupone el problema de infraestructura y su relación con presupuestos y decisiones.",
    "after": "Cuestionar la distribución desplaza el análisis hacia los deberes de instituciones, comunidades y consumidores."
  },
  {
    "id": "etica",
    "number": "IV",
    "title": "El valor ético de lo cotidiano",
    "tone": "sage",
    "question": "¿Qué deben hacer los individuos sin ocultar las asimetrías del consumo?",
    "before": "Surge del contraste entre responsabilidad pública y responsabilidad individual.",
    "after": "Las prácticas individuales y comunitarias conducen a formas organizadas de participación y deliberación."
  },
  {
    "id": "accion",
    "number": "V",
    "title": "Protestar, comprender, transformar",
    "tone": "violet",
    "question": "¿Cómo convertir la reflexión filosófica en acción pública responsable?",
    "before": "Presupone los límites de la acción aislada y la necesidad de responsabilidad social del conocimiento.",
    "after": "No hubo resolución única: quedaron abiertos la eficacia de la protesta y los deberes hacia el futuro."
  }
];
export const aguaArguments = [
  {
    "id": "A01",
    "section": "diagnostico",
    "kind": "Pregunta",
    "title": "¿Qué llamamos crisis del agua?",
    "summary": "La conversación diferencia el deterioro del suministro, las fuentes y la distribución.",
    "explanation": "La apertura conecta la dificultad de realizar tareas cotidianas con preguntas sobre la historia del abasto, el agua embotellada y la gestión de la ciudad. No se demostró una causa única.",
    "argument": "Abre distintas explicaciones en competencia y exige distinguir situaciones observables de hipótesis históricas.",
    "voice": "Moderación · apertura",
    "question": "¿Por qué no basta preguntar si «hay agua»?",
    "studyAnswer": "Porque también importa si se capta, trata, distribuye y recibe en condiciones adecuadas.",
    "critical": false
  },
  {
    "id": "A02",
    "section": "diagnostico",
    "kind": "Tesis",
    "title": "Hipótesis ecológico-material",
    "summary": "Armando propone que la crisis no es exclusivamente política ni administrativa.",
    "explanation": "La ciudad depende de fuentes naturales y de una infraestructura que transforma el agua disponible en servicio potable. La expansión urbana puede agravar vulnerabilidades preexistentes.",
    "argument": "Objeta las explicaciones que reducen el problema a un solo nivel de gobierno; incorpora ecología, tecnología y decisiones.",
    "voice": "Armando · hipótesis provisional",
    "question": "¿Por qué la hipótesis de Armando no elimina la responsabilidad política?",
    "studyAnswer": "Porque las decisiones de inversión y mantenimiento pueden agravar o mitigar presiones naturales.",
    "critical": false
  },
  {
    "id": "A03",
    "section": "diagnostico",
    "kind": "Distinción",
    "title": "Recurso ≠ agua potable",
    "summary": "Tener una fuente hídrica no garantiza agua segura en las casas.",
    "explanation": "La intervención separa agua en cuencas, capacidad de transporte y tratamiento, y calidad efectiva del agua que reciben los hogares. Se mencionaron Chapala, Calderón, pozos y manantiales.",
    "argument": "Permite formular preguntas medibles y evita confundir abundancia física con acceso efectivo.",
    "voice": "Armando · distinción técnica",
    "question": "¿Qué diferencia fundamental introduce este nodo?",
    "studyAnswer": "La que existe entre agua presente en una fuente y capacidad de entregarla potabilizada.",
    "critical": false
  },
  {
    "id": "A04",
    "section": "diagnostico",
    "kind": "Precaución",
    "title": "Comparaciones por comprobar",
    "summary": "Se mencionaron Monterrey y otras ciudades, pero las cifras no quedaron acreditadas.",
    "explanation": "La comparación con Monterrey, Tijuana o Querétaro apuntaba a un problema más amplio. Cifras demográficas y de suministro se expusieron oralmente sin documentación revisada en el encuentro.",
    "argument": "Señala los límites de evidencia: comparación útil como hipótesis, no estadística comprobada.",
    "voice": "Armando · contextualización",
    "question": "¿Cómo debe emplearse una cifra pronunciada sin referencia verificable?",
    "studyAnswer": "Como afirmación pendiente de contraste; nunca como medición certificada en el archivo.",
    "critical": true
  },
  {
    "id": "B01",
    "section": "infraestructura",
    "kind": "Analogía",
    "title": "La ciudad de los hot fixes",
    "summary": "Cristian compara reparaciones urgentes con deuda técnica acumulada.",
    "explanation": "En programación, un arreglo provisional sin revisión posterior puede aumentar la fragilidad del sistema. La comparación propone examinar si las intervenciones urbanas y de infraestructura hídrica responden a ese patrón.",
    "argument": "Ilustra el costo de improvisar, sin convertir la analogía en prueba de fallas específicas.",
    "voice": "Cristian · analogía técnica",
    "question": "¿Qué no puede probar una analogía con la programación?",
    "studyAnswer": "Que una obra o una falla concreta provino efectivamente de improvisación o negligencia.",
    "critical": false
  },
  {
    "id": "B02",
    "section": "infraestructura",
    "kind": "Distinción",
    "title": "Crecer no implica planificar",
    "summary": "Diana diferencia crecimiento demográfico de gestión urbanística.",
    "explanation": "Se abordaron desarrollos residenciales verticales, expansión periférica y tensiones entre redes existentes y servicios nuevos. Crecer no vuelve culpable por sí misma a la población.",
    "argument": "Objeta el señalamiento automático de quienes habitan una ciudad en crecimiento.",
    "voice": "Diana · intervención urbana",
    "question": "¿Por qué crecimiento demográfico y mala gestión no significan lo mismo?",
    "studyAnswer": "Porque la expansión de habitantes requiere planificación; es la respuesta institucional la que debe examinarse.",
    "critical": false
  },
  {
    "id": "B03",
    "section": "infraestructura",
    "kind": "Tesis",
    "title": "Conocimiento público desaprovechado",
    "summary": "Se cuestionó el lugar de especialistas formados por universidades públicas.",
    "explanation": "El grupo sostuvo que hay profesionales preparados para diseñar soluciones; sin embargo, debatió si las instituciones los contratan, escuchan o ofrecen condiciones adecuadas para trabajar en infraestructura pública.",
    "argument": "Desplaza la pregunta de la existencia de talento hacia decisiones de contratación, planeación e inversión.",
    "voice": "Cristian y Diana · discusión",
    "question": "¿La existencia de expertos garantiza una solución inmediata?",
    "studyAnswer": "No. Deben existir capacidades técnicas, recursos, colaboración institucional y evaluación de resultados.",
    "critical": false
  },
  {
    "id": "B04",
    "section": "infraestructura",
    "kind": "Objeción",
    "title": "La negligencia como tesis discutida",
    "summary": "Algunos participantes plantearon que hubo décadas de omisiones evitables.",
    "explanation": "Se debatieron el mantenimiento, los cambios en el uso del suelo y la inversión a largo plazo; una posición empleó la expresión «negligencia de décadas». No se presentó un expediente jurídico que permitiera declararla como hecho comprobado.",
    "argument": "Contrasta una explicación por falta de capacidad con una explicación por decisiones acumuladas.",
    "voice": "Intervenciones diversas · postura crítica",
    "question": "¿Qué necesitaríamos para demostrar negligencia institucional?",
    "studyAnswer": "Documentos, cronologías, obligaciones legales y datos que permitan vincular decisiones y daños.",
    "critical": true
  },
  {
    "id": "C01",
    "section": "poder",
    "kind": "Pregunta",
    "title": "¿Quién consume y quién recibe?",
    "summary": "Se pidió contrastar usos domésticos, privados y productivos.",
    "explanation": "Antes de atribuir todo a falta de agua, se propuso investigar consumos sectoriales, concesiones, prioridades de suministro y posibles diferencias de calidad. No se aportaron porcentajes certificados.",
    "argument": "Expone la dimensión distributiva de la crisis y abre una investigación cuantitativa.",
    "voice": "Intervención del grupo · reparto",
    "question": "¿Qué dato evitaría culpar sin más al consumo doméstico?",
    "studyAnswer": "Una comparación verificable del volumen de agua usado por sectores y hogares.",
    "critical": false
  },
  {
    "id": "C02",
    "section": "poder",
    "kind": "Problema",
    "title": "Propiedad de lo que no se produjo",
    "summary": "La moderación cuestionó la apropiación y comercialización del agua.",
    "explanation": "La pregunta sobre quién puede ser dueño de algo que ya existía condujo al agua embotellada, el servicio de potabilización y los títulos de concesión. No deben confundirse derecho de uso y propiedad ilimitada del recurso.",
    "argument": "Abre un examen filosófico y jurídico de derecho, recurso, bien común y servicio.",
    "voice": "Moderación · pregunta de apertura",
    "question": "¿Por qué concesión no equivale sin más a propiedad de un acuífero?",
    "studyAnswer": "Porque el título habilita un uso bajo condiciones legales; no constituye propiedad irrestricta del agua nacional.",
    "critical": false
  },
  {
    "id": "C03",
    "section": "poder",
    "kind": "Objeción",
    "title": "El límite de la hipótesis conspirativa",
    "summary": "Diana propone estudiar contradicciones sin suponer un plan secreto.",
    "explanation": "Se especuló acerca de si el deterioro podría beneficiar a ciertas empresas. Se respondió que atribuir una intención deliberada requeriría pruebas, mientras que las contradicciones entre intereses y efectos sí pueden investigarse.",
    "argument": "Distingue efectos observables de intención demostrada; preserva una crítica rigurosa.",
    "voice": "Diana y moderación · discrepancia",
    "question": "¿Qué distingue denunciar una contradicción de afirmar una conspiración?",
    "studyAnswer": "Las consecuencias pueden estudiarse con evidencia, sin afirmar una intención organizada que no se demostró.",
    "critical": true
  },
  {
    "id": "C04",
    "section": "poder",
    "kind": "Distinción",
    "title": "Ecológico y político a la vez",
    "summary": "El debate rechaza que una sola explicación agote la crisis.",
    "explanation": "Intervenciones contrapuestas mostraron que sequía, contaminación y fuentes no explican por sí mismas inversión, distribución y prioridades; tampoco basta atribuir todo a decisiones administrativas.",
    "argument": "Relaciona, sin igualarlas, la dimensión material y la responsabilidad institucional.",
    "voice": "Síntesis editorial del contraste",
    "question": "¿Por qué sería falso elegir entre ecología y política?",
    "studyAnswer": "Porque la vulnerabilidad material interactúa con infraestructura, presupuestos y distribución.",
    "critical": false
  },
  {
    "id": "D01",
    "section": "etica",
    "kind": "Pregunta",
    "title": "¿Cómo vivimos con el agua?",
    "summary": "Armando propuso partir de la relación moral con el medioambiente.",
    "explanation": "Se preguntó qué importancia damos al agua y qué ajustes de hábitos estaríamos dispuestos a aceptar. Se conectó el problema con una crisis ecológica de mayor alcance y con generaciones futuras.",
    "argument": "Amplía la discusión desde culpables hacia deberes cotidianos y culturales.",
    "voice": "Armando · reflexión ética",
    "question": "¿En qué consiste la dimensión ética del consumo doméstico?",
    "studyAnswer": "En comprender el agua como condición compartida de vida y revisar prácticas a la luz de sus efectos.",
    "critical": false
  },
  {
    "id": "D02",
    "section": "etica",
    "kind": "Objeción",
    "title": "Ahorro individual y consumo desigual",
    "summary": "El esfuerzo individual no debe ocultar los grandes usos productivos.",
    "explanation": "Participantes señalaron que pedir menos agua en casa puede ser insuficiente sin examinar concesiones, industria y otras actividades. El debate no ofreció porcentajes verificables de cada sector.",
    "argument": "Evita reducir la responsabilidad colectiva a una culpabilización individual.",
    "voice": "Intervenciones diversas · asimetría",
    "question": "¿Por qué no basta exhortar a duchas más cortas?",
    "studyAnswer": "Porque el reparto del agua y las obligaciones institucionales también deben ser revisados.",
    "critical": true
  },
  {
    "id": "D03",
    "section": "etica",
    "kind": "Ejemplo",
    "title": "Captación pluvial comunitaria",
    "summary": "Se presentó Nidos de Lluvia y se discutió el caso de Chapalita.",
    "explanation": "La conversación mencionó la captación pluvial como respuesta doméstica y barrial. Ese uso requiere condiciones adecuadas y no implica que toda agua recolectada sea directamente potable.",
    "argument": "Ofrece una práctica concreta de cooperación sin prometer que sustituye todo el abastecimiento.",
    "voice": "Intervención del público · ejemplo práctico",
    "question": "¿Qué límite requiere recordar sobre el agua de lluvia?",
    "studyAnswer": "El destino del agua debe corresponder a su calidad y tratamiento; no se presume potable.",
    "critical": false
  },
  {
    "id": "D04",
    "section": "etica",
    "kind": "Tesis",
    "title": "Preguntar y exigir cuentas",
    "summary": "La responsabilidad cívica incluye investigar y reclamar información.",
    "explanation": "Se invitó a averiguar qué se hizo, cuándo, quién decidió y cómo se distribuyó la inversión. El grupo reclamó educación crítica capaz de distinguir preguntas útiles, testimonios y documentación pública.",
    "argument": "Une responsabilidad individual con seguimiento institucional y control ciudadano.",
    "voice": "Mildred y otras voces · propuesta",
    "question": "¿Qué debe venir antes de exigir una respuesta pública específica?",
    "studyAnswer": "Formular preguntas comprobables y conocer la competencia de las instituciones.",
    "critical": false
  },
  {
    "id": "E01",
    "section": "accion",
    "kind": "Tesis",
    "title": "Humanidades al servicio público",
    "summary": "La formación filosófica se vinculó con un deber de devolución social.",
    "explanation": "Se defendió que quienes estudian en instituciones públicas pueden contribuir mediante análisis, divulgación, aclaración conceptual y examen de contradicciones en la vida colectiva.",
    "argument": "Sitúa la filosofía como práctica crítica y no como discurso separado de las necesidades comunes.",
    "voice": "Intervenciones diversas · universidad",
    "question": "¿Qué contribución específica puede hacer la filosofía a la crisis?",
    "studyAnswer": "Clarificar conceptos, hacer visibles presupuestos, distinguir inferencias y abrir deliberaciones bien informadas.",
    "critical": false
  },
  {
    "id": "E02",
    "section": "accion",
    "kind": "Distinción",
    "title": "Versiones públicas de una protesta",
    "summary": "Se contrastaron narrativas ciudadanas, oficiales y periodísticas.",
    "explanation": "El debate destacó que los relatos de marchas pueden diferir entre redes sociales, gobiernos y prensa. Una versión no se vuelve verdadera únicamente por la posición de quien la publica.",
    "argument": "Conduce a contrastar evidencia y a evitar reproducir información sin examen.",
    "voice": "Intervención del grupo · medios",
    "question": "¿Por qué conviene cotejar distintas fuentes de una protesta?",
    "studyAnswer": "Porque perspectivas e intereses pueden seleccionar o presentar hechos de manera distinta.",
    "critical": false
  },
  {
    "id": "E03",
    "section": "accion",
    "kind": "Debate abierto",
    "title": "Marcha pacífica y resistencia",
    "summary": "No hubo consenso sobre eficacia y legitimidad de las formas de protesta.",
    "explanation": "Se preguntó por los resultados de manifestaciones pacíficas frente a acciones más confrontativas. Se mencionó un estudio sin datos suficientes para identificarlo. La discusión no estableció una recomendación unánime.",
    "argument": "Conserva los desacuerdos éticos y estratégicos sin promover violencia.",
    "voice": "Participantes · desacuerdo",
    "question": "¿La eficacia de una protesta demuestra por sí sola su legitimidad?",
    "studyAnswer": "No. Consecuencias, derechos, daños y resultados son criterios diferentes.",
    "critical": true
  },
  {
    "id": "E04",
    "section": "accion",
    "kind": "Horizonte",
    "title": "¿Es demasiado tarde para reparar?",
    "summary": "El encuentro cerró entre el pesimismo y la posibilidad de regeneración.",
    "explanation": "Se discutieron cauces transformados, infraestructura costosa y falta de inversión. Algunas voces se mostraron escépticas; otras defendieron posibilidades parciales de mejora y deberes intergeneracionales.",
    "argument": "Final abierto: no se prometió una solución única ni se declaró una irreversibilidad total.",
    "voice": "Cierre · posiciones contrapuestas",
    "question": "¿Qué permite actuar sin prometer que todo daño será reversible?",
    "studyAnswer": "Reconocer límites y priorizar mejoras demostrables, adaptación y responsabilidad futura.",
    "critical": true
  }
];
export const aguaRelations = [
  {
    "id": "r01",
    "from": "A01",
    "to": "A02",
    "label": "abre",
    "kind": "relation"
  },
  {
    "id": "r02",
    "from": "A02",
    "to": "A03",
    "label": "distingue",
    "kind": "relation"
  },
  {
    "id": "r03",
    "from": "A03",
    "to": "A04",
    "label": "exige verificar",
    "kind": "relation"
  },
  {
    "id": "r04",
    "from": "B01",
    "to": "B02",
    "label": "amplía",
    "kind": "relation"
  },
  {
    "id": "r05",
    "from": "B02",
    "to": "B03",
    "label": "requiere saber",
    "kind": "relation"
  },
  {
    "id": "r06",
    "from": "B03",
    "to": "B04",
    "label": "objeta",
    "kind": "tension"
  },
  {
    "id": "r07",
    "from": "C01",
    "to": "C02",
    "label": "problematiza",
    "kind": "tension"
  },
  {
    "id": "r08",
    "from": "C02",
    "to": "C03",
    "label": "abre duda",
    "kind": "tension"
  },
  {
    "id": "r09",
    "from": "C03",
    "to": "C04",
    "label": "reformula",
    "kind": "relation"
  },
  {
    "id": "r10",
    "from": "D01",
    "to": "D02",
    "label": "matiza",
    "kind": "tension"
  },
  {
    "id": "r11",
    "from": "D02",
    "to": "D03",
    "label": "acompaña",
    "kind": "relation"
  },
  {
    "id": "r12",
    "from": "D03",
    "to": "D04",
    "label": "articula",
    "kind": "relation"
  },
  {
    "id": "r13",
    "from": "E01",
    "to": "E02",
    "label": "orienta",
    "kind": "relation"
  },
  {
    "id": "r14",
    "from": "E02",
    "to": "E03",
    "label": "abre debate",
    "kind": "relation"
  },
  {
    "id": "r15",
    "from": "E03",
    "to": "E04",
    "label": "mantiene abierto",
    "kind": "relation"
  },
  {
    "id": "r16",
    "from": "A03",
    "to": "B01",
    "label": "abre hacia",
    "kind": "relation"
  },
  {
    "id": "r17",
    "from": "B04",
    "to": "C01",
    "label": "traslada",
    "kind": "relation"
  },
  {
    "id": "r18",
    "from": "C04",
    "to": "D01",
    "label": "abre hacia",
    "kind": "relation"
  },
  {
    "id": "r19",
    "from": "D04",
    "to": "E01",
    "label": "habilita",
    "kind": "relation"
  },
  {
    "id": "r20",
    "from": "A02",
    "to": "C04",
    "label": "converge",
    "kind": "relation"
  },
  {
    "id": "r21",
    "from": "B03",
    "to": "E01",
    "label": "responsabilidad social",
    "kind": "relation"
  },
  {
    "id": "r22",
    "from": "C01",
    "to": "D02",
    "label": "contrasta",
    "kind": "tension"
  },
  {
    "id": "r23",
    "from": "C03",
    "to": "E02",
    "label": "exige contraste",
    "kind": "relation"
  },
  {
    "id": "r24",
    "from": "D03",
    "to": "E04",
    "label": "posibilidad local",
    "kind": "relation"
  }
];
export const aguaQuestions = [
  {
    "id": "diagnostico-1",
    "section": "diagnostico",
    "nodeId": "A01",
    "prompt": "¿Qué distingue la disponibilidad del agua de recibir agua potable?",
    "options": [
      "La existencia del recurso garantiza potabilidad.",
      "El acceso requiere también tratamiento y distribución.",
      "Solo importa medir la lluvia."
    ],
    "correct": 1,
    "explanation": "Armando distingue la fuente de la cadena material y de la entrega domiciliaria."
  },
  {
    "id": "diagnostico-2",
    "section": "diagnostico",
    "nodeId": "A04",
    "prompt": "¿Cómo debe emplearse una cifra pronunciada sin referencia verificable?",
    "options": [
      "Como afirmación pendiente de contraste; nunca como medición certificada en el archivo.",
      "La conversación resolvió definitivamente el tema.",
      "Toda afirmación oral es una cifra certificada."
    ],
    "correct": 0,
    "explanation": "La comparación con Monterrey, Tijuana o Querétaro apuntaba a un problema más amplio. Cifras demográficas y de suministro se expusieron oralmente sin documentación revisada en el encuentro."
  },
  {
    "id": "infraestructura-1",
    "section": "infraestructura",
    "nodeId": "B01",
    "prompt": "¿Quién planifica una infraestructura capaz de crecer con la ciudad?",
    "options": [
      "La existencia de técnicos garantiza inversiones.",
      "La expansión siempre es causa culpable.",
      "La planificación relaciona redes, crecimiento y decisiones."
    ],
    "correct": 2,
    "explanation": "La reflexión sobre crecimiento discute cómo se prevén y atienden sistemas, no culpa automáticamente a habitantes."
  },
  {
    "id": "infraestructura-2",
    "section": "infraestructura",
    "nodeId": "B04",
    "prompt": "¿Qué necesitaríamos para demostrar negligencia institucional?",
    "options": [
      "Documentos, cronologías, obligaciones legales y datos que permitan vincular decisiones y daños.",
      "La conversación resolvió definitivamente el tema.",
      "Toda afirmación oral es una cifra certificada."
    ],
    "correct": 0,
    "explanation": "Se debatieron el mantenimiento, los cambios en el uso del suelo y la inversión a largo plazo; una posición empleó la expresión «negligencia de décadas». No se presentó un expediente jurídico que permitiera declararla como hecho comprobado."
  },
  {
    "id": "poder-1",
    "section": "poder",
    "nodeId": "C01",
    "prompt": "¿Qué puede exigirse cuando el acceso al agua sigue lógicas económicas y políticas?",
    "options": [
      "La concesión equivale a propiedad absoluta.",
      "Hay que medir usos y precisar derechos y obligaciones.",
      "Una conspiración quedó demostrada."
    ],
    "correct": 1,
    "explanation": "La mesa pidió datos sobre consumo y un examen jurídico de los títulos de uso; no probó intenciones encubiertas."
  },
  {
    "id": "poder-2",
    "section": "poder",
    "nodeId": "C04",
    "prompt": "¿Por qué sería falso elegir entre ecología y política?",
    "options": [
      "Porque la vulnerabilidad material interactúa con infraestructura, presupuestos y distribución.",
      "La conversación resolvió definitivamente el tema.",
      "Toda afirmación oral es una cifra certificada."
    ],
    "correct": 0,
    "explanation": "Intervenciones contrapuestas mostraron que sequía, contaminación y fuentes no explican por sí mismas inversión, distribución y prioridades; tampoco basta atribuir todo a decisiones administrativas."
  },
  {
    "id": "etica-1",
    "section": "etica",
    "nodeId": "D01",
    "prompt": "¿Qué deben hacer los individuos sin ocultar las asimetrías del consumo?",
    "options": [
      "Es responsabilidad exclusiva de los hogares.",
      "Basta capturar lluvia para beberla.",
      "Los hábitos y la distribución necesitan examinarse juntos."
    ],
    "correct": 2,
    "explanation": "El deber individual no sustituye vigilancia sobre grandes usos ni condiciones de calidad del agua."
  },
  {
    "id": "etica-2",
    "section": "etica",
    "nodeId": "D04",
    "prompt": "¿Qué debe venir antes de exigir una respuesta pública específica?",
    "options": [
      "Formular preguntas comprobables y conocer la competencia de las instituciones.",
      "La conversación resolvió definitivamente el tema.",
      "Toda afirmación oral es una cifra certificada."
    ],
    "correct": 0,
    "explanation": "Se invitó a averiguar qué se hizo, cuándo, quién decidió y cómo se distribuyó la inversión. El grupo reclamó educación crítica capaz de distinguir preguntas útiles, testimonios y documentación pública."
  },
  {
    "id": "accion-1",
    "section": "accion",
    "nodeId": "E01",
    "prompt": "¿Cómo convertir la reflexión filosófica en acción pública responsable?",
    "options": [
      "Todas las protestas tienen resultados iguales.",
      "El conocimiento crítico permite verificar y exigir cuentas.",
      "La sesión acordó una sola estrategia."
    ],
    "correct": 1,
    "explanation": "La propuesta académica consiste en preguntar, contrastar, publicar y exigir rendición de cuentas."
  },
  {
    "id": "accion-2",
    "section": "accion",
    "nodeId": "E04",
    "prompt": "¿Qué permite actuar sin prometer que todo daño será reversible?",
    "options": [
      "Reconocer límites y priorizar mejoras demostrables, adaptación y responsabilidad futura.",
      "La conversación resolvió definitivamente el tema.",
      "Toda afirmación oral es una cifra certificada."
    ],
    "correct": 0,
    "explanation": "Se discutieron cauces transformados, infraestructura costosa y falta de inversión. Algunas voces se mostraron escépticas; otras defendieron posibilidades parciales de mejora y deberes intergeneracionales."
  }
];
export const aguaNodeById = (id) => aguaArguments.find((node) => node.id === id);
export const aguaNodesForSection = (id) => id === 'all' ? aguaArguments : aguaArguments.filter((node) => node.section === id);
export const aguaPositionFor = (node) => {
  const row = aguaSections.findIndex((s) => s.id === node.section);
  const inRow = aguaArguments.filter((entry) => entry.section === node.section).findIndex((entry) => entry.id === node.id);
  return { x: inRow * 438, y: row * 358 };
};
