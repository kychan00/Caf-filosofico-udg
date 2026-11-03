import { useEffect, useState } from 'react'

export const SYSTEM_2D_COMPACT_QUERY = '(max-width: 850px)'

export function isSystem2DCompactViewport() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(SYSTEM_2D_COMPACT_QUERY).matches
}

export function initialSystem2DRoute(routes, fallback = 'all') {
  if (!isSystem2DCompactViewport()) return fallback
  return routes.find((route) => route.id !== 'all')?.id || fallback
}

export function useSystem2DCompactViewport() {
  const [compact, setCompact] = useState(() => isSystem2DCompactViewport())

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia(SYSTEM_2D_COMPACT_QUERY)
    const sync = () => setCompact(media.matches)
    sync()
    media.addEventListener?.('change', sync)
    return () => media.removeEventListener?.('change', sync)
  }, [])

  return compact
}

export function visibleSystem2DNodes(nodes) {
  return nodes.filter((node) => !node.hidden)
}

export function visibleSystem2DEdges(edges) {
  return edges.filter((edge) => !edge.hidden)
}
