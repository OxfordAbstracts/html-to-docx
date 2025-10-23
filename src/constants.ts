import lodash from "lodash"
import { type DocumentOptions } from "./types.ts"

export const applicationName = "@oxfordabstracts/html-to-docx"
export const defaultOrientation = "portrait"
export const landscapeWidth = 15840
export const landscapeHeight = 12240
export const landscapeMargins = {
  top: 1800,
  right: 1440,
  bottom: 1800,
  left: 1440,
  header: 720,
  footer: 720,
  gutter: 0,
}
export const portraitMargins = {
  top: 1440,
  right: 1800,
  bottom: 1440,
  left: 1800,
  header: 720,
  footer: 720,
  gutter: 0,
}
export const defaultFont = "Times New Roman"
export const defaultFontSize = 22
export const defaultLang = "en-US"
export const defaultDocumentOptions: DocumentOptions = {
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
  embedImages: true,
}
export const defaultHTMLString = "<p></p>"
export const relsFolderName = "_rels"
export const headerFileName = "header1"
export const footerFileName = "footer1"
export const themeFileName = "theme1"
export const documentFileName = "document"
export const headerType = "header"
export const footerType = "footer"
export const themeType = "theme"
export const hyperlinkType = "hyperlink"
export const imageType = "image"
export const internalRelationship = "Internal"
export const wordFolder = "word"
export const themeFolder = "theme"
export const paragraphBordersObject = {
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
export const colorlessColors = ["transparent", "auto"]
export const verticalAlignValues = ["top", "middle", "bottom"]

export const htmlInlineElements = [
  "a",
  "abbr",
  "acronym",
  "b",
  "bdo",
  "big",
  "br",
  "button",
  "cite",
  "code",
  "del",
  "dfn",
  "em",
  "i",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "map",
  "mark",
  "output",
  "q",
  "s",
  "samp",
  "script",
  "select",
  "small",
  "span",
  "strike",
  "strong",
  "sub",
  "sup",
  "textarea",
  "time",
  "tt",
  "u",
  "var",
]

export const htmlHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"]

// export const htmlBlockElements = [
//   "address",
//   "article",
//   "aside",
//   "blockquote",
//   "canvas",
//   "dd",
//   "div",
//   "dl",
//   "dt",
//   "fieldset",
//   "figcaption",
//   "figure",
//   "footer",
//   "form",
//   "header",
//   ...htmlHeadings,
//   "hr",
//   "li",
//   "main",
//   "nav",
//   "noscript",
//   "ol",
//   "p",
//   "pre",
//   "section",
//   "table",
//   "tfoot",
//   "ul",
//   "video",
// ]
