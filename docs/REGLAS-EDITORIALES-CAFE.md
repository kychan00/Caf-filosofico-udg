# Reglas obligatorias del Café Filosófico

Estas reglas se incorporan al repositorio independiente a partir del contrato editorial de PHILOSOPHIA y del vault privado. Son obligatorias para nuevas sesiones, memorias, páginas, pruebas y sistemas 2D del Café.

## 1. La fuente manda

Orden de trabajo obligatorio:

```text
fuente disponible
→ delimitación de lo seguro
→ reconstrucción fiel
→ interpretación explícitamente marcada
→ relaciones justificadas
→ esquema
→ publicación
```

Nunca completar huecos por conocimiento general ni atribuir a una persona, autor o sesión algo que la fuente no sostiene.

Capas que deben mantenerse separadas cuando existan:

1. texto o pregunta literal;
2. paráfrasis fiel;
3. intervención o explicación de la sesión;
4. reconstrucción editorial;
5. verificación externa;
6. contexto externo añadido.

Si algo no puede recuperarse con seguridad, usar `NO CONSTA`, `NO RECUPERADO` o `INCIERTO`.

## 2. Convocatoria y memoria no son lo mismo

Antes del encuentro:

- conservar preguntas completas;
- no inventar posiciones, objeciones, acuerdos ni conclusiones;
- cualquier mapa conceptual previo debe rotularse como preparatorio/editorial.

Después del encuentro:

- conservar posiciones realmente surgidas;
- distinguir objeciones, respuestas, tensiones y problemas abiertos;
- no convertir una discusión abierta en doctrina única del Café;
- una afirmación empírica mencionada por un participante no se vuelve un hecho del archivo por haber sido dicha.

La memoria pública debe poder mostrar qué era material preparatorio y qué pertenece realmente al diálogo celebrado.

## 3. Protocolo de diálogo

Base vigente confirmada en las sesiones del Café:

1. levantar la mano para pedir turno;
2. 3 minutos para desarrollar la intervención;
3. señal al cumplirse el tiempo;
4. 30 segundos adicionales para cerrar;
5. no interrumpir a quien tiene la palabra;
6. criticar el argumento, nunca a la persona;
7. mantener respeto entre participantes;
8. una pregunta breve puede formularse sin convertirla en nueva intervención larga; si requiere desarrollo, debe pedirse turno.

Principio general: participar no presupone aceptar una postura política, económica, religiosa o filosófica determinada.

Método orientativo:

```text
pregunta → posición → razón → objeción → distinción → reformulación → problema abierto
```

## 4. Fuente oral o material de sesión

El material oral se transforma en notas y memoria argumental, no en una pseudo-transcripción pública.

Obligatorio:

- conservar el desarrollo argumental;
- limpiar charla irrelevante sin alterar el sentido;
- separar participantes cuando sea filosóficamente necesario y la atribución sea segura;
- no inventar citas entre comillas;
- si la identificación de un nombre, autor, fecha o dato es dudosa, marcarla como incierta;
- no introducir doctrina externa para “corregir” a quien habló;
- si se verifica algo externamente, ponerlo en una capa separada.

## 5. Afirmaciones empíricas

Noticias, cifras, efectos neuropsicológicos, decisiones judiciales, fechas tecnológicas, estadísticas y afirmaciones sobre plataformas deben tratarse como:

- **afirmación surgida en la sesión**, si sólo consta que alguien la mencionó;
- **verificación externa**, únicamente si se investigó y documentó fuera de la sesión.

No usar una afirmación no verificada como premisa factual del archivo público.

## 6. Nombres y autores

Puede normalizarse una grafía sólo cuando la restitución sea segura. No completar silenciosamente nombres propios dañados por reconocimiento de voz.

Si la atribución no es segura, es preferible registrar “un participante mencionó…” que asignar erróneamente una tesis.

## 7. Sistemas 2D

Un sistema 2D sólo se crea después de reconstruir la fuente. No se fuerza el material para llenar nodos.

Cada nodo debe ser trazable a una idea, pregunta o relación documentada. Las relaciones editoriales deben declararse como tales.

Para mapas complejos se conservan además las reglas heredadas de PHILOSOPHIA:

- sin solapamientos entre nodos;
- guía y navegación sobre un único estado canónico;
- responsive real, incluido iPad vertical/horizontal;
- sin scroll horizontal global;
- prueba de navegador real;
- build y CI;
- SHA de deploy verificado.

## 8. Flujo técnico

```text
fuente
→ nota depurada
→ memoria / conceptos
→ actualización del archivo
→ pruebas
→ PR
→ CI
→ merge
→ Pages
→ verificación pública
→ actualización del vault
```

Nunca declarar una sesión publicada sólo porque compila.

## 9. Reglas del repositorio independiente

- El hogar técnico vigente es `kychan00/Caf-filosofico-udg`.
- El vault privado sigue siendo la fuente documental canónica de notas y decisiones editoriales.
- No publicar notas privadas del vault en este repositorio.
- Las páginas web y el vault son dos vistas del mismo trabajo académico y deben mantenerse sincronizadas.
- Las rutas históricas de PHILOSOPHIA se consideran procedencia, no la fuente técnica principal de nuevas sesiones.

## 10. Regla final

**Primero fidelidad; después claridad; después diseño.**

Un archivo visualmente más sencillo pero documentalmente honesto es preferible a una página elegante que mezcle convocatoria, memoria, hechos no verificados o atribuciones dudosas.
