export const CONCEPT_SCHEMA_LAYOUTS = Object.freeze({
  FLOW: 'flow',
  HIERARCHY: 'hierarchy',
  RADIAL: 'radial',
  CONSTELLATION: 'constellation',
})

export const CONCEPT_SCHEMA_SHAPES = Object.freeze({
  RECT: 'rect',
  ROUNDED_RECT: 'roundedRect',
  CIRCLE: 'circle',
  DIAMOND: 'diamond',
  HEXAGON: 'hexagon',
  PILL: 'pill',
})

export const CONCEPT_SCHEMA_NODE_ROLES = Object.freeze({
  CONCEPT: 'concept',
  STRUCTURE: 'structure',
  MEDIATION: 'mediation',
  TERM: 'term',
  RESULT: 'result',
})

export const CONCEPT_SCHEMA_RELATION_KINDS = Object.freeze({
  DERIVES: 'derives',
  SECONDARY: 'secondary',
  CONSTITUTES: 'constitutes',
  RECIPROCAL: 'reciprocal',
  TRANSVERSAL: 'transversal',
  HIERARCHICAL: 'hierarchical',
})

export const NODE_ROLE_META = Object.freeze({
  concept: {
    label: 'concepto central',
    shape: 'circle',
    glyph: '○',
  },
  structure: {
    label: 'estructura / forma social',
    shape: 'hexagon',
    glyph: '⬡',
  },
  mediation: {
    label: 'mediación / transformación',
    shape: 'diamond',
    glyph: '◇',
  },
  term: {
    label: 'término / objeto',
    shape: 'roundedRect',
    glyph: '▭',
  },
  result: {
    label: 'resultado / manifestación',
    shape: 'pill',
    glyph: '▱',
  },
})

export const RELATION_KIND_META = Object.freeze({
  derives: {
    label: 'deriva / conduce a',
    arrow: 'forward',
    line: 'solid',
    routing: 'straight',
    glyph: '→',
  },
  secondary: {
    label: 'mediación secundaria',
    arrow: 'forward',
    line: 'dashed',
    routing: 'straight',
    glyph: '⇢',
  },
  constitutes: {
    label: 'constitución fuerte',
    arrow: 'double',
    line: 'solid',
    routing: 'straight',
    glyph: '⇒',
  },
  reciprocal: {
    label: 'relación recíproca',
    arrow: 'bidirectional',
    line: 'solid',
    routing: 'straight',
    glyph: '↔',
  },
  transversal: {
    label: 'relación transversal',
    arrow: 'forward',
    line: 'solid',
    routing: 'curved',
    glyph: '↝',
  },
  hierarchical: {
    label: 'derivación jerárquica',
    arrow: 'forward',
    line: 'solid',
    routing: 'orthogonal',
    glyph: '↳',
  },
})

export function nodeRoleFromShape(shape) {
  switch (shape) {
    case CONCEPT_SCHEMA_SHAPES.CIRCLE:
      return CONCEPT_SCHEMA_NODE_ROLES.CONCEPT
    case CONCEPT_SCHEMA_SHAPES.HEXAGON:
      return CONCEPT_SCHEMA_NODE_ROLES.STRUCTURE
    case CONCEPT_SCHEMA_SHAPES.DIAMOND:
      return CONCEPT_SCHEMA_NODE_ROLES.MEDIATION
    case CONCEPT_SCHEMA_SHAPES.PILL:
      return CONCEPT_SCHEMA_NODE_ROLES.RESULT
    case CONCEPT_SCHEMA_SHAPES.RECT:
    case CONCEPT_SCHEMA_SHAPES.ROUNDED_RECT:
    default:
      return CONCEPT_SCHEMA_NODE_ROLES.TERM
  }
}

export function shapeFromNodeRole(role) {
  return NODE_ROLE_META[role]?.shape || CONCEPT_SCHEMA_SHAPES.ROUNDED_RECT
}

export function relationKindFromEdge(edge = {}) {
  if (edge.relationKind) {
    return edge.relationKind
  }

  if (edge.kind === 'secondary' || edge.line === 'dashed') {
    return CONCEPT_SCHEMA_RELATION_KINDS.SECONDARY
  }

  if (edge.arrow === 'bidirectional') {
    return CONCEPT_SCHEMA_RELATION_KINDS.RECIPROCAL
  }

  if (edge.arrow === 'double') {
    return CONCEPT_SCHEMA_RELATION_KINDS.CONSTITUTES
  }

  if (edge.routing === 'curved') {
    return CONCEPT_SCHEMA_RELATION_KINDS.TRANSVERSAL
  }

  if (edge.routing === 'orthogonal') {
    return CONCEPT_SCHEMA_RELATION_KINDS.HIERARCHICAL
  }

  return CONCEPT_SCHEMA_RELATION_KINDS.DERIVES
}

export function effectiveNodeRole(node = {}) {
  return node.shapeRole || nodeRoleFromShape(node.shape)
}

export function effectiveNodeShape(node = {}) {
  return node.shape || shapeFromNodeRole(effectiveNodeRole(node))
}

export function effectiveRelationStyle(edge = {}) {
  const relationKind = relationKindFromEdge(edge)
  const defaults =
    RELATION_KIND_META[relationKind] ||
    RELATION_KIND_META.derives

  return {
    relationKind,
    arrow: edge.arrow || defaults.arrow,
    line: edge.line || defaults.line,
    routing: edge.routing || defaults.routing,
  }
}

export const CONCEPT_SCHEMA_ARROWS = Object.freeze({
  FORWARD: 'forward',
  DOUBLE: 'double',
  BIDIRECTIONAL: 'bidirectional',
  NONE: 'none',
})

export const CONCEPT_SCHEMA_LINES = Object.freeze({
  SOLID: 'solid',
  DASHED: 'dashed',
})

export const CONCEPT_SCHEMA_ROUTING = Object.freeze({
  STRAIGHT: 'straight',
  CURVED: 'curved',
  ORTHOGONAL: 'orthogonal',
})
