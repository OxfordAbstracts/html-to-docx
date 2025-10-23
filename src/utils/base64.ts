import { fileTypeFromBuffer } from "file-type"
import imageSize from "image-size"
import mimeTypes from "mime-types"
import type { ImageDimensions } from "./image-dimensions.ts"

/**
 * Fetches only enough data from an image URL to determine its dimensions.
 * Uses streaming to download chunks incrementally and stops as soon as
 * image-size can determine the dimensions. This is more efficient than
 * downloading a fixed amount of data.
 *
 * Maximum download limit: 256KB to prevent excessive bandwidth usage on
 * corrupted or very large images where dimensions can't be detected.
 */
export async function fetchImageDimensionsFromUrl(
  imageUrlStr: string,
): Promise<ImageDimensions | null> {
  const MAX_BYTES = 256 * 1024 // 256KB - reasonable limit for dimension detection

  try {
    const imageUrl = new URL(imageUrlStr)
    const imageResponse = await fetch(imageUrl)

    if (!imageResponse.ok) {
      console.warn(
        `WARNING: Skip image dimension fetch of "${imageUrl}" ` +
          `due to HTTP error ${imageResponse.status}`,
      )
      return null
    }

    if (!imageResponse.body) {
      console.warn(
        `WARNING: No response body for image dimension fetch of "${imageUrl}"`,
      )
      return null
    }

    // Stream the response and try to detect dimensions after each chunk
    const chunks: Uint8Array[] = []
    let totalBytes = 0
    const reader = imageResponse.body.getReader()

    try {
      while (true) {
        const { done, value } = await reader.read()

        if (value) {
          chunks.push(value)
          totalBytes += value.length

          // Try to get dimensions from accumulated chunks
          try {
            const buffer = Buffer.concat(chunks)
            const dimensions = imageSize(buffer) as ImageDimensions
            if (dimensions && dimensions.width && dimensions.height) {
              // Cancel the stream since we have the dimensions
              await reader.cancel()
              return dimensions
            }
          }
          catch (error) {
            // image-size will throw until we have enough data
            // Continue reading more chunks
          }

          // Safety check: stop if we've downloaded too much without detecting dimensions
          if (totalBytes > MAX_BYTES) {
            console.warn(
              `WARNING: Could not determine dimensions for "${imageUrl}" ` +
                `after downloading ${totalBytes} bytes. Using default dimensions.`,
            )
            await reader.cancel()
            return null
          }
        }

        if (done) {
          break
        }
      }

      // If we've read the entire stream without getting dimensions, try one last time
      const finalBuffer = Buffer.concat(chunks)
      const dimensions = imageSize(finalBuffer) as ImageDimensions
      if (dimensions && dimensions.width && dimensions.height) {
        return dimensions
      }

      console.warn(
        `WARNING: Could not determine dimensions from image data for "${imageUrl}"`,
      )
      return null
    }
    catch (sizeError) {
      console.warn(
        `WARNING: image-size failed for "${imageUrl}": ${(sizeError as Error).message}`,
      )
      return null
    }
    finally {
      await reader.cancel().catch(() => {
        // Ignore errors when canceling
      })
    }
  }
  catch (error) {
    const errorObj = error as Error & { cause?: Error }
    console.warn(
      "WARNING: " +
        `Image dimension fetch failed for "${imageUrlStr}" with following error:`,
      (errorObj.cause ?? errorObj).message,
    )
    return null
  }
}

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
