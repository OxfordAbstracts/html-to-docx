import { nanoid } from "nanoid"
import { createHash } from "node:crypto"
import { create, fragment } from "xmlbuilder2"

import JSZip from "jszip"
import type { VTree } from "virtual-dom"
import type { XMLBuilder } from "xmlbuilder2/lib/interfaces.d.ts"
import {
  applicationName,
  defaultDocumentOptions,
  defaultFont,
  defaultFontSize,
  defaultLang,
  defaultOrientation,
  documentFileName,
  footerType as footerFileType,
  headerType as headerFileType,
  hyperlinkType,
  imageType,
  landscapeHeight,
  landscapeMargins,
  landscapeWidth,
  portraitMargins,
  themeType as themeFileType,
} from "./constants.ts"
import { convertVTreeToXML } from "./helpers/index.ts"
import namespaces from "./namespaces.ts"
import {
  contentTypesXML as contentTypesXMLString,
  documentRelsXML as documentRelsXMLString,
  fontTableXML as fontTableXMLString,
  generateCoreXML,
  generateDocumentTemplate,
  generateNumberingXMLTemplate,
  generateStylesXML,
  generateThemeXML,
  genericRelsXML as genericRelsXMLString,
  settingsXML as settingsXMLString,
  webSettingsXML as webSettingsXMLString,
} from "./schemas/index.ts"
import type { ListType, Margins } from "./types.ts"
import { extractBase64Data } from "./utils/base64.ts"
import { fontFamilyToTableObject } from "./utils/font-family-conversion.ts"
import ListStyleBuilder from "./utils/list.ts"

function extractCssClassStyles(html: string) {
  // Grab the raw CSS sitting in every <style>…</style> tag
  const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi
  let css = ""
  let m: RegExpExecArray | null
  while ((m = styleTagRegex.exec(html)) !== null) {
    css += m[1]
  }

  // Parse only very-simple “.class { prop: value; … }” rules
  const classStyles: Record<string, Record<string, string>> = {}
  const ruleRegex = /\.([\w-]+)\s*\{([^}]*)\}/g
  let r: RegExpExecArray | null
  while ((r = ruleRegex.exec(css)) !== null) {
    const className = r[1].trim()
    const decls = r[2].split(";")
    const kv: Record<string, string> = {}
    for (const d of decls) {
      const [k, v] = d.split(":")
        .map(s => s?.trim())
      if (k && v) kv[k.toLowerCase()] = v
    }
    classStyles[className] = kv
  }
  return classStyles
}

function sha1(content: string) {
  return createHash("sha1")
    .update(content)
    .digest("hex")
}

function generateContentTypesFragments(
  contentTypesXML: XMLBuilder,
  type: string,
  objects: Record<string, unknown>[],
) {
  if (objects && Array.isArray(objects)) {
    objects.forEach((object) => {
      const contentTypesFragment = fragment({
        defaultNamespace: { ele: namespaces.contentTypes },
      })
        .ele("Override")
        .att("PartName", `/word/${type}${object[`${type}Id`]}.xml`)
        .att(
          "ContentType",
          "application/vnd.openxmlformats-officedocument" +
            `.wordprocessingml.${type}+xml`,
        )
        .up()

      contentTypesXML.root()
        .import(contentTypesFragment)
    })
  }
}

function generateSectionReferenceXML(
  documentXML: XMLBuilder,
  documentSectionType: string,
  objects: { relationshipId: number; type: string }[],
  isEnabled: boolean,
) {
  if (isEnabled && objects && Array.isArray(objects) && objects.length) {
    const xmlFragment = fragment()
    objects.forEach(({ relationshipId, type }) => {
      const objectFragment = fragment({
        namespaceAlias: { w: namespaces.w, r: namespaces.r },
      })
        .ele("@w", `${documentSectionType}Reference`)
        .att("@r", "id", `rId${relationshipId}`)
        .att("@w", "type", type)
        .up()
      xmlFragment.import(objectFragment)
    })
    const sectPr = documentXML.root()
      .first()
      .last()
    sectPr.import(xmlFragment)
  }
}

function generateXMLString(xmlString: string) {
  const xmlDocumentString = create(
    { encoding: "UTF-8", standalone: true },
    xmlString,
  )
  return xmlDocumentString.toString({ prettyPrint: true })
}

async function generateSectionXML(
  this: DocxDocument,
  vTree: VTree,
  type: "header" | "footer",
): Promise<
  | { headerId: number; headerXML: XMLBuilder }
  | { footerId: number; footerXML: XMLBuilder }
> {
  const sectionXML = create({
    encoding: "UTF-8",
    standalone: true,
    namespaceAlias: {
      w: namespaces.w,
      ve: namespaces.ve,
      o: namespaces.o,
      r: namespaces.r,
      v: namespaces.v,
      wp: namespaces.wp,
      w10: namespaces.w10,
    },
  })
    .ele(
      "@w",
      type === "header"
        ? "hdr"
        : "ftr",
    )

  const XMLFragment = fragment()
  await convertVTreeToXML(this, vTree, XMLFragment)
  if (
    type === "footer" &&
    (XMLFragment.first().node as unknown as Element).tagName === "p" &&
    this.pageNumber
  ) {
    XMLFragment.first()
      .import(
        fragment({ namespaceAlias: { w: namespaces.w } })
          .ele("@w", "fldSimple")
          .att("@w", "instr", "PAGE")
          .ele("@w", "r")
          .up()
          .up(),
      )
  }
  sectionXML.root()
    .import(XMLFragment)

  if (type === "header") {
    this.lastHeaderId += 1

    return {
      headerId: this.lastHeaderId,
      headerXML: sectionXML,
    }
  }
  else {
    this.lastFooterId += 1

    return {
      footerId: this.lastFooterId,
      footerXML: sectionXML,
    }
  }
}

export default class DocxDocument {
  zip: JSZip
  htmlString: string
  cssClassStyles: Record<string, Record<string, string>>
  orientation: "portrait" | "landscape"
  pageSize?: { height: number; width: number }
  width: number
  height: number
  margins?: Margins
  availableDocumentSpace: number
  title: string
  subject: string
  creator: string
  keywords: string[]
  description: string
  lastModifiedBy: string
  revision: number
  createdAt: Date
  modifiedAt: Date
  headerType: string
  header: boolean
  footerType: string
  footer: boolean
  font: string
  fontSize: number
  complexScriptFontSize: number
  lang: string
  tableRowCantSplit: boolean
  pageNumber: boolean
  skipFirstHeaderFooter: boolean
  lineNumberOptions?: {
    countBy: number
    start: number
    restart: "continuous" | "newPage" | "newSection"
  }
  lastNumberingId: number
  lastMediaId: number
  lastHeaderId: number
  lastFooterId: number
  stylesObjects: unknown[]
  numberingObjects: {
    numberingId: number
    type: string
    properties: {
      style?: {
        "list-style-type": ListType
      }
      attributes?: {
        "data-start": number
      }
    }
  }[]
  fontTableObjects: {
    fontName: string
    genericFontName: string
  }[]
  relationshipFilename: string
  relationships: {
    fileName: string
    lastRelsId: number
    rels: {
      relationshipId: number
      type: string
      target: string
      targetMode: string
    }[]
  }[]
  mediaFiles: unknown[]
  headerObjects: {
    headerId: number
    relationshipId: number
    type: string
  }[]
  footerObjects: {
    footerId: number
    relationshipId: number
    type: string
  }[]
  documentXML: XMLBuilder | null
  generateSectionXML: typeof generateSectionXML
  ListStyleBuilder: ListStyleBuilder

  constructor(properties: {
    zip: JSZip
    htmlString: string
    orientation: "portrait" | "landscape"
    pageSize?: { height: number; width: number }
    margins?: Margins
    title?: string
    subject?: string
    creator?: string
    keywords?: string[]
    description?: string
    lastModifiedBy?: string
    revision?: number
    createdAt?: Date
    modifiedAt?: Date
    headerType?: string
    header?: boolean
    footerType?: string
    footer?: boolean
    font?: string
    fontSize?: number
    complexScriptFontSize?: number
    lang?: string
    table: { row: { cantSplit: boolean } }
    tableRowCantSplit?: boolean
    pageNumber?: boolean
    skipFirstHeaderFooter?: boolean
    lineNumber?: boolean
    lineNumberOptions?: {
      countBy: number
      start: number
      restart: "continuous" | "newPage" | "newSection"
    }
    numbering: { defaultOrderedListStyleType: ListType }
    mediaFiles?: string[]
    headerObjects?: {
      headerId: number
      relationshipId: number
      type: string
    }[]
    footerObjects?: {
      footerId: number
      relationshipId: number
      type: string
    }[]
  }) {
    this.zip = properties.zip
    this.htmlString = properties.htmlString
    this.cssClassStyles = extractCssClassStyles(this.htmlString)
    this.orientation = properties.orientation
    this.pageSize = properties.pageSize || defaultDocumentOptions.pageSize

    const isPortraitOrientation = this.orientation === defaultOrientation
    const height = this.pageSize?.height
      ? this.pageSize.height
      : landscapeHeight
    const width = this.pageSize?.width ? this.pageSize.width : landscapeWidth

    this.width = isPortraitOrientation ? width : height
    this.height = isPortraitOrientation ? height : width

    const marginsObject = properties.margins
    this.margins = marginsObject && Object.keys(marginsObject).length
      ? marginsObject
      : isPortraitOrientation
        ? portraitMargins
        : landscapeMargins

    this.availableDocumentSpace = this.width - this.margins.left -
      this.margins.right
    this.title = properties.title || ""
    this.subject = properties.subject || ""
    this.creator = properties.creator || applicationName
    this.keywords = properties.keywords || [applicationName]
    this.description = properties.description || ""
    this.lastModifiedBy = properties.lastModifiedBy || applicationName
    this.revision = properties.revision || 1
    this.createdAt = properties.createdAt || new Date()
    this.modifiedAt = properties.modifiedAt || new Date()
    this.headerType = properties.headerType || "default"
    this.header = properties.header || false
    this.footerType = properties.footerType || "default"
    this.footer = properties.footer || false
    this.font = properties.font || defaultFont
    this.fontSize = properties.fontSize || defaultFontSize
    this.complexScriptFontSize = properties.complexScriptFontSize ||
      defaultFontSize
    this.lang = properties.lang || defaultLang
    this.tableRowCantSplit = (properties.table && properties.table.row &&
      properties.table.row.cantSplit) || false
    this.pageNumber = properties.pageNumber || false
    this.skipFirstHeaderFooter = properties.skipFirstHeaderFooter || false
    this.lineNumberOptions = properties.lineNumber
      ? properties.lineNumberOptions
      : undefined

    this.lastNumberingId = 0
    this.lastMediaId = 0
    this.lastHeaderId = 0
    this.lastFooterId = 0
    this.stylesObjects = []
    this.numberingObjects = []
    this.fontTableObjects = []
    this.relationshipFilename = documentFileName
    this.relationships = [{
      fileName: documentFileName,
      lastRelsId: 5,
      rels: [],
    }]
    this.mediaFiles = []
    this.headerObjects = []
    this.footerObjects = []
    this.documentXML = null

    this.generateContentTypesXML = this.generateContentTypesXML.bind(this)
    this.generateDocumentXML = this.generateDocumentXML.bind(this)
    this.generateCoreXML = this.generateCoreXML.bind(this)
    this.generateSettingsXML = this.generateSettingsXML.bind(this)
    this.generateWebSettingsXML = this.generateWebSettingsXML.bind(this)
    this.generateStylesXML = this.generateStylesXML.bind(this)
    this.generateFontTableXML = this.generateFontTableXML.bind(this)
    this.generateThemeXML = this.generateThemeXML.bind(this)
    this.generateNumberingXML = this.generateNumberingXML.bind(this)
    this.generateRelsXML = this.generateRelsXML.bind(this)
    this.createMediaFile = this.createMediaFile.bind(this)
    this.createDocumentRelationships = this.createDocumentRelationships.bind(
      this,
    )
    this.generateHeaderXML = this.generateHeaderXML.bind(this)
    this.generateFooterXML = this.generateFooterXML.bind(this)
    this.generateSectionXML = generateSectionXML.bind(this)

    this.ListStyleBuilder = new ListStyleBuilder(properties.numbering)
  }

  generateContentTypesXML() {
    const contentTypesXML = create(
      { encoding: "UTF-8", standalone: true },
      contentTypesXMLString,
    )

    generateContentTypesFragments(
      contentTypesXML,
      "header",
      this.headerObjects,
    )
    generateContentTypesFragments(
      contentTypesXML,
      "footer",
      this.footerObjects,
    )

    return contentTypesXML.toString({ prettyPrint: true })
  }

  generateDocumentXML() {
    const documentXML = create(
      { encoding: "UTF-8", standalone: true },
      generateDocumentTemplate(),
    )

    const body = documentXML
      .root()
      .first()

    if (this.documentXML) {
      body.import(this.documentXML)
    }
    else {
      throw new Error("Document XML must be created before importing")
    }

    const sectPr = fragment({ namespaceAlias: { w: namespaces.w } })
      .ele("@w", "sectPr")
      .ele("@w", "pgSz")
      .att("@w", "w", String(this.width))
      .att("@w", "h", String(this.height))
      .att("@w", "orient", this.orientation)
      .up()
      .ele("@w", "pgMar")
      .att("@w", "top", String(this.margins?.top || 0))
      .att("@w", "right", String(this.margins?.right || 0))
      .att("@w", "bottom", String(this.margins?.bottom || 0))
      .att("@w", "left", String(this.margins?.left || 0))
      .att("@w", "header", String(this.margins?.header || 0))
      .att("@w", "footer", String(this.margins?.footer || 0))
      .att("@w", "gutter", String(this.margins?.gutter || 0))
      .up()
      .up()
    body.import(sectPr)

    // console.log(
    //   documentXML.root()
    //     .first()
    //     .toString({ prettyPrint: true }),
    // )

    generateSectionReferenceXML(
      documentXML,
      "header",
      this.headerObjects,
      this.header,
    )
    generateSectionReferenceXML(
      documentXML,
      "footer",
      this.footerObjects,
      this.footer,
    )

    if ((this.header || this.footer) && this.skipFirstHeaderFooter) {
      documentXML
        .root()
        .first()
        .first()
        .import(
          fragment({ namespaceAlias: { w: namespaces.w } })
            .ele("@w", "titlePg"),
        )
    }
    if (this.lineNumberOptions) {
      const { countBy, start, restart } = this.lineNumberOptions
      documentXML
        .root()
        .first()
        .first()
        .import(
          fragment({ namespaceAlias: { w: namespaces.w } })
            .ele("@w", "lnNumType")
            .att("@w", "countBy", String(countBy))
            .att("@w", "start", String(start))
            .att("@w", "restart", String(restart)),
        )
    }

    return documentXML.toString({ prettyPrint: true })
  }

  generateCoreXML() {
    return generateXMLString(
      generateCoreXML(
        this.title,
        this.subject,
        this.creator,
        this.keywords,
        this.description,
        this.lastModifiedBy,
        this.revision,
        this.createdAt,
        this.modifiedAt,
      ),
    )
  }

  generateSettingsXML() {
    return generateXMLString(settingsXMLString)
  }

  generateWebSettingsXML() {
    return generateXMLString(webSettingsXMLString)
  }

  generateStylesXML() {
    return generateXMLString(
      generateStylesXML(
        this.font,
        this.fontSize,
        this.complexScriptFontSize,
        this.lang,
      ),
    )
  }

  generateFontTableXML() {
    const fontTableXML = create(
      { encoding: "UTF-8", standalone: true },
      fontTableXMLString,
    )
    const fontNames = [
      "Arial",
      "Calibri",
      "Calibri Light",
      "Courier New",
      "Symbol",
      "Times New Roman",
    ]
    this.fontTableObjects.forEach(({ fontName, genericFontName }) => {
      if (!fontNames.includes(fontName)) {
        fontNames.push(fontName)
        const fontFragment = fragment({
          namespaceAlias: { w: namespaces.w },
        })
          .ele("@w", "font")
          .att("@w", "name", fontName)

        switch (genericFontName) {
          case "serif":
            fontFragment.ele("@w", "altName")
              .att("@w", "val", "Times New Roman")
            fontFragment.ele("@w", "family")
              .att("@w", "val", "roman")
            fontFragment.ele("@w", "pitch")
              .att("@w", "val", "variable")
            break
          case "sans-serif":
            fontFragment.ele("@w", "altName")
              .att("@w", "val", "Arial")
            fontFragment.ele("@w", "family")
              .att("@w", "val", "swiss")
            fontFragment.ele("@w", "pitch")
              .att("@w", "val", "variable")
            break
          case "monospace":
            fontFragment.ele("@w", "altName")
              .att("@w", "val", "Courier New")
            fontFragment.ele("@w", "family")
              .att("@w", "val", "modern")
            fontFragment.ele("@w", "pitch")
              .att("@w", "val", "fixed")
            break
          default:
            break
        }

        fontTableXML.root()
          .import(fontFragment)
      }
    })

    return fontTableXML.toString({ prettyPrint: true })
  }

  generateThemeXML() {
    return generateXMLString(generateThemeXML(this.font))
  }

  generateNumberingXML() {
    const numberingXML = create(
      { encoding: "UTF-8", standalone: true },
      generateNumberingXMLTemplate(),
    )

    const abstractNumberingFragments = fragment()
    const numberingFragments = fragment()

    this.numberingObjects.forEach(({ numberingId, type, properties }) => {
      const abstractNumberingFragment = fragment({
        namespaceAlias: { w: namespaces.w },
      })
        .ele("@w", "abstractNum")
        .att("@w", "abstractNumId", String(numberingId))
      ;[
        ...Array(8)
          .keys(),
      ].forEach((level) => {
        const levelFragment = fragment({
          namespaceAlias: { w: namespaces.w },
        })
          .ele("@w", "lvl")
          .att("@w", "ilvl", String(level))
          .ele("@w", "start")
          .att(
            "@w",
            "val",
            type === "ol"
              ? String(properties?.attributes?.["data-start"] || 1)
              : "1",
          )
          .up()
          .ele("@w", "numFmt")
          .att(
            "@w",
            "val",
            type === "ol"
              ? this.ListStyleBuilder.getListStyleType(
                properties?.style?.["list-style-type"] || "decimal",
              )
              : "bullet",
          )
          .up()
          .ele("@w", "lvlText")
          .att(
            "@w",
            "val",
            type === "ol"
              ? this.ListStyleBuilder.getListPrefixSuffix(
                properties.style || { "list-style-type": "decimal" },
                level,
              )
              : "",
          )
          .up()
          .ele("@w", "lvlJc")
          .att("@w", "val", "left")
          .up()
          .ele("@w", "pPr")
          .ele("@w", "tabs")
          .ele("@w", "tab")
          .att("@w", "val", "num")
          .att("@w", "pos", String((level + 1) * 720))
          .up()
          .up()
          .ele("@w", "ind")
          .att("@w", "left", String((level + 1) * 720))
          .att("@w", "hanging", "360")
          .up()
          .up()
          .up()

        if (type === "ul") {
          levelFragment.last()
            .import(
              fragment({ namespaceAlias: { w: namespaces.w } })
                .ele("@w", "rPr")
                .ele("@w", "rFonts")
                .att("@w", "ascii", "Symbol")
                .att("@w", "hAnsi", "Symbol")
                .att("@w", "hint", "default")
                .up()
                .up(),
            )
        }
        abstractNumberingFragment.import(levelFragment)
      })
      abstractNumberingFragment.up()
      abstractNumberingFragments.import(abstractNumberingFragment)

      numberingFragments.import(
        fragment({ namespaceAlias: { w: namespaces.w } })
          .ele("@w", "num")
          .att("@w", "numId", String(numberingId))
          .ele("@w", "abstractNumId")
          .att("@w", "val", String(numberingId))
          .up()
          .up(),
      )
    })

    numberingXML.root()
      .import(abstractNumberingFragments)
    numberingXML.root()
      .import(numberingFragments)

    return numberingXML.toString({ prettyPrint: true })
  }

  appendRelationships(
    xmlFragment: XMLBuilder,
    relationships: {
      relationshipId: number
      type: string
      target: string
      targetMode: string
    }[],
  ) {
    relationships.forEach(({ relationshipId, type, target, targetMode }) => {
      xmlFragment.import(
        fragment({ defaultNamespace: { ele: namespaces.relationship } })
          .ele("Relationship")
          .att("Id", `rId${relationshipId}`)
          .att("Type", type)
          .att("Target", target)
          .att("TargetMode", targetMode)
          .up(),
      )
    })
  }

  generateRelsXML() {
    const relationshipXMLStrings = this.relationships.map(
      ({ fileName, rels }) => {
        const xmlFragment = create(
          { encoding: "UTF-8", standalone: true },
          fileName === documentFileName
            ? documentRelsXMLString
            : genericRelsXMLString,
        )
        this.appendRelationships(xmlFragment.root(), rels)

        return {
          fileName,
          xmlString: xmlFragment.toString({ prettyPrint: true }),
        }
      },
    )

    return relationshipXMLStrings
  }

  createNumbering(
    type: string,
    properties: { attributes: { "data-start": number } },
  ) {
    this.lastNumberingId += 1
    this.numberingObjects.push(
      { numberingId: this.lastNumberingId, type, properties },
    )

    return this.lastNumberingId
  }

  createFont(fontFamily: string) {
    const fontTableObject = fontFamilyToTableObject(fontFamily, this.font)
    this.fontTableObjects.push(fontTableObject)
    return fontTableObject.fontName || ""
  }

  createMediaFile(srcString: string) {
    const fileData = extractBase64Data(srcString)
    if (!fileData) {
      throw new Error("Invalid data URL")
    }

    const fileExtension = fileData.extension === "octet-stream"
      ? "png"
      : fileData.extension

    const randId = nanoid(8)
    const contentHash = sha1(fileData.base64Content)
    const fileNameWithExtension =
      `image-${randId}-${contentHash}.${fileExtension}`

    this.lastMediaId += 1

    return {
      id: this.lastMediaId,
      fileContent: fileData.base64Content,
      fileNameWithExtension,
    }
  }

  createDocumentRelationships(
    fileName = "document",
    type: string,
    target: string,
    targetMode = "External",
  ) {
    let relationshipObject = this.relationships.find(
      (relationship) => relationship.fileName === fileName,
    )
    let lastRelsId = 1
    if (relationshipObject) {
      lastRelsId = relationshipObject.lastRelsId + 1
      relationshipObject.lastRelsId = lastRelsId
    }
    else {
      relationshipObject = { fileName, lastRelsId, rels: [] }
      this.relationships.push(relationshipObject)
    }
    let relationshipType
    switch (type) {
      case hyperlinkType:
        relationshipType = namespaces.hyperlinks
        break
      case imageType:
        relationshipType = namespaces.images
        break
      case headerFileType:
        relationshipType = namespaces.headers
        break
      case footerFileType:
        relationshipType = namespaces.footers
        break
      case themeFileType:
        relationshipType = namespaces.themes
        break
      default:
        break
    }

    relationshipObject.rels.push({
      relationshipId: lastRelsId,
      type: relationshipType || "",
      target,
      targetMode,
    })

    return lastRelsId
  }

  generateHeaderXML(vTree: VTree) {
    return this.generateSectionXML(vTree, "header") as Promise<{
      headerId: number
      headerXML: XMLBuilder
    }>
  }

  generateFooterXML(vTree: VTree) {
    return this.generateSectionXML(vTree, "footer") as Promise<{
      footerId: number
      footerXML: XMLBuilder
    }>
  }
}
