// Canonical data model for the per-section learning layer.
// No React, DOM, browser APIs, or inferred philosophical dependencies.
// Route membership and documented node relations are the only sources of this view.
export function buildSectionPedagogy(nodes = [], routes = [], nodeOrder = []) {
  const orderIndex = new Map(nodeOrder.map((id, index) => [id, index]))
  const byId = new Map(nodes.map((node) => [node.id, node]))
  return routes.filter((route) => route.id !== 'all').map((route) => {
    const members = nodes.filter((node) => {
      const branch = node.data?.branch
      return Array.isArray(branch) ? branch.includes(route.id) : branch === route.id
    }).sort((left, right) =>
      (orderIndex.get(left.id) ?? Number.MAX_SAFE_INTEGER)
      - (orderIndex.get(right.id) ?? Number.MAX_SAFE_INTEGER)
    )
    const memberIds = new Set(members.map((node) => node.id))
    const prior = [...new Set(members.flatMap((node) => node.data?.dependsOn || []))]
      .filter((id) => !memberIds.has(id) && byId.has(id)).map((id) => byId.get(id))
    const later = [...new Set([
      ...members.flatMap((node) => node.data?.produces || []),
      ...nodes.filter((node) => !memberIds.has(node.id)
        && (node.data?.dependsOn || []).some((id) => memberIds.has(id))).map((node) => node.id),
    ])].filter((id) => !memberIds.has(id) && byId.has(id)).map((id) => byId.get(id))
    const questions = members.filter((node) => (
      node.data?.question || node.data?.nextQuestion ||
      node.data?.explanation || node.data?.detail
    ))
    return { ...route, members, prior, later, questions }
  }).filter((section) => section.members.length)
}


