import fs from "fs/promises"
import JSZip from "jszip"
import { assert, test } from "vitest"

import { create } from "xmlbuilder2"
import htmlToDocx from "../index.ts"

const createdAt = new Date("2025-01-01")

test("creates a valid Docx file", async () => {
  const htmlStr = `
    <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <p>Test</p>
      </body>
    </html>
  `
  const docxContentActual = await htmlToDocx(
    htmlStr,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  const zip = new JSZip()

  const zipContent = await zip.loadAsync(docxContentActual)
  const filesObj = zipContent.files

  assert.ok("[Content_Types].xml" in filesObj)
  assert.ok("_rels/" in filesObj)
  assert.ok("docProps/" in filesObj)
  assert.ok("docProps/core.xml" in filesObj)
  assert.ok("word/" in filesObj)
  assert.ok("word/_rels/" in filesObj)
  assert.ok("word/_rels/document.xml.rels" in filesObj)
  assert.ok("word/document.xml" in filesObj)
  assert.ok("word/fontTable.xml" in filesObj)
  assert.ok("word/numbering.xml" in filesObj)
  assert.ok("word/settings.xml" in filesObj)
  assert.ok("word/styles.xml" in filesObj)
  assert.ok("word/theme/" in filesObj)
  assert.ok("word/theme/theme1.xml" in filesObj)
  assert.ok("word/webSettings.xml" in filesObj)
})

test("converts HTML with table", async () => {
  const htmlStr = `
    <html>
      <body>
        <table>
          <tr>
            <td>one</td>
            <td>two</td>
          </tr>
        </table>
      </body>
    </html>
  `
  const docxContentActual = await htmlToDocx(
    htmlStr,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContentActual)
  const actualContent = create(
    await zipContent.file("word/document.xml")
      ?.async("string") || "",
  )
  const expectedContent = create(
    await fs.readFile("tests/expected-table.xml", "utf8"),
  )

  assert.strictEqual(
    actualContent.toString({ prettyPrint: true }),
    expectedContent.toString({ prettyPrint: true }),
  )
})

test("converts HTML with percentage width table", async () => {
  const htmlStr = `
    <html>
      <body>
        <table>
          <tr>
            <td style="width: 100%;"></td>
          </tr>
        </table>
      </body>
    </html>
  `
  const docxContentActual = await htmlToDocx(
    htmlStr,
    null,
    {
      createdAt,
      modifiedAt: createdAt,
    },
    null,
  )
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(docxContentActual)
  const actualContent = create(
    await zipContent.file("word/document.xml")
      ?.async("string") || "",
  )
  const expectedContent = create(
    await fs.readFile("tests/expected-table-pct.xml", "utf8"),
  )

  assert.strictEqual(
    actualContent.toString({ prettyPrint: true }),
    expectedContent.toString({ prettyPrint: true }),
  )
})
