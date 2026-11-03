import { Handle, Position } from '@xyflow/react'

export default function CafeMercadotecniaNode({ data, selected }) {
  const classes = ['cafe2d-node', data.critical ? 'is-critical' : '', data.micro ? 'is-micro' : '', selected ? 'is-selected' : '', data.highlighted ? 'is-highlighted' : '', data.dimmed ? 'is-dimmed' : '', data.guidedCurrent ? 'is-guided-current' : '', data.guidedNext ? 'is-guided-next' : '', data.routeActive ? 'is-route-active' : ''].filter(Boolean).join(' ')

  return (
    <article className={classes}>
      <Handle type="target" position={Position.Left} className="cafe2d-handle" />
      {Number.isFinite(data.routeNumber) && (
        <div className="cafe2d-route-badge"><strong>{String(data.routeNumber).padStart(2, '0')}</strong><span>/ {data.routeTotal}</span></div>
      )}
      <div className="cafe2d-meta"><span>{data.phase}</span><b>{data.code}</b></div>
      <strong className="cafe2d-title">{data.title}</strong>
      <blockquote>{data.excerpt}</blockquote>
      <div className="cafe2d-footer"><span>Sesión · 05 OCT</span><button type="button" className="nodrag nopan" onClick={(event) => { event.stopPropagation(); data.onOpenFolio?.() }}>abrir folio</button></div>
      <Handle type="source" position={Position.Right} className="cafe2d-handle" />
    </article>
  )
}
