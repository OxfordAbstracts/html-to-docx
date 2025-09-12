import {
  emRegex,
  pixelRegex,
  pixelToHIP,
  pointRegex,
  pointToHIP,
  remRegex,
} from "./unit-conversion.ts"

// Normalize any CSS-like font-size to Word half-points (HIP) number.
// Supports: pt, px, rem, em, and bare numbers (treated as pt).
export function fixupFontSize(fontSizeString: string): number {
  const input = String(fontSizeString || "")
    .trim()

  if (pointRegex.test(input)) {
    const m = input.match(pointRegex)
    return pointToHIP(Number(m?.[1]))
  }
  if (pixelRegex.test(input)) {
    const m = input.match(pixelRegex)
    return pixelToHIP(Number(m?.[1]))
  }
  if (remRegex.test(input)) {
    const m = input.match(remRegex)
    const remVal = Number(m?.[1]) || 0
    return pixelToHIP(remVal * 16)
  }
  if (emRegex.test(input)) {
    const m = input.match(emRegex)
    const emVal = Number(m?.[1]) || 0
    return pixelToHIP(emVal * 16)
  }
  if (/^\d+(?:\.\d+)?$/.test(input)) {
    // Treat bare numbers as points
    return pointToHIP(Number(input))
  }

  // Default to 12pt = 24 HIP
  return 24
}

export default fixupFontSize
