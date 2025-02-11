import JSZip from "jszip"

export type ListType =
  | "upper-roman"
  | "lower-roman"
  | "upper-alpha"
  | "upper-alpha-bracket-end"
  | "lower-alpha"
  | "lower-alpha-bracket-end"
  | "decimal"
  | "decimal-bracket"
  | "decimal-bracket-end"

export type Margins = {
  top: number
  right: number
  bottom: number
  left: number
  header: number
  footer: number
  gutter: number
}

export type DocumentOptions = {
  zip?: JSZip
  htmlString?: string
  orientation?: "portrait" | "landscape"
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
  table?: {
    row: {
      cantSplit: boolean
    }
  }
  pageSize?: {
    width: number
    height: number
  }
  pageNumber?: boolean
  skipFirstHeaderFooter?: boolean
  lineNumber?: boolean
  lineNumberOptions?: {
    countBy: number
    start: number
    restart: "continuous" | "newPage" | "newSection"
  }
  numbering?: {
    defaultOrderedListStyleType: ListType
  }
  decodeUnicode?: boolean
  defaultLang?: string
}
