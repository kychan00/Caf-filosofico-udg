import { CONCEPT_SCHEMA_SHAPES, effectiveRelationStyle } from './schemaTypes'

function center(position) {
  return {
    x: position.x + position.width / 2,
    y: position.y + position.height / 2,
  }
}

function rectangleBoundary(position, toward) {
  const origin = center(position)
  const dx = toward.x - origin.x
  const dy = toward.y - origin.y

  if (!dx && !dy) return origin

  const halfW = position.width / 2
  const halfH = position.height / 2
  const scaleX = dx ? halfW / Math.abs(dx) : Infinity
  const scaleY = dy ? halfH / Math.abs(dy) : Infinity
  const scale = Math.min(scaleX, scaleY)

  return {
    x: origin.x + dx * scale,
    y: origin.y + dy * scale,
  }
}

function ellipseBoundary(position, toward) {
  const origin = center(position)
  const dx = toward.x - origin.x
  const dy = toward.y - origin.y
  const rx = position.width / 2
  const ry = position.height / 2

  if (!dx && !dy) return origin

  const denominator = Math.sqrt(
    (dx * dx) / (rx * rx) +
    (dy * dy) / (ry * ry),
  )

  if (!denominator) return origin

  return {
    x: origin.x + dx / denominator,
    y: origin.y + dy / denominator,
  }
}

function diamondBoundary(position, toward) {
  const origin = center(position)
  const dx = toward.x - origin.x
  const dy = toward.y - origin.y
  const halfW = position.width / 2
  const halfH = position.height / 2

  if (!dx && !dy) return origin

  const denominator =
    Math.abs(dx) / halfW +
    Math.abs(dy) / halfH

  if (!denominator) return origin

  const scale = 1 / denominator

  return {
    x: origin.x + dx * scale,
    y: origin.y + dy * scale,
  }
}

function boundaryPoint(position, toward) {
  switch (position.shape) {
    case CONCEPT_SCHEMA_SHAPES.CIRCLE:
      return ellipseBoundary(position, toward)
    case CONCEPT_SCHEMA_SHAPES.DIAMOND:
      return diamondBoundary(position, toward)
    default:
      return rectangleBoundary(position, toward)
  }
}

function sideBoundary(position, toward, vertical) {
  const origin = center(position)

  if (vertical) {
    return {
      x: origin.x,
      y: toward.y >= origin.y
        ? position.y + position.height
        : position.y,
    }
  }

  return {
    x: toward.x >= origin.x
      ? position.x + position.width
      : position.x,
    y: origin.y,
  }
}

function moveToward(point, toward, distance) {
  const dx = toward.x - point.x
  const dy = toward.y - point.y
  const length = Math.hypot(dx, dy)

  if (!length) return point

  const amount = Math.min(distance, length * 0.38)

  return {
    x: point.x + (dx / length) * amount,
    y: point.y + (dy / length) * amount,
  }
}

function makeEndpoints(edge, from, to, arrow, routing) {
  const fromCenter = center(from)
  const toCenter = center(to)
  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y

  let rawStart
  let rawEnd

  if (routing === 'orthogonal') {
    const explicit = edge.orthogonal
    const vertical =
      explicit === 'vertical-first'
        ? true
        : explicit === 'horizontal-first'
          ? false
          : Math.abs(dy) >= Math.abs(dx) * 0.72

    rawStart = sideBoundary(from, toCenter, vertical)
    rawEnd = sideBoundary(to, fromCenter, vertical)
  } else {
    rawStart = boundaryPoint(from, toCenter)
    rawEnd = boundaryPoint(to, fromCenter)
  }

  const defaultStartGap = arrow === 'bidirectional' ? 23 : 10
  const defaultEndGap =
    arrow === 'none'
      ? 10
      : arrow === 'double'
        ? 29
        : 23

  const startGap = Number.isFinite(edge.startGap)
    ? edge.startGap
    : defaultStartGap

  const endGap = Number.isFinite(edge.endGap)
    ? edge.endGap
    : defaultEndGap

  return {
    start: moveToward(rawStart, rawEnd, startGap),
    end: moveToward(rawEnd, rawStart, endGap),
  }
}

function longestSegment(points) {
  let best = null

  for (let index = 0; index < points.length - 1; index += 1) {
    const a = points[index]
    const b = points[index + 1]
    const length = Math.hypot(b.x - a.x, b.y - a.y)

    if (!best || length > best.length) {
      best = { a, b, length }
    }
  }

  return best
}

function segmentLabelGeometry(points) {
  const segment = longestSegment(points)

  if (!segment) {
    return { x: 0, y: 0, orientation: 'horizontal' }
  }

  return {
    x: (segment.a.x + segment.b.x) / 2,
    y: (segment.a.y + segment.b.y) / 2,
    orientation:
      Math.abs(segment.b.x - segment.a.x) >=
      Math.abs(segment.b.y - segment.a.y)
        ? 'horizontal'
        : 'vertical',
  }
}

function automaticLabelOffset(orientation, edge) {
  if (edge.labelPlacement === 'on-line') {
    return { x: 0, y: 0 }
  }

  const distance = Number.isFinite(edge.labelDistance)
    ? Math.abs(edge.labelDistance)
    : 20

  return orientation === 'horizontal'
    ? { x: 0, y: -distance }
    : { x: distance + 3, y: 0 }
}

function edgePath(edge, from, to, routing, arrow) {
  const { start, end } = makeEndpoints(edge, from, to, arrow, routing)

  if (routing === 'curved') {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const curvature = edge.curvature ?? 0.16
    const controlX = (start.x + end.x) / 2 - dy * curvature
    const controlY = (start.y + end.y) / 2 + dx * curvature

    return {
      d: `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`,
      label: {
        x: (start.x + 2 * controlX + end.x) / 4,
        y: (start.y + 2 * controlY + end.y) / 4,
        orientation:
          Math.abs(dx) >= Math.abs(dy)
            ? 'horizontal'
            : 'vertical',
      },
      start,
      end,
    }
  }

  if (routing === 'orthogonal') {
    const dx = end.x - start.x
    const dy = end.y - start.y

    if (Math.abs(dx) < 1 || Math.abs(dy) < 1) {
      const points = [start, end]
      return {
        d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
        label: segmentLabelGeometry(points),
        start,
        end,
      }
    }

    const explicit = edge.orthogonal
    const verticalFirst =
      explicit === 'vertical-first'
        ? true
        : explicit === 'horizontal-first'
          ? false
          : Math.abs(dy) >= Math.abs(dx) * 0.72

    let points

    if (verticalFirst) {
      const midY = (start.y + end.y) / 2
      points = [
        start,
        { x: start.x, y: midY },
        { x: end.x, y: midY },
        end,
      ]
    } else {
      const midX = (start.x + end.x) / 2
      points = [
        start,
        { x: midX, y: start.y },
        { x: midX, y: end.y },
        end,
      ]
    }

    return {
      d: points
        .map((point, index) =>
          `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`,
        )
        .join(' '),
      label: segmentLabelGeometry(points),
      start,
      end,
    }
  }

  const points = [start, end]

  return {
    d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
    label: segmentLabelGeometry(points),
    start,
    end,
  }
}

function labelMetrics(label) {
  const width = Math.max(52, String(label).length * 6.1 + 22)
  return { width, height: 23 }
}

export default function ConceptEdge({
  edge,
  index,
  from,
  to,
  markerIds,
}) {
  const {
    relationKind,
    arrow,
    line,
    routing,
  } = effectiveRelationStyle(edge)

  const geometry = edgePath(
    edge,
    from,
    to,
    routing,
    arrow,
  )

  const autoOffset = automaticLabelOffset(
    geometry.label.orientation,
    edge,
  )

  const labelX =
    geometry.label.x +
    autoOffset.x +
    (edge.labelOffsetX || 0)

  const labelY =
    geometry.label.y +
    autoOffset.y +
    (edge.labelOffsetY || 0)

  const markerEnd =
    arrow === 'none'
      ? undefined
      : arrow === 'double'
        ? `url(#${markerIds.double})`
        : `url(#${markerIds.forward})`

  const markerStart =
    arrow === 'bidirectional'
      ? `url(#${markerIds.forward})`
      : undefined

  const labelBox = edge.label ? labelMetrics(edge.label) : null

  return (
    <g
      className={[
        'concept-schema-edge-group',
        `is-line-${line}`,
        `is-arrow-${arrow}`,
        `is-relation-${relationKind}`,
        edge.kind ? `is-kind-${edge.kind}` : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-concept-relation={relationKind}
    >
      <path
        className="concept-schema-edge"
        data-concept-edge={index}
        d={geometry.d}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="0"
        markerStart={markerStart}
        markerEnd={markerEnd}
      />

      {edge.label && labelBox && (
        <g
          className="concept-schema-edge__label-group"
          transform={`translate(${labelX} ${labelY})`}
        >
          <rect
            className="concept-schema-edge__label-plate"
            x={-labelBox.width / 2}
            y={-labelBox.height / 2}
            width={labelBox.width}
            height={labelBox.height}
            rx="5"
          />
          <text
            className="concept-schema-edge__label"
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {edge.label}
          </text>
        </g>
      )}
    </g>
  )
}
