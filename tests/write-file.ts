import fs from "fs/promises"

export default async function writeFile(
  docxContent: Buffer<Uint8Array<ArrayBuffer>> | Blob,
  filePath: string,
) {
  await fs.writeFile(
    filePath,
    docxContent as Buffer<Uint8Array<ArrayBuffer>>,
  )
}
