import { decode } from "html-entities"
import type { VNode, VTree } from "virtual-dom"

export function vNodeHasChildren(vNode: VNode) {
  return vNode &&
    vNode.children &&
    Array.isArray(vNode.children) &&
    vNode.children.length
}

function isVNode(vTree: VTree): vTree is VNode {
  return "tagName" in vTree
}

/**
 * html-to-vdom doesn't decode HTML entities in attribute values,
 * so URLs end up with literal "&amp;" etc. Decode src and href
 * here before the rest of the pipeline tries to use them.
 */
export function decodeUrlAttributes(vTree: VTree) {
  if (!isVNode(vTree)) return

  if (vTree.properties.src) {
    vTree.properties.src = decode(vTree.properties.src)
  }
  if (vTree.properties.href) {
    vTree.properties.href = decode(vTree.properties.href)
  }

  for (const child of vTree.children) {
    decodeUrlAttributes(child)
  }
}
