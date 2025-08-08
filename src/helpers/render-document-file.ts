/* eslint-disable new-cap */

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
import {
  emToEmu,
  pixelToEMU,
  remToEmu,
  TWIPToEMU,
} from "../utils/unit-conversion.ts"
import { isValidUrl } from "../utils/url.ts"
import { vNodeHasChildren } from "../utils/vnode.ts"
import * as xmlBuilder from "./xml-builder.ts"
import type { Attributes } from "./xml-builder.ts"

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

    // Compute image dimensions similar to computeImageDimensions function
    const maxWidth = maximumWidth || docxDocumentInstance.availableDocumentSpace
    const originalWidthInEMU = pixelToEMU(imageProperties.width || 0)
    const originalHeightInEMU = pixelToEMU(imageProperties.height || 0)
    const maximumWidthInEMU = TWIPToEMU(maxWidth || 0)
    const aspectRatio = (imageProperties.width || 0) /
      (imageProperties.height || 1)

    let finalWidthInEMU = originalWidthInEMU
    let finalHeightInEMU = originalHeightInEMU

    // Respect maximum width constraint
    if (originalWidthInEMU > maximumWidthInEMU) {
      finalWidthInEMU = maximumWidthInEMU
      finalHeightInEMU = Math.round(finalWidthInEMU / aspectRatio)
    }

    // Handle CSS styling if present
    if (vNode.properties && vNode.properties.style) {
      const style = vNode.properties.style
      if (style.width && style.width !== "auto") {
        if (/(\d+)px/.test(style.width)) {
          finalWidthInEMU = pixelToEMU(
            parseInt(style.width.match(/(\d+)px/)[1]),
          )
        }
        else if (/(\d+)em/.test(style.width)) {
          finalWidthInEMU = emToEmu(
            parseFloat(style.width.match(/(\d+(?:\.\d+)?)em/)[1]),
          )
        }
        else if (/(\d+)rem/.test(style.width)) {
          finalWidthInEMU = remToEmu(
            parseFloat(style.width.match(/(\d+(?:\.\d+)?)rem/)[1]),
          )
        }
        else if (/(\d+)%/.test(style.width)) {
          const percentage = parseFloat(
            style.width.match(/(\d+(?:\.\d+)?)%/)[1],
          )
          finalWidthInEMU = Math.round((percentage / 100) * originalWidthInEMU)
        }
      }

      if (style.height && style.height !== "auto") {
        if (/(\d+)px/.test(style.height)) {
          finalHeightInEMU = pixelToEMU(
            parseInt(style.height.match(/(\d+)px/)[1]),
          )
        }
        else if (/(\d+)em/.test(style.height)) {
          finalHeightInEMU = emToEmu(
            parseFloat(style.height.match(/(\d+(?:\.\d+)?)em/)[1]),
          )
        }
        else if (/(\d+)rem/.test(style.height)) {
          finalHeightInEMU = remToEmu(
            parseFloat(style.height.match(/(\d+(?:\.\d+)?)rem/)[1]),
          )
        }
        else if (/(\d+)%/.test(style.height)) {
          const percentage = parseFloat(
            style.height.match(/(\d+(?:\.\d+)?)%/)[1],
          )
          finalHeightInEMU = Math.round(
            (percentage / 100) * originalHeightInEMU,
          )
          if (!style.width || style.width === "auto") {
            finalWidthInEMU = Math.round(finalHeightInEMU * aspectRatio)
          }
        }
      }

      // Maintain aspect ratio if only one dimension is specified
      if (
        style.width && style.width !== "auto" &&
        (!style.height || style.height === "auto")
      ) {
        finalHeightInEMU = Math.round(finalWidthInEMU / aspectRatio)
      }
      else if (
        style.height && style.height !== "auto" &&
        (!style.width || style.width === "auto")
      ) {
        finalWidthInEMU = Math.round(finalHeightInEMU * aspectRatio)
      }
    }

    const imageFragment = await xmlBuilder.buildRun(
      vNode,
      {
        type: "picture",
        inlineOrAnchored: true,
        relationshipId: documentRelsId,
        ...response,
        description: vNode.properties.alt,
        maximumWidth: maxWidth,
        originalWidth: imageProperties.width,
        originalHeight: imageProperties.height,
        width: finalWidthInEMU,
        height: finalHeightInEMU,
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

function collectParentAttributes(
  docxDocumentInstance: DocxDocument,
  vNode: VNode,
  existingAttributes: Attributes = {},
): Attributes {
  const parentAttributes = { ...existingAttributes }

  // Collect styling from current node that should be inherited by children
  if (vNode && vNode.properties) {
    const properties = vNode.properties

    // Handle inline styles
    if (properties.style) {
      if (properties.style["font-weight"] === "bold") {
        parentAttributes.strong = true
      }
      if (properties.style["font-style"] === "italic") {
        parentAttributes.i = true
      }
      if (properties.style["font-family"] || properties.style.fontFamily) {
        parentAttributes.font = docxDocumentInstance.createFont(
          properties.style.fontFamily || properties.style["font-family"],
        )
      }
      if (properties.style.fontSize || properties.style["font-size"]) {
        const fontSize = properties.style.fontSize ||
          properties.style["font-size"]
        parentAttributes.fontSize = xmlBuilder.fixupFontSize(String(fontSize))
      }
    }

    // Handle CSS classes
    const classAttr = properties.className || properties.class ||
      (properties.attributes && properties.attributes.class) || ""
    if (classAttr && docxDocumentInstance.cssClassStyles) {
      classAttr
        .toString()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((cls: string) => {
          const clsStyles = docxDocumentInstance.cssClassStyles[cls]
          if (clsStyles) {
            if (clsStyles["font-weight"] === "bold") {
              parentAttributes.strong = true
            }
            if (clsStyles["font-style"] === "italic") {
              parentAttributes.i = true
            }
            if (clsStyles["font-family"]) {
              parentAttributes.font = docxDocumentInstance.createFont(
                clsStyles["font-family"],
              )
            }
            if (clsStyles["font-size"]) {
              parentAttributes.fontSize = xmlBuilder.fixupFontSize(
                String(clsStyles["font-size"]),
              )
            }
          }
        })
    }
  }

  return parentAttributes
}

async function findXMLEquivalent(
  docxDocumentInstance: DocxDocument,
  vNode: VNode,
  xmlFragment: XMLBuilder,
  parentAttributes: Attributes = {},
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
            if (Array.isArray(imageFragment)) {
              imageFragment.forEach(frag => xmlFragment.import(frag))
            }
            else {
              xmlFragment.import(imageFragment)
            }
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
    const imageRunFragment = await buildImage(
      docxDocumentInstance,
      vNode,
      docxDocumentInstance.availableDocumentSpace,
    )
    if (imageRunFragment) {
      const imageParagraphFragment = await xmlBuilder.buildParagraph(
        vNode,
        {},
        docxDocumentInstance,
      )
      if (Array.isArray(imageRunFragment)) {
        imageRunFragment.forEach(frag => imageParagraphFragment.import(frag))
      }
      else {
        imageParagraphFragment.import(imageRunFragment)
      }
      xmlFragment.import(imageParagraphFragment)
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
    const preserveWhitespace = vNode.tagName === "pre"
    xmlFragment.import(
      await xmlBuilder.buildParagraph(
        vNode,
        parentAttributes,
        docxDocumentInstance,
        preserveWhitespace,
      ),
    )
    return
  }
  else if (
    vNode.tagName === "span" &&
    vNodeHasChildren(vNode) &&
    vNode.children.some((child: VNode | VText) =>
      isVNode(child) && child.tagName === "img",
    )
  ) {
    // Special case: span containing img is treated like a direct img element
    const imageChild = vNode.children.find((child: VNode | VText) =>
      isVNode(child) && child.tagName === "img",
    ) as VNode
    const imageFragment = await buildImage(
      docxDocumentInstance,
      imageChild,
      docxDocumentInstance.availableDocumentSpace,
    )
    if (imageFragment) {
      if (Array.isArray(imageFragment)) {
        imageFragment.forEach(frag => xmlFragment.import(frag))
      }
      else {
        xmlFragment.import(imageFragment)
      }
    }
    return
  }
  else if (htmlInlineElements.includes(vNode.tagName)) {
    const textFragment = await xmlBuilder.buildRun(
      vNode,
      parentAttributes,
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
    // Collect parent attributes to pass down to children
    const childParentAttributes = collectParentAttributes(
      docxDocumentInstance,
      vNode,
      parentAttributes,
    )

    let isInParagraph = false
    let paragraphFrag = fragment()
    const inlineTags = [
      "b",
      "br",
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
      if (childVNode.tagName === "img") {
        // Wrap standalone images in paragraph
        const imageRunFragment = await buildImage(
          docxDocumentInstance,
          childVNode,
          docxDocumentInstance.availableDocumentSpace,
        )
        if (imageRunFragment) {
          const imageParagraphFragment = await xmlBuilder.buildParagraph(
            childVNode,
            childParentAttributes,
            docxDocumentInstance,
          )
          if (Array.isArray(imageRunFragment)) {
            imageRunFragment.forEach(frag =>
              imageParagraphFragment.import(frag),
            )
          }
          else {
            imageParagraphFragment.import(imageRunFragment)
          }
          xmlFragment.import(imageParagraphFragment)
        }
        isInParagraph = false
      }
      else if (isVText(childVNode) || inlineTags.includes(childVNode.tagName)) {
        if (!isInParagraph) {
          paragraphFrag = xmlFragment.ele("@w", "p")
          isInParagraph = true
        }

        if (isVText(childVNode)) {
          // Handle text node by creating a run directly
          const runFragment = await xmlBuilder.buildRun(
            childVNode,
            childParentAttributes,
            docxDocumentInstance,
          )
          if (Array.isArray(runFragment)) {
            for (const frag of runFragment) {
              paragraphFrag.import(frag)
            }
          }
          else {
            paragraphFrag.import(runFragment)
          }
        }
        else if (isVNode(childVNode) && childVNode.tagName === "br") {
          // Handle br elements specially - just add the line break run
          const runFragment = await xmlBuilder.buildRun(
            childVNode,
            childParentAttributes,
            docxDocumentInstance,
          )
          if (Array.isArray(runFragment)) {
            for (const frag of runFragment) {
              paragraphFrag.import(frag)
            }
          }
          else {
            paragraphFrag.import(runFragment)
          }
        }
        else {
          // Handle other inline elements
          await convertVTreeToXML(
            docxDocumentInstance,
            childVNode,
            paragraphFrag,
            childParentAttributes,
          )
        }
      }
      else {
        await convertVTreeToXML(
          docxDocumentInstance,
          childVNode,
          xmlFragment,
          childParentAttributes,
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
  parentAttributes: Attributes = {},
) {
  if (!vTree) {
    // Do nothing
  }
  else if (Array.isArray(vTree) && vTree.length) {
    for (let index = 0; index < vTree.length; index++) {
      const vNode = vTree[index]
      await convertVTreeToXML(
        docxDocumentInstance,
        vNode,
        xmlFragment,
        parentAttributes,
      )
    }
  }
  else if (isVNode(vTree)) {
    await findXMLEquivalent(
      docxDocumentInstance,
      vTree,
      xmlFragment,
      parentAttributes,
    )
  }
  else if (isVText(vTree)) {
    const paragraphFragment = await xmlBuilder.buildParagraph(
      vTree as VText,
      parentAttributes,
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
