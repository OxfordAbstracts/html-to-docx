import assert from "assert"
import JSZip from "jszip"
import { test } from "node:test"

import htmlToDocx from "../index.ts"
import writeFile from "./write-file.ts"

const createdAt = new Date("2025-01-01")

test("correctly set margin if pageSize is set", async () => {
  const simpleHtml = `
    <html>
      <title>Document Width/Margin Test</title>
      <body>
        <p>Some text</p>
      </body>
    </html>
  `
  const docxContent = await htmlToDocx(
    simpleHtml,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
      pageSize: { // Din A4 in TWIP
        width: 11918,
        height: 16850,
      },
    },
    null,
  )
  await writeFile(docxContent, "tests/document-width_tmp_.docx")

  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContent)

  assert.ok("word/document.xml" in zipContent.files)

  const docXml = await zipContent.file("word/document.xml")
    ?.async("string") || ""

  const sizeMatches = docXml.match(/w:w="(\d+)" w:h="(\d+)"/)
  assert.strictEqual(sizeMatches?.[1], "11918")
  assert.strictEqual(sizeMatches?.[2], "16850")

  const marginMatches = docXml.match(/<w:pgMar w:top="(\d+)" w:right="(\d+)"/)
  assert.strictEqual(marginMatches?.[1], "1440")
  assert.strictEqual(marginMatches?.[2], "1800")
})
