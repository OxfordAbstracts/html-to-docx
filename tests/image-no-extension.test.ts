import assert from "assert"
import JSZip from "jszip"
import fs from "node:fs/promises"
import { test } from "node:test"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

test("gets mime type of image without extension from its content", async () => {
  const largeHTML = await fs.readFile("tests/image-no-extension.html", "utf8")
  const docxContent = await htmlToDocx(
    largeHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/_tmp_image-no-extension.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const imgRegex = /"image-[^.]+\./g

  const docXml = (await zipContent.file("word/document.xml")
    ?.async("string") || "")
    .replaceAll(imgRegex, '"image.')

  const expectedDocXml = (await fs
    .readFile("tests/image-no-extension-document.xml", "utf8"))
    .replaceAll(imgRegex, '"image.')
    .trim()

  assert.strictEqual(docXml, expectedDocXml)
})
