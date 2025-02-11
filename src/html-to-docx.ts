import { decode } from "html-entities"
import { default as HTMLToVDOM } from "html-to-vdom"
// @ts-expect-error  Could not find a declaration file
import VNode from "virtual-dom/vnode/vnode.js"
// @ts-expect-error  Could not find a declaration file
import VText from "virtual-dom/vnode/vtext.js"
import { create } from "xmlbuilder2"

import JSZip from "jszip"
import {
  defaultDocumentOptions,
  defaultHTMLString,
  documentFileName,
  footerFileName,
  footerType,
  headerFileName,
  headerType,
  internalRelationship,
  relsFolderName,
  themeFileName,
  themeFolder,
  themeType,
  wordFolder,
} from "./constants.ts"
import DocxDocument from "./docx-document.ts"
import { renderDocumentFile } from "./helpers/index.ts"
import { relsXML } from "./schemas/index.ts"
import type { DocumentOptions, Margins } from "./types.ts"
import {
  cmRegex,
  cmToTWIP,
  inchRegex,
  inchToTWIP,
  pixelRegex,
  pixelToTWIP,
  pointRegex,
  pointToHIP,
} from "./utils/unit-conversion.ts"

/* eslint-disable new-cap */
const convertHTML = HTMLToVDOM({
  VNode,
  VText,
})

function mergeOptions(
  options: DocumentOptions,
  patch: DocumentOptions,
) {
  return { ...options, ...patch }
}

function fixupFontSize(fontSize: string) {
  let normalizedFontSize: number | undefined
  if (pointRegex.test(fontSize)) {
    const matchedParts = fontSize.match(pointRegex)

    normalizedFontSize = pointToHIP(Number(matchedParts?.[1]))
  }
  else if (fontSize) {
    // assuming it is already in HIP
    normalizedFontSize = Number(fontSize)
  }
  else {
    normalizedFontSize = undefined
  }

  return normalizedFontSize
}

function normalizeUnits(
  dimensioningObject: Record<string, string | number | null>,
  defaultDimensionsProperty: Record<string, string | number>,
): Record<string, string | number> | null {
  const normalizedUnitResult: Record<string, string | number> = {}
  if (typeof dimensioningObject === "object" && dimensioningObject !== null) {
    Object.keys(dimensioningObject)
      .forEach((key) => {
        if (pixelRegex.test(String(dimensioningObject[key]))) {
          const matchedParts = String(dimensioningObject[key])
            .match(pixelRegex)
          normalizedUnitResult[key] = pixelToTWIP(Number(matchedParts?.[1]))
        }
        else if (cmRegex.test(String(dimensioningObject[key]))) {
          const matchedParts = String(dimensioningObject[key])
            .match(cmRegex)
          normalizedUnitResult[key] = cmToTWIP(Number(matchedParts?.[1]))
        }
        else if (inchRegex.test(String(dimensioningObject[key]))) {
          const matchedParts = String(dimensioningObject[key])
            .match(inchRegex)
          normalizedUnitResult[key] = inchToTWIP(Number(matchedParts?.[1]))
        }
        else if (dimensioningObject[key]) {
          normalizedUnitResult[key] = dimensioningObject[key]
        }
        else {
          // In case value is something like 0
          normalizedUnitResult[key] = defaultDimensionsProperty[key]
        }
      })
    return normalizedUnitResult
  }
  else {
    return null
  }
}

function normalizeDocumentOptions(
  documentOptions: DocumentOptions,
): DocumentOptions {
  const normalizedDocumentOptions = {
    ...documentOptions,
  }
  Object.keys(documentOptions)
    .forEach((key) => {
      switch (key) {
        case "pageSize":
        case "margins":
          normalizedDocumentOptions.margins = normalizeUnits(
            documentOptions.margins as Margins,
            defaultDocumentOptions.margins as Margins,
          ) as Margins
          break
        case "fontSize":
        case "complexScriptFontSize":
          normalizedDocumentOptions.complexScriptFontSize = fixupFontSize(
            String(documentOptions.complexScriptFontSize),
          )
          break
        default:
          break
      }
    })

  return normalizedDocumentOptions
}

// Ref: https://en.wikipedia.org/wiki/Office_Open_XML_file_formats
// http://officeopenxml.com/anatomyofOOXML.php
export default async function addFilesToContainer(
  zip: JSZip,
  htmlString: string,
  suppliedDocumentOptions: DocumentOptions,
  headerHTMLString: string,
  footerHTMLString: string,
) {
  const normalizedDocumentOptions = normalizeDocumentOptions(
    suppliedDocumentOptions,
  )
  const documentOptions = mergeOptions(
    defaultDocumentOptions,
    normalizedDocumentOptions,
  )

  if (documentOptions.header && !headerHTMLString) {
    headerHTMLString = defaultHTMLString
  }
  if (documentOptions.footer && !footerHTMLString) {
    footerHTMLString = defaultHTMLString
  }
  if (documentOptions.decodeUnicode) {
    headerHTMLString = decode(headerHTMLString)
    htmlString = decode(htmlString)
    footerHTMLString = decode(footerHTMLString)
  }

  const docxDocument = new DocxDocument({
    ...documentOptions,
    zip,
    htmlString,
    orientation: documentOptions.orientation || "portrait",
    margins: documentOptions.margins || {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      header: 0,
      footer: 0,
      gutter: 0,
    },
    table: documentOptions.table || { row: { cantSplit: false } },
    numbering: documentOptions.numbering ||
      { defaultOrderedListStyleType: "decimal" },
  })
  // Conversion to Word XML happens here
  docxDocument.documentXML = await renderDocumentFile(docxDocument)

  zip.folder(relsFolderName)
    ?.file(
      ".rels",
      create({ encoding: "UTF-8", standalone: true }, relsXML)
        .toString({ prettyPrint: true }),
      { createFolders: false },
    )

  zip.folder("docProps")
    ?.file("core.xml", docxDocument.generateCoreXML(), {
      createFolders: false,
    })

  if (docxDocument.header && headerHTMLString) {
    const vTree = convertHTML(headerHTMLString)

    docxDocument.relationshipFilename = headerFileName
    const { headerId, headerXML } = await docxDocument.generateHeaderXML(vTree)
    docxDocument.relationshipFilename = documentFileName
    const fileNameWithExt = `${headerType}${headerId}.xml`

    const relationshipId = docxDocument.createDocumentRelationships(
      docxDocument.relationshipFilename,
      headerType,
      fileNameWithExt,
      internalRelationship,
    )

    zip.folder(wordFolder)
      ?.file(fileNameWithExt, headerXML.toString({ prettyPrint: true }), {
        createFolders: false,
      })

    docxDocument.headerObjects.push({
      headerId,
      relationshipId,
      type: docxDocument.headerType,
    })
  }
  if (docxDocument.footer && footerHTMLString) {
    const vTree = convertHTML(footerHTMLString)

    docxDocument.relationshipFilename = footerFileName
    const { footerId, footerXML } = await docxDocument.generateFooterXML(vTree)
    docxDocument.relationshipFilename = documentFileName
    const fileNameWithExt = `${footerType}${footerId}.xml`

    const relationshipId = docxDocument.createDocumentRelationships(
      docxDocument.relationshipFilename,
      footerType,
      fileNameWithExt,
      internalRelationship,
    )

    zip.folder(wordFolder)
      ?.file(fileNameWithExt, footerXML.toString({ prettyPrint: true }), {
        createFolders: false,
      })

    docxDocument.footerObjects.push({
      footerId,
      relationshipId,
      type: docxDocument.footerType,
    })
  }
  const themeFileNameWithExt = `${themeFileName}.xml`
  docxDocument.createDocumentRelationships(
    docxDocument.relationshipFilename,
    themeType,
    `${themeFolder}/${themeFileNameWithExt}`,
    internalRelationship,
  )
  zip
    .folder(wordFolder)
    ?.folder(themeFolder)
    ?.file(themeFileNameWithExt, docxDocument.generateThemeXML(), {
      createFolders: false,
    })

  zip
    .folder(wordFolder)
    ?.file("document.xml", docxDocument.generateDocumentXML(), {
      createFolders: false,
    })
    ?.file("fontTable.xml", docxDocument.generateFontTableXML(), {
      createFolders: false,
    })
    ?.file("styles.xml", docxDocument.generateStylesXML(), {
      createFolders: false,
    })
    ?.file("numbering.xml", docxDocument.generateNumberingXML(), {
      createFolders: false,
    })
    ?.file("settings.xml", docxDocument.generateSettingsXML(), {
      createFolders: false,
    })
    ?.file("webSettings.xml", docxDocument.generateWebSettingsXML(), {
      createFolders: false,
    })

  const relationshipXMLs = docxDocument.generateRelsXML()
  if (relationshipXMLs && Array.isArray(relationshipXMLs)) {
    relationshipXMLs.forEach(({ fileName, xmlString }) => {
      zip.folder(wordFolder)
        ?.folder(relsFolderName)
        ?.file(`${fileName}.xml.rels`, xmlString, {
          createFolders: false,
        })
    })
  }

  zip.file("[Content_Types].xml", docxDocument.generateContentTypesXML(), {
    createFolders: false,
  })

  return zip
}
