import JSZip from "jszip"
import fs from "node:fs/promises"
import { assert, test } from "vitest"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

for (const fileName of await fs.readdir("tests/snapshots")) {
  if (fileName.endsWith(".html")) {
    const xmlFileName = fileName.replace(".html", ".xml")
    test(`Snapshot test for ${fileName}`, async ({ expect }) => {
      const htmlContent = await fs.readFile(
        `tests/snapshots/${fileName}`,
        "utf8",
      )
      const docxContent = await htmlToDocx(
        htmlContent,
        null,
        {
          createdAt,
          modifiedAt: createdAt,
        },
        null,
      )
      await writeFile(docxContent, `tests/snapshots/${xmlFileName}_tmp_.docx`)

      const zip = new JSZip()
      const zipContent = await zip.loadAsync(docxContent)

      assert.ok("word/document.xml" in zipContent.files)

      const docXml = (await zipContent.file("word/document.xml")
        ?.async("string") || "")
        .trim()

      await expect(docXml)
        .toMatchFileSnapshot(`snapshots/${xmlFileName}`)
    })
  }
}
