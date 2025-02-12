import { default as HTMLToVDOM } from "html-to-vdom"
import { imageSize } from "image-size"
// @ts-expect-error  Could not find a declaration file
import isVNode from "virtual-dom/vnode/is-vnode.js"
// @ts-expect-error  Could not find a declaration file
import isVText from "virtual-dom/vnode/is-vtext.js"
// @ts-expect-error  Could not find a declaration file
import VNode from "virtual-dom/vnode/vnode.js"
// @ts-expect-error  Could not find a declaration file
import VText from "virtual-dom/vnode/vtext.js"
import { fragment } from "xmlbuilder2"

import type { VTree } from "virtual-dom"
import type { XMLBuilder } from "xmlbuilder2/lib/interfaces.d.ts"
import {
  htmlHeadings,
  htmlInlineElements,
  imageType,
  internalRelationship,
} from "../constants.ts"
import DocxDocument from "../docx-document.ts"
import namespaces from "../namespaces.ts"
import { fetchImageToDataUrl } from "../utils/base64.ts"
import { isValidUrl } from "../utils/url.ts"
import { vNodeHasChildren } from "../utils/vnode.ts"
import * as xmlBuilder from "./xml-builder.ts"

// eslint-disable-next-line new-cap
const convertHTML = HTMLToVDOM({
  VNode,
  VText,
})

export async function buildImage(
  docxDocumentInstance: DocxDocument,
  vNode: VNode,
  maximumWidth: number,
) {
  let response = null
  try {
    if (isValidUrl(vNode.properties.src)) {
      vNode.properties.src = await fetchImageToDataUrl(vNode.properties.src)
    }
    const base64Uri = decodeURIComponent(vNode.properties.src)
    if (base64Uri) {
      response = docxDocumentInstance.createMediaFile(base64Uri)
    }
  }
  catch (error) {
    console.error(error)
  }
  if (response) {
    docxDocumentInstance.zip
      .folder("word")
      ?.folder("media")
      ?.file(
        response.fileNameWithExtension,
        Buffer.from(response.fileContent, "base64"),
        {
          createFolders: false,
        },
      )

    const documentRelsId = docxDocumentInstance.createDocumentRelationships(
      docxDocumentInstance.relationshipFilename,
      imageType,
      `media/${response.fileNameWithExtension}`,
      internalRelationship,
    )

    const imageBuffer = Buffer.from(response.fileContent, "base64")
    const imageProperties = imageSize(imageBuffer)

    const imageFragment = await xmlBuilder.buildParagraph(
      vNode,
      {
        type: "picture",
        inlineOrAnchored: true,
        relationshipId: documentRelsId,
        ...response,
        description: vNode.properties.alt,
        maximumWidth: maximumWidth ||
          docxDocumentInstance.availableDocumentSpace,
        originalWidth: imageProperties.width,
        originalHeight: imageProperties.height,
      },
      docxDocumentInstance,
    )

    return imageFragment
  }
}

export async function buildList(
  vNode: VNode,
  docxDocumentInstance: DocxDocument,
  xmlFragment: XMLBuilder,
): Promise<{
  node: VNode
  level: number
  type: string
  numberingId: number
}[]> {
  const listElements: {
    node: VNode
    level: number
    type: string
    numberingId: number
  }[] = []

  let vNodeObjects = [
    {
      node: vNode,
      level: 0,
      type: vNode.tagName,
      numberingId: docxDocumentInstance.createNumbering(
        vNode.tagName,
        vNode.properties,
      ),
    },
  ]
  while (vNodeObjects.length) {
    const tempVNodeObject = vNodeObjects.shift()
    if (tempVNodeObject) {
      if (
        isVText(tempVNodeObject.node) ||
        (isVNode(tempVNodeObject.node) &&
          !["ul", "ol", "li"].includes(tempVNodeObject.node.tagName))
      ) {
        const paragraphFragment = await xmlBuilder.buildParagraph(
          tempVNodeObject.node,
          {
            numbering: {
              levelId: tempVNodeObject.level,
              numberingId: tempVNodeObject.numberingId,
            },
          },
          docxDocumentInstance,
        )

        xmlFragment.import(paragraphFragment)
      }
    }

    if (
      tempVNodeObject?.node.children &&
      tempVNodeObject?.node.children.length &&
      ["ul", "ol", "li"].includes(tempVNodeObject?.node.tagName)
    ) {
      const tempVNodeObjects = tempVNodeObject.node.children.reduce(
        (
          accumulator: {
            node: VNode
            level: number
            type: string
            numberingId: number
          }[],
          childVNode: VNode,
        ) => {
          if (["ul", "ol"].includes(childVNode.tagName)) {
            accumulator.push({
              node: childVNode,
              level: tempVNodeObject.level + 1,
              type: childVNode.tagName,
              numberingId: docxDocumentInstance.createNumbering(
                childVNode.tagName,
                childVNode.properties,
              ),
            })
          }
          else {
            if (
              accumulator.length > 0 &&
              isVNode(accumulator[accumulator.length - 1].node) &&
              accumulator[accumulator.length - 1].node.tagName.toLowerCase() ===
                "p"
            ) {
              accumulator[accumulator.length - 1].node.children.push(
                childVNode,
              )
            }
            else {
              const paragraphVNode = new VNode(
                "p",
                null,
                isVText(childVNode)
                  ? [childVNode]
                  : isVNode(childVNode)
                    ? childVNode.tagName.toLowerCase() === "li"
                      ? [...childVNode.children]
                      : [childVNode]
                    : [],
              )
              accumulator.push({
                node: isVNode(childVNode)
                  ? childVNode.tagName.toLowerCase() === "li"
                    ? childVNode
                    : childVNode.tagName.toLowerCase() !== "p"
                      ? paragraphVNode
                      : childVNode
                  : paragraphVNode,
                level: tempVNodeObject.level,
                type: tempVNodeObject.type,
                numberingId: tempVNodeObject.numberingId,
              })
            }
          }

          return accumulator
        },
        [],
      )
      vNodeObjects = tempVNodeObjects.concat(vNodeObjects)
    }
  }

  return listElements
}

async function findXMLEquivalent(
  docxDocumentInstance: DocxDocument,
  vNode: VNode,
  xmlFragment: XMLBuilder,
) {
  if (
    vNode.tagName === "div" &&
    (vNode.properties.attributes.class === "page-break" ||
      (vNode.properties.style && vNode.properties.style["page-break-after"]))
  ) {
    const paragraphFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "p")
      .ele("@w", "r")
      .ele("@w", "br")
      .att("@w", "type", "page")
      .up()
      .up()
      .up()

    xmlFragment.import(paragraphFragment)
    return
  }

  if (vNode.tagName === "br") {
    xmlFragment.import(
      await xmlBuilder.buildParagraph(vNode, {}, docxDocumentInstance),
    )
    return
  }
  else if (htmlHeadings.includes(vNode.tagName)) {
    const headingFragment = await xmlBuilder.buildParagraph(
      vNode,
      { paragraphStyle: `Heading${vNode.tagName[1]}` },
      docxDocumentInstance,
    )
    xmlFragment.import(headingFragment)
    return
  }
  else if (vNode.tagName === "figure") {
    if (vNodeHasChildren(vNode)) {
      for (let index = 0; index < vNode.children.length; index++) {
        const childVNode = vNode.children[index]
        if (childVNode.tagName === "table") {
          const tableFragment = await xmlBuilder.buildTable(
            childVNode,
            {
              maximumWidth: docxDocumentInstance.availableDocumentSpace,
              rowCantSplit: docxDocumentInstance.tableRowCantSplit,
            },
            docxDocumentInstance,
          )
          xmlFragment.import(tableFragment)
          // Adding empty paragraph for space after table
          const emptyParagraphFragment = await xmlBuilder.buildParagraph(
            null,
            {},
            docxDocumentInstance,
          )
          xmlFragment.import(emptyParagraphFragment)
        }
        else if (childVNode.tagName === "img") {
          const imageFragment = await buildImage(
            docxDocumentInstance,
            childVNode,
            docxDocumentInstance.availableDocumentSpace,
          )
          if (imageFragment) {
            xmlFragment.import(imageFragment)
          }
        }
      }
    }
    return
  }
  else if (vNode.tagName === "table") {
    const tableFragment = await xmlBuilder.buildTable(
      vNode,
      {
        maximumWidth: docxDocumentInstance.availableDocumentSpace,
        rowCantSplit: docxDocumentInstance.tableRowCantSplit,
      },
      docxDocumentInstance,
    )
    xmlFragment.import(tableFragment)
    // Adding empty paragraph for space after table
    const emptyParagraphFragment = await xmlBuilder.buildParagraph(
      null,
      {},
      docxDocumentInstance,
    )
    xmlFragment.import(emptyParagraphFragment)
    return
  }
  else if (["ol", "ul"].includes(vNode.tagName)) {
    await buildList(vNode, docxDocumentInstance, xmlFragment)
    return
  }
  else if (vNode.tagName === "img") {
    const imageFragment = await buildImage(
      docxDocumentInstance,
      vNode,
      docxDocumentInstance.availableDocumentSpace,
    )
    if (imageFragment) {
      xmlFragment.import(imageFragment)
    }
    return
  }
  else if (
    [
      "a",
      "blockquote",
      "p",
      "pre",
    ].includes(vNode.tagName)
  ) {
    xmlFragment.import(
      await xmlBuilder.buildParagraph(vNode, {}, docxDocumentInstance),
    )
    return
  }
  else if (htmlInlineElements.includes(vNode.tagName)) {
    const textFragment = await xmlBuilder.buildRun(
      vNode,
      {},
      docxDocumentInstance,
    )
    if (Array.isArray(textFragment)) {
      textFragment.forEach(frag => xmlFragment.import(frag))
    }
    else {
      xmlFragment.import(textFragment)
    }
    return
  }
  else if (vNode.tagName === "head") {
    return
  }

  if (vNodeHasChildren(vNode)) {
    let isInParagraph = false
    let paragraphFrag = fragment()
    const inlineTags = [
      "b",
      "code",
      "del",
      "em",
      "i",
      "ins",
      "mark",
      "s",
      "span",
      "strike",
      "strong",
      "sub",
      "sup",
      "u",
    ]

    for (const childVNode of vNode.children) {
      if (inlineTags.includes(childVNode.tagName)) {
        if (!isInParagraph) {
          paragraphFrag = xmlFragment.ele("@w", "p")
          isInParagraph = true
        }
        await convertVTreeToXML(
          docxDocumentInstance,
          childVNode,
          paragraphFrag,
        )
      }
      else {
        await convertVTreeToXML(
          docxDocumentInstance,
          childVNode,
          xmlFragment,
        )
        isInParagraph = false
      }
    }
  }
}

export async function convertVTreeToXML(
  docxDocumentInstance: DocxDocument,
  vTree: VTree,
  xmlFragment: XMLBuilder,
) {
  if (!vTree) {
    // Do nothing
  }
  else if (Array.isArray(vTree) && vTree.length) {
    for (let index = 0; index < vTree.length; index++) {
      const vNode = vTree[index]
      await convertVTreeToXML(docxDocumentInstance, vNode, xmlFragment)
    }
  }
  else if (isVNode(vTree)) {
    await findXMLEquivalent(docxDocumentInstance, vTree, xmlFragment)
  }
  else if (isVText(vTree)) {
    const paragraphFragment = await xmlBuilder.buildParagraph(
      vTree as VText,
      {},
      docxDocumentInstance,
    )
    xmlFragment.import(paragraphFragment)
  }
}

export default async function renderDocumentFile(
  docxDocumentInstance: DocxDocument,
) {
  if (!docxDocumentInstance.htmlString) {
    throw new Error("HTML string is required")
  }

  const vTree = convertHTML(docxDocumentInstance.htmlString)

  const xmlFragment = fragment({ namespaceAlias: { w: namespaces.w } })

  await convertVTreeToXML(
    docxDocumentInstance,
    vTree,
    xmlFragment,
  )

  return xmlFragment
}
