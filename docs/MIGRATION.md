# Migración desde PHILOSOPHIA

Fecha de corte: 3 de noviembre de 2026.

## Alcance

La migración conserva el archivo público del Café Filosófico y sus dependencias técnicas específicas:

- cinco ediciones del archivo;
- páginas editoriales y memorias;
- sistema 2D de Mercadotecnia;
- sistema 2D y memoria extensa del Agua;
- archivo argumental de Meritocracia;
- recursos visuales, fotografías y videos;
- pruebas unitarias y smoke tests del Café.

## Cambios técnicos deliberados

1. El `base` de Vite cambia de `/philosophia/` a `/Caf-filosofico-udg/`.
2. Las rutas absolutas de assets de Meritocracia, Mercadotecnia y Agua se vuelven dependientes de `import.meta.env.BASE_URL`.
3. Las miniaturas de Meritocracia y Mercadotecnia usan los JPG realmente presentes en el repositorio de origen.
4. Redes Sociales incorpora el póster oficial que estaba en el PR #74 de `kychan00/philosophia`.
5. Se conserva `HashRouter` y la estructura de rutas `/cafe-filosofico/...`.

## Fuera de alcance

No se publican en este repositorio público las notas privadas del vault de Obsidian. El vault conserva la documentación editorial y deberá apuntar a este repositorio como nuevo hogar técnico del Café.
