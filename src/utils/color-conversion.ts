export const rgbRegex = /rgb\((\d+),\s*([\d.]+),\s*([\d.]+)\)/i
export const hslRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/i
export const hexRegex = /#([0-9A-F]{6})/i
export const hex3Regex = /#([0-9A-F])([0-9A-F])([0-9A-F])/i

export function rgbToHex(
  red?: string | number,
  green?: string | number,
  blue?: string | number,
): string {
  const hexColorCode = [red, green, blue]
    .map((x) => {
      x = (typeof x === "string" ? parseInt(x) : x || 0).toString(16)
      return x.length === 1 ? `0${x}` : x
    })
    .join("")

  return hexColorCode
}

export function hslToHex(
  hue?: number,
  saturation?: number,
  luminosity?: number,
) {
  hue = (hue || 0) / 360
  saturation = (saturation || 0) / 100
  luminosity = (luminosity || 0) / 100

  let red
  let green
  let blue
  if (saturation === 0) {
    red = green = blue = luminosity // achromatic
  }
  else {
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = luminosity < 0.5
      ? luminosity * (1 + saturation)
      : luminosity + saturation - luminosity * saturation
    const p = 2 * luminosity - q
    red = hue2rgb(p, q, hue + 1 / 3)
    green = hue2rgb(p, q, hue)
    blue = hue2rgb(p, q, hue - 1 / 3)
  }
  return [red, green, blue]
    .map((x) => {
      const hex = Math.round(x * 255)
        .toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join("")
}

export function hex3ToHex(
  red: string | number,
  green: string | number,
  blue: string | number,
) {
  const hexColorCode = [red, green, blue].map((color) => `${color}${color}`)
    .join("")

  return hexColorCode
}
