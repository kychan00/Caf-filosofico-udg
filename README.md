# Café Filosófico UdeG

Archivo digital independiente del **Café Filosófico Interdisciplinario**.

Este repositorio separa del proyecto PHILOSOPHIA el archivo público completo del Café Filosófico: sesiones, memorias, sistemas 2D, galerías, recursos visuales y pruebas.

## Sesiones migradas

- Edición 01 · 7 sep 2026 · Fin del mundo / fin del capitalismo.
- Edición 02 · 22 sep 2026 · La meritocracia.
- Edición 03 · 5 oct 2026 · Mercadotecnia.
- Edición 04 · 19 oct 2026 · Hablemos sobre el agua.
- Edición 05 · 3 nov 2026 · Redes sociales.
- Edición 06 · 17 nov 2026 · Inteligencia Artificial · próximo encuentro.

## Desarrollo

```bash
npm install
npm run dev
```

Validación:

```bash
npm test
npm run build
```

La aplicación usa `HashRouter` para que las rutas funcionen de forma estable en GitHub Pages.

## Reglas editoriales

Las reglas obligatorias del proyecto están en [`docs/REGLAS-EDITORIALES-CAFE.md`](docs/REGLAS-EDITORIALES-CAFE.md). Derivan del contrato editorial y del protocolo de diálogo del vault de PHILOSOPHIA y son vinculantes para nuevas sesiones, memorias y sistemas 2D.

## Procedencia

Migración inicial desde `kychan00/philosophia`. Los contenidos académicos y recursos de cada sesión se conservan como archivo histórico; los acoplamientos técnicos a `/philosophia/` se sustituyen por `import.meta.env.BASE_URL` para que el sitio sea autónomo.
