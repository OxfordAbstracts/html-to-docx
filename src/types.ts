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
  orientation?: string
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
    restart: string
  }
  numbering?: {
    defaultOrderedListStyleType: string
  }
  decodeUnicode?: boolean
  defaultLang?: string
}
