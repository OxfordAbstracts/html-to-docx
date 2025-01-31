/* eslint-disable no-case-declarations */
import { default as HTMLToVDOM } from "html-to-vdom"
import sizeOf from "image-size"
import isVNode from "virtual-dom/vnode/is-vnode.js"
import isVText from "virtual-dom/vnode/is-vtext.js"
import VNode from "virtual-dom/vnode/vnode.js"
import VText from "virtual-dom/vnode/vtext.js"
import { fragment } from "xmlbuilder2"

import { imageType, internalRelationship } from "../constants.ts"
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
  docxDocumentInstance,
  vNode,
  maximumWidth = null,
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
      .folder("media")
      .file(
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
    const imageProperties = sizeOf(imageBuffer)

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

export async function buildList(vNode, docxDocumentInstance, xmlFragment) {
  const listElements = []

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

    if (
      tempVNodeObject.node.children &&
      tempVNodeObject.node.children.length &&
      ["ul", "ol", "li"].includes(tempVNodeObject.node.tagName)
    ) {
      const tempVNodeObjects = tempVNodeObject.node.children.reduce(
        (accumulator, childVNode) => {
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

async function findXMLEquivalent(docxDocumentInstance, vNode, xmlFragment) {
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

  switch (vNode.tagName) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      const headingFragment = await xmlBuilder.buildParagraph(
        vNode,
        {
          paragraphStyle: `Heading${vNode.tagName[1]}`,
        },
        docxDocumentInstance,
      )
      xmlFragment.import(headingFragment)
      return
    case "span":
    case "strong":
    case "b":
    case "em":
    case "i":
    case "u":
    case "ins":
    case "strike":
    case "del":
    case "s":
    case "sub":
    case "sup":
    case "mark":
    case "p":
    case "a":
    case "blockquote":
    case "code":
    case "pre":
      const paragraphFragment = await xmlBuilder.buildParagraph(
        vNode,
        {},
        docxDocumentInstance,
      )
      xmlFragment.import(paragraphFragment)
      return
    case "figure":
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
            )
            xmlFragment.import(emptyParagraphFragment)
          }
          else if (childVNode.tagName === "img") {
            const imageFragment = await buildImage(
              docxDocumentInstance,
              childVNode,
            )
            if (imageFragment) {
              xmlFragment.import(imageFragment)
            }
          }
        }
      }
      return
    case "table":
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
      const emptyParagraphFragment = await xmlBuilder.buildParagraph(null, {})
      xmlFragment.import(emptyParagraphFragment)
      return
    case "ol":
    case "ul":
      await buildList(vNode, docxDocumentInstance, xmlFragment)
      return
    case "img":
      const imageFragment = await buildImage(docxDocumentInstance, vNode)
      if (imageFragment) {
        xmlFragment.import(imageFragment)
      }
      return
    case "br":
      const linebreakFragment = await xmlBuilder.buildParagraph(null, {})
      xmlFragment.import(linebreakFragment)
      return
    case "head":
      return
    default:
      break
  }
  if (vNodeHasChildren(vNode)) {
    for (let index = 0; index < vNode.children.length; index++) {
      const childVNode = vNode.children[index]

      await convertVTreeToXML(docxDocumentInstance, childVNode, xmlFragment)
    }
  }
}

export async function convertVTreeToXML(
  docxDocumentInstance,
  vTree,
  xmlFragment,
) {
  if (!vTree) {
    return ""
  }
  if (Array.isArray(vTree) && vTree.length) {
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
      vTree,
      {},
      docxDocumentInstance,
    )
    xmlFragment.import(paragraphFragment)
  }
  return xmlFragment
}

export default async function renderDocumentFile(docxDocumentInstance) {
  const vTree = convertHTML(docxDocumentInstance.htmlString)

  const xmlFragment = fragment({ namespaceAlias: { w: namespaces.w } })

  const populatedXmlFragment = await convertVTreeToXML(
    docxDocumentInstance,
    vTree,
    xmlFragment,
  )

  return populatedXmlFragment
}
