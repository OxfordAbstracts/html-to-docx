import { VNode } from "virtual-dom"

export function vNodeHasChildren(vNode: VNode) {
  return vNode &&
    vNode.children &&
    Array.isArray(vNode.children) &&
    vNode.children.length
}
