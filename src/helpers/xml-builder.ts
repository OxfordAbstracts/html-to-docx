/* eslint-disable new-cap */

import { default as colorNames } from "color-name"
import { imageSize } from "image-size"
import lodash from "lodash"
import type { VNode, VText, VTree } from "virtual-dom"
// @ts-expect-error  Could not find a declaration file
import isVNode from "virtual-dom/vnode/is-vnode.js"
// @ts-expect-error  Could not find a declaration file
import isVText from "virtual-dom/vnode/is-vtext.js"
// @ts-expect-error  Could not find a declaration file
import VTextConstructor from "virtual-dom/vnode/vtext.js"
// @ts-expect-error  Could not find a declaration file
import VNodeConstructor from "virtual-dom/vnode/vnode.js"
import { fragment } from "xmlbuilder2"

import JSZip from "jszip"
import type { XMLBuilder } from "xmlbuilder2/lib/interfaces.d.ts"
import {
  colorlessColors,
  defaultFont,
  hyperlinkType,
  imageType,
  internalRelationship,
  paragraphBordersObject,
  verticalAlignValues,
} from "../constants.ts"
import DocxDocument from "../docx-document.ts"
import namespaces from "../namespaces.ts"
import { extractBase64Data, fetchImageToDataUrl } from "../utils/base64.ts"
import {
  hex3Regex,
  hex3ToHex,
  hexRegex,
  hslRegex,
  hslToHex,
  rgbRegex,
  rgbToHex,
} from "../utils/color-conversion.ts"
import {
  cmRegex,
  cmToTWIP,
  emRegex,
  emToEmu,
  HIPToTWIP,
  inchRegex,
  inchToTWIP,
  percentageRegex,
  pixelRegex,
  pixelToEIP,
  pixelToEMU,
  pixelToHIP,
  pixelToTWIP,
  pointRegex,
  pointToEIP,
  pointToHIP,
  pointToTWIP,
  remRegex,
  remToEmu,
  TWIPToEMU,
} from "../utils/unit-conversion.ts"
import { isValidUrl } from "../utils/url.ts"
import { vNodeHasChildren } from "../utils/vnode.ts"
import { buildImage, buildList } from "./render-document-file.ts"

function fixupColorCode(colorCodeString: string): string {
  if (
    Object.prototype.hasOwnProperty.call(
      colorNames,
      colorCodeString.toLowerCase(),
    )
  ) {
    const [red, green, blue]: [number, number, number] =
      Object.prototype.hasOwnProperty.call(
        colorNames,
        colorCodeString.toLowerCase(),
      )
        ? colorNames[colorCodeString.toLowerCase() as keyof typeof colorNames]
        : [0, 0, 0]

    return rgbToHex(red, green, blue)
  }
  else if (rgbRegex.test(colorCodeString)) {
    const matchedParts = colorCodeString.match(rgbRegex)
    const red = matchedParts?.[1]
    const green = matchedParts?.[2]
    const blue = matchedParts?.[3]

    return rgbToHex(red, green, blue)
  }
  else if (hslRegex.test(colorCodeString)) {
    const matchedParts = colorCodeString.match(hslRegex)
    const hue = Number(matchedParts?.[1])
    const saturation = Number(matchedParts?.[2])
    const luminosity = Number(matchedParts?.[3])

    return hslToHex(hue, saturation, luminosity)
  }
  else if (hexRegex.test(colorCodeString)) {
    const matchedParts = colorCodeString.match(hexRegex)

    return matchedParts?.[1] || ""
  }
  else if (hex3Regex.test(colorCodeString)) {
    const matchedParts = colorCodeString.match(hex3Regex)
    const red = Number(matchedParts?.[1])
    const green = Number(matchedParts?.[2])
    const blue = Number(matchedParts?.[3])

    return hex3ToHex(red, green, blue)
  }
  else {
    return "000000"
  }
}

function buildRunFontFragment(fontName = defaultFont) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "rFonts")
    .att("@w", "ascii", fontName)
    .att("@w", "hAnsi", fontName)
    .att("@w", "eastAsia", fontName)
    .att("@w", "cs", fontName)
    .up()
}

function buildRunStyleFragment(type = "Hyperlink") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "rStyle")
    .att("@w", "val", type)
    .up()
}

function buildTableRowHeight(tableRowHeight: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "trHeight")
    .att("@w", "val", String(tableRowHeight))
    .att("@w", "hRule", "atLeast")
    .up()
}

function buildVerticalAlignment(verticalAlignment: string) {
  const vertAlign = verticalAlignment.toLowerCase() === "middle"
    ? "center"
    : verticalAlignment

  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "vAlign")
    .att("@w", "val", vertAlign)
    .up()
}

function buildVerticalMerge(verticalMerge = "continue") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "vMerge")
    .att("@w", "val", verticalMerge)
    .up()
}

function buildColor(colorCode: string) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "color")
    .att("@w", "val", colorCode)
    .up()
}

function buildShading(colorCode: string) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "shd")
    .att("@w", "val", "clear")
    .att("@w", "fill", colorCode)
    .up()
}

function buildHighlight(color = "yellow") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "highlight")
    .att("@w", "val", color)
    .up()
}

function buildVertAlign(type = "baseline") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "vertAlign")
    .att("@w", "val", type)
    .up()
}

function buildStrike() {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "strike")
    .att("@w", "val", "true")
    .up()
}

function buildBold() {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "b")
    .up()
}

function buildItalics() {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "i")
    .up()
}

function buildUnderline(type = "single") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "u")
    .att("@w", "val", type)
    .up()
}

function buildLineBreak(type = "textWrapping") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "br")
    .att("@w", "type", type)
    .up()
}

function buildBorder(
  borderSide = "top",
  borderSize = 0,
  borderSpacing = 0,
  borderColor = fixupColorCode("black"),
  borderStroke = "single",
) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", borderSide)
    .att("@w", "val", borderStroke)
    .att("@w", "sz", String(borderSize))
    .att("@w", "space", String(borderSpacing))
    .att("@w", "color", borderColor)
    .up()
}

function buildTextElement(text: string, preserveWhitespace: boolean = false) {
  const normalizedText = preserveWhitespace
    ? text
    : (() => {
      // Normalize according to CSS whitespace rules (white-space: normal)
      // 1. All spaces/tabs immediately before & after a line break are ignored.
      // 2. Line breaks themselves are converted to spaces.
      // 3. Any space immediately following another space
      //    (even across inline elements) is ignored
      //    -> Collapse consecutive spaces to a single space
      // 4. Do NOT trim leading/trailing spaces here because they may be
      //    meaningful when concatenated with neighboring inline elements

      // Unify different line-ending styles to "\n" (Windows, macOS, etc.)
      let t = text.replace(/\r\n?/g, "\n")

      // Remove spaces/tabs *before* a line break
      t = t.replace(/[ \t]+\n/g, "\n")

      // Remove spaces/tabs *after* a line break
      t = t.replace(/\n[ \t]+/g, "\n")

      // Convert the remaining line breaks to single spaces
      t = t.replace(/\n/g, " ")

      // Collapse consecutive spaces into one
      t = t.replace(/ {2,}/g, " ")

      // Handle HTML formatting whitespace:
      // Trim leading/trailing spaces that come from HTML indentation
      if (/^ {2,}/.test(text)) {
        // Remove all leading spaces - they're from HTML indentation
        t = t.replace(/^ +/, "")
        // Also trim trailing space if the text had leading indentation
        // (likely the whole text node is affected by HTML formatting)
        t = t.replace(/ +$/, "")
      }

      // Also handle newline-based indentation
      if (text.includes("\n")) {
        // Check if text starts with newline + spaces (HTML indentation)
        if (/^\n\s+/.test(text)) {
          // Remove leading space that came from newline conversion
          t = t.replace(/^ /, "")
        }
        // Check if text ends with newline + spaces (HTML indentation)
        if (/\s+\n$/.test(text)) {
          // Remove trailing space that came from newline conversion
          t = t.replace(/ $/, "")
        }
      }

      return t
    })()
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "t")
    .att("@xml", "space", "preserve")
    .txt(normalizedText)
    .up()
}

function buildTextElementsWithSpaceSeparation(
  text: string,
  preserveWhitespace: boolean = false,
  attributes: Attributes = {},
): XMLBuilder[] {
  if (preserveWhitespace) {
    // If preserving whitespace, create single run
    const runFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "r")
    const runPropertiesFragment = buildRunProperties(attributes)
    if (runPropertiesFragment) {
      runFragment.import(runPropertiesFragment)
    }
    const textFragment = buildTextElement(text, preserveWhitespace)
    runFragment.import(textFragment)
    return [runFragment]
  }

  // Apply text normalization first
  const normalizedText = (() => {
    let t = text.replace(/\r\n?/g, "\n")
    t = t.replace(/[ \t]+\n/g, "\n")
    t = t.replace(/\n[ \t]+/g, "\n")

    // Check if original text starts with newline + content
    // (HTML formatting whitespace)
    // BEFORE converting newlines to spaces
    const startsWithNewlineAndContent = /^\n\S/.test(t)

    t = t.replace(/\n/g, " ")
    t = t.replace(/ {2,}/g, " ")

    if (/^ {2,}/.test(text)) {
      t = t.replace(/^ +/, "")
      t = t.replace(/ +$/, "")
    }

    if (text.includes("\n")) {
      // If text originally started with newline, remove the leading space
      // For when HTML formatting adds newlines before content
      if (/^\n/.test(text)) {
        t = t.replace(/^ +/, "")
      }
      if (/\s+\n$/.test(text)) {
        t = t.replace(/ +$/, "")
      }
    }

    // Handle HTML formatting whitespace at document/paragraph start.
    // If text starts with a single space followed by uppercase letter,
    // it's likely from HTML formatting (like newlines between tags)
    // at document start and should be removed for proper document flow.
    // Be very specific to avoid removing legitimate spaces between elements
    if (/^ [A-Z]/.test(t) && !startsWithNewlineAndContent) {
      // Only remove if it's a single space, not multiple spaces
      // (which might be intentional)
      if (!/^ {2}/.test(t)) {
        t = t.replace(/^ /, "")
      }
    }

    // Also handle the newline case
    if (startsWithNewlineAndContent) {
      t = t.replace(/^ /, "")
    }

    return t
  })()

  // Check for leading and trailing spaces in normalized text
  const leadingSpace = normalizedText.match(/^(\s+)/)
  const trailingSpace = normalizedText.match(/(\s+)$/)
  const trimmedText = normalizedText.trim()

  const runs: XMLBuilder[] = []

  // Add leading space run if exists
  if (leadingSpace) {
    const spaceRunFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "r")
    const runPropertiesFragment = buildRunProperties(attributes)
    if (runPropertiesFragment) {
      spaceRunFragment.import(runPropertiesFragment)
    }
    const spaceTextFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "t")
      .att("@xml", "space", "preserve")
      .txt(leadingSpace[1])
      .up()
    spaceRunFragment.import(spaceTextFragment)
    runs.push(spaceRunFragment)
  }

  // Add main text run if exists
  if (trimmedText) {
    const mainRunFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "r")
    const runPropertiesFragment = buildRunProperties(attributes)
    if (runPropertiesFragment) {
      mainRunFragment.import(runPropertiesFragment)
    }
    const mainTextFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "t")
      .att("@xml", "space", "preserve")
      .txt(trimmedText)
      .up()
    mainRunFragment.import(mainTextFragment)
    runs.push(mainRunFragment)
  }

  // Add trailing space run if exists and different from leading space
  if (
    trailingSpace &&
    (!leadingSpace || trailingSpace[1] !== leadingSpace[1] || trimmedText)
  ) {
    const spaceRunFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "r")
    const runPropertiesFragment = buildRunProperties(attributes)
    if (runPropertiesFragment) {
      spaceRunFragment.import(runPropertiesFragment)
    }
    const spaceTextFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "t")
      .att("@xml", "space", "preserve")
      .txt(trailingSpace[1])
      .up()
    spaceRunFragment.import(spaceTextFragment)
    runs.push(spaceRunFragment)
  }

  // If no runs were created, but we have text (even if all whitespace),
  // create a run with the original text behavior
  if (runs.length === 0) {
    const emptyRunFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "r")
    const runPropertiesFragment = buildRunProperties(attributes)
    if (runPropertiesFragment) {
      emptyRunFragment.import(runPropertiesFragment)
    }

    // Use original text handling for empty/whitespace-only cases
    const textFragment = buildTextElement(normalizedText, preserveWhitespace)
    emptyRunFragment.import(textFragment)

    runs.push(emptyRunFragment)
  }

  return runs
}

function fixupLineHeight(lineHeight?: number, fontSize?: number): number {
  if (Number.isFinite(lineHeight)) {
    if (Number.isFinite(fontSize)) {
      const actualLineHeight = Number(lineHeight) * Number(fontSize)

      return HIPToTWIP(actualLineHeight)
    }
    else {
      // 240 TWIP or 12 point is default line height
      return Number(lineHeight) * 240
    }
  }
  else {
    // 240 TWIP or 12 point is default line height
    return 240
  }
}

export function fixupFontSize(fontSizeString: string): number {
  if (pointRegex.test(fontSizeString)) {
    const matchedParts = fontSizeString.match(pointRegex)
    // convert point to half point
    return pointToHIP(Number(matchedParts?.[1]))
  }
  else if (pixelRegex.test(fontSizeString)) {
    const matchedParts = fontSizeString.match(pixelRegex)
    // convert pixels to half point
    return pixelToHIP(Number(matchedParts?.[1]))
  }
  else {
    // Return default font size
    return 24
  }
}

function fixupRowHeight(rowHeightString: string) {
  if (pointRegex.test(rowHeightString)) {
    const matchedParts = rowHeightString.match(pointRegex)
    // convert point to half point
    return pointToTWIP(Number(matchedParts?.[1]))
  }
  else if (pixelRegex.test(rowHeightString)) {
    const matchedParts = rowHeightString.match(pixelRegex)
    // convert pixels to half point
    return pixelToTWIP(Number(matchedParts?.[1]))
  }
  else if (cmRegex.test(rowHeightString)) {
    const matchedParts = rowHeightString.match(cmRegex)
    return cmToTWIP(Number(matchedParts?.[1]))
  }
  else if (inchRegex.test(rowHeightString)) {
    const matchedParts = rowHeightString.match(inchRegex)
    return inchToTWIP(Number(matchedParts?.[1]))
  }
}

function fixupColumnWidth(columnWidth: string | number) {
  if (typeof columnWidth === "number") {
    return columnWidth
  }

  if (pointRegex.test(columnWidth)) {
    const matchedParts = columnWidth.match(pointRegex)
    return pointToTWIP(Number(matchedParts?.[1]))
  }
  else if (pixelRegex.test(columnWidth)) {
    const matchedParts = columnWidth.match(pixelRegex)
    return pixelToTWIP(Number(matchedParts?.[1]))
  }
  else if (cmRegex.test(columnWidth)) {
    const matchedParts = columnWidth.match(cmRegex)
    return cmToTWIP(Number(matchedParts?.[1]))
  }
  else if (inchRegex.test(columnWidth)) {
    const matchedParts = columnWidth.match(inchRegex)
    return inchToTWIP(Number(matchedParts?.[1]))
  }
  else {
    return columnWidth
  }
}

function fixupMargin(marginString: string) {
  if (pointRegex.test(marginString)) {
    const matchedParts = marginString.match(pointRegex)
    // convert point to half point
    return pointToTWIP(Number(matchedParts?.[1]))
  }
  else if (pixelRegex.test(marginString)) {
    const matchedParts = marginString.match(pixelRegex)
    // convert pixels to half point
    return pixelToTWIP(Number(matchedParts?.[1]))
  }
}

function modifiedStyleAttributesBuilder(
  docxDocumentInstance: DocxDocument,
  vNode: VTree | null,
  attributes: Attributes,
  options = { isParagraph: false },
) {
  const modifiedAttributes = { ...attributes }

  // styles
  if (vNode && isVNode(vNode)) {
    const properties = (vNode as VNode).properties
    if (properties && properties.style) {
      if (
        properties.style.color &&
        !colorlessColors.includes(properties.style.color)
      ) {
        modifiedAttributes.color = fixupColorCode(properties.style.color)
      }
      if (
        properties.style["text-decoration"] &&
        properties.style["text-decoration"].includes("underline")
      ) {
        modifiedAttributes.u = true
      }

      if (
        properties.style["background-color"] &&
        !colorlessColors.includes(properties.style["background-color"])
      ) {
        modifiedAttributes.backgroundColor = fixupColorCode(
          properties.style["background-color"],
        )
      }

      if (
        properties.style["vertical-align"] &&
        verticalAlignValues.includes(properties.style["vertical-align"])
      ) {
        modifiedAttributes.verticalAlign = properties.style["vertical-align"]
      }

      if (
        properties.style["text-align"] &&
        ["left", "right", "center", "justify"].includes(
          properties.style["text-align"],
        )
      ) {
        modifiedAttributes.textAlign = properties.style["text-align"]
      }

      // FIXME: remove bold check when other font weights are handled.
      if (
        properties.style["font-weight"] &&
        properties.style["font-weight"] === "bold"
      ) {
        modifiedAttributes.strong = true
      }
      if (
        properties.style["font-style"] &&
        properties.style["font-style"] === "italic"
      ) {
        modifiedAttributes.i = true
      }
      if (properties.style["font-family"] || properties.style.fontFamily) {
        modifiedAttributes.font = docxDocumentInstance.createFont(
          properties.style.fontFamily || properties.style["font-family"],
        )
      }
      const fontSizeValue = properties.style.fontSize ||
        properties.style["font-size"]
      if (fontSizeValue) {
        modifiedAttributes.fontSize = fixupFontSize(String(fontSizeValue))
      }
      if (properties.style["line-height"]) {
        modifiedAttributes.lineHeight = fixupLineHeight(
          properties.style["line-height"],
          properties.style["font-size"]
            ? fixupFontSize(properties.style["font-size"])
            : undefined,
        )
      }
      if (
        properties.style["margin-left"] ||
        properties.style["margin-right"]
      ) {
        const leftMargin = fixupMargin(properties.style["margin-left"])
        const rightMargin = fixupMargin(properties.style["margin-right"])

        if (leftMargin || rightMargin) {
          modifiedAttributes.indentation = {
            left: leftMargin,
            right: rightMargin,
          }
        }
      }
      if (properties.style.display) {
        modifiedAttributes.display = properties.style.display
      }

      if (properties.style.width) {
        modifiedAttributes.width = properties.style.width
      }
    }

    // Styles coming from CSS classes
    const props = (vNode as VNode).properties || {}
    const classAttr = props.className || props.class ||
      (props.attributes && props.attributes.class) || ""
    if (classAttr && docxDocumentInstance.cssClassStyles) {
      classAttr
        .toString()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((cls: string) => {
          const clsStyles = docxDocumentInstance.cssClassStyles[cls]
          if (clsStyles) {
            // font-size
            if (clsStyles["font-size"] && !modifiedAttributes.fontSize) {
              modifiedAttributes.fontSize = fixupFontSize(
                clsStyles["font-size"],
              )
            }
            // font-weight
            if (
              clsStyles["font-weight"] &&
              clsStyles["font-weight"] === "bold" &&
              !modifiedAttributes.strong
            ) {
              modifiedAttributes.strong = true
            }
            // font-style
            if (
              clsStyles["font-style"] &&
              clsStyles["font-style"] === "italic" &&
              !modifiedAttributes.i
            ) {
              modifiedAttributes.i = true
            }
            // font-family
            if (clsStyles["font-family"] && !modifiedAttributes.font) {
              modifiedAttributes.font = docxDocumentInstance.createFont(
                clsStyles["font-family"],
              )
            }
          }
        })
    }
  }

  // paragraph only
  if (options?.isParagraph) {
    if (vNode && isVNode(vNode) && (vNode as VNode).tagName === "blockquote") {
      modifiedAttributes.indentation = { left: 284, right: 0 }
      modifiedAttributes.textAlign = "justify"
    }
    else if (vNode && isVNode(vNode) && (vNode as VNode).tagName === "code") {
      modifiedAttributes.highlightColor = "lightGray"
    }
    else if (vNode && isVNode(vNode) && (vNode as VNode).tagName === "pre") {
      modifiedAttributes.font = "Courier"
    }
  }

  return modifiedAttributes
}

function buildFormatting(
  htmlTag: string,
  options: { color?: string; fontSize?: number; font?: string },
) {
  switch (htmlTag) {
    case "strong":
    case "b":
      return buildBold()
    case "em":
    case "i":
      return buildItalics()
    case "ins":
    case "u":
      return buildUnderline()
    case "strike":
    case "del":
    case "s":
      return buildStrike()
    case "sub":
      return buildVertAlign("subscript")
    case "sup":
      return buildVertAlign("superscript")
    case "mark":
      return buildHighlight()
    case "code":
      return buildHighlight("lightGray")
    case "highlightColor":
      if (options.color) {
        return buildHighlight(options.color)
      }
      break
    case "font":
      if (options.font) {
        return buildRunFontFragment(options.font)
      }
      break
    case "pre":
      return buildRunFontFragment("Courier")
    case "color":
      if (options.color) {
        return buildColor(options.color)
      }
      break
    case "backgroundColor":
      if (options.color) {
        return buildShading(options.color)
      }
      break
    case "fontSize": {
      // Only add font size formatting if a value was explicitly provided.
      if (typeof options.fontSize === "undefined") {
        return null
      }
      const fsValue = options.fontSize
      const szFragment = fragment({ namespaceAlias: { w: namespaces.w } })
        .ele("w:sz", { "w:val": String(fsValue) })
        .up()
      const szCsFragment = fragment({ namespaceAlias: { w: namespaces.w } })
        .ele("w:szCs", { "w:val": String(fsValue) })
        .up()
      return fragment()
        .import(szFragment)
        .import(szCsFragment)
    }
    case "hyperlink":
      return buildRunStyleFragment("Hyperlink")
    default:
      break
  }

  return null
}
export type Attributes = {
  color?: string
  fontSize?: number
  font?: string
  description?: string
  backgroundColor?: string
  highlightColor?: string
  numbering?: { levelId: number; numberingId: number }
  textAlign?: "left" | "center" | "justify"
  strong?: boolean
  i?: boolean
  u?: boolean
  sub?: boolean
  sup?: boolean
  type?: string
  graphicType?: "picture"
  indentation?: { left?: number; right?: number }
  verticalAlign?: string
  lineHeight?: number
  beforeSpacing?: number
  afterSpacing?: number
  paragraphStyle?: string
  hyperlink?: boolean
  display?: string
  height?: number
  width?: number
  maximumWidth?: number
  originalWidth?: number
  originalHeight?: number
  inlineOrAnchored?: boolean
  relationshipId?: number
  id?: number
  fileContent?: string
  fileNameWithExtension?: string
  tableRowHeight?: number
  rowCantSplit?: boolean
  rowSpan?: string
  colSpan?: number
  tableCellBorder?: {
    top: number
    bottom: number
    left: number
    right: number
    color: string
    stroke: string
  }
  tableBorder?: {
    top: number
    bottom: number
    left: number
    right: number
    stroke: string
    color: string
    insideV: number
    insideH: number
  }
  tableCellSpacing?: number
}

function buildRunProperties(attributes: Attributes) {
  const keys = Object.keys(attributes)

  if (keys.length && (keys[0] !== "textAlign" || keys.length > 1)) {
    const runPropertiesFragment = fragment({
      namespaceAlias: { w: namespaces.w },
    })
      .ele("@w", "rPr")

    keys.forEach((key) => {
      const options = {
        color: key === "color" ||
            key === "backgroundColor" ||
            key === "highlightColor"
          ? attributes[key] || undefined
          : undefined,
        fontSize: key === "fontSize" ? attributes.fontSize : undefined,
        font: key === "font" ? attributes.font : undefined,
      }

      const formattingFragment = buildFormatting(key, options)
      if (formattingFragment) {
        runPropertiesFragment.import(formattingFragment)
      }
    })

    // @ts-expect-error Property 'rPr' does not exist
    const attrs = Object.keys(runPropertiesFragment.toObject()?.rPr)

    if (attrs?.[0] === "@xmlns" && attrs.length === 1) {
      return null // No actual formatting properties, just namespace
    }

    return runPropertiesFragment
  }
}

async function buildRun(
  vNode: VTree | null,
  attributes: Attributes,
  docxDocumentInstance: DocxDocument,
  preserveWhitespace: boolean = false,
): Promise<XMLBuilder | XMLBuilder[]> {
  // Apply additional style changes (e.g. those coming from CSS
  // classes on the current node) before we start building the
  // run properties. This guarantees attributes such as font-size
  // are present even when the node itself is <strong>, <em>, …
  attributes = modifiedStyleAttributesBuilder(
    docxDocumentInstance,
    isVNode(vNode) ? (vNode as VNode) : null,
    { ...attributes },
  )
  const runFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "r")
  const runPropertiesFragment = buildRunProperties(
    lodash.cloneDeep(attributes),
  )

  // case where we have recursive spans representing font changes
  if (isVNode(vNode) && (vNode as VNode).tagName === "span") {
    return buildRunOrRuns(
      vNode as VNode,
      attributes,
      docxDocumentInstance,
      preserveWhitespace,
    )
  }

  if (
    vNode &&
    isVNode(vNode) &&
    [
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ins",
      "strike",
      "del",
      "s",
      "sub",
      "sup",
      "mark",
      "code",
      "pre",
    ].includes((vNode as VNode).tagName)
  ) {
    const runFragmentsArray: XMLBuilder[] = []

    let vNodes = [vNode]
    // create temp run fragments to split the paragraph into different runs
    let tempAttributes = lodash.cloneDeep(attributes)
    while (vNodes.length) {
      const tempVNode = vNodes.shift()
      if (isVText(tempVNode)) {
        // Use space separation logic to create multiple runs if needed
        const textRuns = buildTextElementsWithSpaceSeparation(
          (tempVNode as VText).text,
          preserveWhitespace,
          {
            ...attributes,
            ...tempAttributes,
          },
        )

        // Add all generated runs to the array
        runFragmentsArray.push(...textRuns)

        // re initialize temp run fragments with new fragment
        tempAttributes = lodash.cloneDeep(attributes)
      }
      else if (isVNode(tempVNode)) {
        if (
          [
            "strong",
            "b",
            "em",
            "i",
            "u",
            "ins",
            "strike",
            "del",
            "s",
            "sub",
            "sup",
            "mark",
            "code",
            "pre",
          ].includes((tempVNode as VNode).tagName)
        ) {
          switch ((tempVNode as VNode).tagName) {
            case "strong":
            case "b":
              tempAttributes.strong = true
              break
            case "i":
            case "em":
              tempAttributes.i = true
              break
            case "u":
              tempAttributes.u = true
              break
            case "sub":
              tempAttributes.sub = true
              break
            case "sup":
              tempAttributes.sup = true
              break
            default:
              break
          }
          const formattingFragment = buildFormatting(
            (tempVNode as VNode).tagName,
            {},
          )

          if (runPropertiesFragment && formattingFragment) {
            runPropertiesFragment.import(formattingFragment)
          }
          // go a layer deeper if there is a span somewhere in the children
        }
        else if ((tempVNode as VNode).tagName === "span") {
          const spanFragment = await buildRunOrRuns(
            tempVNode as VNode,
            { ...attributes, ...tempAttributes },
            docxDocumentInstance,
            preserveWhitespace,
          )

          // if spanFragment is an array,
          // we need to add each fragment to the runFragmentsArray.
          // If the fragment is an array,
          // perform a depth first search on the array
          // to add each fragment to the runFragmentsArray
          if (Array.isArray(spanFragment)) {
            spanFragment.flat(Infinity)
            runFragmentsArray.push(...spanFragment)
          }
          else {
            runFragmentsArray.push(spanFragment)
          }

          // do not slice and concat children
          // since this is already accounted for in the buildRunOrRuns function

          continue
        }
      }

      if ((tempVNode as VNode).children?.length) {
        if ((tempVNode as VNode).children.length > 1) {
          attributes = { ...attributes, ...tempAttributes }
        }

        vNodes = (tempVNode as VNode).children.slice()
          .concat(vNodes)
      }
    }
    if (runFragmentsArray.length) {
      return runFragmentsArray
    }
  }

  if (runPropertiesFragment) {
    runFragment.import(runPropertiesFragment)
  }
  if (isVText(vNode)) {
    // Use space separation logic to create multiple runs if needed
    const textRuns = buildTextElementsWithSpaceSeparation(
      (vNode as VText).text,
      preserveWhitespace,
      attributes,
    )

    // If multiple runs are created, return them as array
    if (textRuns.length > 1) {
      return textRuns
    }
    else if (textRuns.length === 1) {
      // If only one run, return it directly
      return textRuns[0]
    }
    // If no runs (empty case), continue with original logic
    const textFragment = buildTextElement(
      (vNode as VText).text,
      preserveWhitespace,
    )
    runFragment.import(textFragment)
  }
  else if (attributes && attributes.type === "picture") {
    let response = null

    // Convert URL to data URL if needed
    if (isValidUrl((vNode as VNode).properties.src)) {
      ;(vNode as VNode).properties.src = await fetchImageToDataUrl(
        (vNode as VNode).properties.src,
      )
    }

    const base64Uri = decodeURIComponent((vNode as VNode).properties.src)
    if (base64Uri) {
      response = docxDocumentInstance.createMediaFile(base64Uri)
    }

    if (response) {
      ;(docxDocumentInstance.zip as JSZip)
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

      attributes.inlineOrAnchored = true
      attributes.relationshipId = documentRelsId
      attributes.id = response.id
      attributes.fileContent = response.fileContent
      attributes.fileNameWithExtension = response.fileNameWithExtension
    }

    const imageFragment = buildDrawing(attributes)
    runFragment.import(imageFragment)
  }
  else if (isVNode(vNode) && (vNode as VNode).tagName === "br") {
    const lineBreakFragment = buildLineBreak()
    runFragment.import(lineBreakFragment)
  }
  else if (isVNode(vNode) && vNodeHasChildren(vNode as VNode)) {
    // Handle inline elements with children (like cite, a, etc.)
    // Extract text content from children recursively
    function extractTextFromChildren(children: VTree[]): string {
      return children.map(child => {
        if (isVText(child)) {
          return (child as VText).text
        }
        else if (isVNode(child) && (child as VNode).children) {
          return extractTextFromChildren((child as VNode).children)
        }
        return ""
      })
        .join("")
    }

    const textContent = extractTextFromChildren((vNode as VNode).children)
    if (textContent.trim()) {
      const textFragment = buildTextElement(textContent, preserveWhitespace)
      runFragment.import(textFragment)
    }
  }
  else if (isVNode(vNode) && (vNode as VNode).tagName === "img") {
    // img nodes should not create runs directly - they should be handled by the
    // picture attributes. If we get here, it means the img wasn't processed
    // correctly, so return empty fragment
    return fragment({ namespaceAlias: { w: namespaces.w } })
  }

  runFragment.up()
  return runFragment
}

async function buildRunOrRuns(
  vNode: VNode | VTree | null,
  attributes: Attributes,
  docxDocumentInstance: DocxDocument,
  preserveWhitespace: boolean = false,
): Promise<XMLBuilder | XMLBuilder[]> {
  if (vNode && isVNode(vNode) && (vNode as VNode).tagName === "span") {
    let runFragments: XMLBuilder[] = []

    for (let index = 0; index < (vNode as VNode).children.length; index++) {
      const childVNode = (vNode as VNode).children[index]
      const modifiedAttributes = modifiedStyleAttributesBuilder(
        docxDocumentInstance,
        vNode,
        attributes,
      )

      // Handle image dimension computation for images within spans
      if (isVNode(childVNode) && (childVNode as VNode).tagName === "img") {
        if (isValidUrl((childVNode as VNode).properties.src)) {
          ;(childVNode as VNode).properties.src = await fetchImageToDataUrl(
            (childVNode as VNode).properties.src,
          )
        }
        const base64String = extractBase64Data(
          (childVNode as VNode).properties.src,
        )?.base64Content
        const imageBuffer = Buffer.from(
          decodeURIComponent(base64String || ""),
          "base64",
        )
        const imageProperties = imageSize(imageBuffer)

        modifiedAttributes.maximumWidth = modifiedAttributes.maximumWidth ||
          docxDocumentInstance.availableDocumentSpace
        modifiedAttributes.originalWidth = imageProperties.width
        modifiedAttributes.originalHeight = imageProperties.height

        computeImageDimensions(childVNode as VNode, modifiedAttributes)
      }

      const tempRunFragments = await buildRun(
        childVNode,
        modifiedAttributes,
        docxDocumentInstance,
        preserveWhitespace,
      )
      runFragments = runFragments.concat(
        Array.isArray(tempRunFragments) ? tempRunFragments : [tempRunFragments],
      )
    }

    return runFragments
  }
  else {
    const tempRunFragments = await buildRun(
      vNode,
      attributes,
      docxDocumentInstance,
      preserveWhitespace,
    )
    return tempRunFragments
  }
}

async function buildRunOrHyperLink(
  vNode: VNode,
  attributes: Attributes,
  docxDocumentInstance: DocxDocument,
  preserveWhitespace: boolean = false,
) {
  // Input elements should not generate any content in Docx files
  if (isVNode(vNode) && vNode.tagName === "input") {
    return fragment({ namespaceAlias: { w: namespaces.w } })
  }

  if (isVNode(vNode) && vNode.tagName === "a") {
    const relationshipId = docxDocumentInstance.createDocumentRelationships(
      docxDocumentInstance.relationshipFilename,
      hyperlinkType,
      vNode.properties && vNode.properties.href ? vNode.properties.href : "",
    )
    const hyperlinkFragment = fragment({
      namespaceAlias: { w: namespaces.w, r: namespaces.r },
    })
      .ele("@w", "hyperlink")
      .att("@r", "id", `rId${relationshipId}`)

    const modifiedAttributes = { ...attributes }
    modifiedAttributes.hyperlink = true

    const runFragments = await buildRunOrRuns(
      vNode.children[0] as VNode,
      modifiedAttributes,
      docxDocumentInstance,
      preserveWhitespace,
    )
    if (Array.isArray(runFragments)) {
      for (let index = 0; index < runFragments.length; index++) {
        const runFragment = runFragments[index]

        hyperlinkFragment.import(runFragment)
      }
    }
    else {
      hyperlinkFragment.import(runFragments)
    }
    hyperlinkFragment.up()

    return hyperlinkFragment
  }

  const runFragments = await buildRunOrRuns(
    vNode,
    attributes,
    docxDocumentInstance,
    preserveWhitespace,
  )

  return runFragments
}

function buildNumberingProperties(levelId: number, numberingId: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "numPr")
    .ele("@w", "ilvl")
    .att("@w", "val", String(levelId))
    .up()
    .ele("@w", "numId")
    .att("@w", "val", String(numberingId))
    .up()
}

function buildNumberingInstances() {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "num")
    .ele("@w", "abstractNumId")
    .up()
}

function buildSpacing(
  lineSpacing?: number,
  beforeSpacing?: number,
  afterSpacing?: number,
) {
  if (
    !Number.isFinite(lineSpacing) &&
    !Number.isFinite(beforeSpacing) &&
    !Number.isFinite(afterSpacing)
  ) {
    return
  }

  const spacingFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "spacing")

  if (Number.isFinite(lineSpacing)) {
    spacingFragment.att("@w", "line", String(lineSpacing))
  }
  if (Number.isFinite(beforeSpacing)) {
    spacingFragment.att("@w", "before", String(beforeSpacing))
  }
  if (Number.isFinite(afterSpacing)) {
    spacingFragment.att("@w", "after", String(afterSpacing))
  }

  spacingFragment
    .att("@w", "lineRule", "auto")
    .up()

  return spacingFragment
}

function buildIndentation({ left, right }: { left?: number; right?: number }) {
  if (!left && !right) {
    return
  }
  const indentationFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele("@w", "ind")

  if (left) {
    indentationFragment.att("@w", "left", String(left))
  }
  if (right) {
    indentationFragment.att("@w", "right", String(right))
  }

  indentationFragment.up()

  return indentationFragment
}

function buildPStyle(style = "Normal") {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "pStyle")
    .att("@w", "val", style)
    .up()
}

function buildHorizontalAlignment(
  horizontalAlignment: "left" | "justify" | "center",
) {
  const horAlign = horizontalAlignment === "justify"
    ? "both"
    : horizontalAlignment

  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "jc")
    .att("@w", "val", horAlign)
    .up()
}

function buildParagraphBorder() {
  const paragraphBorderFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele(
      "@w",
      "pBdr",
    )
  const bordersObject = lodash.cloneDeep(paragraphBordersObject)

  Object.keys(bordersObject)
    .forEach((borderName) => {
      const bName = borderName as "top" | "left" | "bottom" | "right"
      if (bordersObject[bName]) {
        const { size, spacing, color } = bordersObject[bName]

        const borderFragment = buildBorder(bName, size, spacing, color)
        paragraphBorderFragment.import(borderFragment)
      }
    })

  paragraphBorderFragment.up()

  return paragraphBorderFragment
}

function buildParagraphProperties(
  attributes: Attributes,
  forceEmpty: boolean = false,
) {
  const keys = Object.keys(attributes)
  let hasProperties = false

  const paragraphPropertiesFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele("@w", "pPr")

  if (keys.length) {
    keys.forEach((key) => {
      switch (key) {
        case "numbering": {
          if (
            attributes.numbering?.levelId &&
            attributes.numbering?.numberingId
          ) {
            const numberingPropertiesFragment = buildNumberingProperties(
              attributes.numbering.levelId,
              attributes.numbering.numberingId,
            )
            paragraphPropertiesFragment.import(numberingPropertiesFragment)
            hasProperties = true

            delete attributes.numbering
          }
          break
        }
        case "textAlign": {
          if (attributes.textAlign) {
            const horizontalAlignmentFragment = buildHorizontalAlignment(
              attributes.textAlign,
            )
            paragraphPropertiesFragment.import(horizontalAlignmentFragment)
            hasProperties = true

            delete attributes.textAlign
          }
          break
        }
        case "backgroundColor":
          // Add shading to Paragraph Properties only if display is block
          // Essentially if background color needs to be across the row
          if (
            attributes.backgroundColor && attributes.display === "block"
          ) {
            const shadingFragment = buildShading(attributes.backgroundColor)
            paragraphPropertiesFragment.import(shadingFragment)
            // FIXME: Inner padding in case of shaded paragraphs.
            const paragraphBorderFragment = buildParagraphBorder()
            paragraphPropertiesFragment.import(paragraphBorderFragment)
            hasProperties = true

            delete attributes.backgroundColor
          }
          break
        case "paragraphStyle": {
          if (attributes.paragraphStyle) {
            const pStyleFragment = buildPStyle(attributes.paragraphStyle)
            paragraphPropertiesFragment.import(pStyleFragment)
            hasProperties = true
            delete attributes.paragraphStyle
          }
          break
        }
        case "indentation": {
          if (attributes.indentation) {
            const indentationFragment = buildIndentation(
              attributes.indentation,
            )
            if (indentationFragment) {
              paragraphPropertiesFragment.import(indentationFragment)
              hasProperties = true
            }
            delete attributes.indentation
          }
          break
        }
        default:
          break
      }
    })
  }

  const spacingFragment = buildSpacing(
    attributes.lineHeight,
    attributes.beforeSpacing,
    attributes.afterSpacing,
  )

  delete attributes.lineHeight
  delete attributes.beforeSpacing
  delete attributes.afterSpacing

  if (spacingFragment) {
    paragraphPropertiesFragment.import(spacingFragment)
    hasProperties = true
  }

  // Return paragraph properties if there are actual properties or if forced
  if (hasProperties || forceEmpty) {
    paragraphPropertiesFragment.up()
    return paragraphPropertiesFragment
  }
  else {
    return null
  }
}

function computeImageDimensions(vNode: VNode, attributes: Attributes) {
  const { maximumWidth, originalWidth, originalHeight } = attributes
  const aspectRatio = (originalWidth || 0) / (originalHeight || 1)
  const maximumWidthInEMU = TWIPToEMU(maximumWidth || 0)
  let originalWidthInEMU = pixelToEMU(originalWidth || 0)
  let originalHeightInEMU = pixelToEMU(originalHeight || 0)
  if (originalWidthInEMU > maximumWidthInEMU) {
    originalWidthInEMU = maximumWidthInEMU
    originalHeightInEMU = Math.round(originalWidthInEMU / aspectRatio)
  }
  let modifiedHeight
  let modifiedWidth

  if (vNode.properties && vNode.properties.style) {
    const styleWidth = vNode.properties.style.width
    const styleHeight = vNode.properties.style.height

    if (styleWidth) {
      if (styleWidth !== "auto") {
        if (pixelRegex.test(styleWidth)) {
          modifiedWidth = pixelToEMU(styleWidth.match(pixelRegex)[1])
        }
        else if (emRegex.test(styleWidth)) {
          modifiedWidth = emToEmu(styleWidth.match(emRegex)[1])
        }
        else if (remRegex.test(styleWidth)) {
          modifiedWidth = remToEmu(styleWidth.match(remRegex)[1])
        }
        else if (percentageRegex.test(styleWidth)) {
          const percentageValue = styleWidth.match(percentageRegex)[1]

          modifiedWidth = Math.round(
            (percentageValue / 100) * originalWidthInEMU,
          )
        }
        else {
          modifiedWidth = originalWidthInEMU
          modifiedHeight = originalHeightInEMU
        }
      }
      else {
        if (styleHeight && styleHeight === "auto") {
          modifiedWidth = originalWidthInEMU
          modifiedHeight = originalHeightInEMU
        }
      }
    }
    if (styleHeight) {
      if (styleHeight !== "auto") {
        if (pixelRegex.test(styleHeight)) {
          modifiedHeight = pixelToEMU(styleHeight.match(pixelRegex)[1])
        }
        else if (emRegex.test(styleWidth)) {
          modifiedWidth = emToEmu(styleWidth.match(emRegex)[1])
        }
        else if (remRegex.test(styleWidth)) {
          modifiedWidth = emToEmu(styleWidth.match(remRegex)[1])
        }
        else if (percentageRegex.test(styleHeight)) {
          const percentageValue = styleWidth.match(percentageRegex)[1]

          modifiedHeight = Math.round(
            (percentageValue / 100) * originalHeightInEMU,
          )
          if (!modifiedWidth) {
            modifiedWidth = Math.round(modifiedHeight * aspectRatio)
          }
        }
      }
      else {
        if (modifiedWidth) {
          if (!modifiedHeight) {
            modifiedHeight = Math.round(modifiedWidth / aspectRatio)
          }
        }
        else {
          modifiedHeight = originalHeightInEMU
          modifiedWidth = originalWidthInEMU
        }
      }
    }
    if (modifiedWidth && !modifiedHeight) {
      modifiedHeight = Math.round(modifiedWidth / aspectRatio)
    }
    else if (modifiedHeight && !modifiedWidth) {
      modifiedWidth = Math.round(modifiedHeight * aspectRatio)
    }
    else {
      modifiedWidth = originalWidthInEMU
      modifiedHeight = originalHeightInEMU
    }
  }
  else {
    modifiedWidth = originalWidthInEMU
    modifiedHeight = originalHeightInEMU
  }

  attributes.width = modifiedWidth
  attributes.height = modifiedHeight
}

export function preprocessParagraphChildren(children: VTree[]): VTree[] {
  if (children.length === 0) return children

  const processedChildren: VTree[] = []

  for (let i = 0; i < children.length; i++) {
    const current = children[i]
    const next = i < children.length - 1 ? children[i + 1] : null

    if (isVText(current)) {
      const text = (current as VText).text
      const trimmedText = text.trim()

      // If this text node has content, check for boundary spaces
      if (trimmedText) {
        const leadingSpaces = text.match(/^(\s+)/)?.[1] || ""
        const trailingSpaces = text.match(/(\s+)$/)?.[1] || ""

        // Add leading space as separate text node
        // if needed and there's a previous sibling
        if (leadingSpaces && i > 0) {
          const prevInProcessed =
            processedChildren[processedChildren.length - 1]
          const prevEndsWithSpace = prevInProcessed &&
            isVText(prevInProcessed) &&
            (prevInProcessed as VText).text.endsWith(" ")

          if (!prevEndsWithSpace) {
            processedChildren.push(new VTextConstructor(" "))
          }
        }

        // Add the main text content
        processedChildren.push(new VTextConstructor(trimmedText))

        // Add trailing space as separate text node
        // if needed
        if (trailingSpaces && i < children.length - 1) {
          processedChildren.push(new VTextConstructor(" "))
        }
      }
      else if (text.match(/^\s+$/)) {
        // If it's only spaces, add as single space only if between other
        // elements
        // and if the previous element wasn't an inline element that extracted
        // its own trailing space
        const prevInProcessed = processedChildren[processedChildren.length - 1]
        const shouldAddSpace = i > 0 && i < children.length - 1 &&
          !(prevInProcessed && isVText(prevInProcessed) &&
            (prevInProcessed as VText).text === " ")

        if (shouldAddSpace) {
          processedChildren.push(new VTextConstructor(" "))
        }
      }
    }
    else if (isVNode(current)) {
      // Process inline elements to handle their boundary spaces too
      const vNodeCurrent = current as VNode
      if (
        vNodeCurrent.children && vNodeCurrent.children.length === 1 &&
        isVText(vNodeCurrent.children[0])
      ) {
        const childText = (vNodeCurrent.children[0] as VText).text
        const trimmedChildText = childText.trim()

        if (trimmedChildText) {
          // Extract spaces for all inline elements with single text children
          const leadingSpaces = childText.match(/^(\s+)/)?.[1] || ""
          const trailingSpaces = childText.match(/(\s+)$/)?.[1] || ""

          // Add leading space if needed, but only if the previous element
          // doesn't already end with space
          if (leadingSpaces && i > 0) {
            const prevInProcessed =
              processedChildren[processedChildren.length - 1]
            const prevEndsWithSpace = prevInProcessed &&
              isVText(prevInProcessed) &&
              (prevInProcessed as VText).text.endsWith(" ")

            if (!prevEndsWithSpace) {
              processedChildren.push(new VTextConstructor(" "))
            }
          }

          // Add the element with trimmed content
          const modifiedElement = new VNodeConstructor(
            vNodeCurrent.tagName,
            vNodeCurrent.properties,
            [new VTextConstructor(trimmedChildText)],
          )
          processedChildren.push(modifiedElement)

          // Add trailing space if needed, but only if:
          // 1. There is trailing space in the element
          // 2. There is a next sibling
          // 3. The next sibling is not a whitespace-only text node
          //    (to avoid duplication)
          const nextIsWhitespaceOnly = next && isVText(next) &&
            (next as VText).text.match(/^\s+$/)
          if (
            trailingSpaces && i < children.length - 1 && !nextIsWhitespaceOnly
          ) {
            processedChildren.push(new VTextConstructor(" "))
          }
        }
        else {
          // Span with only spaces - convert to space run
          processedChildren.push(new VTextConstructor(" "))
        }
      }
      else {
        processedChildren.push(current)
      }
    }
    else {
      processedChildren.push(current)
    }
  }

  return processedChildren
}

async function buildParagraph(
  vNode: VNode | VTree | null,
  attributes: Attributes,
  docxDocumentInstance: DocxDocument,
  preserveWhitespace: boolean = false,
): Promise<XMLBuilder> {
  const paragraphFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "p")
  const modifiedAttributes = modifiedStyleAttributesBuilder(
    docxDocumentInstance,
    vNode,
    attributes,
    {
      isParagraph: true,
    },
  )

  const paragraphPropertiesFragment = buildParagraphProperties(
    modifiedAttributes,
    false,
  )
  if (paragraphPropertiesFragment) {
    paragraphFragment.import(paragraphPropertiesFragment)
  }
  if (vNode && isVNode(vNode) && vNodeHasChildren(vNode as VNode)) {
    if (
      [
        "span",
        "strong",
        "b",
        "em",
        "i",
        "u",
        "ins",
        "strike",
        "del",
        "s",
        "sub",
        "sup",
        "mark",
        "a",
        "code",
        "pre",
      ].includes((vNode as VNode).tagName)
    ) {
      const isPreTag = (vNode as VNode).tagName === "pre"
      const runOrHyperlinkFragments = await buildRunOrHyperLink(
        vNode as VNode,
        modifiedAttributes,
        docxDocumentInstance,
        isPreTag,
      )
      if (Array.isArray(runOrHyperlinkFragments)) {
        for (
          let iteratorIndex = 0;
          iteratorIndex < runOrHyperlinkFragments.length;
          iteratorIndex++
        ) {
          const runOrHyperlinkFragment = runOrHyperlinkFragments[iteratorIndex]

          paragraphFragment.import(runOrHyperlinkFragment)
        }
      }
      else {
        paragraphFragment.import(runOrHyperlinkFragments)
      }
    }
    else {
      const processedChildren = preserveWhitespace
        ? (vNode as VNode).children
        : preprocessParagraphChildren((vNode as VNode).children)

      for (let index = 0; index < processedChildren.length; index++) {
        const childVNode = processedChildren[index]
        if (isVNode(childVNode) && (childVNode as VNode).tagName === "img") {
          if (isValidUrl((childVNode as VNode).properties.src)) {
            ;(childVNode as VNode).properties.src = await fetchImageToDataUrl(
              (childVNode as VNode).properties.src,
            )
          }
          const base64String = extractBase64Data(
            (childVNode as VNode).properties.src,
          )
            ?.base64Content
          const imageBuffer = Buffer.from(
            decodeURIComponent(base64String || ""),
            "base64",
          )
          const imageProperties = imageSize(imageBuffer)

          modifiedAttributes.maximumWidth = modifiedAttributes.maximumWidth ||
            docxDocumentInstance.availableDocumentSpace
          modifiedAttributes.originalWidth = imageProperties.width
          modifiedAttributes.originalHeight = imageProperties.height

          computeImageDimensions(childVNode as VNode, modifiedAttributes)
        }
        const runOrHyperlinkFragments = await buildRunOrHyperLink(
          childVNode as VNode,
          isVNode(childVNode) && (childVNode as VNode).tagName === "img"
            ? {
              ...modifiedAttributes,
              type: "picture",
              description: (childVNode as VNode).properties.alt,
            }
            : modifiedAttributes,
          docxDocumentInstance,
          preserveWhitespace,
        )
        if (Array.isArray(runOrHyperlinkFragments)) {
          for (
            let iteratorIndex = 0;
            iteratorIndex < runOrHyperlinkFragments.length;
            iteratorIndex++
          ) {
            const runOrHyperlinkFragment =
              runOrHyperlinkFragments[iteratorIndex]

            paragraphFragment.import(runOrHyperlinkFragment)
          }
        }
        else {
          paragraphFragment.import(runOrHyperlinkFragments)
        }
      }
    }
  }
  else if (!vNode) {
    // For null vNodes, create empty paragraph without any runs
    // This is used for spacing after tables
  }
  else {
    // In case paragraphs has to be rendered
    // where vText is present. Eg. table-cell
    // Or in case the vNode is something like img
    const runFragments = await buildRunOrRuns(
      vNode,
      modifiedAttributes,
      docxDocumentInstance,
      preserveWhitespace,
    )
    if (Array.isArray(runFragments)) {
      for (let index = 0; index < runFragments.length; index++) {
        const runFragment = runFragments[index]
        paragraphFragment.import(runFragment)
      }
    }
    else {
      paragraphFragment.import(runFragments)
    }
  }
  paragraphFragment.up()

  return paragraphFragment
}

function buildGridSpanFragment(spanValue: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "gridSpan")
    .att("@w", "val", String(spanValue))
    .up()
}

function buildTableCellSpacing(cellSpacing = 0) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tblCellSpacing")
    .att("@w", "w", String(cellSpacing))
    .att("@w", "type", "dxa")
    .up()
}

function buildTableCellBorders(tableCellBorder: {
  top: number
  bottom: number
  left: number
  right: number
  color: string
  stroke: string
}) {
  const tableCellBordersFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele(
      "@w",
      "tcBorders",
    )

  const { color, stroke, ...borders } = tableCellBorder
  Object.keys(borders)
    .forEach((border) => {
      const borderVal =
        tableCellBorder[border as "top" | "bottom" | "left" | "right"]

      if (borderVal) {
        const borderFragment = buildBorder(
          border,
          borderVal,
          0,
          color,
          stroke,
        )
        tableCellBordersFragment.import(borderFragment)
      }
    })

  tableCellBordersFragment.up()

  return tableCellBordersFragment
}

function buildTableCellWidth(tableCellWidth: string | number) {
  const colWidth = fixupColumnWidth(tableCellWidth)
  const frag = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tcW")

  if (typeof colWidth === "string" && colWidth.endsWith("%")) {
    // The % symbol must be included according to
    // http://officeopenxml.com/WPtableWidth.php
    return frag.att("@w", "w", colWidth)
      .att("@w", "type", "pct")
      .up()
  }
  else {
    return frag.att("@w", "w", String(colWidth))
      .att("@w", "type", "dxa")
      .up()
  }
}

function buildTableCellProperties(attributes: Attributes) {
  const tableCellPropertiesFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele("@w", "tcPr")

  if (attributes && attributes.constructor === Object) {
    Object.keys(attributes)
      .forEach((key) => {
        switch (key) {
          case "backgroundColor": {
            if (attributes.backgroundColor) {
              const shadingFragment = buildShading(attributes.backgroundColor)
              tableCellPropertiesFragment.import(shadingFragment)

              delete attributes.backgroundColor
            }
            break
          }
          case "verticalAlign": {
            if (attributes.verticalAlign) {
              const verticalAlignmentFragment = buildVerticalAlignment(
                attributes.verticalAlign,
              )
              tableCellPropertiesFragment.import(verticalAlignmentFragment)

              delete attributes.verticalAlign
            }
            break
          }
          case "colSpan": {
            if (attributes.colSpan) {
              const gridSpanFragment = buildGridSpanFragment(attributes.colSpan)
              tableCellPropertiesFragment.import(gridSpanFragment)

              delete attributes.colSpan
            }
            break
          }
          case "tableCellBorder": {
            if (attributes.tableCellBorder) {
              const tableCellBorderFragment = buildTableCellBorders(
                attributes.tableCellBorder,
              )
              tableCellPropertiesFragment.import(tableCellBorderFragment)

              delete attributes.tableCellBorder
            }
            break
          }
          case "rowSpan": {
            if (attributes.rowSpan) {
              const verticalMergeFragment = buildVerticalMerge(attributes[key])
              tableCellPropertiesFragment.import(verticalMergeFragment)

              delete attributes.rowSpan
            }
            break
          }
          case "width": {
            const widthFragment = buildTableCellWidth(attributes.width || 0)
            tableCellPropertiesFragment.import(widthFragment)
            delete attributes.width
            break
          }
          default:
            break
        }
      })
  }
  tableCellPropertiesFragment.up()

  return tableCellPropertiesFragment
}

function fixupTableCellBorder(vNode: VNode, attributes: Attributes) {
  const defaultTableCellBorder = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    color: "000000",
    stroke: "single",
  }

  if (Object.prototype.hasOwnProperty.call(vNode.properties.style, "border")) {
    if (
      vNode.properties.style.border === "none" ||
      vNode.properties.style.border === 0
    ) {
      attributes.tableCellBorder = defaultTableCellBorder
    }
    else {
      const [borderSize, borderStroke, borderColor] = cssBorderParser(
        vNode.properties.style.border,
      )

      attributes.tableCellBorder = {
        top: borderSize,
        left: borderSize,
        bottom: borderSize,
        right: borderSize,
        color: borderColor,
        stroke: borderStroke,
      }
    }
  }
  if (
    vNode.properties.style["border-top"] &&
    vNode.properties.style["border-top"] === "0"
  ) {
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      top: 0,
    }
  }
  else if (
    vNode.properties.style["border-top"] &&
    vNode.properties.style["border-top"] !== "0"
  ) {
    const [borderSize, borderStroke, borderColor] = cssBorderParser(
      vNode.properties.style["border-top"],
    )
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      top: borderSize,
      color: borderColor,
      stroke: borderStroke,
    }
  }
  if (
    vNode.properties.style["border-left"] &&
    vNode.properties.style["border-left"] === "0"
  ) {
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      left: 0,
    }
  }
  else if (
    vNode.properties.style["border-left"] &&
    vNode.properties.style["border-left"] !== "0"
  ) {
    const [borderSize, borderStroke, borderColor] = cssBorderParser(
      vNode.properties.style["border-left"],
    )
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      left: borderSize,
      color: borderColor,
      stroke: borderStroke,
    }
  }
  if (
    vNode.properties.style["border-bottom"] &&
    vNode.properties.style["border-bottom"] === "0"
  ) {
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      bottom: 0,
    }
  }
  else if (
    vNode.properties.style["border-bottom"] &&
    vNode.properties.style["border-bottom"] !== "0"
  ) {
    const [borderSize, borderStroke, borderColor] = cssBorderParser(
      vNode.properties.style["border-bottom"],
    )
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      bottom: borderSize,
      color: borderColor,
      stroke: borderStroke,
    }
  }
  if (
    vNode.properties.style["border-right"] &&
    vNode.properties.style["border-right"] === "0"
  ) {
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      right: 0,
    }
  }
  else if (
    vNode.properties.style["border-right"] &&
    vNode.properties.style["border-right"] !== "0"
  ) {
    const [borderSize, borderStroke, borderColor] = cssBorderParser(
      vNode.properties.style["border-right"],
    )
    attributes.tableCellBorder = {
      ...attributes.tableCellBorder || defaultTableCellBorder,
      right: borderSize,
      color: borderColor,
      stroke: borderStroke,
    }
  }
}

async function buildTableCell(
  vNode: VNode,
  attributes: Attributes,
  rowSpanMap: Map<number, { rowSpan: number; colSpan: number }>,
  columnIndex: { index: number },
  docxDocumentInstance: DocxDocument,
) {
  const tableCellFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tc")

  let modifiedAttributes = { ...attributes }
  if (isVNode(vNode) && vNode.properties) {
    if (vNode.properties.rowSpan) {
      rowSpanMap.set(columnIndex.index, {
        rowSpan: vNode.properties.rowSpan - 1,
        colSpan: 0,
      })
      modifiedAttributes.rowSpan = "restart"
    }
    else {
      const previousSpanObject = rowSpanMap.get(columnIndex.index)
      rowSpanMap.set(
        columnIndex.index,
        Object.assign({}, previousSpanObject, {
          rowSpan: 0,
          colSpan: (previousSpanObject && previousSpanObject.colSpan) || 0,
        }),
      )
    }
    if (
      vNode.properties.colSpan ||
      (vNode.properties.style && vNode.properties.style["column-span"])
    ) {
      modifiedAttributes.colSpan = vNode.properties.colSpan ||
        (vNode.properties.style && vNode.properties.style["column-span"])
      const previousSpanObject = rowSpanMap.get(columnIndex.index)
      rowSpanMap.set(
        columnIndex.index,
        Object.assign({}, previousSpanObject, {
          colSpan: Number(modifiedAttributes.colSpan) || 0,
        }),
      )
      columnIndex.index += Number(modifiedAttributes.colSpan) - 1
    }
    if (vNode.properties.style) {
      modifiedAttributes = {
        ...modifiedAttributes,
        ...modifiedStyleAttributesBuilder(
          docxDocumentInstance,
          vNode,
          attributes,
        ),
      }

      fixupTableCellBorder(vNode, modifiedAttributes)
    }
  }
  const tableCellPropertiesFragment = buildTableCellProperties(
    modifiedAttributes,
  )
  tableCellFragment.import(tableCellPropertiesFragment)
  if (vNodeHasChildren(vNode)) {
    for (let index = 0; index < vNode.children.length; index++) {
      const childVNode = vNode.children[index]
      if (isVNode(childVNode) && (childVNode as VNode).tagName === "img") {
        if (modifiedAttributes.maximumWidth) {
          const imageFragment = await buildImage(
            docxDocumentInstance,
            childVNode,
            modifiedAttributes.maximumWidth,
          )
          if (imageFragment) {
            if (Array.isArray(imageFragment)) {
              imageFragment.forEach(frag => tableCellFragment.import(frag))
            }
            else {
              tableCellFragment.import(imageFragment)
            }
          }
        }
      }
      else if (
        isVNode(childVNode) && (childVNode as VNode).tagName === "figure"
      ) {
        if (vNodeHasChildren(childVNode as VNode)) {
          for (
            let iteratorIndex = 0;
            iteratorIndex < (childVNode as VNode).children.length;
            iteratorIndex++
          ) {
            const grandChildVNode =
              (childVNode as VNode).children[iteratorIndex]
            if (
              isVNode(grandChildVNode) &&
              (grandChildVNode as VNode).tagName === "img"
            ) {
              const imageFragment = await buildImage(
                docxDocumentInstance,
                grandChildVNode,
                modifiedAttributes.maximumWidth || 0,
              )
              if (imageFragment) {
                if (Array.isArray(imageFragment)) {
                  imageFragment.forEach(frag => tableCellFragment.import(frag))
                }
                else {
                  tableCellFragment.import(imageFragment)
                }
              }
            }
          }
        }
      }
      else if (
        isVNode(childVNode) &&
        ["ul", "ol"].includes((childVNode as VNode).tagName)
      ) {
        // render list in table
        if (vNodeHasChildren(childVNode as VNode)) {
          await buildList(childVNode, docxDocumentInstance, tableCellFragment)
        }
      }
      else {
        const paragraphFragment = await buildParagraph(
          childVNode,
          modifiedAttributes,
          docxDocumentInstance,
        )

        tableCellFragment.import(paragraphFragment)
      }
    }
  }
  else {
    // TODO: Figure out why building with buildParagraph() isn't working
    const paragraphFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "p")
      .up()
    tableCellFragment.import(paragraphFragment)
  }
  tableCellFragment.up()

  return tableCellFragment
}

function buildRowSpanCell(
  rowSpanMap: Map<number, { rowSpan: number; colSpan: number }>,
  columnIndex: { index: number },
  attributes: Attributes,
) {
  const rowSpanCellFragments = []
  let spanObject = rowSpanMap.get(columnIndex.index)
  while (spanObject && spanObject.rowSpan) {
    const rowSpanCellFragment = fragment({
      namespaceAlias: { w: namespaces.w },
    })
      .ele("@w", "tc")

    const tableCellPropertiesFragment = buildTableCellProperties({
      ...attributes,
      rowSpan: "continue",
      colSpan: spanObject.colSpan ? spanObject.colSpan : 0,
    })
    rowSpanCellFragment.import(tableCellPropertiesFragment)

    const paragraphFragment = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "p")
      .up()
    rowSpanCellFragment.import(paragraphFragment)
    rowSpanCellFragment.up()

    rowSpanCellFragments.push(rowSpanCellFragment)

    if (spanObject.rowSpan - 1 === 0) {
      rowSpanMap.delete(columnIndex.index)
    }
    else {
      rowSpanMap.set(columnIndex.index, {
        rowSpan: spanObject.rowSpan - 1,
        colSpan: spanObject.colSpan || 0,
      })
    }
    columnIndex.index += spanObject.colSpan || 1
    spanObject = rowSpanMap.get(columnIndex.index)
  }

  return rowSpanCellFragments
}

function buildTableRowProperties(attributes: Attributes) {
  const tableRowPropertiesFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele(
      "@w",
      "trPr",
    )
  if (attributes && attributes.constructor === Object) {
    Object.keys(attributes)
      .forEach((key) => {
        switch (key) {
          case "tableRowHeight": {
            if (attributes.tableRowHeight) {
              const tableRowHeightFragment = buildTableRowHeight(
                attributes.tableRowHeight,
              )
              tableRowPropertiesFragment.import(tableRowHeightFragment)
              delete attributes.tableRowHeight
            }
            break
          }
          case "rowCantSplit":
            if (attributes.rowCantSplit) {
              const cantSplitFragment = fragment({
                namespaceAlias: { w: namespaces.w },
              })
                .ele("@w", "cantSplit")
                .up()
              tableRowPropertiesFragment.import(cantSplitFragment)

              delete attributes.rowCantSplit
            }
            break
          default:
            break
        }
      })
  }
  tableRowPropertiesFragment.up()
  return tableRowPropertiesFragment
}

async function buildTableRow(
  vNode: VNode,
  attributes: Attributes,
  rowSpanMap: Map<number, { rowSpan: number; colSpan: number }>,
  docxDocumentInstance: DocxDocument,
) {
  const tableRowFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tr")
  const modifiedAttributes = { ...attributes }
  if (isVNode(vNode) && vNode.properties) {
    // FIXME: find a better way to get row height from cell style
    const firstChild = vNode.children[0]
    if (
      (vNode.properties.style && vNode.properties.style.height) ||
      (firstChild &&
        isVNode(firstChild) &&
        (firstChild as VNode).properties.style &&
        (firstChild as VNode).properties.style.height)
    ) {
      modifiedAttributes.tableRowHeight = fixupRowHeight(
        (vNode.properties.style && vNode.properties.style.height) ||
          ((firstChild as VNode) &&
              isVNode(firstChild as VNode) &&
              (firstChild as VNode).properties.style &&
              (firstChild as VNode).properties.style.height
            ? (firstChild as VNode).properties.style.height
            : undefined),
      )
    }
    if (vNode.properties.style) {
      fixupTableCellBorder(vNode, modifiedAttributes)
    }
  }

  const tableRowPropertiesFragment = buildTableRowProperties(
    modifiedAttributes,
  )
  tableRowFragment.import(tableRowPropertiesFragment)

  const columnIndex = { index: 0 }

  if (vNodeHasChildren(vNode)) {
    const tableColumns = vNode.children.filter((childVNode) =>
      isVNode(childVNode) &&
      ["td", "th"].includes((childVNode as VNode).tagName),
    ) as VNode[]
    const maximumColumnWidth = docxDocumentInstance.availableDocumentSpace /
      tableColumns.length

    for (const column of tableColumns) {
      const rowSpanCellFragments = buildRowSpanCell(
        rowSpanMap,
        columnIndex,
        modifiedAttributes,
      )
      if (Array.isArray(rowSpanCellFragments)) {
        for (
          let iteratorIndex = 0;
          iteratorIndex < rowSpanCellFragments.length;
          iteratorIndex++
        ) {
          const rowSpanCellFragment = rowSpanCellFragments[iteratorIndex]

          tableRowFragment.import(rowSpanCellFragment)
        }
      }
      const tableCellFragment = await buildTableCell(
        column,
        { ...modifiedAttributes, maximumWidth: maximumColumnWidth },
        rowSpanMap,
        columnIndex,
        docxDocumentInstance,
      )
      columnIndex.index++

      tableRowFragment.import(tableCellFragment)
    }
  }

  if (columnIndex.index < rowSpanMap.size) {
    const rowSpanCellFragments = buildRowSpanCell(
      rowSpanMap,
      columnIndex,
      modifiedAttributes,
    )
    if (Array.isArray(rowSpanCellFragments)) {
      for (
        let iteratorIndex = 0;
        iteratorIndex < rowSpanCellFragments.length;
        iteratorIndex++
      ) {
        const rowSpanCellFragment = rowSpanCellFragments[iteratorIndex]

        tableRowFragment.import(rowSpanCellFragment)
      }
    }
  }

  tableRowFragment.up()

  return tableRowFragment
}

function buildTableGridCol(gridWidth: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "gridCol")
    .att("@w", "w", String(Math.round(gridWidth)))
}

function buildTableGrid(vNode: VNode, attributes: Attributes) {
  const tableGridFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tblGrid")
  if (vNodeHasChildren(vNode)) {
    const gridColumns = vNode.children.filter((childVNode) =>
      isVNode(childVNode) && (childVNode as VNode).tagName === "col",
    )
    const gridWidth = (attributes.maximumWidth || 0) / gridColumns.length

    for (let index = 0; index < gridColumns.length; index++) {
      const tableGridColFragment = buildTableGridCol(gridWidth)
      tableGridFragment.import(tableGridColFragment)
    }
  }
  tableGridFragment.up()

  return tableGridFragment
}

function buildTableGridFromTableRow(vNode: VNode, attributes: Attributes) {
  const tableGridFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tblGrid")
  if (vNodeHasChildren(vNode)) {
    const numberOfGridColumns = vNode.children.reduce(
      (accumulator, childVNode) => {
        let colSpan
        if (isVNode(childVNode)) {
          const props = (childVNode as VNode).properties
          colSpan = props.colSpan ||
            (props.style && props.style["column-span"])
        }
        return accumulator + (colSpan ? parseInt(colSpan) : 1)
      },
      0,
    )
    const gridWidth = (attributes.maximumWidth || 0) / numberOfGridColumns

    for (let index = 0; index < numberOfGridColumns; index++) {
      const tableGridColFragment = buildTableGridCol(gridWidth)
      tableGridFragment.import(tableGridColFragment)
    }
  }
  tableGridFragment.up()

  return tableGridFragment
}

function buildTableBorders(
  tableBorder: {
    color: string
    stroke: string
    top: number
    bottom: number
    left: number
    right: number
    insideV: number
    insideH: number
  },
) {
  const tableBordersFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele(
      "@w",
      "tblBorders",
    )

  const { color, stroke, ...borders } = tableBorder

  Object.keys(borders)
    .forEach((border) => {
      const borderVal =
        tableBorder[border as "top" | "left" | "bottom" | "right"]

      if (borderVal) {
        const borderFragment = buildBorder(
          border,
          borderVal,
          0,
          color,
          stroke,
        )
        tableBordersFragment.import(borderFragment)
      }
    })

  tableBordersFragment.up()

  return tableBordersFragment
}

function buildTableWidth(tableWidth: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tblW")
    .att("@w", "type", "dxa")
    .att("@w", "w", String(tableWidth))
    .up()
}

function buildCellMargin(side: string, margin: number) {
  return fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", side)
    .att("@w", "type", "dxa")
    .att("@w", "w", String(margin))
    .up()
}

function buildTableCellMargins(margin: number) {
  const tableCellMarFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele(
      "@w",
      "tblCellMar",
    )
  ;["top", "bottom"].forEach((side) => {
    const marginFragment = buildCellMargin(side, margin / 2)
    tableCellMarFragment.import(marginFragment)
  })
  ;["left", "right"].forEach((side) => {
    const marginFragment = buildCellMargin(side, margin)
    tableCellMarFragment.import(marginFragment)
  })

  return tableCellMarFragment
}

function buildTableProperties(attributes: Attributes) {
  const tablePropertiesFragment = fragment({
    namespaceAlias: { w: namespaces.w },
  })
    .ele("@w", "tblPr")

  if (attributes && attributes.constructor === Object) {
    Object.keys(attributes)
      .forEach((key) => {
        switch (key) {
          case "tableBorder": {
            if (attributes.tableBorder) {
              const tableBordersFragment = buildTableBorders(
                attributes.tableBorder,
              )
              tablePropertiesFragment.import(tableBordersFragment)

              delete attributes.tableBorder
            }
            break
          }
          case "tableCellSpacing": {
            const tableCellSpacingFragment = buildTableCellSpacing(
              attributes.tableCellSpacing,
            )
            tablePropertiesFragment.import(tableCellSpacingFragment)

            delete attributes.tableCellSpacing
            break
          }
          case "width": {
            if (attributes.width) {
              const tableWidthFragment = buildTableWidth(attributes.width)
              tablePropertiesFragment.import(tableWidthFragment)
            }

            delete attributes.width
            break
          }
          default:
            break
        }
      })
  }
  const tableCellMarginFragment = buildTableCellMargins(160)
  tablePropertiesFragment.import(tableCellMarginFragment)

  // by default, all tables are center aligned.
  const alignmentFragment = buildHorizontalAlignment("center")
  tablePropertiesFragment.import(alignmentFragment)

  tablePropertiesFragment.up()

  return tablePropertiesFragment
}

function cssBorderParser(borderString: string): [number, string, string] {
  const [size, stroke, color] = borderString.split(" ")
  let sizeNum = parseInt(size)

  if (pointRegex.test(size)) {
    const matchedParts = size.match(pointRegex)
    // convert point to eighth of a point
    sizeNum = pointToEIP(Number(matchedParts?.[1]))
  }
  else if (pixelRegex.test(size)) {
    const matchedParts = size.match(pixelRegex)
    // convert pixels to eighth of a point
    sizeNum = pixelToEIP(Number(matchedParts?.[1]))
  }

  return [
    sizeNum,
    stroke && ["dashed", "dotted", "double"].includes(stroke)
      ? stroke
      : "single",
    color && fixupColorCode(color)
      .toUpperCase(),
  ]
}

async function buildTable(
  vNode: VNode,
  attributes: Attributes,
  docxDocumentInstance: DocxDocument,
) {
  const tableFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "tbl")
  const modifiedAttributes = { ...attributes }
  if (isVNode(vNode) && vNode.properties) {
    const tableAttributes = vNode.properties.attributes || {}
    const tableStyles = vNode.properties.style || {}
    let [borderSize, borderStrike, borderColor] = [2, "single", "000000"]

    if (!isNaN(Number(tableAttributes.border))) {
      borderSize = parseInt(tableAttributes.border, 10)
    }

    // css style overrides table border properties
    if (tableStyles.border) {
      const [cssSize, cssStroke, cssColor] = cssBorderParser(
        tableStyles.border,
      )
      borderSize = Number(cssSize) || borderSize
      borderColor = String(cssColor) || borderColor
      borderStrike = String(cssStroke) || borderStrike
    }

    const tableBorders = {
      top: borderSize,
      bottom: borderSize,
      left: borderSize,
      right: borderSize,
      stroke: borderStrike,
      color: borderColor,
      insideV: 0,
      insideH: 0,
    }

    if (tableStyles["border-collapse"] === "collapse") {
      tableBorders.insideV = borderSize
      tableBorders.insideH = borderSize
    }
    else {
      modifiedAttributes.tableCellBorder = {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        color: "000000",
        stroke: "single",
      }
    }

    modifiedAttributes.tableBorder = tableBorders
    modifiedAttributes.tableCellSpacing = 0

    let minimumWidth
    let maximumWidth
    let width
    // Calculate minimum width of table
    if (pixelRegex.test(tableStyles["min-width"])) {
      minimumWidth = pixelToTWIP(tableStyles["min-width"].match(pixelRegex)[1])
    }
    else if (percentageRegex.test(tableStyles["min-width"])) {
      const percentageValue = tableStyles["min-width"].match(percentageRegex)[1]
      minimumWidth = Math.round(
        (percentageValue / 100) * (attributes.maximumWidth || 0),
      )
    }

    // Calculate maximum width of table
    if (pixelRegex.test(tableStyles["max-width"])) {
      pixelRegex.lastIndex = 0
      maximumWidth = pixelToTWIP(tableStyles["max-width"].match(pixelRegex)[1])
    }
    else if (percentageRegex.test(tableStyles["max-width"])) {
      percentageRegex.lastIndex = 0
      const percentageValue = tableStyles["max-width"].match(percentageRegex)[1]
      maximumWidth = Math.round(
        (percentageValue / 100) * (attributes.maximumWidth || 0),
      )
    }

    // Calculate specified width of table
    if (pixelRegex.test(tableStyles.width)) {
      pixelRegex.lastIndex = 0
      width = pixelToTWIP(tableStyles.width.match(pixelRegex)[1])
    }
    else if (percentageRegex.test(tableStyles.width)) {
      percentageRegex.lastIndex = 0
      const percentageValue = tableStyles.width.match(percentageRegex)[1]
      width = Math.round(
        (percentageValue / 100) * (attributes.maximumWidth || 0),
      )
    }

    // If width isn't supplied, we should have min-width as the width.
    if (width) {
      modifiedAttributes.width = width
      if (maximumWidth) {
        modifiedAttributes.width = Math.min(
          modifiedAttributes.width,
          maximumWidth,
        )
      }
      if (minimumWidth) {
        modifiedAttributes.width = Math.max(
          modifiedAttributes.width,
          minimumWidth,
        )
      }
    }
    else if (minimumWidth) {
      modifiedAttributes.width = minimumWidth
    }
    if (modifiedAttributes.width) {
      modifiedAttributes.width = Math.min(
        modifiedAttributes.width,
        attributes.maximumWidth || 0,
      )
    }
  }
  const tablePropertiesFragment = buildTableProperties(modifiedAttributes)
  tableFragment.import(tablePropertiesFragment)

  const rowSpanMap = new Map()

  if (vNodeHasChildren(vNode)) {
    for (let index = 0; index < vNode.children.length; index++) {
      if (isVNode(vNode.children[index])) {
        const childVNode = vNode.children[index] as VNode
        if ((childVNode as VNode).tagName === "colgroup") {
          const tableGridFragment = buildTableGrid(
            childVNode,
            modifiedAttributes,
          )
          tableFragment.import(tableGridFragment)
        }
        else if (childVNode.tagName === "thead") {
          for (
            let iteratorIndex = 0;
            iteratorIndex < childVNode.children.length;
            iteratorIndex++
          ) {
            if (isVNode(childVNode.children[iteratorIndex])) {
              const grandChildVNode = childVNode
                .children[iteratorIndex] as VNode
              if (grandChildVNode.tagName === "tr") {
                if (iteratorIndex === 0) {
                  const tableGridFragment = buildTableGridFromTableRow(
                    grandChildVNode,
                    modifiedAttributes,
                  )
                  tableFragment.import(tableGridFragment)
                }
                const tableRowFragment = await buildTableRow(
                  grandChildVNode,
                  modifiedAttributes,
                  rowSpanMap,
                  docxDocumentInstance,
                )
                tableFragment.import(tableRowFragment)
              }
            }
          }
        }
        else if (childVNode.tagName === "tbody") {
          for (
            let iteratorIndex = 0;
            iteratorIndex < childVNode.children.length;
            iteratorIndex++
          ) {
            if (isVNode(childVNode.children[iteratorIndex])) {
              const grandChildVNode = childVNode
                .children[iteratorIndex] as VNode
              if (grandChildVNode.tagName === "tr") {
                if (iteratorIndex === 0) {
                  const tableGridFragment = buildTableGridFromTableRow(
                    grandChildVNode,
                    modifiedAttributes,
                  )
                  tableFragment.import(tableGridFragment)
                }
                const tableRowFragment = await buildTableRow(
                  grandChildVNode,
                  modifiedAttributes,
                  rowSpanMap,
                  docxDocumentInstance,
                )
                tableFragment.import(tableRowFragment)
              }
            }
          }
        }
        else if (childVNode.tagName === "tr") {
          if (index === 0) {
            const tableGridFragment = buildTableGridFromTableRow(
              childVNode,
              modifiedAttributes,
            )
            tableFragment.import(tableGridFragment)
          }
          const tableRowFragment = await buildTableRow(
            childVNode,
            modifiedAttributes,
            rowSpanMap,
            docxDocumentInstance,
          )
          tableFragment.import(tableRowFragment)
        }
      }
    }
  }
  tableFragment.up()

  return tableFragment
}

function buildPresetGeometry() {
  return fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "prstGeom")
    .att("prst", "rect")
    .up()
}

function toEMU(v?: number | string) {
  if (v === undefined || v === null) return undefined
  if (typeof v === "number") return v // already EMU
  if (pixelRegex.test(v)) { // like "256px"
    const [, num] = v.match(pixelRegex) as RegExpMatchArray
    return pixelToEMU(Number(num))
  }
  return Number(v) // fallback – numeric string
}

function buildExtents(
  { width, height }: { width?: number | string; height?: number | string },
) {
  if (!width && !height) {
    return
  }
  const cx = toEMU(width)
  const cy = toEMU(height)
  return fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "ext")
    .att("cx", String(cx ?? ""))
    .att("cy", String(cy ?? ""))
    .up()
}

function buildOffset() {
  return fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "off")
    .att("x", "0")
    .att("y", "0")
    .up()
}

function buildGraphicFrameTransform(
  attributes: { width?: number; height?: number },
) {
  const graphicFrameTransformFragment = fragment({
    namespaceAlias: { a: namespaces.a },
  })
    .ele("@a", "xfrm")

  const offsetFragment = buildOffset()
  graphicFrameTransformFragment.import(offsetFragment)
  const extentsFragment = buildExtents(attributes)
  if (extentsFragment) {
    graphicFrameTransformFragment.import(extentsFragment)
  }

  graphicFrameTransformFragment.up()

  return graphicFrameTransformFragment
}

function buildShapeProperties(attributes: { width?: number; height?: number }) {
  const shapeProperties = fragment({ namespaceAlias: { pic: namespaces.pic } })
    .ele("@pic", "spPr")

  const graphicFrameTransformFragment = buildGraphicFrameTransform(attributes)
  shapeProperties.import(graphicFrameTransformFragment)
  const presetGeometryFragment = buildPresetGeometry()
  shapeProperties.import(presetGeometryFragment)

  shapeProperties.up()

  return shapeProperties
}

function buildFillRect() {
  return fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "fillRect")
    .up()
}

function buildStretch() {
  const stretchFragment = fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "stretch")

  const fillRectFragment = buildFillRect()
  stretchFragment.import(fillRectFragment)

  stretchFragment.up()

  return stretchFragment
}

function buildSrcRectFragment() {
  return fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "srcRect")
    .att("b", "0")
    .att("l", "0")
    .att("r", "0")
    .att("t", "0")
    .up()
}

function buildBinaryLargeImageOrPicture(relationshipId: number) {
  return fragment({
    namespaceAlias: { a: namespaces.a, r: namespaces.r },
  })
    .ele("@a", "blip")
    .att("@r", "embed", `rId${relationshipId}`)
    // FIXME: possible values 'email', 'none', 'print', 'hqprint', 'screen'
    .att("cstate", "print")
    .up()
}

function buildBinaryLargeImageOrPictureFill(relationshipId: number) {
  const binaryLargeImageOrPictureFillFragment = fragment({
    namespaceAlias: { pic: namespaces.pic },
  })
    .ele("@pic", "blipFill")
  const binaryLargeImageOrPictureFragment = buildBinaryLargeImageOrPicture(
    relationshipId,
  )
  binaryLargeImageOrPictureFillFragment.import(
    binaryLargeImageOrPictureFragment,
  )
  const srcRectFragment = buildSrcRectFragment()
  binaryLargeImageOrPictureFillFragment.import(srcRectFragment)
  const stretchFragment = buildStretch()
  binaryLargeImageOrPictureFillFragment.import(stretchFragment)

  binaryLargeImageOrPictureFillFragment.up()

  return binaryLargeImageOrPictureFillFragment
}

function buildNonVisualPictureDrawingProperties() {
  return fragment({ namespaceAlias: { pic: namespaces.pic } })
    .ele("@pic", "cNvPicPr")
    .up()
}

function buildNonVisualDrawingProperties(
  pictureId: number,
  pictureNameWithExtension: string,
  pictureDescription = "",
) {
  return fragment({ namespaceAlias: { pic: namespaces.pic } })
    .ele("@pic", "cNvPr")
    .att("id", String(pictureId))
    .att("name", pictureNameWithExtension)
    .att("descr", pictureDescription)
    .up()
}

function buildNonVisualPictureProperties(
  pictureId: number,
  pictureNameWithExtension: string,
  pictureDescription: string,
) {
  const nonVisualPicturePropertiesFragment = fragment({
    namespaceAlias: { pic: namespaces.pic },
  })
    .ele("@pic", "nvPicPr")
  // TODO: Handle picture attributes
  const nonVisualDrawingPropertiesFragment = buildNonVisualDrawingProperties(
    pictureId,
    pictureNameWithExtension,
    pictureDescription,
  )
  nonVisualPicturePropertiesFragment.import(nonVisualDrawingPropertiesFragment)
  const nonVisualPictureDrawingPropertiesFragment =
    buildNonVisualPictureDrawingProperties()
  nonVisualPicturePropertiesFragment.import(
    nonVisualPictureDrawingPropertiesFragment,
  )
  nonVisualPicturePropertiesFragment.up()

  return nonVisualPicturePropertiesFragment
}

function buildPicture(
  {
    id,
    fileNameWithExtension,
    description,
    relationshipId,
    width,
    height,
  }: Attributes,
) {
  const pictureFragment = fragment({ namespaceAlias: { pic: namespaces.pic } })
    .ele("@pic", "pic")
  const nonVisualPicturePropertiesFragment = buildNonVisualPictureProperties(
    id || 0,
    fileNameWithExtension || "",
    description || "",
  )
  pictureFragment.import(nonVisualPicturePropertiesFragment)
  const binaryLargeImageOrPictureFill = buildBinaryLargeImageOrPictureFill(
    relationshipId || 0,
  )
  pictureFragment.import(binaryLargeImageOrPictureFill)
  const shapeProperties = buildShapeProperties({ width, height })
  pictureFragment.import(shapeProperties)
  pictureFragment.up()

  return pictureFragment
}

function buildGraphicData(graphicType: "picture", attributes: Attributes) {
  const graphicDataFragment = fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "graphicData")
    .att("uri", "http://schemas.openxmlformats.org/drawingml/2006/picture")
  if (graphicType === "picture") {
    const pictureFragment = buildPicture(attributes)
    graphicDataFragment.import(pictureFragment)
  }
  graphicDataFragment.up()

  return graphicDataFragment
}

function buildGraphic(graphicType: "picture", attributes: Attributes) {
  const graphicFragment = fragment({ namespaceAlias: { a: namespaces.a } })
    .ele("@a", "graphic")
  // TODO: Handle drawing type
  const graphicDataFragment = buildGraphicData(graphicType, attributes)
  graphicFragment.import(graphicDataFragment)
  graphicFragment.up()

  return graphicFragment
}

function buildDrawingObjectNonVisualProperties(
  pictureId: number,
  pictureName: string,
) {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "docPr")
    .att("id", String(pictureId))
    .att("name", pictureName)
    .up()
}

function buildWrapSquare() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "wrapSquare")
    .att("wrapText", "bothSides")
    .att("distB", "228600")
    .att("distT", "228600")
    .att("distL", "228600")
    .att("distR", "228600")
    .up()
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function buildWrapNone() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "wrapNone")
    .up()
}

function buildEffectExtentFragment() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "effectExtent")
    .att("b", "0")
    .att("l", "0")
    .att("r", "0")
    .att("t", "0")
    .up()
}

function buildExtent(
  { width, height }: { width?: number | string; height?: number | string },
) {
  if (!width && !height) {
    return
  }
  const cx = toEMU(width)
  const cy = toEMU(height)
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "extent")
    .att("cx", String(cx ?? ""))
    .att("cy", String(cy ?? ""))
    .up()
}

function buildPositionV() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "positionV")
    .att("relativeFrom", "paragraph")
    .ele("@wp", "posOffset")
    .txt("19050")
    .up()
}

function buildPositionH() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "positionH")
    .att("relativeFrom", "column")
    .ele("@wp", "posOffset")
    .txt("19050")
    .up()
}

function buildSimplePos() {
  return fragment({ namespaceAlias: { wp: namespaces.wp } })
    .ele("@wp", "simplePos")
    .att("x", "0")
    .att("y", "0")
    .up()
}

function buildAnchoredDrawing(graphicType: "picture", attributes: Attributes) {
  const anchoredDrawingFragment = fragment({
    namespaceAlias: { wp: namespaces.wp },
  })
    .ele("@wp", "anchor")
    .att("distB", "0")
    .att("distL", "0")
    .att("distR", "0")
    .att("distT", "0")
    .att("relativeHeight", "0")
    .att("behindDoc", "false")
    .att("locked", "true")
    .att("layoutInCell", "true")
    .att("allowOverlap", "false")
    .att("simplePos", "false")
  // Even though simplePos isnt supported by Word 2007 simplePos is required.
  const simplePosFragment = buildSimplePos()
  anchoredDrawingFragment.import(simplePosFragment)
  const positionHFragment = buildPositionH()
  anchoredDrawingFragment.import(positionHFragment)
  const positionVFragment = buildPositionV()
  anchoredDrawingFragment.import(positionVFragment)
  const extentFragment = buildExtent({
    width: attributes.width,
    height: attributes.height,
  })
  if (extentFragment) {
    anchoredDrawingFragment.import(extentFragment)
  }
  const effectExtentFragment = buildEffectExtentFragment()
  anchoredDrawingFragment.import(effectExtentFragment)
  const wrapSquareFragment = buildWrapSquare()
  anchoredDrawingFragment.import(wrapSquareFragment)
  const drawingObjectNonVisualPropertiesFragment =
    buildDrawingObjectNonVisualProperties(
      attributes.id || 0,
      attributes.fileNameWithExtension || "",
    )
  anchoredDrawingFragment.import(drawingObjectNonVisualPropertiesFragment)
  const graphicFragment = buildGraphic(graphicType, attributes)
  anchoredDrawingFragment.import(graphicFragment)

  anchoredDrawingFragment.up()

  return anchoredDrawingFragment
}

function buildInlineDrawing(graphicType: "picture", attributes: Attributes) {
  const inlineDrawingFragment = fragment({
    namespaceAlias: { wp: namespaces.wp },
  })
    .ele("@wp", "inline")
    .att("distB", "0")
    .att("distL", "0")
    .att("distR", "0")
    .att("distT", "0")

  const extentFragment = buildExtent({
    width: attributes.width,
    height: attributes.height,
  })
  if (extentFragment) {
    inlineDrawingFragment.import(extentFragment)
  }
  const effectExtentFragment = buildEffectExtentFragment()
  inlineDrawingFragment.import(effectExtentFragment)
  const drawingObjectNonVisualPropertiesFragment =
    buildDrawingObjectNonVisualProperties(
      attributes.id || 0,
      attributes.fileNameWithExtension || "",
    )
  inlineDrawingFragment.import(drawingObjectNonVisualPropertiesFragment)
  const graphicFragment = buildGraphic(graphicType, attributes)
  inlineDrawingFragment.import(graphicFragment)

  inlineDrawingFragment.up()

  return inlineDrawingFragment
}

function buildDrawing(
  attributes: Attributes,
) {
  const inlineOrAnchored = attributes.inlineOrAnchored || false
  const graphicType = attributes.graphicType || "picture"
  const drawingFragment = fragment({ namespaceAlias: { w: namespaces.w } })
    .ele("@w", "drawing")
  const inlineOrAnchoredDrawingFragment = inlineOrAnchored
    ? buildInlineDrawing(graphicType, attributes)
    : buildAnchoredDrawing(graphicType, attributes)
  drawingFragment.import(inlineOrAnchoredDrawingFragment)
  drawingFragment.up()

  return drawingFragment
}

export {
  buildBold,
  buildDrawing,
  buildIndentation,
  buildItalics,
  buildLineBreak,
  buildNumberingInstances,
  buildParagraph,
  buildRun,
  buildTable,
  buildTextElement,
  buildTextElementsWithSpaceSeparation,
  buildUnderline,
  fixupLineHeight,
}
