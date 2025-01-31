export function vNodeHasChildren(vNode) {
  return vNode && vNode.children && Array.isArray(vNode.children) &&
    vNode.children.length
}
