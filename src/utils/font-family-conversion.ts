export const removeSimpleOrDoubleQuotes = /(["'])(.*?)\1/

export function fontFamilyToTableObject(
  fontFamilyString: string,
  fallbackFont: string,
): {
  fontName: string
  genericFontName: string
} {
  const fontFamilyElements = fontFamilyString
    ? fontFamilyString.split(",")
      .map((fontName: string) => {
        const trimmedFontName = fontName.trim()
        if (removeSimpleOrDoubleQuotes.test(trimmedFontName)) {
          return trimmedFontName.match(removeSimpleOrDoubleQuotes)?.[2]
        }
        return trimmedFontName
      })
    : [fallbackFont]

  return {
    fontName: fontFamilyElements[0] || fallbackFont,
    genericFontName: fontFamilyElements[fontFamilyElements.length - 1] ||
      fallbackFont,
  }
}
