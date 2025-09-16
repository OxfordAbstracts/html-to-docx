/* eslint-disable no-unused-vars */

declare module "html-to-vdom" {
  import type { VTree } from "virtual-dom"

  function htmlToVdom(options: unknown): (html: string) => VTree
  export = htmlToVdom
}
