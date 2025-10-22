import fs from "fs/promises"
import imageSize from "image-size"
import os from "os"
import path from "path"

export interface ImageDimensions {
  width: number
  height: number
}

/**
 * Detects image dimensions from a buffer.
 * For TIFF images, writes to a temporary file since image-size doesn't
 * support TIFF buffers. Falls back to default dimensions (400x300) if
 * detection fails.
 */
export async function getImageDimensions(imageBuffer: Buffer): Promise<ImageDimensions> {
  try {
    return imageSize(imageBuffer) as ImageDimensions
  }
  catch (error) {
    const errorMessage = (error as Error).message
    if (errorMessage.includes("Tiff doesn't support buffer")) {
      try {
        const tmpDir = os.tmpdir()
        const tmpFile = path.join(tmpDir, `temp-image-${Date.now()}.tiff`)

        await fs.writeFile(tmpFile, imageBuffer)
        const fileBuffer = new Uint8Array(await fs.readFile(tmpFile))
        const dimensions = imageSize(fileBuffer) as ImageDimensions
        await fs.unlink(tmpFile) // Clean up temp file

        return dimensions
      }
      catch (tempError) {
        const tempErrorMessage = (tempError as Error).message
        console.warn(
          "WARNING: Unable to determine TIFF image dimensions " +
            `even with temp file: ${tempErrorMessage}. ` +
            "Using default dimensions.",
        )
        return { width: 400, height: 300 }
      }
    }
    else {
      console.warn(
        "WARNING: Unable to determine image dimensions: " +
          `${errorMessage}. Using default dimensions.`,
      )
      return { width: 400, height: 300 }
    }
  }
}
