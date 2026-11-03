import {
  CONCEPT_SCHEMA_SHAPES,
  effectiveNodeRole,
  effectiveNodeShape,
} from './schemaTypes'

function wrapText(value, maxChars) {
  const words = String(value || '').trim().split(/\s+/).filter(Boolean)
  if (!words.length) return []

  const lines = []
  let current = ''

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word

    if (candidate.length > maxChars && current) {
      lines.push(current)
      current = word
    } else {
      current = candidate
    }
  })

  if (current) lines.push(current)
  return lines
}

function safeWidthRatio(shape) {
  switch (shape) {
    case CONCEPT_SCHEMA_SHAPES.CIRCLE:
      return 0.68
    case CONCEPT_SCHEMA_SHAPES.DIAMOND:
      return 0.58
    case CONCEPT_SCHEMA_SHAPES.HEXAGON:
      return 0.72
    case CONCEPT_SCHEMA_SHAPES.PILL:
      return 0.8
    default:
      return 0.84
  }
}

function charsForWidth(width, fontSize, ratio) {
  const averageGlyph = fontSize * 0.58
  return Math.max(8, Math.floor((width * ratio) / averageGlyph))
}

function Shape({ shape, width, height }) {
  const common = {
    className: 'concept-schema-node__shape',
  }

  switch (shape) {
    case CONCEPT_SCHEMA_SHAPES.CIRCLE:
      return (
        <ellipse
          {...common}
          cx={width / 2}
          cy={height / 2}
          rx={width / 2 - 3}
          ry={height / 2 - 3}
        />
      )

    case CONCEPT_SCHEMA_SHAPES.DIAMOND:
      return (
        <polygon
          {...common}
          points={`${width / 2},2 ${width - 2},${height / 2} ${width / 2},${height - 2} 2,${height / 2}`}
        />
      )

    case CONCEPT_SCHEMA_SHAPES.HEXAGON:
      return (
        <polygon
          {...common}
          points={`${width * 0.18},2 ${width * 0.82},2 ${width - 2},${height / 2} ${width * 0.82},${height - 2} ${width * 0.18},${height - 2} 2,${height / 2}`}
        />
      )

    case CONCEPT_SCHEMA_SHAPES.PILL:
      return (
        <rect
          {...common}
          width={width}
          height={height}
          rx={height / 2}
        />
      )

    case CONCEPT_SCHEMA_SHAPES.RECT:
      return (
        <rect
          {...common}
          width={width}
          height={height}
          rx="0"
        />
      )

    case CONCEPT_SCHEMA_SHAPES.ROUNDED_RECT:
    default:
      return (
        <rect
          {...common}
          width={width}
          height={height}
          rx="7"
        />
      )
  }
}

export default function ConceptNode({ node, position }) {
  const { x, y, width, height } = position
  const role = effectiveNodeRole(node)
  const shape = effectiveNodeShape(node)
  const ratio = safeWidthRatio(shape)

  const labelChars =
    node.wrapAt || charsForWidth(width, 13, ratio)

  const captionChars =
    node.captionWrapAt || charsForWidth(width, 8.5, ratio)

  const labelLines = wrapText(node.label, labelChars)
  const captionLines = node.caption
    ? wrapText(node.caption, captionChars)
    : []

  const labelLineHeight = 15.5
  const captionLineHeight = 10.5
  const contentGap = captionLines.length ? 9 : 0
  const labelHeight = Math.max(labelLineHeight, labelLines.length * labelLineHeight)
  const captionHeight = captionLines.length * captionLineHeight
  const totalHeight = labelHeight + contentGap + captionHeight
  const contentTop = height / 2 - totalHeight / 2
  const labelStartY = contentTop + labelLineHeight / 2
  const captionStartY =
    contentTop + labelHeight + contentGap + captionLineHeight / 2

  return (
    <g
      className={[
        'concept-schema-node',
        `is-shape-${shape}`,
        `is-role-${role}`,
        node.emphasis ? 'is-emphasis' : '',
        node.tone ? `is-tone-${node.tone}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-concept-node={node.id}
      data-concept-role={role}
      transform={`translate(${x} ${y})`}
    >
      <Shape
        shape={shape}
        width={width}
        height={height}
      />

      <text
        className="concept-schema-node__label"
        x={width / 2}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {labelLines.map((line, index) => (
          <tspan
            key={`${node.id}-label-${index}`}
            x={width / 2}
            y={labelStartY + index * labelLineHeight}
          >
            {line}
          </tspan>
        ))}
      </text>

      {captionLines.length > 0 && (
        <text
          className="concept-schema-node__caption"
          x={width / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {captionLines.map((line, index) => (
            <tspan
              key={`${node.id}-caption-${index}`}
              x={width / 2}
              y={captionStartY + index * captionLineHeight}
            >
              {line}
            </tspan>
          ))}
        </text>
      )}
    </g>
  )
}
