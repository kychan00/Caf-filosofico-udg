# Rediseño de la portada · Fase 1 — Auditoría y contrato de implementación

**Proyecto:** Café Filosófico UdeG  
**Rama:** `redesign/home-editorial-paper`  
**Fecha de auditoría:** 2026-11-10  
**Estado:** Fase 1 completada; sin PR abierto; sin cambios funcionales en producción.

## 1. Decisiones no negociables

1. La portada debe sentirse como **papel real**, no solamente usar una paleta beige.
2. Dirección artística: **Editorial Humanista & Collage Universitario Vintage**.
3. Los **pósters existentes se conservan**; no se rediseñan ni se sustituyen por versiones generadas por IA.
4. La IA puede usarse para crear el universo visual alrededor de los pósters: grabados, bustos, libros, botánica, recortes, manchas, texturas y ornamentos editoriales.
5. La interfaz debe privilegiar materialidad: fibra, grano, bordes rasgados, capas, cinta, impresión, sellos y tinta.
6. No usar glassmorphism, brillos digitales, tarjetas SaaS, gradientes tecnológicos ni sombras genéricas de dashboard.
7. Las páginas individuales, memorias y Sistemas 2D se consideran archivo académico y **no forman parte del rediseño destructivo de la home**.
8. Se trabaja en **una sola rama** hasta tener el rediseño completo. No abrir PR parcial por cada sección.
9. Se mantienen las reglas editoriales existentes: primero fidelidad, después claridad, después diseño.

## 2. Baseline técnico auditado

- Repositorio canónico: `kychan00/Caf-filosofico-udg`.
- Rama de producción: `main`.
- Baseline auditado: `5bdc33071af46fb55191859e23cedf7faeb1f4f6`.
- La aplicación usa React + Vite + `HashRouter`.
- Existen seis rutas de sesiones y rutas auxiliares para memorias/Sistemas 2D.
- El último deploy de GitHub Pages asociado al baseline terminó en `success`.
- No había PR abierto al iniciar esta rama.
- Pruebas y build están definidos en `package.json` mediante `npm test`, `npm run build`, `npm run validate` y smoke tests específicos.

## 3. Home actual

La portada está concentrada en:

- `src/pages/CafeFilosofico.tsx`
- `src/pages/CafeFilosofico.css`

Su arquitectura actual es:

1. hero editorial estático;
2. listado vertical de seis sesiones;
3. galerías fotográficas incrustadas en algunas sesiones;
4. footer mínimo.

La home actual **no implementa todavía** la arquitectura del PRD: navegación global, búsqueda, archivo compacto/carrusel, manifiesto metodológico, cifras, bloque destacado de próxima conversación, recursos y cierre institucional.

## 4. Hallazgos estructurales

### 4.1 Doble fuente de datos

La portada mantiene un array local `sessions` dentro de `CafeFilosofico.tsx`, mientras existe `src/data/cafeFilosoficoEvents.ts` con los mismos eventos.

**Riesgo:** fechas, títulos, estados y rutas pueden divergir.

**Decisión para Fase 2:** convertir `cafeFilosoficoEvents.ts` en la fuente pública única de metadatos y ampliar su esquema con imágenes, badges, preguntas, galerías y datos logísticos que necesite la portada.

### 4.2 CSS acumulativo

`CafeFilosofico.css` contiene sucesivas capas de estilos y rescates (`CAFE HERO V2`, `MOBILE RESCUE`, ajustes de cards, galerías y poster cards) que vuelven difícil razonar sobre la cascada.

**Decisión para Fase 2:** reconstruir el sistema visual de la home con una jerarquía limpia de tokens/componentes y breakpoints, evitando seguir apilando overrides.

### 4.3 Hero actual

La home usa `public/images/cafe-filosofico/cafe-hero.png` como imagen principal estática.

**Decisión:** sustituir el hero como composición por un sistema de collage editorial animado, manteniendo accesibilidad y `prefers-reduced-motion`. La materialidad debe provenir de capas de papel/textura/ornamentos, no de una fotografía stock genérica.

## 5. Inventario de sesiones y pósters en uso

| Edición | Fecha actual en repo | Home actual | Asset relevante | Acción para rediseño |
|---|---|---|---|---|
| 01 · Capitalismo | 07 SEP 2026 | `session-01-thumb.png` | `01.png`–`05.png` son ilustraciones del archivo de la sesión | conservar el material existente; no inventar póster |
| 02 · Meritocracia | 22 SEP 2026 | `meritocracia/poster-original.jpg` | póster original + assets collage + 8 fotos | conservar póster original |
| 03 · Mercadotecnia | 05 OCT 2026 | `mercadotecnia/poster-original.jpg` | póster original | conservar póster original |
| 04 · Agua | 19 OCT 2026 | `agua/poster-original.svg` | también existe `agua/poster-original.jpg` + 8 fotos | revisar cuál es el original canónico; no redibujar |
| 05 · Redes sociales | 03 NOV 2026 | `redes-sociales/poster-oficial.png` | póster oficial + evidencias | conservar póster oficial |
| 06 · Inteligencia Artificial | 17 NOV 2026 | portada SVG generada dentro de `CafeFilosofico.tsx` | existe `inteligencia-artificial/poster-oficial.png` | **reemplazar en la home la portada generada por el póster oficial existente** |

### Observación crítica

La Edición 06 ya tiene su póster oficial en el repositorio y su página individual lo usa correctamente. La home, sin embargo, construye una portada alternativa con un `data:image/svg+xml`. Esto contradice la nueva regla visual y debe desaparecer en el rediseño.

## 6. Evidencia fotográfica disponible

Se identificó material documental que puede utilizarse como segunda capa visual sin reemplazar los pósters:

- Capitalismo: `gale01.JPG`, `gale02.JPG`.
- Meritocracia: 8 fotografías + 2 clips de video.
- Agua: 8 fotografías.
- Redes sociales: 2 fotografías/evidencias (incluyendo derivado WebP existente).

**Uso previsto:** memoria visual, pequeños recortes secundarios, tiras fotográficas y secciones documentales. No competirán con el póster como identidad de cada edición.

## 7. Auditoría de assets y rendimiento

Hay varios PNG de aproximadamente 2.7–4 MB, incluido material de collage y pósters de alta resolución.

**Regla:** los originales permanecen intactos en el repositorio. Para la home se crearán derivados WebP/AVIF optimizados y responsivos cuando corresponda. No se recomprime destructivamente el archivo histórico.

Las texturas de papel deben ser ligeras y repetibles o generadas mediante SVG/CSS cuando sea viable. Evitar una textura fotográfica enorme aplicada como fondo de toda la página.

## 8. Arquitectura objetivo de la nueva home

Orden de implementación aprobado:

1. **Cabecera global** — marca, navegación, búsqueda y CTA `Próximo Café →`.
2. **Hero editorial** — misión, CTA dual y collage animado de papel/filosofía/CUCSH.
3. **Cafés que han sucedido** — cards editoriales más compactas; pósters reales como protagonistas.
4. **Manifiesto / Nuestro método** — Preguntar, Escuchar, Argumentar, Dialogar.
5. **El Café en números** — cifras tratadas como composición editorial, no dashboard.
6. **Próxima conversación** — póster oficial real + datos logísticos + CTA.
7. **Archivo / memoria visual** — acceso histórico y evidencias.
8. **Cierre y footer** — propósito universitario independiente.

## 9. Sistema visual de papel

### Tokens base

- papel base: `#f4eee1`
- pergamino: `#e8dece`
- verde bosque: `#1c2d22` / `#16241b`
- terracota: `#b84d2b` / `#c85633`
- tinta: `#171614`
- kraft: `#dccbb5`
- hueso: `#faf7f2`

### Materialidad obligatoria

- microfibra/grano de papel;
- diferencias tonales leves entre hojas;
- bordes rasgados con SVG/masks;
- capas superpuestas con sombras de contacto muy suaves;
- cinta, sellos, subrayados y marcas de tinta;
- pequeñas rotaciones controladas en elementos físicos;
- zonas impresas con textura/halftone cuando sea pertinente;
- transiciones entre secciones mediante cortes o tiras de papel.

### Movimiento

Las ilustraciones/collages pueden animarse, pero deben sentirse como objetos impresos moviéndose ligeramente:

- parallax mínimo;
- desplazamiento de 2–8 px;
- rotación leve;
- flechas/trazos que se dibujan;
- aparición por capas;
- hover de póster como hoja física;
- cero movimiento continuo agresivo.

Debe existir fallback completo con `prefers-reduced-motion: reduce`.

## 10. Responsive

- Desktop ≥1280 px: composición asimétrica completa.
- Tablet 768–1024 px: reducir capas y conservar jerarquía editorial.
- Mobile 375–430 px: una columna, pósters completos, nada de scroll horizontal global.
- Los recortes decorativos nunca deben tapar títulos, CTA o metadatos.
- Las texturas y collages secundarios pueden simplificarse en móvil sin perder la sensación de papel.

## 11. Accesibilidad

- Contraste WCAG AA para UI y cuerpo.
- Foco visible en navegación y CTAs.
- Decoraciones con `aria-hidden`.
- Texto real para titulares y metadatos; no rasterizar información importante dentro de collages generados.
- Imágenes de pósters con `alt` descriptivo.
- Animación opcional/respetuosa con preferencias del sistema.

## 12. Conflictos de información detectados

El PRD recibido indica para la próxima conversación **Lun. 16 Nov 2026, 12:00 h, Aula 4**, mientras que el repositorio actual y la página de IA registran **17 NOV 2026** y otros datos propios de la convocatoria vigente.

**Regla:** no cambiar datos de evento basándose únicamente en el mockup. La implementación final tomará la información canónica de la convocatoria/póster oficial y del archivo documental del Café.

## 13. Criterios de salida de Fase 2

Antes de considerar lista la nueva home:

- pósters originales conservados;
- hero y ornamentos con materialidad de papel real;
- datos centralizados;
- navegación completa;
- secciones del PRD implementadas;
- responsive real desktop/tablet/mobile;
- `prefers-reduced-motion`;
- `npm test` y `npm run build` verdes;
- smoke visual de rutas históricas;
- ningún cambio destructivo en memorias/Sistemas 2D;
- sólo entonces abrir PR de rediseño.
