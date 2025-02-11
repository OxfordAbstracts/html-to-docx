import lodash from "lodash"
import { type DocumentOptions } from "./types.ts"

const applicationName = "html-to-docx"
const defaultOrientation = "portrait"
const landscapeWidth = 15840
const landscapeHeight = 12240
const landscapeMargins = {
  top: 1800,
  right: 1440,
  bottom: 1800,
  left: 1440,
  header: 720,
  footer: 720,
  gutter: 0,
}
const portraitMargins = {
  top: 1440,
  right: 1800,
  bottom: 1440,
  left: 1800,
  header: 720,
  footer: 720,
  gutter: 0,
}
const defaultFont = "Times New Roman"
const defaultFontSize = 22
const defaultLang = "en-US"
const defaultDocumentOptions: DocumentOptions = {
  orientation: defaultOrientation,
  margins: lodash.cloneDeep(portraitMargins),
  creator: applicationName,
  keywords: [applicationName],
  lastModifiedBy: applicationName,
  font: defaultFont,
  fontSize: defaultFontSize,
  complexScriptFontSize: defaultFontSize,
  pageSize: {
    width: landscapeHeight,
    height: landscapeWidth,
  },
  defaultLang,
}
const defaultHTMLString = "<p></p>"
const relsFolderName = "_rels"
const headerFileName = "header1"
const footerFileName = "footer1"
const themeFileName = "theme1"
const documentFileName = "document"
const headerType = "header"
const footerType = "footer"
const themeType = "theme"
const hyperlinkType = "hyperlink"
const imageType = "image"
const internalRelationship = "Internal"
const wordFolder = "word"
const themeFolder = "theme"
const paragraphBordersObject = {
  top: {
    size: 0,
    spacing: 3,
    color: "FFFFFF",
  },
  left: {
    size: 0,
    spacing: 3,
    color: "FFFFFF",
  },
  bottom: {
    size: 0,
    spacing: 3,
    color: "FFFFFF",
  },
  right: {
    size: 0,
    spacing: 3,
    color: "FFFFFF",
  },
}
const colorlessColors = ["transparent", "auto"]
const verticalAlignValues = ["top", "middle", "bottom"]

export {
  applicationName,
  colorlessColors,
  defaultDocumentOptions,
  defaultFont,
  defaultFontSize,
  defaultHTMLString,
  defaultLang,
  defaultOrientation,
  documentFileName,
  footerFileName,
  footerType,
  headerFileName,
  headerType,
  hyperlinkType,
  imageType,
  internalRelationship,
  landscapeHeight,
  landscapeMargins,
  landscapeWidth,
  paragraphBordersObject,
  portraitMargins,
  relsFolderName,
  themeFileName,
  themeFolder,
  themeType,
  verticalAlignValues,
  wordFolder,
}
