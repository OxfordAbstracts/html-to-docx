import assert from "assert"
import JSZip from "jszip"
import fs from "node:fs/promises"
import { test } from "node:test"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

test("handles a large and complicated HTML file", async () => {
  const largeHTML = await fs.readFile("tests/html5-test-page.html", "utf8")
  const docxContent = await htmlToDocx(
    largeHTML,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  await writeFile(docxContent, "tests/html5-test-page_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = (await zipContent.file("word/document.xml")
    ?.async("string") || "")
    .trim()
  const expectedDocXml = (await fs
    .readFile("tests/html5-test-page.xml", "utf8"))
    .trim()

  assert.strictEqual(docXml, expectedDocXml)
})
