import { default as HTMLToVDOM } from "html-to-vdom"
import type { VNode, VTree } from "virtual-dom"
// @ts-expect-error  Could not find a declaration file
import VNodeImpl from "virtual-dom/vnode/vnode.js"
// @ts-expect-error  Could not find a declaration file
import VText from "virtual-dom/vnode/vtext.js"
import { assert, test } from "vitest"

import { decodeUrlAttributes } from "../src/utils/vnode.ts"

/* eslint-disable new-cap */
const convertHTML = HTMLToVDOM({
  VNode: VNodeImpl,
  VText,
})

function asVNode(vTree: VTree): VNode {
  return vTree as VNode
}

test("decodes &amp; in img src attribute", () => {
  const vTree = convertHTML(
    '<img src="https://example.com?a=1&amp;b=2">',
  )
  decodeUrlAttributes(vTree)

  assert.equal(
    asVNode(vTree).properties.src,
    "https://example.com?a=1&b=2",
  )
})

test("decodes &amp; in anchor href attribute", () => {
  const vTree = convertHTML(
    '<a href="https://example.com?x=1&amp;y=2">link</a>',
  )
  decodeUrlAttributes(vTree)

  assert.equal(
    asVNode(vTree).properties.href,
    "https://example.com?x=1&y=2",
  )
})

test("decodes nested img src attributes", () => {
  const vTree = convertHTML(
    '<div><img src="https://example.com?x=1&amp;y=2"></div>',
  )
  decodeUrlAttributes(vTree)

  const imgNode = asVNode(vTree).children[0]
  assert.equal(
    asVNode(imgNode).properties.src,
    "https://example.com?x=1&y=2",
  )
})

test("leaves already-decoded values unchanged", () => {
  const vTree = convertHTML(
    '<img src="https://example.com?a=1&b=2">',
  )
  decodeUrlAttributes(vTree)

  assert.equal(
    asVNode(vTree).properties.src,
    "https://example.com?a=1&b=2",
  )
})
