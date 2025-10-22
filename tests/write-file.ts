import fs from "fs/promises"

export default async function writeFile(
  docxContent: Buffer | Blob,
  filePath: string,
) {
  await fs.writeFile(
    filePath,
    docxContent as Buffer,
  )
}
