import type { ListType } from "../types.ts"

export default class ListStyleBuilder {
  defaults: { defaultOrderedListStyleType: ListType }

  // defaults is passed in from constants.ts
  constructor(defaults: { defaultOrderedListStyleType: ListType }) {
    this.defaults = defaults || { defaultOrderedListStyleType: "decimal" }
  }

  getListStyleType(listType: ListType) {
    switch (listType) {
      case "upper-roman":
        return "upperRoman"
      case "lower-roman":
        return "lowerRoman"
      case "upper-alpha":
      case "upper-alpha-bracket-end":
        return "upperLetter"
      case "lower-alpha":
      case "lower-alpha-bracket-end":
        return "lowerLetter"
      case "decimal":
      case "decimal-bracket":
        return "decimal"
      default:
        return this.defaults.defaultOrderedListStyleType
    }
  }

  getListPrefixSuffix(style: { "list-style-type": ListType }, lvl: number) {
    let listType = this.defaults.defaultOrderedListStyleType

    if (style && style["list-style-type"]) {
      listType = style["list-style-type"]
    }

    switch (listType) {
      case "upper-roman":
      case "lower-roman":
      case "upper-alpha":
      case "lower-alpha":
        return `%${lvl + 1}.`
      case "upper-alpha-bracket-end":
      case "lower-alpha-bracket-end":
      case "decimal-bracket-end":
        return `%${lvl + 1})`
      case "decimal-bracket":
        return `(%${lvl + 1})`
      case "decimal":
      default:
        return `%${lvl + 1}.`
    }
  }
}
