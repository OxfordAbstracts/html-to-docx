import mimeTypes from "mime-types"

export async function fetchImageToDataUrl(imageUrl: string) {
  try {
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      console.warn(
        `WARNING: Skip download of "${imageUrl}" ` +
          `due to HTTP error ${imageResponse.status}`,
      )
      return emptyPngDataURL
    }

    const base64String = Buffer.from(await imageResponse.arrayBuffer())
      .toString("base64")
    if (!base64String) {
      console.warn("WARNING: Image response could not be converted to base64")
      return emptyPngDataURL
    }
    else {
      if (!mimeTypes.lookup(imageUrl)) {
        console.warn(
          `WARNING: Mime type could not be determined for "${imageUrl}"`,
        )
        return emptyPngDataURL
      }
      else {
        return `data:${mimeTypes.lookup(imageUrl)};base64,${base64String}`
      }
    }
  }
  catch (error) {
    console.warn(
      `WARNING: Image download failed for "${imageUrl}" with following error:`,
      error.cause.message,
    )
    return emptyPngDataURL
  }
}

export function extractBase64Data(src) {
  if (!src) {
    console.error("ERROR: Empty base64 data URL")
    return null
  }

  const idxComma = src.indexOf(",")
  const idxSlash = src.indexOf("/")

  if (idxComma === -1 || idxSlash === -1 || !src.startsWith("data:")) {
    console.error("ERROR: Invalid base64 data URL:\n", src)
    return null
  }

  const idxSemi = src.indexOf(";")
  const extEnd = idxSemi === -1 ? idxComma : Math.min(idxSemi, idxComma)

  return {
    type: src.substring("data:".length, idxSlash),
    extension: src.substring(idxSlash + 1, extEnd),
    base64Content: src.substring(idxComma + 1)
      .trim(),
  }
}

export const emptyPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA" +
  "AAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="

export const emptyPngDataURL = "data:image/png;base64," + emptyPngBase64
