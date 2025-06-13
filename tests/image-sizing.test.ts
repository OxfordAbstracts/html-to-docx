import assert from "assert"
import JSZip from "jszip"
import fs from "node:fs/promises"
import { test } from "node:test"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

test("embeds an image with the correct size", async () => {
  const imageHTML = await fs.readFile("tests/image-sizing.html", "utf8")
  const docxContent = await htmlToDocx(
    imageHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/image-sizing_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const imgRegex = /"image-[^.]+\./g

  const docXml = (await zipContent.file("word/document.xml")
    ?.async("string") || "")
    .replaceAll(imgRegex, '"image.')
    .trim()
  const expectedDocXml = (await fs
    .readFile("tests/image-sizing.xml", "utf8"))
    .replaceAll(imgRegex, '"image.')
    .trim()

  assert.strictEqual(docXml, expectedDocXml)
})
