import { fileTypeFromBuffer } from "file-type"
import mimeTypes from "mime-types"

export async function fetchImageToDataUrl(imageUrlStr: string) {
  try {
    const imageUrl = new URL(imageUrlStr)
    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      console.warn(
        `WARNING: Skip download of "${imageUrl}" ` +
          `due to HTTP error ${imageResponse.status}`,
      )
      return emptyPngDataURL
    }
    const imgArrayBuff = await imageResponse.arrayBuffer()
    const base64String = Buffer.from(imgArrayBuff)
      .toString("base64")
    if (!base64String) {
      console.warn("WARNING: Image response could not be converted to base64")
      return emptyPngDataURL
    }
    else {
      let mimeType = mimeTypes.lookup(imageUrl.pathname)
      if (!mimeType) {
        const fileType = await fileTypeFromBuffer(imgArrayBuff)
        mimeType = fileType?.mime || "png"
      }
      return `data:${mimeType};base64,${base64String}`
    }
  }
  catch (error) {
    const errorObj = error as Error & { cause?: Error }
    console.warn(
      "WARNING: " +
        `Image download failed for "${imageUrlStr}" with following error:`,
      (errorObj.cause ?? errorObj).message,
    )

    return emptyPngDataURL
  }
}

export function extractBase64Data(src: string) {
  if (!src) {
    console.warn("WARNING: Empty base64 data URL")
    return null
  }

  const idxComma = src.indexOf(",")
  const idxSlash = src.indexOf("/")

  if (idxComma === -1 || idxSlash === -1 || !src.startsWith("data:")) {
    console.warn("WARNING: Invalid base64 data URL:\n", src)
    return null
  }

  const idxSemi = src.indexOf(";")
  const extEnd = idxSemi === -1 ? idxComma : Math.min(idxSemi, idxComma)

  const base64Content = src.substring(idxComma + 1)
    .trim()

  if (!base64Content) {
    console.warn("WARNING: Empty base64 data URL")
    return null
  }

  return {
    type: src.substring("data:".length, idxSlash),
    extension: src.substring(idxSlash + 1, extEnd),
    base64Content,
  }
}

export const emptyPngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAA" +
  "AAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII="

export const emptyPngDataURL = "data:image/png;base64," + emptyPngBase64
